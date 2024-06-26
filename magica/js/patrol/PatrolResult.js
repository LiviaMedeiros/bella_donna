define("underscore backbone backboneCommon ajaxControl text!template/patrol/PatrolResult.html text!template/patrol/PatrolCutin.html text!css/patrol/PatrolResult.css cardUtil command QuestUtil js/view/quest/QuestResultUnitPartView js/view/chara/CharaResultView".split(" "), function(k, t, a, A, C, D, E, m, h, H, u, r)
{
  var x, p, l, n, b, q = t.Model.extend(),
    v = {},
    F = t.View.extend(
    {
      events: function()
      {
        var c = {};
        c[a.cgti + " #tapAction"] = this.tapSkip;
        c["webkitTransitionEnd #itemResult .maskWrap"] = this.itemAnimEnd;
        c["webkitAnimationEnd #itemResult .maskWrap"] = this.itemAnimEnd;
        c["webkitanimationend #itemResult .maskWrap"] = this.itemAnimEnd;
        c["animationend #itemResult .maskWrap"] = this.itemAnimEnd;
        return c
      },
      initialize: function(c)
      {
        this.listenTo(this, "remove", this.removeView);
        this.template = k.template(C);
        this.oldCharaModel = a.storage.userCharaList.toJSON();
        this.oldCardModel = a.storage.userCardList.toJSON();
        a.responseSetStorage(l);
        m.createCardList();
        this.allInitialized();
        this.createDom()
      },
      render: function()
      {
        this.$el.html(this.template(
        {
          model: l.userPatrolResultList[0],
          getItems: this.getItems,
          gameUser: a.storage.gameUser.toJSON()
        }));
        return this
      },
      createDom: function()
      {
        this.initItems();
        a.content.append(this.render().el);
        a.globalMenuView && a.globalMenuView.trigger("removeView");
        this.createView()
      },
      createView: function()
      {
        this.userUnitHandler();
        h.getBaseData(a.getNativeObj());
        a.ready.hide();
        b = this;
        this.stepObserver("firstStep")
      },
      allInitialized: function()
      {
        this.rewardRiche = 0;
        this.getItems = [];
        this.beforeCards = [];
        this.unitEpUpFlag = this.unitLvUpFlag = !1;
        this.levelUpUnit = [];
        this.epUpUnit = [];
        this.unitExpBefore = [];
        this.unitExpAfter = [];
        this.unitEpBefore = [];
        this.unitEpAfter = [];
        this.timeOuts = null;
        v = {}
      },
      stepObserver: function(a)
      {
        switch (a)
        {
          case "firstStep":
            b.firstStep();
            break;
          case "charaExp":
            b.charaGaugeFunc();
            break;
          case "charaLvPop":
            b.unitLvUpPop();
            break;
          case "charaEp":
            b.epExpFunc();
            break;
          case "charaEpPop":
            b.unitEpPop();
            break;
          case "items":
            b.itemFunc()
        }
      },
      tapSkip: function(c)
      {
        !a.isScrolled() && c.currentTarget.classList.contains("active") && (c.preventDefault(), location.href = "#/PatrolTop")
      },
      firstStep: function()
      {
        setTimeout(function()
        {
          h.startSe(1601)
        }, 500);
        setTimeout(function()
        {
          b.stepObserver("charaExp")
        }, 2E3)
      },
      treasureBoxPreload: function()
      {
        var a = ["bronze", "silver", "gold"],
          b = [];
        k.forEach(this.getItems, function(a)
        {
          "ADDED_DROP" === a.chestColor && -1 === b.indexOf(a.itemCode.toLowerCase()) && b.push(a.itemCode.toLowerCase())
        });
        var e = function()
          {
            var c = a[0],
              f = new Image;
            f.src = "/magica/resource/image_web/common/treasure/" + c + "_close.png";
            f.onload = function()
            {
              var d = new Image;
              d.src = "/magica/resource/image_web/common/treasure/" + c + "_open.png";
              d.onload = function()
              {
                a.shift();
                0 < a.length ? e() : 0 < b.length && g()
              }
            }
          },
          g = function()
          {
            var a = b[0],
              c = new Image;
            c.src = "/magica/resource/image_web/common/treasure/event/" + a + "_close.png";
            c.onload = function()
            {
              var c = new Image;
              c.src = "/magica/resource/image_web/common/treasure/event/" + a + "_open.png";
              c.onload = function()
              {
                b.shift();
                0 < b.length && g()
              }
            }
          };
        e()
      },
      initItems: function()
      {
        var c = l.userPatrolResultList[0].dropRewardCodes;
        if (c)
        {
          var b = this,
            c = c.split(",");
          k.each(c, function(c, f)
          {
            var d = a.itemSet(c);
            d.itemCode ? (-1 < d.itemCode.indexOf("GIFT") ? d.imgPath = "/gift/" : -1 < d.itemCode.indexOf("MONEY") ? d.imgPath = "/main/" : -1 < d.itemCode.indexOf("riche") ? (b.rewardRiche += d.quantity | 0, d.imgPath = "/main/") : -1 < d.itemCode.indexOf("memoria_") ? d.imgPath = "/memoria/" : d.imgPath = -1 < d.itemCode.indexOf("EVENT_") ? "/event/" : "/main/", b.getItems.push(d)) : k.each(b.getItems, function(a, c)
            {
              a.itemCode == d.effectItemCode && (b.getItems[c].effectFlag = !0)
            })
          })
        }
        this.treasureBoxPreload()
      },
      userUnitHandler: function()
      {
        for (var c = 0; 5 > c; c++)
        {
          var b = l.userPatrolResultList[0]["charaId" + (c + 1)];
          if (b)
          {
            var e = k.findWhere(a.storage.userCardListEx.toJSON(),
              {
                charaId: b
              }),
              g = k.findWhere(this.oldCardModel,
              {
                id: e.id
              });
            console.log("this.oldCharaModel", k.findWhere(this.oldCharaModel,
            {
              charaId: e.charaId
            }));
            console.log("this.oldCardModel", this.oldCardModel, b);
            g.bondsTotalPt = k.findWhere(this.oldCharaModel,
            {
              charaId: e.charaId
            }).bondsTotalPt;
            this.beforeCards.push(
            {
              beforeModel: g,
              afterModel: e
            })
          }
        }
        u.prototype.parentView = this;
        u.prototype.template = k.template($("#unitPartTemp").text());
        var d = a.doc.createDocumentFragment();
        k.each(this.beforeCards, function(a, c)
        {
          a = new u(a);
          d.appendChild(a.render().el)
        });
        a.doc.getElementById("charaWrap").appendChild(d);
        d = null
      },
      charaGaugeFunc: function()
      {
        var c = function()
        {
          setTimeout(function()
          {
            0 < b.levelUpUnit.length ? b.stepObserver("charaLvPop") : b.stepObserver("charaEp")
          })
        };
        b.timeOuts = setTimeout(function()
        {
          h.startSe(1007);
          for (var f = a.doc.getElementById("charaWrap").getElementsByTagName("li"), e = 0, g = f.length; e < g; e++)
          {
            var d = f[e];
            0 < e ? setTimeout(b.gaugeUp(b.unitExpBefore[e], b.unitExpAfter[e], d.getElementsByClassName("charaExGuage")[0], d, "charaEx", e), 500) : setTimeout(b.gaugeUp(b.unitExpBefore[e], b.unitExpAfter[e], d.getElementsByClassName("charaExGuage")[0], d, "charaEx", e, c), 500);
            a.addClass(d.getElementsByClassName("getExNum")[0], "anim");
            a.addClass(d.getElementsByClassName("exFlashWrap")[0], "active")
          }
        }, 1E3)
      },
      unitLvUpPop: function(c)
      {
        if (!a.resultView || !a.resultView.tapBlock)
        {
          c = {};
          var f;
          1 < b.levelUpUnit.length ? (a.tapBlock(!1), f = b.levelUpUnit[0][0], f.chara = b.levelUpUnit[0][1].chara, c.before = m.addExStatus(f), c.after = m.addExStatus(b.levelUpUnit[0][1]), c.type = "level", a.resultView = new r(
          {
            model: new q(c)
          }, b.unitLvUpPop), $("#overlapContainer").append(a.resultView.render().el), h.getBaseData(a.getNativeObj()), b.unitLvUpFlag || (b.unitLvUpFlag = !0), b.levelUpUnit.splice(0, 1)) : (a.tapBlock(!1), f = b.levelUpUnit[0][0], f.chara = b.levelUpUnit[0][1].chara, c.before = m.addExStatus(f), c.after = m.addExStatus(b.levelUpUnit[0][1]), c.type = "level", a.resultView = new r(
          {
            model: new q(c)
          }, b.epExpFunc), $("#overlapContainer").append(a.resultView.render().el), b.unitLvUpFlag = !0, h.getBaseData(a.getNativeObj()), b.levelUpUnit = [])
        }
      },
      epExpFunc: function()
      {
        b.unitEpUpFlag = !1;
        b.timeOuts = setTimeout(function()
        {
          h.startSe(1007);
          for (var c = function()
            {
              b.trigger("showEpExp");
              0 < b.epUpUnit.length ? b.stepObserver("charaEpPop") : b.stepObserver("items")
            }, f = a.doc.getElementById("charaWrap").getElementsByTagName("li"), e = 0, g = f.length; e < g; e++)
          {
            var d = f[e];
            0 < e ? setTimeout(b.gaugeUp(b.unitEpBefore[e], b.unitEpAfter[e], d.getElementsByClassName("charaEpGuage")[0], d, "charaEp", e), 500) : setTimeout(b.gaugeUp(b.unitEpBefore[e], b.unitEpAfter[e], d.getElementsByClassName("charaEpGuage")[0], d, "charaEp", e, c), 500);
            a.addClass(d.getElementsByClassName("getEpExNum")[0], "anim");
            a.addClass(d.getElementsByClassName("epFlashWrap")[0], "active")
          }
        }, 500)
      },
      unitEpPop: function(c)
      {
        if (!a.resultView || !a.resultView.tapBlock)
        {
          c = a.storage.userCardListEx.findWhere(
          {
            cardId: b.epUpUnit[0][0].cardId
          }).toJSON();
          var f = {},
            e;
          1 < b.epUpUnit.length ? (a.tapBlock(!1), e = b.epUpUnit[0][0], e.chara = c.chara, f.before = m.addExStatus(e), f.before.episodeLevel = b.epUpUnit[0][1], f.after = m.addExStatus(c), f.type = "episode", a.resultView = new r(
          {
            model: new q(f)
          }, function()
          {
            b.unitEpPop()
          }), $("#overlapContainer").append(a.resultView.render().el), h.getBaseData(a.getNativeObj()), b.unitEpUpFlag = !0, b.epUpUnit.splice(0, 1)) : (a.tapBlock(!1), e = b.epUpUnit[0][0], e.chara = c.chara, f.before = m.addExStatus(e), f.before.episodeLevel = b.epUpUnit[0][1], f.after = m.addExStatus(c), f.type = "episode", a.resultView = new r(
          {
            model: new q(f)
          }, function()
          {
            b.stepObserver("items")
          }), $("#overlapContainer").append(a.resultView.render().el), h.getBaseData(a.getNativeObj()), b.unitEpUpFlag = !1, b.epUpUnit = [])
        }
      },
      nextBtnFunc: function(c)
      {
        if (c && (c.preventDefault(), a.isScrolled())) return;
        a.addClass(a.doc.getElementById("expWrap"), "off");
        a.removeClass(a.doc.getElementById("itemWrap"), "off");
        a.removeClass(a.doc.getElementById("itemResult"), "off");
        a.removeClass(a.doc.getElementById("getTotalRiche"), "off");
        a.removeClass(a.doc.getElementById("hasTotalRiche"), "off");
        setTimeout(function()
        {
          b.stepObserver("items")
        }, 500)
      },
      itemFunc: function()
      {
        var c = a.doc.getElementById("goldNum");
        b.countUp(0, l.userPatrolResultList[0].riche + this.rewardRiche, c);
        c = a.doc.getElementById("getItemList").getElementsByTagName("li");
        a.addClass(a.doc.getElementById("itemResult"), "anim");
        1 > c.length ? b.timeOuts = setTimeout(function()
        {
          a.addClass(a.doc.getElementById("tapAction"), "active")
        }, 500) : h.startSe(1604)
      },
      itemAnimEnd: function()
      {
        this.okFlg || (this.okFlg = !0, 14 < a.doc.getElementById("getItemList").getElementsByTagName("li").length && (a.addClass(a.doc.getElementById("itemResult"), "canScroll"), a.scrollSet("itemResult", "itemScroll")), a.addClass(a.doc.getElementById("tapAction"), "active"))
      },
      countUp: function(c, b, e)
      {
        var f, d;
        a.storage.user && "IOS" === a.storage.user.get("platform") ? (f = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(a)
        {
          window.setTimeout(a, 10)
        }, d = window.cancelAnimationFrame || window.mozCancelAnimationFrame || function(a)
        {
          window.setTimeout(a)
        }) : (f = function(a)
        {
          window.setTimeout(a, 10)
        }, d = function(a)
        {
          window.clearTimeout(a)
        });
        var h = 0,
          k = null,
          l = b,
          m = function()
          {
            h++;
            if ("PatrolResult" === a.location)
            {
              k || (k = (new Date).getTime());
              var b = (new Date).getTime() - k;
              if (50 >= h)
              {
                var g = Math.floor(b / 500 * (l - c)) + c | 0;
                499 < b ? (l = String(l).split("").reverse().join("").match(/\d{1,3}/g).join(",").split("").reverse().join(""), e.innerHTML = "+" + l.replace(/(\d)(?=(\d\d\d)+$)/g, "$1,"), d(n)) : (g = String(g).split("").reverse().join("").match(/\d{1,3}/g).join(",").split("").reverse().join(""), g = g.replace(/(\d)(?=(\d\d\d)+$)/g, "$1,"), e.innerHTML = "+" + g, n = f(m))
              }
              else d(n), h = 0
            }
          },
          n = f(m)
      },
      gaugeUp: function(c, b, e, g, d, h, k)
      {
        var f, l, n = null;
        a.storage.user && "IOS" === a.storage.user.get("platform") ? (f = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(a)
        {
          window.setTimeout(a, 10)
        }, l = window.cancelAnimationFrame || window.mozCancelAnimationFrame || function(a)
        {
          window.setTimeout(a)
        }) : (f = function(a)
        {
          window.setTimeout(a, 10)
        }, l = function(a)
        {
          window.clearTimeout(a)
        });
        var m = 0,
          r = "rank" === d ? 50 : 25,
          p = 0,
          q = 0,
          y = 0;
        "rank" === d && g && (y = Number(g.textContent));
        "charaEx" === d && g && (y = Number(g.getElementsByClassName("unitLv")[0].textContent));
        "charaEp" === d && g && (y = Number(g.getElementsByClassName("epLvNum")[0].textContent));
        var t = function()
        {
          m++;
          if ("PatrolResult" === a.location)
          {
            n || (n = (new Date).getTime());
            var w = (new Date).getTime() - n;
            if (m <= r && c !== b)
            {
              var u = w / (10 * r),
                z = Math.floor((b - c) * u) + c - 100 * p | 0,
                x = 0;
              if ("rank" === d && 499 < w || "rank" !== d && 249 < w) u = 1, z = Math.floor(b - c) + c - 100 * p | 0;
              for (; 99 < z;) q++, x++, p++, z = Math.floor((b - c) * u) + c - 100 * p | 0;
              0 < x && ("rank" === d && g && (g.textContent = q + y), "charaEx" === d && g && (a.addClass(g.getElementsByClassName("lvup")[0], "anim"), a.addClass(g.getElementsByClassName("unitLv")[0], "c_red"), g.getElementsByClassName("unitLv")[0].textContent = q + y), "charaEp" === d && g && (a.addClass(g.getElementsByClassName("epup")[0], "anim"), a.addClass(g.getElementsByClassName("epLvNum")[0], "c_red"), g.getElementsByClassName("epLvNum")[0].textContent = q + y));
              e.style.width = z + "%";
              "rank" === d && 499 < w || "rank" !== d && 249 < w ? (l(v[d + h]), m = 0, k && k()) : v[d + h] = f(t)
            }
            else m <= r && c === b || "rank" === d && 500 > w || "rank" !== d && 259 > w ? v[d + h] = f(t) : (l(v[d + h]), m = 0, k && k())
          }
        };
        v[d + h] = f(t)
      },
      questRetry: function(c)
      {
        c.preventDefault();
        a.isScrolled() || (location.href = "#/SupportSelect")
      },
      removeView: function()
      {
        this.trigger("removeChildView");
        v = a.resultView = null;
        b && b.timeOuts && clearTimeout(this.timeOuts);
        this.off();
        this.remove()
      }
    }),
    G = t.View.extend(
    {
      initialize: function()
      {
        this.listenTo(this, "remove", this.removeView);
        this.template = k.template(D);
        this.sdCharaList = [];
        for (var c = [500, 350, 650, 200, 800], b = 1024 === a.displayWidth ? Math.floor(a.doc.getElementsByTagName("body")[0].offsetHeight / 576 * 140) : 100, e = 0, g = 0; 5 > e; e++)
        {
          var d = l.userPatrolResultList[0]["charaId" + (e + 1)];
          d && (this.sdCharaList.push(
          {
            index: e + 1,
            id: d + "00",
            x: c[g],
            y: b,
            scale: .7,
            fade: .3,
            isReverse: !1,
            animeList: "start" === n ? ["wait"] : ["stance"]
          }), g++)
        }
        this.createDom()
      },
      events: function()
      {
        var a = {};
        a["webkitTransitionEnd .cutinAnimation"] = this.animationTrigger;
        a["webkitAnimationEnd .cutinAnimation"] = this.animationTrigger;
        a["webkitanimationend .cutinAnimation"] = this.animationTrigger;
        a["animationend .cutinAnimation"] = this.animationTrigger;
        return a
      },
      render: function()
      {
        this.$el.html(this.template(
        {
          type: n
        }));
        return this
      },
      createDom: function()
      {
        a.content.append(this.render().el);
        a.globalMenuView && a.globalMenuView.trigger("removeView");
        h.showMultiMiniChara(this.sdCharaList);
        a.ready.hide()
      },
      animationTrigger: function(b)
      {
        switch (b.currentTarget.id)
        {
          case "curtainWrapL":
            k.each(this.sdCharaList, function(a)
            {
              a.animeList = "start" === n ? ["stance"] : ["reaction"]
            });
            h.showMultiMiniChara(this.sdCharaList);
            a.addClass(a.doc.getElementById("textWrap"), "anim");
            break;
          case "textBg2":
            b = "start" === n ? 500 : 1E3, setTimeout(function()
            {
              this.removeView()
            }.bind(this), b)
        }
      },
      removeView: function()
      {
        h.hideMultiMiniChara();
        this.off();
        this.remove();
        p = null;
        "start" !== n ? x = new F : location.href = "#/PatrolTop"
      }
    }),
    B = function()
    {
      a.androidKeyStop = !0;
      a.setStyle(E);
      p = new G;
      h.setWebView()
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
    }],
    startCommand: function()
    {
      h.startBgm("bgm03_movie37", !0);
      h.changeBg("web_patrol_page_0" + a.patrolBgIndex + ".ExportJson")
    },
    fetch: function()
    {
      A.pageModelGet(this.needModelIdObj)
    },
    init: function()
    {
      $(a.ready.target).on("webkitAnimationEnd", function(b)
      {
        "readyFadeOut" == b.originalEvent.animationName && (a.ready.target.className = "")
      });
      a.patrolStartResponse ? (n = "start", l = a.patrolStartResponse) : (n = "end", l = a.patrolEndResponse);
      a.patrolStartResponse = null;
      a.patrolEndResponse = null;
      window.isLocal && !l ? A.ajaxPost(a.linkList.patrolEnd,
      {}, function(a)
      {
        n = "end";
        l = a;
        B()
      }) : B();
      var b = ["MyPage", "PatrolTop"];
      b.push("MyPage");
      a.historyArr = b
    },
    remove: function(b)
    {
      h.hideMultiMiniChara();
      a.patrolStartResponse = null;
      a.patrolEndResponse = null;
      $("#commandDiv").off();
      a.androidKeyStop = !1;
      l = n = null;
      p && p.removeView();
      x && x.removeView();
      b()
    }
  }
});
