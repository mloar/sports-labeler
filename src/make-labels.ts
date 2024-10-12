import * as readline from 'readline/promises'
import { stdin as input, stdout as output } from 'node:process'

const rl = readline.createInterface({ input, output })

let teams = []

while (!input.closed) {
  const ident = await rl.question('Identifier: ')
  if (ident.trim() == '') {
    input.close()
    break
  }
  const name = await rl.question('Name: ')

  teams.push({identifier: ident, locales: [ { description: `Fan of the ${name}`, lang: 'en', name } ]})
}

console.log(JSON.stringify(teams))
