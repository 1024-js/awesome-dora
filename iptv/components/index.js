module.exports = {
  type: 'topTab',
  searchRoute: $route('search'),
  fetch() {
    return [{
      title: '全部',
      route: $route('all')
    }, {
      title: 'cctv',
      route: $route('cctv')
    }]
  }
}
