module.exports = {
  fetch() {
    return playlist.items.map(item => convert(item))
  }
}
