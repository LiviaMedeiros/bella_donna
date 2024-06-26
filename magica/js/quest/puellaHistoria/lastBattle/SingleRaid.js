define("underscore backbone backboneCommon ajaxControl command QuestUtil text!template/quest/puellaHistoria/lastBattle/SingleRaid.html text!css/quest/PuellaHistoriaLastBattle/SingleRaid.css js/quest/puellaHistoria/lastBattle/Model js/quest/puellaHistoria/lastBattle/Utility js/quest/puellaHistoria/lastBattle/parts/SingleRaid/NativeMain".split(" "), function(c, k, a, g, e, l, m, n, p, h, q)
{
  var f = {},
    r = k.View.extend(
    {
      events: function()
      {
        var b = {};
        b[a.cgti + " #scaleChangePlus"] = this.scaleUp;
        b[a.cgti + " #scaleChangeMinus"] = this.scaleDown;
        return b
      },
      initialize: function()
      {
        this.template = c.template(m);
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
        f.NativeMain = new q(
        {
          model: this.model.pageModel,
          _views: f
        });
        $("#mainSec").append(f.NativeMain.render().el);
        this.SCALE_MAX = 100;
        this.SCALE_MIN = 60;
        a.eventSingleRaidScale = this.SCALE_MAX;
        this.updateScale();
        a.ready.hide()
      },
      scaleUp: function(b)
      {
        b.preventDefault();
        a.isScrolled() || b.currentTarget.classList.contains("off") || (a.eventSingleRaidScale = a.eventSingleRaidScale + 5 | 0, this.updateScale())
      },
      scaleDown: function(b)
      {
        b.preventDefault();
        a.isScrolled() || b.currentTarget.classList.contains("off") || (a.eventSingleRaidScale = a.eventSingleRaidScale - 5 | 0, this.updateScale())
      },
      resetPosition: function(b)
      {
        b.preventDefault();
        a.isScrolled() || (a.eventSingleRaidScale = this.SCALE_MAX, this.updateScale())
      },
      updateScale: function()
      {
        var b = $("#scaleChangePlus"),
          d = $("#scaleChangeMinus");
        a.eventSingleRaidScale >= this.SCALE_MAX ? (a.eventSingleRaidScale = this.SCALE_MAX, b.addClass("off"), d.removeClass("off")) : a.eventSingleRaidScale <= this.SCALE_MIN ? (a.eventSingleRaidScale = this.SCALE_MIN, b.removeClass("off"), d.addClass("off")) : (b.removeClass("off"), d.removeClass("off"));
        e.scaleEventSingleRaid(a.eventSingleRaidScale)
      },
      tapSingleRaidHelp: function(b)
      {
        b.preventDefault();
        a.isScrolled() || h.openFirstNavi(
        {
          type: "singleRaid",
          isForceOpen: !0
        })
      },
      removeView: function()
      {
        this.off();
        this.remove()
      }
    }),
    t = function()
    {
      var b = g.getPageJson();
      if (h.isClearCommonStory(
        {
          pageJson: b
        }))
      {
        var d = function()
          {
            a.setStyle(n);
            e.startBgm("bgm22_battle07");
            e.changeBg("web_PuellaHistoria_19094_01.ExportJson");
            var d = p.getSingleRaidModel(
            {
              pageJson: b
            });
            a.PuellaHistoriaLastBattleSingleRaidPrm = {
              battleType: !1,
              sectionInfo: d.questInfo.sectionInfoList,
              userQuestAdventureList: b.userQuestAdventureList
            };
            var c = "";
            1024 !== a.displayWidth && (c = "iPhoneX");
            a.ua.ipad && (c = "iPad");
            l.supportPickUp(b);
            f.pageView = new r(
            {
              model:
              {
                pageModel: d,
                terminalClass: c
              }
            });
            a.setGlobalView()
          },
          c = h.getStoryIdList();
        a.playStory(
        {
          cmd: e,
          ajaxControl: g,
          storyId: c.event[0].storyId,
          callback: function()
          {
            d();
            setTimeout(function()
            {
              a.removeClass(a.ready.target, "fadeout")
            }, 500)
          }
        })
      }
      else a.setGlobalView(), a.ready.hide(), new a.PopupClass(
      {
        title: "エラー",
        content: "クエスト開始条件を<br>満たしていません",
        popupType: "typeC",
        closeBtnText: "トップに戻る"
      }, null, null, function()
      {
        a.historyArr = ["MyPage"];
        location.href = "#/PuellaHistoriaTop"
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
      id: "itemList"
    },
    {
      id: "userItemList"
    },
    {
      id: "giftList"
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
      id: "userDeckList"
    },
    {
      id: "userCardList"
    },
    {
      id: "userDoppelList"
    },
    {
      id: "userLive2dList"
    },
    {
      id: "userCharaList"
    },
    {
      id: "userQuestAdventureList"
    },
    {
      id: "userFollowList"
    },
    {
      id: "userPatrolList"
    }],
    fetch: function()
    {
      g.pageModelGet(this.needModelIdObj, null)
    },
    init: function()
    {
      e.endQuest();
      a.PuellaHistoriaLastBattleSingleRaidPrm = null;
      a.PuellaHistoriaLastBattleGroupRaidPrm = null;
      t()
    },
    remove: function(a)
    {
      c.each(f, function(a, b, c)
      {
        a.removeView && a.removeView()
      });
      a()
    }
  }
});
