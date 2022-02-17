
// isili templates == easily == easy li(terals) = js template literals

// TODO:
// add support to call other templates like so:
// 	!> ./report.room.html(match.locations.room)

import { lines } from '../string/mod.js'

const SYMBOL = {
	script: '!',
	parameters: '!!',
	// injection: '!>',
	injection: /\!(css|js|)\>(.*)/,
}
const TYPES = {
	js: 'script',
	css: 'style',
}
export default template
export function template(template, p = {}) {
	let l = lines(template)
	// let lines = template.split('\r\n').flatMap(x => x.split('\r')).flatMap(x => x.split('\n')) // all types of line-delimiters
	let h = header(l)
	let b = body(l, p.injections)
	if (p.debug) console.log('\n\n!!! parameters\n', header(l), '\n\n!!! body\n', body(l, p.injections))
	return new Function(...h.p, b.join('\n'))
}

function header(lines) {
	let p = ['x']
	let firstLine = lines.filter(x => x.trim().startsWith(SYMBOL.parameters))[0]?.trim()
	if (firstLine)
		p = firstLine.slice(2).split(',').map(x => x.trim())
	// console.log('p', p)
	return { p }
}

function body(lines, injections) {
	// console.log('inj',injections)
	let tpl = []
	tpl.push('let html = []')
	for (let line of lines) {
		if (line.trim().startsWith(SYMBOL.parameters))
			continue
		let injection = line.trim().match(SYMBOL.injection)
		if (injection) {
			let [x, type, key] = injection
			// console.log('inj',injections)

			// console.log('xxx',type,key)
			let inj = (injections[key.trim()] ?? '')
			let text = type
				? `<${TYPES[type]}>${inj}</${TYPES[type]}>`
				: inj
			// console.log("TExty",text)
			tpl.push('html.push(`' + text + '`)')
		} else if (line.trim().startsWith(SYMBOL.script)) {
			tpl.push(line.replace(SYMBOL.script, '').trim())
		} else {
			tpl.push('html.push(`' + line + '`)')
		}
	}
	tpl.push(`return html.join('\\n')`)
	return tpl//.join('\n')
}

// if (line.trim().startsWith(SYMBOL.injection)) {
// 	let key = line.replace(SYMBOL.injection, '').trim() // .replace(/[\{\}]/g, '')
// 	tpl.push('html.push(`' + injections[key] + '`)')
// }
// Object.defineProperty(String.prototype, 'isi', {
// 	get: function () { return isi(this) },
// 	// writable: false
// });

export function importable(func) {
	return func.toString().replace('function anonymous', 'export default function')
}