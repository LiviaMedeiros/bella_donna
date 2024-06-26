define("underscore backbone backboneCommon ajaxControl command text!template/event/EventArenaRankMatch/parts/CoolTimePopup.html".split(" "), function(d, e, c, f, g, h)
{
  var a = {
    init: function(b)
    {
      a.model = b.model;
      a.pageJson = b.pageJson;
      a.selector = "#editCountDown";
      b = a.pageJson.currentTime;
      a.model.isDeckEditCountDownContinue ? a.timer && $(a.selector).html(a.timer.getString()) : a.setTimer(
      {
        currentTime: b,
        endTime: a.model.editEndTime
      });
      c.EventArenaRankMatchPrm.isDeckEditCountDownContinue = !1;
      return a
    },
    setTimer: function(b)
    {
      a.timer = c.countDownTimerManager(
      {
        currentTime: b.currentTime,
        endTime: b.endTime,
        setSelector: a.selector,
        isDispH: !1,
        callback: function()
        {
          c.EventArenaRankMatchPrm.isDeckEditTimeOver = !0
        }
      });
      a.timer.start()
    },
    openPopup: function(b)
    {
      $("#editCountDown").html("00:00");
      a.timer.stop();
      c.EventArenaRankMatchPrm.isDeckEditTimeOver = !1;
      new c.PopupClass(
      {
        title: "タイムオーバー",
        content: "編成時間をタイムオーバーしました。<br>対戦相手を選択する画面に戻ります。",
        closeBtnText: "OK",
        canClose: !1,
        popupType: "typeC"
      }, null, function() {}, function()
      {
        location.href = "#/RegularEventArenaRankMatchTop"
      })
    },
    removeView: function()
    {
      a.timer && !a.model.isDeckEditCountDownContinue && (a.timer.stop(), c.EventArenaRankMatchPrm.isDeckEditTimeOver = !1)
    }
  };
  return a
});
