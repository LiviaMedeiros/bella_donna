define("underscore backbone backboneCommon ajaxControl command js/event/EventWalpurgis/Utility text!template/event/EventWalpurgis/SubBossPopup.html text!template/event/EventWalpurgis/SubBossList.html".split(" "), function(e, h, b, k, q, l, m, n)
{
  var d, f, g;
  k = h.View.extend(
  {
    events: function()
    {
      return {}
    },
    initialize: function(a)
    {
      this.model = a.model;
      f = a._views;
      this.template = e.template(m);
      this.createDom()
    },
    render: function()
    {
      this.$el.html(this.template(
      {
        model: this.model
      }));
      return this
    },
    createDom: function()
    {
      var a = this;
      d = new b.PopupClass(
      {
        exClass: "SubBossPopup",
        popupType: "typeB",
        title: "クエスト選択",
        content: ""
      }, null, function()
      {
        $(".SubBossPopup .popupTextArea").append(a.render().el);
        var b = [10, 20, 30],
          d = ["Ⅰ", "Ⅲ", "Ⅴ"];
        e.each(a.model, function(a, c, e)
        {
          a.index = d[c];
          a.bossUseItemQuantity = b[c];
          f.SubBossPopupListView = new p(
          {
            model: a,
            _views: f
          })
        })
      }, null)
    },
    removeView: function()
    {
      d && d.remove();
      this.off();
      this.remove()
    }
  });
  var p = h.View.extend(
  {
    tagName: "li",
    events: function()
    {
      var a = {};
      a[b.cgti + " .decideBtn"] = this.questStart;
      return a
    },
    initialize: function(a)
    {
      this.model = a.model;
      this.template = e.template(n);
      this.createDom()
    },
    render: function()
    {
      this.$el.html(this.template(
      {
        model: this.model
      }));
      return this
    },
    createDom: function()
    {
      $(".SubBossPopup .questSelectSec").append(this.render().el)
    },
    questStart: function(a)
    {
      a && a.preventDefault();
      if (!b.isScrolled())
      {
        b.questSupportModel = null;
        var c;
        this && (g = c = this.model);
        g && (c = g);
        c.bossUseItemQuantity && (b.EventWalpurgisRaidPrm.bossUseItemQuantity = c.bossUseItemQuantity, l.setBossUseItemQuantity(
        {
          groupRaidPrm: b.EventWalpurgisRaidPrm
        }));
        l.startQuest(
        {
          battleType: "sub",
          questBattleModel: c,
          sectionModel: b.EventWalpurgisRaidPrm.sectionInfo,
          userQuestAdventureList: b.EventWalpurgisRaidPrm.userQuestAdventureList
        })
      }
    },
    removeView: function()
    {
      this.off();
      this.remove()
    }
  });
  return k
});
