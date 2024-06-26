define("underscore backbone backboneCommon ajaxControl command text!template/present/GachaHistory.html js/view/present/GachaHistoryPartsView js/view/common/PagingView".split(" "), function(e, g, a, h, l, n, f, m)
{
  var k = g.Model.extend(),
    p = g.Collection.extend();
  return g.View.extend(
  {
    events: function()
    {
      var b = {};
      b[a.cgti + " .paging li"] = this.paging;
      return b
    },
    initialize: function(a)
    {
      this.pageNum = 1;
      this.gachaList = new p;
      this.template = e.template(n);
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
      var q = new k(
      {
        count: c.gachaHistoryCount,
        pageLimit: 50
      });
      this.pagingView = new m(
      {
        model: q
      });
      this.gachaCnt = c.gachaHistoryCount;
      this.gachaCntUpdate(c.gachaHistoryCount);
      f.prototype.parentView = this;
      f.prototype.template = e.template($("#gachaParts").text());
      var d = a.doc.createDocumentFragment();
      e.each(c.gachaHistoryList, function(a, c)
      {
        a = new k(a);
        b.gachaList.add(a);
        a = new f(
        {
          model: a
        });
        d.appendChild(a.render().el)
      });
      a.doc.getElementById("gachaInner").appendChild(d);
      l.getBaseData(a.getNativeObj());
      a.scrollSet("gachaScrollWrap", "gachaScrollInner");
      a.ready.hide()
    },
    gachaCntUpdate: function(b)
    {
      this.gachaCnt = b;
      a.doc.getElementById("gachaCnt").innerText = this.gachaCnt
    },
    gachaListUpdate: function(b)
    {
      var c = this;
      h.ajaxPost(a.linkList.GachaHistoryPage,
      {
        page: String(b)
      }, function(b)
      {
        c.pagingView.model.set(
        {
          count: b.gachaHistoryCount,
          pageLimit: 50
        });
        c.gachaCnt = b.gachaHistoryCount;
        c.gachaCntUpdate(b.gachaHistoryCount);
        c.trigger("removeChildView");
        c.gachaList.reset();
        var d = a.doc.createDocumentFragment();
        e.each(b.gachaHistoryList, function(a, b)
        {
          a = new k(a);
          c.gachaList.add(a);
          a = new f(
          {
            model: a
          });
          d.appendChild(a.render().el)
        });
        a.doc.getElementById("gachaInner").appendChild(d);
        a.doc.getElementById("gachaInner").scrollTop = 0;
        l.getBaseData(a.getNativeObj());
        a.scrollRefresh(null, null, !0)
      })
    },
    removeView: function()
    {
      this.trigger("removeChildView");
      this.off();
      this.remove()
    }
  })
});
