define(["underscore", "backbone", "backboneCommon", "ajaxControl", "command"], function(c, d, a, e, f)
{
  return {
    open: function(b)
    {
      new a.PopupClass(
      {
        title: "防衛編成",
        content: "防衛編成を設定するまで<br>ミラーズランクマッチのバトルは行えません。<br>防衛編成を設定してください。",
        popupType: "typeC",
        decideBtnText: "防衛編成画面へ",
        decideBtnEvent: function()
        {
          location.href = "#/DeckFormation/arenaRankMatchDefence"
        },
        popupId: "EventArenaRankMatchDefenseDeckEditPopup"
      }, null, function()
      {
        a.EventArenaRankMatchPrm.isOpenPopup = !0
      }, function()
      {
        a.EventArenaRankMatchPrm.isOpenPopup = !1;
        a.EventArenaRankMatchPrm.openTimeOverPopup && a.EventArenaRankMatchPrm.openTimeOverPopup()
      })
    },
    isEnableDefenseDeck: function()
    {
      var b;
      a.EventArenaRankMatchPrm && (b = a.EventArenaRankMatchPrm.isEnableDefenseDeck);
      return b
    }
  }
});
