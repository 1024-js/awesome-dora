if (typeof $dora == 'undefined') {
  console.error('This project runs only in Dora.js.')
  console.error('Please visit https://dorajs.com/ for more information.')
  process.exit(-1)
}

console.info('Congratulation, your addon runs successfully!')
const arr = $storage.get('blacklist') || []

global.blacklist = new Set()
arr.forEach(element => {
  blacklist.add(element)
})
console.log(blacklist)
