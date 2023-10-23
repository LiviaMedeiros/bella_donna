define("underscore backbone backboneCommon ajaxControl command text!template/event/EventArenaRankMatch/parts/AttackCountPopup.html text!template/event/EventArenaRankMatch/parts/AttackCountBtn.html js/event/EventArenaRankMatch/Utility js/event/EventArenaRankMatch/parts/AttackCountItemPopup".split(" "), function(k, f, c, m, u, n, p, q, r)
{
  var b = {
      num: 0
    },
    d;
  b.viewBtn = f.View.extend(
  {
    events: function()
    {
      var a = {};
      a[c.cgti + " #recoverAttackCountBtn"] = this.tapBtn;
      return a
    },
    initialize: function(a)
    {
      this.model = a.model;
      this.template = k.template(p);
      this.pageJson = a.pageJson;
      d = a._views;
      c.doc.getElementById("recoverAttackCountBtnSec").appendChild(this.render().el);
      b.setNum(
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
      c.isScrolled() || 0 < this.model.attackCountInfo.num || (0 < this.model.attackCountInfo.itemNum ? d.AttackCountItemPopup = new r(
      {
        model: this.model,
        AttackCount: b,
        pageJson: this.pageJson
      }) : b.recoverByMoneyPopup(
      {
        model: this.model,
        pageJson: this.pageJson
      }))
    },
    removeView: function()
    {
      this.off();
      this.remove()
    }
  });
  b.recoverByMoneyPopup = function(a)
  {
    var g = a.model,
      t = a.pageJson;
    a = "statusCanUse";
    var e = "",
      l = "キャンセル",
      d = "回復する",
      h = c.calcExpendStone(
      {
        quantity: g.attackCountInfo.recoverNeedNum,
        isPurchasedMoneyOnly: !1
      });
    0 > h.totalMoney && (a = "statusCanNotUse", l = "OK", d = null, e = 'マギアストーンが<span class="c_pink">' + Math.abs(h.totalMoney) + "個</span>不足しているため<br>回復できません。");
    var f = new c.PopupClass(
    {
      title: "対戦回数回復",
      content: k.template(n)(
      {
        model:
        {
          statusClass: a,
          canNotUseText: e,
          attackCountInfo: g.attackCountInfo,
          userStone: c.getTotalStone(),
          remainStone: h
        }
      }),
      popupType: "typeB",
      decideBtnText: d,
      decideBtnEvent: function()
      {
        f.remove();
        b.recoverAttackCount(
        {
          recoverInfo:
          {
            type: "magia_stone",
            num: 5
          },
          pageJson: t,
          model: g,
          callback: b.callbackRecoverAttackCount
        })
      },
      closeBtnText: l,
      popupId: "EventArenaRankMatchAttackCountPopup"
    }, null, function() {}, function() {})
  };
  b.recoverAttackCount = function(a)
  {
    var b = a.recoverInfo,
      d = a.callback,
      e = a.model;
    q.isOpenEvent(
    {
      pageJson: a.pageJson,
      pageAccessLocalTime: e.pageAccessLocalTime,
      rankMatchEventInfo: e.eventInfo
    }) ? (c.tapBlock(!0), m.ajaxPost(c.linkList.eventArenaRankMatchRecoveryAttackCount,
    {
      recoveryItemType: b.type,
      recoveryItemNum: b.num
    }, function(a)
    {
      c.tapBlock(!1);
      c.responseSetStorage(a);
      d(
      {
        recoverInfo: b,
        res: a
      })
    })) : new c.PopupClass(
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
  };
  b.callbackRecoverAttackCount = function(a)
  {
    new c.PopupClass(
    {
      title: "対戦回数回復",
      content: "ミラーズランクマッチの対戦回数を<br>" + a.recoverInfo.num + "回回復しました。",
      closeBtnText: "OK"
    }, null, function() {}, function()
    {
      c.EventArenaRankMatchPrm.isOpenPopup = !1;
      c.EventArenaRankMatchPrm.openTimeOverPopup = !1;
      location.href = "#/RegularEventArenaRankMatchRedirectTop"
    })
  };
  b.setNum = function(a)
  {
    var c = a.num;
    a = a.maxNum;
    b.num = c;
    $("#attackCountNumSec").html(c + "/" + a);
    $("#recoverAttackCountBtn").addClass("off");
    0 >= b.num && $("#recoverAttackCountBtn").removeClass("off")
  };
  b.getNum = function(a)
  {
    return b.num
  };
  b.noBattlePopup = function(a)
  {
    new c.PopupClass(
    {
      title: "対戦回数不足",
      content: "対戦回数が残っていないので対戦できません。",
      closeBtnText: "OK"
    }, null, function() {}, function() {})
  };
  return b
});
