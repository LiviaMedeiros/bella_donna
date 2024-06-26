define("underscore backbone backboneCommon ajaxControl command text!template/chara/CharaCustomize.html text!template/chara/CharaGiftParts.html text!template/chara/CharaCustomizePopup.html text!template/chara/CharaBulkCustomizePopup.html text!css/chara/CharaCustomize.css text!css/chara/CharaCommon.css cardUtil CharaCommon".split(" "), function(l, r, a, m, h, x, y, z, A, B, C, q, g)
{
  var t = null,
    n, k, u = r.Model.extend(
    {}),
    D = {
      RANK_1: 1E4,
      RANK_2: 1E5,
      RANK_3: 3E5,
      RANK_4: 1E6,
      RANK_5: "-"
    },
    v = {
      HP: "HP",
      ATTACK: "ATK",
      DEFENSE: "DEF",
      ACCEL: "Accele",
      BLAST: "Blast",
      CHARGE: "Charge"
    },
    E = r.View.extend(
    {
      initialize: function(a)
      {
        this.giftViews = [];
        this.template = l.template(x);
        this.createDom()
      },
      events: function()
      {
        var b = {};
        b[a.cgti + " #mainBtn"] = this.customRunFunc;
        b[a.cgti + " #allGiftSet"] = this.allGiftSet;
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
        a.firstNaviCheck(n);
        a.tapBlock(!1);
        a.ready.hide()
      },
      viewUpdate: function()
      {
        var b = g.charaDataView.model.toJSON().card.rank,
          f = g.charaDataView.rareMaxFlag,
          c = g.charaDataView.lvMaxFlag,
          e = a.doc.querySelector(".descText");
        this.canEvolve && c ? (a.addClass(a.doc.querySelector("#giftWrap"), "canEvolve"), a.removeClass(a.doc.querySelector("#mainBtn"), "off"), a.removeClass(a.doc.querySelector("#richeWrap"), "hide"), a.doc.querySelector(".needRiche").textContent = D[b]) : (a.removeClass(a.doc.querySelector("#giftWrap"), "canEvolve"), a.addClass(a.doc.querySelector("#mainBtn"), "off"), a.addClass(a.doc.querySelector("#richeWrap"), "hide"), a.doc.querySelector(".needRiche").textContent = 0);
        e.textContent = this.canEvolve ? "" : "覚醒素材をセットしてください";
        this.canEvolve && !c && (e.textContent = "覚醒可能なLvに達していません");
        f && (a.removeClass(a.doc.querySelector("#giftWrap"), "canEvolve"), a.addClass(a.doc.querySelector("#mainBtn"), "off"), a.addClass(a.doc.querySelector("#richeWrap"), "hide"), a.doc.querySelector(".needRiche").textContent = 0, e.textContent = "上限まで覚醒されています")
      },
      customRunFunc: function(b)
      {
        b.preventDefault();
        if (!a.isScrolled())
          if (b = Number(a.doc.querySelector(".needRiche").textContent), Number(a.doc.querySelector(".hasRiche").textContent) < b) new a.PopupClass(
          {
            title: "覚醒できません",
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
            a.removeClass(g.charaDataView.el, "popupOpen");
            a.removeClass(g.curtainView.el, "show");
            a.removeClass(a.doc.querySelector(".needRiche"), "c_red")
          }), a.addClass(g.charaDataView.el, "popupOpen"), a.addClass(g.curtainView.el, "show"), a.addClass(a.doc.querySelector(".needRiche"), "c_red");
          else
          {
            var f = g.charaDataView.model.toJSON();
            b = f.chara.name;
            f.chara.title && (b += "(" + f.chara.title + ")");
            new a.PopupClass(
            {
              title: "覚醒確認",
              content: "<p>" + b + "を覚醒します。<br>よろしいですか？</p>",
              closeBtnText: "閉じる",
              decideBtnText: "OK",
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
            }, null, function()
            {
              $("#composeConfirm .decideBtn").on(a.cgti, function(b)
              {
                b.preventDefault();
                a.isScrolled() || (a.androidKeyStop = !0, $("#composeConfirm .decideBtn").off(), a.g_popup_instance.remove(), b = {}, b.userCardId = f.userCardId, m.ajaxPost(a.linkList.userCardEvolve, b, function(b)
                {
                  a.responseSetStorage(b);
                  var d;
                  l.each(b.userCardList, function(a)
                  {
                    1 == a.level && (d = a)
                  });
                  var c = q.addExStatus($.extend(d, b.userCharaList[0]));
                  n.userGiftList = a.storage.userGiftList.toJSON();
                  var e = {
                    evolution: b.evolution
                  };
                  $(a.ready.target).on("webkitAnimationEnd", function()
                  {
                    h.hideMiniChara();
                    $(a.ready.target).off();
                    $(a.ready.target).on("webkitAnimationEnd", function(b)
                    {
                      "readyFadeOut" == b.originalEvent.animationName && (a.ready.target.className = "")
                    });
                    h.changeBg("web_black.jpg");
                    h.stopBgm();
                    setTimeout(function()
                    {
                      a.removeClass(g.charaDataView.el, "popupOpen");
                      a.removeClass(g.curtainView.el, "show");
                      h.setWebView(!1);
                      h.startEvolution(e)
                    }, 500)
                  });
                  a.addClass(a.ready.target, "preNativeFadeIn");
                  $("#commandDiv").on("nativeCallback", function(d)
                  {
                    $("#commandDiv").off();
                    h.changeBg(a.background);
                    h.startBgm(a.bgm);
                    g.charaDataView.model.set(c);
                    g.charaImgView && g.charaImgView.model.set(
                    {
                      displayCardId: c.displayCardId
                    });
                    d = a.storage.userCardListEx.findWhere(
                    {
                      id: f.id
                    });
                    d.clear(
                    {
                      silent: !0
                    });
                    d.set(c);
                    a.doc.querySelector(".hasRiche").textContent = b.gameUser.riche;
                    g.showMiniChara(c.card.miniCharaNo, !1, !0);
                    d = {
                      type: "evolve"
                    };
                    d.before = f;
                    d.after = c;
                    d = new g.CharaResultView(
                    {
                      model: new u(d)
                    });
                    $("#overlapContainer").append(d.render().el);
                    if (k.giftViews.length)
                    {
                      var e = p();
                      k.viewUpdate();
                      l.each(k.giftViews, function(a, b)
                      {
                        a.model.clear(
                        {
                          silent: !0
                        });
                        a.model.set(e[b].toJSON())
                      })
                    }
                    setTimeout(function()
                    {
                      g.charaListView.cardSort.multiSort();
                      h.getBaseData(a.getNativeObj())
                    }, 0);
                    k.checkAllGift();
                    h.setWebView();
                    a.ready.target.className = ""
                  })
                }))
              })
            }, function()
            {
              a.removeClass(g.charaDataView.el, "popupOpen");
              a.removeClass(g.curtainView.el, "show")
            });
            a.addClass(g.charaDataView.el, "popupOpen");
            a.addClass(g.curtainView.el, "show");
            b = a.doc.createElement("div");
            b.id = "confirmCardWrap";
            b.className = "flexBox";
            var c = l.template(a.doc.querySelector("#evolveCharaTemp").innerText);
            $(b).html(c(f));
            c = a.doc.querySelector(".popupTextArea p");
            a.doc.querySelector(".popupTextArea").insertBefore(b, c);
            h.getBaseData(a.getNativeObj())
          }
      },
      allGiftSet: function(b)
      {
        b.preventDefault();
        if (!a.isScrolled())
        {
          console.log("run");
          var f = {};
          f.userCardId = g.charaDataView.model.toJSON().userCardId;
          f.targetList = this.allGiftTarget;
          var c = function(b)
          {
            a.responseSetStorage(b);
            a.g_popup_instance && a.g_popup_instance.remove();
            var d = b.userCardList[0];
            b = a.storage.userCharaList.findWhere(
            {
              userCardId: d.id
            }).toJSON();
            var c = q.addExStatus($.extend(d, b));
            n.userGiftList = a.storage.userGiftList.toJSON();
            for (b = 0; b < f.targetList.length; b++)
            {
              var e = a.doc.getElementsByClassName("pos_" + f.targetList[b])[0].getElementsByClassName("effectWrap")[0];
              if (b === f.targetList.length - 1) $(e).on("webkitAnimationEnd", function()
              {
                g.charaDataView.model.set(c);
                var b = a.storage.userCardListEx.findWhere(
                {
                  id: c.id
                });
                b.clear(
                {
                  silent: !0
                });
                b.set(c)
              });
              a.addClass(e, "anim")
            }
            setTimeout(function()
            {
              for (var b = [], c = 0; c < f.targetList.length; c++)
              {
                var e = {};
                e.type = v[d.card.cardCustomize["bonusCode" + f.targetList[c]]];
                e.value = d.card.cardCustomize["bonusNum" + f.targetList[c]] / 10 | 0;
                b.push(e)
              }
              g.playBulkCustomizeEffect(b);
              h.startSe(1121);
              for (c = 0; c < f.targetList.length; c++) b = a.doc.getElementsByClassName("pos_" + f.targetList[c])[0], a.addClass(b, "set"), a.removeClass(b, "canSet");
              c = 1500;
              window.isBrowser && (c = 10);
              setTimeout(function()
              {
                if (k.giftViews.length)
                {
                  var b = p();
                  k.viewUpdate();
                  l.each(k.giftViews, function(c, d)
                  {
                    c.model.clear(
                    {
                      silent: !0
                    });
                    c.model.set(b[d].toJSON());
                    h.getBaseData(a.getNativeObj())
                  })
                }
                k.checkAllGift();
                a.androidKeyStop = !1;
                a.tapBlock(!1)
              }, c)
            }, 800)
          };
          b = [];
          for (var e = 0; e < this.allGiftDetail.length; e++)
            if (-1 < this.allGiftTarget.indexOf(this.allGiftDetail[e].target))
            {
              var d = {};
              d.giftId = this.allGiftDetail[e].giftId;
              d.needNum = this.allGiftDetail[e].needNum;
              var w = a.storage.userGiftList.findWhere(
              {
                giftId: this.allGiftDetail[e].giftId
              });
              d.hasNum = w ? w.toJSON().quantity : 0;
              b.push(d)
            } new a.PopupClass(
          {
            param:
            {
              width: "490px",
              height: "360px",
              top: "-webkit-calc(50% - 189px)",
              left: "-webkit-calc(50% - 245px)"
            },
            giftList: b,
            exClass: "setPopup",
            popupType: "typeE",
            decideBtnEvent: function(b)
            {
              b.preventDefault();
              a.isScrolled() || (a.tapBlock(!0), a.androidKeyStop = !0, m.ajaxPost(a.linkList.userCardBulkCustomize, f, c))
            }
          }, A, function()
          {
            h.getBaseData(a.getNativeObj())
          })
        }
      },
      checkAllGift: function()
      {
        console.log("checkAllGift");
        this.sameGift = !1;
        this.allGiftDetail = [];
        this.allGiftTarget = [];
        this.trigger("getGiftStatus");
        if (this.allGiftDetail[0])
        {
          var b = !1,
            f = this;
          if (this.sameGift)
          {
            var c = l.groupBy(this.allGiftDetail, function(a)
            {
              return a.giftId
            });
            console.log(c);
            var e = !0;
            l.each(c, function(b, c)
            {
              var d = (c = a.storage.userGiftList.findWhere(
              {
                giftId: c | 0
              })) ? c.toJSON().quantity : 0;
              1 < b.length ? l.each(b, function(a, b)
              {
                d >= a.needNum ? (d = d - a.needNum | 0, f.allGiftTarget.push(a.target)) : e = !1
              }) : b[0].needNum > d ? e = !1 : f.allGiftTarget.push(b[0].target)
            });
            e && (b = !0)
          }
          else l.each(this.allGiftDetail, function(c, e)
          {
            e = (e = a.storage.userGiftList.findWhere(
            {
              giftId: c.giftId
            })) ? e.toJSON().quantity : 0;
            console.log("hasCount:", e, " model.num:", c.needNum);
            e >= c.needNum && (f.allGiftTarget.push(c.target), b = !0)
          });
          console.log("this.sameGift:", this.sameGift);
          console.log("this.allGiftDetail:", this.allGiftDetail);
          console.log("this.allGiftTarget:", this.allGiftTarget);
          b ? (a.removeClass(a.doc.getElementById("allGiftSet"), "none"), a.addClass(a.doc.getElementById("mainBtn"), "none")) : (a.addClass(a.doc.getElementById("allGiftSet"), "none"), a.removeClass(a.doc.getElementById("mainBtn"), "none"))
        }
        else a.addClass(a.doc.getElementById("allGiftSet"), "none"), a.removeClass(a.doc.getElementById("mainBtn"), "none")
      }
    }),
    F = r.View.extend(
    {
      className: function()
      {
        var a = "giftWrap se_decide pos_" + this.model.get("target");
        return a = this.model.get("isSet") ? a + " set" : a + (this.model.get("canSet") ? " canSet" : " off")
      },
      events: function()
      {
        var b = {};
        b[a.cgti] = this.giftDetail;
        return b
      },
      initialize: function(a)
      {
        this.parentView = k;
        this.template = l.template(y);
        this.listenTo(this.model, "change", this.modelChange);
        this.listenTo(this.parentView, "getGiftStatus", this.setGiftDetail)
      },
      render: function()
      {
        this.$el.html(this.template(
        {
          model: this.model.toJSON(),
          img: a.imgData
        }));
        return this
      },
      giftDetail: function(b)
      {
        b.preventDefault();
        if (!a.isScrolled() && (b = this.model.toJSON(), b.giftId && !b.isSet))
        {
          b.exClass = "setPopup";
          b.popupType = "typeE";
          var f = this;
          b.param = {
            width: "490px",
            height: "360px",
            top: "-webkit-calc(50% - 189px)",
            left: "-webkit-calc(50% - 245px)"
          };
          new a.PopupClass(b, z, function()
          {
            h.getBaseData(a.getNativeObj());
            $(".setPopup .questSearchBtn").on(a.cgti, function(b)
            {
              b.preventDefault();
              a.isScrolled() || ($(".setPopup .questSearchBtn").off(), a.g_popup_instance.remove(), a.searchQuestGiftId = b.currentTarget.dataset.giftid, a.charaListCustomizeSelectId = g.charaDataView.model.toJSON().id, location.href = "#/SearchQuest")
            });
            $(".setPopup .decideBtn").on(a.cgti, function(b)
            {
              b = {};
              b.userCardId = g.charaDataView.model.toJSON().userCardId;
              b.target = f.model.toJSON().target;
              a.androidKeyStop = !0;
              a.tapBlock(!0);
              m.ajaxPost(a.linkList.userCardCustomize, b, function(b)
              {
                a.g_popup_instance && a.g_popup_instance.remove();
                a.responseSetStorage(b);
                b = b.userCardList[0];
                var c = a.storage.userCharaList.findWhere(
                  {
                    userCardId: b.id
                  }).toJSON(),
                  e = q.addExStatus($.extend(b, c));
                n.userGiftList = a.storage.userGiftList.toJSON();
                var m = f.el;
                b = m.getElementsByClassName("effectWrap")[0];
                $(b).on("webkitAnimationEnd", function()
                {
                  g.charaDataView.model.set(e);
                  var b = a.storage.userCardListEx.findWhere(
                  {
                    id: e.id
                  });
                  b.clear(
                  {
                    silent: !0
                  });
                  b.set(e)
                });
                a.addClass(b, "anim");
                setTimeout(function()
                {
                  var b = f.model.toJSON().bonusCodeDisp,
                    c = f.model.toJSON().bonusNum;
                  g.playCustomizeEffect(b, c);
                  h.startSe(1121);
                  a.addClass(m, "set");
                  a.removeClass(m, "canSet");
                  b = 1500;
                  window.isBrowser && (b = 0);
                  setTimeout(function()
                  {
                    if (k.giftViews.length)
                    {
                      var b = p();
                      k.viewUpdate();
                      l.each(k.giftViews, function(c, d)
                      {
                        c.model.clear(
                        {
                          silent: !0
                        });
                        c.model.set(b[d].toJSON());
                        h.getBaseData(a.getNativeObj())
                      })
                    }
                    k.checkAllGift();
                    a.androidKeyStop = !1;
                    a.tapBlock(!1)
                  }, b)
                }, 800)
              })
            })
          })
        }
      },
      setGiftDetail: function()
      {
        var a = this.model.toJSON();
        if (!a.isSet && a.giftId)
        {
          var f = {
            target: a.target,
            giftId: a.giftId,
            needNum: a.needNum
          };
          !this.parentView.sameGift && l.findWhere(this.parentView.allGiftDetail,
          {
            giftId: a.giftId
          }) && (this.parentView.sameGift = !0);
          this.parentView.allGiftDetail.push(f)
        }
      },
      modelChange: function()
      {
        this.render();
        this.el.className = this.className()
      }
    }),
    p = function()
    {
      for (var b = !0, f = [], c = 0, e = g.charaDataView.model.toJSON(); 6 > c;)
      {
        var d = {};
        d.target = c + 1;
        d.isSet = e["customized" + (c + 1)] || !1;
        d.giftId = e.card.cardCustomize["giftId" + (c + 1)] || null;
        d.needNum = e.card.cardCustomize["giftNum" + (c + 1)] || 0;
        d.bonusCode = e.card.cardCustomize["bonusCode" + (c + 1)] || null;
        d.bonusNum = e.card.cardCustomize["bonusNum" + (c + 1)] / 10 || null;
        d.bonusCode && (d.bonusCodeDisp = v[d.bonusCode]);
        var h = a.storage.userGiftList.findWhere(
          {
            giftId: d.giftId
          }) || a.storage.giftList.findWhere(
          {
            id: d.giftId
          }),
          h = h ? h.toJSON() :
          {
            quantity: 0
          };
        d.name = h.gift ? h.gift.name : h.name;
        d.hasNum = h.quantity;
        d.hasNum = d.hasNum || 0;
        d.canSet = d.giftId ? d.hasNum < d.needNum ? !1 : !0 : !1;
        d.giftId && !d.isSet && (b = !1);
        f.push(new u(d));
        c = c + 1 | 0
      }
      k.canEvolve = b;
      return f
    },
    G = function()
    {
      var b = p();
      k.viewUpdate();
      var f = a.doc.createDocumentFragment();
      l.each(b, function(a, b)
      {
        a = new F(
        {
          model: a
        });
        k.giftViews.push(a);
        f.appendChild(a.render().el)
      });
      a.doc.getElementById("giftWrapInner").appendChild(f);
      k.checkAllGift();
      h.getBaseData(a.getNativeObj())
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
      id: "userCharaEnhancementCellList"
    },
    {
      id: "userCharaAtbEnhancementCellList"
    },
    {
      id: "userDoppelList"
    },
    {
      id: "userCharaList"
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
      t = a ? a : null;
      m.pageModelGet(this.needModelIdObj)
    },
    init: function()
    {
      a.setStyle(B + C);
      n = m.getPageJson();
      q.createCardList();
      k = new E;
      g.charaViewInit(t);
      G();
      h.getBaseData(a.getNativeObj());
      a.tapBlock(!1);
      var b = g.charaDataView.model.toJSON().card.miniCharaNo;
      g.showMiniChara(b)
    },
    startCommand: function() {},
    charaSelect: function(b)
    {
      g.charaSelect(b);
      b = g.charaDataView.model.toJSON().card.miniCharaNo;
      g.showMiniChara(b);
      if (k.giftViews.length)
      {
        var f = p();
        k.viewUpdate();
        l.each(k.giftViews, function(a, b)
        {
          a.model.clear(
          {
            silent: !0
          });
          a.model.set(f[b].toJSON())
        });
        h.getBaseData(a.getNativeObj())
      }
      k.checkAllGift()
    },
    remove: function(b)
    {
      a.removeClass(a.doc.querySelector("#richeWrap"), "hide");
      a.doc.querySelector(".needRiche").textContent = 0;
      g.charaViewRemove();
      k && (k.giftViews.length && l.each(k.giftViews, function(a, b)
      {
        a.remove()
      }), k.trigger("remove"), k.remove());
      b()
    },
    charaCommon: function()
    {
      return g
    }
  }
});
