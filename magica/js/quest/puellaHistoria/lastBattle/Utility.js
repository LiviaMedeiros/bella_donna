define(["underscore", "backbone", "backboneCommon", "QuestUtil", "js/quest/puellaHistoria/CreateModel"], function(h, m, e, l, f)
{
  var g = {
    getPuellaHistoriaLastBattleNum: function(b)
    {
      var c = 991;
      "groupRaid" == b.type && (c = 992);
      return c
    },
    getDeckType: function(b)
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
    getSingleRaidQuestInfo: function(b)
    {
      b = b.pageJson;
      return f.getPuellaHistoriaInfo(
      {
        puellaHistoriaNum: g.getPuellaHistoriaLastBattleNum(
        {
          type: "singleRaid"
        }),
        pageJson: b
      })
    },
    isClearSingleRaid: function(b)
    {
      b = b.singleRaidQuestList;
      var c = !1,
        a = b.sectionInfoList.length;
      0 < a && b.sectionInfoList[a - 1].cleared && (c = !0);
      return c
    },
    isClearCommonStory: function(b)
    {
      return f.isCommonStoryLastAlreadyWatch(
      {
        commonStoryInfo: f.getPuellaHistoriaInfo(
        {
          puellaHistoriaNum: 99,
          pageJson: b.pageJson
        })
      })
    },
    getCommonQuestBattleModel: function(b)
    {
      var c = b.sectionModel,
        a = b.questBattleModel;
      b = b.userQuestAdventureList;
      a.missionRewardCode = {
        itemCode: "",
        rewardType: ""
      };
      a.chestColor = "bronze_close";
      a.questBattle.missionRewardCode && (a.missionRewardCode = e.itemSet(a.questBattle.missionRewardCode), a.chestColor = a.missionRewardCode.chestColor);
      "NONE" == a.questBattle.questBattleType && h.each([1, 2, 3], function(b, c, d)
      {
        a.questBattle["missionMaster" + b] = {
          description: ""
        }
      });
      var d = c.section;
      a.questType = d.questType;
      a.chapterNoForView = d.chapterNoForView;
      a.genericIndex = d.genericIndex;
      a.title = d.title;
      a.battleTitle = "BATTLE " + a.battleNo;
      a.userQuestAdventureList = b;
      d.secret && (a.secret = d.secret);
      a.ap = function()
      {
        var b = d.ap;
        a.questBattle.ap && (b = a.questBattle.ap);
        a.overwriteAp && (b = a.overwriteAp);
        a.campaignFreeAtNotClear && (b = 0);
        return b
      }();
      a.difficulty = d.difficulty ? d.difficulty : a.questBattle.difficulty;
      f.getIsPuellaHistoriaInfo(
      {
        sectionInfo: c
      }).isPuellaHistoria && (a.chapterNoForView = "-");
      a.rewardCodeArr = [];
      c = l.dropItemJson(a);
      c.firstClearReward && (a.firstClearReward = c.firstClearReward);
      c.firstClearRewardName && (a.firstClearRewardName = c.firstClearRewardName);
      c.firstClearRewardQuantity && (a.firstClearRewardQuantity = c.firstClearRewardQuantity);
      c.addDropItem && (a.addDropItem = c.addDropItem);
      c.addDropItemName && (a.addDropItemName = c.addDropItemName);
      c.addDropItemQuantity && (a.addDropItemQuantity = c.addDropItemQuantity);
      a.rewardCodeArr = c.list;
      a.rewardNameArr = c.nameList;
      a.rewardQuantityArr = c.quantityList;
      return a
    },
    isEnoughAP: function(b)
    {
      b = b.needAP;
      var c = e.globalMenuView.getUserStatus().ACP,
        a = !1;
      b && c >= b && (a = !0);
      0 == b && (a = !0);
      return a
    },
    getGroupRaidQuestInfo: function(b)
    {
      b = b.pageJson;
      var c = {
        sectionInfoList: [],
        questInfoList:
        {
          boss:
          {},
          subBossList: []
        }
      };
      b = f.getPuellaHistoriaInfo(
      {
        puellaHistoriaNum: g.getPuellaHistoriaLastBattleNum(
        {
          type: "groupRaid"
        }),
        pageJson: b
      });
      c.sectionInfoList = b.sectionInfoList;
      h.each(b.questInfoList, function(a, b, e)
      {
        4 == a.questBattle.sectionIndex ? c.questInfoList.boss = a : c.questInfoList.subBossList.push(a)
      });
      return c
    },
    startQuest: function(b)
    {
      var c = b.pageType,
        a = b.battleType,
        d = b.questBattleModel,
        f = b.sectionModel,
        h = b.userQuestAdventureList,
        k = b.isUseItem;
      e.questBattleModel = g.getCommonQuestBattleModel(
      {
        questBattleModel: d,
        sectionModel: f,
        userQuestAdventureList: h
      });
      g.isEnoughAP(
      {
        needAP: e.questBattleModel.ap
      }) ? ("singleRaid" == c && (location.href = "#/SupportSelect"), "groupRaid" == c && (e.PuellaHistoriaLastBattleGroupRaidPrm.battleType = "sub", a && (e.PuellaHistoriaLastBattleGroupRaidPrm.battleType = a), e.PuellaHistoriaLastBattleGroupRaidPrm.isUseItem = k, location.href = "#/DeckFormation/puellaHistoriaGroupRaid")) : e.globalMenuView.apPopup(null, "APが不足しています", function()
      {
        g.startQuest(
        {
          pageType: c,
          battleType: a,
          questBattleModel: d,
          sectionModel: f,
          userQuestAdventureList: h,
          isUseItem: k
        })
      })
    },
    openFirstNavi: function(b)
    {
      var c = b.isForceOpen,
        a = "puellaHistoriaSingleRaidOpenFirstNavi";
      "groupRaid" == b.type && (a = "puellaHistoriaGroupRaidOpenFirstNavi");
      localStorage.getItem(a) || (localStorage.setItem(a, "true"), c = !0);
      c && e.eventFirstNavi(["navi_01", "navi_02", "navi_03"], 1198, "puellaHistoriaLastBattle", function() {}, null, "puellaHistoriaLastBattle")
    },
    setQuestBeforeDP: function(b)
    {
      localStorage.setItem("puellaHistoriaLastBattleBeforeDP", Number(b.groupRaidPrm.beforeDP))
    },
    setBossUseItemQuantity: function(b)
    {
      localStorage.setItem("puellaHistoriaLastBattleBossUseItemQuantity", Number(b.groupRaidPrm.bossUseItemQuantity))
    },
    getQuestResultDP: function(b)
    {
      var c = b.groupRaidPrm;
      b = b.pageJson;
      var a = {
        beforeDP: 0,
        afterDP: 0,
        getDP: 0
      };
      c && c.beforeDP && (a.beforeDP = Number(c.beforeDP));
      if (c = localStorage.getItem("puellaHistoriaLastBattleBeforeDP")) a.beforeDP = Number(c);
      b && b.userEventPuellaRaid && (a.afterDP = Number(b.userEventPuellaRaid.totalDevotionPoint));
      a.beforeDP <= a.afterDP && (a.getDP = a.afterDP - a.beforeDP);
      return a
    },
    isJoinEvent: function(b)
    {
      b = b.userQuestAdventureList;
      var c = g.getStoryIdList().event[8].storyId,
        a = !1;
      h.each(b, function(b, e, f)
      {
        b.adventureId == c && (a = !0)
      });
      return a
    }
  };
  return g
});
