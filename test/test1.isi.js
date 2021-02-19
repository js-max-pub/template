function anonymous(person
) {
let html = []
html.push(`<h1>${person.name}</h1>`)
html.push(`<ul>`)
for (let number of person.phone) {
html.push(`		<li>${number}</li>`)
}
html.push(`</ul>`)
return html.join('\n')
}