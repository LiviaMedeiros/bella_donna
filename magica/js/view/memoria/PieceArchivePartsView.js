define("underscore backbone backboneCommon ajaxControl js/memoria/MemoriaPopup cardUtil command".split(" "), function(l, g, b, h, f, m, k)
{
  g.Model.extend();
  return g.View.extend(
  {
    tagName: "p",
    className: function()
    {
      var a = this.model.toJSON(),
        c = "userMemoriaIcon";
      a.maxLevel || this.model.set("maxLevel", this.rootView.memoriaUtil.getMaxLevel(a.piece.rank, a.lbCount));
      a.effectType || (this.model.set("effectType", this.rootView.memoriaUtil.getEffect(a)), a.effectType = this.rootView.memoriaUtil.getEffect(a));
      a.level === a.maxLevel && (c += " lvMax");
      3 < a.lbCount ? c += " lbMax" : 1 < b.storage.userPieceList.where(
      {
        pieceId: a.pieceId
      }).length && (c += " canLB");
      a.protect && (c += " protected");
      a.selectFlg && (c += " selected");
      if ("formationEquip" !== this.rootView.mode && a.equipFlag || "formationEquip" == this.rootView.mode && a.formationEquipFlag) c += " equiped";
      a.eventEffect ? c += " effective" : a.piece.pieceKind && "EVENT" === a.piece.pieceKind && (c += " overEffective");
      a.regularEventEffect && (c += " regularEffective");
      var d;
      (d = this.rootView.memoriaSort.isHideFilterType(a)) || (d = this.rootView.memoriaSort.isHideFilterEffect(a));
      d || (d = this.rootView.memoriaSort.isHideFilterLock(a));
      d || (d = this.rootView.memoriaSort.isHideFilterRank(a));
      d || (d = this.rootView.memoriaSort.isHideFilterCompose(c));
      a.selectFlg && (d = !1);
      d && (c += " hide");
      this.hideFlg = d;
      return c
    },
    events: function()
    {
      var a = {};
      a[b.cgti] = this.touchHandler;
      a.touchstart = "popupTimeStart";
      return a
    },
    initialize: function(a)
    {
      this.listenTo(this.model, "change", this.viewUpdate);
      this.listenTo(this.rootView, "allUnselect", this.unSelect);
      this.listenTo(this.rootView, "afterFilter", this.viewUpdate);
      this.listenTo(this.rootView, "dispChange", this.changeDisp);
      this.listenTo(this.rootView, "removeView", this.removeView);
      this.listenTo(this.rootView, "selectAddArr", this.selectAddArr);
      this.listenTo(this.rootView, "removeCheck", this.removeCheck);
      this.listenTo(this.rootView, "archiveChangeCheck", this.archiveChangeCheck);
      this.listenTo(this.model, "latestData", this.latestDisp);
      this.listenTo(this.rootView, "exeBulkSelect", this.selectUpdate);
      this.mode = a.mode
    },
    render: function()
    {
      this.el.innerHTML = this.rootView.memoriaPartsTemplate(
      {
        model: this.model.toJSON()
      });
      return this
    },
    viewUpdate: function()
    {
      this.el.className = this.className()
    },
    selectUpdate: function()
    {
      var a = this.model.toJSON();
      this.rootView.memoriaSort.checkBulkSelect(
      {
        pieceModel: a,
        pieceClassText: this.el.className,
        hideFlg: this.hideFlg
      }) ? this.model.set("selectFlg", !0) : this.model.set("selectFlg", !1);
      this.rootView.changeBulkCount()
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
    popupTimeStart: function(a)
    {
      var c = this,
        d = this.model.toJSON();
      d.closeEvent = function()
      {
        c.archiveChangeCheck()
      };
      f.cardDetailPopup(a, d);
      b.popModel = this.model
    },
    touchHandler: function(a)
    {
      this.rootView.memoriaSort.resetSelectPrm();
      f.popupTimerStop(a);
      if (!b.isScrolled() && !b.detailPopup)
      {
        var c = "normal" === this.rootView.mode ? this.rootView.userLimitArchive : this.rootView.userLimitHands;
        if (!(1 > c - this.rootView.selectCount) || this.model.toJSON().selectFlg)
          if (a.preventDefault(), k.startSe(1002), a = this.model.toJSON(), a.equipFlag)
          {
            var d = this,
              e = this.model.toJSON();
            e.popupType = "typeC";
            e.exClass = "sellCautionPop";
            new b.PopupClass(e, $("#formationEquipCautionPop").text(), function()
            {
              $(".sellCautionPop .decideBtn").on(b.cgti, function(a)
              {
                $(".sellCautionPop .decideBtn").off();
                new b.PopupClass(e, $("#formationEquipCautionPop2").text(), function()
                {
                  var a = {
                      userPieceId: e.id
                    },
                    c = function(a)
                    {
                      b.responseSetStorage(a);
                      d.model.set(
                      {
                        equipFlag: !1,
                        equipDeck: []
                      });
                      b.g_popup_instance.remove()
                    };
                  $(".sellCautionPop .decideBtn").on(b.cgti, function(d)
                  {
                    h.ajaxPost(b.linkList.userPieceUnequip, a, c)
                  })
                })
              })
            })
          }
        else a.selectFlg ? (this.model.unset("selectFlg"), this.rootView.selectCount--, 0 === this.rootView.selectCount && b.addClass(b.doc.getElementById("archiveBtn"), "off"), b.removeClass(b.doc.getElementById("memoriaWrap"), "reachLimit")) : (this.model.set(
        {
          selectFlg: !0
        }), this.rootView.selectCount++, b.removeClass(b.doc.getElementById("archiveBtn"), "off"), 1 > c - this.rootView.selectCount && b.addClass(b.doc.getElementById("memoriaWrap"), "reachLimit")), this.rootView.countChange(), this.el.className = this.className()
      }
    },
    selectAddArr: function(a)
    {
      this.mode === a && this.model.get("selectFlg") && b.selectMemoria.push(this.model.get("id"))
    },
    unSelect: function()
    {
      this.model.get("selectFlg") && (b.removeClass(this.el, "selected"), this.model.unset("selectFlg"))
    },
    latestDisp: function()
    {
      this.model.attributes.protect ? this.el.classList.add("protected") : this.el.classList.remove("protected");
      b.popModel = null
    },
    removeCheck: function(a)
    {
      this.mode === a && ("normal" === this.mode ? (a = b.storage.userPieceList.findWhere(
      {
        id: this.model.id
      })) || this.removeView() : ((a = b.storage.userPieceArchiveList.findWhere(
      {
        id: this.model.id
      })) || this.removeView(), a && a.hasChanged("archive") && void 0 != a._previousAttributes.archive && a.attributes.archive != a._previousAttributes.archive && this.removeView()))
    },
    archiveChangeCheck: function()
    {
      if ("archive" === this.mode)
      {
        var a = b.storage.userPieceList.findWhere(
        {
          id: this.model.id
        });
        a && a.toJSON().archive && (this.model.set("protect", a.toJSON().protect), b.storage.userPieceList.remove(a,
        {
          silent: !0
        }))
      }
    },
    removeView: function()
    {
      f.popupTimerStop();
      this.model.get("selectFlg") && this.model.unset("selectFlg",
      {
        silet: !0
      });
      this.off();
      this.remove()
    }
  })
});
