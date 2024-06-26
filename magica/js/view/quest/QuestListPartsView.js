define("underscore backbone backboneCommon ajaxControl QuestUtil text!template/quest/QuestDetailPopup.html command js/quest/puellaHistoria/CreateModel".split(" "), function(k, g, a, p, l, q, h, m)
{
  return g.View.extend(
  {
    tagName: "li",
    className: function()
    {
      return "quest se_decide questBattleType" + this.model.questBattle.questBattleType
    },
    events: function()
    {
      var d = {};
      d[a.cgti + " .touchObj"] = this.questStart;
      d[a.cgti + " .treasure"] = this.popupQuestDetail;
      return d
    },
    initialize: function(a)
    {
      this.popupInitFlag = !1;
      this.listenTo(this.parentView, "removeView", this.removeView);
      this.model.rewardCodeArr = [];
      a = l.dropItemJson(this.model);
      a.firstClearReward && (this.model.firstClearReward = a.firstClearReward);
      a.firstClearRewardName && (this.model.firstClearRewardName = a.firstClearRewardName);
      a.firstClearRewardQuantity && (this.model.firstClearRewardQuantity = a.firstClearRewardQuantity);
      a.addDropItem && (this.model.addDropItem = a.addDropItem);
      a.addDropItemName && (this.model.addDropItemName = a.addDropItemName);
      a.addDropItemQuantity && (this.model.addDropItemQuantity = a.addDropItemQuantity);
      this.model.rewardCodeArr = a.list;
      this.model.rewardNameArr = a.nameList;
      this.model.rewardQuantityArr = a.quantityList
    },
    render: function()
    {
      var d = a.storage.user.get("loginName");
      this.$el.html(this.template(
      {
        model: this.model,
        userName: d
      }));
      if ("NORMAL" !== this.model.questBattle.consumeType) switch (this.model.questBattle.consumeType)
      {
        case "FREE_AT_NOT_CLEAR":
          this.model.cleared ? this.model.halfAp && (this.model.overwriteAp = this.model.halfAp, a.addClass(this.el, "HALF_AP")) : (this.model.overwriteAp = "0", a.addClass(this.el, this.model.questBattle.consumeType))
      }
      else this.model.campaignFreeAtNotClear ? (this.model.overwriteAp = 0, a.addClass(this.el, "FREE_AT_NOT_CLEAR")) : this.model.halfAp && (this.model.overwriteAp = this.model.halfAp, a.addClass(this.el, "HALF_AP"));
      this.model.dropUp && a.addClass(this.el, "DROP_UP");
      !this.model.cleared && this.model.questBattle.automationPossibleAtFirst && a.addClass(this.el, "AUTO_FIRST");
      this.model.questBattle.limitTurn && a.addClass(this.el, "limitTurn");
      this.el.dataset.scrollHash = this.model.questBattleId;
      return this
    },
    popupQuestDetail: function(d)
    {
      d.preventDefault();
      if (!a.isScrolled())
      {
        var e = k.template(q);
        d = d.currentTarget.parentNode.querySelector(".questTitle").textContent;
        new a.PopupClass(
        {
          title: d ? "クエスト情報　" + d : "クエスト情報",
          content: "",
          exClass: "questDetail"
        }, null, null, function() {});
        a.doc.getElementById("popupArea").getElementsByClassName("popupTextArea")[0].innerHTML = e(
        {
          model: this.model
        });
        a.scrollSet("dropListWrap", "dropList");
        $(".dropList img").on(a.cgti, function(b)
        {
          b.preventDefault();
          a.isScrolled() || (a.removeClass(a.doc.querySelector(".dropList .show"), "show"), setTimeout(function()
          {
            a.addClass(b.currentTarget.parentNode, "show")
          }, 10))
        });
        h.getBaseData(a.getNativeObj())
      }
    },
    questStart: function(d)
    {
      d.preventDefault();
      if (!a.isScrolled())
      {
        var e = this.parentView.modelSend(d);
        m.getIsPuellaHistoriaInfo(
        {
          sectionInfo: e
        }).isPuellaHistoria && (e = k.findWhere(a.storage.userSectionList.toJSON(),
        {
          sectionId: this.model.questBattle.sectionId
        }));
        if ("NONE" == this.model.questBattle.questBattleType) a.questStoryOnlyModel = {
          sectionModel: e,
          questBattleModel: this.model.questBattle
        }, location.href = "#/QuestStoryOnly";
        else
        {
          "HARD" == this.model.questBattle.questBattleType && "HARD" !== a.mainQuestMode && (a.mainQuestMode = "HARD");
          var b = e.section;
          this.model.questType = b.questType;
          this.model.chapterNoForView = b.chapterNoForView;
          this.model.genericIndex = b.genericIndex;
          this.model.title = b.title;
          this.model.battleTitle = d.currentTarget.parentNode.querySelector(".questTitle").textContent;
          this.model.userQuestAdventureList = p.getPageJson().userQuestAdventureList;
          b.secret && (this.model.secret = b.secret);
          e.eventObj && (this.model.eventObj = e.eventObj, this.model.eventObj.parameter = b.titleParameter ? b.titleParameter : b.parameter);
          if ("MAIN" !== b.questType && "SUB" !== b.questType && "CHARA" !== b.questType && "COSTUME" !== b.questType)
          {
            var c = d.currentTarget.parentNode.getElementsByClassName("questIndex").length ? d.currentTarget.parentNode.getElementsByClassName("questIndex")[0].dataset.questindex : 0,
              c = b.questBattleList ? b.questBattleList[c - 1] : e.questBattle ? e.questBattle : null;
            if (!c)
            {
              h.nativeReload("#/TopPage");
              return
            }
            "ITEM" == c.questBattle.consumeType ? (this.model.needItemNum = c.questBattle.needItemNum, this.model.useItemId = c.questBattle.useItemId) : this.model.ap = c.questBattle.ap;
            this.model.difficulty = c.questBattle.difficulty;
            this.model.canPlay = c.canPlay
          }
          else
          {
            this.model.ap = b.ap ? b.ap : this.model.questBattle.ap;
            this.model.difficulty = b.difficulty ? b.difficulty : this.model.questBattle.difficulty;
            if (c = m.getIsPuellaHistoriaInfo(
              {
                sectionInfo: e
              }).isPuellaHistoria) this.model.chapterNoForView = "-";
            "MAIN" == b.questType && b.chapter && b.chapter.partNo && !c && localStorage.setItem("MainQuestSelectPart", JSON.stringify(
            {
              selectPart: b.chapter.partNo
            }));
            "SUB" == b.questType && b.chapter && b.chapter.partNo && localStorage.setItem("SubQuestSelectPart", JSON.stringify(
            {
              selectPart: b.chapter.partNo
            }));
            "HARD" == a.mainQuestMode && "MAIN" == b.questType && this.model.questBattle && this.model.questBattle.ap && (this.model.ap = this.model.questBattle.ap, this.model.difficulty = this.model.questBattle.difficulty, this.model.mainQuestMode = "HARD")
          }
          a.questBattleModel = this.model;
          if (a.tutorialId) a.tutorialUtil[a.tutorialId]();
          else
          {
            if ("ENHANCEMENT_AROUSAL" === b.questType && "ALL" !== b.dayOfTheWeekQuestType && (b = a.getClientTime()) && e.endAt && !window.isLocal && "end" == a.periodCheck(b, e.endAt))
            {
              a.androidKeyStop = !0;
              new a.PopupClass(
              {
                title: "期間外",
                popupId: "periodError",
                content: "日付が変わったため<br>対象のクエストをプレイすることはできません",
                decideBtnText: "リロード",
                canClose: !1
              }, null, function()
              {
                $("#periodError .decideBtn").on(a.cgti, function(a)
                {
                  $("#periodError .decideBtn").off();
                  h.nativeReload("#/EventQuest")
                })
              });
              return
            }
            c = a.globalMenuView.getUserStatus();
            b = this.model.overwriteAp || 0 === this.model.overwriteAp ? Number(this.model.overwriteAp) : this.model.ap;
            c = c.ACP;
            if (b && c < b)
            {
              new a.PopupClass(
              {
                title: "クエスト確認",
                content: "APが不足しています",
                closeBtnText: "閉じる"
              });
              var g = this;
              a.globalMenuView.apPopup(d, "APが不足しています", function()
              {
                g.questStart(d)
              })
            }
            else
            {
              if (this.model.needItemNum && this.model.useItemId)
              {
                var c = a.storage.userItemList.findWhere(
                  {
                    itemId: this.model.useItemId
                  }),
                  b = this.model.needItemNum,
                  c = c ? c.toJSON().quantity : 0,
                  n = "クエストに必要なアイテムは<br>メイン・アナザー・魔法少女・曜日クエストの<br>各クエストで入手できます。";
                0 > this.model.useItemId.indexOf("DAILYTOWER") && (n = "クエストに必要なアイテムは<br>『アニメ2nd SEASON』放送期間中<br>毎週土曜日・日曜日に<br>ゲームにログインすることで入手できます。");
                if (c < b)
                {
                  new a.PopupClass(
                  {
                    title: "アイテムが足りません",
                    content: n,
                    closeBtnText: "閉じる",
                    popupType: "typeC"
                  });
                  return
                }
              }
              var f = "#/SupportSelect";
              this.model.questBattle.skipHelper && (a.questSupportModel = null, f = "#/DeckFormation/quest");
              e.nextPage && (a.questSupportModel = null, f = e.nextPage);
              this.model.questBattle.onlyCharaIds || this.model.questBattle.containCharaIds ? (e = l.charaConditionText(this.model.questBattle), new a.PopupClass(
              {
                title: "クエスト開始条件",
                popupId: "charaConditionPopup",
                content: e,
                decideBtnText: "OK",
                canClose: !1
              }, null, function()
              {
                $("#charaConditionPopup .decideBtn").on(a.cgti, function(a)
                {
                  $("#charaConditionPopup .decideBtn").off();
                  location.href = f
                })
              })) : (a.scrollMemory = this.model.questBattleId, location.href = f)
            }
          }
        }
      }
    },
    removeView: function()
    {
      this.trigger("removeView");
      this.off();
      this.remove()
    }
  })
});
