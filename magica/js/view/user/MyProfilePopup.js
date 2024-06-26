define("underscore backbone backboneCommon ajaxControl cardUtil command".split(" "), function(h, C, a, k, D, r)
{
  var n, p, q, l, m = "",
    g = function()
    {
      var c = function(e)
      {
        require(["text!template/user/MyProfilePopup.html"], function(d)
        {
          n || (n = h.template(d));
          window.isLocal && (e = JSON.parse(e));
          new a.PopupClass(
          {
            content: "",
            popupType: "typeB",
            exClass: "userProfile"
          });
          d = k.getPageJson();
          a.doc.createDocumentFragment();
          var c = a.doc.createElement("div");
          l = a.storage.gameUser.toJSON();
          var f = [];
          for (i = 1; 7 > i; i++)
            if (e.userDeck["userCardId" + i])
            {
              var b = h.findWhere(e.userCardList,
              {
                id: e.userDeck["userCardId" + i]
              });
              b.attNum = e.userDeck["questPositionId" + i];
              f.push(b);
              b = null
            } a.storage.userStatusList.findWhere(
          {
            statusId: "BTP"
          }).get("point");
          a.storage.userStatusList.findWhere(
          {
            statusId: "MAX_BTP"
          }).get("point");
          var b = a.isRankingRunning(
            {
              eventList: k.getPageJson().eventList,
              regularEventList: k.getPageJson().regularEventList
            }),
            t = d.userTotalForces && d.userTotalForces.totalForces ? d.userTotalForces.totalForces : 0;
          c.innerHTML = n(
          {
            model: l,
            profile: e,
            support: f,
            rankingRunning: b,
            totalForces: t
          });
          a.doc.getElementById("popupArea").getElementsByClassName("popupTextArea")[0].appendChild(c);
          c = null;
          d = a.doc.getElementById("myProfStone");
          d.innerHTML = a.doc.getElementById("money").innerHTML;
          a.addClass(d.getElementsByClassName("pointWrap")[0], "pointFrame");
          a.doc.getElementById("followImageWrap").getElementsByClassName("messageInner")[0].textContent = l.comment;
          secondFrgmnt = null;
          d = a.doc.getElementById("myProfile");
          d.getElementsByClassName("miniBtn")[0].addEventListener(a.cgti, w);
          d.getElementsByClassName("titleChangeBtn")[0].addEventListener(a.cgti, x);
          d.getElementsByClassName("totalForcesHelpBtn")[0].addEventListener(a.cgti, y);
          d.getElementsByClassName("arenaHelpBtn")[0].addEventListener(a.cgti, z);
          d.getElementsByClassName("userIdCopyBtn")[0].addEventListener(a.cgti, A);
          d.getElementsByClassName("arenaSettingPopupBtn")[0].addEventListener(a.cgti, B);
          var u = function(d)
          {
            var b = "圏外";
            if (d.rankingInfo) b = d.rankingInfo.ranking;
            else
            {
              var c = "----";
              d.bottomForces && (c = d.bottomForces - t, 0 > c && (c = 0));
              a.doc.getElementById("totalForcesRequire").innerHTML = "前回集計時の圏内まであと：" + c
            }
            a.doc.getElementById("totalForcesRanking").innerHTML = b
          };
          window.isLocal ? require(["text!/magica/json/totalForcesRanking/getRanking.json"], function(a)
          {
            u(a)
          }) : k.ajaxSimpleGet(a.linkList.getTotalForcesRanking, "", u);
          r.getBaseData(a.getNativeObj())
        })
      };
      window.isLocal ? require(["text!/magica/json/friend/user/1.json"], function(a)
      {
        c(a)
      }) : k.ajaxSimpleGet(a.linkList.followerProfile, a.storage.gameUser.toJSON().userId, c)
    },
    B = function(c)
    {
      c.preventDefault();
      if (!a.isScrolled())
      {
        var e = {
            visibleRankingClassType: l.visibleRankingClassType,
            emblemSettingClassType: l.emblemSettingClassType
          },
          d = Object.assign(
          {}, e);
        m = m ? l.emblemSettingClassType : "RANKING";
        var v = function(b)
          {
            b.preventDefault();
            if (!a.isScrolled()) switch (b = b.currentTarget, b.dataset.param)
            {
              case "on":
                d.visibleRankingClassType = !0;
                a.removeClass(b.parentNode.parentNode, "off");
                a.addClass(b.parentNode.parentNode, "on");
                a.removeClass(a.doc.getElementsByClassName("emblemSettingWrap")[0], "block");
                a.removeClass(a.doc.getElementsByClassName("emblemSettingWrapBlock")[0], "on");
                "RANKING" == m ? a.addClass(a.doc.getElementsByClassName("emblemSettingCheckBoxWrap")[0], "RANKING") : "RANK_MATCH" == m && a.addClass(a.doc.getElementsByClassName("emblemSettingCheckBoxWrap")[0], "RANK_MATCH");
                break;
              case "off":
                d.visibleRankingClassType = !1, a.removeClass(b.parentNode.parentNode, "on"), a.addClass(b.parentNode.parentNode, "off"), a.addClass(a.doc.getElementsByClassName("emblemSettingWrap")[0], "block"), a.addClass(a.doc.getElementsByClassName("emblemSettingWrapBlock")[0], "on"), a.removeClass(a.doc.getElementsByClassName("emblemSettingCheckBoxWrap")[0], "RANKING"), a.removeClass(a.doc.getElementsByClassName("emblemSettingCheckBoxWrap")[0], "RANK_MATCH")
            }
          },
          f = function(b)
          {
            b.preventDefault();
            if (!a.isScrolled())
            {
              b = b.currentTarget;
              var c = b.dataset.param;
              m = c;
              d.emblemSettingClassType = c;
              switch (c)
              {
                case "RANKING":
                  a.removeClass(b.parentNode.parentNode, "RANK_MATCH");
                  a.addClass(b.parentNode.parentNode, "RANKING");
                  break;
                case "RANK_MATCH":
                  a.removeClass(b.parentNode.parentNode, "RANKING"), a.addClass(b.parentNode.parentNode, "RANK_MATCH")
              }
            }
          },
          b = function(b)
          {
            b.preventDefault();
            if (!a.isScrolled())
            {
              $("#arenaSettingPopup .toggleBtn").off(a.cgti);
              $("#arenaSettingPopup #rankingWrap").on(a.cgti);
              $("#arenaSettingPopup #rankMatchWrap").on(a.cgti);
              b = JSON.stringify(e);
              var c = JSON.stringify(d),
                f = a.doc.getElementById("arenaDecideTemp").innerHTML,
                f = h.template(f);
              b !== c ? k.ajaxPost(a.linkList.setVisibleRankingClassType, d, function(b)
              {
                a.responseSetStorage(b);
                new a.PopupClass(
                {
                  title: "ミラーズ設定",
                  content: "エンブレムの表示設定を<br>変更しました",
                  closeBtnText: "OK",
                  popupType: "typeC"
                }, null, null, g)
              }) : new a.PopupClass(
              {
                title: "ミラーズ設定",
                content: "エンブレムの表示設定を<br>変更しました",
                closeBtnText: "OK",
                popupType: "typeC"
              }, null, null, g)
            }
          };
        c = a.doc.getElementById("arenaSettingTemp").innerHTML;
        c = h.template(c);
        new a.PopupClass(
        {
          title: "ミラーズ設定",
          content: c(
          {
            currentParam: e
          }),
          popupId: "arenaSettingPopup",
          popupType: "typeE"
        }, null, function()
        {
          $("#arenaSettingPopup .visibleSettingCheckBox").on(a.cgti, v);
          $("#arenaSettingPopup .emblemSettingCheckBox").on(a.cgti, f);
          $("#arenaSettingPopup #settingDecideBtn").on(a.cgti, b)
        })
      }
    },
    A = function(c)
    {
      c.preventDefault();
      a.isScrolled() || (c = a.storage.gameUser.get("inviteCode"), r.copyClipboard(c), new a.PopupClass(
      {
        title: "プレイヤーID",
        content: "クリップボードにコピーしました。",
        closeBtnText: "OK",
        popupType: "typeC"
      }, null, null, g))
    },
    z = function(c)
    {
      c.preventDefault();
      a.isScrolled() || a.setHelpPopup("10,14_05", "ミラーズについて", g)
    },
    y = function(c)
    {
      c.preventDefault();
      a.isScrolled() || a.setHelpPopup("17", "魔法少女　総合戦力について", g)
    },
    w = function(c)
    {
      c.preventDefault();
      a.isScrolled() || require(["text!template/user/MyProfilePopup2.html"], function(c)
      {
        p || (p = h.template(c));
        new a.PopupClass(
        {
          title: "コメント編集",
          content: "",
          popupType: "typeC"
        }, null, null, g);
        a.doc.createDocumentFragment();
        c = a.doc.createElement("div");
        c.innerHTML = p(
        {
          model: l
        });
        a.doc.getElementById("popupArea").getElementsByClassName("popupTextArea")[0].appendChild(c);
        var d = function()
        {
          a.nativeKeyBoard("commentInput", 50, 0, "textCount", d)
        };
        d();
        var e = !1;
        a.doc.getElementById("commentDecide").addEventListener(a.cgti, function(c)
        {
          c.preventDefault();
          a.isScrolled() || e || (e = !0, c = {
            comment: a.doc.getElementById("commentInput").value
          }, k.ajaxPost(a.linkList.editComment, c, function(b)
          {
            "error" !== b.resultCode && (a.responseSetStorage(b), new a.PopupClass(
            {
              title: "コメント編集",
              content: "コメントを編集しました。",
              closeBtnText: "OK",
              popupType: "typeC"
            }, null, null, g))
          }))
        })
      })
    },
    x = function(c)
    {
      c.preventDefault();
      a.isScrolled() || require(["text!template/user/SetTitlePopup.html"], function(c)
      {
        q || (q = h.template(c));
        newTarget = null;
        var d = function()
        {
          $(".listTitles").off();
          $("#titleChangeDecide").off();
          g()
        };
        new a.PopupClass(
        {
          title: "称号変更",
          content: "",
          popupType: "typeB",
          exClass: "titleChangePop"
        }, null, function()
        {
          $(".listTitles").on(a.cgti, function(b)
          {
            b.preventDefault();
            if (!a.isScrolled())
            {
              var c = b.currentTarget.classList.contains("unknown") ? !0 : !1;
              if (c)
              {
                var e = b.currentTarget.getElementsByClassName("userTitleBg")[0].src;
                b = a.storage.titleList.findWhere(
                {
                  id: b.currentTarget.dataset.tid | 0
                }).toJSON().description;
                a.doc.getElementById("targetTitleText").textContent = "";
                a.doc.getElementById("targetTitleBg").src = e;
                a.doc.getElementById("targetTitleDesc").textContent = b
              }
              else
              {
                newTarget = b.currentTarget.dataset.tid | 0;
                a.removeClass(a.doc.getElementById("titleListScrollOuter").getElementsByClassName("selected")[0], "selected");
                a.addClass(b.currentTarget, "selected");
                e = b.currentTarget.getElementsByClassName("userTitleText")[0].textContent;
                b = b.currentTarget.getElementsByClassName("userTitleBg")[0].src;
                var f = 0 !== newTarget ? a.storage.userTitleList.findWhere(
                {
                  titleId: newTarget
                }).toJSON().title.description : "称号を非表示にします";
                a.doc.getElementById("targetTitleText").textContent = e;
                a.doc.getElementById("targetTitleBg").src = b;
                a.doc.getElementById("targetTitleDesc").textContent = f
              }
              c || !a.storage.gameUser.toJSON().displayTitle && 0 === newTarget || a.storage.gameUser.toJSON().displayTitle && newTarget === a.storage.gameUser.toJSON().displayTitle.id ? a.addClassId("titleChangeDecide", "off") : a.removeClassId("titleChangeDecide", "off");
              $("#titleChangeDecide").on(a.cgti, function(b)
              {
                b.preventDefault();
                a.isScrolled() || (b = {}, b.titleId = 0 !== newTarget ? newTarget : null, k.ajaxPost(a.linkList.setDisplayTitle, b, function(b)
                {
                  a.responseSetStorage(b);
                  b.gameUser && !b.gameUser.displayTitle && a.storage.gameUser.unset("displayTitle",
                  {
                    silent: !0
                  });
                  new a.PopupClass(
                  {
                    title: "称号変更",
                    content: "称号を変更しました",
                    closeBtnText: "OK"
                  }, null, null, d)
                }))
              })
            }
          })
        }, d);
        a.doc.createDocumentFragment();
        c = a.doc.createElement("div");
        var e = a.storage.userTitleList.toJSON(),
          e = h.sortBy(e, function(a)
          {
            return a.title.sortKey
          }),
          f = a.storage.titleList.toJSON(),
          f = h.sortBy(f, function(a)
          {
            return a.sortKey
          });
        c.innerHTML = q(
        {
          nowTitle: a.storage.gameUser.toJSON().displayTitle,
          titles: e,
          titleMasters: f
        });
        a.doc.getElementById("popupArea").getElementsByClassName("popupTextArea")[0].appendChild(c);
        a.scrollSet("titleListScrollOuter", "titleListWrapInner")
      })
    };
  return {
    instantPopup: function(a)
    {
      g()
    }
  }
});
