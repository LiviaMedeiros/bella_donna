define("underscore backbone backboneCommon ajaxControl text!../../template/test/CardStatusChecker.html cardUtil".split(" "), function(m, n, b, k, p, e)
{
  var g, l, d, q = function()
  {
    g = new(n.View.extend(
    {
      events: function()
      {
        var a = {};
        a[b.cgti + " #levelDown"] = this.levelDown;
        a[b.cgti + " #levelUp"] = this.levelUp;
        a[b.cgti + " #maxBtn"] = this.levelMax;
        a[b.cgti + " #allStatus"] = this.allStatus;
        a[b.cgti + " #revDown"] = this.revDown;
        a[b.cgti + " #revUp"] = this.revUp;
        a["change #hasCard"] = this.changeModel;
        return a
      },
      initialize: function(a)
      {
        this.template = m.template(p);
        this.createDom()
      },
      render: function()
      {
        l = k.getPageJson();
        this.$el.html(this.template(l));
        return this
      },
      createDom: function()
      {
        b.content.append(this.render().el);
        b.setGlobalView();
        b.hasModel("userCardListEx") || e.createCardList();
        var a = b.doc.createDocumentFragment();
        b.storage.userCardListEx.each(function(c, e)
        {
          c = c.toJSON();
          var f = b.doc.createElement("option");
          f.value = c.cardId;
          f.innerHTML = c.chara.name + " " + c.card.rank;
          a.appendChild(f);
          0 === e && (d = c)
        });
        b.doc.getElementById("hasCard").appendChild(a);
        a = null;
        this.changeStatus();
        b.ready.hide()
      },
      changeModel: function(a)
      {
        d = b.storage.userCardListEx.findWhere(
        {
          cardId: a.currentTarget.value | 0
        }).toJSON();
        a = b.doc.getElementById("nowLevel").innerText | 0;
        var c = e.getMaxLevel(d.card.rank, 4);
        a > c && (b.doc.getElementById("nowLevel").innerText = maxLevel);
        this.changeStatus()
      },
      changeStatus: function()
      {
        var a = b.doc.getElementById("nowLevel").innerText | 0,
          c = b.doc.getElementById("nowRev").innerText | 0,
          a = e.getAfterParam(d.cardId, d.chara, c, a);
        b.doc.getElementById("cardHP").innerText = a.hp;
        b.doc.getElementById("cardATK").innerText = a.attack;
        b.doc.getElementById("cardDEF").innerText = a.defense
      },
      allStatus: function(a)
      {
        a.preventDefault();
        if (!b.isScrolled())
        {
          a = e.getMaxLevel(d.card.rank, 4);
          for (var c = e.getMaxRevision(d.card.rank), h = 0; h <= c; h++)
            for (var f = 1; f <= a; f++)
            {
              var g = e.getAfterParam(d.cardId, d.chara, h, f);
              console.log("Level:", f, " rev:", h, " HP:", g.hp, " ATK:", g.attack, " DEF:", g.defense)
            }
        }
      },
      levelMax: function(a)
      {
        a.preventDefault();
        b.isScrolled() || (a = e.getMaxLevel(d.card.rank, 4), b.doc.getElementById("nowLevel").innerText = a | 0, this.changeStatus())
      },
      levelUp: function(a)
      {
        a.preventDefault();
        if (!b.isScrolled())
        {
          a = b.doc.getElementById("nowLevel").innerText | 0;
          var c = e.getMaxLevel(d.card.rank, 4);
          a !== c && (b.doc.getElementById("nowLevel").innerText = a + 1 | 0, this.changeStatus())
        }
      },
      levelDown: function(a)
      {
        a.preventDefault();
        b.isScrolled() || (a = b.doc.getElementById("nowLevel").innerText | 0, 1 !== a && (b.doc.getElementById("nowLevel").innerText = a - 1 | 0, this.changeStatus()))
      },
      revUp: function(a)
      {
        a.preventDefault();
        b.isScrolled() || (a = b.doc.getElementById("nowRev").innerText | 0, 4 !== a && (b.doc.getElementById("nowRev").innerText = a + 1 | 0, this.changeStatus()))
      },
      revDown: function(a)
      {
        a.preventDefault();
        b.isScrolled() || (a = b.doc.getElementById("nowRev").innerText | 0, 0 !== a && (b.doc.getElementById("nowRev").innerText = a - 1 | 0, this.changeStatus()))
      }
    }))
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
      id: "userStatusList"
    },
    {
      id: "itemList"
    },
    {
      id: "userItemList"
    },
    {
      id: "userCardList"
    },
    {
      id: "userDeckList"
    },
    {
      id: "userDoppelList"
    },
    {
      id: "userLive2dList"
    },
    {
      id: "userCharaList"
    },
    {
      id: "userPieceList"
    },
    {
      id: "userPatrolList"
    }],
    fetch: function(a, b)
    {
      k.pageModelGet(this.needModelIdObj)
    },
    init: function()
    {
      q()
    },
    remove: function(a)
    {
      g && g.remove();
      a()
    }
  }
});
