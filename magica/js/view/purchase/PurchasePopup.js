define("underscore backbone backboneCommon ajaxControl command text!template/purchase/PurchasePop.html text!template/etc/LawPopup.html js/view/purchase/PurchasePopupPartView".split(" "), function(h, q, a, k, f, r, t, w)
{
  var u = k.getPageJson(),
    m = [],
    l = q.View.extend(
    {
      events: function()
      {
        var b = {};
        b[a.cgti + " .purchaseLawBtn"] = this.lawPopup;
        return b
      },
      initialize: function(a, d)
      {
        this.model = (window.isLocal ? JSON.parse(a) : a).userCommonMoneyList;
        d && (this.nativeFlag = !0);
        this.template = h.template(r);
        this.createDom()
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
        var b = this;
        new a.PopupClass(
        {
          title: "マギアストーン購入",
          content: "",
          popupType: "typeB",
          exClass: "purchasePop"
        }, null, null, function()
        {
          b.nativeFlag && f.setWebView(!1);
          b.removeView()
        });
        a.doc.getElementById("popupArea").getElementsByClassName("popupTextArea")[0].appendChild(this.render().el)
      },
      lawPopup: function(b)
      {
        b.preventDefault();
        if (!a.isScrolled())
        {
          var d = this;
          new a.PopupClass(
          {
            title: "特定商取引法・資金決済法に関して",
            content: t,
            popupType: "typeB"
          }, null, null, function()
          {
            d.nativeFlag ? k.ajaxSimpleGet(a.linkList.moneyShopList, "", function(a)
            {
              d.removeView();
              new l(a, !0)
            }) : d.parentView.moneyPopup()
          });
          a.doc.getElementById("rulesBase").getElementsByClassName("ruleDisp")[0].addEventListener(a.cgti, function(b)
          {
            b.preventDefault();
            a.isScrolled() || b.currentTarget.classList.contains("current") || (a.doc.getElementById("rulesBase").className = "rule", a.scrollRefresh(), a.removeClass(a.doc.getElementById("rulesBase").getElementsByClassName("thirteenDisp")[0], "current"), a.addClass(b.currentTarget, "current"))
          });
          a.doc.getElementById("rulesBase").getElementsByClassName("thirteenDisp")[0].addEventListener(a.cgti, function(b)
          {
            b.preventDefault();
            a.isScrolled() || b.currentTarget.classList.contains("current") || (a.doc.getElementById("rulesBase").className = "thirteen", a.scrollRefresh(), a.removeClass(a.doc.getElementById("rulesBase").getElementsByClassName("ruleDisp")[0], "current"), a.addClass(b.currentTarget, "current"))
          });
          a.scrollSet("rulesBase", "rulesPop")
        }
      },
      checkBirthDay: function()
      {
        var b = this;
        require(["text!template/purchase/PurchaseTemps.html?bust=" + (new Date).getTime], function(d)
        {
          d = h.template(d);
          var g = a.doc.createElement("div");
          g.innerHTML = d(
          {
            platform: a.thisPlatform
          });
          var n = function()
            {
              k.ajaxSimpleGet(a.linkList.moneyShopList, "", function(a)
              {
                b.nativeFlag ? new l(a, !0) : new l(a)
              })
            },
            v = function(e)
            {
              e.preventDefault();
              a.isScrolled() || (a.tapBlock(!0), e = {
                year: a.doc.getElementById("year").value,
                month: a.doc.getElementById("day").value
              }, k.ajaxPost(a.linkList.inputBirthDay, e, function(c)
              {
                var e = function()
                {
                  a.tapBlock(!0);
                  if (a.purchaseSaving)
                  {
                    var e = function(c)
                      {
                        !c || c && !c.message ? (a.tapBlock(!1), b.nativeFlag && setTimeout(function()
                        {
                          f.setWebView(!1)
                        }, 1E3), b.removeView()) : (new a.PopupClass(
                        {
                          content: c.message,
                          closeBtnText: "OK",
                          exClass: "purchaseError",
                          popupType: "typeC"
                        }, null, null, function()
                        {
                          b.nativeFlag && setTimeout(function()
                          {
                            f.setWebView(!1)
                          }, 1E3);
                          b.removeView()
                        }), a.tapBlock(!1))
                      },
                      c = a.storage.user.toJSON(),
                      d = c.monthlyPurchase | 0,
                      g = c.birthDay.split("/"),
                      p = k.getPageJson().currentTime.split(" ")[0].split("/"),
                      c = Number(p[0] - g[0]);
                    Number(g[1]) > Number(p[1]) && c--;
                    if (18 > c && (d += a.purchaseSaving.commonMoney.coin, 16 > c && 5E3 < d || 3E4 < d))
                    {
                      new a.PopupClass(
                      {
                        content: "月の購入限度額を超える為、<br>購入することができません。",
                        closeBtnText: "OK",
                        exClass: "purchaseError",
                        popupType: "typeC"
                      }, null, null, e);
                      a.tapBlock(!1);
                      return
                    }
                    a.addClass(a.doc.getElementById("curtain"), "show");
                    $("#commandDiv").on("purchaseCallback", function(c, b)
                    {
                      $("#commandDiv").off("purchaseCallback");
                      "error" !== b.resultCode ? (b && b.fox && (b.adjust ? f.setFoxData(b.fox, b.adjust) : f.setFoxData(b.fox)), a.responseSetStorage(b), a.globalMenuView && a.globalMenuView.itemChangeHandler(), a.removeClass(a.doc.getElementById("curtain"), "show"), e(b)) : (a.tapBlock(!1), a.removeClass(a.doc.getElementById("curtain"), "show"), new a.PopupClass(
                      {
                        content: b.errorTxt,
                        closeBtnText: "OK",
                        exClass: "purchaseError",
                        popupType: "typeC"
                      }, null, null, e))
                    });
                    f.purchaseItem(a.purchaseSaving);
                    a.purchaseSaving = null;
                    window.isBrowser && (a.doc.getElementById("tapBlock").style.block = "", a.removeClass(a.doc.getElementById("curtain"), "show"), e())
                  }
                };
                "error" !== c.resultCode && (a.responseSetStorage(c), a.tapBlock(!1), new a.PopupClass(
                {
                  title: "年齢認証",
                  content: "ありがとうございます。<br>年齢認証が完了しました。<br>引き続きゲームをお楽しみください。",
                  closeBtnText: "OK",
                  exClass: "purchasePop"
                }, null, null, e))
              }))
            };
          d = h.template(g.getElementsByClassName("birthCheckFirst")[0].innerText);
          new a.PopupClass(
          {
            title: "年齢認証が必要です",
            content: d(),
            exClass: "purchasePop"
          }, null, null, n);
          a.doc.getElementById("birthCheck").addEventListener(a.cgti, function(b)
          {
            b.preventDefault();
            if (!a.isScrolled())
            {
              b = h.template(g.getElementsByClassName("birthInputs")[0].innerText);
              new a.PopupClass(
              {
                title: "年齢認証",
                content: b(),
                exClass: "purchasePop"
              }, null, null, n);
              a.doc.getElementById("birthDecide").addEventListener(a.cgti, v);
              b = u.currentTime.substr(0, 4) | 0;
              for (var c = b - 100, d = a.doc.createDocumentFragment(); c < b;)
              {
                var e = a.doc.createElement("option");
                e.value = c;
                e.innerHTML = c;
                1995 === c && (e.selected = "selected");
                d.appendChild(e);
                c = c + 1 | 0
              }
              a.doc.getElementById("year").appendChild(d);
              b = a.doc.createDocumentFragment();
              for (c = 1; 13 > c; c++) d = a.doc.createElement("option"), d.value = c, d.innerHTML = c, b.appendChild(d);
              a.doc.getElementById("day").appendChild(b)
            }
          })
        })
      },
      getPurchaseStatus: function(a)
      {
        var b = a.that;
        m = [];
        $("#commandDiv").on("nativeCallback", function(a, d)
        {
          $("#commandDiv").off();
          (a = d.product_ids) && 0 < a.length && h.each(a, function(a, b, c)
          {
            m.push(a)
          });
          b.createDom()
        });
        f.getPurchaseStatus();
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
