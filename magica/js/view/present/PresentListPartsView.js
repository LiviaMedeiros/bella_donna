define("underscore backbone backboneCommon ajaxControl command js/view/item/ItemImgPartsView".split(" "), function(l, g, a, h, c, k)
{
  return g.View.extend(
  {
    tagName: "div",
    className: "present commonFrame4",
    events: function()
    {
      var b = {};
      b[a.cgti + " .btn"] = this.receivePresent;
      return b
    },
    initialize: function(a)
    {
      this.listenTo(this.parentView, "removeChildView", this.removeView);
      this.listenTo(this.model.collection, "remove", this.removeView);
      this.listenTo(this.model, "change", this.removeView)
    },
    render: function()
    {
      var b = this.model.toJSON(),
        c;
      "CARD" === b.presentType && (c = b.card);
      this.$el.html(this.template(
      {
        model: b,
        card: c,
        userName: a.storage.user.get("loginName")
      }));
      this.itemImgPartsView = new k(
      {
        model: b,
        type: b.presentType
      });
      this.el.appendChild(this.itemImgPartsView.render().el);
      return this
    },
    receivePresent: function(b)
    {
      b.preventDefault();
      if (!a.isScrolled())
      {
        a.androidKeyStop = !0;
        var d = this,
          e = !1;
        1 == a.doc.getElementsByClassName("present").length && (e = !0);
        b = {};
        b.presentId = [this.model.toJSON().id];
        a.toastStop = !0;
        h.ajaxPost(a.linkList.receivePresent, b, function(b)
        {
          a.responseSetStorage(b);
          var f = function()
          {
            a.toastStop = !1;
            a.toastTriggerAppear();
            new a.PopupClass(
            {
              popupId: "successPopup",
              content: "プレゼントを1件受け取りました",
              popupType: "typeC",
              closeBtnText: "閉じる"
            });
            d.parentView.presentListUpdate(d.parentView.pageNum, e)
          };
          b.gachaAnimation && !window.isBrowser ? ($("#commandDiv").on("nativeCallback", function()
          {
            $("#commandDiv").off();
            c.startBgm(a.settingBgm);
            setTimeout(function()
            {
              c.setWebView(!0);
              a.androidKeyStop = !1;
              a.ready.target.className = "readyFadeOut";
              c.changeBg("web_common.ExportJson");
              f()
            }, 50)
          }), $(a.ready.target).on("webkitAnimationEnd", function()
          {
            c.stopBgm();
            c.changeBg("web_black.jpg");
            $(a.ready.target).off();
            $(a.ready.target).on("webkitAnimationEnd", function(b)
            {
              "readyFadeOut" == b.originalEvent.animationName && (a.ready.target.className = "")
            });
            setTimeout(function()
            {
              c.setWebView(!1);
              c.startPresentAnimation(
              {
                gachaAnimation: b.gachaAnimation
              })
            }, 500)
          }), a.addClass(a.ready.target, "preNativeFadeIn")) : (a.androidKeyStop = !1, f())
        })
      }
    },
    removeView: function()
    {
      this.itemImgPartsView && this.itemImgPartsView.removeView();
      this.off();
      this.remove()
    }
  })
});
