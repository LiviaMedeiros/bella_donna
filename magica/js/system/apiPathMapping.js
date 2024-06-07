define(["backboneCommon"], function(b)
{
  var a = {},
    c = {
      giftList: "/gift/list",
      itemList: "/item/list",
      pieceList: "/piece/list",
      titleList: "/title/list",
      patrolList: "/patrol/list",
      patrolAreaList: "/patrolArea/list",
      gameUser: "/gameUser/info",
      user: "/user/info",
      userArenaBattle: "/userArenaBattle/info",
      userCardList: "/userCard/list",
      userChapterList: "/userChapter/list",
      userCharaList: "/userChara/list",
      userCharaEnhancementCellList: "/userCharaEnhancementCell/list",
      userCharaAtbEnhancementCellList: "/userCharaAtbEnhancementCell/list",
      atbEnhancementCellList: "/atbEnhancementCell/list",
      userDailyChallengeList: "/userDailyChallenge/list",
      userDeckList: "/userDeck/list",
      userDoppelList: "/userDoppel/list",
      userFollowList: "/userFollow/list",
      userFormationSheetList: "/userFormationSheet/list",
      userGiftList: "/userGift/list",
      userItemList: "/userItem/list",
      userLimitedChallengeList: "/userLimitedChallenge/list",
      userList: "/user/list",
      userLive2dList: "/userLive2d/list",
      userPieceList: "/userPiece/list",
      userPieceSetList: "/userPieceSet/list",
      userPieceArchiveList: "/userPieceArchive/list",
      userPieceStorageList: "/userPieceStorage/list",
      userQuestAdventureList: "/userQuestAdventure/list",
      userQuestBattleList: "/userQuestBattle/list",
      userSectionList: "/userSection/list",
      userStatusList: "/userStatus/list",
      userTotalChallengeList: "/userTotalChallenge/list",
      userTitleList: "/userTitle/list",
      userTotalForces: "/userTotalForces/info",
      userPatrolList: "/userPatrol/list",
      userGachaKindList: "/userGachaKindList/list",
      userEventPuellaRaid: "/userEventPuellaRaid/info",
      puellaHistoriaGroupRaidAttackInfoList: "/event/puellaRaid/attackInfo/getList",
      puellaHistoriaGroupRaidStampList: "/event/puellaRaid/stamp/getList",
      puellaHistoriaGroupRaidStampSend: "/event/puellaRaid/stamp/send",
      branchAlternativeStart: "/event/branch/alternative/start",
      branchAlternativeEnd: "/event/branch/alternative/end",
      arenaMissionStart: "/event/arenaMission/start",
      arenaMissionReload: "/event/arenaMission/reload",
      trainingCharaSet: "/event/training/set",
      dungeonStart: "/event/dungeon/start",
      dungeonEnd: "/event/dungeon/end",
      dungeonMove: "/event/dungeon/move",
      dungeonCure: "/event/dungeon/cure",
      raidDraw: "/event/raid/draw",
      raidQuestStart: "/event/raid/quest/start",
      raidShowLog: "/event/raid/show/log",
      raidReliefRequest: "/event/raid/relief/request",
      raidChallengeReceive: "/event/raid/challenge/receive",
      storyraidCommentSend: "/event/storyraid/comment/send",
      storyraidBossDetail: "/event/storyraid/boss/detail",
      groupBattleJoin: "/regularEvent/groupBattle/join",
      groupBattleDifficulty: "/regularEvent/groupBattle/difficulty",
      groupBattleRankingList: "/regularEvent/groupBattle/rankingList",
      groupBattleRewardList: "/regularEvent/groupBattle/rewardList",
      groupBattleBattleLog: "/regularEvent/groupBattle/battle/log",
      groupBattleBattleDetail: "/regularEvent/groupBattle/battle/detail",
      groupBattleBattleStart: "/regularEvent/groupBattle/battle/start",
      groupBattleBattleSimulateStart: "/regularEvent/groupBattle/battle/simulate/start",
      groupBattleBattleGood: "/regularEvent/groupBattle/good",
      groupBattleBattleChangeGroupName: "/regularEvent/groupBattle/changeGroupName",
      exterminationSelectDifficulty: "/regularEvent/extermination/selectDifficulty",
      exterminationBattleStart: "/regularEvent/extermination/battle/start",
      exterminationUnconquered: "/regularEvent/extermination/unconquered",
      exterminationRetire: "/regularEvent/extermination/retire",
      exterminationSwapDeck: "/userDeck/extermination/swapDeck",
      exterminationBulkSave: "/userDeck/extermination/bulkSave",
      secondPartLastMirrorBattleClear: "/quest/secondPartLast/whcmClear",
      secondPartLastBattleStart: "/quest/secondPartLast/battle/start",
      secondPartLastUnconquered: "/quest/secondPartLast/unconquered",
      userDeckBulkSave: "/userDeck/bulkSave",
      eventWitchMemoriaExchange: "/event/witch/pieceExchange",
      eventWalpurgisAttackInfoList: "/event/walpurgisRaid/attackInfo/getList",
      eventWalpurgisStampList: "/event/walpurgisRaid/stamp/getList",
      eventWalpurgisStampSend: "/event/walpurgisRaid/stamp/send",
      accomplishCure: "/regularEvent/accomplish/cure",
      backdoorItemSend: "/test/backdoor/item/send",
      backdoorGiftSend: "/test/backdoor/gift/send",
      backdoorCardSend: "/test/backdoor/card/send",
      backdoorPieceSend: "/test/backdoor/piece/send",
      backdoorError: "/test/backdoor/error",
      backdoorAddRiche: "/test/backdoor/addRiche",
      testFollowList: "/test/backdoor/gameUser/list",
      testEpsodeUp: "/test/backdoor/chara/episodeUp",
      testStoryOpen: "/test/backdoor/section/open",
      testSeachabke: "/test/backdoor/user/searchable",
      backdoorPayReward: "/test/backdoor/payReward",
      jsErrorSend: "/test/logger/error",
      randomError: "/test/backdoor/random/busy",
      backdoorAddMoney: "/test/backdoor/addMoney",
      backdoor1stChapterClear: "/test/backdoor/clearFirstChapter",
      backdoor2ndChapterClear: "/test/backdoor/clearSecondChapter",
      backdoorStartQuest: "/test/backdoor/startQuest",
      accomplishResetCure: "/test/backdoor/regularEvent/accomplish/resetCure",
      backdoorMirrorBattleRetry: "/test/backdoor/revertWhcmClear",
      sendRepaymentMail: "/test/backdoor/sendRepaymentMail",
      registerRepaymentMail: "/repayment/registerRepaymentMail",
      presentListPage: "/page/PresentList",
      presentHistoryPage: "/page/PresentHistory",
      GachaHistoryPage: "/page/GachaHistory",
      MagiRepoPage: "/page/MagiRepo",
      CampaignBoxGachaTopPage: "/page/CampaignBoxGachaTop",
      NewYearLoginPage: "/page/NewYearLogin",
      prologueRegister: "/prologue/register",
      createUser: "/user/create",
      userTransfer: "/user/transfer",
      userPassword: "/user/setPassword",
      inputBirthDay: "/user/inputBirthDay",
      userChangeName: "/user/changeName",
      userChangeNamePrologue: "/prologue/changeName",
      deleteUser: "/user/delete",
      createGameUser: "/gameUser/create",
      editComment: "/gameUser/editComment",
      changeLeader: "/gameUser/changeLeader",
      changeHelper: "/gameUser/changeHelper",
      readAnnounce: "/gameUser/read/announcement",
      acceptReview: "/gameUser/acceptReview",
      rejectReview: "/gameUser/rejectReview",
      cacheClear: "/gameUser/cacheClear",
      setBackground: "/gameUser/setBackground",
      setAdvSkip: "/gameUser/skipAdventure",
      setDisplayTitle: "/gameUser/setDisplayTitle",
      setVisibleRankingClassType: "/gameUser/setVisibleRankingClassType",
      live2dSet: "/userLive2d/set",
      rewardReceive: "/reward/receive",
      receivePresent: "/present/receive",
      userCardCompose: "/userCard/compose",
      userCardComposeEpisodeByItem: "/userCard/composeEpisodeByItem",
      userCardLimitBreak: "/userCard/limitBreak",
      userCardLimitBreakByItem: "/userCard/limitBreakByItem",
      userCardEvolve: "/userCard/evolve",
      userCardCustomize: "/userCard/customize",
      userCardBulkCustomize: "/userCard/bulkCustomize",
      userCardComposeMagia: "/userCard/composeMagia",
      pieceEquip: "/userCard/piece/equip",
      userCharaVisualize: "/userChara/visualize",
      userCharaSale: "/userChara/sale",
      userCharaEnhancementOpen: "/userCharaEnhancementCell/open",
      userCharaEnhancementMultiOpen: "/userCharaEnhancementCell/multiOpen",
      userCharaEnhancementReset: "/userCharaEnhancementCell/reset",
      userCardComposeAttribute: "/userCharaAtbEnhancementCell/open",
      userCardBulkComposeAttribute: "/userCharaAtbEnhancementCell/openAll",
      userPieceCompose: "/userPiece/compose",
      userPieceSell: "/userPiece/sale",
      userPieceProtect: "/userPiece/protect",
      userPieceUnprotect: "/userPiece/unprotect",
      userPieceMultipleProtect: "/userPiece/multipleProtect",
      userPieceUnequip: "/userPiece/unequip",
      userPieceSetSave: "/userPieceSet/save",
      userPieceArchive: "/userPiece/archive",
      userPieceUnArchive: "/userPiece/unarchive",
      userPieceStorage: "/userPieceStorage/save",
      userQuestAdventureRegist: "/userQuestAdventure/regist",
      adventureSkip: "/userQuestAdventure/skip",
      gachaResult: "/gacha/draw",
      gachaSelect: "/gacha/select",
      gachaSelectMemoria: "/gacha/select/memoria",
      realGachaResult: "/realGacha/draw",
      gachaProbability: "/gacha/probability",
      gachaResultHistory: "/gacha/result",
      applicationFriend: "/friend/application",
      approvalFriend: "/friend/approval",
      deleteFriend: "/friend/delete",
      refusalFriend: "/friend/refusal",
      deletePendingFriend: "/friend/deletePending",
      arenaStart: "/arena/start",
      arenaReload: "/arena/reload",
      arenaCreateOnetimeCode: "/arena/createOnetimeCode",
      arenaCodeMatching: "/arena/codeMatching",
      arenaGetSaveReplayList: "/arena/getSaveReplayList",
      arenaRankingCureReloadCountOfRanking: "/arena/ranking/cureReloadCountOfRanking",
      eventArenaRankMatchRecoveryAttackCount: "/regularEvent/arenaRankMatch/recoveryAttackCount",
      eventArenaRankMatchUnlockCoolDownTime: "/regularEvent/arenaRankMatch/unlockCoolDownTime",
      questStart: "/quest/start",
      questGetBestRecord: "/quest/getBestRecord",
      questGetReplayData: "/quest/getReplayData",
      questNativeGet: "/quest/native/get",
      questNativeResultSend: "/quest/native/result/send",
      userDeckSave: "/userDeck/save",
      userDeckChangeName: "/userDeck/changeName",
      userDeckDelete: "/userDeck/delete",
      blockList: "/block/list",
      userBlock: "/block/add",
      userUnBlock: "/block/delete",
      followerProfile: "/friend/user",
      followerList: "/friend/follower/list",
      sendFollow: "/friend/follow",
      unfollow: "/friend/unfollow",
      getTotalForcesRanking: "/totalForcesRanking/getRanking",
      useItem: "/userItem/use",
      userItemSell: "/userItem/sell",
      userGiftSell: "/userGift/sell",
      shopBuy: "/shop/buy",
      useMoneyProcess: "/money/process",
      moneyShopList: "/money/shop/list",
      userDailyChallengeReceive: "/userDailyChallenge/receive",
      userDailyAllReceive: "/userDailyChallenge/receive/all",
      userTotalChallengeReceive: "/userTotalChallenge/receive",
      userTotalAllReceive: "/userTotalChallenge/receive/all",
      userLimitedChallengeReceive: "/userLimitedChallenge/receive",
      userLimitedChallengeAllReceieve: "/userLimitedChallenge/receive/all",
      userDoppelChallengeReceive: "/userDoppelChallenge/receive",
      eventStoryUnlock: "/eventStory/unlock",
      campaignBoxGachaReset: "/campaign/boxGacha/reset",
      campaignBoxGachaGetList: "/campaign/boxGacha/list",
      campaignBoxGachaListGet: "/campaign/boxGacha/list",
      campaignBoxGachaAllResult: "/campaign/boxGacha/fullDraw",
      campaignBoxGachaAllItemUseResult: "/campaign/boxGacha/maxDraw",
      serialSend: "/reward/receive/serial",
      campaignQuizStart: "/campaign/quiz/start",
      campaignQuizEnd: "/campaign/quiz/end",
      patrolStart: "/patrol/start",
      patrolEnd: "/patrol/end",
      patrolLumpStart: "/patrol/startAll",
      patrolLumpEnd: "/patrol/endAll"
    },
    d = "/magica/api",
    e = "";
  if (location.href.match("file://") || location.href.match("http://localhost:5963") || location.href.match("https://localhost:5963")) d = "/magica/json", e = ".json";
  b.linkList = [];
  a.pathSet = function()
  {
    for (var a in c) b.linkList[a] = d + c[a] + e;
    b.baseObj.init()
  };
  return a
});
