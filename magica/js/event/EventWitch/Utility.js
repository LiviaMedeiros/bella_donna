define("underscore backbone backboneCommon command ajaxControl QuestUtil memoriaUtil".split(" "), function(d, r, h, t, u, n, m)
{
  var k = {
    pointTypeList: ["eyesight", "hearing", "smell", "taste", "touch"],
    getEventMaster: function(a)
    {
      var c = a.pageJson,
        b;
      d.each(c.eventList, function(a, f, d)
      {
        "WITCH" == a.eventType && (b = a, b.pageInfo = {
          sectionList:
          {
            normalSectionId: Number(a.parameterMap.NORMALSECTIONID),
            subSectionId: Number(a.parameterMap.SUBSECTIONID),
            challengeSectionId: Number(a.parameterMap.CHALLENGESECTIONID)
          },
          bgm: a.viewParameterMap.BGM,
          subItemId: a.viewParameterMap.SUBITEMID
        }, b.termStatus = "close", h.getStatusTargetTermInCurrentTime(
        {
          startAt: b.startAt,
          endAt: b.endAt,
          currentTime: c.currentTime
        }) ? b.termStatus = "canPlay" : h.getStatusTargetTermInCurrentTime(
        {
          startAt: b.endAt,
          endAt: b.closeAt,
          currentTime: c.currentTime
        }) && (b.termStatus = "exchangeOnly"), b.isOpen = !1, h.getStatusTargetTermInCurrentTime(
        {
          startAt: b.startAt,
          endAt: b.closeAt,
          currentTime: c.currentTime
        }) && (b.isOpen = !0))
      });
      return b
    },
    IsEventWitchSection: function(a)
    {
      var c = a.section,
        b = !1;
      (a = k.getEventMaster(
      {
        pageJson: a.pageJson
      })) && d.each(a.pageInfo.sectionList, function(a, f, d)
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
      var g = {
          isGaugeBattle: !1
        },
        f = k.getEventMaster(
        {
          pageJson: a
        });
      f && f.pageInfo.sectionList.normalSectionId == b && (g.isGaugeBattle = !0, g.pointType = k.getPointType(
      {
        questBattle: c
      }), g.factorItemIdList = k.getFactorItemIdList(
      {
        eventWitch: a.eventWitch
      }));
      return g
    },
    getFactorItemIdList: function(a)
    {
      var c = a.eventWitch,
        b = [];
      d.each(k.pointTypeList, function(a, f, e)
      {
        d.each(c, function(c, p, f)
        {
          a + "ItemId" == p && b.push(c)
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
      d.each(a.infoList, function(a, d, f)
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
      h.questBattleModel = k.getCommonQuestBattleModel(
      {
        questBattleModel: c,
        sectionModel: b,
        userQuestAdventureList: d,
        factorItemIdList: a.factorItemIdList
      });
      k.isEnoughAP(
      {
        needAP: h.questBattleModel.ap
      }) ? location.href = "#/SupportSelect" : h.globalMenuView.apPopup(null, "APが不足しています", function()
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
        g = a.userQuestAdventureList,
        f = a.factorItemIdList;
      b.missionRewardCode = {
        itemCode: "",
        rewardType: ""
      };
      b.chestColor = "bronze_close";
      b.questBattle.missionRewardCode && (b.missionRewardCode = h.itemSet(b.questBattle.missionRewardCode), b.chestColor = b.missionRewardCode.chestColor);
      "NONE" == b.questBattle.questBattleType && d.each([1, 2, 3], function(a, c, d)
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
      b.userQuestAdventureList = g;
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
      a = n.dropItemJson(b);
      var l = [];
      d.each(a.list, function(a, b, c)
      {
        var g = !1;
        d.each(f, function(b, c, d)
        {
          ~a.indexOf(b.toLowerCase()) && (g = !0)
        });
        g || l.push(a)
      });
      a.list = l;
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
      var c = h.globalMenuView.getUserStatus().ACP,
        b = !1;
      a && c >= a && (b = !0);
      0 == a && (b = !0);
      return b
    },
    getOverwriteApInfo: function(a)
    {
      var c = a.campaignData,
        b = a.sectionModel,
        g = a.questBattleModel,
        f = null,
        e = !1;
      c && (c.FREE_AT_NOT_CLEAR && (0 < c.FREE_AT_NOT_CLEAR.sectionIds.length && 0 <= c.FREE_AT_NOT_CLEAR.sectionIds.indexOf(String(b.sectionId)) ? e = !0 : 0 < c.FREE_AT_NOT_CLEAR.chapterIds.length && 0 <= c.FREE_AT_NOT_CLEAR.chapterIds.indexOf(String(b.section.genericId)) ? e = !0 : !e && c.FREE_AT_NOT_CLEAR.questType && d.each(c.FREE_AT_NOT_CLEAR.questType, function(a, c)
      {
        if ("ALL" === a || a == b.section.questType) e = !0
      })), c.HALF_AP && d.each(c.HALF_AP.questType, function(a, d)
      {
        if ("MAIN" == a || "SUB" == a) a == b.section.questType && (0 <= c.HALF_AP.chapterIds.indexOf(String(b.section.genericId)) || 0 === c.HALF_AP.chapterIds.length) && (f = Math.ceil(b.section.ap / 2), g.questBattle.ap && (f = Math.ceil(g.questBattle.ap / 2)));
        else if ("ALL" == a || a == b.section.questType) f = Math.ceil(b.section.ap / 2), g.questBattle.ap && (f = Math.ceil(g.questBattle.ap / 2))
      }));
      a = {};
      a.halfAp = f;
      a.freeAtNotClear = e;
      return a
    },
    getEventCharaInfo: function(a)
    {
      var c = a.pageType;
      c || (c = "top");
      var b = a.eventWitch,
        g = a.userItemList,
        f = [];
      d.each(a.eventWitchCharaList, function(a, e, v)
      {
        e = {
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
        var q = k.pointTypeList,
          l = 0;
        d.each(b, function(b, c, f)
        {
          d.each(g, function(f, e, g)
          {
            d.each(q, function(e, g, k)
            {
              b == f.itemId && c == e + "ItemId" && d.each(a, function(a, b, c)
              {
                b == e + "Factor" && (l += f.quantity * a)
              })
            })
          })
        });
        e.currentPoint = l;
        e.currentRatio = Math.round(l / a.targetValue * 100);
        100 <= e.currentRatio && (e.currentRatio = 100);
        e.beforeRatio = 0;
        h.EventWitchPrm && h.EventWitchPrm.beforeRatioList && h.EventWitchPrm.beforeRatioList["charaId" + a.charaId] && (e.beforeRatio = h.EventWitchPrm.beforeRatioList["charaId" + a.charaId]);
        k.getRatioAngle(
        {
          ratioObj: e
        });
        f.push(e)
      });
      var e = k.getEachTypeUpList(
      {
        eventCharaInfo: f
      });
      d.each(f, function(a, b, c)
      {
        a.factorUpList = [];
        d.each(e, function(b, c, f)
        {
          d.each(b, function(b, c, d)
          {
            b.charaId == a.charaId && a.factorUpList.push(b)
          })
        })
      });
      return f
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
      b ? h.eventFirstNavi(["navi_01", "navi_02", "navi_03", "navi_04"], c, "eventWitch", function()
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
        var g = c.viewParameterMap.SUBITEMID;
        d.each(a.userItemList, function(a, c, d)
        {
          a.itemId == g && (b = a)
        })
      }
      return b
    },
    getBeforeRatioList: function(a)
    {
      var c = {};
      d.each(a.eventCharaInfo, function(a, d, f)
      {
        c["charaId" + a.charaId] = a.currentRatio
      });
      return c
    },
    getEachTypeUpList: function(a)
    {
      var c = a.eventCharaInfo,
        b = {};
      d.each(k.pointTypeList, function(a, e, g)
      {
        var f = [];
        d.each(c, function(b, c, e)
        {
          d.each(b.factorUpList, function(c, d, e)
          {
            c.type == a && (c.charaId = b.charaId, f.push(c))
          })
        });
        b[a] = f
      });
      d.each(b, function(a, b, c)
      {
        a.sort(function(a, b)
        {
          return b.val - a.val
        })
      });
      var g = {
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
      d.each(b, function(a, b, c)
      {
        var e = 1,
          f;
        d.each(a, function(b, c, k)
        {
          var h = !1;
          f || (f = b.val);
          d.each(a, function(a, c, d)
          {
            b.iconName || a.iconName || (b.val != a.val || h ? h = !0 : (f != b.val && (e += 1), b.iconName = "arrow_" + g[e], f = b.val))
          })
        })
      });
      return b
    },
    getMemoriaMaxStatus: function(a)
    {
      a = a.memoriaInfo;
      var c = m.getMaxLevel(a.rank, 4);
      return m.getParam(
      {
        piece: a
      }, c)
    }
  };
  return k
});
