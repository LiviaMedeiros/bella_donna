define(["underscore", "backbone", "backboneCommon", "ajaxControl", "command"], function(m, z, a, l, f)
{
  var h, n, t, u, p, k, q, e = !1,
    x = function(b, d)
    {
      n = h = null;
      e = !1;
      d && (h = d);
      b && (n = b);
      new a.PopupClass(
      {
        title: "AP回復",
        content: "",
        exClass: "apPopup",
        popupType: "typeB"
      });
      a.doc.createDocumentFragment();
      var c = a.doc.createElement("div"),
        g = {};
      b = a.storage.userItemList;
      b.findWhere(
      {
        itemId: "CURE_AP_50"
      }) ? g.ap50 = b.findWhere(
      {
        itemId: "CURE_AP_50"
      }).toJSON() : g.ap50 = {
        quantity: 0
      };
      b.findWhere(
      {
        itemId: "CURE_AP"
      }) ? g.apMax = b.findWhere(
      {
        itemId: "CURE_AP"
      }).toJSON() : g.apMax = {
        quantity: 0
      };
      require(["text!template/user/APPopup.html"], function(b)
      {
        t = m.template(b);
        c.innerHTML = t(
        {
          model: g,
          userItemList: a.storage.userItemList,
          message: n
        });
        a.doc.getElementById("popupArea").getElementsByClassName("popupTextArea")[0].appendChild(c);
        p = a.storage.userStatusList.findWhere(
        {
          statusId: "ACP"
        }).toJSON().point;
        k = a.storage.userStatusList.findWhere(
        {
          statusId: "MAX_ACP"
        }).toJSON().point;
        b = a.doc.getElementById("popupArea").getElementsByClassName("popACP")[0];
        p >= 3 * k ? (a.addClass(b, "limit"), v()) : p > k && a.addClass(b, "over");
        b.textContent = p;
        a.doc.getElementById("popupArea").getElementsByClassName("popMAX_ACP")[0].textContent = k;
        a.doc.getElementById("useItemWrap").addEventListener(a.cgti, w)
      })
    },
    w = function(b)
    {
      if (b.target.classList.contains("cureBtn") && !b.target.classList.contains("off") && !a.isScrolled())
      {
        b.preventDefault();
        a.globalMenuView && a.globalMenuView.awakeSuspend();
        q = b.target.dataset.item;
        var d = a.doc.createElement("div"),
          c = {};
        c.nowACP = a.storage.userStatusList.findWhere(
        {
          statusId: "ACP"
        }).toJSON().point;
        c.nowMAX = a.storage.userStatusList.findWhere(
        {
          statusId: "MAX_ACP"
        }).toJSON().point;
        b = a.storage.userItemList;
        var g = "text!template/user/APPopup2.html",
          e = "typeC",
          f = "apPopup";
        switch (q)
        {
          case "CURE_AP_50":
            c.itemName = "AP回復薬50";
            c.after = (c.nowACP | 0) + 50;
            c.quantity = b.findWhere(
            {
              itemId: "CURE_AP_50"
            }).toJSON().quantity;
            break;
          case "CURE_AP":
            c.itemName = "AP回復薬MAX";
            c.after = (c.nowACP | 0) + (k | 0);
            c.quantity = b.findWhere(
            {
              itemId: "CURE_AP"
            }).toJSON().quantity;
            break;
          case "MONEY":
            g = "text!template/user/APPopupForMoney.html", e = "typeA", f = "apPopup forMoney", c.itemName = "マギアストーン", c.after = (c.nowACP | 0) + (k | 0), c.moneyObj = a.getTotalStone(), c.remainStone = a.calcExpendStone(
            {
              quantity: 5,
              isPurchasedMoneyOnly: !1
            })
        }
        new a.PopupClass(
        {
          title: "回復確認",
          content: "",
          exClass: f,
          popupType: e
        });
        require([g], function(b)
        {
          u = m.template(b);
          d.innerHTML = u(
          {
            model: a.storage,
            item: c
          });
          a.doc.getElementById("popupArea").getElementsByClassName("popupTextArea")[0].appendChild(d);
          a.doc.getElementById("confirmBtns").addEventListener(a.cgti, y)
        });
        setTimeout(function()
        {
          m.map(c.moneyObj, function(a, b)
          {
            $(".APPopWrap #remain_" + b).removeClass("same");
            a == c.remainStone[b] && $(".APPopWrap #remain_" + b).addClass("same")
          });
          m.map(["Arrow", "AfterText"], function(a, b)
          {
            $(".APPopWrap #AP" + a).removeClass("limit");
            c.after >= 3 * c.nowMAX && $(".APPopWrap #AP" + a).addClass("limit")
          })
        }, 150)
      }
    },
    y = function(b)
    {
      b.preventDefault();
      a.isScrolled() || !b.target.classList.contains("btn") || e || (e = !0, "cancel" === b.target.dataset.action ? (e = !1, r(n, h)) : "MONEY" === q ? (b = function(b)
      {
        "error" !== b.resultCode && (b = JSON.parse(b), a.responseSetStorage(b), void 0 !== a.noticeAp && !0 === a.noticeAp ? f.noticeApFullSet(0) : void 0 === a.noticeAp && ($("#configCallback").on("configCallback", function(b, d)
        {
          $("#configCallback").off();
          a.noticeAp = 1 === d.ap ? !0 : !1;
          a.noticeAp && f.noticeApFullSet(0)
        }), f.noticeApConfig("configCallback")), h ? (a.g_popup_instance && a.g_popup_instance.popupView.close(), e = !1, h()) : (e = !1, r()))
      }, l.ajaxPlainPost(a.linkList.useMoneyProcess, "COMMAND_TYPE=2&ITEM_TYPE=1&ITEM_NUMBER=1", b)) : (b = function(b)
      {
        if ("error" !== b.resultCode)
        {
          a.responseSetStorage(b);
          if (void 0 !== a.noticeAp && !0 === a.noticeAp)
          {
            if (!a.storage.userStatusList || !l.getPageJson().currentTime) return;
            b = a.storage.userStatusList.findWhere(
            {
              statusId: "ACP"
            }).toJSON();
            var c = a.storage.userStatusList.findWhere(
            {
              statusId: "MAX_ACP"
            }).toJSON();
            b.point >= c.point ? f.noticeApFullSet(0) : (b = a.getApRemainTime(b, c, l.getPageJson().currentTime), f.noticeApFullSet(b))
          }
          else void 0 === a.noticeAp && ($("#configCallback").on("configCallback", function(b, c)
          {
            $("#configCallback").off();
            a.noticeAp = 1 === c.ap ? !0 : !1;
            a.noticeAp && (b = a.storage.userStatusList.findWhere(
            {
              statusId: "ACP"
            }).toJSON(), c = a.storage.userStatusList.findWhere(
            {
              statusId: "MAX_ACP"
            }).toJSON(), b = a.getApRemainTime(b, c, l.getPageJson().currentTime), f.noticeApFullSet(b))
          }), f.noticeApConfig("configCallback"));
          h ? (a.g_popup_instance && a.g_popup_instance.popupView.close(), e = !1, h()) : (e = !1, r())
        }
      }, l.ajaxPost(a.linkList.useItem,
      {
        itemId: q,
        num: 1
      }, b)))
    },
    v = function()
    {
      for (var b = a.doc.getElementById("useItemWrap").getElementsByClassName("cureBtn"), d = b.length; 0 < d;) d = d - 1 | 0, a.addClass(b[d], "off");
      a.addClass(a.doc.querySelector(".maxTime"), "none");
      a.removeClass(a.doc.querySelector("#apPointWrap"), "timeShow")
    },
    r = function(b, d)
    {
      var c = a.storage.userStatusList.findWhere(
        {
          statusId: "ACP"
        }).toJSON().point,
        e = a.storage.userStatusList.findWhere(
        {
          statusId: "MAX_ACP"
        }).toJSON().point;
      c >= 3 * e ? (b = {
        title: "AP回復",
        content: "APはこれ以上回復できません。<br>クエストをプレイしてAPを消費することで<br>再度回復が可能になります。",
        popupType: "typeA",
        closeBtnText: "OK"
      }, "MainQuest" !== a.location && "SubQuest" !== a.location && "CharaQuest" !== a.location && "EventQuest" !== a.location && (b.decideBtnText = "クエスト", b.decideBtnLink = "#/MainQuest"), new a.PopupClass(b)) : x(b, d)
    };
  return {
    instantPopup: function(a, d)
    {
      r(a, d)
    },
    apCureEvents: function()
    {
      var b = a.storage.userStatusList,
        d;
      d = b.findWhere(
      {
        statusId: "ACP"
      }).toJSON().point;
      var b = b.findWhere(
        {
          statusId: "MAX_ACP"
        }).toJSON().point,
        c = a.doc.getElementById("apPointWrap").getElementsByClassName("popACP")[0];
      c.textContent = d;
      a.doc.getElementById("apPointWrap").getElementsByClassName("popMAX_ACP")[0].textContent = b;
      d >= 3 * b ? (a.addClass(c, "limit"), v()) : d > b && a.addClass(c, "over")
    }
  }
});
