define(["underscore", "backbone", "backboneCommon", "ajaxControl", "command"], function(e, f, b, g, h)
{
  g = f.View.extend(
  {
    initialize: function()
    {
      this.listenTo(this.rootView, "remove", this.removeView);
      this.crateView()
    },
    render: function() {},
    crateView: function()
    {
      var a;
      a = "compose" === b.composeMode ? ["MEMORIA_CIRCUIT", "MEMORIA_CIRCUIT_CORE"] : ["OVER_LIMITTER", "OVER_LIMITTER_CORE"];
      var c = b.doc.createDocumentFragment();
      d.prototype.rootView = this;
      d.prototype.template = e.template($("#composeItemParts").text());
      e.each(a, function(a)
      {
        a = new d(a);
        c.appendChild(a.render().el)
      });
      this.el.appendChild(c)
    },
    selectItemUpdate: function()
    {
      this.rootView.statusView.afterStatusUpdate()
    },
    useItemSelectReset: function()
    {
      this.rootView.useMaterialView.selectMaterial = [];
      this.rootView.targetView.model.toJSON().id && this.rootView.statusView.afterStatusUpdate();
      b.doc.querySelector("#costRiche .riche").textContent = 0;
      this.trigger("reset")
    },
    removeView: function()
    {
      this.off();
      this.remove()
    }
  });
  var d = f.View.extend(
  {
    className: "item",
    events: function()
    {
      var a = {};
      a[b.cgti + " .minusBtn"] = this.itemSetFunc;
      a[b.cgti + " .plusBtn"] = this.itemSetFunc;
      a[b.cgti + " .maxBtn"] = this.itemSetFunc;
      return a
    },
    initialize: function(a)
    {
      this.canUseItemNum = this.selectNum = 0;
      this.itemId = a;
      this.itemType = null;
      this.listenTo(this.rootView, "checkController", this.checkController);
      this.listenTo(this.rootView, "reset", this.itemNumReset);
      this.listenTo(b.storage.userItemList, "change", this.itemChangeHandler);
      this.listenTo(this.rootView.rootView, "remove", this.removeView);
      (a = b.storage.userItemList.findWhere(
      {
        itemId: this.itemId
      })) ? (this.model = a.toJSON(), this.pieceModel = this.rootView.memoriaUtil.getPieceModeFromItemModel(this.model), this.exp = this.rootView.memoriaUtil.getComposeExp(this.pieceModel.piece.rank, this.pieceModel.level, [this.pieceModel], this.pieceModel)) : this.model = {
        itemId: this.itemId,
        quantity: 0
      }
    },
    render: function()
    {
      this.$el.html(this.template(this.model));
      return this
    },
    checkController: function()
    {
      if (this.pieceModel)
      {
        var a = this.rootView.rootView.targetView.model.toJSON();
        if (a.id)
        {
          var c = !1;
          if ("compose" === b.composeMode) a.level >= a.maxLevel && (c = !0);
          else if (4 <= a.lbCount || a.piece.rank !== this.pieceModel.rank) c = !0;
          c ? (b.addClass(this.el.querySelector(".minusBtn"), "off"), b.addClass(this.el.querySelector(".plusBtn"), "off"), b.addClass(this.el.querySelector(".maxBtn"), "off")) : ("compose" === b.composeMode ? (c = this.rootView.memoriaUtil.getComposeExp(a.piece.rank, a.level, this.rootView.rootView.useMaterialView.selectMaterial, a), a = Math.ceil((this.rootView.memoriaUtil.exArr[a.maxLevel - 1] - (a.experience + c + this.rootView.memoriaUtil.exArr[a.level - 1])) / this.exp) + this.selectNum) : a = 4 - a.lbCount, c = this.model.quantity, this.canUseItemNum = c < a ? c : a, 0 < this.selectNum ? b.removeClass(this.el.querySelector(".minusBtn"), "off") : b.addClass(this.el.querySelector(".minusBtn"), "off"), this.selectNum >= this.canUseItemNum ? (b.addClass(this.el.querySelector(".plusBtn"), "off"), b.addClass(this.el.querySelector(".maxBtn"), "off")) : (b.removeClass(this.el.querySelector(".plusBtn"), "off"), b.removeClass(this.el.querySelector(".maxBtn"), "off")))
        }
      }
    },
    itemSetFunc: function(a)
    {
      a.preventDefault();
      if (!b.isScrolled() && !a.currentTarget.classList.contains("off"))
      {
        switch (a.currentTarget.dataset.type)
        {
          case "plus":
            this.itemSelectFunc(1);
            break;
          case "minus":
            this.itemSelectFunc(-1);
            break;
          case "max":
            this.itemSelectFunc(this.canUseItemNum - this.selectNum)
        }
        this.el.getElementsByClassName("selectNum")[0].innerText = this.selectNum;
        this.rootView.trigger("checkController")
      }
    },
    itemSelectFunc: function(a)
    {
      if (this.rootView.rootView.targetView.model.toJSON().id)
      {
        this.selectNum += a;
        if (0 <= a)
          for (var c = 0; c < a;) this.rootView.rootView.useMaterialView.selectMaterial.push(this.pieceModel),
            c = c + 1 | 0;
        else
        {
          a *= -1;
          for (var d = 0, c = 0; d < a;) this.rootView.rootView.useMaterialView.selectMaterial[c].itemId === this.pieceModel.itemId && (this.rootView.rootView.useMaterialView.selectMaterial.splice(c, 1), d = d + 1 | 0), c = c + 1 | 0
        }
        this.rootView.selectItemUpdate();
        this.itemNumDispUpdate();
        this.rootView.rootView.costRicheUpdate(!0)
      }
      else new b.PopupClass(
      {
        title: "強化確認",
        content: "先に強化対象を選択してください。",
        closeBtnText: "閉じる"
      })
    },
    itemChangeHandler: function()
    {
      var a = b.storage.userItemList.findWhere(
      {
        itemId: this.itemId
      });
      a && (this.model = a.toJSON(), this.el.getElementsByClassName("maxNum")[0].innerText = this.model.quantity | 0)
    },
    itemNumReset: function()
    {
      this.selectNum = 0;
      var a = this.el.getElementsByClassName("selectNum")[0];
      a && (a.innerText = "0");
      this.checkController()
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
  });
  return g
});
