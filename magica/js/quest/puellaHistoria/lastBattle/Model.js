define(["underscore", "backbone", "backboneCommon", "ajaxControl", "js/quest/puellaHistoria/lastBattle/Utility"], function(l, q, d, h, m)
{
  return {
    getSingleRaidModel: function(a)
    {
      var c = a.pageJson,
        b = {
          nativeModel:
          {
            raidType: "HISTORIA",
            mapWidth: 1,
            mapHeight: 1,
            canDragPoint: !1,
            centerPointId: 0,
            newPointIdList: [],
            pointList: []
          },
          questInfo:
          {}
        };
      a = m.getSingleRaidQuestInfo(
      {
        pageJson: c
      });
      b.questInfo = a;
      var g = [
        {
          x: 742,
          y: 1662
        },
        {
          x: 918,
          y: 1514
        },
        {
          x: 1129,
          y: 1426
        },
        {
          x: 1296,
          y: 1330
        },
        {
          x: 994,
          y: 1291
        },
        {
          x: 1197,
          y: 1211
        },
        {
          x: 1062,
          y: 1101
        },
        {
          x: 1120,
          y: 861
        }],
        d = g.length - 1,
        e = 0;
      l.each(a.questInfoList, function(a, f, k)
      {
        if (!(f > Number(d - 1)))
        {
          k = Number(f + 10);
          var h = {
            pointId: k,
            connectPointId: Number(k + 1),
            iconType: "BOSS",
            x: g[f].x,
            y: g[f].y,
            status: function()
            {
              var b = "NEW";
              a.cleared && (b = "CLEAR");
              return b
            }(),
            dayId: String(f + 1),
            questClearList: function()
            {
              var b = ["NO_CLEAR", "NO_CLEAR", "NO_CLEAR"];
              l.each([1, 2, 3], function(c, g, d)
              {
                a["missionStatus" + c] && "CLEARED" == a["missionStatus" + c] && (b[g] = "CLEAR")
              });
              return b
            }()
          };
          b.nativeModel.pointList.push(h);
          e = k;
          if (b.nativeModel.pointList.length == d && "CLEAR" == h.status)
          {
            var n = "NEW",
              p = m.getStoryIdList();
            l.each(c.userQuestAdventureList, function(a, b, c)
            {
              a.adventureId == p.event[8].storyId && (n = "IN_BATTLE")
            });
            b.nativeModel.pointList.push(
            {
              pointId: Number(k + 1),
              iconType: "LAST",
              x: g[f + 1].x,
              y: g[f + 1].y,
              status: n,
              dayId: String(f + 2),
              questClearList: []
            });
            e = Number(k + 1)
          }
        }
      });
      b.nativeModel.centerPointId = e;
      a = localStorage.getItem("PuellaHistoriaLastBattleSingleRaidAlreadyOpenStagingNo");
      if (!a || a && a < e) b.nativeModel.newPointIdList.push(e), b.nativeModel.centerPointId = e - 1, 1 == b.nativeModel.pointList.length && (b.nativeModel.centerPointId = e), localStorage.setItem("PuellaHistoriaLastBattleSingleRaidAlreadyOpenStagingNo", e);
      return b
    },
    getGroupRaidModel: function(a)
    {
      var c = a.pageJson,
        b = {
          nativeModel:
          {
            isFirst: !1,
            hp: 0,
            fieldFilename: "web_PuellaHistoria_46207_01",
            damageList: [],
            stampList: []
          },
          DP: 0,
          eventId: function()
          {
            var a = null;
            l.each(c.eventList, function(b, c, d)
            {
              "PUELLA_RAID" == b.eventType && (a = b.eventId)
            });
            return a
          }()
        };
      localStorage.getItem("PuellaHistoriaLastBattleGroupRaidAlreadyOpenStaging") || (b.nativeModel.isFirst = !0, localStorage.setItem("PuellaHistoriaLastBattleGroupRaidAlreadyOpenStaging", "true"));
      b.nativeModel.isFirst = !0;
      l.each(c.bossInfoList, function(a, c, d)
      {
        "BOSS" == a.eventPuellaRaidPoint.pointType && (b.nativeModel.hp = a.damage)
      });
      c.userEventPuellaRaid && c.userEventPuellaRaid.totalDevotionPoint && (b.DP = c.userEventPuellaRaid.totalDevotionPoint);
      b.bossUseItem = {
        quantity: 0,
        item:
        {
          name: "天気輪の魔力"
        }
      };
      c.totalBreakPoint && c.userEventPuellaRaid && (a = c.totalBreakPoint - 100 * c.userEventPuellaRaid.useBreakPointCount, 0 > a && (a = 0), b.bossUseItem.quantity = a);
      a = m.getGroupRaidQuestInfo(
      {
        pageJson: c
      });
      b.questInfo = a;
      return b
    },
    getStampList: function(a)
    {
      var c = a.callback;
      d.tapBlock(!0);
      h.ajaxPost(d.linkList.puellaHistoriaGroupRaidStampList,
      {}, function(a)
      {
        d.tapBlock(!1);
        c(
        {
          res: a
        })
      })
    },
    getAttackInfoList: function(a)
    {
      var c = a.mode,
        b = a.callback;
      d.tapBlock(!0);
      a = {};
      c && (a.mode = c);
      h.ajaxPost(d.linkList.puellaHistoriaGroupRaidAttackInfoList, a, function(a)
      {
        d.tapBlock(!1);
        b(
        {
          res: a
        })
      })
    },
    sendStampInfo: function(a)
    {
      var c = a.callback;
      a = a.prm;
      d.tapBlock(!0);
      h.ajaxPost(d.linkList.puellaHistoriaGroupRaidStampSend, a, function(a)
      {
        d.tapBlock(!1);
        c(
        {
          res: a
        })
      })
    }
  }
});
