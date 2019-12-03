var _areas = null;
$dora.mixin({
  async getAreas() {
    if (_areas === null) {
      const response = await $http.get(`${endpoint}/v1/Area/getList`);
      _areas = response.data.data;
      console.log('fetch areas success.')
      return _areas;
    }
    return _areas;
  },
  beforeCreate() {
    console.log(this.args)
  }
})
$http.defaults.headers.common["User-Agent"] = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36'
$http.defaults.headers.common["Accept"] = '*/*'
module.exports = {
  endpoint: 'https://api.live.bilibili.com/room'
}
