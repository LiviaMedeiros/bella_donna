define("underscore backbone backboneCommon ajaxControl command text!css/event/EventArenaRankMatch/parts/OpponentPopup.css text!template/event/EventArenaRankMatch/parts/OpponentPopup.html".split(" "), function(c, d, b, g, h, e, f)
{
  return d.View.extend(
  {
    tagName: "div",
    id: "confirmPopWrap",
    events: function()
    {
      var a = {};
      a[b.cgti + " #battleStartBtn"] = this.battleStart;
      a[b.cgti + " .closeBtn"] = this.removeView;
      return a
    },
    initialize: function(a)
    {
      this.model = a.model;
      this.model.pageType = "eventTop";
      a.pageType && (this.model.pageType = a.pageType);
      this.template = c.template(f)
    },
    render: function()
    {
      this.$el.html(this.template(
      {
        model: this.model
      }));
      b.addClass(b.doc.getElementById("curtain"), "show");
      setTimeout(function()
      {
        $("#opponentPopup .popupStyle").html(e)
      }, 10);
      return this
    },
    battleStart: function(a)
    {
      a.preventDefault();
      b.isScrolled() || (b.EventArenaRankMatchPrm.opponentInfo = this.model, location.href = "#/DeckFormation/arenaRankMatchAttack")
    },
    removeView: function()
    {
      b.removeClass(b.doc.getElementById("curtain"), "show");
      this.off();
      this.remove()
    }
  })
});
