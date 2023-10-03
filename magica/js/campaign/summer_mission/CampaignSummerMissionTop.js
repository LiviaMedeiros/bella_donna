define("underscore backbone backboneCommon ajaxControl command text!css/campaign/summer_mission/CampaignSummerMissionTop.css js/campaign/summer_mission/CampaignSummerMissionTopView".split(" "), function(l, m, c, g, b, h, k)
{
  var d, e, f;
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
      id: "userLimitedChallengeList",
      refresh: !0
    },
    {
      id: "userPatrolList"
    }],
    fetch: function(a)
    {
      e = a ? a : null;
      g.pageModelGet(this.needModelIdObj)
    },
    init: function()
    {
      var a = g.getPageJson().limitedChallengeGroupList[0];
      void 0 != a.viewParameterMap && a.viewParameterMap.LIVE2D_ID ? (a.viewParameterMap.BGM ? b.startBgm(a.viewParameterMap.BGM) : b.startBgm(c.settingBgm), a.viewParameterMap.BG_IMG ? b.changeBg(a.viewParameterMap.BG_IMG + ".ExportJson") : b.changeBg("web_summermission2021.ExportJson"), a = a.viewParameterMap.LIVE2D_ID) : (b.changeBg("web_summermission2021.ExportJson"), b.startBgm(c.settingBgm), a = ["100552", "100551", "100550"]);
      f = a[Math.floor(Math.random() * a.length)];
      c.setStyle(h);
      d = new k(
      {
        dispId: e
      });
      c.dispMissionId = null;
      b.endL2d();
      a = {
        type: 1
      };
      a.id = f;
      a.x = 150;
      a.key = "idle";
      a.y = 1024 === c.displayWidth ? Math.floor(c.doc.getElementsByTagName("body")[0].offsetHeight / 2) : Math.ceil(c.shortSize / 2);
      b.startL2d(a)
    },
    remove: function(a)
    {
      b.endL2d();
      d && d.removeView();
      f = e = null;
      a()
    }
  }
});
