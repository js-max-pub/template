import { build } from './mod.js'
import * as FS from '../fs/deno/sync.js'

let source = FS.folder(Deno.args[0] ?? './')
let target = FS.file(Deno.args[1] ?? './.templates.js')

let dict = source.load()
FS.file('test/test.json').json = dict
// let dict = Object.fromEntries(
// 	source.deepList
// 		.filter(x => x.type == 'file')
// 		.map(x => [x.path.replace(source.path, ''), x.text])
// )
// console.log(dict)

let templates = build(dict)
// console.log('tar',target.parent.path)
target.parent.make
target.text = templates.join('\n\n\n\n\n')