define("underscore backbone backboneCommon ajaxControl text!template/base/MypageBanner.html command".split(" "), function(g, k, a, h, l, m)
{
  return k.View.extend(
  {
    events: function()
    {
      var b = {};
      b["touchstart .mypageBanner"] = this.bannerTouch;
      b["touchmove .mypageBanner"] = this.bannerMoving;
      b["touchend .mypageBanner"] = this.bannerTouchend;
      b["webkitTransitionEnd .mypageBanner"] = this.bannerAnimation;
      b["webkitAnimationEnd .mypageBanner"] = this.bannerAnimation;
      b["webkitanimationend .mypageBanner"] = this.bannerAnimation;
      b["animationend .mypageBanner"] = this.bannerAnimation;
      b[a.cgti + " .bannerPassport"] = this.passPortBanner;
      b[a.cgti + " .announceOpen"] = this.announceOpen;
      b[a.cgti + " .mypageBannerOuterlink"] = this.outerLink;
      b[a.cgti + " .lot2019"] = this.lotPop;
      return b
    },
    initialize: function(b)
    {
      this.model = JSON.parse(b);
      this.lot2019 = a.storage.gameUser.toJSON().lotCode2019 ? a.storage.gameUser.toJSON().lotCode2019 : "";
      this.template = g.template(l);
      this.campaignBannerMake()
    },
    render: function()
    {
      var b = {},
        c = Date.parse(h.getPageJson().currentTime),
        d = (new Date(c)).getDay();
      b.week = d;
      d = a.storage.gameUser ? a.storage.gameUser.toJSON() : h.getPageJson().gameUser;
      if (d.passportExpiredAt)
      {
        var e = Math.floor((Date.parse(d.passportExpiredAt) - c) / 1E3 / 60 / 60 / 24);
        b.passport = -1 < e ? !1 : !0
      }
      else b.passport = !0;
      b.passport = !1;
      d.startdashGachaExpiredAt ? (e = Math.floor(Date.parse(d.startdashGachaExpiredAt) - c), b.startDashGacha = 0 < e ? !0 : !1) : b.startDashGacha = !1;
      d.startdashMemoriaGachaExpiredAt ? (e = Math.floor(Date.parse(d.startdashMemoriaGachaExpiredAt) - c), b.startDashGachaMemoria = 0 < e ? !0 : !1) : b.startDashGachaMemoria = !1;
      c = g.sortBy(this.model, function(a)
      {
        return a.sortKey
      });
      this.$el.html(this.template(
      {
        model: c,
        currentTime: h.getPageJson().currentTime,
        addShow: b
      }));
      this.bannaerLength = this.el.getElementsByClassName("mypageBanner").length;
      return this
    },
    bannerTouch: function(a)
    {
      2 > this.bannaerLength || (this.swipStart = this.swiping = !0, this.touchPoint = a.originalEvent.changedTouches[0].clientX)
    },
    bannerMoving: function(b)
    {
      if (!(2 > this.bannaerLength) && this.swipStart && this.swipStart)
      {
        var c = a.doc.getElementById("mypageBanner").getElementsByClassName("mypageBanner");
        !c[this.bannerCount] || c[this.bannerCount].classList.contains("show") || c[this.bannerCount].classList.contains("hide") || c[this.bannerCount].classList.contains("showRevers") || c[this.bannerCount].classList.contains("hideRevers") || (b = b.originalEvent.changedTouches[0].clientX - this.touchPoint, 100 < b ? (this.swipStart = this.swiping = !1, a.removeClass(c[this.bannerCount], "show"), a.removeClass(c[this.bannerCount], "hide"), a.removeClass(c[this.bannerCount], "showing"), a.removeClass(c[this.bannerCount], "showRevers"), a.addClass(c[this.bannerCount], "hideRevers"), a.removeClass(a.doc.getElementById("indicatorWrap").getElementsByClassName("indiIcon")[this.bannerCount], "on"), this.bannerCount--, 0 > this.bannerCount && (this.bannerCount = this.bannaerLength - 1), a.addClass(a.doc.getElementById("indicatorWrap").getElementsByClassName("indiIcon")[this.bannerCount], "on"), a.addClass(c[this.bannerCount], "showRevers")) : -100 > b && (this.swipStart = this.swiping = !1, a.removeClass(c[this.bannerCount], "show"), a.removeClass(c[this.bannerCount], "hide"), a.removeClass(c[this.bannerCount], "showing"), a.removeClass(c[this.bannerCount], "showRevers"), a.addClass(c[this.bannerCount], "hide"), a.removeClass(a.doc.getElementById("indicatorWrap").getElementsByClassName("indiIcon")[this.bannerCount], "on"), this.bannerCount++, this.bannerCount >= this.bannaerLength && (this.bannerCount = 0), a.addClass(a.doc.getElementById("indicatorWrap").getElementsByClassName("indiIcon")[this.bannerCount], "on"), a.addClass(c[this.bannerCount], "show")))
      }
    },
    bannerTouchend: function(b)
    {
      2 > this.bannaerLength || (this.changeFlg && this.swiping && (a.removeClass(b.currentTarget, "showing"), a.addClass(b.currentTarget, "hide"), a.removeClass(a.doc.getElementById("indicatorWrap").getElementsByClassName("indiIcon")[this.bannerCount], "on"), this.bannerCount++, this.bannerCount >= this.bannaerLength && (this.bannerCount = 0), a.addClass(a.doc.getElementById("indicatorWrap").getElementsByClassName("indiIcon")[this.bannerCount], "on"), a.addClass(a.doc.getElementById("mypageBanner").getElementsByClassName("mypageBanner")[this.bannerCount], "show")), this.swipStart = this.swiping = !1)
    },
    outerLink: function(b)
    {
      b.preventDefault();
      a.isScrolled() || (b = b.currentTarget.dataset.outlink) && m.browserOpen(b)
    },
    bannerAnimation: function(b)
    {
      if (!(2 > this.bannaerLength))
      {
        this.bannerCount || (this.bannerCount = 0);
        var c = b.currentTarget.classList;
        c.contains("show") || c.contains("showRevers") ? (c.contains("show") && a.removeClass(b.currentTarget, "show"), c.contains("showRevers") && a.removeClass(b.currentTarget, "showRevers"), a.addClass(b.currentTarget, "showing")) : c.contains("showing") ? this.swiping ? this.changeFlg = !0 : (a.removeClass(b.currentTarget, "showing"), a.addClass(b.currentTarget, "hide"), a.removeClass(a.doc.getElementById("indicatorWrap").getElementsByClassName("indiIcon")[this.bannerCount], "on"), this.bannerCount++, this.bannerCount >= this.bannaerLength && (this.bannerCount = 0), a.addClass(a.doc.getElementById("indicatorWrap").getElementsByClassName("indiIcon")[this.bannerCount], "on"), a.addClass(a.doc.getElementById("mypageBanner").getElementsByClassName("mypageBanner")[this.bannerCount], "show")) : c.contains("hide") ? a.removeClass(b.currentTarget, "hide") : c.contains("hideRevers") && a.removeClass(b.currentTarget, "hideRevers")
      }
    },
    announceOpen: function(b)
    {
      b.preventDefault();
      if (!a.isScrolled())
      {
        a.tapBlock(!0);
        var c = this,
          d = 6E4 * ((new Date).getTime() / 6E4 | 0);
        require(["js/view/system/AnnounceView", "text!template/user/AnnouncePopupTemp.html", "text!json/event_banner/event_banner.json?bust=" + d, "text!json/announcements/announcements.json?bust=" + d], function(e, d, g, h)
        {
          new a.PopupClass(
          {
            title: "お知らせ",
            exClass: "announcementPopup",
            announce: !0
          }, d, function()
          {
            setTimeout(function()
            {
              a.tapBlock(!1)
            }, 500)
          }, function()
          {
            c.announceView && c.announceView.trigger("removeView")
          });
          c.announceView = new e(
          {
            bannerJson: g,
            announcementJson: h,
            firstViewNews: Number(b.currentTarget.dataset.newsid)
          })
        })
      }
    },
    campaignBannerMake: function()
    {
      var b = g.sortBy(this.model, function(a)
        {
          return a.sortKey
        }),
        c = !1,
        d = h.getPageJson().currentTime;
      g.each(b, function(b, f)
      {
        if (!c)
        {
          f = b.endAt.replace(/-/g, "/");
          var e = b.startAt.replace(/-/g, "/");
          b.showMypageSub && Date.parse(f) > Date.parse(d) && Date.parse(e) < Date.parse(d) && (f = a.doc.createElement("li"), f.className = "campaignBanner TE se_decide linkBtn", f.innerHTML = '<img src="' + b.imagePath + '_s.png">', f.dataset.href = b.bannerLink, a.doc.getElementById("sideBigBtns").appendChild(f), c = !0)
        }
      })
    },
    passPortBanner: function(b)
    {
      b.preventDefault();
      a.isScrolled() || a.globalMenuView.moneyPopup(b)
    },
    lotPop: function(b)
    {
      b.preventDefault();
      a.isScrolled() || new a.PopupClass(
      {
        title: "年末ドリームマギアくじ",
        content: 'あなたの抽選番号は<p class="c_pink" style="width:80%;font-size:30px;margin:20px auto;border:1px solid #CCC;padding:10px 0px;text-align:center">' + a.storage.gameUser.toJSON().lotCode2019 + "</p>当選者につきましては12/30放送予定の年末特別番組<br>「アニメ放送直前SP〜マギレコ夜噺〜」<br>にて発表いたします。",
        closeBtnText: "OK"
      })
    },
    removeView: function()
    {
      this.off();
      this.remove()
    }
  })
});
