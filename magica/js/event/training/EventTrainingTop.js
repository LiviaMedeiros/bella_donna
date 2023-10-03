define("underscore backbone backboneCommon ajaxControl command text!template/event/training/EventTrainingTop.html text!css/event/training/EventTrainingTop.css text!css/quest/QuestCommon.css js/view/quest/QuestListPartsView QuestUtil cardUtil".split(" "), function(f, D, a, p, w, E, F, G, x, A, H)
{
  var d, g, k, q, e, l, m, r, t, y, z, B, u, C = {
      STORY: "◆ ストーリークエスト",
      COMPOSE: "◆ 強化クエスト",
      EPISODE: "◆ エピソードクエスト",
      EXTRA: "◆ エクストラクエスト",
      CHALLENGE: "◆ EXチャレンジクエスト"
    },
    n = {
      STORY: !1,
      COMPOSE: !1,
      EPISODE: !1,
      EXTRA: !1,
      CHALLENGE: !1
    },
    I = ["navi_01", "navi_02", "navi_03"],
    K = D.View.extend(
    {
      events: function()
      {
        var b = {};
        b[a.cgti + " .tabBtn"] = this.tabChange;
        b[a.cgti + " #helpBtn"] = this.helpPopup;
        b[a.cgti + " .missionBtn"] = this.missionToggle;
        return b
      },
      initialize: function(a)
      {
        this.displayCardIdList = [];
        this.template = f.template(E);
        this.createDom()
      },
      render: function()
      {
        d.eventMaster = g;
        d.displayCardIdList = this.displayCardIdList;
        this.$el.html(this.template(d));
        return this
      },
      createDom: function()
      {
        a.setGlobalView();
        var b = this;
        z = [];
        var c = d.gameUser.trainingSelectedCharaNos.split(",");
        f.each(c, function(c, h)
        {
          k && k.charaIdDefaultCardIdMap && k.charaIdDefaultCardIdMap[c] ? h = k.charaIdDefaultCardIdMap[c] : (h = a.storage.userCardListEx.findWhere(
          {
            charaId: Number(c)
          }).toJSON().displayCardId, z.push(a.storage.userCardListEx.findWhere(
          {
            charaId: Number(c)
          }).toJSON()));
          b.displayCardIdList.push(h)
        });
        a.content.append(this.render().el);
        c = (c = a.storage.userItemList.findWhere(
        {
          itemId: "EVENT_TRAINING_" + g.eventId
        })) ? c.toJSON().quantity : "0";
        a.doc.querySelector("#itemNum").innerText = c;
        m = {
          STORY: a.doc.querySelector("#storyQuest"),
          COMPOSE: a.doc.querySelector("#composeQuest"),
          EPISODE: a.doc.querySelector("#episodeQuest"),
          EXTRA: a.doc.querySelector("#extraQuest"),
          CHALLENGE: a.doc.querySelector("#extraChallengeQuest")
        };
        r = {
          STORY: a.doc.querySelector("#storyTabBtn"),
          COMPOSE: a.doc.querySelector("#composeTabBtn"),
          EPISODE: a.doc.querySelector("#episodeTabBtn"),
          EXTRA: a.doc.querySelector("#extraTabBtn"),
          CHALLENGE: a.doc.querySelector("#exchallengeTabBtn")
        };
        this.createView();
        a.addClass(m[e], "show");
        a.addClass(r[e], "current");
        a.doc.querySelector("#questWrapTitle").innerText = C[e];
        a.scrollSet("scrollOuter", "scrollInner");
        u && !n[e] && a.forceScrollPreset("scrollOuter", "scrollInner", u, !0);
        w.getBaseData(a.getNativeObj());
        a.ready.hide()
      },
      createView: function()
      {
        q = this.campaignData = null;
        d.campaignList && (this.campaignData = a.campaignParse(d.campaignList));
        this.campaignData && this.campaignData.HALF_AP && f.each(this.campaignData.HALF_AP.questType, function(a, c)
        {
          if ("EVENT_S" == a || "ALL" == a) q = !0
        });
        n = {
          STORY: !1,
          COMPOSE: !1,
          EPISODE: !1,
          EXTRA: !1,
          CHALLENGE: !1
        };
        x.prototype.template = f.template($("#QuestListParts").text());
        x.prototype.parentView = this;
        t = f.filter(d.userSectionList, function(a)
        {
          return "EVENT_S" == a.section.questType
        });
        y = f.filter(d.userQuestBattleList, function(a)
        {
          return 5E5 <= a.questBattle.sectionId && 7E5 > a.questBattle.sectionId
        });
        B = 0;
        f.each(t, function(a)
        {
          a.section.questBattleList = [];
          f.each(y, function(h)
          {
            h.questBattle.sectionId == a.sectionId && (h.cleared && B++, a.section.questBattleList.push(h))
          });
          a.section.questBattleList.sort(function(a, b)
          {
            return a.questBattle.sectionIndex - b.questBattle.sectionIndex
          });
          var b = a.section.parameter.split("=")[1],
            d = m[b];
          e || "STORY" != b || (e = "STORY");
          d && (console.log("trainingType:", b), d.appendChild(J(a)))
        });
        a.doc.querySelector("#storyQuest li") || a.removeClass(a.doc.querySelector("#tabBtns"), "btnS");
        p.getPageJson().userEventTraining.isReselect || (a.doc.querySelector("#charaChangeLink").style.display = "none");
        e || (e = "COMPOSE");
        a.eventTrainingSelectedTab && (e = a.eventTrainingSelectedTab)
      },
      modelSend: function(a)
      {
        var b = a.currentTarget.parentNode.dataset.sectionId;
        return f.filter(t, function(a)
        {
          return a.sectionId == b
        })[0]
      },
      helpPopup: function(b)
      {
        b.preventDefault();
        a.isScrolled() || a.eventFirstNavi(I, g.eventId, "training", function() {}, !0)
      },
      missionToggle: function(b)
      {
        b.preventDefault();
        if (!a.isScrolled())
        {
          b = a.doc.querySelector("#scrollOuter .scrollInner");
          var c = a.doc.querySelector("#scrollOuter .scrollInner").className; - 1 !== c.indexOf("first") ? b.className = "second scrollInner" : -1 !== c.indexOf("second") && (b.className = "first scrollInner")
        }
      },
      tabChange: function(b)
      {
        b.preventDefault();
        if (!a.isScrolled())
        {
          var c = b.currentTarget.dataset.id;
          a.eventTrainingSelectedTab = b.currentTarget.dataset.id;
          a.removeClass(a.doc.querySelector(".tabBtn.current"), "current");
          a.removeClass(a.doc.querySelector("#scrollOuter .show"), "show");
          a.addClass(m[c], "show");
          a.addClass(r[c], "current");
          a.doc.querySelector("#questWrapTitle").innerText = C[c];
          a.scrollRefresh()
        }
      }
    }),
    J = function(b)
    {
      var c = [];
      f.each(b.section.questBattleList, function(a, v)
      {
        v = b.section.parameter.split("=")[1];
        if (!n[v] || a.cleared)
        {
          switch (a.questBattle.sectionIndex)
          {
            case 1:
              a.questTitle = "BATTLE ◆ 初級";
              a.questClass = "初級";
              break;
            case 2:
              a.questTitle = "BATTLE ◆ 中級";
              a.questClass = "中級";
              break;
            case 3:
              a.questTitle = "BATTLE ◆ 上級";
              a.questClass = "上級";
              break;
            case 4:
              a.questTitle = "BATTLE ◆ 超級", a.questClass = "超級"
          }
          a.questBattle.title && (a.questTitle = a.questBattle.title, a.questClass = a.questBattle.title);
          a.eventObj = A.openEventCheck(g.eventId, d.eventList);
          a.eventObj.parameter = g.name.split(" ")[1];
          c.push(a);
          n[v] && a.cleared || a.cleared || (n[v] = !0)
        }
      });
      c.sort(function(a, b)
      {
        return a.questBattle.sectionIndex > b.questBattle.sectionIndex ? -1 : a.questBattle.sectionIndex < b.questBattle.sectionIndex ? 1 : 0
      });
      var e = a.doc.createDocumentFragment();
      f.each(c, function(b, c)
      {
        b.missionRewardCode = a.itemSet(b.questBattle.missionRewardCode);
        b.chestColor = b.missionRewardCode.chestColor;
        q && (b.halfAp = Math.ceil(b.questBattle.ap / 2));
        c = new x(
        {
          model: b,
          events: function()
          {
            var b = {};
            b[a.cgti + " .touchObj"] = L;
            b[a.cgti + " .treasure"] = this.popupQuestDetail;
            return b
          }
        });
        c.el.dataset.scrollHash = b.questBattleId;
        c.el.dataset.sectionId = b.questBattle.sectionId;
        e.appendChild(c.render().el)
      });
      return e
    },
    L = function(b)
    {
      b.preventDefault();
      if (!a.isScrolled())
      {
        var c = this;
        if (p.getPageJson().userEventTraining.isReselect)
        {
          var d = "";
          f.each(z, function(a)
          {
            a.maxLevel == a.level && a.maxRare == Number(a.card.rank.split("_")[1]) && 5 == a.episodeLevel ? d = "allMaxFlag" : a.maxLevel == a.level && a.maxRare == Number(a.card.rank.split("_")[1]) ? d = "lvMaxFlag" : 5 == a.episodeLevel && (d = "epMaxFlag")
          });
          var e = "いずれかの特訓クエストをクリアすると、<br>特訓対象の魔法少女を変更することができなくなります。<br>よろしいですか？";
          switch (d)
          {
            case "allMaxFlag":
              e += '<br><br><span class="c_red selectCaution">※Lv、エピソードLvが最大の魔法少女が選択されています。<br>これ以上EXP、エピソードPtを入手することはできません。</span>';
              break;
            case "lvMaxFlag":
              e += '<br><br><span class="c_red selectCaution">※Lvが最大の魔法少女が選択されています。<br>これ以上EXPを入手することはできません。</span>';
              break;
            case "epMaxFlag":
              e += '<br><br><span class="c_red selectCaution">※エピソードLvが最大の魔法少女が選択されています。<br>これ以上エピソードPtを入手することはできません。</span>'
          }
          new a.PopupClass(
          {
            title: "特訓する魔法少女の決定",
            content: e,
            closeBtnText: "キャンセル",
            decideBtnText: "OK"
          }, null, function()
          {
            $("#popupArea .decideBtn").on(a.cgti, function(d)
            {
              d.preventDefault();
              a.isScrolled() || c.questStart(b)
            })
          })
        }
        else this.questStart(b)
      }
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
      id: "pieceList"
    },
    {
      id: "itemList"
    },
    {
      id: "giftList"
    },
    {
      id: "userItemList"
    },
    {
      id: "userGiftList"
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
      id: "userPieceList"
    },
    {
      id: "userPieceSetList"
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
      id: "userFollowList"
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
      id: "userQuestAdventureList"
    },
    {
      id: "userPatrolList"
    }],
    fetch: function(a)
    {
      u = a;
      p.pageModelGet(this.needModelIdObj)
    },
    init: function()
    {
      d.gameUser.eventTrainingId && d.gameUser.eventTrainingId === g.eventId ? (a.setStyle(F + G), H.createCardList(), A.supportPickUp(d), l = new K) : (location.href = "#/EventTrainingCharaSelect", a.historyArr = ["MyPage"])
    },
    startCommand: function()
    {
      d = p.getPageJson();
      g = f.findWhere(d.eventList,
      {
        eventType: "TRAINING"
      });
      k = d.eventTraining;
      w.changeBg(g.viewParameterMap.BG_IMG + ".ExportJson");
      w.startBgm(g.viewParameterMap.BGM)
    },
    removeCommand: function() {},
    remove: function(a)
    {
      l && (l.trigger("removeView"), l.remove());
      u = y = t = r = m = e = l = q = k = g = d = null;
      a()
    }
  }
});
