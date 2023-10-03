define("underscore backbone backboneCommon ajaxControl command text!css/mission/MissionTop.css js/view/mission/MissionTopView".split(" "), function(k, l, b, f, e, g, h)
{
  var c, d;
  return {
    needModelIdObj: [
    {
      id: "user"
    },
    {
      id: "gameUser"
    },
    {
      id: "userStatusList"
    },
    {
      id: "itemList"
    },
    {
      id: "userItemList"
    },
    {
      id: "userDailyChallengeList",
      refresh: !0
    },
    {
      id: "userTotalChallengeList",
      refresh: !0
    },
    {
      id: "userLimitedChallengeList",
      refresh: !0
    },
    {
      id: "userPatrolList"
    }],
    startCommand: function()
    {
      e.changeBg("web_0018.ExportJson");
      e.startBgm(b.settingBgm)
    },
    fetch: function(a)
    {
      d = a ? a : null;
      f.pageModelGet(this.needModelIdObj)
    },
    init: function()
    {
      b.setStyle(g);
      c = new h(
      {
        dispId: d
      });
      b.dispMissionId = null
    },
    remove: function(a)
    {
      c && c.removeView();
      d = null;
      a()
    }
  }
});
