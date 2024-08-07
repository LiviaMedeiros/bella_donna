define(["underscore", "backbone", "backboneCommon", "ajaxControl", "command"], function(e, g, a, h, q)
{
  var k, f = function()
    {
      var c = function(c)
        {
          new a.PopupClass(
          {
            title: "エラー",
            content: c.content + "<br>もう一度入力をお願いします。",
            closeBtnText: "もう一度入力する"
          }, null, function() {}, function()
          {
            f()
          })
        },
        b = new(g.View.extend(
        {
          initialize: function(c)
          {
            this.template = e.template(a.doc.getElementById("tempRegisterRepaymentMailPopup").innerText)
          },
          render: function()
          {
            var a = 0;
            k.userItemList && e.each(k.userItemList, function(c, b, d)
            {
              "MONEY" == c.itemId && (a = c.quantity)
            });
            this.$el.html(this.template(
            {
              model:
              {
                gameMoney: a,
                money: 15 * a
              }
            }));
            return this
          },
          removeView: function()
          {
            this.off();
            this.remove()
          }
        }));
      new a.PopupClass(
      {
        title: "払戻し申請",
        popupId: "RegisterRepaymentMailPop",
        content: $(b.render().el).html(),
        popupType: "typeB",
        closeBtnText: "閉じる",
        decideBtnText: "送信",
        decideBtnEvent: function()
        {
          var b = $("#inputMail").val();
          p(
          {
            mailAddress: b
          }) ? h.ajaxPost(a.linkList.sendRepaymentMail,
          {
            mailAddress: b
          }, function(b)
          {
            console.log("res", b);
            if (b.errorMessage) new a.PopupClass(
            {
              title: "エラー",
              content: b.errorMessage,
              closeBtnText: "閉じる"
            }, null, function() {}, function()
            {
              f()
            });
            else
            {
              var d;
              b.UserRepaymentList ? (e.each(b.UserRepaymentList, function(a, b, c)
              {
                a.enableFlag && a.mailAddress && (d = a.mailAddress)
              }), d ? (localStorage.setItem("isReInputMail", "entered"), l(
              {
                mailAddress: d
              })) : c(
              {
                content: "メールアドレスが確認できませんでした。"
              })) : c(
              {
                content: "メールアドレスが確認できませんでした。"
              })
            }
          }) : c(
          {
            content: "メールアドレスが間違っている可能性があります。"
          })
        }
      }, null, function()
      {
        $("#RegisterRepaymentMailPop .ExplanBtn").off();
        $("#RegisterRepaymentMailPop .ExplanBtn").on(a.cgti, function(b)
        {
          b && b.preventDefault();
          a.isScrolled() || (console.log("注意事項ボタン押した"), m())
        });
        a.nativeKeyBoard("inputMail", -1, 1)
      }, function()
      {
        b.removeView()
      })
    },
    l = function(c)
    {
      var b = c.mailAddress,
        d = new(g.View.extend(
        {
          initialize: function(b)
          {
            this.template = e.template(a.doc.getElementById("tempAuthNumberPopup").innerText)
          },
          render: function()
          {
            this.$el.html(this.template(
            {
              model:
              {
                mailAddress: b
              }
            }));
            return this
          },
          removeView: function()
          {
            this.off();
            this.remove()
          }
        }));
      new a.PopupClass(
      {
        title: "確認番号確認",
        popupId: "AuthNumberPop",
        content: $(d.render().el).html(),
        popupType: "typeB",
        closeBtnText: "閉じる",
        decideBtnText: "確認",
        decideBtnEvent: function()
        {
          console.log("番号を送信します。");
          var c = $("#inputAuthNum").val();
          c ? h.ajaxPost(a.linkList.registerRepaymentMail,
          {
            repaymentCode: c
          }, function(c)
          {
            console.log("res", c);
            c.errorMessage ? new a.PopupClass(
            {
              title: "エラー",
              content: c.errorMessage,
              closeBtnText: "閉じる"
            }, null, function() {}, function()
            {
              l(
              {
                mailAddress: b
              })
            }) : n()
          }) : new a.PopupClass(
          {
            title: "エラー",
            content: "確認番号を入力してください",
            closeBtnText: "閉じる"
          })
        }
      }, null, function()
      {
        $("#AuthNumberPop .issueBtn").off();
        $("#AuthNumberPop .issueBtn").on(a.cgti, function(b)
        {
          b && b.preventDefault();
          a.isScrolled() || (console.log("確認番号の再発行ボタン押した"), localStorage.removeItem("isReInputMail"), f())
        });
        a.nativeKeyBoard("inputAuthNum", -1, 1);
        $("#AuthNumberPop .ExplanBtn").off();
        $("#AuthNumberPop .ExplanBtn").on(a.cgti, function(b)
        {
          b && b.preventDefault();
          a.isScrolled() || (console.log("注意事項ボタン押した"), m())
        })
      }, function()
      {
        d.removeView()
      })
    },
    n = function()
    {
      var c = new(g.View.extend(
      {
        initialize: function(b)
        {
          this.template = e.template(a.doc.getElementById("tempRequestCompletePopup").innerText)
        },
        render: function()
        {
          this.$el.html(this.template(
          {
            model:
            {}
          }));
          return this
        },
        removeView: function()
        {
          this.off();
          this.remove()
        }
      }));
      new a.PopupClass(
      {
        title: "払戻し申請受付完了",
        popupId: "RequestComplete",
        content: $(c.render().el).html(),
        closeBtnText: "閉じる"
      }, null, function()
      {
        $("#RequestComplete .ExplanBtn").off();
        $("#RequestComplete .ExplanBtn").on(a.cgti, function(b)
        {
          b && b.preventDefault();
          a.isScrolled() || (console.log("注意事項ボタン押した"), m())
        })
      }, function()
      {
        c.removeView()
      })
    },
    m = function()
    {
      var c = new(g.View.extend(
      {
        initialize: function(b)
        {
          this.template = e.template(a.doc.getElementById("tempRegisterRepaymentMailCautionPopup").innerText)
        },
        render: function()
        {
          this.$el.html(this.template(
          {
            model:
            {}
          }));
          return this
        },
        removeView: function()
        {
          this.off();
          this.remove()
        }
      }));
      new a.PopupClass(
      {
        title: "お手続き・注意事項について",
        popupId: "RegisterRepaymentMailCaution",
        content: $(c.render().el).html(),
        closeBtnText: "閉じる",
        popupType: "typeB"
      }, null, function()
      {
        a.scrollRefresh();
        a.scrollSet("cautionBase", "cautionPop")
      }, function()
      {
        c.removeView()
      })
    },
    p = function(a)
    {
      a = a.mailAddress;
      var b = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]+.[A-Za-z0-9]+$/,
        c = !1;
      a && (c = b.test(a));
      return c
    };
  return {
    checkIsRegistedRepaymentMail: function(c)
    {
      k = c.pageJson;
      h.ajaxPost(a.linkList.isRegisterRepaymentMail,
      {}, function(a)
      {
        console.log("isRegisterRepaymentMail_res", a);
        a.userRepayment ? a.userRepayment.authFlag ? n() : localStorage.getItem("isReInputMail") && a.userRepayment.mailAddress ? l(
        {
          mailAddress: a.userRepayment.mailAddress
        }) : f() : f()
      })
    }
  }
});
