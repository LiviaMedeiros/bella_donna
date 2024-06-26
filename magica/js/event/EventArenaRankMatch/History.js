define("underscore backbone backboneCommon ajaxControl command text!css/arena/ArenaCommon.css text!template/event/EventArenaRankMatch/History.html".split(" "), function(d, g, b, e, f, h, k)
{
  var c, l = g.View.extend(
  {
    events: function()
    {
      var a = {};
      a[b.cgti + " #toRankingBtn"] = this.tapToRankingBtn;
      a[b.cgti + " #toRankMatchBtn"] = this.tapToRankMatchBtn;
      return a
    },
    initialize: function(a)
    {
      this.template = d.template(k);
      this.createDom()
    },
    render: function()
    {
      this.model = e.getPageJson();
      var a = d.sortBy(this.model.userArenaRankMatchHistoryList, function(a)
      {
        return -Date.parse(a.regularEventId)
      });
      this.$el.html(this.template(
      {
        model: this.arenaJson,
        history: a
      }));
      return this
    },
    createDom: function()
    {
      b.content.append(this.render().el);
      b.setGlobalView();
      f.getBaseData(b.getNativeObj());
      b.scrollSet("historyScroll", "listScrollInner");
      b.ready.hide()
    },
    tapToRankingBtn: function(a)
    {
      a.preventDefault();
      b.isScrolled() || (location.href = "#/EventArenaRankingHistory")
    },
    tapToRankMatchBtn: function(a)
    {
      a.preventDefault();
      b.isScrolled() || (location.href = "#/RegularEventArenaRankMatchHistory")
    },
    removeHandler: function()
    {
      this.trigger("removeView");
      this.remove()
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
      id: "userDeckList"
    },
    {
      id: "userCardList"
    },
    {
      id: "userDoppelList"
    },
    {
      id: "userCharaList"
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
      id: "userArenaBattle"
    },
    {
      id: "userPatrolList"
    }],
    startCommand: function()
    {
      f.changeBg("web_0014.ExportJson")
    },
    fetch: function()
    {
      e.pageModelGet(this.needModelIdObj)
    },
    init: function()
    {
      b.setStyle(h);
      c = new l;
      b.historyArr = ["MyPage", "ArenaTop", "RegularEventArenaRankMatchHistory"]
    },
    remove: function(a)
    {
      c && c.removeHandler();
      a()
    }
  }
});
