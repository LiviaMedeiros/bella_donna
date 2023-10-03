define("underscore backbone backboneCommon ajaxControl command text!template/campaign/gacha_lineup/CampaignGachaLineUp.html text!css/campaign/gacha_lineup/CampaignGachaLineUp.css".split(" "), function(f, m, b, g, e, n, p)
{
  m.Model.extend();
  var h, k, q = function()
  {
    var c = m.View.extend(
    {
      events: function()
      {
        var a = {};
        a[b.cgti + " #leftArrow"] = this.changeForcus;
        a[b.cgti + " #rightArrow"] = this.changeForcus;
        a[b.cgti + " #listPopupBtn"] = this.listPopup;
        a["touchstart #CampaignGachaLineUp"] = this.swipeStart;
        a["touchmove #CampaignGachaLineUp"] = this.swipeing;
        a["touchend #CampaignGachaLineUp"] = this.swipeEnd;
        return a
      },
      initialize: function(a)
      {
        k = g.getPageJson();
        f.findWhere(k.campaignList,
        {
          campaignType: "GACHA_LINEUP"
        }) ? (this.template = f.template(n), this.createDom()) : location.href = "#/MyPage"
      },
      render: function()
      {
        this.$el.html(this.template(
        {
          gachaList: this.gachaList,
          campaign: this.campaignModel
        }));
        return this
      },
      createDom: function()
      {
        this.gachaList = [];
        this.campaignModel = f.findWhere(k.campaignList,
        {
          campaignType: "GACHA_LINEUP"
        });
        for (var a = this.campaignModel.parameterMap.GACHA_ID_LIST.split(","),
            c = this.campaignModel.parameterMap.GACHA_CARD_ID_LIST.split(","), d = 0; d < a.length; d++)
        {
          var l = {};
          l.gachaId = a[d];
          l.cardId = c[d];
          this.gachaList.push(l)
        }
        console.log("this.gachaList", this.gachaList);
        b.content.append(this.render().el);
        this.currentForcus = 0;
        this.scrollDomWith = 134 * (this.gachaList.length - 1) + 184;
        console.log(this.scrollDomWith);
        5 < this.gachaList.length && (this.scrollDomWith += 536, a = 0 === this.gachaList.length % 2 ? -(this.scrollDomWith / 2) + 358 - 67 : -(this.scrollDomWith / 2) + 358, b.doc.getElementsByClassName("btnWrapInner")[0].style = "width:" + this.scrollDomWith + "px;-webkit-transform:translateX(" + a + "px)");
        b.setGlobalView();
        e.getBaseData(b.getNativeObj());
        b.ready.hide()
      },
      changeForcus: function(a, c)
      {
        var d = 2,
          e = 0 === this.currentForcus % 2 ? 1 : -1;
        if (a)
        {
          a.preventDefault();
          if (b.isScrolled()) return;
          d = 0 === this.currentForcus && "leftArrow" === a.currentTarget.id ? 1 : d * e * ("leftArrow" === a.currentTarget.id ? -1 : 1)
        }
        else d = "left" === c && 0 === this.currentForcus ? 1 : d * e * ("left" === c ? -1 : 1);
        b.removeClass(b.doc.getElementById("cardImage" + this.gachaList[this.currentForcus].gachaId), "show");
        b.removeClass(b.doc.getElementById("btnImage" + this.gachaList[this.currentForcus].gachaId), "forcus");
        this.currentForcus += d;
        this.currentForcus === this.gachaList.length ? this.currentForcus = this.gachaList.length - 1 : this.currentForcus === this.gachaList.length + 1 ? this.currentForcus = this.gachaList.length - 2 : 0 > this.currentForcus && (this.currentForcus = 0);
        b.addClass(b.doc.getElementById("cardImage" + this.gachaList[this.currentForcus].gachaId), "show");
        b.addClass(b.doc.getElementById("btnImage" + this.gachaList[this.currentForcus].gachaId), "forcus");
        720 < this.scrollDomWith && (a = 0 === this.currentForcus || 0 === this.currentForcus % 2 ? -134 : 134, c = this.gachaList.length, console.log("this.currentForcus", this.currentForcus), console.log("(calcX * Math.ceil(this.currentForcus/2)", a * Math.ceil(this.currentForcus / 2)), a = 0 === c % 2 ? -(this.scrollDomWith / 2) + 358 - 67 + a * Math.ceil(this.currentForcus / 2) : -(this.scrollDomWith / 2) + 358 + a * Math.ceil(this.currentForcus / 2), b.doc.getElementsByClassName("btnWrapInner")[0].style = "width:" + this.scrollDomWith + "px;-webkit-transform:translateX(" + a + "px)")
      },
      listPopup: function(a)
      {
        a.preventDefault();
        b.isScrolled() || (a = $("#listPopTemp").text(), new b.PopupClass(
        {
          popupType: "typeB",
          exClass: "gachaLineupPop",
          gachaList: this.gachaList,
          campaignId: this.campaignModel.id
        }, a, function()
        {
          b.scrollSet("scrollOuter", "scrollInner")
        }))
      },
      swipeStart: function(a)
      {
        this.touching = !0;
        this.touchPoint = a.originalEvent.changedTouches[0].clientX
      },
      swipeing: function(a)
      {
        if (this.touching && (a = a.originalEvent.changedTouches[0].clientX - this.touchPoint, !(250 > a && -250 < a)))
        {
          this.touching = !1;
          e.startSe(1002);
          var b = "right";
          250 < a && (b = "left");
          this.changeForcus(null, b)
        }
      },
      swipeEnd: function(a)
      {
        this.touching && (this.touching = !1)
      },
      removeFunc: function(a)
      {
        console.log("remove");
        this.off();
        this.remove();
        a && a()
      }
    });
    b.setStyle(p);
    h = new c
  };
  return {
    needModelIdObj: [
    {
      id: "user"
    },
    {
      id: "gameUser"
    },
    {
      id: "userStatusList"
    },
    {
      id: "userItemList"
    },
    {
      id: "userPatrolList"
    }],
    fetch: function(b, a)
    {
      g.pageModelGet(this.needModelIdObj)
    },
    init: function()
    {
      q()
    },
    startCommand: function()
    {
      var c = g.getPageJson();
      f.findWhere(c.campaignList,
      {
        campaignType: "GACHA_LINEUP"
      }) ? (c = f.findWhere(c.campaignList,
      {
        campaignType: "GACHA_LINEUP"
      }).parameterMap.BG_IMG) ? e.changeBg(c + ".ExportJson") : e.changeBg("web_cp_1078_01.ExportJson") : e.changeBg("web_cp_1078_01.ExportJson");
      e.startBgm(b.settingBgm)
    },
    remove: function(b)
    {
      h ? h.removeFunc(b) : b()
    }
  }
});
