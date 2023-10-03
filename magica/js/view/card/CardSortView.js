define(["underscore", "backbone", "backboneCommon", "ajaxControl", "text!template/card/CardSort.html"], function(e, h, b, k, l)
{
  var g;
  return h.View.extend(
  {
    events: function()
    {
      var a = {};
      a[b.cgti + " #filterAttList .filterAtt"] = this.typeFilter;
      a[b.cgti + " #filterRankList .filterRank"] = this.rankFilter;
      a[b.cgti + " #filterEnhanceList .filterEnhance"] = this.enhanceFilter;
      a[b.cgti + " #filterInitialList .filterInitial"] = this.initialFilter;
      a[b.cgti + " #cardSortBtnsArea .sort"] = this.reSort;
      return a
    },
    initialize: function()
    {
      g = this.cardSort;
      this.template = e.template(l);
      this.memoryHash = g.memoryHash;
      this.sortPrm = g.sortPrm.concat()
    },
    render: function()
    {
      this.$el.html(this.template(k.getPageJson()));
      return this
    },
    typeFilter: function(a)
    {
      a.preventDefault();
      if (!b.isScrolled())
      {
        var c;
        if ("ALL" == a.currentTarget.dataset.typeFilter) a.currentTarget.classList.contains("current") || (c = b.doc.getElementById("filterAttList").getElementsByClassName("filterAtt"), this.sortPrm[2] = null, e.each(c, function(a)
        {
          b.removeClass(a, "current")
        }), a.currentTarget.classList.toggle("current"));
        else if (b.removeClass(b.doc.querySelector("#filterAttList .ALL"), "current"), a.currentTarget.classList.toggle("current"), c = b.doc.getElementById("filterAttList").getElementsByClassName("current"), 0 < c.length)
        {
          a = "";
          for (var d = 0, f = c.length; d < f; d++) "" !== a && (a += ","), a += c[d].dataset.typeFilter;
          this.sortPrm[2] = a
        }
        else b.addClass(b.doc.querySelector("#filterAttList .ALL"), "current"), this.sortPrm[2] = null
      }
    },
    rankFilter: function(a)
    {
      a.preventDefault();
      if (!b.isScrolled())
      {
        var c;
        if ("ALL" == a.currentTarget.dataset.rankfilterId) a.currentTarget.classList.contains("current") || (c = b.doc.getElementById("filterRankList").getElementsByClassName("filterRank"), this.sortPrm[3] = null, e.each(c, function(a)
        {
          b.removeClass(a, "current")
        }), a.currentTarget.classList.toggle("current"));
        else if (b.removeClass(b.doc.querySelector("#filterRankList .ALL"), "current"), a.currentTarget.classList.toggle("current"), c = b.doc.getElementById("filterRankList").getElementsByClassName("current"), 0 < c.length)
        {
          a = "";
          for (var d = 0, f = c.length; d < f; d++) "" !== a && (a += ","), a += c[d].dataset.rankfilterId;
          this.sortPrm[3] = a
        }
        else b.addClass(b.doc.querySelector("#filterRankList .ALL"), "current"), this.sortPrm[3] = null
      }
    },
    enhanceFilter: function(a)
    {
      a.preventDefault();
      if (!b.isScrolled())
      {
        var c;
        "ALL" == a.currentTarget.dataset.enhancefilterId ? a.currentTarget.classList.contains("current") || (c = b.doc.getElementById("filterEnhanceList").getElementsByClassName("filterEnhance"), this.sortPrm[4] = null, e.each(c, function(a)
        {
          b.removeClass(a, "current")
        }), a.currentTarget.classList.toggle("current")) : (b.removeClass(b.doc.querySelector("#filterEnhanceList .ALL"), "current"), a.currentTarget.classList.contains("current") || b.removeClass(b.doc.querySelector("#filterEnhanceList .flexBox .current"), "current"), a.currentTarget.classList.toggle("current"), c = b.doc.getElementById("filterEnhanceList").getElementsByClassName("current"), 0 < c.length ? this.sortPrm[4] = a.currentTarget.dataset.enhancefilterId : (b.addClass(b.doc.querySelector("#filterEnhanceList .ALL"), "current"), this.sortPrm[4] = null))
      }
    },
    initialFilter: function(a)
    {
      a.preventDefault();
      if (!b.isScrolled())
      {
        var c;
        if ("ALL" == a.currentTarget.dataset.initialfilterId) a.currentTarget.classList.contains("current") || (c = b.doc.getElementById("filterInitialList").getElementsByClassName("filterInitial"), this.sortPrm[5] = null, e.each(c, function(a)
        {
          b.removeClass(a, "current")
        }), a.currentTarget.classList.toggle("current"));
        else if (b.removeClass(b.doc.querySelector("#filterInitialList .ALL"), "current"), a.currentTarget.classList.toggle("current"), c = b.doc.getElementById("filterInitialList").getElementsByClassName("current"), console.log("currents", c), 0 < c.length && 7 > c.length)
        {
          a = "";
          for (var d = 0, f = c.length; d < f; d++) "" !== a && (a += ","), a += c[d].dataset.initialfilterId;
          this.sortPrm[5] = a
        }
        else
        {
          if (6 < c.length)
            for (a = c.length; 0 < a;) a--, b.removeClass(c[a], "current");
          b.addClass(b.doc.querySelector("#filterInitialList .ALL"), "current");
          this.sortPrm[5] = null
        }
      }
    },
    reSort: function()
    {
      this.memoryHash && (b.sfml[this.memoryHash] = this.sortPrm, b.sfm());
      g.multiSort(this.sortPrm)
    }
  })
});
