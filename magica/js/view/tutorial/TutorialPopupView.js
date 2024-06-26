define("underscore backbone backboneCommon ajaxControl command text!template/tutorial/TutorialNavi.html".split(" "), function(e, f, a, h, k, g)
{
  return f.View.extend(
  {
    id: "naviCarousel",
    className: "show",
    events: function()
    {
      var b = {};
      b[a.cgti + " .arrow"] = this.carousel;
      b[a.cgti + " #eventDetailBtn"] = this.openEventDetail;
      return b
    },
    initialize: function(a)
    {
      this.cnt = 0;
      this.model = a;
      this.limit = this.model.imgArr.length;
      this.template = e.template(g);
      this.windowWidth = 1024
    },
    render: function()
    {
      this.$el.html(this.template(
      {
        model: this.model,
        elmsize: this.windowWidth
      }));
      2 <= this.limit && (a.removeClass(this.el.querySelector("#naviCarousel .right"), "hide"), a.removeClass(this.el.querySelector("#naviCarousel .indicatorWrap"), "hide"), a.addClass(this.el.querySelectorAll("#naviCarousel .indiIcon")[0], "on"), this.el.querySelector("#naviCarousel .imgWrap").style.cssText = "width: " + this.windowWidth * this.limit + "px;-webkit-transform: translateX(" + this.prm + ");");
      return this
    },
    openEventDetail: function(b)
    {
      b.preventDefault();
      a.isScrolled() || (a.g_popup_instance.remove(), this.announceOpen(b))
    },
    announceOpen: function(b)
    {
      a.tapBlock(!0);
      var c = this,
        d = 6E4 * ((new Date).getTime() / 6E4 | 0);
      require(["js/view/system/AnnounceView", "text!template/user/AnnouncePopupTemp.html", "text!json/event_banner/event_banner.json?bust=" + d, "text!json/announcements/announcements.json?bust=" + d], function(d, e, f, g)
      {
        new a.PopupClass(
        {
          title: "お知らせ",
          exClass: "announcementPopup",
          announce: !0
        }, e, function()
        {
          setTimeout(function()
          {
            a.tapBlock(!1)
          }, 500)
        }, function()
        {
          c.announceView && c.announceView.trigger("removeView")
        });
        c.announceView = new d(
        {
          bannerJson: f,
          announcementJson: g,
          targetEvent: Number(b.currentTarget.dataset.eventid)
        })
      })
    },
    carousel: function(b)
    {
      b.preventDefault();
      if (!a.isScrolled())
      {
        var c = a.doc.querySelector("#naviCarousel .imgWrap");
        b.currentTarget.classList.contains("right") ? this.cnt + 1 < this.limit && this.cnt++ : 0 <= this.cnt - 1 && this.cnt--;
        this.prm = this.cnt * -this.windowWidth + "px";
        c.style.cssText = "width: " + this.windowWidth * this.limit + "px;-webkit-transform: translateX(" + this.prm + ");";
        0 == this.cnt ? a.addClass(a.doc.querySelector("#naviCarousel .left"), "hide") : a.removeClass(a.doc.querySelector("#naviCarousel .left"), "hide");
        this.cnt + 1 == this.limit ? a.addClass(a.doc.querySelector("#naviCarousel .right"), "hide") : a.removeClass(a.doc.querySelector("#naviCarousel .right"), "hide");
        a.removeClass(a.doc.querySelector("#naviCarousel .indiIcon.on"), "on");
        a.addClass(a.doc.querySelectorAll("#naviCarousel .indiIcon")[this.cnt], "on")
      }
    },
    removeView: function()
    {
      this.model.callback && this.model.callback();
      this.off();
      this.remove()
    }
  })
});
