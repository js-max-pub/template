import { FS } from 'https://js.max.pub/fs/deno.js'
import template from './src.js';

let test = FS.folder('test', import.meta);

let person = test.file('person.json').json
console.log(person)


let test1 = template(test.file('test1.isi.html').text, { debug: true })
test.file('test1.isi.js').text = test1.toString()
test.file('test1.result.html').text = test1(person)


let test2 = template(test.file('test2.isi.md').text)
test.file('test2.isi.js').text = test2.toString()
test.file('test2.result.md').text = test2({ person })