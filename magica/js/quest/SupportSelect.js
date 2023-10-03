define("underscore backbone backboneCommon ajaxControl command QuestUtil js/card/CardPopup text!template/quest/SupportSelect.html text!css/quest/SupportSelect.css cardUtil".split(" "), function(k, u, b, q, m, V, D, J, K, x)
{
  var y = u.Model.extend(),
    r, e, n, N = u.View.extend(
    {
      events: function()
      {
        var a = {};
        a[b.cgti + " #tabArea .tabBtn"] = this.tabFunc;
        a[b.cgti + " #friendSortBtn"] = this.sortFunc;
        a[b.cgti + " #friendAscBtn"] = this.ascFunc;
        a[b.cgti + " #eventFilterBtn"] = this.eventFilterFunc;
        a[b.cgti + " #debugBtn"] = this.debugBtn;
        return a
      },
      initialize: function(a)
      {
        this.template = k.template(J);
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
        b.content.append(this.render().el)
      },
      tabFunc: function(a)
      {
        a.preventDefault();
        b.isScrolled() || (h[2] = a.currentTarget.dataset.att, b.sfml[l] = h, b.sfm(), E(h))
      },
      sortFunc: function(a)
      {
        a.preventDefault();
        b.isScrolled() || (h[0] = L[a.currentTarget.dataset.id], b.sfml[l] = h, b.sfm(), z(h))
      },
      ascFunc: function(a)
      {
        a.preventDefault();
        b.isScrolled() || (h[1] = M[a.currentTarget.dataset.id], b.sfml[l] = h, b.sfm(), z(h))
      },
      eventFilterFunc: function(a)
      {
        a.preventDefault();
        b.isScrolled() || (a = a.currentTarget.classList.contains("on") ? "off" : "on", h[3] = a, b.sfml[l] = h, b.sfm(), A(h))
      },
      debugBtn: function(a)
      {
        if (a && (a.preventDefault(), b.isScrolled())) return;
        var c = Date.parse(e.currentTime) / 1E3;
        a = new Date(1E3 * (c - 315576E5));
        var c = new Date(1E3 * (c + 600)),
          g, d, F, G, f, h, l, H;
        g = 10 > a.getMonth() + 1 ? "0" + (a.getMonth() + 1) : a.getMonth() + 1;
        d = 10 > a.getDate() ? "0" + a.getDate() : a.getDate();
        F = 10 > a.getHours() ? "0" + a.getHours() : a.getHours();
        G = 10 > a.getMinutes() ? "0" + a.getMinutes() : a.getMinutes();
        f = 10 > c.getMonth() + 1 ? "0" + (c.getMonth() + 1) : c.getMonth() + 1;
        h = 10 > c.getDate() ? "0" + c.getDate() : c.getDate();
        l = 10 > c.getHours() ? "0" + c.getHours() : c.getHours();
        H = 10 > c.getMinutes() ? "0" + c.getMinutes() : c.getMinutes();
        a = a.getFullYear() + "-" + g + "-" + d + "T" + F + ":" + G + ":00.000+0900";
        c = c.getFullYear() + "-" + f + "-" + h + "T" + l + ":" + H + ":00.000+0900";
        a = {
          size: 30,
          query:
          {
            function_score:
            {
              query:
              {
                bool:
                {
                  must: [
                  {
                    range:
                    {
                      userRank:
                      {
                        gte: 5,
                        lte: 200
                      }
                    }
                  },
                  {
                    range:
                    {
                      lastAccessDate:
                      {
                        gte: a,
                        lte: c
                      }
                    }
                  }],
                  must_not:
                  {
                    term:
                    {
                      _id: String(b.storage.gameUser.get("userId"))
                    }
                  }
                }
              },
              functions: [
              {
                random_score:
                {}
              }]
            }
          },
          stored_fields: "id userName attributeId lastAccessDate inviteCode userRank cardId cardRank displayCardId level revision lbCount".split(" ")
        };
        var t = [],
          v = "";
        q.ajaxPost(b.searchLinkList.friend, a, function(a)
        {
          a = a.hits.hits;
          var d = b.storage.userFollowList ? b.storage.userFollowList.toJSON() : [],
            c = !1;
          a[0] && a[0].fields && (c = !0);
          k.each(a, function(a)
          {
            var b;
            if (c)
            {
              b = {};
              for (var f in a.fields) b[f] = a.fields[f][0]
            }
            else b = a._source;
            var g = !1;
            k.each(d, function(a)
            {
              b.id == a.followUserId && (g = !0)
            });
            g || t.push(
            {
              userRank: b.userRank,
              id: b.id
            })
          });
          v = "";
          t.sort(function(a, b)
          {
            return a.userRank > b.userRank ? -1 : a.userRank < b.userRank ? 1 : 0
          });
          t = t.slice(0, 15);
          k.each(t, function(a, b)
          {
            var d = ",";
            0 === b && (d = "");
            v += d + a.id
          });
          a = {};
          a.strUserIds = v ? v : b.storage.gameUser.toJSON().userId;
          b.questBattleModel && b.questBattleModel.questBattle.npcHelpId && (a.strNpcHelpIds = String(b.questBattleModel.questBattle.npcHelpId));
          a.repeatFriend = !0;
          q.simplePageModelGet(null, a, function(a)
          {
            a && a.supportUserList && (b.supportUserList = a.supportUserList.concat(), b.doc.querySelector("#friendWrap .friendWrapInner").innerHTML = '<p class="supportCation ts_white">対象の魔法少女は存在しません</p>', I(), m.getBaseData(b.getNativeObj()))
          })
        })
      }
    }),
    B = u.View.extend(
    {
      id: "questDetail",
      events: function()
      {
        var a = {};
        a[b.cgti + " #dropItemBtn"] = this.dropItemShow;
        a[b.cgti + " #dropDetailClose"] = this.dropItemHide;
        a[b.cgti + " .dropList img"] = this.dropItemNameShow;
        return a
      },
      initialize: function(a)
      {
        this.listenTo(this.parentView, "removeView", this.removeView)
      },
      render: function()
      {
        this.$el.html(this.template(
        {
          model: this.model.toJSON()
        }));
        return this
      },
      dropItemShow: function(a)
      {
        a.preventDefault();
        if (!b.isScrolled())
        {
          a = this.el.querySelector(".questDetail");
          var c = this.el.querySelector(".dropDetail");
          a.className = "questDetail hide";
          c.className = "dropDetail show"
        }
      },
      dropItemHide: function(a)
      {
        a.preventDefault();
        if (!b.isScrolled())
        {
          a = this.el.querySelector(".questDetail");
          var c = this.el.querySelector(".dropDetail");
          a.className = "questDetail show";
          c.className = "dropDetail hide"
        }
      },
      dropItemNameShow: function(a)
      {
        a.preventDefault();
        b.isScrolled() || (b.removeClass(b.doc.querySelector(".dropList .show"), "show"), setTimeout(function()
        {
          b.addClass(a.currentTarget.parentNode, "show")
        }, 10))
      },
      removeView: function()
      {
        this.off();
        this.remove()
      }
    }),
    w = u.View.extend(
    {
      initialize: function()
      {
        this.popupInitFlag = !1;
        this.listenTo(this.parentView, "removeView", this.removeView)
      },
      className: function()
      {
        var a = "wrap ";
        this.model.toJSON().tapBlock && (a += "tapBlock ");
        this.model.toJSON().isNpc && (a += "npcChara ");
        this.model.toJSON().bonusMemoriaFlag && (a += "bonusIcon ");
        return a
      },
      events: function()
      {
        var a = {};
        a[b.cgti + " .magiaWrap"] = this.supportDecide;
        a[b.cgti + " .skillBox"] = this.supportDecide;
        a[b.cgti + " .tapArea"] = this.supportDecide;
        a["touchstart .magiaWrap"] = this.popupTimeStart;
        a["touchstart .skillBox"] = this.popupTimeStart;
        a["touchstart .tapArea"] = this.popupTimeStart;
        return a
      },
      popupTimeStart: function(a)
      {
        if (!b.tutorialId && !this.model.toJSON().isNpc && this.model.toJSON().card && "未設定" != this.model.toJSON().card.cardName)
        {
          var c = this,
            g = b.storage.userCardListEx.findWhere(
            {
              id: this.model.toJSON().id
            }),
            g = g ? g.toJSON() : this.model.toJSON();
          a.currentTarget.classList.contains("skillBox") && (g.initTabType = "memoria");
          a.currentTarget.classList.contains("magiaWrap") && (g.initTabType = "skill");
          g.deckFormationFlag = !0;
          D.cardDetailPopup(a, g, function()
          {
            if (b.storage.userCardListEx)
            {
              var a = b.storage.userCardListEx.findWhere(
                {
                  id: c.model.toJSON().id
                }),
                a = a ? a.toJSON() : c.model.toJSON();
              c.model.set(
              {
                displayCardId: a.displayCardId
              });
              m.getBaseData(b.getNativeObj())
            }
          })
        }
      },
      render: function()
      {
        this.$el.html(this.template(
        {
          model: this.model.toJSON()
        }));
        this.model.toJSON().filterAtt && b.addClass(this.el, this.model.toJSON().filterAtt);
        return this
      },
      supportDecide: function(a)
      {
        b.detailView || (a.preventDefault(), D.popupTimerStop(a), b.isScrolled() || (b.tutorialId ? (m.startSe(1001), b.tutorialUtil[b.tutorialId]()) : this.model.toJSON().tapBlock || (m.startSe(1002), b.questSupportModel = this.model.toJSON(), b.questSupportModel.supportTabAtt = b.doc.querySelector("#tabArea .current").dataset.att, location.href = "#/DeckFormation/quest")))
      },
      removeView: function()
      {
        this.off();
        this.remove()
      }
    }),
    p = {},
    l = "SupportSelect",
    h = b.sfml[l] || ["userRank", "desc", "all", "off"],
    O = ["TOWER", "DAILYTOWER", "BRANCH", "SINGLERAID"],
    Q = function()
    {
      r = 1;
      p = b.questBattleModel ||
      {
        chapterNo: 0,
        genericIndex: 0,
        ap: 0,
        title: "-",
        questBattle:
        {
          difficulty: 0,
          npcHelpNameHidden: !1,
          npcHelpNameQuestHidden: !1,
          npcHelpDisplayHidden: !1,
          npcHelpSupportHidden: !1
        }
      };
      b.questSupportModel = null;
      x.createCardList();
      e = q.getPageJson();
      e.supportUserList && (b.supportUserList = e.supportUserList.concat());
      b.switchNpcList = e.switchNpcList;
      e.bonusEventFlag = !1;
      if (e.campaignList)
      {
        var a = b.campaignParse(e.campaignList);
        if (a.POINT_UP && b.questBattleModel && b.questBattleModel.questType && a.POINT_UP.YELL)
          if (a.POINT_UP.YELL[b.questBattleModel.questType]) r = a.POINT_UP.YELL[b.questBattleModel.questType];
          else if (a.POINT_UP.YELL.ALL) switch (b.questBattleModel.questType)
        {
          case "MAIN":
          case "SUB":
          case "CHARA":
          case "COSTUME":
          case "COMPOSE":
          case "MATERIAL":
          case "ENHANCEMENT_AROUSAL":
            r = a.POINT_UP.YELL.ALL
        }
      }
      e.eventList && k.each(e.eventList, function(a)
      {
        0 <= O.indexOf(a.eventType) && (e.bonusEventFlag = !0)
      });
      b.setStyle(K);
      n = new N;
      P();
      I();
      m.getBaseData(b.getNativeObj());
      b.ready.hide()
    },
    E = function(a, c)
    {
      a[2] || (a[2] = "all", b.sfml[l] = a, b.sfm());
      var g = a[2];
      b.doc.querySelector("#friendWrap").className = g;
      b.removeClass(b.doc.querySelector("#tabArea .current"), "current");
      b.addClass(b.doc.querySelector(".tabBtn." + g), "current");
      A(a, c)
    },
    A = function(a, c)
    {
      if (e.bonusEventFlag)
      {
        a[3] || (a[3] = "off", b.sfml[l] = a, b.sfm());
        if ("on" == a[3] && e.bonusEventFlag)
        {
          b.addClass(b.doc.querySelector("#friendWrap"), "eventFilter");
          b.addClass(b.doc.querySelector("#eventFilterBtn"), "on");
          var g = "#friendWrap." + a[2] + " ." + a[2].toUpperCase() + ".bonusIcon";
          b.doc.querySelector(g) ? b.removeClass(b.doc.querySelector(".supportCation"), "on") : b.addClass(b.doc.querySelector(".supportCation"), "on")
        }
        "off" == a[3] && e.bonusEventFlag && (b.removeClass(b.doc.querySelector("#friendWrap"), "eventFilter"), b.removeClass(b.doc.querySelector("#eventFilterBtn"), "on"))
      }
      c || b.scrollRefresh(null, null, !0)
    },
    L = {
      level: "atk",
      atk: "def",
      def: "hp",
      hp: "userRank",
      userRank: "bonus",
      bonus: "level"
    },
    R = {
      level: "sortLv",
      atk: "sortAtk",
      def: "sortDef",
      hp: "sortHp",
      userRank: "sortRank",
      bonus: "sortLv"
    },
    M = {
      asc: "desc",
      desc: "asc"
    },
    S = {
      level: "レベル順",
      atk: "ATK順",
      def: "DEF順",
      hp: "HP順",
      userRank: "ランク順",
      bonus: "ボーナス順"
    },
    z = function(a, c)
    {
      if (a)
      {
        var g = "asc" === a[1] ? -1 : 1,
          d = document.querySelector(".friendWrapInner");
        [].slice.call(d.querySelectorAll(".wrap")).map(function(b)
        {
          var d = b.querySelector(".prm_" + a[0]).textContent | 0,
            c = (b.querySelector(".prm_follow").textContent | 0) + (b.querySelector(".prm_follower").textContent | 0);
          return {
            dom: b,
            value: d,
            value2: c
          }
        }).sort(function(a, b)
        {
          return b.value2 < a.value2 ? -1 : b.value2 > a.value2 ? 1 : b.value < a.value ? -1 * g : b.value > a.value ? 1 * g : 0
        }).forEach(function(a)
        {
          d.appendChild(a.dom)
        });
        b.doc.querySelector("#friendSortBtn").dataset.id = a[0];
        b.doc.querySelector("#friendSortBtn").textContent = S[a[0]];
        b.doc.querySelector("#friendAscBtn").dataset.id = a[1];
        b.doc.querySelector("#friendAscBtn").className = "se_tabs TE " + a[1];
        b.doc.querySelector(".friendWrapInner").className = "friendWrapInner " + R[a[0]];
        A(a)
      }
    },
    T = function(a)
    {
      var b = Date.parse(e.currentTime) / 1E3;
      k.each(a, function(a)
      {
        var d = a.lastAccessDate ? Date.parse(a.lastAccessDate) / 1E3 : null;
        d ? (d = (b - d) / 60, 16 > d ? d = "15分以内" : 60 > d ? d = Math.floor(d) + "分前" : 60 < d && 1440 > d ? d = Math.floor(d / 60) + "時間前" : (d = d / 60 / 24, d = 30 < d ? Math.floor(d / 30) + "カ月前" : Math.floor(d) + "日前")) : d = "-日前";
        a.loginTimeLag = d
      });
      return a
    },
    I = function()
    {
      if (b.supportUserList || e.npcHelpList)
      {
        w.prototype.parentView = n;
        w.prototype.template = k.template($("#FriendTemp").text());
        var a = [];
        b.supportUserList && (a = T(b.supportUserList.concat()));
        e.npcHelpList && Array.prototype.push.apply(a, e.npcHelpList);
        var c = {
            1: "ALL",
            2: "FIRE",
            3: "WATER",
            4: "TIMBER",
            5: "LIGHT",
            6: "DARK"
          },
          g = b.doc.createDocumentFragment();
        k.each(a, function(a)
        {
          var d = {
              ALL: null,
              FIRE: null,
              WATER: null,
              TIMBER: null,
              LIGHT: null,
              DARK: null
            },
            e = {},
            f = {};
          if (a.isNpc)
          {
            e = $.extend(a.userCardList[0], a.userCharaList[0]);
            e.supportFlag = !0;
            e.isNpc = !0;
            var e = x.addExStatus(e, a.userPieceList, a.userDoppelList, a.userDeck),
              h = p.questBattle.npcHelpDisplayHidden;
            f.userName = p.questBattle.npcHelpNameHidden ? "？？？" : a.userName;
            f.loginTimeLag = a.loginTimeLag;
            f.userRank = a.userRank;
            f.follow = a.follow;
            f.follower = a.follower;
            f.isNpc = !0;
            f.tapBlock = !1;
            f.faceHidden = h;
            f.yellFactor = r;
            e.composeAttribute = b.getTargetComposeAttribute(
            {
              attributeId: !1
            });
            e = $.extend(f, e);
            e = new w(
            {
              model: new y(e)
            });
            g.appendChild(e.render().el)
          }
          else if (f = {}, !p.questBattle.npcHelpSupportHidden && !b.tutorialId)
          {
            var l = {};
            k.each(a.userDeck, function(b, d)
            {
              -1 !== d.indexOf("questPositionId") && (d = d.split("questPositionId")[1], l[c[b]] = a.userDeck["userCardId" + d])
            });
            k.each(l, function(b, c)
            {
              k.each(a.userCardList, function(a)
              {
                b == a.id && (d[c] = a)
              })
            });
            k.each(a.userCharaList, function(e)
            {
              k.each(c, function(c)
              {
                d[c] && e.userCardId == d[c].id && (d[c].supportFlag = !0, d[c].filterAtt = c, d[c] = x.addExStatus($.extend(d[c], e), a.userPieceList, a.userDoppelList, a.userDeck), a.userStatusList && (d[c].userStatusList = a.userStatusList, d[c].composeAttribute = b.getTargetComposeAttribute(
                {
                  attributeId: e.chara.attributeId,
                  userStatusList: a.userStatusList
                })))
              })
            });
            f.userName = a.userName;
            f.loginTimeLag = a.loginTimeLag;
            f.userRank = a.userRank;
            f.follow = a.follow;
            f.follower = a.follower;
            f.yellFactor = r;
            a.displayTitle && (f.displayTitle = a.displayTitle);
            f.resentUse = !1;
            f.follow && (h = b.storage.userFollowList.findWhere(
            {
              followUserId: a.userId
            })) && h.toJSON().recentUsedAt && (e = q.getPageJson().currentTime.split(" ")[0], h = h.toJSON().recentUsedAt.split(" ")[0], e === h && (f.resentUse = !0));
            !1 !== a.visibleRankingClassType && (f.emblemSettingClassType = a.emblemSettingClassType, f.definiteClassRank = a.definiteClassRank, f.currentRankMatchDefiniteClassRank = a.currentRankMatchDefiniteClassRank);
            k.each(c, function(a)
            {
              f.tapBlock = !1;
              var b;
              a = d[a] ||
              {
                filterAtt: a,
                card:
                {
                  cardName: "未設定"
                },
                tapBlock: !0
              };
              b = $.extend(!1, f, a);
              b = new w(
              {
                model: new y(b)
              });
              ("未設定" == a.card.cardName || "ALL" == a.filterAtt || "ALL" !== a.filterAtt && a.filterAtt == a.card.attributeId) && g.appendChild(b.render().el)
            })
          }
        });
        b.doc.querySelector("#friendWrap .friendWrapInner").appendChild(g);
        b.scrollSet("friendWrap", "friendWrapInner");
        z(h);
        E(h, !0)
      }
    },
    P = function()
    {
      B.prototype.parentView = n;
      B.prototype.template = k.template($("#QuestDetailTemp").text());
      var a = new B(
      {
        model: new y(p)
      });
      b.doc.querySelector("#SuppotSelect").appendChild(a.render().el);
      U();
      b.scrollSet("dropListWrap", "dropList")
    },
    U = function()
    {
      b.questBattleModel && k.each(b.questBattleModel.questBattle.waveEnemyAttributeIdList, function(a)
      {
        a = a.toLowerCase();
        b.addClass(b.doc.querySelector(".enemyDetail ." + a), "on")
      })
    },
    C = null;
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
      id: "userStatusList"
    },
    {
      id: "userCharaList"
    },
    {
      id: "userCardList"
    },
    {
      id: "userCharaEnhancementCellList"
    },
    {
      id: "userCharaAtbEnhancementCellList"
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
      id: "userPatrolList"
    }],
    fetch: function(a)
    {
      C = a || null;
      a = {};
      b.supportUserList || (a.strUserIds = b.strSupportPickUpUserIds);
      if (b.questBattleModel && (b.questBattleModel.questBattle.npcHelpId && (a.strNpcHelpIds = String(b.questBattleModel.questBattle.npcHelpId)), b.questBattleModel.questBattle.switchNpcId1))
        for (var c = 1; 5 >= c; c++)
          if (b.questBattleModel.questBattle["switchNpcId" + c]) a["strSwitchNpcId" + c] = String(b.questBattleModel.questBattle["switchNpcId" + c]);
          else break;
      q.pageModelGet(this.needModelIdObj, null, a)
    },
    init: function()
    {
      if (C)
        if (b.tutorialId = C, b.tutorialUtil) b.tutorialUtil.tutorialIdRegist(b.tutorialId), b.tutorialUtil.tutorialAddClass(b.tutorialId);
        else
        {
          m.nativeReload("#/TopPage");
          return
        } Q()
    },
    remove: function(a)
    {
      p = {};
      n && (n.trigger("removeView"), n.remove());
      a()
    }
  }
});
