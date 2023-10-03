define("underscore backbone backboneCommon ajaxControl command js/view/chara/CharaListPartsView text!template/chara/CharaList.html text!template/chara/CharaListParts.html sortUtil".split(" "), function(c, u, b, z, v, g, w, x, y)
{
  return u.View.extend(
  {
    id: "charaListWrap",
    events: function()
    {
      var a = {};
      a[b.cgti + " #sortPopup"] = this.sortPop;
      a[b.cgti + " #sortBtn"] = this.sortStart;
      a[b.cgti + " .orderBtn"] = this.sortOrder;
      return a
    },
    initialize: function(a)
    {
      this.listenTo(this, "remove", this.removeView);
      this.template = c.template(w);
      g.prototype.template = c.template(x);
      g.prototype.parentView = this;
      this.cardSort = new y("CharaTop_chara", this);
      this.charaViews = {};
      this.initSelectCardId = this.selectCardId = null
    },
    charaSelect: function(a, b)
    {
      a && (c.each(this.charaViews, function(c)
      {
        a == c.model.toJSON().userCardId && c.charaSelectFunc(b)
      }), this.selectCardId = a)
    },
    filterFunc: function()
    {
      if (this.cardSort)
      {
        var a = null,
          h = this.cardSort.getFilterType(),
          d = this.cardSort.getFilterRare(),
          f = this.cardSort.getFilterEnhance(),
          g = this.cardSort.getFilterInitial(),
          m = this.cardSort.getFilterComposeAttribute(),
          n = h ? h.split(",") : [],
          p = d ? d.split(",") : [],
          q = g ? g.split(",") : [],
          t = m ? m.split(",") : [],
          k = this;
        c.each(this.charaViews, function(e)
        {
          var d = !1,
            g = !1,
            h = !1,
            r = !1,
            l = !1;
          n.length ? c.each(n, function(a)
          {
            e.el.classList.contains(a) && (d = !0)
          }) : d = !0;
          p.length ? c.each(p, function(a)
          {
            e.el.classList.contains(a) && (g = !0)
          }) : g = !0;
          f ? "enable" === f && e.el.classList.contains("enhanced") ? h = !0 : "disable" !== f || e.el.classList.contains("enhanced") || (h = !0) : h = !0;
          q.length ? c.each(q, function(a)
          {
            e.el.classList.contains(a) && (r = !0)
          }) : r = !0;
          m ? c.each(t, function(a)
          {
            e.el.classList.contains(a) && (d = !0)
          }) : l = !0;
          d && g && h && r && l || e.el.classList.contains("formationRemove") || e.el.classList.contains("formationCurrent") ? (b.removeClass(e.el, "hide"), a || (a = e.model.toJSON().userCardId)) : (b.addClass(e.el, "hide"), k.selectCardId && e.model.toJSON())
        });
        n.length || p.length || f || q.length || t.length ? b.addClass(b.doc.querySelector("#sortPopup"), "filterOn") : b.removeClass(b.doc.querySelector("#sortPopup"), "filterOn");
        this.cardSort.memoryHash && (b.sfml[this.cardSort.memoryHash] = this.cardSort.sortPrm, b.sfm())
      }
      var l = 0;
      c.each(this.el.querySelectorAll(".userCharaIcon"), function(a)
      {
        a.classList.contains("hide") || l++
      });
      0 == l ? b.removeClass(b.doc.querySelector(".charaListCaution"), "hide") : b.addClass(b.doc.querySelector(".charaListCaution"), "hide");
      k = this;
      if (this.initSelectCardId) k.charaSelect(this.initSelectCardId, !0), k.initSelectCardId = null;
      else if (!this.selectCardId || this.selectCardId && this.charaViews[this.selectCardId].el.classList.contains("hide")) a = null, c.each(this.el.querySelectorAll("#charaListElms li"), function(b, c)
      {
        a || b.classList.contains("hide") || (a = b.querySelector(".prm_userCardId").textContent, k.charaSelect(a, !0))
      }), a || c.each(this.el.querySelectorAll("#charaListElms li"), function(b, c)
      {
        a || (a = b.querySelector(".prm_userCardId").textContent, k.charaSelect(a, !0))
      });
      b.scrollRefresh()
    },
    render: function()
    {
      var a = b.doc.createDocumentFragment(),
        c = this;
      this.$el.html(this.template(
      {
        model: this.model.toJSON()
      }));
      this.collection.each(function(d, f)
      {
        f = b.storage.userCharaEnhancementCellList.where(
        {
          charaId: d.get("charaId")
        });
        d.set(
        {
          enhanceCnt: f.length ? f.length - 1 : 0
        });
        f = new g(
        {
          model: d
        });
        c.charaViews[d.toJSON().userCardId] = f;
        a.appendChild(f.render("init").el)
      });
      this.el.querySelector("#charaListElms").appendChild(a);
      v.getBaseData(b.getNativeObj());
      return this
    },
    sortPop: function(a)
    {
      a.preventDefault();
      b.isScrolled() || this.cardSort.sortPopupOpen(a)
    },
    sortStart: function(a)
    {
      a.preventDefault();
      b.isScrolled() || (this.cardSort.sortPrm[0] = {
        get: "level",
        level: "rank",
        rank: "atk",
        atk: "def",
        def: "hp",
        hp: "eplv",
        eplv: "rev",
        rev: "mlv",
        mlv: "enhance",
        enhance: "composeAttribute",
        composeAttribute: "get"
      } [this.cardSort.sortPrm[0]], this.cardSort.multiSort(this.cardSort.sortPrm))
    },
    sortOrder: function(a)
    {
      a.preventDefault();
      b.isScrolled() || ("asc" === this.cardSort.getAscId() ? this.cardSort.sortPrm[1] = "desc" : this.cardSort.sortPrm[1] = "asc", this.cardSort.ascSort(this.cardSort.sortPrm[1]))
    },
    removeView: function()
    {
      this.off();
      this.remove()
    }
  })
});
