define("underscore backbone backboneCommon ajaxControl command text!template/config/deleteUserData/popupConfirm.html text!template/config/deleteUserData/popupInputPlayerID.html text!template/config/deleteUserData/popupError.html text!template/config/deleteUserData/popupReConfirm.html text!template/config/deleteUserData/popupComplete.html".split(" "), function(e, v, a, f, d, g, h, k, l, m)
{
  var p = function()
    {
      new a.PopupClass(
      {
        title: "プレイヤーデータ削除",
        content: g,
        closeBtnText: "キャンセル",
        decideBtnText: "OK",
        decideBtnEvent: function()
        {
          n()
        }
      }, null, function() {})
    },
    n = function()
    {
      new a.PopupClass(
      {
        title: "プレイヤーデータ削除",
        content: h,
        popupType: "typeB",
        exClass: "popupInputPlayerID",
        closeBtnText: "キャンセル",
        decideBtnText: "OK",
        decideBtnEvent: function()
        {
          var b = $("#playerID").val(),
            c = a.storage.gameUser.get("inviteCode");
          b == c ? q() : r()
        }
      }, null, function()
      {
        a.nativeKeyBoard("playerID", -1, 1, null, null)
      })
    },
    q = function()
    {
      var b = {
        level: a.storage.gameUser.get("level"),
        loginName: a.storage.user.get("loginName"),
        birthDayOrg: a.storage.user.get("birthDay"),
        isDispBirthDay: ""
      };
      if (b.birthDayOrg)
      {
        var c = a.getDateShortening(
        {
          date: b.birthDayOrg
        });
        b.birthDay = c.yr + "年" + c.mo + "月"
      }
      else b.isDispBirthDay = "noDisp";
      b = e.template(l)(
      {
        model: b
      });
      new a.PopupClass(
      {
        title: "プレイヤーデータ削除",
        content: b,
        exClass: "popupReConfirm",
        closeBtnText: "キャンセル",
        decideBtnText: "OK",
        decideBtnEvent: function()
        {
          t()
        }
      }, null, function() {})
    },
    r = function()
    {
      new a.PopupClass(
      {
        title: "プレイヤーデータ削除",
        content: k,
        closeBtnText: "OK"
      }, null, function() {})
    },
    t = function()
    {
      f.ajaxPost(a.linkList.deleteUser,
      {}, function(a)
      {
        $("#commandDiv").on("nativeCallback", function(a)
        {
          $("#commandDiv").off();
          $("#commandDiv").on("nativeCallback", function(a)
          {
            $("#commandDiv").off();
            u()
          });
          d.configDataInitilize();
          window.isBrowser && nativeCallback()
        });
        d.userDataInitilize();
        window.isBrowser && nativeCallback()
      })
    },
    u = function()
    {
      new a.PopupClass(
      {
        title: "プレイヤーデータ削除",
        content: m,
        closeBtnText: "OK"
      }, null, function()
      {
        localStorage.clear()
      }, function()
      {
        d.nativeReload("#/TopPage");
        window.isBrowser && (location.href = "#/TopPage")
      })
    };
  return {
    init: function()
    {
      p()
    },
    remove: function(a)
    {
      a()
    }
  }
});
