define("underscore backbone backboneCommon ajaxControl command text!template/regularEvent/groupBattle/RegularEventGroupCommon.html js/regularEvent/groupBattle/view/UserPageView js/regularEvent/groupBattle/view/RankingPageView js/regularEvent/groupBattle/view/BossPageView js/regularEvent/groupBattle/view/ResultPageView text!template/regularEvent/groupBattle/RegularEventGroupBattleSelectDifficulty.html js/view/mission/MissionTopListView text!css/regularEvent/groupBattle/RegularEventGroupBattleTop.css cardUtil QuestUtil".split(" "), function(f, n, a, p, m, Q, z, A, y, B, R, F, S, T, Y)
{
  n.Model.extend();
  var h = {},
    d, G, H, l, k, w, x, u, v, C, D = !1,
    J = n.View.extend(
    {
      id: "FirstCutinContainer",
      events: function()
      {
        var a = {};
        a["webkitTransitionEnd .animationEnd"] = this.animationEnd;
        a["webkitAnimationEnd .animationEnd"] = this.animationEnd;
        a["webkitanimationend .animationEnd"] = this.animationEnd;
        a["animationend .animationEnd"] = this.animationEnd;
        return a
      },
      initialize: function(a)
      {
        this.template = f.template($("#firstCutinPartsTemp").text());
        this.createDom()
      },
      render: function()
      {
        this.$el.html(this.template());
        return this
      },
      createDom: function()
      {
        a.doc.getElementById("overlapContainer").appendChild(this.render().el);
        a.doc.getElementById("curtain").className = "show";
        setTimeout(function()
        {
          m.startSe(3103)
        }, 500)
      },
      animationEnd: function(b)
      {
        setTimeout(function()
        {
          var b = function()
            {
              this.removeView()
            }.bind(this),
            e = f.template($("#AnnounceRankingPartsTemp").text()),
            t = d.dailyResult && 1 === d.dailyResult.memberRanking;
          new a.PopupClass(
          {
            title: "所属グループ決定",
            content: e(
            {
              model: d,
              isTopUser: t
            }),
            popupId: "finalRoundStartPopup",
            closeBtnText: "OK",
            popupType: t ? "typeB" : "typeA"
          }, null, null, b)
        }.bind(this), 500)
      },
      removeView: function()
      {
        this.callback && (this.callback(), this.callback = null);
        a.doc.getElementById("curtain").className = "";
        this.off();
        this.remove()
      }
    }),
    K = n.View.extend(
    {
      initialize: function(a)
      {
        this.model = a;
        this.template = f.template($("#BattleLogPartsTemp").text());
        this.dailyIndex = 1;
        this.dailyMax = 5;
        this.createDom()
      },
      createDom: function()
      {
        var b = function()
          {
            $(".arrow").on(a.cgti, function(b)
            {
              b.preventDefault();
              a.isScrolled() || (b.currentTarget.classList.contains("left") ? (this.dailyIndex--, 1 > this.dailyIndex && (this.dailyIndex = this.dailyMax)) : (this.dailyIndex++, this.dailyIndex > this.dailyMax && (this.dailyIndex = 1)), this.logChange())
            }.bind(this));
            I.prototype.rootView = this;
            I.prototype.template = f.template(a.doc.getElementById("BattleLogListPartsTemp").textContent);
            this.logChange()
          }.bind(this),
          c = function()
          {
            $(".dailyTab").off(a.cgti);
            this.removeView()
          }.bind(this);
        new a.PopupClass(
        {
          title: "バトルログ",
          content: this.template(
          {
            logList: this.model.logList,
            userName: this.userName
          }),
          popupId: "battleLogPopup"
        }, null, b, c)
      },
      logChange: function()
      {
        var b = a.doc.getElementById("battleLogList"),
          c = this.model.logList[this.dailyIndex];
        b.innerHTML = "";
        if (c && 0 < c.length)
        {
          c.sort(function(a, b)
          {
            return a.createdAt > b.createdAt ? 1 : a.createdAt < b.createdAt ? -1 : 0
          });
          var e = a.doc.createDocumentFragment();
          f.each(c, function(a, b)
          {
            a.index = b + 1;
            a.formationMaster = f.findWhere(this.model.formationSheetList,
            {
              id: a.formationSheetId
            });
            a = new I(a);
            e.appendChild(a.render().el)
          }.bind(this));
          b.appendChild(e);
          m.getBaseData(a.getNativeObj())
        }
        else b.innerHTML = "<p class='noLog ts_white'>該当するログがありません</p>";
        a.doc.getElementById("logDay").innerText = this.dailyIndex
      },
      removeView: function()
      {
        this.trigger("removeChildView");
        this.off();
        this.remove()
      }
    }),
    I = n.View.extend(
    {
      className: "log",
      events: function()
      {
        var b = {};
        b[a.cgti + " .copyDeckBtn"] = this.copyDeckBtn;
        return b
      },
      initialize: function(a, c)
      {
        this.listenTo(this.rootView, "removeChildView", this.removeView);
        this.model = a
      },
      render: function()
      {
        this.$el.html(this.template(
        {
          model: this.model
        }));
        return this
      },
      copyDeckBtn: function(b)
      {
        b.preventDefault();
        if (!a.isScrolled())
        {
          var c = a.storage.userFormationSheetList.findWhere(
          {
            formationSheetId: this.model.formationSheetId
          });
          b = c ? this.model.formationSheetId : 111;
          for (var c = c ? this.model.formationMaster : a.storage.userFormationSheetList.findWhere(
            {
              formationSheetId: b
            }).formationSheet, e = {
              deckType: 54,
              formationSheetId: b,
              formationSheet: c,
              name: "チーム" + "54".slice(-1)
            }, c = b = 0; 9 > b;)
            if (b = b + 1 | 0, this.model["userCard" + b])
            {
              var d = parseInt(String(this.model["userCard" + b].cardId).substr(0, 4));
              if (d = a.storage.userCardListEx.findWhere(
                {
                  charaId: d
                })) d = d.toJSON(), c = c + 1 | 0, e["userCardId" + c] = d.id, e["questPositionId" + c] = b, 1 == c && (e.questEpisodeUserCardId = d.id)
            } 0 == c ? new a.PopupClass(
          {
            title: "チームコピー確認",
            content: "該当の魔法少女が１体もいないため、コピーできません",
            closeBtnText: "OK",
            popupType: "typeA"
          }) : new a.PopupClass(
          {
            title: "編成コピー確認",
            content: "チーム４に編成をコピーします。<br>編成画面に移動した段階ではまだ保存されていません。<br>所持していない魔法少女・魔法陣形はコピーされません。",
            closeBtnText: "キャンセル",
            decideBtnText: "OK",
            decideBtnEvent: function()
            {
              a.currentGroupDeckType = 54;
              a.copyDeckModel = e;
              location.href = "#/DeckFormation/groupPrepare"
            },
            popupType: "typeA"
          })
        }
      },
      removeView: function()
      {
        this.off();
        this.remove()
      }
    }),
    U = n.View.extend(
    {
      id: "MissionContainer",
      className: "popupContent",
      events: function()
      {
        var b = {};
        b[a.cgti + " .popupCloseBtn"] = this.closeBtn;
        b[a.cgti + " #allReserve"] = this.allReserve;
        return b
      },
      initialize: function(a)
      {
        this.template = f.template($("#MissionPartsTemp").text());
        this.createDom()
      },
      createDom: function()
      {
        F.prototype.rootView = this;
        F.prototype.template = f.template(a.doc.getElementById("MissionListPartsTemp").textContent);
        this.eventMission = this.makeEventMissionList();
        var b = a.doc.getElementById("overlapContainer");
        b.appendChild(this.render().el);
        b.style.width = "100%";
        a.doc.getElementById("curtain").className = "show light";
        this.createMissionList(this.eventMission);
        this.allReservCheck();
        a.scrollSet("missionScrollWrap", "missionList")
      },
      render: function()
      {
        this.$el.html(this.template(
        {
          model: this.model
        }));
        return this
      },
      makeEventMissionList: function()
      {
        if (!a.storage.userLimitedChallengeList) return null;
        Date.parse(d.currentTime);
        var b = k.viewParameterMap.CHALLENGE_GROUP_ID,
          c = f.filter(a.storage.userLimitedChallengeList.toJSON(), function(a)
          {
            return a.challenge.groupId == b && !a.receivedAt
          });
        return f.sortBy(c, function(a)
        {
          return a.clearedCount >= a.challenge.count ? -999 + a.challenge.sortKey : a.challenge.sortKey
        })
      },
      createMissionList: function(b)
      {
        var c = "e_" + k.viewParameterMap.CHALLENGE_GROUP_ID,
          e = 0,
          d = a.doc.createDocumentFragment();
        f.each(b, function(b)
        {
          b = new F(b, c);
          a.removeClass(b.el, "commonFrame4");
          d.appendChild(b.render().el);
          e++
        });
        b = a.doc.getElementById(c);
        0 < e ? b.appendChild(d) : b.innerHTML = '<p class="noMission ts_white">挑戦できるミッションがありません</p>'
      },
      allReserve: function(b)
      {
        b.preventDefault();
        a.isScrolled() || b.currentTarget.classList.contains("off") || 0 < this.tapCount || (this.tapCount++, a.addClass(a.doc.getElementById("allReserve"), "off"), this.allReserveAdvance())
      },
      allReserveAdvance: function()
      {
        var b = Number(k.viewParameterMap.CHALLENGE_GROUP_ID),
          c = this;
        p.ajaxPost(a.linkList.userLimitedChallengeAllReceieve,
        {
          groupId: b
        }, function(e)
        {
          if ("error" !== e.resultCode)
          {
            var d = 0,
              g = [];
            f.each(c.eventMission, function(a, b)
            {
              a && !a.receivedAt && a.clearedCount >= a.challenge.count && (g.push(a.challengeId), d++)
            });
            var r = function()
            {
              c.trigger("afterAllRecieve", "e_" + b, g);
              c.allReservCheck();
              c.clearMissionCount();
              c.tapCount = 0;
              a.addClass(a.doc.getElementById("allReserve"), "off");
              a.scrollRefresh(null, null, !0)
            };
            1 > Object.keys(e).length || window.isLocal && window.isBrowser && 2 > Object.keys(e).length ? new a.PopupClass(
            {
              content: "受け取り期限を過ぎているため<br>対象のミッション報酬を受け取ることはできません",
              closeBtnText: "OK",
              popupType: "typeC",
              exClass: "missionPop"
            }, null, null, r) : new a.PopupClass(
            {
              content: "ミッション報酬を" + d + "件受け取りました。<br><br>※受け取ったアイテムは直接付与されています。",
              closeBtnText: "OK",
              popupType: "typeC",
              exClass: "missionPop"
            }, null, null, r);
            a.responseSetStorage(e);
            c.eventMission = c.makeEventMissionList()
          }
        })
      },
      allReservCheck: function()
      {
        var b = 0;
        f.each(this.eventMission, function(a, e)
        {
          a.receivedAt || a.clearedCount >= a.challenge.count && b++
        });
        0 < b ? a.removeClass(a.doc.getElementById("allReserve"), "off") : a.addClass(a.doc.getElementById("allReserve"), "off")
      },
      clearMissionCount: function()
      {
        h.clearMissionCount()
      },
      closeBtn: function(b)
      {
        b.preventDefault();
        if (!a.isScrolled())
        {
          var c = this;
          this.clearMissionCount();
          a.doc.getElementById("curtain").className = "";
          a.addClass(this.el, "close");
          $(c.el).on("webkitAnimationEnd", function()
          {
            $(c.el).off();
            c.removeView()
          })
        }
      },
      removeView: function()
      {
        a.doc.getElementById("overlapContainer").style.width = "";
        this.trigger("removeChildView");
        this.off();
        this.remove()
      }
    }),
    L = n.View.extend(
    {
      initialize: function()
      {
        this.template = f.template($("#RewardPartsTemp").text());
        for (var b = 0, c = a.groupBattleReward.gradeRewardList.length; b < c && a.groupBattleReward.gradeRewardList[b].grade != d.userRegularEventGroupBattle.grade;) b = b + 1 | 0;
        this.currentGradeIndex = b;
        b = 0;
        for (c = a.groupBattleReward.subjugationRewardList.length; b < c && !(a.groupBattleReward.subjugationRewardList[b].subjugationCount <= d.bossLevel);) b = b + 1 | 0;
        this.currentRepelIndex = b;
        b = 0;
        for (c = a.groupBattleReward.emblemRewardList.length; b < c && a.groupBattleReward.emblemRewardList[b].emblem != d.userRegularEventGroupBattle.maxEmblem;) b = b + 1 | 0;
        this.currentEmblemIndex = b;
        this.createDom()
      },
      createDom: function()
      {
        var b = function()
          {
            var b = $(".rewardTab");
            b.on(a.cgti, this.tabChange.bind(this));
            b.eq(0).trigger(a.cgti);
            a.scrollSet("rewardListWrap", "scrollInner")
          }.bind(this),
          c = function()
          {
            $("#rewardTabWrap .tabBtn").off(a.cgti);
            this.removeView()
          }.bind(this);
        new a.PopupClass(
        {
          title: "報酬一覧",
          content: this.template(),
          popupId: "rewardPopup",
          popupType: "typeC"
        }, null, b, c)
      },
      tabChange: function(b)
      {
        b.preventDefault();
        if (!a.isScrolled())
        {
          var c = b.currentTarget.dataset.type,
            e = b.currentTarget.dataset.id,
            t = a.doc.getElementById("groupTabWrap");
          if (("groupRanking" == c || "memberRanking" == c) && !e)
          {
            for (var g = t.getElementsByClassName("rewardTab"), r = 0, k = g.length, q = 0; r < k;) g[r].dataset.type = c, g[r].classList.contains("current") && (e = g[r].dataset.id, q = r), r = r + 1 | 0;
            e || (e = g[q].dataset.id);
            a.addClass(g[q], "current")
          }
          g = b.currentTarget.parentNode.getElementsByClassName("current")[0];
          a.removeClass(g, "current");
          a.addClass(b.currentTarget, "current");
          var g = "",
            q = b = null,
            h = "";
          switch (c)
          {
            case "grade":
              g = "グレード報酬";
              b = a.groupBattleReward.gradeRewardList;
              q = this.currentGradeIndex;
              break;
            case "subjugation":
              g = "グループ撃退数報酬";
              b = a.groupBattleReward.subjugationRewardList;
              q = this.currentRepelIndex;
              break;
            case "emblem":
              g = "デイリーダメージ報酬";
              b = a.groupBattleReward.emblemRewardList;
              q = this.currentEmblemIndex;
              break;
            case "groupRanking":
              var g = "グループランキング報酬",
                l = e.split(",");
              b = f.filter(a.groupBattleReward.groupRankingRewardList, function(a)
              {
                for (var b = 0, c = !1; b < l.length;)
                {
                  if (-1 < a.groupGrade.indexOf(l[b]))
                  {
                    c = !0;
                    break
                  }
                  b = b + 1 | 0
                }
                return c
              });
              break;
            case "group":
              g = "所属グループ報酬";
              b = a.groupBattleReward.groupRewardList;
              break;
            case "memberRanking":
              g = "グループ内ランキング報酬", l = e.split(","), b = f.filter(a.groupBattleReward.memberRankingRewardList, function(a)
              {
                for (var b = 0, c = !1; b < l.length;)
                {
                  if (-1 < a.groupGrade.indexOf(l[b]))
                  {
                    c = !0;
                    break
                  }
                  b = b + 1 | 0
                }
                return c
              })
          }
          q && (h = 2 <= q ? q - 2 : q);
          a.doc.getElementById("rewardTitle").innerText = g;
          e = a.doc.getElementById("rewardInfoWrap");
          e.innerHTML = "";
          g = f.template($("#" + c + "InfoPartsTemp").text());
          e.innerHTML = g(d);
          t.style.display = "groupRanking" == c || "memberRanking" == c ? "block" : "none";
          a.doc.getElementById("rewardListWrap").className = c;
          this.trigger("removeChildView");
          if (b)
          {
            t = a.doc.getElementById("rewardList");
            E.prototype.rootView = this;
            E.prototype.type = c;
            E.prototype.template = f.template(a.doc.getElementById("RewardListPartsTemp").textContent);
            var p = a.doc.createDocumentFragment(),
              n = 1;
            f.each(b, function(b, e)
            {
              if ("groupRanking" == c || "memberRanking" == c) b.rankingStart = n, b.rankingEnd = b.ranking, n = b.ranking + 1;
              b = (new E(b)).render().el;
              b.dataset.scrollHash = e;
              e == q && a.addClass(b, "current");
              p.appendChild(b)
            }.bind(this));
            t.appendChild(p);
            a.scrollRefresh(null, null, !0);
            h && setTimeout(function()
            {
              a.forceScroll("rewardListWrap", "scrollInner", h, !0)
            }, 100);
            m.getBaseData(a.getNativeObj())
          }
        }
      },
      removeView: function()
      {
        this.trigger("removeChildView");
        this.off();
        this.remove()
      }
    }),
    E = n.View.extend(
    {
      className: "reward",
      initialize: function(a)
      {
        this.listenTo(this.rootView, "removeChildView", this.removeView);
        this.model = a
      },
      render: function()
      {
        this.$el.html(this.template(
        {
          model: this.model,
          type: this.type
        }));
        return this
      },
      removeView: function()
      {
        this.off();
        this.remove()
      }
    }),
    V = n.View.extend(
    {
      id: "selectDifficultyContainer",
      events: function()
      {
        var b = {};
        b[a.cgti + " #difficultyDecideBtn"] = this.decideBtn;
        return b
      },
      initialize: function(b)
      {
        a.androidKeyStop = !0;
        this.difficultyId = u;
        this.template = f.template(R);
        this.createDom()
      },
      render: function()
      {
        this.$el.html(this.template(d));
        return this
      },
      createDom: function()
      {
        a.doc.getElementById("overlapContainer").appendChild(this.render().el);
        a.doc.getElementById("curtain").className = "show";
        M.prototype.rootView = this;
        var b = a.doc.createDocumentFragment();
        f.each(d.difficultyList, function(a)
        {
          a = new M(a);
          b.appendChild(a.el)
        });
        this.el.getElementsByClassName("difficultySelectBtnList")[0].appendChild(b);
        a.addClass(a.doc.getElementById("bossBattleInfoWrap"), "hide")
      },
      decideBtn: function(b)
      {
        b.preventDefault();
        a.isScrolled() || (b = function(b)
        {
          u = this.difficultyId;
          a.doc.getElementById("curtain").className = "";
          a.removeClass(a.doc.getElementById("bossBattleInfoWrap"), "hide");
          this.removeView();
          h.changeScene("PAGE_BOSS")
        }.bind(this), p.ajaxPost(a.linkList.groupBattleDifficulty,
        {
          difficultyId: this.difficultyId
        }, b))
      },
      removeView: function()
      {
        a.androidKeyStop = !1;
        this.trigger("removeChildView");
        this.off();
        this.remove()
      }
    }),
    M = n.View.extend(
    {
      events: function()
      {
        var b = {};
        b[a.cgti] = this.select;
        return b
      },
      initialize: function(a)
      {
        this.listenTo(this.rootView, "deselect", this.deselect);
        this.listenTo(this.rootView, "removeChildView", this.removeView);
        this.model = a;
        this.createDom()
      },
      createDom: function()
      {
        var a = this.model.label;
        if (!u && 1 == this.model.difficultyId || u && this.model.difficultyId == u) a += " current", this.rootView.difficultyId = this.model.difficultyId,
          this.update();
        this.el.className = a
      },
      deselect: function()
      {
        $(this.el).removeClass("current")
      },
      select: function(b)
      {
        b.preventDefault();
        a.isScrolled() || (this.rootView.trigger("deselect"), this.rootView.difficultyId = this.model.difficultyId, a.addClass(b.currentTarget, "current"), this.update())
      },
      update: function()
      {
        var b = "";
        f.each(String(this.model.boss.level), function(a)
        {
          b += "<div class='num" + a + "'></div>"
        });
        this.rootView.el.getElementsByClassName("bossLevel")[0].innerHTML = b;
        this.rootView.el.getElementsByClassName("type_f")[0].className = "type_f " + this.model.boss.attributeId;
        var c = "";
        f.each(String(this.model.recommend), function(a)
        {
          c += "<div class='num" + a + "'></div>"
        });
        a.doc.getElementById("difficultyRecommend").innerHTML = c;
        a.doc.getElementById("difficultyDescription").innerHTML = this.model.description.replace(/＠/g, "<br>")
      },
      removeView: function()
      {
        this.off();
        this.remove()
      }
    }),
    W = n.View.extend(
    {
      id: "commonGroupBattlePatrs",
      events: function()
      {
        var b = {};
        b[a.cgti + " #helpBtn"] = this.helpPopup;
        b[a.cgti + " #debugBtn"] = this.debug;
        return b
      },
      initialize: function(a)
      {
        this.template = f.template(Q);
        this.createDom()
      },
      render: function()
      {
        this.$el.html(this.template(d));
        return this
      },
      createDom: function()
      {
        a.doc.getElementById("baseContainer").appendChild(this.render().el);
        this.groupBattleCommonMenu = a.doc.getElementById("groupBattleCommonMenu")
      },
      show: function()
      {
        a.removeClass(this.groupBattleCommonMenu, "hide")
      },
      hide: function()
      {
        a.addClass(this.groupBattleCommonMenu, "hide")
      },
      helpPopup: function(b)
      {
        b.preventDefault();
        a.isScrolled() || a.eventFirstNavi(["navi_01", "navi_02", "navi_03", "navi_04"], k.regularEventId, "groupBattle", null, !0, "regularEvent")
      },
      debug: function(b)
      {
        b.preventDefault();
        a.isScrolled() || h.firstCutin()
      }
    }),
    O = function()
    {
      N(d.groupMemberList);
      a.setStyle(S);
      m.startBgm(k.viewParameterMap.BGM);
      h.resultPopupFlag = d.dailyResult ? !0 : !1;
      var b = "PAGE_BOSS";
      "close" == v ? b = "PAGE_USER" : C && (b = "PAGE_RESULT");
      d.isFirstJoin ? p.ajaxPost(a.linkList.groupBattleJoin,
      {}, function(a)
      {
        "error" !== a.resultCode && (d.userRegularEventGroupBattle = {}, d.userRegularEventGroupBattle.groupId = a.groupId, d.dailyRankingList = {}, h.changeScene(b), "final" == v && h.firstCutin())
      }) : h.changeScene(b)
    },
    P = function()
    {
      a.groupBattleReward.gradeRewardList = f.sortBy(a.groupBattleReward.gradeRewardList, function(a, b)
      {
        return -a.requiredGp
      });
      a.groupBattleReward.subjugationRewardList = f.sortBy(a.groupBattleReward.subjugationRewardList, function(a, b)
      {
        return -a.subjugationCount
      });
      a.groupBattleReward.emblemRewardList = f.sortBy(a.groupBattleReward.emblemRewardList, function(a, b)
      {
        return -a.threshold
      });
      a.groupBattleReward.groupRankingRewardList = f.sortBy(a.groupBattleReward.groupRankingRewardList, function(a, b)
      {
        return a.ranking
      });
      a.groupBattleReward.memberRankingRewardList = f.sortBy(a.groupBattleReward.memberRankingRewardList, function(a, b)
      {
        return a.ranking
      });
      var b = function(b)
      {
        f.each(b, function(b)
        {
          b.rewardImgModel = [];
          var c = b.viewRewardCodes ? b.viewRewardCodes.split(",") : b.rewardCodes.split(",");
          f.forEach(c, function(c, d)
          {
            var e = c.split("_"),
              g = {};
            switch (e[0])
            {
              case "GIFT":
                g.quantity = e[e.length - 1];
                0 == d && (g.className = "main");
                g.nativeimgkey = "gift_" + e[1];
                g.imagePath = "gift/item_gift_" + e[1];
                break;
              case "TITLE":
                g.className = "userTitle_m";
                if (c = a.storage.titleList.findWhere(
                  {
                    id: parseInt(e[1])
                  })) c = c.toJSON(), g.titleName = c.name, g.titleBaseImage = c.baseImage;
                break;
              default:
                g.quantity = e[e.length - 1], e.shift(), e.pop(), 0 == d && (g.className = "main"), g.imagePath = (-1 < c.indexOf("EVENT_") ? "event" : "main") + "/" + e.join("_").toLowerCase()
            }
            b.rewardImgModel.push(g)
          })
        })
      };
      b(a.groupBattleReward.gradeRewardList);
      b(a.groupBattleReward.subjugationRewardList);
      b(a.groupBattleReward.emblemRewardList);
      b(a.groupBattleReward.groupRankingRewardList);
      b(a.groupBattleReward.groupRewardList);
      b(a.groupBattleReward.memberRankingRewardList)
    },
    N = function(b)
    {
      if (b)
      {
        var c = a.storage.gameUser.get("userId"),
          e = 0,
          t = b.length;
        for (d.sortedRankingList = f.sortBy(b, function(a, b)
          {
            return -a.totalDamage
          }); e < t;)
        {
          d.sortedRankingList[e].ranking = e + 1;
          if (b[e].userId == c)
          {
            b[e].isMyself = !0;
            d.regularEventGroupBattleUserGroup.personalRanking = e + 1;
            break
          }
          e = e + 1 | 0
        }
        d.sortedRankingList = f.filter(d.sortedRankingList, function(a, b)
        {
          return 100 > b || b >= e - 2 && b <= e + 2
        })
      }
    };
  h.groupNameChange = function(b)
  {
    b.preventDefault();
    if (!a.isScrolled())
    {
      b = f.template($("#groupNameChangePop").text());
      var c = a.doc.getElementsByClassName("groupName")[0].textContent;
      new a.PopupClass(
      {
        title: "グループ名変更",
        content: b(),
        closeBtnText: "閉じる",
        decideBtnText: "変更する",
        decideBtnEvent: function(b)
        {
          var c = a.doc.getElementById("changeName").value;
          p.ajaxPost(a.linkList.groupBattleBattleChangeGroupName,
          {
            groupId: d.userRegularEventGroupBattle.groupId,
            groupName: c
          }, function(b)
          {
            "error" !== b.resultCode && (d.regularEventGroupBattleUserGroup.name = c, a.doc.querySelector(".groupName").textContent = c, new a.PopupClass(
            {
              title: "グループ名変更",
              content: "グループ名の変更が完了しました。",
              closeBtnText: "閉じる",
              popupType: "typeC"
            }))
          })
        }
      }, null, function()
      {
        a.doc.getElementById("changeName").value = c;
        a.doc.getElementById("textCount").textContent = c.length;
        a.nativeKeyBoard("changeName", 10, null, "textCount")
      })
    }
  };
  h.firstCutin = function(a)
  {
    J.prototype.callback = a;
    new J
  };
  h.rewardPopup = function(b)
  {
    b.preventDefault();
    a.isScrolled() || (a.groupBattleReward ? new L : p.ajaxPost(a.linkList.groupBattleRewardList,
    {}, function(b)
    {
      a.groupBattleReward = b;
      P();
      new L
    }))
  };
  h.missionPopup = function(b)
  {
    b.preventDefault();
    a.isScrolled() || new U
  };
  h.battleLogPopup = function(b)
  {
    b.preventDefault();
    if (!a.isScrolled())
    {
      var c = b.currentTarget.dataset.userId ? b.currentTarget.dataset.userId : a.storage.gameUser.get("userId"),
        e = b.currentTarget.dataset.groupId ? b.currentTarget.dataset.groupId : d.userRegularEventGroupBattle.groupId,
        h = "",
        h = b.currentTarget.dataset.groupId ? b.currentTarget.dataset.userName : f.findWhere(d.sortedRankingList,
        {
          userId: c
        }).loginName;
      p.ajaxPost(a.linkList.groupBattleBattleLog,
      {
        groupId: e,
        userId: c
      }, function(a)
      {
        K.prototype.userName = h;
        new K(a)
      })
    }
  };
  h.clearMissionCount = function()
  {
    var b = a.doc.getElementById("missionBtnBatch");
    if (b)
    {
      var c = k.viewParameterMap.CHALLENGE_GROUP_ID,
        d = f.filter(a.storage.userLimitedChallengeList.toJSON(), function(a)
        {
          return a.challenge.groupId == c
        }),
        h = 0;
      f.each(d, function(a, b)
      {
        a.receivedAt || a.clearedCount >= a.challenge.count && h++
      });
      0 < h ? (b.innerText = h, a.addClass(b, "on")) : a.removeClass(b, "on")
    }
  };
  h.difficultyPopup = function(b)
  {
    b.preventDefault();
    a.isScrolled() || new V
  };
  h.changeScene = function(b, c)
  {
    a.tapBlock(!0);
    a.androidKeyStop = !0;
    a.ready.show();
    l && (l.removeView && l.removeView(), l.remove(), a.myScroll && a.scrollBarControl("destroy"), a.scrollArr || a.scrollArrX) && (a.scrollDestroy(), a.forceScrollFlag = !1);
    $(a.doc.getElementsByClassName("changePageBtn")).off(a.cgti);
    var e = function()
    {
      $(a.doc.getElementsByClassName("changePageBtn")).on(a.cgti, function(b)
      {
        b.preventDefault();
        a.isScrolled() || h.changeScene(b.currentTarget.dataset.pageid, b.currentTarget.dataset.backpageid)
      })
    };
    switch (b)
    {
      case "PAGE_USER":
        m.changeBg(k.viewParameterMap.BG_IMG + ".ExportJson");
        a.setGlobalView();
        z.prototype.gbCommon = h;
        z.prototype.pageJson = d;
        z.prototype.leaderModel = x;
        l = new z;
        e();
        break;
      case "PAGE_RANKING":
        m.changeBg(k.viewParameterMap.BG_IMG + ".ExportJson");
        a.setGlobalView();
        p.ajaxPost(a.linkList.groupBattleRankingList,
        {}, function(a)
        {
          "error" !== a.resultCode && (d = Object.assign(d, a), A.prototype.gbCommon = h, A.prototype.pageJson = d, A.prototype.leaderModel = x, l = new A(
          {
            backPageId: c
          }), e())
        });
        break;
      case "PAGE_BOSS":
        m.changeBg(k.viewParameterMap.BG_IMG + ".ExportJson");
        a.setGlobalView();
        p.ajaxPost(a.linkList.groupBattleBattleDetail,
        {
          groupId: d.userRegularEventGroupBattle.groupId
        }, function(b)
        {
          "error" !== b.resultCode && (d.userRegularEventGroupBattle = b.userRegularEventGroupBattle, a.groupDeckType = b.userRegularEventGroupBattle.deckType, b.regularEventGroupBattleUserGroup && (d.regularEventGroupBattleUserGroup = Object.assign(d.regularEventGroupBattleUserGroup, b.regularEventGroupBattleUserGroup)), N(b.groupMemberList), w && w.show(), a.BeforeGroupBattleDetailModel = a.GroupBattleDetailModel, a.GroupBattleDetailModel = b, d.battleDetailModel = b, p.ajaxPost(a.linkList.groupBattleRewardList,
          {}, function(b)
          {
            a.groupBattleReward = b;
            P();
            b = 0;
            for (var c = a.groupBattleReward.gradeRewardList.length; b < c;)
            {
              if (a.groupBattleReward.gradeRewardList[b].grade == d.userRegularEventGroupBattle.grade)
              {
                d.currentReward = a.groupBattleReward.gradeRewardList[b];
                break
              }
              b = b + 1 | 0
            }
            y.prototype.gbCommon = h;
            y.prototype.pageJson = d;
            y.prototype.leaderModel = x;
            y.prototype.difficultyId = u;
            y.prototype.nativeJson = H;
            l = new y;
            e()
          }))
        });
        break;
      case "PAGE_RESULT":
        a.globalMenuView && a.globalMenuView.trigger("removeView"), B.prototype.gbCommon = h, B.prototype.pageJson = d, B.prototype.nativeJson = H, l = new B, e()
    }
    m.getBaseData(a.getNativeObj());
    if (!G)
    {
      w || (w = new W);
      var f = function(b)
      {
        $(a.ready.content).off("webkitAnimationEnd");
        $(a.ready.content).on("webkitAnimationEnd", function(c)
        {
          "readyFadeIn" == c.originalEvent.animationName && (a.tapBlock(!1), a.androidKeyStop = !1, a.scrollRefresh(null, null, null, !0), b && (b(), b = null))
        })
      };
      setTimeout(function()
      {
        f(null)
      }, 300);
      G = !0
    }
    D && (a.eventFirstNavi(["navi_01", "navi_02", "navi_03", "navi_04"], k.regularEventId, "groupBattle", null, !0, "regularEvent"), D = !1);
    a.ready.hide()
  };
  var X = function(b, c, e)
  {
    e = !0;
    b || (e = !1);
    d.isFirstJoin || (e = !1);
    e ? ($(a.ready.target).off(), $(a.ready.target).on("webkitAnimationEnd", function()
    {
      m.changeBg("web_black.jpg");
      $(a.ready.target).off();
      $(a.ready.target).on("webkitAnimationEnd", function(b)
      {
        "readyFadeOut" == b.originalEvent.animationName && (a.ready.target.className = "")
      });
      p.ajaxPost(a.linkList.userQuestAdventureRegist,
      {
        adventureId: String(b)
      }, c)
    }), a.ready.target.classList.contains("preNativeFadeIn") ? $(a.ready.target).trigger("webkitAnimationEnd") : a.addClass(a.ready.target, "preNativeFadeIn")) : c()
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
      id: "userLimitedChallengeList",
      refresh: !0
    },
    {
      id: "userPatrolList"
    }],
    fetch: function(b)
    {
      m.endQuest();
      m.setWebView(!0);
      a.questNativeResponse && (a.responseSetStorage(a.questNativeResponse), H = a.questNativeResponse);
      a.supportUserList = null;
      a.questNativeResponse = null;
      a.questBattleModel = null;
      b && 0 < b && (C = b | 0);
      p.pageModelGet(this.needModelIdObj)
    },
    init: function()
    {
      a.clearSectionModel = null;
      a.clearChapterModel = null;
      a.historyArr = ["MyPage", "RegularEventGroupBattleTop"];
      d = p.getPageJson();
      d.isFirstJoin = d.userRegularEventGroupBattle ? !1 : !0;
      d.regularEventGroupBattleUserGroup || (d.regularEventGroupBattleUserGroup = {});
      k = f.findWhere(d.regularEventList,
      {
        regularEventType: "GROUPBATTLE"
      });
      k || (location.href = "#/MyPage");
      d.eventMaster = k;
      var b = Date.parse(d.currentTime),
        c = Date.parse(k.regularEventGroupBattle.preliminaryRoundStartAt),
        e = Date.parse(k.regularEventGroupBattle.preliminaryRoundEndAt),
        h = Date.parse(k.regularEventGroupBattle.finalRoundStartAt),
        g = Date.parse(k.regularEventGroupBattle.finalRoundEndAt);
      b > g ? v = "close" : b >= h ? v = "final" : b >= e ? location.href = "#/MyPage" : v = b >= c ? "preliminary" : "open";
      if (d.isFirstJoin)
      {
        b = function()
        {
          location.href = "#/MyPage"
        };
        c = a.getTimeText(k.endAt);
        if ("close" == v)
        {
          new a.PopupClass(
          {
            title: "キモチ戦",
            content: "キモチ戦は" + c + "に終了しました。",
            closeBtnText: "OK"
          }, null, null, b);
          a.tapBlock(!1);
          a.androidKeyStop = !1;
          return
        }
        if (!1 === d.entryCriteria)
        {
          new a.PopupClass(
          {
            title: "キモチ戦参加条件",
            content: "キモチ戦は" + c + "まで開催します。<br><br>キモチ戦に参加するには<br><span class='c_red'>" + k.regularEventCondition.description + "</span><br>している必要があります。",
            closeBtnText: "キャンセル",
            decideBtnText: "メインストーリー",
            decideBtnLink: "#/MainQuest"
          }, null, null, b);
          a.tapBlock(!1);
          a.androidKeyStop = !1;
          return
        }
      }
      T.createCardList();
      x = (x = a.storage.userCardListEx.findWhere(
      {
        id: a.storage.gameUser.get("leaderId")
      })) ? x.toJSON() : null;
      b = (b = a.storage.userItemList.findWhere(
      {
        itemId: "EVENT_GROUPBATTLE_" + k.regularEventId + "_COIN"
      })) ? b.get("quantity") : 0;
      d.shopItemQuantity = b;
      d.eventStatus = v;
      d.playedQuestBattleId = C;
      u = d.userRegularEventGroupBattle ? d.userRegularEventGroupBattle.difficultyId : null;
      var l = function()
      {
        a.eventFirstNavi(["navi_01", "navi_02", "navi_03", "navi_04"], k.regularEventId, "groupBattle", function()
        {
          O()
        }, !1, "regularEvent")
      };
      D = !1;
      var n = k.startStoryId;
      X(n, function(b)
      {
        b ? (a.responseSetStorage(b), $("#commandDiv").on("nativeCallback", function(b, c)
        {
          $("#commandDiv").off();
          m.setWebView(!0);
          a.tapBlock(!1);
          a.androidKeyStop = !1;
          a.ready.target.className = "nativeFadeOut";
          l()
        }), setTimeout(function()
        {
          m.setWebView(!1);
          m.startStory(n,
          {
            canAuto: !1,
            canOpenLog: !1
          });
          window.isBrowser && nativeCallback()
        }, 500)) : (a.tapBlock(!1), a.androidKeyStop = !1, d.isFirstJoin && (D = !0), O())
      })
    },
    remove: function(b)
    {
      l && (l.removeView && l.removeView(), l.remove(), l = null);
      w && (w.remove(), w = null);
      $(a.ready.content).off("webkitAnimationEnd");
      $(a.ready.content).on("webkitAnimationEnd", function(b)
      {
        "readyFadeIn" == b.originalEvent.animationName && (a.tapBlock(!1), a.scrollRefresh(null, null, null, !0))
      });
      C = v = G = u = x = null;
      m.stopEffect();
      m.hideMultiMiniChara();
      m.endL2d();
      a.removeBackHandler();
      b()
    }
  }
});
