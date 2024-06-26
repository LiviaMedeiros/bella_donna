define("underscore backbone backboneCommon ajaxControl command QuestUtil text!template/event/EventWitch/page/Top.html text!css/event/EventWitch/Top.css js/event/EventWitch/Model js/event/EventWitch/Utility js/view/tutorial/TutorialPopupView js/event/EventWitch/parts/TopNativeMain js/event/EventWitch/parts/TopCharaList".split(" "), function(k, m, a, g, f, n, p, q, r, h, l, t, u)
{
  var e = {},
    v = m.View.extend(
    {
      events: function()
      {
        var b = {};
        b[a.cgti + " #HelpBtn"] = this.tapHelpBtn;
        b[a.cgti + " #scaleChangePlus"] = this.scaleUp;
        b[a.cgti + " #scaleChangeMinus"] = this.scaleDown;
        return b
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
        a.content.append(this.render().el);
        e.NativeMain = new t(
        {
          model: this.pageModel,
          _views: e
        });
        $("#NativeMainSec").append(e.NativeMain.render().el);
        this.SCALE_MAX = 100;
        this.SCALE_MIN = 60;
        a.eventSingleRaidScale = this.SCALE_MAX;
        this.updateScale();
        e.CharaList = new u(
        {
          model: this.pageModel,
          _views: e
        });
        $("#mainSec").append(e.CharaList.render().el);
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
          c = $("#scaleChangeMinus");
        a.eventSingleRaidScale >= this.SCALE_MAX ? (a.eventSingleRaidScale = this.SCALE_MAX, b.addClass("off"), c.removeClass("off")) : a.eventSingleRaidScale <= this.SCALE_MIN ? (a.eventSingleRaidScale = this.SCALE_MIN, b.removeClass("off"), c.addClass("off")) : (b.removeClass("off"), c.removeClass("off"));
        f.scaleEventSingleRaid(a.eventSingleRaidScale)
      },
      tapHelpBtn: function(b)
      {
        b.preventDefault();
        if (!a.isScrolled())
        {
          var c = this,
            d;
          new a.PopupClass(
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
            a.doc.getElementsByClassName("popupInner")[0].appendChild(d.render().el)
          }, function()
          {
            d.removeView()
          })
        }
      },
      removeView: function()
      {
        a.noGetPurchaseStatus = null;
        this.off();
        this.remove()
      }
    }),
    w = function(b)
    {
      var c = b.callback,
        d = b.eventMaster;
      a.playStory(
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
            a.removeClass(a.ready.target, "fadeout")
          }, 500)
        }
      });
      window.isBrowser && nativeCallback()
    },
    x = function(b)
    {
      var c = b.pageModel;
      a.EventWitchPrm = {
        sectionInfo: c.questInfo.sectionInfoList,
        userQuestAdventureList: b.pageJson.userQuestAdventureList,
        beforeRatioList: h.getBeforeRatioList(
        {
          eventCharaInfo: c.eventCharaInfo
        })
      }
    },
    y = function()
    {
      var b = g.getPageJson(),
        c = h.getEventMaster(
        {
          pageJson: b
        }),
        d = function()
        {
          a.setStyle(q);
          var d = r.getTopModel(
          {
            pageJson: b
          });
          x(
          {
            pageModel: d,
            pageJson: b
          });
          f.startBgm(c.viewParameterMap.BGM);
          f.changeBg("web_ev_1210_15121.ExportJson");
          d.terminalClass = "";
          1024 !== a.displayWidth && (d.terminalClass = "iPhoneXOrMore");
          a.ua.ipad && (d.terminalClass = "iPad");
          e.pageView = new v(
          {
            pageModel: d
          });
          n.supportPickUp(b);
          a.setGlobalView();
          a.noGetPurchaseStatus = !0;
          setTimeout(function()
          {
            h.openFirstNavi(
            {
              eventId: c.eventId,
              callback: function()
              {
                d.isOpenChallengePopup && new a.PopupClass(
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
