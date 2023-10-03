define("underscore backbone backboneCommon ajaxControl command text!template/collection/EnemyCollection.html text!css/collection/EnemyCollection.css".split(" "), function(e, f, a, h, d, p, q)
{
  var k, r = f.Model.extend(),
    g, t = f.View.extend(
    {
      events: function()
      {
        var b = {};
        b[a.cgti + " #enemyBackBtn"] = this.backLinkHandler;
        return b
      },
      initialize: function(a)
      {
        this.template = e.template(p);
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
        l.prototype.parentView = this;
        l.prototype.template = e.template($("#EnemyPartsTemp").text());
        m.prototype.parentView = this;
        m.prototype.template = e.template($("#EnemyDetailTemp").text());
        var b = a.doc.createDocumentFragment();
        e.each(k.enemyList, function(a, c)
        {
          c = k.userEnemyList.filter(function(b)
          {
            return a.enemyId == b.enemyId
          });
          c.length ? (c = c[0].enemy, c.description && (c.description = a.description.replace(/＠/g, "<br>"))) : c = {
            enemyId: a.enemyId,
            type: a.type || 1,
            isClose: !0
          };
          c.idText = ("00" + a.enemyId).slice(-3);
          c = new l(
          {
            model: new r(c)
          });
          b.appendChild(c.render().el)
        });
        a.doc.querySelector(".enemyListInner").appendChild(b);
        a.scrollSet("enemyList", "enemyListInner");
        a.scrollRefresh();
        d.getBaseData(a.getNativeObj());
        a.ready.hide()
      },
      backLinkHandler: function(b)
      {
        b.preventDefault();
        a.isScrolled() || (d.startSe(1003), "true" === b.currentTarget.getAttribute("data-noLink") ? (b.currentTarget.setAttribute("data-noLink", ""), a.doc.querySelector("#enemyListWrap").className = "show", a.doc.querySelector("h1").className = "show", a.doc.querySelector("#enemyDetailWrap").className = "hide", n.remove()) : a.backLinkHandler())
      }
    }),
    u = {
      1: "witch",
      2: "satellite",
      3: "rumor"
    },
    l = f.View.extend(
    {
      className: function()
      {
        var a = "se_decide enemy ";
        this.model.toJSON().type && (a += u[this.model.toJSON().type]);
        return a
      },
      events: function()
      {
        var b = {};
        b[a.cgti] = this.enemyDetailShow;
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
      enemyDetailShow: function(b)
      {
        b.preventDefault();
        a.isScrolled() || this.model.toJSON().isClose || (a.doc.querySelector("#enemyBackBtn").setAttribute("data-noLink", !0), a.doc.querySelector("#enemyListWrap").className = "hide", a.doc.querySelector("h1").className = "hide", a.doc.querySelector("#enemyDetailWrap").className = "show", n = new m(
        {
          model: this.model
        }), a.doc.querySelector("#enemyDetailWrap").appendChild(n.render().el), d.getBaseData(a.getNativeObj()))
      }
    }),
    n, m = f.View.extend(
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
      id: "itemList"
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
      k = h.getPageJson();
      a.setStyle(q);
      a.globalMenuView && (a.globalMenuView.remove(), a.globalMenuView = null);
      g = new t
    },
    startCommand: function()
    {
      d.changeBg("web_0010.jpg");
      d.startBgm("bgm03_story14")
    },
    remove: function(a)
    {
      g && (g.trigger("remove"), g.remove());
      a()
    }
  }
});
