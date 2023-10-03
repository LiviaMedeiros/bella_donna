define("underscore backbone backboneCommon ajaxControl command text!template/event/EventArenaRankMatch/parts/CoolTimePopup.html js/event/EventArenaRankMatch/parts/OpponentView".split(" "), function(d, n, b, p, h, q, k)
{
  var a = {
    init: function(b)
    {
      a.model = b.model;
      a._views = b._views;
      a.pageJson = b.pageJson;
      a.setList(
      {
        model: a.model,
        _views: a._views
      });
      a.setTimer(
      {
        currentTime: a.pageJson.currentTime,
        endTime: a.model.battleInfo.matchExpiredAt
      });
      return a
    },
    setList: function(c)
    {
      var l = c.model.opponentList,
        e = c._views;
      e.opponentList = [];
      $("#matchingWrap").empty();
      var f = [];
      d.each(l, function(a, b, c)
      {
        0 < a.length && f.push(d.sample(a))
      });
      if (0 < f.length)
      {
        var g = b.doc.createDocumentFragment(),
          m = d.template($("#arenaParts").text());
        d.each(f, function(a, b, c)
        {
          e.opponentList.push(new k(
          {
            model: a,
            template: m,
            _views: e
          }));
          g.appendChild(e.opponentList[b].render().el)
        });
        $("#matchingWrap").append(g)
      }
      else $("#matchingWrap").html('<li class="nomatch">現在対戦可能な相手がいません。<br>しばらくしてから再度来場ください。</li>');
      h.getBaseData(b.getNativeObj());
      a.tapLimit()
    },
    openTimeOverPopup: function()
    {
      new b.PopupClass(
      {
        title: "タイムオーバー",
        content: "マッチング時間をタイムオーバーしました。<br>対戦相手を変更します。",
        closeBtnText: "OK",
        canClose: !1,
        popupType: "typeC"
      }, null, function() {}, function()
      {
        b.EventArenaRankMatchPrm.isOpenPopup = !1;
        b.EventArenaRankMatchPrm.openTimeOverPopup = !1;
        location.href = "#/RegularEventArenaRankMatchRedirectTop"
      })
    },
    setTimer: function(c)
    {
      a.timer = b.countDownTimerManager(
      {
        currentTime: c.currentTime,
        endTime: c.endTime,
        setSelector: "#reloadListTimeSec",
        isDispH: !1,
        callback: function()
        {
          b.EventArenaRankMatchPrm.isOpenPopup ? b.EventArenaRankMatchPrm.openTimeOverPopup = a.openTimeOverPopup : a.openTimeOverPopup()
        }
      });
      a.timer.start()
    },
    tapLimit: function()
    {
      b.EventArenaRankMatchPrm.isTapLimit = !0;
      setTimeout(function()
      {
        b.EventArenaRankMatchPrm.isTapLimit = !1
      }, 1E3)
    },
    removeView: function()
    {
      a.timer && a.timer.stop()
    }
  };
  return a
});
