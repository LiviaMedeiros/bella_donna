define("underscore backbone backboneCommon ajaxControl command cardUtil text!template/collection/CharaCollection.html text!css/collection/CharaCollection.css js/view/collection/CollectionDetailView".split(" "), function(g, f, a, k, e, n, r, t, p)
{
  var u = f.Model.extend(),
    l, q, v = f.View.extend(
    {
      initialize: function(a)
      {
        this.template = g.template(r);
        this.createDom()
      },
      events: function()
      {
        var b = {};
        b[a.cgti + " .tabBtns li"] = this.tabFunc;
        return b
      },
      render: function()
      {
        this.$el.html(this.template(k.getPageJson()));
        return this
      },
      createDom: function()
      {
        a.setGlobalView();
        a.content.append(this.render().el);
        p.prototype.parentView = this;
        m.prototype.parentView = this;
        m.prototype.template = g.template($("#CharaTemp").text());
        var b = a.doc.createDocumentFragment();
        g.each(q.charaList, function(c, d)
        {
          c.chara || (c.chara = a.storage.userCharaList.findWhere(
          {
            charaId: c.charaId
          }).toJSON().chara);
          c.chara.enemyFlg || (c.charaOpenFlag = !1, g.each(c.cardList, function(b, d)
          {
            a.storage.userCardList.findWhere(
            {
              id: b.userCardId
            }) ? (b.card = a.storage.userCardList.findWhere(
            {
              id: b.userCardId
            }).toJSON().card, b.openFlag = !0, b.rankNum = Number(b.card.rank.split("_")[1]), b = a.storage.userCardListEx.findWhere(
            {
              id: b.userCardId
            }), c.currentCard = b ? b.toJSON() :
            {}, c.charaOpenFlag = !0) : (b.rankNum = Number(b.card.rank.split("_")[1]), b.openFlag = !1)
          }), d = new m(
          {
            model: c
          }), b.appendChild(d.render().el))
        });
        a.doc.querySelector("#charaWrapInner").appendChild(b);
        e.getBaseData(a.getNativeObj());
        a.scrollSet("charaHiddenWrap", "charaWrapInner");
        a.ready.hide()
      },
      tabFunc: function(b)
      {
        b.preventDefault();
        if (!a.isScrolled())
        {
          var c = b.currentTarget.getAttribute("data-att").toLowerCase();
          a.doc.querySelector("#charaWrap").className = c + " commonFrame2";
          a.removeClass(a.doc.querySelector(".tabBtns .current"), "current");
          a.addClass(b.currentTarget, "current");
          a.scrollRefresh(null, null, !0);
          e.stopVoice()
        }
      }
    }),
    m = f.View.extend(
    {
      className: function()
      {
        return "chara commonFrame4 se_decide " + this.model.chara.attributeId
      },
      events: function()
      {
        var b = {};
        b[a.cgti + ""] = this.tapFunc;
        return b
      },
      render: function()
      {
        this.$el.html(this.template(
        {
          model: this.model
        }));
        return this
      },
      tapFunc: function(b)
      {
        b.preventDefault();
        !a.isScrolled() && this.model.charaOpenFlag && (a.detailView && (a.detailView = null), this.model.maxStatus = n.getAfterParam(this.model.currentCard.cardId, this.model.currentCard.chara, this.model.currentCard.maxRevision, this.model.currentCard.maxLevel), a.detailView = new p(
        {
          model: new u(this.model)
        }), a.doc.querySelector("#baseContainer").appendChild(a.detailView.render().el), a.addClass(a.doc.querySelector("#mainContent"), "hide"), a.addClass(a.doc.querySelector("#globalMenuContainer"), "hide"), w(this.model), e.getBaseData(a.getNativeObj()), a.scrollSet("hiddenWrap", "scrollInner"))
      }
    }),
    w = function(b)
    {
      var c = b.currentCard,
        d = c.episodeLevel,
        e = c.magiaLevel,
        h = Number(c.card.rank.split("_")[1]) || 0,
        c = c.revision,
        f = [];
      g.each(a.storage.userSectionList.toJSON(), function(a)
      {
        b.charaId == a.section.genericId && f.push(a)
      });
      f.sort(function(a, b)
      {
        return a.section.genericIndex < b.section.genericIndex ? -1 : a.section.genericIndex > b.section.genericIndex ? 1 : 0
      });
      2 <= d && (a.removeClass(a.doc.querySelector('[data-voice="15"]'), "off"), a.removeClass(a.doc.querySelector('[data-voice="37"]'), "off"));
      3 <= d && a.removeClass(a.doc.querySelector('[data-voice="38"]'), "off");
      4 <= d && a.removeClass(a.doc.querySelector('[data-voice="39"]'), "off");
      5 <= d && a.removeClass(a.doc.querySelector('[data-voice="40"]'), "off");
      3 <= h && a.removeClass(a.doc.querySelector('[data-voice="20"]'), "off");
      4 <= h && (a.removeClass(a.doc.querySelector('[data-voice="21"]'), "off"), a.removeClass(a.doc.querySelector('[data-voice="44"]'), "off"), a.removeClass(a.doc.querySelector('[data-voice="64"]'), "off"));
      5 <= h && (a.removeClass(a.doc.querySelector('[data-voice="22"]'), "off"), a.removeClass(a.doc.querySelector('[data-voice="45"]'), "off"), a.removeClass(a.doc.querySelector('[data-voice="65"]'), "off"));
      6 <= h && (a.removeClass(a.doc.querySelector('[data-voice="23"]'), "off"), a.removeClass(a.doc.querySelector('[data-voice="46"]'), "off"), a.removeClass(a.doc.querySelector('[data-voice="66"]'), "off"));
      2 <= e && a.removeClass(a.doc.querySelector('[data-voice="19"]'), "off");
      1 <= c && a.removeClass(a.doc.querySelector('[data-voice="16"]'), "off");
      2 <= c && a.removeClass(a.doc.querySelector('[data-voice="17"]'), "off");
      3 <= c && a.removeClass(a.doc.querySelector('[data-voice="18"]'), "off")
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
      id: "itemList"
    },
    {
      id: "userDeckList"
    },
    {
      id: "userItemList"
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
      id: "userLive2dList"
    },
    {
      id: "userPieceList"
    },
    {
      id: "userPieceSetList"
    },
    {
      id: "userSectionList"
    },
    {
      id: "userPatrolList"
    }],
    fetch: function()
    {
      k.pageModelGet(this.needModelIdObj)
    },
    init: function()
    {
      n.createCardList();
      a.setStyle(t);
      q = k.getPageJson();
      l = new v
    },
    startCommand: function()
    {
      e.changeBg("web_0015.ExportJson")
    },
    remove: function(b)
    {
      e.stopVoice();
      a.detailView && (a.detailView = null);
      l && l.remove();
      b()
    }
  }
});
