define("underscore backbone backboneCommon ajaxControl memoriaUtil js/view/memoria/MemoriaComposeTopCardListPartsView memoriaSortUtil command".split(" "), function(m, n, a, p, h, g, q, r)
{
  var c, k = "rank level hp atk def lb get".split(" "),
    l = {
      rank: "レアリティ順",
      level: "レベル順",
      hp: "HP順",
      atk: "ATK順",
      def: "DEF順",
      lb: "限界突破順",
      get: "入手順"
    };
  return n.View.extend(
  {
    events: function()
    {
      var b = {};
      b[a.cgti + " #useMaterialResetBtn"] = this.materialReset;
      b[a.cgti + " #materialDecideBtn"] = this.materialDecide;
      b[a.cgti + " #sortBtn"] = this.sortStart;
      b[a.cgti + " #sortPopupMemoria"] = this.sortPopMemoria;
      b[a.cgti + " #selectCommonBtn"] = this.selectCommon;
      b[a.cgti + " #sizeChange"] = this.sizeChange;
      return b
    },
    initialize: function(b)
    {
      this.listenTo(this.rootView, "remove", this.removeView);
      this.listenTo(a.storage.userPieceList, "sort", this.orderSet);
      this.listenTo(this.rootView, "ascStartMemoria", this.ascStartMemoria);
      g.prototype.template = m.template($("#CardListParts").text());
      g.prototype.rootView = this.rootView;
      g.prototype.parentView = this;
      this.provSelectItem = [];
      this.render()
    },
    render: function()
    {
      p.getPageJson();
      var b = a.doc.createDocumentFragment();
      this.memoriaSort = c = new q("UserMemoriaList_composelist", this);
      var d = 0;
      a.storage.userPieceList.each(function(a, c)
      {
        c = a.toJSON();
        a.set("maxLevel", h.getMaxLevel(c.piece.rank, c.lbCount));
        a = new g(
        {
          model: a
        });
        b.appendChild(a.render().el);
        d++
      });
      a.doc.getElementById("cardWrap").appendChild(b);
      a.doc.getElementById("info_memoriaCount").textContent = d;
      c.multiSort(c.sortPrm);
      this.orderSet();
      a.doc.getElementById("sortBtn").textContent = l[c.getSortId()];
      a.addClass(a.doc.getElementById("cardWrap"), c.getSortId());
      a.scrollSet("scrollMain", "scrollInner");
      "lv" !== c.getSortId() && "rank" !== c.getSortId() && "lb" !== c.getSortId() && this.trigger("dispChange", c.getSortId());
      var f = a.doc.getElementById("cardWrapFrame"),
        e = a.doc.getElementById("sizeChange");
      switch (c.getDisplaySize())
      {
        case .8:
          a.addClass(f, "smaller");
          e.dataset.size = "smallest";
          a.addClass(e, "smaller");
          break;
        case .7:
          a.removeClass(f, "smaller");
          a.addClass(f, "smallest");
          e.dataset.size = "normal";
          a.removeClass(e, "smaller");
          a.addClass(e, "smallest");
          break;
        default:
          a.removeClass(f, "smallest"), e.dataset.size = "smaller", a.removeClass(e, "smallest")
      }
      this.trigger("lbCheck");
      r.getBaseData(a.getNativeObj())
    },
    afterFilterFunc: function()
    {
      this.sortBtn ? this.sortBtn = !1 : (this.trigger("afterFilter"), c.isFilterOn() ? a.doc.getElementById("sortPopupMemoria").className = "se_decide sb_gold_02 TE on" : a.doc.getElementById("sortPopupMemoria").className = "se_decide sb_gold_02 TE off", a.scrollRefresh("scrollMain", "scrollInner"))
    },
    sortStart: function(b)
    {
      b.preventDefault();
      if (!a.isScrolled())
      {
        this.sortBtn = !0;
        var d = k.indexOf(c.getSortId());
        a.removeClass(a.doc.getElementById("cardWrap"), c.getSortId());
        d = d + 1 >= k.length ? 0 : d + 1;
        c.sortPrm[0] = k[d];
        c.multiSort(c.sortPrm);
        b.currentTarget.textContent = l[k[d]];
        a.addClass(a.doc.getElementById("cardWrap"), c.getSortId());
        this.trigger("lbCheck");
        "lv" != c.getSortId() && "rank" != c.getSortId() && "lb" != c.getSortId() && this.trigger("dispChange", c.getSortId())
      }
    },
    sortPopMemoria: function(b)
    {
      b.preventDefault();
      a.isScrolled() || c.sortPopupOpen(b)
    },
    rankUpCalculator: function()
    {
      for (var a = this.rootView.targetView.model.toJSON(), d = h.getComposeExp(a.piece.rank, a.level, this.rootView.useMaterialView.proveMaterial, a), d = a.experience + d + h.exArr[a.level - 1], c = 0, e = !0; e;) d >= h.exArr[a.level + c] ? c++ : e = !1;
      return c
    },
    composeDisplayHandler: function()
    {
      var b = this.rootView.targetView.model.toJSON(),
        d = this.rankUpCalculator(),
        d = b.level + d,
        c = h.getComposeExp(b.piece.rank, b.level, this.rootView.useMaterialView.proveMaterial, b);
      a.doc.getElementById("info_getExp").innerHTML = Math.ceil(c | 0);
      c >= (a.doc.getElementById("info_needExp").textContent | 0) ? a.addClass(a.doc.getElementById("needExp").getElementsByClassName("lvUpIcon")[0], "show") : a.removeClass(a.doc.getElementById("needExp").getElementsByClassName("lvUpIcon")[0], "show");
      d >= b.maxLevel || 9 < this.rootView.useMaterialView.proveMaterial.length ? a.addClass(a.doc.getElementById("cardWrap"), "reachMaxLevel") : a.removeClass(a.doc.getElementById("cardWrap"), "reachMaxLevel");
      a.doc.getElementById("info_selectCount").textContent = this.rootView.useMaterialView.proveMaterial.length;
      a.doc.getElementById("info_needRiche").textContent = this.rootView.costRiche()
    },
    limitBreakDisplayHandler: function()
    {
      var b = this.rootView.targetView.model.toJSON(),
        c = this.rankUpCalculator(),
        f = b.level + c;
      a.doc.getElementById("limitAfterLv").textContent = f;
      0 < c ? (a.doc.getElementById("limitAfterLv").className = "c_red", a.addClass(a.doc.getElementById("getLimitBreak").getElementsByClassName("lvUpIcon")[0], "show")) : (a.doc.getElementById("limitAfterLv").className = "c_purple", a.removeClass(a.doc.getElementById("getLimitBreak").getElementsByClassName("lvUpIcon")[0], "show"));
      c = b.lbCount + this.rootView.useMaterialView.proveMaterial.length;
      4 < c && (c = 4);
      c > b.lbCount ? a.doc.getElementById("limitAfterMaxLv").className = "c_red" : a.doc.getElementById("limitAfterMaxLv").className = "c_purple";
      a.doc.getElementById("miniLbWrap").className = "thisLb" + c;
      a.doc.getElementById("limitAfterMaxLv").textContent = h.getMaxLevel(b.piece.rank, c);
      3 < c ? a.addClass(a.doc.getElementById("cardWrap"), "reachMaxLevel") : a.removeClass(a.doc.getElementById("cardWrap"), "reachMaxLevel");
      a.doc.getElementById("info_selectCount").textContent = this.rootView.useMaterialView.proveMaterial.length;
      a.doc.getElementById("info_needRiche").textContent = this.rootView.costRiche()
    },
    materialReset: function(b)
    {
      b.preventDefault();
      a.isScrolled() || (this.rootView.useMaterialView.useItemSelectReset(), this.rootView.targetView.model.toJSON(), "compose" === a.composeMode ? this.composeDisplayHandler() : "limitbreak" === a.composeMode && this.limitBreakDisplayHandler(), a.scrollRefresh("scrollMain", "scrollInner"))
    },
    materialDecide: function(b)
    {
      b.preventDefault();
      if (!a.isScrolled())
      {
        a.memoriaMaterialChange = !0;
        for (var c = [], f = this.rootView.useMaterialView.proveMaterial.length, e = !1; 0 < f;) f--, 0 < this.rootView.useMaterialView.proveMaterial[f].lbCount && (e = !0), c.push(this.rootView.useMaterialView.proveMaterial[f]);
        if (e)
        {
          var h = new a.PopupClass(
            {
              title: "limitbreak" === a.composeMode ? "限界突破" : "メモリア強化",
              content: "限界突破済のメモリアが含まれています。<br>よろしいですか？",
              closeBtnText: "閉じる",
              decideBtnText: "決定",
              popupType: "typeC"
            }, null, null, function()
            {
              $(".decideBtn").off()
            }),
            g = this;
          $(".decideBtn").on(a.cgti, function()
          {
            a.isScrolled() || ($(".decideBtn").off(), h.remove(), g.rootView.useMaterialView.selectMaterial = c, g.rootView.useMaterialView.selectCount = g.rootView.useMaterialView.selectMaterial.length, g.rootView.wrapCloseFunc(b))
          })
        }
        else this.rootView.useMaterialView.selectMaterial = c, this.rootView.useMaterialView.selectCount = this.rootView.useMaterialView.selectMaterial.length, this.rootView.wrapCloseFunc(b)
      }
    },
    selectCommon: function(b)
    {
      b.preventDefault();
      if (!a.isScrolled())
      {
        for (b = 1; 2 >= b && !a.doc.getElementById("cardWrap").classList.contains("reachMaxLevel");) this.trigger("selectCommons",
          ["RANK_" + b]), b = b + 1 | 0;
        "compose" === a.composeMode ? this.composeDisplayHandler() : "limitbreak" === a.composeMode && this.limitBreakDisplayHandler()
      }
    },
    ascStartMemoria: function(b)
    {
      b.preventDefault();
      a.isScrolled() || (c.ascSort(b.currentTarget.dataset.ascid), this.orderSet(), this.trigger("lbCheck"))
    },
    orderSet: function()
    {
      "asc" === c.getAscId() ? (a.addClass(a.doc.getElementById("descMemoria"), "none"), a.removeClass(a.doc.getElementById("ascMemoria"), "none")) : (a.addClass(a.doc.getElementById("ascMemoria"), "none"), a.removeClass(a.doc.getElementById("descMemoria"), "none"))
    },
    sizeChange: function(b)
    {
      b.preventDefault();
      if (!a.isScrolled())
      {
        var d = a.doc.getElementById("cardWrapFrame");
        switch (b.currentTarget.dataset.size)
        {
          case "smaller":
            a.addClass(d, "smaller");
            b.currentTarget.dataset.size = "smallest";
            a.addClass(b.currentTarget, "smaller");
            b = .8;
            break;
          case "smallest":
            a.removeClass(d, "smaller");
            a.addClass(d, "smallest");
            b.currentTarget.dataset.size = "normal";
            a.removeClass(b.currentTarget, "smaller");
            a.addClass(b.currentTarget, "smallest");
            b = .7;
            break;
          default:
            a.removeClass(d, "smallest"), b.currentTarget.dataset.size = "smaller", a.removeClass(b.currentTarget, "smallest"), b = 1
        }
        c.sortPrm[6] = b;
        c.saveMemory();
        a.scrollRefresh()
      }
    },
    removeView: function()
    {
      this.off();
      this.remove()
    }
  })
});
