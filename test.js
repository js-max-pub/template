import { FS } from 'https://js.max.pub/fs/deno.js'
import template from './mod.js';

let test = FS.folder('test', import.meta);

let person = test.file('person.json').json
console.log(person)


let test1 = template(test.file('test1.isi.html',import.meta).text, { debug: true })
test.file('test1.isi.js',import.meta).text = test1.toString()
test.file('test1.result.html',import.meta).text = test1(person)


let test2 = template(test.file('test2.isi.md',import.meta).text)
test.file('test2.isi.js',import.meta).text = test2.toString()
test.file('test2.result.md',import.meta).text = test2({ person })