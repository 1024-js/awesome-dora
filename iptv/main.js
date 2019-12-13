if (typeof $dora == undefined) {
  console.log('This project can only run on Dora app, please visit https://dorajs.com for more information')
  process.exit(-1)
}

console.log('Congratulation, your addon run successfully!')

const fs = require('fs')
const parser = require('iptv-playlist-parser')

const data = fs.readFileSync('assets/cn.m3u', { encoding: 'utf-8' })

module.exports = {
  playlist: parser.parse(data),
  convert(item) {
    return {
      title: item.name,
      route: $route('@video', {
        url: item.url,
        isLive: true
      })
    }
  }
}
