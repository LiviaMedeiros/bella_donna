define("underscore backbone backboneCommon ajaxControl command text!template/event/EventArenaRankMatch/parts/AttackCountPopup.html text!template/event/EventArenaRankMatch/parts/AttackCountBtn.html js/event/EventArenaRankMatch/Utility".split(" "), function(g, l, b, m, r, n, p, q)
{
  var c = {
    num: 0
  };
  c.viewBtn = l.View.extend(
  {
    events: function()
    {
      var a = {};
      a[b.cgti + " #recoverAttackCountBtn"] = this.tapBtn;
      return a
    },
    initialize: function(a)
    {
      this.model = a.model;
      this.template = g.template(p);
      this.pageJson = a.pageJson;
      b.doc.getElementById("recoverAttackCountBtnSec").appendChild(this.render().el);
      c.setNum(
      {
        num: this.model.attackCountInfo.num,
        maxNum: this.model.attackCountInfo.numMax
      })
    },
    render: function()
    {
      this.$el.html(this.template(
      {
        model: this.model
      }));
      return this
    },
    tapBtn: function(a)
    {
      a.preventDefault();
      if (!(b.isScrolled() || 0 < this.model.attackCountInfo.num))
      {
        var d = this;
        a = "statusCanUse";
        var c = "",
          h = "キャンセル",
          k = "回復する",
          f = b.calcExpendStone(
          {
            quantity: d.model.attackCountInfo.recoverNeedNum,
            isPurchasedMoneyOnly: !1
          });
        0 > f.totalMoney && (a = "statusCanNotUse", h = "OK", k = null, c = 'マギアストーンが<span class="c_pink">' + Math.abs(f.totalMoney) + "個</span>不足しているため<br>回復できません。");
        d.popup = new b.PopupClass(
        {
          title: "対戦回数回復",
          content: g.template(n)(
          {
            model:
            {
              statusClass: a,
              canNotUseText: c,
              attackCountInfo: d.model.attackCountInfo,
              userStone: b.getTotalStone(),
              remainStone: f
            }
          }),
          popupType: "typeB",
          decideBtnText: k,
          decideBtnEvent: function()
          {
            d.popup.remove();
            d.getAttackCountInfo(
            {
              callback: d.callbackAttackCount
            })
          },
          closeBtnText: h,
          popupId: "EventArenaRankMatchAttackCountPopup"
        }, null, function() {}, function() {})
      }
    },
    getAttackCountInfo: function(a)
    {
      var c = a.callback,
        e = this;
      q.isOpenEvent(
      {
        pageJson: e.pageJson,
        pageAccessLocalTime: e.model.pageAccessLocalTime,
        rankMatchEventInfo: e.model.eventInfo
      }) ? (b.tapBlock(!0), m.ajaxPost(b.linkList.eventArenaRankMatchRecoveryAttackCount,
      {}, function(a)
      {
        b.tapBlock(!1);
        b.responseSetStorage(a);
        c(
        {
          _this: e,
          res: a
        })
      })) : new b.PopupClass(
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
    callbackAttackCount: function(a)
    {
      a = a._this;
      a.model.attackCountInfo.num = 5;
      c.setNum(
      {
        num: a.model.attackCountInfo.num,
        maxNum: a.model.attackCountInfo.numMax
      });
      new b.PopupClass(
      {
        title: "対戦回数回復",
        content: "ミラーズランクマッチの対戦回数が<br>" + a.model.attackCountInfo.num + "回になりました。",
        closeBtnText: "OK"
      }, null, function() {}, function() {})
    },
    removeView: function()
    {
      this.off();
      this.remove()
    }
  });
  c.setNum = function(a)
  {
    var b = a.num;
    a = a.maxNum;
    c.num = b;
    $("#attackCountNumSec").html(b + "/" + a);
    $("#recoverAttackCountBtn").addClass("off");
    0 >= c.num && $("#recoverAttackCountBtn").removeClass("off")
  };
  c.getNum = function(a)
  {
    return c.num
  };
  c.noBattlePopup = function(a)
  {
    new b.PopupClass(
    {
      title: "対戦回数不足",
      content: "対戦回数が残っていないので対戦できません。",
      closeBtnText: "OK"
    }, null, function() {}, function() {})
  };
  return c
});
