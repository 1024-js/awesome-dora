module.exports = {
  type: 'bottomTab',
  searchRoute: $route('search'),
  fetch() {
    return [{
      title: '电影',
      image: $icon('movie'),
      route: $route('list', {
        type: 1
      })
    }, {
      title: '电视剧',
      image: $icon('tv'),
      route: $route('list', {
        type: 2
      })
    }, {
      title: '动漫',
      image: $icon('games'),
      route: $route('list', {
        type: 42
      })
    }, {
      title: '综艺',
      image: $icon('music_video'),
      route: $route('list', {
        type: 44
      })
    }]
  }
}
