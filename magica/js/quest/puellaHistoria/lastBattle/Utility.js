define(["underscore", "backbone", "backboneCommon", "QuestUtil", "js/quest/puellaHistoria/CreateModel"], function(g, n, e, m, h)
{
  var f = {
    getPuellaHistoriaLastBattleNum: function(a)
    {
      a = a.type;
      var c = 991;
      "groupRaid" == a && (c = 992);
      "singleRaidLast" == a && (c = 993);
      return c
    },
    getDeckType: function(a)
    {
      return 110
    },
    getStoryIdList: function()
    {
      return {
        event: [
        {
          num: 1,
          storyId: "519810-0",
          storyTitle: "1話"
        },
        {
          num: 2,
          storyId: "104101-1",
          storyTitle: "2話",
          secret: "KaoO4"
        },
        {
          num: 3,
          storyId: "104101-2",
          storyTitle: "3話",
          secret: "KaoO4"
        },
        {
          num: 4,
          storyId: "104101-3",
          storyTitle: "4話",
          secret: "KaoO4"
        },
        {
          num: 5,
          storyId: "104101-4",
          storyTitle: "5話",
          secret: "KaoO4"
        },
        {
          num: 6,
          storyId: "104101-5",
          storyTitle: "6話",
          secret: "KaoO4"
        },
        {
          num: 7,
          storyId: "104101-6",
          storyTitle: "7話",
          secret: "KaoO4"
        },
        {
          num: 8,
          storyId: "104101-7",
          storyTitle: "8話",
          secret: "KaoO4"
        },
        {
          num: 9,
          storyId: "519810-1",
          storyTitle: "9話"
        },
        {
          num: 10,
          storyId: "519810-2",
          storyTitle: "Epilogue"
        }],
        special: [
        {
          num: 1,
          storyId: "519810-11_YcZ2I",
          charaId: 1045,
          storyTitle: "水名 露"
        },
        {
          num: 2,
          storyId: "519810-12_YcZ2I",
          charaId: 1046,
          storyTitle: "千鶴"
        },
        {
          num: 3,
          storyId: "519810-13_YcZ2I",
          charaId: 1048,
          storyTitle: "エボニー"
        },
        {
          num: 4,
          storyId: "519810-14_YcZ2I",
          charaId: 1049,
          storyTitle: "オルガ"
        },
        {
          num: 5,
          storyId: "519810-15_YcZ2I",
          charaId: 1050,
          storyTitle: "ガンヒルト"
        },
        {
          num: 6,
          storyId: "519810-16_YcZ2I",
          charaId: 1051,
          storyTitle: "ヘルカ"
        },
        {
          num: 7,
          storyId: "519810-17_YcZ2I",
          charaId: 1052,
          storyTitle: "トヨ"
        },
        {
          num: 8,
          storyId: "519810-18_YcZ2I",
          charaId: 1053,
          storyTitle: "アマリュリス"
        }]
      }
    },
    getSingleRaidQuestInfo: function(a)
    {
      a = a.pageJson;
      var c = {},
        c = h.getPuellaHistoriaInfo(
        {
          puellaHistoriaNum: f.getPuellaHistoriaLastBattleNum(
          {
            type: "singleRaid"
          }),
          pageJson: a
        }),
        b = h.getPuellaHistoriaInfo(
        {
          puellaHistoriaNum: f.getPuellaHistoriaLastBattleNum(
          {
            type: "singleRaidLast"
          }),
          pageJson: a
        });
      g.each(b.sectionInfoList, function(b, a, d)
      {
        c.sectionInfoList.push(b)
      });
      g.each(b.questInfoList, function(b, a, d)
      {
        c.questInfoList.push(b)
      });
      var d = e.campaignParse(a.campaignList);
      g.each(c.questInfoList, function(b, a, l)
      {
        g.each(c.sectionInfoList, function(a, c, k)
        {
          b.questBattle.sectionId == a.sectionId && (a = f.getOverwriteApInfo(
          {
            campaignData: d,
            sectionModel: a,
            questBattleModel: b
          }), a.halfAp && (b.halfAp = a.halfAp, b.overwriteAp = a.halfAp), a.freeAtNotClear && (b.campaignFreeAtNotClear = a.freeAtNotClear, b.overwriteAp = 0))
        })
      });
      return c
    },
    isClearSingleRaid: function(a)
    {
      a = a.singleRaidQuestList;
      var c = !1,
        b = a.sectionInfoList.length;
      0 < b && a.sectionInfoList[b - 1].cleared && (c = !0);
      return c
    },
    isClearCommonStory: function(a)
    {
      return h.isCommonStoryLastAlreadyWatch(
      {
        commonStoryInfo: h.getPuellaHistoriaInfo(
        {
          puellaHistoriaNum: 99,
          pageJson: a.pageJson
        })
      })
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
      "NONE" == b.questBattle.questBattleType && g.each([1, 2, 3], function(a, c, d)
      {
        b.questBattle["missionMaster" + a] = {
          description: ""
        }
      });
      var d = c.section;
      b.questType = d.questType;
      b.chapterNoForView = d.chapterNoForView;
      b.genericIndex = d.genericIndex;
      b.title = d.title;
      b.battleTitle = "BATTLE " + b.battleNo;
      b.userQuestAdventureList = a;
      d.secret && (b.secret = d.secret);
      b.ap = function()
      {
        var a = d.ap;
        b.questBattle.ap && (a = b.questBattle.ap);
        b.overwriteAp && (a = b.overwriteAp);
        b.campaignFreeAtNotClear && (a = 0);
        return a
      }();
      b.difficulty = d.difficulty ? d.difficulty : b.questBattle.difficulty;
      c = h.getIsPuellaHistoriaInfo(
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
      a = h.getPuellaHistoriaInfo(
      {
        puellaHistoriaNum: f.getPuellaHistoriaLastBattleNum(
        {
          type: "groupRaid"
        }),
        pageJson: a
      });
      c.sectionInfoList = a.sectionInfoList;
      g.each(a.questInfoList, function(b, a, k)
      {
        4 == b.questBattle.sectionIndex ? c.questInfoList.boss = b : c.questInfoList.subBossList.push(b)
      });
      return c
    },
    startQuest: function(a)
    {
      var c = a.pageType,
        b = a.battleType,
        d = a.questBattleModel,
        k = a.sectionModel,
        g = a.userQuestAdventureList,
        l = a.isUseItem;
      e.questBattleModel = f.getCommonQuestBattleModel(
      {
        questBattleModel: d,
        sectionModel: k,
        userQuestAdventureList: g
      });
      f.isEnoughAP(
      {
        needAP: e.questBattleModel.ap
      }) ? ("singleRaid" == c && (location.href = "#/SupportSelect"), "groupRaid" == c && (e.PuellaHistoriaLastBattleGroupRaidPrm.battleType = "sub", b && (e.PuellaHistoriaLastBattleGroupRaidPrm.battleType = b), e.PuellaHistoriaLastBattleGroupRaidPrm.isUseItem = l, location.href = "#/DeckFormation/puellaHistoriaGroupRaid")) : e.globalMenuView.apPopup(null, "APが不足しています", function()
      {
        f.startQuest(
        {
          pageType: c,
          battleType: b,
          questBattleModel: d,
          sectionModel: k,
          userQuestAdventureList: g,
          isUseItem: l
        })
      })
    },
    openFirstNavi: function(a)
    {
      var c = a.isForceOpen,
        b = "puellaHistoriaSingleRaidOpenFirstNavi";
      "groupRaid" == a.type && (b = "puellaHistoriaGroupRaidOpenFirstNavi");
      localStorage.getItem(b) || (localStorage.setItem(b, "true"), c = !0);
      c && e.eventFirstNavi(["navi_01", "navi_02", "navi_03"], 1198, "puellaHistoriaLastBattle", function() {}, null, "puellaHistoriaLastBattle")
    },
    setQuestBeforeDP: function(a)
    {
      localStorage.setItem("puellaHistoriaLastBattleBeforeDP", Number(a.groupRaidPrm.beforeDP))
    },
    setBossUseItemQuantity: function(a)
    {
      localStorage.setItem("puellaHistoriaLastBattleBossUseItemQuantity", Number(a.groupRaidPrm.bossUseItemQuantity))
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
      if (c = localStorage.getItem("puellaHistoriaLastBattleBeforeDP")) b.beforeDP = Number(c);
      a && a.userEventPuellaRaid && (b.afterDP = Number(a.userEventPuellaRaid.totalDevotionPoint));
      b.beforeDP <= b.afterDP && (b.getDP = b.afterDP - b.beforeDP);
      return b
    },
    isJoinEvent: function(a)
    {
      a = a.userQuestAdventureList;
      var c = f.getStoryIdList().event[8].storyId,
        b = !1;
      g.each(a, function(a, g, e)
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
        d = a.questBattleModel,
        e = null,
        f = !1;
      c && (c.FREE_AT_NOT_CLEAR && (0 < c.FREE_AT_NOT_CLEAR.sectionIds.length && 0 <= c.FREE_AT_NOT_CLEAR.sectionIds.indexOf(String(b.sectionId)) ? f = !0 : 0 < c.FREE_AT_NOT_CLEAR.chapterIds.length && 0 <= c.FREE_AT_NOT_CLEAR.chapterIds.indexOf(String(b.section.genericId)) ? f = !0 : !f && c.FREE_AT_NOT_CLEAR.questType && g.each(c.FREE_AT_NOT_CLEAR.questType, function(a, c)
      {
        if ("ALL" === a || a == b.section.questType) f = !0
      })), c.HALF_AP && g.each(c.HALF_AP.questType, function(a, f)
      {
        if ("MAIN" == a || "SUB" == a) a == b.section.questType && (0 <= c.HALF_AP.chapterIds.indexOf(String(b.section.genericId)) || 0 === c.HALF_AP.chapterIds.length) && (e = Math.ceil(b.section.ap / 2), d.questBattle.ap && (e = Math.ceil(d.questBattle.ap / 2)));
        else if ("ALL" == a || a == b.section.questType) e = Math.ceil(b.section.ap / 2), d.questBattle.ap && (e = Math.ceil(d.questBattle.ap / 2))
      }));
      a = {};
      a.halfAp = e;
      a.freeAtNotClear = f;
      return a
    }
  };
  return f
});
