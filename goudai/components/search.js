module.exports = {
    type: 'folder',
    style: 'vod',
    async fetch(page) {
        let url = `http://www.byjsj.cn/vodsearch/${encodeURI(this.args.keyword)}----------${page||''}---.html`
        console.log(url)
        let resp = await $http.get(url)
        $ = cheerio.load(resp.data)
        var dls = $('dl')
        let items = []
        dls.each((i, dl) => {
            console.log($('a', dl).attr('href'))
            let h1 = $('h1', dl)
            let link = $('a', h1)
            let title = link.text()
            let url = `http://www.byjsj.cn${link.attr('href')}`
            items.push({
                link: url,
                title: title,
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