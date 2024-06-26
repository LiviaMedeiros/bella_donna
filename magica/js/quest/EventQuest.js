define("underscore backbone backboneCommon ajaxControl command QuestUtil text!template/quest/EventQuest.html text!css/quest/EventQuest.css text!css/quest/QuestCommon.css js/view/quest/QuestListPartsView js/view/quest/ClearAnimationsView".split(" "), function(e, y, a, p, g, l, z, A, B, u, F)
{
  function C()
  {
    var b = [];
    e.each(c.userSectionList, function(a)
    {
      var d = a.section.questType;
      "ENHANCEMENT_AROUSAL" == d && (a.section.questBattleList = [], e.each(c.userQuestBattleList, function(b)
      {
        a.section.sectionId === b.questBattle.sectionId && (b.questType = d, a.section.questBattleList.push(b))
      }), a.section.questBattleList.sort(function(b, a)
      {
        return b.questBattle.sectionIndex - a.questBattle.sectionIndex
      }), b.push(a))
    });
    return b
  }
  var n = null,
    m, c, h, q, r, t, k, E = y.View.extend(
    {
      events: function()
      {
        var b = {};
        b[a.cgti + " .missionBtn"] = this.missionToggle;
        b[a.cgti + " .questTitle"] = this.toggleOpen;
        b[a.cgti + " .weeklySchedulePopBtn"] = this.schedulePop;
        return b
      },
      initialize: function(b)
      {
        this.template = e.template(z);
        this.createDom()
      },
      render: function()
      {
        this.$el.html(this.template(p.getPageJson()));
        return this
      },
      createView: function()
      {
        k = [];
        h = {};
        e.each(this.sectionJsonArr, function(b, a)
        {
          "ENHANCEMENT_AROUSAL" === b.section.questType && (h[b.section.parameter] = b, e.each(b.section.questBattleList, function(a, d)
          {
            0 === d ? Array.prototype.push.apply(k, l.dropItemJson(a).list) : 0 < d && b.section.questBattleList[d - 1].cleared && Array.prototype.push.apply(k, l.dropItemJson(a).list)
          }))
        });
        u.prototype.parentView = this;
        u.prototype.template = e.template($("#QuestListParts").text());
        var b = {
            FIRE: "火属性",
            WATER: "水属性",
            TIMBER: "木属性",
            LIGHT: "光属性",
            DARK: "闇属性",
            ALL: "全属性",
            SPECIAL: "期間限定"
          },
          d;
        for (d in h)
        {
          h[d].weekText = b[d];
          var c = D(h[d], null, a.doc.getElementById("enhanceWrap" + d));
          a.doc.getElementsByClassName("enhanceQuest" + d)[0].appendChild(c)
        }
      },
      createDom: function()
      {
        var b = this;
        r = q = t = this.campaignData = null;
        c.campaignList && (this.campaignData = a.campaignParse(c.campaignList));
        this.campaignData && this.campaignData.FREE_AT_NOT_CLEAR && e.each(this.campaignData.FREE_AT_NOT_CLEAR.questType, function(b, a)
        {
          "ALL" == b && (t = !0)
        });
        this.campaignData && this.campaignData.HALF_AP && e.each(this.campaignData.HALF_AP.questType, function(b, a)
        {
          "ENHANCEMENT_AROUSAL" == b && (q = !0)
        });
        this.campaignData && this.campaignData.QUEST_DROP_FACTOR && e.each(this.campaignData.QUEST_DROP_FACTOR.questType, function(b, a)
        {
          "ENHANCEMENT_AROUSAL" == b && (r = !0)
        });
        this.sectionJsonArr = C();
        c.specialQuestObj = null;
        var d = e.find(this.sectionJsonArr, function(b)
        {
          return "SPECIAL" === b.section.parameter
        });
        if (d)
          for (var f = 0; f < d.section.questBattleList.length; f++)
          {
            var v = d.section.questBattleList[f];
            if (v && v.questBattle.useItemId)
            {
              c.specialQuestObj = {};
              f = v.questBattle.useItemId;
              c.specialQuestObj.useItemId = f;
              c.specialQuestObj.useItemImagePath = "/magica/resource/image_web/item/" + (-1 < f.indexOf("EVENT_") ? "event/" : "main/") + f.toLowerCase() + ".png";
              f = a.storage.userItemList.findWhere(
              {
                itemId: f
              });
              c.specialQuestObj.useItemQuantity = f ? f.get("quantity") : 0;
              switch (d.section.dayOfTheWeekQuestType)
              {
                case "MONDAY":
                  c.specialQuestObj.headerText = "月曜限定";
                  break;
                case "TUESDAY":
                  c.specialQuestObj.headerText = "火曜限定";
                  break;
                case "WEDNESDAY":
                  c.specialQuestObj.headerText = "水曜限定";
                  break;
                case "THURSDAY":
                  c.specialQuestObj.headerText = "木曜限定";
                  break;
                case "FRIDAY":
                  c.specialQuestObj.headerText = "金曜限定";
                  break;
                case "WEEKEND":
                  c.specialQuestObj.headerText = "土日限定";
                  break;
                default:
                  c.specialQuestObj.headerText = "期間限定"
              }
              break
            }
          }
        a.setGlobalView(
        {});
        a.content.append(this.render().el);
        g.setWebView();
        this.createView();
        this.campaignData.POINT_UP && !this.campaignData.POINT_UP.globalBadge && 0 < this.campaignData.POINT_UP.pointUpType.length && (d = a.doc.getElementById("questLinkBtnWrap"), -1 < this.campaignData.POINT_UP.pointUpType.indexOf("MAIN") && a.addClass(d.getElementsByClassName("main")[0], "pointUp"), -1 < this.campaignData.POINT_UP.pointUpType.indexOf("SUB") && (f = a.storage.gameUser.toJSON(), f.closeFunctions && -1 === f.closeFunctions.indexOf("ARENA") && a.addClass(d.getElementsByClassName("side")[0], "pointUp")), (-1 < this.campaignData.POINT_UP.pointUpType.indexOf("CHARA") || -1 < this.campaignData.POINT_UP.pointUpType.indexOf("COSTUME")) && a.addClass(d.getElementsByClassName("chara")[0], "pointUp"), (-1 < this.campaignData.POINT_UP.pointUpType.indexOf("COMPOSE") || -1 < this.campaignData.POINT_UP.pointUpType.indexOf("MATERIAL")) && a.addClass(d.getElementsByClassName("event")[0], "pointUp"));
        a.scrollSet("questLinkListWrap", "scrollInner");
        n && a.forceScrollPreset("questLinkListWrap", "scrollInner", n, !0);
        var w = 0;
        e.each(c.userSectionList, function(b, a)
        {
          "SUB" == b.section.questType && w++
        });
        w || (a.removeClass(a.doc.querySelector(".side"), "linkBtn"), a.addClass(a.doc.querySelector(".side"), "off"));
        g.getBaseData(a.getNativeObj());
        l.canPlayQuestNum();
        l.eventTabSwitch(c.eventList);
        b = this;
        g.weekQuestTopUnset();
        setTimeout(function()
        {
          b && b.dropsCommand(k)
        }, 300);
        a.ready.hide()
      },
      modelSend: function(b)
      {
        switch (b.currentTarget.parentNode.querySelector(".params .questType").dataset.questtype)
        {
          case "ENHANCEMENT_AROUSAL":
            return h[b.currentTarget.parentNode.querySelector(".params .questParam").dataset.questprm]
        }
      },
      missionToggle: function(b)
      {
        b.preventDefault();
        if (!a.isScrolled())
        {
          b = a.doc.querySelector("#questLinkListWrap");
          var d = a.doc.querySelector("#questLinkListWrap").className; - 1 !== d.indexOf("first") ? b.className = "second scrollInner" : -1 !== d.indexOf("second") && (b.className = "first scrollInner")
        }
      },
      toggleOpen: function(b)
      {
        b.preventDefault();
        !a.isScrolled() && b.currentTarget.parentNode.classList.contains("questLinkList") && (b.currentTarget.parentNode.classList.toggle("open"), g.startSe(1002), a.scrollRefresh())
      },
      schedulePop: function(b)
      {
        b.preventDefault();
        a.isScrolled() || new a.PopupClass(
        {
          popupType: "typeB",
          popupId: "schedulePop"
        }, $("#WeeklySchedule").text())
      },
      dropsCommand: function(b)
      {
        b = e.uniq(b);
        for (var a = b.length; 0 < a;) a = a - 1 | 0, -1 === b[a].indexOf("compose_") && -1 === b[a].indexOf("item_gift_") && b.splice(a, 1);
        var c = [];
        b = e.sample(b, 6);
        e.each(b, function(b, a)
        {
          a = b.split("_");
          b = -1 < b.indexOf("item_gift") ? "resource/image_native/gift/" + a[0] + "_" + a[1] + "_a_" + a[2] + ".png" : 4 > a.length ? "resource/image_native/item/" + a[0] + "_" + a[1] + "_" + a[2] + "_a.png" : "resource/image_native/item/" + a[0] + "_" + a[1] + "_" + a[2] + "_a_" + a[3] + ".png";
          c.push(b)
        });
        g.weekQuestTopSet(c);
        c = null
      }
    }),
    D = function(b, d, f)
    {
      var g = !1,
        h = !1,
        l = [],
        k, m = b.section.parameter;
      p.getPageJson().campaignList && (k = a.campaignParse(p.getPageJson().campaignList));
      e.each(b.section.questBattleList, function(a, d)
      {
        if ("SPECIAL" === m || !g || a.cleared)
        {
          switch (a.questBattle.sectionIndex)
          {
            case 1:
              a.questTitle = "BATTLE ◆ 初級";
              a.questClass = "初級";
              break;
            case 2:
              a.questTitle = "BATTLE ◆ 中級";
              a.questClass = "中級";
              break;
            case 3:
              a.questTitle = "BATTLE ◆ 上級";
              a.questClass = "上級";
              break;
            case 4:
              a.questTitle = "BATTLE ◆ 超級", a.questClass = "超級"
          }
          a.questBattle.title && (a.questTitle = a.questBattle.title, a.questClass = a.questBattle.title);
          switch (a.questType)
          {
            case "COMPOSE":
              a.questTypeText = "強化結界";
              break;
            case "MATERIAL":
              a.questTypeText = "覚醒結界";
              break;
            case "ENHANCEMENT_AROUSAL":
              a.questTypeText = "覚醒強化結界", a.parameter = b.section.parameter
          }
          l.push(a);
          a.cleared || (g = !0, h && n && (n = a.questBattleId));
          n == a.questBattleId && (h = !0)
        }
        a.weekText = b.weekText
      });
      ("SPECIAL" === m && 0 != c.specialQuestObj.useItemQuantity || "SPECIAL" !== m && (g || h)) && a.addClass(f, "open");
      l.sort(function(a, b)
      {
        return a.questBattle.sectionIndex > b.questBattle.sectionIndex ? -1 : a.questBattle.sectionIndex < b.questBattle.sectionIndex ? 1 : 0
      });
      var x = a.doc.createDocumentFragment();
      e.each(l, function(b, c)
      {
        b.missionRewardCode = a.itemSet(b.questBattle.missionRewardCode);
        b.chestColor = b.missionRewardCode.chestColor;
        if (!b.cleared && k.FREE_AT_NOT_CLEAR && k.FREE_AT_NOT_CLEAR.sectionIds && -1 < k.FREE_AT_NOT_CLEAR.sectionIds.indexOf(String(b.questBattle.sectionId))) b.campaignFreeAtNotClear = !0, b.overwriteAp = 0;
        else switch (b.questType)
        {
          case "ENHANCEMENT_AROUSAL":
            !b.cleared && t ? (b.campaignFreeAtNotClear = !0, b.overwriteAp = 0) : q && (b.halfAp = Math.ceil(b.questBattle.ap / 2), b.overwriteAp = Math.ceil(b.questBattle.ap / 2)), r && (b.dropUp = !0)
        }
        c = new u(
        {
          model: b
        });
        d && (c.parentView = d);
        c.el.dataset.scrollHash = b.questBattleId;
        x.appendChild(c.render().el)
      });
      return x
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
      id: "userDailyChallengeList"
    },
    {
      id: "userTotalChallengeList"
    },
    {
      id: "userLimitedChallengeList"
    },
    {
      id: "userQuestAdventureList"
    },
    {
      id: "userPatrolList"
    }],
    fetch: function(a)
    {
      n = a ? a : null;
      p.pageModelGet(this.needModelIdObj)
    },
    init: function()
    {
      a.setStyle(A + B);
      c = p.getPageJson();
      h = {};
      l.supportPickUp(c);
      m = new E;
      a.searchQuestGiftId = null
    },
    startCommand: function()
    {
      g.changeBg("web_0019.jpg");
      g.startBgm("bgm04_movie12")
    },
    remove: function(a)
    {
      m && m.remove();
      g.weekQuestTopUnset();
      k = t = r = q = h = c = m = n = null;
      a()
    }
  }
});
