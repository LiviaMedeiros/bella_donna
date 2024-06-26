define("underscore backbone backboneCommon ajaxControl command text!template/present/PresentHistory.html js/view/present/PresentHistoryPartsView js/view/common/PagingView js/present/PresentController".split(" "), function(f, g, a, h, l, q, e, m, n)
{
  var k = g.Model.extend(),
    r = g.Collection.extend();
  return g.View.extend(
  {
    events: function()
    {
      var b = {};
      b[a.cgti + " #filterTab li"] = this.tabBtn;
      b[a.cgti + " .paging li"] = this.paging;
      return b
    },
    initialize: function(a)
    {
      console.log(a);
      this.filterType = "ALL";
      this.pageNum = 1;
      this.presentList = new r;
      this.template = f.template(q);
      this.createDom()
    },
    render: function()
    {
      this.$el.html(this.template(h.getPageJson()));
      return this
    },
    createDom: function()
    {
      var b = this,
        c = h.getPageJson();
      a.content.append(this.render().el);
      m.parentView = this;
      var d = new k(
      {
        count: c.presentHistoryCount,
        pageLimit: 100
      });
      this.pagingView = new m(
      {
        model: d
      });
      this.presentCnt = c.presentHistoryCount;
      this.presentCntUpdate(c.presentHistoryCount);
      e.prototype.parentView = this;
      e.prototype.originType = this.filterType;
      e.prototype.template = f.template($("#presentParts").text());
      var p = a.doc.createDocumentFragment();
      f.each(c.presentHistoryList, function(a, c)
      {
        a = new k(a);
        b.presentList.add(a);
        a = new e(
        {
          model: a
        });
        p.appendChild(a.render().el)
      });
      a.doc.getElementById("presentInner").appendChild(p);
      l.getBaseData(a.getNativeObj());
      a.scrollSet("presentScrollWrap", "presentScrollInner");
      n.create();
      this.updateInfo();
      a.ready.hide()
    },
    presentCntUpdate: function(b)
    {
      this.presentCnt = b;
      a.doc.getElementById("presentCnt").innerText = this.presentCnt
    },
    presentListUpdate: function(b)
    {
      var c = this;
      h.ajaxPost(a.linkList.presentHistoryPage,
      {
        page: String(b)
      }, function(b)
      {
        c.pagingView.model.set(
        {
          count: b.presentHistoryCount,
          pageLimit: 100
        });
        c.presentCnt = b.presentHistoryCount;
        c.presentCntUpdate(b.presentHistoryCount);
        c.trigger("removeChildView");
        c.presentList.reset();
        var d = a.doc.createDocumentFragment();
        f.each(b.presentHistoryList, function(a, b)
        {
          a = new k(a);
          c.presentList.add(a);
          a = new e(
          {
            model: a
          });
          d.appendChild(a.render().el)
        });
        a.doc.getElementById("presentInner").appendChild(d);
        a.doc.getElementById("presentInner").scrollTop = 0;
        l.getBaseData(a.getNativeObj());
        c.updateInfo();
        a.scrollRefresh(null, null, !0)
      })
    },
    tabBtn: function(b)
    {
      b.preventDefault();
      a.isScrolled() || (a.removeClass(a.doc.querySelector("#filterTab .current"), "current"), setTimeout(function()
      {
        a.addClass(b.currentTarget, "current")
      }, 10), this.filterType = b.currentTarget.dataset.id, e.prototype.originType = this.filterType, this.trigger("filter"), a.doc.getElementById("titleFilter").innerText = b.currentTarget.innerText, this.updateInfo(), a.scrollRefresh(null, null, !0))
    },
    updateInfo: function()
    {
      var b = a.doc.getElementById("historyCaution"),
        c = a.doc.getElementById("presentInner"),
        d = c.getElementsByClassName("present"),
        c = c.getElementsByClassName("present hide"),
        d = d.length,
        c = c.length;
      d <= c ? a.removeClass(b, "hide") : a.addClass(b, "hide");
      a.doc.getElementById("presentCnt").innerText = d - c
    },
    removeView: function()
    {
      this.trigger("removeChildView");
      this.off();
      this.remove();
      n.remove()
    }
  })
});
