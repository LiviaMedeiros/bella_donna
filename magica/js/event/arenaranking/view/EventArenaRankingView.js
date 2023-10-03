define("underscore backbone backboneCommon ajaxControl command text!template/arena/ArenaRanking.html js/event/arenaranking/view/EventArenaPartsView".split(" "), function(h, m, a, k, f, n, l)
{
  return m.View.extend(
  {
    events: function()
    {
      var b = {};
      b[a.cgti + " .arenaReloadBtn"] = this.matchingReload;
      b[a.cgti + " #rankingHelp"] = this.helpBtn;
      return b
    },
    initialize: function()
    {
      this.model = k.getPageJson();
      this.template = h.template(n);
      this.createDom()
    },
    render: function()
    {
      this.$el.html(this.template(
      {
        model: this.model,
        ranking: a.eventArenaRanking
      }));
      return this
    },
    createDom: function()
    {
      this.matchExpiredAt = Date.parse(this.model.userArenaBattleMatch.expiredAt) / 1E3 | 0;
      this.accessServerTime = Date.parse(this.model.currentTime) / 1E3 | 0;
      this.accessClientTime = Date.parse(new Date) / 1E3 | 0;
      var b;
      this.model.eventArenaRanking && (a.eventArenaRanking = this.model.eventArenaRanking);
      if (a.eventArenaRanking)
      {
        b = h.findWhere(this.model.eventList,
        {
          eventId: a.eventArenaRanking.eventId
        });
        var c = this.canPlayRanking();
        if (b && c)
        {
          a.content.append(this.render().el);
          this.createView();
          a.setGlobalView();
          f.getBaseData(a.getNativeObj());
          if (a.storage.userArenaBattle.toJSON().currentRankingTotalBattleCount)
          {
            var c = a.storage.gameUser.toJSON(),
              c = ("prelim" === a.eventArenaRanking.tarm ? a.eventArenaRanking.preliminaryRoundBattleCount : a.eventArenaRanking.finalRoundBattleCount) - c.remainBattleCountOfRanking + 1,
              e = c - 10 * (c / 10 | 0) | 0,
              d = a.doc.getElementById("rankingBattleStatus");
            switch (e)
            {
              case 3:
                a.addClass(d, "on");
                d.getElementsByClassName("battleCount")[0].innerText = c + "戦目";
                d.getElementsByClassName("pointMagni")[0].innerText = "×1.5";
                break;
              case 7:
                a.addClass(d, "on"), d.getElementsByClassName("battleCount")[0].innerText = c + "戦目", d.getElementsByClassName("pointMagni")[0].innerText = "×2"
            }
          }
          a.storage.userQuestAdventureList.findWhere(
          {
            adventureId: b.startStoryId
          }) ? a.ready.hide() : a.storage.gameUser.toJSON().closeFunctions && -1 < a.storage.gameUser.toJSON().closeFunctions.indexOf("ARENA") ? location.href = "#/ArenaTop" : (a.androidKeyStop = !0, this.arenaStory(b.startStoryId))
        }
        else location.href = "#/ArenaTop"
      }
      else location.href = "#/ArenaTop"
    },
    createView: function()
    {
      this.createMattingList()
    },
    helpBtn: function(b)
    {
      b.preventDefault();
      a.isScrolled() || a.eventFirstNavi(["navi_01", "navi_02", "navi_03", "navi_04"], a.eventArenaRanking.eventId, "arenaranking", function() {}, !0)
    },
    arenaStory: function(b)
    {
      var c = function()
      {
        $("#commandDiv").on("nativeCallback", function(c, d)
        {
          f.startBgm(a.bgm);
          f.changeBg(a.background);
          d && d.isSkipped && (c = {}, c.adventureId = String(b), k.ajaxPost(a.linkList.adventureSkip, c, function(b)
          {
            a.responseSetStorage(b)
          }));
          a.ready.target.className = "show";
          f.setWebView();
          a.ready.hide();
          $("#commandDiv").off();
          a.androidKeyStop = !1;
          a.eventFirstNavi(["navi_01", "navi_02", "navi_03", "navi_04"], a.eventArenaRanking.eventId, "arenaranking", function() {}, !0)
        });
        k.ajaxPost(a.linkList.userQuestAdventureRegist,
        {
          adventureId: String(b)
        }, function(c)
        {
          "error" !== c.resultCode && (a.responseSetStorage(c), a.arenaStoryPlay = null, setTimeout(function()
          {
            f.setWebView(!1);
            f.startStory(String(b),
            {
              canAuto: !1,
              canOpenLog: !1
            })
          }, 500))
        })
      };
      $(a.ready.target).on("webkitAnimationEnd", function()
      {
        $(a.ready.target).off("webkitAnimationEnd");
        $(a.ready.target).on("webkitAnimationEnd", function(b)
        {
          "readyFadeOut" == b.originalEvent.animationName && (a.ready.target.className = "")
        });
        f.changeBg("web_black.jpg");
        c()
      });
      window.isBrowser ? window.isBrowser && (k.ajaxPost(a.linkList.userQuestAdventureRegist,
      {
        adventureId: String(b)
      }, function(b)
      {
        "error" !== b.resultCode && (a.responseSetStorage(b), a.arenaStoryPlay = null)
      }), a.androidKeyStop = !1, a.ready.hide(), a.eventFirstNavi(["navi_01", "navi_02", "navi_03", "navi_04"], "common", "arenaranking", function() {})) : a.addClass(a.ready.target, "preNativeFadeIn")
    },
    createMattingList: function()
    {
      var b = this.model.userArenaBattleMatch,
        c = [],
        e = {
          I: 1,
          H: 1,
          G: 1,
          F: 1,
          E: 1.1,
          D: 1.15,
          C: 1.2,
          B: 1.2,
          A: 1.2
        };
      if (b.opponentUserId1)
      {
        var d = {},
          d = b.opponentUserArenaBattleInfo1;
        d.userId = b.opponentUserId1;
        d.difficult = e[d.arenaBattleOpponentTeamType];
        d.battleType = b.arenaBattleType;
        c.push(d);
        d = null
      }
      b.opponentUserId2 && (d = {}, d = b.opponentUserArenaBattleInfo2, d.userId = b.opponentUserId2, d.difficult = e[d.arenaBattleOpponentTeamType], d.battleType = b.arenaBattleType, c.push(d), d = null);
      b.opponentUserId3 && (d = {}, d = b.opponentUserArenaBattleInfo3, d.userId = b.opponentUserId3, d.difficult = e[d.arenaBattleOpponentTeamType], d.battleType = b.arenaBattleType, c.push(d), d = null);
      c = h.sortBy(c, function(a)
      {
        return -1 * a.difficult
      });
      l.prototype.rootView = this;
      l.prototype.template = h.template($("#arenaParts").text());
      if (0 < c.length)
      {
        var f = a.doc.createDocumentFragment();
        h.each(c, function(a, b)
        {
          a = new l(a);
          f.appendChild(a.render().el)
        });
        a.doc.getElementById("matchingWrap").appendChild(f)
      }
      else a.doc.getElementById("matchingWrap").innerHTML = '<li class="nomatch">現在対戦可能な相手がいません。<br>しばらくしてから再度来場ください。</li>',
        this.matchingNumber = c.length, console.log("matchingNumber:", this.matchingNumber)
    },
    matchingReload: function(b)
    {
      b.preventDefault();
      if (!a.isScrolled())
      {
        var c = a.storage.gameUser.toJSON(),
          e = this.matchExpiredAt - this.accessServerTime - ((Date.parse(new Date) / 1E3 | 0) - this.accessClientTime);
        if (0 > e) new a.PopupClass(
        {
          title: "対戦相手の変更",
          content: "時間経過の為、対戦相手に変更がありました<br>ミラーズトップに戻ります",
          decideBtnText: "ミラーズトップへ",
          canClose: !1,
          popupType: "typeC"
        }, null, function()
        {
          $(".decideBtn").on(a.cgti, function(b)
          {
            b.preventDefault();
            a.isScrolled() || ($(".decideBtn").off(a.cgti), location.href = "#/ArenaTop")
          })
        });
        else
        {
          b = e / 60 | 0;
          e = e - 60 * b | 0;
          10 > e && (e = "0" + e);
          var d = this;
          if (!c.remainReloadCountOfRanking || 1 > c.remainReloadCountOfRanking)
          {
            var c = function()
              {
                $("#decideUse").on(a.cgti, function(b)
                {
                  b.preventDefault();
                  a.isScrolled() || ($("#decideUse").off(a.cgti), k.ajaxPost(a.linkList.arenaRankingCureReloadCountOfRanking,
                  {
                    eventId: a.eventArenaRanking.eventId
                  }, function(b)
                  {
                    a.responseSetStorage(b);
                    b = b.gameUser.remainReloadCountOfRanking;
                    new a.PopupClass(
                    {
                      title: "対戦相手の変更(BP回復薬)",
                      content: "対戦回数を回復しました。<br>0　&#8594;　<span class='c_red'>" + b + "</span>",
                      popupType: "typeE",
                      popupId: "compReloadCountPopup",
                      closeBtnText: "OK"
                    });
                    a.doc.getElementById("reloadLeftNum").innerText = b
                  }))
                })
              },
              f = h.template($("#cureReloadCountPopupParts").text()),
              g = a.storage.userItemList.findWhere(
              {
                itemId: "CURE_BP"
              }),
              g = g ? g.get("quantity") : 0;
            new a.PopupClass(
            {
              title: "対戦相手の変更（BP回復薬）",
              content: f(
              {
                min: b,
                sec: e,
                quantity: g
              }),
              popupId: "cureReloadCountPopup",
              popupType: "typeE"
            }, null, c)
          }
          else 0 === this.matchingNumber ? new a.PopupClass(
          {
            title: "対戦相手の変更(無料)",
            content: "現在対戦可能な相手がいないため<br>変更を行うことができません。<br>もう１度本画面に入り直してください。",
            decideBtnText: "ミラーズトップへ",
            popupType: "typeC"
          }, null, function()
          {
            $(".decideBtn").on(a.cgti, function(b)
            {
              b.preventDefault();
              a.isScrolled() || ($(".decideBtn").off(a.cgti), location.href = "#/ArenaTop")
            })
          }) : this.reloadPop = new a.PopupClass(
          {
            title: "対戦相手の変更(無料)",
            content: "対戦相手を変更しますか？<br>(対戦相手の再抽選まであと" + b + ":" + e + ")",
            closeBtnText: "閉じる",
            decideBtnText: "変更する",
            popupType: "typeC"
          }, null, function()
          {
            $(".decideBtn").on(a.cgti, function()
            {
              a.isScrolled() || ($(".decideBtn").off(), a.tapBlock(!0), d.reloadFunc())
            })
          }, function()
          {
            $(".decideBtn").off()
          })
        }
      }
    },
    reloadFunc: function()
    {
      var b = this;
      k.ajaxPost(a.linkList.arenaReload,
      {
        arenaBattleType: "RANKING"
      }, function(c)
      {
        a.responseSetStorage(c);
        b.reCreateView(c);
        c = a.storage.gameUser.toJSON();
        a.doc.getElementById("reloadLeftNum").innerText = c.remainReloadCountOfRanking
      })
    },
    reCreateView: function(b)
    {
      this.model.userArenaBattleMatch = b.userArenaBattleMatch;
      this.matchExpiredAt = Date.parse(this.model.userArenaBattleMatch.expiredAt) / 1E3 | 0;
      this.accessServerTime = Date.parse(this.model.userArenaBattleMatch.matchedAt) / 1E3 | 0;
      this.accessClientTime = Date.parse(new Date) / 1E3 | 0;
      this.trigger("resetListView");
      this.createMattingList();
      f.getBaseData(a.getNativeObj());
      this.reloadPop.remove();
      this.reloadPop = null;
      a.tapBlock(!1)
    },
    canPlayRanking: function()
    {
      a.storage.userArenaBattle.toJSON();
      var b = a.storage.gameUser.toJSON(),
        c = Date.parse(this.model.currentTime),
        e = a.eventArenaRanking,
        d = Date.parse(e.preliminaryRoundStartAt),
        f = Date.parse(e.preliminaryRoundEndAt),
        g = Date.parse(e.finalRoundStartAt),
        e = Date.parse(e.finalRoundEndAt);
      return c >= d && c < f || !(c >= f && c < g || c >= e) && c >= g && c < e ? (b = b.remainBattleCountOfRanking, 0 < b ? !0 : !1) : !1
    },
    checkMatchingSpend: function(b)
    {
      this.matchExpiredAt > b ? (this.accessServerTime = b | 0, this.accessClientTime = Date.parse(new Date) / 1E3 | 0) : new a.PopupClass(
      {
        title: "対戦相手の変更",
        content: "時間経過の為、対戦相手に変更がありました<br>ミラーズトップに戻ります",
        decideBtnText: "ミラーズトップへ",
        canClose: !1,
        popupType: "typeC"
      }, null, function()
      {
        $(".decideBtn").on(a.cgti, function()
        {
          $(".decideBtn").off(a.cgti);
          location.href = "#/ArenaTop"
        })
      })
    },
    removeHandler: function()
    {
      this.trigger("removeView");
      this.off();
      this.remove()
    }
  })
});
