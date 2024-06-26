define(["underscore", "backbone", "backboneCommon", "QuestUtil", "js/quest/puellaHistoria/CreateModel"], function(d, n, e, m, l)
{
  var k = {
    getEventMaster: function(a)
    {
      var c = a.pageJson,
        b;
      d.each(c.eventList, function(a, g, d)
      {
        g = c.currentTime;
        var h;
        a && "WALPURGIS" == a.eventType && (h = a, h.pageInfo = {
          sectionList:
          {
            eventSectionId: Number(a.viewParameterMap.EVENTSECTIONID)
          },
          bgm: a.viewParameterMap.BGM
        }, h.isOpen = !1, e.getStatusTargetTermInCurrentTime(
        {
          startAt: h.startAt,
          endAt: h.endAt,
          currentTime: g
        }) && (h.isOpen = !0));
        b = h
      });
      return b
    },
    getAfterBattleUrl: function(a)
    {
      var c = a.section,
        b = {
          isOpen: !1,
          resultUrl: "/magica/index.html#/QuestResult",
          retireUrl: "/magica/index.html#/MainQuest"
        };
      (a = k.getEventMaster(
      {
        pageJson: a.pageJson
      })) && c.sectionId == a.pageInfo.sectionList.eventSectionId && (b = {
        isOpen: !0,
        resultUrl: "/magica/index.html#/EventWalpurgisRaidQuestResultSubBoss",
        retireUrl: "/magica/index.html#/EventWalpurgisRaidTop"
      }, e.EventWalpurgisRaidPrm && "main" == e.EventWalpurgisRaidPrm.battleType && (b.resultUrl = "/magica/index.html#/EventWalpurgisRaidQuestResultMainBoss"));
      return b
    },
    getDeckType: function(a)
    {
      return 110
    },
    getCommonQuestBattleModel: function(a)
    {
      var c = a.sectionModel,
        b = a.questBattleModel;
      a = a.userQuestAdventureList;
      b.missionRewardCode = {
        itemCode: "",
        rewardType: ""
      };
      b.chestColor = "bronze_close";
      b.questBattle.missionRewardCode && (b.missionRewardCode = e.itemSet(b.questBattle.missionRewardCode), b.chestColor = b.missionRewardCode.chestColor);
      "NONE" == b.questBattle.questBattleType && d.each([1, 2, 3], function(a, c, h)
      {
        b.questBattle["missionMaster" + a] = {
          description: ""
        }
      });
      var f = c.section;
      b.questType = f.questType;
      b.chapterNoForView = f.chapterNoForView;
      b.genericIndex = f.genericIndex;
      b.title = f.title;
      b.battleTitle = "BATTLE " + b.battleNo;
      b.userQuestAdventureList = a;
      f.secret && (b.secret = f.secret);
      b.ap = function()
      {
        var a = f.ap;
        b.questBattle.ap && (a = b.questBattle.ap);
        b.overwriteAp && (a = b.overwriteAp);
        b.campaignFreeAtNotClear && (a = 0);
        return a
      }();
      b.difficulty = f.difficulty ? f.difficulty : b.questBattle.difficulty;
      c = l.getIsPuellaHistoriaInfo(
      {
        sectionInfo: c
      });
      c.isPuellaHistoria && (b.chapterNoForView = "-");
      !c.num || 991 != c.num && 993 != c.num || (b.noDispStoryNum = !0);
      b.rewardCodeArr = [];
      c = m.dropItemJson(b);
      c.firstClearReward && (b.firstClearReward = c.firstClearReward);
      c.firstClearRewardName && (b.firstClearRewardName = c.firstClearRewardName);
      c.firstClearRewardQuantity && (b.firstClearRewardQuantity = c.firstClearRewardQuantity);
      c.addDropItem && (b.addDropItem = c.addDropItem);
      c.addDropItemName && (b.addDropItemName = c.addDropItemName);
      c.addDropItemQuantity && (b.addDropItemQuantity = c.addDropItemQuantity);
      b.rewardCodeArr = c.list;
      b.rewardNameArr = c.nameList;
      b.rewardQuantityArr = c.quantityList;
      return b
    },
    isEnoughAP: function(a)
    {
      a = a.needAP;
      var c = e.globalMenuView.getUserStatus().ACP,
        b = !1;
      a && c >= a && (b = !0);
      0 == a && (b = !0);
      return b
    },
    getGroupRaidQuestInfo: function(a)
    {
      a = a.pageJson;
      var c = {
        sectionInfoList: [],
        questInfoList:
        {
          boss:
          {},
          subBossList: []
        }
      };
      a = l.getPuellaHistoriaInfo(
      {
        puellaHistoriaNum: k.getPuellaHistoriaLastBattleNum(
        {
          type: "groupRaid"
        }),
        pageJson: a
      });
      c.sectionInfoList = a.sectionInfoList;
      d.each(a.questInfoList, function(b, a, g)
      {
        4 == b.questBattle.sectionIndex ? c.questInfoList.boss = b : c.questInfoList.subBossList.push(b)
      });
      return c
    },
    startQuest: function(a)
    {
      var c = a.battleType,
        b = a.questBattleModel,
        f = a.sectionModel,
        g = a.userQuestAdventureList,
        d = a.isUseItem;
      e.questBattleModel = k.getCommonQuestBattleModel(
      {
        questBattleModel: b,
        sectionModel: f,
        userQuestAdventureList: g
      });
      k.isEnoughAP(
      {
        needAP: e.questBattleModel.ap
      }) ? (e.EventWalpurgisRaidPrm.battleType = "sub", c && (e.EventWalpurgisRaidPrm.battleType = c), e.EventWalpurgisRaidPrm.isUseItem = d, location.href = "#/DeckFormation/EventWalpurgisRaid") : e.globalMenuView.apPopup(null, "APが不足しています", function()
      {
        k.startQuest(
        {
          battleType: c,
          questBattleModel: b,
          sectionModel: f,
          userQuestAdventureList: g,
          isUseItem: d
        })
      })
    },
    openFirstNavi: function(a)
    {
      var c = a.eventId;
      a = a.isForceOpen;
      localStorage.getItem("eventWalpurgisOpenFirstNavi") || (localStorage.setItem("eventWalpurgisOpenFirstNavi", "true"), a = !0);
      a && e.eventFirstNavi(["navi_01", "navi_02", "navi_03"], c, "eventWalpurgis", function() {}, null, "eventWalpurgis")
    },
    setQuestBeforeDP: function(a)
    {
      localStorage.setItem("EventWalpurgisBeforeDP", Number(a.groupRaidPrm.beforeDP))
    },
    setBossUseItemQuantity: function(a)
    {
      localStorage.setItem("EventWalpurgisBossUseItemQuantity", Number(a.groupRaidPrm.bossUseItemQuantity))
    },
    getQuestResultDP: function(a)
    {
      var c = a.groupRaidPrm;
      a = a.pageJson;
      var b = {
        beforeDP: 0,
        afterDP: 0,
        getDP: 0
      };
      c && c.beforeDP && (b.beforeDP = Number(c.beforeDP));
      if (c = localStorage.getItem("EventWalpurgisBeforeDP")) b.beforeDP = Number(c);
      a && a.userEventPuellaRaid && (b.afterDP = Number(a.userEventPuellaRaid.totalDevotionPoint));
      b.beforeDP <= b.afterDP && (b.getDP = b.afterDP - b.beforeDP);
      return b
    },
    isJoinEvent: function(a)
    {
      a = a.userQuestAdventureList;
      var c = k.getStoryIdList().event[8].storyId,
        b = !1;
      d.each(a, function(a, d, e)
      {
        a.adventureId == c && (b = !0)
      });
      return b
    },
    isConstantLastBattleQuestBattleId: function(a)
    {
      var c = !1;
      1041021 == a.questBattleId && (c = !0);
      return c
    },
    getOverwriteApInfo: function(a)
    {
      var c = a.campaignData,
        b = a.sectionModel,
        f = a.questBattleModel,
        g = null,
        e = !1;
      c && (c.FREE_AT_NOT_CLEAR && (0 < c.FREE_AT_NOT_CLEAR.sectionIds.length && 0 <= c.FREE_AT_NOT_CLEAR.sectionIds.indexOf(String(b.sectionId)) ? e = !0 : 0 < c.FREE_AT_NOT_CLEAR.chapterIds.length && 0 <= c.FREE_AT_NOT_CLEAR.chapterIds.indexOf(String(b.section.genericId)) ? e = !0 : !e && c.FREE_AT_NOT_CLEAR.questType && d.each(c.FREE_AT_NOT_CLEAR.questType, function(a, c)
      {
        if ("ALL" === a || a == b.section.questType) e = !0
      })), c.HALF_AP && d.each(c.HALF_AP.questType, function(a, d)
      {
        if ("MAIN" == a || "SUB" == a) a == b.section.questType && (0 <= c.HALF_AP.chapterIds.indexOf(String(b.section.genericId)) || 0 === c.HALF_AP.chapterIds.length) && (g = Math.ceil(b.section.ap / 2), f.questBattle.ap && (g = Math.ceil(f.questBattle.ap / 2)));
        else if ("ALL" == a || a == b.section.questType) g = Math.ceil(b.section.ap / 2), f.questBattle.ap && (g = Math.ceil(f.questBattle.ap / 2))
      }));
      a = {};
      a.halfAp = g;
      a.freeAtNotClear = e;
      return a
    },
    getQuestInfo: function(a)
    {
      var c = a.pageJson,
        b = {
          sectionInfoList: [],
          questInfoList: []
        },
        f = a.eventMaster.pageInfo.sectionList;
      d.each(c.userSectionList, function(a, c, e)
      {
        var h = a.section;
        d.each(f, function(c, d, e)
        {
          h.sectionId == c && b.sectionInfoList.push(a)
        })
      });
      b.sectionInfoList.sort(function(a, b)
      {
        return a.sectionId - b.sectionId
      });
      var g = [];
      d.each(b.sectionInfoList, function(a, b, e)
      {
        g[b] = [];
        d.each(c.userQuestBattleList, function(c, h, d)
        {
          a.sectionId == c.questBattle.sectionId && (a.section && a.section.secret && (c.secret = a.section.secret), !c.questBattle.ap && a.section.ap && (c.questBattle.ap = a.section.ap), !c.questBattle.difficulty && a.section.difficulty && (c.questBattle.difficulty = a.section.difficulty), g[b].push(c))
        })
      });
      d.each(g, function(a, b, c)
      {
        a.sort(function(a, b)
        {
          return a.questBattleId - b.questBattleId
        })
      });
      d.each(g, function(a, c, e)
      {
        d.each(a, function(a, c, d)
        {
          b.questInfoList.push(a)
        })
      });
      var l = e.campaignParse(c.campaignList);
      d.each(b.questInfoList, function(a, c, e)
      {
        d.each(b.sectionInfoList, function(b, c, d)
        {
          a.questBattle.sectionId == b.sectionId && (b = k.getOverwriteApInfo(
          {
            campaignData: l,
            sectionModel: b,
            questBattleModel: a
          }), b.halfAp && (a.halfAp = b.halfAp, a.overwriteAp = b.halfAp), b.freeAtNotClear && (a.campaignFreeAtNotClear = b.freeAtNotClear, a.overwriteAp = 0))
        })
      });
      b.questInfoList.boss;
      b.questInfoList.subBossList = [];
      d.each(b.questInfoList, function(a, c, d)
      {
        4 == a.questBattle.sectionIndex ? b.questInfoList.boss = a : b.questInfoList.subBossList.push(a)
      });
      return b
    }
  };
  return k
});
