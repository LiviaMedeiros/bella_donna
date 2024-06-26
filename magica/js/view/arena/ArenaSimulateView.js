define("underscore backbone backboneCommon ajaxControl command text!template/arena/ArenaSimulate.html js/view/arena/ArenaPartsView js/view/arena/ArenaInfoPartsView js/view/arena/ArenaConfirmView".split(" "), function(h, v, a, m, q, w, k, t, y)
{
  var d = 0,
    r = ["ランク順", "チーム力順", "プレーヤー名順"],
    n = "desc";
  return v.View.extend(
  {
    events: function()
    {
      var b = {};
      b[a.cgti + " #listSortBtn"] = this.listSortBtn;
      b[a.cgti + " #listAscBtn"] = this.listAscBtn;
      b[a.cgti + " #codeMatchingBtn"] = this.codeMatching;
      return b
    },
    initialize: function()
    {
      this.template = h.template(w);
      this.createDom()
    },
    render: function()
    {
      this.model = m.getPageJson();
      this.$el.html(this.template(
      {
        model: this.model
      }));
      return this
    },
    createDom: function()
    {
      a.content.append(this.render().el);
      var b = a.storage.gameUser.toJSON();
      b.arenaOnetimeCodeExpiredAt && (this.arenaOnetimeCodeExpiredAt = Date.parse(b.arenaOnetimeCodeExpiredAt) / 1E3 | 0);
      this.accessServerTime = Date.parse(this.model.currentTime) / 1E3 | 0;
      this.accessClientTime = Date.parse(new Date) / 1E3 | 0;
      this.createView();
      a.setGlobalView();
      q.getBaseData(a.getNativeObj());
      a.firstNaviCheck(m.getPageJson());
      a.ready.hide()
    },
    createView: function()
    {
      t.prototype.rootView = this;
      this.infoView = new t;
      a.doc.getElementById("bpGuageFreeRank").appendChild(this.infoView.render().el);
      a.doc.querySelector("#listSortBtn").innerHTML = "<span class='b_screen'></span>" + r[d];
      a.addClass(a.doc.querySelector("#listAscBtn"), n);
      this.createMatchingList()
    },
    awakeSuspend: function(a)
    {
      this.accessServerTime = a | 0;
      this.accessClientTime = Date.parse(new Date) / 1E3 | 0
    },
    createMatchingList: function()
    {
      var b = this,
        e = this.model.userArenaBattleMatch,
        p = [];
      if (0 < e.opponentUserIdList.length)
      {
        for (var l = e.opponentUserArenaBattleInfoList, g = 0, x = l.length; g < x;)
        {
          var f = {},
            f = l[g];
          f.battleType = e.arenaBattleType;
          p.push(f);
          f = null;
          g = g + 1 | 0
        }
        var c = "asc" == n ? 1 : -1;
        p.sort(function(a, b)
        {
          if (0 == d) return a.userRank > b.userRank ? 1 * c : a.userRank < b.userRank ? -1 * c : a.userRatingPoint > b.userRatingPoint ? 1 * c : a.userRatingPoint < b.userRatingPoint || a.userName > b.userName ? -1 * c : a.userName < b.userName ? 1 * c : 0;
          if (1 == d)
          {
            if (a.userRatingPoint > b.userRatingPoint) return 1 * c;
            if (a.userRatingPoint < b.userRatingPoint) return -1 * c;
            if (a.userRank > b.userRank) return 1 * c;
            if (a.userRank < b.userRank) return -1 * c;
            if (a.userName > b.userName) return 1 * c;
            if (a.userName < b.userName) return -1 * c
          }
          else
          {
            if (a.userName > b.userName) return 1 * c;
            if (a.userName < b.userName) return -1 * c;
            if (a.userRank > b.userRank) return 1 * c;
            if (a.userRank < b.userRank) return -1 * c;
            if (a.userRatingPoint > b.userRatingPoint) return 1 * c;
            if (a.userRatingPoint < b.userRatingPoint) return -1 * c
          }
        })
      }
      k.prototype.rootView = this;
      k.prototype.template = h.template($("#arenaParts").text());
      if (0 < p.length)
      {
        var u = a.doc.createDocumentFragment();
        h.each(p, function(a, c)
        {
          a.eventList = b.model.eventList;
          a.regularEventList = b.model.regularEventList;
          a = new k(a);
          u.appendChild(a.render().el)
        });
        a.doc.getElementById("matchingList").appendChild(u);
        a.scrollSet("matchingWrap", "scrollInner")
      }
      else a.doc.getElementById("matchingList").innerHTML = '<li class="nomatch">対戦可能な相手が存在しません<br><br>ミラーズ解放済みの相手と戦うことができます</li>'
    },
    reloadFunc: function()
    {
      this.trigger("resetListView");
      this.createMatchingList();
      q.getBaseData(a.getNativeObj())
    },
    listSortBtn: function(b)
    {
      b.preventDefault();
      a.isScrolled() || (d++, d >= r.length && (d = 0), b.currentTarget.innerHTML = "<span class='b_screen'></span>" + r[d], this.reloadFunc())
    },
    listAscBtn: function(b)
    {
      b.preventDefault();
      a.isScrolled() || (-1 < b.currentTarget.className.indexOf("asc") ? (a.removeClass(b.currentTarget, "asc"), a.addClass(b.currentTarget, "desc"), n = "desc") : (a.removeClass(b.currentTarget, "desc"), a.addClass(b.currentTarget, "asc"), n = "asc"), this.reloadFunc())
    },
    codeMatching: function(b)
    {
      if (b && (b.preventDefault(), a.isScrolled())) return;
      var e = this,
        d = !1,
        l = function(b)
        {
          b.preventDefault();
          if (!a.isScrolled() && !d)
          {
            d = !0;
            var f = a.doc.getElementById("codeMachingInput").value,
              c = function(c)
              {
                if ("error" !== c.resultCode)
                {
                  a.g_popup_instance && a.g_popup_instance.remove();
                  k.prototype.rootView = e;
                  c = c.userArenaBattleMatch;
                  var d = c.opponentUserArenaBattleInfoList[0];
                  d.battleType = c.arenaBattleType;
                  d.code = f;
                  (new k(d)).battleConfirm(b)
                }
              };
            f ? m.ajaxPost(a.linkList.arenaCodeMatching,
            {
              code: f
            }, c) : new a.PopupClass(
            {
              title: "ミラーズID",
              content: "ミラーズIDを正しく入力してください",
              closeBtnText: "OK",
              popupType: "typeC"
            }, null, null, function()
            {
              e.codeMatching()
            })
          }
        },
        g = function(b)
        {
          b.preventDefault();
          if (!a.isScrolled())
          {
            var d = a.storage.gameUser.toJSON(),
              c = function()
              {
                var b = function(b)
                {
                  b.preventDefault();
                  a.isScrolled() || (q.copyClipboard(a.storage.gameUser.get("arenaOnetimeCode")), new a.PopupClass(
                  {
                    title: "ミラーズID",
                    content: "クリップボードにコピーしました。",
                    closeBtnText: "OK",
                    popupType: "typeC"
                  }, null, null, c))
                };
                new a.PopupClass(
                {
                  title: "ミラーズID",
                  content: h.template($("#createCodePopParts").text())(
                  {
                    gameUser: d
                  }),
                  exClass: "createCodePopup",
                  closeBtnText: "OK",
                  popupType: "typeC"
                }, null, function()
                {
                  a.doc.getElementById("codeCopy").addEventListener(a.cgti, b, !1)
                }, function()
                {
                  a.doc.removeEventListener(a.cgti, b, !1);
                  e.codeMatching()
                })
              };
            b = -1;
            e.arenaOnetimeCodeExpiredAt && (b = e.arenaOnetimeCodeExpiredAt - e.accessServerTime - ((Date.parse(new Date) / 1E3 | 0) - e.accessClientTime));
            0 > b ? m.ajaxPost(a.linkList.arenaCreateOnetimeCode,
            {}, function(b)
            {
              "error" !== b.resultCode && (a.responseSetStorage(b), d = a.storage.gameUser.toJSON(), e.arenaOnetimeCodeExpiredAt = Date.parse(d.arenaOnetimeCodeExpiredAt) / 1E3 | 0, c())
            }) : c()
          }
        };
      new a.PopupClass(
      {
        title: "ミラーズID対戦",
        content: h.template($("#codeMachingPopParts").text())(),
        exClass: "codeMatchingPopup",
        popupType: "typeC"
      }, null, function()
      {
        a.doc.getElementById("createOnetimeCodeBtn").addEventListener(a.cgti, g, !1);
        a.doc.getElementById("codeBattleStartBtn").addEventListener(a.cgti, l, !1)
      }, function()
      {
        a.doc.removeEventListener(a.cgti, g, !1);
        a.doc.removeEventListener(a.cgti, l, !1)
      });
      $("#commandDiv").off();
      a.nativeKeyBoard("codeMachingInput", 10, 1)
    },
    removeHandler: function()
    {
      this.trigger("removeView");
      this.off();
      this.remove()
    }
  })
});
