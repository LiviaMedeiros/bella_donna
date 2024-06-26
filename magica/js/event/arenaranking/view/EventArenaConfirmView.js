define("underscore backbone backboneCommon ajaxControl command text!template/arena/ArenaConfirm.html".split(" "), function(f, g, a, h, d, k)
{
  return g.View.extend(
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
      this.template = f.template(k)
    },
    render: function()
    {
      this.$el.html(this.template(
      {
        model: this.model
      }));
      a.addClass(a.doc.getElementById("curtain"), "show");
      return this
    },
    battleStart: function(b)
    {
      b.preventDefault();
      if (!a.isScrolled() && !this.started)
      {
        var e = this;
        b = (Date.parse(new Date) / 1E3 | 0) - this.parentView.rootView.accessClientTime;
        b = this.parentView.rootView.accessServerTime + b;
        b >= this.parentView.rootView.matchExpiredAt ? new a.PopupClass(
        {
          title: "対戦相手の変更",
          content: "時間経過の為、対戦相手に変更がありました。<br>ミラーズトップに戻ります",
          decideBtnText: "ミラーズトップへ",
          canClose: !1,
          popupType: "typeC"
        }, null, function()
        {
          $(".decideBtn").on(a.cgti, function()
          {
            e.removeView();
            $(".decideBtn").off(a.cgti);
            location.href = "#/ArenaTop"
          })
        }) : b >= (a.eventArenaRanking.tarmEnd / 1E3 | 0) ? new a.PopupClass(
        {
          title: "対戦可能時間外",
          content: "時間経過の為、対戦可能時間を超過しました。<br>ミラーズトップに戻ります",
          decideBtnText: "ミラーズトップへ",
          canClose: !1,
          popupType: "typeC"
        }, null, function()
        {
          $(".decideBtn").on(a.cgti, function()
          {
            e.removeView();
            $(".decideBtn").off(a.cgti);
            location.href = "#/ArenaTop"
          })
        }) : (this.started = !0, this.startJson = {
          opponentUserId: this.model.userId,
          arenaBattleType: this.model.battleType,
          arenaBattleOpponentTeamType: this.model.arenaBattleOpponentTeamType
        }, a.battleEnemy = this.model.userId, window.isBrowser ? (a.arenaJson = this.startJson, d.sendCommand("ArenaStub," + JSON.stringify(this.startJson)), e.removeView()) : h.ajaxPost(a.linkList.arenaStart, this.startJson, function(b)
        {
          a.acpTimeCure && (clearInterval(a.acpTimeCure), a.acpTimeCure = null);
          $(a.ready.target).on("webkitAnimationEnd", function()
          {
            d.changeBg("web_black.jpg");
            $(a.ready.target).off("webkitAnimationEnd");
            $(a.ready.target).on("webkitAnimationEnd", function(b)
            {
              "readyFadeOut" == b.originalEvent.animationName && (a.ready.target.className = "")
            });
            var c = {};
            c.questId = b.userQuestBattleResultList[0].id;
            c.replayId = b.userQuestBattleResultList[0].replayId;
            c.resultUrl = "/magica/index.html#/EventArenaRankingResult";
            c.retireUrl = "/magica/index.html#/EventArenaRankingTop";
            c.tips = {
              type: 2
            };
            a.globalMenuView && a.globalMenuView.trigger("removeView");
            setTimeout(function()
            {
              d.setWebView(!1);
              $("#commandDiv").on("nativeCallback", function(b, c)
              {
                $("#commandDiv").off();
                c && c.webData && a.responseSetStorage(c.webData);
                location.href = "#/QuestBackground";
                e.removeView()
              });
              d.startArena(c)
            }, 500)
          });
          a.addClass(a.ready.target, "preNativeFadeIn")
        }))
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
