define("underscore backbone backboneCommon ajaxControl command text!template/regularEvent/accomplish/RegularEventAccomplishTop.html text!css/regularEvent/accomplish/RegularEventAccomplishTop.css js/view/item/ItemImgPartsView js/regularEvent/accomplish/view/RegularEventAccomplishRecoverView QuestUtil cardUtil iscroll_stage".split(" "), function(h, l, b, p, f, y, z, A, r, B, C)
{
  var g, k, a, q, n, D = l.View.extend(
    {
      events: function()
      {
        var a = {};
        a[b.cgti + " #helpBtn"] = this.eventNaviPopup;
        a[b.cgti + " #nowBattleBtn"] = this.nowBattleBtn;
        a[b.cgti + " .battleArrow"] = this.battleCarousel;
        a[b.cgti + " #battleBtn"] = this.battleBtn;
        a[b.cgti + " #debugBtn"] = this.debugBtn;
        a[b.cgti + " #debugBtn2"] = this.debugBtn2;
        return a
      },
      initialize: function(a)
      {
        this.template = h.template(y);
        this.createDom()
      },
      render: function()
      {
        this.$el.html(this.template(g));
        return this
      },
      createDom: function()
      {
        b.content.append(this.render().el);
        b.setGlobalView();
        t.prototype.rootView = this;
        t.prototype.template = h.template($("#questDetailTemp").text());
        a.questDetailListView = new t;
        var c = b.doc.createDocumentFragment();
        c.appendChild(a.questDetailListView.render().el);
        b.doc.getElementById("questArea").appendChild(c);
        r.prototype.rootView = this;
        r.prototype.recoverCallback = null;
        q = new r;
        b.doc.getElementById("allRecovery").appendChild(q.el);
        u.prototype.rootView = this;
        u.prototype.template = h.template($("#questListTemp").text());
        a.questListView = new u;
        c = b.doc.createDocumentFragment();
        c.appendChild(a.questListView.render().el);
        b.doc.getElementById("questListArea").appendChild(c);
        a.firstPreviewFlag = !1;
        this.waitElement(function()
        {
          setTimeout(function()
          {
            a.questListView.scrollListInit();
            b.doc.getElementById("questId" + a.nowBattleNum).classList.add("goBattle");
            b.doc.getElementById("questListArea").classList.remove("hide")
          }, 500)
        }, 200, 1E3);
        v.prototype.rootView = this;
        v.prototype.template = h.template($("#enemyListTemp").text());
        a.enemyDetailListView = new v;
        c = b.doc.createDocumentFragment();
        c.appendChild(a.enemyDetailListView.render().el);
        b.doc.getElementById("enemyArea").appendChild(c);
        b.doc.getElementById("maxStageText").innerHTML = a.slideLength;
        a.level40CardArr && 0 == a.level40CardArr.length ? b.doc.getElementById("allRecoveryBtn").classList.add("not") : 0 == g.eventMaster.parameterMap.CURE_COUNT && b.doc.getElementById("allRecoveryBtn").classList.add("off");
        a.allCleared && (b.doc.getElementById("allRecoveryBtn").classList.add("all"), b.doc.getElementById("allClear").classList.add("show"));
        a.tapFlag = !1;
        1024 != b.displayWidth && b.doc.getElementById("enemyArea").classList.add("xstyle");
        f.getBaseData(b.getNativeObj());
        b.ready.hide()
      },
      waitElement: function(c, d, e)
      {
        function f()
        {
          null != b.doc.querySelector("#questId" + a.slideLength) ? c() : setTimeout(function()
          {
            e && Date.now() - h > e || f()
          }, d)
        }
        var h = Date.now();
        f()
      },
      eventNaviPopup: function(a)
      {
        a.preventDefault();
        b.isScrolled() || b.eventFirstNavi(["navi_01", "navi_02"], g.eventMaster.regularEventId, "accomplish", null, !0, "regularEvent")
      },
      questDetailChange: function(a)
      {
        void 0 != a && (b.doc.getElementById("nowStageText").innerHTML = a)
      },
      numToTextFunc: function(a)
      {
        a = (a + "").split("");
        for (var b = "", c = 0; c < a.length; c++) b = b + "<span class='num" + a[c] + "'></span>";
        return b
      },
      nowBattleBtn: function(c)
      {
        c.preventDefault();
        b.isScrolled() || a.questListView.listScroll.goToPage(a.nowBattlePage, 0, a.bounceTime)
      },
      battleCarousel: function(c)
      {
        c.preventDefault();
        b.isScrolled() || a && a.tapFlag || (a.tapFlag = !0, setTimeout(function()
        {
          a.tapFlag = !1
        }, 500), c.currentTarget.classList.contains("leftArr") ? (--a.currentPage, 0 > a.currentPage && (a.currentPage = 0)) : (a.currentPage += 1, a.currentPage > a.slideLength - 1 && (a.currentPage = a.slideLength - 1)), a.questListView.listScroll.goToPage(a.currentPage, 0, 100))
      },
      battleBtn: function(c)
      {
        c.preventDefault();
        if (!b.isScrolled())
          if (a.level40CardArr && 0 == a.level40CardArr.length) new b.PopupClass(
          {
            title: "バトル ミュージアム",
            content: "バトルに参加するには<br>レベル40以上の魔法少女が<span class='c_red'>1</span>体以上必要です。",
            popupId: "lv40AttentionPopup",
            closeBtnText: "OK",
            popupType: "typeC"
          });
          else
          {
            var d = h.findWhere(a.sectionList,
              {
                sectionId: a.nowBattle.attributes.model.questBattle.sectionId
              }),
              e = a.nowBattle.attributes.model;
            if (d && e)
            {
              var f = p.getPageJson();
              c = Object.assign(
              {}, e);
              var g = d.section;
              c.questType = g.questType;
              c.chapterNoForView = g.chapterNoForView;
              c.genericIndex = g.genericIndex;
              c.title = g.title;
              c.battleTitle = "BATTLE" + a.nowBattleNum;
              c.userQuestAdventureList = f.userQuestAdventureList;
              c.rewardCodeArr = [];
              g.secret && (c.secret = g.secret);
              c.questBattle = e.questBattle;
              c.eventFlag = !0;
              c.ap = e.questBattle.ap;
              c.difficulty = e.questBattle.difficulty;
              c.canPlay = d.canPlay;
              d = B.dropItemJson(e);
              d.firstClearReward && (c.firstClearReward = d.firstClearReward);
              d.firstClearRewardName && (c.firstClearRewardName = d.firstClearRewardName);
              d.firstClearRewardQuantity && (c.firstClearRewardQuantity = d.firstClearRewardQuantity);
              d.addDropItem && (c.addDropItem = d.addDropItem);
              d.addDropItemName && (c.addDropItemName = d.addDropItemName);
              d.addDropItemQuantity && (c.addDropItemQuantity = d.addDropItemQuantity);
              c.rewardCodeArr = d.list;
              c.rewardNameArr = d.nameList;
              c.rewardQuantityArr = d.quantityList
            }
            else c = !1;
            b.questBattleModel = c;
            console.log("Log -> file: RegularEventAccomplishTop.js -> line 265 -> common.questBattleModel", b.questBattleModel);
            location.href = "#/DeckFormation/accomplish"
          }
      },
      debugBtn: function(c)
      {
        c.preventDefault();
        b.isScrolled() || (c = a.nowBattleNum - 1, a.battleRewardPlay = {
          model: a.difficultyList[c],
          num: c
        }, a.clearResultView = new w("debug"), b.androidKeyStop = !0)
      },
      debugBtn2: function(c)
      {
        c.preventDefault();
        if (!b.isScrolled())
        {
          c = h.template($("#debug").text());
          var d = "     ".split(" ");
          new b.PopupClass(
          {
            title: "コマンド",
            content: c(),
            closeBtnText: "クローズ",
            decideBtnText: "変更",
            decideBtnEvent: function()
            {
              f.enemyFormationPreviewRemove();
              var c = a.debugBtn2Data.enemyList,
                h = c.length;
              d[0] = b.doc.getElementById("displayBase").checked;
              d[1] = b.doc.getElementById("displayAlignIcon").checked;
              d[2] = b.doc.getElementById("inputX").value - 0;
              d[3] = b.doc.getElementById("inputY").value - 0;
              d[4] = b.doc.getElementById("inputScale").value - 0;
              d[5] = b.doc.getElementById("inputHp").value - 0;
              for (var g = 0; g < h; g++) "" != b.doc.getElementById("inputHp").value ? c[g].currentHp = d[5] : delete c[g].currentHp;
              c = {
                displayBase: d[0],
                displayAlignIcon: d[1],
                x: d[2],
                y: d[3],
                scale: d[4],
                enemyList: c
              };
              f.enemyFormationPreview(c);
              a.debugBtn2Data = c;
              b.g_popup_instance.popupView.close()
            },
            popupType: "typeA"
          }, null, function()
          {
            b.nativeKeyBoard("inputX", 10, 1);
            b.nativeKeyBoard("inputY", 10, 1);
            b.nativeKeyBoard("inputScale", 10, 1);
            b.nativeKeyBoard("inputHp", 10, 1);
            b.doc.getElementById("displayBase").checked = a.debugBtn2Data.displayBase;
            b.doc.getElementById("displayAlignIcon").checked = a.debugBtn2Data.displayAlignIcon;
            a.debugBtn2Data.x ? b.doc.getElementById("inputX").value = a.debugBtn2Data.x : b.doc.getElementById("inputX").value = 0;
            a.debugBtn2Data.y ? b.doc.getElementById("inputY").value = a.debugBtn2Data.y : b.doc.getElementById("inputY").value = 0;
            a.debugBtn2Data.scale ? b.doc.getElementById("inputScale").value = a.debugBtn2Data.scale : b.doc.getElementById("inputScale").value = 1;
            b.doc.getElementById("inputHp").value = ""
          }, null)
        }
      }
    }),
    v = l.View.extend(
    {
      id: "enemydetailWrap",
      events: function()
      {
        var c = {};
        this.listenTo(a.nowBattle, "change", this.replaceView);
        c[b.cgti + " .enemyInfoBtn"] = this.enemyInfoBtn;
        return c
      },
      initialize: function(b)
      {
        this.listenTo(this.rootView, "removeChildView", this.removeView);
        this.model = b;
        a.nowBattleUnit = Object.values(h.pick(g.questBattlePreviewJsonMap, a.nowBattle.attributes.model.questBattleId))[0];
        this.effectShow()
      },
      render: function()
      {
        a.nowBattleUnit && this.$el.html(this.template(
        {
          model: a.nowBattleUnit[0].enemyList,
          winFlag: a.nowBattle.attributes.model.cleared
        }));
        return this
      },
      effectShow: function()
      {
        f.playEffect(
        {
          name: "web_accomplish_efe_01",
          action: "action",
          x: 0,
          y: 0,
          scale: 1024 === b.displayWidth ? 1 : .8
        });
        window.isBrowser && setTimeout(nativeCallback, 800)
      },
      effectHide: function()
      {
        f.stopEffect()
      },
      replaceView: function()
      {
        a.nowBattleUnit = Object.values(h.pick(g.questBattlePreviewJsonMap, a.nowBattle.attributes.model.questBattleId))[0];
        void 0 != a.nowBattleUnit && this.$el.html(this.template(
        {
          model: a.nowBattleUnit[0].enemyList,
          winFlag: a.nowBattle.attributes.model.cleared
        }))
      },
      enemyInfoBtn: function(c)
      {
        c.preventDefault();
        if (!b.isScrolled())
        {
          var d = h.template($("#enemyDetailPopTemp").text()),
            e = function()
            {
              f.getBaseData(b.getNativeObj())
            }.bind(this);
          new b.PopupClass(
          {
            title: "敵情報",
            content: d(
            {
              model: a.nowBattleUnit[0].enemyList[c.currentTarget.dataset.index],
              winFlag: a.nowBattle.attributes.model.cleared
            }),
            popupId: "enemyInfolPop",
            popupType: "typeA"
          }, null, e, null);
          console.log(a.nowBattleUnit[0].enemyList[c.currentTarget.dataset.index])
        }
      },
      removeView: function()
      {
        this.off();
        this.remove();
        f.stopEffect()
      }
    }),
    t = l.View.extend(
    {
      id: "questdetailWrap",
      events: function()
      {
        this.listenTo(a.nowBattle, "change", this.replaceView);
        return {}
      },
      initialize: function(a)
      {
        this.listenTo(this.rootView, "removeChildView", this.removeView);
        this.model = a;
        this.createDom()
      },
      render: function()
      {
        this.$el.html(this.template(
        {
          model: a.nowBattle.attributes.model,
          rewardModels: a.firstRArr,
          missionRewardModels: a.missionRArr
        }));
        return this
      },
      createDom: function()
      {
        this.rewardModels();
        f.getBaseData(b.getNativeObj())
      },
      replaceView: function()
      {
        this.rewardModels();
        this.$el.html(this.template(
        {
          model: a.nowBattle.attributes.model,
          rewardModels: a.firstRArr,
          missionRewardModels: a.missionRArr
        }));
        f.getBaseData(b.getNativeObj())
      },
      rewardModels: function()
      {
        for (var b = a.nowBattle.attributes.model.questBattle.firstClearRewardCodes.split(","), d = [], e = 0; e < b.length; e++) d.push(this.rewardItemFunc(b[e])), this._reward && this._reward.removeView();
        a.firstRArr = d
      },
      rewardItemFunc: function(a)
      {
        a = b.itemSet(a);
        var c = a.itemCode.split("_")[2];
        this._reward = new A(
        {
          model:
          {
            item: a,
            quantity: a.quantity,
            genericId: c,
            piece: a.piece,
            chara:
            {
              id: a.itemCode
            }
          },
          type: a.rewardType
        });
        return this._reward.render().el.innerHTML
      },
      removeView: function()
      {
        this._reward && this._reward.removeView();
        this.off();
        this.remove()
      }
    }),
    u = l.View.extend(
    {
      id: "questListWrap",
      events: function()
      {
        return {}
      },
      initialize: function(a)
      {
        this.listenTo(this.rootView, "removeChildView", this.removeView);
        this.model = a;
        this.createDom()
      },
      render: function()
      {
        this.$el.html(this.template(
        {
          model: a.difficultyList,
          length: a.slideLength
        }));
        return this
      },
      createDom: function() {},
      scrollListInit: function()
      {
        var c = b.doc.getElementById("questList"),
          d = b.doc.getElementsByClassName("scrollElm"),
          e = d.length,
          d = parseInt($(d).css("width")) * e + 170;
        $(c).css("width", d + "px");
        this.listScroll = new IScroll("#questListWrap",
        {
          tap: !1,
          click: !1,
          snap: "li",
          scrollX: !0,
          scrollY: !1,
          disablePointer: !0,
          deceleration: .003,
          snapSpeed: .2,
          snapThreshold: .2,
          bounce: !1
        });
        window.scrollFlag = !0;
        a.nowBattlePage = a.startBattleNum.num;
        a.battleRewardPlay && void 0 != a.battleRewardPlay ? (this.listScroll.goToPage(a.battleRewardPlay.num, 0, a.bounceTime), a.clearResultView = new w, b.androidKeyStop = !0) : this.listScroll.goToPage(a.startBattleNum.num, 0, a.bounceTime);
        a.currentPage = this.listScroll.currentPage.pageX;
        this.questSelect(this.listScroll.currentPage.pageX, e, !0);
        var f = this;
        this.listScroll.on("scrollEnd", function(b)
        {
          a.currentPage = this.currentPage.pageX;
          f.questSelect(this.currentPage.pageX, e)
        })
      },
      questSelect: function(c, d, e)
      {
        if (!a.firstPreviewFlag || a.nowBattleNum != c + 1)
        {
          console.log(a.nowBattleNum, c + 1);
          var m;
          m = c + 1 < a.nowBattleNum ? "leftBook" : "rightBook";
          a.nowBattleNum = c + 1;
          a.startBattleNum.num + 1 == a.nowBattleNum ? b.doc.getElementById("nowBattleBtn").classList.remove("show") : b.doc.getElementById("nowBattleBtn").classList.add("show");
          a.nowBattleNum == d ? b.doc.getElementsByClassName("rightArr")[0].classList.add("hide") : b.doc.getElementsByClassName("rightArr")[0].classList.remove("hide");
          1 == a.nowBattleNum ? b.doc.getElementsByClassName("leftArr")[0].classList.add("hide") : b.doc.getElementsByClassName("leftArr")[0].classList.remove("hide");
          b.doc.getElementsByClassName("nowQuest")[0] && (b.doc.getElementsByClassName("nowQuest")[0].classList.remove("leftBook"), b.doc.getElementsByClassName("nowQuest")[0].classList.remove("rightBook"), b.doc.getElementsByClassName("nowQuest")[0].classList.remove("nowQuest"));
          b.doc.getElementById("questId" + a.nowBattleNum).classList.add("nowQuest");
          b.doc.getElementById("questId" + a.nowBattleNum).classList.add(m);
          a.nowBattle.set(
          {
            model: a.difficultyList[c]
          });
          this.rootView.questDetailChange(a.nowBattleNum);
          b.doc.getElementById("questdetailWrap").classList.remove("show");
          a.difficultyList[c].cleared ? b.doc.getElementById("nowBook").classList.add("cleared") : b.doc.getElementById("nowBook").classList.remove("cleared");
          a.difficultyList[c].questBattleId == a.startBattleNum.model.questBattleId ? a.difficultyList[c].cleared ? b.doc.getElementById("nowBook").classList.remove("canPlay") : b.doc.getElementById("nowBook").classList.add("canPlay") : b.doc.getElementById("nowBook").classList.remove("canPlay");
          1 != e && (f.enemyFormationPreviewRemove(), a.nowBattleUnit = Object.values(h.pick(g.questBattlePreviewJsonMap, a.nowBattle.attributes.model.questBattleId))[0], a.nowBattleUnit && (c = 96, b.ua.ios && b.ua.ipad && (c = 90), c = {
            displayBase: !0,
            displayAlignIcon: !1,
            x: -14,
            y: c,
            scale: .93,
            enemyList: a.nowBattleUnit[0].enemyList
          }, f.enemyFormationPreview(c), window.isDebug && (a.debugBtn2Data = c)), a.firstPreviewFlag || (a.firstPreviewFlag = !0))
        }
      },
      removeView: function()
      {
        this.off();
        this.remove()
      }
    }),
    w = l.View.extend(
    {
      id: "clearAnimeWrap",
      events: function()
      {
        var a = {};
        a["webkitAnimationEnd #rewardArea"] = this.stageClear;
        a[b.cgti + " #rollLightArea"] = this.finish;
        return a
      },
      initialize: function(a)
      {
        this.template = h.template($("#clearAnimePartsTemp").text());
        this.createDom();
        this.options = a
      },
      render: function()
      {
        for (var b = a.battleRewardPlay.model.questBattle.firstClearRewardCodes.split(","), d = [], e = 0; e < b.length; e++) d.push(a.questDetailListView.rewardItemFunc(b[e])), a.questDetailListView._reward && a.questDetailListView._reward.removeView();
        this.$el.html(this.template(
        {
          model: a.battleRewardPlay,
          rewardModels: d
        }));
        return this
      },
      createDom: function()
      {
        $("#overlapContainer").append(this.render().el);
        f.getBaseData(b.getNativeObj());
        setTimeout(function()
        {
          f.startSe(1501)
        }, 500)
      },
      stageClear: function(a)
      {
        b.doc.getElementById("centerDom").classList.add("end");
        b.doc.getElementById("rollLightArea").classList.add("touchOK")
      },
      finish: function()
      {
        this.off();
        this.remove();
        if ("debug" != this.options)
        {
          var c = "questId" + (a.nowBattlePage + 1);
          b.doc.getElementById("questId" + a.nowBattlePage).classList.remove("goBattle");
          a.questListView.listScroll.goToPage(a.nowBattlePage, 0, a.bounceTime);
          b.doc.getElementById(c).classList.add("goBattle")
        }
        b.androidKeyStop = !1
      }
    }),
    x = function()
    {
      b.setStyle(z);
      f.changeBg("web_accomplish_top_01.ExportJson");
      f.startBgm("bgm21_system04");
      k = new D
    },
    E = function(a, d)
    {
      var c = !0;
      a ? h.each(g.userQuestAdventureList, function(b)
      {
        a === b.adventureId && (c = !1)
      }) : c = !1;
      c ? ($(b.ready.target).off(), $(b.ready.target).on("webkitAnimationEnd", function()
      {
        f.changeBg("web_black.jpg");
        $(b.ready.target).off();
        $(b.ready.target).on("webkitAnimationEnd", function(a)
        {
          "readyFadeOut" == a.originalEvent.animationName && (b.ready.target.className = "")
        });
        p.ajaxPost(b.linkList.userQuestAdventureRegist,
        {
          adventureId: String(a)
        }, d)
      }), b.ready.target.classList.contains("preNativeFadeIn") ? $(b.ready.target).trigger("webkitAnimationEnd") : b.addClass(b.ready.target, "preNativeFadeIn")) : d()
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
      id: "userLimitedChallengeList"
    },
    {
      id: "userPatrolList"
    }],
    fetch: function(a)
    {
      f.endQuest();
      f.setWebView(!0);
      b.questNativeResponse && (b.responseSetStorage(b.questNativeResponse), nativeJson = b.questNativeResponse);
      b.supportUserList = null;
      b.questNativeResponse = null;
      b.questBattleModel = null;
      b.questSupportModel = null;
      a && 0 < a && (n = a | 0);
      p.pageModelGet(this.needModelIdObj)
    },
    init: function()
    {
      a = {
        bounceTime: 500
      };
      a.Model = l.Model.extend();
      b.clearSectionModel = null;
      b.clearChapterModel = null;
      g = p.getPageJson();
      C.createCardList();
      var c = h.findWhere(g.regularEventList,
      {
        regularEventType: "ACCOMPLISH"
      });
      c || (location.href = "#/MyPage");
      g.eventMaster = c;
      a.level40CardArr = b.storage.userCardListEx.filter(function(a)
      {
        return 40 <= a.get("level")
      });
      g.userRegularEventAccomplish.cureAt && (b.userRegularEventAccomplishCureAt = g.userRegularEventAccomplish.cureAt);
      b.userRegularEventAccomplishCharaArr = {};
      h.each(g.userRegularEventAccomplishCharaList, function(a)
      {
        b.userRegularEventAccomplishCharaArr[a.charaId] = a
      });
      a.sectionList = [];
      h.each(g.userSectionList, function(b, c)
      {
        "REG_ACC" == b.section.questType && a.sectionList.push(b)
      });
      a.sectionList = h.sortBy(a.sectionList, function(a)
      {
        return a.sectionId
      });
      a.battleList = [];
      a.battleDifficultyList = [];
      h.each(g.userQuestBattleList, function(b, c)
      {
        for (c = 0; c < a.sectionList.length; c++) b.questBattle.sectionId == a.sectionList[c].sectionId && (a.battleList.push(b), void 0 == a.battleDifficultyList[b.questBattle.questBattleType] && (a.battleDifficultyList[b.questBattle.questBattleType] = []), a.battleDifficultyList[b.questBattle.questBattleType].push(b))
      });
      a.battleList = h.sortBy(a.battleList, function(a)
      {
        return a.questBattleId
      });
      a.battleDifficultyList.NORMAL = h.sortBy(a.battleDifficultyList.NORMAL, function(a)
      {
        return a.questBattleId
      });
      a.battleDifficultyList.HARD = h.sortBy(a.battleDifficultyList.HARD, function(a)
      {
        return a.questBattleId
      });
      a.difficultyList = a.battleDifficultyList.NORMAL;
      a.slideLength = a.difficultyList.length;
      window.isLocal && (a.level40CardArr = [1, 2], h.each(a.difficultyList, function(a, b)
      {
        1 <= b || (a.cleared = !0)
      }));
      for (var d = 0; d < a.slideLength; d++)
      {
        var e = a.slideLength - 1,
          m = d - 1;
        if (!a.difficultyList[d].cleared)
        {
          n && n == a.difficultyList[m].questBattleId && (a.battleRewardPlay = {
            model: a.difficultyList[m],
            num: m
          });
          a.startBattleNum = {
            model: a.difficultyList[d],
            num: d
          };
          break
        }
        d == a.slideLength - 1 && (a.allCleared = !0, a.startBattleNum = n == a.difficultyList[d].questBattleId ? a.battleRewardPlay = {
          model: a.difficultyList[e],
          num: e
        } :
        {
          model: a.difficultyList[e],
          num: e
        })
      }
      a.nowBattle = new a.Model(
      {
        model: a.startBattleNum.model
      });
      b.historyArr = ["MyPage", "RegularEventAccomplishTop"];
      var k = c && c.startStoryId ? c.startStoryId : null;
      E(k, function(a)
      {
        a ? (b.responseSetStorage(a), $("#commandDiv").on("nativeCallback", function(a, d)
        {
          $("#commandDiv").off();
          f.setWebView(!0);
          b.tapBlock(!1);
          b.androidKeyStop = !1;
          b.ready.target.className = "nativeFadeOut";
          b.eventFirstNavi(["navi_01", "navi_02"], c.regularEventId, "accomplish", function()
          {
            x()
          }, !1, "regularEvent")
        }), setTimeout(function()
        {
          f.setWebView(!1);
          f.startStory(k);
          window.isBrowser && nativeCallback()
        }, 500)) : x()
      })
    },
    startCommand: function() {},
    removeCommand: function() {},
    remove: function(b)
    {
      window.scrollFlag = null;
      f.enemyFormationPreviewRemove();
      k && (k.trigger("removeChildView"), k.remove());
      q && q.removeView();
      a && (a.questListView && a.questListView.listScroll && (a.questListView.listScroll.off("scrollEnd"), a.questListView.listScroll.destroy()), a = void 0);
      n = null;
      b()
    }
  }
});
