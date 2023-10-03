define(["underscore", "backbone", "backboneCommon", "ajaxControl", "memoriaUtil"], function(l, n, d, p, g)
{
  return n.View.extend(
  {
    initialize: function()
    {
      this.listenTo(this.rootView, "remove", this.removeView);
      this.listenTo(this.model, "change", this.modelChange);
      this.template = l.template($("#StatusParts").text());
      this.beforeStatus = $("#beforeStatus");
      this.afterStatus = $("#afterStatus")
    },
    modelChange: function()
    {
      l.isEmpty(this.model.toJSON()) ? (this.beforeStatus.empty(), this.afterStatus.empty()) : (this.beforeStatusUpdate(), 0 < this.rootView.useMaterialView.selectMaterial.length && this.afterStatusUpdate())
    },
    beforeStatusUpdate: function()
    {
      var a = this.model.toJSON(),
        b = a.level,
        d = a.maxLevel > b ? g.parExArr[b] - a.experience : "MAX",
        b = g.getGuageLength(a.experience, b);
      this.beforeStatusRender(d, b, 4 < a.lbCount ? 4 : a.lbCount)
    },
    afterStatusUpdate: function()
    {
      var a = this.model.toJSON(),
        b = a.piece.rank,
        d = a.level,
        f = 4 < a.lbCount ? 4 : a.lbCount,
        h = a.maxLevel,
        e = this.rootView.useMaterialView.selectMaterial;
      if (0 === e.length) this.afterStatus.empty();
      else
      {
        var c = 0;
        if (4 > f)
        {
          for (var k = 0, m = e.length; k < m; k++) a.pieceId !== e[k].pieceId && "LIMIT_BREAK" !== e[k].piece.pieceKind || c++;
          0 < c && 4 < f + c && (c = 4 - f)
        }
        k = a.experience;
        e = g.getComposeExp(b, d, e, a) | 0;
        e = k + e;
        0 < c && (h = g.getMaxLevel(b, f + c));
        b = e + g.exArr[a.level - 1];
        k = 0;
        for (m = !0; m;) b >= g.exArr[a.level + k] ? k++ : m = !1;
        a = 0;
        d += k;
        h > d ? (a = b - g.exArr[d - 1], b = g.parExArr[d] - a) : (d = h, b = "MAX");
        this.afterStatusRender(d, h, a, b, f + c, e)
      }
    },
    beforeStatusRender: function(a, b, g)
    {
      this.beforeStatus.html(this.template(
      {
        model: this.model.toJSON()
      }));
      var f = d.doc.getElementById("beforeStatus");
      f.getElementsByClassName("nextExp")[0].textContent = a;
      a = Math.floor(b / 100 * 174);
      a = 174 < a ? 174 : a;
      f.getElementsByClassName("exp")[0].style.width = a + "px";
      a = this.model.toJSON();
      f.getElementsByClassName("statusHP")[0].textContent = a.hp;
      f.getElementsByClassName("statusATK")[0].textContent = a.attack;
      f.getElementsByClassName("statusDEF")[0].textContent = a.defense;
      f.getElementsByClassName("skill")[0].textContent = 4 == g ? a.piece.pieceSkill2.name : a.piece.pieceSkill.name
    },
    afterStatusRender: function(a, b, l, f, h)
    {
      var e = this.model.toJSON();
      this.afterStatus.html(this.template(
      {
        model: e,
        after: !0
      }));
      var c = d.doc.getElementById("afterStatus");
      c.getElementsByClassName("lv")[0].textContent = a;
      c.getElementsByClassName("maxLv")[0].textContent = b;
      h > e.lbCount && (d.addClass(c.getElementsByClassName("maxLv")[0], "c_red"), 4 == h && d.addClass(c.getElementsByClassName("skill")[0], "c_red"));
      0 < h && (c.getElementsByClassName("lbCount_3")[0].className = "lbCount_3 thisLb" + h);
      c.getElementsByClassName("nextExp")[0].textContent = f;
      b = Math.floor(174 * (g.getGuageLength(l, a) / 100));
      b = 174 < b ? 174 : b;
      c.getElementsByClassName("exp")[0].style.width = b + "px";
      b = g.getParam(e, a);
      a === e.level && (b.hp = e.hp, b.attack = e.attack, b.defense = e.defense);
      c.getElementsByClassName("statusHP")[0].textContent = b.hp;
      c.getElementsByClassName("statusATK")[0].textContent = b.attack;
      c.getElementsByClassName("statusDEF")[0].textContent = b.defense;
      c.getElementsByClassName("skill")[0].textContent = 4 == h ? e.piece.pieceSkill2.name : e.piece.pieceSkill.name;
      c.getElementsByClassName("skillImage")[0].src = d.doc.getElementById("beforeStatus").getElementsByClassName("skillImage")[0].src;
      (this.model.get("level") | 0) < a ? (d.addClass(c.getElementsByClassName("statusLvupIcon")[0], "show"), d.addClass(c.getElementsByClassName("lv")[0], "c_red"), d.addClass(c.getElementsByClassName("statusHP")[0], "c_red"), d.addClass(c.getElementsByClassName("statusATK")[0], "c_red"), d.addClass(c.getElementsByClassName("statusDEF")[0], "c_red")) : (d.removeClass(c.getElementsByClassName("statusLvupIcon")[0], "show"), d.removeClass(c.getElementsByClassName("lv")[0], "c_red"), d.removeClass(c.getElementsByClassName("statusHP")[0], "c_red"), d.removeClass(c.getElementsByClassName("statusATK")[0], "c_red"), d.removeClass(c.getElementsByClassName("statusDEF")[0], "c_red"))
    },
    removeView: function()
    {
      this.off();
      this.remove()
    }
  })
});
