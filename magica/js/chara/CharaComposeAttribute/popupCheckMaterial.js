define(["underscore", "backbone", "backboneCommon", "command", "text!template/chara/CharaComposeAttribute/popupCheckMaterial.html"], function(g, a, c, h, k)
{
  a = {};
  var d, e, l = {
    width: "490px",
    height: "360px",
    top: "-webkit-calc(50% - 189px)",
    left: "-webkit-calc(50% - 245px)"
  };
  a.open = function(b)
  {
    b = $(b.elm.currentTarget).find("#itemInfo").data();
    var a = "#/EventQuest",
      f = "クエストへ";
    "COMPOSE_ITEM_ALL_PP" == b.id && (a = "#/ShopTop", f = "ショップへ");
    new c.PopupClass(
    {
      title: "解放素材確認",
      content: g.template(k)(
      {
        model: b
      }),
      closeBtnText: "キャンセル",
      decideBtnText: f,
      decideBtnEvent: function()
      {
        location.href = a
      },
      param: l,
      popupId: "materialConfirm"
    }, null, function()
    {
      e(
      {});
      h.getBaseData(c.getNativeObj())
    }, function()
    {
      d(
      {})
    })
  };
  a.init = function(a)
  {
    e = a.popupOpenCallback;
    d = a.popupCloseCallback
  };
  return a
});
