define(["underscore", "backbone", "backboneCommon", "text!template/etc/RulePopup.html", "text!template/etc/ConsentRulesPopup.html"], function(h, k, a, e, f)
{
  var d = {
    init: function(a)
    {
      this.pageJson = a.pageJson;
      this.endCallback = a.endCallback;
      return d
    },
    consentPopup: function(d)
    {
      var b = this,
        g = new a.PopupClass(
        {
          title: "利用規約確認",
          content: f,
          canClose: !1,
          popupId: "ConsentRulesPopupSec"
        }, null, function()
        {
          $(a.doc.querySelector("#rulePopupBtn")).off();
          $(a.doc.querySelector("#gameStartBtn")).off();
          $(a.doc.querySelector("#rulePopupBtn")).on(a.cgti, function(c)
          {
            c && c.preventDefault();
            a.isScrolled() || b.rulePopup(c)
          });
          $(a.doc.querySelector("#gameStartBtn")).on(a.cgti, function(c)
          {
            c && c.preventDefault();
            a.isScrolled() || (c = a.consentRulesFunctions(
            {}), b.pageJson.currentTime && c.setTime(
            {
              currentTime: b.pageJson.currentTime
            }), g.remove(), b.endCallback())
          })
        })
    },
    rulePopup: function(d)
    {
      var b = this;
      d.preventDefault();
      a.isScrolled() || (new a.PopupClass(
      {
        title: "サービス利用規約",
        content: e,
        popupType: "typeB"
      }, null, function()
      {
        a.doc.getElementById("rulePolicyLink") && a.doc.getElementById("rulePolicyLink").addEventListener(a.cgti, function(b)
        {
          b.preventDefault();
          a.isScrolled() || a.isDoubleTouch() || cmd.browserOpen("http://www.aniplex.co.jp/help/privacy.html")
        })
      }, function()
      {
        b.consentPopup()
      }), a.scrollSet("rulesBase", "rulesPop"))
    }
  };
  return d
});
