module.exports = {
  type: 'topTab',
  async fetch() {
    let areas = await this.getAreas();
    let items = areas.map(item => {
      return {
        title: item.name,
        route: $route('area', {
          id: item.id
        }),
      }
    })
    if ($prefs.get('recommend')) {
      items.splice(0, 0, {
        title: '推荐',
        route: $route('recommend', {}),
      })
    }
    return {
      nextPage: null,
      items: items
    }
  },
  created() {}
}
