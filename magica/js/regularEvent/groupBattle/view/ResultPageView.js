define("underscore backbone backboneCommon ajaxControl command text!template/regularEvent/groupBattle/RegularEventGroupBattleResult.html text!css/regularEvent/groupBattle/RegularEventGroupBattleResult.css".split(" "), function(g, e, a, n, d, h, m)
{
  e.Model.extend();
  return e.View.extend(
  {
    events: function()
    {
      var c = {};
      c[a.cgti + " #touchScreen"] = this.touchScreen;
      c[a.cgti + " #turnInfoBtn"] = this.turnInfoBtn;
      c["webkitTransitionEnd .touchScreenStart"] = this.touchScreenStart;
      c["webkitAnimationEnd .touchScreenStart"] = this.touchScreenStart;
      c["webkitanimationend .touchScreenStart"] = this.touchScreenStart;
      c["animationend .touchScreenStart"] = this.touchScreenStart;
      return c
    },
    initialize: function(c)
    {
      a.setStyle(m);
      this.template = g.template(h);
      this.createDom()
    },
    render: function()
    {
      var c = this.pageJson,
        a = this.nativeJson,
        b = {};
      if (a && a.UserRegularEventGroupBattleResultList) b.isSimulate = "SIMULATE" == a.UserRegularEventGroupBattleResultList[0].groupBattleStatus, b.takeOverChargeCount = a.UserRegularEventGroupBattleResultList[0].takeOverChargeCount, b.takeOverMp = parseInt(a.UserRegularEventGroupBattleResultList[0].takeOverMp / 10), b.damage = a.UserRegularEventGroupBattleResultList[0].damage, b.bossBonus = (a.UserRegularEventGroupBattleResultList[0].gpRate / 1E3).toFixed(1), b.battleBonus = (a.UserRegularEventGroupBattleResultList[0].evaluationBonusRate / 1E3).toFixed(1), b.gp = a.UserRegularEventGroupBattleResultList[0].gp, b.medal = a.UserRegularEventGroupBattleResultList[0].medal, b.turnList = a.turnList, b.assistanceDamage = b.damage, g.each(b.turnList, function(a)
      {
        b.assistanceDamage -= a.totalDamage
      });
      else if (b.isSimulate = !1, b.takeOverChargeCount = 0, b.takeOverMp = 0, b.damage = 0, b.bossBonus = 0, b.battleBonus = 0, b.gp = 0, b.medal = 0, b.assistanceDamage = 0, window.isBrowser)
      {
        for (var a = [], f = 0; 6 > f; f++)
        {
          var d = {};
          d.totalDamage = 1E5 * (f + 1) + f;
          d.skillNum = 3 * (f + 1);
          for (var e = [], h = "RANGE_H RANGE_V CHARGE MPUP MAGIA DOPPEL RANGE_S RANGE_B".split(" "), k = 0; 3 > k; k++)
          {
            var l = {};
            l.charaId = 1E3 + f + 1;
            l.discType = h[f + k];
            e.push(l)
          }
          d.charaList = e;
          a.push(d)
        }
        b.turnList = a
      }
      c.resultModel = b;
      this.$el.html(this.template(c));
      return this
    },
    createDom: function()
    {
      a.content.append(this.render().el);
      this.playDamageCutin()
    },
    playDamageCutin: function(c)
    {
      d.changeBg(this.pageJson.eventMaster.viewParameterMap.BG_IMG + ".ExportJson");
      setTimeout(function()
      {
        d.startSe(1501)
      }, 500);
      var e = a.doc.getElementById("damageAnimationWrap");
      a.addClass(e, "show");
      setTimeout(function()
      {
        e && a.removeClass(e, "show");
        this.playResult()
      }.bind(this), 4500)
    },
    playResult: function(c)
    {
      d.changeBg("web_0025.ExportJson");
      setTimeout(function()
      {
        d.startSe(1601)
      }, 500);
      c = a.doc.getElementById("resultAnimationWrap");
      a.addClass(c, "show")
    },
    turnInfoBtn: function(c)
    {
      c.preventDefault();
      a.isScrolled() || (c = g.template($("#TurnInfoPartsTemp").text()), new a.PopupClass(
      {
        title: "ターン情報",
        content: c(),
        popupType: "typeB",
        popupId: "turnInfoPopup"
      }, null, function()
      {
        d.getBaseData(a.getNativeObj());
        a.scrollSet("scrollOuter", "scrollInner")
      }))
    },
    touchScreenStart: function(c)
    {
      a.removeClass(a.doc.getElementsByClassName("touch_screen")[0], "hide");
      a.removeClass(a.doc.getElementById("touchScreen"), "hide")
    },
    touchScreen: function(c)
    {
      c.preventDefault();
      a.isScrolled() || this.gbCommon.changeScene("PAGE_BOSS")
    },
    removeView: function()
    {
      this.off();
      this.remove()
    }
  })
});
