define("underscore backbone backboneCommon ajaxControl command cardUtil text!template/event/EventArenaRankMatch/Top.html text!css/event/EventArenaRankMatch/Top.css js/event/EventArenaRankMatch/Model js/event/EventArenaRankMatch/parts/DailyPresent js/event/EventArenaRankMatch/parts/AttackCount js/event/EventArenaRankMatch/parts/CoolTime js/event/EventArenaRankMatch/parts/OpponentList js/event/EventArenaRankMatch/parts/SpRule js/event/EventArenaRankMatch/parts/EventReward js/event/EventArenaRankMatch/parts/DefenseDeckEditPopup js/event/EventArenaRankMatch/parts/DeckEditCountDown".split(" "), function(f, p, b, h, k, q, r, t, u, v, w, x, l, m, y, z, g)
{
  var d, c = {},
    A = p.View.extend(
    {
      events: function()
      {
        var a = {};
        a[b.cgti + " #reloadListBtn"] = this.reloadList;
        a[b.cgti + " #editDefenceDeckBtn"] = this.editDefenceDeck;
        a[b.cgti + " #editAttackDeckBtn"] = this.editAttackDeck;
        a[b.cgti + " #openEventRewardPopupBtn"] = this.openEventRewardPopup;
        a[b.cgti + " #rankMatchHelp"] = this.openRankMatchHelpPopup;
        a[b.cgti + " #limitMissionBtn"] = this.tapLimitMissionBtn;
        return a
      },
      initialize: function()
      {
        this.template = f.template(r);
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
        c.OpponentList = l.init(
        {
          model: this.model,
          _views: c,
          pageJson: d
        });
        c.AttackCountBtn = new w.viewBtn(
        {
          model: this.model,
          pageJson: d,
          _views: c
        });
        c.CoolTime = x.init(
        {
          model: this.model,
          pageJson: d
        });
        c.SpRule = m.init(
        {
          model: this.model,
          pageJson: d
        });
        b.ready.hide()
      },
      reloadList: function(a)
      {
        a.preventDefault();
        b.isScrolled() || 0 != this.model.attackCountInfo.num && l.setList(
        {
          model: this.model,
          _views: c
        })
      },
      editDefenceDeck: function(a)
      {
        a.preventDefault();
        b.isScrolled() || (location.href = "#/DeckFormation/arenaRankMatchDefence")
      },
      editAttackDeck: function(a)
      {
        a.preventDefault();
        b.isScrolled() || (b.EventArenaRankMatchPrm.opponentInfo = null, location.href = "#/DeckFormation/arenaRankMatchAttack")
      },
      openEventRewardPopup: function(a)
      {
        a.preventDefault();
        b.isScrolled() || y.openPopup(
        {
          rewardList: this.model.presentInfo,
          rankInfo: this.model.userInfo
        })
      },
      openRankMatchHelpPopup: function(a)
      {
        a.preventDefault();
        b.isScrolled() || n(
        {
          pageModel: this.model,
          isForceOpen: !0,
          callback: function() {}
        })
      },
      tapLimitMissionBtn: function(a)
      {
        a.preventDefault();
        if (!b.isScrolled())
        {
          var e = "";
          d.regularEventList && f.each(d.regularEventList, function(a, b, c)
          {
            "ARENARANKMATCH" == a.regularEventType && a.regularEventId && (e = "/" + a.regularEventId)
          });
          location.href = "#/MissionTop" + e
        }
      },
      removeView: function()
      {
        this.off();
        this.remove()
      }
    }),
    B = function(a)
    {
      a = a.pageModel;
      b.EventArenaRankMatchPrm = {
        eventInfo: a.eventInfo,
        orderRank: a.userInfo.orderRank,
        matchExpiredAt: a.battleInfo.matchExpiredAt,
        editEndTime: a.battleInfo.matchExpiredAt,
        arenaBattleType: a.battleInfo.arenaBattleType,
        spRuleList: a.specialRuleInfo.list,
        matchId: a.battleInfo.matchId,
        deckMinNumList: a.specialRuleInfo.deckMinNumList,
        deckMaxNumList: a.specialRuleInfo.deckMaxNumList,
        spPlusList: a.specialRuleInfo.plusList,
        isEnableDefenseDeck: a.userInfo.isEnableDefenseDeck,
        isOpenPopup: !1,
        openTimeOverPopup: !1,
        isDeckEditTimeOver: !1,
        deckEditAccessTime: !1,
        deckEditPageJson: !1,
        isDeckEditCountDownContinue: !1
      }
    },
    n = function(a)
    {
      var e = a.pageModel,
        c = a.callback;
      a = a.isForceOpen;
      var d = parseInt(localStorage.getItem("arenaRankMatchId")),
        e = parseInt(e.eventInfo.regularEventId);
      d && d == e || (localStorage.setItem("arenaRankMatchId", e.toString()), a = !0);
      a && (b.eventFirstNavi(["navi_01", "navi_02", "navi_03", "navi_04"], e, "arenaRankMatch", function()
      {
        b.EventArenaRankMatchPrm.isOpenPopup = !1;
        b.EventArenaRankMatchPrm.openTimeOverPopup && b.EventArenaRankMatchPrm.openTimeOverPopup();
        c && c()
      }), b.EventArenaRankMatchPrm.isOpenPopup = !0)
    },
    C = function()
    {
      d = h.getPageJson();
      b.setStyle(t);
      k.changeBg("web_0014.ExportJson");
      k.startBgm("bgm03_story15");
      q.createCardList();
      var a = u.getTopModel(
      {
        pageJson: d
      });
      B(
      {
        pageModel: a
      });
      g && g.timer && g.timer.stop();
      c = {};
      c.pageView = new A(
      {
        model: a
      });
      b.setGlobalView();
      v.init(
      {
        model: a,
        pageJson: d,
        callback: function()
        {
          n(
          {
            pageModel: a,
            callback: function()
            {
              m.openPopup(
              {
                ruleList: a.specialRuleInfo.list,
                callback: function()
                {
                  a.userInfo.isEnableDefenseDeck || z.open(
                  {})
                }
              })
            }
          })
        }
      });
      b.historyArr = ["MyPage", "ArenaTop", "RegularEventArenaRankMatchTop"]
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
      id: "userArenaBattle"
    },
    {
      id: "userCardList"
    },
    {
      id: "userDeckList"
    },
    {
      id: "userCharaList"
    },
    {
      id: "userPieceList"
    },
    {
      id: "userPieceSetList"
    },
    {
      id: "userLive2dList"
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
      id: "userDoppelList"
    }],
    fetch: function()
    {
      h.pageModelGet(this.needModelIdObj, null)
    },
    init: function()
    {
      C()
    },
    remove: function(a)
    {
      f.each(c, function(a, b, c)
      {
        a.removeView && a.removeView();
        a.length && f.each(a, function(a, b, c)
        {
          a.removeView && a.removeView()
        })
      });
      c = null;
      a()
    }
  }
});
