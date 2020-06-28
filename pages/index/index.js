//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
  
  },
  //事件处理函数

  login(){
      this.setData({ isSubmit1: true })
      let that = this
      wx.login({
        success: res => {
          if (res.code) { //获取code成功
            console.log(res.code)
            app.code = res.code
            wx.getUserInfo({
              withCredentials: true, //默认为true,表示在获取用户信息的时候,当用户授权允许时,将会返回用户的一些敏感信息
              success: resUserInfo => {
                console.log(resUserInfo)
                let obj = JSON.parse(resUserInfo.rawData)
                wx.setStorageSync('nickName', obj.nickName)
                app.globalData.avatarUrl = obj.avatarUrl
                wx.setStorageSync('avatarUrl', obj.avatarUrl)
                console.log(obj)
                wx.request({
                  url: `${app.globalData.basicPath}WXUser/normalLogin.do`, //请求服务端的登录接口
                  data: {
                    rawData: obj,
                    code: app.code, //临时登录凭证   
                    signature: resUserInfo.signature, //签名
                    encrytedData: resUserInfo.encryptedData, //用户敏感信息
                    iv: resUserInfo.iv, //解密算法的向量
                  },
                  header: {
                    'content-type': 'application/json' // 默认值
                  },
                  method: 'POST',
                  success(res) { //请求接口的回调结果
                  console.log(res)            
                  wx.navigateTo({
                    url: '/pages/home/home',
                    success: function(res) {},
                    fail: function(res) {},
                    complete: function(res) {},
                  })
                  },
                  fail(res) {
                    
                    console.log('失败')
                  }
                })
              },
              fail() {
                setTimeout(() => {
                  that.setData({ isSubmit1: false })
                }, 1500)
                app.showInfo(res.data.message)
              }
            })
          }
        }
      })
 
    
  },
  onLoad: function () {
    
    }

      
        })
    
