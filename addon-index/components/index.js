module.exports = {
  type: 'list',
  created() {
    if (!$storage.has('notice')) {
      $storage.put('notice', true)
      $input.confirm('长按可加入黑名单')
    }
  },
  async fetch({ args, page }) {
    offset = page || 0
    const resp = await $http.get(
      `http://registry.npmjs.com/-/v1/search?text=Dora.js&from=${offset}`
    )
    const count = resp.data.objects.length
    return {
      items: resp.data.objects
        .map(item => item.package)
        .filter(package => !blacklist.has(package.name))
        .map(package => ({
          title: package.name,
          summary: package.description,
          onClick: async () => {
            $dora.install(`npm://${package.name}`)
          },
          onLongClick: () => {
            this.showOptions(package)
          }
        })),
      nextPage: resp.data.total > count + offset ? count : null
    }
  },
  async showOptions(package) {
    const option = await $input.select({
      title: '选项',
      options: [
        {
          title: '加入黑名单',
          onClick: () => {
            blacklist.add(package.name)
            $storage.put('blacklist', Array.from(blacklist))
            $ui.toast(`added ${package.name} to backlist`)
          }
        },
        {
          title: `@${package.publisher.username}`,
          onClick: () => {
            $ui.viewUser(package.publisher.username)
          }
        }
      ]
    })
    if (option) {
      option.onClick()
    }
  }
}
