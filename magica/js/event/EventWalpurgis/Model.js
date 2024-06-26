define(["underscore", "backbone", "backboneCommon", "ajaxControl", "js/event/EventWalpurgis/Utility"], function(f, h, c, e, g)
{
  return {
    getGroupRaidModel: function(a)
    {
      var b = a.pageJson;
      a = a.eventMaster;
      var d = {
        nativeModel:
        {
          isWalpurgis: !0,
          x: 0,
          y: -50,
          isFirst: !1,
          hp: 0,
          fieldFilename: "web_ev_1053_24012",
          damageList: [],
          stampList: []
        },
        DP: 0,
        eventId: function()
        {
          var a = null;
          f.each(b.eventList, function(b, d, c)
          {
            "WALPURGIS" == b.eventType && (a = b.eventId)
          });
          return a
        }()
      };
      localStorage.getItem("EventWalpurgisAlreadyOpenStaging") || (d.nativeModel.isFirst = !0, localStorage.setItem("EventWalpurgisAlreadyOpenStaging", "true"));
      d.nativeModel.isFirst = !0;
      f.each(b.bossInfoList, function(a, b, c)
      {
        "BOSS" == a.eventPuellaRaidPoint.pointType && (d.nativeModel.hp = a.damage)
      });
      b.userEventPuellaRaid && b.userEventPuellaRaid.totalDevotionPoint && (d.DP = b.userEventPuellaRaid.totalDevotionPoint);
      d.bossUseItem = {
        quantity: 0,
        item:
        {
          name: "希望の羽"
        }
      };
      if (b.totalBreakPoint && b.userEventPuellaRaid)
      {
        var c = b.totalBreakPoint - 100 * b.userEventPuellaRaid.useBreakPointCount;
        0 > c && (c = 0);
        d.bossUseItem.quantity = c
      }
      a = g.getQuestInfo(
      {
        eventMaster: a,
        pageJson: b
      });
      d.questInfo = a;
      return d
    },
    getStampList: function(a)
    {
      var b = a.callback;
      c.tapBlock(!0);
      e.ajaxPost(c.linkList.eventWalpurgisStampList,
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
      e.ajaxPost(c.linkList.eventWalpurgisAttackInfoList, a, function(a)
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
      e.ajaxPost(c.linkList.eventWalpurgisStampSend, a, function(a)
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
