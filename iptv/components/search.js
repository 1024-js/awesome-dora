module.exports = {
  fetch({ args }) {
    return playlist.items
      .filter(item => item.name.includes(args.keyword))
      .map(item => convert(item))
  }
}
