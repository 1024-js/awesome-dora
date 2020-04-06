module.exports = {
  type: 'folder',
  style: 'live',
  async fetch({page}) {
    this.subtitle = this.args.keyword
    page = page || 1
    const url = `${endpoint}/v1/room/get_user_recommend?page=${page}`
    let response = await $http.get(url)
    let data = response.data.data
    let cover_type = $prefs.get('cover')
    let items = data.map(item => {
      return {
        title: item.title,
        route: $route.video('video', {
          roomId: item.roomid
        }),
        image: cover_type == 'system' ? item.system_cover : item.user_cover,
        author: {
          name: item.uname,
          avatar: item.face,
          route: $route.url(`https://space.bilibili.com/${item.uid}`)
        },
        link: `https://live.bilibili.com${item.link}`,
        label: item.areaName,
        number: item.online
      }
    })
    return {
      nextPage: page + 1,
      items: items
    }
  }
}
