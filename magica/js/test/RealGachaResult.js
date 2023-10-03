define("underscore backbone backboneCommon ajaxControl command cardUtil text!css/gacha/GachaResult.css text!template/test/RealGachaResult.html js/view/gacha/GachaResultListView".split(" "), function(h, k, a, d, c, p, l, m, e)
{
  var b, f, n = k.View.extend(
  {
    events: function()
    {
      var g = {};
      g[a.cgti + " #onceMore"] = this.gachaPop;
      return g
    },
    initialize: function(a)
    {
      this.model = d.getPageJson();
      this.template = h.template(m);
      this.createDom()
    },
    render: function()
    {
      this.$el.html(this.template());
      return this
    },
    createDom: function()
    {
      a.content.append(this.render().el);
      this.createView()
    },
    createView: function()
    {
      e.prototype.rootView = this;
      this.resultListView = new e(
      {
        model: f,
        el: a.doc.getElementById("cardWrap")
      });
      nativeJsonObj = {};
      a.ready.hide()
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
      id: "userCharaList"
    },
    {
      id: "userCardList"
    },
    {
      id: "userDeckList"
    },
    {
      id: "userDoppelList"
    },
    {
      id: "userGiftList"
    },
    {
      id: "pieceList"
    },
    {
      id: "userPieceList"
    },
    {
      id: "userPieceSetList"
    },
    {
      id: "itemList"
    },
    {
      id: "userItemList"
    },
    {
      id: "userPatrolList"
    }],
    fetch: function(a)
    {
      c.setWebView(!0);
      d.pageModelGet(this.needModelIdObj)
    },
    init: function()
    {
      a.setStyle(l);
      f = nativeJsonObj;
      b = new n
    },
    startCommand: function()
    {
      c.startBgm(a.settingBgm);
      c.changeBg("web_0017.ExportJson")
    },
    remove: function(a)
    {
      b && (b.trigger("removeView"), b.remove());
      a()
    }
  }
});
