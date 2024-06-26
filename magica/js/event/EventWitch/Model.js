define("underscore backbone backboneCommon ajaxControl command js/event/EventWitch/Utility".split(" "), function(e, p, m, q, r, f)
{
  var n = {
    getTopModel: function(a)
    {
      a = a.pageJson;
      var d = {
          nativeModel:
          {
            raidType: "MEMORIA",
            mapWidth: 1,
            mapHeight: 1,
            canDragPoint: !1,
            centerPointId: 0,
            newPointIdList: [],
            pointList: []
          },
          questInfo:
          {}
        },
        b = f.getEventMaster(
        {
          pageJson: a
        });
      d.eventMaster = b;
      var g = n.getQuestInfo(
      {
        eventMaster: b,
        pageJson: a
      });
      d.subItemInfo = f.getSubItemInfo(
      {
        eventMaster: b,
        pageJson: a
      });
      d.eventCharaInfo = f.getEventCharaInfo(
      {
        pageType: "top",
        eventWitchCharaList: a.eventWitchCharaList,
        eventWitch: a.eventWitch,
        userItemList: a.userItemList
      });
      d.questInfo = g;
      var h = [
        {
          x: 820,
          y: 1078
        },
        {
          x: 1050,
          y: 940
        },
        {
          x: 1175,
          y: 1175
        },
        {
          x: 640,
          y: 900
        },
        {
          x: 1330,
          y: 980
        },
        {
          x: 813,
          y: 1332
        },
        {
          x: 660,
          y: 1500
        },
        {
          x: 1032,
          y: 1438
        },
        {
          x: 620,
          y: 545
        },
        {
          x: 900,
          y: 670
        },
        {
          x: 1050,
          y: 455
        }],
        l = h.length - 1;
      e.each(g.questInfoList, function(c, b, k)
      {
        b > l || (b = {
          pointId: c.questBattleId,
          iconType: String(c.pointType).toUpperCase(),
          x: h[b].x,
          y: h[b].y,
          status: "NEW",
          questClearList: function()
          {
            var b = ["NO_CLEAR", "NO_CLEAR", "NO_CLEAR"];
            e.each([1, 2, 3], function(k, a, d)
            {
              c["missionStatus" + k] && "CLEARED" == c["missionStatus" + k] && (b[a] = "CLEAR")
            });
            return b
          }()
        }, d.nativeModel.pointList.push(b))
      });
      var c = b.eventId,
        b = 12;
      d.eventCharaInfo && 7 == d.eventCharaInfo.length && (b = 14);
      d.nativeModel.mapEffectList = [
      {
        name: "evt_majo_memoria_anime_map_memory",
        x: 404,
        y: 480,
        eventId: c,
        memoriaMax: b
      },
      {
        name: "evt_majo_memoria_anime_map_memory",
        x: 775,
        y: 640,
        eventId: c,
        memoriaMax: b
      },
      {
        name: "evt_majo_memoria_anime_map_memory",
        x: 955,
        y: 410,
        eventId: c,
        memoriaMax: b
      },
      {
        name: "evt_majo_memoria_anime_map_memory",
        x: 1140,
        y: 508,
        eventId: c,
        memoriaMax: b
      },
      {
        name: "evt_majo_memoria_anime_map_memory",
        x: 1600,
        y: 554,
        eventId: c,
        memoriaMax: b
      },
      {
        name: "evt_majo_memoria_anime_map_memory",
        x: 1290,
        y: 860,
        eventId: c,
        memoriaMax: b
      },
      {
        name: "evt_majo_memoria_anime_map_memory",
        x: 860,
        y: 934,
        eventId: c,
        memoriaMax: b
      },
      {
        name: "evt_majo_memoria_anime_map_memory",
        x: 1638,
        y: 912,
        eventId: c,
        memoriaMax: b
      },
      {
        name: "evt_majo_memoria_anime_map_memory",
        x: 1360,
        y: 1100,
        eventId: c,
        memoriaMax: b
      },
      {
        name: "evt_majo_memoria_anime_map_memory",
        x: 1046,
        y: 1200,
        eventId: c,
        memoriaMax: b
      },
      {
        name: "evt_majo_memoria_anime_map_memory",
        x: 678,
        y: 1240,
        eventId: c,
        memoriaMax: b
      },
      {
        name: "evt_majo_memoria_anime_map_memory",
        x: 1440,
        y: 1384,
        eventId: c,
        memoriaMax: b
      },
      {
        name: "evt_majo_memoria_anime_map_memory",
        x: 340,
        y: 1488,
        eventId: c,
        memoriaMax: b
      },
      {
        name: "evt_majo_memoria_anime_map_memory",
        x: 920,
        y: 1530,
        eventId: c,
        memoriaMax: b
      },
      {
        name: "evt_majo_memoria_anime_map_memory",
        x: 748,
        y: 1632,
        eventId: c,
        memoriaMax: b
      },
      {
        name: "evt_majo_memoria_anime_map_memory",
        x: 1334,
        y: 1664,
        eventId: c,
        memoriaMax: b
      }];
      d.nativeModel.centerPointId = d.nativeModel.pointList[0].pointId;
      d.isOpenChallengePopup = !1;
      e.each(d.nativeModel.pointList, function(b, a, k)
      {
        a = Number(localStorage.getItem("WatchEventWitchChallengeQuest"));
        "CHALLENGE" == b.iconType && a != c && (d.nativeModel.centerPointId = b.pointId, d.isOpenChallengePopup = !0, localStorage.setItem("WatchEventWitchChallengeQuest", c))
      });
      d.factorItemIdList = f.getFactorItemIdList(
      {
        eventWitch: a.eventWitch
      });
      return d
    },
    getQuestInfo: function(a)
    {
      var d = a.pageJson,
        b = {
          sectionInfoList: [],
          questInfoList: []
        },
        g = a.eventMaster.pageInfo.sectionList;
      e.each(d.userSectionList, function(c, a, d)
      {
        var k = c.section;
        e.each(g, function(a, d, t)
        {
          k.sectionId == a && b.sectionInfoList.push(c)
        })
      });
      b.sectionInfoList.sort(function(c, b)
      {
        return c.sectionId - b.sectionId
      });
      var h = [];
      e.each(b.sectionInfoList, function(c, b, a)
      {
        h[b] = [];
        e.each(d.userQuestBattleList, function(a, d, e)
        {
          c.sectionId == a.questBattle.sectionId && (c.section && c.section.secret && (a.secret = c.section.secret), !a.questBattle.ap && c.section.ap && (a.questBattle.ap = c.section.ap), !a.questBattle.difficulty && c.section.difficulty && (a.questBattle.difficulty = c.section.difficulty), a.pointType = "", g.normalSectionId == a.questBattle.sectionId && (a.pointType = f.getPointType(
          {
            questBattle: a.questBattle
          })), g.subSectionId == a.questBattle.sectionId && (a.pointType = "sub_item"), g.challengeSectionId == a.questBattle.sectionId && (a.pointType = "challenge"), h[b].push(a))
        })
      });
      e.each(h, function(a, b, d)
      {
        a.sort(function(a, b)
        {
          return a.questBattleId - b.questBattleId
        })
      });
      e.each(h, function(a, d, g)
      {
        e.each(a, function(a, c, d)
        {
          b.questInfoList.push(a)
        })
      });
      var l = m.campaignParse(d.campaignList);
      e.each(b.questInfoList, function(a, d, g)
      {
        e.each(b.sectionInfoList, function(b, c, d)
        {
          a.questBattle.sectionId == b.sectionId && (b = f.getOverwriteApInfo(
          {
            campaignData: l,
            sectionModel: b,
            questBattleModel: a
          }), b.halfAp && (a.halfAp = b.halfAp, a.overwriteAp = b.halfAp), b.freeAtNotClear && (a.campaignFreeAtNotClear = b.freeAtNotClear, a.overwriteAp = 0))
        })
      });
      return b
    },
    getExchangeTopModel: function(a)
    {
      var d = a.pageJson;
      a = {};
      a.eventMaster = f.getEventMaster(
      {
        pageJson: d
      });
      a.eventCharaInfo = f.getEventCharaInfo(
      {
        pageType: "exchange",
        eventWitchCharaList: d.eventWitchCharaList,
        eventWitch: d.eventWitch,
        userItemList: d.userItemList
      });
      a.listClass = "";
      7 == a.eventCharaInfo.length && (a.listClass = "chara7");
      a.termText = "";
      var b = m.getDateShortening(
      {
        date: a.eventMaster.closeAt
      });
      a.termText = b.mo + "/" + b.da + " " + b.ho + ":" + b.mi + "まで";
      e.each(a.eventCharaInfo, function(a, b, l)
      {
        e.each(d.charaList, function(b, c, d)
        {
          a.charaId == b.id && (a.charaInfo = b)
        });
        e.each(d.rewardPieceList, function(b, c, d)
        {
          a.rewardPieceId == b.pieceId && (a.rewardPieceInfo = b)
        });
        var c = f.getMemoriaMaxStatus(
        {
          memoriaInfo: a.rewardPieceInfo
        });
        e.each(["hp", "attack", "defense"], function(b, d, e)
        {
          a.rewardPieceInfo[b] = c[b]
        });
        a.rewardPieceInfo.isExchanged = !1;
        e.each(d.userPieceCollectionList, function(b, c, d)
        {
          a.rewardPieceId == b.pieceId && (a.rewardPieceInfo.isExchanged = !0)
        })
      });
      "exchangeOnly" == a.eventMaster.termStatus && (a.subItemInfo = f.getSubItemInfo(
      {
        eventMaster: a.eventMaster,
        pageJson: d
      }), a.subItemInfo || (a.subItemInfo = {
        quantity: 0
      }));
      return a
    }
  };
  return n
});
