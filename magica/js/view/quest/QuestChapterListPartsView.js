define("underscore backbone backboneCommon ajaxControl js/view/quest/QuestSectionListPartsView QuestUtil".split(" "), function(d, e, b, m, f, h)
{
  var k = [103306];
  return e.View.extend(
  {
    tagName: "li",
    id: function()
    {
      return "chapter_" + this.model.chapterId
    },
    className: "chapter scrollElm se_decide",
    events: function()
    {
      var a = {};
      a[b.cgti + " .chapterTitleWrap"] = this.titleTapFunc;
      return a
    },
    initialize: function(a)
    {
      this.listenTo(this.rootView, "removeView", this.removeView);
      this.listenTo(this.rootView, "modeToggle", this.removeView);
      this.listenTo(this.rootView, "appendComp", this.createSection)
    },
    render: function()
    {
      this.$el.html(this.template(
      {
        model: this.model
      }));
      this.el.setAttribute("id", "chapter_" + this.model.chapterId);
      if ("SINGLERAID" == this.model.chapter.chapterType || "BRANCH" == this.model.chapter.chapterType)
      {
        var a = "url(" + ("/magica/resource/image_web/page/quest/main/titleBg/bg_chapter_" + ("HARD" == b.mainQuestMode ? "challenge_" + this.model.chapterId : this.model.chapterId) + ".png") + ") left center no-repeat";
        this.el.querySelector(".chapterTitleWrap").style.background = a
      }
      return this
    },
    createSection: function()
    {
      this.sectionList = b.doc.getElementById("chapter_" + this.model.chapterId).getElementsByClassName("sectionList")[0];
      var a = this.model.sectionList;
      a.sort(function(a, b)
      {
        return a.section.genericIndex > b.section.genericIndex ? -1 : a.section.genericIndex < b.section.genericIndex ? 1 : 0
      });
      f.prototype.template = d.template($("#SectionParts").text());
      f.prototype.parentView = this;
      var g = b.doc.createDocumentFragment(),
        e = this.model.chapter.chapterNoForView;
      d.each(a, function(a, l)
      {
        var c = $.extend(a,
        {
          chapterNoForView: e
        });
        d.each(k, function(a, d, e)
        {
          if ("HARD" != b.mainQuestMode || a != c.sectionId) c.chestColor = h.clearRewardChestColor(c.section.clearReward), a = new f(
          {
            model: c
          }), g.appendChild(a.render().el), 0 !== l || c.cleared || (a.parentView.outline = c)
        })
      });
      this.sectionList.appendChild(g)
    },
    titleTapFunc: function(a)
    {
      a.preventDefault();
      if (!b.isScrolled()) switch (this.model.chapter.chapterType)
      {
        case "NORMAL":
          this.toggleChapter();
          break;
        case "SINGLERAID":
          this.singleRaidLink();
          break;
        case "BRANCH":
          this.branchLink()
      }
    },
    toggleChapter: function(a)
    {
      this.el.classList.toggle("open");
      d.each(this.el.querySelectorAll("li"), function(a)
      {
        a.classList.toggle("scrollElm")
      });
      this.rootView.listScroll.refresh()
    },
    singleRaidLink: function(a)
    {
      b.mainChapterId = this.model.chapterId;
      location.href = "#/MainQuestSingleRaid"
    },
    branchLink: function(a)
    {
      b.mainChapterId = this.model.chapterId;
      location.href = "#/MainQuestBranch"
    },
    removeView: function()
    {
      this.trigger("removeView");
      this.off();
      this.remove()
    }
  })
});
