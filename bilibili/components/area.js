module.exports = {
  type: 'list',
  async fetch() {
    const areas = await this.getAreas();
    let area = areas.find(area => {
      return area.id == this.args.id
    })
    if (area == null) {
      throw Error(`${this.args.id} area not found`)
    }
    return {
      next_page: null,
      items: area.list.map(item => {
        return {
          title: item.name,
          route: $route('category', {
            areaId: item.id,
            parentId: this.args.id
          }),
          style: 'icon',
          link: `https://live.bilibili.com/p/eden/area-tags?parentAreaId=${this.args.id}&areaId=${item.id}`,
          image: item.pic
        }
      })
    }
  },
  beforeCreated() {
    this.title = this.args.title
  }
}
