define("underscore backbone backboneCommon ajaxControl command text!template/regularEvent/extermination/RegularEventExterminationBattleSelect.html text!css/regularEvent/extermination/RegularEventExterminationBattleSelect.css js/regularEvent/extermination/view/RegularEventExterminationBattleSelectBossPartsView js/regularEvent/extermination/view/RegularEventExterminationBattleSelectStagePartsView QuestUtil js/view/item/ItemImgPartsView".split(" "), function(h, m, b, q, g, B, C, w, x, D, y)
{
  var e, n, l, k, v, u, z = ["第一の結界", "第二の結界", "第三の結界", "第四の結界", "終の結界"],
    d, G = m.View.extend(
    {
      events: function()
      {
        var a = {};
        a[b.cgti + " #stageRetireBtn"] = this.stageRetire;
        a[b.cgti + " #helpBtn"] = this.announceOpen;
        a["webkitAnimationEnd .clearChara"] = this.stageClear;
        a[b.cgti + " #scheduleBtn"] = this.scheduleBtn;
        return a
      },
      initialize: function(a)
      {
        this.listenTo(this, "createQuestModelFunc", this.createQuestModelFunc);
        this.listenTo(this, "reboneCheckFunc", this.reboneCheckFunc);
        this.listenTo(this, "remove", this.removeView);
        this.template = h.template(B);
        this.createDom()
      },
      render: function()
      {
        this.$el.html(this.template(e));
        return this
      },
      createDom: function()
      {
        b.setGlobalView();
        b.content.append(this.render().el);
        this.createView()
      },
      createView: function()
      {
        w.prototype.parentView = this;
        x.prototype.parentView = this;
        this.bossModels = [];
        this.stageModels = [];
        this.userQuestList = [];
        d.Model = m.Model.extend();
        d._tempEventData = h.findWhere(e.regularEventList,
        {
          regularEventType: "EXTERMINATION"
        });
        d._tempQuestData = h.findWhere(d._tempEventData.regularEventExtermination.difficultyList,
        {
          difficultyId: e.userRegularEventExterminationDifficulty.difficultyId
        });
        d._tempSectionDAta = h.findWhere(e.userSectionList,
        {
          sectionId: d._tempQuestData.sectionId
        });
        var a = new d.Model(
          {
            event: d._tempEventData,
            quest: d._tempQuestData,
            section: d._tempSectionDAta,
            userQuestStatus: e.userRegularEventExterminationDifficulty
          }),
          c = a.get("userQuestStatus");
        d.centerBossShow = "CONQUERED" == c.battle1Status && "CONQUERED" == c.battle2Status && "CONQUERED" == c.battle3Status && "CONQUERED" == c.battle4Status ? !0 : !1;
        this.bossListSet(a);
        this.stageListSet(a);
        g.getBaseData(b.getNativeObj());
        b.exterminationSectionData = d._tempSectionDAta.sectionId;
        b.ready.hide();
        d._clearFlag && (b.doc.getElementById("RegularEventExterminationBattleSelect").classList.add("dontTap"), setTimeout(function()
        {
          b.androidKeyStop = !0
        }, 700))
      },
      bossListSet: function(a)
      {
        var c = [];
        h.each(b.storage.userQuestBattleList.toJSON(), function(b)
        {
          b.questBattle.sectionId == a.get("quest").sectionId && c.push(b)
        });
        this.userQuestList = h.sortBy(c, function(a)
        {
          return a.questBattle.sectionIndex
        });
        for (var f = 1; 5 >= f; f++)
        {
          var p = "enemyName" + f,
            E = "enemyId" + f,
            g = "enemyAttributeId" + f,
            l = "battle" + f + "Status",
            k = this.userQuestList[f - 1] ? this.userQuestList[f - 1].questBattle.firstClearRewardCodes : "",
            r = b.itemSet(k);
          r.genericId = r.itemCode.split("_")[2];
          c = this.userQuestList[f - 1] ? this.userQuestList[f - 1] : "";
          p = {
            enemyName: a.get("quest")[p],
            areaname: z[f - 1],
            enemyId: a.get("quest")[E],
            enemyAttribute: a.get("quest")[g],
            difficultyList: a.get("quest"),
            userRegularEventExterminationDifficulty: e.userRegularEventExterminationDifficulty,
            reward: k,
            rewardData: r,
            cleared: e.userRegularEventExterminationDifficulty[l],
            questModel: c,
            index: f
          };
          this.bossModels[f - 1] = new d.Model(p)
        }
        var t = b.doc.createDocumentFragment();
        h.each(this.bossModels, function(a, b)
        {
          a = new w(
          {
            model: a
          });
          t.appendChild(a.render().el)
        });
        b.doc.getElementById("bossList").appendChild(t)
      },
      stageListSet: function(a)
      {
        for (var c = 1; 5 >= c; c++)
        {
          var f = "battle" + c + "Status",
            p = "areaImage" + c,
            e = "enemyId" + c,
            g = "enemyName" + c,
            k = "enemyForces" + c,
            l = "enemyAttributeId" + c,
            r = "",
            t = "",
            m = this.userQuestList[c - 1] ? this.userQuestList[c - 1] : "",
            q = this.userQuestList[c - 1] ? this.userQuestList[c - 1].questBattle.firstClearRewardCodes : "";
          m.questBattleId == d.clearID && (r = "start", d._clearFlag = !0, this.clearIndex = c - 1);
          5 == c && d.centerBossShow && (t = d._clearFlag && 1 == d.clearCount ? "open" : "opened");
          f = {
            areaImage: a.get("quest")[p],
            battleStatus: a.get("userQuestStatus")[f],
            cleared: a.get("userQuestStatus").cleared,
            difficultyId: a.get("userQuestStatus").difficultyId,
            regularEventId: a.get("userQuestStatus").regularEventId,
            enemyId: a.get("quest")[e],
            enemyName: a.get("quest")[g],
            userId: a.get("userQuestStatus").userId,
            enemyForces: a.get("quest")[k],
            enemyAttribute: a.get("quest")[l],
            sectionModel: a.get("section"),
            areaname: z[c - 1],
            deck: d.userDeckList[c - 1],
            questModel: m,
            firstClear: r,
            reward: q,
            allClearReward: a.get("quest").clearRewardCodes,
            bossStatus: t,
            index: c
          };
          this.stageModels[c - 1] = new d.Model(f)
        }
        var n = b.doc.createDocumentFragment();
        h.each(this.stageModels, function(a, b)
        {
          var c = new x(
          {
            model: a
          });
          c.$el[0].className = "stageWrap se_decide TE number" + (b + 1) + " " + a.get("battleStatus") + " " + a.get("firstClear");
          n.appendChild(c.render().el)
        });
        b.doc.getElementById("stageList").appendChild(n)
      },
      stageClear: function()
      {
        b.doc.getElementById("RegularEventExterminationBattleSelect").classList.remove("dontTap");
        var a = this.stageModels[this.clearIndex];
        1 == d.clearCount ? v = new F(
        {
          model: a
        }) : 5 == a.get("index") ? (u = new A(
        {
          model: a
        }), b.androidKeyStop = !0) : (b.tapBlock(!1), b.androidKeyStop = !1)
      },
      stageRetire: function(a)
      {
        a.preventDefault();
        b.isScrolled() || new b.PopupClass(
        {
          title: "殲滅戦",
          content: "ステージの攻略中を中断して、トップ画面に戻ります。<br><br><span class='c_red'>※クエストの攻略状態は保存されません。</span>",
          closeBtnText: "キャンセル",
          decideBtnText: "OK",
          decideBtnEvent: function()
          {
            q.ajaxPost(b.linkList.exterminationRetire,
            {}, function(a)
            {
              location.href = "#/RegularEventExterminationTop"
            })
          },
          popupType: "typeA"
        })
      },
      createQuestModelFunc: function(a)
      {
        var c = a.model.get("sectionModel"),
          d = a.model.get("questModel");
        if (c && d)
        {
          var p = q.getPageJson();
          a = {};
          c = c.section;
          a.questType = c.questType;
          a.title = k.name;
          a.battleTitle = c.title;
          a.userQuestAdventureList = p.userQuestAdventureList;
          a.rewardCodeArr = [];
          c.secret && (a.secret = c.secret);
          a.questBattle = d.questBattle;
          a.eventFlag = !0;
          a.ap = d.questBattle.ap;
          a.difficulty = d.questBattle.difficulty;
          c = D.dropItemJson(d);
          c.firstClearReward && (a.firstClearReward = c.firstClearReward);
          c.firstClearRewardName && (a.firstClearRewardName = c.firstClearRewardName);
          c.firstClearRewardQuantity && (a.firstClearRewardQuantity = c.firstClearRewardQuantity);
          c.addDropItem && (a.addDropItem = c.addDropItem);
          c.addDropItemName && (a.addDropItemName = c.addDropItemName);
          c.addDropItemQuantity && (a.addDropItemQuantity = c.addDropItemQuantity);
          a.rewardCodeArr = c.list;
          a.rewardNameArr = c.nameList;
          a.rewardQuantityArr = c.quantityList
        }
        else a = !1;
        b.questBattleModel = a
      },
      reboneCheckFunc: function(a)
      {
        this.bossModels[a.model.attributes.index - 1].set(
        {
          cleared: "CANPLAY"
        });
        d.centerBossShow && (this.bossModels[4].set(
        {
          cleared: "LOCK"
        }), b.userRegularEventExterminationDifficulty.battle5Status = "LOCK", this.stageModels[4].set(
        {
          battleStatus: "LOCK"
        },
        {
          silent: !0
        }), this.stageModels[4].set(
        {
          bossStatus: ""
        }), d.centerBossShow = !1)
      },
      announceOpen: function(a)
      {
        a.preventDefault();
        b.isScrolled() || b.eventFirstNavi(["navi_01", "navi_02", "navi_03"], k.regularEventId, "extermination", null, !0, "regularEvent")
      },
      scheduleBtn: function(a)
      {
        a.preventDefault();
        b.isScrolled() || (a = h.template($("#schedulePopupTemp").text()), new b.PopupClass(
        {
          title: "解放スケジュール",
          content: a(),
          popupId: "schedulePopup",
          popupType: "typeA"
        }, null, function()
        {
          g.getBaseData(b.getNativeObj())
        }))
      }
    }),
    F = m.View.extend(
    {
      events: function()
      {
        var a = {};
        a["webkitAnimationEnd #magicCircle"] = this.stageClearSecond;
        a["webkitAnimationEnd #BattleClear_occup"] = this.stageClearFinal;
        a[b.cgti + " .final"] = this.finish;
        return a
      },
      initialize: function(a)
      {
        b.exterminationClearData = "";
        this.model.rewardData = b.itemSet(this.model.attributes.reward);
        this.template = h.template($("#clearAnimePartsTemp").text());
        this.createDom()
      },
      render: function()
      {
        this.$el.html(this.template(
        {
          model: this.model.toJSON()
        }));
        var a = this.model.rewardData.itemCode.split("_")[2];
        this.itemImgPartsView = new y(
        {
          model:
          {
            item: this.model.rewardData,
            quantity: this.model.rewardData.quantity,
            genericId: a
          },
          type: this.model.rewardData.rewardType
        });
        a = this.el.querySelectorAll("#rewardArea")[0];
        a.appendChild(this.itemImgPartsView.render().el);
        1 < d.clearCount && a.classList.add("get");
        return this
      },
      createDom: function()
      {
        $("#overlapContainer").append(this.render().el);
        g.getBaseData(b.getNativeObj());
        setTimeout(function()
        {
          g.startSe(1501)
        }, 500)
      },
      stageClearSecond: function()
      {
        b.tapBlock(!1);
        b.addClass(b.doc.getElementById("ClearAnimation"), "next");
        setTimeout(function()
        {
          g.startSe(1502)
        }, 500)
      },
      stageClearFinal: function()
      {
        b.addClass(b.doc.getElementById("ClearAnimation"), "final")
      },
      finish: function()
      {
        this.off();
        this.remove();
        this.itemImgPartsView && this.itemImgPartsView.removeView();
        5 == this.model.get("index") ? (u = new A(
        {
          model: this.model
        }), b.androidKeyStop = !0) : d.centerBossShow && d._clearFlag && (b.doc.getElementsByClassName("number5")[0].classList.add("showBoss"), b.androidKeyStop = !1)
      }
    }),
    A = m.View.extend(
    {
      events: function()
      {
        var a = {};
        a["webkitAnimationEnd #AllBattleClear_occup"] = this.rewardShow;
        a["webkitAnimationEnd #AllKekkai_flont"] = this.finish;
        return a
      },
      initialize: function(a)
      {
        this.model.rewardData = b.itemSet(this.model.attributes.allClearReward);
        this.template = h.template($("#AllClearAnimePartsTemp").text());
        this.createDom()
      },
      render: function()
      {
        this.$el.html(this.template(
        {
          model: this.model.toJSON()
        }));
        var a = this.model.rewardData.itemCode.split("_")[2];
        this.itemImgPartsView = new y(
        {
          model:
          {
            item: this.model.rewardData,
            quantity: this.model.rewardData.quantity,
            genericId: a
          },
          type: this.model.rewardData.rewardType
        });
        a = this.el.querySelectorAll("#rewardArea")[0];
        a.appendChild(this.itemImgPartsView.render().el);
        1 < d.clearCount && a.classList.add("get");
        return this
      },
      createDom: function()
      {
        $("#overlapContainer").append(this.render().el);
        g.getBaseData(b.getNativeObj());
        setTimeout(function()
        {
          g.startSe(1501)
        }, 500)
      },
      rewardShow: function()
      {
        setTimeout(function()
        {
          g.startSe(1603)
        }, 500);
        b.addClass(b.doc.getElementById("allClearAnimation"), "next")
      },
      finish: function()
      {
        g.startSe(1504);
        b.androidKeyStop = !1;
        this.off();
        this.remove();
        this.itemImgPartsView && this.itemImgPartsView.removeView();
        var a = "#/RegularEventExterminationTop";
        1 === d.clearCount && (a += "/" + l);
        location.href = a
      }
    }),
    H = function()
    {
      b.setStyle(C);
      g.startBgm("bgm21_system01");
      g.changeBg("web_extermination_map_01.ExportJson");
      var a = e.eventMaster.regularEventExtermination.difficultyList;
      h.each(a, function(a, c)
      {
        a.rewardModels = [];
        var d = a.clearRewardCodes.split(",");
        4 == c && (d = d.concat(e.eventMaster.regularEventExtermination.completeRewardCodes.split(",")));
        for (c = 0; c < d.length; c++) a.rewardModels.push(b.getRewardImgModel(d[c]))
      });
      e.isAllClear = !0;
      for (var c in a)
      {
        var d = b.storage.userSectionList.findWhere(
        {
          sectionId: a[c].sectionId
        });
        if (!d || !d.get("cleared"))
        {
          e.isAllClear = !1;
          break
        }
      }
      n = new G
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
    fetch: function(a)
    {
      g.endQuest();
      g.setWebView(!0);
      b.questNativeResponse && (b.responseSetStorage(b.questNativeResponse), nativeJson = b.questNativeResponse);
      b.supportUserList = null;
      b.questNativeResponse = null;
      b.questBattleModel = null;
      a && 0 < a && (l = a | 0);
      q.pageModelGet(this.needModelIdObj)
    },
    init: function()
    {
      function a(a)
      {
        for (var c = [], d, f = 0; 5 > f; f++) d = "userCardId" + (f + 1), d = a[d], d = h.findWhere(b.storage.userCardList.toJSON(),
        {
          id: d
        }), void 0 != d && (d.id == a.questEpisodeUserCardId ? c.unshift(d) : c.push(d));
        return c
      }
      d = d ||
      {};
      d._clearFlag = !1;
      b.historyArr = ["MyPage", "RegularEventExterminationBattleSelect"];
      b.clearSectionModel = null;
      b.clearChapterModel = null;
      e = q.getPageJson();
      b.userRegularEventExterminationDifficulty = e.userRegularEventExterminationDifficulty;
      b.RegularEventExterminationBattleConfirm = "";
      k = h.findWhere(e.regularEventList,
      {
        regularEventType: "EXTERMINATION"
      });
      k || (location.href = "#/MyPage");
      e.eventMaster = k;
      l && (e.playedQuestBattleId = l);
      e.difficultyId = e.userRegularEventExterminationDifficulty.difficultyId;
      if (e.playedQuestBattleId)
      {
        var c = h.findWhere(e.userQuestBattleList,
        {
          questBattleId: e.playedQuestBattleId
        });
        d.clearCount = c.clearCount;
        d.clearID = e.playedQuestBattleId
      }
      d.userDeckList = ["", "", "", "", ""];
      h.each(b.storage.userDeckList.toJSON(), function(b)
      {
        var c;
        switch (b.deckType)
        {
          case 71:
            c = a(b);
            d.userDeckList[0] = {
              userDeck: b,
              cardList: c
            };
            break;
          case 72:
            c = a(b);
            d.userDeckList[1] = {
              userDeck: b,
              cardList: c
            };
            break;
          case 73:
            c = a(b);
            d.userDeckList[2] = {
              userDeck: b,
              cardList: c
            };
            break;
          case 74:
            c = a(b);
            d.userDeckList[3] = {
              userDeck: b,
              cardList: c
            };
            break;
          case 75:
            c = a(b), d.userDeckList[4] = {
              userDeck: b,
              cardList: c
            }
        }
      });
      H()
    },
    remove: function(a)
    {
      n && (n.trigger("removeView"), n.remove());
      v && v.remove();
      u && u.remove();
      d && (d = void 0);
      l = null;
      a()
    }
  }
});
