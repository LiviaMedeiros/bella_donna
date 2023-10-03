define("underscore backbone backboneCommon ajaxControl memoriaUtil command text!template/memoria/MemoriaComposeTop.html js/view/memoria/MemoriaComposeTopCardListView js/view/memoria/MemoriaComposeTopStatusView js/view/memoria/MemoriaComposeTopTargetView js/view/memoria/MemoriaComposeTopUseItemView js/view/memoria/MemoriaComposeTopUseMaterialView".split(" "), function(g, k, a, p, e, l, z, q, u, v, r, t)
{
  var m = !1,
    w = k.Model.extend(),
    A = k.View.extend(
    {
      events: function()
      {
        var b = {};
        b[a.cgti + " #itemTab li"] = this.tabFunc;
        b[a.cgti + " #runBtn"] = this.composeRunFunc;
        b[a.cgti + " .wrapClose"] = this.wrapCloseFunc;
        b[a.cgti + " #ascPanelMemoria li"] = this.ascBtn;
        return b
      },
      initialize: function()
      {
        this.listenTo(this, "remove", this.removeView);
        this.template = g.template(z);
        m = !1;
        this.currentTab = "memoria";
        this.tapCount = 0;
        this.createDom()
      },
      render: function()
      {
        var b = p.getPageJson();
        b.composeMode = a.composeMode + "Mode";
        this.$el.html(this.template(b));
        return this
      },
      createDom: function()
      {
        a.content.append(this.render().el);
        this.createView()
      },
      createView: function()
      {
        x.prototype.rootView = this;
        new x;
        y.prototype.rootView = this;
        new y;
        this.setViewFlag = "none";
        this.composeArray = {};
        v.prototype.rootView = this;
        u.prototype.rootView = this;
        q.prototype.rootView = this;
        q.prototype.memoriaUtil = e;
        t.prototype.rootView = this;
        t.prototype.memoriaUtil = e;
        r.prototype.rootView = this;
        r.prototype.memoriaUtil = e;
        this.targetView = new v(
        {
          model: new w,
          el: a.doc.getElementById("targetCard")
        });
        this.statusView = new u(
        {
          model: new w,
          el: a.doc.getElementById("statusWrap")
        });
        this.useMaterialView = new t(
        {
          el: a.doc.getElementById("useItem")
        });
        this.useItemView = new r(
        {
          el: a.doc.getElementById("useItem2")
        });
        this.cardListView = new q(
        {
          el: a.doc.getElementById("cardListWrap")
        });
        "compose" === a.composeMode && this.targetView.model.toJSON().level === this.targetView.model.toJSON().maxLevel && a.backLinkHandler();
        "limitbreak" === a.composeMode && 3 < this.targetView.model.toJSON().lbCount && a.backLinkHandler();
        a.setGlobalView();
        l.getBaseData(a.getNativeObj());
        a.ready.hide();
        a.addClass(a.doc.getElementById("memoriaComposeGlowArea"), "fadeIn")
      },
      tabFunc: function(b)
      {
        if (!b.currentTarget.classList.contains("current") && (b.preventDefault(), !a.isScrolled()))
        {
          b = b.currentTarget.dataset.type;
          var c = a.doc.getElementById("itemTab").getElementsByTagName("li"),
            d = a.doc.getElementsByClassName("useItemWrap");
          this.useMaterialView.useItemSelectReset();
          this.useItemView.useItemSelectReset();
          this.useItemView.trigger("checkController");
          for (var f = 0, g = c.length; f < g;) c[f].dataset.type == b ? (a.addClass(c[f], "current"), a.addClass(d[f], "current")) : (a.removeClass(c[f], "current"), a.removeClass(d[f], "current")), f = f + 1 | 0;
          this.currentTab = b
        }
      },
      wrapCloseFunc: function(b)
      {
        b.preventDefault();
        if (!a.isScrolled())
        {
          var c = b.currentTarget.getAttribute("data-wrap-id");
          c && (a.ready.show(), "material" == this.setViewFlag ? (a.memoriaMaterialChange ? (this.useMaterialView.selectItemUpdate(), a.memoriaMaterialChange = !1) : (this.trigger("proveReset"), a.scrollRefresh("scrollMain", "scrollInner"), this.useMaterialView.proveMaterial = []), "limitbreak" === a.composeMode ? (4 > this.useMaterialView.selectMaterial.length && a.removeClass(a.doc.getElementById("cardWrap"), "reachMaxLevel"), this.cardListView.limitBreakDisplayHandler()) : this.cardListView.composeDisplayHandler(), this.costRicheUpdate("backFlg")) : 0 < this.useMaterialView.selectMaterial.length && this.costRicheUpdate("backFlg"), setTimeout(function()
          {
            a.doc.getElementById("globalBackBtn").getAttribute("data-noLink") && (a.doc.getElementById("globalBackBtn").removeAttribute("data-noLink"), a.doc.getElementById("globalBackBtn").removeAttribute("data-wrap-id"));
            a.removeClass(a.doc.getElementById("cardListWrap"), "material");
            a.doc.getElementById("mainWrap").style.display = "block";
            a.doc.getElementById(c).style.display = "none";
            a.ready.hide();
            a.addClass(a.doc.getElementById("memoriaComposeGlowArea"), "fadeIn");
            a.removeClass(a.doc.getElementById("memoriaComposeGlowArea"), "off")
          }, 200));
          this.setViewFlag = "none"
        }
      },
      costRiche: function()
      {
        var a = this.useMaterialView.proveMaterial.length;
        if (0 === a) return 0;
        var c = this.targetView.model.toJSON(),
          d = c.level,
          c = e.getComposeFactor(c.piece.rank);
        return Math.floor((49 + 1 * d) * c) * a
      },
      costRicheUpdate: function(b)
      {
        var c = this.targetView.model.toJSON(),
          d = c.level;
        e.getComposeFactor(c.piece.rank);
        b = b ? this.useMaterialView.selectMaterial.length : this.useMaterialView.selectCount;
        c = e.getComposeFactor(c.piece.rank);
        d = Math.floor((49 + 1 * d) * c) * b;
        a.doc.querySelector("#costRiche .riche").textContent = d
      },
      composeRunFunc: function()
      {
        p.getPageJson();
        var b = "memoria" !== this.currentTab,
          c = "compose" === a.composeMode ? "強化" : "限界突破",
          d = "メモリア" + c;
        if (this.targetView.model.toJSON().id)
          if (this.useMaterialView.selectMaterial.length)
          {
            var f = a.storage.gameUser.toJSON().riche;
            if (parseInt(a.doc.querySelector("#costRiche .riche").textContent, 10) > f) new a.PopupClass(
            {
              title: d,
              content: "カースチップが不足しています。",
              closeBtnText: "閉じる",
              exClass: "memoriaConfirmPop"
            });
            else
            {
              a.storage.composeTarget = this.targetView.model.toJSON();
              this.composeArray.baseUserPieceId = a.storage.composeTarget.id;
              var e = this,
                h = [];
              if (b)
              {
                var n = {};
                this.useMaterialView.selectMaterial.some(function(a)
                {
                  n[a.itemId] ? n[a.itemId]++ : n[a.itemId] = 1
                });
                Object.keys(n).forEach(function(a)
                {
                  h.push(
                  {
                    itemId: a,
                    num: n[a]
                  })
                });
                this.composeArray.useItem = n
              }
              else
              {
                var k = [];
                this.useMaterialView.selectMaterial.some(function(a)
                {
                  h.push(
                  {
                    pieceId: a.pieceId,
                    rank: a.piece.rank
                  });
                  k.push(a.id)
                });
                this.composeArray.materialUserPieceIdList = k
              }
              var f = g.template($("#ComposeDecidePopup").text()),
                m = !1;
              "compose" === a.composeMode && (h = g.sortBy(h, "rank").reverse(), g.findWhere(h,
              {
                rank: "RANK_3"
              }) || g.findWhere(h,
              {
                rank: "RANK_4"
              }) || g.findWhere(h,
              {
                rank: "RANK_5"
              })) && (m = !0);
              b = f(
              {
                rarityAlert: m,
                dispArr: h,
                mode: a.composeMode,
                text: c,
                isItem: b
              });
              new a.PopupClass(
              {
                title: d,
                exClass: "memoriaConfirmPop"
              }, b, null, function()
              {
                $("#composeRunDecideBtn").off(a.cgti);
                a.removeClass(a.doc.getElementById("memoriaComposePopupCurtain"), "on");
                a.removeClass(a.doc.getElementById("memoriaComposeGlowArea"), "on")
              });
              l.getBaseData(a.getNativeObj());
              a.removeClass(a.doc.getElementById("popupCurtain"), "show");
              a.addClass(a.doc.getElementById("memoriaComposePopupCurtain"), "on");
              a.addClass(a.doc.getElementById("memoriaComposeGlowArea"), "on");
              $("#composeRunDecideBtn").on(a.cgti, function(b)
              {
                b.preventDefault();
                a.isScrolled() || 0 < e.tapCount || (e.tapCount++, a.tapBlock(!0), $("#composeRunDecideBtn").off(a.cgti), e.composeRunAccept())
              })
            }
          }
        else new a.PopupClass(
        {
          title: d,
          content: "素材が選択されていません",
          closeBtnText: "閉じる",
          exClass: "memoriaConfirmPop"
        });
        else new a.PopupClass(
        {
          title: d,
          content: "対象が選択されていません",
          closeBtnText: "閉じる",
          exClass: "memoriaConfirmPop"
        })
      },
      composeRunAccept: function()
      {
        a.androidKeyStop = !0;
        if (!m)
        {
          m = !0;
          var b = this;
          p.ajaxPost(a.linkList.userPieceCompose, this.composeArray, function(c)
          {
            l.setWebView(!1);
            a.tapBlock(!1);
            a.responseSetStorage(c);
            b.trigger("deleteCheck", b.useMaterialView.selectMaterial);
            g.each(b.useMaterialView.selectMaterial, function(b, c)
            {
              b = a.storage.userPieceList.findWhere(
              {
                id: b.id
              });
              a.storage.userPieceList.remove(b)
            });
            $("#commandDiv").on("nativeCallback", function(b, c)
            {
              $("#commandDiv").off();
              l.setWebView();
              l.startBgm(a.bgm);
              setTimeout(function()
              {
                a.androidKeyStop = !1
              }, 300)
            });
            a.g_popup_instance && a.g_popup_instance.popupView.close();
            l.startMemoriaAnimation(
            {
              memoria: c.memoria
            });
            b.afterComposeHandler();
            b.tapCount = 0;
            a.removeClass(a.doc.getElementById("memoriaComposePopupCurtain"), "on");
            a.removeClass(a.doc.getElementById("memoriaComposeGlowArea"), "fadeIn");
            b.composeArray = {};
            window.isBrowser && (a.androidKeyStop = !1)
          })
        }
      },
      afterComposeHandler: function()
      {
        var b = this.targetView,
          c = this.statusView,
          d = a.storage.userPieceList.findWhere(
          {
            id: b.model.id
          });
        d.set("maxLevel", e.getMaxLevel(d.toJSON().piece.rank, d.toJSON().lbCount));
        b.model.clear();
        b.model.set(d.toJSON());
        c.model.set(d.toJSON());
        c = e.getNextExp(d.toJSON().experience, d.toJSON().level);
        a.doc.getElementById("info_needExp").textContent = c;
        this.trigger("baseUpdate", a.storage.userPieceList.findWhere(
        {
          id: b.model.id
        }));
        a.memoriaComposeTarget = a.storage.userPieceList.findWhere(
        {
          id: b.model.id
        });
        this.useMaterialView.useItemSelectReset();
        this.useItemView.useItemSelectReset();
        b = a.storage.gameUser.toJSON();
        a.doc.getElementById("info_hasRicheTop").textContent = b.riche;
        a.doc.getElementById("info_hasRiche").textContent = b.riche;
        a.doc.getElementById("info_memoriaCount").textContent = a.storage.userPieceList.length;
        a.removeClass(a.doc.getElementById("needExp").getElementsByClassName("lvUpIcon")[0], "show");
        a.removeClass(a.doc.getElementById("getLimitBreak").getElementsByClassName("lvUpIcon")[0], "show");
        this.trigger("proveReset");
        this.useMaterialView.proveMaterial = [];
        l.getBaseData(a.getNativeObj());
        a.scrollRefresh(null, null, !0);
        m = !1
      },
      ascBtn: function(b)
      {
        b.preventDefault();
        a.isScrolled() || this.trigger("ascStartMemoria", b)
      },
      removeView: function()
      {
        this.trigger("removeView");
        this.off();
        this.remove()
      }
    }),
    y = k.View.extend(
    {
      id: "memoriaComposeGlowArea",
      initialize: function()
      {
        this.listenTo(this.rootView, "removeView", this.removeView);
        this.template = g.template($("#glowTemplate").text());
        this.createDom()
      },
      render: function()
      {
        this.$el.html(this.template(
        {
          gameUser: a.storage.gameUser.toJSON()
        }));
        return this
      },
      createDom: function()
      {
        a.doc.getElementById("baseContainer").appendChild(this.render().el)
      },
      removeView: function()
      {
        this.off();
        this.remove()
      }
    }),
    x = k.View.extend(
    {
      id: "memoriaComposePopupCurtain",
      initialize: function()
      {
        this.listenTo(this.rootView, "removeView", this.removeView);
        this.createDom()
      },
      render: function()
      {
        this.$el.html();
        return this
      },
      createDom: function()
      {
        a.doc.getElementById("baseContainer").appendChild(this.render().el)
      },
      removeView: function()
      {
        this.off();
        this.remove()
      }
    });
  return A
});
