module.exports = {
  async fetch({ page, args }) {
    let resp = await $http.get(`http://www.byjsj.cn/vodshow/${args.type}--------${page || ''}---.html`)
    let html = resp.data
    const $ = cheerio.load(html)
    let list = $('li', '.fed-list-info')
    let items = []
    list.each((index, li) => {
      let link = $('.fed-list-pics', li)
      let title = $('.fed-list-title', li).text()
      let url = `http://www.byjsj.cn/${link.attr('href')}`
      items.push({
        link: url,
        style: 'vod',
        thumb: link.attr('data-original'),
        title: title,
        summary: $('.fed-list-desc', li).text(),
        label: $('span', link).text(),
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
