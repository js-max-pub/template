function anonymous(x
) {
let html = []
html.push(`# ${x.person.name}`)
html.push(``)
html.push(`### Phone Numbers`)
for(let number of x.person.phone){
html.push(`	* ${number}`)
}
return html.join('\n')
}