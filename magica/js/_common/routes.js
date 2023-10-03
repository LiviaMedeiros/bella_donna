define(["underscore", "backbone", "backboneCommon"], function(e, f, c)
{
  return {
    TopPage:
    {
      url: "TopPage",
      pageInit: function()
      {
        require(["TopPage"], function(a)
        {
          c.pageObj = a;
          a.fetch()
        })
      }
    },
    Maintenance:
    {
      url: "Maintenance",
      pageInit: function()
      {
        require(["Maintenance"], function(a)
        {
          c.pageObj = a;
          a.init()
        })
      }
    },
    MyPage:
    {
      url: "MyPage",
      pageInit: function()
      {
        require(["MyPage"], function(a)
        {
          hotReload(function()
          {
            a.fetch()
          });
          c.pageObj = a
        })
      }
    },
    BackgroundSet:
    {
      url: "BackgroundSet",
      pageInit: function()
      {
        require(["BackgroundSet"], function(a)
        {
          c.pageObj = a;
          a.fetch()
        })
      }
    },
    LoginBonus:
    {
      url: "LoginBonus",
      pageInit: function()
      {
        require(["LoginBonus"], function(a)
        {
          c.pageObj = a;
          a.fetch()
        })
      }
    },
    FormationTop:
    {
      url: "FormationTop(/:tuId)",
      pageInit: function(a)
      {
        require(["FormationTop"], function(b)
        {
          c.pageObj = b;
          b.fetch(a)
        })
      }
    },
    FormationQuest:
    {
      url: "FormationQuest(/:id)(/:tuId)",
      pageInit: function(a, b)
      {
        require(["FormationQuest"], function(d)
        {
          c.pageObj = d;
          d.fetch(a, b)
        })
      }
    },
    FormationArena:
    {
      url: "FormationArena(/:id)",
      pageInit: function(a)
      {
        require(["FormationArena"], function(b)
        {
          c.pageObj = b;
          b.fetch(a)
        })
      }
    },
    FormationSupport:
    {
      url: "FormationSupport(/:id)",
      pageInit: function(a)
      {
        require(["FormationSupport"], function(b)
        {
          c.pageObj = b;
          b.fetch(a)
        })
      }
    },
    SupportSelect:
    {
      url: "SupportSelect(/:tuId)",
      pageInit: function(a)
      {
        require(["SupportSelect"], function(b)
        {
          c.pageObj = b;
          b.fetch(a)
        })
      }
    },
    MainQuest:
    {
      url: "MainQuest(/:tuId)",
      pageInit: function(a)
      {
        require(["MainQuest"], function(b)
        {
          c.pageObj = b;
          b.fetch(a)
        })
      }
    },
    MainQuestSingleRaid:
    {
      url: "MainQuestSingleRaid",
      pageInit: function()
      {
        require(["MainQuestSingleRaid"], function(a)
        {
          c.pageObj = a;
          a.fetch()
        })
      }
    },
    MainQuestBranch:
    {
      url: "MainQuestBranch",
      pageInit: function()
      {
        require(["MainQuestBranch"], function(a)
        {
          c.pageObj = a;
          a.fetch()
        })
      }
    },
    SubQuest:
    {
      url: "SubQuest",
      pageInit: function()
      {
        require(["SubQuest"], function(a)
        {
          c.pageObj = a;
          a.fetch()
        })
      }
    },
    CharaQuest:
    {
      url: "CharaQuest",
      pageInit: function()
      {
        require(["CharaQuest"], function(a)
        {
          c.pageObj = a;
          a.fetch()
        })
      }
    },
    EventQuest:
    {
      url: "EventQuest(/:qId)",
      pageInit: function(a)
      {
        require(["EventQuest"], function(b)
        {
          c.pageObj = b;
          b.fetch(a)
        })
      }
    },
    EventRecord:
    {
      url: "EventRecord",
      pageInit: function()
      {
        require(["EventRecord"], function(a)
        {
          c.pageObj = a;
          a.fetch()
        })
      }
    },
    QuestBackground:
    {
      url: "QuestBackground",
      pageInit: function()
      {
        require(["QuestBackground"], function(a)
        {
          c.pageObj = a;
          a.fetch()
        })
      }
    },
    QuestResult:
    {
      url: "QuestResult(/:tuId)",
      pageInit: function(a)
      {
        require(["QuestResult"], function(b)
        {
          c.pageObj = b;
          b.fetch(a)
        })
      }
    },
    QuestBattleSelect:
    {
      url: "QuestBattleSelect(/:id)(/:tuId)",
      pageInit: function(a, b)
      {
        require(["QuestBattleSelect"], function(d)
        {
          c.pageObj = d;
          d.fetch(a, b)
        })
      }
    },
    SecondPartLastRouter:
    {
      url: "SecondPartLastRouter(/:conditionType)(/:questBattleId)",
      pageInit: function(a, b)
      {
        require(["SecondPartLastRouter"], function(d)
        {
          c.pageObj = d;
          d.fetch(
          {
            conditionType: a,
            questBattleId: b
          })
        })
      }
    },
    SecondPartLastTop:
    {
      url: "SecondPartLastTop(/:questBattleId)",
      pageInit: function(a)
      {
        require(["SecondPartLastTop"], function(b)
        {
          c.pageObj = b;
          b.fetch(a)
        })
      }
    },
    SecondPartLastBattleConfirm:
    {
      url: "SecondPartLastBattleConfirm",
      pageInit: function()
      {
        require(["SecondPartLastBattleConfirm"], function(a)
        {
          c.pageObj = a;
          a.fetch()
        })
      }
    },
    SecondPartLastFormation:
    {
      url: "SecondPartLastFormation",
      pageInit: function()
      {
        require(["SecondPartLastFormation"], function(a)
        {
          c.pageObj = a;
          a.fetch()
        })
      }
    },
    SecondPartLastBoss:
    {
      url: "SecondPartLastBoss",
      pageInit: function()
      {
        require(["SecondPartLastBoss"], function(a)
        {
          c.pageObj = a;
          a.fetch()
        })
      }
    },
    QuestStoryOnly:
    {
      url: "QuestStoryOnly",
      pageInit: function()
      {
        require(["QuestStoryOnly"], function(a)
        {
          c.pageObj = a;
          a.fetch()
        })
      }
    },
    PuellaHistoriaTop:
    {
      url: "PuellaHistoriaTop",
      pageInit: function()
      {
        require(["PuellaHistoriaTop"], function(a)
        {
          c.pageObj = a;
          a.fetch()
        })
      }
    },
    PuellaHistoriaSingleRaid:
    {
      url: "PuellaHistoriaSingleRaid",
      pageInit: function()
      {
        require(["PuellaHistoriaSingleRaid"], function(a)
        {
          c.pageObj = a;
          a.fetch()
        })
      }
    },
    EventPuellaRaidTop:
    {
      url: "EventPuellaRaidTop",
      pageInit: function()
      {
        require(["EventPuellaRaidTop"], function(a)
        {
          c.pageObj = a;
          a.fetch()
        })
      }
    },
    PuellaHistoriaRouter:
    {
      url: "PuellaHistoriaRouter",
      pageInit: function()
      {
        require(["PuellaHistoriaRouter"], function(a)
        {
          c.pageObj = a;
          a.fetch()
        })
      }
    },
    PuellaHistoriaGroupRaidQuestResultMainBoss:
    {
      url: "PuellaHistoriaGroupRaidQuestResultMainBoss",
      pageInit: function()
      {
        require(["PuellaHistoriaGroupRaidQuestResultMainBoss"], function(a)
        {
          c.pageObj = a;
          a.fetch()
        })
      }
    },
    PuellaHistoriaGroupRaidQuestResultSubBoss:
    {
      url: "PuellaHistoriaGroupRaidQuestResultSubBoss",
      pageInit: function()
      {
        require(["PuellaHistoriaGroupRaidQuestResultSubBoss"], function(a)
        {
          c.pageObj = a;
          a.fetch()
        })
      }
    },
    Scene0Top:
    {
      url: "Scene0Top",
      pageInit: function()
      {
        require(["Scene0Top"], function(a)
        {
          c.pageObj = a;
          a.fetch()
        })
      }
    },
    Scene0StorySelectBeforeFilm1:
    {
      url: "Scene0StorySelectBeforeFilm1",
      pageInit: function()
      {
        require(["Scene0StorySelectBeforeFilm1"], function(a)
        {
          c.pageObj = a;
          a.fetch()
        })
      }
    },
    Scene0StorySelectAfterFilm1:
    {
      url: "Scene0StorySelectAfterFilm1",
      pageInit: function()
      {
        require(["Scene0StorySelectAfterFilm1"], function(a)
        {
          c.pageObj = a;
          a.fetch()
        })
      }
    },
    Scene0BattleSelect:
    {
      url: "Scene0BattleSelect",
      pageInit: function()
      {
        require(["Scene0BattleSelect"], function(a)
        {
          c.pageObj = a;
          a.fetch()
        })
      }
    },
    Scene0SideStorySelect:
    {
      url: "Scene0SideStorySelect",
      pageInit: function()
      {
        require(["Scene0SideStorySelect"], function(a)
        {
          c.pageObj = a;
          a.fetch()
        })
      }
    },
    MemoriaTop:
    {
      url: "MemoriaTop",
      pageInit: function()
      {
        require(["MemoriaTop"], function(a)
        {
          c.pageObj = a;
          a.fetch()
        })
      }
    },
    MemoriaList:
    {
      url: "MemoriaList(/:prm)(/:obj)",
      pageInit: function(a, b)
      {
        require(["MemoriaList"], function(d)
        {
          c.pageObj = d;
          d.fetch(a, b)
        })
      }
    },
    MemoriaEquip:
    {
      url: "MemoriaEquip",
      pageInit: function()
      {
        require(["MemoriaEquip"], function(a)
        {
          c.pageObj = a;
          a.fetch()
        })
      }
    },
    MemoriaSetEquip:
    {
      url: "MemoriaSetEquip",
      pageInit: function()
      {
        require(["MemoriaSetEquip"], function(a)
        {
          c.pageObj = a;
          a.fetch()
        })
      }
    },
    MemoriaSetList:
    {
      url: "MemoriaSetList",
      pageInit: function()
      {
        require(["MemoriaSetList"], function(a)
        {
          c.pageObj = a;
          a.fetch()
        })
      }
    },
    MemoriaCompose:
    {
      url: "MemoriaCompose(/:pattern)",
      pageInit: function(a)
      {
        require(["MemoriaCompose"], function(b)
        {
          c.pageObj = b;
          b.fetch(a)
        })
      }
    },
    MemoriaComposeAnimation:
    {
      url: "MemoriaComposeAnimation",
      pageInit: function()
      {
        require(["MemoriaComposeAnimation"], function(a)
        {
          c.pageObj = a;
          a.fetch()
        })
      }
    },
    MemoriaComposeResult:
    {
      url: "MemoriaComposeResult",
      pageInit: function()
      {
        require(["MemoriaComposeResult"], function(a)
        {
          c.pageObj = a;
          a.fetch()
        })
      }
    },
    PieceArchive:
    {
      url: "PieceArchive(/:prm)",
      pageInit: function(a)
      {
        require(["PieceArchive"], function(b)
        {
          c.pageObj = b;
          b.fetch(a)
        })
      }
    },
    MissionTop:
    {
      url: "MissionTop(/:id)",
      pageInit: function(a)
      {
        require(["MissionTop"], function(b)
        {
          c.pageObj = b;
          b.fetch(a)
        })
      }
    },
    DoppelMissionTop:
    {
      url: "DoppelMissionTop(/:id)",
      pageInit: function(a)
      {
        require(["DoppelMissionTop"], function(b)
        {
          c.pageObj = b;
          b.fetch(a)
        })
      }
    },
    PanelMissionTop:
    {
      url: "PanelMissionTop(/:id)",
      pageInit: function(a)
      {
        require(["PanelMissionTop"], function(b)
        {
          c.pageObj = b;
          b.fetch(a)
        })
      }
    },
    ItemListTop:
    {
      url: "ItemListTop(/:id)",
      pageInit: function(a)
      {
        require(["ItemListTop"], function(b)
        {
          c.pageObj = b;
          b.fetch(a)
        })
      }
    },
    FollowTop:
    {
      url: "FollowTop",
      pageInit: function()
      {
        require(["FollowTop"], function(a)
        {
          c.pageObj = a;
          a.fetch()
        })
      }
    },
    GachaTop:
    {
      url: "GachaTop(/:id)(/:tuId)",
      pageInit: function(a, b)
      {
        require(["GachaTop"], function(d)
        {
          c.pageObj = d;
          d.fetch(a, b)
        })
      }
    },
    SelectableGachaCharaSelect:
    {
      url: "SelectableGachaCharaSelect(/:id)",
      pageInit: function(a)
      {
        require(["SelectableGachaCharaSelect"], function(b)
        {
          c.pageObj = b;
          b.fetch(a)
        })
      }
    },
    SelectableGachaPieceSelect:
    {
      url: "SelectableGachaPieceSelect",
      pageInit: function()
      {
        require(["SelectableGachaPieceSelect"], function(a)
        {
          c.pageObj = a;
          a.fetch()
        })
      }
    },
    GachaAnimation:
    {
      url: "GachaAnimation(/:tuId)",
      pageInit: function(a)
      {
        require(["GachaAnimation"], function(b)
        {
          c.pageObj = b;
          b.fetch(a)
        })
      }
    },
    GachaResult:
    {
      url: "GachaResult(/:tuId)",
      pageInit: function(a)
      {
        require(["GachaResult"], function(b)
        {
          c.pageObj = b;
          b.fetch(a)
        })
      }
    },
    CharaTop:
    {
      url: "CharaListTop(/:id)",
      pageInit: function(a)
      {
        require(["CharaTop"], function(b)
        {
          c.pageObj = b;
          b.fetch(a)
        })
      }
    },
    CharaCompose:
    {
      url: "CharaListCompose(/:id)",
      pageInit: function(a)
      {
        require(["CharaCompose"], function(b)
        {
          c.pageObj = b;
          b.fetch(a)
        })
      }
    },
    CharaComposeMagia:
    {
      url: "CharaListComposeMagia(/:id)",
      pageInit: function(a)
      {
        require(["CharaComposeMagia"], function(b)
        {
          c.pageObj = b;
          b.fetch(a)
        })
      }
    },
    CharaCustomize:
    {
      url: "CharaListCustomize(/:id)",
      pageInit: function(a)
      {
        require(["CharaCustomize"], function(b)
        {
          c.pageObj = b;
          b.fetch(a)
        })
      }
    },
    CharaEquip:
    {
      url: "CharaListEquip(/:id)",
      pageInit: function(a)
      {
        require(["CharaEquip"], function(b)
        {
          c.pageObj = b;
          b.fetch(a)
        })
      }
    },
    CharaEnhancementTree:
    {
      url: "CharaEnhancementTree(/:id)",
      pageInit: function(a)
      {
        require(["CharaEnhancementTree"], function(b)
        {
          c.pageObj = b;
          b.fetch(a)
        })
      }
    },
    CharaComposeAttribute:
    {
      url: "CharaListComposeAttribute(/:id)",
      pageInit: function(a)
      {
        require(["CharaComposeAttribute"], function(b)
        {
          c.pageObj = b;
          b.fetch(a)
        })
      }
    },
    ShopTop:
    {
      url: "ShopTop(/:shopId)",
      pageInit: function(a)
      {
        require(["ShopTop"], function(b)
        {
          c.pageObj = b;
          b.fetch(a)
        })
      }
    },
    ArenaTop:
    {
      url: "ArenaTop",
      pageInit: function()
      {
        require(["ArenaTop"], function(a)
        {
          c.pageObj = a;
          a.fetch()
        })
      }
    },
    ArenaFreeRank:
    {
      url: "ArenaFreeRank",
      pageInit: function()
      {
        require(["ArenaFreeRank"], function(a)
        {
          c.pageObj = a;
          a.fetch()
        })
      }
    },
    ArenaRanking:
    {
      url: "ArenaRanking",
      pageInit: function()
      {
        require(["ArenaRanking"], function(a)
        {
          c.pageObj = a;
          a.fetch()
        })
      }
    },
    ArenaResult:
    {
      url: "ArenaResult",
      pageInit: function()
      {
        require(["ArenaResult"], function(a)
        {
          c.pageObj = a;
          a.fetch()
        })
      }
    },
    ArenaHistory:
    {
      url: "ArenaHistory(/:id)",
      pageInit: function(a)
      {
        require(["ArenaHistory"], function(b)
        {
          c.pageObj = b;
          b.fetch(a)
        })
      }
    },
    ArenaReward:
    {
      url: "ArenaReward",
      pageInit: function()
      {
        require(["ArenaReward"], function(a)
        {
          c.pageObj = a;
          a.fetch()
        })
      }
    },
    ArenaSimulate:
    {
      url: "ArenaSimulate",
      pageInit: function()
      {
        require(["ArenaSimulate"], function(a)
        {
          c.pageObj = a;
          a.fetch()
        })
      }
    },
    CollectionTop:
    {
      url: "CollectionTop",
      pageInit: function()
      {
        require(["CollectionTop"], function(a)
        {
          c.pageObj = a;
          a.fetch()
        })
      }
    },
    CharaCollection:
    {
      url: "CharaCollection",
      pageInit: function()
      {
        require(["CharaCollection"], function(a)
        {
          c.pageObj = a;
          a.fetch()
        })
      }
    },
    MemoriaCollection:
    {
      url: "PieceCollection",
      pageInit: function()
      {
        require(["MemoriaCollection"], function(a)
        {
          c.pageObj = a;
          a.fetch()
        })
      }
    },
    DoppelCollection:
    {
      url: "DoppelCollection",
      pageInit: function()
      {
        require(["DoppelCollection"], function(a)
        {
          c.pageObj = a;
          a.fetch()
        })
      }
    },
    StoryCollection:
    {
      url: "StoryCollection(/:id)",
      pageInit: function(a)
      {
        require(["StoryCollection"], function(b)
        {
          c.pageObj = b;
          b.fetch(a)
        })
      }
    },
    EnemyCollection:
    {
      url: "EnemyCollection",
      pageInit: function()
      {
        require(["EnemyCollection"], function(a)
        {
          c.pageObj = a;
          a.fetch()
        })
      }
    },
    ConfigTop:
    {
      url: "ConfigTop",
      pageInit: function()
      {
        require(["ConfigTop"], function(a)
        {
          c.pageObj = a;
          a.fetch()
        })
      }
    },
    Help:
    {
      url: "Help",
      pageInit: function()
      {
        require(["Help"], function(a)
        {
          c.pageObj = a;
          a.fetch()
        })
      }
    },
    Terms:
    {
      url: "Terms",
      pageInit: function()
      {
        require(["Terms"], function(a)
        {
          c.pageObj = a;
          a.fetch()
        })
      }
    },
    Ban:
    {
      url: "Ban",
      pageInit: function()
      {
        require(["Ban"], function(a)
        {
          c.pageObj = a;
          a.fetch()
        })
      }
    },
    NewVersionRecommend:
    {
      url: "NewVersionRecommend",
      pageInit: function()
      {
        require(["NewVersionRecommend"], function(a)
        {
          c.pageObj = a;
          a.fetch()
        })
      }
    },
    PresentList:
    {
      url: "PresentList",
      pageInit: function()
      {
        require(["js/present/PresentList"], function(a)
        {
          c.pageObj = a;
          a.fetch()
        })
      }
    },
    PresentHistory:
    {
      url: "PresentHistory",
      pageInit: function()
      {
        require(["js/present/PresentHistory"], function(a)
        {
          c.pageObj = a;
          a.fetch()
        })
      }
    },
    GachaHistory:
    {
      url: "GachaHistory",
      pageInit: function()
      {
        require(["js/present/GachaHistory"], function(a)
        {
          c.pageObj = a;
          a.fetch()
        })
      }
    },
    ProfileFormationSupport:
    {
      url: "ProfileFormationSupport",
      pageInit: function()
      {
        require(["js/formation/ProfileFormationSupport"], function(a)
        {
          c.pageObj = a;
          a.fetch()
        })
      }
    },
    ResumeBackground:
    {
      url: "ResumeBackground",
      pageInit: function()
      {
        require(["ResumeBackground"], function(a)
        {
          c.pageObj = a;
          a.fetch()
        })
      }
    },
    SearchQuest:
    {
      url: "SearchQuest(/:questId)",
      pageInit: function(a)
      {
        require(["SearchQuest"], function(b)
        {
          c.pageObj = b;
          b.fetch(a)
        })
      }
    },
    DeckFormation:
    {
      url: "DeckFormation(/:deckType)",
      pageInit: function(a)
      {
        require(["DeckFormation"], function(b)
        {
          c.pageObj = b;
          b.fetch(a)
        })
      }
    },
    PatrolTop:
    {
      url: "PatrolTop",
      pageInit: function()
      {
        require(["js/patrol/PatrolTop"], function(a)
        {
          c.pageObj = a;
          a.fetch()
        })
      }
    },
    PatrolCutin:
    {
      url: "PatrolCutin(/:mode)",
      pageInit: function(a)
      {
        require(["js/patrol/PatrolCutin"], function(b)
        {
          c.pageObj = b;
          b.fetch(a)
        })
      }
    },
    PatrolResult:
    {
      url: "PatrolResult()",
      pageInit: function()
      {
        require(["js/patrol/PatrolResult"], function(a)
        {
          c.pageObj = a;
          a.fetch()
        })
      }
    },
    PatrolLumpResult:
    {
      url: "PatrolLumpResult()",
      pageInit: function()
      {
        require(["js/patrol/PatrolLumpResult"], function(a)
        {
          c.pageObj = a;
          a.fetch()
        })
      }
    },
    PatrolLumpFormation:
    {
      url: "PatrolLumpFormation()",
      pageInit: function()
      {
        require(["js/patrol/PatrolLumpFormation"], function(a)
        {
          c.pageObj = a;
          a.fetch()
        })
      }
    },
    CameraTop:
    {
      url: "CameraTop",
      pageInit: function()
      {
        require(["CameraTop"], function(a)
        {
          c.pageObj = a;
          a.fetch()
        })
      }
    },
    MagiRepo:
    {
      url: "MagiRepo",
      pageInit: function()
      {
        require(["MagiRepo"], function(a)
        {
          c.pageObj = a;
          a.fetch()
        })
      }
    },
    MagiRepoDetail:
    {
      url: "MagiRepoDetail(/:part)(/:number)",
      pageInit: function(a, b)
      {
        require(["MagiRepoDetail"], function(d)
        {
          c.pageObj = d;
          d.fetch(a, b)
        })
      }
    },
    TestResult:
    {
      url: "TestResult",
      pageInit: function()
      {
        require(["js/test/TestResult"], function(a)
        {
          c.pageObj = a;
          a.fetch()
        })
      }
    },
    TestResult2:
    {
      url: "TestResult2",
      pageInit: function()
      {
        require(["js/test/TestResult2"], function(a)
        {
          c.pageObj = a;
          a.fetch()
        })
      }
    }
  }
});
