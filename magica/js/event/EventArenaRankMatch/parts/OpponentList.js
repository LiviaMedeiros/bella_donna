define("underscore backbone backboneCommon ajaxControl command text!template/event/EventArenaRankMatch/parts/CoolTimePopup.html js/event/EventArenaRankMatch/parts/OpponentView js/event/EventArenaRankMatch/parts/recoverAttackCountBtnView".split(" "), function(e, r, c, t, h, u, k, l)
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
        pageJson: a.pageJson,
        _views: a._views
      });
      a.setTimer(
      {
        model: a.model,
        currentTime: a.pageJson.currentTime,
        endTime: a.model.battleInfo.matchExpiredAt
      });
      return a
    },
    setList: function(b)
    {
      var m = b.model.opponentList,
        n = b.model.attackCountInfo,
        d = b._views,
        p = b.model;
      b = b.pageJson;
      d.opponentList = [];
      $("#matchingWrap").empty();
      var f = [];
      e.each(m, function(a, b, c)
      {
        0 < a.length && f.push(e.sample(a))
      });
      if (0 == n.num) $("#matchingWrap").html('<li class="nomatch"><div class="textSec">残り対戦回数がありません。<br>対戦回数は毎日16:00にリセットされるほか<br>マギアストーンやランクマッチバトルチケットを<br>使用することで回復できます。<br></div></li>'), d.RecoverAttackCountBtn = new l(
      {
        model: p,
        pageJson: b,
        _views: d
      });
      else if (0 < f.length)
      {
        var g = c.doc.createDocumentFragment(),
          q = e.template($("#arenaParts").text());
        e.each(f, function(a, b, c)
        {
          d.opponentList.push(new k(
          {
            model: a,
            template: q,
            _views: d
          }));
          g.appendChild(d.opponentList[b].render().el)
        });
        $("#matchingWrap").append(g)
      }
      else $("#matchingWrap").html('<li class="nomatch">現在対戦可能な相手がいません。<br>しばらくしてから再度来場ください。</li>');
      h.getBaseData(c.getNativeObj());
      a.tapLimit()
    },
    openTimeOverPopup: function()
    {
      new c.PopupClass(
      {
        title: "タイムオーバー",
        content: "マッチング時間をタイムオーバーしました。<br>対戦相手を変更します。",
        closeBtnText: "OK",
        canClose: !1,
        popupType: "typeC"
      }, null, function() {}, function()
      {
        c.EventArenaRankMatchPrm.isOpenPopup = !1;
        c.EventArenaRankMatchPrm.openTimeOverPopup = !1;
        location.href = "#/RegularEventArenaRankMatchRedirectTop"
      })
    },
    setTimer: function(b)
    {
      0 != b.model.attackCountInfo.num && (a.timer = c.countDownTimerManager(
      {
        currentTime: b.currentTime,
        endTime: b.endTime,
        setSelector: "#reloadListTimeSec",
        isDispH: !1,
        callback: function()
        {
          c.EventArenaRankMatchPrm.isOpenPopup ? c.EventArenaRankMatchPrm.openTimeOverPopup = a.openTimeOverPopup : a.openTimeOverPopup()
        }
      }), a.timer.start())
    },
    tapLimit: function()
    {
      c.EventArenaRankMatchPrm.isTapLimit = !0;
      setTimeout(function()
      {
        c.EventArenaRankMatchPrm.isTapLimit = !1
      }, 1E3)
    },
    removeView: function()
    {
      a.timer && a.timer.stop()
    }
  };
  return a
});
