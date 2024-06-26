define("underscore backbone backboneCommon ajaxControl command QuestUtil text!template/quest/MainQuest.html js/view/quest/QuestChapterListPartsView text!template/quest/OutlinePopup.html js/view/quest/ClearAnimationsView js/quest/puellaHistoria/CreateModel js/quest/scene0/Utility iscroll_stage".split(" "), function(h, w, a, x, p, m, z, q, A, y, B, C)
{
  var r = 0,
    t = 0,
    n = 0,
    k, D = w.View.extend(
    {
      events: function()
      {
        var d = {};
        d[a.cgti + " .mapDebugBtn"] = this.debugMapIcon;
        d[a.cgti + " .modeToggleBtn"] = this.modeToggle;
        d[a.cgti + " #partToggle"] = this.partToggle;
        d[a.cgti + " #toPuellaHistoriaTopButton"] = this.toPuellaHistoriaTop;
        return d
      },
      initialize: function(d)
      {
        this.outline = {};
        this.questMode = a.mainQuestMode || "NORMAL";
        this.initFlag = !1;
        localStorage.getItem("MainQuestSelectPart") ? this.partNo = JSON.parse(localStorage.getItem("MainQuestSelectPart")).selectPart | 0 : (this.partNo = 1, localStorage.setItem("MainQuestSelectPart", JSON.stringify(
        {
          selectPart: 1
        })));
        this.listenTo(this, "removeView", this.removeView);
        this.template = h.template(z);
        this.createView()
      },
      render: function()
      {
        this.$el.html(this.template(x.getPageJson()));
        return this
      },
      modeToggle: function(d)
      {
        d.preventDefault();
        a.isScrolled() || (this.questMode = "HARD" == this.questMode ? "NORMAL" : "HARD", a.mainQuestMode = this.questMode, this.questListReset(), "HARD" == this.questMode ? (a.addClass(a.doc.querySelector("#modeToggleWrap"), "challenge"), 1 === this.partNo ? a.addClass(a.doc.querySelector("#questList"), "challenge") : a.addClass(a.doc.querySelector("#questListSeason" + this.partNo), "challenge")) : a.removeClass(a.doc.querySelector("#modeToggleWrap"), "challenge"))
      },
      partToggle: function(d)
      {
        d.preventDefault();
        a.isScrolled() || (1 === this.partNo ? (a.addClassId("questListWrap", "hide"), a.removeClassId("questListWrapSeason2", "hide"), a.mainQuestMode = this.questMode, this.partNo = 2) : 2 === this.partNo && (a.addClassId("questListWrapSeason2", "hide"), a.removeClassId("questListWrap", "hide"), a.mainQuestMode = this.questMode, this.partNo = 1), localStorage.setItem("MainQuestSelectPart", JSON.stringify(
        {
          selectPart: this.partNo
        })), this.questListReset())
      },
      toPuellaHistoriaTop: function(d)
      {
        d.preventDefault();
        a.isScrolled() || (location.href = "#/PuellaHistoriaTop")
      },
      questListReset: function()
      {
        this.trigger("modeToggle");
        1 === this.partNo ? (a.doc.querySelector("#questList").style = "", a.removeClass(a.doc.querySelector("#questList"), "allClear"), a.removeClass(a.doc.querySelector("#questList"), "challenge")) : (a.doc.querySelector("#questListSeason" + this.partNo).style = "", a.removeClass(a.doc.querySelector("#questListSeason" + this.partNo), "allClear"), a.removeClass(a.doc.querySelector("#questListSeason" + this.partNo), "challenge"));
        this.createView()
      },
      createView: function()
      {
        a.content.append(this.render().el);
        this.initFlag || a.setGlobalView();
        a.addClassId("QuestMap", "season" + this.partNo);
        k = x.getPageJson();
        t = r = 0;
        n = {};
        var d = {
            1: !1,
            2: !1
          },
          b = !1;
        k.campaignList && (b = a.campaignParse(k.campaignList));
        if (b.POINT_UP && !b.POINT_UP.globalBadge && 0 < b.POINT_UP.pointUpType.length)
        {
          var g = a.doc.getElementById("questLinkBtnWrap"); - 1 < b.POINT_UP.pointUpType.indexOf("MAIN") && a.addClass(g.getElementsByClassName("main")[0], "pointUp");
          if (-1 < b.POINT_UP.pointUpType.indexOf("SUB"))
          {
            var e = a.storage.gameUser.toJSON();
            e.closeFunctions && -1 === e.closeFunctions.indexOf("ARENA") && a.addClass(g.getElementsByClassName("side")[0], "pointUp")
          }(-1 < b.POINT_UP.pointUpType.indexOf("CHARA") || -1 < b.POINT_UP.pointUpType.indexOf("COSTUME")) && a.addClass(g.getElementsByClassName("chara")[0], "pointUp");
          (-1 < b.POINT_UP.pointUpType.indexOf("COMPOSE") || -1 < b.POINT_UP.pointUpType.indexOf("MATERIAL") || -1 < b.POINT_UP.pointUpType.indexOf("ENHANCEMENT_AROUSAL")) && a.addClass(g.getElementsByClassName("event")[0], "pointUp")
        }
        var f = {},
          l = this;
        h.each(k.userChapterList, function(a)
        {
          a.halfAp = !1;
          b && b.HALF_AP && h.each(b.HALF_AP.questType, function(c, d)
          {
            "MAIN" == c && (0 <= b.HALF_AP.chapterIds.indexOf(String(a.chapterId)) || 0 === b.HALF_AP.chapterIds.length) ? a.halfAp = !0 : "ALL" == c && (a.halfAp = !0)
          });
          a.sectionList = [];
          h.each(k.userSectionList, function(c, b)
          {
            b = B.getIsPuellaHistoriaInfo(
            {
              sectionInfo: c
            }).isPuellaHistoria;
            var u = C.getIsScene0Info(
            {
              section: c
            });
            if (a.chapterId !== c.section.genericId || "MAIN" != c.section.questType || b || u.isScene0) "SUB" == c.section.questType ? r++ : "CHARA" == c.section.questType && t++;
            else if (c.section.questBattleList = [], h.each(k.userQuestBattleList, function(b)
              {
                if (c.section.sectionId === b.questBattle.sectionId)
                {
                  if (l.questMode == b.questBattle.questBattleType)
                  {
                    var u = "CLEARED" === b.missionStatus2 ? "cleared" : null,
                      e = "CLEARED" === b.missionStatus3 ? "cleared" : null,
                      f = b.cleared ? "clear" : "new";
                    b.questState = "CLEARED" === b.missionStatus1 && u && e ? "comp" : f;
                    c.section.questBattleList.push(b)
                  }
                  "HARD" === b.questBattle.questBattleType && (d[a.chapter.partNo] = !0);
                  "NONE" == b.questBattle.questBattleType && (b.cleared && (b.questStateNONE = "comp"), c.section.questBattleList.push(b))
                }
              }), c.section.questBattleList.length)
            {
              c.section.questBattleList.sort(function(a, b)
              {
                return a.questBattle.sectionIndex - b.questBattle.sectionIndex
              });
              var e = !1,
                f = !1,
                g = 0;
              h.each(c.section.questBattleList, function(a, b)
              {
                "new" == a.questState && (e = !0);
                "clear" == a.questState && (f = !0);
                a.questStateNONE && "comp" == a.questStateNONE && g++
              });
              c.sectionState = "comp";
              e ? c.sectionState = "new" : f && (c.sectionState = "clear");
              c.sectionStateNONE = g == c.section.questBattleList.length ? "comp" : "";
              "HARD" == l.questMode ? c.cleared && a.sectionList.push(c) : (n[a.chapter.partNo] || (n[a.chapter.partNo] = 0), c.cleared && n[a.chapter.partNo]++, a.sectionList.push(c))
            }
          });
          a.sectionList.length && (a.sectionList.sort(function(a, b)
          {
            return a.sectionId > b.sectionId ? -1 : a.sectionId < b.sectionId ? 1 : 0
          }), f[a.chapter.partNo] || (f[a.chapter.partNo] = []), 0 < a.sectionList.length && f[a.chapter.partNo].push(a))
        });
        f[2] || a.addClassId("partToggleWrap", "none");
        d[this.partNo] && 0 !== n[this.partNo] || (a.doc.querySelector("#modeToggleWrap").style.display = "none");
        h.each(f, function(a)
        {
          a.sort(function(a, b)
          {
            return a.chapter.chapterNo > b.chapter.chapterNo ? -1 : a.chapter.chapterNo < b.chapter.chapterNo ? 1 : 0
          })
        });
        q.prototype.template = h.template($("#ChapterParts").text());
        q.prototype.rootView = this;
        h.each(f, function(b)
        {
          var d = a.doc.createDocumentFragment();
          h.each(b, function(b, c)
          {
            var e = new q(
            {
              model: b
            });
            0 === c && b.chapter.partNo === l.partNo && (l.outline = b, b.cleared || "HARD" === l.questMode || (e.el.className = "chapter titleHide open"), c = h.filter(b.sectionList, function(a)
            {
              return 0 == a.cleared
            }), 1 == b.sectionList[0].cleared && "HARD" !== l.questMode && 0 === c.length && 1 !== b.chapter.partNo && a.addClass(a.doc.querySelector("#questListSeason" + b.chapter.partNo), "allClear"));
            if ("SINGLERAID" == b.chapter.chapterType || "BRANCH" == b.chapter.chapterType) e.el.className = "chapter scrollElm typeSingleRaid se_decide";
            c = "comp";
            var f = !1,
              g = !1;
            h.each(b.sectionList, function(a)
            {
              "new" == a.sectionState && (f = !0);
              "clear" == a.sectionState && (g = !0);
              a.sectionStateNONE && "comp" == a.sectionStateNONE && (g = !1)
            });
            c = "comp";
            f ? c = "new" : g && (c = "clear");
            "new" !== c && b.chapter.sectionCount > b.sectionList.length && (c = null);
            c && a.addClass(e.el, c);
            b.halfAp && a.addClass(e.el, "halfAp");
            d.appendChild(e.render().el)
          });
          1 === b[0].chapter.partNo ? a.doc.getElementById("questList").appendChild(d) : a.doc.getElementById("questListSeason" + b[0].chapter.partNo).appendChild(d);
          d = null
        });
        v.prototype.template = h.template($("#ChapterTitleTemp").text());
        v.prototype.rootView = this;
        g = a.doc.createDocumentFragment();
        this.chapterTitleView = new v(
        {
          model:
          {
            chapterId: f[this.partNo][0].chapterId
          }
        });
        g.appendChild(this.chapterTitleView.render().el);
        a.doc.getElementById("content").appendChild(g);
        this.trigger("appendComp");
        g = null;
        1 !== this.partNo && (a.addClassId("questListWrap", "hide"), a.removeClassId("questListWrapSeason2", "hide"));
        "HARD" == this.questMode ? (a.addClass(a.doc.querySelector("#modeToggleWrap"), "challenge"), 1 === this.partNo ? a.addClass(a.doc.querySelector("#questList"), "challenge") : a.addClass(a.doc.querySelector("#questListSeason" + this.partNo), "challenge")) : a.removeClass(a.doc.querySelector("#modeToggleWrap"), "challenge");
        this.createDom()
      },
      createDom: function()
      {
        var d, b;
        1 === this.partNo ? (d = a.doc.getElementById("questListWrap").getElementsByClassName("section")[0].getElementsByClassName("mapPrm")[0], b = a.doc.getElementById("questListWrap").getElementsByClassName("section")[0].getElementsByClassName("extentionPrm")[0]) : (d = a.doc.getElementById("questListWrapSeason" + this.partNo).getElementsByClassName("section")[0].getElementsByClassName("mapPrm")[0], b = a.doc.getElementById("questListWrapSeason" + this.partNo).getElementsByClassName("section")[0].getElementsByClassName("extentionPrm")[0]);
        p.changeBg("bg_map_" + d.textContent + "." + b.textContent);
        this.scrollListInit();
        this.initFlag ? (p.getBaseData(a.getNativeObj()), m.canPlayQuestNum(), m.eventTabSwitch(k.eventList)) : (this.initFlag = !0, r || (a.removeClass(a.doc.querySelector(".side"), "linkBtn"), a.addClass(a.doc.querySelector(".side"), "off")), t || (a.removeClass(a.doc.querySelector(".chara"), "linkBtn"), a.addClass(a.doc.querySelector(".chara"), "off")), m.canPlayQuestNum(), m.eventTabSwitch(k.eventList), "HARD" == this.questMode ? (a.addClass(a.doc.querySelector("#modeToggleWrap"), "challenge"), 1 === this.partNo ? a.addClass(a.doc.querySelector("#questList"), "challenge") : a.addClass(a.doc.querySelector("#questListSeason" + this.partNo), "challenge")) : a.removeClass(a.doc.querySelector("#modeToggleWrap"), "challenge"), a.tutorialId && (a.doc.querySelector("#modeToggleWrap").style.display = "none", a.doc.querySelector("#toPuellaHistoriaTopButtonWrap").style.display = "none"), a.ready.hide(), a.clearSectionModel && (d = a.clearSectionModel.section, b = m.clearRewardChestColor(d.clearReward), y.section(d.clearRewardCode, d, b, function()
        {
          a.clearChapterModel && (y.story(a.clearChapterModel.before, a.clearChapterModel.after), a.clearChapterModel = null)
        }), a.clearSectionModel = null), k.sectionOutline && this.outlinePopup())
      },
      outlinePopup: function()
      {
        if (!a.tutorialId && this.outline)
        {
          var d = $.extend(!0,
          {}, this.outline.sectionList[0].section);
          d.title = this.outline.sectionList[0].chapterNoForView + this.outline.sectionList[0].section.genericIndex + "話までのあらすじ";
          this.outline.sectionList[0].section.outline && (d.outline = this.outline.sectionList[0].section.outline.replace(/＠/g, "<br>"));
          new a.PopupClass(d, A);
          p.getBaseData(a.getNativeObj())
        }
      },
      scrollListInit: function()
      {
        var d = 1 === this.partNo ? "#questListWrap" : "#questListWrapSeason" + this.partNo;
        this.listScroll = new IScroll(d,
        {
          tap: !0,
          click: !0,
          scrollFit: !0,
          deceleration: .003
        });
        this.listScroll.refresh();
        a.doc.querySelector("#QuestMap");
        var b = this;
        this.listScroll.on("setNewPosition", function(g)
        {
          var e = a.doc.querySelectorAll(d + " .scrollElm")[this.listIndex];
          if (e)
          {
            g = b.chapterTitleView.model.chapterId;
            var f = null;
            if (e)
              if (e.classList.contains("chapter"))
              {
                if (!e.querySelector(".param")) return;
                f = Number(e.querySelector(".param").textContent)
              }
            else
            {
              if (!e.parentNode.parentNode.querySelector(".param")) return;
              f = Number(e.parentNode.parentNode.querySelector(".param").textContent)
            }
            if (f)
            {
              var h = e.querySelector(".mapPrm"),
                e = e.querySelector(".extentionPrm");
              p.changeBg("bg_map_" + h.textContent + "." + e.textContent);
              f && g !== f && (b.chapterTitleView.model.chapterId = f, b.chapterTitleView.render())
            }
          }
        })
      },
      removeView: function()
      {
        this.off();
        this.remove()
      }
    }),
    v = w.View.extend(
    {
      id: "chapterTitleWrap",
      initialize: function(a)
      {
        this.listenTo(this.rootView, "removeView", this.removeView);
        this.listenTo(this.rootView, "change", this.render)
      },
      render: function()
      {
        this.$el.html(this.template(
        {
          model: this.model
        }));
        return this
      },
      removeView: function()
      {
        this.off();
        this.remove()
      }
    });
  return D
});
