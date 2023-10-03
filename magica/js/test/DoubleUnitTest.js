define("underscore backbone backboneCommon ajaxControl command text!template/test/DoubleUnitTest.html text!css/test/DoubleUnitTest.css cardUtil".split(" "), function(m, n, b, g, h, p, q, r)
{
  var k, d, f, e = 0,
    t = n.View.extend(
    {
      events: function()
      {
        var c = {};
        c[b.cgti + " .debugBtn"] = this.positionDebug;
        return c
      },
      initialize: function(b)
      {
        this.template = m.template(p);
        this.createDom()
      },
      render: function()
      {
        this.$el.html(this.template(g.getPageJson()));
        return this
      },
      createDom: function()
      {
        b.setGlobalView();
        b.content.append(this.render().el);
        r.createCardList();
        d = (d = b.storage.userCardListEx.at(0)) ? d.toJSON() : null;
        f = (f = b.storage.userCardListEx.at(1)) ? f.toJSON() : null;
        l();
        b.ready.hide()
      },
      positionDebug: function(c)
      {
        c.preventDefault();
        b.isScrolled() || (4 > e ? e++ : e = 0, l())
      }
    }),
    l = function()
    {
      if (d)
      {
        var c;
        if (c = d.charaId + "00")
        {
          var a = {};
          a.id = String(c);
          a.x = 350;
          a.y = Math.floor(b.doc.getElementsByTagName("body")[0].offsetHeight / 2);
          0 < e ? (a.subId = a.id, a.subX = -80 * e) : (a.subId = a.id, a.subX = 0);
          a.type = 1;
          a.key = "idle";
          h.startL2d(a);
          b.doc.getElementById("displayPositionFirst").getElementsByClassName("posx")[0].textContent = a.x + a.subX;
          b.doc.getElementById("displayPositionFirst").getElementsByClassName("posy")[0].textContent = a.y
        }
      }
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
      id: "userCharaList"
    },
    {
      id: "userCardList"
    },
    {
      id: "userDoppelList"
    },
    {
      id: "userItemList"
    },
    {
      id: "userGiftList"
    },
    {
      id: "userPieceList"
    },
    {
      id: "userPieceSetList"
    },
    {
      id: "userDeckList"
    },
    {
      id: "userLive2dList"
    },
    {
      id: "userQuestAdventureList"
    }],
    fetch: function()
    {
      g.pageModelGet(this.needModelIdObj)
    },
    init: function()
    {
      b.setStyle(q);
      k = new t
    },
    remove: function(b)
    {
      e = f = d = null;
      k.remove();
      b()
    },
    removeCommand: function()
    {
      h.endL2d()
    }
  }
});
