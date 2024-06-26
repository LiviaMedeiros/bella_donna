define("underscore backbone backboneCommon ajaxControl command text!template/item/ItemImgParts.html".split(" "), function(d, e, f, h, k, g)
{
  return e.View.extend(
  {
    className: "commonItemImgWrap",
    events: function()
    {
      var b = {};
      this.touchstartEvent && (b.touchstart = this.touchstartEvent);
      this.cgtiEvent && (b[f.cgti] = this.cgtiEvent);
      return b
    },
    initialize: function(b)
    {
      this.template = d.template(g);
      this.type = b.type;
      this.isHideQuantity = b.isHideQuantity;
      this.displayIconId = b.displayIconId;
      this.listenTo(this, "removeView", this.removeView);
      this.listenTo(this.rootView, "removeChildView", this.removeView)
    },
    render: function()
    {
      if (this.displayIconId)
      {
        this.type = "ITEM";
        var b = this.displayIconId.toLowerCase();
        0 > b.indexOf("/") && (b = "main/" + b);
        this.model.imagePath = "item/" + b;
        this.isHideQuantity = !0
      }
      else
      {
        switch (this.type)
        {
          case "ITEM":
            var a = this.model.itemCode;
            a || (a = this.model.item.itemCode);
            var c = a.split("_"); - 1 < a.indexOf("LIMIT_BREAK_ALL_PIECE") ? (b = "main/", a = "LIMIT_BREAK_ALL_PIECE") : -1 < a.indexOf("LIMIT_BREAK_ALL") ? (b = "main/", a = "LIMIT_BREAK_ALL_A") : -1 < a.indexOf("GACHA_FREEBIE_") ? isNaN(c[2]) ? (b = "gacha/", c.pop(), a = c.join("_")) : b = "gacha_old/" : -1 < a.indexOf("SELECTABLE_MEMORIA_TICKET_") ? (b = "main/", isNaN(c[3]) && (c.pop(), a = c.join("_"))) : (b = -1 < a.indexOf("EVENT_") ? "event/" : "main/", -1 < a.indexOf("GROUPBATTLE") && -1 < a.indexOf("_COIN") ? a = "EVENT_GROUPBATTLE_COIN" : -1 < a.indexOf("EVENT_TRAINING_") && 4 > c.length ? a = "EVENT_TRAINING_POTION" : -1 < a.indexOf("EVENT_DUNGEON_") && -1 < a.indexOf("_CURE_CP") ? a = "EVENT_DUNGEON_CURE_CP" : 0 > a.indexOf("ARENARANKING_EXCHANGE") && -1 < a.indexOf("ARENARANKING") && (a = "EVENT_ARENARANKING_1013_EXCHANGE_1"));
            this.model.imagePath = "item/" + b + a.toLowerCase();
            break;
          case "TITLE":
            this.model.imagePath = "item/main/title";
            this.isHideQuantity = !0;
            break;
          case "RICHE":
            this.model.imagePath = "item/main/riche";
            break;
          case "GIFT":
            this.model.nativeimgkey = "gift_" + this.model.genericId;
            this.model.imagePath = "gift/item_" + this.model.nativeimgkey;
            break;
          case "PIECE":
          case "MAXPIECE":
            this.model.imagePath = "memoria/memoria_" + this.model.piece.pieceId + "_s";
            this.isHideQuantity || (this.isHideQuantity = !(1 < this.model.quantity));
            break;
          case "DOPPEL":
            this.model.nativeimgkey = "mini_" + this.model.doppel.id;
            this.model.imagePath = "mini/image/" + this.model.nativeimgkey + "_d";
            break;
          case "LIVE2D":
            this.model.nativeimgkey = "mini_" + this.model.chara.id + "00";
            this.model.imagePath = "mini/image/" + this.model.nativeimgkey + "_d";
            break;
          case "GEM":
            this.model.nativeimgkey = "chara_" + this.model.genericId;
            this.model.imagePath = "chara/" + this.model.nativeimgkey + "_h";
            break;
          case "SET":
            this.model.imagePath = "item/set/" + this.model.genericId.toLowerCase();
            break;
          case "CARD":
            this.model.chara.title && (this.model.dispTitle = this.model.chara.title), this.model.dispName = this.model.chara.name, this.model.imagePath = "chara_" + this.model.card.id + "_h"
        }
        this.$el.addClass(this.type.toLowerCase())
      }
      this.model.imagePath && (this.model.imagePath = this.model.nativeimgkey ? "resource/image_native/" + this.model.imagePath + ".png" : "/magica/resource/image_web/" + this.model.imagePath + ".png");
      this.$el.html(this.template(
      {
        model: this.model,
        type: this.type,
        isHideQuantity: this.isHideQuantity
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
