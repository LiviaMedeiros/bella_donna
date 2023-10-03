define("underscore backbone backboneCommon ajaxControl command text!template/campaign/sumo/CampaignSumoMain.html text!css/campaign/sumo/CampaignSumoMain.css text!resource/image_web/_json/campaignSumoChara.json".split(" "), function(m, n, a, p, d, q, r, t)
{
  var k, f, g, l, u = n.View.extend(
  {
    events: function()
    {
      var b = {};
      b[a.cgti + " #touchWrap"] = this.touch;
      b[a.cgti + " #retryBtn"] = this.retryBtn;
      b[a.cgti + " #startBtn"] = this.startBtn;
      b["webkitTransitionEnd #vsCutinWrap"] = this.battleInit;
      b["webkitAnimationEnd #vsCutinWrap"] = this.battleInit;
      b["webkitanimationend #vsCutinWrap"] = this.battleInit;
      b["animationend #vsCutinWrap"] = this.battleInit;
      return b
    },
    initialize: function(b)
    {
      this.charaJson = JSON.parse(t);
      window.isDebug && null == a.sumoPlayerModel && (a.sumoPlayerModel = this.charaJson.charaList[1]);
      this.setupEnemy();
      this.finishFlag = !0;
      this.template = m.template(q);
      this.createDom()
    },
    render: function()
    {
      this.charaChangeFlag = !1;
      a.sumoPlayerModel.charaChangeModel && 0 === Math.floor(5 * Math.random()) && (this.charaChangeFlag = !0);
      console.log("____common.sumoPlayerModel", a.sumoPlayerModel);
      this.$el.html(this.template(
      {
        playerModel: a.sumoPlayerModel,
        enemyModel: this.sumoEnemyModel,
        charaChangeFlag: this.charaChangeFlag
      }));
      return this
    },
    createDom: function()
    {
      a.content.append(this.render().el);
      a.setGlobalView();
      d.getBaseData(a.getNativeObj());
      a.ready.hide();
      a.addClassId("vsCutinWrap", "show")
    },
    touch: function(b)
    {
      b.preventDefault();
      a.isScrolled() || this.finishFlag || 3 < this.intervalCnt || (this.intervalCnt++, this.playerTouchCnt++, a.doc.getElementById("playerWrap"), a.removeClassId("bgRing", "anim"), setTimeout(function()
      {
        a.addClassId("bgRing", "anim")
      }, 100), a.removeClassId("playerWrap", "move"), setTimeout(function()
      {
        a.addClassId("playerWrap", "move")
      }, 100), this.moveFunc(), this.resultStartFlag && (b = Math.floor(100 * Math.random()) + 1, this.getWinRate() > b && this.battleFinish("win")))
    },
    retryBtn: function(b)
    {
      b.preventDefault();
      if (!a.isScrolled())
      {
        this.initFlag = !1;
        b = a.doc.getElementsByClassName("cutin");
        for (var c = 0; c < b.length; ++c) a.removeClass(b[c], "show");
        a.removeClassId("btnWrap", "show");
        this.setupEnemy();
        a.content.append(this.render().el);
        a.addClassId("vsCutinWrap", "show")
      }
    },
    setupEnemy: function()
    {
      this.sumoEnemyModel = m.shuffle(this.charaJson.charaList)[0]
    },
    battleInit: function()
    {
      if (!this.initFlag)
      {
        this.initFlag = !0;
        this.intervalCnt = this.enemyTouchCnt = this.playerTouchCnt = 0;
        a.sumoCount ? a.sumoCount++ : a.sumoCount = 1;
        a.doc.getElementById("charaWrap").style.cssText = "";
        a.doc.getElementById("playerWrap").style.cssText = "";
        a.removeClassId("playerWrap", "anim");
        a.removeClassId("playerWrap", "move");
        a.removeClassId("playerWrap", "lose");
        a.doc.getElementById("enemyWrap").style.cssText = "";
        a.removeClassId("enemyWrap", "move");
        a.removeClassId("enemyWrap", "lose");
        var b = 300;
        this.charaChangeFlag && (a.addClassId("playerWrap", "anim"), b = 1300, setTimeout(function()
        {
          a.addClassId("CampaignSumoMain", "shake");
          setTimeout(function()
          {
            a.addClassId("vsCutinWrap", "change")
          }, 300)
        }, 500));
        a.doc.getElementById("bgHole").className = "";
        a.removeClassId("bgRing2", "show");
        setTimeout(function()
        {
          a.addClassId("startCutinWrap", "show");
          a.addClassId("startBtn", "show");
          d.startVoice("vo_game_0004_01")
        }.bind(this), b)
      }
    },
    startBtn: function(b)
    {
      b.preventDefault();
      if (!a.isScrolled())
        if (a.removeClassId("startBtn", "show"), !a.sumoCount || 2 !== a.sumoCount && 0 !== a.sumoCount % 10) a.sumoCount && 0 === a.sumoCount % 5 ? (d.startVoice("vo_game_0004_10"), a.addClassId("startCutinWrap", "drawAnim"), setTimeout(function()
        {
          a.addClassId("charaWrap", "shout");
          setTimeout(function()
          {
            this.finishFlag = !1;
            this.battleFinish("draw", "madokaWin")
          }.bind(this), 850)
        }.bind(this), 1300)) : (d.startVoice("vo_game_0004_02"), a.addClassId("startCutinWrap", "anim"), setTimeout(function()
        {
          this.finishFlag = !1;
          a.addClassId("touchIcon", "anim");
          this.battleStart()
        }.bind(this), 1E3));
        else
        {
          a.addClassId("startCutinWrap", "anim");
          d.startVoice("vo_game_0004_02");
          var c = a.doc.getElementById("bgHole");
          c.className = "open";
          a.addClassId("bgRing2", "show");
          setTimeout(function()
          {
            a.addClassId("trapIcon", "show");
            setTimeout(function()
            {
              a.addClassId("charaWrap", "trap");
              setTimeout(function()
              {
                a.removeClassId("trapIcon", "show");
                a.addClass(c, "close");
                this.finishFlag = !1;
                this.battleFinish("draw", "madokaWin")
              }.bind(this), 1500)
            }.bind(this), 900)
          }.bind(this), 1E3)
        }
    },
    battleStart: function()
    {
      setTimeout(function()
      {
        this.resultStartFlag = !0
      }.bind(this), 3E3);
      a.removeClassId("startCutinWrap", "show");
      a.addClassId("collisionText", "show");
      a.addClassId("judgement", "anim");
      clearInterval(f);
      f = setInterval(function()
      {
        this.intervalCnt = 0;
        this.enemyTouchCnt++;
        a.removeClassId("enemyWrap", "move");
        setTimeout(function()
        {
          a.addClassId("enemyWrap", "move")
        }, 100);
        this.moveFunc();
        if (this.resultStartFlag)
        {
          var b = Math.floor(100 * Math.random()) + 1;
          this.getLoseRate() >= b && this.battleFinish("lose")
        }
      }.bind(this), this.sumoEnemyModel.interval);
      clearInterval(g);
      g = setInterval(function()
      {
        d.startVoice("vo_game_0004_03");
        clearTimeout(l);
        l = setTimeout(function()
        {
          d.startVoice("vo_game_0004_04")
        }, 400)
      }, 900)
    },
    battleFinish: function(b, c)
    {
      if (!this.finishFlag)
      {
        clearInterval(f);
        clearInterval(g);
        clearTimeout(l);
        this.finishFlag = !0;
        d.stopVoice();
        a.removeClassId("collisionEffect", "show");
        a.removeClassId("collisionText", "show");
        a.removeClassId("judgement", "anim");
        a.removeClassId("touchIcon", "anim");
        var e = null,
          h = null;
        switch (b)
        {
          case "win":
            a.addClassId("enemyWrap", "lose");
            e = "vo_game_0004_05";
            h = "vo_game_0004_06";
            break;
          case "lose":
            a.addClassId("playerWrap", "lose");
            e = "vo_game_0004_07";
            h = "vo_game_0004_08";
            break;
          case "draw":
            c && a.addClassId("judgement", c), a.addClassId("playerWrap", "lose"), a.addClassId("enemyWrap", "lose"), e = "vo_game_0004_09"
        }
        setTimeout(function()
        {
          d.startSe(2002);
          a.doc.getElementById("resultCutinWrap").className = b + " show cutin";
          a.addClassId("vsCutinWrap", b);
          e && setTimeout(function()
          {
            d.startVoice(e)
          }, 1E3);
          setTimeout(function()
          {
            h && d.startVoice(h);
            a.addClassId("btnWrap", "show")
          }, 2E3)
        }, 1E3)
      }
    },
    moveFunc: function()
    {
      a.addClassId("collisionEffect", "show");
      var b = a.doc.getElementById("charaWrap"),
        c = 10 * (2 * this.enemyTouchCnt - this.playerTouchCnt); - 130 > c ? c = -130 : 130 < c && (c = 130);
      b.style.cssText = a.storage.user && a.ua.ios ? "-webkit-transform:translateX(" + c + "px) translateZ(0);" : "-webkit-transform:translate3d(" + c + "px,0,0);"
    },
    getWinRate: function()
    {
      return this.playerTouchCnt
    },
    getLoseRate: function()
    {
      return this.enemyTouchCnt * this.sumoEnemyModel.weight
    },
    removeFunc: function(a)
    {
      clearInterval(f);
      clearInterval(g);
      this.off();
      this.remove();
      a && a()
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
      id: "userItemList"
    },
    {
      id: "userPatrolList"
    }],
    fetch: function(a, c)
    {
      p.pageModelGet(this.needModelIdObj)
    },
    init: function()
    {
      a.setStyle(r);
      a.addClassId("globalMenuContainer", "hide");
      k = new u
    },
    startCommand: function()
    {
      d.changeBg("web_31083.ExportJson");
      d.startBgm("bgm03_story16")
    },
    removeCommand: function() {},
    remove: function(b)
    {
      a.sumoPlayerModel = null;
      a.removeClassId("globalMenuContainer", "hide");
      k ? k.removeFunc(b) : b()
    }
  }
});
