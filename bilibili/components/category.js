module.exports = {
  type: 'list',
  async fetch({ page }) {
    page = page || 1
    let url = `${endpoint}/v3/area/getRoomList?platform=web&parent_area_id=${this.args.parentId}&cate_id=0&area_id=${this.args.areaId}&sort_type=online&page=${page}&page_size=30&tag_version=1`;
    let response = await $http.get(url)
    let items = response.data.data.list
    let cover_type = $prefs.get('cover')
    return {
      nextPage: page,
      items: items.map(item => {
        return {
          title: item.title,
          route: $route('video', {
            roomId: item.roomid
          }),
          link: `https://live.bilibili.com${item.link}`,
          thumb: cover_type == 'system' ? item.system_cover : item.user_cover,
          style: 'live',
          author: {
            name: item.uname,
            avatar: item.face,
            route: $route('@url', {
              url: `https://space.bilibili.com/${item.uid}`
            })
          },
          label: item.area_name,
          viewerCount: item.online
        }
      })
    }
  }
}
