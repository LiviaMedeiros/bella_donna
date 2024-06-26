define("underscore backbone backboneCommon ajaxControl command text!template/item/ItemListTop.html js/view/item/ItemListPartView cardUtil".split(" "), function(e, u, a, v, h, w, f, x)
{
  var k, g;
  return u.View.extend(
  {
    events: function()
    {
      var b = {};
      b[a.cgti + " #tabBtn .btn"] = this.tabScreen;
      return b
    },
    initialize: function(a)
    {
      this.firstView = a.firstView ? a.firstView : null;
      this.template = e.template(w);
      this.createDom()
    },
    render: function()
    {
      this.$el.html(this.template(v.getPageJson()));
      return this
    },
    createDom: function()
    {
      a.content.append(this.render().el);
      f.prototype.rootView = this;
      f.prototype.template = e.template($("#itemPartTemp").text());
      var b = a.storage.userItemList.toJSON(),
        l = a.doc.createDocumentFragment(),
        g = 0,
        p = [],
        b = e.sortBy(b, function(a)
        {
          var c = 1; - 1 < a.itemId.indexOf("COMPOSE_ITEM_FIRE") ? c = -60 : -1 < a.itemId.indexOf("COMPOSE_ITEM_WATER") ? c = -50 : -1 < a.itemId.indexOf("COMPOSE_ITEM_TIMBER") ? c = -40 : -1 < a.itemId.indexOf("COMPOSE_ITEM_LIGHT") ? c = -30 : -1 < a.itemId.indexOf("COMPOSE_ITEM_DARK") ? c = -20 : -1 < a.itemId.indexOf("COMPOSE_ITEM_ALL") && (c = -10);
          0 > c && (-1 < a.itemId.indexOf("_PP") ? c += 2 : -1 < a.itemId.indexOf("_P") && (c += 1));
          return c
        }),
        m;
      e.each(b, function(a, b)
      {
        "COMPOSE" == a.item.itemType ? (m = new f(a, "item"), l.appendChild(m.render().el), g++) : -1 < a.itemId.indexOf("_STICKER_") && p.push(a)
      });
      var n = 0,
        q = a.doc.createDocumentFragment();
      if (0 < p.length)
      {
        var d = e.sortBy(p, function(a)
        {
          var c = -1;
          a.item.sortKey && (c = a.item.sortKey);
          return c
        });
        e.each(d, function(a, b)
        {
          m = new f(a, "sticker");
          q.appendChild(m.render().el);
          n++
        });
        a.doc.getElementById("stickerCountNum").textContent = n
      }
      console.log("sticker:", d);
      d = a.storage.userGiftList.toJSON();
      d = e.sortBy(d, function(a)
      {
        return Number(a.giftId)
      });
      e.each(d, function(a, b)
      {
        a = new f(a, "gift");
        l.appendChild(a.render().el);
        g++
      });
      x.createCardList();
      var d = a.storage.userCardListEx.toJSON(),
        r = a.doc.createDocumentFragment(),
        t = 0,
        d = e.sortBy(d, function(a)
        {
          return Number(a.charaId)
        });
      e.each(d, function(a, b)
      {
        0 < a.lbItemNum && (a = new f(a, "lbItem"), r.appendChild(a.render().el), t++)
      });
      1 > g ? a.doc.getElementById("item").innerHTML = '<p class="noItems">素材を所持していません</p>' : a.doc.getElementById("item").appendChild(l);
      1 > t ? a.doc.getElementById("gem").innerHTML = '<p class="noItems">デスティニージェムを所持していません</p>' : a.doc.getElementById("gem").appendChild(r);
      0 < n && (a.doc.getElementById("sticker").appendChild(q), a.scrollSet("scrollMainWrap", "stickerInner"), a.removeClass(a.doc.getElementById("tabBtn").getElementsByClassName("sticker")[0], "none"));
      q = r = l = null;
      a.setGlobalView();
      k = "item";
      this.firstView && ("gem" == this.firstView || "sticker" == this.firstView && 0 < n) && (d = $("#tabBtn ." + this.firstView)) && d.trigger(a.cgti);
      this.firstView = null;
      h.getBaseData(a.getNativeObj());
      a.scrollSet("scrollMainWrap", "itemInner");
      a.scrollSet("scrollMainWrap", "gemInner");
      a.ready.hide()
    },
    tabScreen: function(b)
    {
      b.preventDefault();
      a.isScrolled() || b.currentTarget.dataset.wrap === k || (a.doc.getElementById("listTitle").textContent = b.currentTarget.textContent, a.removeClass(a.doc.getElementById("userItemList"), k), a.removeClass(a.doc.getElementById("tabBtn").getElementsByClassName("current")[0], "current"), a.addClass(a.doc.getElementById("userItemList"), b.currentTarget.dataset.wrap), a.addClass(b.currentTarget, "current"), k = b.currentTarget.dataset.wrap, h.getBaseData(a.getNativeObj()), a.scrollRefresh(null, null, !0))
    },
    stickerPop: function(b)
    {
      if (b)
      {
        console.log("stickerModel:", b);
        a.addClass(a.doc.getElementById("globalMenuContainer"), "hide");
        a.addClass(a.ready.content, "fadeout");
        var f = e.template($("#stickerPopTemp").text());
        g = new a.PopupClass(
        {
          simple: !0,
          showCurtain: !1,
          exClass: "stickerPop " + b.itemId
        }, f(
        {
          model: b
        }), function()
        {
          h.changeBg("web_0010.jpg");
          a.androidKeyStop = !0
        }, function()
        {
          h.changeBg("web_common.ExportJson");
          a.removeClass(a.doc.getElementById("globalMenuContainer"), "hide");
          a.removeClass(a.ready.content, "fadeout");
          a.removeClass(a.ready.content, "fadein");
          a.androidKeyStop = !1;
          g = null
        })
      }
    },
    removeHandler: function()
    {
      g && (a.removeClass(a.doc.getElementById("globalMenuContainer"), "hide"), h.changeBg("web_common.ExportJson"), a.androidKeyStop = !1, g = null);
      this.trigger("removeChildView");
      this.off();
      this.remove()
    }
  })
});
