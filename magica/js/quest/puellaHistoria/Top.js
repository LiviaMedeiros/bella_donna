define("underscore backbone backboneCommon ajaxControl command QuestUtil text!template/quest/puellaHistoria/Top.html text!css/quest/PuellaHistoriaTop.css text!css/quest/QuestCommon.css js/quest/puellaHistoria/CreateModel js/quest/puellaHistoria/MirrorPartsView js/quest/puellaHistoria/CommonStoryBtnView js/quest/puellaHistoria/EventDateView js/quest/puellaHistoria/ClearMovieBgHideView js/quest/puellaHistoria/lastBattle/Utility js/quest/puellaHistoria/LastBattleBtnView".split(" "), function(h, n, a, g, e, p, r, t, u, k, v, w, x, y, q, z)
{
  var d, f, l, b = {},
    B = n.View.extend(
    {
      events: function()
      {
        return {}
      },
      initialize: function()
      {
        this.template = h.template(r);
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
        a.content.append(this.render().el);
        l = k.getPuellaHistoriaInfo(
        {
          puellaHistoriaNum: 99,
          pageJson: d
        });
        b.clearMovieBgHideView = new y(
        {});
        b.mirrorPartsView = new v(
        {
          model: f,
          commonStoryInfo: l,
          RippleAnimationView: A,
          ClearMovieBgHideView: b.clearMovieBgHideView,
          CreateModel: k
        });
        $("#mirrorSec").append(b.mirrorPartsView.render().el);
        b.commonStoryBtnView = new w(
        {
          commonStoryInfo: l
        });
        $("#mirrorSec").append(b.commonStoryBtnView.render().el);
        b.lastBattleBtnView = new z(
        {
          pageJson: d
        });
        $("#mirrorSec").append(b.lastBattleBtnView.render().el);
        b.eventDateView = new x(
        {
          pageModel: f
        });
        $("#mirrorSec").append(b.eventDateView.render().el);
        a.ready.hide()
      },
      removeView: function()
      {
        this.off();
        this.remove()
      }
    }),
    A = n.View.extend(
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
        a.tapBlock(!1);
        e.stopSur()
      }
    }),
    C = function()
    {
      d = g.getPageJson();
      var c = function()
        {
          a.setStyle(t + u);
          e.startBgm("bgm21_system02");
          e.changeBg("web_PuellaHistoria_19094_01.ExportJson");
          f = k.getModel(
          {
            pageJson: d
          });
          var c = "";
          1024 !== a.displayWidth && (c = "iPhoneX");
          a.ua.ipad && (c = "iPad");
          b.pageView = new B(
          {
            model:
            {
              pageJson: d,
              terminalClass: c
            }
          });
          p.canPlayQuestNum();
          p.eventTabSwitch(d.eventList);
          a.setGlobalView();
          setTimeout(function()
          {
            a.tapBlock(!1);
            a.forceTapBlock(!1)
          }, 10);
          b && b.mirrorPartsView && b.mirrorPartsView.isPlayClearMovie && setTimeout(function()
          {
            $("#overlapContainer").append(b.clearMovieBgHideView.render().el);
            b.mirrorPartsView.isPlayClearMovie = !1
          }, 50)
        },
        m = !!localStorage.getItem("watchPuellaHistoriaPrologue");
      localStorage.getItem("watchPuellaHistoriaEnding") ? c() : q.isJoinEvent(
      {
        userQuestAdventureList: d.userQuestAdventureList
      }) ? (m = q.getStoryIdList().event[9].storyId, a.playStory(
      {
        cmd: e,
        ajaxControl: g,
        storyId: m,
        callback: function()
        {
          localStorage.setItem("watchPuellaHistoriaEnding", "true");
          c();
          setTimeout(function()
          {
            a.removeClass(a.ready.target, "fadeout")
          }, 500)
        }
      })) : m ? c() : a.playStory(
      {
        cmd: e,
        ajaxControl: g,
        storyId: "103401-1_iTr7I",
        callback: function()
        {
          localStorage.setItem("watchPuellaHistoriaPrologue", "true");
          c();
          setTimeout(function()
          {
            a.removeClass(a.ready.target, "fadeout")
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
      g.pageModelGet(this.needModelIdObj, null)
    },
    init: function()
    {
      a.PuellaHistoriaLastBattleSingleRaidPrm = null;
      a.PuellaHistoriaLastBattleGroupRaidPrm = null;
      C()
    },
    remove: function(a)
    {
      f && (f = null);
      h.each(b, function(a, b, c)
      {
        a.removeView && a.removeView()
      });
      a()
    }
  }
});
