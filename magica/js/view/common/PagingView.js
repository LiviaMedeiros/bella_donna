define(["underscore", "backbone", "backboneCommon", "ajaxControl", "command"], function(l, k, e, m, n)
{
  return k.View.extend(
  {
    tagName: "ul",
    className: "paging",
    events: function()
    {
      var a = {};
      a[e.cgti + " li"] = this.paging;
      return a
    },
    initialize: function(a)
    {
      this.listenTo(this.model, "change", this.modelchange);
      this.pageNum = this.model.toJSON().firstPage ? this.model.toJSON().firstPage : 1;
      this.maxPageNum = Math.ceil(this.model.toJSON().count / this.model.toJSON().pageLimit);
      a.another ? e.doc.getElementById(a.another).appendChild(this.render().el) : e.doc.getElementById("pagingWrap").appendChild(this.render().el)
    },
    modelchange: function()
    {
      this.maxPageNum = Math.ceil(this.model.toJSON().count / this.model.toJSON().pageLimit);
      this.$el.html(this.createPageBtn())
    },
    render: function()
    {
      var a = this.createPageBtn();
      this.$el.html(a);
      return this
    },
    createPageBtn: function()
    {
      var a = 0,
        d = 5 < this.maxPageNum ? 5 : this.maxPageNum,
        f = e.doc.createDocumentFragment();
      if (1 < this.maxPageNum)
      {
        var b = document.createElement("li"),
          c = document.createElement("li");
        b.className = "prevBtn se_decide off";
        c.className = "nextBtn se_decide";
        b.setAttribute("data-id", "prev");
        c.setAttribute("data-id", "next");
        f.appendChild(b);
        f.appendChild(c)
      }
      for (; a < d;) b = a + 1, c = document.createElement("li"), c.textContent = b, c.setAttribute("data-id", b), c.className = b == this.pageNum ? "pagingNumber se_decide page" + b + " current" : "pagingNumber se_decide page" + b, f.appendChild(c), a = a + 1 | 0;
      return f
    },
    paging: function(a)
    {
      a.preventDefault();
      if (!e.isScrolled())
      {
        a = a.currentTarget.getAttribute("data-id");
        var d = this.pageNum;
        switch (a)
        {
          case "prev":
            if (1 === this.pageNum) return;
            this.pageNum = 1 > this.pageNum - 1 ? 1 : this.pageNum - 1;
            break;
          case "next":
            if (this.maxPageNum === this.pageNum) return;
            this.pageNum = this.pageNum + 1 > this.maxPageNum ? this.maxPageNum : this.pageNum + 1;
            break;
          default:
            this.pageNum = a | 0
        }
        this.afterPaging(d);
        e.pageObj.paging(this.pageNum)
      }
    },
    afterPaging: function(a)
    {
      5 < this.maxPageNum && this.movingNumbers(a);
      1 === this.pageNum ? e.addClass(this.el.getElementsByClassName("prevBtn")[0], "off") : e.removeClass(this.el.getElementsByClassName("prevBtn")[0], "off");
      this.pageNum === this.maxPageNum ? e.addClass(this.el.getElementsByClassName("nextBtn")[0], "off") : e.removeClass(this.el.getElementsByClassName("nextBtn")[0], "off");
      e.removeClass(this.el.getElementsByClassName("current")[0], "current");
      e.addClass(this.el.getElementsByClassName("page" + this.pageNum)[0], "current")
    },
    movingNumbers: function(a)
    {
      var d = this.el.getElementsByClassName("pagingNumber"),
        f = d[0].dataset.id | 0,
        b = d[d.length - 1].dataset.id | 0,
        c = this.pageNum - a;
      a = !0;
      1 === f && 4 > this.pageNum && (a = !1);
      b === this.maxPageNum && this.pageNum > this.maxPageNum - 3 && (a = !1);
      if (a)
      {
        var g = 1 > this.pageNum - 2 ? 1 : this.pageNum - 2,
          h = this.pageNum + 2 > this.maxPageNum ? this.maxPageNum : this.pageNum + 2;
        1 === g && (h = 5);
        h === this.maxPageNum && (g = this.maxPageNum - 4);
        a = e.doc.createDocumentFragment();
        if (0 < c)
        {
          for (c = g - f; 0 < c;) c--, this.el.removeChild(d[c]);
          f = h - b + 1;
          for (g = 1; g < f; g++) d = document.createElement("li"), d.textContent = b + g, d.setAttribute("data-id", b + g), d.className = "pagingNumber se_decide page" + (b + g), a.appendChild(d);
          this.el.appendChild(a)
        }
        else
        {
          for (c = b - h; 0 < c;) this.el.removeChild(d[d.length - 1]), c--;
          for (; g < f;) d = document.createElement("li"), d.textContent = g, d.setAttribute("data-id", g), d.className = "pagingNumber se_decide page" + g, a.appendChild(d), g++;
          this.el.insertBefore(a, this.el.getElementsByClassName("nextBtn")[0].nextSibling)
        }
      }
    },
    firstMoving: function()
    {
      if (4 > this.pageNum) this.movingNumbers(1);
      else
      {
        var a, d = e.doc.createDocumentFragment(),
          f = this.pageNum + 2;
        f > this.maxPageNum ? (f = this.maxPageNum, a = 4 < this.maxPageNum ? this.maxPageNum - 4 : 1) : a = this.pageNum - 2;
        var b = document.createElement("li"),
          c = document.createElement("li");
        b.className = "prevBtn se_decide";
        c.className = this.maxPageNum == this.pageNum ? "nextBtn se_decide off" : "nextBtn se_decide";
        b.setAttribute("data-id", "prev");
        c.setAttribute("data-id", "next");
        d.appendChild(b);
        for (d.appendChild(c); a <= f;) b = a, c = document.createElement("li"), c.textContent = b, c.setAttribute("data-id", b), c.className = b == this.pageNum ? "pagingNumber se_decide page" + b + " current" : "pagingNumber se_decide page" + b, d.appendChild(c), a = a + 1 | 0;
        this.$el.html(d)
      }
    },
    removeView: function()
    {
      this.off();
      this.remove()
    }
  })
});
