define(["underscore", "backbone", "backboneCommon", "ajaxControl", "cardUtil"], function(m, n, h, p, c)
{
  var e = c.episodeExp;
  return n.View.extend(
  {
    tagName: "li",
    events: function()
    {
      var b = {};
      b[h.cgti] = this.cardSelect;
      return b
    },
    initialize: function(b)
    {
      this.model = b;
      this.listenTo(this.parentView, "removeChildView", this.removeView);
      this.listenTo(this.parentView, "skipTrigger", this.skipTrigger);
      this.listenTo(this.parentView, "showEpExp", this.showEpExp);
      this.model.afterModel.epRequire = c.getEpisodeExpRequire(this.model.afterModel)
    },
    render: function()
    {
      this.$el.html(this.template(
      {
        model: this.model.afterModel,
        isLeader: this.model.isLeader
      }));
      this.makeView();
      return this
    },
    makeView: function()
    {
      var b = this.model.afterModel.level,
        a = c.exArr[b - 1],
        f = this.model.afterModel.experience + a,
        d = this.model.beforeModel.experience,
        g = this.model.beforeModel.level,
        k = b - g,
        l = c.getMaxLevel(this.model.beforeModel.card.rank);
      0 < k && g < l && this.parentView.levelUpUnit.push([this.model.beforeModel, this.model.afterModel]);
      this.el.getElementsByClassName("unitLv")[0].textContent = g;
      g < l ? (this.parentView.unitExpBefore.push(Math.floor(d / (c.exArr[g] - c.exArr[g - 1]) * 100)), b === l ? this.parentView.unitExpAfter.push(100 * k) : this.parentView.unitExpAfter.push(Math.floor((f - a) / (c.exArr[b] - a) * 100 + 100 * k)), this.el.getElementsByClassName("getExNum")[0].textContent = "+" + (f - (d + c.exArr[g - 1])), this.el.getElementsByClassName("charaExGuage")[0].style.width = Math.floor(d / (c.exArr[g] - c.exArr[g - 1]) * 100) + "%") : (this.parentView.unitExpBefore.push(100), this.parentView.unitExpAfter.push(100), this.el.getElementsByClassName("charaExGuage")[0].style.width = "100%", this.el.getElementsByClassName("getExNum")[0].textContent = "+0");
      b = this.model.afterModel.bondsTotalPt;
      a = c.getEpisodeLevel(this.model.afterModel);
      f = this.model.beforeModel.bondsTotalPt;
      d = c.getEpisodeLevel(this.model.beforeModel);
      this.el.getElementsByClassName("epLvNum")[0].textContent = d;
      a > d && 1 < a && this.parentView.epUpUnit.push([this.model.afterModel, d, a]);
      5 > d ? (this.parentView.unitEpBefore.push(Math.floor((f - e[d - 1]) / (e[d] - e[d - 1]) * 100)), 5 === a ? this.parentView.unitEpAfter.push(100 * (a - d)) : this.parentView.unitEpAfter.push(Math.floor((b - e[a - 1]) / (e[a] - e[a - 1]) * 100 + 100 * (a - d))), this.el.getElementsByClassName("getEpExNum")[0].textContent = "+" + (b - f), this.el.getElementsByClassName("charaEpGuage")[0].style.width = Math.floor((f - e[d - 1]) / (e[d] - e[d - 1]) * 100) + "%") : (this.parentView.unitEpBefore.push(100), this.parentView.unitEpAfter.push(100), this.el.getElementsByClassName("getEpExNum")[0].textContent = "+0", this.el.getElementsByClassName("charaEpGuage")[0].style.width = "100%");
      this.eventCharaCheck(this.model.afterModel, h.questBattleModel) && h.addClass(this.el, "eventChara")
    },
    skipTrigger: function(b)
    {
      if ("exp" === b)
      {
        b = c.exArr[this.model.afterModel.level - 1];
        var a = this.model.afterModel.experience + b,
          f = c.getMaxLevel(this.model.beforeModel.card.rank);
        this.el.getElementsByClassName("unitLv")[0].textContent = this.model.afterModel.level;
        this.model.afterModel.level < f ? this.el.getElementsByClassName("charaExGuage")[0].style.width = Math.floor((a - b) / (c.exArr[this.model.afterModel.level] - b) * 100) + "%" : this.el.getElementsByClassName("charaExGuage")[0].style.width = "100%"
      }
      else "ep" === b && (b = this.model.afterModel.bondsTotalPt, a = c.getEpisodeLevel(this.model.afterModel), f = c.getEpisodeLevel(this.model.beforeModel), 5 > f ? (this.el.getElementsByClassName("epLvNum")[0].textContent = a, 4 < a ? this.el.getElementsByClassName("charaEpGuage")[0].style.width = "100%" : this.el.getElementsByClassName("charaEpGuage")[0].style.width = Math.floor(Math.floor((b - e[a - 1]) / (e[a] - e[a - 1]) * 100 + 100 * (a - f))) + "%") : this.el.getElementsByClassName("charaEpGuage")[0].style.width = "100%")
    },
    showEpExp: function()
    {
      0 !== this.model.afterModel.epRequire && h.addClass(this.el.getElementsByClassName("charaEpLeftWrap")[0], "on")
    },
    eventCharaCheck: function(b, a)
    {
      if (!(b.charaId && a && a.eventObj && a.eventObj.event && h.storage.gameUser) || h.storage.gameUser.toJSON().eventTrainingId !== a.eventObj.event.eventId) return !1;
      var c = !1,
        d = b.charaId;
      b = h.storage.gameUser.toJSON().trainingSelectedCharaNos.split(",");
      m.each(b, function(a)
      {
        d == a && (c = !0)
      });
      return c
    },
    removeView: function()
    {
      this.off();
      this.remove()
    }
  })
});
