define("underscore backbone backboneCommon ajaxControl command text!template/util/SearchQuest.html text!css/util/SearchQuest.css QuestUtil js/view/quest/QuestListPartsView".split(" "), function(k, t, a, p, m, v, w, x, q)
{
  var n = null,
    l, g, z = t.View.extend(
    {
      initialize: function(a)
      {
        this.giftViews = [];
        this.template = k.template(v);
        this.createDom()
      },
      events: function()
      {
        var c = {};
        c[a.cgti + " .tabBtns li"] = this.tabFunc;
        c[a.cgti + " .orderBtn"] = this.orderFunc;
        return c
      },
      render: function()
      {
        this.$el.html(this.template(p.getPageJson()));
        return this
      },
      createDom: function()
      {
        this.halfAp = this.campaignData = null;
        l.campaignList && (this.campaignData = a.campaignParse(l.campaignList));
        a.setGlobalView();
        a.content.append(this.render().el);
        this.createView()
      },
      createView: function()
      {
        a.ready.hide();
        var c = this;
        q.prototype.parentView = this;
        q.prototype.template = k.template($("#QuestListParts").text());
        r.prototype.parentView = this;
        r.prototype.template = k.template($("#GiftParts").text());
        y();
        var d = l.giftList,
          b = a.doc.createDocumentFragment(),
          h = a.doc.createDocumentFragment();
        k.each(d, function(e)
        {
          if (9 !== e.type)
          {
            e.quantity = 0;
            a.storage.userGiftList.findWhere(
            {
              giftId: e.id
            }) && (e.quantity = a.storage.userGiftList.findWhere(
            {
              giftId: e.id
            }).toJSON().quantity);
            var f = new r(
            {
              model: e
            });
            f.el.dataset.giftid = e.id;
            f.el.dataset.scrollHash = e.id;
            c.giftViews.push(f);
            1 === e.type ? h.appendChild(f.render().el) : b.appendChild(f.render().el)
          }
        });
        a.doc.querySelector(".itemScrollInner .gift01").appendChild(b);
        a.doc.querySelector(".itemScrollInner .gift02").appendChild(h);
        a.searchQuestGiftId && a.forceScrollPreset("itemScrollWrap", "itemScrollInner", a.searchQuestGiftId, !0);
        a.scrollSet("itemScrollWrap", "itemScrollInner", !0);
        a.scrollSet("questScrollWrap", "questScrollInner", !0);
        this.orderInit();
        m.getBaseData(a.getNativeObj())
      },
      modelSend: function(c, d, b)
      {
        c ? (d = Number(c.currentTarget.parentNode.dataset.sectionid), c = Number(c.currentTarget.parentNode.dataset.scrollHash)) : c = b;
        b = a.storage.userSectionList.findWhere(
        {
          sectionId: d
        });
        if (!b) return !1;
        b = b.toJSON();
        if (d = a.storage.userChapterList.findWhere(
          {
            chapterId: Number(b.section.genericId)
          })) b.section.chapterNoForView = d.toJSON().chapter.chapterNoForView, b.section.chapter = d.toJSON().chapter;
        if (c = a.storage.userQuestBattleList.findWhere(
          {
            questBattleId: c
          })) b.questBattle = c.toJSON(), "ENHANCEMENT_AROUSAL" == b.section.questType && (b.questBattle.weekText = {
          FIRE: "火属性",
          WATER: "水属性",
          TIMBER: "木属性",
          LIGHT: "光属性",
          DARK: "闇属性",
          ALL: "全属性"
        } [b.section.parameter]);
        return b
      },
      tabFunc: function(c, d)
      {
        var b = null,
          h = null;
        if (c)
        {
          c.preventDefault();
          if (a.isScrolled()) return;
          m.startSe(1002);
          b = c.currentTarget;
          h = c.currentTarget.dataset.type
        }
        else d && (b = a.doc.querySelector("[data-type=" + d + "]"), h = d);
        c = "gift01" == h ? "gift02" : "gift01";
        a.removeClass(a.doc.querySelector(".tabBtns .current"), "current");
        a.addClass(b, "current");
        a.addClass(a.doc.querySelector("." + c), "hide");
        a.removeClass(a.doc.querySelector("." + h), "hide");
        b = "gift01" == h ? "素材一覧" : "オーブ・ブック一覧";
        a.doc.querySelector("#itemWrap h2").innerText = b;
        a.scrollRefresh("itemScrollWrap", "itemScrollInner", !0)
      },
      orderFunc: function(c)
      {
        c.preventDefault();
        if (!a.isScrolled())
        {
          var d = a.sfml.SearchQuest;
          c.currentTarget.classList.contains("orderTypeBtn") ? a.sfml.SearchQuest[0] = "difficulty" == d[0] ? "ap" : "difficulty" : a.sfml.SearchQuest[1] = "asc" == d[1] ? "desc" : "asc";
          a.sfm();
          this.orderInit();
          u()
        }
      },
      orderInit: function()
      {
        "asc" == a.sfml.SearchQuest[1] ? a.doc.querySelector(".orderBtn").className = "orderBtn TE se_tabs asc" : a.doc.querySelector(".orderBtn").className = "orderBtn TE se_tabs desc"
      }
    }),
    r = t.View.extend(
    {
      className: "gift",
      initialize: function()
      {
        this.listenTo(this.parentView, "removeGiftView", this.removeView)
      },
      events: function()
      {
        var c = {};
        c[a.cgti] = this.tapGift;
        return c
      },
      render: function()
      {
        this.$el.html(this.template(
        {
          model: this.model
        }));
        return this
      },
      tapGift: function(c)
      {
        if (c)
        {
          c.preventDefault();
          if (a.isScrolled()) return;
          c = c.currentTarget;
          m.startSe(1002)
        }
        else c = this.el;
        g && g.trigger("removeView");
        console.log("tapGift");
        a.doc.querySelector("#itemWrap .select") == c ? (a.removeClass(a.doc.querySelector("#itemWrap .select"), "select"), a.removeClass(a.doc.querySelector("#questWrap .defaultText"), "hide"), a.addClass(a.doc.querySelector("#questWrap .questNoneText"), "hide"), a.searchQuestGiftId = null) : (a.removeClass(a.doc.querySelector("#itemWrap .select"), "select"), a.addClass(c, "select"), a.addClass(a.doc.querySelector("#questWrap .defaultText"), "hide"), a.addClass(a.doc.querySelector("#questWrap .questNoneText"), "hide"), a.dropItemMap[this.model.id] && 0 !== a.dropItemMap[this.model.id].length ? A(this.model.id) : a.removeClass(a.doc.querySelector("#questWrap .questNoneText"), "hide"), a.searchQuestGiftId = this.model.id)
      },
      removeView: function()
      {
        this.off();
        this.remove()
      }
    }),
    A = function(c)
    {
      var d = a.doc.createDocumentFragment();
      k.each(a.dropItemMap[c], function(b, c)
      {
        var e = g.modelSend(null, b.questBattle.sectionId, b.questBattleId);
        c = e.section.questType;
        b.searchViewObj = {};
        e.section.chapter && (b.searchViewObj.partNo = e.section.chapter.partNo, b.searchViewObj.chapterNoForView = e.section.chapter.chapterNoForView, b.searchViewObj.chapterId = e.section.chapter.chapterId);
        b.searchViewObj.title = "ENHANCEMENT_AROUSAL" == c ? e.section.title : e.section.genericIndex + "話";
        b.searchViewObj.questTitle = "BATTLE " + b.questBattle.sectionIndex;
        if ("ENHANCEMENT_AROUSAL" == c)
        {
          switch (b.questBattle.sectionIndex)
          {
            case 1:
              b.questClass = "初級";
              break;
            case 2:
              b.questClass = "中級";
              break;
            case 3:
              b.questClass = "上級";
              break;
            case 4:
              b.questClass = "超級"
          }
          b.questTitle = "BATTLE ◆ " + b.questClass;
          b.searchViewObj.questTitle = b.questTitle;
          b.weekText = {
            FIRE: "火属性",
            WATER: "水属性",
            TIMBER: "木属性",
            LIGHT: "光属性",
            DARK: "闇属性",
            ALL: "全属性"
          } [e.section.parameter];
          b.questTypeText = "覚醒強化結界";
          b.parameter = e.section.parameter
        }
        if ("CHARA" == c && e.section.genericId)
        {
          var f = a.storage.userCharaList.findWhere(
          {
            charaId: e.section.genericId
          });
          b.searchViewObj.chara = f ? f.toJSON().chara :
          {}
        }
        if ("COSTUME" == c && e.section.charaId)
          if (f = a.storage.userCharaList.findWhere(
            {
              charaId: e.section.charaId
            }))
          {
            var h = (e.section.genericId + "").slice(-2),
              h = a.storage.userLive2dList.findWhere(
              {
                charaId: e.section.charaId,
                live2dId: h
              }),
              f = f.toJSON().chara,
              h = h.toJSON().live2d;
            b.searchViewObj.chara = f;
            b.searchViewObj.live2d = h
          }
        else b.searchViewObj.chara = {};
        b.questBattle.limitTurn && (b.searchViewObj.limitTurn = !0);
        b.searchViewObj.ap = e.section.ap ? e.section.ap : b.questBattle.ap;
        b.searchViewObj.difficulty = e.section.difficulty ? e.section.difficulty : b.questBattle.difficulty;
        "HARD" == b.questBattle.questBattleType && (b.searchViewObj.isHard = !0, b.searchViewObj.ap = b.questBattle.ap, b.searchViewObj.difficulty = b.questBattle.difficulty);
        g.campaignData && g.campaignData.HALF_AP && k.each(g.campaignData.HALF_AP.questType, function(a, c)
        {
          if ("MAIN" == a || "SUB" == a) a == e.section.questType && (0 <= g.campaignData.HALF_AP.chapterIds.indexOf(String(b.searchViewObj.chapterId)) || 0 === g.campaignData.HALF_AP.chapterIds.length) && (b.searchViewObj.halfAp = Math.ceil(b.searchViewObj.ap / 2));
          else if ("ALL" === a || a == e.section.questType) b.searchViewObj.halfAp = Math.ceil(b.searchViewObj.ap / 2)
        });
        f = new q(
        {
          model: b
        });
        f.el.dataset.scrollHash = b.questBattleId;
        f.el.dataset.sectionid = b.questBattle.sectionId;
        f.el.dataset.difficulty = b.searchViewObj.difficulty;
        f.el.dataset.ap = b.searchViewObj.ap;
        "MAIN" == c ? ("HARD" == b.questBattle.questBattleType ? a.addClass(f.el, "mainHard") : a.addClass(f.el, "main"), a.addClass(f.el, "season" + b.searchViewObj.partNo)) : "SUB" == c ? a.addClass(f.el, "side") : "CHARA" == c ? a.addClass(f.el, "chara") : "COSTUME" == c ? a.addClass(f.el, "costume") : "ENHANCEMENT_AROUSAL" == c && a.addClass(f.el, "enhancement");
        b.searchViewObj.halfAp && (f.model.halfAp = b.searchViewObj.halfAp, a.addClass(f.el, "halfAp"));
        d.appendChild(f.render().el)
      });
      a.doc.querySelector(".questScrollInner").appendChild(d);
      u();
      a.charaListCustomizeSelectId || a.charaListComposeMagiaSelectId ? a.charaListCustomizeSelectId ? a.historyArr = ["MyPage", "CharaListCustomize/" + a.charaListCustomizeSelectId, "SearchQuest"] : a.charaListComposeMagiaSelectId && (a.historyArr = ["MyPage", "CharaListComposeMagia/" + a.charaListComposeMagiaSelectId, "SearchQuest"]) : a.searchQuestGiftId && n && (a.forceScrollPreset("questScrollWrap", "questScrollInner", n, !0), n = null, a.historyArr = ["MyPage", "ItemListTop", "SearchQuest"]);
      a.scrollRefresh("questScrollWrap", "questScrollInner", !0)
    },
    y = function()
    {
      a.dropItemMap = {};
      var c = 0;
      k.each(l.userQuestBattleList, function(b, d)
      {
        d = b.questBattle.sectionId;
        if (!(4E5 <= d && 400070 > d || 5E5 <= d && 7E5 > d || 8E5 <= d))
        {
          for (d = 1; 10 >= d;) b.questBattle["dropItem" + d] && k.each(b.questBattle["dropItem" + d], function(c, d)
          {
            -1 != d.indexOf("rewardCode") && (c = c.split("_")[1], a.dropItemMap[c] || (a.dropItemMap[c] = []), b.cleared && a.dropItemMap[c].push(b))
          }), d = d + 1 | 0;
          c++
        }
      });
      for (var d in a.dropItemMap) a.dropItemMap[d] = k.unique(a.dropItemMap[d]);
      console.log(a.dropItemMap)
    },
    u = function()
    {
      var c = a.sfml.SearchQuest,
        d = "asc" === c[1] ? -1 : 1,
        b = 0,
        g = a.doc.querySelector(".questScrollInner");
      [].slice.call(g.querySelectorAll(".quest")).map(function(a)
      {
        return {
          dom: a,
          param: a.dataset
        }
      }).sort(function(a, b)
      {
        if ("ap" == c[0])
        {
          if (Number(b.param.ap) < Number(a.param.ap)) return -1 * d;
          if (Number(b.param.ap) > Number(a.param.ap)) return 1 * d
        }
        else if ("difficulty" == c[0])
        {
          if (Number(b.param.difficulty) < Number(a.param.difficulty)) return -1 * d;
          if (Number(b.param.difficulty) > Number(a.param.difficulty)) return 1 * d
        }
        return Number(b.param.scrollHash) < Number(a.param.scrollHash) ? -1 * d : Number(b.param.scrollHash) > Number(a.param.scrollHash) ? 1 * d : 0
      }).forEach(function(a)
      {
        a.dom.style.WebkitOrder = b;
        a.dom.style.order = b;
        b = b + 1 | 0
      })
    },
    B = function()
    {
      a.mainQuestMode = "NORMAL";
      a.sfml.SearchQuest || (a.sfml.SearchQuest = ["ap", "desc"], a.sfm());
      a.setStyle(w);
      l = p.getPageJson();
      g = new z;
      x.supportPickUp(l);
      if (a.searchQuestGiftId)
      {
        300 > Number(a.searchQuestGiftId) || 551 == Number(a.searchQuestGiftId) ? g.tabFunc(null, "gift02") : g.tabFunc(null, "gift01");
        console.log(a.searchQuestGiftId);
        var c = k.find(g.giftViews, function(c)
        {
          return c.model.id == a.searchQuestGiftId
        });
        c ? c.tapGift() : (g.tabFunc(null, "gift01"), a.searchQuestGiftId = null)
      }
      else g.tabFunc(null, "gift01")
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
      id: "userDoppelList"
    },
    {
      id: "itemList"
    },
    {
      id: "userItemList"
    },
    {
      id: "giftList"
    },
    {
      id: "userGiftList"
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
      id: "userPieceList"
    },
    {
      id: "userPieceSetList"
    },
    {
      id: "userDeckList"
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
    }],
    fetch: function(a)
    {
      a && (n = a);
      p.pageModelGet(this.needModelIdObj)
    },
    init: function()
    {
      B()
    },
    startCommand: function()
    {
      m.startBgm("bgm01_anime07");
      m.changeBg("web_common.ExportJson")
    },
    remove: function(a)
    {
      g && (g.trigger("removeView"), g.trigger("removeGiftView"), g.remove());
      n = null;
      a()
    }
  }
});
