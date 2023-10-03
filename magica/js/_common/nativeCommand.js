define(["underscore", "backbone", "backboneCommon"], function(h, m, e)
{
  document.getElementById("commandDiv");
  var l = window.webkit ? !0 : !1,
    g = null,
    b = {
      DATA_CLEAR_WEB_CACHE: 1,
      DATA_REMOVE_ASSET: 2,
      DATA_REMOVE_ASSET_FILE: 3,
      DATA_ASSET_FILE_EXIST: 4,
      DATA_CALL_TOUCHES_BEGIN: 5,
      DATA_CALL_TOUCHES_MOVE: 6,
      DATA_CALL_TOUCHES_END: 7,
      DATA_CALL_TOUCHES_CLEAR: 8,
      DATA_AWAKE_PURCHASE: 10,
      DATA_PURCHASE_ITEM: 11,
      DATA_GET_PURCHASE_STATE: 12,
      DATA_GET_SNS_USER_ID: 20,
      DATA_GET_APP_VERSION: 21,
      DATA_GET_DOWNLOAD_CONFIG: 22,
      DATA_GET_DEVICE_INFO: 23,
      DATA_GET_ACCESS_TOKEN: 24,
      DATA_CLOSE_APP: 25,
      DATA_SET_DOWNLOAD_CONFIG: 26,
      DATA_GET_STORY_STORED_DATA: 27,
      DATA_GET_FONT: 30,
      DATA_INITIALIZE_SNS_USER_ID: 40,
      DATA_INITIALIZE_CONFIG: 41,
      DATA_OPEN_URL: 50,
      DATA_GET_BASE64: 60,
      DATA_SET_CLIPBOARD: 62,
      DATA_GET_CLIPBOARD: 63,
      DATA_GET_REWARD: 70,
      DATA_DELETE_REWARD: 71,
      DATA_SET_FOX: 80,
      DATA_SET_ADJUST: 81,
      DATA_OPEN_EDIT_BOX: 90,
      DATA_GET_QUEST_REPLAY_VERSION: 97,
      SOUND_BGM_PLAY: 100,
      SOUND_BGM_STOP: 101,
      SOUND_BGM_RESUME: 102,
      SOUND_BGM_PAUSE: 103,
      SOUND_BGM_SET_VOL: 104,
      SOUND_BGM_GET_VOL: 105,
      SOUND_SE_PLAY: 110,
      SOUND_SE_STOP: 111,
      SOUND_SE_SET_VOL: 114,
      SOUND_SE_GET_VOL: 115,
      SOUND_VO_PLAY: 120,
      SOUND_VO_STOP: 121,
      SOUND_VO_SET_VOL: 124,
      SOUND_VO_GET_VOL: 125,
      SOUND_SUR_PLAY: 130,
      SOUND_SUR_STOP: 131,
      SCENE_PUSH_WEBVIEW: 201,
      SCENE_POP_WEBVIEW: 202,
      SCENE_REPLACE_WEBVIEW: 203,
      SCENE_PUSH_LOADING: 211,
      SCENE_PUSH_DOWNLOAD: 221,
      SCENE_GET_CONF_DELETE_DATA: 222,
      SCENE_SET_CONF_DELETE_DATA: 223,
      SCENE_PUSH_GACHA: 231,
      SCENE_PUSH_PRESENT: 232,
      SCENE_POP_GACHA: 233,
      SCENE_PUSH_EVOLUTION: 241,
      SCENE_PUSH_MEMORIA_COMPOSE: 251,
      SCENE_PUSH_STORY: 261,
      SCENE_PUSH_QUEST_STORY: 262,
      SCENE_PUSH_BRANCH_STORY: 263,
      SCENE_PUSH_STORY_STORED_DATA: 264,
      SCENE_PUSH_QUEST: 271,
      SCENE_POP_QUEST: 272,
      SCENE_PUSH_QUEST_REPLAY: 275,
      SCENE_SEND_QUEST_REPLAY_DATA: 276,
      SCENE_PUSH_CAMERA: 280,
      SCENE_POP_CAMERA: 281,
      SCENE_SWAP_CAMERA: 282,
      SCENE_ZOOM_CAMERA: 283,
      SCENE_CAPTURE_CAMERA: 284,
      SCENE_PUSH_CHAT: 291,
      SCENE_POP_CHAT: 292,
      SCENE_PUSH_TOP: 301,
      SCENE_POP_TOP: 302,
      SCENE_PUSH_GENERAL_STORY: 311,
      SCENE_POP_GENERAL_STORY: 312,
      SCENE_PUSH_QUEST_STORED_DATA: 321,
      SCENE_PUSH_PROLOGUE: 331,
      SCENE_PUSH_ANOTHER_QUEST: 341,
      SCENE_POP_ANOTHER_QUEST: 342,
      SCENE_PLAY_ANOTHER_QUEST: 343,
      SCENE_PUSH_ANOTHER_QUEST_PART2: 344,
      SCENE_PLAY_ANOTHER_QUEST_PART2: 345,
      SCENE_PUSH_MOVIE: 351,
      SCENE_POP_MOVIE: 352,
      SCENE_PUSH_CANT_SKIP_MOVIE: 353,
      SCENE_PUSH_MOVIE_CHAR: 361,
      SCENE_PUSH_EVENT_RAID: 363,
      SCENE_POP_EVENT_RAID: 364,
      SCENE_SHOW_REWARD_EVENT_RAID: 365,
      SCENE_APP_BOSS_EVENT_RAID: 366,
      SCENE_CANCEL_SELECTED_BOSS_EVENT_RAID: 367,
      SCENE_PUSH_MESSAGE_EVENT_RAID: 368,
      SCENE_FOCUS_POINT_EVENT_RAID: 369,
      SCENE_APP_ENEMY_EVENT_RAID: 397,
      SCENE_PUSH_EVENT_BRANCH: 371,
      SCENE_RESUME_EVENT_BRANCH: 372,
      SCENE_POP_EVENT_BRANCH: 373,
      SCENE_PUSH_EVENT_SINGLE_RAID: 381,
      SCENE_HIDE_EVENT_SINGLE_RAID: 382,
      SCENE_SHOW_EVENT_SINGLE_RAID: 383,
      SCENE_POP_EVENT_SINGLE_RAID: 384,
      SCENE_ENABLE_TAP_EVENT_SINGLE_RAID: 385,
      SCENE_VIEW_SCALE_EVENT_SINGLE_RAID: 386,
      SCENE_PUSH_EVENT_DUNGEON: 391,
      SCENE_POP_EVENT_DUNGEON: 392,
      SCENE_DECIDE_EVENT_DUNGEON: 393,
      SCENE_FOCUS_EVENT_DUNGEON: 394,
      SCENE_RANDOM_ICON_EVENT_DUNGEON: 398,
      SCENE_PUSH_EVENT_PUELLA_RAID: 1008,
      SCENE_RELOAD_EVENT_PUELLA_RAID: 1009,
      SCENE_PUSH_EVENT_STORY_RAID: 395,
      SCENE_POP_EVENT_STORY_RAID: 396,
      SCENE_PUSH_EMOTION_BOARD: 1E3,
      SCENE_POP_EMOTION_BOARD: 1001,
      SCENE_SCALE_EMOTION_BOARD: 1002,
      SCENE_APLAY_EMOTION_BOARD: 1003,
      SCENE_CENTERING_EMOTION_BOARD: 1004,
      SCENE_PUSH_CHAPTER2_MIRROR_BATTLE: 1005,
      SCENE_PUSH_PUELLA_HISTORIA: 1006,
      SCENE_POP_PUELLA_HISTORIA: 1007,
      SCENE_PUSH_SCENARIO_PAGE: 1020,
      SCENE_POP_SCENARIO_PAGE: 1021,
      SCENE_UPDATE_SCENARIO_PAGE: 1022,
      SCENE_PUSH_SCENARIO_LIST: 1023,
      SCENE_POP_SCENARIO_LIST: 1024,
      DISPLAY_SET_WEBVIEW_VISIBLE: 400,
      DISPLAY_CHANGE_BG: 410,
      DISPLAY_REMOVE_BG: 411,
      DISPLAY_ADD_L2D: 420,
      DISPLAY_REMOVE_L2D: 421,
      DISPLAY_PALY_L2D_MOTION: 422,
      DISPLAY_ADD_MINI: 430,
      DISPLAY_REMOVE_MINI: 431,
      DISPLAY_ADD_MINI_ARRAY: 432,
      DISPLAY_REMOVE_MINI_ARRAY: 433,
      DISPLAY_PLAY_COMPOSE_EFFECT: 450,
      DISPLAY_SHOW_COMPOSE_RESULT: 451,
      DISPLAY_HIDE_COMPOSE: 452,
      DISPLAY_PLAY_COMPOSE_MAGIA: 460,
      DISPLAY_PLAY_AWAKE_ABILITY: 465,
      DISPLAY_PLAY_AWAKE_ABILITIES: 466,
      DISPLAY_PLAY_COMPOSE_ATTRIBUTES: 467,
      DISPLAY_PLAY_NORMAL_GACHA_TOP: 470,
      DISPLAY_STOP_NORMAL_GACHA_TOP: 471,
      DISPLAY_PLAY_MEMORIA_TOP: 490,
      DISPLAY_STOP_MEMORIA_TOP: 491,
      DISPLAY_PLAY_GENERAL_STORY: 481,
      DISPLAY_PLAY_ONE_SHOT_STORY: 482,
      NOTI_GET_CONF_PNOTE: 500,
      NOTI_AWAKE_PNOTE: 501,
      NOTI_TURN_ON_PNOTE: 502,
      NOTI_TURN_OFF_PNOTE: 503,
      NOTI_GET_CONF_WEEKLY_QUEST: 510,
      NOTI_TURN_ON_WEEKLY_QUEST: 511,
      NOTI_TURN_OFF_WEEKLY_QUEST: 512,
      NOTI_GET_CONF_AP_FULL: 520,
      NOTI_TURN_ON_AP_FULL: 521,
      NOTI_TURN_OFF_AP_FULL: 522,
      NOTI_CANCEL_AP_FULL: 523,
      NOTI_STORY_RAID_BOSS_DIED: 524,
      DISPLAY_PLAY_FORMATION: 600,
      DISPLAY_STOP_FORMATION: 601,
      DISPLAY_PLAY_WEEKLY_QUEST_TOP: 610,
      DISPLAY_STOP_WEEKLY_QUEST_TOP: 611,
      DISPLAY_PLAY_FORMATION_ENEMY: 620,
      DISPLAY_STOP_FORMATION_ENEMY: 621,
      DISPLAY_PLAY_EFFECT: 630,
      DISPLAY_STOP_EFFECT: 631,
      sendCommand: function(a)
      {
        a = String(a);
        window.isDebug && console.log("native:command: " + a);
        window.isBrowser || (a = "game:" + a, e.ua.android ? !window.app_ver || g && 158 > g ? alert(a) : g && 157 < g ? androidCommand.jsCallback(a) : (g = window.app_ver.split(".").join("") | 0, 158 > g ? alert(a) : androidCommand.jsCallback(a)) : l && webkit.messageHandlers.gameCommand.postMessage(a))
      },
      tipsObj: [
      {
        type: 1,
        image: "tips_21001.png"
      },
      {
        type: 1,
        image: "tips_21002.png"
      },
      {
        type: 1,
        image: "tips_21003.png"
      },
      {
        type: 1,
        image: "tips_21004.png"
      },
      {
        type: 1,
        image: "tips_21005.png"
      },
      {
        type: 1,
        image: "tips_21006.png"
      },
      {
        type: 1,
        image: "tips_21007.png"
      },
      {
        type: 1,
        image: "tips_21008.png"
      },
      {
        type: 1,
        image: "tips_21009.png"
      },
      {
        type: 1,
        image: "tips_21010.png"
      },
      {
        type: 1,
        image: "tips_21011.png"
      },
      {
        type: 1,
        image: "tips_21012.png"
      },
      {
        type: 1,
        image: "tips_21013.png"
      },
      {
        type: 1,
        image: "tips_21014.png"
      },
      {
        type: 1,
        image: "tips_21016.png"
      },
      {
        type: 1,
        image: "tips_21017.png"
      },
      {
        type: 1,
        image: "tips_21018.png"
      },
      {
        type: 1,
        image: "tips_21019.png"
      },
      {
        type: 1,
        image: "tips_21020.png"
      },
      {
        type: 1,
        image: "tips_21021.png"
      },
      {
        type: 1,
        image: "tips_21022.png"
      },
      {
        type: 1,
        image: "tips_21023.png"
      },
      {
        type: 1,
        image: "tips_21024.png"
      },
      {
        type: 1,
        image: "tips_21025.png"
      },
      {
        type: 1,
        image: "tips_21026.png"
      },
      {
        type: 1,
        image: "tips_21027.png"
      },
      {
        type: 1,
        image: "tips_21028.png"
      },
      {
        type: 1,
        image: "tips_21029.png"
      },
      {
        type: 1,
        image: "tips_21030.png"
      },
      {
        type: 1,
        image: "tips_21031.png"
      },
      {
        type: 1,
        image: "tips_21032.png"
      },
      {
        type: 1,
        image: "tips_21033.png"
      },
      {
        type: 1,
        image: "tips_21034.png"
      },
      {
        type: 1,
        image: "tips_21035.png"
      },
      {
        type: 1,
        image: "tips_21037.png"
      },
      {
        type: 1,
        image: "tips_21038.png"
      },
      {
        type: 1,
        image: "tips_21039.png"
      },
      {
        type: 0,
        title: "ミッション",
        text: "デイリーミッションは毎日0時に更新されます"
      },
      {
        type: 0,
        title: "衣装切り替え",
        text: "魔法少女の衣装を入手した場合@ホーム画面の魔法少女の衣装を切り替えることができます"
      },
      {
        type: 0,
        title: "引き継ぎ用パスワードの設定",
        text: "引き継ぎ用パスワードを設定しておくことで@端末が壊れてしまっても、データの引き継ぎができます"
      },
      {
        type: 0,
        title: "機種変更の前に",
        text: "引き継ぎ用IDをメモ等で控え@パスワードの設定をお忘れなく"
      },
      {
        type: 0,
        title: "Chargeディスク",
        text: "Chargeディスクを連続して使用すると@チャージが溜まり、大ダメージを与えられます"
      },
      {
        type: 0,
        title: "Puella Combo",
        text: "同じ魔法少女で攻撃すると@Puella Comboとなりダメージが上昇します"
      },
      {
        type: 0,
        title: "ターゲットの選択",
        text: "敵をタップするとターゲットすることができます"
      },
      {
        type: 0,
        title: "コネクト",
        text: "同じ魔法少女で3回攻撃すると@コネクトが発動できるようになります"
      },
      {
        type: 0,
        title: "魔法陣形",
        text: "陣形の前列は敵の攻撃を受けやすくなるため@防御力が高い魔法少女を配置しましょう"
      },
      {
        type: 0,
        title: "サポート",
        text: "フォローしていないユーザーのサポートは@マギアとスキルが使用できないため注意が必要です"
      },
      {
        type: 0,
        title: "Accele Combo",
        text: "Accele Comboを決めると@チーム全員のマギアゲージが増加します"
      },
      {
        type: 0,
        title: "Blast Combo",
        text: "Blast Comboを決めたターンは@ダメージ量が大きくなります"
      },
      {
        type: 0,
        title: "Puella Combo",
        text: "同じディスクでPuella Comboを決めると@更に大きなダメージを与えることができます"
      },
      {
        type: 0,
        title: "ディスクキャンセル",
        text: "選択されたディスクをタッチするとキャンセルされて@ディスクを選び直すことができます"
      },
      {
        type: 0,
        title: "マギア",
        text: "マギアゲージが100以上溜まると@いつでもマギアが発動できます"
      },
      {
        type: 0,
        title: "スキル",
        text: "ディスク選択中でもスキルを@発動することができます"
      },
      {
        type: 0,
        title: "オートバトル",
        text: "一度クリアしたバトルは二回目以降@オートバトルで進行することができます"
      },
      {
        type: 0,
        title: "オートバトル",
        text: "オートを解除した場合、次のターンから@手動操作することができます"
      },
      {
        type: 0,
        title: "サポートPt",
        text: "クエストでサポートとして使用された場合@翌日のログイン時にサポートPtが獲得できます"
      },
      {
        type: 0,
        title: "ディスクのデザイン変更",
        text: "魔法少女詳細画面の設定から@ディスクのデザインを変更することができます"
      },
      {
        type: 0,
        title: "デスティニージェム",
        text: "すでに所持している魔法少女を再度獲得した場合@その魔法少女のデスティニージェムを獲得できます"
      },
      {
        type: 0,
        title: "デスティニージェム",
        text: "デスティニージェムは魔法少女の魔力解放に使用します@魔力解放をおこなうとメモリア装備枠が増加します"
      },
      {
        type: 0,
        title: "デスティニージェムをマギアチップに変換",
        text: "余ったデスティニージェムは、アイテムリスト画面と@魔力解放画面でマギアチップに交換できます"
      },
      {
        type: 0,
        title: "マギアチップ",
        text: "デスティニージェムはマギアチップに変換できます@マギアチップはショップでアイテムと交換できます"
      },
      {
        type: 0,
        title: "ターゲットの選択",
        text: "ターゲットは3枚のディスクを選択する際に@毎回変更することができます"
      },
      {
        type: 0,
        title: "Acceleディスク",
        text: "アクセルディスクで最初に攻撃すると@以降のディスクでマギアゲージが溜まりやすくなります"
      },
      {
        type: 0,
        title: "Acceleディスク",
        text: "2枚め、3枚めのAcceleディスクほど@マギアゲージが溜まりやすくなります"
      },
      {
        type: 0,
        title: "Blastディスク",
        text: "Blastディスクは2枚め、3枚めで@攻撃するほどダメージが上昇します"
      },
      {
        type: 0,
        title: "Blastディスク",
        text: "Blastディスクには縦攻撃、横攻撃の@2種類が存在します"
      },
      {
        type: 0,
        title: "Blastディスク",
        text: "Blastディスクで攻撃すると@マギアゲージが溜まらないので注意が必要です"
      },
      {
        type: 0,
        title: "ディスクの出現",
        text: "リーダーに指定した魔法少女は@ディスクが出現しやすくなります"
      },
      {
        type: 0,
        title: "ドッペル",
        text: "ドッペルを持つ魔法少女は@マギアゲージが150まで溜まると発動できます"
      },
      {
        type: 0,
        title: "敵の情報",
        text: "敵を長押しすると敵の情報を@表示することができます"
      },
      {
        type: 0,
        title: "Chargeの効果",
        text: "Chargeが溜まっている状態でAcceleを放つと@マギアゲージ獲得量が上昇します"
      },
      {
        type: 0,
        title: "Chargeの効果",
        text: "Chargeが溜まっている状態でBlastを放つと@与えるダメージ量が上昇します"
      },
      {
        type: 0,
        title: "ドッペル",
        text: "★5かつマギアLv5の魔法少女の@ドッペルクエストをクリアすることで解放されます"
      },
      {
        type: 0,
        title: "メモリア",
        text: "メモリアはスキル・アビリティ2枚ずつ@最大4枚まで装備することができます"
      },
      {
        type: 0,
        title: "マギアLv",
        text: "マギアLvを5にするとマギアゲージ上限が@150まで解放されます"
      },
      {
        type: 0,
        title: "Charge Combo",
        text: "Charge Comboを決めるとCharge数が2増加します"
      },
      {
        type: 0,
        title: "魔法少女の情報",
        text: "クエスト中に魔法少女を長押しすると@その魔法少女の情報を表示します"
      },
      {
        type: 0,
        title: "サポート編成",
        text: "他プレイヤーがサポートとして使用できる魔法少女を@サポート編成で設定することができます"
      },
      {
        type: 0,
        title: "マギアパスポート30",
        text: "マギアパスポート30を購入すると30日間@毎日のログイン時にマギアストーン5個を獲得できます"
      },
      {
        type: 0,
        title: "デスティニークリスタルの入手方法",
        text: "初期レアリティが★4で最大まで魔力解放した魔法少女の@デスティニージェムを変換する際に付与されます"
      }],
      clearWebCache: function(a)
      {
        a = JSON.stringify(
        {
          includeDiskFiles: a
        });
        a = b.DATA_CLEAR_WEB_CACHE + "," + a;
        require(["ajaxControl"], function(a)
        {
          a.ajaxPost(e.linkList.cacheClear)
        });
        this.sendCommand(a)
      },
      removeAsset: function(a, c)
      {
        var d = {};
        d.category = a;
        d.callback = c ? c : "nativeCallback";
        a = JSON.stringify(d);
        this.sendCommand(b.DATA_REMOVE_ASSET + "," + a)
      },
      removeFile: function(a)
      {
        a = JSON.stringify(a);
        this.sendCommand(b.DATA_REMOVE_ASSET_FILE + "," + a)
      },
      existFile: function(a)
      {
        a = JSON.stringify(a);
        this.sendCommand(b.DATA_ASSET_FILE_EXIST + "," + a)
      },
      callTouchesBegin: function(a)
      {
        a = JSON.stringify(a);
        this.sendCommand(b.DATA_CALL_TOUCHES_BEGIN + "," + a)
      },
      callTouchesMove: function(a)
      {
        a = JSON.stringify(a);
        this.sendCommand(b.DATA_CALL_TOUCHES_MOVE + "," + a)
      },
      callTouchesEnd: function(a)
      {
        a = JSON.stringify(a);
        this.sendCommand(b.DATA_CALL_TOUCHES_END + "," + a)
      },
      callTouchesClear: function()
      {
        this.sendCommand(b.DATA_CALL_TOUCHES_CLEAR)
      },
      awakePurchase: function()
      {
        this.sendCommand(b.DATA_AWAKE_PURCHASE)
      },
      purchaseItem: function(a)
      {
        var c = {};
        c.productId = window.isDebug ? "jp.f4samurai.madomagi.purchase.item." + a.moneyCode : "com.aniplex.magireco.item." + a.moneyCode;
        c.userId = e.storage.gameUser.toJSON().userId;
        c.itemId = c.productId;
        c.itemName = a.commonMoney.name;
        c.unitPrice = a.commonMoney.coin;
        c.quantity = 1;
        c.imageUrl = a.commonMoney.imagePath;
        c.description = a.commonMoney.limitDescription ? a.commonMoney.limitDescription + a.commonMoney.description : a.commonMoney.description;
        c = JSON.stringify(c);
        this.sendCommand(b.DATA_PURCHASE_ITEM + "," + c)
      }
    },
    k = !1;
  b.getSNS = function()
  {
    k || (k = !0, this.sendCommand(b.DATA_GET_SNS_USER_ID))
  };
  b.getAppVersion = function()
  {
    this.sendCommand(b.DATA_GET_APP_VERSION)
  };
  b.getDownloadConfig = function(a)
  {
    this.sendCommand(b.DATA_GET_DOWNLOAD_CONFIG + (a ? "," + a : ""))
  };
  b.getDeviceInfo = function(a)
  {
    this.sendCommand(b.DATA_GET_DEVICE_INFO + (a ? "," + a : ""))
  };
  b.getAccessToken = function()
  {
    this.sendCommand(b.DATA_GET_ACCESS_TOKEN)
  };
  b.closeGame = function()
  {
    this.sendCommand(b.DATA_CLOSE_APP)
  };
  b.setMovieConfig = function(a)
  {
    var c = {};
    c.movie = a;
    a = JSON.stringify(c);
    this.sendCommand(b.DATA_SET_DOWNLOAD_CONFIG + "," + a)
  };
  b.getStorySaveData = function()
  {
    this.sendCommand(b.DATA_GET_STORY_STORED_DATA + ",saveDataCallback")
  };
  b.getFontData = function()
  {
    this.sendCommand(b.DATA_GET_FONT)
  };
  b.userDataInitilize = function()
  {
    this.sendCommand(b.DATA_INITIALIZE_SNS_USER_ID)
  };
  b.configDataInitilize = function()
  {
    this.sendCommand(b.DATA_INITIALIZE_CONFIG)
  };
  b.browserOpen = function(a)
  {
    this.sendCommand(b.DATA_OPEN_URL + "," + a)
  };
  b.getBaseData = function(a)
  {
    a = JSON.stringify(a);
    this.sendCommand(b.DATA_GET_BASE64 + "," + a)
  };
  b.copyClipboard = function(a)
  {
    this.sendCommand(b.DATA_SET_CLIPBOARD + "," + a.toString())
  };
  b.pasteClipboard = function()
  {
    this.sendCommand(b.DATA_GET_CLIPBOARD)
  };
  b.getRewardPrm = function()
  {
    this.sendCommand(b.DATA_GET_REWARD + ",nativeCallback")
  };
  b.deleteRewardPrm = function()
  {
    this.sendCommand(b.DATA_DELETE_REWARD)
  };
  b.setFoxData = function(a, c)
  {
    !window.isDebug && a && (a = JSON.stringify(a), this.sendCommand(b.DATA_SET_FOX + "," + a));
    c && (a = {}, a.token = c.token, a.eventName = c.eventName, c.currency && (a.currency = c.currency), c.price && (a.price = c.price), c = JSON.stringify(a), this.sendCommand(b.DATA_SET_ADJUST + "," + c))
  };
  b.openKeyBoard = function(a, c, d, f)
  {
    var e = {};
    e.text = a ? a : "";
    c && 0 < c && (e.maxLength = Number(c));
    d && 0 < d && (e.keyboardType = 1);
    f && (e.callback = f);
    a = JSON.stringify(e);
    this.sendCommand(b.DATA_OPEN_EDIT_BOX + "," + a)
  };
  b.getReplayVersion = function()
  {
    this.sendCommand(b.DATA_GET_QUEST_REPLAY_VERSION)
  };
  b.getPurchaseStatus = function()
  {
    this.sendCommand(b.DATA_GET_PURCHASE_STATE)
  };
  b.startBgm = function(a, c)
  {
    c || (e.bgm = a);
    this.sendCommand(b.SOUND_BGM_PLAY + "," + a)
  };
  b.stopBgm = function()
  {
    this.sendCommand(b.SOUND_BGM_STOP)
  };
  b.setBGMVolume = function(a)
  {
    this.sendCommand(b.SOUND_BGM_SET_VOL + "," + a)
  };
  b.getBGMVolume = function(a)
  {
    this.sendCommand(b.SOUND_BGM_GET_VOL + (a ? "," + a : ""))
  };
  b.startSe = function(a)
  {
    this.sendCommand(b.SOUND_SE_PLAY + "," + a)
  };
  b.stopSe = function()
  {
    this.sendCommand(b.SOUND_SE_STOP)
  };
  b.setSEVolume = function(a)
  {
    this.sendCommand(b.SOUND_SE_SET_VOL + "," + a)
  };
  b.getSEVolume = function(a)
  {
    this.sendCommand(b.SOUND_SE_GET_VOL + (a ? "," + a : ""))
  };
  b.startVoice = function(a)
  {
    this.sendCommand(b.SOUND_VO_PLAY + "," + a)
  };
  b.stopVoice = function()
  {
    this.sendCommand(b.SOUND_VO_STOP)
  };
  b.setVOVolume = function(a)
  {
    this.sendCommand(b.SOUND_VO_SET_VOL + "," + a)
  };
  b.getVOVolume = function(a)
  {
    this.sendCommand(b.SOUND_VO_GET_VOL + (a ? "," + a : ""))
  };
  b.startSur = function(a)
  {
    this.sendCommand(b.SOUND_SUR_PLAY + "," + a)
  };
  b.stopSur = function()
  {
    this.sendCommand(b.SOUND_SUR_STOP)
  };
  b.killWebView = function()
  {
    this.sendCommand(b.SCENE_POP_WEBVIEW)
  };
  b.nativeReload = function(a)
  {
    var c = {};
    c.url = "/magica/index.html" + a;
    c.isNeedNativeRequest = !0;
    a = JSON.stringify(c);
    this.sendCommand(b.SCENE_REPLACE_WEBVIEW + "," + a)
  };
  b.startLoading = function(a)
  {
    a = JSON.stringify(a);
    this.sendCommand(b.SCENE_PUSH_LOADING + "," + a)
  };
  b.downloadFile = function(a, c)
  {
    if ("common" !== a)
    {
      var d = {};
      console.log(a.indexOf("movie"));
      d.category = a;
      c && (d.isVisibleCancel = c.isVisibleCancel ? !0 : !1, d.description = c.description && c.isVisibleCancel ? -1 < a.indexOf("movie") ? "ムービーデータのダウンロードを開始します。" : -1 < a.indexOf("voice") ? "ボイスデータのダウンロードを開始します。" : c.description : "", d.note = c.note && c.isVisibleCancel ? -1 < a.indexOf("movie") ? "※ムービーデータは、後からダウンロードすることも可能です。\n※Wi-Fi環境でのダウンロードをお勧めします。" : c.note : "");
      a = JSON.stringify(d)
    }
    else a = "common";
    this.sendCommand(b.SCENE_PUSH_DOWNLOAD + "," + a)
  };
  b.downloadFileConfigPage = function(a, c)
  {
    b.downloadFile(a, c)
  };
  b.downloadFileFullVoice = function(a)
  {
    var c = {};
    c.category = a;
    c.isNeedConfirm = !0;
    a = JSON.stringify(c);
    this.sendCommand(b.SCENE_PUSH_DOWNLOAD + "," + a)
  };
  b.getDownloadDeleteConfig = function(a)
  {
    this.sendCommand(b.SCENE_GET_CONF_DELETE_DATA + (a ? "," + a : ""))
  };
  b.setDownloadDeleteConfig = function(a)
  {
    a = JSON.stringify(a);
    this.sendCommand(b.SCENE_SET_CONF_DELETE_DATA + "," + a)
  };
  b.startGachaAnimation = function(a)
  {
    a = JSON.stringify(a);
    this.sendCommand(b.SCENE_PUSH_GACHA + "," + a)
  };
  b.startPresentAnimation = function(a)
  {
    a = JSON.stringify(a);
    this.sendCommand(b.SCENE_PUSH_PRESENT + "," + a)
  };
  b.endGachaAnimation = function()
  {
    this.sendCommand(b.SCENE_POP_GACHA)
  };
  b.startEvolution = function(a)
  {
    a = JSON.stringify(a);
    this.sendCommand(b.SCENE_PUSH_EVOLUTION + "," + a)
  };
  b.startMemoriaAnimation = function(a)
  {
    a = JSON.stringify(a);
    this.sendCommand(b.SCENE_PUSH_MEMORIA_COMPOSE + "," + a)
  };
  b.startStory = function(a, c)
  {
    var d = e.storage.user.get("tutorialId"),
      f = {};
    f.storyId = a;
    e.storage.user && "？？？？？" !== e.storage.user.toJSON().loginName && (f.userName = e.storage.user.toJSON().loginName);
    "TU998" == d && "101103-10" == a && (f.canSkip = !1);
    c && h.each(c, function(a, b)
    {
      f[b] = a
    });
    a = JSON.stringify(f);
    this.sendCommand(b.SCENE_PUSH_STORY + "," + a)
  };
  b.startQuestStory = function(a)
  {
    var c = e.storage.user.get("tutorialId"),
      d = {};
    d.storyId = a;
    e.storage.user && "？？？？？" !== e.storage.user.toJSON().loginName && (d.userName = e.storage.user.toJSON().loginName);
    "TU998" == c && "101103-10" == a && (d.canSkip = !1);
    a = JSON.stringify(d);
    this.sendCommand(b.SCENE_PUSH_QUEST_STORY + "," + a)
  };
  b.startBranchStory = function(a)
  {
    e.storage.user && "？？？？？" !== e.storage.user.toJSON().loginName && (a.userName = e.storage.user.get("loginName"));
    a = JSON.stringify(a);
    this.sendCommand(b.SCENE_PUSH_BRANCH_STORY + "," + a)
  };
  b.startStoredStory = function()
  {
    this.sendCommand(b.SCENE_PUSH_STORY_STORED_DATA)
  };
  b.startQuest = function(a, c, d)
  {
    var e = {};
    e.questId = a;
    c ? (e.resultUrl = c.resultUrl, e.retireUrl = c.retireUrl) : (e.resultUrl = "/magica/index.html#/QuestResult", e.retireUrl = "/magica/index.html#/MainQuest");
    e.questLoop = d ? !0 : !1;
    e.tips = b.tipsObj[Math.floor(Math.random() * b.tipsObj.length)];
    a = JSON.stringify(e);
    this.sendCommand(b.SCENE_PUSH_QUEST + "," + a)
  };
  b.endQuest = function()
  {
    this.sendCommand(b.SCENE_POP_QUEST)
  };
  b.startArena = function(a)
  {
    a.tips = b.tipsObj[Math.floor(Math.random() * b.tipsObj.length)];
    a = JSON.stringify(a);
    this.sendCommand(b.SCENE_PUSH_QUEST + "," + a)
  };
  b.endArena = function()
  {
    this.sendCommand(b.SCENE_POP_QUEST)
  };
  b.startQuestRelpay = function(a)
  {
    a = JSON.stringify(a);
    this.sendCommand(b.SCENE_PUSH_QUEST_REPLAY + "," + a)
  };
  b.saveQuestRelpay = function(a)
  {
    a = JSON.stringify(a);
    this.sendCommand(b.SCENE_SEND_QUEST_REPLAY_DATA + "," + a)
  };
  b.startChat = function()
  {
    this.sendCommand(b.SCENE_PUSH_CHAT + ",0")
  };
  b.endChat = function()
  {
    this.sendCommand(b.SCENE_POP_CHAT + ",0")
  };
  b.startTop = function()
  {
    this.sendCommand(b.SCENE_PUSH_TOP)
  };
  b.endTop = function()
  {
    this.sendCommand(b.SCENE_POP_TOP)
  };
  b.startL2d = function(a)
  {
    "true" !== a.txtVisible || a.fontSize || (a.fontSize = 24);
    a.isOffset = !0;
    a = JSON.stringify(a);
    this.sendCommand(b.SCENE_PUSH_GENERAL_STORY + "," + a)
  };
  b.endL2d = function()
  {
    this.sendCommand(b.SCENE_POP_GENERAL_STORY)
  };
  b.checkQuestStored = function()
  {
    this.sendCommand(b.SCENE_PUSH_QUEST_STORED_DATA + ",saveDataCallback")
  };
  b.startPrologue = function(a)
  {
    a = JSON.stringify(
    {
      beginningId: a
    });
    this.sendCommand(b.SCENE_PUSH_PROLOGUE + "," + a)
  };
  b.showSubQuestBg = function(a)
  {
    a = JSON.stringify(a);
    this.sendCommand(b.SCENE_PUSH_ANOTHER_QUEST + "," + a)
  };
  b.showSubQuestBgPart2 = function(a)
  {
    a = JSON.stringify(a);
    this.sendCommand(b.SCENE_PUSH_ANOTHER_QUEST_PART2 + "," + a)
  };
  b.hideSubQuestBg = function()
  {
    this.sendCommand(b.SCENE_POP_ANOTHER_QUEST)
  };
  b.moveSubQuestBg = function(a, c)
  {
    a = JSON.stringify(
    {
      focusId: Number(a),
      isRightRotation: c
    });
    this.sendCommand(b.SCENE_PLAY_ANOTHER_QUEST + "," + a)
  };
  b.moveSubQuestBgPart2 = function(a)
  {
    a = JSON.stringify(a);
    this.sendCommand(b.SCENE_PLAY_ANOTHER_QUEST_PART2 + "," + a)
  };
  b.playCharaMovie = function(a)
  {
    a = String(a);
    a = -1 !== a.indexOf(".usm") ? a : "movie_" + a + ".usm";
    this.sendCommand(b.SCENE_PUSH_MOVIE_CHAR + "," + a)
  };
  b.playMovie = function(a)
  {
    a = String(a);
    a = -1 !== a.indexOf(".usm") ? a : "movie_" + a + ".usm";
    this.sendCommand(b.SCENE_PUSH_MOVIE + "," + a)
  };
  b.endPlayMovie = function()
  {
    this.sendCommand(b.SCENE_POP_MOVIE)
  };
  b.playMovieNoSkip = function(a)
  {
    a = String(a);
    a = -1 !== a.indexOf(".usm") ? a : "movie_" + a + ".usm";
    this.sendCommand(b.SCENE_PUSH_CANT_SKIP_MOVIE + "," + a)
  };
  b.pushEventRaid = function(a)
  {
    a = JSON.stringify(a);
    this.sendCommand(b.SCENE_PUSH_EVENT_RAID + "," + a)
  };
  b.hideEventRaid = function()
  {
    this.sendCommand(b.SCENE_POP_EVENT_RAID)
  };
  b.showRewardEventRaid = function(a)
  {
    a = JSON.stringify(a);
    this.sendCommand(b.SCENE_SHOW_REWARD_EVENT_RAID + "," + a)
  };
  b.appBossEventRaid = function(a)
  {
    a = JSON.stringify(a);
    this.sendCommand(b.SCENE_APP_BOSS_EVENT_RAID + "," + a)
  };
  b.cancelSelectBossEventRaid = function()
  {
    this.sendCommand(b.SCENE_CANCEL_SELECTED_BOSS_EVENT_RAID)
  };
  b.pushMessageEventRaid = function(a)
  {
    a = JSON.stringify(a);
    this.sendCommand(b.SCENE_PUSH_MESSAGE_EVENT_RAID + "," + a)
  };
  b.focusPointEventRaid = function(a)
  {
    a = JSON.stringify(a);
    this.sendCommand(b.SCENE_FOCUS_POINT_EVENT_RAID + "," + a)
  };
  b.appEnemyEventRaid = function(a)
  {
    a = JSON.stringify(a);
    this.sendCommand(b.SCENE_APP_ENEMY_EVENT_RAID + "," + a)
  };
  b.pushEventBranch = function(a, c, d)
  {
    a = {
      questList: a
    };
    c && (a.centerPointId = c);
    d && (a.newPointIdList = d);
    c = JSON.stringify(a);
    this.sendCommand(b.SCENE_PUSH_EVENT_BRANCH + "," + c)
  };
  b.pushMainQuestEventBranch = function(a)
  {
    a = JSON.stringify(a);
    this.sendCommand(b.SCENE_PUSH_EVENT_BRANCH + "," + a)
  };
  b.resumeEventBranch = function()
  {
    this.sendCommand(b.SCENE_RESUME_EVENT_BRANCH)
  };
  b.popEventBranch = function()
  {
    this.sendCommand(b.SCENE_POP_EVENT_BRANCH)
  };
  b.pushEventSingleRaid = function(a)
  {
    a = JSON.stringify(a);
    this.sendCommand(b.SCENE_PUSH_EVENT_SINGLE_RAID + "," + a)
  };
  b.hideEventSingleRaid = function()
  {
    this.sendCommand(b.SCENE_HIDE_EVENT_SINGLE_RAID)
  };
  b.resumeEventSingleRaid = function()
  {
    this.sendCommand(b.SCENE_SHOW_EVENT_SINGLE_RAID)
  };
  b.popEventSingleRaid = function()
  {
    this.sendCommand(b.SCENE_POP_EVENT_SINGLE_RAID)
  };
  b.enableTapEventSingleRaid = function(a)
  {
    a = JSON.stringify(a);
    this.sendCommand(b.SCENE_ENABLE_TAP_EVENT_SINGLE_RAID + "," + a)
  };
  b.scaleEventSingleRaid = function(a)
  {
    a = JSON.stringify(
    {
      scale: a
    });
    this.sendCommand(b.SCENE_VIEW_SCALE_EVENT_SINGLE_RAID + "," + a)
  };
  b.pushEventDungeon = function(a)
  {
    a = JSON.stringify(a);
    this.sendCommand(b.SCENE_PUSH_EVENT_DUNGEON + "," + a)
  };
  b.hideEventDungeon = function()
  {
    this.sendCommand(b.SCENE_POP_EVENT_DUNGEON)
  };
  b.decideEventDungeon = function()
  {
    this.sendCommand(b.SCENE_DECIDE_EVENT_DUNGEON)
  };
  b.positionResetEventDungeon = function()
  {
    this.sendCommand(b.SCENE_FOCUS_EVENT_DUNGEON)
  };
  b.randomIconEventDungeon = function(a)
  {
    a = JSON.stringify(a);
    this.sendCommand(b.SCENE_RANDOM_ICON_EVENT_DUNGEON + "," + a)
  };
  b.pushEventPuellaRaid = function(a)
  {
    a = JSON.stringify(a);
    this.sendCommand(b.SCENE_PUSH_EVENT_PUELLA_RAID + "," + a)
  };
  b.reloadEventPuellaRaid = function(a)
  {
    a = JSON.stringify(a);
    this.sendCommand(b.SCENE_RELOAD_EVENT_PUELLA_RAID + "," + a)
  };
  b.pushEventStoryRaid = function(a)
  {
    a = JSON.stringify(a);
    this.sendCommand(b.SCENE_PUSH_EVENT_STORY_RAID + "," + a)
  };
  b.popEventStoryRaid = function()
  {
    this.sendCommand(b.SCENE_POP_EVENT_STORY_RAID)
  };
  b.pushEmotionBoard = function(a)
  {
    a = JSON.stringify(a);
    this.sendCommand(b.SCENE_PUSH_EMOTION_BOARD + "," + a)
  };
  b.popEmotionBoard = function()
  {
    this.sendCommand(b.SCENE_POP_EMOTION_BOARD)
  };
  b.scaleEmotionBoard = function(a)
  {
    a = JSON.stringify(
    {
      scale: a
    });
    this.sendCommand(b.SCENE_SCALE_EMOTION_BOARD + "," + a)
  };
  b.awakenEmotionBoard = function(a)
  {
    a = JSON.stringify(a);
    this.sendCommand(b.SCENE_APLAY_EMOTION_BOARD + "," + a)
  };
  b.centeringEmotionBoard = function()
  {
    this.sendCommand(b.SCENE_CENTERING_EMOTION_BOARD)
  };
  b.startMirrorBattle = function(a)
  {
    var c = {
      resultUrl: "/magica/index.html#/TopPage",
      retireUrl: "/magica/index.html#/TopPage"
    };
    h.each(c, function(b, d, e)
    {
      a[d] && (c[d] = a[d])
    });
    var d = JSON.stringify(c);
    this.sendCommand(b.SCENE_PUSH_CHAPTER2_MIRROR_BATTLE + "," + d)
  };
  b.setPuellaHistoriaObject = function(a)
  {
    a = JSON.stringify(a);
    this.sendCommand(b.SCENE_PUSH_PUELLA_HISTORIA + "," + a)
  };
  b.deletePuellaHistoriaObject = function()
  {
    this.sendCommand(b.SCENE_POP_PUELLA_HISTORIA)
  };
  b.setScene0StorySelectObject = function(a)
  {
    a = JSON.stringify(a);
    this.sendCommand(b.SCENE_PUSH_SCENARIO_PAGE + "," + a)
  };
  b.deleteScene0StorySelectObject = function()
  {
    this.sendCommand(b.SCENE_POP_SCENARIO_PAGE)
  };
  b.updateScene0StorySelectObject = function(a)
  {
    a = JSON.stringify(a);
    this.sendCommand(b.SCENE_UPDATE_SCENARIO_PAGE + "," + a)
  };
  b.setScene0StoryListObject = function()
  {
    this.sendCommand(b.SCENE_PUSH_SCENARIO_LIST)
  };
  b.deleteScene0StoryListObject = function()
  {
    this.sendCommand(b.SCENE_POP_SCENARIO_LIST)
  };
  b.setWebView = function(a)
  {
    this.sendCommand(b.DISPLAY_SET_WEBVIEW_VISIBLE + "," + (void 0 !== a ? a : !0))
  };
  b.changeBg = function(a, c)
  {
    c = c || !1;
    "web_black.jpg" !== a && (e.background = a);
    var d = {};
    d.filename = a; - 1 !== a.indexOf("web_") ? d.filedir = "resource/image_native/bg/web/" : -1 !== a.indexOf("adv_") ? d.filedir = "resource/image_native/bg/story/" : -1 !== a.indexOf("map_") ? d.filedir = "resource/image_native/bg/quest_top/" : d.filedir = "resource/image_native/bg/web/doppelMission/";
    d.isPortrait = c; - 1 !== a.indexOf("map_") ? (d.fade = {}, d.fade.type = 0, d.fade.time = .3) : (d.fade = {}, d.fade.type = 0, d.fade.time = .2);
    a = JSON.stringify(d);
    this.sendCommand(b.DISPLAY_CHANGE_BG + "," + a)
  };
  b.removeBg = function()
  {
    this.sendCommand(b.DISPLAY_REMOVE_BG)
  };
  b.showL2d = function(a)
  {
    a = JSON.stringify(a);
    this.sendCommand(b.DISPLAY_ADD_L2D + "," + a)
  };
  b.hideL2d = function()
  {
    this.sendCommand(String(b.DISPLAY_REMOVE_L2D))
  };
  b.motionL2d = function(a)
  {
    a = JSON.stringify(a);
    this.sendCommand(b.DISPLAY_PALY_L2D_MOTION + "," + a)
  };
  b.showMiniChara = function(a)
  {
    a = JSON.stringify(a);
    this.sendCommand(b.DISPLAY_ADD_MINI + "," + a)
  };
  b.hideMiniChara = function()
  {
    this.sendCommand(b.DISPLAY_REMOVE_MINI)
  };
  b.showMultiMiniChara = function(a)
  {
    a = JSON.stringify(a);
    this.sendCommand(b.DISPLAY_ADD_MINI_ARRAY + "," + a)
  };
  b.hideMultiMiniChara = function()
  {
    this.sendCommand(b.DISPLAY_REMOVE_MINI_ARRAY)
  };
  b.playComposeEffect = function(a)
  {
    a = JSON.stringify(a);
    this.sendCommand(b.DISPLAY_PLAY_COMPOSE_EFFECT + "," + a)
  };
  b.playComposeResultEffect = function(a)
  {
    a = JSON.stringify(a);
    this.sendCommand(b.DISPLAY_SHOW_COMPOSE_RESULT + "," + a)
  };
  b.stopComposeEffect = function()
  {
    this.sendCommand(b.DISPLAY_HIDE_COMPOSE)
  };
  b.playComposeMagiaEffect = function(a)
  {
    a = JSON.stringify(a);
    this.sendCommand(b.DISPLAY_PLAY_COMPOSE_MAGIA + "," + a)
  };
  b.playCustomizeEffect = function(a)
  {
    a = JSON.stringify(a);
    this.sendCommand(b.DISPLAY_PLAY_AWAKE_ABILITY + "," + a)
  };
  b.playComposeAttributeEffect = function(a)
  {
    a = JSON.stringify(a);
    this.sendCommand(b.DISPLAY_PLAY_COMPOSE_ATTRIBUTES + "," + a)
  };
  b.playBulkCustomizeEffect = function(a)
  {
    a = JSON.stringify(a);
    this.sendCommand(b.DISPLAY_PLAY_AWAKE_ABILITIES + "," + a)
  };
  b.playNormalGachaMemoria = function(a)
  {
    a = JSON.stringify(a);
    this.sendCommand(b.DISPLAY_PLAY_NORMAL_GACHA_TOP + "," + a)
  };
  b.stopNormalGachaMemoria = function()
  {
    this.sendCommand(b.DISPLAY_STOP_NORMAL_GACHA_TOP)
  };
  b.displayMemoriaTop = function(a)
  {
    a = JSON.stringify(a);
    this.sendCommand(b.DISPLAY_PLAY_MEMORIA_TOP + "," + a)
  };
  b.stopMemoriaTop = function()
  {
    this.sendCommand(b.DISPLAY_STOP_MEMORIA_TOP)
  };
  b.storyMotionL2dVoice = function(a)
  {
    a = JSON.stringify(a);
    this.sendCommand(b.DISPLAY_PLAY_GENERAL_STORY + "," + a)
  };
  b.storyMotionL2d = function(a)
  {
    a = JSON.stringify(a);
    this.sendCommand(b.DISPLAY_PLAY_ONE_SHOT_STORY + "," + a)
  };
  b.noticeGetStatus = function(a)
  {
    this.sendCommand(b.NOTI_GET_CONF_PNOTE + (a ? "," + a : ""))
  };
  b.noticeRegist = function(a)
  {
    a = a ? b.NOTI_AWAKE_PNOTE + "," + JSON.stringify(a) : b.NOTI_AWAKE_PNOTE;
    this.sendCommand(a)
  };
  b.noticeTurnOn = function(a)
  {
    a = a ? b.NOTI_TURN_ON_PNOTE + "," + JSON.stringify(a) : b.NOTI_TURN_ON_PNOTE;
    this.sendCommand(a)
  };
  b.noticeRestore = function()
  {
    this.sendCommand(b.NOTI_TURN_OFF_PNOTE)
  };
  b.noticeGetWeekly = function(a)
  {
    this.sendCommand(b.NOTI_GET_CONF_WEEKLY_QUEST + (a ? "," + a : ""))
  };
  b.noticeSetWeekly = function(a)
  {
    a = JSON.stringify(a);
    this.sendCommand(b.NOTI_TURN_ON_WEEKLY_QUEST + "," + a)
  };
  b.noticeOffWeekly = function(a)
  {
    this.sendCommand(b.NOTI_TURN_OFF_WEEKLY_QUEST + "," + a)
  };
  b.noticeApConfig = function(a)
  {
    this.sendCommand(b.NOTI_GET_CONF_AP_FULL + (a ? "," + a : ""))
  };
  b.noticeApFullSet = function(a)
  {
    this.sendCommand(0 < a ? b.NOTI_TURN_ON_AP_FULL + "," + a : b.NOTI_CANCEL_AP_FULL)
  };
  b.noticeApFullTurnOn = function()
  {
    this.sendCommand(b.NOTI_TURN_ON_AP_FULL + ",0")
  };
  b.noticeApFullOff = function()
  {
    this.sendCommand(b.NOTI_TURN_OFF_AP_FULL)
  };
  b.noticeStoryRaidBossDied = function(a)
  {
    a = JSON.stringify(a);
    this.sendCommand(b.NOTI_STORY_RAID_BOSS_DIED + "," + a)
  };
  b.formationPreview = function(a)
  {
    a = JSON.stringify(a);
    this.sendCommand(b.DISPLAY_PLAY_FORMATION + "," + a)
  };
  b.formationPreviewRemove = function()
  {
    this.sendCommand(b.DISPLAY_STOP_FORMATION)
  };
  b.enemyFormationPreview = function(a)
  {
    a = JSON.stringify(a);
    this.sendCommand(b.DISPLAY_PLAY_FORMATION_ENEMY + "," + a)
  };
  b.enemyFormationPreviewRemove = function()
  {
    this.sendCommand(b.DISPLAY_STOP_FORMATION_ENEMY)
  };
  b.weekQuestTopSet = function(a)
  {
    a = JSON.stringify(a);
    this.sendCommand(b.DISPLAY_PLAY_WEEKLY_QUEST_TOP + "," + a)
  };
  b.weekQuestTopUnset = function()
  {
    this.sendCommand(b.DISPLAY_STOP_WEEKLY_QUEST_TOP)
  };
  b.playEffect = function(a)
  {
    a = JSON.stringify(a);
    this.sendCommand(b.DISPLAY_PLAY_EFFECT + "," + a)
  };
  b.stopEffect = function()
  {
    this.sendCommand(b.DISPLAY_STOP_EFFECT)
  };
  b.turnOnCamera = function()
  {
    this.sendCommand(b.SCENE_PUSH_CAMERA)
  };
  b.turnOffCamera = function()
  {
    this.sendCommand(b.SCENE_POP_CAMERA)
  };
  b.swapCamera = function()
  {
    this.sendCommand(b.SCENE_SWAP_CAMERA)
  };
  b.zoomCamera = function(a)
  {
    var c = {};
    c.ratio = a;
    a = JSON.stringify(c);
    this.sendCommand(b.SCENE_ZOOM_CAMERA + "," + a)
  };
  b.captureCamera = function()
  {
    this.sendCommand(b.SCENE_CAPTURE_CAMERA)
  };
  return b
});
