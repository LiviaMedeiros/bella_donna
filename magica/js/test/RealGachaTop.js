define("underscore backbone backboneCommon ajaxControl command text!template/test/RealGachaTop.html text!css/test/RealGachaTop.css".split(" "), function(k, f, a, d, e, m, n)
{
  var g, l, c, p = f.View.extend(
  {
    events: function()
    {
      var b = {};
      b[a.cgti + " #realGachaBtn"] = this.realGachaDraw;
      return b
    },
    initialize: function(a)
    {
      this.template = k.template(m);
      this.createDom()
    },
    render: function()
    {
      this.$el.html(this.template(d.getPageJson()));
      return this
    },
    createDom: function()
    {
      a.content.append(this.render().el);
      a.ready.hide()
    },
    realGachaDraw: function(b)
    {
      b.preventDefault();
      if (!a.isScrolled() && !g)
      {
        g = a.androidKeyStop = !0;
        var c = l.gachaScheduleList,
          h = k.findWhere(c,
          {
            gachaType: "REAL"
          }),
          f = h.id;
        d.ajaxPost(a.linkList.realGachaResult,
        {
          gachaScheduleId: h.gachaKindList[0].gachaScheduleId
        }, function(b)
        {
          "error" !== b.resultCode && ($(a.ready.target).on("webkitAnimationEnd", function()
          {
            $(a.ready.target).off("webkitAnimationEnd");
            $(a.ready.target).on("webkitAnimationEnd", function(b)
            {
              "readyFadeOut" == b.originalEvent.animationName && (a.ready.target.className = "")
            });
            e.changeBg("web_black.jpg");
            nativeJsonObj = b;
            a.gachaArr = h;
            a.gachaSchedule = c;
            a.gachaDisp = f;
            setTimeout(function()
            {
              location.href = "#/RealGachaAnimation"
            }, 500)
          }), a.addClass(a.ready.target, "preNativeFadeIn"))
        })
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
      id: "userLive2dList"
    },
    {
      id: "userGiftList"
    },
    {
      id: "pieceList"
    },
    {
      id: "giftList"
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
      id: "userSectionList"
    },
    {
      id: "userQuestBattleList"
    },
    {
      id: "userPatrolList"
    }],
    fetch: function()
    {
      window.isDebug ? d.pageModelGet(this.needModelIdObj) : e.nativeReload("#/TopPage")
    },
    init: function()
    {
      a.setStyle(n);
      l = d.getPageJson();
      c = new p
    },
    startCommand: function()
    {
      e.changeBg("web_aj_gacha.png");
      e.startBgm("bgm01_anime07")
    },
    remove: function(a)
    {
      c && (g = !1, c.remove());
      a()
    }
  }
});
