function anonymous(person
) {
let html = []
html.push(``)
html.push(`<style >
a{text-decoration: none;}
a:hover{color: red;}
</style>`)
html.push(``)
html.push(`bla bla text`)
html.push(``)
html.push(`<script >
let x = 1 + 2
</script>`)
html.push(``)
html.push(`<h1>${person.name}</h1>`)
html.push(`<ul>`)
for (let number of person.phone) {
html.push(`		<li>${number}</li>`)
}
html.push(`</ul>`)
return html.join('\n')
}