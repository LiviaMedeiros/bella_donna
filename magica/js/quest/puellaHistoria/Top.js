define("underscore backbone backboneCommon ajaxControl command QuestUtil text!template/quest/puellaHistoria/Top.html text!css/quest/PuellaHistoriaTop.css text!css/quest/QuestCommon.css js/quest/puellaHistoria/CreateModel js/quest/puellaHistoria/MirrorPartsView js/quest/puellaHistoria/CommonStoryBtnView js/quest/puellaHistoria/EventDateView js/quest/puellaHistoria/ClearMovieBgHideView js/quest/puellaHistoria/lastBattle/Utility js/quest/puellaHistoria/LastBattleBtnView".split(" "), function(h, l, b, k, e, m, n, p, q, g, r, t, u, v, A, w)
{
  var d, f, c, a = {},
    y = l.View.extend(
    {
      events: function()
      {
        return {}
      },
      initialize: function()
      {
        this.template = h.template(n);
        this.createDom()
      },
      render: function()
      {
        this.$el.html(this.template(
        {
          model: this.model
        }));
        return this
      },
      createDom: function()
      {
        b.content.append(this.render().el);
        c = g.getPuellaHistoriaInfo(
        {
          puellaHistoriaNum: 99,
          pageJson: d
        });
        a.clearMovieBgHideView = new v(
        {});
        a.mirrorPartsView = new r(
        {
          model: f,
          commonStoryInfo: c,
          RippleAnimationView: x,
          ClearMovieBgHideView: a.clearMovieBgHideView,
          CreateModel: g
        });
        $("#mirrorSec").append(a.mirrorPartsView.render().el);
        a.commonStoryBtnView = new t(
        {
          commonStoryInfo: c
        });
        $("#mirrorSec").append(a.commonStoryBtnView.render().el);
        a.lastBattleBtnView = new w(
        {
          pageJson: d,
          commonStoryInfo: c,
          CreateModel: g
        });
        $("#mirrorSec").append(a.lastBattleBtnView.render().el);
        a.eventDateView = new u(
        {
          pageModel: f
        });
        $("#mirrorSec").append(a.eventDateView.render().el);
        b.ready.hide()
      },
      removeView: function()
      {
        this.off();
        this.remove()
      }
    }),
    x = l.View.extend(
    {
      className: "rippleAnimationListWrap",
      initialize: function(a)
      {
        this.endCallback = a.endCallback
      },
      render: function()
      {
        setTimeout(function()
        {
          e.startSur("9004_historia")
        }, 10);
        this.template = h.template($("#rippleAnimationParts").text());
        this.$el.html(this.template(
        {
          rippleNum: 7
        }));
        return this
      },
      events: function()
      {
        var a = {};
        a["webkitAnimationEnd .ripple7"] = this.animationEnd;
        return a
      },
      animationEnd: function()
      {
        this.endCallback();
        setTimeout(function()
        {
          $(".rippleAnimationListWrap").remove()
        }, 100);
        b.tapBlock(!1);
        e.stopSur()
      }
    }),
    z = function()
    {
      d = k.getPageJson();
      var c = function()
      {
        b.setStyle(p + q);
        e.startBgm("bgm21_system02");
        e.changeBg("web_PuellaHistoria_19094_01.ExportJson");
        f = g.getModel(
        {
          pageJson: d
        });
        var c = "";
        1024 !== b.displayWidth && (c = "iPhoneX");
        b.ua.ipad && (c = "iPad");
        a.pageView = new y(
        {
          model:
          {
            pageJson: d,
            terminalClass: c
          }
        });
        m.canPlayQuestNum();
        m.eventTabSwitch(d.eventList);
        b.setGlobalView();
        setTimeout(function()
        {
          b.tapBlock(!1);
          b.forceTapBlock(!1)
        }, 10);
        a && a.mirrorPartsView && a.mirrorPartsView.isPlayClearMovie && setTimeout(function()
        {
          $("#overlapContainer").append(a.clearMovieBgHideView.render().el);
          a.mirrorPartsView.isPlayClearMovie = !1
        }, 50)
      };
      localStorage.setItem("watchPuellaHistoriaEnding", "true");
      localStorage.getItem("watchPuellaHistoriaPrologue") ? c() : b.playStory(
      {
        cmd: e,
        ajaxControl: k,
        storyId: "103401-1_iTr7I",
        callback: function()
        {
          localStorage.setItem("watchPuellaHistoriaPrologue", "true");
          c();
          setTimeout(function()
          {
            b.removeClass(b.ready.target, "fadeout")
          }, 500)
        }
      })
    };
  return {
    needModelIdObj: [
    {
      id: "user"
    },
    {
      id: "gameUser"
    },
    {
      id: "userItemList"
    },
    {
      id: "userGiftList"
    },
    {
      id: "userStatusList"
    },
    {
      id: "userChapterList"
    },
    {
      id: "userSectionList"
    },
    {
      id: "userQuestBattleList"
    },
    {
      id: "userQuestAdventureList"
    }],
    fetch: function()
    {
      k.pageModelGet(this.needModelIdObj, null)
    },
    init: function()
    {
      b.PuellaHistoriaLastBattleSingleRaidPrm = null;
      b.PuellaHistoriaLastBattleGroupRaidPrm = null;
      z()
    },
    remove: function(b)
    {
      f && (f = null);
      h.each(a, function(a, b, c)
      {
        a.removeView && a.removeView()
      });
      b()
    }
  }
});
