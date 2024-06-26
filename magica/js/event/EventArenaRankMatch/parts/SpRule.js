define("underscore backbone backboneCommon ajaxControl command text!template/event/EventArenaRankMatch/parts/SpRuleBtn.html text!template/event/EventArenaRankMatch/parts/SpRulePopup.html text!template/event/EventArenaRankMatch/parts/SpRuleListItem.html".split(" "), function(d, e, b, l, m, g, h, k)
{
  var a = {
    init: function(c)
    {
      a.model = c.model;
      a.pageJson = c.pageJson;
      a.SpRuleBtn = new a.viewBtn(
      {});
      return a
    }
  };
  a.viewBtn = e.View.extend(
  {
    events: function()
    {
      var a = {};
      a[b.cgti + " #openSpRulePopupBtn"] = this.tapBtn;
      return a
    },
    initialize: function(a)
    {
      this.template = d.template(g);
      b.doc.getElementById("openSpRulePopupBtnSec").appendChild(this.render().el)
    },
    render: function()
    {
      this.$el.html(this.template(
      {
        model: this.model
      }));
      return this
    },
    tapBtn: function(c)
    {
      c.preventDefault();
      b.isScrolled() || a.openPopup(
      {
        ruleList: a.model.specialRuleInfo.list
      })
    },
    removeView: function()
    {
      this.off();
      this.remove()
    }
  });
  a.openPopup = function(a)
  {
    var c = a.ruleList,
      f = a.callback;
    a = d.template(h);
    var e = d.template(k);
    new b.PopupClass(
    {
      title: "特殊ルール",
      content: a(
      {
        model: function()
        {
          var a = {
            list: ""
          };
          d.each(c, function(b, c, d)
          {
            a.list += e(
            {
              model:
              {
                text: b
              }
            })
          });
          return a
        }()
      }),
      closeBtnText: "OK",
      popupId: "EventArenaRankMatchSpRulePopup"
    }, null, function()
    {
      b.scrollSet("listWrap", "listScrollInner");
      b.EventArenaRankMatchPrm.isOpenPopup = !0
    }, function()
    {
      b.EventArenaRankMatchPrm.isOpenPopup = !1;
      b.EventArenaRankMatchPrm.openTimeOverPopup && b.EventArenaRankMatchPrm.openTimeOverPopup();
      f && f()
    })
  };
  a.removeView = function()
  {
    a.SpRuleBtn && a.SpRuleBtn.removeView()
  };
  return a
});
