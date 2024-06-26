define(["underscore", "backbone", "backboneCommon", "js/view/chara/CharaDetailView", "command"], function(k, l, c, m, g)
{
  var a, n = l.Model.extend();
  c.ua.android && c.doc.addEventListener("touchmove", function()
  {
    clearTimeout(c.popupTimerObj)
  }, !0);
  var h = function()
  {
    a.cardArr = [];
    a.cardArr.push(
    {
      attributeId: a.card.attributeId,
      cardId: a.chara.defaultCardId,
      rank: a.chara.defaultCard.rank,
      rankNum: a.chara.defaultCard.rank.split("_")[1],
      openFlag: !0,
      currentCardFlag: a.displayCardId == a.chara.defaultCardId ? !0 : !1,
      currentCommandFlag: a.commandVisualId == a.chara.defaultCardId ? !0 : !1,
      illustrator: a.card.illustrator
    });
    for (var d = 0, b = Number(a.card.rank.split("_")[1]); 5 > d;)
    {
      if (a.chara["evolutionCardId" + (d + 1)])
      {
        var f = Number(a.chara["evolutionCard" + (d + 1)].rank.split("_")[1]),
          e = {};
        e.attributeId = a.card.attributeId;
        e.cardId = a.chara["evolutionCardId" + (d + 1)];
        e.rank = a.chara["evolutionCard" + (d + 1)].rank;
        e.rankNum = a.chara["evolutionCard" + (d + 1)].rank.split("_")[1];
        e.openFlag = f <= b ? !0 : !1;
        e.currentCardFlag = a.displayCardId == a.chara["evolutionCardId" + (d + 1)] ? !0 : !1;
        e.currentCommandFlag = a.commandVisualId == a.chara["evolutionCardId" + (d + 1)] ? !0 : !1;
        e.illustrator = a.card.illustrator;
        a.cardArr.push(e)
      }
      d = d + 1 | 0
    }
    k.each(a.cardArr, function(b)
    {
      b.currentCardFlag && (a.illustrator = b.illustrator)
    });
    g.hideMiniChara();
    k.each(c.doc.querySelector("#baseContainer").children, function(a)
    {
      c.addClass(a, "hide")
    });
    c.detailView = new m(
    {
      model: new n(a)
    });
    c.doc.querySelector("#baseContainer").appendChild(c.detailView.render().el);
    c.scrollSet("hiddenWrap", "scrollInner");
    g.startSe(1002);
    g.getBaseData(c.getNativeObj())
  };
  return {
    cardDetailPopup: function(d, b, f)
    {
      !b.rentalMemoriaUse && b.isNpc || c.tutorialId || (clearTimeout(c.popupTimerObj), c.popupTimerObj = setTimeout(function()
      {
        if (!c.isScrolled())
        {
          if (c.ua.android)
          {
            var e = c.doc.body.scrollTop;
            if (30 < e - c.g_window_posY || -30 > e - c.g_window_posY) return
          }
          d.preventDefault();
          d.stopPropagation();
          a = b;
          a.closeEvent = f ? f : null;
          h()
        }
      }, 800))
    },
    shopCardDetailPopup: function(d, b, f)
    {
      clearTimeout(c.popupTimerObj);
      c.popupTimerObj = setTimeout(function()
      {
        if (!c.isScrolled())
        {
          if (c.ua.android)
          {
            var e = c.doc.body.scrollTop;
            if (30 < e - c.g_window_posY || -30 > e - c.g_window_posY) return
          }
          d.preventDefault();
          d.stopPropagation();
          b.isShop = !0;
          b.customizeBonus = {
            HP: "+0%",
            ATTACK: "+0%",
            DEFENSE: "+0%",
            ACCEL: "+0%",
            BLAST: "+0%",
            CHARGE: "+0%"
          };
          b.charaType = {
            BALANCE: "バランス",
            ATTACK: "アタック",
            DEFENSE: "ディフェンス",
            MAGIA: "マギア",
            HEAL: "ヒール",
            SUPPORT: "サポート",
            ULTIMATE: "アルティメット",
            CIRCLE_MAGIA: "円環マギア",
            CIRCLE_SUPPORT: "円環サポート",
            EXCEED: "エクシード",
            AKUMA: "あくま",
            ARUTEMETTO: "あるてぃめっと",
            INFINITE: "インフィニット",
            MUGENDAI: "むげんだい",
            MYSTIC: "ミスティック",
            DEVIL: "悪魔",
            LASTCONNECT: "ラストコネクト"
          } [b.chara.initialType];
          b.displayCardId = b.card.cardId;
          b.level = b.maxLevel;
          b.hp = b.maxStatus.hp;
          b.attack = b.maxStatus.attack;
          b.defense = b.maxStatus.defense;
          b.episodeLevel = 5;
          b.chara.description = b.chara.description.replace(/＠/g, "<br>");
          b.revision = 0;
          b.magiaLevel = 1;
          a = b;
          a.closeEvent = f ? f : null;
          g.endL2d();
          h()
        }
      }, 800)
    },
    popupTimerStop: function(a)
    {
      clearTimeout(c.popupTimerObj)
    },
    instantPopup: function(d, b, f)
    {
      b.isNpc || (clearTimeout(c.popupTimerObj), a = b, a.closeEvent = f ? f : null, h())
    }
  }
});
