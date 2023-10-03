define("underscore backbone backboneCommon js/quest/puellaHistoria/lastBattle/Utility text!js/quest/puellaHistoria/lastBattle/json/stamp/send.json text!js/quest/puellaHistoria/lastBattle/json/stamp/getList.json text!js/quest/puellaHistoria/lastBattle/json/attackInfo/getList.json".split(" "), function(c, h, k, d, e, f, g)
{
  return {
    createSingleRaidSection: function(b)
    {
      c.each(b.pageJson.userSectionList, function(a, b, c)
      {
        102201 == a.sectionId && (a.section.viewParameterMap = {
          PUELLAHISTORIA_NORMAL_NUM: d.getPuellaHistoriaLastBattleNum(
          {
            type: "singleRaid"
          })
        }, console.log("createSingleRaidSection_Section", a))
      })
    },
    createGroupRaidSection: function(b)
    {
      c.each(b.pageJson.userSectionList, function(a, b, c)
      {
        102201 == a.sectionId && (a.section.viewParameterMap = {
          PUELLAHISTORIA_NORMAL_NUM: d.getPuellaHistoriaLastBattleNum(
          {
            type: "groupRaid"
          })
        }, console.log("createGroupRaidSection_Section", a))
      })
    },
    getLocalJson: function(b)
    {
      b = b.type;
      var a = {};
      "json_stamp_send" == b && (a = JSON.parse(e));
      "json_stamp_getList" == b && (a = JSON.parse(f));
      "json_attackInfo_getList" == b && (a = JSON.parse(g));
      return a
    }
  }
});
