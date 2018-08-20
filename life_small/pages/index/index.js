//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    // background: ['demo-text-1', 'demo-text-2', 'demo-text-3'], //imgUrls:[]
    imgUrls: ['../../images/index/0.jpg', '../../images/index/2.jpg'],
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    circular: false,
    interval: 2000,
    duration: 500,
    previousMargin: 0,
    nextMargin: 0,
    commendList: [
      {"id": 1, "imgUrl": '../../images/index/0.jpg', "title": 'asfa11s'},
      {"id": 2, "imgUrl": '../../images/index/2.jpg', "title": 'asfa22s'},
      {"id": 3, "imgUrl": '../../images/index/0.jpg', "title": 'asfa33s'},
      {"id": 11, "imgUrl": '../../images/index/0.jpg', "title": 'asfa11s'},
      {"id": 21, "imgUrl": '../../images/index/2.jpg', "title": 'asfa22s'},
      {"id": 31, "imgUrl": '../../images/index/0.jpg', "title": 'asfa33s'}
    ],
    // motto: 'Hello World motto',
    userInfo: {},
    // hasUserInfo: false,
    // canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
