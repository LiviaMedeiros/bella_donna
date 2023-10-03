define("underscore backbone backboneCommon ajaxControl command text!template/quest/puellaHistoria/lastBattle/QuestResultSubBoss.html text!css/quest/PuellaHistoriaLastBattle/QuestResultSubBoss.css js/quest/puellaHistoria/lastBattle/Utility".split(" "), function(f, m, a, h, d, n, p, q)
{
  var g, k = {},
    e = {},
    r = m.View.extend(
    {
      events: function()
      {
        var b = {};
        b["webkitAnimationEnd .rippleObj_1"] = this.rippleObj1;
        b["webkitAnimationEnd .rippleObj_2"] = this.rippleObj2;
        b["webkitAnimationEnd .rippleObj_3"] = this.rippleObj3;
        b["webkitAnimationEnd .rippleObj_4"] = this.rippleObj4;
        b["webkitAnimationEnd .rippleObj_5"] = this.rippleObj5;
        b["webkitAnimationEnd .rewardDPBase"] = this.rewardDPBase;
        b["webkitAnimationEnd .rewardItemContent"] = this.touchScreen;
        b[a.cgti + " .retryBtn"] = this.retryBtn;
        b[a.cgti + " #touchScreen"] = this.movePage;
        return b
      },
      initialize: function(a)
      {
        this.template = f.template(n);
        a = this.model;
        a.rewardItemNum = 1;
        a.retryBtnClass = "noRetry";
        a.isRetry && (a.retryBtnClass = "");
        this.createDom()
      },
      render: function()
      {
        var b = this.model;
        e = q.getQuestResultDP(
        {
          groupRaidPrm: a.PuellaHistoriaLastBattleGroupRaidPrm,
          pageJson: b.pageJson
        });
        this.model.dpInfo = {};
        this.model.dpInfo.beforeDPNumText = String(e.getDP.toLocaleString());
        this.model.dpInfo.afterDPNumText = String(e.afterDP.toLocaleString());
        var c = 0;
        a.PuellaHistoriaLastBattleGroupRaidPrm && a.PuellaHistoriaLastBattleGroupRaidPrm.bossUseItemQuantity && (c = a.PuellaHistoriaLastBattleGroupRaidPrm.bossUseItemQuantity);
        var d = localStorage.getItem("puellaHistoriaLastBattleBossUseItemQuantity");
        0 == c && d && (c = d);
        b.bossUseItemQuantity = c;
        this.$el.html(this.template(
        {
          model: b
        }));
        return this
      },
      createDom: function()
      {
        a.content.append(this.render().el);
        a.ready.hide();
        this.setSE("SE1")
      },
      rippleObj1: function()
      {
        a.addClass(a.doc.getElementsByClassName("rippleObj_1")[0], "rotate")
      },
      rippleObj2: function()
      {
        a.addClass(a.doc.getElementsByClassName("rippleObj_2")[0], "rotate")
      },
      rippleObj3: function()
      {
        a.addClass(a.doc.getElementsByClassName("rippleObj_3")[0], "rotate")
      },
      rippleObj4: function()
      {
        a.addClass(a.doc.getElementsByClassName("rippleObj_4")[0], "rotate")
      },
      rippleObj5: function()
      {
        a.addClass(a.doc.getElementsByClassName("rippleObj_5")[0], "rotate")
      },
      rewardDPBase: function()
      {
        this.setSE("SE2")
      },
      setSE: function(a)
      {
        switch (a)
        {
          case "SE1":
            setTimeout(function()
            {
              d.startSe(1005)
            }, 3800);
            break;
          case "SE2":
            setTimeout(function()
            {
              d.startSe(1306)
            }, 400), setTimeout(function()
            {
              d.startSe(1001)
            }, 1300)
        }
      },
      touchScreen: function()
      {
        a.addClass(a.doc.getElementById("touchScreen"), "on")
      },
      retryBtn: function(b)
      {
        b.preventDefault();
        !a.isScrolled() && this.model.isRetry && (d.changeBg(a.background), d.endQuest(), a.historyArr.push("EventPuellaRaidTop"), a.PuellaHistoriaLastBattleGroupRaidPrm.beforeDP = e.afterDP, location.href = "#/DeckFormation/puellaHistoriaGroupRaid")
      },
      movePage: function(b)
      {
        b.preventDefault();
        a.isScrolled() || (location.href = "#/EventPuellaRaidTop")
      },
      removeView: function()
      {
        this.off();
        this.remove()
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
      id: "userGiftList"
    },
    {
      id: "pieceList"
    },
    {
      id: "userPieceList"
    },
    {
      id: "userPieceSetList"
    },
    {
      id: "userItemList"
    },
    {
      id: "userFollowList"
    },
    {
      id: "userTitleList"
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
      id: "itemList"
    },
    {
      id: "giftList"
    },
    {
      id: "userDailyChallengeList"
    },
    {
      id: "userTotalChallengeList"
    },
    {
      id: "userLimitedChallengeList"
    },
    {
      id: "userQuestAdventureList"
    },
    {
      id: "userLive2dList"
    },
    {
      id: "userPatrolList"
    },
    {
      id: "userEventPuellaRaid",
      refresh: !0
    }],
    fetch: function()
    {
      h.pageModelGet(this.needModelIdObj, null)
    },
    init: function()
    {
      var b = h.getPageJson();
      a.androidKeyStop = !0;
      a.strSupportPickUpUserIds = "";
      a.supportUserList = null;
      g = a.questNativeResponse;
      a.setStyle(p);
      d.changeBg("web_PuellaHistoria_19094_01.ExportJson");
      a.historyArr = ["MyPage"];
      var c;
      c = g;
      var e = !0;
      if (a.questBattleModel && c && c.userQuestBattleResultList[0])
      {
        var l = a.questBattleModel.overwriteAp ? Number(a.questBattleModel.overwriteAp) : a.questBattleModel.ap,
          f = a.storage.userStatusList.findWhere(
          {
            statusId: "ACP"
          }).toJSON().point;
        l && f < l && (e = !1);
        a.storage.userSectionList.findWhere(
        {
          sectionId: c.userQuestBattleResultList[0].questBattle.sectionId
        }) || (e = !1);
        c = e
      }
      else c = !1;
      k.pageView = new r(
      {
        model:
        {
          nativeJSON: g,
          isRetry: c,
          pageJson: b
        }
      });
      d.setWebView()
    },
    remove: function(b)
    {
      $("#commandDiv").off();
      a.androidKeyStop = !1;
      g = a.questNativeResponse = null;
      f.each(k, function(a, b, d)
      {
        a.removeView && a.removeView()
      });
      b()
    }
  }
});
