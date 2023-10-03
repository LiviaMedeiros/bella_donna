define(["underscore", "backbone", "backboneCommon", "ajaxControl", "command"], function(p, n, a, l, f, q)
{
  var h, g = !1;
  return n.View.extend(
  {
    className: "stoneWrap commonFrame4",
    events: function()
    {
      var e = {};
      e[a.cgti + " .purchaseConfirmBtn"] = this.purchaseConfirm;
      return e
    },
    initialize: function(a)
    {
      this.listenTo(this.parentView, "removeChild", this.removeView);
      this.model = a;
      g = !1
    },
    render: function()
    {
      var a = this.model.commonMoney.coin + "";
      3 < a.length && (a = a.replace(/(\d)(?=(\d\d\d)+$)/g, "$1,"));
      this.$el.html(this.template(
      {
        model: this.model,
        dispNum: a
      }));
      return this
    },
    purchaseConfirm: function(e)
    {
      e.preventDefault();
      if (!a.isScrolled())
        if ("hold" == this.model.purchaseStatus)
        {
          var c = this.parentView,
            d;
          new a.PopupClass(
          {
            content: "このアイテムは現在購入できません。<br>少し時間を空けてから、<br>アプリの再起動をお試しください。",
            closeBtnText: "OK",
            exClass: "purchaseError",
            popupType: "typeC"
          }, null, null, function()
          {
            c.nativeFlag && f.setWebView(!1);
            c.removeView()
          })
        }
      else if (d = a.storage.user.toJSON(), d.birthDay)
      {
        var b = this.ageCheck(),
          g = l.getPageJson().currentTime,
          m = d.purchaseAt,
          k = 0,
          k = m && g.substr(0, 7) === m.substr(0, 7) ? (d.monthlyPurchase | 0) + this.model.commonMoney.coin : this.model.commonMoney.coin;
        if (18 > b && (c = this.parentView, d = function()
          {
            c.nativeFlag && f.setWebView(!1);
            c.removeView()
          }, 16 > b && 5E3 < k || 3E4 < k))
        {
          new a.PopupClass(
          {
            content: "月の購入限度額を超える為、<br>購入することができません。",
            closeBtnText: "OK",
            exClass: "purchaseError",
            popupType: "typeC"
          }, null, null, d);
          return
        }
        h = this;
        this.purchaseDecide(e)
      }
      else a.purchaseSaving = this.model, this.parentView.checkBirthDay()
    },
    ageCheck: function()
    {
      var e = a.storage.user.toJSON().birthDay.split("/"),
        c = l.getPageJson().currentTime.split(" ")[0].split("/"),
        d = Number(c[0] - e[0]);
      Number(e[1]) > Number(c[1]) && d--;
      return d
    },
    purchaseDecide: function(e)
    {
      e.preventDefault();
      if (!a.isScrolled() && !g)
      {
        g = !0;
        a.androidKeyStop = !0;
        a.tapBlock(!0);
        a.addClass(a.doc.getElementById("curtain"), "show");
        var c = h.parentView;
        $("#commandDiv").on("purchaseCallback", function(d, b)
        {
          g = !1;
          $("#commandDiv").off("purchaseCallback");
          a.androidKeyStop = !1;
          d = function()
          {
            !b || b && !b.message ? (a.tapBlock(!1), c.nativeFlag && setTimeout(function()
            {
              f.setWebView(!1)
            }, 1E3), c.removeView()) : (new a.PopupClass(
            {
              content: b.message,
              closeBtnText: "OK",
              exClass: "purchaseError",
              popupType: "typeC"
            }, null, null, function()
            {
              c.nativeFlag && setTimeout(function()
              {
                f.setWebView(!1)
              }, 1E3);
              c.removeView()
            }), a.tapBlock(!1))
          };
          "error" !== b.resultCode ? (b && b.fox && (b.adjust ? f.setFoxData(b.fox, b.adjust) : f.setFoxData(b.fox)), a.responseSetStorage(b), a.globalMenuView && a.globalMenuView.itemChangeHandler(), a.removeClass(a.doc.getElementById("curtain"), "show"), d(b)) : (a.tapBlock(!1), a.removeClass(a.doc.getElementById("curtain"), "show"), new a.PopupClass(
          {
            content: b.errorTxt,
            closeBtnText: "OK",
            exClass: "purchaseError",
            popupType: "typeC"
          }, null, null, d))
        });
        f.purchaseItem(h.model);
        window.isBrowser && (a.androidKeyStop = !1, c.nativeFlag && f.setWebView(!1), c.removeView(), a.tapBlock(!1), a.removeClass(a.doc.getElementById("curtain"), "show"))
      }
    },
    removeView: function()
    {
      h && (h = null);
      this.off();
      this.remove()
    }
  })
});
