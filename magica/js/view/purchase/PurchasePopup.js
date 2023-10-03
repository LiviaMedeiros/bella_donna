define("underscore backbone backboneCommon ajaxControl command text!template/purchase/PurchasePop.html text!template/etc/LawPopup.html js/view/purchase/PurchasePopupPartView".split(" "), function(f, q, a, g, e, r, t, k)
{
  var u = g.getPageJson(),
    m = [],
    l = q.View.extend(
    {
      events: function()
      {
        var c = {};
        c[a.cgti + " .purchaseLawBtn"] = this.lawPopup;
        return c
      },
      initialize: function(c, b)
      {
        this.model = (window.isLocal ? JSON.parse(c) : c).userCommonMoneyList;
        b && (this.nativeFlag = !0);
        this.template = f.template(r);
        a.ua.ios && !a.noGetPurchaseStatus ? this.getPurchaseStatus(
        {
          that: this
        }) : this.createDom()
      },
      render: function()
      {
        this.$el.html(this.template(
        {
          model: this.model,
          money: a.getTotalStone()
        }));
        return this
      },
      createDom: function()
      {
        var c = this;
        new a.PopupClass(
        {
          title: "マギアストーン購入",
          content: "",
          popupType: "typeB",
          exClass: "purchasePop"
        }, null, null, function()
        {
          c.nativeFlag && e.setWebView(!1);
          c.removeView()
        });
        a.doc.getElementById("popupArea").getElementsByClassName("popupTextArea")[0].appendChild(this.render().el);
        k.prototype.parentView = this;
        k.prototype.template = f.template($("#purchaseParts").text());
        var b = a.doc.createDocumentFragment(),
          h = g.getPageJson().currentTime.substr(0, 10);
        f.each(this.model, function(a, c)
        {
          "DAILY" === a.commonMoney.commonMoneyType && a.purchasedAt && a.purchasedAt.substr(0, 10) === h || (a.purchaseStatus = "", f.each(m, function(c, h, b)
          {
            -1 < c.indexOf(a.moneyCode) && ("ONCE" == a.commonMoney.commonMoneyType || "PASSPORT" == a.commonMoney.commonMoneyType) && (a.purchaseStatus = "hold")
          }), c = new k(a), b.appendChild(c.render().el))
        });
        a.doc.getElementById("PurchaseListWrap").appendChild(b);
        a.scrollSetX("purchaseScrollX", "purchaseScrollInner")
      },
      lawPopup: function(c)
      {
        c.preventDefault();
        if (!a.isScrolled())
        {
          var b = this;
          new a.PopupClass(
          {
            title: "特定商取引法・資金決済法に関して",
            content: t,
            popupType: "typeB"
          }, null, null, function()
          {
            b.nativeFlag ? g.ajaxSimpleGet(a.linkList.moneyShopList, "", function(a)
            {
              b.removeView();
              new l(a, !0)
            }) : b.parentView.moneyPopup()
          });
          a.doc.getElementById("rulesBase").getElementsByClassName("ruleDisp")[0].addEventListener(a.cgti, function(c)
          {
            c.preventDefault();
            a.isScrolled() || c.currentTarget.classList.contains("current") || (a.doc.getElementById("rulesBase").className = "rule", a.scrollRefresh(), a.removeClass(a.doc.getElementById("rulesBase").getElementsByClassName("thirteenDisp")[0], "current"), a.addClass(c.currentTarget, "current"))
          });
          a.doc.getElementById("rulesBase").getElementsByClassName("thirteenDisp")[0].addEventListener(a.cgti, function(c)
          {
            c.preventDefault();
            a.isScrolled() || c.currentTarget.classList.contains("current") || (a.doc.getElementById("rulesBase").className = "thirteen", a.scrollRefresh(), a.removeClass(a.doc.getElementById("rulesBase").getElementsByClassName("ruleDisp")[0], "current"), a.addClass(c.currentTarget, "current"))
          });
          a.scrollSet("rulesBase", "rulesPop")
        }
      },
      checkBirthDay: function()
      {
        var c = this;
        require(["text!template/purchase/PurchaseTemps.html?bust=" + (new Date).getTime], function(b)
        {
          b = f.template(b);
          var h = a.doc.createElement("div");
          h.innerHTML = b(
          {
            platform: a.thisPlatform
          });
          var n = function()
            {
              g.ajaxSimpleGet(a.linkList.moneyShopList, "", function(a)
              {
                c.nativeFlag ? new l(a, !0) : new l(a)
              })
            },
            k = function(b)
            {
              b.preventDefault();
              a.isScrolled() || (a.tapBlock(!0), b = {
                year: a.doc.getElementById("year").value,
                month: a.doc.getElementById("day").value
              }, g.ajaxPost(a.linkList.inputBirthDay, b, function(b)
              {
                var d = function()
                {
                  a.tapBlock(!0);
                  if (a.purchaseSaving)
                  {
                    var b = function(b)
                      {
                        !b || b && !b.message ? (a.tapBlock(!1), c.nativeFlag && setTimeout(function()
                        {
                          e.setWebView(!1)
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
                            e.setWebView(!1)
                          }, 1E3);
                          c.removeView()
                        }), a.tapBlock(!1))
                      },
                      d = a.storage.user.toJSON(),
                      h = d.monthlyPurchase | 0,
                      p = d.birthDay.split("/"),
                      f = g.getPageJson().currentTime.split(" ")[0].split("/"),
                      d = Number(f[0] - p[0]);
                    Number(p[1]) > Number(f[1]) && d--;
                    if (18 > d && (h += a.purchaseSaving.commonMoney.coin, 16 > d && 5E3 < h || 3E4 < h))
                    {
                      new a.PopupClass(
                      {
                        content: "月の購入限度額を超える為、<br>購入することができません。",
                        closeBtnText: "OK",
                        exClass: "purchaseError",
                        popupType: "typeC"
                      }, null, null, b);
                      a.tapBlock(!1);
                      return
                    }
                    a.addClass(a.doc.getElementById("curtain"), "show");
                    $("#commandDiv").on("purchaseCallback", function(c, d)
                    {
                      $("#commandDiv").off("purchaseCallback");
                      "error" !== d.resultCode ? (d && d.fox && (d.adjust ? e.setFoxData(d.fox, d.adjust) : e.setFoxData(d.fox)), a.responseSetStorage(d), a.globalMenuView && a.globalMenuView.itemChangeHandler(), a.removeClass(a.doc.getElementById("curtain"), "show"), b(d)) : (a.tapBlock(!1), a.removeClass(a.doc.getElementById("curtain"), "show"), new a.PopupClass(
                      {
                        content: d.errorTxt,
                        closeBtnText: "OK",
                        exClass: "purchaseError",
                        popupType: "typeC"
                      }, null, null, b))
                    });
                    e.purchaseItem(a.purchaseSaving);
                    a.purchaseSaving = null;
                    window.isBrowser && (a.doc.getElementById("tapBlock").style.block = "", a.removeClass(a.doc.getElementById("curtain"), "show"), b())
                  }
                };
                "error" !== b.resultCode && (a.responseSetStorage(b), a.tapBlock(!1), new a.PopupClass(
                {
                  title: "年齢認証",
                  content: "ありがとうございます。<br>年齢認証が完了しました。<br>引き続きゲームをお楽しみください。",
                  closeBtnText: "OK",
                  exClass: "purchasePop"
                }, null, null, d))
              }))
            };
          b = f.template(h.getElementsByClassName("birthCheckFirst")[0].innerText);
          new a.PopupClass(
          {
            title: "年齢認証が必要です",
            content: b(),
            exClass: "purchasePop"
          }, null, null, n);
          a.doc.getElementById("birthCheck").addEventListener(a.cgti, function(c)
          {
            c.preventDefault();
            if (!a.isScrolled())
            {
              c = f.template(h.getElementsByClassName("birthInputs")[0].innerText);
              new a.PopupClass(
              {
                title: "年齢認証",
                content: c(),
                exClass: "purchasePop"
              }, null, null, n);
              a.doc.getElementById("birthDecide").addEventListener(a.cgti, k);
              c = u.currentTime.substr(0, 4) | 0;
              for (var b = c - 100, e = a.doc.createDocumentFragment(); b < c;)
              {
                var g = a.doc.createElement("option");
                g.value = b;
                g.innerHTML = b;
                1995 === b && (g.selected = "selected");
                e.appendChild(g);
                b = b + 1 | 0
              }
              a.doc.getElementById("year").appendChild(e);
              c = a.doc.createDocumentFragment();
              for (b = 1; 13 > b; b++) e = a.doc.createElement("option"), e.value = b, e.innerHTML = b, c.appendChild(e);
              a.doc.getElementById("day").appendChild(c)
            }
          })
        })
      },
      getPurchaseStatus: function(a)
      {
        var b = a.that;
        m = [];
        $("#commandDiv").on("nativeCallback", function(a, c)
        {
          $("#commandDiv").off();
          (a = c.product_ids) && 0 < a.length && f.each(a, function(a, b, c)
          {
            m.push(a)
          });
          b.createDom()
        });
        e.getPurchaseStatus();
        a = {
          product_ids: ["pack_aa1", "pack_bb1", "pack_bb"]
        };
        window.isBrowser && nativeCallback(a)
      },
      removeView: function()
      {
        a.purchaseSaving = null;
        this.trigger("removeChild");
        this.off();
        a.g_popup_instance && a.g_popup_instance.popupView.close();
        this.remove()
      }
    });
  return l
});
