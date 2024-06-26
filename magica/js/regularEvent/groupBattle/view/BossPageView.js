define("underscore backbone backboneCommon ajaxControl command text!template/regularEvent/groupBattle/RegularEventGroupBattleBoss.html text!css/regularEvent/groupBattle/RegularEventGroupBattleBoss.css QuestUtil".split(" "), function(f, n, b, w, g, x, y, z)
{
  n.Model.extend();
  var k, h = [],
    B = n.View.extend(
    {
      events: function()
      {
        var a = {};
        a[b.cgti + " #rewardBtn"] = this.gbCommon.rewardPopup;
        a[b.cgti + " #missionBtn"] = this.gbCommon.missionPopup;
        a[b.cgti + " #battleLogBtn"] = this.gbCommon.battleLogPopup;
        a[b.cgti + " .selectDifficultyBtn"] = this.gbCommon.difficultyPopup;
        a[b.cgti + " #menuBtn"] = this.menuPopup;
        a[b.cgti + " #eventNaviBtn"] = this.eventNaviPopup;
        a[b.cgti + " #miniCharaList .memberWrap"] = this.charaTouch;
        a[b.cgti + " .battleStartBtn"] = this.battleStart;
        a[b.cgti + " .debugBtn"] = this.debug;
        return a
      },
      initialize: function(a)
      {
        b.setStyle(y);
        this.listenTo(b.storage.userItemList, "change", this.reRenderItem);
        k = [];
        this.timerArr = [];
        this.battleDetailModel = b.GroupBattleDetailModel;
        this.template = f.template(x);
        this.isAttack = this.isBossDefeat = this.isUpgarade = !1;
        this.gbCommon.resultPopupFlag || (this.isUpgarade = b.groupBattleGrade && b.groupBattleGrade !== this.pageJson.userRegularEventGroupBattle.grade ? !0 : !1, this.isBossDefeat = b.GroupBattleDetailModel && b.BeforeGroupBattleDetailModel && b.BeforeGroupBattleDetailModel.boss.level < b.GroupBattleDetailModel.boss.level ? !0 : !1, this.isAttack = this.nativeJson && this.nativeJson.UserRegularEventGroupBattleResultList && "SIMULATE" == this.nativeJson.UserRegularEventGroupBattleResultList[0].groupBattleStatus || !b.BeforeGroupBattleDetailModel || !this.pageJson.playedQuestBattleId ? !1 : !0);
        this.createSdCharaList();
        this.createDom();
        if (this.gbCommon.resultPopupFlag)
        {
          this.gbCommon.resultPopupFlag = !1;
          a = function()
          {
            this.pageJson.dailyResult.supportPt = this.pageJson.eventMaster.regularEventGroupBattle.addGoodOpponentNum * this.pageJson.dailyResult.goodCount;
            var a = f.template($("#dailyResultPartsTemp").text());
            new b.PopupClass(
            {
              title: "キモチ戦",
              content: a(this.pageJson.dailyResult),
              popupType: "typeA",
              popupId: "dailyResultPopup",
              closeBtnText: "OK"
            })
          }.bind(this);
          var c = function(a)
          {
            var c = f.template($("#AnnounceRankingPartsTemp").text()),
              q = 1 === this.pageJson.dailyResult.memberRanking;
            new b.PopupClass(
            {
              title: "前日の結果",
              content: c(
              {
                model: this.pageJson,
                isTopUser: q
              }),
              popupType: q ? "typeB" : "typeA",
              popupId: "finalRoundStartPopup",
              closeBtnText: "OK"
            }, null, null, a)
          }.bind(this);
          this.pageJson.dailyResult.finalRoundFirstAccess ? this.gbCommon.firstCutin(a) : "final" == this.pageJson.eventStatus && 1 == this.pageJson.dailyResult.memberRanking ? c(a) : a()
        }
        b.groupBattleGrade = null;
        b.BeforeGroupBattleDetailModel = null
      },
      render: function()
      {
        var a = Object.assign(
        {}, JSON.parse(JSON.stringify(this.pageJson)));
        a.battleDetailModel = this.battleDetailModel;
        var c = function(a, b)
        {
          var c = 100;
          0 < a && (c = a / b * 100);
          100 < c && (c = 100);
          return c = c.toFixed(2)
        };
        a.attackDamage = null;
        this.isBossDefeat ? (this.beforeHp = this.maxHp = b.BeforeGroupBattleDetailModel.boss.maxHp, this.afterHp = this.battleDetailModel.boss.currentHp, this.beforeHpRate = "100.0", this.afterHpRate = c(this.afterHp, this.maxHp)) : this.isAttack ? (a.attackDamage = a.hpRateAfter - a.hpRateBefore, this.maxHp = this.battleDetailModel.boss.maxHp, this.beforeHp = b.BeforeGroupBattleDetailModel.boss.currentHp, this.afterHp = this.battleDetailModel.boss.currentHp, this.beforeHpRate = c(this.beforeHp, this.maxHp), this.afterHpRate = c(this.afterHp, this.maxHp)) : (this.maxHp = this.battleDetailModel.boss.maxHp, this.afterHp = this.beforeHp = this.battleDetailModel.boss.currentHp, this.afterHpRate = this.beforeHpRate = c(this.beforeHp, this.maxHp));
        a.beforeHp = this.beforeHp;
        a.afterHp = this.afterHp;
        a.beforeHpRate = this.beforeHpRate;
        a.afterHpRate = this.afterHpRate;
        var e = this.difficultyId,
          c = f.find(this.pageJson.difficultyList, function(a)
          {
            return a.difficultyId == e
          });
        a.difficultyLabel = c ? c.label : null;
        this.$el.html(this.template(a));
        return this
      },
      debug: function(a)
      {
        a.preventDefault();
        if (!b.isScrolled()) switch (a.currentTarget.dataset.type)
        {
          case "UpgradeAnim":
            b.groupBattleGrade = "AAA";
            this.upgradeAnim();
            b.groupBattleGrade = null;
            break;
          case "resurrectAnim":
            new v;
            break;
          case "attackAnim":
            this.attackAnim();
            break;
          case "defeatAnim":
            this.defeatAnim()
        }
      },
      createDom: function()
      {
        b.content.append(this.render().el);
        this.isBossDefeat ? m(b.BeforeGroupBattleDetailModel.boss.maxHp) : this.isAttack ? m(b.BeforeGroupBattleDetailModel.boss.currentHp) : m(this.battleDetailModel.boss.currentHp);
        g.showMultiMiniChara(k);
        this.gbCommon.clearMissionCount();
        this.isUpgarade ? this.upgradeAnim() : this.isBossDefeat ? this.defeatAnim() : this.isAttack && (this.pageJson.playedQuestBattleId = null, this.attackAnim())
      },
      reRenderItem: function()
      {
        var a = b.storage.userItemList.findWhere(
          {
            itemId: "EVENT_GROUPBATTLE_" + this.pageJson.eventMaster.regularEventId + "_COIN"
          }),
          a = a ? a.get("quantity") : 0;
        this.pageJson.shopItemQuantity = a;
        b.doc.getElementById("shopItemQuantity").innerHTML = a
      },
      charaTouch: function(a)
      {
        a.preventDefault();
        b.isScrolled() || this.gbCommon.battleLogPopup(a)
      },
      eventNaviPopup: function(a)
      {
        a.preventDefault();
        b.isScrolled() || b.eventFirstNavi(["navi_05"], this.pageJson.eventMaster.regularEventId, "groupBattle", null, !0, "regularEvent")
      },
      selectDifficulty: function(a)
      {
        a.preventDefault();
        b.isScrolled() || new SelectDiffcultyView
      },
      createSdCharaList: function()
      {
        k = [
        {
          index: 1,
          id: this.pageJson.eventMaster.viewParameterMap.BOSS_ID + "00",
          x: this.battleDetailModel.boss.posX | 0,
          y: this.battleDetailModel.boss.posY | 0,
          scale: (this.battleDetailModel.boss.scale | 0) / 1E3,
          fade: 0,
          isReverse: !0,
          animeList: ["stance"]
        }];
        var a = [];
        "preliminary" == this.pageJson.eventStatus ? a.push(
        {
          id: 2001,
          x: 762,
          x2: 732,
          y: 190,
          y2: 170,
          animeList: ["stance"]
        }) : (a.push(
        {
          id: 2005,
          x: 606,
          x2: 576,
          y: 265,
          y2: 235,
          name: "マミ",
          animeList: ["stance_con"]
        }), a.push(
        {
          id: 1022,
          x: 625,
          x2: 600,
          y: 158,
          y2: 143,
          name: "きらり",
          animeList: ["stance"]
        }), a.push(
        {
          id: 2006,
          x: 802,
          x2: 732,
          y: 168,
          y2: 148,
          name: "杏子",
          animeList: ["stance_con"]
        }), a.push(
        {
          id: 2004,
          x: 970,
          x2: 860,
          y: 168,
          y2: 153,
          name: "さやか",
          animeList: ["flatline"]
        }), a.push(
        {
          id: 1301,
          x: 719,
          x2: 669,
          y: 248,
          y2: 218,
          name: "いろは・やちよ",
          animeList: ["flatline"]
        }), a.push(
        {
          id: 2003,
          x: 818,
          x2: 748,
          y: 270,
          y2: 240,
          name: "ほむら",
          animeList: ["wait"]
        }), a.push(
        {
          id: 2001,
          x: 896,
          x2: 796,
          y: 222,
          y2: 202,
          name: "まどか",
          animeList: ["stance"]
        }));
        b.storage.gameUser.get("userId");
        for (var c = 0, e = this.pageJson.sortedRankingList.length > a.length ? a.length : this.pageJson.sortedRankingList.length; c < e;)
        {
          var d = this.pageJson.sortedRankingList[c],
            q = {
              index: c + 2,
              id: (d ? String(d.leaderCardId).slice(0, 4) : String(a[c].id)) + "00",
              x: 1024 === b.displayWidth ? a[c].x : a[c].x2,
              y: 1024 === b.displayWidth ? a[c].y : a[c].y2,
              objX: a[c].x - 63,
              objY: a[c].y,
              scale: 1024 === b.displayWidth ? .5 : .4,
              fade: 0,
              isReverse: !1,
              animeList: a[c].animeList
            };
          d && (this.pageJson.sortedRankingList[c].charaModel = q);
          k.push(q);
          c = c + 1 | 0
        }
        k = f.sortBy(k, function(a)
        {
          return -a.y
        })
      },
      upgradeAnim: function()
      {
        this.isBossDefeat ? r.prototype.callback = this.defeatAnim : this.isAttack && (r.prototype.callback = this.attackAnim);
        new r
      },
      attackAnim: function()
      {
        var a = this,
          c = b.doc.getElementById("bossHpGauge"),
          e = b.doc.createElement("div");
        e.id = "tapEffectCancel";
        b.doc.getElementById("overlapContainer").appendChild(e);
        $("#tapEffectCancel").on(b.cgti, t.bind(this));
        var d = [];
        f.each(k, function(a)
        {
          1 != a.index && (a = Object.assign(
          {}, a), a.animeList = ["stance_con"], d.push(a))
        });
        g.showMultiMiniChara(d);
        h.push(setTimeout(function()
        {
          function d()
          {
            clearTimeout(f);
            l -= p * (e + 1);
            l < a.afterHp && (l = a.afterHp);
            m(l);
            e = e + 1 | 0;
            l > a.afterHp ? (console.log("cnt", e), f = setTimeout(d, 100), h.push(f)) : clearTimeout(f)
          }
          g.playEffect(
          {
            name: "web_regular_battle_ef_01",
            action: "ef_attack",
            x: 0,
            y: 0,
            scale: 1024 === b.displayWidth ? 1 : .8
          });
          window.isBrowser && setTimeout(nativeCallback, 800);
          c && (c.className = "decrease", c.style.width = c.dataset.after);
          var e = 0,
            p = parseInt((a.beforeHp - a.afterHp) / 100);
          1 > p && (p = 1);
          var l = a.beforeHp,
            f = 0;
          d()
        }, 1E3));
        h.push(setTimeout(function()
        {
          t()
        }, 4500))
      },
      defeatAnim: function()
      {
        var a = this,
          c = b.doc.getElementById("bossHpGauge"),
          e = b.doc.createElement("div");
        e.id = "tapEffectCancel";
        b.doc.getElementById("overlapContainer").appendChild(e);
        $("#tapEffectCancel").on(b.cgti, u.bind(this));
        var d = [];
        f.each(k, function(a)
        {
          1 != a.index && (a = Object.assign(
          {}, a), a.animeList = ["stance_con"], d.push(a))
        });
        g.showMultiMiniChara(d);
        h.push(setTimeout(function()
        {
          function d()
          {
            clearTimeout(k);
            l -= f * (e + 1);
            0 > l && (l = 0);
            m(l);
            e = e + 1 | 0;
            0 < l && (k = setTimeout(d, 100), h.push(k))
          }
          g.playEffect(
          {
            name: "web_regular_battle_ef_01",
            action: "ef_attack",
            x: 0,
            y: 0,
            scale: 1024 === b.displayWidth ? 1 : .8
          });
          window.isBrowser && setTimeout(nativeCallback, 800);
          c && (c.className = "decrease", c.style.width = "0.0%");
          var e = 0,
            f = parseInt(a.beforeHp / 100);
          1 > f && (f = 1);
          var l = a.beforeHp,
            k = 0;
          d()
        }, 1E3));
        h.push(setTimeout(function()
        {
          g.playEffect(
          {
            name: "web_regular_battle_ef_01",
            action: "ef_hit",
            x: 0,
            y: 0,
            scale: 1024 === b.displayWidth ? 1 : .8
          });
          window.isBrowser && setTimeout(nativeCallback, 800);
          m(0)
        }, 4500));
        h.push(setTimeout(function()
        {
          g.playEffect(
          {
            name: "web_regular_battle_ef_01",
            action: "ef_go_out",
            x: 0,
            y: 0,
            scale: 1024 === b.displayWidth ? 1 : .8
          });
          window.isBrowser && setTimeout(nativeCallback, 800);
          var a = Object.assign(
          {}, f.find(k, function(a)
          {
            return 1 == a.index
          }));
          a.y = -2E4;
          g.showMultiMiniChara([a]);
          h.push(setTimeout(function()
          {
            var a = [];
            f.each(k, function(b)
            {
              1 != b.index && (b = Object.assign(
              {}, b), b.animeList = ["reaction"], a.push(b))
            });
            g.showMultiMiniChara(a)
          }, 800))
        }, 6E3));
        h.push(setTimeout(function()
        {
          function d()
          {
            clearTimeout(n);
            l += p * (e + 1);
            l >= a.maxHp && (l = a.maxHp);
            m(l);
            e = e + 1 | 0;
            l < a.maxHp && (n = setTimeout(d, 100), h.push(n))
          }
          g.playEffect(
          {
            name: "web_regular_battle_ef_01",
            action: "ef_resurrect",
            x: 0,
            y: 0,
            scale: 1024 === b.displayWidth ? 1 : .8
          });
          window.isBrowser && setTimeout(nativeCallback, 800);
          a.maxHp = b.GroupBattleDetailModel.boss.maxHp;
          c && (c.className = "increase", c.style.width = "100.0%");
          var e = 0,
            p = parseInt(a.maxHp / 100);
          1 > p && (p = 1);
          var l = 0,
            n = 0;
          d();
          var r = f.find(k, function(a)
          {
            return 1 == a.index
          });
          h.push(setTimeout(function()
          {
            g.showMultiMiniChara([r]);
            h.push(setTimeout(function()
            {
              c && (c.className = "")
            }, 500));
            h.push(setTimeout(function()
            {
              u()
            }, 1500))
          }, 1E3))
        }, 1E4))
      },
      battleStart: function(a)
      {
        a.preventDefault();
        if (!b.isScrolled())
        {
          var c = b.storage.userQuestBattleList.findWhere(
            {
              questBattleId: this.battleDetailModel.boss.questBattleId
            }),
            c = c ? c.toJSON() : !1,
            e;
          c && (e = (e = b.storage.userSectionList.findWhere(
          {
            sectionId: c.questBattle.sectionId
          })) ? e.toJSON() :
          {});
          b.questBattleModel = A(e, c);
          b.groupBattleGrade = this.pageJson.userRegularEventGroupBattle.grade;
          console.log(b.questBattleModel);
          b.questBattleModel ? ("simulate" == a.currentTarget.dataset.type && (b.questBattleModel.isSimulate = !0), !b.questBattleModel.isSimulate && 0 >= this.pageJson.userRegularEventGroupBattle.remainBattleCount ? new b.PopupClass(
          {
            title: "エラー",
            content: "本日の挑戦回数が残っていません。<br><br>毎日16:00に挑戦回数が回復します。<br><p class='c_red'>※模擬戦では何度でもバトルすることができます。</p>",
            closeBtnText: "OK"
          }) : location.href = "#/DeckFormation/group") : new b.PopupClass(
          {
            title: "クエスト確認",
            content: "クエストを開始できません",
            closeBtnText: "閉じる"
          }, null, null, function()
          {
            location.href = "#/MyPage"
          })
        }
      },
      removeView: function()
      {
        $("#commandDiv").off();
        f.each(h, function(a)
        {
          clearTimeout(a)
        });
        h = [];
        g.stopEffect();
        g.hideMultiMiniChara();
        k = null;
        this.off();
        this.remove()
      }
    }),
    m = function(a)
    {
      var c = f.template($("#hpTextPartsTemp").text()),
        e = b.doc.getElementsByClassName("bossHpTextWrap")[0];
      e && (e.innerHTML = "", e.innerHTML = c(
      {
        currentHp: a
      }))
    },
    t = function()
    {
      $("#commandDiv").off();
      f.each(h, function(a)
      {
        clearTimeout(a)
      });
      h = [];
      g.stopEffect();
      var a = b.doc.getElementById("bossHpGauge");
      a && (a.className = "", a.style.width = a.dataset.after);
      m(b.GroupBattleDetailModel.boss.currentHp);
      g.showMultiMiniChara(k);
      if (a = b.doc.getElementById("totalDamageWrap")) a.className = "fadeOut";
      if (a = b.doc.getElementById("tapEffectCancel")) $(a).off(b.cgti, t.bind(this)), a.remove()
    },
    u = function()
    {
      $("#commandDiv").off();
      f.each(h, function(a)
      {
        clearTimeout(a)
      });
      h = [];
      g.stopEffect();
      var a = b.doc.getElementById("bossHpGauge");
      a && (a.className = "", a.style.width = a.dataset.after);
      m(b.GroupBattleDetailModel.boss.currentHp);
      g.showMultiMiniChara(k);
      if (a = b.doc.getElementById("tapEffectCancel")) $(a).off(b.cgti, u.bind(this)),
        a.remove();
      b.doc.getElementById("ResurrectAnimationContainer") || new v
    },
    r = n.View.extend(
    {
      id: "UpgradeAnimationContainer",
      events: function()
      {
        var a = {};
        a[b.cgti + " #touchScreen"] = this.touchScreen;
        a["webkitTransitionEnd .touchScreenStart"] = this.touchScreenStart;
        a["webkitAnimationEnd .touchScreenStart"] = this.touchScreenStart;
        a["webkitanimationend .touchScreenStart"] = this.touchScreenStart;
        a["animationend .touchScreenStart"] = this.touchScreenStart;
        return a
      },
      initialize: function(a)
      {
        this.template = f.template($("#UpgradePartsTemp").text());
        this.createDom()
      },
      render: function()
      {
        this.$el.html(this.template());
        return this
      },
      createDom: function()
      {
        var a = b.doc.getElementById("overlapContainer");
        a.appendChild(this.render().el);
        a.style.width = "100%";
        b.doc.getElementById("curtain").className = "show";
        setTimeout(function()
        {
          g.startSe(1101)
        }, 500)
      },
      touchScreenStart: function(a)
      {
        b.removeClass(b.doc.getElementsByClassName("touch_screen")[0], "hide");
        b.removeClass(b.doc.getElementById("touchScreen"), "hide")
      },
      touchScreen: function(a)
      {
        a.preventDefault();
        b.isScrolled() || (b.doc.getElementById("curtain").className = "", this.removeView())
      },
      removeView: function()
      {
        b.doc.getElementById("overlapContainer").style.width = "";
        this.off();
        this.remove();
        this.callback && (this.callback(), this.callback = null)
      }
    }),
    v = n.View.extend(
    {
      id: "ResurrectAnimationContainer",
      events: function()
      {
        var a = {};
        a["webkitTransitionEnd .animationEnd"] = this.removeView;
        a["webkitAnimationEnd .animationEnd"] = this.removeView;
        a["webkitanimationend .animationEnd"] = this.removeView;
        a["animationend .animationEnd"] = this.removeView;
        return a
      },
      initialize: function(a)
      {
        this.template = f.template($("#ResurrectPartsTemp").text());
        this.createDom()
      },
      render: function()
      {
        this.$el.html(this.template());
        return this
      },
      createDom: function()
      {
        var a = b.doc.getElementById("overlapContainer");
        a.appendChild(this.render().el);
        a.style.width = "100%";
        b.doc.getElementById("curtain").className = "show";
        setTimeout(function()
        {
          g.startSe(3103)
        }, 500)
      },
      removeView: function()
      {
        b.doc.getElementById("overlapContainer").style.width = "";
        b.doc.getElementById("curtain").className = "";
        this.off();
        this.remove()
      }
    }),
    A = function(a, b)
    {
      if (!a || !b) return !1;
      var c = w.getPageJson(),
        d = {};
      a = a.section;
      d.questType = a.questType;
      d.title = "キモチ戦";
      d.battleTitle = "";
      d.userQuestAdventureList = c.userQuestAdventureList;
      d.rewardCodeArr = [];
      a.secret && (d.secret = a.secret);
      d.groupId = c.userRegularEventGroupBattle.groupId;
      d.questBattle = b.questBattle;
      d.eventFlag = !0;
      d.ap = b.questBattle.ap;
      d.difficulty = b.questBattle.difficulty;
      d.cleared = b.cleared;
      d.missionStatus1 = b.missionStatus1;
      d.missionStatus2 = b.missionStatus2;
      d.missionStatus3 = b.missionStatus3;
      b = z.dropItemJson(b);
      b.firstClearReward && (d.firstClearReward = b.firstClearReward);
      b.firstClearRewardName && (d.firstClearRewardName = b.firstClearRewardName);
      b.firstClearRewardQuantity && (d.firstClearRewardQuantity = b.firstClearRewardQuantity);
      b.addDropItem && (d.addDropItem = b.addDropItem);
      b.addDropItemName && (d.addDropItemName = b.addDropItemName);
      b.addDropItemQuantity && (d.addDropItemQuantity = b.addDropItemQuantity);
      d.rewardCodeArr = b.list;
      d.rewardNameArr = b.nameList;
      d.rewardQuantityArr = b.quantityList;
      return d
    };
  return B
});
