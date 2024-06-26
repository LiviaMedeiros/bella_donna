define("underscore backbone backboneCommon ajaxControl command QuestUtil text!template/event/EventWalpurgis/GroupRaid.html text!css/event/EventWalpurgis/GroupRaid.css js/event/EventWalpurgis/Model js/event/EventWalpurgis/Utility js/event/EventWalpurgis/parts/GroupRaid/NativeMain js/event/EventWalpurgis/parts/GroupRaid/Stamp".split(" "), function(f, p, b, g, k, z, q, r, l, h, t, u)
{
  var c = {},
    m = !1,
    w = p.View.extend(
    {
      events: function()
      {
        var a = {};
        a[b.cgti + " #toMissionBtn"] = this.tapToMissionBtn;
        a[b.cgti + " #groupRaidHelp"] = this.tapGroupRaidHelp;
        return a
      },
      initialize: function()
      {
        this.template = f.template(q);
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
        c.NativeMain = new t(
        {
          model: this.model.pageModel,
          getIsStampDisp: this.getIsStampDisp,
          _views: c
        });
        $("#mainSec").append(c.NativeMain.render().el);
        c.Stamp = new u(
        {
          model: this.model.pageModel,
          getIsStampDisp: this.getIsStampDisp,
          setIsStampDisp: this.setIsStampDisp,
          _views: c
        });
        $("#stampSec").append(c.Stamp.render().el);
        v(
        {
          model: this.model.pageModel
        });
        b.ready.hide()
      },
      getIsStampDisp: function()
      {
        return m
      },
      setIsStampDisp: function(a)
      {
        m = a
      },
      tapToMissionBtn: function(a)
      {
        a.preventDefault();
        b.isScrolled() || (a = "#/MissionTop", this.model.pageModel.eventId && (a = a + "/" + this.model.pageModel.eventId), location.href = a)
      },
      tapGroupRaidHelp: function(a)
      {
        a.preventDefault();
        b.isScrolled() || (a = 1217, this.model.pageModel.eventId && (a = this.model.pageModel.eventId), h.openFirstNavi(
        {
          eventId: a,
          isForceOpen: !0
        }))
      },
      removeView: function()
      {
        this.off();
        this.remove()
      }
    }),
    x = function(a)
    {
      var d = a.pageModel;
      b.EventWalpurgisRaidPrm = {
        battleType: !1,
        isUseItem: !1,
        sectionInfo: d.questInfo.sectionInfoList[0],
        userQuestAdventureList: a.pageJson.userQuestAdventureList,
        beforeDP: d.DP,
        bossUseItemQuantity: 0
      };
      h.setQuestBeforeDP(
      {
        groupRaidPrm: b.EventWalpurgisRaidPrm
      })
    },
    v = function(a)
    {
      a = String(a.model.DP).split("");
      a.reverse();
      var b = 0;
      f.each(a, function(a, d, c)
      {
        a = '<span class="numImg num' + a + '"></span>';
        b++;
        3 == b && d + 1 < c.length && (a = '<span class="numImg numcomma"></span>' + a, b = 0);
        $("#DPNum").prepend(a)
      })
    },
    y = function()
    {
      var a = g.getPageJson(),
        d = h.getEventMaster(
        {
          pageJson: a
        });
      d && d.isOpen ? function()
      {
        b.setStyle(r);
        k.startBgm(d.pageInfo.bgm);
        k.changeBg("web_ev_1053_24012.ExportJson");
        m = !1;
        var e = l.getGroupRaidModel(
        {
          eventMaster: d,
          pageJson: a
        });
        x(
        {
          pageModel: e,
          pageJson: a
        });
        var n = "";
        1024 !== b.displayWidth && (n = "iPhoneX");
        b.ua.ipad && (n = "iPad");
        var g = function()
        {
          c.pageView = new w(
          {
            model:
            {
              pageModel: e,
              terminalClass: n
            }
          });
          b.setGlobalView();
          setTimeout(function()
          {
            var a = 1217;
            e.eventId && (a = e.eventId);
            h.openFirstNavi(
            {
              eventId: a
            })
          }, 3500)
        };
        l.getStampList(
        {
          callback: function(a)
          {
            f.each(a.res.stampList, function(a, b, d)
            {
              e.nativeModel.stampList.push(
              {
                userName: a.userName,
                comment: a.comment,
                filename: "event_dailytower_" + a.stampId + "_s.png"
              })
            });
            l.getAttackInfoList(
            {
              mode: "INIT",
              callback: function(a)
              {
                var b = 0;
                f.each(a.res.damageList, function(a, d, c)
                {
                  e.nativeModel.damageList.push(
                  {
                    userName: a.userName,
                    damage: a.damage
                  });
                  b += a.damage
                });
                e.nativeModel.hp < b && (e.nativeModel.hp = b);
                g()
              }
            })
          }
        })
      }() : (b.historyArr = ["MyPage"], location.href = "#/MyPage")
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
    },
    {
      id: "userEventPuellaRaid"
    }],
    fetch: function()
    {
      g.pageModelGet(this.needModelIdObj, null)
    },
    init: function()
    {
      k.endQuest();
      b.PuellaHistoriaLastBattleSingleRaidPrm = null;
      b.EventWalpurgisRaidPrm = null;
      y()
    },
    remove: function(a)
    {
      f.each(c, function(a, b, c)
      {
        a.removeView && a.removeView()
      });
      a()
    }
  }
});
