define("underscore backbone backboneCommon ajaxControl command text!template/chara/CharaEquip.html text!template/chara/CharaLimitBreakParts.html text!css/chara/CharaEquip.css text!css/chara/CharaCommon.css cardUtil CharaCommon js/view/item/ItemSalePopupView".split(" "), function(l, p, a, m, h, w, x, y, z, q, c, A)
{
  var t, r = null,
    u = p.Model.extend(),
    B = {
      0: 5E3,
      1: 1E4,
      2: 5E4
    },
    C = {
      RANK_1: 10,
      RANK_2: 10,
      RANK_3: 3,
      RANK_4: 1,
      RANK_5: 1
    },
    e, D = p.View.extend(
    {
      events: function()
      {
        return {}
      },
      initialize: function(a)
      {
        this.template = l.template(w);
        this.createDom()
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
        var b = n();
        v.prototype.parentView = this;
        this.lbView = new v(
        {
          model: new u(b)
        });
        a.doc.querySelector("#equipWrap").appendChild(this.lbView.render().el);
        a.firstNaviCheck(t);
        h.getBaseData(a.getNativeObj());
        a.ready.hide()
      },
      viewUpdate: function()
      {
        var b = c.charaDataView.model.toJSON().revision;
        3 > b ? a.doc.querySelector(".needRiche").textContent = B[b] : a.doc.querySelector(".needRiche").textContent = 0
      }
    }),
    v = p.View.extend(
    {
      className: function()
      {
        return "lbWrap pos_" + this.model.get("revision")
      },
      events: function()
      {
        var b = {};
        b[a.cgti + " .lbBtn"] = this.lbFunc;
        b[a.cgti + " .cGem"] = this.convertPop;
        return b
      },
      initialize: function(a)
      {
        this.template = l.template(x);
        this.listenTo(this.model, "change", this.modelChange);
        this.parentView.viewUpdate()
      },
      render: function()
      {
        console.log(this.model.toJSON());
        this.$el.html(this.template(
        {
          model: this.model.toJSON()
        }));
        return this
      },
      modelChange: function()
      {
        this.render();
        this.el.className = this.className();
        this.parentView.viewUpdate()
      },
      lbFunc: function(b)
      {
        b.preventDefault();
        if (!a.isScrolled())
        {
          var d = c.charaDataView.model.toJSON(),
            f = d.chara.name;
          d.chara.title && (f += "(" + d.chara.title + ")");
          if (b.currentTarget.classList.contains("off")) new a.PopupClass(
          {
            title: "魔力解放できません",
            content: "<p>" + f + "のジェム<br><span class='c_red'>ディスティニージェムが不足しています</span><p>",
            closeBtnText: "閉じる",
            param:
            {
              width: "490px",
              height: "360px",
              top: "-webkit-calc(50% - 189px)",
              left: "-webkit-calc(50% - 245px)"
            },
            popupType: "original",
            popupId: "lbConfirm",
            showCurtain: !1
          }, null, function()
          {
            var b = a.doc.querySelector(".lbWrap .imgWrap").cloneNode(!0),
              c = a.doc.querySelector(".popupTextArea p");
            a.doc.querySelector(".popupTextArea").insertBefore(b, c)
          }, function()
          {
            a.removeClass(c.charaDataView.el, "popupOpen");
            a.removeClass(c.curtainView.el, "show")
          }), a.addClass(c.charaDataView.el, "popupOpen"), a.addClass(c.curtainView.el, "show");
          else if (d = a.storage.gameUser.toJSON().riche, parseInt(a.doc.querySelector(".needRiche").textContent) > d) new a.PopupClass(
            {
              title: "魔力解放できません",
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
              a.removeClass(a.doc.querySelector(".needRiche"), "c_red");
              a.addClass(a.doc.querySelector("#richeWrap"), "hide")
            }), a.addClass(c.charaDataView.el, "popupOpen"),
            a.addClass(c.curtainView.el, "show"), a.addClass(a.doc.querySelector(".needRiche"), "c_red"), a.removeClass(a.doc.querySelector("#richeWrap"), "hide");
          else
          {
            var g = b.currentTarget.classList.contains("byItem");
            a.removeClass(a.doc.querySelector("#richeWrap"), "hide");
            var e = new a.PopupClass(
            {
              title: "魔力解放確認",
              content: "<p>" + (g ? "イノセント・ジェム" : "ジェム") + "を使用して<br>" + f + "を魔力解放します。<br>よろしいですか？<p>",
              closeBtnText: "キャンセル",
              decideBtnText: "OK",
              param:
              {
                width: "490px",
                height: g ? "440px" : "400px",
                top: g ? "-webkit-calc(50% - 220px)" : "-webkit-calc(50% - 200px)",
                left: "-webkit-calc(50% - 245px)"
              },
              popupType: "original",
              popupId: "lbConfirm",
              showCurtain: !1
            }, null, function()
            {
              $("#lbConfirm .decideBtn").on(a.cgti, function(b)
              {
                b.preventDefault();
                a.isScrolled() || b.currentTarget.classList.contains("off") || (a.androidKeyStop = !0, $("#lbConfirm .decideBtn").off(), E(g), a.tapBlock(!0), e.remove(), a.removeClass(c.charaDataView.el, "popupOpen"), a.removeClass(c.charaDataView.el, "equipIconShow"), a.removeClass(c.curtainView.el, "show"), a.addClass(a.doc.querySelector("#richeWrap"), "hide"))
              });
              var b;
              g ? (b = a.doc.createElement("div"), b.className = "imgWrap", b.innerHTML = l.template($("#lbAllPopTemp").text())(
              {
                itemNum: a.doc.querySelector("#lbAllNum").innerText
              }), $("#lbConfirm .decideBtn").addClass("off")) : b = a.doc.querySelector(".lbWrap .imgWrap").cloneNode(!0);
              var d = a.doc.querySelector(".popupTextArea p"),
                f = a.doc.querySelector(".popupTextArea");
              f.insertBefore(b, d);
              g && (b = a.doc.createElement("div"), b.innerHTML = l.template($("#lbAllPopCheckTemp").text())(), f.appendChild(b), $("#cautionWrap").on(a.cgti, function(b)
              {
                b.preventDefault();
                a.isScrolled() || (b.currentTarget.classList.toggle("current"), b.currentTarget.classList.contains("current") ? $("#lbConfirm .decideBtn").removeClass("off") : $("#lbConfirm .decideBtn").addClass("off"))
              }))
            }, function()
            {
              a.removeClass(c.charaDataView.el, "popupOpen");
              a.removeClass(c.charaDataView.el, "equipIconShow");
              a.removeClass(c.curtainView.el, "show");
              a.addClass(a.doc.querySelector("#richeWrap"), "hide")
            });
            a.addClass(c.charaDataView.el, "popupOpen");
            a.addClass(c.charaDataView.el, "equipIconShow");
            a.addClass(c.curtainView.el, "show")
          }
        }
      },
      convertPop: function(b)
      {
        b.preventDefault();
        if (!a.isScrolled())
        {
          var d = this.model.toJSON();
          0 > d.lbItemNum || (b = a.storage.userCardListEx.findWhere(
          {
            charaId: d.charaId
          }), b = new A(
          {
            model: b.toJSON()
          }, function()
          {
            var b = c.charaDataView.model.toJSON(),
              g = a.storage.userCardList.findWhere(
              {
                cardId: d.cardId
              }).toJSON(),
              F = a.storage.userCharaList.findWhere(
              {
                charaId: d.charaId
              }).toJSON(),
              g = q.addExStatus($.extend(g, F)),
              b = a.storage.userCardListEx.findWhere(
              {
                id: b.id
              });
            b.clear(
            {
              silent: !0
            });
            b.set(g);
            c.charaDataView.model.set(g);
            e.lbView && (b = n(), e.lbView.model.clear(
            {
              silent: !0
            }), e.lbView.model.set(b), h.getBaseData(a.getNativeObj()))
          }), new a.PopupClass(
          {
            title: "デスティニージェム変換",
            popupType: "typeE",
            exClass: "itemSalePop"
          }), a.doc.getElementById("popupArea").getElementsByClassName("popupTextArea")[0].appendChild(b.render().el), h.getBaseData(a.getNativeObj()))
        }
      }
    }),
    E = function(b)
    {
      var d = {};
      d.userCardId = c.charaDataView.model.toJSON().id;
      a.addClass(a.doc.getElementById("popupCurtain"), "tapBlock");
      m.ajaxPost(b ? a.linkList.userCardLimitBreakByItem : a.linkList.userCardLimitBreak, d, function(b)
      {
        a.responseSetStorage(b);
        c.playCustomizeEffect("LIMITBREAK");
        h.startSe(1121);
        setTimeout(function()
        {
          var d = c.charaDataView.model.toJSON(),
            f = b.userCharaList ? b.userCharaList[0] : a.storage.userCharaList.findWhere(
            {
              charaId: d.charaId
            }).toJSON(),
            f = q.addExStatus($.extend(b.userCardList[0], f));
          c.charaDataView.model.set(f);
          var k = a.storage.userCardListEx.findWhere(
          {
            id: d.id
          });
          k.clear(
          {
            silent: !0
          });
          k.set(f);
          a.doc.querySelector(".hasRiche").textContent = b.gameUser.riche;
          k = {
            type: "limitBreak"
          };
          k.before = d;
          k.after = f;
          d = new c.CharaResultView(
          {
            model: new u(k)
          });
          $("#overlapContainer").append(d.render().el);
          h.getBaseData(a.getNativeObj());
          e.lbView && (d = n(), e.lbView.model.clear(
          {
            silent: !0
          }), e.lbView.model.set(d), h.getBaseData(a.getNativeObj()));
          a.tapBlock(!1);
          a.removeClass(a.doc.getElementById("popupCurtain"), "tapBlock")
        }, 1500)
      })
    },
    n = function()
    {
      var b = c.charaDataView.model.toJSON(),
        d = {};
      d.cardId = b.cardId;
      d.charaId = b.charaId;
      d.revision = b.revision;
      d.needNum = C[b.chara.defaultCard.rank] || null;
      d.hasNum = b.lbItemNum || 0;
      d.canSet = d.hasNum < d.needNum ? !1 : !0;
      var e = l.findWhere(a.storage.userItemList.toJSON(),
      {
        itemId: "LIMIT_BREAK_ALL"
      });
      d.lbAllItemNum = e ? e.quantity : 0;
      d.canSetByItem = 3 > b.revision && !d.canSet && e && 0 < d.lbAllItemNum;
      d.canCrystal = "RANK_4" === b.chara.defaultCard.rank && 2 < b.revision && 2003 !== b.charaId ? !0 : !1;
      return d
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
      id: "userStatusList"
    },
    {
      id: "itemList"
    },
    {
      id: "userItemList"
    },
    {
      id: "userCharaList"
    },
    {
      id: "userCardList"
    },
    {
      id: "userCharaEnhancementCellList"
    },
    {
      id: "userCharaAtbEnhancementCellList"
    },
    {
      id: "userDoppelList"
    },
    {
      id: "userLive2dList"
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
    charaSelect: function(b)
    {
      c.charaSelect(b);
      b = c.charaDataView.model.toJSON().card.miniCharaNo;
      c.showMiniChara(b);
      e && e.lbView && (b = n(), e.lbView.model.clear(
      {
        silent: !0
      }), e.lbView.model.set(b), h.getBaseData(a.getNativeObj()))
    },
    fetch: function(a)
    {
      r = a ? a : null;
      m.pageModelGet(this.needModelIdObj)
    },
    init: function()
    {
      t = m.getPageJson();
      a.setStyle(y + z);
      q.createCardList();
      c.charaViewInit(r);
      e = new D;
      c.checkCanEnhance();
      c.addIdComposeAttributeBtn();
      a.tapBlock(!1);
      var b = c.charaDataView.model.toJSON().card.miniCharaNo;
      c.showMiniChara(b)
    },
    remove: function(b)
    {
      a.doc.querySelector(".needRiche").textContent = 0;
      c.charaViewRemove();
      r = null;
      e && (e.lbView && (e.lbView.remove(), e.lbView = null), e.trigger("remove"), e.remove());
      b()
    },
    charaCommon: function()
    {
      return c
    }
  }
});
