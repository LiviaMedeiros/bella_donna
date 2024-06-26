define("underscore backbone backboneCommon ajaxControl command text!template/event/arenaranking/EventArenaRankingHistory.html".split(" "), function(c, d, b, e, f, g)
{
  return d.View.extend(
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
      this.template = c.template(g);
      this.createDom()
    },
    render: function()
    {
      this.model = e.getPageJson();
      var a = c.sortBy(this.model.userArenaBattleRankingHistoryList, function(a)
      {
        return -Date.parse(a.eventId)
      });
      console.log(a);
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
  })
});
