const qualityLevels = {
  '1': 'low',
  '2': 'super',
  '3': 'high',
  '4': 'blue'
}
const DanmakuClient = require('bilibili-danmaku-client')
module.exports = {
  quality: null,
  line_id: 0,
  type: 'video',
  async fetch({ args }) {
    let url = `${endpoint}/v1/Room/playUrl?cid=${args.roomId}&platform=android&otype=json`
    if (this.quality) {
      url += `&quality=${this.quality}`
    }
    const resp = await $http.get(url)
    let data = resp.data.data
    if (!data.quality_description) {
      throw new Error('获取视频流信息失败 :(')
    }
    let clarifyIndex = 0
    let lineIndex = 0
    let clarifies = data.quality_description.map((quality, index) => {
      if (quality.qn == this.quality) {
        clarifyIndex = index
      }
      return {
        // 'level': qualityLevels[quality.qn] || 'unknown',
        title: quality.desc,
        args: {
          quality: quality.qn
        }
      }
    })
    let lines = data.durl.map((durl, index) => {
      if (index == this.line_id) {
        lineIndex = index
      }
      return {
        title: index == 0 ? '主线路' : `线路 ${index + 1}`,
        args: {
          url: durl.url
        }
      }
    })
    // this.client = new DanmakuClient(5441);
    return {
      url: data.durl[this.line_id].url || data.durl[0].url,
      selectors: [
        {
          title: '清晰度',
          select: clarifyIndex,
          options: clarifies,
          onSelect: option => {
            console.log(option)
            this.quality = option.args.quality
            this.refresh()
          }
        },
        {
          title: '线路',
          select: lineIndex,
          options: lines,
          onSelect: option => {
            this.url = option.args.url
          }
        }
      ]
    }
  },
  startDanmaku() {
    console.log(`startDanmaku: roomId=${this.args.roomId}`)
    if (this.client) {
      this.client.terminate()
    }
    this.client = new DanmakuClient(parseInt(this.args.roomId))
    this.client.start()
    this.client.on('event', ({ name, content }) => {
      switch (name) {
        case 'danmaku':
          console.log(content)
          this.addDanmaku({
            nick: content.sender.name,
            uid: content.sender.uid,
            content: content.content
          })
          break
        case 'gift':
          break
      }
    })
    this.client.on('open', () => console.log('Client opened.'))
    this.client.on('close', () => console.log('Client closed.'))
    this.client.on('error', () => console.log('Client error.'))
  },
  stopDanmaku() {
    if (this.client) {
      this.client.terminate()
      this.client = null
    }
  },
  // sendDanmaku(content) {
  //   $ui.toast(`TODO: content=${content}`)
  // }
}
