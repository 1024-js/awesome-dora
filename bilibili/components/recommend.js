module.exports = {
  type: 'list',
  async fetch({ page }) {
    page = page || 1
    const url = `${endpoint}/v1/room/get_user_recommend?page=${page}`
    let response = await $http.get(url)
    let data = response.data.data
    let cover_type = $prefs.get('cover')
    let items = data.map(item => {
      return {
        title: item.title,
        route: $route('video', {
          roomId: item.roomid
        }),
        style: 'live',
        image: cover_type == 'system' ? item.system_cover : item.user_cover,
        author: {
          name: item.uname,
          avatar: item.face,
          route: $route(`https://space.bilibili.com/${item.uid}`)
        },
        link: `https://live.bilibili.com${item.link}`,
        label: item.areaName,
        viewerCount: item.online
      }
    })
    return {
      nextPage: page + 1,
      items: items
    }
  }
}
