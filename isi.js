
// isili templates == easily == easy li(terals) = js template literals

const SYMBOL = {
	script: '!',
	parameters: '!!',
}

export default function isi(template) {
	let lines = template.split('\r\n').flatMap(x => x.split('\r')).flatMap(x => x.split('\n')) // all types of line-delimiters
	return new Function(...header(lines).p, body(lines).join('\n'))
}
export function debug(template) {
	let lines = template.split('\r\n').flatMap(x => x.split('\r')).flatMap(x => x.split('\n')) // all types of line-delimiters
	console.log('\n\n!!! parameters\n', header(lines))
	console.log('\n\n!!! body\n', body(lines))
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
			tpl.push(line.slice(1))
		} else {
			tpl.push('html.push(`' + line + '`)')
		}
	}
	tpl.push(`return html.join('\\n')`)
	return tpl//.join('\n')
}


Object.defineProperty(String.prototype, 'isi', {
	get: function () { return isi(this) },
	// writable: false
});