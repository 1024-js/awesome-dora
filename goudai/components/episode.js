module.exports = {
  type: 'list',
  async fetch() {
    let resp = await $http.get(this.args.url)
    $ = cheerio.load(resp.data)
    var parent = $('.fed-part-rows')
    let links = $('a', parent).filter(function(i, el) {
      let t = $(el)
      if (!t.has('href')) {
        return false
      }
      return $(el).attr('href').startsWith('/vodplay')
    })
    let items = []

    links.each((index, el) => {
      let link = $(el)
      let url = `http://www.byjsj.cn${link.attr('href')}`
      items.push({
        title: link.text(),
        link: url,
        route: $route('player', {
          url: url
        })
      })
    })
    return {
      items: items
    }
  }
}
