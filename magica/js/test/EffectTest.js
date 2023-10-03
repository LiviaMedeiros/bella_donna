define("underscore backbone backboneCommon ajaxControl command text!template/test/EffectTest.html text!css/test/EffectTest.css".split(" "), function(f, g, b, e, c, h, k)
{
  var d, l = g.View.extend(
  {
    events: function()
    {
      var a = {};
      a[b.cgti + " .groupBattleBtn"] = this.groupBattle;
      a[b.cgti + " .displayBtn"] = this.display;
      a[b.cgti + " .hideBtn"] = this.hide;
      return a
    },
    initialize: function(a)
    {
      this.template = f.template(h);
      this.bg = b.background;
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
      b.ready.hide();
      this.nativeKeyBoard()
    },
    nativeKeyBoard: function()
    {
      b.nativeKeyBoard("inputName", 50, 1);
      b.nativeKeyBoard("inputX", 5, 1);
      b.nativeKeyBoard("inputY", 5, 1);
      b.nativeKeyBoard("inputScale", 5, 1)
    },
    groupBattle: function(a)
    {
      a.preventDefault();
      b.isScrolled() || (a = b.doc.getElementById("RegularEventGroupBattleBoss"), $(a).hasClass("hide") ? (c.showMultiMiniChara([
      {
        index: 1,
        id: "601100",
        x: 380,
        y: 140,
        scale: .3,
        fade: 0,
        isReverse: !0,
        animeList: ["stance"]
      },
      {
        index: 2,
        id: "102700",
        x: 718,
        y: 238,
        scale: .5,
        fade: 0,
        isReverse: !1,
        animeList: ["wait"]
      },
      {
        index: 3,
        id: "111800",
        x: 798,
        y: 308,
        scale: .5,
        fade: 0,
        isReverse: !1,
        animeList: ["stance"]
      },
      {
        index: 4,
        id: "200600",
        x: 692,
        y: 340,
        scale: .5,
        fade: 0,
        isReverse: !1,
        animeList: ["flatline"]
      },
      {
        index: 5,
        id: "102600",
        x: 822,
        y: 196,
        scale: .5,
        fade: 0,
        isReverse: !1,
        animeList: ["stance_con"]
      },
      {
        index: 6,
        id: "200400",
        x: 898,
        y: 302,
        scale: .5,
        fade: 0,
        isReverse: !1,
        animeList: ["wait"]
      },
      {
        index: 7,
        id: "200100",
        x: 638,
        y: 196,
        scale: .5,
        fade: 0,
        isReverse: !1,
        animeList: ["activate", "stance"]
      },
      {
        index: 8,
        id: "200500",
        x: 600,
        y: 280,
        scale: .5,
        fade: 0,
        isReverse: !1,
        animeList: ["stance_con"]
      },
      {
        index: 9,
        id: "130100",
        x: 852,
        y: 364,
        scale: .5,
        fade: 0,
        isReverse: !1,
        animeList: ["activate", "wait"]
      },
      {
        index: 10,
        id: "102200",
        x: 926,
        y: 206,
        scale: .5,
        fade: 0,
        isReverse: !1,
        animeList: ["stance"]
      }]), b.removeClass(a, "hide"), c.changeBg("web_regular_battle_bg_15063.ExportJson")) : (c.hideMultiMiniChara(), b.addClass(a, "hide"), c.changeBg(this.bg)))
    },
    getPrm: function()
    {
      var a = {};
      a.name = String(b.doc.getElementById("inputName").value);
      a.action = b.doc.getElementById("selectAction").value;
      a.x = parseFloat(b.doc.getElementById("inputX").value);
      a.y = parseFloat(b.doc.getElementById("inputY").value);
      a.scale = parseFloat(b.doc.getElementById("inputScale").value);
      return a
    },
    display: function(a)
    {
      a.preventDefault();
      b.isScrolled() || ($("#inputWrap").addClass("off"), a = this.getPrm(), $("#commandDiv").off(), $("#commandDiv").on("nativeCallback", function(a, b)
      {
        $("#commandDiv").off();
        this.nativeKeyBoard();
        $("#inputWrap").removeClass("off")
      }.bind(this)), c.playEffect(a), window.isBrowser && nativeCallback())
    },
    hide: function(a)
    {
      a.preventDefault();
      b.isScrolled() || (c.stopEffect(), $("#inputWrap").removeClass("off"))
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
    fetch: function()
    {
      e.pageModelGet(this.needModelIdObj)
    },
    init: function()
    {
      b.setStyle(k);
      d = new l
    },
    remove: function(a)
    {
      c.hideMultiMiniChara();
      d && d.remove();
      a()
    }
  }
});
