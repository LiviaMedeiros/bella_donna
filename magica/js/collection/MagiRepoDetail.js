define("underscore backbone backboneCommon ajaxControl command text!template/collection/MagiRepoDetail.html text!css/collection/MagiRepoDetail.css".split(" "), function(e, l, b, f, m, p, q)
{
  var g = null,
    c = null,
    r = l.Model.extend(
    {}),
    h, t = l.View.extend(
    {
      events: function()
      {
        var a = {};
        a[b.cgti + " .arrowR"] = this.imgChange;
        a[b.cgti + " .arrowL"] = this.imgChange;
        a[b.cgti + " #mainImg"] = this.imgZoom;
        return a
      },
      initialize: function(a)
      {
        this.model = new r(d());
        this.template = e.template(p);
        this.createDom();
        this.listenTo(this.model, "change", this.render)
      },
      render: function()
      {
        this.$el.html(this.template(
        {
          model: this.model.toJSON()
        }));
        $(this.el.querySelector("#mainImg")).bind("load", function(a)
        {
          this.imgOnload(a)
        }.bind(this));
        return this
      },
      createDom: function()
      {
        b.setGlobalView();
        b.content.append(this.render().el);
        b.ready.hide()
      },
      imgOnload: function(a)
      {
        console.log("imgOnload", a);
        b.removeClass(b.doc.querySelector("#imgWrap"), "hide");
        b.addClass(b.doc.querySelector("#imgWrap"), "show")
      },
      imgChange: function(a)
      {
        a.preventDefault();
        b.isScrolled() || (a.currentTarget.classList.contains("arrowR") ? (--c, this.model.set(d()), console.log("戻る", d())) : (c += 1, this.model.set(d()), console.log("進む", d())))
      },
      imgZoom: function(a)
      {
        a.preventDefault();
        b.isScrolled() || (a = b.doc.querySelector("#imgWrap"), a.classList.contains("hide") || (a.classList.contains("zoom") ? (b.removeClass(a, "zoom"), b.addClass(a, "thumb"), b.scrollRefresh("imgWrap", "inner"), b.doc.querySelector("#globalMenu").style.display = "", b.doc.querySelector("#sideMenu").style.display = "") : (b.removeClass(a, "thumb"), b.addClass(a, "zoom"), b.scrollSet("imgWrap", "inner"), b.scrollRefresh("imgWrap", "inner"), b.doc.querySelector("#globalMenu").style.display = "none", b.doc.querySelector("#sideMenu").style.display = "none")))
      }
    }),
    d = function()
    {
      0 < c && !b.magiRepoList[g][c - 1] && (c = 1);
      0 >= c && (c = b.magiRepoList[g].length);
      return e.findWhere(b.magiRepoList[g],
      {
        number: c
      })
    },
    u = function(a)
    {
      var b = {};
      e.each(a.magiRepoList, function(a, c)
      {
        b["part" + a.part] || (b["part" + a.part] = []);
        a = e.clone(a);
        b["part" + a.part].push(a)
      });
      e.each(b, function(a, c)
      {
        var k = null;
        10 <= a.length && 100 > a.length ? k = n(a, 2) : 100 <= a.length && 1E3 > a.length && (k = n(a, 3));
        k && (b[c] = k)
      });
      return b
    },
    n = function(a, b)
    {
      var c = [],
        d = 2 === b ? "00" : 3 === b ? "000" : "";
      e.each(a, function(a)
      {
        a.textNumber = (d + a.number).slice(-b);
        c.push(a)
      });
      return c
    };
  return {
    needModelIdObj: [
    {
      id: "user"
    },
    {
      id: "gameUser"
    },
    {
      id: "userItemList"
    },
    {
      id: "userStatusList"
    },
    {
      id: "userPatrolList"
    }],
    fetch: function(a, d)
    {
      g = a ? "part" + a : "part1";
      c = d ? Number(d) : 1;
      b.magiRepoList ? f.pageModelGet(this.needModelIdObj) : (a = function(a)
      {
        b.magiRepoList = u(a);
        console.log(a);
        f.pageModelGet(this.needModelIdObj)
      }.bind(this), f.ajaxSimpleGet(b.linkList.MagiRepoPage, "", a))
    },
    init: function()
    {
      b.setStyle(q);
      f.getPageJson();
      h = new t
    },
    startCommand: function()
    {
      m.changeBg("web_common.ExportJson");
      m.startBgm("bgm01_anime07")
    },
    removeCommand: function() {},
    remove: function(a)
    {
      h && (h.trigger("removeView"), h.remove());
      a()
    }
  }
});
