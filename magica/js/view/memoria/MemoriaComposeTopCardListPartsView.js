define("underscore backbone backboneCommon ajaxControl js/memoria/MemoriaPopup command".split(" "), function(f, k, c, l, h, m)
{
  return k.View.extend(
  {
    tagName: "p",
    className: function()
    {
      var a = this.model.toJSON(),
        b = this.rootView.targetView.model.toJSON(),
        d = "userMemoriaIcon";
      a.effectType || (this.model.set("effectType", this.parentView.memoriaUtil.getEffect(a)), a.effectType = this.parentView.memoriaUtil.getEffect(a));
      a.protect && (d += " protected");
      a.equipFlag && (d += " equiped");
      a.eventEffect && (d += " effective");
      a.regularEventEffect && (d += " regularEffective");
      var g = !1;
      0 < f.where(this.rootView.useMaterialView.proveMaterial, a).length && (d += " materialSelect", g = !0);
      a.level === a.maxLevel && (d += " lvMax");
      3 < a.lbCount && (d += " lbMax");
      var e = !1;
      b.id === a.id ? d += " select" : "limitbreak" === c.composeMode ? "LIMIT_BREAK" == a.piece.pieceKind ? b.piece && a.piece.rank !== b.piece.rank && (e = !0) : b.id !== a.id && a.pieceId !== b.pieceId && (e = !0) : (b.id !== a.id && a.pieceId === b.pieceId && (e = !0), "LIMIT_BREAK" == a.piece.pieceKind && (e = !0), !e && this.parentView.memoriaSort && ((e = this.parentView.memoriaSort.isHideFilterType(a)) || (e = this.parentView.memoriaSort.isHideFilterEffect(a)), e || g || (e = this.parentView.memoriaSort.isHideFilterLock(a)), e || (e = this.parentView.memoriaSort.isHideFilterRank(a)), e || (e = this.parentView.memoriaSort.isHideFilterCompose(d))));
      e && (d += " hide");
      return d
    },
    events: function()
    {
      var a = {};
      a[c.cgti] = this.cardSelect;
      a.touchstart = "popupTimeStart";
      return a
    },
    initialize: function()
    {
      this.listenTo(this.rootView, "remove", this.removeView);
      this.listenTo(this.rootView, "proveReset", this.proveReset);
      this.listenTo(this.parentView, "lbCheck", this.lbCheck);
      this.listenTo(this.rootView, "deleteCheck", this.deleteCheck);
      this.listenTo(this.rootView, "baseUpdate", this.baseUpdate);
      this.listenTo(this.parentView, "afterFilter", this.afterFilter);
      this.listenTo(this.parentView, "dispChange", this.changeDisp);
      this.listenTo(this.model, "change", this.checkChange);
      this.listenTo(this.parentView, "selectCommons", this.selectCommon);
      if (c.memoriaComposeTarget && c.memoriaComposeTarget.id === this.model.toJSON().id)
      {
        this.targetModelSet();
        var a = this.parentView.memoriaUtil.getNextExp(this.model.toJSON().experience, this.model.toJSON().level);
        c.doc.getElementById("info_needExp").textContent = a
      }
    },
    render: function()
    {
      var a = this.model.toJSON();
      a.protect && this.el.classList.contains("materialSelect") && this.materialModelSet();
      this.$el.html(this.template(
      {
        model: a
      }));
      return this
    },
    afterFilter: function()
    {
      this.el.className = this.className()
    },
    checkChange: function()
    {
      var a = this.model.toJSON();
      if (a.protect)
      {
        if (this.el.classList.contains("materialSelect"))
        {
          this.materialModelSet();
          var b = this.rootView.useMaterialView;
          b.selectMaterial.splice(f.indexOf(f.map(b.selectMaterial, "id"), a.id), 1)
        }
        c.addClass(this.el, "protected")
      }
      else this.el.className = this.className()
    },
    lbCheck: function()
    {
      if (!this.el.classList.contains("select"))
      {
        var a = !1,
          b = this.model.toJSON(),
          d = this.rootView.targetView.model.toJSON();
        b.pieceId === d.pieceId && (a = !0);
        "LIMIT_BREAK" == b.piece.pieceKind && b.piece.rank == d.piece.rank && (a = !0);
        a && c.addClass(this.el, "canLimitBreak")
      }
    },
    selectCommon: function(a)
    {
      var b = this.model.toJSON();
      b.piece.rank !== a[0] || b.piece.pieceKind && ("REINFORCEMENT" === b.piece.pieceKind || "LIMIT_BREAK" === b.piece.pieceKind) || this.el.classList.contains("hide") || this.el.classList.contains("select") || this.el.classList.contains("protected") || this.el.classList.contains("equiped") || this.el.classList.contains("materialSelect") || this.materialModelSet()
    },
    deleteCheck: function(a)
    {
      void 0 !== f.findWhere(a,
      {
        id: this.model.toJSON().id
      }) && this.removeView()
    },
    changeDisp: function(a)
    {
      var b = "";
      switch (a)
      {
        case "hp":
          b = "HP " + this.model.get("hp");
          break;
        case "atk":
          b = "ATK " + this.model.get("attack");
          break;
        case "def":
          b = "DEF " + this.model.get("defense");
          break;
        case "get":
          b = this.model.get("createdAt").substr(2, 8)
      }
      this.el.getElementsByClassName("dispPrm")[0].textContent = b
    },
    baseUpdate: function(a)
    {
      a.id === this.model.toJSON().id && (this.model.set(
      {
        maxLevel: this.parentView.memoriaUtil.getMaxLevel(this.model.toJSON().piece.rank, this.model.toJSON().lbCount)
      }), this.render())
    },
    popupTimeStart: function(a)
    {
      h.cardDetailPopup(a, this.model.toJSON())
    },
    cardSelect: function(a)
    {
      a.preventDefault();
      h.popupTimerStop(a);
      if (!c.isScrolled() && !c.detailPopup)
      {
        var b = this;
        if ("material" !== this.rootView.setViewFlag) this.el.classList.contains("materialSelect") || (c.ready.show(), c.memoriaComposeTarget = this.model, setTimeout(function()
        {
          b.targetModelSet();
          c.doc.querySelector("#cardListWrap").style.display = "none";
          c.doc.getElementById("runBtn").style.display = "block";
          c.ready.hide()
        }, 200));
        else if (!this.el.classList.contains("select") && !this.el.classList.contains("protected"))
          if (this.model.get("equipFlag"))
          {
            var d = this.model.toJSON();
            d.popupType = "typeC";
            d.exClass = "composeCautionPop";
            new c.PopupClass(d, $("#formationEquipCautionPop").text(), function()
            {
              $(".composeCautionPop .decideBtn").on(c.cgti, function(a)
              {
                $(".composeCautionPop .decideBtn").off();
                console.log(d);
                new c.PopupClass(d, $("#formationEquipCautionPop2").text(), function()
                {
                  var a = {
                      userPieceId: d.id
                    },
                    g = function(a)
                    {
                      c.responseSetStorage(a);
                      b.model.set(
                      {
                        equipFlag: !1,
                        equipDeck: []
                      });
                      c.g_popup_instance.remove()
                    };
                  $(".composeCautionPop .decideBtn").on(c.cgti, function(b)
                  {
                    l.ajaxPost(c.linkList.userPieceUnequip, a, g)
                  })
                })
              })
            })
          }
        else
        {
          if ("limitbreak" === c.composeMode)
            if ("LIMIT_BREAK" == this.model.toJSON().piece.pieceKind)
            {
              if (this.model.toJSON().piece.rank != this.rootView.targetView.model.toJSON().piece.rank) return
            }
          else if (this.rootView.targetView.model.toJSON().id !== this.model.toJSON().id && this.model.toJSON().pieceId !== this.rootView.targetView.model.toJSON().pieceId) return;
          m.startSe(1002);
          this.materialModelSet()
        }
      }
    },
    targetModelSet: function()
    {
      var a = this.model.toJSON(),
        b = this.rootView.targetView,
        d = this.rootView.statusView,
        g = this.rootView.useMaterialView,
        e = this.rootView.useItemView,
        f = c.doc.querySelector("#cardWrap .select");
      f && c.removeClass(f, "select");
      a.id == b.model.toJSON().id ? (b.model.clear(), d.model.clear(), d.el.style.display = "block", g.el.style.display = "block", 0 < g.selectMaterial.length && (g.useItemViewReset(), g.useItemSelectReset())) : (c.addClass(this.el, "select"), b.model.set(a), d.model.set(a), d.el.style.display = "block", g.el.style.display = "block", e.trigger("checkController"))
    },
    materialModelSet: function()
    {
      var a = this.model.toJSON(),
        b = this.rootView.useMaterialView;
      if (this.el.classList.contains("materialSelect")) b.proveMaterial.splice(f.indexOf(f.map(b.proveMaterial, "id"), a.id), 1), this.el.className = this.className(), c.removeClass(c.doc.getElementById("cardWrap"), "reachMaxLevel"), c.scrollRefresh("scrollMain", "scrollInner");
      else
      {
        if (9 < b.proveMaterial.length || c.doc.getElementById("cardWrap").classList.contains("reachMaxLevel") || "limitbreak" === c.composeMode && 3 < b.proveMaterial.length) return;
        b.proveMaterial.push(a);
        c.addClass(this.el, "materialSelect")
      }
      "compose" === c.composeMode ? this.parentView.composeDisplayHandler() : "limitbreak" === c.composeMode && this.parentView.limitBreakDisplayHandler()
    },
    proveReset: function()
    {
      if (!this.el.classList.contains("select") && !this.el.classList.contains("protected"))
      {
        var a = this.model.toJSON();
        0 < f.where(this.rootView.useMaterialView.selectMaterial, a).length ? c.addClass(this.el, "materialSelect") : c.removeClass(this.el, "materialSelect")
      }
    },
    removeView: function()
    {
      this.off();
      this.remove()
    }
  })
});
