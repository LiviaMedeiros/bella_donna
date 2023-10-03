define("underscore backbone backboneCommon ajaxControl command cardUtil text!template/chara/CharaDetail.html".split(" "), function(h, m, a, k, e, l, n)
{
  return m.View.extend(
  {
    id: "cardDetail",
    events: function()
    {
      var b = {};
      b[a.cgti + " #detailCardImage .cardImg"] = this.cardZoom;
      b[a.cgti + " #detailCardImage .zoomImg img"] = this.cardZoom;
      b[a.cgti + " #detailCardImage .zoomImg .textToggleBtn"] = this.zoomProfileToggle;
      b[a.cgti + " #detailTab li"] = this.tabChange;
      b[a.cgti + " .collectionBack"] = this.detailClose;
      b[a.cgti + " .cardIllustWrap .mb_pink"] = this.visualChangeCard;
      b[a.cgti + " .miniCharaBtn .mb_pink"] = this.visualChangeCommand;
      b[a.cgti + " .voicePlayBtn"] = this.playVoice;
      b[a.cgti + " .moviePlayBtn"] = this.charaMoviewPlay;
      b[a.cgti + " .live2dChangeBtn"] = this.live2dChange;
      return b
    },
    initialize: function(a)
    {
      this.template = h.template(n);
      this.live2dId = this.model.get("live2dId");
      this.visualSetFlag = this.live2dSetFlag = !1;
      this.displayCardId = this.model.get("displayCardId");
      this.commandVisualType = this.model.get("commandVisualType");
      this.commandVisualId = this.model.get("commandVisualId")
    },
    render: function()
    {
      var b = [];
      if (this.model.toJSON().supportFlag || this.model.toJSON().isShop || !a.storage.userCharaEnhancementCellList) this.model.toJSON().supportFlag && this.model.toJSON().emotionSkillList && (b = this.model.toJSON().emotionSkillList);
      else
      {
        var c = a.storage.userCharaEnhancementCellList.where(
        {
          charaId: this.model.toJSON().charaId | 0
        });
        h.each(c, function(a)
        {
          a = a.toJSON();
          if (a.charaEnhancementCell.enhancementType) switch (a.charaEnhancementCell.enhancementType)
          {
            case "SKILL":
            case "ABILITY":
              b.push(a.charaEnhancementCell.emotionSkill)
          }
        })
      }
      c = a.getTargetComposeAttribute(
      {
        attributeId: this.model.toJSON().card.attributeId
      });
      this.model.toJSON().supportFlag && (c = a.getTargetComposeAttribute(
      {
        attributeId: this.model.toJSON().card.attributeId,
        userStatusList: this.model.toJSON().userStatusList
      }));
      this.$el.html(this.template(
      {
        model: this.model.toJSON(),
        enhance: b,
        composeAttribute: c
      }));
      if (this.model.toJSON().supportFlag || this.model.toJSON().isShop) a.addClass(this.el.querySelector('[data-type="setting"]'), "off"), this.el.querySelector(".composeLinks").style.display = "none";
      this.model.toJSON().initTabType && (c = '[data-type="' + this.model.toJSON().initTabType + '"]', this.el.querySelector("#cardDetailWrap").className = this.model.toJSON().initTabType, a.removeClass(this.el.querySelector("#detailTab .current"), "current"), a.addClass(this.el.querySelector(c), "current"));
      return this
    },
    cardZoom: function(b)
    {
      b.preventDefault();
      a.isScrolled() || (a.doc.querySelector("#detailCardImage").classList.toggle("zoom"), 1024 !== a.displayWidth && a.doc.querySelector("#detailCardImage").classList.contains("zoom") ? a.doc.querySelector("#detailCardImage .zoomImg").style = "top: -webkit-calc(50% + 16px - 440px);" : a.doc.querySelector("#detailCardImage .zoomImg").style = "")
    },
    zoomProfileToggle: function(b)
    {
      b.preventDefault();
      a.isScrolled() || (a.doc.querySelector(".zoomProfile").classList.toggle("show"), -1 !== a.doc.querySelector(".textToggleBtn").textContent.indexOf("OFF") ? a.doc.querySelector(".textToggleBtn").textContent = "プロフィールON" : a.doc.querySelector(".textToggleBtn").textContent = "プロフィールOFF")
    },
    tabChange: function(b)
    {
      a.doc.querySelector("#cardDetailWrap").className = b.currentTarget.dataset.type;
      a.removeClass(b.currentTarget.parentNode.querySelector(".current"), "current");
      a.addClass(b.currentTarget, "current");
      a.scrollRefresh(null, null, !0)
    },
    detailClose: function(b)
    {
      if (b && (b.preventDefault(), a.isScrolled())) return;
      e.stopVoice();
      this.live2dSetFlag && this.live2dSet();
      this.visualSetFlag ? this.visualSet(this.model.toJSON().closeEvent) : this.model.toJSON().closeEvent && this.model.toJSON().closeEvent();
      this.remove();
      h.each(a.doc.querySelector("#baseContainer").children, function(b)
      {
        a.removeClass(b, "hide")
      });
      "CharaListCustomize" != a.location && "CharaListComposeAttribute" != a.location || a.addClass(a.doc.querySelector("#richeWrap"), "hide");
      a.androidKeyStop = !1;
      a.detailView = null
    },
    visualChangeCard: function(b)
    {
      b.preventDefault();
      if (!a.isScrolled() && (b = b.currentTarget, !b.classList.contains("off") && !b.classList.contains("selected")))
      {
        a.removeClass(a.doc.querySelector(".cardIllustWrap .selected"), "selected");
        a.addClass(b, "selected");
        this.visualSetFlag || (this.visualSetFlag = !0);
        b = this.model.get("cardArr")[b.dataset.cardarrindex];
        var c = a.doc.querySelector("#detailCardImage .cardImg"),
          f = a.doc.querySelector("#detailCardImage .zoomImg img");
        c.dataset.nativeimgkey = "card_" + b.cardId + "_c";
        c.dataset.src = "resource/image_native/card/image/card_" + b.cardId + "_c.png";
        f.dataset.nativeimgkey = "card_" + b.cardId + "_c";
        f.dataset.src = "resource/image_native/card/image/card_" + b.cardId + "_c.png";
        e.getBaseData(a.getNativeObj());
        this.displayCardId = b.cardId
      }
    },
    visualChangeCommand: function(b)
    {
      var c, f, d;
      b.preventDefault();
      if (!a.isScrolled() && (d = b.currentTarget, !d.classList.contains("off") && !d.classList.contains("selected")))
      {
        a.removeClass(a.doc.querySelector(".miniCharaBtn .selected"), "selected");
        a.addClass(d, "selected");
        this.visualSetFlag || (this.visualSetFlag = !0);
        "chara" == d.dataset.commandtype ? (b = "CHARA", c = "mini/image/", f = "mini_" + this.model.toJSON().card.miniCharaNo + "_d", d = Number(this.model.toJSON().card.miniCharaNo)) : (b = "CARD", c = "card/image/", f = "card_" + this.model.get("cardArr")[d.dataset.cardarrindex].cardId + "_d", d = Number(this.model.get("cardArr")[d.dataset.cardarrindex].cardId));
        var g = a.doc.querySelectorAll(".discPreview .discWrap img");
        h.each(g, function(a)
        {
          a.dataset.nativeimgkey = f;
          a.dataset.src = "resource/image_native/" + c + f + ".png"
        });
        e.getBaseData(a.getNativeObj());
        this.commandVisualType = b;
        this.commandVisualId = d
      }
    },
    visualSet: function(b)
    {
      var c = !1,
        f = this.model.toJSON(),
        d = function(c)
        {
          a.responseSetStorage(c);
          var g = c.userCardList ? c.userCardList[0] : a.storage.userCardList.findWhere(
          {
            id: f.userCardId
          }).toJSON();
          c = c.userCharaList ? c.userCharaList[0] : a.storage.userCharaList.findWhere(
          {
            charaId: f.charaId
          }).toJSON();
          g = l.addExStatus($.extend(g, c));
          a.storage.userCardListEx && (c = a.storage.userCardListEx.findWhere(
          {
            id: f.id
          })) && (c.clear(
          {
            silent: !0
          }), c.set(g));
          b && b();
          a.pageObj && a.pageObj.charaDetailClose && a.pageObj.charaDetailClose()
        },
        g = {};
      g.charaId = this.model.get("charaId");
      g.commandVisualType = this.commandVisualType;
      g.commandVisualId = this.commandVisualId;
      g.displayCardId = this.displayCardId;
      this.model.get("commandVisualType") !== this.commandVisualType && (c = !0);
      this.model.get("commandVisualId") !== this.commandVisualId && (c = !0);
      this.model.get("displayCardId") !== this.displayCardId && (c = !0);
      c ? k.ajaxPost(a.linkList.userCharaVisualize, g, d) : b && b()
    },
    live2dSet: function()
    {
      var b = !1,
        c = this.model.toJSON(),
        f = function(b)
        {
          a.responseSetStorage(b);
          var d = b.userCardList ? b.userCardList[0] : a.storage.userCardList.findWhere(
          {
            id: c.userCardId
          }).toJSON();
          b = b.userCharaList ? b.userCharaList[0] : a.storage.userCharaList.findWhere(
          {
            charaId: c.charaId
          }).toJSON();
          d = l.addExStatus($.extend(d, b));
          b = a.storage.userCardListEx.findWhere(
          {
            id: c.id
          });
          b.clear(
          {
            silent: !0
          });
          b.set(d)
        },
        d = {};
      d.charaId = this.model.get("charaId");
      d.live2dId = this.live2dId;
      this.model.get("live2dId") !== this.live2dId && (b = !0);
      b && k.ajaxPost(a.linkList.live2dSet, d, f)
    },
    charaMoviewPlay: function(b)
    {
      b.preventDefault();
      if (!a.isScrolled())
      {
        e.stopVoice();
        a.androidKeyStop = !0;
        var c = this.model.toJSON().charaId;
        $(a.ready.target).on("webkitAnimationEnd", function()
        {
          e.changeBg("web_black.jpg");
          $(a.ready.target).off();
          a.pageObj && a.pageObj.beforeMovieStart && a.pageObj.beforeMovieStart();
          $(a.ready.target).on("webkitAnimationEnd", function(b)
          {
            "readyFadeOut" == b.originalEvent.animationName && (a.ready.target.className = "")
          });
          $("#commandDiv").on("nativeCallback", function(b, c)
          {
            a.androidKeyStop = !1;
            a.ready.target.className = "nativeFadeOut";
            e.startBgm(a.bgm);
            e.changeBg(a.background);
            e.setWebView();
            $("#commandDiv").off();
            a.pageObj && a.pageObj.afterMovieEnd && a.pageObj.afterMovieEnd()
          });
          setTimeout(function()
          {
            e.setWebView(!1);
            e.stopBgm();
            e.playCharaMovie(c)
          }, 500)
        });
        a.addClass(a.ready.target, "preNativeFadeIn")
      }
    },
    playVoice: function(b)
    {
      b.preventDefault();
      a.isScrolled() || (e.stopVoice(), b = "vo_char_" + this.model.toJSON().charaId + "_00_01", e.startVoice(b))
    },
    live2dChange: function(b)
    {
      b.preventDefault();
      a.isScrolled() || (this.live2dSetFlag = !0, a.removeClass(a.doc.querySelector(".live2dBtns .current"), "current"), a.addClass(b.currentTarget, "current"), this.live2dId = b.currentTarget.dataset.live2did)
    }
  })
});
