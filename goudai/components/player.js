module.exports = {
  type: 'video',
  async fetch({ args }) {
    let resp = await $http.get(args.url)
    $ = cheerio.load(resp.data)
    return {
      url: $('#fed-play-iframe').attr('data-play')
    }
  }
}
