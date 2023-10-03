define(["underscore", "backbone", "backboneCommon"], function(e, f, b)
{
  return {
    EventTrainingTop:
    {
      url: "EventTrainingTop(/:questBattleId)",
      pageInit: function(a)
      {
        require(["EventTrainingTop"], function(c)
        {
          b.pageObj = c;
          c.fetch(a)
        })
      }
    },
    EventTrainingCharaSelect:
    {
      url: "EventTrainingCharaSelect",
      pageInit: function()
      {
        require(["EventTrainingCharaSelect"], function(a)
        {
          b.pageObj = a;
          a.fetch()
        })
      }
    },
    EventAccomplishTop:
    {
      url: "EventAccomplishTop",
      pageInit: function()
      {
        require(["EventAccomplishTop"], function(a)
        {
          b.pageObj = a;
          a.fetch()
        })
      }
    },
    EventAccomplishEnemyDetail:
    {
      url: "EventAccomplishEnemyDetail",
      pageInit: function()
      {
        require(["EventAccomplishEnemyDetail"], function(a)
        {
          b.pageObj = a;
          a.fetch()
        })
      }
    },
    EventAccomplishRecovery:
    {
      url: "EventAccomplishRecovery",
      pageInit: function()
      {
        require(["EventAccomplishRecovery"], function(a)
        {
          b.pageObj = a;
          a.fetch()
        })
      }
    },
    EventAccomplishDeck:
    {
      url: "EventAccomplishDeck",
      pageInit: function()
      {
        require(["EventAccomplishDeck"], function(a)
        {
          b.pageObj = a;
          a.fetch()
        })
      }
    },
    EventTowerTop:
    {
      url: "EventTowerTop(/:questType)(/:questId)",
      pageInit: function(a, c)
      {
        require(["EventTowerTop"], function(d)
        {
          b.pageObj = d;
          d.fetch(a, c)
        })
      }
    },
    EventDailyTowerTop:
    {
      url: "EventDailyTowerTop(/:questType)(/:questId)",
      pageInit: function(a, c)
      {
        require(["EventDailyTowerTop"], function(d)
        {
          b.pageObj = d;
          d.fetch(a, c)
        })
      }
    },
    EventBranchTop:
    {
      url: "EventBranchTop(/:questBattleId)",
      pageInit: function(a)
      {
        require(["EventBranchTop"], function(c)
        {
          b.pageObj = c;
          c.fetch(a)
        })
      }
    },
    EventArenaMissionTop:
    {
      url: "EventArenaMissionTop",
      pageInit: function()
      {
        require(["EventArenaMissionTop"], function(a)
        {
          b.pageObj = a;
          a.fetch()
        })
      }
    },
    EventArenaMissionStage:
    {
      url: "EventArenaMissionStage(/:stageId)",
      pageInit: function(a)
      {
        require(["EventArenaMissionStage"], function(c)
        {
          b.pageObj = c;
          c.fetch(a)
        })
      }
    },
    EventArenaMissionResult:
    {
      url: "EventArenaMissionResult",
      pageInit: function()
      {
        require(["EventArenaMissionResult"], function(a)
        {
          b.pageObj = a;
          a.fetch()
        })
      }
    },
    EventSingleRaidTop:
    {
      url: "EventSingleRaidTop(/:questBattleId)",
      pageInit: function(a)
      {
        require(["EventSingleRaidTop"], function(c)
        {
          b.pageObj = c;
          c.fetch(a)
        })
      }
    },
    EventStoryRaidTop:
    {
      url: "EventStoryRaidTop(/:questBattleId)",
      pageInit: function(a)
      {
        require(["EventStoryRaidTop"], function(c)
        {
          b.pageObj = c;
          c.fetch(a)
        })
      }
    },
    EventArenaRankingTop:
    {
      url: "EventArenaRankingTop",
      pageInit: function()
      {
        require(["EventArenaRankingTop"], function(a)
        {
          b.pageObj = a;
          a.fetch()
        })
      }
    },
    EventArenaRankingResult:
    {
      url: "EventArenaRankingResult",
      pageInit: function()
      {
        require(["EventArenaRankingResult"], function(a)
        {
          b.pageObj = a;
          a.fetch()
        })
      }
    },
    EventArenaRankingHistory:
    {
      url: "EventArenaRankingHistory",
      pageInit: function()
      {
        require(["EventArenaRankingHistory"], function(a)
        {
          b.pageObj = a;
          a.fetch()
        })
      }
    },
    EventAprilFoolTop:
    {
      url: "EventAprilFoolTop",
      pageInit: function()
      {
        require(["EventAprilFoolTop"], function(a)
        {
          b.pageObj = a;
          a.fetch()
        })
      }
    },
    EventDungeonTop:
    {
      url: "EventDungeonTop(/:partNo)",
      pageInit: function(a)
      {
        require(["EventDungeonTop"], function(c)
        {
          b.pageObj = c;
          c.fetch(a)
        })
      }
    },
    EventDungeonMap:
    {
      url: "EventDungeonMap",
      pageInit: function()
      {
        require(["EventDungeonMap"], function(a)
        {
          b.pageObj = a;
          a.fetch()
        })
      }
    },
    EventRaidTop:
    {
      url: "EventRaidTop()",
      pageInit: function()
      {
        require(["EventRaidTop"], function(a)
        {
          b.pageObj = a;
          a.fetch()
        })
      }
    },
    EventRaidCloseTop:
    {
      url: "EventRaidCloseTop()",
      pageInit: function()
      {
        require(["EventRaidCloseTop"], function(a)
        {
          b.pageObj = a;
          a.fetch()
        })
      }
    },
    RegularEventAccomplishTop:
    {
      url: "RegularEventAccomplishTop(/:questBattleId)",
      pageInit: function(a)
      {
        require(["RegularEventAccomplishTop"], function(c)
        {
          b.pageObj = c;
          c.fetch(a)
        })
      }
    },
    RegularEventGroupBattleTop:
    {
      url: "RegularEventGroupBattleTop(/:questBattleId)",
      pageInit: function(a)
      {
        require(["RegularEventGroupBattleTop"], function(c)
        {
          b.pageObj = c;
          c.fetch(a)
        })
      }
    },
    RegularEventGroupBattleSelectUnion:
    {
      url: "RegularEventGroupBattleSelectUnion()",
      pageInit: function()
      {
        require(["RegularEventGroupBattleSelectUnion"], function(a)
        {
          b.pageObj = a;
          a.fetch()
        })
      }
    },
    RegularEventExterminationTop:
    {
      url: "RegularEventExterminationTop(/:questBattleId)",
      pageInit: function(a)
      {
        require(["RegularEventExterminationTop"], function(c)
        {
          b.pageObj = c;
          c.fetch(a)
        })
      }
    },
    RegularEventExterminationBattleSelect:
    {
      url: "RegularEventExterminationBattleSelect(/:questBattleId)",
      pageInit: function(a)
      {
        require(["RegularEventExterminationBattleSelect"], function(c)
        {
          b.pageObj = c;
          c.fetch(a)
        })
      }
    },
    RegularEventExterminationBattleConfirm:
    {
      url: "RegularEventExterminationBattleConfirm()",
      pageInit: function()
      {
        require(["RegularEventExterminationBattleConfirm"], function(a)
        {
          b.pageObj = a;
          a.fetch()
        })
      }
    },
    RegularEventExterminationFormation:
    {
      url: "RegularEventExterminationFormation()",
      pageInit: function()
      {
        require(["RegularEventExterminationFormation"], function(a)
        {
          b.pageObj = a;
          a.fetch()
        })
      }
    },
    CampaignBoxGachaTop:
    {
      url: "CampaignBoxGachaTop",
      pageInit: function()
      {
        require(["CampaignBoxGachaTop"], function(a)
        {
          b.pageObj = a;
          a.fetch()
        })
      }
    },
    CampaignGachaLineUp:
    {
      url: "CampaignGachaLineUp",
      pageInit: function()
      {
        require(["CampaignGachaLineUp"], function(a)
        {
          b.pageObj = a;
          a.fetch()
        })
      }
    },
    CampaignStoryMission:
    {
      url: "CampaignStoryMission",
      pageInit: function()
      {
        require(["CampaignStoryMission"], function(a)
        {
          b.pageObj = a;
          a.fetch()
        })
      }
    },
    CampaignQuizTop:
    {
      url: "CampaignQuizTop",
      pageInit: function()
      {
        require(["CampaignQuizTop"], function(a)
        {
          b.pageObj = a;
          a.fetch()
        })
      }
    },
    CampaignSumoTop:
    {
      url: "CampaignSumoTop",
      pageInit: function()
      {
        require(["CampaignSumoTop"], function(a)
        {
          b.pageObj = a;
          a.fetch()
        })
      }
    },
    CampaignSumoCharaSelect:
    {
      url: "CampaignSumoCharaSelect",
      pageInit: function()
      {
        require(["CampaignSumoCharaSelect"], function(a)
        {
          b.pageObj = a;
          a.fetch()
        })
      }
    },
    CampaignSumoMain:
    {
      url: "CampaignSumoMain",
      pageInit: function()
      {
        require(["CampaignSumoMain"], function(a)
        {
          b.pageObj = a;
          a.fetch()
        })
      }
    },
    NewYearLogin:
    {
      url: "NewYearLogin",
      pageInit: function()
      {
        require(["NewYearLogin"], function(a)
        {
          b.pageObj = a;
          a.fetch()
        })
      }
    },
    CampaignSummerMissionTop:
    {
      url: "CampaignSummerMissionTop(/:missionId)",
      pageInit: function(a)
      {
        require(["CampaignSummerMissionTop"], function(c)
        {
          b.pageObj = c;
          c.fetch(a)
        })
      }
    },
    RegularEventArenaRankMatchTop:
    {
      url: "RegularEventArenaRankMatchTop()",
      pageInit: function()
      {
        require(["RegularEventArenaRankMatchTop"], function(a)
        {
          b.pageObj = a;
          a.fetch()
        })
      }
    },
    RegularEventArenaRankMatchRedirectTop:
    {
      url: "RegularEventArenaRankMatchRedirectTop()",
      pageInit: function()
      {
        require(["RegularEventArenaRankMatchRedirectTop"], function(a)
        {
          b.pageObj = a;
          a.fetch()
        })
      }
    },
    RegularEventArenaRankMatchResult:
    {
      url: "RegularEventArenaRankMatchResult()",
      pageInit: function()
      {
        require(["RegularEventArenaRankMatchResult"], function(a)
        {
          b.pageObj = a;
          a.fetch()
        })
      }
    },
    RegularEventArenaRankMatchHistory:
    {
      url: "RegularEventArenaRankMatchHistory()",
      pageInit: function()
      {
        require(["RegularEventArenaRankMatchHistory"], function(a)
        {
          b.pageObj = a;
          a.fetch()
        })
      }
    }
  }
});
