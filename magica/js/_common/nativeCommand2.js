define(["underscore", "backbone", "backboneCommon"], function(k, l, e)
{
  document.getElementById("commandDiv");
  var b = {
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
      DATA_RETRY_PURCHASE_ITEM: 12,
      DATA_GET_SNS_USER_ID: 20,
      DATA_GET_APP_VERSION: 21,
      DATA_GET_DOWNLOAD_CONFIG: 22,
      DATA_GET_DEVICE_INFO: 23,
      DATA_GET_ACCESS_TOKEN: 24,
      DATA_CLOSE_APP: 25,
      DATA_GET_FONT: 30,
      DATA_GET_QUEST_RESULT_JSON: 40,
      DATA_OPEN_URL: 50,
      DATA_GET_BASE64: 60,
      DATA_SET_CLIPBOARD: 62,
      DATA_GET_REWARD: 70,
      DATA_DELETE_REWARD: 71,
      DATA_SET_FOX: 80,
      DATA_OPEN_EDIT_BOX: 90,
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
      SCENE_PUSH_WEBVIEW: 201,
      SCENE_POP_WEBVIEW: 202,
      SCENE_PUSH_LOADING: 211,
      SCENE_PUSH_DOWNLOAD: 221,
      SCENE_PUSH_GACHA: 231,
      SCENE_PUSH_PRESENT: 232,
      SCENE_POP_GACHA: 233,
      SCENE_PUSH_EVOLUTION: 241,
      SCENE_PUSH_MEMORIA_COMPOSE: 251,
      SCENE_PUSH_STORY: 261,
      SCENE_PUSH_QUEST_STORY: 262,
      SCENE_PUSH_BRANCH_STORY: 263,
      SCENE_PUSH_QUEST: 271,
      SCENE_POP_QUEST: 272,
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
      SCENE_PUSH_MOVIE: 351,
      SCENE_POP_MOVIE: 352,
      SCENE_PUSH_MOVIE_CHAR: 361,
      SCENE_PUSH_EVENT_BRANCH: 371,
      SCENE_RESUME_EVENT_BRANCH: 372,
      SCENE_POP_EVENT_BRANCH: 373,
      SCENE_PUSH_EVENT_SINGLE_RAID: 381,
      SCENE_HIDE_EVENT_SINGLE_RAID: 382,
      SCENE_SHOW_EVENT_SINGLE_RAID: 383,
      SCENE_POP_EVENT_SINGLE_RAID: 384,
      DISPLAY_SET_WEBVIEW_VISIBLE: 400,
      DISPLAY_CHANGE_BG: 410,
      DISPLAY_REMOVE_BG: 411,
      DISPLAY_ADD_L2D: 420,
      DISPLAY_REMOVE_L2D: 421,
      DISPLAY_PALY_L2D_MOTION: 422,
      DISPLAY_ADD_MINI: 430,
      DISPLAY_REMOVE_MINI: 431,
      DISPLAY_PLAY_MINI_MOTION: 432,
      DISPLAY_PLAY_COMPOSE_EFFECT: 450,
      DISPLAY_SHOW_COMPOSE_RESULT: 451,
      DISPLAY_HIDE_COMPOSE: 452,
      DISPLAY_PLAY_COMPOSE_MAGIA: 460,
      DISPLAY_PLAY_AWAKE_ABILITY: 465,
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
      DISPLAY_PLAY_FORMATION: 600,
      DISPLAY_STOP_FORMATION: 601,
      DISPLAY_PLAY_FORMATION_ENEMY: 620,
      DISPLAY_STOP_FORMATION_ENEMY: 621,
      DISPLAY_PLAY_WEEKLY_QUEST_TOP: 610,
      DISPLAY_STOP_WEEKLY_QUEST_TOP: 611,
      sendCommand: function(a)
      {
        var b = String(a);
        window.isDebug && (a = "scheme://" + b.split(",")[0], "" !== b.replace(/\d*,?/, "") && (a += "?command=" + b.replace(/\d*,?/, "")), console.log("native:command: " + a));
        window.isBrowser || (a = "scheme://" + b.split(",")[0], "" !== b.replace(/\d*,?/, "") && (a += "?command=" + b.replace(/\d*,?/, "")), b = e.doc.createElement("object"), b.setAttribute("display", "none"), b.setAttribute("data", a), e.doc.documentElement.appendChild(b), b.parentNode.removeChild(b))
      }
    },
    h = [
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
      text: "ドッペルを持つ魔法少女は@マギアゲージが200まで溜まると発動できます"
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
      text: "マギアLvを5にするとマギアゲージ上限が@200まで解放されます"
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
    }];
  b.clearWebCache = function(a)
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
  };
  b.removeAsset = function(a, c)
  {
    var d = {};
    d.category = a;
    d.callback = c ? c : "nativeCallback";
    a = JSON.stringify(d);
    this.sendCommand(b.DATA_REMOVE_ASSET + "," + a)
  };
  b.removeFile = function(a)
  {
    a = JSON.stringify(a);
    this.sendCommand(b.DATA_REMOVE_ASSET_FILE + "," + a)
  };
  b.existFile = function(a)
  {
    a = JSON.stringify(a);
    this.sendCommand(b.DATA_ASSET_FILE_EXIST + "," + a)
  };
  b.callTouchesBegin = function(a)
  {
    a = JSON.stringify(a);
    this.sendCommand(b.DATA_CALL_TOUCHES_BEGIN + "," + a)
  };
  b.callTouchesMove = function(a)
  {
    a = JSON.stringify(a);
    this.sendCommand(b.DATA_CALL_TOUCHES_MOVE + "," + a)
  };
  b.callTouchesEnd = function(a)
  {
    a = JSON.stringify(a);
    this.sendCommand(b.DATA_CALL_TOUCHES_END + "," + a)
  };
  b.callTouchesClear = function()
  {
    this.sendCommand(b.DATA_CALL_TOUCHES_CLEAR)
  };
  b.awakePurchase = function()
  {
    this.sendCommand(b.DATA_AWAKE_PURCHASE)
  };
  b.purchaseItem = function(a)
  {
    this.sendCommand(b.DATA_PURCHASE_ITEM + "," + (window.isDebug ? "jp.f4samurai.madomagi.purchase.item." + a.moneyCode : "com.aniplex.magireco.item." + a.moneyCode))
  };
  b.getSNS = function()
  {
    this.sendCommand(b.DATA_GET_SNS_USER_ID)
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
  b.getFontData = function()
  {
    this.sendCommand(b.DATA_GET_FONT)
  };
  b.getQuestResult = function(a)
  {
    a = JSON.stringify(a);
    this.sendCommand(b.DATA_GET_QUEST_RESULT_JSON + "," + a)
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
  b.getRewardPrm = function()
  {
    this.sendCommand(b.DATA_GET_REWARD + ",nativeCallback")
  };
  b.deleteRewardPrm = function()
  {
    this.sendCommand(b.DATA_DELETE_REWARD)
  };
  b.setFoxData = function(a)
  {
    a = JSON.stringify(a);
    this.sendCommand(b.DATA_SET_FOX + "," + a)
  };
  b.openKeyBoard = function(a, c, d, e)
  {
    var g = {};
    g.text = a ? a : "";
    c && 0 < c && (g.maxLength = Number(c));
    d && 0 < d && (g.keyboardType = 1);
    e && (g.callback = e);
    a = JSON.stringify(g);
    this.sendCommand(b.DATA_OPEN_EDIT_BOX + "," + a)
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
  b.killWebView = function()
  {
    this.sendCommand(b.SCENE_POP_WEBVIEW)
  };
  b.startLoading = function(a)
  {
    a = JSON.stringify(a);
    this.sendCommand(b.SCENE_PUSH_LOADING + "," + a)
  };
  b.downloadFile = function(a)
  {
    this.sendCommand(b.SCENE_PUSH_DOWNLOAD + "," + a)
  };
  b.downloadFileConfigPage = function(a)
  {
    var c = {};
    c.category = a;
    c.isNeedConfirm = !0;
    a = JSON.stringify(c);
    this.sendCommand(b.SCENE_PUSH_DOWNLOAD + "," + a)
  };
  b.downloadFileFullVoice = function(a)
  {
    var c = {};
    c.category = a;
    c.isNeedConfirm = !0;
    a = JSON.stringify(c);
    this.sendCommand(b.SCENE_PUSH_DOWNLOAD + "," + a)
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
    e.storage.user && "TU999" == d && (f.userName = e.storage.user.toJSON().loginName);
    "TU998" == d && "101103-10" == a && (f.canSkip = !1);
    c && k.each(c, function(a, b)
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
    e.storage.user && "TU999" == c && (d.userName = e.storage.user.toJSON().loginName);
    "TU998" == c && "101103-10" == a && (d.canSkip = !1);
    a = JSON.stringify(d);
    this.sendCommand(b.SCENE_PUSH_QUEST_STORY + "," + a)
  };
  b.startBranchStory = function(a)
  {
    var c = e.storage.user.get("tutorialId");
    e.storage.user && "TU999" == c && (a.userName = e.storage.user.get("loginName"));
    a = JSON.stringify(a);
    this.sendCommand(b.SCENE_PUSH_BRANCH_STORY + "," + a)
  };
  b.startQuest = function(a, c)
  {
    var d = {};
    d.questId = a;
    c ? (d.resultUrl = c.resultUrl, d.retireUrl = c.retireUrl) : (d.resultUrl = "/magica/index.html#/QuestResult", d.retireUrl = "/magica/index.html#/MainQuest");
    d.tips = h[Math.floor(Math.random() * h.length)];
    a = JSON.stringify(d);
    this.sendCommand(b.SCENE_PUSH_QUEST + "," + a)
  };
  b.endQuest = function()
  {
    this.sendCommand(b.SCENE_POP_QUEST)
  };
  b.startArena = function(a)
  {
    a.tips = h[Math.floor(Math.random() * h.length)];
    a.record = !0;
    a = JSON.stringify(a);
    this.sendCommand(b.SCENE_PUSH_QUEST + "," + a)
  };
  b.endArena = function()
  {
    this.sendCommand(b.SCENE_POP_QUEST)
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
  b.touchMiniChara = function(a)
  {
    a = JSON.stringify(a);
    this.sendCommand(b.DISPLAY_PLAY_MINI_MOTION + "," + a)
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
    this.sendCommand(b.NOTI_TURN_ON_AP_FULL + ",1")
  };
  b.noticeApFullOff = function()
  {
    this.sendCommand(b.NOTI_TURN_OFF_AP_FULL)
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
