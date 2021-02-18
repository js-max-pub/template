import { file } from 'https://js.max.pub/fs/mod.js'
import { debug } from '../isi.js';

let person = file('./person.json').json
console.log(person)


let test1 = file('test1.isi.html').text.isi
file('test1.isi.js').text = test1.toString()
file('test1.result.html').text = test1(person)
debug(file('test1.isi.html').text)

let test2 = file('test2.isi.md').text.isi
file('test2.isi.js').text = test2.toString()
file('test2.result.md').text = test2({ person })