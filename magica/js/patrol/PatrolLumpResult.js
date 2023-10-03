define("underscore backbone backboneCommon ajaxControl text!template/patrol/PatrolLumpResult.html text!template/patrol/PatrolCutin.html text!css/patrol/PatrolLumpResult.css cardUtil command QuestUtil js/view/quest/QuestResultUnitPartView js/view/chara/CharaResultView".split(" "), function(h, t, a, B, F, G, H, q, k, L, u, C)
{
  var x, r, m, p, c, D = t.Model.extend(),
    v = {},
    l = 0,
    A = !1,
    n = [],
    I = t.View.extend(
    {
      events: function()
      {
        var b = {};
        b[a.cgti + " #tapAction"] = this.tapSkip;
        b["webkitTransitionEnd #itemResult .maskWrap"] = this.itemAnimEnd;
        b["webkitAnimationEnd #itemResult .maskWrap"] = this.itemAnimEnd;
        b["webkitanimationend #itemResult .maskWrap"] = this.itemAnimEnd;
        b["animationend #itemResult .maskWrap"] = this.itemAnimEnd;
        return b
      },
      initialize: function(b)
      {
        this.listenTo(this, "remove", this.removeView);
        this.template = h.template(F);
        this.oldCharaModel = a.storage.userCharaList.toJSON();
        this.oldCardModel = a.storage.userCardList.toJSON();
        a.responseSetStorage(m);
        q.createCardList();
        this.allInitialized();
        this.itemAnimEndFlag = !1;
        this.createDom()
      },
      render: function()
      {
        var b = this.getPatrolAreaName(
        {
          apiResponse: m,
          patrolResultList: n[l]
        });
        this.$el.html(this.template(
        {
          model: n[l],
          getItems: this.getItems,
          gameUser: a.storage.gameUser.toJSON(),
          areaName: b
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
        k.getBaseData(a.getNativeObj());
        a.ready.hide();
        c = this;
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
        A = !1;
        v = {}
      },
      stepObserver: function(a)
      {
        switch (a)
        {
          case "firstStep":
            c.firstStep();
            break;
          case "charaExp":
            c.charaGaugeFunc();
            break;
          case "charaEp":
            c.epExpFunc();
            break;
          case "charaEpPop":
            c.unitEpPop();
            break;
          case "items":
            c.itemFunc()
        }
      },
      tapSkip: function(b)
      {
        !a.isScrolled() && b.currentTarget.classList.contains("active") && (b.preventDefault(), l >= n.length - 1 ? location.href = "#/PatrolTop" : (l++, this.itemAnimEndFlag = !1, this.allInitialized(), this.initItems(), b = this.getPatrolAreaName(
        {
          apiResponse: m,
          patrolResultList: n[l]
        }), this.$el.html(this.template(
        {
          model: n[l],
          getItems: this.getItems,
          gameUser: a.storage.gameUser.toJSON(),
          resultNum: n.length,
          resultCount: l + 1,
          areaName: b
        })), this.userUnitHandler(), k.getBaseData(a.getNativeObj()), c.stepObserver("firstStep")))
      },
      firstStep: function()
      {
        k.startSe(1601);
        c.stepObserver("charaExp")
      },
      treasureBoxPreload: function()
      {
        var a = ["bronze", "silver", "gold"],
          e = [];
        h.forEach(this.getItems, function(a)
        {
          "ADDED_DROP" === a.chestColor && -1 === e.indexOf(a.itemCode.toLowerCase()) && e.push(a.itemCode.toLowerCase())
        });
        var f = function()
          {
            var b = a[0],
              c = new Image;
            c.src = "/magica/resource/image_web/common/treasure/" + b + "_close.png";
            c.onload = function()
            {
              var d = new Image;
              d.src = "/magica/resource/image_web/common/treasure/" + b + "_open.png";
              d.onload = function()
              {
                a.shift();
                0 < a.length ? f() : 0 < e.length && g()
              }
            }
          },
          g = function()
          {
            var a = e[0],
              b = new Image;
            b.src = "/magica/resource/image_web/common/treasure/event/" + a + "_close.png";
            b.onload = function()
            {
              var b = new Image;
              b.src = "/magica/resource/image_web/common/treasure/event/" + a + "_open.png";
              b.onload = function()
              {
                e.shift();
                0 < e.length && g()
              }
            }
          };
        f()
      },
      initItems: function()
      {
        var b = n[l].dropRewardCodes;
        if (b)
        {
          var e = this,
            b = b.split(",");
          h.each(b, function(b, c)
          {
            var d = a.itemSet(b);
            d.itemCode ? (-1 < d.itemCode.indexOf("GIFT") ? d.imgPath = "/gift/" : -1 < d.itemCode.indexOf("MONEY") ? d.imgPath = "/main/" : -1 < d.itemCode.indexOf("riche") ? (e.rewardRiche += d.quantity | 0, d.imgPath = "/main/") : -1 < d.itemCode.indexOf("memoria_") ? d.imgPath = "/memoria/" : d.imgPath = -1 < d.itemCode.indexOf("EVENT_") ? "/event/" : "/main/", e.getItems.push(d)) : h.each(e.getItems, function(a, b)
            {
              a.itemCode == d.effectItemCode && (e.getItems[b].effectFlag = !0)
            })
          })
        }
        this.treasureBoxPreload()
      },
      userUnitHandler: function()
      {
        for (var b = 0; 5 > b; b++)
        {
          var e = n[l]["charaId" + (b + 1)];
          if (e)
          {
            var e = h.findWhere(a.storage.userCardListEx.toJSON(),
              {
                charaId: e
              }),
              c = h.findWhere(this.oldCardModel,
              {
                id: e.id
              });
            c.bondsTotalPt = h.findWhere(this.oldCharaModel,
            {
              charaId: e.charaId
            }).bondsTotalPt;
            this.beforeCards.push(
            {
              beforeModel: c,
              afterModel: e
            })
          }
        }
        u.prototype.parentView = this;
        u.prototype.template = h.template($("#unitPartTemp").text());
        var g = a.doc.createDocumentFragment();
        h.each(this.beforeCards, function(a, b)
        {
          a = new u(a);
          g.appendChild(a.render().el)
        });
        a.doc.getElementById("charaWrap").appendChild(g);
        g = null
      },
      charaGaugeFunc: function()
      {
        var b = function()
        {
          A ? setTimeout(function()
          {
            c.stepObserver("charaEp")
          }, 1E3) : c.stepObserver("charaEp")
        };
        c.timeOuts = setTimeout(function()
        {
          k.startSe(1007);
          for (var e = a.doc.getElementById("charaWrap").getElementsByTagName("li"),
              f = 0, g = e.length; f < g; f++)
          {
            var d = e[f];
            0 < f ? setTimeout(c.gaugeUp(c.unitExpBefore[f], c.unitExpAfter[f], d.getElementsByClassName("charaExGuage")[0], d, "charaEx", f), 500) : setTimeout(c.gaugeUp(c.unitExpBefore[f], c.unitExpAfter[f], d.getElementsByClassName("charaExGuage")[0], d, "charaEx", f, b), 500);
            a.addClass(d.getElementsByClassName("getExNum")[0], "anim");
            a.addClass(d.getElementsByClassName("exFlashWrap")[0], "active")
          }
        }, 1E3)
      },
      epExpFunc: function()
      {
        c.unitEpUpFlag = !1;
        c.timeOuts = setTimeout(function()
        {
          k.startSe(1007);
          for (var b = function()
            {
              c.trigger("showEpExp");
              0 < c.epUpUnit.length ? c.stepObserver("charaEpPop") : c.stepObserver("items")
            }, e = a.doc.getElementById("charaWrap").getElementsByTagName("li"), f = 0, g = e.length; f < g; f++)
          {
            var d = e[f];
            0 < f ? setTimeout(c.gaugeUp(c.unitEpBefore[f], c.unitEpAfter[f], d.getElementsByClassName("charaEpGuage")[0], d, "charaEp", f), 500) : setTimeout(c.gaugeUp(c.unitEpBefore[f], c.unitEpAfter[f], d.getElementsByClassName("charaEpGuage")[0], d, "charaEp", f, b), 500);
            a.addClass(d.getElementsByClassName("getEpExNum")[0], "anim");
            a.addClass(d.getElementsByClassName("epFlashWrap")[0], "active")
          }
        }, 500)
      },
      unitEpPop: function(b)
      {
        if (!a.resultView || !a.resultView.tapBlock)
        {
          b = a.storage.userCardListEx.findWhere(
          {
            cardId: c.epUpUnit[0][0].cardId
          }).toJSON();
          var e = {},
            f;
          1 < c.epUpUnit.length ? (a.tapBlock(!1), f = c.epUpUnit[0][0], f.chara = b.chara, e.before = q.addExStatus(f), e.before.episodeLevel = c.epUpUnit[0][1], e.after = q.addExStatus(b), e.type = "episode", a.resultView = new C(
          {
            model: new D(e)
          }, function()
          {
            c.unitEpPop()
          }), $("#overlapContainer").append(a.resultView.render().el), k.getBaseData(a.getNativeObj()), c.unitEpUpFlag = !0, c.epUpUnit.splice(0, 1)) : (a.tapBlock(!1), f = c.epUpUnit[0][0], f.chara = b.chara, e.before = q.addExStatus(f), e.before.episodeLevel = c.epUpUnit[0][1], e.after = q.addExStatus(b), e.type = "episode", a.resultView = new C(
          {
            model: new D(e)
          }, function()
          {
            c.stepObserver("items")
          }), $("#overlapContainer").append(a.resultView.render().el), k.getBaseData(a.getNativeObj()), c.unitEpUpFlag = !1, c.epUpUnit = [])
        }
      },
      nextBtnFunc: function(b)
      {
        if (b && (b.preventDefault(), a.isScrolled())) return;
        a.addClass(a.doc.getElementById("expWrap"), "off");
        a.removeClass(a.doc.getElementById("itemWrap"), "off");
        a.removeClass(a.doc.getElementById("itemResult"), "off");
        a.removeClass(a.doc.getElementById("getTotalRiche"), "off");
        a.removeClass(a.doc.getElementById("hasTotalRiche"), "off");
        setTimeout(function()
        {
          c.stepObserver("items")
        }, 500)
      },
      itemFunc: function()
      {
        var b = a.doc.getElementById("goldNum");
        c.countUp(0, n[l].riche + this.rewardRiche, b);
        b = a.doc.getElementById("getItemList").getElementsByTagName("li");
        a.addClass(a.doc.getElementById("itemResult"), "anim");
        1 > b.length ? c.timeOuts = setTimeout(function()
        {
          a.addClass(a.doc.getElementById("tapAction"), "active")
        }, 500) : k.startSe(1604)
      },
      itemAnimEnd: function()
      {
        this.itemAnimEndFlag || (this.itemAnimEndFlag = !0, 14 < a.doc.getElementById("getItemList").getElementsByTagName("li").length && (a.addClass(a.doc.getElementById("itemResult"), "canScroll"), a.scrollSet("itemResult", "itemScroll")), a.addClass(a.doc.getElementById("tapAction"), "active"))
      },
      countUp: function(b, c, f)
      {
        var e, d;
        a.storage.user && "IOS" === a.storage.user.get("platform") ? (e = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(a)
        {
          window.setTimeout(a, 10)
        }, d = window.cancelAnimationFrame || window.mozCancelAnimationFrame || function(a)
        {
          window.setTimeout(a)
        }) : (e = function(a)
        {
          window.setTimeout(a, 10)
        }, d = function(a)
        {
          window.clearTimeout(a)
        });
        var h = 0,
          k = null,
          l = c,
          n = function()
          {
            h++;
            if ("PatrolLumpResult" === a.location)
            {
              k || (k = (new Date).getTime());
              var c = (new Date).getTime() - k;
              if (50 >= h)
              {
                var g = Math.floor(c / 500 * (l - b)) + b | 0;
                499 < c ? (l = String(l).split("").reverse().join("").match(/\d{1,3}/g).join(",").split("").reverse().join(""), f.innerHTML = "+" + l.replace(/(\d)(?=(\d\d\d)+$)/g, "$1,"), d(m)) : (g = String(g).split("").reverse().join("").match(/\d{1,3}/g).join(",").split("").reverse().join(""), g = g.replace(/(\d)(?=(\d\d\d)+$)/g, "$1,"), f.innerHTML = "+" + g, m = e(n))
              }
              else d(m), h = 0
            }
          },
          m = e(n)
      },
      gaugeUp: function(b, c, f, g, d, h, k)
      {
        var e, l, n = null;
        a.storage.user && "IOS" === a.storage.user.get("platform") ? (e = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(a)
        {
          window.setTimeout(a, 10)
        }, l = window.cancelAnimationFrame || window.mozCancelAnimationFrame || function(a)
        {
          window.setTimeout(a)
        }) : (e = function(a)
        {
          window.setTimeout(a, 10)
        }, l = function(a)
        {
          window.clearTimeout(a)
        });
        var m = 0,
          p = "rank" === d ? 50 : 25,
          q = 0,
          r = 0,
          y = 0;
        "rank" === d && g && (y = Number(g.textContent));
        "charaEx" === d && g && (y = Number(g.getElementsByClassName("unitLv")[0].textContent));
        "charaEp" === d && g && (y = Number(g.getElementsByClassName("epLvNum")[0].textContent));
        var t = function()
        {
          m++;
          if ("PatrolLumpResult" === a.location)
          {
            n || (n = (new Date).getTime());
            var w = (new Date).getTime() - n;
            if (m <= p && b !== c)
            {
              var u = w / (10 * p),
                z = Math.floor((c - b) * u) + b - 100 * q | 0,
                x = 0;
              if ("rank" === d && 499 < w || "rank" !== d && 249 < w) u = 1, z = Math.floor(c - b) + b - 100 * q | 0;
              for (; 99 < z;) r++, x++, q++, z = Math.floor((c - b) * u) + b - 100 * q | 0;
              0 < x && ("rank" === d && g && (g.textContent = r + y), "charaEx" === d && g && (A = !0, setTimeout(function()
              {
                a.addClass(g.getElementsByClassName("lvup")[0], "anim");
                a.addClass(g.getElementsByClassName("afterUnitLv")[0], "c_red");
                a.addClass(g.getElementsByClassName("lvArrow")[0], "on");
                a.addClass(g.getElementsByClassName("afterUnitLv")[0], "on");
                g.getElementsByClassName("afterUnitLv")[0].textContent = r + y
              }, 500)), "charaEp" === d && g && (a.addClass(g.getElementsByClassName("epup")[0], "anim"), a.addClass(g.getElementsByClassName("epLvNum")[0], "c_red"), g.getElementsByClassName("epLvNum")[0].textContent = r + y));
              f.style.width = z + "%";
              "rank" === d && 499 < w || "rank" !== d && 249 < w ? (l(v[d + h]), m = 0, k && k()) : v[d + h] = e(t)
            }
            else m <= p && b === c || "rank" === d && 500 > w || "rank" !== d && 259 > w ? v[d + h] = e(t) : (l(v[d + h]), m = 0, k && k())
          }
        };
        v[d + h] = e(t)
      },
      questRetry: function(b)
      {
        b.preventDefault();
        a.isScrolled() || (location.href = "#/SupportSelect")
      },
      getPatrolAreaName: function(a)
      {
        var b = a.patrolResultList,
          c = "";
        h.each(a.apiResponse.userPatrolList, function(a, d, e)
        {
          a.patrolAreaId == b.patrolAreaId && (c = a.patrolArea.areaName)
        });
        return c
      },
      removeView: function()
      {
        this.trigger("removeChildView");
        v = a.resultView = null;
        c && c.timeOuts && clearTimeout(this.timeOuts);
        this.off();
        this.remove()
      }
    }),
    J = t.View.extend(
    {
      initialize: function()
      {
        this.listenTo(this, "remove", this.removeView);
        this.template = h.template(G);
        this.sdCharaList = [];
        for (var b = [500, 350, 650, 200, 800], c = 1024 === a.displayWidth ? Math.floor(a.doc.getElementsByTagName("body")[0].offsetHeight / 576 * 140) : 100, f = 0, g = 0; 5 > f; f++)
        {
          var d = n[l]["charaId" + (f + 1)];
          d && (this.sdCharaList.push(
          {
            index: f + 1,
            id: d + "00",
            x: b[g],
            y: c,
            scale: .7,
            fade: .3,
            isReverse: !1,
            animeList: "start" === p ? ["wait"] : ["stance"]
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
          type: p
        }));
        return this
      },
      createDom: function()
      {
        a.content.append(this.render().el);
        a.globalMenuView && a.globalMenuView.trigger("removeView");
        k.showMultiMiniChara(this.sdCharaList);
        a.ready.hide()
      },
      animationTrigger: function(b)
      {
        switch (b.currentTarget.id)
        {
          case "curtainWrapL":
            h.each(this.sdCharaList, function(a)
            {
              a.animeList = "start" === p ? ["stance"] : ["reaction"]
            });
            k.showMultiMiniChara(this.sdCharaList);
            a.addClass(a.doc.getElementById("textWrap"), "anim");
            break;
          case "textBg2":
            b = "start" === p ? 500 : 1E3, setTimeout(function()
            {
              this.removeView()
            }.bind(this), b)
        }
      },
      removeView: function()
      {
        k.hideMultiMiniChara();
        this.off();
        this.remove();
        r = null;
        "start" !== p ? x = new I : location.href = "#/PatrolTop"
      }
    }),
    K = function(a)
    {
      var b = [],
        c = a.apiResponse;
      h.each(c.userPatrolResultList, function(a, d, e)
      {
        h.each(c.userPatrolList, function(c, d, e)
        {
          a.patrolAreaId == c.patrolAreaId && (a.areaKey = c.patrolArea.areaKey, b.push(a))
        })
      });
      n = h.sortBy(b, function(a)
      {
        return a.areaKey
      })
    },
    E = function()
    {
      a.androidKeyStop = !0;
      a.setStyle(H);
      l = 0;
      n = [];
      K(
      {
        apiResponse: m
      });
      r = new J;
      k.setWebView()
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
      k.startBgm("bgm03_movie37", !0);
      k.changeBg("web_patrol_page_0" + a.patrolBgIndex + ".ExportJson")
    },
    fetch: function()
    {
      B.pageModelGet(this.needModelIdObj)
    },
    init: function()
    {
      $(a.ready.target).on("webkitAnimationEnd", function(b)
      {
        "readyFadeOut" == b.originalEvent.animationName && (a.ready.target.className = "")
      });
      a.patrolStartResponse ? (p = "start", m = a.patrolStartResponse) : (p = "end", m = a.patrolEndResponse);
      a.patrolStartResponse = null;
      a.patrolEndResponse = null;
      window.isLocal && !m ? B.ajaxPost(a.linkList.patrolLumpEnd,
      {}, function(a)
      {
        p = "end";
        m = a;
        E()
      }) : E()
    },
    remove: function(b)
    {
      k.hideMultiMiniChara();
      a.patrolStartResponse = null;
      a.patrolEndResponse = null;
      $("#commandDiv").off();
      a.androidKeyStop = !1;
      m = p = null;
      r && r.removeView();
      x && x.removeView();
      b()
    }
  }
});
