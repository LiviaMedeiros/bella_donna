define("underscore backbone backboneCommon ajaxControl command text!template/collection/CharaCollectionDetail.html".split(" "), function(k, l, a, p, d, m)
{
  var h = function(b, f, e)
    {
      var c = {};
      c.id = String(b.charaId + (e || "00"));
      c.x = !b.chara.doubleUnitFlg || b.chara.doubleUnitFlg && e && "00" !== e ? 250 : 400;
      c.y = 1024 === a.displayWidth ? Math.floor(a.doc.getElementsByTagName("body")[0].offsetHeight / 2) : Math.ceil(a.shortSize / 2);
      !b.chara.doubleUnitFlg || e && "00" !== e || (c.subId = b.chara.doubleUnitLive2dDetail, c.subX = -80, c.subY = 0);
      f ? (c.voice = f, c.key = f, d.storyMotionL2dVoice(c)) : (c.type = 1, c.key = "idle", d.endL2d(), c.txtVisible = !0, d.startL2d(c))
    },
    n = function(b, a)
    {
      var e;
      a.live2dList.filter(function(a, d)
      {
        0 <= a.live2dId.indexOf(b) && (e = a)
      });
      return e
    };
  return l.View.extend(
  {
    id: "cardDetail",
    events: function()
    {
      var b = {};
      b[a.cgti + " #detailCardImage .cardImg"] = this.cardZoom;
      b[a.cgti + " #detailCardImage .zoomImg"] = this.cardZoom;
      b[a.cgti + " #detailTab li"] = this.tabChange;
      b[a.cgti + " .collectionBack"] = this.detailClose;
      b[a.cgti + " .voiceBtn"] = this.voiceStart;
      b[a.cgti + " .cardIllustWrap .mb_pink"] = this.visualChangeCard;
      b[a.cgti + " .miniCharaBtn .mb_pink"] = this.visualChangeCommand;
      b[a.cgti + " .moviePlayBtn"] = this.charaMoviewPlay;
      b[a.cgti + " .live2dChangeBtn"] = this.live2dChange;
      b[a.cgti + " .voicePlayBtn"] = this.playVoice;
      b[a.cgti + " .moviePlayBtn"] = this.charaMoviewPlay;
      b[a.cgti + " .fullScreenEnd"] = this.finishFullScreen;
      b[a.cgti + " .voiceCheck"] = this.voiceCheck;
      return b
    },
    initialize: function(b)
    {
      a.androidKeyStop = !0;
      this.live2dId = "00";
      this.template = k.template(m);
      b = this.model.toJSON().currentCard;
      if (b = n(this.live2dId, b)) this.voicePrefixNo = b.voicePrefixNo, this.voiceFullScreen = !1
    },
    render: function()
    {
      this.$el.html(this.template(
      {
        model: this.model.toJSON()
      }));
      return this
    },
    cardZoom: function(b)
    {
      b.preventDefault();
      a.isScrolled() || a.doc.querySelector("#detailCardImage").classList.toggle("zoom")
    },
    tabChange: function(b)
    {
      var f = b.currentTarget.dataset.type;
      a.doc.querySelector("#cardDetailWrap").className = f;
      "illust" == f ? (h(this.model.toJSON(), null, this.live2dId), a.addClass(a.doc.querySelector("#detailCardImage"), "hide")) : (d.endL2d(), a.removeClass(a.doc.querySelector(".voiceBtn.current"), "current"), a.removeClass(a.doc.querySelector("#detailCardImage"), "hide"));
      a.removeClass(b.currentTarget.parentNode.querySelector(".current"), "current");
      a.addClass(b.currentTarget, "current");
      a.scrollRefresh(null, null, !0)
    },
    detailClose: function(b)
    {
      if (b && (b.preventDefault(), a.isScrolled())) return;
      d.endL2d();
      d.stopVoice();
      this.remove();
      a.removeClass(a.doc.querySelector("#mainContent"), "hide");
      a.removeClass(a.doc.querySelector("#globalMenuContainer"), "hide");
      a.androidKeyStop = !1;
      a.scrollRefresh()
    },
    voiceStart: function(b)
    {
      b.preventDefault();
      if (!a.isScrolled())
      {
        var f = this.model.toJSON().charaId,
          e = "vo_char_" + f + "_" + this.voicePrefixNo + "_" + b.currentTarget.dataset.voice;
        d.stopVoice();
        var c = !1;
        this.model.toJSON().chara.doubleUnitFlg && "00" == this.live2dId && (c = !0);
        var g = this.model.toJSON().chara.doubleUnitFlg && "88" == this.live2dId;
        this.voiceFullScreen ? (a.doc.getElementById("charaVoice").getElementsByClassName("current")[0] && a.removeClass(a.doc.getElementById("charaVoice").getElementsByClassName("current")[0]), a.addClass(a.doc.getElementById("cardDetail"), "showLive2dFullscreen"), a.tapBlock(!0), a.androidKeyStop = !0, b = {}, b.id = String(f + this.live2dId), b.key = g ? "idle" : e, b.type = g ? 1 : 0, b.x = c ? Math.floor(a.doc.getElementsByTagName("body")[0].offsetWidth / 2) + 180 : Math.floor(a.doc.getElementsByTagName("body")[0].offsetWidth / 2), b.y = 1024 === a.displayWidth ? Math.floor(a.doc.getElementsByTagName("body")[0].offsetHeight / 2) : Math.ceil(a.shortSize / 2), c && (b.subId = this.model.toJSON().chara.doubleUnitLive2dDetail, b.subX = -60, b.subY = 0), b.txtVisible = !0, d.startL2d(b), g && setTimeout(function()
        {
          d.startVoice(e)
        }, 200), setTimeout(function()
        {
          a.tapBlock(!1)
        }, 500)) : (a.removeClass(a.doc.querySelector(".voiceBtn.current"), "current"), a.addClass(b.currentTarget, "current"), g ? d.startVoice(e) : (c = {}, c.id = String(f + this.live2dId), c.voice = e, d.storyMotionL2dVoice(c)))
      }
    },
    finishFullScreen: function(b)
    {
      b.preventDefault();
      a.isScrolled() || (a.removeClass(a.doc.getElementById("cardDetail"), "showLive2dFullscreen"), a.androidKeyStop = !1, h(this.model.toJSON(), null, this.live2dId))
    },
    voiceCheck: function(b)
    {
      b.preventDefault();
      a.isScrolled() || (this.voiceFullScreen ? (a.removeClass(b.currentTarget, "on"), this.voiceFullScreen = !1) : (a.addClass(b.currentTarget, "on"), this.voiceFullScreen = !0))
    },
    visualChangeCard: function(b)
    {
      b.preventDefault();
      if (!a.isScrolled() && (b = b.currentTarget, !b.classList.contains("off") && !b.classList.contains("selected")))
      {
        a.removeClass(a.doc.querySelector(".cardIllustWrap .selected"), "selected");
        a.addClass(b, "selected");
        b = this.model.get("cardList")[b.dataset.cardarrindex];
        var f = a.doc.querySelector("#detailCardImage .cardImg"),
          e = a.doc.querySelector("#detailCardImage .cardFrame"),
          c = a.doc.querySelector("#detailCardImage .zoomImg img"),
          g = "frame_" + b.card.attributeId.toLowerCase() + "_" + b.card.rank.toLowerCase();
        f.dataset.nativeimgkey = "card_" + b.cardId + "_c";
        f.dataset.src = "resource/image_native/card/image/card_" + b.cardId + "_c.png";
        c.dataset.nativeimgkey = "card_" + b.cardId + "_c";
        c.dataset.src = "resource/image_native/card/image/card_" + b.cardId + "_c.png";
        e.dataset.nativebgkey = g;
        e.dataset.src = "resource/image_native/card/frame/" + g + ".png";
        d.getBaseData(a.getNativeObj());
        a.doc.querySelector(".illustrator").textContent = b.card.illustrator;
        a.doc.querySelector(".illustTitle").textContent = "★" + b.rankNum + "イラスト"
      }
    },
    visualChangeCommand: function(b)
    {
      var f, e;
      b.preventDefault();
      a.isScrolled() || (b = b.currentTarget, b.classList.contains("off") || b.classList.contains("selected") || (a.removeClass(a.doc.querySelector(".miniCharaBtn .selected"), "selected"), a.addClass(b, "selected"), "chara" == b.dataset.commandtype ? (f = "mini/image/", e = "mini_" + this.model.toJSON().currentCard.card.miniCharaNo + "_d", this.model.toJSON()) : (f = "card/image/", e = "card_" + this.model.get("cardList")[b.dataset.cardarrindex].cardId + "_d", this.model.get("cardList")), b = a.doc.querySelectorAll(".discPreview .discWrap img"), k.each(b, function(a)
      {
        a.dataset.nativeimgkey = e;
        a.dataset.src = "resource/image_native/" + f + e + ".png"
      }), d.getBaseData(a.getNativeObj())))
    },
    live2dChange: function(b)
    {
      b.preventDefault();
      a.isScrolled() || (a.removeClass(a.doc.querySelector(".live2dBtns .current"), "current"), a.addClass(b.currentTarget, "current"), this.live2dId = b.currentTarget.dataset.live2did, h(this.model.toJSON(), null, this.live2dId))
    },
    charaMoviewPlay: function(b)
    {
      b.preventDefault();
      if (!a.isScrolled())
      {
        a.androidKeyStop = !0;
        d.stopVoice();
        var f = this.model.toJSON().charaId;
        $(a.ready.target).on("webkitAnimationEnd", function()
        {
          d.changeBg("web_black.jpg");
          $(a.ready.target).off();
          $(a.ready.target).on("webkitAnimationEnd", function(b)
          {
            "readyFadeOut" == b.originalEvent.animationName && (a.ready.target.className = "")
          });
          $("#commandDiv").on("nativeCallback", function(b, c)
          {
            a.androidKeyStop = !1;
            a.ready.target.className = "nativeFadeOut";
            d.startBgm(a.bgm);
            d.changeBg(a.background);
            d.setWebView();
            $("#commandDiv").off()
          });
          setTimeout(function()
          {
            d.setWebView(!1);
            d.stopBgm();
            d.playCharaMovie(f)
          }, 500)
        });
        a.addClass(a.ready.target, "preNativeFadeIn")
      }
    },
    playVoice: function(b)
    {
      b.preventDefault();
      a.isScrolled() || (d.stopVoice(), b = "vo_char_" + this.model.toJSON().charaId + "_00_01", d.startVoice(b))
    }
  })
});
