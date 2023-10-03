define("underscore backbone backboneCommon ajaxControl command text!template/event/EventArenaRankMatch/parts/EventRewardPopup.html text!template/event/EventArenaRankMatch/parts/EventRewardListTable.html text!template/event/EventArenaRankMatch/parts/EventRewardListItem.html text!template/event/EventArenaRankMatch/parts/EventRewardLastRankTable.html".split(" "), function(d, n, b, p, q, g, k, l, m)
{
  var e = {
    openPopup: function(a)
    {
      var f = a.rewardList;
      a = a.rankInfo;
      var c = e,
        h = d.template(g);
      c.btnClass = "#EventArenaRankMatchEventRewardPopup .popupTextArea .changeBtn";
      c.listClass = "#EventArenaRankMatchEventRewardPopup .popupTextArea #listWrap";
      new b.PopupClass(
      {
        title: "報酬一覧",
        content: h(
        {
          model: c.createListModel(
          {
            rewardList: f,
            rankInfo: a
          })
        }),
        popupId: "EventArenaRankMatchEventRewardPopup",
        popupType: "typeB"
      }, null, function()
      {
        c.btnToggle(
        {
          id: "rank"
        });
        $(c.btnClass).off(b.cgti);
        $(c.btnClass).on(b.cgti, function(a)
        {
          a.preventDefault();
          b.isScrolled() || c.btnToggle(
          {
            id: a.currentTarget.dataset.id
          })
        });
        b.EventArenaRankMatchPrm && (b.EventArenaRankMatchPrm.isOpenPopup = !0)
      }, function()
      {
        b.EventArenaRankMatchPrm && (b.EventArenaRankMatchPrm.isOpenPopup = !1, b.EventArenaRankMatchPrm.openTimeOverPopup && b.EventArenaRankMatchPrm.openTimeOverPopup())
      })
    },
    btnToggle: function(a)
    {
      var f = a.id;
      d.each(["rank", "daily", "lastRank"], function(c, a, b)
      {
        $(e.btnClass + "." + c).removeClass("current");
        $(e.listClass).removeClass(c);
        c == f && ($(e.btnClass + "." + c).addClass("current"), $(e.listClass).addClass(c))
      });
      $("#EventArenaRankMatchEventRewardPopup .listScrollInner").css(
      {
        transform: "translateY(0px)"
      });
      b.scrollSet("listWrap", "listScrollInner")
    },
    createItem: function(a)
    {
      a = a.item;
      var b = d.template(l),
        c = "";
      d.each(a, function(a, d, e)
      {
        c += b(
        {
          model: a
        })
      });
      return c
    },
    createListModel: function(a)
    {
      var b = a.rewardList,
        c = {
          dailyList: "",
          maxRankList: "",
          lastRankingList: "",
          rankInfo: a.rankInfo
        },
        h = d.template(k),
        g = d.template(m);
      d.each(b, function(a, b, f)
      {
        d.each(a.rankList, function(a, d, f)
        {
          c[b + "List"] = "lastRanking" == b ? c[b + "List"] + g(
          {
            model: a
          }) : c[b + "List"] + h(
          {
            model:
            {
              rank: a.rank,
              type: b,
              itemList: e.createItem(
              {
                item: a.itemList
              })
            }
          })
        })
      });
      return c
    }
  };
  return e
});
