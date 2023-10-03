define("underscore backbone backboneCommon ajaxControl command text!css/event/dungeon/EventDungeonCurePopup.css text!template/event/dungeon/EventDungeonCurePopupParts.html".split(" "), function(g, h, b, e, p, k, l)
{
  var f, d, c = !1,
    n = function()
    {
      var m = h.View.extend(
      {
        tagName: "div",
        id: "CpCureWrap",
        events: function()
        {
          var a = {};
          a[b.cgti + " #decideUse"] = this.decideUse;
          return a
        },
        initialize: function()
        {
          this.itemId = "EVENT_DUNGEON_" + d.eventId + "_CURE_CP";
          this.listenTo(b.storage.userStatusList, "change", this.render);
          this.template = g.template(l);
          c = !1
        },
        render: function()
        {
          this.model = b.storage.userStatusList.toJSON();
          var a = b.storage.userItemList.findWhere(
            {
              itemId: this.itemId
            }),
            a = a ? a.get("quantity") : 0;
          this.$el.html(this.template(
          {
            model: this.model,
            quantity: a,
            userEventDungeon: d
          }));
          a = document.createElement("style");
          a.setAttribute("type", "text/css");
          a.innerText = k;
          this.el.appendChild(a);
          return this
        },
        decideUse: function(a)
        {
          a.preventDefault();
          b.isScrolled() || c || (c = !0, e.ajaxPost(b.linkList.useItem,
          {
            itemId: this.itemId,
            num: 1
          }, function(a)
          {
            c = !1;
            "error" !== a.resultCode && (b.responseSetStorage(a), new b.PopupClass(
            {
              title: "CP回復薬",
              content: "CPを回復しました。",
              popupType: "typeE",
              exClass: "cpCureAfter",
              closeBtnText: "OK"
            }))
          }))
        },
        removeView: function()
        {
          this.off();
          this.remove()
        }
      });
      f = e.getPageJson();
      d = f.userEventDungeon;
      return new m
    };
  return {
    popupStart: function()
    {
      var c = n();
      new b.PopupClass(
      {
        title: "CP回復薬",
        content: "",
        popupType: "typeE"
      }, null, null, function()
      {
        c.removeView()
      });
      b.doc.getElementById("popupArea").getElementsByClassName("popupInner")[0].appendChild(c.render().el)
    }
  }
});
