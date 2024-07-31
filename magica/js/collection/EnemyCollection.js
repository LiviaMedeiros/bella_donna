define("underscore backbone backboneCommon ajaxControl command text!template/collection/EnemyCollection.html text!css/collection/EnemyCollection.css".split(" "), function(d, e, a, h, f, p, q)
{
  var k, r = e.Model.extend(),
    g, t = e.View.extend(
    {
      events: function()
      {
        var b = {};
        b[a.cgti + " #enemyBackBtn"] = this.backLinkHandler;
        return b
      },
      initialize: function(a)
      {
        this.template = d.template(p);
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
        l.prototype.template = d.template($("#EnemyPartsTemp").text());
        m.prototype.parentView = this;
        m.prototype.template = d.template($("#EnemyDetailTemp").text());
        var b = a.doc.createDocumentFragment();
        d.each(k.enemyList, function(a, c)
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
        f.getBaseData(a.getNativeObj());
        a.ready.hide()
      },
      backLinkHandler: function(b)
      {
        b.preventDefault();
        a.isScrolled() || ("true" === b.currentTarget.getAttribute("data-noLink") ? (b.currentTarget.setAttribute("data-noLink", ""), a.doc.querySelector("#enemyListWrap").className = "show", a.doc.querySelector("h1").className = "show", a.doc.querySelector("#enemyDetailWrap").className = "hide", n.remove()) : location.href = "#/CollectionTop")
      }
    }),
    u = {
      1: "witch",
      2: "satellite",
      3: "rumor"
    },
    l = e.View.extend(
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
        }), a.doc.querySelector("#enemyDetailWrap").appendChild(n.render().el), f.getBaseData(a.getNativeObj()))
      }
    }),
    n, m = e.View.extend(
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
      id: "enemyList"
    },
    {
      id: "userEnemyList"
    }],
    fetch: function()
    {
      h.pageModelGet(this.needModelIdObj, null, "noConnect")
    },
    init: function()
    {
      k = h.getPageJson();
      a.setStyle(q);
      a.globalMenuView && (a.globalMenuView.remove(), a.globalMenuView = null);
      g = new t;
      a.historyArr = ["TopPage", "CollectionTop", "CollectionTop"]
    },
    startCommand: function()
    {
      f.changeBg("web_0010.jpg");
      f.startBgm("bgm03_story14")
    },
    remove: function(a)
    {
      g && (g.trigger("remove"), g.remove());
      a()
    }
  }
});
