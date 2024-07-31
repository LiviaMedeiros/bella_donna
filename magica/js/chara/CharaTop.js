define("underscore backbone backboneCommon ajaxControl command text!template/chara/CharaTop.html text!css/chara/CharaTop.css text!css/chara/CharaCommon.css cardUtil CharaCommon".split(" "), function(p, q, b, f, d, r, t, u, v, c)
{
  var g, h, k, l = null,
    e, w = q.View.extend(
    {
      events: function()
      {
        var a = {};
        a[b.cgti] = this.touch;
        a[b.cgti + " #poseChangeBtn"] = this.standPoseChange;
        a[b.cgti + " .miniCharaWrap"] = this.miniCharaMotion;
        a[b.cgti + " #globalBackBtn"] = this.tapGlobalBackBtn;
        return a
      },
      tapGlobalBackBtn: function(a)
      {
        a.preventDefault();
        b.isScrolled() || (location.href = "#/TopPage")
      },
      miniCharaMotion: function(a)
      {
        a.preventDefault();
        b.isScrolled() || (a = {}, a.id = String(c.charaDataView.model.toJSON().card.miniCharaNo), a.x = 1024 === b.displayWidth ? 400 : 440, a.y = 1024 === b.displayWidth ? Math.floor(b.doc.getElementsByTagName("body")[0].offsetHeight / 2) + 95 : Math.ceil(b.shortSize / 2) + 135, a.fade = .3, a.animeList = ["reaction", b.miniCharaStandPose], d.showMiniChara(a))
      },
      standPoseChange: function(a)
      {
        a.preventDefault();
        b.isScrolled() || (d.startSe(1008), a = "wait" == b.miniCharaStandPose ? "stance" : "wait", localStorage.setItem("miniCharaStandPose", a), b.miniCharaStandPose = a, a = {}, a.id = String(c.charaDataView.model.toJSON().card.miniCharaNo), a.x = 1024 === b.displayWidth ? 400 : 440, a.y = 1024 === b.displayWidth ? Math.floor(b.doc.getElementsByTagName("body")[0].offsetHeight / 2) + 95 : Math.ceil(b.shortSize / 2) + 135, a.fade = .3, a.animeList = [b.miniCharaStandPose], d.showMiniChara(a))
      },
      initialize: function(a)
      {
        this.template = p.template(r);
        this.createDom()
      },
      render: function()
      {
        this.$el.html(this.template(f.getPageJson()));
        return this
      },
      createDom: function()
      {
        b.content.prepend(this.render().el);
        this.createView()
      },
      createView: function()
      {
        v.createCardList();
        b.tapBlock(!1);
        b.ready.hide()
      },
      touch: function(a)
      {
        a.preventDefault();
        b.isScrolled()
      }
    }),
    m = "",
    n = function(a)
    {
      a = a.attributeId.toLowerCase();
      m && $(".composeAttribute").removeClass(m);
      $(".composeAttribute").addClass(a);
      m = a
    };
  return {
    needModelIdObj: [
    {
      id: "user"
    },
    {
      id: "gameUser"
    }],
    charaSelect: function(a)
    {
      c.charaSelect(a);
      var d = a.model.toJSON(),
        e = b.doc.querySelector("#leaderChangeBtn");
      b.storage.gameUser.toJSON().leaderId == d.userCardId ? b.addClass(e, "off") : b.removeClass(e, "off");
      c.showMiniChara(a.model.toJSON().card.miniCharaNo);
      n(
      {
        attributeId: a.model.attributes.chara.attributeId
      })
    },
    fetch: function(a)
    {
      l = a ? a : null;
      f.pageModelGet(this.needModelIdObj, null, "noConnect")
    },
    init: function()
    {
      b.questBattleModel = null;
      g = f.getPageJson();
      b.setStyle(t + u);
      e = new w;
      c.charaViewInit(l);
      k = h = 1;
      if (g.campaignList)
      {
        var a = b.campaignParse(g.campaignList);
        a.POINT_UP && a.POINT_UP.CARD_COMPOSE && (a.POINT_UP.CARD_COMPOSE.EXCELLENT || a.POINT_UP.CARD_COMPOSE.GREAT) && (h = a.POINT_UP.CARD_COMPOSE.EXCELLENT || 1, k = a.POINT_UP.CARD_COMPOSE.GREAT || 1)
      }
      1 === h && 1 === k || b.addClass(b.doc.querySelector("#btnArea"), "campaignIcon");
      a = c.charaDataView.model.toJSON().card.miniCharaNo;
      c.showMiniChara(a);
      n(
      {
        attributeId: c.charaDataView.model.attributes.chara.attributeId
      });
      b.tapBlock(!1);
      b.historyArr = ["TopPage"]
    },
    startCommand: function()
    {
      d.changeBg("web_common.ExportJson");
      d.startBgm(b.settingBgm)
    },
    remove: function(a)
    {
      e && (l = null, c.charaViewRemove(), e.trigger("remove"), e.remove());
      a()
    },
    charaCommon: function()
    {
      return c
    }
  }
});
