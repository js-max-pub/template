// import { FS } from 'https://js.max.pub/fs/deno.js'
import template from './mod.js';
import * as FS from '../fs/deno/sync.js'
// console.log("fs",FS)
let test = FS.folder('test');
// console.log('test', test.path)
let person = test.file('person.json').json
console.log('person',person)

// console.log('css',test.file('style.css').text)

// console.log(test.file('inject.css').text)
let test1 = template(test.file('test1.isi.html').text, { debug: false, injections: { style1: test.file('inject.css').text, script1: test.file('inject.js').text, text1: test.file('inject.txt').text } })
test.file('test1.isi.js').text = test1.toString()
test.file('test1.result.html').text = test1(person)


// let test2 = template(test.file('test2.isi.md').text)
// test.file('test2.isi.js').text = test2.toString()
// test.file('test2.result.md').text = test2({ person })