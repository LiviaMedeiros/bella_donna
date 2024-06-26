define("underscore backbone backboneCommon ajaxControl command js/card/CardPopup text!template/chara/CharaEnhancementTree.html text!template/chara/CharaEnhancementMaterialPopup.html text!css/chara/CharaEnhancementTree.css cardUtil".split(" "), function(h, t, a, n, g, G, H, I, J, E)
{
  t.Model.extend();
  var u, f, p, w, q, r, v, l = null,
    K = t.View.extend(
    {
      events: function()
      {
        var b = {};
        b[a.cgti + " #wrapOpen"] = this.wrapOpen;
        b[a.cgti + " #treeReset"] = this.charaReset;
        b[a.cgti + " .debugBtn"] = this.debugBtn;
        b["touchstart #touchWrap"] = this.touchStart;
        b["touchmove #touchWrap"] = this.touchMove;
        b["touchend #touchWrap"] = this.touchEnd;
        b[a.cgti + " #scaleChangePlus"] = this.scaleUp;
        b[a.cgti + " #scaleChangeMinus"] = this.scaleDown;
        b[a.cgti + " #resetPosition"] = this.resetPosition;
        return b
      },
      initialize: function(a)
      {
        this.listenTo(this, "removeView", this.removeView);
        this.scale = 50;
        this.template = h.template(H);
        this.createDom()
      },
      render: function()
      {
        this.$el.html(this.template(u));
        return this
      },
      createDom: function()
      {
        a.content.append(this.render().el);
        a.setGlobalView();
        a.removeClassId("scaleChangePlus", "off");
        a.addClassId("scaleChangeMinus", "off");
        z.prototype.rootView = this;
        z.prototype.template = h.template($("#charaDataTemp").text());
        A.prototype.rootView = this;
        A.prototype.template = h.template($("#richeTemp").text());
        B.prototype.rootView = this;
        B.prototype.template = h.template($("#pointInfoTemp").text());
        C.prototype.rootView = this;
        C.prototype.template = h.template($("#skillWrapTemp").text());
        var b = a.doc.createElement("div");
        b.id = "treeCharaData";
        a.doc.getElementById("baseContainer").appendChild(b);
        $("#treeCharaData").on(a.cgti, function(a)
        {
          "detailBtn" !== a.target.id && "moreDetail" !== a.target.id && p.wrapClose(a)
        });
        b = a.doc.createElement("div");
        b.id = "richeWrap";
        b.className = "commonFrame3";
        a.doc.getElementById("baseContainer").appendChild(b);
        b = a.doc.createElement("div");
        b.id = "popupConfirmCurtain";
        a.doc.getElementById("baseContainer").appendChild(b);
        b = b = b = null;
        this.createOpenedPointList();
        this.createCharaDataView();
        this.createRicheView();
        this.createPointView();
        x(!0);
        a.scrollSet("getListScrollOuter", "getListScrollInner");
        window.isDebug && a.scrollSet("debugScrollOuter", "debugScrollInner")
      },
      createCharaDataView: function()
      {
        var b = a.storage.userCardListEx.findWhere(
          {
            charaId: l
          }),
          c = a.historyArr[a.historyArr.length - 1];
        a.historyArr = ["MyPage", "CharaListTop/" + b.toJSON().id, c];
        a.doc.getElementById("changeChara").dataset.href = "#/CharaListTop/" + b.toJSON().id;
        p = new z;
        p.model = b;
        a.doc.getElementById("treeCharaData").appendChild(p.render().el);
        a.addClass(a.doc.getElementById("treeCharaData"), "show")
      },
      createPointView: function()
      {
        q = new B;
        a.doc.getElementById("pointData").appendChild(q.firstRender().el)
      },
      createRicheView: function()
      {
        w = new A;
        a.doc.getElementById("richeWrap").appendChild(w.render().el)
      },
      createOpenedPointList: function(b)
      {
        var c = a.storage.userCharaEnhancementCellList.where(
          {
            charaId: l
          }),
          d = this;
        this.opendPointList = [];
        this.opendSkillAndAbility = [];
        h.each(c, function(a)
        {
          a = a.toJSON();
          d.opendPointList.push(a);
          if (a.charaEnhancementCell.enhancementType) switch (a.charaEnhancementCell.enhancementType)
          {
            case "SKILL":
            case "ABILITY":
              d.opendSkillAndAbility.push(a)
          }
        });
        a.doc.getElementById("footerCount").textContent = c.length - 1 + "/" + (u.charaEnhancementCellList.length - 1);
        this.createSkillView();
        b && (this.trigger("statusRefresh"), g.getBaseData(a.getNativeObj()))
      },
      createSkillView: function()
      {
        r ? (r.model = this.opendSkillAndAbility, r.render()) : (r = new C, r.model = this.opendSkillAndAbility, a.doc.getElementById("getListScrollOuter").appendChild(r.render().el));
        a.scrollRefresh("getListScrollOuter", "getListScrollInner")
      },
      wrapOpen: function(b)
      {
        if (b)
        {
          b.preventDefault();
          if (a.isScrolled()) return;
          this.infoClosed = !1
        }
        b = a.doc.getElementById("treeCharaData");
        a.removeClass(b, "close");
        a.addClass(b, "show");
        a.addClass(a.doc.getElementById("wrapOpen"), "hide")
      },
      pointDetailOpen: function(b)
      {
        if (b = h.findWhere(u.charaEnhancementCellList,
          {
            charaEnhancementCellId: b
          })) this.pointOpen = !0, q.model = b, q.render(), g.getBaseData(a.getNativeObj()), a.removeClassId("pointData", "hide"), a.addClassId("pointData", "show"), a.addClassId("changeChara", "hide"), a.addClassId("scaleChangePlus", "hide"), a.addClassId("scaleChangeMinus", "hide"), a.addClassId("resetPosition", "hide"), q.displayDescriptionBtn(),
          this.wrapOpen(null)
      },
      closeDetail: function(b)
      {
        if (b && (b.preventDefault(), a.isScrolled())) return;
        a.doc.getElementById("getListData").classList.contains("show") ? p.moreDetailToggle() : (this.pointOpen = !1, a.removeClassId("pointData", "show"), a.removeClassId("richeWrap", "show"), a.removeClassId("changeChara", "hide"), a.removeClassId("scaleChangePlus", "hide"), a.removeClassId("scaleChangeMinus", "hide"), a.removeClassId("resetPosition", "hide"), a.addClassId("pointData", "hide"), a.doc.getElementById("treeCharaData").getElementsByClassName("moreHpAdd")[0].textContent = "", a.doc.getElementById("treeCharaData").getElementsByClassName("moreAtkAdd")[0].textContent = "", a.doc.getElementById("treeCharaData").getElementsByClassName("moreDefAdd")[0].textContent = "", this.infoClosed && p.wrapClose())
      },
      charaReset: function(b)
      {
        b.preventDefault();
        if (!a.isScrolled())
        {
          var c = a.storage.userCharaEnhancementCellList.where(
          {
            charaId: l
          });
          if (0 === (c.length - 1 | 0)) new a.PopupClass(
          {
            title: "精神強化のリセット",
            content: "精神強化されていないためリセットはできません。",
            closeBtnText: "OK",
            exClass: "popupShop"
          });
          else
          {
            var d = a.storage.userCardListEx.findWhere(
            {
              charaId: l
            }).toJSON();
            b = d.chara.title ? d.chara.name + "(" + d.chara.title + ")" : d.chara.name;
            var e = function(b)
              {
                g.popEmotionBoard();
                $("#treeCharaData").off(a.cgti);
                $("#commandDiv").off();
                a.doc.getElementById("treeCharaData") && a.doc.getElementById("baseContainer").removeChild(a.doc.getElementById("treeCharaData"));
                a.doc.getElementById("richeWrap") && a.doc.getElementById("baseContainer").removeChild(a.doc.getElementById("richeWrap"));
                a.doc.getElementById("popupConfirmCurtain") && a.doc.getElementById("baseContainer").removeChild(a.doc.getElementById("popupConfirmCurtain"));
                f && (f.trigger("removeView"), f.remove());
                g.popEmotionBoard();
                r = w = q = p = v = null;
                for (b = c.length; 0 < b;)
                {
                  b--;
                  var d = c[b];
                  "START" !== d.toJSON().charaEnhancementCell.enhancementType && a.storage.userCharaEnhancementCellList.remove(d,
                  {
                    silent: !0
                  })
                }
                setTimeout(function()
                {
                  $("#commandDiv").on("nativeCallback", function(b, c)
                  {
                    $("#commandDiv").off();
                    F();
                    g.scaleEmotionBoard(50);
                    new a.PopupClass(
                    {
                      title: "精神強化のリセット",
                      content: "精神強化をリセットしました。",
                      closeBtnText: "OK",
                      exClass: "popupShop"
                    })
                  });
                  var b = n.getPageJson().charaEnhancementCellList,
                    c = a.storage.userCharaEnhancementCellList.where(
                    {
                      charaId: l
                    }),
                    d = [];
                  h.each(c, function(a)
                  {
                    d.push(a.toJSON())
                  });
                  c = {};
                  c.pointList = b;
                  c.openedPointList = d;
                  g.pushEmotionBoard(c);
                  window.isDebug && window.isBrowser && $("#commandDiv").trigger("nativeCallback")
                }, 500)
              },
              y = function(b)
              {
                a.responseSetStorage(b);
                window.isLocal && window.isDebug ? e() : n.ajaxPost("/magica/api/page/CharaEnhancementTree",
                {
                  charaId: d.charaId + ""
                }, e)
              },
              m = function()
              {
                a.ready.show();
                var b = {};
                b.charaId = d.chara.id;
                n.ajaxPost(a.linkList.userCharaEnhancementReset, b, y)
              },
              k = a.storage.userItemList.findWhere(
              {
                itemId: "RESET_ENHANCE"
              }),
              k = k ? k.toJSON().quantity : 0;
            0 < k ? new a.PopupClass(
            {
              title: "精神強化のリセット",
              content: "原点の器を1個消費して、<span class='c_pink'>" + b + "</span>の<br>精神強化をすべてリセットします。よろしいですか？<br><span class='resetCaution c_red'>※精神強化に使用した素材は返還されますが、CCは返還されません</span><div class='resetItem pointFrame'><span class='hasIcons'><img src='/magica/resource/image_web/common/icon/icon_reset_enhance_f.png'></span><span class='itemCount'>" + k + "</span></div>",
              closeBtnText: "キャンセル",
              decideBtnText: "リセット",
              decideBtnEvent: m,
              exClass: "popupEnhanceReset"
            }) : new a.PopupClass(
            {
              title: "精神強化のリセット",
              content: "精神強化のリセットには原点の器が必要です。<div class='resetItem pointFrame'><span class='hasIcons'><img src='/magica/resource/image_web/common/icon/icon_reset_enhance_f.png'></span><span class='itemCount'>" + k + "</span></div>",
              closeBtnText: "OK",
              exClass: "popupEnhanceReset"
            })
          }
        }
      },
      touchStart: function(b)
      {
        b.preventDefault();
        v && (this.pointOpen && this.closeDetail(), a.tapEffectStop = !0, D(b, "START"))
      },
      touchMove: function(a)
      {
        a.preventDefault();
        v && D(a, "MOVE")
      },
      touchEnd: function(b)
      {
        b.preventDefault();
        v && (a.tapEffectStop = !1, D(b, "END"))
      },
      getNativeCall: function(a)
      {
        1 > a.length || this.pointDetailOpen(a[0])
      },
      scaleUp: function(b)
      {
        b.preventDefault();
        a.isScrolled() || b.currentTarget.classList.contains("off") || (a.removeClassId("scaleChangeMinus", "off"), this.scale = this.scale + 25 | 0, 100 <= this.scale && a.addClassId("scaleChangePlus", "off"), g.scaleEmotionBoard(this.scale))
      },
      scaleDown: function(b)
      {
        b.preventDefault();
        a.isScrolled() || b.currentTarget.classList.contains("off") || (a.removeClassId("scaleChangePlus", "off"), this.scale = this.scale - 25 | 0, 50 >= this.scale && a.addClassId("scaleChangeMinus", "off"), g.scaleEmotionBoard(this.scale))
      },
      resetPosition: function(b)
      {
        b.preventDefault();
        a.isScrolled() || g.centeringEmotionBoard()
      },
      debugBtn: function(b)
      {
        b.preventDefault();
        a.isScrolled() || this.pointDetailOpen(b.currentTarget.dataset.debug | 0)
      },
      removeView: function()
      {
        this.trigger("removeChildView");
        this.off();
        this.remove()
      }
    }),
    z = t.View.extend(
    {
      events: function()
      {
        var b = {};
        b[a.cgti + " #wrapClose"] = this.wrapClose;
        b[a.cgti + " #detailBtn"] = this.popupDetail;
        b[a.cgti + " #moreDetail"] = this.moreDetailToggle;
        return b
      },
      initialize: function(a)
      {
        this.listenTo(this.rootView, "removeChildView", this.removeView)
      },
      render: function()
      {
        this.$el.html(this.template(
        {
          model: this.model.toJSON()
        }));
        return this
      },
      wrapClose: function(b)
      {
        if (b)
        {
          b.preventDefault();
          if (a.isScrolled()) return;
          this.rootView.infoClosed = !0
        }
        b = a.doc.getElementById("treeCharaData");
        a.removeClass(b, "show");
        a.addClass(b, "close");
        a.removeClass(a.doc.getElementById("wrapOpen"), "hide")
      },
      popupDetail: function(b)
      {
        b.preventDefault();
        if (!a.isScrolled())
        {
          a.addClassId("richeWrap", "onPopup");
          var c = a.storage.userCardListEx.findWhere(
            {
              id: this.model.toJSON().id
            }),
            c = c ? c.toJSON() :
            {};
          c.isEnhancement = !0;
          G.instantPopup(b, c, function()
          {
            a.removeClassId("richeWrap", "onPopup")
          })
        }
      },
      moreDetailToggle: function(b)
      {
        if (b && (b.preventDefault(), a.isScrolled())) return;
        a.doc.getElementById("getListData").classList.contains("show") ? (a.doc.getElementById("pointData").classList.contains("show"), a.removeClassId("getListData", "show"), a.addClassId("getListData", "hide")) : (a.removeClassId("getListData", "hide"), a.addClassId("getListData", "show"), a.scrollRefresh("getListScrollOuter", "getListScrollInner"))
      },
      removeView: function()
      {
        this.off();
        this.remove()
      }
    }),
    B = t.View.extend(
    {
      events: function()
      {
        var b = {};
        b[a.cgti + " #pointRelease"] = this.releaseConfirm;
        b[a.cgti + " .requireMaterial"] = this.giftDetail;
        b[a.cgti + " .descriptionBtn"] = this.descriptionBtn;
        return b
      },
      initialize: function(a)
      {
        this.listenTo(this.rootView, "removeChildView", this.removeView);
        this.listenTo(this.rootView, "statusRefresh", this.render)
      },
      firstRender: function()
      {
        this.$el.html(this.template(
        {
          model: null
        }));
        return this
      },
      render: function()
      {
        if (this.model) return this.statusCheck(), this.allMaterial = this.previousResourceCheck(), this.allHasGift = this.allGiftCount(), this.typeCheck(), this.openLimit(), this.richeSet(), this.$el.html(this.template(
        {
          model: this.model,
          type: this.showType,
          dispName: this.pointTitle,
          description: this.pointDescription,
          hasGift: this.giftCount(),
          nowCell: this.nowCell,
          limit: this.limit,
          materialCheck: this.allMaterialCheck,
          richeCheck: this.richeCheck
        })), this
      },
      richeSet: function()
      {
        var b = a.doc.getElementById("richeWrap").getElementsByClassName("needRiche")[0];
        b.textContent = this.totalRiche;
        var c = a.storage.gameUser.toJSON().riche;
        this.totalRiche > c ? (a.addClass(b, "c_red"), this.richeCheck = !1) : (a.removeClass(b, "c_red"), this.richeCheck = !0);
        a.addClassId("richeWrap", "show")
      },
      descriptionBtn: function(b)
      {
        b.preventDefault();
        if (!a.isScrolled())
        {
          var c = a.doc.getElementsByClassName("pointDescription")[0];
          c.classList.contains("detail") ? (a.removeClass(c, "detail"), a.removeClass(b.currentTarget, "open")) : (a.addClass(c, "detail"), a.addClass(b.currentTarget, "open"))
        }
      },
      displayDescriptionBtn: function()
      {
        var b = a.doc.getElementsByClassName("descriptionText")[0],
          c = a.doc.getElementsByClassName("descriptionTextInner")[0];
        b.offsetHeight < c.offsetHeight && a.addClass(a.doc.getElementsByClassName("descriptionBtn")[0], "show")
      },
      releaseConfirm: function(b)
      {
        b.preventDefault();
        if (!a.isScrolled())
          if (this.richeCheck)
          {
            b = function()
            {
              var b = a.doc.getElementById("pointData").getElementsByClassName("pointRequire")[0].cloneNode(!0),
                c = a.doc.querySelector(".popupTextArea p");
              a.doc.querySelector(".popupTextArea").insertBefore(b, c)
            };
            var c = function()
              {
                var b = a.doc.createElement("div");
                b.id = "requireScroll";
                var c = a.doc.createElement("div");
                c.className = "pointRequire";
                var d = h.template($("#multiPartsTemp").text()),
                  e;
                for (e in this.allMaterial) c.innerHTML += d(
                {
                  giftId: e,
                  needs: this.allMaterial[e],
                  has: this.allHasGift[e],
                  enough: this.allHasGift[e] >= this.allMaterial[e] ? !0 : !1
                });
                b.appendChild(c);
                c = a.doc.querySelector(".popupTextArea p");
                a.doc.querySelector(".popupTextArea").insertBefore(b, c);
                g.getBaseData(a.getNativeObj());
                a.scrollSet("requireScroll", "pointRequire")
              }.bind(this),
              d = function()
              {
                a.removeClassId("popupConfirmCurtain", "show");
                a.removeClassId("treeCharaData", "showPopup");
                a.scrollDestroy("requireScroll", "pointRequire")
              },
              e = this,
              y = function(b)
              {
                b.preventDefault();
                if (!a.isScrolled())
                {
                  a.androidKeyStop = !0;
                  a.tapBlock(!0);
                  x(!1);
                  b = function(b)
                  {
                    if ("error" !== b.resultCode)
                    {
                      a.responseSetStorage(b);
                      E.createCardList();
                      p.render();
                      f.remove();
                      a.removeClassId("popupConfirmCurtain", "show");
                      a.removeClassId("treeCharaData", "showPopup");
                      a.addClassId("CharaEnhancementTree", "opening");
                      a.addClassId("treeCharaData", "opening");
                      a.addClassId("richeWrap", "opening");
                      $("#commandDiv").on("nativeCallback", function(b, c)
                      {
                        $("#commandDiv").off();
                        a.removeClassId("CharaEnhancementTree", "opening");
                        a.removeClassId("treeCharaData", "opening");
                        a.removeClassId("richeWrap", "opening");
                        a.tapBlock(!1);
                        a.androidKeyStop = !1;
                        x(!0);
                        e.rootView.createOpenedPointList(!0);
                        q.displayDescriptionBtn()
                      });
                      var c = {};
                      b = h.findWhere(b.userCharaEnhancementCellList,
                      {
                        charaEnhancementCellId: e.model.charaEnhancementCellId
                      });
                      c.aplayList = [b];
                      g.awakenEmotionBoard(c);
                      window.isDebug && window.isBrowser && ($("#commandDiv").off(), a.removeClassId("CharaEnhancementTree", "opening"), a.removeClassId("treeCharaData", "opening"), a.removeClassId("richeWrap", "opening"), x(!0), a.androidKeyStop = !1, a.tapBlock(!1), e.rootView.createOpenedPointList(!0), q.displayDescriptionBtn())
                    }
                  };
                  var c = {};
                  c.charaId = l;
                  1 < e.allPointList.length ? (c.cellIdList = e.allPointList, n.ajaxPost(a.linkList.userCharaEnhancementMultiOpen, c, b)) : (c.cellId = e.model.charaEnhancementCellId, n.ajaxPost(a.linkList.userCharaEnhancementOpen, c, b))
                }
              },
              m = a.storage.userCardListEx.findWhere(
              {
                charaId: l
              }).toJSON(),
              k = m.chara.name;
            m.chara.title && (k += "(" + m.chara.title + ")");
            if (1 < this.allPointList.length)
            {
              if (!this.allMaterialCheck)
              {
                var f = new a.PopupClass(
                {
                  title: "精神強化",
                  content: "<p>精神強化に必要な素材が不足しています。<p><p class='c_red multiCaution'>※前提条件を含む、" + this.allPointList.length + "マス分の精神強化素材が必要です。",
                  closeBtnText: "OK",
                  param:
                  {
                    width: "490px",
                    height: "420px",
                    top: "-webkit-calc(50% - 189px)",
                    left: "-webkit-calc(50% - 245px)"
                  },
                  popupType: "original",
                  popupId: "releaseConfirmMultiple",
                  showCurtain: !1
                }, null, c, d);
                return
              }
              f = new a.PopupClass(
              {
                title: "精神強化　能力解放確認",
                content: "<p>" + k + "の能力解放を行います。</br>よろしいですか？<p><p class='c_red multiCaution'>※前提条件を含む" + this.allPointList.length + "マスの精神強化が解放されます。",
                closeBtnText: "キャンセル",
                decideBtnText: "OK",
                decideBtnEvent: y,
                param:
                {
                  width: "490px",
                  height: "420px",
                  top: "-webkit-calc(50% - 189px)",
                  left: "-webkit-calc(50% - 245px)"
                },
                popupType: "original",
                popupId: "releaseConfirmMultiple",
                showCurtain: !1
              }, null, c, d)
            }
            else
            {
              if (!this.allMaterialCheck)
              {
                f = new a.PopupClass(
                {
                  title: "精神強化",
                  content: "<p>精神強化に必要な素材が不足しています。",
                  closeBtnText: "OK",
                  param:
                  {
                    width: "490px",
                    height: "360px",
                    top: "-webkit-calc(50% - 189px)",
                    left: "-webkit-calc(50% - 245px)"
                  },
                  popupType: "original",
                  popupId: "releaseConfirm",
                  showCurtain: !1
                }, null, b, d);
                return
              }
              f = new a.PopupClass(
              {
                title: "精神強化　能力解放確認",
                content: "<p>" + k + "の能力解放を行います。</br>よろしいですか？<p>",
                closeBtnText: "キャンセル",
                decideBtnText: "OK",
                decideBtnEvent: y,
                param:
                {
                  width: "490px",
                  height: "360px",
                  top: "-webkit-calc(50% - 189px)",
                  left: "-webkit-calc(50% - 245px)"
                },
                popupType: "original",
                popupId: "releaseConfirm",
                showCurtain: !1
              }, null, b, d)
            }
            a.addClassId("popupConfirmCurtain", "show");
            a.addClassId("treeCharaData", "showPopup")
          }
        else new a.PopupClass(
        {
          title: "精神強化",
          content: "精神強化に必要なCCが不足しています。",
          closeBtnText: "OK",
          exClass: "popupShop"
        })
      },
      giftDetail: function(b)
      {
        b.preventDefault();
        if (!a.isScrolled() && !this.nowCell)
        {
          b = b.currentTarget.dataset.giftidnum;
          var c = a.storage.userGiftList.findWhere(
          {
            giftId: this.model["openGiftId" + b]
          });
          c ? (c = c.toJSON(), c.hasNum = c.quantity) : (c = a.storage.giftList.findWhere(
          {
            id: this.model["openGiftId" + b]
          }), c = c.toJSON(), c.gift = c, c.giftId = c.id, c.hasNum = 0);
          c.needNum = this.model["openGiftQuantity" + b];
          c && (c.exClass = "materialPopup", c.popupType = "original", c.popupId = "materialConfirm", c.param = {
            width: "490px",
            height: "360px",
            top: "-webkit-calc(50% - 189px)",
            left: "-webkit-calc(50% - 245px)"
          }, new a.PopupClass(c, I, function()
          {
            $(".materialPopup .questSearchBtn").on(a.cgti, function(b)
            {
              b.preventDefault();
              a.isScrolled() || ($(".materialPopup .questSearchBtn").off(), a.g_popup_instance.remove(), a.searchQuestGiftId = b.currentTarget.dataset.giftid, location.href = "#/SearchQuest")
            })
          }), g.getBaseData(a.getNativeObj()))
        }
      },
      typeCheck: function()
      {
        switch (this.model.enhancementType)
        {
          case "HP":
            this.showType = "hp";
            this.pointTitle = "HP最大能力値アップ";
            this.pointDescription = "";
            break;
          case "ATTACK":
            this.showType = "atk";
            this.pointTitle = "ATK最大能力値アップ";
            this.pointDescription = "";
            break;
          case "DEFENSE":
            this.showType = "def";
            this.pointTitle = "DEF最大能力値アップ";
            this.pointDescription = "";
            break;
          case "DISK_ACCELE":
            this.showType = "accele";
            this.pointTitle = "Accele性能アップ";
            this.pointDescription = "";
            break;
          case "DISK_BLAST":
            this.showType = "blast";
            this.pointTitle = "Blast性能アップ";
            this.pointDescription = "";
            break;
          case "DISK_CHARGE":
            this.showType = "charge";
            this.pointTitle = "Charge性能アップ";
            this.pointDescription = "";
            break;
          case "SKILL":
            this.showType = "SKILL" === this.model.emotionSkill.type ? "skill" : "ability", this.pointTitle = this.model.emotionSkill.name, this.pointDescription = this.model.emotionSkill.shortDescription
        }
        0 < this.statusAdds.HP && (a.doc.getElementById("treeCharaData").getElementsByClassName("moreHpAdd")[0].textContent = "(+" + this.statusAdds.HP + ")");
        0 < this.statusAdds.ATK && (a.doc.getElementById("treeCharaData").getElementsByClassName("moreAtkAdd")[0].textContent = "(+" + this.statusAdds.ATK + ")");
        0 < this.statusAdds.DEF && (a.doc.getElementById("treeCharaData").getElementsByClassName("moreDefAdd")[0].textContent = "(+" + this.statusAdds.DEF + ")")
      },
      statusCheck: function()
      {
        h.findWhere(this.rootView.opendPointList,
        {
          charaEnhancementCellId: this.model.charaEnhancementCellId
        }) ? this.nowCell = !0 : this.nowCell = !1
      },
      openLimit: function()
      {
        this.limit = this.rootView.opendPointList.length - 1 + this.allPointList.length > u.charaEnhancementCellList.length - 1 ? !0 : !1
      },
      giftCount: function()
      {
        var b = {};
        this.materialCheck = !0;
        for (var c = 1; 7 > c; c++)
        {
          var d = this.model["openGiftId" + c];
          if (d)
          {
            var e = a.storage.userGiftList.findWhere(
            {
              giftId: d | 0
            });
            e ? (b[d] = e.toJSON().quantity, this.model["openGiftQuantity" + c] > e.toJSON().quantity && (this.materialCheck = !1)) : (b[d] = 0, this.materialCheck = !1)
          }
        }
        return b
      },
      previousResourceCheck: function()
      {
        var b = n.getPageJson().charaEnhancementCellList;
        a.storage.userCharaEnhancementCellList.where(
        {
          charaId: l
        });
        var c = {},
          d = this.model,
          e = h.findWhere(this.rootView.opendPointList,
          {
            charaEnhancementCellId: d.charaEnhancementCellId
          }) ? !1 : !0;
        this.allPointList = [];
        this.totalRiche = d.needCC;
        for (this.statusAdds = {
            HP: 0,
            ATK: 0,
            DEF: 0
          }; e;)
        {
          this.allPointList.push(d.charaEnhancementCellId);
          for (var g = d, m = 1; 7 > m; m++)
          {
            var k = g["openGiftId" + m],
              f = g["openGiftQuantity" + m];
            k && (c[k] = c[k] ? c[k] + f : f)
          }
          1 < this.allPointList.length && (this.totalRiche += d.needCC);
          switch (d.enhancementType)
          {
            case "HP":
              this.statusAdds.HP += d.effectValue;
              break;
            case "ATTACK":
              this.statusAdds.ATK += d.effectValue;
              break;
            case "DEFENSE":
              this.statusAdds.DEF += d.effectValue
          }
          h.findWhere(this.rootView.opendPointList,
          {
            charaEnhancementCellId: d.needOpenedCellId
          }) ? e = !1 : d = h.findWhere(b,
          {
            charaEnhancementCellId: d.needOpenedCellId
          })
        }
        this.allPointList.reverse();
        return c
      },
      allGiftCount: function()
      {
        this.allMaterialCheck = !0;
        var b = {},
          c;
        for (c in this.allMaterial)
        {
          var d = c,
            e = a.storage.userGiftList.findWhere(
            {
              giftId: d | 0
            });
          e ? (b[d] = e.toJSON().quantity, this.allMaterial[c] > e.toJSON().quantity && (this.allMaterialCheck = !1)) : (b[d] = 0, this.allMaterialCheck = !1)
        }
        return b
      },
      removeView: function()
      {
        this.off();
        this.remove()
      }
    }),
    A = t.View.extend(
    {
      events: function()
      {
        return {}
      },
      initialize: function(b)
      {
        this.listenTo(this.rootView, "removeChildView", this.removeView);
        this.listenTo(a.storage.gameUser, "change", this.hasRicheChange)
      },
      render: function()
      {
        this.$el.html(this.template(
        {
          model: a.storage.gameUser.toJSON()
        }));
        return this
      },
      firstRender: function()
      {
        this.$el.html(this.template());
        return this
      },
      hasRicheChange: function()
      {
        var b = a.storage.gameUser.get("riche");
        this.el.getElementsByClassName("hasRiche")[0].textContent = b
      },
      removeView: function()
      {
        this.off();
        this.remove()
      }
    }),
    C = t.View.extend(
    {
      className: "getListScrollInner",
      events: function()
      {
        return {}
      },
      initialize: function(a)
      {
        this.listenTo(this.rootView, "removeChildView", this.removeView)
      },
      render: function()
      {
        this.$el.html(this.template(
        {
          model: this.model
        }));
        return this
      },
      removeView: function()
      {
        this.off();
        this.remove()
      }
    }),
    F = function()
    {
      E.createCardList();
      u = n.getPageJson();
      a.setStyle(J);
      f = new K;
      v = !0;
      a.firstNaviCheck(u);
      g.getBaseData(a.getNativeObj());
      a.ready.hide()
    },
    D = function(b, c)
    {
      for (var d = [], e = "END" !== c ? "touches" : "changedTouches", f = 0; f < b.originalEvent[e].length; f++)
      {
        var h = b.originalEvent[e][f].identifier;
        0 > h && (h = -h);
        d[f] = {
          identifier: h,
          clientX: 1024 === a.displayWidth ? b.originalEvent[e][f].clientX : 1024 * b.originalEvent[e][f].clientX / 1280,
          clientY: 1024 === a.displayWidth ? b.originalEvent[e][f].clientY : 1024 * b.originalEvent[e][f].clientY / 1280
        }
      }
      switch (c)
      {
        case "START":
          g.callTouchesBegin(d);
          break;
        case "MOVE":
          g.callTouchesMove(d);
          break;
        case "END":
          g.callTouchesEnd(d)
      }
    },
    x = function(a)
    {
      if (a) $("#commandDiv").on("nativeCallback", function(a, b)
      {
        b && b.alternativeIdList && f.getNativeCall(b.alternativeIdList)
      });
      else $("#commandDiv").off()
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
      id: "giftList"
    },
    {
      id: "userItemList"
    },
    {
      id: "userGiftList"
    },
    {
      id: "userStatusList"
    },
    {
      id: "userCharaList"
    },
    {
      id: "userCharaEnhancementCellList"
    },
    {
      id: "userCardList"
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
      id: "userPatrolList"
    }],
    fetch: function(b)
    {
      var c = {};
      (b = a.storage.userCardList.findWhere(
      {
        id: b
      })) ? (l = b.toJSON().card.charaNo | 0, c.charaId = String(b.toJSON().card.charaNo), n.pageModelGet(this.needModelIdObj, null, c)) : a.backLinkHandler()
    },
    init: function()
    {
      $("#commandDiv").on("nativeCallback", function(a, b)
      {
        $("#commandDiv").off();
        g.scaleEmotionBoard(50);
        F()
      });
      var b = n.getPageJson().charaEnhancementCellList,
        c = a.storage.userCharaEnhancementCellList.where(
        {
          charaId: l
        }),
        d = [];
      h.each(c, function(a)
      {
        d.push(a.toJSON())
      });
      c = {};
      c.pointList = b;
      c.openedPointList = d;
      g.pushEmotionBoard(c);
      window.isDebug && window.isBrowser && $("#commandDiv").trigger("nativeCallback")
    },
    remove: function(b)
    {
      $("#treeCharaData").off(a.cgti);
      $("#commandDiv").off();
      a.doc.getElementById("treeCharaData") && a.doc.getElementById("baseContainer").removeChild(a.doc.getElementById("treeCharaData"));
      a.doc.getElementById("richeWrap") && a.doc.getElementById("baseContainer").removeChild(a.doc.getElementById("richeWrap"));
      a.doc.getElementById("popupConfirmCurtain") && a.doc.getElementById("baseContainer").removeChild(a.doc.getElementById("popupConfirmCurtain"));
      f && (f.trigger("removeView"), f.remove());
      g.popEmotionBoard();
      r = w = q = p = l = v = null;
      b()
    }
  }
});
