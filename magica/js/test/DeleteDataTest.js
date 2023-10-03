define("underscore backbone backboneCommon ajaxControl command text!css/test/DeleteDataTest.css text!template/test/DeleteDataTest.html".split(" "), function(f, g, b, h, e, k, l)
{
  var c, m = g.View.extend(
  {
    events: function()
    {
      var a = {};
      a[b.cgti + " #getBtn"] = this.get;
      a[b.cgti + " #get2Btn"] = this.get2;
      a[b.cgti + " .setBtn"] = this.set;
      return a
    },
    initialize: function(a)
    {
      this.template = f.template(l);
      this.createDom()
    },
    render: function()
    {
      this.$el.html(this.template());
      return this
    },
    createDom: function()
    {
      b.content.append(this.render().el);
      b.setGlobalView();
      b.ready.hide()
    },
    get: function(a)
    {
      a.preventDefault();
      b.isScrolled() || ($("#commandDiv").on("nativeCallback", function(a, d)
      {
        $("#commandDiv").off();
        new b.PopupClass(
        {
          title: "SCENE_GET_CONF_DELETE_DATA",
          content: "voice：" + d.deleteVoice + "<br>movie：" + d.deleteMovie,
          closeBtnText: "OK",
          popupType: "typeC"
        })
      }), e.getDownloadDeleteConfig(), window.isBrowser && nativeCallback(
      {
        deleteVoice: 0,
        deleteMovie: 1
      }))
    },
    get2: function(a)
    {
      a.preventDefault();
      b.isScrolled() || ($("#configCallback").on("configCallback", function(a, d)
      {
        $("#configCallback").off();
        new b.PopupClass(
        {
          title: "SCENE_GET_CONF_DELETE_DATA",
          content: "voice：" + d.deleteVoice + "<br>movie：" + d.deleteMovie,
          closeBtnText: "OK",
          popupType: "typeC"
        })
      }), e.getDownloadDeleteConfig("configCallback"), window.isBrowser && configCallback(
      {
        deleteVoice: 1,
        deleteMovie: 0
      }))
    },
    set: function(a)
    {
      a.preventDefault();
      if (!b.isScrolled())
      {
        var c = {};
        c.voice = parseInt(a.currentTarget.dataset.voice);
        c.movie = parseInt(a.currentTarget.dataset.movie);
        e.setDownloadDeleteConfig(c)
      }
    }
  });
  return {
    needModelIdObj: [
    {
      id: "user"
    },
    {
      id: "gameUser"
    },
    {
      id: "userStatusList"
    },
    {
      id: "itemList"
    },
    {
      id: "userItemList"
    }],
    startCommand: function()
    {
      e.changeBg("web_common.ExportJson")
    },
    fetch: function()
    {
      h.pageModelGet(this.needModelIdObj)
    },
    init: function()
    {
      b.setStyle(k);
      c = new m
    },
    remove: function(a)
    {
      c && c.remove();
      a()
    }
  }
});
