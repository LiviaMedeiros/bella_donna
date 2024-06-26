define("underscore backbone backboneCommon ajaxControl command QuestUtil cardUtil text!template/quest/secondPartLast/Top.html text!css/quest/SecondPartLastTop.css text!css/quest/QuestCommon.css js/quest/secondPartLast/parts/StagePartsView js/view/item/ItemImgPartsView js/view/tutorial/TutorialPopupView".split(" "), function(f, t, a, w, l, x, y, z, A, B, C, D, u)
{
  var m, n, q, p, G = t.View.extend(
    {
      events: function()
      {
        var b = {};
        b[a.cgti + " #linkFormationtBtn"] = E;
        b[a.cgti + " #helpBtn"] = r;
        b["webkitAnimationEnd .clearChara"] = F;
        return b
      },
      render: function()
      {
        this.$el.html(this.template());
        return this
      },
      initialize: function(b)
      {
        this.template = f.template(z);
        a.content.prepend(this.render().el)
      }
    }),
    H = t.View.extend(
    {
      events: function()
      {
        var b = {};
        b["webkitAnimationEnd #magicCircle"] = this.stageClearSecond;
        b["webkitAnimationEnd #BattleClear_occup"] = this.stageClearFinal;
        b[a.cgti + " .final"] = this.finish;
        return b
      },
      initialize: function(b)
      {
        a.tapBlock(!0);
        this.template = f.template($("#clearAnimePartsTemp").text());
        this.createDom()
      },
      render: function()
      {
        this.$el.html(this.template(
        {
          model: this.model
        }));
        this.itemImgPartsView = new D(
        {
          model:
          {
            item: this.model.rewardData,
            quantity: this.model.rewardData.quantity,
            genericId: this.model.rewardData.genericId
          },
          type: this.model.rewardData.rewardType
        });
        var a = this.el.querySelectorAll("#rewardArea")[0];
        a.appendChild(this.itemImgPartsView.render().el);
        1 < this.model.questModel.clearCount && a.classList.add("get");
        return this
      },
      createDom: function()
      {
        $("#overlapContainer").append(this.render().el);
        l.getBaseData(a.getNativeObj());
        setTimeout(function()
        {
          l.startSe(1501)
        }, 500)
      },
      stageClearSecond: function()
      {
        a.addClass(a.doc.getElementById("ClearAnimation"), "next");
        setTimeout(function()
        {
          l.startSe(1502)
        }, 500)
      },
      stageClearFinal: function()
      {
        a.addClass(a.doc.getElementById("ClearAnimation"), "final");
        a.tapBlock(!1)
      },
      finish: function()
      {
        this.off();
        this.remove();
        this.itemImgPartsView && this.itemImgPartsView.removeView()
      }
    }),
    E = function(a)
    {
      location.href = "#/SecondPartLastFormation"
    },
    r = function(b)
    {
      b && b.preventDefault();
      if (!a.isScrolled())
      {
        var e;
        new a.PopupClass(
        {
          popupType: "tutorial"
        }, null, function()
        {
          u.prototype.parentView = this;
          e = new u(
          {
            imgArr: ["navi_01", "navi_02"],
            type: "SecondPartLast"
          });
          a.doc.getElementsByClassName("popupInner")[0].appendChild(e.render().el)
        }, function()
        {
          e.removeView();
          setTimeout(function()
          {
            a.tapBlock(!1)
          }, 100)
        })
      }
    },
    J = function()
    {
      var b = [];
      f.each(a.secondPartLastInfo.enemyInfo.list, function(e, g, h)
      {
        var c = {};
        f.each(e, function(a, b, g)
        {
          c[b] = a
        });
        c.reward = a.secondPartLastInfo.questInfo[g].questBattle.missionRewardCode;
        c.rewardData = a.itemSet(c.reward);
        c.rewardData.genericId = c.rewardData.itemCode.split("_")[2];
        c.battleStatus = a.secondPartLastInfo.battleInfo["battle" + Number(g + 1) + "Status"];
        c.cleared = a.secondPartLastInfo.battleInfo.cleared;
        c.questModel = a.secondPartLastInfo.questInfo[g];
        c.sectionModel = a.secondPartLastInfo.sectionInfo;
        c.areaname = e.enemyName;
        c.deckInfo = v(
        {
          index: g
        });
        c.firstClearClass = I(
        {
          questBattleId: c.questModel.questBattleId,
          questModel: a.secondPartLastInfo.questInfo[g]
        });
        c.index = Number(g + 1);
        c.getUserDeck = v;
        b.push(c);
        "start" != c.firstClearClass || p || (p = c)
      });
      var e = a.doc.createDocumentFragment();
      f.each(b, function(a, b, h)
      {
        h = new C(
        {
          model: a
        });
        h.$el[0].className = "stageWrap stage" + (b + 1) + " " + a.battleStatus + " " + a.firstClearClass;
        e.appendChild(h.render().el);
        $("#boss").addClass("stage" + (b + 1) + a.battleStatus);
        $("#crashSec").addClass("stage" + (b + 1) + a.battleStatus)
      });
      a.doc.getElementById("stageList").appendChild(e)
    },
    F = function()
    {
      p && (q = new H(
      {
        model: p
      }))
    },
    v = function(b)
    {
      var e = !1,
        l = 100 + b.index + 1;
      f.each(a.storage.userDeckList.toJSON(), function(b, h, c)
      {
        if (!e && l == b.deckType)
        {
          e = {};
          e.userDeck = b;
          h = e;
          c = [];
          for (var d, k = 0; 5 > k; k++) d = "userCardId" + (k + 1), d = b[d], d = f.findWhere(a.storage.userCardListEx.toJSON(),
          {
            id: d
          }), void 0 != d && (d.id == b.questEpisodeUserCardId ? c.unshift(d) : c.push(d));
          h.cardList = c;
          h = e;
          c = [];
          for (k = 1; 6 > k; k++)
            for (d = 1; 5 > d; d++)
            {
              var g = "userPieceId0" + k + d;
              void 0 != b[g] || void 0 != b[g] ? c.push(b[g]) : c.push("")
            }
          b = [];
          k = c.length;
          for (d = 0; d < k; d++)
            if (b[d] = f.findWhere(a.storage.userPieceList,
              {
                id: c[d]
              }), void 0 == b[d] || void 0 == b[d]) b[d] = "";
          h.memoriaList = {
            memoriaList: c,
            memoriaData: b
          }
        }
      });
      return e
    },
    I = function(a)
    {
      var b = a.questBattleId;
      a = a.questModel;
      var f = "";
      n && n == b && 1 == a.clearCount && (f = "start");
      return f
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
      id: "titleList"
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
      id: "userDeckList"
    },
    {
      id: "userDoppelList"
    },
    {
      id: "userFormationSheetList"
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
      id: "userPieceList"
    },
    {
      id: "userPieceSetList"
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
    fetch: function(b)
    {
      a.secondPartLastInfo ? (b && 0 < b && (n = b | 0), w.pageModelGet(this.needModelIdObj, null, "noConnect")) : location.href = "#/SecondPartLastRouter"
    },
    init: function()
    {
      a.historyArr = ["MyPage", "MainQuest", "SecondPartLastTop"];
      a.setStyle(A + B);
      l.startBgm("bgm03_story22");
      l.changeBg("web_secondPartLastBattle_21188.ExportJson");
      m = new G;
      y.createCardList();
      J();
      l.getBaseData(a.getNativeObj());
      x.supportPickUp(a.storage);
      a.searchQuestGiftId = null;
      a.setGlobalView();
      a.tapBlock(!1);
      a.ready.hide();
      "undefined" !== typeof window.localStorage ? localStorage.getItem("secondPartLastFirstNavi") || (r(), localStorage.setItem("secondPartLastFirstNavi", !0)) : a.secondPartLastFirstNavi || (r(), a.secondPartLastFirstNavi = !0)
    },
    remove: function(a)
    {
      m && (m.trigger("removeView"), m.remove());
      q && q.remove();
      n = null;
      a()
    }
  }
});
