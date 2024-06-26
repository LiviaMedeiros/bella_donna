define(["underscore", "backbone", "backboneCommon", "text!resource/image_web/_json/SecondPartLastInfo.json"], function(d, l, f, g)
{
  var k = function(a)
  {
    var c = a.gameUser,
      b = {};
    d.each(a.questInfo, function(a, h, c)
    {
      a.genericValue && (b["battle" + (h + 1) + "Status"] = a.genericValue)
    });
    b.isMirrorBattleWin = c.isWhcmClear;
    return b
  };
  return {
    getModel: function(a)
    {
      a = a.pageJson;
      var c = JSON.parse(g),
        b = [],
        e = c.secondPartLastInfo.sectionId;
      d.each(a.userQuestBattleList, function(a)
      {
        a.questBattle.sectionId == e && b.push(a)
      });
      b = d.sortBy(b, function(a)
      {
        return a.questBattle.questBattleId
      });
      a = {
        secondPartLastInfo:
        {
          sectionId: e,
          storyInfo: c.secondPartLastInfo.storyInfo,
          battleInfo: k(
          {
            questInfo: b,
            gameUser: a.gameUser
          }),
          enemyInfo: c.secondPartLastInfo.enemyInfo,
          questInfo: b,
          sectionInfo: d.findWhere(a.userSectionList,
          {
            sectionId: e
          })
        }
      };
      f.secondPartLastInfo = a.secondPartLastInfo;
      return a
    }
  }
});
