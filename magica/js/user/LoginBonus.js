define(["underscore", "backbone", "backboneCommon", "ajaxControl"], function(d, e, b, c)
{
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
    },
    {
      id: "userPatrolList"
    }],
    fetch: function()
    {
      c.pageModelGet(this.needModelIdObj)
    },
    init: function()
    {
      var a = c.getPageJson();
      b.loginBonus = a.loginBonusList;
      b.loginBonusPeriod = a.loginBonusPeriod;
      a.campaignList && (b.campaignListLogin = a.campaignList);
      a.loginBonusCampaign && (b.loginBonusCampaign = a.loginBonusCampaign);
      a.loginBonusCampaignList && (b.loginBonusCampaignList = a.loginBonusCampaignList);
      a.supportPoint && (b.supportPoint = a.supportPoint);
      location.href = "#/MyPage"
    },
    remove: function(a)
    {
      a()
    }
  }
});
