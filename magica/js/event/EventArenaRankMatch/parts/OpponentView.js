define("underscore backbone backboneCommon ajaxControl command js/event/EventArenaRankMatch/parts/OpponentPopup js/event/EventArenaRankMatch/parts/AttackCount js/event/EventArenaRankMatch/parts/CoolTime js/event/EventArenaRankMatch/parts/DefenseDeckEditPopup".split(" "), function(e, m, b, q, n, p, g, h, k)
{
  return m.View.extend(
  {
    tagName: "li",
    className: "enemyWrap TE se_decide",
    events: function()
    {
      var a = {};
      a[b.cgti] = this.battleConfirm;
      return a
    },
    initialize: function(a)
    {
      this.model = a.model;
      this.template = a.template;
      this._views = a._views;
      this.model.charaHtml = this.createCharaHtml();
      this.model.formationHtml = this.createFormationHtml()
    },
    render: function()
    {
      this.$el.html(this.template(
      {
        model: this.model
      }));
      return this
    },
    battleConfirm: function(a)
    {
      a.preventDefault();
      b.isScrolled() || b.EventArenaRankMatchPrm.isTapLimit || (k.isEnableDefenseDeck() ? 0 >= g.num ? g.noBattlePopup(
      {}) : h.isEnd ? (b.doc.getElementById("tapBlock").style.display = "none", this._views.opponentPopup = new p(
      {
        model: this.model
      }), b.doc.getElementById("overlapContainer").appendChild(this._views.opponentPopup.render().el), n.getBaseData(b.getNativeObj())) : h.recoverPopup() : k.open(
      {}))
    },
    createCharaHtml: function()
    {
      var a = this.model.userCardList,
        c = "",
        b = e.template($("#charaIconParts").text()),
        f = [];
      e.each([0, 1, 2, 3, 4], function(l, b, c)
      {
        a[l] ? f.push(a[l]) : f.push('<div class="userCharaIcon empty"></div>')
      });
      e.each(f, function(a, d, e)
      {
        c = a.card ? c + b(
        {
          cardData: a,
          iconPrm:
          {
            att: "att_" + a.card.attributeId.toLowerCase(),
            star: "star_" + a.card.rank.toLowerCase(),
            frame: "frame_" + a.card.rank.toLowerCase(),
            bg: "bg_" + a.card.attributeId.toLowerCase()
          }
        }) : c + a
      });
      return c
    },
    createFormationHtml: function()
    {
      var a = "",
        b = {};
      this.model.userDeck.formationSheet && (b = this.model.userDeck.formationSheet);
      for (var d = 0; 10 > d; d++) b["placeSkillId" + d] && (a += '<span class="pos_' + d + '"></span>');
      return a
    },
    removeView: function()
    {
      this.off();
      this.remove()
    }
  })
});
