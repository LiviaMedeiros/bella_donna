define("underscore backbone backboneCommon ajaxControl command text!template/chara/CharaComposeMagia.html text!template/chara/CharaMagiaGiftParts.html text!template/chara/CharaMagiaComposePopup.html text!css/chara/CharaComposeMagia.css text!css/chara/CharaCommon.css cardUtil CharaCommon".split(" "), function(h, p, a, m, n, w, x, y, z, A, t, c)
{
  var u = null,
    q, d, v = p.Model.extend(
    {}),
    B = {
      1: 1E4,
      2: 1E5,
      3: 3E5,
      4: 1E6,
      5: "-"
    },
    D = p.View.extend(
    {
      initialize: function(a)
      {
        this.giftViews = [];
        this.template = h.template(w);
        this.createDom()
      },
      events: function()
      {
        var b = {};
        b[a.cgti + " #mainBtn"] = this.composeFunc;
        return b
      },
      render: function()
      {
        this.$el.html(this.template(m.getPageJson()));
        return this
      },
      createDom: function()
      {
        a.content.prepend(this.render().el);
        this.createView()
      },
      createView: function()
      {
        a.setGlobalView();
        a.firstNaviCheck(q);
        a.tapBlock(!1);
        a.ready.hide()
      },
      viewUpdate: function()
      {
        c.charaDataView.model.toJSON();
        var b = c.charaDataView.model.toJSON().magiaLevel;
        a.addClass(a.doc.querySelector("#giftWrap"), "canEvolve");
        a.removeClass(a.doc.querySelector("#mainBtn"), "off");
        a.removeClass(a.doc.querySelector("#richeWrap"), "hide");
        a.doc.querySelector(".needRiche").textContent = B[b];
        this.canCompose ? a.removeClass(a.doc.querySelector("#mainBtn"), "off") : a.addClass(a.doc.querySelector("#mainBtn"), "off")
      },
      composeFunc: function(b)
      {
        b.preventDefault();
        if (!a.isScrolled())
          if (b = c.charaDataView.model.toJSON(), b.magiaLevel == b.episodeLevel) new a.PopupClass(
          {
            title: "マギア強化できません",
            content: "マギアレベルが上限に達しています",
            closeBtnText: "閉じる",
            param:
            {
              width: "490px",
              height: "360px",
              top: "-webkit-calc(50% - 189px)",
              left: "-webkit-calc(50% - 245px)"
            },
            popupType: "original",
            popupId: "composeConfirm",
            showCurtain: !1
          }, null, null, function()
          {
            a.removeClass(c.charaDataView.el, "popupOpen");
            a.removeClass(c.curtainView.el, "show")
          }), a.addClass(c.charaDataView.el, "popupOpen"), a.addClass(c.curtainView.el, "show");
          else
          {
            var g = a.storage.gameUser.toJSON().riche;
            if (parseInt(a.doc.querySelector(".needRiche").textContent) > g) new a.PopupClass(
            {
              title: "マギア強化できません",
              content: "CCが不足しています",
              closeBtnText: "閉じる",
              param:
              {
                width: "490px",
                height: "360px",
                top: "-webkit-calc(50% - 189px)",
                left: "-webkit-calc(50% - 245px)"
              },
              popupType: "original",
              popupId: "composeConfirm",
              showCurtain: !1
            }, null, null, function()
            {
              a.removeClass(c.charaDataView.el, "popupOpen");
              a.removeClass(c.curtainView.el, "show");
              a.removeClass(a.doc.querySelector(".needRiche"), "c_red")
            }), a.addClass(c.charaDataView.el, "popupOpen"), a.addClass(c.curtainView.el, "show"), a.addClass(a.doc.querySelector(".needRiche"), "c_red");
            else
            {
              g = b.chara.name;
              b.chara.title && (g += "(" + b.chara.title + ")");
              var k = new a.PopupClass(
              {
                title: "マギア強化確認",
                content: "<p>" + g + "のマギアを強化します。</br>よろしいですか？<p>",
                closeBtnText: "キャンセル",
                decideBtnText: "OK",
                param:
                {
                  width: "490px",
                  height: "360px",
                  top: "-webkit-calc(50% - 189px)",
                  left: "-webkit-calc(50% - 245px)"
                },
                popupType: "original",
                popupId: "magiaComposeConfirm",
                showCurtain: !1
              }, null, function()
              {
                $("#magiaComposeConfirm .decideBtn").on(a.cgti, function(b)
                {
                  b.preventDefault();
                  a.isScrolled() || (a.androidKeyStop = !0, $("#magiaComposeConfirm .decideBtn").off(), C(), k.remove(), a.removeClass(c.charaDataView.el, "popupOpen"), a.removeClass(c.curtainView.el, "show"))
                });
                var b = a.doc.querySelector("#giftWrapInner").cloneNode(!0),
                  g = a.doc.querySelector(".popupTextArea p");
                a.doc.querySelector(".popupTextArea").insertBefore(b, g)
              }, function()
              {
                a.removeClass(c.charaDataView.el, "popupOpen");
                a.removeClass(c.curtainView.el, "show")
              });
              a.addClass(c.charaDataView.el, "popupOpen");
              a.addClass(c.curtainView.el, "show")
            }
          }
      }
    }),
    C = function()
    {
      a.tapBlock(!0);
      var b = {};
      b.userCardId = c.charaDataView.model.toJSON().id;
      a.addClass(a.doc.getElementById("popupCurtain"), "tapBlock");
      m.ajaxPost(a.linkList.userCardComposeMagia, b, function(b)
      {
        a.responseSetStorage(b);
        var g = c.charaDataView.model.toJSON(),
          f = a.storage.userCharaList.findWhere(
          {
            userCardId: g.id
          }).toJSON(),
          l = t.addExStatus($.extend(b.userCardList[0], f));
        c.charaDataView.model.set(l);
        f = a.storage.userCardListEx.findWhere(
        {
          id: g.id
        });
        f.clear(
        {
          silent: !0
        });
        f.set(l);
        a.doc.querySelector(".hasRiche").textContent = b.gameUser.riche;
        q.userGiftList = a.storage.userGiftList.toJSON();
        c.playComposeMagiaEffect();
        setTimeout(function()
        {
          a.tapBlock(!1);
          var b = {
            type: "magiaLevel"
          };
          b.before = g;
          b.after = l;
          b = new c.CharaResultView(
          {
            model: new v(b)
          });
          $("#overlapContainer").append(b.render().el);
          n.getBaseData(a.getNativeObj());
          h.each(d.giftViews, function(a, b)
          {
            a.remove()
          });
          r();
          d.viewUpdate()
        }, 2500)
      })
    },
    E = p.View.extend(
    {
      className: function()
      {
        return "giftWrap se_decide "
      },
      events: function()
      {
        var b = {};
        b[a.cgti] = this.giftDetail;
        return b
      },
      initialize: function(a)
      {
        this.parentView = d;
        this.template = h.template(x);
        this.listenTo(this.model, "change", this.modelChange)
      },
      render: function()
      {
        this.$el.html(this.template(
        {
          model: this.model.toJSON()
        }));
        return this
      },
      giftDetail: function(b)
      {
        b.preventDefault();
        a.isScrolled() || (b = this.model.toJSON(), b.giftId && !b.isSet && (b.exClass = "confirmPopup", b.popupType = "original", b.popupId = "composeConfirm", b.param = {
          width: "490px",
          height: "360px",
          top: "-webkit-calc(50% - 189px)",
          left: "-webkit-calc(50% - 245px)"
        }, new a.PopupClass(b, y, function()
        {
          $(".confirmPopup .questSearchBtn").on(a.cgti, function(b)
          {
            b.preventDefault();
            a.isScrolled() || ($(".confirmPopup .questSearchBtn").off(), a.g_popup_instance.remove(), a.searchQuestGiftId = b.currentTarget.dataset.giftid, a.charaListComposeMagiaSelectId = c.charaDataView.model.toJSON().id, location.href = "#/SearchQuest")
          })
        }), n.getBaseData(a.getNativeObj())))
      },
      modelChange: function()
      {
        this.render();
        this.el.className = this.className()
      }
    }),
    F = {
      1: "firstMagiaGift",
      2: "secondMagiaGift",
      3: "thirdMagiaGift",
      4: "fourthMagiaGift"
    },
    G = function()
    {
      var b = !0,
        g = [],
        k = 0,
        f = c.charaDataView.model.toJSON(),
        l = F[f.magiaLevel];
      for (f.magiaLevel == f.episodeLevel && (b = !1); 6 > k;)
      {
        var e = {};
        e.gift = f.chara[l + (k + 1)] || null;
        e.giftId = f.chara[l + "Id" + (k + 1)] || null;
        e.needNum = f.chara[l + "Num" + (k + 1)] || null;
        var h = a.storage.userGiftList.findWhere(
          {
            giftId: e.giftId
          }) || null,
          h = h ? h.toJSON() :
          {
            quantity: 0
          };
        e.hasNum = h.quantity;
        e.hasNum = e.hasNum || 0;
        e.canSet = e.giftId ? e.hasNum < e.needNum ? !1 : !0 : !1;
        e.giftId && !e.canSet && (b = !1);
        e.giftId && g.push(new v(e));
        k = k + 1 | 0
      }
      5 == f.magiaLevel ? (a.doc.querySelector(".magiaCaution").textContent = "マギアLvは最大です", a.removeClass(a.doc.querySelector(".magiaCaution"), "hide"), a.addClass(a.doc.querySelector(".episodeCaution"), "hide")) : f.magiaLevel == f.episodeLevel ? (a.doc.querySelector(".episodeCaution").innerHTML = "エピソードLvを上げると</br>マギアLvの上限が解放されます", a.removeClass(a.doc.querySelector(".episodeCaution"), "hide"), a.addClass(a.doc.querySelector(".magiaCaution"), "hide"), a.addClass(a.doc.querySelector("#mainBtn"), "hide")) : (a.addClass(a.doc.querySelector(".magiaCaution"), "hide"), a.addClass(a.doc.querySelector(".episodeCaution"), "hide"), a.removeClass(a.doc.querySelector("#mainBtn"), "hide"));
      d.canCompose = b;
      return g
    },
    r = function()
    {
      var b = G();
      d.viewUpdate();
      d.giftViews = [];
      var c = a.doc.createDocumentFragment();
      h.each(b, function(a, b)
      {
        a = new E(
        {
          model: a
        });
        d.giftViews.push(a);
        c.appendChild(a.render().el)
      });
      a.doc.getElementById("giftWrapInner").appendChild(c);
      n.getBaseData(a.getNativeObj())
    };
  return {
    needModelIdObj: [
    {
      id: "user"
    },
    {
      id: "gameUser"
    },
    {
      id: "itemList"
    },
    {
      id: "userItemList"
    },
    {
      id: "userStatusList"
    },
    {
      id: "userCardList"
    },
    {
      id: "userDoppelList"
    },
    {
      id: "userCharaList"
    },
    {
      id: "userCharaEnhancementCellList"
    },
    {
      id: "userCharaAtbEnhancementCellList"
    },
    {
      id: "userLive2dList"
    },
    {
      id: "giftList"
    },
    {
      id: "userGiftList"
    },
    {
      id: "pieceList"
    },
    {
      id: "userPieceList"
    },
    {
      id: "userPieceSetList"
    },
    {
      id: "userDeckList"
    },
    {
      id: "userChapterList"
    },
    {
      id: "userSectionList"
    },
    {
      id: "userQuestBattleList"
    },
    {
      id: "userPatrolList"
    }],
    fetch: function(a)
    {
      u = a ? a : null;
      m.pageModelGet(this.needModelIdObj)
    },
    init: function()
    {
      a.setStyle(z + A);
      q = m.getPageJson();
      t.createCardList();
      d = new D;
      c.charaViewInit(u);
      d.giftViews.length || r();
      n.getBaseData(a.getNativeObj());
      a.tapBlock(!1);
      var b = c.charaDataView.model.toJSON().card.miniCharaNo;
      c.showMiniChara(b)
    },
    startCommand: function() {},
    charaSelect: function(a)
    {
      c.charaSelect(a);
      a = c.charaDataView.model.toJSON().card.miniCharaNo;
      c.showMiniChara(a);
      h.each(d.giftViews, function(a, b)
      {
        a.remove()
      });
      r();
      d.viewUpdate()
    },
    remove: function(b)
    {
      a.doc.querySelector(".needRiche").textContent = 0;
      c.charaViewRemove();
      d && (d.giftViews && d.giftViews.length && h.each(d.giftViews, function(a, b)
      {
        a.remove()
      }), d.trigger("remove"), d.remove());
      b()
    },
    charaCommon: function()
    {
      return c
    }
  }
});
