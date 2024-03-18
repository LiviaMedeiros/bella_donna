define("underscore backbone backboneCommon ajaxControl command QuestUtil text!template/event/EventWitch/page/Top.html text!css/event/EventWitch/Top.css js/event/EventWitch/Model js/event/EventWitch/Utility js/view/tutorial/TutorialPopupView js/event/EventWitch/parts/TopNativeMain js/event/EventWitch/parts/TopCharaList".split(" "), function(k, m, b, g, f, n, p, q, r, h, l, t, u)
{
  var e = {},
    v = m.View.extend(
    {
      events: function()
      {
        var a = {};
        a[b.cgti + " #HelpBtn"] = this.tapHelpBtn;
        a[b.cgti + " #scaleChangePlus"] = this.scaleUp;
        a[b.cgti + " #scaleChangeMinus"] = this.scaleDown;
        return a
      },
      initialize: function(a)
      {
        this.template = k.template(p);
        this.pageModel = a.pageModel;
        this.createDom()
      },
      render: function()
      {
        this.$el.html(this.template(
        {
          model: this.pageModel
        }));
        return this
      },
      createDom: function()
      {
        b.content.append(this.render().el);
        e.NativeMain = new t(
        {
          model: this.pageModel,
          _views: e
        });
        $("#NativeMainSec").append(e.NativeMain.render().el);
        this.SCALE_MAX = 100;
        this.SCALE_MIN = 60;
        b.eventSingleRaidScale = this.SCALE_MAX;
        this.updateScale();
        e.CharaList = new u(
        {
          model: this.pageModel,
          _views: e
        });
        $("#mainSec").append(e.CharaList.render().el);
        b.ready.hide()
      },
      scaleUp: function(a)
      {
        a.preventDefault();
        b.isScrolled() || a.currentTarget.classList.contains("off") || (b.eventSingleRaidScale = b.eventSingleRaidScale + 5 | 0, this.updateScale())
      },
      scaleDown: function(a)
      {
        a.preventDefault();
        b.isScrolled() || a.currentTarget.classList.contains("off") || (b.eventSingleRaidScale = b.eventSingleRaidScale - 5 | 0, this.updateScale())
      },
      resetPosition: function(a)
      {
        a.preventDefault();
        b.isScrolled() || (b.eventSingleRaidScale = this.SCALE_MAX, this.updateScale())
      },
      updateScale: function()
      {
        var a = $("#scaleChangePlus"),
          c = $("#scaleChangeMinus");
        b.eventSingleRaidScale >= this.SCALE_MAX ? (b.eventSingleRaidScale = this.SCALE_MAX, a.addClass("off"), c.removeClass("off")) : b.eventSingleRaidScale <= this.SCALE_MIN ? (b.eventSingleRaidScale = this.SCALE_MIN, a.removeClass("off"), c.addClass("off")) : (a.removeClass("off"), c.removeClass("off"));
        f.scaleEventSingleRaid(b.eventSingleRaidScale)
      },
      tapHelpBtn: function(a)
      {
        a.preventDefault();
        if (!b.isScrolled())
        {
          var c = this,
            d;
          new b.PopupClass(
          {
            popupType: "tutorial"
          }, null, function()
          {
            l.prototype.parentView = this;
            d = new l(
            {
              imgArr: ["navi_01", "navi_02", "navi_03", "navi_04"],
              type: "event",
              eventType: "eventWitch",
              eventId: c.pageModel.eventMaster.eventId
            });
            b.doc.getElementsByClassName("popupInner")[0].appendChild(d.render().el)
          }, function()
          {
            d.removeView()
          })
        }
      },
      removeView: function()
      {
        this.off();
        this.remove()
      }
    }),
    w = function(a)
    {
      var c = a.callback,
        d = a.eventMaster;
      b.playStory(
      {
        cmd: f,
        ajaxControl: g,
        storyId: d.startStoryId,
        callback: function()
        {
          c();
          localStorage.setItem("WatchEventWitchOP", d.eventId);
          setTimeout(function()
          {
            b.removeClass(b.ready.target, "fadeout")
          }, 500)
        }
      });
      window.isBrowser && nativeCallback()
    },
    x = function(a)
    {
      var c = a.pageModel;
      b.EventWitchPrm = {
        sectionInfo: c.questInfo.sectionInfoList,
        userQuestAdventureList: a.pageJson.userQuestAdventureList,
        beforeRatioList: h.getBeforeRatioList(
        {
          eventCharaInfo: c.eventCharaInfo
        })
      }
    },
    y = function()
    {
      var a = g.getPageJson(),
        c = h.getEventMaster(
        {
          pageJson: a
        }),
        d = function()
        {
          b.setStyle(q);
          var d = r.getTopModel(
          {
            pageJson: a
          });
          x(
          {
            pageModel: d,
            pageJson: a
          });
          f.startBgm(c.viewParameterMap.BGM);
          f.changeBg("web_ev_1210_15121.ExportJson");
          d.terminalClass = "";
          1024 !== b.displayWidth && (d.terminalClass = "iPhoneXOrMore");
          b.ua.ipad && (d.terminalClass = "iPad");
          e.pageView = new v(
          {
            pageModel: d
          });
          n.supportPickUp(a);
          b.setGlobalView();
          setTimeout(function()
          {
            h.openFirstNavi(
            {
              eventId: c.eventId,
              callback: function()
              {
                d.isOpenChallengePopup && new b.PopupClass(
                {
                  popupType: "typeC",
                  title: "チャレンジクエスト解放",
                  content: "チャレンジクエストが<br>解放されました。",
                  closeBtnText: "閉じる"
                }, null, null, null)
              }
            })
          }, 100)
        };
      c && "canPlay" == c.termStatus ? Number(localStorage.getItem("WatchEventWitchOP")) == c.eventId ? d() : w(
      {
        eventMaster: c,
        callback: d
      }) : location.href = "#/MyPage"
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
      y()
    },
    remove: function(a)
    {
      k.each(e, function(a, b, e)
      {
        a.removeView && a.removeView()
      });
      a()
    }
  }
});
