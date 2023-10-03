define("underscore backbone backboneCommon ajaxControl command text!template/patrol/PatrolDeckView.html text!css/patrol/PatrolDeckView.css cardUtil js/view/chara/CharaListView js/view/item/ItemImgPartsView".split(" "), function(e, p, b, r, m, t, u, v, q, w)
{
  var h, k = !1,
    f, x = p.Model.extend(),
    y = p.View.extend(
    {
      initialize: function(a)
      {
        b.androidKeyStop = !0;
        this.listenTo(this.rootView, "removeView", this.removeView);
        this.listenTo(this, "chara", this.chara);
        h = a;
        v.createCardList();
        if (!b.patrolDeckList)
        {
          b.patrolDeckList = [];
          e.each(b.storage.userPatrolList.models, function(a)
          {
            if (a.attributes.userPatrolResult)
            {
              a = a.attributes.userPatrolResult;
              for (var c = a.deckType, d = ["", "", "", "", ""], l = 1; 6 > l; l++) a["charaId" + l] && void 0 != a["charaId" + l] && (d[l - 1] = a["charaId" + l]);
              b.patrolDeckList.push(
              {
                deckType: c,
                charaList: d,
                patrolAreaId: a.patrolAreaId,
                status: a.status ? a.status : "none"
              })
            }
          });
          b.patrolDeckList.startedPartyChara = [];
          var c = [];
          e.each(b.patrolDeckList, function(b)
          {
            "EXPEDITION" == b.status && (0 == c.length ? c.push(b.charaList) : c[0] = c[0].concat(b.charaList))
          });
          0 < c.length && (c = c[0].filter(function(b, a, c)
          {
            return c.indexOf(b) === a
          }));
          b.patrolDeckList.startedPartyChara = c
        }
        b.patrolDeckList.nowPartyChara = [];
        var d = [],
          g = [];
        e.each(h.model.patrolArea, function(b, a)
        {
          if (-1 != a.indexOf("dropItem"))
          {
            if (-1 != a.indexOf("dropItemId")) return;
            e.each(b, function(b, a)
            {
              if (-1 != a.indexOf("rewardCode"))
              {
                b = b.split("_");
                a = "";
                for (var c = 0; c < b.length; c++) a = c == b.length - 1 ? a + "1" : a + (b[c] + "_");
                console.log(a);
                d.push(a)
              }
            })
          } - 1 == a.indexOf("bonus1DropItem") && -1 == a.indexOf("bonus2DropItem") && -1 == a.indexOf("bonus3DropItem") || -1 != a.indexOf("bonus1DropItemId") || -1 != a.indexOf("bonus2DropItemId") || -1 != a.indexOf("bonus3DropItemId") || e.each(b, function(b, a)
          {
            if (-1 != a.indexOf("rewardCode"))
            {
              b = b.split("_");
              a = "";
              for (var c = 0; c < b.length; c++) a = c == b.length - 1 ? a + "1" : a + (b[c] + "_");
              console.log(a);
              g.push(a)
            }
          })
        });
        a = d.concat(g).filter(function(b, a, c)
        {
          return c.indexOf(b) === a
        });
        this.rewardDom = this.rewardModels(a);
        this.allItemArrLeng = d.length + g.length;
        this.itemArr = d;
        this.bonusItemArr = g.concat(g).filter(function(b, a, c)
        {
          return c.indexOf(b) === a
        });
        this.template = e.template(t);
        this.createDom()
      },
      events: function()
      {
        var a = {};
        a[b.cgti + " .closeBtn"] = this.closeBtn;
        a[b.cgti + " #itemListBtn"] = this.itemListBtn;
        a[b.cgti + " #formationBtn"] = this.formationBtn;
        a[b.cgti + " #battleBtn"] = this.battleBtn;
        a[b.cgti + " #allRemoveBtn"] = this.allRemoveBtn;
        return a
      },
      render: function()
      {
        this.$el.html(this.template(
        {
          model: h.model,
          rewardArr: this.rewardDom
        }));
        return this
      },
      createDom: function()
      {
        m.startSe(1002);
        var a = document.createElement("style");
        a.setAttribute("type", "text/css");
        a.innerText = u;
        $("#overlapContainer").append(this.render().el);
        this.el.appendChild(a);
        b.storage.userCardListEx.each(function(a)
        {
          var c = e.clone(a.toJSON()),
            d = b.getTargetComposeAttribute(
            {
              attributeId: c.chara.attributeId
            }),
            g = !1,
            f = (c.attack || 0) + (c.defense || 0) + (c.hp || 0) + (c.addendAttack || 0) + (c.addendDefense || 0) + (c.addendHp || 0);
          e.each(d.composed, function(b, a, c)
          {
            f += b
          });
          if (h.model.patrolArea.forcesBonusAttributeId == c.chara.attributeId || "ALL" == h.model.patrolArea.forcesBonusAttributeId) f = Math.round(1.5 * f), g = !0;
          c.patrolStrength = f;
          c.advantage = g;
          a.clear(
          {
            silent: !0
          });
          a.set(c,
          {
            silent: !0
          })
        });
        b.patrolDeckList.nowPartyCard = [];
        if (b.patrolDeckList.nowPartyChara[0] && 0 != b.patrolDeckList.nowPartyChara[0].length)
          for (var a = b.patrolDeckList.nowPartyChara[0].length, c = 0; c < a; c++)
          {
            var d = "",
              d = b.storage.userCardListEx.findWhere(
              {
                charaId: b.patrolDeckList.nowPartyChara[0][c]
              });
            b.patrolDeckList.nowPartyCard.push(d)
          }
        this.charaListView = new q(
        {
          model: new x,
          collection: b.storage.userCardListEx
        });
        $("#charaArea").append(this.charaListView.render().el);
        this.charaListView.cardSort.multiSort();
        q.prototype.rootView = this;
        b.scrollSetX("charaListScrollWrap", "list");
        b.patrolDeckList.nowPartyDeck = [];
        n.prototype.template = e.template($("#DeckTemp").text());
        n.prototype.parentView = this;
        a = b.doc.createDocumentFragment();
        for (c = 0; 5 > c; c++) d = null, d = b.patrolDeckList.nowPartyCard[c] ? new n(
        {
          model: b.patrolDeckList.nowPartyCard[c].attributes,
          index: c
        }) : new n(
        {
          index: c
        }), b.patrolDeckList.nowPartyDeck.push(d), a.appendChild(d.render().el);
        b.doc.getElementById("deckDom").appendChild(a);
        this.mineStrength();
        this.classChange();
        m.getBaseData(b.getNativeObj());
        window.isLocal && console.log(b.patrolDeckList)
      },
      mineStrength: function()
      {
        var a = 0;
        e.each(b.patrolDeckList.nowPartyDeck, function(b)
        {
          void 0 != b.model && (a += b.model.patrolStrength)
        });
        b.doc.querySelector("#mineStrengthNum").innerText = a;
        var c = b.doc.getElementById("expected");
        h.model.patrolArea.targetTotalForces1 && h.model.patrolArea.targetTotalForces2 && h.model.patrolArea.targetTotalForces3 && (c.className = a >= h.model.patrolArea.targetTotalForces3 ? "point3" : a >= h.model.patrolArea.targetTotalForces2 && a < h.model.patrolArea.targetTotalForces3 ? "point2" : a >= h.model.patrolArea.targetTotalForces1 && a < h.model.patrolArea.targetTotalForces2 ? "point1" : "point0");
        k = !1
      },
      classChange: function()
      {
        var a = b.patrolDeckList.nowPartyChara;
        a[0] && 0 != a[0].length && e.each(a[0], function(a)
        {
          b.addClass(b.doc.querySelector(".charaId" + a), "formationCurrent")
        });
        (a = b.patrolDeckList.startedPartyChara) && 0 != a.length && e.each(a, function(a)
        {
          b.addClass(b.doc.querySelector(".charaClass" + a), "started");
          b.addClass(b.doc.querySelector(".charaId" + a), "startedPatrol")
        })
      },
      closeBtn: function(a)
      {
        a.preventDefault();
        b.isScrolled() || this.removeView()
      },
      chara: function(a, c)
      {
        if (!c && (!a.el.classList.contains("startedPatrol") || a.el.classList.contains("formationRemove")) && 0 != k)
        {
          b.doc.getElementById("charaArea").classList.remove("on");
          e.each(b.patrolDeckList.nowPartyDeck, function(c, e)
          {
            c && c.model && c.model.cardId == a.model.attributes.cardId && (b.patrolDeckList.nowPartyDeck[e].reRender(), b.patrolDeckList.nowPartyDeck[e].model = void 0)
          });
          if (a.el.classList.contains("formationRemove")) a.el.classList.remove("formationRemove"), a.el.classList.remove("formationCurrent");
          else
          {
            if (b.patrolDeckList.nowPartyDeck[f] && b.patrolDeckList.nowPartyDeck[f].model || null == b.patrolDeckList.nowPartyDeck[f] || void 0 == b.patrolDeckList.nowPartyDeck[f].model || null == b.patrolDeckList.nowPartyDeck[f].model) b.patrolDeckList.nowPartyDeck[f].model = a.model.attributes, b.patrolDeckList.nowPartyDeck[f].reRender(a.model.attributes);
            b.doc.getElementsByClassName("formationRemove")[0] && (c = b.doc.getElementsByClassName("formationRemove")[0], c.classList.remove("formationCurrent"), c.classList.remove("formationRemove"));
            a.el.classList.add("formationCurrent")
          }
          this.mineStrength()
        }
      },
      allRemoveBtn: function(a)
      {
        e.each(b.patrolDeckList.nowPartyDeck, function(a, d)
        {
          a && a.model && (a = b.patrolDeckList.nowPartyDeck[d].model.charaId, b.removeClass(b.doc.querySelector(".charaId" + a), "formationCurrent"), b.removeClass(b.doc.querySelector(".charaId" + a), "formationRemove"), b.patrolDeckList.nowPartyDeck[d].model = void 0);
          b.patrolDeckList.nowPartyDeck[d].reRender()
        });
        this.hideCheck();
        this.mineStrength();
        b.doc.getElementById("charaArea").classList.remove("on");
        this.charaListView.filterFunc(a)
      },
      formationBtn: function(a)
      {
        a.preventDefault();
        if (!b.isScrolled())
        {
          b.doc.getElementById("charaArea").classList.remove("on");
          var c = b.storage.userCardListEx.models.sort(function(a, b)
            {
              if (a.attributes.patrolStrength !== b.attributes.patrolStrength)
              {
                if (a.attributes.patrolStrength < b.attributes.patrolStrength) return 1;
                if (a.attributes.patrolStrength > b.attributes.patrolStrength) return -1
              }
              return 0
            }),
            d = [];
          e.each(c, function(a)
          {
            -1 == b.patrolDeckList.startedPartyChara.indexOf(a.attributes.charaId) && d.push(a)
          });
          if (0 == d.length) new b.PopupClass(
          {
            title: "チーム編成",
            content: "パトロールに出発できる魔法少女がいません。",
            closeBtnText: "OK",
            popupType: "typeC"
          }, null, null, null);
          else
          {
            for (c = 0; 5 > c; c++)
              if (void 0 != b.patrolDeckList.nowPartyDeck[c].model)
              {
                var g = b.patrolDeckList.nowPartyDeck[c].model.charaId;
                b.removeClass(b.doc.querySelector(".charaId" + g), "formationCurrent");
                b.removeClass(b.doc.querySelector(".charaId" + g), "formationRemove")
              } for (c = 0; 5 > c; c++) d[c] ? (b.patrolDeckList.nowPartyDeck[c].model = d[c].attributes, b.patrolDeckList.nowPartyDeck[c].reRender(d[c].attributes), b.addClass(b.doc.querySelector(".charaId" + d[c].attributes.charaId), "formationCurrent")) : (b.patrolDeckList.nowPartyDeck[c].reRender(), b.patrolDeckList.nowPartyDeck[c].model = void 0);
            this.hideCheck();
            this.mineStrength();
            this.charaListView.filterFunc(a)
          }
        }
      },
      hideCheck: function()
      {
        for (var a = document.getElementsByClassName("userCharaIcon"), c = 0; c < a.length; c++)
          if (a[c].classList.contains("formationCurrent"))
          {
            b.addClass(b.doc.querySelector(".charaListCaution"), "hide");
            break
          }
        else b.removeClass(b.doc.querySelector(".charaListCaution"), "hide")
      },
      itemListBtn: function(a)
      {
        a.preventDefault();
        b.isScrolled() || (a = function()
        {
          var a = b.doc.createDocumentFragment(),
            d = this.rewardModels(this.itemArr),
            g = this.rewardModels(this.bonusItemArr);
          e.each(d, function(b)
          {
            var c = document.createElement("div");
            c.innerHTML = b;
            c.className = "commonItemImgWrap normal";
            a.appendChild(c)
          });
          e.each(g, function(b)
          {
            var c = document.createElement("div");
            c.innerHTML = b;
            c.className = "commonItemImgWrap bonus";
            a.appendChild(c)
          });
          b.doc.querySelector("#popupDetailScrollWrap .scrollInner").appendChild(a);
          m.getBaseData(b.getNativeObj());
          10 < d.length + g.length && setTimeout(function()
          {
            b.scrollSet("popupDetailScrollWrap", "scrollInner")
          }, 800)
        }.bind(this), new b.PopupClass(
        {
          title: "報酬内容",
          content: "<div id='popupDetailScrollWrap'><div class='scrollInner'></div></div>",
          popupType: "typeA",
          closeBtnText: "OK",
          exClass: "popupDetail"
        }, null, a, null))
      },
      rewardModels: function(a)
      {
        for (var b = [], d = 0; d < a.length; d++) b.push(this.rewardItemFunc(a[d])),
          this._reward && this._reward.removeView();
        return b
      },
      rewardItemFunc: function(a)
      {
        a = b.itemSet(a);
        var c = a.itemCode.split("_")[2];
        this._reward = new w(
        {
          model:
          {
            item: a,
            quantity: a.quantity,
            genericId: c,
            piece: a.piece,
            chara:
            {
              id: a.itemCode
            }
          },
          type: a.rewardType
        });
        return this._reward.render().el.innerHTML
      },
      battleBtn: function(a)
      {
        a.preventDefault();
        if (!b.isScrolled())
        {
          var c = !0;
          e.each(b.patrolDeckList.nowPartyDeck, function(a)
          {
            void 0 != a.model && (c = !1)
          });
          if (c) new b.PopupClass(
          {
            title: "チーム編成",
            content: "パトロールに出発するには<br>魔法少女が<span class='c_red'>1</span>体以上必要です。",
            closeBtnText: "OK",
            popupType: "typeC"
          }, null, null, null);
          else
          {
            var d = b.patrolDeckList.startedPartyChara,
              g = !1;
            d && 0 != d.length && e.each(b.patrolDeckList.nowPartyDeck, function(a)
            {
              void 0 != a.model && -1 != d.indexOf(a.model.charaId) && (g = !0)
            });
            if (g) new b.PopupClass(
            {
              title: "チーム編成",
              content: "<span class='c_red'>パトロール中</span>の魔法少女がいます。",
              closeBtnText: "OK",
              popupType: "typeC"
            }, null, null, null);
            else
            {
              var f = [];
              e.each(b.patrolDeckList.nowPartyDeck, function(a, b)
              {
                void 0 != a.model && f.push(a.model.id)
              });
              r.ajaxPost(b.linkList.patrolStart,
              {
                patrolAreaId: h.model.patrolAreaId,
                deckType: "9" + h.model.patrolArea.areaKey - 0,
                userCardIds: f
              }, function(a)
              {
                b.responseSetStorage(a);
                b.patrolStartResponse = a;
                location.href = "#/PatrolResult"
              })
            }
          }
        }
      },
      removeView: function()
      {
        b.androidKeyStop = !1;
        this.charaListView && this.charaListView.trigger("remove");
        this.off();
        this.remove()
      }
    }),
    n = p.View.extend(
    {
      tagName: "li",
      events: function()
      {
        var a = {};
        a[b.cgti] = this.charaSelect;
        return a
      },
      initialize: function(a)
      {
        this.listenTo(this.parentView.charaListView, "remove", this.removeView);
        this.model = a.model;
        this.index = a.index
      },
      render: function()
      {
        this.model ? this.$el.html(this.template(
        {
          model: this.model,
          index: this.index,
          img: b.imgData
        })) : this.$el.html(this.template(
        {
          index: this.index
        }));
        return this
      },
      reRender: function(a)
      {
        a ? this.$el.html(this.template(
        {
          model: a,
          index: this.index,
          img: b.imgData
        })) : this.$el.html(this.template(
        {
          index: this.index
        }));
        m.getBaseData(b.getNativeObj())
      },
      emptyRender: function(a)
      {
        this.$el.html(this.template(
        {
          index: a.index
        }));
        b.removeClass(b.doc.querySelector(".charaId" + a.model.charaId), "formationCurrent")
      },
      charaSelect: function(a)
      {
        a.preventDefault();
        if (!b.isScrolled())
        {
          var c;
          c = a.target.dataset.charaid;
          k ? a.target.classList.contains("select") ? (a.target.classList.remove("select"), void 0 != this.model && b.removeClass(b.doc.querySelector(".charaId" + this.model.charaId), "formationRemove"), k = !1, f = "", b.doc.getElementById("charaArea").classList.remove("on")) : ($(".select")[0].dataset.charaid && b.removeClass(b.doc.querySelector(".charaId" + $(".select")[0].dataset.charaid), "formationRemove"), void 0 == c && "" == c || b.addClass(b.doc.querySelector(".charaId" + c), "formationRemove"), $(".select").removeClass("select"), a.target.classList.add("select"), f = a.target.dataset.index) : (k = !0, f = a.target.dataset.index, b.doc.getElementById("charaArea").classList.add("on"), a.target.classList.contains("on") && !a.target.classList.contains("select") ? (a.target.classList.add("select"), b.addClass(b.doc.querySelector(".charaId" + this.model.charaId), "formationRemove")) : a.target.classList.contains("off") && a.target.classList.add("select"))
        }
      },
      removeView: function()
      {
        k = !1;
        this.off();
        this.remove()
      }
    });
  return y
});
