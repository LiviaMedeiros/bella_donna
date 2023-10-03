define("underscore backbone backboneCommon ajaxControl command text!template/formation/FormationTop.html text!css/formation/FormationTop.css".split(" "), function(f, l, a, k, e, m, n)
{
  var b, g, r = l.View.extend(
    {
      initialize: function(a)
      {
        this.template = f.template(m);
        this.createDom()
      },
      render: function()
      {
        this.$el.html(this.template(b));
        return this
      },
      createDom: function()
      {
        a.setGlobalView();
        var c, p = b.gameUser.deckType;
        f.each(b.userDeckList, function(a)
        {
          a.deckType == p && (c = a.questEpisodeUserCardId)
        });
        var d = a.storage.userCardList.findWhere(
        {
          id: c
        }) || null;
        b.cardId = d ? d.toJSON().displayCardId : null;
        a.content.append(this.render().el);
        e.getBaseData(a.getNativeObj());
        b.eventList && q(b.eventList);
        a.ready.hide()
      }
    }),
    h = null,
    t = ["ARENAMISSION"],
    q = function(c)
    {
      if (c && !a.tutorialId)
      {
        var b = null;
        f.each(c, function(a, c)
        {
          -1 < t.indexOf(a.eventType) && (b = a)
        });
        if (b)
        {
          c = a.doc.querySelector(".btnWrap");
          a.addClass(c, "eventArena");
          b.eventType.toLowerCase();
          var d = document.createElement("div");
          d.innerHTML = "イベント編成";
          d.className = "formationBtn TE se_decide eventArenaBtn linkBtn";
          d.dataset.href = "#/FormationQuest/eventArena";
          c.appendChild(d)
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
      id: "itemList"
    },
    {
      id: "userItemList"
    },
    {
      id: "userStatusList"
    },
    {
      id: "userDeckList"
    },
    {
      id: "userFormationSheetList"
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
      id: "userPatrolList"
    }],
    fetch: function(a)
    {
      h = a || null;
      k.pageModelGet(this.needModelIdObj)
    },
    init: function()
    {
      if (h)
        if (a.tutorialId = h, a.tutorialUtil) a.tutorialUtil.tutorialIdRegist(a.tutorialId),
          a.tutorialUtil.tutorialAddClass(a.tutorialId);
        else
        {
          e.nativeReload("#/TopPage");
          return
        } b = k.getPageJson();
      a.setStyle(n);
      g = new r;
      a.firstNaviCheck(b);
      a.questBattleModel = null
    },
    startCommand: function()
    {
      e.changeBg("web_0013.ExportJson");
      e.startBgm(a.settingBgm)
    },
    remove: function(a)
    {
      g && g.remove();
      a()
    }
  }
});
