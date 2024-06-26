define("underscore backbone backboneCommon text!template/follow/FollowPopup.html ajaxControl cardUtil command".split(" "), function(u, A, a, v, f, B, k)
{
  var w = u.template(v),
    h, e, m, g, n, d = !1,
    p, q, r = function(c)
    {
      d = !1;
      var l = function()
        {
          a.followSave && (a.followSave.active = !1)
        },
        b = function(b)
        {
          window.isLocal && (b = JSON.parse(b));
          if ("error" !== b.resultCode)
          {
            var c = [];
            for (i = 1; 7 > i; i++)
              if (b.userDeck["userCardId" + i])
              {
                var d = u.findWhere(b.userCardList,
                {
                  id: b.userDeck["userCardId" + i]
                });
                d.attNum = b.userDeck["questPositionId" + i];
                c.push(d)
              } a.followSave && (a.followSave.active = !0, a.followSave.scrollHash = g, a.followSave.pagingNum = p ? p : 1, a.followSave.pagingNumFollow = q ? q : 1, a.doc.getElementById("followSort") ? a.followSave.sortValue = a.doc.getElementById("followSort").value : a.followSave.sortValue = null);
            a.supportCheckModel = b;
            new a.PopupClass(
            {
              content: "",
              popupType: "typeB",
              exClass: "userProfile followerPop"
            }, null, null, l);
            a.doc.createDocumentFragment();
            var d = a.doc.createElement("div"),
              h = a.isRankingRunning(
              {
                eventList: f.getPageJson().eventList,
                regularEventList: f.getPageJson().regularEventList
              });
            d.innerHTML = w(
            {
              model: e,
              profile: b,
              support: c,
              rankingRunning: h
            });
            a.doc.getElementById("popupArea").getElementsByClassName("popupTextArea")[0].appendChild(d);
            a.doc.getElementById("myProfile").getElementsByClassName("arenaHelpBtn")[0].addEventListener(a.cgti, x);
            c = a.doc.getElementById("utilBtns");
            c.getElementsByClassName("follow")[0].addEventListener(a.cgti, y);
            c.getElementsByClassName("disFollow")[0].addEventListener(a.cgti, z);
            e.blocked ? a.doc.getElementById("followImageWrap").getElementsByClassName("messageInner")[0].textContent = "ブロック中です" : a.doc.getElementById("followImageWrap").getElementsByClassName("messageInner")[0].textContent = b.gameUser.comment;
            "arena" === m && (a.doc.getElementsByClassName("helpBtnWrap")[0].style.display = "none");
            window.isDebug && a.doc.querySelector("#debugArenaBtn").addEventListener(a.cgti, function(c)
            {
              c.preventDefault();
              a.isScrolled() || (a.storage.userStatusList.findWhere(
              {
                statusId: "BTP"
              }) && 0 == a.storage.userStatusList.findWhere(
              {
                statusId: "BTP"
              }).point ? new a.PopupClass(
              {
                title: "BPが足りません",
                content: "BPを回復してもう一度お試しください。",
                closeBtnText: "閉じる"
              }) : f.ajaxPost(a.linkList.arenaStart,
              {
                opponentUserId: b.userId,
                arenaBattleType: "SIMULATE"
              }, function(b)
              {
                a.acpTimeCure && (clearInterval(a.acpTimeCure), a.acpTimeCure = null);
                $(a.ready.target).on("webkitAnimationEnd", function()
                {
                  k.changeBg("web_black.jpg");
                  $(a.ready.target).off("webkitAnimationEnd");
                  $(a.ready.target).on("webkitAnimationEnd", function(b)
                  {
                    "readyFadeOut" == b.originalEvent.animationName && (a.ready.target.className = "")
                  });
                  var c = {};
                  c.questId = b.userQuestBattleResultList[0].id;
                  c.replayId = b.userQuestBattleResultList[0].replayId;
                  c.resultUrl = "/magica/index.html#/TopPage";
                  c.retireUrl = "/magica/index.html#/ArenaFreeRank";
                  c.tips = {
                    type: 2
                  };
                  a.globalMenuView && a.globalMenuView.trigger("removeView");
                  setTimeout(function()
                  {
                    k.setWebView(!1);
                    k.startArena(c)
                  }, 500)
                });
                a.g_popup_instance.remove();
                a.addClass(a.ready.target, "preNativeFadeIn")
              }))
            })
          }
          k.getBaseData(a.getNativeObj())
        };
      window.isLocal ? require(["text!/magica/json/friend/user/1.json"], function(a)
      {
        b(a)
      }) : f.ajaxSimpleGet(a.linkList.followerProfile, g, b)
    },
    x = function(c)
    {
      c.preventDefault();
      a.isScrolled() || a.setHelpPopup("10,14_05", "ミラーズについて", r)
    },
    y = function(c)
    {
      c.preventDefault();
      if (!a.isScrolled() && !d)
      {
        var l = a.storage.userStatusList.findWhere(
        {
          statusId: "MAX_FOLLOW"
        }).toJSON().point;
        l <= a.storage.userFollowList.length ? new a.PopupClass(
        {
          title: "フォロー上限",
          content: "フォロー上限に達しています<br>これ以上フォローできません。<br><br>" + ("フォロー数: " + a.storage.userFollowList.length + "/" + l + "人"),
          closeBtnText: "閉じる"
        }) : (d = !0, f.ajaxPost(a.linkList.sendFollow,
        {
          friendUserId: g
        }, function(b)
        {
          d = !1;
          "error" !== b.resultCode && (a.responseSetStorage(b), new a.PopupClass(
          {
            title: "フォロー追加",
            content: "<span class='c_pink popUserName'></span>をフォローしました。<br><br>" + ("フォロー数: " + a.storage.userFollowList.length + "/" + l + "人"),
            closeBtnText: "閉じる"
          }, null, function()
          {
            $(a.doc.getElementsByClassName("popUserName")).text(e.userName)
          }), t() && n.rootView.allCheckAndChange(g, "follow"))
        }))
      }
    },
    z = function(c)
    {
      c.preventDefault();
      a.isScrolled() || d || (d = !0, f.ajaxPost(a.linkList.unfollow,
      {
        friendUserId: g
      }, function(c)
      {
        d = !1;
        if ("error" !== c.resultCode)
        {
          var b = a.storage.userFollowList.length - c.deleted.userFollowList.length;
          a.responseSetStorage(c);
          t() || a.storage.userFollowList.remove(a.storage.userFollowList.findWhere(
          {
            followUserId: g
          }));
          c = a.storage.userStatusList.findWhere(
          {
            statusId: "MAX_FOLLOW"
          }).toJSON().point;
          new a.PopupClass(
          {
            title: "フォロー解除",
            content: "<span class='popUserName'></span>のフォローを解除しました。<br><br>" + ("フォロー数: " + b + "/" + c + "人"),
            closeBtnText: "閉じる"
          }, null, function()
          {
            $(a.doc.getElementsByClassName("popUserName")).text(e.userName)
          });
          t() && n.rootView.allCheckAndChange(g, "unfollow")
        }
      }))
    },
    t = function()
    {
      var a = !1;
      switch (m)
      {
        case "follow":
        case "block":
        case "search":
        case "follower":
          a = !0
      }
      return a
    };
  return {
    followerDetailPopup: function(c, d)
    {
      clearTimeout(h);
      h = setTimeout(function()
      {
        if (!a.isScrolled())
        {
          if (a.ua.android)
          {
            var b = a.doc.body.scrollTop;
            if (30 < b - a.g_window_posY || -30 > b - a.g_window_posY) return
          }
          c.preventDefault();
          e = d;
          r()
        }
      }, 800)
    },
    popupTimerStop: function(a)
    {
      clearTimeout(h)
    },
    instantPopup: function(a, d, b, f, h, k)
    {
      e = d;
      m = b;
      g = "follow" === b ? e.followUserId : "follower" === b ? e.followerUserId : "block" === b ? e.blockUserId : "search" === b ? e.id : e.userId;
      n = f;
      p = h;
      q = k;
      r()
    }
  }
});
