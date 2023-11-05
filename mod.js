
// isili templates == easily == easy li(terals) = js template literals

// TODO:
// add support to call other templates like so:
// 	!> ./report.room.html(match.locations.room)

import { lines } from '../std/string.js'

const SYMBOL = {
	script: '!',
	parameters: '!!',
	// injection: '!>',
	injection: /\!(css|js|json|)\>(.*)/,
}
const TYPES = {
	json: 'script',
	js: 'script',
	mjs: 'script',
	css: 'style',
}

export default template

export function template(template, x = {}) {
	let l = lines(template)
	// let lines = template.split('\r\n').flatMap(x => x.split('\r')).flatMap(x => x.split('\n')) // all types of line-delimiters
	// let h = header(l)
	let p = parameters(l)
	// console.log('p',p)
	let b = body(l, x.injections).join('\n')
	// console.log('b',b)
	// b = `let ${h} = arguments${h.startsWith('{') ? '[0]' : ''}\n` + b
	// if (p.debug) console.log('\n\n!!! parameters\n', header(l), '\n\n!!! body\n', body(l, p.injections))
	// return new Function(...h.p, b.join('\n'))
	// return new Function()
	// console.log('---',b,'---')
	try {
		return new Function(p,b)
	} catch {
		console.error("ERROR:", b)
	}
	// return  Function(`let a = 1;`)
	return Function()
}
// function parameters
// function header(lines) {
// 	let p = ['x']
// 	let firstLine = lines.filter(x => x.trim().startsWith(SYMBOL.parameters))[0]?.trim()
// 	if (firstLine)
// 		// p = firstLine.slice(2).split(',').map(x => x.trim())
// 		p = firstLine.slice(2).trim()
// 	if (!firstLine.startsWith('{'))
// 		firstLine = '[' + firstLine + ']'
// 	// console.log('p', p)
// 	return p
// 	// return { p }
// }
function parameters(lines) {
	return lines.map(x => x.trim()).filter(x => x.startsWith(SYMBOL.parameters))[0]?.slice(SYMBOL.parameters.length)?.trim()
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
			// console.log('injection',injection)
			let [x, type, key] = injection
			// key = key.trim()
			// console.log('inj',Object.keys(injections))
			let inj = (injections[key.trim()] ?? '')
			console.log('xxx',type,':'+key.trim()+':',inj)
			if (inj && type == 'json') inj = 'const ' + an(key) + ' = ' + inj
			let text = type
				? `<${TYPES[type]} ${type == 'mjs' ? `type='module'` : ''}>\n${inj}\n</${TYPES[type]}>`
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

const an = s => s.replaceAll(/[^a-z0-9]/gi, '_')

export function importable(func, fname) {
	let fdec = 'export default function'
	if (fname)
		fdec = 'export function ' + an(fname)
	return func.toString().replace('function anonymous', fdec)
}

export function build(dict) {
	let templates = []
	for (let [path, text] of Object.entries(dict)) {
		// if (!path.includes('.templite.')) continue
		if (!text.trim().startsWith(SYMBOL.parameters)) continue
		console.log('templite', path)
		templates.push(importable(template(text, { injections: dict }), path.replace('.templite.', '.')))
	}
	return templates
}