define("underscore backbone backboneCommon ajaxControl command cardUtil text!template/campaign/newyear_login/NewYearLogin.html text!css/campaign/newyear_login/NewYearLogin.css".split(" "), function(h, k, c, l, d, r, n, p)
{
  k.Model.extend(
  {});
  var g, b, f, m = k.View.extend(
    {
      events: function()
      {
        var a = {};
        a["webkitTransitionEnd #NewYearLogin .animTrigger"] = this.animationTrigger;
        a["webkitAnimationEnd #NewYearLogin .animTrigger"] = this.animationTrigger;
        a["webkitanimationend #NewYearLogin .animTrigger"] = this.animationTrigger;
        a["animationend #NewYearLogin .animTrigger"] = this.animationTrigger;
        a[c.cgti + " .tweetBtn"] = this.tweetBtn;
        window.isDebug && (a[c.cgti + " .debugBtn"] = q);
        return a
      },
      initialize: function(a)
      {
        this.template = h.template(n);
        this.lotResult = a ? a.lotResult : g.lotteryResult.loginBonusCampaignLottery.typeCode;
        require(["text!js/campaign/newyear_login/json/" + b.id + ".json"], function(a)
        {
          this.model = this.createFortuneModel(a);
          this.createDom();
          c.campaignJump ? (c.addClass(c.doc.getElementById("globalMenuContainer"), "hide"), c.doc.getElementById("fortuneAnimationWrap").className = "show", setTimeout(function()
          {
            d.startSe(1004)
          }, 100), setTimeout(function()
          {
            d.startSe(1004)
          }, 200), setTimeout(function()
          {
            d.startSe(1004)
          }, 300), setTimeout(function()
          {
            d.startSe(1602)
          }, 1333), c.campaignJump = null) : this.showResultPage()
        }.bind(this))
      },
      render: function()
      {
        this.$el.html(this.template(
        {
          model: this.model,
          master: b,
          lotResult: this.lotResult,
          rewardModels: this.rewardModels
        }));
        return this
      },
      createDom: function()
      {
        c.setGlobalView();
        c.content.append(this.render().el);
        d.setWebView();
        c.ready.hide()
      },
      createFortuneModel: function(a)
      {
        var e = JSON.parse(a);
        a = g.lotteryResult;
        var e = e.omikuziList[a.loginBonusCampaignLottery.typeCode],
          d = a.textType < e.fortuneList.length ? a.textType : a.textType % e.fortuneList.length,
          b = e.charaList[(a.loginBonusCampaignLottery.loginCount - 1) % e.charaList.length];
        b.fortuneText = e.fortuneList[d].replace(/＠/g, "<br>");
        b.message = b.message.replace(/＠/g, "<br>");
        b.tweetImgId = e.tweetImgIdList[d];
        b.rewardModels = [];
        a = a.loginBonusCampaignLottery.rewardCodes.split(",");
        h.each(a, function(a)
        {
          b.rewardModels.push(c.itemSet(a))
        });
        return b
      },
      animationTrigger: function()
      {
        var a = c.doc.getElementById("fortuneAnimationWrap"),
          e = c.doc.getElementById("resultAnimationWrap");
        if (a.classList.contains("show"))
        {
          a.className = "";
          e.className = "show type" + this.lotResult;
          var b;
          switch (this.lotResult)
          {
            case 0:
              b = 1111;
              break;
            case 1:
              b = 1106;
              break;
            case 2:
              b = 1105;
              break;
            case 3:
              b = 1104
          }
          setTimeout(function()
          {
            d.startSe(b)
          }, 100);
          setTimeout(function()
          {
            e.className = "";
            this.showResultPage()
          }.bind(this), 2916.666)
        }
      },
      showResultPage: function()
      {
        if (c.doc.getElementById("resultPageWrap"))
        {
          c.doc.getElementById("resultPageWrap").className = "show";
          var a = this.model.oneshotId;
          if (a)
          {
            d.endL2d();
            var b = {};
            b.key = String(a);
            b.type = 1;
            b.id = "0";
            b.x = 226;
            b.y = 1024 === c.displayWidth ? Math.floor(c.doc.getElementsByTagName("body")[0].offsetHeight / 2) : Math.ceil(c.shortSize / 2);
            d.startL2d(b)
          }
        }
        c.removeClass(c.doc.getElementById("globalMenuContainer"), "hide")
      },
      tweetBtn: function(a)
      {
        a.preventDefault();
        if (!c.isScrolled())
        {
          a = " ★水名神社で開運おみくじ★%0aマギアレコードではログインボーナスを開催中！%0a pic.twitter.com/" + this.model.tweetImgId;
          a = encodeURI(a).replace(/%250a/g, "%0a");
          var b = encodeURI("マギレコ,水名神社で開運おみくじ");
          d.browserOpen("https://twitter.com/share?text=" + a + "%0a&hashtags=" + b + "&count=none&lang=ja")
        }
      }
    }),
    q = function(a)
    {
      a.preventDefault();
      c.isScrolled() || (c.campaignJump = !0, f.remove(), d.endL2d(), f = null, f = new m(
      {
        lotResult: parseInt(a.currentTarget.dataset.type)
      }))
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
      id: "userItemList"
    },
    {
      id: "userStatusList"
    },
    {
      id: "giftList"
    },
    {
      id: "itemList"
    },
    {
      id: "pieceList"
    },
    {
      id: "userItemList"
    },
    {
      id: "userStatusList"
    },
    {
      id: "userCharaList"
    },
    {
      id: "userCardList"
    },
    {
      id: "userCharaEnhancementCellList"
    },
    {
      id: "userCharaAtbEnhancementCellList"
    },
    {
      id: "userDeckList"
    },
    {
      id: "userDoppelList"
    },
    {
      id: "userLive2dList"
    },
    {
      id: "userPieceList"
    },
    {
      id: "userPieceSetList"
    },
    {
      id: "userPatrolList"
    }],
    fetch: function()
    {
      l.pageModelGet(this.needModelIdObj)
    },
    init: function()
    {
      g = l.getPageJson();
      c.historyArr = ["MyPage", "NewYearLogin"];
      if (g.lotteryResult)
      {
        b = h.filter(g.campaignList, function(a)
        {
          return "LOGIN_BONUS" === a.campaignType && a.parameterMap && "#/NewYearLogin" === a.parameterMap.JUMP_URL
        });
        b = b[b.length - 1];
        if (b.parameterMap && b.parameterMap.BGM && b.parameterMap.BG_IMG)
        {
          var a = b.parameterMap.BGM;
          d.changeBg(b.parameterMap.BG_IMG + ".ExportJson");
          d.startBgm(a)
        }
        else d.changeBg("web_common.ExportJson"), d.startBgm("bgm01_anime07");
        c.setStyle(p);
        f = new m
      }
      else location.href = "#/MyPage"
    },
    remove: function(a)
    {
      d.endL2d();
      f && f.remove();
      a()
    }
  }
});
