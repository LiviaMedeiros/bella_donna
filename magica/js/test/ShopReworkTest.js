define("underscore backbone backboneCommon ajaxControl command text!template/test/ShopReworkTest.html text!css/test/ShopReworkTest.css".split(" "), function(g, l, b, e, d, m, n)
{
  var h = function()
    {
      var a = ["01", "02", "03", "04"],
        b = e.getPageJson(),
        c = Number(b.currentTime.split(" ")[1].split(":")[0]),
        b = Number(b.currentTime.split(" ")[1].split(":")[1]);
      6 <= c && 9 >= c && !(9 == c && 0 < b) ? a.push("08") : 11 <= c && 13 >= c && !(13 == c && 0 < b) ? a.push("09") : 17 <= c && 19 >= c && !(19 == c && 0 < b) ? a.push("10") : 22 <= c || 0 === c && !(0 === c && 0 < b) ? a.push("11") : a.push("12");
      return a[Math.floor(Math.random() * a.length)]
    },
    k, p = l.View.extend(
    {
      events: function()
      {
        var a = {};
        a[b.cgti + " .listRow"] = this.shopOpen;
        a[b.cgti + " #backListBtn"] = this.listShow;
        a[b.cgti + " #debugBtn"] = this.designToggle;
        return a
      },
      initialize: function(a)
      {
        this.template = g.template(m);
        this.createDom()
      },
      render: function()
      {
        this.$el.html(this.template(e.getPageJson()));
        return this
      },
      createDom: function()
      {
        b.setGlobalView();
        b.content.append(this.render().el);
        b.scrollSet("shopList", "scrollInner");
        b.scrollSet("itemListWrap", "scrollInner");
        d.endL2d();
        var a = e.getPageJson(),
          f, c;
        (a = g.findWhere(a.campaignList,
        {
          campaignType: "SHOP_VIEW"
        })) && a.parameterMap && (f = a.parameterMap.LIVE2D, c = a.parameterMap.VOICEID);
        a = {};
        a.id = f ? f : "101799";
        a.x = 150;
        a.y = Math.floor(b.doc.getElementsByTagName("body")[0].offsetHeight / 2);
        a.type = 0;
        a.key = c ? c + h() : "vo_game_0002_" + h();
        d.startL2d(a);
        b.ready.hide()
      },
      shopOpen: function(a)
      {
        a.preventDefault();
        b.isScrolled() || (b.addClassId("shopList", "hide"), b.addClassId("shopTitle", "hide"), b.removeClassId("perShopTitle", "hide"), b.removeClassId("mainWrap", "hide"), b.removeClassId("backListBtn", "hide"), b.scrollRefresh("itemListWrap", "scrollInner"), b.doc.getElementById("globalBackBtn").style.display = "none")
      },
      listShow: function(a)
      {
        a.preventDefault();
        b.isScrolled() || (b.removeClassId("shopList", "hide"), b.removeClassId("shopTitle", "hide"), b.addClassId("perShopTitle", "hide"), b.addClassId("mainWrap", "hide"), b.addClassId("backListBtn", "hide"), b.scrollRefresh("shopList", "scrollInner"), b.doc.getElementById("globalBackBtn").style.display = "")
      },
      designToggle: function(a)
      {
        a.preventDefault();
        b.isScrolled() || (a = b.doc.getElementById("shopList").classList, a.contains("another") ? (a.remove("another"), a.add("another2nd")) : a.contains("another2nd") ? a.remove("another2nd") : a.add("another"))
      },
      removeView: function()
      {
        this.off();
        this.remove()
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
      id: "itemList"
    },
    {
      id: "userItemList"
    },
    {
      id: "userStatusList"
    }],
    startCommand: function()
    {
      d.changeBg("web_0016.ExportJson");
      d.startBgm("bgm03_story11")
    },
    fetch: function()
    {
      e.pageModelGet(this.needModelIdObj)
    },
    init: function()
    {
      b.setStyle(n);
      k = new p
    },
    removeCommand: function()
    {
      d.endL2d()
    },
    remove: function(a)
    {
      b.doc.getElementById("globalBackBtn").style.display = "";
      k.removeView();
      a()
    }
  }
});
