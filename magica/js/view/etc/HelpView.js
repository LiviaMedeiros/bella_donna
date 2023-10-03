define("underscore backbone backboneCommon ajaxControl command text!template/etc/Help.html text!resource/image_web/_json/help.json".split(" "), function(g, k, a, n, h, l, m)
{
  return k.View.extend(
  {
    events: function()
    {
      var b = {};
      b[a.cgti + " #menuPanel .btn"] = this.switchShow;
      b[a.cgti + " .colLow"] = this.openText;
      b[a.cgti + " #faqLinkBtn"] = this.helpLink;
      b[a.cgti + " #idCopyBtn"] = this.idCopy;
      return b
    },
    initialize: function(b)
    {
      this.template = g.template(l);
      this.createDom()
    },
    render: function()
    {
      var b;
      b = a.thisPlatform ? a.thisPlatform : a.ua.ios ? "IOS" : "ANDROID";
      console.log("platForm", b);
      for (var d = [], c = JSON.parse(m).help, e = 0; e < c.length; e++)
        if (!c[e].displayOs || c[e].displayOs === b)
        {
          var f = {};
          f.type = c[e].type;
          f.title = c[e].title;
          f.cols = g.filter(c[e].cols, function(a)
          {
            return !a.displayOs || a.displayOs === b
          });
          d.push(f)
        } this.currentType = d ? d[0].type : "";
      this.$el.html(this.template(
      {
        model: d,
        gameUser: a.storage.gameUser.toJSON()
      }));
      return this
    },
    createDom: function()
    {
      a.content.append(this.render().el);
      for (var b = a.doc.getElementById("menuPanel").getElementsByTagName("li"),
          d = 0, c = b.length; d < c; d++) b[d].dataset.type === this.currentType && a.addClass(b[d], "current"), a.scrollSet("scrollWrap", b[d].dataset.type + "Wrap");
      a.scrollSet("menuScroll", "scrollInner");
      a.setGlobalView();
      a.ready.hide()
    },
    switchShow: function(b)
    {
      b.preventDefault();
      if (!a.isScrolled())
      {
        var d = b.currentTarget.dataset.type;
        if (this.currentType !== b.currentTarget.dataset.type)
        {
          var c = a.doc.getElementById("helpWrap");
          a.removeClass(c, this.currentType);
          a.addClass(c, d);
          a.addClass(c.getElementsByClassName(this.currentType + "Wrap")[0], "none");
          a.removeClass(c.getElementsByClassName(d + "Wrap")[0], "none");
          c = a.doc.getElementById("menuPanel").getElementsByClassName("current")[0];
          a.removeClass(c, "current");
          a.addClass(b.currentTarget, "current");
          this.currentType = d;
          a.scrollRefresh("scrollWrap", b.currentTarget.dataset.type + "Wrap", !0)
        }
      }
    },
    openText: function(b)
    {
      b.preventDefault();
      a.isScrolled() || (b.currentTarget.nextElementSibling.classList.toggle("open"), b.currentTarget.getElementsByClassName("panArrow")[0].classList.toggle("on"), a.scrollRefresh())
    },
    helpLink: function(b)
    {
      b.preventDefault();
      a.isScrolled() || h.browserOpen("https://faq.magireco.com/")
    },
    idCopy: function(b)
    {
      b.preventDefault();
      a.isScrolled() || (b = a.storage.gameUser.get("inviteCode"), h.copyClipboard(b), new a.PopupClass(
      {
        title: "プレイヤーID",
        content: "クリップボードにコピーしました。",
        closeBtnText: "OK"
      }))
    }
  })
});
