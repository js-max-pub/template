import { file } from 'https://js.max.pub/fs/mod.js'
import template from '../raw.js';

let person = file('./person.json').json
console.log(person)


let test1 = template(file('test1.isi.html').text, { debug: true })
file('test1.isi.js').text = test1.toString()
file('test1.result.html').text = test1(person)


let test2 = template(file('test2.isi.md').text)
file('test2.isi.js').text = test2.toString()
file('test2.result.md').text = test2({ person })