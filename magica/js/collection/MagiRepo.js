define("underscore backbone backboneCommon ajaxControl command text!template/collection/MagiRepo.html text!css/collection/MagiRepo.css".split(" "), function(c, e, b, h, k, n, p)
{
  var q = e.Model.extend(
    {}),
    l, d, r = e.View.extend(
    {
      events: function()
      {
        var a = {};
        a[b.cgti + " #tabBtn .btn"] = this.tabChange;
        return a
      },
      initialize: function(a)
      {
        this.model = b.magiRepoList;
        this.currentPart = "part1";
        this.template = c.template(n);
        this.createDom()
      },
      render: function()
      {
        this.$el.html(this.template());
        return this
      },
      createDom: function()
      {
        b.setGlobalView();
        b.content.append(this.render().el);
        this.createBtnView();
        b.ready.hide()
      },
      createBtnView: function()
      {
        this.trigger("removeBtnView");
        g.prototype.parentView = this;
        g.prototype.template = c.template($("#btnTemp").text());
        var a = b.doc.createDocumentFragment();
        c.each(this.model[this.currentPart], function(b, u)
        {
          b = new g(
          {
            model: new q(b)
          });
          a.appendChild(b.render().el)
        });
        b.doc.querySelector("#scrollOuter .scrollInner").appendChild(a)
      },
      tabChange: function(a)
      {
        a.preventDefault();
        b.isScrolled() || a.currentTarget.classList.contains("current") || (this.currentPart = a.currentTarget.dataset.id, b.removeClass(b.doc.querySelector("#tabBtn .current"), "current"), b.addClass(a.currentTarget, "current"), this.createBtnView(), b.scrollRefresh("scrollOuter", "scrollInner", !0), b.doc.querySelector("#listTitle").innerText = "マギアレポート 第" +
        {
          part1: "一",
          part2: "二",
          part3: "三"
        } [this.currentPart] + "部")
      }
    }),
    g = e.View.extend(
    {
      className: "repoBtn TE se_decide",
      events: function()
      {
        var a = {};
        a[b.cgti] = this.detailPageLink;
        return a
      },
      initialize: function(a)
      {
        this.listenTo(this.parentView, "removeBtnView", this.removeView)
      },
      render: function()
      {
        this.$el.html(this.template(
        {
          model: this.model.toJSON()
        }));
        return this
      },
      detailPageLink: function(a)
      {
        a.preventDefault();
        b.isScrolled() || (a = this.model.toJSON(), location.href = "#/MagiRepoDetail/" + a.part + "/" + a.number)
      },
      removeView: function()
      {
        this.off();
        this.remove()
      }
    }),
    t = function(a)
    {
      var b = {};
      c.each(a.magiRepoList, function(a, d)
      {
        b["part" + a.part] || (b["part" + a.part] = []);
        a = c.clone(a);
        b["part" + a.part].push(a)
      });
      c.each(b, function(a, c)
      {
        var f = null;
        10 <= a.length && 100 > a.length ? f = m(a, 2) : 100 <= a.length && 1E3 > a.length && (f = m(a, 3));
        f && (b[c] = f)
      });
      return b
    },
    m = function(a, b)
    {
      var d = [],
        e = 2 === b ? "00" : 3 === b ? "000" : "";
      c.each(a, function(a)
      {
        a.textNumber = (e + a.number).slice(-b);
        d.push(a)
      });
      return d
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
    fetch: function()
    {
      h.pageModelGet(this.needModelIdObj)
    },
    init: function()
    {
      b.setStyle(p);
      l = h.getPageJson();
      b.magiRepoList = null;
      b.magiRepoList = t(l);
      d = new r;
      b.scrollSet("scrollOuter", "scrollInner")
    },
    startCommand: function()
    {
      k.changeBg("web_common.ExportJson");
      k.startBgm("bgm01_anime07")
    },
    removeCommand: function() {},
    remove: function(a)
    {
      d && (d.trigger("removeBtnView"), d.trigger("removeView"), d.remove());
      a()
    }
  }
});
