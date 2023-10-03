define("underscore backbone backboneCommon ajaxControl command text!template/arena/ArenaFreeRank.html js/view/arena/ArenaPartsView js/view/arena/ArenaInfoPartsView".split(" "), function(h, m, a, g, f, n, k, l)
{
  return m.View.extend(
  {
    events: function()
    {
      var d = {};
      d[a.cgti + " .arenaReloadBtn"] = this.matchingReload;
      return d
    },
    initialize: function()
    {
      this.template = h.template(n);
      this.createDom()
    },
    render: function()
    {
      this.model = g.getPageJson();
      this.$el.html(this.template(
      {
        model: this.model
      }));
      return this
    },
    createDom: function()
    {
      a.content.append(this.render().el);
      this.matchExpiredAt = Date.parse(this.model.userArenaBattleMatch.expiredAt) / 1E3 | 0;
      this.accessServerTime = Date.parse(this.model.currentTime) / 1E3 | 0;
      this.accessClientTime = Date.parse(new Date) / 1E3 | 0;
      this.createView();
      a.setGlobalView();
      f.getBaseData(a.getNativeObj());
      a.arenaStoryPlay ? a.storage.gameUser.toJSON().closeFunctions && -1 < a.storage.gameUser.toJSON().closeFunctions.indexOf("ARENA") ? location.href = "#/ArenaTop" : (a.androidKeyStop = !0, this.arenaStory()) : a.storage.userQuestAdventureList.findWhere(
      {
        adventureId: a.storage.userArenaBattle.toJSON().currentFreeRankClass.storyId
      }) ? a.ready.hide() : location.href = "#/ArenaTop"
    },
    createView: function()
    {
      l.prototype.rootView = this;
      this.infoView = new l;
      a.doc.getElementById("bpGuageFreeRank").appendChild(this.infoView.render().el);
      this.createMattingList()
    },
    arenaStory: function()
    {
      var d = function()
      {
        $("#commandDiv").on("nativeCallback", function(c, b)
        {
          f.startBgm(a.bgm);
          f.changeBg(a.background);
          b && b.isSkipped && (c = {}, c.adventureId = String(a.storage.userArenaBattle.toJSON().currentFreeRankClass.storyId), g.ajaxPost(a.linkList.adventureSkip, c, function(c)
          {
            a.responseSetStorage(c)
          }));
          a.ready.target.className = "show";
          f.setWebView();
          a.ready.hide();
          $("#commandDiv").off();
          a.androidKeyStop = !1
        });
        var b = {
          adventureId: String(a.storage.userArenaBattle.toJSON().currentFreeRankClass.storyId)
        };
        g.ajaxPost(a.linkList.userQuestAdventureRegist, b, function(c)
        {
          "error" !== c.resultCode && (a.responseSetStorage(c), a.arenaStoryPlay = null, setTimeout(function()
          {
            f.setWebView(!1);
            f.startStory(String(a.storage.userArenaBattle.toJSON().currentFreeRankClass.storyId))
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
        d()
      });
      if (!window.isBrowser) a.addClass(a.ready.target, "preNativeFadeIn");
      else if (window.isBrowser)
      {
        var b = {
          adventureId: String(a.storage.userArenaBattle.toJSON().currentFreeRankClass.storyId)
        };
        g.ajaxPost(a.linkList.userQuestAdventureRegist, b, function(b)
        {
          "error" !== b.resultCode && (a.responseSetStorage(b), a.arenaStoryPlay = null)
        });
        a.androidKeyStop = !1;
        a.ready.hide()
      }
    },
    createMattingList: function()
    {
      var d = this,
        b = this.model.userArenaBattleMatch,
        e = [];
      if (b.opponentUserId1)
      {
        var c = {},
          c = b.opponentUserArenaBattleInfo1;
        c.userId = b.opponentUserId1;
        c.difficult = "HIGHER" === c.type ? 2 : "SAME" === c.type ? 1 : 0;
        c.battleType = b.arenaBattleType;
        e.push(c);
        c = null
      }
      b.opponentUserId2 && (c = {}, c = b.opponentUserArenaBattleInfo2, c.userId = b.opponentUserId2, c.difficult = "HIGHER" === c.type ? 2 : "SAME" === c.type ? 1 : 0, c.battleType = b.arenaBattleType, e.push(c), c = null);
      b.opponentUserId3 && (c = {}, c = b.opponentUserArenaBattleInfo3, c.userId = b.opponentUserId3, c.difficult = "HIGHER" === c.type ? 2 : "SAME" === c.type ? 1 : 0, c.battleType = b.arenaBattleType, e.push(c), c = null);
      e = h.sortBy(e, function(a)
      {
        return -1 * a.difficult
      });
      k.prototype.rootView = this;
      k.prototype.template = h.template($("#arenaParts").text());
      if (0 < e.length)
      {
        var f = a.doc.createDocumentFragment();
        h.each(e, function(a, c)
        {
          a.eventList = d.model.eventList;
          a.regularEventList = d.model.regularEventList;
          a = new k(a);
          f.appendChild(a.render().el)
        });
        a.doc.getElementById("matchingWrap").appendChild(f)
      }
      else a.doc.getElementById("matchingWrap").innerHTML = '<li class="nomatch">現在対戦可能な相手がいません<br>しばらくしてから再度来場ください</li>'
    },
    matchingReload: function(d)
    {
      d.preventDefault();
      if (!a.isScrolled())
      {
        var b = this.matchExpiredAt - this.accessServerTime - ((Date.parse(new Date) / 1E3 | 0) - this.accessClientTime);
        if (0 > b) new a.PopupClass(
        {
          title: "対戦相手の変更",
          content: "時間経過の為、対戦相手に変更がありました<br>ミラーズトップに戻ります",
          decideBtnText: "ミラーズトップへ",
          canClose: !1,
          popupType: "typeC"
        }, null, function()
        {
          $(".decideBtn").on(a.cgti, function(c)
          {
            c.preventDefault();
            a.isScrolled() || ($(".decideBtn").off(a.cgti), location.href = "#/ArenaTop")
          })
        });
        else
        {
          d = b / 60 | 0;
          b = b - 60 * d | 0;
          10 > b && (b = "0" + b);
          var e = this;
          this.reloadPop = new a.PopupClass(
          {
            title: "対戦相手の変更",
            content: "BPを1消費して対戦相手を変更しますか？<br>(対戦相手の再抽選まであと" + d + ":" + b + ")",
            closeBtnText: "閉じる",
            decideBtnText: "変更する",
            popupType: "typeC"
          }, null, function()
          {
            $(".decideBtn").on(a.cgti, function()
            {
              a.isScrolled() || ($(".decideBtn").off(), a.tapBlock(!0), e.reloadFunc())
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
      var d = this;
      if (0 < a.storage.userStatusList.findWhere(
        {
          statusId: "BTP"
        }).toJSON().point) g.ajaxPost(a.linkList.arenaReload,
      {
        arenaBattleType: "FREE_RANK"
      }, function(b)
      {
        a.responseSetStorage(b);
        d.reCreateView(b)
      });
      else
      {
        a.tapBlock(!1);
        new a.PopupClass(
        {
          title: "エラー",
          content: "BPが不足しています。",
          closeBtnText: "閉じる",
          decideBtnText: "回復する"
        });
        this.reloadPop = null;
        var b = function(e)
        {
          e.preventDefault();
          a.isScrolled() || (a.doc.removeEventListener(a.cgti, b), d.infoView.bpCurePop(e))
        };
        a.doc.getElementById("popupArea").getElementsByClassName("decideBtn")[0].addEventListener(a.cgti, b)
      }
    },
    reCreateView: function(d)
    {
      this.model.userArenaBattleMatch = d.userArenaBattleMatch;
      this.matchExpiredAt = Date.parse(this.model.userArenaBattleMatch.expiredAt) / 1E3 | 0;
      this.accessServerTime = Date.parse(this.model.userArenaBattleMatch.matchedAt) / 1E3 | 0;
      this.accessClientTime = Date.parse(new Date) / 1E3 | 0;
      this.trigger("resetListView");
      this.createMattingList();
      f.getBaseData(a.getNativeObj());
      this.infoView.afterReload(this.accessServerTime);
      this.reloadPop.remove();
      this.reloadPop = null;
      a.tapBlock(!1)
    },
    checkMatchingSpend: function(d)
    {
      this.matchExpiredAt > d ? (this.accessServerTime = d | 0, this.accessClientTime = Date.parse(new Date) / 1E3 | 0) : new a.PopupClass(
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
