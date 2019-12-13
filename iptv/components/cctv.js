module.exports = {
  fetch() {
    return playlist.items.filter(item => item.name.includes('CCTV')).map(item => convert(item))
  }
}
