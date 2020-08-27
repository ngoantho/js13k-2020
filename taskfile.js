import { promises } from 'fs'
import { promisify } from 'util'

const OUTPUT = 'dist'

export async function _styles(task) {
  await task
    .source('build/_dist_/*.css')
    .postcss({
      plugins: [
        require('cssnano')({
          preset: 'default',
        }),
      ],
      from: undefined,
    })
    .target(OUTPUT)
}

export async function _html(task) {
  await task.source('build/index.html').htmlmin().target(OUTPUT)
}

const { rename, unlink, readdir, stat, access } = promises
const exec = promisify(require('child_process').exec)

export async function $fixIndex() {
  await rename(`${OUTPUT}/index.html`, `${OUTPUT}/_index.html`)
  await rename(`${OUTPUT}/js13k-2020.m.js`, `${OUTPUT}/index.js`)
  await exec(`sed 's,_dist_\/,,g' ${OUTPUT}/_index.html > ${OUTPUT}/index.html`)
  await unlink(`${OUTPUT}/_index.html`)
}

export async function $zip(task) {
  try {
    await access(`${OUTPUT}/build.zip`)
    await unlink(`${OUTPUT}/build.zip`)
  } catch (error) {
  } finally {
    await task
      .source(`${OUTPUT}/**/*`)
      .zip({ file: 'build.zip' })
      .target(OUTPUT)
  }
}

export async function $fileSize(task) {
  task.$.log(`=========`)
  for (const file of await readdir(OUTPUT)) {
    const { size } = await stat(`${OUTPUT}/${file}`)
    task.$.log(`${OUTPUT}/${file}: ${size} B`)
  }
  task.$.log(`=========`)
}

export default async function (task) {
  await task
    .parallel(['_html', '_styles'])
    .serial(['$fixIndex', '$zip', '$fileSize'])
}
