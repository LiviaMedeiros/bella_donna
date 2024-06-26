define(["underscore", "backbone", "backboneCommon", "ajaxControl", "command"], function(f, g, d, h, k)
{
  return g.View.extend(
  {
    tagName: "div",
    className: "gacha commonFrame4",
    events: function()
    {
      var c = {};
      c[d.cgti] = this.resultPop;
      return c
    },
    resultPop: function(c)
    {
      c.preventDefault();
      if (!d.isScrolled())
      {
        var e = function(b)
        {
          b && (f.each(b.gachaAnimation.gachaResultList, function(a, b)
          {
            switch (a.type)
            {
              case "CARD":
                a.key = "card_" + a.cardId + "_c";
                a.src = "resource/image_native/card/image/card_" + a.cardId + "_c.png";
                a.typeid = "card_" + a.charaId;
                break;
              case "PIECE":
                a.item = "";
                a.key = "memoria_" + a.pieceId + "_c";
                a.src = "resource/image_native/memoria/memoria_" + a.pieceId + "_c.png";
                a.typeid = "memoria_" + a.pieceId;
                break;
              case "ITEM":
                a.item = "", a.key = a.itemId.toLowerCase(), a.src = "resource/image_native/item/" + a.itemId.toLowerCase() + "_b.png", a.typeid = a.itemId
            }
          }), b.type = 1 == b.gachaAnimation.gachaResultList.length ? "single" : "", b.title = c.currentTarget.querySelector(".gachaName").textContent, b.popupType = "typeB", new d.PopupClass(b, $("#ResultPopTemp").text(), function()
          {
            k.getBaseData(d.getNativeObj())
          }))
        };
        this.model.toJSON();
        window.isLocal ? require(["text!/magica/json/gacha/result.json"], function(b)
        {
          e(JSON.parse(b))
        }) : h.ajaxSimpleGet(d.linkList.gachaResultHistory, this.model.toJSON().id, e)
      }
    },
    initialize: function(c)
    {
      this.listenTo(this.parentView, "removeChildView", this.removeView);
      this.listenTo(this.model, "change", this.removeView)
    },
    render: function()
    {
      var c = this.model.toJSON();
      this.$el.html(this.template(
      {
        model: c
      }));
      return this
    },
    removeView: function()
    {
      this.off();
      this.remove()
    }
  })
});
