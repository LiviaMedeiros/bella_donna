define("underscore backbone backboneCommon ajaxControl command text!template/arena/ArenaConfirm.html".split(" "), function(h, k, a, l, e, m)
{
  return k.View.extend(
  {
    tagName: "div",
    id: "confirmPopWrap",
    events: function()
    {
      var b = {};
      b[a.cgti + " #battleStartBtn"] = this.battleStart;
      b[a.cgti + " .closeBtn"] = this.removeView;
      return b
    },
    initialize: function()
    {
      this.listenTo(this.parentView.rootView, "removeView", this.removeView);
      this.template = h.template(m)
    },
    render: function()
    {
      var b = a.isRankingRunning(
      {
        eventList: this.model.eventList,
        regularEventList: this.model.regularEventList
      });
      this.$el.html(this.template(
      {
        model: this.model,
        rankingRun: b
      }));
      a.addClass(a.doc.getElementById("curtain"), "show");
      return this
    },
    battleStart: function(b)
    {
      b.preventDefault();
      if (!a.isScrolled() && !this.started)
      {
        var d = this;
        b = "BPが不足しています。";
        if ("SIMULATE" !== d.model.battleType && "CODE_MATCH" !== d.model.battleType)
        {
          var f = (Date.parse(new Date) / 1E3 | 0) - this.parentView.rootView.accessClientTime,
            f = this.parentView.rootView.accessServerTime + f;
          console.log("calcedCurrentTime", f);
          console.log("this.parentView.rootView.matchExpiredAt", this.parentView.rootView.matchExpiredAt);
          if (f >= this.parentView.rootView.matchExpiredAt)
          {
            new a.PopupClass(
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
                d.removeView();
                $(".decideBtn").off(a.cgti);
                location.href = "#/ArenaTop"
              })
            });
            return
          }
        }
        else b += "<br><br><br><span class='c_red'>※演習を行うにはBPを1以上所持している必要があります。</span>";
        if (1 > a.storage.userStatusList.findWhere(
          {
            statusId: "BTP"
          }).toJSON().point)
        {
          new a.PopupClass(
          {
            title: "エラー",
            content: b,
            closeBtnText: "閉じる",
            decideBtnText: "回復する"
          });
          var g = function(b)
          {
            b.preventDefault();
            a.isScrolled() || (a.doc.removeEventListener(a.cgti, g), d.parentView.rootView.infoView.bpCurePop(b))
          };
          a.doc.getElementById("popupArea").getElementsByClassName("decideBtn")[0].addEventListener(a.cgti, g)
        }
        else this.started = !0, this.parentView.rootView.infoView.timerStop(), this.startJson = {
          opponentUserId: this.model.userId,
          arenaBattleType: this.model.battleType,
          arenaBattleOpponentTeamType: this.model.arenaBattleOpponentTeamType
        }, "CODE_MATCH" === this.model.battleType && (this.startJson.code = this.model.code), a.battleEnemy = this.model.userId, window.isBrowser ? (console.log("startJson", this.startJson), a.arenaJson = this.startJson, e.sendCommand("ArenaStub," + JSON.stringify(this.startJson)), d.removeView()) : l.ajaxPost(a.linkList.arenaStart, this.startJson, function(b)
        {
          a.acpTimeCure && (clearInterval(a.acpTimeCure), a.acpTimeCure = null);
          $(a.ready.target).on("webkitAnimationEnd", function()
          {
            e.changeBg("web_black.jpg");
            $(a.ready.target).off("webkitAnimationEnd");
            $(a.ready.target).on("webkitAnimationEnd", function(b)
            {
              "readyFadeOut" == b.originalEvent.animationName && (a.ready.target.className = "")
            });
            var c = {};
            c.questId = b.userQuestBattleResultList[0].id;
            c.replayId = b.userQuestBattleResultList[0].replayId;
            c.resultUrl = "/magica/index.html#/ArenaResult";
            c.retireUrl = "FREE_RANK" === d.model.battleType ? "/magica/index.html#/ArenaFreeRank" : "SIMULATE" === d.model.battleType || "CODE_MATCH" === d.model.battleType ? "/magica/index.html#/ArenaSimulate" : "/magica/index.html#/ArenaRanking";
            c.tips = {
              type: 2
            };
            a.globalMenuView && a.globalMenuView.trigger("removeView");
            setTimeout(function()
            {
              e.setWebView(!1);
              $("#commandDiv").on("nativeCallback", function(b, c)
              {
                $("#commandDiv").off();
                c && c.webData && a.responseSetStorage(c.webData);
                location.href = "#/QuestBackground";
                d.removeView()
              });
              e.startArena(c)
            }, 500)
          });
          a.addClass(a.ready.target, "preNativeFadeIn")
        })
      }
    },
    removeView: function()
    {
      a.removeClass(a.doc.getElementById("curtain"), "show");
      a.arenaConfirmView = null;
      this.off();
      this.remove()
    }
  })
});
