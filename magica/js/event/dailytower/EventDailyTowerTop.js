define("underscore backbone backboneCommon ajaxControl command QuestUtil text!template/event/dailytower/EventDailyTowerTop.html text!css/event/dailytower/EventDailyTower.css text!css/quest/QuestCommon.css js/view/quest/QuestListPartsView js/view/quest/ClearAnimationsView js/view/item/ItemImgPartsView".split(" "), function(k, J, b, x, p, G, K, L, M, C, N, O)
{
  function P()
  {
    var a = {};
    k.each(n.userSectionList, function(c)
    {
      var b = c.section.questType;
      if ("DAILYTOWER" == b)
      {
        c.section.questBattleList = [];
        k.each(n.userQuestBattleList, function(a)
        {
          c.section.sectionId === a.questBattle.sectionId && (w || (w = a.questBattle.consumeType), a.questType = b, c.section.questBattleList.push(a))
        });
        c.section.questBattleList.sort(function(a, c)
        {
          return a.questBattle.sectionIndex - c.questBattle.sectionIndex
        });
        c.eventObj = G.openEventCheck(c.section.eventId, n.eventList);
        var d = c.section.parameter.split("=")[1];
        "NORMAL" == d && (a.normal || (a.normal = []), c.section.titleParameter = "ストーリークエスト", c.questType = "TOWER_NORMAL", a.normal.push(c));
        "CHALLENGE" == d && (a.challenge || (a.challenge = []), c.section.titleParameter = "チャレンジクエスト", c.questType = "TOWER_CHALLENGE", a.challenge.push(c));
        "EXCHALLENGE" == d && (a.exchallenge || (a.exchallenge = []), c.section.titleParameter = "EXチャレンジクエスト", c.questType = "TOWER_EXCHALLENGE", a.exchallenge.push(c));
        "ENDLESSCHALLENGE" == d && (a.endlesschallenge || (a.endlesschallenge = []), c.section.titleParameter = "百禍チャレンジクエスト", c.questType = "TOWER_ENDLESSCHALLENGE", a.endlesschallenge.push(c))
      }
    });
    a.normal && a.normal.sort(function(a, b)
    {
      return a.section.genericIndex < b.section.genericIndex ? -1 : a.section.genericIndex > b.section.genericIndex ? 1 : 0
    });
    a.challenge && a.challenge.sort(function(a, b)
    {
      return a.section.genericIndex < b.section.genericIndex ? -1 : a.section.genericIndex > b.section.genericIndex ? 1 : 0
    });
    a.exchallenge && a.exchallenge.sort(function(a, b)
    {
      return a.section.genericIndex < b.section.genericIndex ? -1 : a.section.genericIndex > b.section.genericIndex ? 1 : 0
    });
    a.endlesschallenge && a.endlesschallenge.sort(function(a, b)
    {
      return a.section.genericIndex < b.section.genericIndex ? -1 : a.section.genericIndex > b.section.genericIndex ? 1 : 0
    });
    return a
  }
  var m = null,
    D = null,
    d, z = null,
    w = null,
    u = null,
    v = [],
    E = {
      TOWER_NORMAL: !1,
      TOWER_CHALLENGE: !1,
      TOWER_EXCHALLENGE: !1,
      TOWER_ENDLESSCHALLENGE: !1
    },
    e, H = 0,
    n, A, Q = J.View.extend(
    {
      events: function()
      {
        var a = {};
        a[b.cgti + " #helpBtn"] = this.helpPopup;
        a[b.cgti + " #schedulePopBtn"] = this.schedulePopup;
        a[b.cgti + " #tabBtns .normal"] = this.tabFunc;
        a[b.cgti + " #tabBtns .challenge"] = this.tabFunc;
        a[b.cgti + " #tabBtns .exchallenge"] = this.tabFunc;
        a[b.cgti + " #tabBtns .endlesschallenge"] = this.tabFunc;
        a[b.cgti + " .missionBtn"] = this.missionToggle;
        a[b.cgti + " .logBtn"] = this.logPopup;
        a[b.cgti + " #puellaHistoriaTopBtn"] = this.tapPuellaHistoriaTopBtn;
        return a
      },
      initialize: function(a)
      {
        this.l2dTouchCnt = 0;
        this.template = k.template(K);
        this.createDom()
      },
      render: function()
      {
        this.$el.html(this.template(
        {
          model: n
        }));
        return this
      },
      helpPopup: function(a)
      {
        a.preventDefault();
        b.isScrolled() || b.eventFirstNavi(v, d.eventId, "dailytower", function() {}, !0)
      },
      schedulePopup: function(a)
      {
        a.preventDefault();
        b.isScrolled() || new b.PopupClass(
        {
          title: "クエスト解放スケジュール",
          data: e,
          popupType: "typeB",
          exClass: "schedulePopup tab" + e.questLeng
        }, $("#ScheduleTemp").text(), function()
        {
          setTimeout(function()
          {
            b.scrollSet("popScrollOuter", "popScrollInner");
            b.scrollRefresh(null, null, !0);
            p.getBaseData(b.getNativeObj())
          }, 500)
        })
      },
      modelSend: function(a)
      {
        var b = a.currentTarget.parentNode.querySelector(".params .questType").dataset.questtype;
        a = a.currentTarget.parentNode.querySelector(".params .sectionId").dataset.sectionid;
        switch (b)
        {
          case "TOWER_NORMAL":
            return b = k.findWhere(g.normal,
            {
              sectionId: Number(a)
            });
          case "TOWER_CHALLENGE":
            return b = k.findWhere(g.challenge,
            {
              sectionId: Number(a)
            });
          case "TOWER_EXCHALLENGE":
            return b = k.findWhere(g.exchallenge,
            {
              sectionId: Number(a)
            });
          case "TOWER_ENDLESSCHALLENGE":
            return b = k.findWhere(g.endlesschallenge,
            {
              sectionId: Number(a)
            }), b.nextPage = "#/DeckFormation/endless", b
        }
      },
      createView: function()
      {
        E = {
          TOWER_NORMAL: !1,
          TOWER_CHALLENGE: !1,
          TOWER_EXCHALLENGE: !1,
          TOWER_ENDLESSCHALLENGE: !1
        };
        C.prototype.parentView = this;
        C.prototype.template = k.template($("#QuestListParts").text());
        C.prototype.tagName = "div";
        var a = F(g.normal);
        b.doc.getElementById("normalQuest").appendChild(a);
        "challenge" in g ? (a = F(g.challenge), b.doc.getElementById("challengeQuest").appendChild(a), d.parameterMap.EXCHALLENGESECTIONID && "exchallenge" in g ? (a = F(g.exchallenge), b.doc.getElementById("exchallengeQuest").appendChild(a)) : d.parameterMap.EXCHALLENGESECTIONID && b.addClass(b.doc.querySelector(".exchallengeWrap"), "off"), d.parameterMap.ENDLESSCHALLENGESECTIONID && "endlesschallenge" in g ? (a = F(g.endlesschallenge), b.doc.getElementById("endlesschallengeQuest").appendChild(a)) : d.parameterMap.ENDLESSCHALLENGESECTIONID && b.addClass(b.doc.querySelector(".endlesschallengeWrap"), "off")) : b.addClass(b.doc.querySelector(".challengeWrap"), "off")
      },
      createDom: function()
      {
        b.setGlobalView();
        g = P();
        n.questConsumeType = w;
        b.content.append(this.render().el);
        this.createView();
        var a = d.eventId,
          c = b.storage.userItemList.findWhere(
          {
            itemId: "EVENT_DAILYTOWER_" + a + "_KEY"
          }),
          a = b.storage.userItemList.findWhere(
          {
            itemId: "EVENT_DAILYTOWER_" + a + "_EXCHANGE_1"
          }),
          c = c ? c.toJSON().quantity : 0,
          a = a ? a.toJSON().quantity : 0;
        "ITEM" == w && (b.doc.querySelector(".questItemNumWrap .num").textContent = c);
        b.doc.querySelector(".itemNumWrap .num").textContent = a;
        b.scrollSet("scrollOuter", "scrollInner");
        c = "TOWER_" + m.toUpperCase();
        D && !E[c] && b.forceScrollPreset("scrollOuter", "scrollInner", D, !0);
        b.ready.hide()
      },
      tabFunc: function(a)
      {
        a.preventDefault();
        !b.isScrolled() && a.currentTarget.dataset && (a = a.currentTarget.dataset.id, b.forceScrollArr = null, this.selectQuestType(a), b.scrollRefresh(null, null, !0), B())
      },
      selectQuestType: function(a)
      {
        g.challenge || (a = "normal");
        var c = b.doc.querySelector("#tabBtns"),
          f = b.doc.querySelector("#questWrapTitle"),
          y = b.doc.querySelector("#questWrap"),
          q = {
            normal: "◆ ストーリークエスト",
            challenge: "◆ チャレンジクエスト",
            exchallenge: "◆ EXチャレンジクエスト",
            endlesschallenge: "◆ 百禍チャレンジクエスト"
          };
        if (void 0 == g[a])
        {
          var h = q[a].slice(2),
            t = null;
          switch (a)
          {
            case "normal":
              t = e.open[0];
              break;
            case "challenge":
              t = e.open[1];
              break;
            case "exchallenge":
              t = e.open[2];
              break;
            case "endlesschallenge":
              t = e.open[3]
          }
          new b.PopupClass(
          {
            popupType: "typeC",
            title: "クエスト解放",
            content: h + "は<br />" + t.openDate + "に解放されます"
          }, null);
          a = "normal"
        }
        a = a ? a : "normal";
        c = c.getElementsByClassName("tab");
        for (h = 0; h < c.length; h++) c[h].dataset.id === a ? b.addClass(c[h], "current") : b.removeClass(c[h], "current");
        f.textContent = q[a];
        y.className = "commonFrame2 " + a;
        y = a.toUpperCase() + "SECTIONID";
        void 0 != g[a] && (f = g[a][g[a].length - 1], y = d.parameterMap[y], z = f.sectionId, String(z) !== y && f.cleared ? b.addClass(b.doc.querySelector(".allClear"), "show") : b.removeClass(b.doc.querySelector(".allClear"), "show"), f.section.message = f.section.message.replace(/＠/g, "<br>"), b.doc.querySelector(".charaName").textContent = f.section.charaName, b.doc.querySelector(".serifFont").innerHTML = f.section.message, b.doc.querySelector(".logBtnWrap").style.display = "endlesschallenge" === a ? "block" : "none")
      },
      logPopup: function(a)
      {
        a.preventDefault();
        if (!b.isScrolled())
        {
          var c = function()
          {
            var a = k.template($("#LogPartsTemp").text());
            new b.PopupClass(
            {
              popupType: "typeA",
              title: "バトルログ",
              content: a(u),
              popupId: "logPopup"
            }, null, function()
            {
              b.scrollSet("battleLogListWrap", "logList");
              p.getBaseData(b.getNativeObj())
            })
          };
          if (u) c();
          else
          {
            var f = {
                questBattleIdList: []
              },
              d = [];
            k.each(g.endlesschallenge, function(a)
            {
              k.each(a.section.questBattleList, function(a)
              {
                f.questBattleIdList.push(a.questBattleId);
                d.push(a)
              })
            });
            x.ajaxPost(b.linkList.questGetBestRecord, f, function(a)
            {
              a && (u = a, k.each(u.bestRecordList, function(a)
              {
                var b = k.findWhere(d,
                {
                  questBattleId: a.questBattleId
                });
                b && (a.title = b.questBattle.title)
              }), u.bestRecordList.sort(function(a, b)
              {
                return b.questBattleId - a.questBattleId
              }), c())
            })
          }
        }
      },
      missionToggle: function(a)
      {
        a.preventDefault();
        if (!b.isScrolled())
        {
          a = b.doc.querySelector("#scrollOuter .scrollInner");
          var c = b.doc.querySelector("#scrollOuter .scrollInner").className; - 1 !== c.indexOf("first") ? a.className = "second scrollInner" : -1 !== c.indexOf("second") && (a.className = "first scrollInner")
        }
      },
      tapPuellaHistoriaTopBtn: function(a)
      {
        a.preventDefault();
        b.isScrolled() || (location.href = "#/PuellaHistoriaTop")
      }
    }),
    g, F = function(a, c)
    {
      var f = [],
        e = 1;
      k.each(a, function(a, b)
      {
        k.each(a.section.questBattleList, function(b, c)
        {
          var d = "";
          switch (c)
          {
            case 0:
              d = "①";
              break;
            case 1:
              d = "②";
              break;
            case 2:
              d = "③";
              break;
            case 3:
              d = "④";
              break;
            case 4:
              d = "⑤";
              break;
            case 5:
              d = "⑥";
              break;
            case 6:
              d = "⑦";
              break;
            case 7:
              d = "⑧";
              break;
            case 8:
              d = "⑨";
              break;
            case 9:
              d = "⑩";
              break;
            case 10:
              d = "⑪"
          }
          b.questBattleIndex = e - 1;
          b.questType = a.questType;
          b.charaId = a.section.charaId;
          b.charaTitle = a.section.charaName + "編" + d;
          b.questBattle.title ? (b.questTitle = b.questBattle.title, b.questClass = b.questBattle.title) : b.questTitle = "BATTLE " + e;
          e++;
          if ("TOWER_ENDLESSCHALLENGE" === a.questType || !E[a.questType] || b.cleared) f.push(b), b.cleared || (E[a.questType] = !0)
        })
      });
      f.sort(function(a, b)
      {
        return a.questBattleIndex > b.questBattleIndex ? -1 : a.questBattleIndex < b.questBattleIndex ? 1 : 0
      });
      var q = b.doc.createDocumentFragment();
      k.each(f, function(a, f)
      {
        a.missionRewardCode = b.itemSet(a.questBattle.missionRewardCode);
        a.chestColor = a.missionRewardCode.chestColor;
        f = new C(
        {
          model: a
        });
        c && (f.parentView = c);
        f.el.dataset.scrollHash = a.questBattleId;
        q.appendChild(f.render().el);
        if (d.viewParameterMap.VIEW_TYPE && "TOWER_NORMAL" == a.questType)
        {
          var e = d.viewParameterMap.VIEW_TYPE;
          b.addClass(f.el, e);
          switch (e)
          {
            case "charaBtn":
              e = b.doc.createElement("img"), e.className = "charaImg", e.src = "/magica/resource/image_web/event/dailytower/" + d.eventId + "/chara/chara_" + a.charaId + ".png", f.el.querySelector(".firstView").appendChild(e), f.el.querySelector(".questTitle").textContent = a.charaTitle
          }
        }
      });
      return q
    },
    I = function()
    {
      m || (m = "normal");
      b.setStyle(L + M);
      n = x.getPageJson();
      if (d = n.eventList.filter(function(a, b)
        {
          if ("DAILYTOWER" == a.eventType) return !0
        })[0])
      {
        n.eventMaster = d;
        n.puellaHistoriaClass = "";
        e.headerPath = "";
        H = 0;
        d.parameterMap && d.parameterMap.PUELLAHISTORIA_NUM && (n.puellaHistoriaClass = "puellaHistoria", e.headerPath = "puellaHistoria/", H = Number(d.parameterMap.PUELLAHISTORIA_NUM));
        var a = d.viewParameterMap.BGM;
        p.changeBg(d.viewParameterMap.BG_IMG + ".ExportJson");
        p.startBgm(a);
        A = new Q;
        A.selectQuestType(m);
        b.scrollRefresh();
        G.supportPickUp(n);
        if (b.clearSectionModel && b.clearSectionModel.section.clearReward)
        {
          var a = b.clearSectionModel.section,
            c = G.clearRewardChestColor(a.clearReward);
          N.section(a.clearRewardCode, a, c, function()
          {
            var a = g[m][g[m].length - 1],
              b = d.parameterMap.NORMALSECTIONID,
              c = a.sectionId;
            0 != H && String(c) == b && a.cleared ? location.href = "#/PuellaHistoriaTop" : B()
          });
          p.getBaseData(b.getNativeObj());
          b.clearSectionModel = null
        }
        else a = !1, c = localStorage.getItem("EventDailyTowerId"), c && d.eventId === parseInt(c) || (a = !0, localStorage.setItem("EventDailyTowerId", d.eventId.toString())), a ? b.eventFirstNavi(v, d.eventId, "dailytower", function()
        {
          var a = d.viewParameterMap.EVENT_CONSUME_ITEM_NAME;
          a ? new b.PopupClass(
          {
            popupType: "typeC",
            title: a + "をプレゼント！",
            content: a + "を配布しました。<br>" + a + "を消費して<br>イベントクエストをプレイしましょう！",
            closeBtnText: "閉じる"
          }, null, null, function()
          {
            B()
          }) : B()
        }) : B(), p.getBaseData(b.getNativeObj())
      }
      else location.href = "#/MyPage"
    },
    B = function()
    {
      if (z)
      {
        p.endL2d();
        var a = {};
        a.key = String(z);
        a.type = 1;
        a.id = "0";
        a.x = 246;
        a.y = 1024 === b.displayWidth ? Math.floor(b.doc.getElementsByTagName("body")[0].offsetHeight / 2) : Math.ceil(b.shortSize / 2);
        p.startL2d(a)
      }
    },
    R = function(a, c)
    {
      var d = !1,
        d = !0;
      a ? k.each(n.userQuestAdventureList, function(b)
      {
        a === b.adventureId && (d = !1)
      }) : d = !1;
      d ? ($(b.ready.target).off(), $(b.ready.target).on("webkitAnimationEnd", function()
      {
        p.changeBg("web_black.jpg");
        $(b.ready.target).off();
        $(b.ready.target).on("webkitAnimationEnd", function(a)
        {
          "readyFadeOut" == a.originalEvent.animationName && (b.ready.target.className = "")
        });
        x.ajaxPost(b.linkList.userQuestAdventureRegist,
        {
          adventureId: String(a)
        }, c)
      }), b.ready.target.classList.contains("preNativeFadeIn") ? $(b.ready.target).trigger("webkitAnimationEnd") : b.addClass(b.ready.target, "preNativeFadeIn")) : c()
    },
    S = function()
    {
      if (d)
      {
        var a = d.parameterMap.SWITCHDATE,
          c = d.viewParameterMap.SWITCH_NAVI.split(",");
        b.periodCheck(n.currentTime, a) && k.each(v, function(a, b)
        {
          k.each(c, function(c)
          {
            a == c && (v[b] += "_02")
          })
        })
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
      id: "itemList"
    },
    {
      id: "userItemList"
    },
    {
      id: "giftList"
    },
    {
      id: "pieceList"
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
      id: "userLive2dList"
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
      id: "userFollowList"
    },
    {
      id: "userQuestAdventureList"
    },
    {
      id: "userPatrolList"
    }],
    fetch: function(a, b)
    {
      a && (m = a);
      b && (D = b);
      x.pageModelGet(this.needModelIdObj)
    },
    init: function()
    {
      n = x.getPageJson();
      d = k.findWhere(n.eventList,
      {
        eventType: "DAILYTOWER"
      });
      w = null;
      v = ["navi_01", "navi_02", "navi_03", "navi_05"];
      d.parameterMap.ENDLESSCHALLENGESECTIONID && v.push("navi_04");
      e = {
        questLeng: 3,
        scheduleData: "",
        open: "",
        dayList: "",
        difficultyList: []
      };
      d.parameterMap.NORMALSECTIONID && e.difficultyList.push("DAILYTOWERTYPE=NORMAL");
      d.parameterMap.CHALLENGESECTIONID && e.difficultyList.push("DAILYTOWERTYPE=CHALLENGE");
      d.parameterMap.EXCHALLENGESECTIONID && e.difficultyList.push("DAILYTOWERTYPE=EXCHALLENGE");
      d.parameterMap.ENDLESSCHALLENGESECTIONID && e.difficultyList.push("DAILYTOWERTYPE=ENDLESSCHALLENGE");
      e.questNum = {
        "DAILYTOWERTYPE=NORMAL": 1,
        "DAILYTOWERTYPE=CHALLENGE": 1,
        "DAILYTOWERTYPE=EXCHALLENGE": 1,
        "DAILYTOWERTYPE=ENDLESSCHALLENGE": 1
      };
      for (var a = k.sortBy(n.schedule, "openDate"), c = [], f = 0; f < e.difficultyList.length; f++) c.push(k.find(a, function(a)
      {
        return a.parameter == e.difficultyList[f]
      }));
      e.questLeng = c.length;
      e.open = c;
      var a = k.groupBy(a, "openDate"),
        g = Object.keys(a).map(function(a)
        {
          return a
        });
      if (d.viewParameterMap.OPEN_TIME_REPLACE)
        if (e.dayList = [], c = d.viewParameterMap.OPEN_TIME_REPLACE, "object" == typeof c)
          for (var q = 0; q < c.length; q++) e.dayList.push(c[q]);
        else e.dayList.push(c);
      else e.dayList = Object.keys(a);
      for (f = 0; f < e.dayList.length; f++)
        if (e.dayList[f] = e.dayList[f].slice(5, 16).replace(/ /g, "<br>"), "0" == e.dayList[f].slice(0, 1) || 0 == e.dayList[f].slice(0, 1)) e.dayList[f] = e.dayList[f].slice(1);
      for (var c = [], q = [], h = 0; h < g.length; h++)
      {
        c[h] = k.sortBy(a[g[h]], "sectionId");
        for (var t = {}, l = 0; l < c[h].length; l++)
        {
          c[h][l].openDate = c[h][l].openDate.slice(5, 16);
          c[h][l].rewardType = b.itemSet(c[h][l].rewardCode).rewardType;
          c[h][l].rewardCode = this.rewardItemFunc(c[h][l]);
          if (0 == c[h][l].openDate.slice(0, 1) || "0" == c[h][l].openDate.slice(0, 1)) c[h][l].openDate = c[h][l].openDate.slice(1);
          var r = c[h][l].parameter;
          t[r] = (t[r] || 0) + 1
        }
        l = Object.keys(t).map(function(a)
        {
          return t[a]
        });
        q[h] = Math.max.apply(null, l)
      }
      a = [];
      g = [];
      for (h = l = 0; h < c.length; h++)
      {
        for (f = 0; f < e.difficultyList.length * q[h]; f++)
        {
          l > e.difficultyList.length - 1 && (l = 0);
          if (r = k.find(c[h],
            {
              parameter: e.difficultyList[l]
            }))
          {
            var m = e.questNum[e.difficultyList[l]];
            r.quest = "DAILYTOWERTYPE=ENDLESSCHALLENGE" == r.parameter ? "チャレンジ<br />" + this.conbertRomaNum(m) + "～" + this.conbertRomaNum(m + r.questNum - 1) : "BATTLE<br />" + m + "～" + (m + r.questNum - 1);
            m == Number(m + r.questNum - 1) && (r.quest = "DAILYTOWERTYPE=ENDLESSCHALLENGE" == r.parameter ? "特別編" : "BATTLE<br />" + m);
            e.questNum[e.difficultyList[l]] = m + r.questNum;
            g.push(r)
          }
          else g.push("");
          c[h][k.findIndex(c[h],
          {
            parameter: e.difficultyList[l]
          })] = "";
          l++
        }
        a.push(g);
        g = []
      }
      e.scheduleData = {
        rowNum: q,
        data: a
      };
      d.parameterMap.SWITCHDATE && d.viewParameterMap.SWITCH_NAVI && S();
      var u = d.startStoryId;
      R(u, function(a)
      {
        a ? (b.responseSetStorage(a), p.endL2d(), $("#commandDiv").on("nativeCallback", function(a, b)
        {
          $("#commandDiv").off();
          I();
          p.setWebView(!0)
        }), setTimeout(function()
        {
          p.setWebView(!1);
          p.startStory(u,
          {
            canAuto: !1,
            canOpenLog: !1
          });
          window.isBrowser && nativeCallback()
        }, 500)) : I()
      })
    },
    conbertRomaNum: function(a)
    {
      for (var b = [1E3, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1], d = "M CM D CD C XC L XL X IX V IV I".split(" "), e = "", g = 0; g < b.length; g++)
        for (; b[g] <= a;) e += d[g], a -= b[g];
      return e
    },
    rewardItemFunc: function(a)
    {
      var c = b.itemSet(a.rewardCode);
      if (d.viewParameterMap.HIDE_PIECE && -1 != d.viewParameterMap.HIDE_PIECE.indexOf(a.rewardCode)) return "<img class='commonItemImg' src='/magica/resource/image_web/event/dailytower/common/" + ("memoria_thumb_s" + a.pieceRank + "_" + ("SKILL" == a.pieceType ? 1 : 2)).toLowerCase() + ".png'>";
      if (d.viewParameterMap.HIDE_LIVE2D && -1 != d.viewParameterMap.HIDE_LIVE2D.indexOf(a.rewardCode)) return "";
      a = c.itemCode.split("_")[2];
      return (new O(
      {
        model:
        {
          item: c,
          quantity: c.quantity,
          genericId: a,
          piece: c.piece,
          chara:
          {
            id: c.itemCode
          }
        },
        type: c.rewardType
      })).render().el.innerHTML
    },
    removeCommand: function()
    {
      p.endL2d()
    },
    remove: function(a)
    {
      u = w = z = D = m = null;
      v = [];
      e && (e = null);
      A && (A.trigger("remove"), A.remove());
      a()
    }
  }
});
