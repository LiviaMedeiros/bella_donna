define("underscore backbone backboneCommon ajaxControl command js/event/EventWitch/Utility".split(" "), function(e, p, m, q, r, g)
{
  var n = {
    getTopModel: function(a)
    {
      a = a.pageJson;
      var c = {
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
        f = g.getEventMaster(
        {
          pageJson: a
        });
      c.eventMaster = f;
      var h = n.getQuestInfo(
      {
        eventMaster: f,
        pageJson: a
      });
      c.subItemInfo = g.getSubItemInfo(
      {
        eventMaster: f,
        pageJson: a
      });
      c.questInfo = h;
      var k = [
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
        l = k.length - 1;
      e.each(h.questInfoList, function(b, a, d)
      {
        a > l || (a = {
          pointId: b.questBattleId,
          iconType: String(b.pointType).toUpperCase(),
          x: k[a].x,
          y: k[a].y,
          status: "NEW",
          questClearList: function()
          {
            var d = ["NO_CLEAR", "NO_CLEAR", "NO_CLEAR"];
            e.each([1, 2, 3], function(a, c, t)
            {
              b["missionStatus" + a] && "CLEARED" == b["missionStatus" + a] && (d[c] = "CLEAR")
            });
            return d
          }()
        }, c.nativeModel.pointList.push(a))
      });
      var b = f.eventId;
      c.nativeModel.mapEffectList = [
      {
        name: "evt_majo_memoria_anime_map_memory",
        x: 404,
        y: 480,
        eventId: b,
        memoriaMax: 12
      },
      {
        name: "evt_majo_memoria_anime_map_memory",
        x: 775,
        y: 640,
        eventId: b,
        memoriaMax: 12
      },
      {
        name: "evt_majo_memoria_anime_map_memory",
        x: 955,
        y: 410,
        eventId: b,
        memoriaMax: 12
      },
      {
        name: "evt_majo_memoria_anime_map_memory",
        x: 1140,
        y: 508,
        eventId: b,
        memoriaMax: 12
      },
      {
        name: "evt_majo_memoria_anime_map_memory",
        x: 1600,
        y: 554,
        eventId: b,
        memoriaMax: 12
      },
      {
        name: "evt_majo_memoria_anime_map_memory",
        x: 1290,
        y: 860,
        eventId: b,
        memoriaMax: 12
      },
      {
        name: "evt_majo_memoria_anime_map_memory",
        x: 860,
        y: 934,
        eventId: b,
        memoriaMax: 12
      },
      {
        name: "evt_majo_memoria_anime_map_memory",
        x: 1638,
        y: 912,
        eventId: b,
        memoriaMax: 12
      },
      {
        name: "evt_majo_memoria_anime_map_memory",
        x: 1360,
        y: 1100,
        eventId: b,
        memoriaMax: 12
      },
      {
        name: "evt_majo_memoria_anime_map_memory",
        x: 1046,
        y: 1200,
        eventId: b,
        memoriaMax: 12
      },
      {
        name: "evt_majo_memoria_anime_map_memory",
        x: 678,
        y: 1240,
        eventId: b,
        memoriaMax: 12
      },
      {
        name: "evt_majo_memoria_anime_map_memory",
        x: 1440,
        y: 1384,
        eventId: b,
        memoriaMax: 12
      },
      {
        name: "evt_majo_memoria_anime_map_memory",
        x: 340,
        y: 1488,
        eventId: b,
        memoriaMax: 12
      },
      {
        name: "evt_majo_memoria_anime_map_memory",
        x: 920,
        y: 1530,
        eventId: b,
        memoriaMax: 12
      },
      {
        name: "evt_majo_memoria_anime_map_memory",
        x: 748,
        y: 1632,
        eventId: b,
        memoriaMax: 12
      },
      {
        name: "evt_majo_memoria_anime_map_memory",
        x: 1334,
        y: 1664,
        eventId: b,
        memoriaMax: 12
      }];
      c.nativeModel.centerPointId = c.nativeModel.pointList[0].pointId;
      c.isOpenChallengePopup = !1;
      e.each(c.nativeModel.pointList, function(a, e, d)
      {
        e = Number(localStorage.getItem("WatchEventWitchChallengeQuest"));
        "CHALLENGE" == a.iconType && e != b && (c.nativeModel.centerPointId = a.pointId, c.isOpenChallengePopup = !0, localStorage.setItem("WatchEventWitchChallengeQuest", b))
      });
      c.eventCharaInfo = g.getEventCharaInfo(
      {
        pageType: "top",
        eventWitchCharaList: a.eventWitchCharaList,
        eventWitch: a.eventWitch,
        userItemList: a.userItemList
      });
      c.factorItemIdList = g.getFactorItemIdList(
      {
        eventWitch: a.eventWitch
      });
      return c
    },
    getQuestInfo: function(a)
    {
      var c = a.pageJson,
        f = {
          sectionInfoList: [],
          questInfoList: []
        },
        h = a.eventMaster.pageInfo.sectionList;
      e.each(c.userSectionList, function(b, a, c)
      {
        var d = b.section;
        e.each(h, function(a, c, e)
        {
          d.sectionId == a && f.sectionInfoList.push(b)
        })
      });
      f.sectionInfoList.sort(function(b, a)
      {
        return b.sectionId - a.sectionId
      });
      var k = [];
      e.each(f.sectionInfoList, function(b, a, f)
      {
        k[a] = [];
        e.each(c.userQuestBattleList, function(d, c, e)
        {
          b.sectionId == d.questBattle.sectionId && (b.section && b.section.secret && (d.secret = b.section.secret), !d.questBattle.ap && b.section.ap && (d.questBattle.ap = b.section.ap), !d.questBattle.difficulty && b.section.difficulty && (d.questBattle.difficulty = b.section.difficulty), d.pointType = "", h.normalSectionId == d.questBattle.sectionId && (d.pointType = g.getPointType(
          {
            questBattle: d.questBattle
          })), h.subSectionId == d.questBattle.sectionId && (d.pointType = "sub_item"), h.challengeSectionId == d.questBattle.sectionId && (d.pointType = "challenge"), k[a].push(d))
        })
      });
      e.each(k, function(b, a, c)
      {
        b.sort(function(b, a)
        {
          return b.questBattleId - a.questBattleId
        })
      });
      e.each(k, function(b, a, c)
      {
        e.each(b, function(a, b, c)
        {
          f.questInfoList.push(a)
        })
      });
      var l = m.campaignParse(c.campaignList);
      e.each(f.questInfoList, function(a, c, h)
      {
        e.each(f.sectionInfoList, function(b, c, e)
        {
          a.questBattle.sectionId == b.sectionId && (b = g.getOverwriteApInfo(
          {
            campaignData: l,
            sectionModel: b,
            questBattleModel: a
          }), b.halfAp && (a.halfAp = b.halfAp, a.overwriteAp = b.halfAp), b.freeAtNotClear && (a.campaignFreeAtNotClear = b.freeAtNotClear, a.overwriteAp = 0))
        })
      });
      return f
    },
    getExchangeTopModel: function(a)
    {
      var c = a.pageJson;
      a = {};
      a.eventMaster = g.getEventMaster(
      {
        pageJson: c
      });
      a.eventCharaInfo = g.getEventCharaInfo(
      {
        pageType: "exchange",
        eventWitchCharaList: c.eventWitchCharaList,
        eventWitch: c.eventWitch,
        userItemList: c.userItemList
      });
      a.listClass = "";
      7 == a.eventCharaInfo.length && (a.listClass = "chara7");
      a.termText = "";
      var f = m.getDateShortening(
      {
        date: a.eventMaster.closeAt
      });
      a.termText = f.mo + "/" + f.da + " " + f.ho + ":" + f.mi + "まで";
      e.each(a.eventCharaInfo, function(a, f, l)
      {
        e.each(c.charaList, function(b, c, d)
        {
          a.charaId == b.id && (a.charaInfo = b)
        });
        e.each(c.rewardPieceList, function(b, c, d)
        {
          a.rewardPieceId == b.pieceId && (a.rewardPieceInfo = b)
        });
        var b = g.getMemoriaMaxStatus(
        {
          memoriaInfo: a.rewardPieceInfo
        });
        e.each(["hp", "attack", "defense"], function(c, e, d)
        {
          a.rewardPieceInfo[c] = b[c]
        });
        a.rewardPieceInfo.isExchanged = !1;
        e.each(c.userPieceCollectionList, function(b, c, d)
        {
          a.rewardPieceId == b.pieceId && (a.rewardPieceInfo.isExchanged = !0)
        })
      });
      "exchangeOnly" == a.eventMaster.termStatus && (a.subItemInfo = g.getSubItemInfo(
      {
        eventMaster: a.eventMaster,
        pageJson: c
      }));
      return a
    }
  };
  return n
});
