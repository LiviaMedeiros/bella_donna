"function" != typeof Object.assign && (console.log("assign over ride"), Object.defineProperty(Object, "assign",
{
  value: function(a, b)
  {
    if (null === a) throw new TypeError("Cannot convert undefined or null to object");
    for (var c = Object(a), e = 1; e < arguments.length; e++)
    {
      var d = arguments[e];
      if (null !== d)
        for (var f in d) Object.prototype.hasOwnProperty.call(d, f) && (c[f] = d[f])
    }
    return c
  },
  writable: !0,
  configurable: !0
}));
window.breforeReleaseTime = window.document.getElementById("replaceTag").getAttribute("src").split("v=")[1];
var pathBlackList = {
    jquery: "js/libs/jquery-2.2.3.min",
    underscore: "js/libs/underscore-min",
    backbone: "js/libs/backbone-min",
    text: "js/libs/text",
    iscroll: "js/libs/iscroll5",
    iscroll_stage: "js/libs/iscroll5_stage",
    isBrowser: "js/_common/isBrowser",
    ajaxControl: "js/_common/ajaxControl",
    router: "js/_common/router",
    backboneCommon: "js/_common/backboneCommon",
    backboneCustom: "js/_common/backboneCustom",
    command: "js/_common/nativeCommand",
    commonEvent: "js/_common/commonEvent",
    apiPathMapping: "js/system/apiPathMapping",
    searchPathMapping: "js/system/searchPathMapping",
    releaseInfo: "js/system/releaseInfo",
    replacement: "js/system/replacement",
    cardUtil: "js/util/CardUtil",
    memoriaUtil: "js/util/MemoriaUtil",
    sortUtil: "js/util/SortUtil",
    memoriaSortUtil: "js/util/MemoriaSortUtil",
    GlobalView: "js/view/user/GlobalMenuView",
    routes: "js/_common/routes",
    eRoutes: "js/_common/eventRoutes",
    bRoutes: "js/_common/backdoorRoutes"
  },
  pathWhiteList = {
    ArenaFreeRank: "js/arena/ArenaFreeRank",
    ArenaHistory: "js/arena/ArenaHistory",
    ArenaRanking: "js/arena/ArenaRanking",
    ArenaResult: "js/arena/ArenaResult",
    ArenaReward: "js/arena/ArenaReward",
    ArenaSimulate: "js/arena/ArenaSimulate",
    ArenaTop: "js/arena/ArenaTop",
    BackgroundSet: "js/user/BackgroundSet",
    Ban: "js/user/Ban",
    CameraTop: "js/camera/CameraTop",
    CharaCollection: "js/collection/CharaCollection",
    CharaCommon: "js/chara/CharaCommon",
    CharaCompose: "js/chara/CharaCompose",
    CharaComposeMagia: "js/chara/CharaComposeMagia",
    CharaCustomize: "js/chara/CharaCustomize",
    CharaEquip: "js/chara/CharaEquip",
    CharaEnhancementTree: "js/chara/CharaEnhancementTree",
    CharaQuest: "js/quest/CharaQuest",
    CharaTop: "js/chara/CharaTop",
    CharaComposeAttribute: "js/chara/CharaComposeAttribute/CharaComposeAttribute",
    CollectionTop: "js/collection/CollectionTop",
    ConfigTop: "js/config/ConfigTop",
    DoppelCollection: "js/collection/DoppelCollection",
    DeckFormation: "js/formation/DeckFormation",
    DeckUtil: "js/formation/DeckFormationUtil",
    EnemyCollection: "js/collection/EnemyCollection",
    EventQuest: "js/quest/EventQuest",
    EventRecord: "js/user/EventRecord",
    FollowTop: "js/follow/FollowTop",
    FormationArena: "js/formation/FormationArena",
    FormationQuest: "js/formation/FormationQuest",
    FormationSupport: "js/formation/FormationSupport",
    FormationTop: "js/formation/FormationTop",
    GachaAnimation: "js/gacha/GachaAnimation",
    GachaResult: "js/gacha/GachaResult",
    GachaTop: "js/gacha/GachaTop",
    SelectableGachaCharaSelect: "js/gacha/SelectableGachaCharaSelect",
    SelectableGachaPieceSelect: "js/gacha/SelectableGachaPieceSelect",
    Help: "js/etc/Help",
    HelpPopup: "js/view/etc/HelpPopupView",
    ItemListTop: "js/item/ItemListTop",
    LoginBonus: "js/user/LoginBonus",
    NewVersionRecommend: "js/top/NewVersionRecommend",
    MainQuest: "js/quest/MainQuest",
    MainQuestSingleRaid: "js/quest/MainQuestSingleRaid",
    MainQuestBranch: "js/quest/MainQuestBranch",
    Maintenance: "js/top/Maintenance",
    MemoriaCollection: "js/collection/MemoriaCollection",
    MemoriaCompose: "js/memoria/MemoriaCompose",
    MemoriaComposeAnimation: "js/memoria/MemoriaComposeAnimation",
    MemoriaComposeResult: "js/memoria/MemoriaComposeResult",
    MemoriaList: "js/memoria/UserMemoriaList",
    MemoriaEquip: "js/memoria/MemoriaEquip",
    MemoriaSetList: "js/memoria/MemoriaSetList",
    MemoriaSetEquip: "js/memoria/MemoriaSetEquip",
    PieceArchive: "js/memoria/PieceArchive",
    MemoriaTop: "js/memoria/MemoriaTop",
    MissionTop: "js/mission/MissionTop",
    MagiRepo: "js/collection/MagiRepo",
    MagiRepoDetail: "js/collection/MagiRepoDetail",
    DoppelMissionTop: "js/mission/DoppelMissionTop",
    PanelMissionTop: "js/mission/PanelMissionTop",
    MyPage: "js/user/MyPage",
    ProfileFormationSupport: "js/formation/ProfileFormationSupport",
    QuestBackground: "js/quest/QuestBackground",
    QuestBattleSelect: "js/quest/QuestBattleSelect",
    QuestResult: "js/quest/QuestResult",
    QuestUtil: "js/quest/QuestUtil",
    SecondPartLastRouter: "js/quest/secondPartLast/Router",
    SecondPartLastTop: "js/quest/secondPartLast/Top",
    SecondPartLastBattleConfirm: "js/quest/secondPartLast/BattleConfirm",
    SecondPartLastFormation: "js/quest/secondPartLast/Formation",
    SecondPartLastBoss: "js/quest/secondPartLast/Boss",
    QuestStoryOnly: "js/quest/QuestStoryOnly",
    PuellaHistoriaTop: "js/quest/puellaHistoria/Top",
    ResumeBackground: "js/user/ResumeBackground",
    ShopTop: "js/shop/ShopTop",
    StoryCollection: "js/collection/StoryCollection",
    SubQuest: "js/quest/SubQuest",
    SupportSelect: "js/quest/SupportSelect",
    SearchQuest: "js/util/SearchQuest",
    Terms: "js/terms/Terms",
    TopPage: "js/top/TopPage",
    TutorialUtil: "js/util/TutorialUtil",
    EventTrainingTop: "js/event/training/EventTrainingTop",
    EventTrainingCharaSelect: "js/event/training/EventTrainingCharaSelect",
    EventTowerTop: "js/event/tower/EventTowerTop",
    EventDailyTowerTop: "js/event/dailytower/EventDailyTowerTop",
    EventBranchTop: "js/event/branch/EventBranchTop",
    EventArenaMissionTop: "js/event/arenaMission/EventArenaMissionTop",
    EventArenaMissionStage: "js/event/arenaMission/EventArenaMissionStage",
    EventArenaMissionResult: "js/event/arenaMission/EventArenaMissionResult",
    EventSingleRaidTop: "js/event/singleraid/EventSingleRaidTop",
    EventStoryRaidTop: "js/event/storyraid/EventStoryRaidTop",
    EventArenaRankingTop: "js/event/arenaranking/EventArenaRankingTop",
    EventArenaRankingResult: "js/event/arenaranking/EventArenaRankingResult",
    EventArenaRankingHistory: "js/event/arenaranking/EventArenaRankingHistory",
    EventAccomplishTop: "js/event/accomplish/EventAccomplishTop",
    EventAccomplishEnemyDetail: "js/event/accomplish/EventAccomplishEnemyDetail",
    EventAccomplishDeck: "js/event/accomplish/EventAccomplishDeck",
    EventAccomplishRecovery: "js/event/accomplish/EventAccomplishRecovery",
    EventAprilFoolTop: "js/event/aprilfool2018/EventAprilFoolTop",
    EventDungeonTop: "js/event/dungeon/EventDungeonTop",
    EventDungeonMap: "js/event/dungeon/EventDungeonMap",
    EventRaidTop: "js/event/raid/EventRaidTop",
    EventRaidCloseTop: "js/event/raid/EventRaidCloseTop",
    RegularEventArenaRankMatchTop: "js/event/EventArenaRankMatch/Top",
    RegularEventArenaRankMatchRedirectTop: "js/event/EventArenaRankMatch/RedirectTop",
    RegularEventArenaRankMatchResult: "js/event/EventArenaRankMatch/Result",
    RegularEventArenaRankMatchHistory: "js/event/EventArenaRankMatch/History",
    RegularEventGroupBattleTop: "js/regularEvent/groupBattle/RegularEventGroupBattleTop",
    RegularEventGroupBattleSelectUnion: "js/regularEvent/groupBattle/RegularEventGroupBattleSelectUnion",
    RegularEventExterminationTop: "js/regularEvent/extermination/RegularEventExterminationTop",
    RegularEventExterminationBattleSelect: "js/regularEvent/extermination/RegularEventExterminationBattleSelect",
    RegularEventExterminationBattleConfirm: "js/regularEvent/extermination/RegularEventExterminationBattleConfirm",
    RegularEventExterminationFormation: "js/regularEvent/extermination/RegularEventExterminationFormation",
    RegularEventAccomplishTop: "js/regularEvent/accomplish/RegularEventAccomplishTop",
    CampaignBoxGachaTop: "js/campaign/box_gacha/CampaignBoxGachaTop",
    CampaignGachaLineUp: "js/campaign/gacha_lineup/CampaignGachaLineUp",
    CampaignStoryMission: "js/campaign/story_mission/CampaignStoryMission",
    CampaignQuizTop: "js/campaign/quiz/CampaignQuizTop",
    CampaignSumoTop: "js/campaign/sumo/CampaignSumoTop",
    CampaignSumoCharaSelect: "js/campaign/sumo/CampaignSumoCharaSelect",
    CampaignSumoMain: "js/campaign/sumo/CampaignSumoMain",
    NewYearLogin: "js/campaign/newyear_login/NewYearLogin",
    CampaignSummerMissionTop: "js/campaign/summer_mission/CampaignSummerMissionTop"
  },
  requireNoCash = ["json/announcements/light_top50.json", "json/announcements/announcements.json", "json/event_banner/event_banner.json"];
require.config(
{
  baseUrl: "/magica/",
  name: "magica",
  waitSeconds: 10,
  urlArgs: function(a, b)
  {
    a = b.split("/magica/")[1];
    if (window.fileTimeStamp[a]) return (-1 === b.indexOf("?") ? "?" : "&") + window.fileTimeStamp[a];
    a = requireNoCash.length;
    for (var c = !1; 0 < a;) a = a - 1 | 0, -1 !== b.indexOf(requireNoCash[a]) && (a = 0, c = !0);
    return c ? "" : (-1 === b.indexOf("?") ? "?" : "&") + "v=" + (new Date).getTime()
  },
  shim:
  {
    jquery:
    {
      exports: "$"
    },
    underscore:
    {
      exports: "_"
    },
    backbone:
    {
      deps: ["underscore", "jquery"],
      exports: "Backbone"
    },
    movieclip:
    {
      deps: ["jquery", "createjs"]
    }
  },
  paths: $.extend(
  {}, pathWhiteList, pathBlackList)
});
