define("underscore backbone backboneCommon ajaxControl command text!template/collection/DoppelCollection.html text!css/collection/DoppelCollection.css".split(" "), function(e, c, a, h, f, q, r)
{
  var k, p = c.Model.extend(),
    l, t = c.View.extend(
    {
      events: function()
      {
        var b = {};
        b[a.cgti + " #doppelBackBtn"] = this.backLinkHandler;
        return b
      },
      initialize: function(a)
      {
        this.template = e.template(q);
        this.createDom()
      },
      render: function()
      {
        this.$el.html(this.template(h.getPageJson()));
        return this
      },
      createDom: function()
      {
        a.content.append(this.render().el);
        g.prototype.parentView = this;
        g.prototype.template = e.template($("#DoppelPartsTemp").text());
        m.prototype.parentView = this;
        m.prototype.template = e.template($("#DoppelDetailTemp").text());
        var b = a.doc.createDocumentFragment();
        e.each(k.doppelList, function(d, c)
        {
          d.description = d.description.replace(/＠/g, "<br>");
          d = a.storage.userDoppelList.findWhere(
          {
            doppelId: d.id
          }) ? new g(
          {
            model: new p(d)
          }) : new g(
          {
            model: new p(
            {
              id: null
            })
          });
          b.appendChild(d.render().el)
        });
        a.doc.querySelector(".doppelListInner").appendChild(b);
        var c = 0;
        a.storage.userDoppelList.each(function(a, b)
        {
          a.toJSON().doppel.archive && c++
        });
        a.doc.querySelector(".hasNum").textContent = c;
        a.doc.querySelector(".totalNum").textContent = k.doppelList.length;
        a.scrollSet("doppelList", "doppelListInner");
        a.scrollRefresh();
        f.getBaseData(a.getNativeObj());
        a.ready.hide()
      },
      backLinkHandler: function(b)
      {
        b.preventDefault();
        a.isScrolled() || ("true" === b.currentTarget.getAttribute("data-noLink") ? (b.currentTarget.setAttribute("data-noLink", ""), a.doc.querySelector("#doppelListWrap").className = "show", a.doc.querySelector("h1").className = "show", a.doc.querySelector("#doppelDetailWrap").className = "hide", n.remove()) : location.href = "#/CollectionTop")
      }
    }),
    g = c.View.extend(
    {
      className: "doppel se_decide",
      events: function()
      {
        var b = {};
        b[a.cgti] = this.doppelDetailShow;
        return b
      },
      render: function()
      {
        this.$el.html(this.template(
        {
          model: this.model.toJSON()
        }));
        return this
      },
      doppelDetailShow: function(b)
      {
        b.preventDefault();
        !a.isScrolled() && this.model.toJSON().id && (a.doc.querySelector("#doppelBackBtn").setAttribute("data-noLink", !0), a.doc.querySelector("#doppelListWrap").className = "hide", a.doc.querySelector("h1").className = "hide", a.doc.querySelector("#doppelDetailWrap").className = "show", n = new m(
        {
          model: this.model
        }), a.doc.querySelector("#doppelDetailWrap").appendChild(n.render().el), f.getBaseData(a.getNativeObj()))
      }
    }),
    n, m = c.View.extend(
    {
      render: function()
      {
        this.$el.html(this.template(
        {
          model: this.model.toJSON()
        }));
        return this
      }
    });
  return {
    needModelIdObj: [
    {
      id: "user"
    },
    {
      id: "gameUser"
    },
    {
      id: "userStatusList"
    },
    {
      id: "doppelList"
    },
    {
      id: "userDoppelList"
    }],
    fetch: function()
    {
      h.pageModelGet(this.needModelIdObj, null, "noConnect")
    },
    init: function()
    {
      k = h.getPageJson();
      a.setStyle(r);
      a.globalMenuView && (a.globalMenuView.remove(), a.globalMenuView = null);
      l = new t;
      a.historyArr = ["TopPage", "CollectionTop", "CollectionTop"]
    },
    startCommand: function()
    {
      f.changeBg("web_0010.jpg");
      f.startBgm("bgm02_anime07")
    },
    remove: function(a)
    {
      l && l.remove();
      a()
    }
  }
});
