define("underscore backbone backboneCommon ajaxControl js/memoria/MemoriaPopup cardUtil command".split(" "), function(f, h, c, k, g, l, m)
{
  h.Model.extend();
  return h.View.extend(
  {
    tagName: "p",
    className: function()
    {
      var a = this.model.toJSON(),
        b = "userMemoriaIcon ";
      a.maxLevel || this.model.set("maxLevel", this.parentView.memoriaUtil.getMaxLevel(a.piece.rank, a.lbCount));
      a.effectType || (this.model.set("effectType", this.parentView.memoriaUtil.getEffect(a)), a.effectType = this.parentView.memoriaUtil.getEffect(a));
      a.level === a.maxLevel && (b += " lvMax");
      if (3 < a.lbCount) b += " lbMax";
      else
      {
        var d = this.parentView.pieceList.where(
          {
            pieceId: a.pieceId
          }),
          e = "";
        switch (a.piece.rank)
        {
          case "RANK_3":
            e = "OVER_LIMITTER";
            break;
          case "RANK_4":
            e = "OVER_LIMITTER_CORE"
        }
        e = (e = c.storage.userItemList.findWhere(
        {
          itemId: e
        })) ? e.get("quantity") : 0;
        "LIMIT_BREAK" != a.piece.pieceKind && (1 < d.length || 0 < e) && (b += " canLB")
      }
      a.protect && (b += " protected");
      a.selectFlg && (b += " selected");
      if ("formationEquip" !== this.parentView.mode && a.equipFlag || "formationEquip" == this.parentView.mode && a.formationEquipFlag) b += " equiped";
      a.eventEffect ? b += " effective" : a.piece.pieceKind && "EVENT" === a.piece.pieceKind && (b += " overEffective");
      a.regularEventEffect && (b += " regularEffective");
      "multipleProtect" == this.parentView.mode && this.multiSelect && (b += " selected");
      (d = this.parentView.memoriaSort.isHideFilterType(a)) || (d = this.parentView.memoriaSort.isHideFilterEffect(a));
      d || (d = this.parentView.memoriaSort.isHideFilterLock(a));
      d || (d = this.parentView.memoriaSort.isHideFilterRank(a));
      d || (d = this.parentView.memoriaSort.isHideFilterCompose(b));
      switch (this.parentView.mode)
      {
        case "sell":
        case "archiveSell1":
        case "archiveSell2":
        case "archiveSell3":
        case "archiveSell4":
          a.selectFlg && (d = !1);
          break;
        case "formationEquip":
        case "equip":
          this.parentView.equipedPiece && this.parentView.equipedPiece.cid == this.model.cid && (d = !1)
      }
      d && (b += " hide");
      return b
    },
    events: function()
    {
      var a = {};
      a[c.cgti] = this.touchHandler;
      a.touchstart = "popupTimeStart";
      return a
    },
    initialize: function(a)
    {
      this.listenTo(this.parentView, "removeView", this.removeView);
      this.listenTo(this.parentView, "afterFilter", this.viewUpdate);
      this.listenTo(this.parentView, "dispChange", this.changeDisp);
      this.listenTo(this.parentView, "unsetMultiSelect", this.unsetMultiSelect);
      this.listenTo(this.model, "change", this.viewUpdate);
      this.listenTo(this.model, "latestData", this.latestDisp);
      switch (this.parentView.mode)
      {
        case "equip":
        case "formationEquip":
          this.listenTo(this.parentView, "equipFirstSet", this.equipFirstSet), this.listenTo(this.parentView.pieceList, "change", this.equipAddClass), this.listenTo(this.parentView, "equipAddClass", this.equipAddClass)
      }!this.parentView.mode || -1 == this.parentView.mode.indexOf("archiveSell") && -1 == this.parentView.mode.indexOf("sell") || (this.listenTo(this.parentView, "saleUpdate", this.saleUpdate), this.listenTo(this.parentView, "selectAddArr", this.selectAddArr), this.listenTo(this.parentView, "selectReset", this.selectReset), this.listenTo(this.parentView, "selectCommons", this.selectCommons), this.listenTo(this.parentView, "salePrice", this.salePrice))
    },
    render: function()
    {
      this.el.innerHTML = this.parentView.memoriaPartsTemplate(
      {
        model: this.model.toJSON()
      });
      return this
    },
    saleUpdate: function()
    {
      if (f.findWhere(c.selectMemoria,
        {
          id: this.model.get("id")
        }))
      {
        if (f.findWhere(c.storage.userPieceArchiveList.toJSON(),
          {
            id: this.model.get("id")
          }))
        {
          var a = f.findWhere(c.storage.userPieceArchiveList.toJSON(),
          {
            id: this.model.get("id")
          });
          c.storage.userPieceArchiveList.remove(a)
        }
        a = f.findWhere(this.parentView.pieceList.toJSON(),
        {
          id: this.model.get("id")
        });
        this.parentView.pieceList.remove(a);
        c.doc.getElementById("info_memoriaCount").textContent = Number(c.doc.getElementById("info_memoriaCount").textContent) - 1;
        this.remove()
      }
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
    latestDisp: function()
    {
      this.model.attributes.protect ? this.el.classList.add("protected") : this.el.classList.remove("protected");
      this.model.attributes.selectFlg && this.model.unset("selectFlg");
      c.popModel = null
    },
    viewUpdate: function()
    {
      var a = l.memoriaEventCheck(this.model.toJSON());
      a && this.model.set(
      {
        eventEffect: a.eventEffect,
        eventDescription: a.eventDescription,
        silent: !0
      });
      switch (this.parentView.mode)
      {
        case "equip":
        case "formationEquip":
          this.model.get("id") === this.parentView.selectPieceId ? this.model.set(
          {
            selectFlg: !0
          }) : this.model.unset("selectFlg");
          this.el.className = this.className();
          this.equipAddClass();
          break;
        case "multipleProtect":
          this.el.className = this.className();
          break;
        default:
          this.el.className = this.className()
      }
    },
    equipAddClass: function()
    {
      if (this.parentView && "formationEquip" === this.parentView.mode)
      {
        var a = this,
          b = this.model.toJSON(),
          d = this.parentView;
        d.equipedPiece && d.equipedPiece.cid == this.model.cid && c.addClass(this.el, "ownEquip");
        2 == d.memoriaAbilityEquipNum && "ABILITY" == b.piece.pieceType && c.addClass(this.el, "cantEquip");
        2 == d.memoriaSkillEquipNum && "SKILL" == b.piece.pieceType && c.addClass(this.el, "cantEquip");
        if ("formationEquip" == this.parentView.mode)
        {
          b.piece.attributeId && "ALL" !== b.piece.attributeId && b.piece.attributeId !== d.equipInfo.charaAtt && c.addClass(this.el, "cantEquip");
          if (b.piece.charaList)
          {
            var e = !1;
            f.each(b.piece.charaList, function(a)
            {
              a.charaId == d.equipInfo.charaId && (e = !0)
            });
            e || c.addClass(this.el, "cantEquip")
          }
          f.each(d.hideMemoriaList, function(d)
          {
            d.pieceId == b.pieceId && d.id !== b.id && c.addClass(a.el, "hide")
          })
        }
      }
    },
    popupTimeStart: function(a)
    {
      c.popModel = this.model;
      g.cardDetailPopup(a, this.model.toJSON())
    },
    touchHandler: function(a)
    {
      g.popupTimerStop(a);
      if (!c.isScrolled() && !c.detailPopup) switch (a.preventDefault(), m.startSe(1002), this.parentView.mode)
      {
        case "sell":
        case "archiveSell":
        case "archiveSell1":
        case "archiveSell2":
        case "archiveSell3":
        case "archiveSell4":
          this.touchSellMode();
          break;
        case "formationEquip":
          this.touchEquipMode();
          break;
        case "compose":
          if (this.el.classList.contains("lvMax")) break;
          c.memoriaComposeTarget = this.model;
          location.href = "#/MemoriaCompose/" + this.parentView.mode;
          break;
        case "limitbreak":
          if (this.el.classList.contains("lbMax")) break;
          if (!this.el.classList.contains("canLB")) break;
          c.memoriaComposeTarget = this.model;
          location.href = "#/MemoriaCompose/" + this.parentView.mode;
          break;
        case "multipleProtect":
          this.multiSelect ? (this.multiSelect = !1, c.removeClass(this.el, "selected")) : (this.multiSelect = !0, c.addClass(this.el, "selected"));
          break;
        default:
          g.instantPopup(a, this.model.toJSON())
      }
    },
    selectAddArr: function()
    {
      this.model.get("selectFlg") && c.selectMemoria.push(
      {
        id: this.model.get("id")
      })
    },
    selectReset: function()
    {
      if (this.model.get("selectFlg"))
      {
        this.model.unset("selectFlg");
        c.removeClass(this.el, "selected");
        var a = this.parentView.sellModels;
        a.splice(f.findIndex(a,
        {
          pieceId: this.model.toJSON().pieceId
        }), 1)
      }
    },
    hideReset: function()
    {
      this.model.get("hideFlg") && this.model.unset("hideFlg")
    },
    touchSellMode: function()
    {
      if (!this.model.get("protect"))
        if (this.model.get("equipFlag"))
        {
          var a = this,
            b = this.model.toJSON();
          b.popupType = "typeC";
          b.exClass = "sellCautionPop";
          new c.PopupClass(b, $("#formationEquipCautionPop").text(), function()
          {
            $(".sellCautionPop .decideBtn").on(c.cgti, function(d)
            {
              $(".sellCautionPop .decideBtn").off();
              new c.PopupClass(b, $("#formationEquipCautionPop2").text(), function()
              {
                var d = {
                    userPieceId: b.id
                  },
                  e = function(b)
                  {
                    c.responseSetStorage(b);
                    a.model.set(
                    {
                      equipFlag: !1,
                      equipDeck: []
                    });
                    c.g_popup_instance.remove()
                  };
                $(".sellCautionPop .decideBtn").on(c.cgti, function(a)
                {
                  k.ajaxPost(c.linkList.userPieceUnequip, d, e)
                })
              })
            })
          })
        }
      else
      {
        var d = this.parentView.sellModels;
        this.el.classList.contains("selected") ? (this.model.unset("selectFlg"), d.splice(f.findIndex(d,
        {
          pieceId: this.model.toJSON().pieceId
        }), 1), c.scrollRefresh()) : (this.model.set(
        {
          selectFlg: !0
        }), d.push(
        {
          pieceId: this.model.toJSON().pieceId,
          rank: this.model.toJSON().piece.rank
        }))
      }
    },
    salePrice: function()
    {
      !this.model.get("selectFlg") || this.model.get("protect") || this.model.get("equipFlag") || c.salePriceArr.push(this.parentView.memoriaUtil.priceCalc(this.model.get("piece").rank, this.model.get("lbCount")))
    },
    selectCommons: function()
    {
      var a = this.model.toJSON();
      "RANK_1" !== a.piece.rank || a.selectFlg || a.protect || a.equipFlag || (this.model.set(
      {
        selectFlg: !0
      }), c.addClass(this.el, "selected"), this.parentView.sellModels.push(
      {
        pieceId: this.model.toJSON().pieceId,
        rank: this.model.toJSON().piece.rank
      }))
    },
    touchEquipMode: function()
    {
      if (!this.el.classList.contains("cantEquip"))
      {
        this.parentView.selectPieceId = this.model.toJSON().id;
        this.parentView.selectPiece && this.parentView.selectPiece.unset("selectFlg");
        this.parentView.selectPiece = this.model;
        this.model.set(
        {
          selectFlg: !0
        });
        var a = this.parentView.selectPiece ? this.parentView.selectPiece.toJSON() :
        {};
        this.parentView.equipInfoView.model.clear(
        {
          silent: !0
        });
        this.parentView.equipInfoView.model.set(a)
      }
    },
    equipFirstSet: function(a)
    {
      a === this.model.toJSON().id && this.touchEquipMode()
    },
    unsetMultiSelect: function()
    {
      this.multiSelect = null
    },
    removeView: function()
    {
      g.popupTimerStop();
      this.model.get("selectFlg") && this.model.unset("selectFlg");
      this.off();
      this.remove()
    }
  })
});
