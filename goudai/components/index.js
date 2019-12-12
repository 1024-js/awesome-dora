module.exports = {
  type: 'bottomTab',
  fetch() {
    return [{
      title: '电影',
      thumb: $icon('movie'),
      route: $route('list', {
        type: 1
      })
    }, {
      title: '电视剧',
      thumb: $icon('tv'),
      route: $route('list', {
        type: 2
      })
    }, {
      title: '动漫',
      thumb: $icon('games'),
      route: $route('list', {
        type: 42
      })
    }, {
      title: '综艺',
      thumb: $icon('music_video'),
      route: $route('list', {
        type: 44
      })
    }]
  }
}
