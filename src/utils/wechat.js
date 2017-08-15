


const wechat_share = (jsapi_config, title, link, imgUrl, desc) => {  
  wx.config({
    debug:true,
    ...jsapi_config
  })
  
  const share_args = {
    title: title,
    imgUrl: imgUrl,
    link: link,
  }

  wx.ready(function(){
    wx.onMenuShareTimeline({
      ...share_args,
      success: function () { 
          // 用户确认分享后执行的回调函数
      },
      cancel: function () { 
          // 用户取消分享后执行的回调函数
      }
    })

    wx.onMenuShareAppMessage({
        ...share_args,
        desc: desc,
        success: function () { 
            // 用户确认分享后执行的回调函数
        },
        cancel: function () { 
            // 用户取消分享后执行的回调函数
        }
    })
  })
}

module.exports = {
  wechat_share
}

