define("underscore backbone backboneCommon command ajaxControl QuestUtil memoriaUtil".split(" "), function(f, q, l, r, t, p, n)
{
  var k = {
    pointTypeList: ["eyesight", "hearing", "smell", "taste", "touch"],
    getEventMaster: function(a)
    {
      var c = a.pageJson,
        b, d = function(a)
        {
          if (b) return b;
          var c = a.eventInfo;
          a = a.currentTime;
          var h;
          c && "WITCH" == c.eventType && (h = c, h.pageInfo = {
            sectionList:
            {
              normalSectionId: Number(c.parameterMap.NORMALSECTIONID),
              subSectionId: Number(c.parameterMap.SUBSECTIONID),
              challengeSectionId: Number(c.parameterMap.CHALLENGESECTIONID)
            },
            bgm: c.viewParameterMap.BGM,
            subItemId: c.viewParameterMap.SUBITEMID
          }, h.termStatus = "close", l.getStatusTargetTermInCurrentTime(
          {
            startAt: h.startAt,
            endAt: h.endAt,
            currentTime: a
          }) ? h.termStatus = "canPlay" : l.getStatusTargetTermInCurrentTime(
          {
            startAt: h.endAt,
            endAt: h.closeAt,
            currentTime: a
          }) && (h.termStatus = "exchangeOnly"), h.isOpen = !1, l.getStatusTargetTermInCurrentTime(
          {
            startAt: h.startAt,
            endAt: h.closeAt,
            currentTime: a
          }) && (h.isOpen = !0));
          return h
        };
      f.each(c.eventList, function(a, f, h)
      {
        b = d(
        {
          eventInfo: a,
          currentTime: c.currentTime
        })
      });
      b || (b = d(
      {
        eventInfo: c.eventWitchMaster,
        currentTime: c.currentTime
      }));
      return b
    },
    IsEventWitchSection: function(a)
    {
      var c = a.section,
        b = !1;
      (a = k.getEventMaster(
      {
        pageJson: a.pageJson
      })) && f.each(a.pageInfo.sectionList, function(a, g, f)
      {
        a == c.sectionId && (b = !0)
      });
      return b
    },
    getEventWitchBattleInfo: function(a)
    {
      var c = a.questBattle,
        b = c.sectionId;
      a = a.pageJson;
      var d = {
          isGaugeBattle: !1
        },
        g = k.getEventMaster(
        {
          pageJson: a
        });
      g && g.pageInfo.sectionList.normalSectionId == b && (d.isGaugeBattle = !0, d.pointType = k.getPointType(
      {
        questBattle: c
      }), d.factorItemIdList = k.getFactorItemIdList(
      {
        eventWitch: a.eventWitch
      }));
      return d
    },
    getFactorItemIdList: function(a)
    {
      var c = a.eventWitch,
        b = [];
      f.each(k.pointTypeList, function(a, g, e)
      {
        f.each(c, function(c, d, g)
        {
          a + "ItemId" == d && b.push(c)
        })
      });
      return b
    },
    getPointType: function(a)
    {
      a = a.questBattle;
      var c = "";
      1 == a.sectionIndex ? c = "eyesight" : 2 == a.sectionIndex ? c = "hearing" : 3 == a.sectionIndex ? c = "smell" : 4 == a.sectionIndex ? c = "taste" : 5 == a.sectionIndex && (c = "touch");
      return c
    },
    getFactorInfo: function(a)
    {
      var c = [];
      f.each(a.infoList, function(a, d, g)
      {
        ~String(d).indexOf("Factor") && (a = {
          type: d.replace("Factor", ""),
          val: a
        }, c.push(a))
      });
      return c
    },
    startQuest: function(a)
    {
      var c = a.questBattleModel,
        b = a.sectionModel,
        d = a.userQuestAdventureList;
      l.questBattleModel = k.getCommonQuestBattleModel(
      {
        questBattleModel: c,
        sectionModel: b,
        userQuestAdventureList: d,
        factorItemIdList: a.factorItemIdList
      });
      k.isEnoughAP(
      {
        needAP: l.questBattleModel.ap
      }) ? location.href = "#/SupportSelect" : l.globalMenuView.apPopup(null, "APが不足しています", function()
      {
        k.startQuest(
        {
          questBattleModel: c,
          sectionModel: b,
          userQuestAdventureList: d
        })
      })
    },
    getCommonQuestBattleModel: function(a)
    {
      var c = a.sectionModel,
        b = a.questBattleModel,
        d = a.userQuestAdventureList,
        g = a.factorItemIdList;
      b.missionRewardCode = {
        itemCode: "",
        rewardType: ""
      };
      b.chestColor = "bronze_close";
      b.questBattle.missionRewardCode && (b.missionRewardCode = l.itemSet(b.questBattle.missionRewardCode), b.chestColor = b.missionRewardCode.chestColor);
      "NONE" == b.questBattle.questBattleType && f.each([1, 2, 3], function(a, c, h)
      {
        b.questBattle["missionMaster" + a] = {
          description: ""
        }
      });
      var e = c.section;
      b.questType = e.questType;
      b.chapterNoForView = "-";
      b.noDispStoryNum = !0;
      b.genericIndex = e.genericIndex;
      b.title = e.title;
      b.battleTitle = "-";
      b.userQuestAdventureList = d;
      e.secret && (b.secret = e.secret);
      b.ap = function()
      {
        var a = e.ap;
        b.questBattle.ap && (a = b.questBattle.ap);
        b.overwriteAp && (a = b.overwriteAp);
        b.campaignFreeAtNotClear && (a = 0);
        return a
      }();
      b.difficulty = e.difficulty ? e.difficulty : b.questBattle.difficulty;
      b.rewardCodeArr = [];
      a = p.dropItemJson(b);
      var h = [];
      f.each(a.list, function(a, b, c)
      {
        var d = !1;
        f.each(g, function(b, c, h)
        {
          ~a.indexOf(b.toLowerCase()) && (d = !0)
        });
        d || h.push(a)
      });
      a.list = h;
      a.firstClearReward && (b.firstClearReward = a.firstClearReward);
      a.firstClearRewardName && (b.firstClearRewardName = a.firstClearRewardName);
      a.firstClearRewardQuantity && (b.firstClearRewardQuantity = a.firstClearRewardQuantity);
      a.addDropItem && (b.addDropItem = a.addDropItem);
      a.addDropItemName && (b.addDropItemName = a.addDropItemName);
      a.addDropItemQuantity && (b.addDropItemQuantity = a.addDropItemQuantity);
      b.rewardCodeArr = a.list;
      b.rewardNameArr = a.nameList;
      b.rewardQuantityArr = a.quantityList;
      return b
    },
    isEnoughAP: function(a)
    {
      a = a.needAP;
      var c = l.globalMenuView.getUserStatus().ACP,
        b = !1;
      a && c >= a && (b = !0);
      0 == a && (b = !0);
      return b
    },
    getOverwriteApInfo: function(a)
    {
      var c = a.campaignData,
        b = a.sectionModel,
        d = a.questBattleModel,
        g = null,
        e = !1;
      c && (c.FREE_AT_NOT_CLEAR && (0 < c.FREE_AT_NOT_CLEAR.sectionIds.length && 0 <= c.FREE_AT_NOT_CLEAR.sectionIds.indexOf(String(b.sectionId)) ? e = !0 : 0 < c.FREE_AT_NOT_CLEAR.chapterIds.length && 0 <= c.FREE_AT_NOT_CLEAR.chapterIds.indexOf(String(b.section.genericId)) ? e = !0 : !e && c.FREE_AT_NOT_CLEAR.questType && f.each(c.FREE_AT_NOT_CLEAR.questType, function(a, c)
      {
        if ("ALL" === a || a == b.section.questType) e = !0
      })), c.HALF_AP && f.each(c.HALF_AP.questType, function(a, f)
      {
        if ("MAIN" == a || "SUB" == a) a == b.section.questType && (0 <= c.HALF_AP.chapterIds.indexOf(String(b.section.genericId)) || 0 === c.HALF_AP.chapterIds.length) && (g = Math.ceil(b.section.ap / 2), d.questBattle.ap && (g = Math.ceil(d.questBattle.ap / 2)));
        else if ("ALL" == a || a == b.section.questType) g = Math.ceil(b.section.ap / 2), d.questBattle.ap && (g = Math.ceil(d.questBattle.ap / 2))
      }));
      a = {};
      a.halfAp = g;
      a.freeAtNotClear = e;
      return a
    },
    getEventCharaInfo: function(a)
    {
      var c = a.pageType;
      c || (c = "top");
      var b = a.eventWitch,
        d = a.userItemList,
        g = [];
      f.each(a.eventWitchCharaList, function(a, e, u)
      {
        e = {
          eventId: a.eventId,
          charaId: a.charaId,
          pageType: c,
          targetPoint: a.targetValue,
          rewardPieceId: a.rewardPieceId,
          storyId: a.storyId,
          factorUpList: k.getFactorInfo(
          {
            infoList: a
          })
        };
        var h = k.pointTypeList,
          m = 0;
        f.each(b, function(b, c, g)
        {
          f.each(d, function(d, g, e)
          {
            f.each(h, function(g, e, h)
            {
              b == d.itemId && c == g + "ItemId" && f.each(a, function(a, b, c)
              {
                b == g + "Factor" && (m += d.quantity * a)
              })
            })
          })
        });
        e.currentPoint = m;
        e.currentRatio = Math.floor(m / a.targetValue * 100);
        100 <= e.currentRatio && (e.currentRatio = 100);
        e.beforeRatio = 0;
        l.EventWitchPrm && l.EventWitchPrm.beforeRatioList && l.EventWitchPrm.beforeRatioList["charaId" + a.charaId] && (e.beforeRatio = l.EventWitchPrm.beforeRatioList["charaId" + a.charaId]);
        k.getRatioAngle(
        {
          ratioObj: e
        });
        g.push(e)
      });
      var e = k.getEachTypeUpList(
      {
        eventCharaInfo: g
      });
      f.each(g, function(a, b, c)
      {
        a.factorUpList = [];
        f.each(e, function(b, c, d)
        {
          f.each(b, function(b, c, d)
          {
            b.charaId == a.charaId && a.factorUpList.push(b)
          })
        })
      });
      return g
    },
    getRatioAngle: function(a)
    {
      a = a.ratioObj;
      a.currentRatioAngle = Math.round(3.6 * a.currentRatio);
      a.beforeRatioAngle = Math.round(3.6 * a.beforeRatio);
      a.currentRatioAngleL = Math.round(3.6 * (a.currentRatio - 50));
      a.beforeRatioAngleL = Math.round(3.6 * (a.beforeRatio - 50))
    },
    openFirstNavi: function(a)
    {
      var c = a.eventId,
        b = a.isForceOpen,
        d = a.callback;
      localStorage.getItem("WatchEventWitchOpenFirstNavi") != c && (localStorage.setItem("WatchEventWitchOpenFirstNavi", c), b = !0);
      b ? l.eventFirstNavi(["navi_01", "navi_02", "navi_03", "navi_04"], c, "eventWitch", function()
      {
        d && d()
      }, null, "event") : d && d()
    },
    getSubItemInfo: function(a)
    {
      var c = a.eventMaster;
      a = a.pageJson;
      var b = !1;
      if (c && a && a.userItemList)
      {
        var d = c.viewParameterMap.SUBITEMID;
        f.each(a.userItemList, function(a, c, f)
        {
          a.itemId == d && (b = a)
        })
      }
      return b
    },
    getBeforeRatioList: function(a)
    {
      var c = {};
      f.each(a.eventCharaInfo, function(a, d, g)
      {
        c["charaId" + a.charaId] = a.currentRatio
      });
      return c
    },
    getEachTypeUpList: function(a)
    {
      var c = a.eventCharaInfo,
        b = {};
      f.each(k.pointTypeList, function(a, d, h)
      {
        var e = [];
        f.each(c, function(b, c, d)
        {
          f.each(b.factorUpList, function(c, d, f)
          {
            c.type == a && (c.charaId = b.charaId, e.push(c))
          })
        });
        b[a] = e
      });
      f.each(b, function(a, b, c)
      {
        a.sort(function(a, b)
        {
          return b.val - a.val
        })
      });
      var d = {
        1: "3",
        2: "2",
        3: "1",
        4: "1",
        5: "1",
        6: "1",
        7: "1",
        8: "1",
        9: "1",
        10: "1"
      };
      f.each(b, function(a, b, c)
      {
        var e = 1,
          g;
        f.each(a, function(b, c, h)
        {
          var k = !1;
          g || (g = b.val);
          f.each(a, function(a, c, f)
          {
            b.iconName || a.iconName || (b.val != a.val || k ? k = !0 : (g != b.val && (e += 1), b.iconName = "arrow_" + d[e], g = b.val))
          })
        })
      });
      return b
    },
    getMemoriaMaxStatus: function(a)
    {
      a = a.memoriaInfo;
      var c = n.getMaxLevel(a.rank, 4);
      return n.getParam(
      {
        piece: a
      }, c)
    },
    getEventWitchCampaign: function(a)
    {
      var c = a.campaignInfo,
        b = !1;
      !k.getEventMaster(
      {
        pageJson: a.pageJson
      }) && c.parameterMap && c.parameterMap.EVENTTYPE && "WITCH" == c.parameterMap.EVENTTYPE && (b = !0);
      return b
    }
  };
  return k
});
