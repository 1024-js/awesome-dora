module.exports = {
  async fetch({ page, args }) {
    let url = `http://www.byjsj.cn/vodsearch/${encodeURI(args.keyword)}----------${page||''}---.html`
    let resp = await $http.get(url)
    $ = cheerio.load(resp.data)
    var dls = $('dl')
    let items = []
    dls.each((i, dl) => {
      let h1 = $('h1', dl)
      let link = $('a', h1)
      let title = link.text()
      let url = `http://www.byjsj.cn${link.attr('href')}`
      items.push({
        link: url,
        title: title,
        style: 'vod',
        thumb: $('.fed-lazy', dl).attr('data-original'),
        summary: $('.fed-part-esan').text(),
        route: $route('episode', {
          url: url
        })
      })
    })
    return {
      nextPage: (page || 1) + 1,
      items: items
    }
  }
}
