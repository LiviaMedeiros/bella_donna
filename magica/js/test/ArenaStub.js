define("underscore backbone backboneCommon ajaxControl text!template/test/ArenaStub.html text!css/test/QuestStub.css".split(" "), function(h, k, a, e, l, m)
{
  var g, f, n = function()
  {
    a.setStyle(m);
    g = new(k.View.extend(
    {
      events: function()
      {
        var b = {};
        b[a.cgti + " .resultBtn"] = this.resultSend;
        return b
      },
      initialize: function(a)
      {
        this.template = h.template(l);
        this.createDom()
      },
      render: function()
      {
        console.log("render", e.getPageJson());
        this.$el.html(this.template(e.getPageJson()));
        return this
      },
      createDom: function()
      {
        a.content.append(this.render().el);
        a.ready.hide()
      },
      resultSend: function(b)
      {
        b.preventDefault();
        if (!a.isScrolled())
        {
          var g = b.currentTarget.getAttribute("data-result");
          f = a.arenaJson;
          console.log("questJson:", f);
          e.ajaxPost(a.linkList.arenaStart, f, function(b)
          {
            var c = {};
            c.userQuestBattleResultId = b.userQuestBattleResultList[0].id;
            console.log("get-prm:", c);
            e.ajaxPost(a.linkList.questNativeGet, c, function(b)
            {
              b.webData && a.responseSetStorage(b.webData);
              console.log("getCallback", b);
              c.result = g;
              if ("CODE_MATCH" == f.arenaBattleType || "RANKING" == f.arenaBattleType)
              {
                var k = Number(a.doc.querySelector('input[name="rateHp"]').value) || 100;
                c.hpRemain = 0;
                h.each(b.playerList, function(a, b)
                {
                  c.hpRemain += parseInt(a.hp * k / 100)
                })
              }
              e.ajaxPost(a.linkList.questNativeResultSend, c, function(d)
              {
                console.log("sendCallback", d);
                var c = a.doc.querySelector('select[name="opponentTeamType"]').value;
                "-" != c && (d.userArenaBattleResultList[0].arenaBattleOpponentTeamType = c);
                c = a.doc.querySelector('select[name="arenaBattleOpponentType"]').value;
                "-" != c && (d.userArenaBattleResultList[0].arenaBattleOpponentType = c);
                var e = Number(a.doc.querySelector('input[name="rateHp"]').value) || 100;
                d.playerList = [];
                h.each(b.playerList, function(a, b)
                {
                  a.hpRemain = parseInt(a.hp * e / 100);
                  d.playerList.push(a)
                });
                d.userQuestBattleResultList[0].turns = Number(a.doc.querySelector('input[name="totalTurn"]').value) || 1;
                d.userQuestBattleResultList[0].connectNum = Number(a.doc.querySelector('input[name="connectNum"]').value) || 0;
                d.userQuestBattleResultList[0].skillNum = Number(a.doc.querySelector('input[name="skillNum"]').value) || 0;
                d.userQuestBattleResultList[0].magiaNum = Number(a.doc.querySelector('input[name="magiaNum"]').value) || 0;
                d.userQuestBattleResultList[0].doppelNum = Number(a.doc.querySelector('input[name="doppelNum"]').value) || 0;
                d.userQuestBattleResultList[0].chargeMax = Number(a.doc.querySelector('input[name="chargeMax"]').value) || 0;
                "RANKING" == f.arenaBattleType ? location.href = "#/EventArenaRankingResult" : "ARENA_RANK_MATCH" == f.arenaBattleType ? location.href = "#/RegularEventArenaRankMatchResult" : (c = a.doc.querySelector('select[name="arenaBattleType"]').value, "-" != c && (d.userArenaBattleResultList[0].arenaBattleType = c), d.userArenaBattleResultList[0].arenaBattleStatus = "SUCCESSFUL" == g ? "WIN" : "LOSE", location.href = "#/ArenaResult");
                a.questNativeResponse = d
              })
            })
          })
        }
      }
    }))
  };
  return {
    needModelIdObj: [
    {
      id: "user"
    },
    {
      id: "userStatusList",
      refresh: !0
    },
    {
      id: "userPatrolList"
    }],
    fetch: function()
    {
      e.pageModelGet(this.needModelIdObj)
    },
    init: function()
    {
      $(a.ready.target).on("webkitAnimationEnd", function(b)
      {
        "readyFadeOut" == b.originalEvent.animationName && (a.ready.target.className = "")
      });
      n()
    },
    remove: function(a)
    {
      g && g.remove();
      a()
    }
  }
});
