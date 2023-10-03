define("underscore backbone backboneCommon ajaxControl command text!template/quest/puellaHistoria/lastBattle/QuestResultMainBoss.html text!css/quest/PuellaHistoriaLastBattle/QuestResultMainBoss.css js/quest/puellaHistoria/lastBattle/Utility".split(" "), function(h, m, a, k, c, n, p, q)
{
  var d, l = {},
    r = m.View.extend(
    {
      events: function()
      {
        var b = {};
        b["webkitAnimationEnd .rippleObj_1"] = this.rippleObj1;
        b["webkitAnimationEnd .rippleObj_2"] = this.rippleObj2;
        b["webkitAnimationEnd .rippleObj_3"] = this.rippleObj3;
        b["webkitAnimationEnd .rippleObj_4"] = this.rippleObj4;
        b["webkitAnimationEnd .rippleObj_5"] = this.rippleObj5;
        b["webkitAnimationEnd .resultTitleBase"] = this.resultTitleBase;
        b["webkitAnimationEnd .rewardBase"] = this.rewardBase;
        b["webkitAnimationEnd #count"] = this.countDamageNum;
        b[a.cgti + " .retryBtn"] = this.retryBtn;
        b[a.cgti + " #touchScreen"] = this.movePage;
        return b
      },
      initialize: function(a)
      {
        this.template = h.template(n);
        this.createDom()
      },
      render: function()
      {
        this.model.damage = {};
        var b = this.model.nativeJSON.totalDamage.toLocaleString();
        this.model.damage.damageNumText = String(b);
        var e = [];
        h.each(this.model.damage.damageNumText, function(a, b, t)
        {
          "," != a && e.push(a)
        });
        this.model.damage.numList = [];
        this.model.damage.numList = e;
        b = q.getQuestResultDP(
        {
          groupRaidPrm: a.PuellaHistoriaLastBattleGroupRaidPrm,
          pageJson: this.model.pageJson
        });
        this.model.dpInfo = {};
        this.model.dpInfo.beforeDPNumText = String(b.getDP.toLocaleString());
        this.model.dpInfo.afterDPNumText = String(b.afterDP.toLocaleString());
        this.$el.html(this.template(
        {
          model: this.model
        }));
        return this
      },
      createDom: function()
      {
        a.content.append(this.render().el);
        a.ready.hide();
        a.addClass(a.doc.getElementById("count"), "show");
        this.setSE("SE1")
      },
      rippleObj1: function()
      {
        a.addClass(a.doc.getElementsByClassName("rippleObj_1")[0], "rotate")
      },
      rippleObj2: function()
      {
        a.addClass(a.doc.getElementsByClassName("rippleObj_2")[0], "rotate")
      },
      rippleObj3: function()
      {
        a.addClass(a.doc.getElementsByClassName("rippleObj_3")[0], "rotate")
      },
      rippleObj4: function()
      {
        a.addClass(a.doc.getElementsByClassName("rippleObj_4")[0], "rotate")
      },
      rippleObj5: function()
      {
        a.addClass(a.doc.getElementsByClassName("rippleObj_5")[0], "rotate")
      },
      resultTitleBase: function()
      {
        this.setSE("SE2")
      },
      rewardBase: function()
      {
        this.setSE("SE3")
      },
      countDamageNum: function()
      {
        function b(b, f, e)
        {
          var d = Number(a.doc.getElementById("count").getElementsByClassName("damageNumImg")[f].dataset.num),
            g = 0;
          0 != b && (g = d + 1);
          b <= g && (clearInterval(c[f]), f == e.length - 1 && setTimeout(function()
          {
            a.addClass(a.doc.getElementById("touchScreen"), "on");
            a.addClass(a.doc.getElementsByClassName("touch_screen")[0], "on")
          }, 2E3));
          10 > g && (a.doc.getElementById("count").getElementsByClassName("damageNumImg")[f].dataset.num = g, a.doc.getElementById("count").getElementsByClassName("damageNumImg")[f].src = "/magica/resource/image_web/page/quest/puellaHistoria_lastBattle/result/_number/b_num_" + Number(g) + ".png")
        }

        function e(a, f, e)
        {
          c[f] = setInterval(b.bind(null, a, f, e), 100)
        }
        var c = [],
          d;
        h.each(this.model.damage.numList, function(a, b, c)
        {
          d = 100 * (c.length - b);
          setTimeout(e.bind(null, a, b, c), d)
        })
      },
      setSE: function(a)
      {
        switch (a)
        {
          case "SE1":
            setTimeout(function()
            {
              c.startSe(1005)
            }, 3800);
            break;
          case "SE2":
            setTimeout(function()
            {
              c.startSe(2016)
            }, 1400);
            break;
          case "SE3":
            setTimeout(function()
            {
              c.startSe(1001)
            }, 460)
        }
      },
      retryBtn: function(b)
      {
        b.preventDefault();
        a.isScrolled() || window.alert("retryBtn")
      },
      movePage: function(b)
      {
        b.preventDefault();
        a.isScrolled() || (location.href = "#/EventPuellaRaidTop")
      },
      removeView: function()
      {
        this.off();
        this.remove()
      }
    });
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
      id: "userCharaList"
    },
    {
      id: "userCardList"
    },
    {
      id: "userDeckList"
    },
    {
      id: "userDoppelList"
    },
    {
      id: "userGiftList"
    },
    {
      id: "pieceList"
    },
    {
      id: "userPieceList"
    },
    {
      id: "userPieceSetList"
    },
    {
      id: "userItemList"
    },
    {
      id: "userFollowList"
    },
    {
      id: "userTitleList"
    },
    {
      id: "userChapterList"
    },
    {
      id: "userSectionList"
    },
    {
      id: "userQuestBattleList"
    },
    {
      id: "itemList"
    },
    {
      id: "giftList"
    },
    {
      id: "userDailyChallengeList"
    },
    {
      id: "userTotalChallengeList"
    },
    {
      id: "userLimitedChallengeList"
    },
    {
      id: "userQuestAdventureList"
    },
    {
      id: "userLive2dList"
    },
    {
      id: "userPatrolList"
    },
    {
      id: "userEventPuellaRaid",
      refresh: !0
    }],
    fetch: function()
    {
      k.pageModelGet(this.needModelIdObj, null)
    },
    init: function()
    {
      var b = k.getPageJson();
      a.androidKeyStop = !0;
      a.strSupportPickUpUserIds = "";
      a.supportUserList = null;
      d = a.questNativeResponse;
      a.setStyle(p);
      c.changeBg("web_PuellaHistoria_19094_01.ExportJson");
      a.historyArr = ["MyPage"];
      l.pageView = new r(
      {
        model:
        {
          nativeJSON: d,
          pageJson: b
        }
      });
      c.setWebView()
    },
    remove: function(b)
    {
      $("#commandDiv").off();
      a.androidKeyStop = !1;
      d = a.questNativeResponse = null;
      h.each(l, function(a, b, c)
      {
        a.removeView && a.removeView()
      });
      b()
    }
  }
});
