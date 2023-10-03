define("underscore backbone backboneCommon ajaxControl command cardUtil js/memoria/MemoriaPopup js/card/CardPopup".split(" "), function(g, m, e, r, k, n, p, q)
{
  return m.View.extend(
  {
    events: function()
    {
      var c = {};
      c[e.cgti + " .cardChild"] = this.detailPopup;
      return c
    },
    initialize: function(c)
    {
      this.listenTo(this.rootView, "removeView", this.removeView);
      this.render()
    },
    render: function()
    {
      var c = this.model.gachaAnimation.gachaResultList,
        d = g.template($("#gachaResultParts").text());
      n.createCardList();
      var h = [];
      this.model.userPieceList && g.each(this.model.userPieceList, function(b, a)
      {
        a = {};
        a.id = b.id;
        a.pieceId = b.pieceId;
        h.push(a)
      });
      var l = e.doc.createDocumentFragment(),
        f;
      g.each(c, function(b, a)
      {
        f = e.doc.createElement("div");
        f.className = "cardChild";
        a = {};
        a.isNew = b.isNew;
        a.type = b.type;
        a.price = b.price;
        switch (b.type)
        {
          case "CARD":
            a.charaId = b.charaId;
            b.itemId && (a.itemId = b.itemId, a.item = "on");
            1042 === a.charaId && (a.dispName = e.storage.user.get("loginName"));
            a.attributeId = b.attributeId;
            a.rarity = b.rarity;
            a.key = "card_" + b.cardId + "_c";
            a.src = "resource/image_native/card/image/card_" + b.cardId + "_c.png";
            f.dataset.typeId = "card_" + a.charaId;
            break;
          case "PIECE":
            a.item = "";
            a.key = "memoria_" + b.pieceId + "_c";
            a.src = "resource/image_native/memoria/memoria_" + b.pieceId + "_c.png";
            var c = g.findWhere(h,
            {
              pieceId: b.pieceId
            });
            f.dataset.typeId = "memoria_" + c.id;
            h.splice(g.findIndex(h, c), 1);
            break;
          case "ITEM":
            a.item = "", a.key = b.itemId.toLowerCase(), a.rarity = b.rarity, a.src = "resource/image_native/item/" + b.itemId.toLowerCase() + "_b.png", f.dataset.typeId = b.itemId
        }
        b.extraItemId && (a.extraItemNum = b.extraItemNum, a.extraItemId = b.extraItemId, a.extraItemType = -1 < b.extraItemId.indexOf("GIFT_") ? "gift" : -1 < b.extraItemId.indexOf("EVENT_") ? "event" : "main");
        f.innerHTML = d(
        {
          model: a
        });
        l.appendChild(f)
      });
      e.doc.getElementById("cardWrap").appendChild(l);
      c = e.getNativeObj();
      k.getBaseData(c);
      k.setWebView()
    },
    detailPopup: function(c)
    {
      c.preventDefault();
      if (!e.isScrolled())
      {
        var d = c.currentTarget.dataset.typeId.split("_"); - 1 < d[0].indexOf("card") ? (d = e.storage.userCardListEx.findWhere(
        {
          charaId: d[1] | 0
        }).toJSON(), q.instantPopup(c, d)) : -1 < d[0].indexOf("memoria") && (d = e.storage.userPieceList.findWhere(
        {
          id: d[1]
        }).toJSON(), p.instantPopup(c, d))
      }
    },
    removeView: function()
    {
      this.off();
      this.remove()
    }
  })
});
