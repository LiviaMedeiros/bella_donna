define("underscore backbone backboneCommon ajaxControl command text!template/event/EventArenaRankMatch/parts/CoolTimePopup.html js/event/EventArenaRankMatch/Utility".split(" "), function(h, n, c, k, p, l, m)
{
  var a = {
    isEnd: !1,
    init: function(b)
    {
      a.isEnd = !1;
      a.model = b.model;
      a.pageJson = b.pageJson;
      a.setTimer(
      {
        currentTime: a.pageJson.currentTime,
        endTime: a.model.coolDownTimeInfo.nextTime
      });
      return a
    },
    setTimer: function(b)
    {
      a.timer = c.countDownTimerManager(
      {
        currentTime: b.currentTime,
        endTime: b.endTime,
        setSelector: "#coolDownTimeNumSec",
        isDispH: !1,
        callback: function()
        {
          a.isEnd = !0
        }
      });
      a.timer.start()
    },
    recoverPopup: function()
    {
      var b = c.calcExpendStone(
        {
          quantity: a.model.coolDownTimeInfo.recoverNeedNum,
          isPurchasedMoneyOnly: !1
        }),
        d = "statusCanUse",
        e = "",
        f = "キャンセル",
        g = "解除する";
      0 > b.totalMoney && (d = "statusCanNotUse", f = "OK", g = null, e = 'マギアストーンが<span class="c_pink">' + Math.abs(b.totalMoney) + "個</span>不足しているため<br>クールタイムを解除できません。");
      a.popup = new c.PopupClass(
      {
        title: "クールタイム解除",
        content: h.template(l)(
        {
          model:
          {
            statusClass: d,
            canNotUseText: e,
            recoverNeedNum: a.model.coolDownTimeInfo.recoverNeedNum,
            userStone: c.getTotalStone(),
            remainStone: b
          }
        }),
        popupType: "typeB",
        decideBtnText: g,
        decideBtnEvent: function()
        {
          a.popup.remove();
          a.getCoolTimeInfo(
          {
            callback: a.callbackUnlockCoolTime
          })
        },
        closeBtnText: f,
        popupId: "EventArenaRankMatchAttackCountPopup"
      }, null, function() {}, function() {})
    },
    getCoolTimeInfo: function(b)
    {
      var d = this;
      if (1 == a.isEnd) new c.PopupClass(
      {
        title: "クールタイム終了",
        content: "クールタイムが終了しました。",
        popupType: "typeC",
        closeBtnText: "閉じる"
      }, null, null, null);
      else if (m.isOpenEvent(
        {
          pageJson: d.pageJson,
          pageAccessLocalTime: d.model.pageAccessLocalTime,
          rankMatchEventInfo: d.model.eventInfo
        }))
      {
        var e = b.callback;
        c.tapBlock(!0);
        k.ajaxPost(c.linkList.eventArenaRankMatchUnlockCoolDownTime,
        {}, function(a)
        {
          c.tapBlock(!1);
          c.responseSetStorage(a);
          e(
          {
            _this: d,
            res: a
          })
        })
      }
      else new c.PopupClass(
      {
        title: "イベント終了",
        content: "イベント開催期間外です。",
        closeBtnText: "OK",
        canClose: !1,
        popupType: "typeC"
      }, null, function() {}, function()
      {
        location.href = "#/ArenaTop"
      })
    },
    callbackUnlockCoolTime: function(b)
    {
      a.isEnd = !0;
      $("#coolDownTimeNumSec").html("00:00");
      a.timer.stop();
      new c.PopupClass(
      {
        title: "クールタイム解除",
        content: "クールタイムを解除しました。",
        closeBtnText: "OK"
      }, null, function() {}, function() {})
    },
    removeView: function()
    {
      a.timer && a.timer.stop()
    }
  };
  return a
});
