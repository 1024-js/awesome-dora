if (typeof $dora == undefined) {
  console.log('This project can only run on Dora app, please visit https://dorajs.com for more information')
  process.exit(-1)
}
$dora.defaultSearchRoute = $route('search')
module.exports = {
  cheerio: require('cheerio')
}
