define("underscore backbone backboneCommon ajaxControl text!template/quest/SubQuest.html js/view/quest/QuestChapterListPartsView text!template/quest/OutlinePopup.html command QuestUtil js/view/quest/ClearAnimationsView js/quest/scene0/Utility iscroll_stage".split(" "), function(g, t, a, m, u, k, v, e, l, n, w)
{
  var p = {
      2001: [2001, 2002, 2004, 2005, 2006],
      2002: [2002, 2004, 2005, 2006, 2001],
      2004: [2004, 2005, 2006, 2001, 2002],
      2005: [2005, 2006, 2001, 2002, 2004],
      2006: [2006, 2001, 2002, 2004, 2005]
    },
    q = !1,
    f;
  return t.View.extend(
  {
    events: function()
    {
      var b = {};
      b[a.cgti + " .mapDebugBtn"] = this.debugMapIcon;
      b[a.cgti + " #partToggle"] = this.partToggle;
      return b
    },
    initialize: function(a)
    {
      this.listenTo(this, "removeView", this.removeView);
      this.template = g.template(u);
      localStorage.getItem("SubQuestSelectPart") ? this.partNo = JSON.parse(localStorage.getItem("SubQuestSelectPart")).selectPart | 0 : (this.partNo = 1, localStorage.setItem("SubQuestSelectPart", JSON.stringify(
      {
        selectPart: 1
      })));
      console.log("SUB:this.partNo", this.partNo);
      this.createView()
    },
    render: function()
    {
      this.$el.html(this.template(m.getPageJson()));
      return this
    },
    createView: function()
    {
      a.content.append(this.render().el);
      a.addClassId("SubQuest", "season" + this.partNo);
      this.initFlag || a.setGlobalView();
      this.initFlag = !0;
      f = m.getPageJson();
      a.firstNaviCheck(f);
      var b = !1;
      f.campaignList && (b = a.campaignParse(f.campaignList));
      if (b.POINT_UP && !b.POINT_UP.globalBadge && 0 < b.POINT_UP.pointUpType.length)
      {
        var c = a.doc.getElementById("questLinkBtnWrap"); - 1 < b.POINT_UP.pointUpType.indexOf("MAIN") && a.addClass(c.getElementsByClassName("main")[0], "pointUp");
        if (-1 < b.POINT_UP.pointUpType.indexOf("SUB"))
        {
          var e = a.storage.gameUser.toJSON();
          e.closeFunctions && -1 === e.closeFunctions.indexOf("ARENA") && a.addClass(c.getElementsByClassName("side")[0], "pointUp")
        }(-1 < b.POINT_UP.pointUpType.indexOf("CHARA") || -1 < b.POINT_UP.pointUpType.indexOf("COSTUME")) && a.addClass(c.getElementsByClassName("chara")[0], "pointUp");
        (-1 < b.POINT_UP.pointUpType.indexOf("COMPOSE") || -1 < b.POINT_UP.pointUpType.indexOf("MATERIAL") || -1 < b.POINT_UP.pointUpType.indexOf("ENHANCEMENT_AROUSAL")) && a.addClass(c.getElementsByClassName("event")[0], "pointUp")
      }
      var d = {},
        h = this;
      g.each(f.userChapterList, function(a)
      {
        a.sectionList = [];
        a.halfAp = !1;
        b && b.HALF_AP && g.each(b.HALF_AP.questType, function(r, c)
        {
          "SUB" == r && (0 <= b.HALF_AP.chapterIds.indexOf(String(a.chapterId)) || 0 === b.HALF_AP.chapterIds.length) ? a.halfAp = !0 : "ALL" == r && (a.halfAp = !0)
        });
        g.each(f.userSectionList, function(b)
        {
          var c = w.getIsScene0Info(
          {
            section: b
          });
          a.chapterId !== b.section.genericId || "SUB" != b.section.questType || c.isScene0 || (b.chapterId = a.chapterId, b.section.questBattleList = [], g.each(f.userQuestBattleList, function(a)
          {
            b.section.sectionId === a.questBattle.sectionId && b.section.questBattleList.push(a)
          }), b.section.questBattleList.sort(function(a, b)
          {
            return a.questBattle.sectionIndex - b.questBattle.sectionIndex
          }), a.sectionList.push(b))
        });
        a.sectionList.length && (a.sectionList.sort(function(a, b)
        {
          return a.sectionId > b.sectionId ? -1 : a.sectionId < b.sectionId ? 1 : 0
        }), d[a.chapter.partNo] || (d[a.chapter.partNo] = []), d[a.chapter.partNo].push(a))
      });
      d[2] || a.addClassId("partToggleWrap", "none");
      g.each(d, function(a)
      {
        a.sort(function(a, b)
        {
          return a.chapter.chapterNo > b.chapter.chapterNo ? -1 : a.chapter.chapterNo < b.chapter.chapterNo ? 1 : 0
        })
      });
      k.prototype.template = g.template($("#ChapterParts").text());
      k.prototype.rootView = this;
      g.each(d, function(b)
      {
        var c = a.doc.createDocumentFragment();
        g.each(b, function(b, d)
        {
          var e = new k(
          {
            model: b
          });
          0 === d && b.chapter.partNo === h.partNo && (h.outline = b, b.cleared || (e.el.className = "chapter titleHide open"));
          b.halfAp && a.addClass(e.el, "halfAp");
          c.appendChild(e.render().el)
        });
        1 === b[0].chapter.partNo ? a.doc.getElementById("questList").appendChild(c) : a.doc.getElementById("questListSeason" + b[0].chapter.partNo).appendChild(c)
      });
      1 !== this.partNo && (a.addClassId("questListWrap", "hide"), a.removeClassId("questListWrapSeason2", "hide"));
      this.trigger("appendComp");
      this.createDom()
    },
    createDom: function()
    {
      if (1 === this.partNo)
      {
        var b = a.doc.querySelectorAll("#questListWrap .section")[0].querySelector(".prm_areaMapId").innerText;
        this.bgId = b;
        e.showSubQuestBg(p[b])
      }
      else if (2 === this.partNo)
      {
        var b = a.doc.querySelectorAll("#questListWrapSeason2 .section")[0].querySelector(".prm_secondLogo").innerText | 0,
          c = a.doc.querySelectorAll("#questListWrapSeason2 .section")[0].querySelector(".prm_secondText").innerText | 0;
        this.logoId = b;
        this.textId = c;
        e.showSubQuestBgPart2(
        {
          logoId: b,
          textId: c
        })
      }
      this.scrollListInit();
      l.canPlayQuestNum();
      l.eventTabSwitch(f.eventList);
      a.ready.hide();
      a.clearSectionModel && (b = a.clearSectionModel.section, c = l.clearRewardChestColor(b.clearReward), n.section(b.clearRewardCode, b, c, function()
      {
        a.clearChapterModel && (n.story(a.clearChapterModel.before, a.clearChapterModel.after), a.clearChapterModel = null)
      }), a.clearSectionModel = null);
      f.sectionOutline && !q && (this.outlinePopup(), q = !0)
    },
    partToggle: function(b)
    {
      b.preventDefault();
      a.isScrolled() || (1 === this.partNo ? (a.addClassId("questListWrap", "hide"), a.removeClassId("questListWrapSeason2", "hide"), this.partNo = 2) : 2 === this.partNo && (a.addClassId("questListWrapSeason2", "hide"), a.removeClassId("questListWrap", "hide"), this.partNo = 1), localStorage.setItem("SubQuestSelectPart", JSON.stringify(
      {
        selectPart: this.partNo
      })), 1 === this.partNo ? e.changeBg("web_0021.jpg") : 2 === this.partNo && e.changeBg("bg_adv_21075.jpg"), e.hideSubQuestBg(), this.questListReset())
    },
    questListReset: function()
    {
      this.trigger("modeToggle");
      1 === this.partNo ? (a.doc.querySelector("#questList").style = "", a.removeClass(a.doc.querySelector("#questList"), "allClear"), a.removeClass(a.doc.querySelector("#questList"), "challenge")) : (a.doc.querySelector("#questListSeason" + this.partNo).style = "", a.removeClass(a.doc.querySelector("#questListSeason" + this.partNo), "allClear"), a.removeClass(a.doc.querySelector("#questListSeason" + this.partNo), "challenge"));
      this.createView()
    },
    outlinePopup: function()
    {
      if (this.outline)
      {
        var b = $.extend(!0,
        {}, this.outline.sectionList[0].section);
        b.title = this.outline.sectionList[0].chapterNoForView + this.outline.sectionList[0].section.genericIndex + "話までのあらすじ";
        this.outline.sectionList[0].section.outline && (b.outline = this.outline.sectionList[0].section.outline.replace(/＠/g, "<br>"));
        new a.PopupClass(b, v);
        e.getBaseData(a.getNativeObj())
      }
      else console.log("全てのクエストをクリアしています。")
    },
    scrollListInit: function()
    {
      var b = 1 === this.partNo ? "#questListWrap" : "#questListWrapSeason2";
      this.listScroll = new IScroll(b,
      {
        tap: !0,
        click: !0,
        scrollFit: !0,
        deceleration: .003
      });
      this.listScroll.refresh();
      var c = this;
      this.listScroll.on("setNewPosition", function(f)
      {
        var d = a.doc.querySelectorAll(b + " .scrollElm")[this.listIndex];
        if (d)
          if (1 === c.partNo)
          {
            var h = d.querySelector(".prm_areaMapId").innerText;
            if (c.bgId && c.bgId !== h)
            {
              var k = !0;
              g.each(p[c.bgId], function(a, b)
              {
                console.log(a, b);
                if (h == a && 1 == b || h == a && 2 == b) k = !1
              });
              c.bgId = h;
              e.moveSubQuestBg(c.bgId, k)
            }
          }
        else f = d.querySelector(".prm_secondLogo") ? d.querySelector(".prm_secondLogo").innerText | 0 : null, d = d.querySelector(".prm_secondText") ? d.querySelector(".prm_secondText").innerText | 0 : null, f && d && c.logoId && c.textId && (c.logoId !== f || c.textId !== d) && (c.logoId = f, c.textId = d, e.moveSubQuestBgPart2(
        {
          logoId: f,
          textId: d
        }))
      })
    },
    removeView: function()
    {
      this.off();
      this.remove()
    }
  })
});
