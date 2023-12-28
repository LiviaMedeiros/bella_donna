define("underscore backbone backboneCommon ajaxControl command cardUtil text!template/campaign/newyear_login/NewYearLogin.html text!css/campaign/newyear_login/NewYearLogin.css".split(" "), function(h, k, b, l, c, r, n, p)
{
  k.Model.extend(
  {});
  var g, d, f, m = k.View.extend(
    {
      events: function()
      {
        var a = {};
        a["webkitTransitionEnd #NewYearLogin .animTrigger"] = this.animationTrigger;
        a["webkitAnimationEnd #NewYearLogin .animTrigger"] = this.animationTrigger;
        a["webkitanimationend #NewYearLogin .animTrigger"] = this.animationTrigger;
        a["animationend #NewYearLogin .animTrigger"] = this.animationTrigger;
        a[b.cgti + " .tweetBtn"] = this.tweetBtn;
        window.isDebug && (a[b.cgti + " .debugBtn"] = q);
        return a
      },
      initialize: function(a)
      {
        this.template = h.template(n);
        this.lotResult = a ? a.lotResult : g.lotteryResult.loginBonusCampaignLottery.typeCode;
        require(["text!js/campaign/newyear_login/json/" + d.id + ".json"], function(a)
        {
          this.model = this.createFortuneModel(a);
          this.createDom();
          b.campaignJump ? (b.addClass(b.doc.getElementById("globalMenuContainer"), "hide"), b.doc.getElementById("fortuneAnimationWrap").className = "show", setTimeout(function()
          {
            c.startSe(1004)
          }, 100), setTimeout(function()
          {
            c.startSe(1004)
          }, 200), setTimeout(function()
          {
            c.startSe(1004)
          }, 300), setTimeout(function()
          {
            c.startSe(1602)
          }, 1333), b.campaignJump = null) : this.showResultPage()
        }.bind(this))
      },
      render: function()
      {
        this.$el.html(this.template(
        {
          model: this.model,
          master: d,
          lotResult: this.lotResult,
          rewardModels: this.rewardModels
        }));
        return this
      },
      createDom: function()
      {
        b.setGlobalView();
        b.content.append(this.render().el);
        c.setWebView();
        b.ready.hide()
      },
      createFortuneModel: function(a)
      {
        var e = JSON.parse(a);
        a = g.lotteryResult;
        var e = e.omikuziList[a.loginBonusCampaignLottery.typeCode],
          c = e.charaList[(a.loginBonusCampaignLottery.loginCount - 1) % e.charaList.length];
        c.fortuneText = e.fortuneList[a.textType < e.fortuneList.length ? a.textType : a.textType % e.fortuneList.length].replace(/＠/g, "<br>");
        c.message = c.message.replace(/＠/g, "<br>");
        c.rewardModels = [];
        a = a.loginBonusCampaignLottery.rewardCodes.split(",");
        h.each(a, function(a)
        {
          c.rewardModels.push(b.itemSet(a))
        });
        return c
      },
      animationTrigger: function()
      {
        var a = b.doc.getElementById("fortuneAnimationWrap"),
          e = b.doc.getElementById("resultAnimationWrap");
        if (a.classList.contains("show"))
        {
          a.className = "";
          e.className = "show type" + this.lotResult;
          var d;
          switch (this.lotResult)
          {
            case 0:
              d = 1111;
              break;
            case 1:
              d = 1106;
              break;
            case 2:
              d = 1105;
              break;
            case 3:
              d = 1104
          }
          setTimeout(function()
          {
            c.startSe(d)
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
        if (b.doc.getElementById("resultPageWrap"))
        {
          b.doc.getElementById("resultPageWrap").className = "show";
          var a = this.model.oneshotId;
          if (a)
          {
            c.endL2d();
            var e = {};
            e.key = String(a);
            e.type = 1;
            e.id = "0";
            e.x = 226;
            e.y = 1024 === b.displayWidth ? Math.floor(b.doc.getElementsByTagName("body")[0].offsetHeight / 2) : Math.ceil(b.shortSize / 2);
            c.startL2d(e)
          }
        }
        b.removeClass(b.doc.getElementById("globalMenuContainer"), "hide")
      },
      tweetBtn: function(a)
      {
        a.preventDefault();
        b.isScrolled()
      }
    }),
    q = function(a)
    {
      a.preventDefault();
      b.isScrolled() || (b.campaignJump = !0, f.remove(), c.endL2d(), f = null, f = new m(
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
      b.historyArr = ["MyPage", "NewYearLogin"];
      if (g.lotteryResult)
      {
        d = h.filter(g.campaignList, function(a)
        {
          return "LOGIN_BONUS" === a.campaignType && a.parameterMap && "#/NewYearLogin" === a.parameterMap.JUMP_URL
        });
        d = d[d.length - 1];
        if (d.parameterMap && d.parameterMap.BGM && d.parameterMap.BG_IMG)
        {
          var a = d.parameterMap.BGM;
          c.changeBg(d.parameterMap.BG_IMG + ".ExportJson");
          c.startBgm(a)
        }
        else c.changeBg("web_common.ExportJson"), c.startBgm("bgm01_anime07");
        b.setStyle(p);
        f = new m
      }
      else location.href = "#/MyPage"
    },
    remove: function(a)
    {
      c.endL2d();
      f && f.remove();
      a()
    }
  }
});
