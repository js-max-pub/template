
// isili templates == easily == easy li(terals) = js template literals

// TODO:
// add support to call other templates like so:
// 	!> ./report.room.html(match.locations.room)


const SYMBOL = {
	script: '!',
	parameters: '!!',
}

export default function template(template, p = {}) {
	let lines = template.split('\r\n').flatMap(x => x.split('\r')).flatMap(x => x.split('\n')) // all types of line-delimiters
	let h = header(lines)
	let b = body(lines)
	if(p.debug) console.log('\n\n!!! parameters\n', header(lines),'\n\n!!! body\n', body(lines))
	return new Function(...h.p, b.join('\n'))
}

function header(lines) {
	let firstLine = lines.filter(x => x.trim().startsWith(SYMBOL.parameters))[0]?.trim()
	let p = ['x']
	if (firstLine)
		p = firstLine.slice(2).split(',').map(x => x.trim())
	// console.log('p', p)
	return { p }
}

function body(lines) {
	let tpl = []
	tpl.push('let html = []')
	for (let line of lines) {
		if (line.trim().startsWith(SYMBOL.parameters))
			continue
		if (line.trim().startsWith(SYMBOL.script)) {
			tpl.push(line.replace(SYMBOL.script, '').trim())
		} else {
			tpl.push('html.push(`' + line + '`)')
		}
	}
	tpl.push(`return html.join('\\n')`)
	return tpl//.join('\n')
}


// Object.defineProperty(String.prototype, 'isi', {
// 	get: function () { return isi(this) },
// 	// writable: false
// });