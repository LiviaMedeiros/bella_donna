define("underscore backbone backboneCommon ajaxControl command text!template/formation/DeckFormation.html text!css/formation/DeckFormation.css cardUtil memoriaUtil js/view/chara/CharaListView js/card/CardPopup js/memoria/MemoriaPopup QuestUtil DeckUtil js/event/EventArenaRankMatch/parts/SpRule js/event/EventArenaRankMatch/parts/OpponentPopup js/event/EventArenaRankMatch/parts/DeckEditCountDown js/event/EventArenaRankMatch/Utility js/quest/puellaHistoria/lastBattle/Utility js/quest/scene0/Utility".split(" "), function(h, B, a, A, n, T, U, V, ia, W, C, J, X, Y, Z, aa, ba, ca, da, ea)
{
  var M = B.Model.extend(),
    R = B.Collection.extend(),
    K = null,
    d = null,
    y = null,
    t = null,
    f = null,
    L = null,
    x;
  a.switchNpcCompar = {};
  a.rentalPieceData = {};
  var p, u, fa = B.View.extend(
    {
      initialize: function(b)
      {
        this.template = h.template(T);
        this.questLoopStatus = X.getQuestLoopStatus(a.questBattleModel);
        this.createDom()
      },
      render: function()
      {
        var a = A.getPageJson();
        a.deckCatType = d;
        a.questLoopStatus = this.questLoopStatus;
        this.$el.html(this.template(a));
        return this
      },
      createDom: function()
      {
        var b = {
          hideStatus: !0
        };
        H() || (b.hideMenu = !0);
        "accomplish" === d && (b.hideHelp = !0);
        a.setGlobalView(b);
        a.content.append(this.render().el);
        if ("accomplish" === d)
        {
          var c = this;
          require(["js/regularEvent/accomplish/view/RegularEventAccomplishRecoverView"], function(b)
          {
            b.prototype.recoverCallback = function()
            {
              r.appendCharaStatus();
              var b = r.deckDataCreate(f.model.toJSON());
              f.model.clear(
              {
                silent: !0
              });
              f.model.set(b);
              a.doc.querySelector("#charaListWrap").className = ""
            };
            x && x.removeView();
            b.prototype.rootView = this;
            x = new b;
            a.doc.getElementById("allRecoveryWrap").append(x.el);
            c.createView()
          })
        }
        else this.createView()
      },
      createView: function()
      {
        N.prototype.parentView = this;
        N.prototype.template = h.template($("#DeckViewTemp").text());
        var b = a.doc.createDocumentFragment(),
          c = t;
        a.copyDeckModel && (c = r.deckDataCreate(a.copyDeckModel), a.copyDeckModel = null);
        f = new N(
        {
          model: new M(c)
        });
        b.appendChild(f.render().el);
        a.doc.querySelector("#DeckFormation").appendChild(b);
        a.doc.querySelector(".memoriaEquipMode") && a.addClass(a.doc.querySelector("#pieceEquipBtn"), "on");
        a.rentalPieceData && a.rentalPieceData.rentalFlag && ("exterminationCopy" === d && "secondPartLastCopy" === d || a.addClass(a.doc.querySelector("#pieceEquipBtn"), "rental"));
        a.questBattleModel && (a.addClass(a.doc.querySelector(".attBox"), "enemyDetail"), h.each(a.questBattleModel.questBattle.waveEnemyAttributeIdList, function(b)
        {
          b = b.toLowerCase();
          a.addClass(a.doc.querySelector(".enemyDetail ." + b), "on")
        }), "group" === d && a.questBattleModel.isSimulate && a.addClassId("simulateBaloon", "on"));
        n.getBaseData(a.getNativeObj());
        z(f.model.toJSON(), t);
        O.prototype.parentView = this;
        O.prototype.template = h.template($("#UserFormationListTemp").text());
        b = a.doc.createDocumentFragment();
        a.storage.userFormationSheetList.comparator = function(a)
        {
          return a.get("formationSheetId")
        };
        a.storage.userFormationSheetList.sort();
        a.storage.userFormationSheetList.each(function(a)
        {
          var c = a.toJSON(),
            e = [];
          h.each(c.formationSheet, function(a, b)
          {
            -1 !== b.indexOf("placeSkill") && -1 === b.indexOf("placeSkillId") && e.push(b.split("placeSkill")[1])
          });
          a.set(
          {
            posArr: e
          });
          a = new O(
          {
            model: a
          });
          b.appendChild(a.render().el)
        });
        a.doc.querySelector(".formationSheetListInner").appendChild(b);
        P.prototype.parentView = this;
        P.prototype.template = h.template($("#deckChangeModeTemp").text());
        c = r.deckListDataCreate();
        b = a.doc.createDocumentFragment();
        this.deckChangeModeView = new P(
        {
          model: new M(c)
        });
        b.appendChild(this.deckChangeModeView.render().el);
        a.doc.querySelector("#deckSelectWrap").appendChild(b);
        "group" === d && this.deckMpCalculate();
        a.ready.hide()
      },
      events: function()
      {
        var b = {};
        b[a.cgti + " #mainBtn"] = this.deckSave;
        b[a.cgti + " .nextPageBtn"] = this.nextPageFunc;
        b[a.cgti + " #exterminationCopyBtn"] = this.exterminationCopyBtn;
        b[a.cgti + " #allRecoveryBtn"] = this.allRecoveryBtn;
        b[a.cgti + " #pieceEquipBtn"] = this.pieceEquipMode;
        b[a.cgti + " #formationSheetChangeBtn"] = this.formationSheetChange;
        b[a.cgti + " #dispModeChangeBtn"] = this.dispModeChange;
        b[a.cgti + " #previewBtn"] = this.deckPreview;
        b[a.cgti + " #deckRemovePopBtn"] = this.deckRemovePop;
        b[a.cgti + " #previewCloseBtn"] = this.deckPreviewClose;
        b[a.cgti + " #formationSheetDecideBtn"] = this.formationSheetClose;
        b[a.cgti + " #formationDetailBtn"] = this.formationDetailOpen;
        b[a.cgti + " #regularEventNaviBtn"] = this.regularEventPopup;
        b[a.cgti + " #deckCancelBtn"] = this.modeCancel;
        b[a.cgti + " #deckCopyModeBtn"] = this.deckCopyMode;
        b[a.cgti + " #arenaRankMatchSpRuleBtn"] = this.openArenaRankMatchSpRulePopup;
        b[a.cgti + " #arenaRankMatchOpponentBtn"] = this.openArenaRankMatchOpponentPopup;
        return b
      },
      exterminationCopyBtn: function(b)
      {
        b.preventDefault();
        if (!a.isScrolled())
        {
          var c = f.model.toJSON(),
            e = r.savePrmCreate(c);
          e.deckType = a.copyDeckType;
          delete e.questPositionHelper;
          for (b = 0; b < e.userCardIds.length;)
          {
            var l = e.userCardIds[b],
              g = !1,
              k = 70;
            "exterminationCopy" === d && (g = (g = a.storage.userCardListEx.findWhere(
            {
              id: l
            })) && 4 > g.get("cardId") % 10);
            "secondPartLastCopy" === d && (k = 100);
            if (!g)
              for (var E = 1; 5 >= E;)
              {
                c = k + E;
                if (c !== e.deckType && (c = h.findWhere(a.storage.userDeckList.toJSON(),
                  {
                    deckType: c
                  })))
                  for (var q = 1; 9 >= q;)
                  {
                    if (c["userCardId" + q] && c["userCardId" + q] === l)
                    {
                      g = !0;
                      break
                    }
                    q = q + 1 | 0
                  }
                if (g) break;
                E = E + 1 | 0
              }
            g && (l === e.episodeUserCardId && delete e.episodeUserCardId, e.questPositionIds.splice(b, 1), e.userCardIds.splice(b, 1), e.userPieceIdLists.splice(b, 1), b--);
            b = b + 1 | 0
          }
          b = "殲滅戦のチームに編成されていない、<br>★4または★5まで覚醒済みの魔法少女が、<br>1体以上編成されているチームを選択してください。";
          var l = 'この編成を殲滅戦の編成にコピーします。<br><br><span class="c_red">※★4まで覚醒していない魔法少女、<br>殲滅戦のチームに編成に編成されている魔法少女は<br>コピーされません。</span>',
            m = "#/RegularEventExterminationFormation";
          "secondPartLastCopy" === d && (b = "鏡の魔女との戦いに編成されていない魔法少女が、<br>1体以上編成されているチームを選択してください。", l = 'この編成をコピーします。<br><br><span class="c_red">※鏡の魔女との戦いに編成されている<br>魔法少女はコピーされません。</span>', m = "#/SecondPartLastFormation");
          1 > e.userCardIds.length ? new a.PopupClass(
          {
            title: "編成コピー",
            content: b,
            closeBtnText: "OK",
            popupType: "typeA"
          }) : (e.episodeUserCardId || (e.episodeUserCardId = e.userCardIds[0]), new a.PopupClass(
          {
            title: "編成コピー",
            content: l,
            closeBtnText: "キャンセル",
            decideBtnText: "コピー",
            decideBtnEvent: function()
            {
              A.ajaxPost(a.linkList.userDeckSave, e, function(b)
              {
                a.responseSetStorage(b);
                location.href = m
              })
            },
            popupType: "typeA"
          }))
        }
      },
      deckSave: function(b)
      {
        if (b && (b.preventDefault(), a.isScrolled() || b.currentTarget.classList.contains("off"))) return;
        var c = this;
        if (a.tutorialId)
          if (a.doc.getElementById("baseContainer").classList.contains("type03_2")) a.tutorialUtil[a.tutorialId]("save2");
          else a.tutorialUtil[a.tutorialId]("save");
        var e = f.model.toJSON(),
          l = r.savePrmCreate(e);
        l.switchNpcEventId = e.switchNpcEventId ? e.switchNpcEventId : a.switchNpcCompar.eventId;
        l.switchNpcFlagList = [];
        for (b = 1; 10 >= b; b++) void 0 == e["switchNpcFlag" + b] && (e["switchNpcFlag" + b] = null), l.switchNpcFlagList.push(e["switchNpcFlag" + b]);
        l.rentalPieceSetIdList = [];
        for (b = 1; 10 >= b; b++) void 0 != e["rentalPieceSetId" + b] ? l.rentalPieceSetIdList.push(e["rentalPieceSetId" + b]) : l.rentalPieceSetIdList.push(null);
        if ("endless" === d && 3 > l.userCardIds.length) n.startSe(1002), new a.PopupClass(
        {
          title: "編成エラー",
          content: "バトル開始には、3人以上の魔法少女が<br>編成に含まれている必要があります。",
          closeBtnText: "OK"
        }), a.androidKeyStop = !1;
        else
        {
          if (("arenaRankMatchAttack" === d || "arenaRankMatchDefence" === d) && a.EventArenaRankMatchPrm && a.EventArenaRankMatchPrm.deckMinNumList && a.EventArenaRankMatchPrm.deckMaxNumList && a.EventArenaRankMatchPrm.deckEditAccessTime)
          {
            b = a.EventArenaRankMatchPrm.deckMinNumList[d];
            var g = a.EventArenaRankMatchPrm.deckMaxNumList[d];
            if (b > l.userCardIds.length)
            {
              n.startSe(1002);
              new a.PopupClass(
              {
                title: "編成エラー",
                content: "バトル開始には、" + b + "人以上の魔法少女が<br>編成に含まれている必要があります。",
                closeBtnText: "OK"
              });
              a.androidKeyStop = !1;
              return
            }
            if (l.userCardIds.length > g)
            {
              n.startSe(1002);
              new a.PopupClass(
              {
                title: "編成エラー",
                content: "バトル開始には、" + g + "人未満の魔法少女の<br>編成である必要があります。",
                closeBtnText: "OK"
              });
              a.androidKeyStop = !1;
              return
            }
            if (!ca.isOpenEvent(
              {
                pageJson: p,
                pageAccessLocalTime: a.EventArenaRankMatchPrm.deckEditAccessTime,
                rankMatchEventInfo: a.EventArenaRankMatchPrm.eventInfo
              }))
            {
              new a.PopupClass(
              {
                title: "イベント終了",
                content: "イベント開催期間外です。",
                closeBtnText: "OK",
                canClose: !1,
                popupType: "typeC"
              }, null, function() {}, function()
              {
                location.href = "#/ArenaTop"
              });
              a.androidKeyStop = !1;
              return
            }
          }
          if ("arena" === d && !l.userCardIds.length || "arenaRankMatchAttack" === d && !l.userCardIds.length || "arenaRankMatchDefence" === d && !l.userCardIds.length || "group" === d && !l.userCardIds.length || "support" === d && !l.userCardIds.length) n.startSe(1002), new a.PopupClass(
          {
            title: "編成エラー",
            content: "魔法少女を１体以上編成してください。",
            closeBtnText: "OK"
          }), a.androidKeyStop = !1;
          else if ("dungeon" === d && !e.leaderPos || "dungeonInMap" === d && !e.leaderPos) n.startSe(1002), new a.PopupClass(
          {
            title: "編成エラー",
            content: "メインメンバーに魔法少女を１体以上編成してください。",
            closeBtnText: "OK"
          }), a.androidKeyStop = !1;
          else if (e = function(b)
            {
              a.responseSetStorage(b);
              n.getBaseData(a.getNativeObj());
              "secondPartLast" === d && a.SecondPartLastBattleConfirmModel && (a.SecondPartLastBattleConfirmModel.deckInfo = a.SecondPartLastBattleConfirmModel.getUserDeck(
              {
                index: a.SecondPartLastBattleConfirmModel.index - 1
              }));
              a.holdDeck = null;
              a.removeUserCardIdArr = [];
              var e = r.deckListDataCreate();
              c.deckChangeModeView.model.clear(
              {
                silent: !0
              });
              c.deckChangeModeView.model.set(e);
              b.userDeckList ? (b = h.findWhere(b.userDeckList,
              {
                deckType: l.deckType
              })) ? (b.formationSheet || (b.formationSheet = h.findWhere(p.userFormationSheetList,
              {
                formationSheetId: b.formationSheetId
              }).formationSheet), e = f.model.toJSON(), b.userCardObj = e.userCardObj) : b = f.model.toJSON() : b = f.model.toJSON();
              t = r.deckDataCreate(b);
              f.model.clear(
              {
                silent: !0
              });
              f.model.set(t);
              z(f.model.toJSON(), t)
            }, n.startSe(1002), a.removeUserCardIdArr.length)
          {
            g = {
              userDeckList: []
            };
            g.userDeckList.push(l);
            var k, E, q;
            switch (d)
            {
              case "extermination":
                k = 70;
                E = 5;
                q = a.linkList.exterminationBulkSave;
                break;
              case "secondPartLast":
                k = 100;
                E = 5;
                q = a.linkList.userDeckBulkSave;
                break;
              default:
                k = 10, E = 9, q = a.linkList.exterminationBulkSave
            }
            for (b = 1; b <= E;)
            {
              if (f.model.toJSON().deckType !== k + b)
              {
                var m = a.storage.userDeckList.findWhere(
                {
                  deckType: k + b
                });
                if (m)
                {
                  for (var m = m.toJSON(), w = 1, u = !1; 9 >= w;) - 1 < a.removeUserCardIdArr.indexOf(m["userCardId" + w]) && (m.questEpisodeUserCardId === m["userCardId" + w] && delete m.questEpisodeUserCardId, delete m["userCardId" + w], u = !0), w = w + 1 | 0;
                  u && (m = r.deckDataCreate(m), m = r.savePrmCreate(m), !m.episodeUserCardId && m.userCardIds[0] && (m.episodeUserCardId = m.userCardIds[0]), g.userDeckList.push(m))
                }
              }
              b = b + 1 | 0
            }
            A.ajaxPost(q, g, e)
          }
          else a.switchNpcCompar.saveParty = l.deckType, A.ajaxPost(a.linkList.userDeckSave, l, e)
        }
      },
      nextPageFunc: function(b)
      {
        b.preventDefault();
        if (!a.isScrolled())
        {
          a.questBattleModel && (a.questBattleModel.isLoop = b.currentTarget.classList.contains("loop"));
          b = !1;
          a.switchNpcCompar.saveParty && f.model.attributes.deckType != a.switchNpcCompar.saveParty && (u.deckSave(), b = !0);
          if (!b)
          {
            b = h.findWhere(p.userDeckList,
            {
              deckType: f.model.attributes.deckType
            });
            var c = [!1, !1];
            h.each(b, function(a, b)
            {
              -1 !== b.indexOf("switchNpcFlag") && 1 == b && (c[0] = !0)
            });
            h.each(f.model.attributes, function(a, b)
            {
              -1 !== b.indexOf("switchNpcFlag") && 1 == f.model.attributes[b] && (c[1] = !0)
            });
            0 == c[0] && 1 == c[1] && u.deckSave()
          }
          r.nextPageFunc(f.model.toJSON())
        }
      },
      regularEventPopup: function(b)
      {
        b.preventDefault();
        a.isScrolled() || a.eventFirstNavi(["navi_05"], L.regularEventId, b.currentTarget.dataset.eventType, null, !0, "regularEvent")
      },
      pieceEquipMode: function(b)
      {
        if (b && (b.preventDefault(), a.isScrolled())) return;
        a.doc.querySelector(".deckViewWrap").classList.contains("memoriaEquipMode") ? (a.removeClass(a.doc.querySelector(".deckViewWrap"), "memoriaEquipMode"), a.removeClass(a.doc.querySelector("#pieceEquipBtn"), "on")) : (a.addClass(a.doc.querySelector(".deckViewWrap"), "memoriaEquipMode"), a.addClass(a.doc.querySelector("#pieceEquipBtn"), "on"))
      },
      formationSheetChange: function(b)
      {
        b.preventDefault();
        a.isScrolled() || (f.selectModel = null, f.selectPos = null, a.removeClass(a.doc.querySelector("#charaListWrap"), "open"), setTimeout(function()
        {
          a.addClass(a.doc.querySelector("#DeckFormation"), "formation");
          var b = a.doc.querySelectorAll('[data-fsid="' + f.model.toJSON().formationSheetId + '"]')[0];
          a.addClass(b, "select");
          a.addClass(a.doc.querySelector("#deckFooter .default"), "noneDisp");
          a.removeClass(a.doc.querySelector("#deckFooter .fs"), "noneDisp");
          a.addClass(a.doc.querySelector("#globalBackBtn"), "noneDisp");
          a.removeClass(a.doc.querySelector("#sideMenu"), "anim");
          a.addClass(a.doc.querySelector("#menu"), "noneDisp");
          a.scrollSet("formationSheetListOuter", "formationSheetListInner");
          a.scrollRefresh(null, null, !0)
        }, 0))
      },
      dispModeChange: function(b)
      {
        b.preventDefault();
        a.isScrolled() || (b = a.doc.querySelector(".deckViewWrap"), b.classList.contains("memoriaEquipMode") ? (a.removeClass(b, "memoriaEquipMode"), a.removeClass(a.doc.querySelector("#pieceEquipBtn"), "on")) : b.classList.contains("charaStatusMode") ? (a.removeClass(b, "charaStatusMode"), a.addClass(b, "diskMode")) : b.classList.contains("diskMode") ? (a.removeClass(b, "diskMode"), a.addClass(b, "skillMode")) : b.classList.contains("skillMode") && (a.removeClass(b, "skillMode"), a.addClass(b, "charaStatusMode")))
      },
      deckPreview: function(b)
      {
        b.preventDefault();
        if (!a.isScrolled())
        {
          setTimeout(function()
          {
            a.addClass(a.doc.querySelector("#DeckFormation"), "preview");
            a.addClass(a.doc.querySelector("#deckFooter .default"), "noneDisp");
            a.removeClass(a.doc.querySelector("#deckFooter .preview"), "noneDisp");
            a.addClass(a.doc.querySelector("#globalBackBtn"), "noneDisp");
            a.removeClass(a.doc.querySelector("#sideMenu"), "anim");
            a.addClass(a.doc.querySelector("#menu"), "noneDisp")
          }, 0);
          var c = [],
            e = {
              1: 8,
              2: 5,
              3: 2,
              4: 7,
              5: 4,
              6: 1,
              7: 6,
              8: 3,
              9: 0
            };
          h.each(f.model.toJSON().userCardObj, function(a, b)
          {
            if (a.card)
            {
              var d = f.model.toJSON().questEpisodeUserCardId == a.id ? !0 : !1,
                g = {};
              g.miniCharId = a.card.miniCharaNo;
              g.positionId = e[b.split("place")[1]];
              g.isLeader = d;
              g.isSupport = a.support;
              a.faceHidden && (g.isUnknown = !0);
              10 > e[b.split("place")[1]] && c.push(g)
            }
          });
          setTimeout(function()
          {
            n.formationPreview(c)
          }, 100)
        }
      },
      deckRemovePop: function(b)
      {
        b.preventDefault();
        if (!a.isScrolled())
        {
          a.removeClass(a.doc.querySelector(".deckViewWrap"), "memoriaEquipMode");
          b = $("#TeamRemovePop").text();
          var c = f.model.toJSON();
          c.popupType = "typeC";
          var e = new a.PopupClass(c, b, function()
          {
            $("#popupArea .decideBtn").on(a.cgti, function(b)
            {
              b = f.model.toJSON();
              b = r.deckDataCreate(
              {
                deckType: b.deckType,
                formationSheet: b.formationSheet,
                formationSheetId: b.formationSheetId,
                questPositionHelper: b.questPositionHelper,
                name: b.name,
                switchNpcEventId: b.switchNpcEventId,
                switchNpcFlag1: null,
                switchNpcFlag2: null,
                switchNpcFlag3: null,
                switchNpcFlag4: null,
                switchNpcFlag5: null,
                switchNpcFlag6: null,
                switchNpcFlag7: null,
                switchNpcFlag8: null,
                switchNpcFlag9: null,
                switchNpcFlag10: null,
                rentalPieceSetId1: null,
                rentalPieceSetId2: null,
                rentalPieceSetId3: null,
                rentalPieceSetId4: null,
                rentalPieceSetId5: null,
                rentalPieceSetId6: null,
                rentalPieceSetId7: null,
                rentalPieceSetId8: null,
                rentalPieceSetId9: null,
                rentalPieceSetId10: null
              });
              f.model.clear(
              {
                silent: !0
              });
              f.model.set(b);
              z(b, t);
              n.getBaseData(a.getNativeObj());
              e.remove()
            })
          })
        }
      },
      deckPreviewClose: function(b)
      {
        b.preventDefault();
        a.isScrolled() || (setTimeout(function()
        {
          a.removeClass(a.doc.querySelector("#DeckFormation"), "preview");
          a.removeClass(a.doc.querySelector("#deckFooter .default"), "noneDisp");
          a.addClass(a.doc.querySelector("#deckFooter .preview"), "noneDisp");
          a.removeClass(a.doc.querySelector("#globalBackBtn"), "noneDisp");
          H() && a.removeClass(a.doc.querySelector("#menu"), "noneDisp")
        }, 0), setTimeout(function()
        {
          n.formationPreviewRemove()
        }, 20))
      },
      formationSheetClose: function(b)
      {
        b.preventDefault();
        a.isScrolled() || setTimeout(function()
        {
          a.removeClass(a.doc.querySelector("#DeckFormation"), "formation");
          a.doc.getElementById("formationDetail").classList.contains("disp") && (a.removeClassId("formationDetail", "disp"), a.removeClass(a.doc.getElementById("formationSheetListOuter"), "hide"), "formationSheetDecideBtn" !== b.currentTarget.id && (b.currentTarget.textContent = "陣形詳細"), a.scrollDestroy("formationDetailScrollWrap", "fromationDetailScrollInner"), a.doc.getElementById("formationDetail").innerHTML = "");
          var c = a.doc.querySelectorAll('[data-fsid="' + f.model.toJSON().formationSheetId + '"]')[0];
          a.removeClass(c, "select");
          a.removeClass(a.doc.querySelector("#deckFooter .default"), "noneDisp");
          a.addClass(a.doc.querySelector("#deckFooter .fs"), "noneDisp");
          a.removeClass(a.doc.querySelector("#globalBackBtn"), "noneDisp");
          H() && a.removeClass(a.doc.querySelector("#menu"), "noneDisp")
        }, 0)
      },
      formationDetailOpen: function(b)
      {
        b.preventDefault();
        if (!a.isScrolled())
          if (a.doc.getElementById("formationDetail").classList.contains("disp")) a.removeClassId("formationDetail", "disp"), a.removeClass(a.doc.getElementById("formationSheetListOuter"), "hide"), b.currentTarget.textContent = "陣形詳細", a.scrollDestroy("formationDetailScrollWrap", "fromationDetailScrollInner"), a.doc.getElementById("formationDetail").innerHTML = "";
          else
          {
            var c = h.clone(f.model.toJSON()),
              e = a.doc.getElementById("formationSheetListOuter").getElementsByClassName("select")[0],
              c = c.formationSheet = a.storage.userFormationSheetList.findWhere(
              {
                formationSheetId: e.dataset.fsid | 0
              }).toJSON().formationSheet,
              d = a.doc.createElement("div"),
              g = h.template($("#formationDetailTemp").text());
            d.innerHTML = g(
            {
              model: c
            });
            a.doc.getElementById("formationDetail").appendChild(d);
            c = a.doc.getElementById("formationDetailScrollWrap").getElementsByClassName("detailMiniMap");
            for (d = 0; d < c.length; d++) g = e.getElementsByClassName("formationMiniMap")[0].cloneNode(!0), c[d].appendChild(g);
            n.getBaseData(a.getNativeObj());
            a.addClassId("formationDetail", "disp");
            a.scrollSet("formationDetailScrollWrap", "fromationDetailScrollInner");
            a.addClass(a.doc.getElementById("formationSheetListOuter"), "hide");
            b.currentTarget.textContent = "陣形一覧"
          }
      },
      deckMpCalculate: function()
      {
        if ("group" === d || "groupPrepare" === d)
        {
          if ("" === a.doc.getElementById("chargeCountWrap").textContent)
          {
            var b = a.GroupBattleDetailModel.userRegularEventGroupBattle.takeOverChargeCount || 0;
            a.doc.getElementById("chargeCountWrap").textContent = b + "pt"
          }
          var c = a.GroupBattleDetailModel.userRegularEventGroupBattle.takeOverMp || 0,
            e = a.doc.getElementById("deckPartsWrap").getElementsByClassName("deckParts on"),
            l = e.length;
          if (0 < l)
          {
            var g = c / l / 10 | 0,
              b = a.doc.getElementById("deckPartsWrap").getElementsByClassName("mpGauge"),
              k = b.length;
            if (101 > g)
              for (; 0 < k;) k = k - 1 | 0, b[k].getElementsByClassName("gaugeInner01")[0].getElementsByClassName("gaugeBg")[0].style = "width:" + g + "%;", b[k].getElementsByClassName("ts_brown")[0].textContent = g;
            else
            {
              for (var f = 0, g = [], h = 0; h < k; h++) 5 === a.storage.userCardListEx.findWhere(
              {
                charaId: e[h].dataset.charaid | 0
              }).toJSON().magiaLevel && (f++, g.push(h));
              if (0 < f)
                for (c = (c - 1E3 * l) / f / 10 | 0; 0 < k;) k = k - 1 | 0, b[k].getElementsByClassName("gaugeInner01")[0].getElementsByClassName("gaugeBg")[0].style = "width:100%;", b[k].getElementsByClassName("ts_brown")[0].textContent = "100", -1 < g.indexOf(k) && (50 <= c ? (b[k].getElementsByClassName("gaugeInner02")[0].getElementsByClassName("gaugeBg")[0].style = "width:100%;", b[k].getElementsByClassName("ts_brown")[0].textContent = 150) : (b[k].getElementsByClassName("gaugeInner02")[0].getElementsByClassName("gaugeBg")[0].style = "width:" + c + "%;", b[k].getElementsByClassName("ts_brown")[0].textContent = c + 100));
              else
                for (; 0 < k;) k = k - 1 | 0, b[k].getElementsByClassName("gaugeInner01")[0].getElementsByClassName("gaugeBg")[0].style = "width:100%;", b[k].getElementsByClassName("ts_brown")[0].textContent = "100"
            }
          }
        }
      },
      modeCancel: function(b)
      {
        b.preventDefault();
        a.isScrolled() || setTimeout(function()
        {
          a.removeClass(a.doc.querySelector("#DeckFormation"), "deckChange");
          a.removeClass(a.doc.querySelector("#DeckFormation"), "deckCopy");
          a.removeClass(a.doc.querySelector("#deckFooter .default"), "noneDisp");
          a.removeClass(a.doc.querySelector("#globalBackBtn"), "noneDisp");
          H() && a.removeClass(a.doc.querySelector("#menu"), "noneDisp");
          f.copyMode = !1
        }, 0)
      },
      deckCopyMode: function(b)
      {
        b.preventDefault();
        a.isScrolled() || f.deckCopyMode(b)
      },
      openArenaRankMatchSpRulePopup: function(b)
      {
        b.preventDefault();
        a.isScrolled() || a.EventArenaRankMatchPrm && a.EventArenaRankMatchPrm.spRuleList && Z.openPopup(
        {
          ruleList: a.EventArenaRankMatchPrm.spRuleList
        })
      },
      openArenaRankMatchOpponentPopup: function(b)
      {
        b.preventDefault();
        !a.isScrolled() && a.EventArenaRankMatchPrm && a.EventArenaRankMatchPrm.opponentInfo && (this.EventArenaRankMatchOpponentPopup = new aa(
        {
          model: a.EventArenaRankMatchPrm.opponentInfo,
          pageType: "DeckFormation"
        }), a.doc.getElementById("overlapContainer").appendChild(this.EventArenaRankMatchOpponentPopup.render().el), n.getBaseData(a.getNativeObj()))
      }
    }),
    H = function()
    {
      return !d || "support" == d || "arena" == d
    },
    O = B.View.extend(
    {
      initialize: function(a)
      {
        this.listenTo(this.parentView, "removeView", this.removeView)
      },
      className: "list se_decide commonFrame4 flexBox",
      events: function()
      {
        var b = {};
        b[a.cgti] = this.previewSet;
        return b
      },
      render: function()
      {
        this.$el.html(this.template(
        {
          model: this.model.toJSON()
        }));
        this.el.dataset.fsid = this.model.toJSON().formationSheetId;
        return this
      },
      previewSet: function(b)
      {
        b.preventDefault();
        if (!a.isScrolled())
        {
          a.removeClass(a.doc.querySelector(".list.select"), "select");
          a.addClass(this.el, "select");
          b = this.model.toJSON().formationSheetId;
          var c = h.clone(f.model.toJSON());
          c.formationSheetId = b;
          c.formationSheet = a.storage.userFormationSheetList.findWhere(
          {
            formationSheetId: b
          }).toJSON().formationSheet;
          var e = [];
          h.each(c.formationSheet, function(a, b)
          {
            -1 !== b.indexOf("placeSkillId") && e.push(b.split("placeSkillId")[1])
          });
          "dungeon" !== d && "dungeonInMap" !== d || Array.prototype.push.apply(e, ["10", "11"]);
          h.each(c, function(a, b)
          {
            -1 !== b.indexOf("questPosition") && (a = c.posArr.indexOf(String(a)), c[b] = Number(e[a]))
          });
          c.posArr = e;
          b = r.deckDataCreate(c);
          f.model.set(b);
          z(f.model.toJSON(), t)
        }
      },
      removeView: function()
      {
        this.off();
        this.remove()
      }
    }),
    P = B.View.extend(
    {
      className: "deckSelectInner",
      events: function()
      {
        var b = {};
        b[a.cgti + " .deckSelectDetail"] = this.deckSelect;
        return b
      },
      initialize: function(a)
      {
        this.listenTo(this.model, "change", this.render);
        this.listenTo(this.parentView, "removeView", this.removeView)
      },
      render: function()
      {
        h.each(this.model.toJSON(), function(b, c)
        {
          c = h.findWhere(a.storage.userCardListEx.toJSON(),
          {
            userCardId: b.questEpisodeUserCardId
          });
          b.userCardId1 && (b.leaderCardModel = c || null)
        });
        this.$el.html(this.template(
        {
          model: this.model.toJSON(),
          img: a.imgData
        }));
        return this
      },
      deckSelect: function(b)
      {
        b.preventDefault();
        a.isScrolled() || (f.copyMode ? (this.deckCopyRun(b.currentTarget.dataset.decktype), f.copyMode = !1) : this.deckViewCreate(b.currentTarget.dataset.decktype))
      },
      deckViewCreate: function(b)
      {
        b = Number(b);
        var c = {
          deckType: b,
          formationSheetId: 111,
          formationSheet: h.findWhere(p.userFormationSheetList,
          {
            formationSheetId: 111
          }).formationSheet,
          name: "チーム" + String(b).slice(-1),
          switchNpcEventId: null,
          switchNpcFlag1: null,
          switchNpcFlag2: null,
          switchNpcFlag3: null,
          switchNpcFlag4: null,
          switchNpcFlag5: null,
          switchNpcFlag6: null,
          switchNpcFlag7: null,
          switchNpcFlag8: null,
          switchNpcFlag9: null,
          switchNpcFlag10: null,
          rentalPieceSetId1: null,
          rentalPieceSetId2: null,
          rentalPieceSetId3: null,
          rentalPieceSetId4: null,
          rentalPieceSetId5: null,
          rentalPieceSetId6: null,
          rentalPieceSetId7: null,
          rentalPieceSetId8: null,
          rentalPieceSetId9: null,
          rentalPieceSetId10: null
        };
        d && "quest" !== d || (c.questPositionHelper = 3);
        b = a.storage.userDeckList.findWhere(
        {
          deckType: b
        }) ? a.storage.userDeckList.findWhere(
        {
          deckType: b
        }).toJSON() : c;
        t = b = r.deckDataCreate(b);
        y = t.deckType;
        f.model.clear(
        {
          silent: !0
        });
        f.model.set(b);
        f.bonusTextUpdate();
        z(f.model.toJSON(), t);
        n.getBaseData(a.getNativeObj());
        setTimeout(function()
        {
          a.removeClass(a.doc.querySelector("#DeckFormation"), "deckChange");
          a.removeClass(a.doc.querySelector("#deckFooter .default"), "noneDisp");
          a.removeClass(a.doc.querySelector("#globalBackBtn"), "noneDisp");
          H() && a.removeClass(a.doc.querySelector("#menu"), "noneDisp")
        }, 0)
      },
      deckCopyRun: function(b)
      {
        b = Number(b);
        var c = {
          deckType: y,
          formationSheetId: 111,
          formationSheet: h.findWhere(p.userFormationSheetList,
          {
            formationSheetId: 111
          }).formationSheet,
          name: "チーム" + String(y).slice(-1),
          switchNpcEventId: null,
          switchNpcFlag1: null,
          switchNpcFlag2: null,
          switchNpcFlag3: null,
          switchNpcFlag4: null,
          switchNpcFlag5: null,
          switchNpcFlag6: null,
          switchNpcFlag7: null,
          switchNpcFlag8: null,
          switchNpcFlag9: null,
          switchNpcFlag10: null,
          rentalPieceSetId1: null,
          rentalPieceSetId2: null,
          rentalPieceSetId3: null,
          rentalPieceSetId4: null,
          rentalPieceSetId5: null,
          rentalPieceSetId6: null,
          rentalPieceSetId7: null,
          rentalPieceSetId8: null,
          rentalPieceSetId9: null,
          rentalPieceSetId10: null
        };
        d && "quest" !== d || (c.questPositionHelper = 3);
        var e = a.storage.userDeckList.findWhere(
        {
          deckType: b
        }) ? a.storage.userDeckList.findWhere(
        {
          deckType: b
        }).toJSON() : c;
        b = r.deckDataCreate(e);
        b.deckType = y;
        b.name = t.name;
        f.model.clear(
        {
          silent: !0
        });
        f.model.set(b);
        f.bonusTextUpdate();
        z(f.model.toJSON(), t);
        n.getBaseData(a.getNativeObj());
        setTimeout(function()
        {
          new a.PopupClass(
          {
            title: "編成コピー確認",
            content: "<span class='c_pink'>" + e.name + "</span>を<span class='c_pink'>" + t.name + "</span>へコピーしました。<br><br><span class='c_red'>決定ボタンをタップすることで確定されます。</span>",
            closeBtnText: "OK",
            popupType: "typeC"
          });
          a.removeClass(a.doc.querySelector("#DeckFormation"), "deckCopy");
          a.removeClass(a.doc.querySelector("#deckFooter .default"), "noneDisp");
          a.removeClass(a.doc.querySelector("#globalBackBtn"), "noneDisp");
          H() && a.removeClass(a.doc.querySelector("#menu"), "noneDisp")
        }, 0)
      },
      removeView: function()
      {
        this.off();
        this.remove()
      }
    }),
    N = B.View.extend(
    {
      className: function()
      {
        var b = "deckViewWrap";
        return b = a.holdDeck && a.holdDeck.deckType == y ? b + " memoriaEquipMode charaStatusMode" : b + " charaStatusMode"
      },
      initialize: function(b)
      {
        this.selectPos = this.selectModel = null;
        b = a.holdDeck && a.holdDeck.deckType == y ? a.holdDeck : this.model.toJSON();
        b = r.deckDataCreate(b);
        this.model.clear(
        {
          silent: !0
        });
        this.model.set(b);
        this.listenTo(this.model, "change", this.changeRender);
        this.listenTo(this.parentView, "removeView", this.removeView)
      },
      events: function()
      {
        var b = {};
        b[a.cgti + " .deckParts"] = this.deckSet;
        b[a.cgti + " .epSetBtn"] = this.leaderSet;
        b[a.cgti + " .eventEffectBtn"] = this.eventEffectBtn;
        b[a.cgti + " .deckName"] = this.nameChange;
        b[a.cgti + " .deckChangeArrow"] = this.deckChange;
        b[a.cgti + " .deckChangeModeBtn"] = this.deckChangeMode;
        b[a.cgti + " #autoFormationPopBtn"] = this.autoFormationPop;
        b[a.cgti + " .memoriaWrap span"] = this.pieceEquip;
        b[a.cgti + " .memoriaWrap .memoriaSetEquipBtn"] = this.memoriaSetEquipLink;
        b[a.cgti + " .memoriaWrap .rentalLiftBtn"] = this.rentalLiftBtn;
        b["touchstart .tapArea"] = this.popupTimeStart;
        b["touchstart .memoriaSkillWrap"] = this.popupTimeStart;
        b["touchstart .memoriaWrap .equiped"] = this.memoriaPopupTimeStart;
        return b
      },
      render: function()
      {
        this.$el.html(this.template(
        {
          model: this.model.toJSON(),
          deckCatType: d,
          img: a.imgData
        }));
        return this
      },
      changeRender: function()
      {
        this.render();
        return this
      },
      deckSet: function(b, c)
      {
        if (!a.doc.querySelector(".deckViewWrap").classList.contains("memoriaEquipMode") && "exterminationCopy" !== d && "secondPartLastCopy" !== d && !a.detailView)
        {
          var e = null;
          if (b)
          {
            b.preventDefault();
            if (a.isScrolled()) return;
            e = b.currentTarget.dataset.posindex;
            n.startSe(1002)
          }
          var l = {
            1: "ALL",
            2: "FIRE",
            3: "WATER",
            4: "TIMBER",
            5: "LIGHT",
            6: "DARK"
          };
          C.popupTimerStop();
          var g = h.clone(this.model.toJSON()),
            k = h.clone(g.userCardObj),
            f = h.clone(g.userPieceObj),
            q = e ? k["place" + e] : h.clone(c.model.toJSON());
          if (this.selectModel || this.selectPos)
          {
            if (e) k["place" + e] = this.selectModel, k["place" + this.selectPos] = q || null, c = b = null, f["place" + e] && (b = h.clone(f["place" + e])), f["place" + this.selectPos] && (c = h.clone(f["place" + this.selectPos])), c ? f["place" + e] = c : delete f["place" + e], b ? f["place" + this.selectPos] = b : delete f["place" + this.selectPos];
            else if (this.selectModel && q.userCardId == this.selectModel.userCardId)
            {
              k["place" + this.selectPos] = null;
              var m = a.removeUserCardIdArr.indexOf(q.userCardId); - 1 < m && a.removeUserCardIdArr.splice(m, 1)
            }
            else
            {
              var w = null;
              h.each(k, function(a, b)
              {
                var c = !1;
                a && a.userCardId == q.userCardId && (c = !0);
                c && (k[b] = null, w = b)
              });
              k["place" + this.selectPos] = q;
              0 > a.removeUserCardIdArr.indexOf(q.userCardId) && c.el.classList.contains("exterminationSet") && a.removeUserCardIdArr.push(q.userCardId);
              this.selectModel && -1 < a.removeUserCardIdArr.indexOf(this.selectModel.userCardId) && (m = a.removeUserCardIdArr.indexOf(this.selectModel.userCardId), -1 < m && a.removeUserCardIdArr.splice(m, 1));
              e = null;
              f[w] && (e = h.clone(f[w]));
              e && (f["place" + this.selectPos] = e)
            }
            for (e = 0; 10 > e;) delete g["userCardId" + (e + 1)], delete g["questPositionId" + (e + 1)], e = e + 1 | 0;
            for (e = 0; 10 > e;)
            {
              var I = "userPieceId" + ("00" + (e + 1)).slice(-2);
              for (b = 0; 4 > b;) delete g[I + (b + 1)], b = b + 1 | 0;
              e = e + 1 | 0
            }
            e = [];
            for (I in k) e.push(I);
            e.sort(function(a, b)
            {
              return Number(a.split("place")[1]) < Number(b.split("place")[1]) ? -1 : Number(a.split("place")[1]) > Number(b.split("place")[1]) ? 1 : 0
            });
            m = 1;
            h.each(e, function(a, b)
            {
              b = a.split("place")[1];
              if (k[a] && k[a].support && 20 !== g.deckType) g.questPositionHelper = Number(b);
              else if (k[a] && !k[a].supportFlag)
              {
                var c = "questPositionId" + m,
                  e = "userCardId" + m,
                  d = "userPieceId" + ("00" + m).slice(-2);
                g[c] = Number(b);
                g[e] = k[a].userCardId;
                h.each(f[a], function(a, b)
                {
                  a && a.id && (g[d + (b + 1)] = a.id)
                });
                m++
              }
            });
            g.userCardObj = k;
            g.userPieceObj = f;
            20 !== g.deckType && (g = Q(g));
            g = r.deckDataCreate(g);
            this.model.clear(
            {
              silent: !0
            });
            this.model.set(g);
            z(this.model.toJSON(), t);
            n.getBaseData(a.getNativeObj());
            this.selectModel = this.selectPos = null;
            a.removeClass(a.doc.querySelector(".deckParts.select"), "select");
            "support" === d ? (a.doc.querySelector("#charaListWrap").className = "", a.removeClass(a.doc.querySelector(".deckPartsWrap"), "tapBlock")) : a.removeClass(a.doc.querySelector("#charaListWrap"), "open")
          }
          else
          {
            if (a.tutorialId) a.tutorialUtil[a.tutorialId]("set");
            a.removeClass(a.doc.querySelector(".deckParts.select"), "select");
            a.removeClass(a.doc.querySelector("#charaListWrap"), "open");
            this.selectPos = e;
            this.selectModel = h.clone(q);
            a.addClass(b.currentTarget, "select");
            if (this.selectModel && !this.selectModel.support || !this.selectModel) u.charaListView.cardSort.multiSort(), ga(), 20 == this.model.toJSON().deckType && (a.addClass(a.doc.querySelector("#charaListWrap"), l[e]), a.addClass(a.doc.querySelector(".deckPartsWrap"), "tapBlock")), a.addClass(a.doc.querySelector("#charaListWrap"), "open"), a.scrollRefresh(null, null, !0, null)
          }
        }
      },
      leaderSet: function(b)
      {
        b.preventDefault();
        if (!a.isScrolled() && (b.stopPropagation(), C.popupTimerStop(), J.popupTimerStop(), "exterminationCopy" !== d && "secondPartLastCopy" !== d && (b = b.currentTarget, !b.classList.contains("on"))))
        {
          n.startSe(1008);
          var c = h.clone(this.model.toJSON());
          c.questEpisodeUserCardId = c.userCardObj["place" + Number(b.parentNode.dataset.posindex)].userCardId;
          c = Q(c);
          c = r.deckDataCreate(c);
          this.model.set(c);
          z(this.model.toJSON(), t);
          n.getBaseData(a.getNativeObj());
          this.selectModel = this.selectPos = null;
          a.removeClass(a.doc.querySelector(".deckParts.select"), "select");
          a.removeClass(a.doc.querySelector("#charaListWrap"), "open")
        }
      },
      eventEffectBtn: function(b)
      {
        b.preventDefault();
        if (!a.isScrolled() && (b.stopPropagation(), C.popupTimerStop(), J.popupTimerStop(), "exterminationCopy" !== d && "secondPartLastCopy" !== d))
        {
          b = b.currentTarget;
          var c = h.clone(this.model.toJSON()),
            e = Number(b.parentNode.dataset.posindex);
          a.switchNpcValidList["set_" + b.parentNode.dataset.charaid] || (a.switchNpcValidList["set_" + b.parentNode.dataset.charaid] = !0);
          b.classList.contains("on") ? (n.startSe(1003), c.userCardObj["place" + e].switchCharaFlag = !1, c["switchNpcFlag" + c.userCardObj["place" + e].switchNpcPos] = !1, a.switchNpcValidList[b.parentNode.dataset.charaid] = !1) : (n.startSe(1008), c.userCardObj["place" + e].switchCharaFlag = !0, c["switchNpcFlag" + c.userCardObj["place" + e].switchNpcPos] = !0, a.switchNpcValidList[b.parentNode.dataset.charaid] = !0);
          this.model.set(c);
          this.changeRender();
          z(this.model.toJSON(), t);
          n.getBaseData(a.getNativeObj());
          this.selectModel = this.selectPos = null;
          a.removeClass(a.doc.querySelector(".deckParts.select"), "select");
          a.removeClass(a.doc.querySelector("#charaListWrap"), "open")
        }
      },
      nameChange: function(b)
      {
        b.preventDefault();
        if (!a.isScrolled() && "exterminationCopy" !== d && "secondPartLastCopy" !== d && !a.doc.querySelector(".deckParts.select"))
        {
          var c = this;
          b = $("#DeckNameChangeTemp").text();
          var e = f.model.toJSON();
          e.popupType = "typeC";
          var l = new a.PopupClass(e, b, function()
          {
            a.nativeKeyBoard("commentInput", 10, null, "textCount");
            a.doc.getElementById("commentDecide").addEventListener(a.cgti, function(b)
            {
              b.preventDefault();
              a.isScrolled() || (a.tapBlock(!0), c.model.set(
              {
                name: a.doc.getElementById("commentInput").value
              }), z(c.model.toJSON(), t), n.getBaseData(a.getNativeObj()), l.remove(), a.tapBlock(!1))
            })
          })
        }
      },
      deckChange: function(b)
      {
        b.preventDefault();
        if (!a.isScrolled() && !a.doc.querySelector(".deckViewWrap").classList.contains("deckChangeBg"))
        {
          a.firstLoad = 0;
          this.selectModel = this.selectPos = null;
          a.removeClass(a.doc.querySelector(".deckParts.select"), "select");
          a.removeClass(a.doc.querySelector("#charaListWrap"), "open");
          var c = t.deckType;
          b = b.currentTarget.classList.contains("arrowR") ? 1 : -1;
          var c = c + b,
            e = {
              quest: "1",
              dungeon: "4",
              group: "5",
              groupPrepare: "5",
              endless: "6",
              extermination: "7",
              secondPartLast: "10",
              puellaHistoriaGroupRaid: String(da.getDeckType(
              {}) / 10),
              scene0Challenge: String(ea.getDeckType() / 10),
              accomplish: "8",
              exterminationCopy: "1",
              secondPartLastCopy: "1"
            };
          b = "group" === d || "groupPrepare" === d ? Number(e[d || "quest"] + "4") : "endless" === d ? Number(e[d || "quest"] + "3") : "accomplish" === d || "puellaHistoriaGroupRaid" === d || "scene0Challenge" === d ? Number(e[d || "quest"] + "5") : Number(e[d || "quest"] + "9");
          e = Number(e[d || "quest"] + "1");
          c = c > b ? e : c;
          c = c < e ? b : c;
          b = {
            deckType: c,
            formationSheetId: 111,
            formationSheet: h.findWhere(p.userFormationSheetList,
            {
              formationSheetId: 111
            }).formationSheet,
            name: "チーム" + String(c).slice(-1),
            switchNpcEventId: null,
            switchNpcFlag1: null,
            switchNpcFlag2: null,
            switchNpcFlag3: null,
            switchNpcFlag4: null,
            switchNpcFlag5: null,
            switchNpcFlag6: null,
            switchNpcFlag7: null,
            switchNpcFlag8: null,
            switchNpcFlag9: null,
            switchNpcFlag10: null,
            rentalPieceSetId1: null,
            rentalPieceSetId2: null,
            rentalPieceSetId3: null,
            rentalPieceSetId4: null,
            rentalPieceSetId5: null,
            rentalPieceSetId6: null,
            rentalPieceSetId7: null,
            rentalPieceSetId8: null,
            rentalPieceSetId9: null,
            rentalPieceSetId10: null
          };
          a.questBattleModel && a.switchNpcList && a.switchNpcCompar && (b.switchNpcEventId = a.switchNpcCompar.eventId);
          d && "quest" !== d || (b.questPositionHelper = 3);
          b = a.storage.userDeckList.findWhere(
          {
            deckType: c
          }) ? a.storage.userDeckList.findWhere(
          {
            deckType: c
          }).toJSON() : b;
          t = b = r.deckDataCreate(b);
          y = c;
          this.model.clear(
          {
            silent: !0
          });
          this.model.set(b);
          "group" === d && this.parentView.deckMpCalculate();
          a.switchNpcCompar.saveParty && (a.switchNpcCompar.savePButOtherPBattle = !0);
          f.bonusTextUpdate();
          a.removeClass(a.doc.querySelector(".deckViewWrap"), "memoriaEquipMode");
          a.removeClass(a.doc.querySelector("#pieceEquipBtn"), "on");
          n.getBaseData(a.getNativeObj())
        }
      },
      deckChangeMode: function(b)
      {
        b.preventDefault();
        a.isScrolled() || a.doc.querySelector(".deckViewWrap").classList.contains("deckChangeBg") || (this.selectModel = this.selectPos = null, a.removeClass(a.doc.querySelector(".deckParts.select"), "select"), a.removeClass(a.doc.querySelector("#charaListWrap"), "open"), setTimeout(function()
        {
          a.addClass(a.doc.querySelector("#DeckFormation"), "deckChange");
          a.addClass(a.doc.querySelector("#deckFooter .default"), "noneDisp");
          a.addClass(a.doc.querySelector("#globalBackBtn"), "noneDisp");
          a.addClass(a.doc.querySelector("#menu"), "noneDisp")
        }, 0))
      },
      deckCopyMode: function(b)
      {
        this.copyMode = !0;
        this.selectModel = this.selectPos = null;
        a.removeClass(a.doc.querySelector(".deckParts.select"), "select");
        a.removeClass(a.doc.querySelector("#charaListWrap"), "open");
        (b = a.doc.getElementById("deckSelectWrap").getElementsByClassName("currentDeck")[0]) && a.removeClass(b, "currentDeck");
        b = a.doc.getElementById("deckSelectWrap").getElementsByClassName("deck" + t.deckType)[0];
        a.addClass(b, "currentDeck");
        setTimeout(function()
        {
          a.addClass(a.doc.querySelector("#DeckFormation"), "deckCopy");
          a.addClass(a.doc.querySelector("#deckFooter .default"), "noneDisp");
          a.addClass(a.doc.querySelector("#globalBackBtn"), "noneDisp");
          a.addClass(a.doc.querySelector("#menu"), "noneDisp")
        }, 0)
      },
      autoFormationPop: function(b)
      {
        b.preventDefault();
        if (!a.isScrolled())
        {
          var c = function()
            {
              switch (d)
              {
                case "support":
                  return 6;
                case "arena":
                case "arenaRankMatchAttack":
                case "arenaRankMatchDefence":
                case "group":
                case "groupPrepare":
                case "accomplish":
                case "endless":
                case "puellaHistoriaGroupRaid":
                case "scene0Challenge":
                  return 5;
                case "dungeon":
                  return 7;
                default:
                  return 4
              }
            },
            e = {
              FIRE: !1,
              WATER: !1,
              TIMBER: !1,
              LIGHT: !1,
              DARK: !1,
              VOID: !1
            },
            l = ["ABILITY", "SKILL", "ABILITY", "SKILL"],
            g = [];
          b = "group" === d || "groupPrepare" === d ? $("#autoFormationGroupTemp").text() : "support" !== d ? $("#autoFormationTemp").text() : $("#autoFormationSupportTemp").text();
          new a.PopupClass(
          {
            exClass: "autoFormationPop"
          }, b, function()
          {
            $("#autoFilterAtt").on(a.cgti, function(b)
            {
              b.preventDefault();
              if (!a.isScrolled() && !b.currentTarget.classList.contains("on"))
              {
                a.addClass(b.currentTarget, "on");
                b = a.doc.getElementById("autoFormationAttWrap").getElementsByClassName("attribute");
                for (var c = 0; c < b.length; c++) a.removeClass(b[c], "on")
              }
            });
            $("#autoFormationAttWrap .attribute").on(a.cgti, function(b)
            {
              b.preventDefault();
              a.isScrolled() || (b.currentTarget.classList.contains("on") ? a.removeClass(b.currentTarget, "on") : (a.removeClass(a.doc.getElementsByClassName("filterAtt")[0], "on"), a.addClass(b.currentTarget, "on")))
            });
            $("#autoFormationTypeWrap .type").on(a.cgti, function(b)
            {
              b.preventDefault();
              a.isScrolled() || (a.removeClass(a.doc.querySelector("#autoFormationTypeWrap .on"), "on"), a.addClass(b.currentTarget, "on"))
            });
            $("#autoFormationStatusWrap .status").on(a.cgti, function(b)
            {
              b.preventDefault();
              a.isScrolled() || (a.removeClass(a.doc.querySelector("#autoFormationStatusWrap .on"), "on"), a.addClass(b.currentTarget, "on"))
            });
            $("#autoFormationBtn").on(a.cgti, function(b)
            {
              b.preventDefault();
              if (!a.isScrolled())
              {
                "group" != d && "groupPrepare" != d || L.regularEventGroupBattle.recommendCharaAttributes.split(",");
                if ("support" !== d && "group" !== d && "groupPrepare" !== d)
                {
                  var k = 0;
                  a.doc.getElementById("autoFilterAtt").classList.contains("on") ? (e = {
                    FIRE: !0,
                    WATER: !0,
                    TIMBER: !0,
                    LIGHT: !0,
                    DARK: !0,
                    VOID: !0
                  }, k = 6) : (b = a.doc.querySelectorAll(".autoFormationPop .attribute.on"), h.each(b, function(a)
                  {
                    e[a.dataset.typeFilter] = !0;
                    k++
                  }));
                  if (0 === k)
                  {
                    new a.PopupClass(
                    {
                      title: "お任せ編成",
                      content: "属性は最低１種類選ぶ必要があります。",
                      closeBtnText: "OK",
                      popupType: "typeC"
                    });
                    return
                  }
                }
                else e = {
                  FIRE: !0,
                  WATER: !0,
                  TIMBER: !0,
                  LIGHT: !0,
                  DARK: !0,
                  VOID: !0
                };
                var q, m = h.filter(a.storage.userCardListEx.toJSON(), function(a)
                {
                  switch (d)
                  {
                    case "accomplish":
                      q = 40 <= a.level && !a.isRetired;
                      break;
                    default:
                      q = !0
                  }
                  return e[a.chara.attributeId] && q
                });
                a.questBattleModel && a.switchNpcList && h.each(m, function(b)
                {
                  h.find(a.switchNpcList, function(a)
                  {
                    return a.userCharaList[0].charaId == b.chara.id
                  }) && (b.switchCharaFlag = !0)
                });
                if (("arenaRankMatchAttack" === d || "arenaRankMatchDefence" === d) && a.EventArenaRankMatchPrm && a.EventArenaRankMatchPrm.spPlusList)
                {
                  var w = a.EventArenaRankMatchPrm.spPlusList;
                  h.each(m, function(a, b, c)
                  {
                    h.each(w, function(c, e, d)
                    {
                      b == a.card.attributeId && h.each(c, function(b, d, g)
                      {
                        a[e] && (a[e] += c)
                      })
                    })
                  })
                }
                var I = a.doc.querySelector(".autoFormationPop .filterWrap .on").dataset.statusSort;
                m.sort(function(a, b)
                {
                  return !a.switchCharaFlag && b.switchCharaFlag ? 1 : a.switchCharaFlag && !b.switchCharaFlag ? -1 : a[I] < b[I] ? 1 : a[I] > b[I] ? -1 : 0
                });
                if ("support" == d)
                {
                  b = [];
                  var D = {
                    ALL: null,
                    FIRE: null,
                    WATER: null,
                    TIMBER: null,
                    LIGHT: null,
                    DARK: null
                  };
                  h.each(m, function(a, b)
                  {
                    b = a.chara.attributeId;
                    D.ALL ? "VOID" === b || D[b] || (D[b] = a) : D.ALL = a
                  });
                  b[0] = D.ALL;
                  b[1] = D.FIRE;
                  b[2] = D.WATER;
                  b[3] = D.TIMBER;
                  b[4] = D.LIGHT;
                  b[5] = D.DARK;
                  m = b
                }
                else if (0 === m.length)
                {
                  new a.PopupClass(
                  {
                    title: "お任せ編成",
                    content: "選んだ属性の魔法少女を所持していないため<br>編成することができません。",
                    closeBtnText: "OK",
                    popupType: "typeC"
                  });
                  return
                }
                m.length = c();
                var F = f.model.toJSON(),
                  p = {
                    deckType: F.deckType,
                    formationSheet: F.formationSheet,
                    formationSheetId: F.formationSheetId,
                    name: F.name,
                    userCardObj:
                    {},
                    switchNpcEventId: F.switchNpcEventId,
                    switchNpcFlag1: null,
                    switchNpcFlag2: null,
                    switchNpcFlag3: null,
                    switchNpcFlag4: null,
                    switchNpcFlag5: null,
                    switchNpcFlag6: null,
                    switchNpcFlag7: null,
                    switchNpcFlag8: null,
                    switchNpcFlag9: null,
                    switchNpcFlag10: null,
                    rentalPieceSetId1: null,
                    rentalPieceSetId2: null,
                    rentalPieceSetId3: null,
                    rentalPieceSetId4: null,
                    rentalPieceSetId5: null,
                    rentalPieceSetId6: null,
                    rentalPieceSetId7: null,
                    rentalPieceSetId8: null,
                    rentalPieceSetId9: null,
                    rentalPieceSetId10: null
                  };
                F.questPositionHelper && (p.questPositionHelper = F.questPositionHelper);
                b = a.storage.userPieceList.toJSON();
                var y = [],
                  A = [],
                  y = h.filter(b, function(a)
                  {
                    return "SKILL" === a.piece.pieceType
                  }),
                  A = h.filter(b, function(a)
                  {
                    return "ABILITY" === a.piece.pieceType
                  });
                y.sort(function(a, b)
                {
                  if (-1 == g.indexOf(String(a.pieceId)) && -1 < g.indexOf(String(b.pieceId))) return 1;
                  if (-1 < g.indexOf(String(a.pieceId)) && -1 == g.indexOf(String(b.pieceId))) return -1;
                  a = a.hp + a.defense;
                  b = b.hp + b.defense;
                  return a < b ? 1 : a > b ? -1 : 0
                });
                A.sort(function(a, b)
                {
                  if (-1 == g.indexOf(String(a.pieceId)) && -1 < g.indexOf(String(b.pieceId))) return 1;
                  if (-1 < g.indexOf(String(a.pieceId)) && -1 == g.indexOf(String(b.pieceId))) return -1;
                  a = a.hp + a.attack;
                  b = b.hp + b.attack;
                  return a < b ? 1 : a > b ? -1 : 0
                });
                var x = {
                    SKILL: y,
                    ABILITY: A
                  },
                  B = {},
                  H = {
                    SKILL: 0,
                    ABILITY: 0
                  },
                  C = 0,
                  v = 1;
                h.each(F.posArr, function(a, b)
                {
                  b = Number(a);
                  if (F.questPositionHelper !== b)
                  {
                    var c = "userCardId" + v,
                      e = "questPositionId" + v;
                    m[C] && (p.userCardObj["place" + a] = m[C], p[c] = m[C].userCardId, p[e] = b, v++);
                    C++
                  }
                });
                for (var G = v = 0; 4 > v;) h.each(p.userCardObj, function(a, b)
                {
                  if (a)
                    if (a.revision >= v)
                    {
                      if (x[l[v]][0])
                      {
                        var c = "userPieceId" + ("00" + (G + 1)).slice(-2) + (v + 1),
                          e = "userPieceId" + ("00" + (G + 1)).slice(-2) + (v - 1),
                          d = function(b)
                          {
                            if (x[l[v]][b])
                            {
                              var g = x[l[v]][b].pieceId,
                                f;
                              f = x[l[v]][b].piece;
                              f = f.charaIds ? -1 < f.charaIds.indexOf(a.charaId) ? !0 : !1 : !0;
                              !f || B[e] && B[e] === g ? d(b + 1 | 0) : (p[c] = x[l[v]][b].id + "", B[c] = x[l[v]][b].pieceId, x[l[v]].splice(b, 1), H[l[v]]++, G = G + 1 | 0)
                            }
                            else G = G + 1 | 0
                          };
                        d(0)
                      }
                    }
                  else G = G + 1 | 0
                }), v = v + 1 | 0, G = 0;
                20 !== p.deckType && (p = Q(p));
                p = r.deckDataCreate(p);
                z(p, t);
                f.model.clear(
                {
                  silent: !0
                });
                f.model.set(p);
                n.getBaseData(a.getNativeObj());
                if (a.tutorialId) a.tutorialUtil[a.tutorialId]("autoPop");
                "group" === d && u.deckMpCalculate();
                a.g_popup_instance.remove()
              }
            })
          })
        }
      },
      pieceEquip: function(b)
      {
        b.preventDefault();
        if (!(a.isScrolled() || (b.stopPropagation(), J.popupTimerStop(), a.detailPopup || b.currentTarget.parentNode.parentNode.classList.contains("boost") || b.currentTarget.parentNode.parentNode.classList.contains("support") && "quest" === d || this.model.attributes.userCardObj["place" + Number(b.currentTarget.parentNode.parentNode.dataset.posindex)] && this.model.attributes.userCardObj["place" + Number(b.currentTarget.parentNode.parentNode.dataset.posindex)].rentalFlag || !(b.currentTarget.classList.contains("canEquip") || b.currentTarget.classList.contains("equiped") || b.currentTarget.classList.contains("tapBlock")) || "dungeonInMap" === d || "exterminationCopy" === d || "secondPartLastCopy" === d)))
        {
          n.startSe(1002);
          var c = Number(b.currentTarget.parentNode.parentNode.dataset.posindex),
            e = Number(b.currentTarget.dataset.pieceindex),
            f = Number(b.currentTarget.parentNode.parentNode.dataset.charaid),
            g = b.currentTarget.parentNode.parentNode.dataset.charaname;
          b = b.currentTarget.parentNode.parentNode.dataset.charaatt;
          var k = this.model.toJSON().userPieceObj["place" + c] || [],
            p = 0 < k.length ? k[e - 1] : null,
            q = a.storage.userCardListEx.findWhere(
            {
              charaId: f
            }).toJSON().revision,
            m = {},
            w = this;
          h.each(this.model.toJSON().userPieceObj, function(a, b)
          {
            h.each(a, function(a, c)
            {
              a && a.id && (m[a.id] = {
                name: w.model.toJSON().userCardObj[b].chara.name,
                charaId: w.model.toJSON().userCardObj[b].card.miniCharaNo
              }, w.model.toJSON().userCardObj[b].chara.title && (m[a.id].name += " " + w.model.toJSON().userCardObj[b].chara.title))
            })
          });
          a.equipInfo = {
            charaName: g,
            charaId: f,
            charaAtt: b,
            posIndex: c,
            pieceIndex: e,
            pieceArr: k,
            pieceModel: p,
            allPiece: m,
            selectPieceId: p ? p.id : null,
            revision: q
          };
          a.holdDeck = this.model.toJSON();
          "arenaRankMatchAttack" === d && a.EventArenaRankMatchPrm && (a.EventArenaRankMatchPrm.isDeckEditCountDownContinue = !0);
          location.href = "#/MemoriaEquip"
        }
      },
      memoriaSetEquipLink: function(b)
      {
        b.preventDefault();
        if (!a.isScrolled())
        {
          var c = Number(b.currentTarget.parentNode.parentNode.dataset.posindex),
            e = Number(b.currentTarget.parentNode.parentNode.dataset.charaid),
            f = b.currentTarget.parentNode.parentNode.dataset.charaname;
          b = b.currentTarget.parentNode.parentNode.dataset.charaatt;
          var g = this.model.toJSON().userPieceObj["place" + c] || [],
            k = a.storage.userCardListEx.findWhere(
            {
              charaId: e
            }).toJSON().revision,
            n = {},
            q = this;
          h.each(this.model.toJSON().userPieceObj, function(a, b)
          {
            h.each(a, function(a, c)
            {
              a && a.id && (n[a.id] = {
                name: q.model.toJSON().userCardObj[b].chara.name,
                charaId: q.model.toJSON().userCardObj[b].card.miniCharaNo
              }, q.model.toJSON().userCardObj[b].chara.title && (n[a.id].name += " " + q.model.toJSON().userCardObj[b].chara.title))
            })
          });
          a.equipInfo = {
            charaName: f,
            charaId: e,
            charaAtt: b,
            posIndex: c,
            pieceIndex: 0,
            pieceArr: g,
            pieceModel: null,
            allPiece: n,
            selectPieceId: null,
            revision: k
          };
          a.holdDeck = this.model.toJSON();
          "arenaRankMatchAttack" === d && a.EventArenaRankMatchPrm && (a.EventArenaRankMatchPrm.isDeckEditCountDownContinue = !0);
          location.href = "#/MemoriaSetEquip"
        }
      },
      rentalLiftBtn: function(b)
      {
        b.preventDefault();
        if (!a.isScrolled())
        {
          var c = this.model.toJSON();
          b = Number(b.currentTarget.parentNode.parentNode.dataset.posindex);
          var e = c.userCardObj["place" + b].id,
            d = null,
            g = null;
          a.rentalPieceData[e] = null;
          a.rentalSetFlag = !0;
          for (var k = 1; 6 > k; k++) c["userCardId" + k] == e && (d = c["userCardId" + k], c.userCardObj["place" + b].rentalFlag = !1, g = k);
          d && (c["rentalPieceSetId" + g] = null, c = r.deckDataCreate(c), f.model.clear(
          {
            silent: !0
          }), f.model.set(c), z(f.model.toJSON(), t));
          n.getBaseData(a.getNativeObj())
        }
      },
      popupTimeStart: function(b)
      {
        var c = this.model.toJSON(),
          e = c.userCardObj["place" + b.currentTarget.parentNode.dataset.posindex];
        e && e.rentalMemoriaModel && e.rentalFlag && e.rentalMemoriaUse && (e = e.rentalMemoriaModel);
        if (!(b.currentTarget.parentNode.classList.contains("boost") || a.tutorialId || e && !e.rentalMemoriaUse && e && e.isNpc) && e && e.card)
        {
          var f = this;
          b.currentTarget.classList.contains("memoriaSkillWrap") && (e.initTabType = "memoria");
          a.holdDeck && (e.linkBlock = !0);
          e.deckFormationFlag = !0;
          C.cardDetailPopup(b, e, function()
          {
            if (a.storage.userCardListEx)
            {
              var b = r.deckDataCreate(c);
              f.model.clear(
              {
                silent: !0
              });
              f.model.set(b);
              "group" === d && u.deckMpCalculate();
              n.getBaseData(a.getNativeObj())
            }
            f.selectModel = null;
            f.selectPos = null;
            a.doc.querySelector("#charaListWrap").className = ""
          })
        }
      },
      memoriaPopupTimeStart: function(b)
      {
        var c = this.model.toJSON(),
          e = b.currentTarget.parentNode.parentNode.classList.contains("boost"),
          f = b.currentTarget.parentNode.parentNode.dataset.posindex,
          g = b.currentTarget.dataset.pieceindex,
          k = null;
        c.userCardObj["place" + f].rentalFlag && (k = c.userCardObj["place" + f].rentalFlag);
        e = e ? c.userCardObj["place" + f].switchCharaModel["equipPiece" + g] : k ? c.userCardObj["place" + f].rentalMemoriaModel["equipPiece" + g] : c.userPieceObj["place" + f][g - 1];
        !a.tutorialId && e && (c.userCardObj["place" + f].supportFlag && "support" !== d ? (e.supportFlag = !0, e.btnHide = !0) : (c = (c = a.storage.userPieceList.findWhere(
        {
          id: e.id
        })) ? c.toJSON() : null, e.protect = c ? c.protect : e.protect), J.cardDetailPopup(b, e))
      },
      bonusTextUpdate: function()
      {
        a.doc.querySelector("#bonusTextWrap").innerHTML = "";
        var b = this.model.toJSON(),
          c = {};
        h.each(b.userCardObj, function(a, b)
        {
          a = a.switchCharaFlag ? a.switchCharaModel : a;
          a.eventEffect && h.each(a.eventEffect, function(a, b)
          {
            b in c || (c[b] = 0);
            c[b] += a | 0
          })
        });
        var e = {
            DROPADD: "個数"
          },
          d = {
            DROPADD: "＋"
          },
          f = {
            DROPADD: "個"
          };
        0 !== Object.keys(c).length ? h.each(c, function(b, c)
        {
          var g = c.split("_"),
            k = g[0];
          g.shift();
          g = g.join("_").toLowerCase();
          if (!a.doc.querySelector("." + c))
          {
            var h = document.createElement("span"),
              l = document.createElement("span"),
              n = document.createElement("span"),
              p = document.createElement("span");
            h.className = "bonusText " + c;
            l.className = "bonusIcon";
            l.style.cssText = "background:url('/magica/resource/image_web/common/icon/event/icon_" + g + "_f.png') left top no-repeat; background-size:26px 26px;";
            n.className = "iconText ts_gold";
            n.textContent = e[k];
            p.className = "text ts_pink02";
            h.appendChild(l);
            h.appendChild(n);
            h.appendChild(p);
            a.doc.querySelector("#bonusTextWrap").appendChild(h)
          }
          b /= 1E3;
          a.doc.querySelector("." + c + " .text").textContent = d[k] + b + f[k]
        }) : a.doc.querySelector("#bonusTextWrap").innerHTML = ""
      },
      removeView: function()
      {
        this.off();
        this.remove()
      }
    }),
    ga = function()
    {
      var b = !0;
      "dungeonInMap" === d ? (b = !1, a.addClass(a.doc.querySelector("#charaListWrap"), "dungeonInMap")) : "group" === d || "groupPrepare" === d ? a.addClass(a.doc.querySelector("#charaListWrap"), "groupWrap") : "extermination" === d || "secondPartLast" === d ? a.addClass(a.doc.querySelector("#charaListWrap"), "exterminationWrap") : "accomplish" === d && S();
      a.removeClass(a.doc.querySelector("#charaListElms .select"), "select");
      a.removeClass(a.doc.querySelector("#charaListElms .formationRemove"), "formationRemove");
      h.each([].slice.call(a.doc.querySelectorAll("#charaListElms .formationCurrent")), function(b)
      {
        a.removeClass(b, "exterminationSet");
        a.removeClass(b, "formationCurrent");
        a.removeClass(b, "conquered")
      });
      h.each(f.model.toJSON().userCardObj, function(c, e)
      {
        c.card && (f.selectModel && f.selectModel.userCardId == c.userCardId ? (b ? a.addClass(a.doc.querySelector(".userCardId" + f.selectModel.userCardId), "formationRemove") : a.addClass(a.doc.querySelector(".userCardId" + c.userCardId), "formationCurrent"), a.addClass(a.doc.querySelector(".userCardId" + f.selectModel.userCardId), "select")) : a.addClass(a.doc.querySelector(".userCardId" + c.userCardId), "formationCurrent"))
      });
      if ("extermination" === d || "secondPartLast" === d)
      {
        var c = 70,
          e = a.userRegularEventExterminationDifficulty;
        "secondPartLast" === d && (c = 100, e = a.secondPartLastInfo.battleInfo);
        for (var l = 1; 5 >= l;)
        {
          var g = c + l;
          if (g !== f.model.get("deckType") && (g = h.findWhere(a.storage.userDeckList.toJSON(),
            {
              deckType: g
            })))
            for (var k = 1; 9 >= k;)
            {
              if (g["userCardId" + k])
              {
                var n = a.doc.querySelector(".userCardId" + g["userCardId" + k]);
                a.addClass(n, "exterminationSet");
                "CONQUERED" === e["battle" + l + "Status"] && a.addClass(n, "conquered")
              }
              k = k + 1 | 0
            }
          l = l + 1 | 0
        }
      }
    },
    S = function()
    {
      a.storage.userCardListEx.each(function(b)
      {
        var c = h.clone(b.toJSON()),
          e = a.doc.querySelector(".userCardId" + c.userCardId);
        if (e)
        {
          var f = e.querySelector(".gauge");
          f ? (b.clear(
          {
            silent: !0
          }), b.set(c,
          {
            silent: !0
          })) : (f = a.doc.createElement("span"), f.className = "gauge", e.appendChild(f));
          b = h.template($("#gaugeTemp").text());
          $(f).html(b(
          {
            model: c,
            deckCatType: d
          }));
          c.isRetired ? a.addClass(e, "death") : a.removeClass(e, "death")
        }
      })
    },
    Q = function(a)
    {
      var b = h.clone(a),
        e = !1;
      h.each(b.userCardObj, function(a, c)
      {
        c = Number(c.split("place")[1]);
        a && a.userCardId && a.userCardId == b.questEpisodeUserCardId && 9 >= c && (e = !0)
      });
      if (!e)
      {
        var d = null;
        h.each(b.userCardObj, function(a, b)
        {
          b = Number(b.split("place")[1]);
          !d && a && a.card && !a.supportFlag && 9 >= b && (d = a.userCardId)
        });
        b.questEpisodeUserCardId = d ? d : void 0
      }
      return b
    },
    z = function(b, c)
    {
      var e = !1;
      h.each(b, function(a, d)
      {
        if ("formationSheetId" == d || "name" == d || "questEpisodeUserCardId" == d || "questPositionHelper" == d || -1 !== d.indexOf("rentalPieceSetId") || -1 !== d.indexOf("switchNpcFlag") || -1 !== d.indexOf("questPositionId") || -1 !== d.indexOf("userCardId") || -1 !== d.indexOf("userPieceId")) e = b[d] !== c[d] ? !0 : e
      });
      h.each(c, function(a, d)
      {
        if ("formationSheetId" == d || "name" == d || "questEpisodeUserCardId" == d || "questPositionHelper" == d || -1 !== d.indexOf("rentalPieceSetId") || -1 !== d.indexOf("switchNpcFlag") || -1 !== d.indexOf("questPositionId") || -1 !== d.indexOf("userCardId") || -1 !== d.indexOf("userPieceId")) e = b[d] !== c[d] ? !0 : e
      });
      f.bonusTextUpdate();
      if (e)
      {
        a.addClass(a.doc.querySelector(".deckViewWrap"), "deckChangeBg");
        a.doc.querySelector("#sideMenu").className = "anim" == a.doc.querySelector("#sideMenu").className ? "close" : "";
        a.androidKeyStop = !0;
        a.holdDeck = b;
        setTimeout(function()
        {
          a.addBackHandler(a.pageObj.deckChangeConf)
        }, 0);
        if ("quest" === d || "group" === d || "accomplish" === d || "dungeon" === d || "dungeonInMap" === d || "endless" === d || "arenaRankMatchAttack" === d || "puellaHistoriaGroupRaid" === d || "scene0Challenge" === d) a.addClass(a.doc.querySelector("#nextPageBtn"), "noneDisp"), a.addClass(a.doc.querySelector("#nextPageBtnLoop"), "noneDisp"), a.removeClass(a.doc.querySelector("#mainBtn"), "noneDisp");
        a.removeClass(a.doc.querySelector("#mainBtn"), "off");
        "group" === d && u.deckMpCalculate()
      }
      else
      {
        a.removeClass(a.doc.querySelector(".deckViewWrap"), "deckChangeBg");
        a.removeBackHandler();
        a.androidKeyStop = !1;
        a.holdDeck = null;
        if ("quest" === d || "group" === d || "accomplish" === d || "dungeon" === d || "dungeonInMap" === d || "endless" === d || "arenaRankMatchAttack" === d || "puellaHistoriaGroupRaid" === d || "scene0Challenge" === d) a.removeClass(a.doc.querySelector("#nextPageBtn"), "noneDisp"), a.removeClass(a.doc.querySelector("#nextPageBtnLoop"), "noneDisp"), a.addClass(a.doc.querySelector("#mainBtn"), "noneDisp");
        a.addClass(a.doc.querySelector("#mainBtn"), "off");
        u && "group" === d && u.deckMpCalculate()
      }
      f.selectModel = null;
      f.selectPos = null;
      a.removeClass(a.doc.querySelector("#charaListWrap"), "open");
      return e
    },
    r, ha = function()
    {
      a.switchNpcCompar = {};
      a.switchNpcCompar.eventId = a.questBattleModel && a.questBattleModel.questBattle.eventId ? a.questBattleModel.questBattle.eventId : null;
      V.createCardList();
      p = A.getPageJson();
      p.rentalPieceSetList && 0 < p.rentalPieceSetList.length ? a.rentalPieceData && (a.rentalPieceData.rentalFlag = !0, a.rentalPieceData.rentalPieceSetList = p.rentalPieceSetList) : a.rentalPieceData && (a.rentalPieceData.rentalFlag = !1, a.rentalPieceData = null);
      if ("group" === d || "groupPrepare" === d) L = h.findWhere(p.regularEventList,
      {
        regularEventType: "GROUPBATTLE"
      });
      r = new Y(d);
      r.appendCharaStatus();
      var b = r.deckPrmInit();
      y = b.currentDeckType;
      t = b.currentDeckModel;
      a.removeUserCardIdArr || (a.removeUserCardIdArr = []);
      "accomplish" === d && n.changeBg("web_accomplish_page_01.ExportJson");
      a.setStyle(U);
      u = new fa;
      var c;
      "extermination" === d || "exterminationCopy" === d ? (c = new R, a.storage.userCardListEx.each(function(a)
      {
        4 <= a.get("cardId") % 10 && c.add(a)
      })) : "accomplish" === d ? (c = new R, a.storage.userCardListEx.each(function(a)
      {
        40 <= a.get("level") && c.add(a)
      })) : c = a.storage.userCardListEx;
      "arenaRankMatchAttack" !== d && "arenaRankMatchDefence" !== d || !a.EventArenaRankMatchPrm || ("arenaRankMatchAttack" === d && (u.DeckEditCountDown = ba.init(
      {
        model: a.EventArenaRankMatchPrm,
        pageJson: p
      })), b = a.getDateShortening(
      {
        date: new Date
      }), a.EventArenaRankMatchPrm.deckEditAccessTime = b.yr + "/" + b.mo + "/" + b.da + " " + b.ho + ":" + b.mi + ":" + b.se, a.EventArenaRankMatchPrm.deckEditPageJson = p);
      u.charaListView = new W(
      {
        model: new M,
        collection: c
      });
      a.content.append(u.charaListView.render().el);
      "accomplish" === d && S();
      a.scrollSetX("charaListScrollWrap", "list");
      n.getBaseData(a.getNativeObj())
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
      id: "userItemList"
    },
    {
      id: "userStatusList"
    },
    {
      id: "userDeckList"
    },
    {
      id: "userFormationSheetList"
    },
    {
      id: "userPieceList"
    },
    {
      id: "userPieceArchiveList"
    },
    {
      id: "userPieceSetList"
    },
    {
      id: "userCardList"
    },
    {
      id: "userCharaList"
    },
    {
      id: "userCharaEnhancementCellList"
    },
    {
      id: "userCharaAtbEnhancementCellList"
    },
    {
      id: "userLimitedChallengeList"
    },
    {
      id: "userDoppelList"
    },
    {
      id: "userLive2dList"
    },
    {
      id: "userPatrolList"
    }],
    fetch: function(b)
    {
      b && (String(b).match(/TU/) ? K = b : d = b);
      b = {};
      "extermination" !== d && "exterminationCopy" !== d && "secondPartLast" !== d && "secondPartLastCopy" !== d && a.exterminationQuestBattleId && (a.exterminationQuestBattleId = null);
      a.questBattleModel ? (b.questBattleId = a.exterminationQuestBattleId && null != a.exterminationQuestBattleId ? a.exterminationQuestBattleId + "" : a.questBattleModel.questBattle.questBattleId + "", A.pageModelGet(this.needModelIdObj, null, b)) : a.exterminationQuestBattleId && null != a.exterminationQuestBattleId ? (b.questBattleId = a.exterminationQuestBattleId + "", A.pageModelGet(this.needModelIdObj, null, b)) : A.pageModelGet(this.needModelIdObj)
    },
    init: function()
    {
      if ("TU560" == K)
        if (a.tutorialId = K, a.tutorialUtil) a.tutorialUtil.tutorialIdRegist(a.tutorialId), a.tutorialUtil.tutorialAddClass(a.tutorialId);
        else
        {
          n.nativeReload("#/TopPage");
          return
        } ha()
    },
    charaSelect: function(b, c)
    {
      if (!c)
      {
        if (a.tutorialId) a.tutorialUtil[a.tutorialId]("charaSelect");
        f.deckSet(null, b)
      }
    },
    deckChangeConf: function(b)
    {
      b && b.type && (b = null);
      var c = new a.PopupClass(
      {
        canClose: !1,
        title: "チーム編成の終了",
        content: "魔法少女・メモリア装備の変更を保存して</br>チーム編成を終了しますか？",
        closeBtnText: "変更を破棄して終了",
        decideBtnText: "変更を保存して終了"
      }, null, function()
      {
        $("#popupArea .popupCloseBtn").on(a.cgti, function()
        {
          $("#popupArea .popupCloseBtn").off();
          a.switchNpcCompar.setReturn = !0;
          a.rentalReversFlag = !0;
          f.model.clear(
          {
            silent: !0
          });
          f.model.set(r.deckDataCreate(t));
          z(f.model.toJSON(), t);
          a.rentalReversFlag = !1;
          c.remove();
          a.holdDeck = null;
          n.getBaseData(a.getNativeObj());
          f.selectModel = null;
          f.selectPos = null;
          a.doc.querySelector("#charaListWrap").className = "";
          a.switchNpcCompar.setReturn = !1;
          b && b()
        });
        $("#popupArea .decideBtn").on(a.cgti, function()
        {
          $("#popupArea .decideBtn").off();
          u.deckSave();
          c.remove();
          f.selectModel = null;
          f.selectPos = null;
          a.doc.querySelector("#charaListWrap").className = "";
          b && b()
        });
        u.deckChangeFlag = !1
      })
    },
    remove: function(b)
    {
      if (u)
      {
        a.removeBackHandler();
        C.popupTimerStop();
        J.popupTimerStop();
        d && "quest" !== d ? "group" === d || "groupPrepare" === d ? a.currentGroupDeckType = f.model.toJSON().deckType : "dungeon" === d ? a.currentDungeonDeckType = f.model.toJSON().deckType : "endless" === d ? a.currentEndlessDeckType = f.model.toJSON().deckType : "puellaHistoriaGroupRaid" === d ? a.currentPuellaHistoriaGroupRaidDeckType = f.model.toJSON().deckType : "scene0Challenge" === d && (a.currentScene0ChallengeDeckType = f.model.toJSON().deckType) : a.currentDeckType = f.model.toJSON().deckType;
        u.charaListView.trigger("remove");
        u.charaListView.remove();
        if ("arenaRankMatchAttack" == d || "arenaRankMatchDefence" == d) u.EventArenaRankMatchOpponentPopup && u.EventArenaRankMatchOpponentPopup.removeView(), u.DeckEditCountDown && u.DeckEditCountDown.removeView();
        u.trigger("removeView");
        u.remove()
      }
      L = p = r = t = y = d = K = null;
      x && x.removeView();
      x = null;
      a.switchNpcCompar && (a.switchNpcCompar = null);
      b()
    }
  }
});