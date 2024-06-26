define("underscore backbone backboneCommon ajaxControl command text!template/arena/ArenaReward.html js/view/arena/ArenaInfoPartsView".split(" "), function(c, d, b, e, g, f, h)
{
  return d.View.extend(
  {
    events: function()
    {
      var a = {};
      a[b.cgti + " #arenaRewardTab li"] = this.tabScreen;
      a[b.cgti + " #arenaBp .plusBtn"] = this.bpCurePop;
      return a
    },
    initialize: function(a)
    {
      this.model = e.getPageJson();
      this.template = c.template(f);
      this.createDom()
    },
    render: function(a)
    {
      this.$el.html(this.template(a));
      return this
    },
    createDom: function()
    {
      var a = c.sortBy(this.model.arenaBattleFreeRankClassList, function(a)
        {
          return -a.sortKey
        }),
        d = c.sortBy(this.model.arenaBattleRankingClassList, function(a)
        {
          return -a.sortKey
        });
      b.content.append(this.render(
      {
        free: a,
        ranking: d
      }).el);
      b.scrollSet("arenaRewardWrap", "scrollInner");
      b.setGlobalView();
      b.ready.hide()
    },
    tabScreen: function(a)
    {
      a.preventDefault();
      b.isScrolled() || a.currentTarget.classList.contains("current") || (b.removeClass(b.doc.getElementById("arenaRewardTab").getElementsByClassName("current")[0], "current"), b.addClass(a.currentTarget, "current"), b.doc.getElementById("rewardTypeWrap").className = a.currentTarget.dataset.screen)
    },
    removeHandler: function()
    {
      clearInterval(void 0);
      this.remove()
    }
  })
});
