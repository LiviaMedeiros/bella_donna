define(["underscore", "backbone", "backboneCommon", "ajaxControl", "text!template/memoria/bulkSelectPopupView.html"], function(g, h, c, k, l)
{
  return h.View.extend(
  {
    events: function()
    {
      var a = {};
      a[c.cgti + " .filterBtn"] = this.filterBtn;
      a[c.cgti + " #cardSortBtnsArea .sort"] = this.reSort;
      return a
    },
    initialize: function(a)
    {
      this.rootView = a.rootView;
      this.template = g.template(l);
      this.rootView.memoriaSort.setDefaultSelectPrm();
      this.selectPrm = this.rootView.memoriaSort.selectPrm
    },
    render: function()
    {
      this.$el.html(this.template(k.getPageJson()));
      return this
    },
    checkBoxFilter: function(a, b, e)
    {
      var d = b.getElementsByClassName("current");
      if (a.classList.contains("ALL"))
      {
        if (!a.classList.contains("current"))
        {
          for (b = d.length; 0 < b;) b = b - 1 | 0, c.removeClass(d[b], "current");
          c.addClass(a, "current");
          this.selectPrm[e] = "ALL"
        }
      }
      else if (c.removeClass(b.getElementsByClassName("ALL")[0], "current"), a.classList.toggle("current"), 0 < d.length)
      {
        a = "";
        b = 0;
        for (var f = d.length; b < f; b++) "" !== a && (a += ","), a += d[b].dataset.filter;
        this.selectPrm[e] = a
      }
      else c.addClass(b.getElementsByClassName("ALL")[0], "current"), this.selectPrm[e] = null
    },
    checkBoxFilter2: function(a, b, e)
    {
      if (a.classList.contains("ALL"))
      {
        if (!a.classList.contains("current"))
        {
          for (var d = b.getElementsByClassName("current"), f = d.length; 0 < f;) f = f - 1 | 0, c.removeClass(d[f], "current");
          c.addClass(a, "current");
          this.selectPrm[e] = "ALL"
        }
      }
      else if (a.classList.toggle("current"), d = b.getElementsByClassName("flexBox")[0], a = d.getElementsByClassName("filterBtn"), d = d.getElementsByClassName("current"), f = d.length, a.length == f)
      {
        for (; 0 < f;) f = f - 1 | 0, c.removeClass(d[f], "current");
        c.addClass(b.getElementsByClassName("ALL")[0], "current");
        this.selectPrm[e] = null
      }
      else if (c.removeClass(b.getElementsByClassName("ALL")[0], "current"), 0 < d.length)
      {
        b = "";
        a = 0;
        for (f = d.length; a < f; a++) "" !== b && (b += ","), b += d[a].dataset.filter;
        this.selectPrm[e] = b
      }
      else c.addClass(b.getElementsByClassName("ALL")[0], "current"), this.selectPrm[e] = null
    },
    radioFilter: function(a, b, e)
    {
      a.classList.contains("current") ? "ALL" !== a.dataset.filter && (c.removeClass(a, "current"), c.addClass(b.getElementsByClassName("ALL")[0], "current"), this.selectPrm[e] = null) : (c.removeClass(b.getElementsByClassName("current")[0], "current"), c.addClass(a, "current"), this.selectPrm[e] = "ALL" === a.dataset.filter ? "ALL" : a.dataset.filter)
    },
    filterBtn: function(a)
    {
      a.preventDefault();
      if (!c.isScrolled())
      {
        var b = a.currentTarget.parentNode.parentNode,
          e = parseInt(b.dataset.sortid);
        "check" == b.dataset.btntype ? this.checkBoxFilter(a.currentTarget, b, e) : "check2" == b.dataset.btntype ? this.checkBoxFilter2(a.currentTarget, b, e) : this.radioFilter(a.currentTarget, b, e)
      }
    },
    reSort: function(a)
    {
      a.preventDefault();
      c.isScrolled() || this.rootView.trigger("exeBulkSelect")
    },
    removeView: function()
    {
      this.rootView.memoriaSort.resetSelectPrm();
      this.off();
      this.remove()
    }
  })
});
