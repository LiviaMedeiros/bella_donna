define("underscore backbone backboneCommon ajaxControl command text!template/etc/HelpPopup.html text!resource/image_web/_json/help.json".split(" "), function(f, g, a, l, m, h, k)
{
  return g.View.extend(
  {
    events: function()
    {
      var b = {};
      b[a.cgti + " .colLow"] = this.openText;
      return b
    },
    initialize: function(b, a, d)
    {
      this.listenTo(this, "removeHandler", this.removeHandler);
      this.helpTitle = a ? a : "ヘルプ";
      this.displayType = b.split(",");
      this.callback = d;
      this.template = f.template(h);
      this.createDom()
    },
    render: function()
    {
      for (var b = JSON.parse(k),
          a = {
            cols: []
          }, d = 0, g = this.displayType.length; d < g; d++)
      {
        var c = this.displayType[d].split("_");
        if (1 < c.length)
        {
          var e = f.findWhere(b.help,
          {
            type: c[0]
          });
          a.cols.push(f.findWhere(e.cols,
          {
            id: c[1]
          }))
        }
        else
          for (var c = f.findWhere(b.help,
            {
              type: c[0]
            }).cols, e = 0, h = c.length; e < h; e++) a.cols.push(c[e])
      }
      this.$el.html(this.template(
      {
        model: a
      }));
      return this
    },
    createDom: function()
    {
      new a.PopupClass(
      {
        title: this.helpTitle,
        exClass: "helpPopup",
        popupType: "typeB"
      });
      a.doc.getElementById("popupArea").getElementsByClassName("popupTextArea")[0].appendChild(this.render().el);
      a.scrollSet("helpPopScrollOuter", "scrollInner")
    },
    openText: function(b)
    {
      b.preventDefault();
      a.isScrolled() || (b.currentTarget.nextElementSibling.classList.toggle("open"), b.currentTarget.getElementsByClassName("panArrow")[0].classList.toggle("on"), b.currentTarget.nextElementSibling.classList.contains("open") && (a.doc.getElementById("HelpPopup").scrollTop = b.currentTarget.offsetTop - b.currentTarget.offsetHeight), a.scrollRefresh("helpPopScrollOuter", "scrollInner"))
    },
    removeHandler: function()
    {
      this.callback && (this.callback(), this.callback = null);
      a.helpPopup = null;
      this.off();
      this.remove()
    }
  })
});
