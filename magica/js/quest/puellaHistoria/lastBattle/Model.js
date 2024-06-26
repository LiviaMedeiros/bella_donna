define(["underscore", "backbone", "backboneCommon", "ajaxControl", "js/quest/puellaHistoria/lastBattle/Utility"], function(g, m, c, f, k)
{
  return {
    getSingleRaidModel: function(a)
    {
      var b = {
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
      a = k.getSingleRaidQuestInfo(
      {
        pageJson: a.pageJson
      });
      b.questInfo = a;
      var d = [
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
        l = d.length - 1,
        e = 0;
      g.each(a.questInfoList, function(a, c, h)
      {
        if (!(c > l))
        {
          h = Number(c + 10);
          var f = {
            pointId: h,
            connectPointId: Number(h + 1),
            iconType: function()
            {
              var a = "BOSS";
              c == l && (a = "LAST");
              return a
            }(),
            x: d[c].x,
            y: d[c].y,
            status: function()
            {
              var b = "NEW";
              a.cleared && (b = "CLEAR");
              return b
            }(),
            dayId: String(c + 1),
            questClearList: function()
            {
              var b = ["NO_CLEAR", "NO_CLEAR", "NO_CLEAR"];
              g.each([1, 2, 3], function(d, c, e)
              {
                a["missionStatus" + d] && "CLEARED" == a["missionStatus" + d] && (b[c] = "CLEAR")
              });
              return b
            }()
          };
          b.nativeModel.pointList.push(f);
          e = h
        }
      });
      b.nativeModel.centerPointId = e;
      a = localStorage.getItem("PuellaHistoriaLastBattleSingleRaidAlreadyOpenStagingNo");
      if (!a || a && a < e) b.nativeModel.newPointIdList.push(e), b.nativeModel.centerPointId = e - 1, 1 == b.nativeModel.pointList.length && (b.nativeModel.centerPointId = e), localStorage.setItem("PuellaHistoriaLastBattleSingleRaidAlreadyOpenStagingNo", e);
      return b
    },
    getGroupRaidModel: function(a)
    {
      var b = a.pageJson,
        d = {
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
            g.each(b.eventList, function(b, d, c)
            {
              "PUELLA_RAID" == b.eventType && (a = b.eventId)
            });
            return a
          }()
        };
      localStorage.getItem("PuellaHistoriaLastBattleGroupRaidAlreadyOpenStaging") || (d.nativeModel.isFirst = !0, localStorage.setItem("PuellaHistoriaLastBattleGroupRaidAlreadyOpenStaging", "true"));
      d.nativeModel.isFirst = !0;
      g.each(b.bossInfoList, function(a, b, c)
      {
        "BOSS" == a.eventPuellaRaidPoint.pointType && (d.nativeModel.hp = a.damage)
      });
      b.userEventPuellaRaid && b.userEventPuellaRaid.totalDevotionPoint && (d.DP = b.userEventPuellaRaid.totalDevotionPoint);
      d.bossUseItem = {
        quantity: 0,
        item:
        {
          name: "天気輪の魔力"
        }
      };
      b.totalBreakPoint && b.userEventPuellaRaid && (a = b.totalBreakPoint - 100 * b.userEventPuellaRaid.useBreakPointCount, 0 > a && (a = 0), d.bossUseItem.quantity = a);
      a = k.getGroupRaidQuestInfo(
      {
        pageJson: b
      });
      d.questInfo = a;
      return d
    },
    getStampList: function(a)
    {
      var b = a.callback;
      c.tapBlock(!0);
      f.ajaxPost(c.linkList.puellaHistoriaGroupRaidStampList,
      {}, function(a)
      {
        c.tapBlock(!1);
        b(
        {
          res: a
        })
      })
    },
    getAttackInfoList: function(a)
    {
      var b = a.mode,
        d = a.callback;
      c.tapBlock(!0);
      a = {};
      b && (a.mode = b);
      f.ajaxPost(c.linkList.puellaHistoriaGroupRaidAttackInfoList, a, function(a)
      {
        c.tapBlock(!1);
        d(
        {
          res: a
        })
      })
    },
    sendStampInfo: function(a)
    {
      var b = a.callback;
      a = a.prm;
      c.tapBlock(!0);
      f.ajaxPost(c.linkList.puellaHistoriaGroupRaidStampSend, a, function(a)
      {
        c.tapBlock(!1);
        b(
        {
          res: a
        })
      })
    }
  }
});
