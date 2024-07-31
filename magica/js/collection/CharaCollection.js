define("underscore backbone backboneCommon ajaxControl command cardUtil text!template/collection/CharaCollection.html text!css/collection/CharaCollection.css js/view/collection/CollectionDetailView".split(" "), function(e, g, a, h, d, m, q, r, n)
{
  var t = g.Model.extend(),
    k, p, u = g.View.extend(
    {
      initialize: function(a)
      {
        this.template = e.template(q);
        this.createDom()
      },
      events: function()
      {
        var b = {};
        b[a.cgti + " .tabBtns li"] = this.tabFunc;
        b[a.cgti + " #globalBackBtn"] = this.tapGlobalBackBtn;
        return b
      },
      tapGlobalBackBtn: function(b)
      {
        b.preventDefault();
        a.isScrolled() || (location.href = "#/CollectionTop")
      },
      render: function()
      {
        this.$el.html(this.template(h.getPageJson()));
        return this
      },
      createDom: function()
      {
        a.content.append(this.render().el);
        n.prototype.parentView = this;
        l.prototype.parentView = this;
        l.prototype.template = e.template($("#CharaTemp").text());
        var b = a.doc.createDocumentFragment();
        e.each(p.charaList, function(c, d)
        {
          c.chara || (c.chara = a.storage.userCharaList.findWhere(
          {
            charaId: c.charaId
          }).toJSON().chara);
          c.chara.enemyFlg || (c.charaOpenFlag = !1, e.each(c.cardList, function(b, d)
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
          }), d = new l(
          {
            model: c
          }), b.appendChild(d.render().el))
        });
        a.doc.querySelector("#charaWrapInner").appendChild(b);
        d.getBaseData(a.getNativeObj());
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
          d.stopVoice()
        }
      }
    }),
    l = g.View.extend(
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
        if (!a.isScrolled() && this.model.charaOpenFlag)
        {
          a.detailView && (a.detailView = null);
          this.model.maxStatus = m.getAfterParam(this.model.currentCard.cardId, this.model.currentCard.chara, this.model.currentCard.maxRevision, this.model.currentCard.maxLevel);
          a.detailView = new n(
          {
            model: new t(this.model)
          });
          a.doc.querySelector("#baseContainer").appendChild(a.detailView.render().el);
          a.addClass(a.doc.querySelector("#mainContent"), "hide");
          a.addClass(a.doc.querySelector("#globalMenuContainer"), "hide");
          var c = this.model.currentCard;
          b = c.episodeLevel;
          var e = c.magiaLevel,
            f = Number(c.card.rank.split("_")[1]) || 0,
            c = c.revision;
          2 <= b && (a.removeClass(a.doc.querySelector('[data-voice="15"]'), "off"), a.removeClass(a.doc.querySelector('[data-voice="37"]'), "off"));
          3 <= b && a.removeClass(a.doc.querySelector('[data-voice="38"]'), "off");
          4 <= b && a.removeClass(a.doc.querySelector('[data-voice="39"]'), "off");
          5 <= b && a.removeClass(a.doc.querySelector('[data-voice="40"]'), "off");
          3 <= f && a.removeClass(a.doc.querySelector('[data-voice="20"]'), "off");
          4 <= f && (a.removeClass(a.doc.querySelector('[data-voice="21"]'), "off"), a.removeClass(a.doc.querySelector('[data-voice="44"]'), "off"), a.removeClass(a.doc.querySelector('[data-voice="64"]'), "off"));
          5 <= f && (a.removeClass(a.doc.querySelector('[data-voice="22"]'), "off"), a.removeClass(a.doc.querySelector('[data-voice="45"]'), "off"), a.removeClass(a.doc.querySelector('[data-voice="65"]'), "off"));
          6 <= f && (a.removeClass(a.doc.querySelector('[data-voice="23"]'), "off"), a.removeClass(a.doc.querySelector('[data-voice="46"]'), "off"), a.removeClass(a.doc.querySelector('[data-voice="66"]'), "off"));
          2 <= e && a.removeClass(a.doc.querySelector('[data-voice="19"]'), "off");
          1 <= c && a.removeClass(a.doc.querySelector('[data-voice="16"]'), "off");
          2 <= c && a.removeClass(a.doc.querySelector('[data-voice="17"]'), "off");
          3 <= c && a.removeClass(a.doc.querySelector('[data-voice="18"]'), "off");
          d.getBaseData(a.getNativeObj());
          a.scrollSet("hiddenWrap", "scrollInner")
        }
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
      id: "charaList"
    },
    {
      id: "userDeckList"
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
    }],
    fetch: function()
    {
      h.pageModelGet(this.needModelIdObj, null, "noConnect")
    },
    init: function()
    {
      m.createCardList();
      a.setStyle(r);
      p = h.getPageJson();
      k = new u;
      a.historyArr = ["TopPage", "CollectionTop", "CollectionTop"]
    },
    startCommand: function()
    {
      d.changeBg("web_0015.ExportJson")
    },
    remove: function(b)
    {
      d.stopVoice();
      a.detailView && (a.detailView = null);
      k && k.remove();
      b()
    }
  }
});
