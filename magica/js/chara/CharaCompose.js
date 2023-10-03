define("underscore backbone backboneCommon ajaxControl command text!template/chara/CharaCompose.html text!css/chara/CharaCompose.css text!css/chara/CharaCommon.css cardUtil CharaCommon".split(" "), function(h, k, a, q, u, G, H, I, g, f)
{
  var D = null,
    r = k.Model.extend(),
    E, d, M = k.View.extend(
    {
      events: function()
      {
        var b = {};
        b[a.cgti + " #mainBtn"] = this.mainFunc;
        b[a.cgti + " #resetBtn"] = this.resetFunc;
        b[a.cgti + " #itemTab li"] = this.tabChange;
        return b
      },
      initialize: function(a)
      {
        this.useItemObj = {};
        this.useItemSelectNum = 0;
        this.previewEpisodeLvMaxFlag = this.previewLvMaxFlag = !1;
        this.currentTab = "exp";
        this.template = h.template(G);
        this.createDom()
      },
      render: function()
      {
        this.$el.html(this.template(q.getPageJson()));
        return this
      },
      createDom: function()
      {
        a.content.prepend(this.render().el);
        w.prototype.template = h.template($("#useItemControllerTemp").text());
        this.createView()
      },
      createView: function()
      {
        B.prototype.template = h.template($("#ItemTemp").text());
        B.prototype.parentView = this;
        J();
        a.setGlobalView();
        a.ready.hide()
      },
      tabChange: function(b)
      {
        b.preventDefault();
        if (!a.isScrolled())
        {
          for (var c = a.doc.getElementById("itemTab").getElementsByTagName("li"), e = 0; e < c.length;) a.removeClass(c[e], "current"), e = e + 1 | 0;
          a.addClass(b.currentTarget, "current");
          this.resetFunc(b);
          this.currentTab = b.currentTarget.dataset.type;
          "exp" !== this.currentTab ? (a.addClass(a.doc.getElementsByClassName("itemWrapInner")[0], "hide"), a.removeClass(a.doc.getElementsByClassName("episodeWrapInner")[0], "hide"), a.addClass(a.doc.getElementById("itemWrap"), "typeEp"), a.addClass(a.doc.getElementById("topWrap"), "typeEp")) : (a.removeClass(a.doc.getElementsByClassName("itemWrapInner")[0], "hide"), a.addClass(a.doc.getElementsByClassName("episodeWrapInner")[0], "hide"), a.removeClass(a.doc.getElementById("itemWrap"), "typeEp"), a.removeClass(a.doc.getElementById("topWrap"), "typeEp"));
          a.scrollRefresh("itemViewWrap", "itemWrapInner", !0)
        }
      },
      mainFunc: function(b)
      {
        b.preventDefault();
        if (!a.isScrolled())
          if (b = f.charaDataView.model.toJSON(), "exp" == this.currentTab && b.level == b.maxLevel || "episode" == this.currentTab && 5 <= b.episodeLevel) new a.PopupClass(
          {
            title: "強化できません",
            content: "レベルが上限に達しています",
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
            a.removeClass(f.charaDataView.el, "popupOpen");
            a.removeClass(f.curtainView.el, "show")
          }), a.addClass(f.charaDataView.el, "popupOpen"), a.addClass(f.curtainView.el, "show");
          else if (0 === d.useItemSelectNum) new a.PopupClass(
        {
          title: "強化できません",
          content: "素材を選択してください",
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
          a.removeClass(f.charaDataView.el, "popupOpen");
          a.removeClass(f.curtainView.el, "show")
        }), a.addClass(f.charaDataView.el, "popupOpen"), a.addClass(f.curtainView.el, "show");
        else
        {
          var c = a.storage.gameUser.toJSON().riche;
          if (parseInt(a.doc.querySelector(".needRiche").textContent) > c) new a.PopupClass(
          {
            title: "強化できません",
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
            a.removeClass(f.charaDataView.el, "popupOpen");
            a.removeClass(f.curtainView.el, "show");
            a.removeClass(a.doc.querySelector(".needRiche"), "c_red")
          }), a.addClass(f.charaDataView.el, "popupOpen"), a.addClass(f.curtainView.el, "show"), a.addClass(a.doc.querySelector(".needRiche"), "c_red");
          else
          {
            c = b.chara.name;
            b.chara.title && (c += "(" + b.chara.title + ")");
            var e = new a.PopupClass(
            {
              title: "強化確認",
              content: "<div id='useItemList'></div><p class='text'>" + c + "を" + ("exp" == this.currentTab ? "魔力強化" : "エピソードLv強化") + "します。</br>よろしいですか？</p>",
              closeBtnText: "キャンセル",
              decideBtnText: "OK",
              param:
              {
                width: "600px",
                height: "360px",
                top: "-webkit-calc(50% - 189px)",
                left: "-webkit-calc(50% - 300px)"
              },
              popupType: "original compose",
              popupId: "composeConfirm",
              showCurtain: !1
            }, null, function()
            {
              var b = h.template($("#useItemConfirm").text());
              $("#useItemList").html(b(
              {
                useItemObj: d.useItemObj
              }));
              var c = 0;
              h.each(d.useItemObj, function(a, b)
              {
                c++
              });
              8 < c && (a.addClass(a.doc.querySelector("#useItemList .useItemScrollInner"), "scrollWrap"), a.scrollSet("useItemScrollOuter", "useItemScrollInner"));
              $("#composeConfirm .decideBtn").on(a.cgti, function(b)
              {
                b.preventDefault();
                a.isScrolled() || (a.androidKeyStop = !0, L(), a.removeClass(a.doc.querySelector("#topWrap"), "type2"), $("#composeConfirm .decideBtn").off(), e.remove(), a.removeClass(f.charaDataView.el, "popupOpen"), a.removeClass(f.curtainView.el, "show"))
              })
            }, function()
            {
              a.removeClass(f.charaDataView.el, "popupOpen");
              a.removeClass(f.curtainView.el, "show")
            });
            a.addClass(f.charaDataView.el, "popupOpen");
            a.addClass(f.curtainView.el, "show")
          }
        }
      },
      resetFunc: function(b)
      {
        b.preventDefault();
        a.isScrolled() || (d.useItemObj = {}, d.useItemSelectNum = 0, y(), d.trigger("itemSelectReset"), d.trigger("checkController"), a.removeClass(a.doc.querySelector("#topWrap"), "type2"), a.addClass(a.doc.querySelector("#lv .arrow"), "hide"), a.addClass(a.doc.querySelector("#lv .after"), "hide"))
      },
      itemWrapUpdate: function()
      {
        var b = "." + f.charaDataView.model.toJSON().card.attributeId.toLowerCase() + "Wrap";
        h.each(this.el.querySelectorAll(".itemWrapInner .wrap"), function(b, e)
        {
          b.classList.contains("allWrap") || a.removeClass(b, "bonusIcon")
        });
        a.addClass(this.el.querySelector(b), "bonusIcon");
        f.charaDataView && (f.charaDataView.lvMaxFlag ? a.addClass(a.doc.querySelector("#itemWrap"), "selectMax") : this.previewLvMaxFlag ? a.addClass(a.doc.querySelector("#itemWrap"), "selectMax") : a.removeClass(a.doc.querySelector("#itemWrap"), "selectMax"));
        0 < this.useItemSelectNum ? a.removeClass(a.doc.querySelector("#mainBtn"), "off") : a.addClass(a.doc.querySelector("#mainBtn"), "off")
      },
      needRicheUpdate: function()
      {
        var b = f.charaDataView.model.toJSON(),
          c = d.useItemObj,
          b = "exp" == this.currentTab ? g.getComposeCost(b.card.rank, b.level, c) : g.getEpisodeComposeCost(b.card.rank, g.getEpisodeLevel(b), c);
        a.doc.querySelector(".needRiche").textContent = b
      }
    }),
    N = {
      1: "1",
      "1.5": "2",
      2: "3"
    },
    L = function()
    {
      a.tapBlock(!0);
      var b = {};
      b.userCardId = f.charaDataView.model.toJSON().id;
      b.useItem = d.useItemObj;
      var c = function(b)
      {
        a.responseSetStorage(b);
        var e = Number(N[b.composeEffect]) || 1;
        d.useItemObj = {};
        d.useItemSelectNum = 0;
        d.trigger("itemSelectReset");
        d.itemWrapUpdate();
        var c = f.charaDataView.model.toJSON(),
          x = b.userCardList ? b.userCardList[0] : a.storage.userCardList.findWhere(
          {
            id: c.id
          }).toJSON(),
          m = b.userCharaList ? b.userCharaList[0] : a.storage.userCharaList.findWhere(
          {
            userCardId: c.id
          }).toJSON(),
          h = g.addExStatus($.extend(x, m));
        f.richeView.model.set(b);
        a.doc.querySelector(".needRiche").textContent = "0";
        var k, v, l, q, t = a.doc.querySelector("#afterLv");
        "exp" == d.currentTab ? (k = c.level, v = h.level, x = c.experience + g.exArr[k - 1], m = h.experience + g.exArr[v - 1], l = a.doc.querySelector(".expGaugeInner"), q = a.doc.querySelector(".expGaugeInner2"), t = a.doc.querySelector("#afterLv")) : (k = g.getEpisodeLevel(c), v = g.getEpisodeLevel(h), x = c.bondsTotalPt, m = h.bondsTotalPt, l = a.doc.querySelector(".expGaugeInner3"), q = a.doc.querySelector(".expGaugeInner4"), t = a.doc.querySelector("#episodeLv"));
        var p = O(k, v, x, m);
        u.startSe(1007);
        $(l).on("transitionend", function(a)
        {
          p.lvDef--;
          0 <= p.lvDef ? ($(t).trigger("lvUp"), setTimeout(function()
          {
            l.style.transitionDuration = "0s";
            l.style.width = 0;
            $(l).trigger("gaugeReset")
          }, 30)) : $(l).trigger("resultAnimeComp")
        });
        $(t).on("lvUp", function(a)
        {
          t.innerText = parseInt(t.innerText) + 1
        });
        $(l).on("gaugeReset", function()
        {
          u.startSe(1007);
          setTimeout(function()
          {
            l.style.transitionDuration = p.duration;
            p.lvDef ? l.style.width = "100%" : p.resultRatio ? l.style.width = p.resultRatio + "%" : $(l).trigger("resultAnimeComp")
          }, 30)
        });
        $(l).on("resultAnimeComp", function()
        {
          $(t).off();
          $(l).off();
          setTimeout(function()
          {
            f.charaDataView.model.set(h);
            a.storage.userCardListEx.findWhere(
            {
              id: h.id
            }).set(h);
            a.addClass(a.doc.querySelector("#afterLv"), "c_gold");
            a.doc.querySelector(".hasRiche").textContent = b.gameUser.riche;
            u.stopComposeEffect();
            f.playComposeResultEffect(e);
            d.trigger("checkController");
            setTimeout(function()
            {
              a.tapBlock(!1);
              if (k == v) a.androidKeyStop = !1;
              else
              {
                var b = {};
                b.type = "exp" == d.currentTab ? "level" : "episode";
                b.before = c;
                b.after = h;
                b = new f.CharaResultView(
                {
                  model: new r(b)
                });
                $("#overlapContainer").append(b.render().el);
                f.charaListView.cardSort.multiSort();
                u.getBaseData(a.getNativeObj());
                a.tapBlock(!1)
              }
            }, 1500)
          }, 750)
        });
        $("#tapBlock").on(a.cgti, function()
        {
          $(l).trigger("resultAnimeComp");
          l.style.transitionDuration = "0s";
          l.style.width = p.resultRatio + "%";
          t.innerText = v
        });
        t.textContent = k;
        q.style.width = "0%";
        setTimeout(function()
        {
          l.style.transitionDuration = p.duration;
          l.style.width = p.lvDef ? "100%" : p.resultRatio + "%";
          f.playComposeEffect()
        }, 100)
      };
      "episode" == d.currentTab ? q.ajaxPost(a.linkList.userCardComposeEpisodeByItem, b, c) : q.ajaxPost(a.linkList.userCardCompose, b, c)
    },
    w = k.View.extend(
    {
      initialize: function()
      {
        this.listenTo(d, "removeView", this.removeView)
      },
      checkUseItemNum: function()
      {
        var b = f.charaDataView.model.toJSON(),
          c = b.level,
          e = b.maxLevel,
          K = b.experience,
          b = b.chara.attributeId,
          n = d.useItemObj,
          h = a.doc.querySelector("#useComposeItem .item").id;
        return g.getCanUseComposeItemNum(c, e, K, b, n, h)
      },
      events: function()
      {
        var b = {};
        b[a.cgti + " .plusBtn"] = this.itemSetFunc;
        b[a.cgti + " .minusBtn"] = this.itemSetFunc;
        b[a.cgti + " .maxBtn"] = this.itemSetFunc;
        b["input #useItemSlider"] = this.sliderFunc;
        return b
      },
      sliderFunc: function(b)
      {
        this.itemView.itemSelectFunc(null, b.currentTarget.value - this.itemView.selectNum);
        a.doc.querySelector("#useComposeItem .selectNum").innerText = this.itemView.selectNum;
        this.checkController()
      },
      render: function()
      {
        this.$el.html(this.template());
        var b = this.itemView.model.toJSON().quantity,
          c = this.checkUseItemNum();
        this.canUseItemNum = b < c ? b : c;
        this.canUseItemNum = this.itemView.selectNum > this.canUseItemNum ? this.itemView.selectNum : this.canUseItemNum;
        a.doc.querySelector("#useComposeItem .selectNum").innerText = this.itemView.selectNum;
        this.checkController();
        b = this.el.querySelector("#useItemSlider");
        b.max = this.canUseItemNum;
        b.value = this.itemView.selectNum;
        return this
      },
      checkController: function()
      {
        0 < this.itemView.selectNum ? a.removeClass(this.el.querySelector(".minusBtn"), "off") : a.addClass(this.el.querySelector(".minusBtn"), "off");
        this.itemView.selectNum >= this.canUseItemNum || d.previewLvMaxFlag ? (a.addClass(this.el.querySelector(".plusBtn"), "off"), a.addClass(this.el.querySelector(".maxBtn"), "off")) : (a.removeClass(this.el.querySelector(".plusBtn"), "off"), a.removeClass(this.el.querySelector(".maxBtn"), "off"))
      },
      itemSetFunc: function(b)
      {
        b.preventDefault();
        if (!a.isScrolled() && !b.currentTarget.classList.contains("off"))
        {
          var c = this.itemView;
          switch (b.currentTarget.dataset.type)
          {
            case "plus":
              this.itemView.itemSelectFunc(null, 1);
              break;
            case "minus":
              this.itemView.itemSelectFunc(null, -1);
              break;
            case "max":
              this.itemView.itemSelectFunc(null, this.canUseItemNum - this.itemView.selectNum)
          }
          a.doc.querySelector("#useItemSlider").value = c.selectNum;
          a.doc.querySelector("#useComposeItem .selectNum").innerText = c.selectNum;
          this.checkController()
        }
      },
      removeView: function()
      {
        this.off();
        this.remove()
      }
    }),
    P = ["N", "P", "PP"],
    B = k.View.extend(
    {
      className: function()
      {
        console.log(this.model);
        var a = this.model.toJSON().itemAtt.toLowerCase() + "Wrap";
        "ALL" == this.model.toJSON().itemAtt && (a += " bonusIcon");
        "EPISODE" !== this.model.toJSON().itemAtt && (a += " flexBox");
        return "wrap " + a
      },
      initialize: function()
      {
        this.listenTo(this.parentView, "removeView", this.removeView);
        this.createView()
      },
      render: function()
      {
        this.$el.html(this.template(
        {
          model: this.model.toJSON()
        }));
        this.el.appendChild(this.itemPartsNode);
        return this
      },
      createView: function()
      {
        var b = this.model.toJSON();
        z.prototype.parentView = this;
        z.prototype.itemAtt = b.itemAtt;
        z.prototype.template = h.template($("#ItemPartsTemp").text());
        A.prototype.parentView = this;
        A.prototype.itemAtt = b.itemAtt;
        A.prototype.template = h.template($("#ItemPartsTemp").text());
        var c = a.doc.createDocumentFragment();
        h.each(P, function(a, d)
        {
          if ("EPISODE" === b.itemAtt && "PP" !== a) return !0;
          b[a] || (b[a] = new r(
          {
            itemRank: a,
            itemId: "COMPOSE_ITEM_" + b.itemAtt + ("N" === a ? "" : "_" + a),
            quantity: 0
          }));
          b[a].set(
          {
            itemRank: a
          },
          {
            silent: !0
          });
          a = "EPISODE" === b.itemAtt ? new A(
          {
            model: b[a]
          }) : new z(
          {
            model: b[a]
          });
          c.appendChild(a.render().el)
        });
        this.itemPartsNode = c
      },
      removeView: function()
      {
        this.off();
        this.remove()
      }
    }),
    C, z = k.View.extend(
    {
      id: function()
      {
        return this.model.toJSON().itemId
      },
      className: function()
      {
        var a = "item";
        0 === this.model.get("quantity") && (a += " off");
        return a
      },
      attributes: function()
      {
        return {
          "data-itemrank": this.model.toJSON().itemRank
        }
      },
      events: function()
      {
        this.model.toJSON();
        var b = {};
        b[a.cgti] = this.itemSelectFunc;
        b.touchstart = this.itemPopTimerStart;
        return b
      },
      initialize: function()
      {
        this.selectNum = 0;
        this.listenTo(this.model, "change", this.render);
        this.listenTo(this.parentView.parentView, "removeView", this.removeView);
        this.listenTo(this.parentView.parentView, "itemSelectReset", this.itemNumReset)
      },
      render: function()
      {
        this.$el.html(this.template(
        {
          model: this.model.toJSON()
        }));
        this.el.className = this.className();
        return this
      },
      itemPopTimerStart: function(b)
      {
        if (!(b.currentTarget.classList.contains("off") || d.previewLvMaxFlag && "0" === b.currentTarget.querySelector(".selectNum").innerText))
        {
          var c = this;
          C = setTimeout(function()
          {
            a.isScrolled() || (new a.PopupClass(
            {
              title: "使用ジェム選択",
              content: "",
              decideBtnText: "決定",
              param:
              {
                width: "656px",
                height: "406px",
                bottom: "-webkit-calc(50% - 171px)",
                left: "-webkit-calc(50% - 245px)"
              },
              popupType: "original",
              popupId: "useComposeItem",
              showCurtain: !1,
              canClose: !1
            }, null, function()
            {
              u.startSe(1002);
              a.doc.querySelector("#useComposeItem .popupTextArea").appendChild(c.el.cloneNode(!0));
              w.prototype.itemView = null;
              w.prototype.itemView = c;
              c.itemControllerView = new w;
              a.doc.querySelector("#useComposeItem .popupTextArea").appendChild(c.itemControllerView.render().el);
              $("#useComposeItem .decideBtn").on(a.cgti, function(b)
              {
                b.preventDefault();
                a.isScrolled() || (c.itemNumDispUpdate(), a.g_popup_instance.popupView.close())
              })
            }, function()
            {
              c.itemControllerView.removeView();
              delete c.itemControllerView;
              a.removeClass(f.charaDataView.el, "popupOpen");
              a.removeClass(f.curtainView.el, "show")
            }), a.addClass(f.charaDataView.el, "popupOpen"), a.addClass(f.curtainView.el, "show"))
          }, 800)
        }
      },
      itemSelectFunc: function(b, c)
      {
        clearTimeout(C);
        if (b && (b.preventDefault(), a.isScrolled() || a.g_popup_instance || b.currentTarget.classList.contains("off"))) return;
        var e = this.model.toJSON();
        b = this.el;
        if (e.item && !f.charaDataView.lvMaxFlag)
        {
          b.getElementsByClassName("selectNum");
          var e = e.itemId,
            g = Number(this.el.querySelector(".hasNum span").innerText);
          if (void 0 !== c) d.useItemSelectNum -= this.selectNum, this.selectNum += c, d.useItemSelectNum += this.selectNum, d.useItemObj[e] = this.selectNum, 0 == this.selectNum && delete d.useItemObj[e], 0 < this.selectNum ? a.addClass(b, "show") : a.removeClass(b, "show");
          else if (!d.previewLvMaxFlag && this.selectNum < g) u.startSe(1002), d.useItemSelectNum += 1, this.selectNum += 1, d.useItemObj[e] = this.selectNum, 1 == this.selectNum && a.addClass(b, "show");
          else return;
          y();
          this.itemNumDispUpdate();
          0 < d.useItemSelectNum ? a.addClass(a.doc.querySelector("#topWrap"), "type2") : a.removeClass(a.doc.querySelector("#topWrap"), "type2")
        }
      },
      itemNumReset: function()
      {
        this.selectNum = 0;
        var b = this.el.getElementsByClassName("selectNum")[0];
        b && (a.removeClass(b.parentNode, "show"), b.innerText = "0");
        b = this.model.toJSON().itemId;
        delete d.useItemObj[b]
      },
      itemNumDispUpdate: function()
      {
        this.el.getElementsByClassName("selectNum")[0].innerText = this.selectNum
      },
      removeView: function()
      {
        this.itemControllerView && this.itemControllerView.removeView();
        this.off();
        this.remove()
      }
    }),
    A = k.View.extend(
    {
      id: function()
      {
        return this.model.toJSON().itemId
      },
      className: function()
      {
        var a = "item";
        0 === this.model.get("quantity") && (a += " off");
        return a
      },
      attributes: function()
      {
        return {
          "data-itemrank": this.model.toJSON().itemRank
        }
      },
      events: function()
      {
        var b = {};
        b[a.cgti + " .plusBtn"] = this.itemSetFunc;
        b[a.cgti + " .minusBtn"] = this.itemSetFunc;
        b[a.cgti + " .maxBtn"] = this.itemSetFunc;
        return b
      },
      initialize: function()
      {
        this.canUseItemNum = this.selectNum = 0;
        this.listenTo(this.model, "change", this.render);
        this.listenTo(this.parentView.parentView, "removeView", this.removeView);
        this.listenTo(this.parentView.parentView, "itemSelectReset", this.itemNumReset);
        this.listenTo(this.parentView.parentView, "checkController", this.checkController)
      },
      render: function()
      {
        this.$el.html(this.template(
        {
          model: this.model.toJSON()
        }));
        this.el.className = this.className();
        return this
      },
      checkController: function()
      {
        var b = f.charaDataView.model.toJSON(),
          b = g.getCanUseEpisodeComposeItemNum(b.bondsTotalPt, d.useItemObj, this.model.get("itemId")),
          c = this.model.get("quantity");
        this.canUseItemNum = c < b ? c : b;
        0 < this.selectNum ? a.removeClass(this.el.querySelector(".minusBtn"), "off") : a.addClass(this.el.querySelector(".minusBtn"), "off");
        this.selectNum === this.canUseItemNum || d.previewEpisodeLvMaxFlag ? (a.addClass(this.el.querySelector(".plusBtn"), "off"), a.addClass(this.el.querySelector(".maxBtn"), "off")) : (a.removeClass(this.el.querySelector(".plusBtn"), "off"), a.removeClass(this.el.querySelector(".maxBtn"), "off"))
      },
      itemSetFunc: function(b)
      {
        b.preventDefault();
        if (!a.isScrolled() && !b.currentTarget.classList.contains("off"))
        {
          switch (b.currentTarget.dataset.type)
          {
            case "plus":
              this.itemSelectFunc(null, 1);
              break;
            case "minus":
              this.itemSelectFunc(null, -1);
              break;
            case "max":
              this.itemSelectFunc(null, this.canUseItemNum - this.selectNum)
          }
          this.el.getElementsByClassName("selectNum")[0].innerText = this.selectNum;
          this.checkController()
        }
      },
      itemSelectFunc: function(b, c)
      {
        if (b && (b.preventDefault(), a.isScrolled() || a.g_popup_instance || b.currentTarget.classList.contains("off"))) return;
        var e = this.model.toJSON();
        b = this.el;
        b.getElementsByClassName("selectNum");
        var e = e.itemId,
          f = Number(this.el.querySelector(".hasNum span").innerText);
        if (void 0 !== c) d.useItemSelectNum -= this.selectNum, this.selectNum += c, d.useItemSelectNum += this.selectNum, d.useItemObj[e] = this.selectNum, 0 == this.selectNum && delete d.useItemObj[e], 0 < this.selectNum ? a.addClass(b, "show") : a.removeClass(b, "show");
        else if (!d.previewEpisodeLvMaxFlag && this.selectNum < f) u.startSe(1002), d.useItemSelectNum += 1, this.selectNum += 1, d.useItemObj[e] = this.selectNum, 1 == this.selectNum && a.addClass(b, "show");
        else return;
        y();
        this.itemNumDispUpdate()
      },
      itemNumReset: function()
      {
        this.selectNum = 0;
        var b = this.el.getElementsByClassName("selectNum")[0];
        b && (a.removeClass(b.parentNode, "show"), b.innerText = "0");
        b = this.model.toJSON().itemId;
        delete d.useItemObj[b]
      },
      itemNumDispUpdate: function()
      {
        this.el.getElementsByClassName("selectNum")[0].innerText = this.selectNum
      },
      removeView: function()
      {
        this.off();
        this.remove()
      }
    }),
    J = function()
    {
      var b = Q(E.userItemList);
      console.log("composeItemObj", b);
      var c = a.doc.createDocumentFragment(),
        e = a.doc.createDocumentFragment();
      h.each(F, function(a)
      {
        var d = new B(
        {
          model: new r(b[a])
        });
        "EPISODE" === a ? e.appendChild(d.render().el) : c.appendChild(d.render().el)
      });
      a.doc.querySelector(".itemWrapInner").appendChild(c);
      a.doc.querySelector(".episodeWrapInner").appendChild(e)
    },
    F = "FIRE WATER TIMBER LIGHT DARK ALL EPISODE".split(" "),
    Q = function(b)
    {
      var c = {};
      a.storage.userItemList.each(function(a, b)
      {
        var e = a.toJSON();
        "COMPOSE" == (e.item ? e.item.itemType : "") && (b = e.itemId.split("_")[2], "object" !== typeof c[b] && (c[b] = {}, c[b].itemAtt = b), e = e.itemId.split("_")[3] || "N", c[b][e] = a)
      });
      h.each(F, function(b)
      {
        c[b] || (c[b] = {}, c[b].itemAtt = b, "EPISODE" == b ? (c[b].N = a.storage.userItemList.findWhere(
        {
          itemId: b + "_COMPOSE"
        }) || new r(
        {
          itemId: b + "_COMPOSE",
          quantity: 0
        }), c[b].P = a.storage.userItemList.findWhere(
        {
          itemId: b + "_COMPOSE_P"
        }) || new r(
        {
          itemId: b + "_COMPOSE_P",
          quantity: 0
        }), c[b].PP = a.storage.userItemList.findWhere(
        {
          itemId: b + "_COMPOSE_PP"
        }) || new r(
        {
          itemId: b + "_COMPOSE_PP",
          quantity: 0
        })) : (c[b].N = a.storage.userItemList.findWhere(
        {
          itemId: "COMPOSE_ITEM_" + b
        }) || new r(
        {
          itemId: "COMPOSE_ITEM_" + b,
          quantity: 0
        }), c[b].P = a.storage.userItemList.findWhere(
        {
          itemId: "COMPOSE_ITEM_" + b + "_P"
        }) || new r(
        {
          itemId: "COMPOSE_ITEM_" + b + "_P",
          quantity: 0
        }), c[b].PP = a.storage.userItemList.findWhere(
        {
          itemId: "COMPOSE_ITEM_" + b + "_PP"
        }) || new r(
        {
          itemId: "COMPOSE_ITEM_" + b + "_PP",
          quantity: 0
        })))
      });
      return c
    },
    y = function()
    {
      var b = f.charaDataView.model.toJSON(),
        c = d.useItemObj;
      if (0 === d.useItemSelectNum)
      {
        a.addClass(a.doc.querySelector("#lv .arrow"), "hide");
        a.addClass(a.doc.querySelector("#lv .after"), "hide");
        d.needRicheUpdate();
        d.previewLvMaxFlag = !1;
        d.previewEpisodeLvMaxFlag = !1;
        d.itemWrapUpdate();
        a.doc.querySelector(".expGaugeInner2").style.width = "0%";
        a.doc.querySelector(".expGaugeInner4").style.width = "0%";
        b = g.getEpisodeExpRequire(b);
        0 > b && (b = 0);
        var e = a.doc.querySelector(".bondsTotalPt");
        e && (e.innerText = "あと" + b)
      }
      else
      {
        d.itemWrapUpdate();
        if ("exp" == d.currentTab)
        {
          a.removeClass(a.doc.querySelector("#lv .arrow"), "hide");
          a.removeClass(a.doc.querySelector("#lv .after"), "hide");
          for (var e = b.level, h = b.maxLevel, n = b.experience + g.exArr[e - 1], c = g.getComposeExp(b.card.rank, e, b.card.attributeId, c), n = n + c, k = e, m = e; m <= h - 1;)
          {
            if (g.exArr[m] < n) k = m + 1;
            else break;
            m = m + 1 | 0
          }
          d.previewLvMaxFlag = b.maxLevel == k ? !0 : !1;
          $("#afterLv").text(k);
          e = (n - g.exArr[e - 1]) / (g.exArr[e] - g.exArr[e - 1]) * 100;
          100 <= e && (e = 100);
          a.doc.querySelector(".expGaugeInner2").style.width = e + "%"
        }
        else
        {
          e = g.getEpisodeLevel(b);
          h = 5;
          n = b.bondsTotalPt;
          c = g.getEpisodeComposeExp(c);
          n += c;
          for (m = k = e; m <= h - 1;)
          {
            if (g.episodeExp[m] < n) k = m + 1;
            else break;
            m = m + 1 | 0
          }
          d.previewEpisodeLvMaxFlag = 5 == k ? !0 : !1;
          b = g.getEpisodeExpRequire(b) - c;
          0 > b && (b = 0);
          a.doc.querySelector(".bondsTotalPt").innerText = "あと" + b;
          e = (n - g.episodeExp[e - 1]) / (g.episodeExp[e] - g.episodeExp[e - 1]) * 100;
          100 <= e && (e = 100);
          a.doc.querySelector(".expGaugeInner4").style.width = e + "%"
        }
        d.itemWrapUpdate();
        d.needRicheUpdate()
      }
    },
    O = function(a, c, e, f)
    {
      e = "exp" == d.currentTab ? g.exArr : g.episodeExp;
      var b = {};
      b.lvDef = c - a;
      b.resultRatio = Math.floor((f - e[c - 1]) / (e[c] - e[c - 1]) * 100);
      b.duration = (b.lvDef ? 1.8 / b.lvDef : 1.8) + "s";
      return b
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
      id: "userDeckList"
    },
    {
      id: "userDoppelList"
    },
    {
      id: "userLive2dList"
    },
    {
      id: "userPieceList"
    },
    {
      id: "userPieceSetList"
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
      f.charaSelect(b);
      b = f.charaDataView.model.toJSON().card.miniCharaNo;
      f.showMiniChara(b);
      d.useItemObj = {};
      d.useItemSelectNum = 0;
      a.doc.querySelector("#topWrap") && a.removeClass(a.doc.querySelector("#topWrap"), "type2");
      y();
      d.trigger("itemSelectReset");
      d.trigger("checkController")
    },
    fetch: function(a)
    {
      D = a ? a : null;
      q.pageModelGet(this.needModelIdObj)
    },
    init: function()
    {
      a.setStyle(H + I);
      E = q.getPageJson();
      g.createCardList();
      d = new M;
      f.charaViewInit(D);
      d.itemWrapUpdate();
      a.scrollSet("itemViewWrap", "itemWrapInner");
      a.removeClass(a.doc.querySelector("#richeWrap"), "hide");
      a.tapBlock(!1);
      var b = f.charaDataView.model.toJSON().card.miniCharaNo;
      f.showMiniChara(b)
    },
    startCommand: function() {},
    remove: function(b)
    {
      clearTimeout(C);
      a.addClass(a.doc.querySelector("#lv .arrow"), "hide");
      a.addClass(a.doc.querySelector("#lv .after"), "hide");
      a.doc.querySelector(".expGaugeInner2").style.width = "0%";
      a.doc.querySelector(".expGaugeInner4").style.width = "0%";
      f.charaViewRemove();
      d && (d.trigger("removeView"), d.remove());
      b()
    },
    charaCommon: function()
    {
      return f
    }
  }
});
