define("underscore backbone backboneCommon ajaxControl command text!template/chara/CharaResult.html QuestUtil".split(" "), function(m, d, c, e, f, k, n)
{
  d.Model.extend();
  var p = function(a, b)
    {
      switch (a)
      {
        case "level":
          return b.after.level !== b.after.maxLevel ? "13" : "14";
        case "episode":
          return "15";
        case "limitBreak":
          if (1 == b.after.revision) return "16";
          if (2 == b.after.revision) return "17";
          if (3 == b.after.revision) return "18";
          break;
        case "magiaLevel":
          return "19";
        case "evolve":
          a = b.after.card.rank;
          if ("RANK_2" == a || "RANK_3" == a) return "20";
          if ("RANK_4" == a) return "21";
          if ("RANK_5" == a) return "22";
          if ("RANK_6" == a) return "23"
      }
    },
    l, g;
  e = d.View.extend(
  {
    id: "charaComposeResult",
    className: "show",
    events: function()
    {
      var a = {};
      a[c.cgti] = this.hideResult;
      return a
    },
    hideResult: function(a)
    {
      if (a && (a.preventDefault(), c.isScrolled())) return;
      if (!this.tapBlock)
        if (a = this.model.toJSON(), -1 === c.location.indexOf("Result") && (c.androidKeyStop = !1), "evolve" == a.type && "RANK_5" == a.after.card.rank && a.questArr && a.questArr[3])
        {
          var b = this;
          this.tapBlock = !0;
          this.model.set(
          {
            type: "doppelStory",
            silent: !0
          });
          this.messageView.removeView();
          this.messageView = new h(
          {
            model: this.model.toJSON()
          });
          $(this.el.querySelector(".resultMessageWrap")).append(this.messageView.render().el);
          g = setTimeout(function()
          {
            b.tapBlock = !1;
            b.autoFlag && b.hideResult()
          }, 2E3)
        }
      else this.removeView()
    },
    initialize: function(a, b, c)
    {
      this.tapBlock = !0;
      b && (this.closeFunction = b);
      this.autoFlag = c;
      this.listenTo(this.rootView, "remove", this.removeView);
      this.template = m.template(k)
    },
    render: function()
    {
      this.$el.html(this.template(
      {
        model: this.model.toJSON()
      }));
      var a = this;
      switch (this.model.toJSON().type)
      {
        case "episode":
          f.startSe(1607);
          break;
        default:
          f.startSe(1101)
      }
      l = setTimeout(function()
      {
        a.startVoice()
      }, 300);
      g = setTimeout(function()
      {
        a.tapBlock = !1;
        a.autoFlag && a.hideResult()
      }, 1E3);
      var b = [];
      if ("magiaLevel" == this.model.toJSON().type || "episode" == this.model.toJSON().type || "evolve" == this.model.toJSON().type)
      {
        var d = this.model.toJSON().after.charaId,
          e = this.model.toJSON().after.chara.name;
        this.model.toJSON().after.chara.title && (e += "(" + this.model.toJSON().after.chara.title + ")");
        c.storage.userSectionList.each(function(a)
        {
          if (a.toJSON().section.genericId == d && "CHARA" == a.toJSON().section.questType)
          {
            var c = {};
            a.toJSON().canPlay || (c.closeFlag = !0, c.openConditionList = n.openConditionJson(a.toJSON().section, e, "result"));
            b.push($.extend(a.toJSON(), c))
          }
        });
        b.sort(function(a, b)
        {
          return a.section.sectionId < b.section.sectionId ? -1 : a.section.sectionId > b.section.sectionId ? 1 : 0
        })
      }
      0 < b.length && this.model.set(
      {
        questArr: b,
        silent: !0
      });
      var k = this.model.toJSON();
      h.prototype.rootView = this;
      h.prototype.template = m.template($(this.el.querySelector("#MessageTemplate")).text());
      this.messageView = new h(
      {
        model: k
      });
      $(this.el.querySelector(".resultMessageWrap")).append(this.messageView.render().el);
      return this
    },
    startVoice: function()
    {
      var a = this.model.toJSON().type;
      if (a = p(a, this.model.toJSON())) a = "vo_char_" + this.model.toJSON().after.charaId + "_00_" + a, f.startVoice(a)
    },
    removeView: function()
    {
      clearTimeout(l);
      clearTimeout(g);
      g = l = null;
      this.messageView.removeView();
      f.stopVoice();
      this.closeFunction && this.closeFunction();
      this.off();
      this.remove()
    }
  });
  var h = d.View.extend(
  {
    id: "messageInner",
    className: "show",
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
  return e
});
