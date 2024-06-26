define("underscore backbone backboneCommon ajaxControl command text!template/follow/FollowTop.html js/view/follow/FollowTopListView js/view/follow/FollowSearchResultView js/view/common/PagingView".split(" "), function(E, y, a, p, r, F, m, z, n)
{
  var q, g, k, v, A, l, t, w = y.Model.extend(),
    B = y.Collection.extend(
    {}),
    f, x = !1;
  return y.View.extend(
  {
    events: function()
    {
      var b = {};
      b[a.cgti + " #followSearchTab .searchTabBtn"] = this.searchTab;
      b[a.cgti + " #tabBtn .btn"] = this.tabScreen;
      b[a.cgti + " #followRefresh"] = this.followSortBtn;
      b[a.cgti + " #searchRefresh"] = this.searchRun;
      b[a.cgti + " input"] = this.inputHandler;
      return b
    },
    initialize: function(a)
    {
      this.listenTo(this, "beforeSearch", this.beforeSearch);
      q = p.getPageJson();
      this.beforePageNumFollow = this.beforePageNum = 1;
      this.template = E.template(F);
      this.createDom();
      x = !1
    },
    render: function()
    {
      this.$el.html(this.template(q));
      return this
    },
    createDom: function()
    {
      m.prototype.rootView = this;
      z.prototype.rootView = this;
      a.content.append(this.render().el);
      50 < a.storage.userFollowList.length && a.addClass(a.doc.getElementById("followListWrap"), "over50");
      50 < q.followers && a.addClass(a.doc.getElementById("followerListWrap"), "over50");
      this.createView();
      a.setGlobalView();
      g = "follow";
      if (a.followSave && a.followSave.active) switch (g = a.followSave.current ? a.followSave.current : "follow", a.followSave.active = !1, g)
      {
        case "follow":
          a.doc.getElementById("listTitle").textContent = "フォロー";
          a.forceScrollPreset("scrollOuter", "followInner", a.followSave.scrollHash, !0);
          break;
        case "follower":
          a.doc.getElementById("listTitle").textContent = "フォロワー";
          v = !0;
          this.followerUpdate();
          a.forceScrollPreset("scrollOuter", "followerInner", a.followSave.scrollHash, !0);
          break;
        case "find":
          a.doc.getElementById("listTitle").textContent = "検索結果";
          var b = a.followSave.searchRes;
          k = new z(
          {
            el: a.doc.getElementById("findListWrap")
          });
          k.addResult(b.hits.hits);
          f = a.followSave.subCurrent;
          a.removeClass(a.doc.getElementById("followSearchTab").getElementsByClassName("current")[0], "current");
          a.addClass(a.doc.getElementById("followSearchTab").getElementsByClassName(f)[0], "current");
          switch (f)
          {
            case "recommend":
              a.removeClass(a.doc.getElementById("rankSearchWrap"), "on");
              a.removeClass(a.doc.getElementById("searchInput"), "on");
              break;
            case "playerName":
            case "playerId":
              a.removeClass(a.doc.getElementById("rankSearchWrap"), "on");
              a.addClass(a.doc.getElementById("searchInput"), "on");
              a.doc.getElementById("searchInput").value = "";
              b = "playerName" === f ? "名" : "ID";
              a.doc.getElementById("searchInput").setAttribute("placeholder", "プレイヤー" + b);
              a.doc.getElementById("searchInput").value = a.followSave.searchInput;
              break;
            case "playerRank":
              a.addClass(a.doc.getElementById("rankSearchWrap"), "on"), a.removeClass(a.doc.getElementById("searchInput"), "on")
          }
          a.forceScrollPreset("scrollOuter", "searchInner", a.followSave.scrollHash, !0)
      }
      else a.followSave = {}, a.followSave.current = "follow", a.doc.getElementById("listTitle").textContent = "フォロー";
      a.addClass(a.doc.getElementById("FriendList"), g);
      a.addClass(a.doc.getElementById("tabBtn").getElementsByClassName(g)[0], "current");
      r.getBaseData(a.getNativeObj());
      a.scrollSet("scrollOuter", "followInner");
      a.scrollSet("scrollOuter", "followerInner");
      a.scrollSet("scrollOuter", "searchInner");
      a.ready.hide()
    },
    createView: function()
    {
      console.log(a.followSave);
      a.followSave && a.followSave.active && a.followSave.current && ("follow" === a.followSave.current ? (this.beforePageNumFollow = this.pageNumFollow = a.followSave.pagingNumFollow ? a.followSave.pagingNumFollow : 1, a.doc.getElementById("followSort").value = a.followSave.sortValue) : "follower" === a.followSave.current && (this.beforePageNum = this.pageNum = a.followSave.pagingNum ? a.followSave.pagingNum : 1));
      n.parentView = this;
      var b = {
          count: a.storage.userFollowList.length,
          pageLimit: 50
        },
        c = {
          count: q.followers,
          pageLimit: 50
        };
      1 < this.pageNumFollow && (b.firstPage = this.pageNumFollow);
      1 < this.pageNum && (c.firstPage = this.pageNum);
      console.log("pagingPrmFollow", b);
      console.log("pagingPrm", c);
      b = new w(b);
      this.pagingViewFollow = new n(
      {
        model: b,
        another: "anotherPagingWrap"
      });
      c = new w(c);
      this.pagingView = new n(
      {
        model: c
      });
      1 < this.pageNum && this.pagingView.firstMoving();
      this.maxFollowCnt = 0;
      c = a.storage.userStatusList.findWhere(
      {
        statusId: "MAX_FOLLOW"
      });
      void 0 !== c && (this.maxFollowCnt = c.toJSON().point);
      a.doc.getElementById("countFollowWrap").textContent = a.storage.userFollowList.length + "/" + this.maxFollowCnt;
      if (0 !== a.storage.userFollowList.length)
      {
        this.followSort();
        var d = a.doc.createDocumentFragment(),
          e = this,
          h = 0,
          u = 50;
        1 < this.pageNumFollow && (h = 50 * (this.pageNumFollow - 1), u = h + 50);
        a.storage.userFollowList.each(function(a, b)
        {
          if (!(b < h || b >= u))
          {
            b = a.toJSON().lastAccessDate ? Date.parse(a.toJSON().lastAccessDate) / 1E3 : null;
            b = e.calcTimeLag(b);
            a.set(
            {
              loginTimeLag: b
            });
            var c = a.toJSON();
            c.recentUsedAt ? (b = p.getPageJson().currentTime.split(" ")[0], c = c.recentUsedAt.split(" ")[0], b === c ? a.set(
            {
              recentUse: !0
            }) : a.set(
            {
              recentUse: !1
            })) : a.set(
            {
              recentUse: !1
            });
            a = (new m(
            {
              model: a.toJSON()
            }, "follow")).render().el;
            d.appendChild(a)
          }
        });
        a.doc.getElementById("followListWrap").appendChild(d)
      }
      else a.doc.getElementById("followListWrap").innerHTML = "<div class='noUser'>該当するプレイヤーが存在しません</div>";
      window.isBrowser && a.doc.getElementById("searchInput").removeAttribute("readonly")
    },
    inputHandler: function(b)
    {
      window.isBrowser || (b.preventDefault(), a.isScrolled() || "searchInput" === b.currentTarget.id && a.nativeKeyBoard("searchInput", 8, null, null, function()
      {
        if (0 < a.doc.getElementById("searchInput").value.length) a.doc.getElementById("searchInput").setAttribute("placeholder", "");
        else
        {
          var b = "playerName" === f ? "名" : "ID";
          a.doc.getElementById("searchInput").setAttribute("placeholder", "プレイヤー" + b)
        }
      }))
    },
    calcTimeLag: function(a)
    {
      if (!a) return "-日前";
      a = (Date.parse(q.currentTime) / 1E3 - a) / 60;
      16 > a ? a = "15分以内" : 60 > a ? a = Math.floor(a) + "分前" : 60 < a && 1440 > a ? a = Math.floor(a / 60) + "時間前" : (a = a / 60 / 24, a = 30 < a ? Math.floor(a / 30) + "カ月前" : Math.floor(a) + "日前");
      return a
    },
    allCheckAndChange: function(b, c)
    {
      switch (c)
      {
        case "follow":
          1 === a.storage.userFollowList.length % 50 && (this.pagingViewFollow.removeView(), c = {
            count: a.storage.userFollowList.length,
            pageLimit: 50
          }, this.beforePageNumFollow = this.pageNumFollow = ((a.storage.userFollowList.length - 1) / 50 | 0) + 1, c = new w(c), this.pagingViewFollow = new n(
          {
            model: c,
            another: "anotherPagingWrap"
          }));
          this.followUpdate();
          a.doc.getElementById("countFollowWrap").textContent = a.storage.userFollowList.length + "/" + this.maxFollowCnt;
          this.trigger("allCheck", "follow", b);
          break;
        case "unfollow":
          a.storage.userFollowList.remove(a.storage.userFollowList.findWhere(
          {
            followUserId: b
          }));
          a.doc.getElementById("countFollowWrap").textContent = a.storage.userFollowList.length + "/" + this.maxFollowCnt;
          this.trigger("allCheck", "unfollow", b);
          0 === a.storage.userFollowList.length % 50 && (this.pagingViewFollow.removeView(), c = {
            count: a.storage.userFollowList.length,
            pageLimit: 50
          }, this.beforePageNumFollow = this.pageNumFollow = ((a.storage.userFollowList.length - 1) / 50 | 0) + 1, c = new w(c), this.pagingViewFollow = new n(
          {
            model: c,
            another: "anotherPagingWrap"
          }));
          this.followUpdate();
          break;
        case "block":
          a.doc.getElementById("countBlockWrap").textContent = (a.doc.getElementById("countBlockWrap").textContent | 0) + 1;
          this.trigger("allCheck", "block", b);
          this.blockerUpdate();
          break;
        case "unblock":
          a.doc.getElementById("countBlockWrap").textContent = (a.doc.getElementById("countBlockWrap").textContent | 0) - 1, this.trigger("allCheck", "unblock", b)
      }
      a.scrollRefresh()
    },
    tabScreen: function(b)
    {
      b.preventDefault();
      if (!a.isScrolled() && (b.currentTarget.dataset.wrap !== g || "find" === b.currentTarget.dataset.wrap))
      {
        var c;
        switch (b.currentTarget.dataset.wrap)
        {
          case "follow":
            c = "フォロー";
            break;
          case "follower":
            c = "フォロワー";
            break;
          case "block":
            c = "ブロック";
            break;
          case "find":
            f || (f = "recommend"), c = "検索結果"
        }
        a.followSave.current = b.currentTarget.dataset.wrap;
        "find" !== b.currentTarget.dataset.wrap || k || (this.searchHandler("recommend"), a.followSave.subCurrent = "recommend");
        "follower" === b.currentTarget.dataset.wrap ? v || (v = !0, this.followerUpdate()) : "block" !== b.currentTarget.dataset.wrap || A || (A = !0, this.blockerUpdate());
        a.doc.getElementById("listTitle").textContent = c;
        a.removeClass(a.doc.getElementById("FriendList"), g);
        c = a.doc.getElementById("tabBtn").getElementsByClassName("current")[0];
        a.removeClass(c, "current");
        a.addClass(a.doc.getElementById("FriendList"), b.currentTarget.dataset.wrap);
        a.addClass(b.currentTarget, "current");
        g = b.currentTarget.dataset.wrap;
        a.scrollRefresh(null, null, !0)
      }
    },
    followSortBtn: function(b)
    {
      b.preventDefault();
      a.isScrolled() || 0 === a.storage.userFollowList.length || (this.followSort(), this.followUpdate())
    },
    followSort: function()
    {
      var b = a.doc.getElementById("followSort").value.split("-"),
        c = "asc" === b[1] ? 1 : -1;
      this.trigger("sortRemove");
      a.storage.userFollowList.comparator = function(a, e)
      {
        if ("rank" === b[0])
        {
          if (e.get("userRank") > a.get("userRank")) return -1 * c;
          if (e.get("userRank") < a.get("userRank")) return 1 * c
        }
        else if ("login" === b[0])
        {
          if (e.get("lastAccessDate") < a.get("lastAccessDate")) return -1 * c;
          if (e.get("lastAccessDate") > a.get("lastAccessDate")) return 1 * c
        }
        else if ("followdate" === b[0])
        {
          if (e.get("createdAt") < a.get("createdAt")) return -1 * c;
          if (e.get("createdAt") > a.get("createdAt")) return 1 * c
        }
      };
      a.storage.userFollowList.sort()
    },
    searchTab: function(b)
    {
      b.preventDefault();
      if (!a.isScrolled() && f !== b.currentTarget.dataset.wrap) switch (a.removeClass(a.doc.getElementById("followSearchTab").getElementsByClassName("current")[0], "current"), a.addClass(b.currentTarget, "current"), f = b.currentTarget.dataset.wrap, a.followSave.subCurrent = f, f)
      {
        case "recommend":
          a.removeClass(a.doc.getElementById("rankSearchWrap"), "on");
          a.removeClass(a.doc.getElementById("searchInput"), "on");
          this.searchHandler("recommend");
          break;
        case "playerName":
        case "playerId":
          a.removeClass(a.doc.getElementById("rankSearchWrap"), "on");
          a.addClass(a.doc.getElementById("searchInput"), "on");
          a.doc.getElementById("searchInput").value = "";
          b = "playerName" === f ? "名" : "ID";
          a.doc.getElementById("searchInput").setAttribute("placeholder", "プレイヤー" + b);
          break;
        case "playerRank":
          a.addClass(a.doc.getElementById("rankSearchWrap"), "on"), a.removeClass(a.doc.getElementById("searchInput"), "on")
      }
    },
    searchRun: function(b)
    {
      b.preventDefault();
      if (!a.isScrolled())
      {
        var c;
        b = !1;
        switch (f)
        {
          case "playerName":
          case "playerId":
            (c = a.doc.getElementById("searchInput").value) || (b = !0);
            a.followSave.searchInput = c;
            break;
          case "playerRank":
            c = a.doc.getElementById("rankSelect").value
        }
        b ? new a.PopupClass(
        {
          title: "エラー",
          content: "検索条件が入力されていません。",
          closeBtnText: "閉じる"
        }) : this.searchHandler(f, c)
      }
    },
    searchHandler: function(b, c)
    {
      k = new z(
      {
        el: a.doc.getElementById("findListWrap")
      });
      var d;
      switch (b)
      {
        case "recommend":
          c = a.storage.gameUser.toJSON();
          b = 1 > c.level - 5 ? 1 : c.level - 5;
          c = c.level + 5;
          var e = Date.parse(q.currentTime) / 1E3;
          d = new Date(1E3 * (e - 86400));
          var e = new Date(1E3 * (e + 600)),
            h, u, f, g, l, m, C, D;
          h = 10 > d.getMonth() + 1 ? "0" + (d.getMonth() + 1) : d.getMonth() + 1;
          u = 10 > d.getDate() ? "0" + d.getDate() : d.getDate();
          f = 10 > d.getHours() ? "0" + d.getHours() : d.getHours();
          g = 10 > d.getMinutes() ? "0" + d.getMinutes() : d.getMinutes();
          l = 10 > e.getMonth() + 1 ? "0" + (e.getMonth() + 1) : e.getMonth() + 1;
          m = 10 > e.getDate() ? "0" + e.getDate() : e.getDate();
          C = 10 > e.getHours() ? "0" + e.getHours() : e.getHours();
          D = 10 > e.getMinutes() ? "0" + e.getMinutes() : e.getMinutes();
          d = d.getFullYear() + "-" + h + "-" + u + "T" + f + ":" + g + ":00.000+0900";
          e = e.getFullYear() + "-" + l + "-" + m + "T" + C + ":" + D + ":00.000+0900";
          d = {
            size: 10,
            query:
            {
              function_score:
              {
                query:
                {
                  bool:
                  {
                    must: [
                    {
                      range:
                      {
                        userRank:
                        {
                          gte: b,
                          lte: c
                        }
                      }
                    },
                    {
                      range:
                      {
                        lastAccessDate:
                        {
                          gte: d,
                          lte: e
                        }
                      }
                    }]
                  }
                },
                functions: [
                {
                  random_score:
                  {}
                }]
              }
            }
          };
          break;
        case "playerName":
          d = {
            size: 10,
            query:
            {
              match_phrase:
              {
                userName: c
              }
            }
          };
          break;
        case "playerId":
          d = {
            size: 1,
            query:
            {
              term:
              {
                inviteCode:
                {
                  value: c
                }
              }
            }
          };
          break;
        case "playerRank":
          d = {
            size: 10,
            query:
            {
              function_score:
              {
                query:
                {
                  range:
                  {
                    userRank:
                    {
                      gte: Number(c),
                      lte: 100
                    }
                  }
                },
                functions: [
                {
                  random_score:
                  {}
                }]
              }
            }
          }
      }
      d.stored_fields = "id userName attributeId lastAccessDate inviteCode userRank cardId cardRank displayCardId level revision charaName comment displayTitleId titleName titleBaseImage titleFont".split(" ");
      if (!x)
      {
        x = !0;
        var n = this;
        p.ajaxPost(a.searchLinkList.friend, d, function(b)
        {
          "error" !== b.resultCode ? (n.trigger("beforeSearch"), k.trigger("removeChildView"), a.followSave.searchRes = b, a.doc.getElementById("findListWrap").innerHTML = "", 0 < b.hits.hits.length ? k.addResult(b.hits.hits) : a.doc.getElementById("findListWrap").innerHTML = "<div class='noUser'>該当するプレイヤーが存在しません</div>") : (n.trigger("beforeSearch"), k.trigger("removeChildView"), a.doc.getElementById("findListWrap").innerHTML = "<div class='noUser'>該当するプレイヤーが存在しません</div>");
          x = !1;
          r.getBaseData(a.getNativeObj());
          a.scrollRefresh(null, null, !0)
        })
      }
    },
    followUpdate: function()
    {
      this.followSort();
      this.trigger("collectRemove", "follow");
      var b = a.doc.createDocumentFragment(),
        c = this,
        d = 0,
        e = 50;
      1 < this.pageNumFollow && (d = 50 * (this.pageNumFollow - 1), e = d + 50);
      a.storage.userFollowList.each(function(a, f)
      {
        if (!(f < d || f >= e))
        {
          f = a.toJSON().lastAccessDate ? Date.parse(a.toJSON().lastAccessDate) / 1E3 : null;
          f = c.calcTimeLag(f);
          a.set(
          {
            loginTimeLag: f
          });
          var h = a.toJSON();
          h.recentUsedAt ? (f = p.getPageJson().currentTime.split(" ")[0], h = h.recentUsedAt.split(" ")[0], f === h ? a.set(
          {
            recentUse: !0
          }) : a.set(
          {
            recentUse: !1
          })) : a.set(
          {
            recentUse: !1
          });
          a = (new m(
          {
            model: a.toJSON()
          }, "follow")).render().el;
          b.appendChild(a)
        }
      });
      a.doc.getElementById("followListWrap").appendChild(b);
      r.getBaseData(a.getNativeObj());
      a.scrollRefresh(null, null, !0)
    },
    followerUpdate: function()
    {
      l && this.trigger("collectRemove", "follower");
      var b = (100 * (this.beforePageNum - 1) / 4 | 0) / 100 | 0,
        c = (100 * (this.pageNum - 1) / 4 | 0) / 100 | 0,
        d = !0;
      l ? b != c && (d = !1) : d = !1;
      this.beforePageNum = this.pageNum;
      var e = this,
        f = a.doc.createDocumentFragment(),
        g = function(b, d)
        {
          d && "notApi" === d || (window.isLocal && (b = JSON.parse(b)), l = new B(b));
          if (0 < l.length)
          {
            "<div class='noUser'>該当するプレイヤーが存在しません</div>" === a.doc.getElementById("followerListWrap").innerHTML && (a.doc.getElementById("followerListWrap").innerHTML = "");
            var h = 50 * (e.pageNum - 1) - (200 * c | 0) | 0,
              g = h + 49;
            l.each(function(a, b)
            {
              h <= b && b <= g && (b = a.toJSON().lastAccessDate ? Date.parse(a.toJSON().lastAccessDate) / 1E3 : null, b = e.calcTimeLag(b), a.set(
              {
                loginTimeLag: b
              }), a = (new m(
              {
                model: a.toJSON()
              }, "follower")).render().el, f.appendChild(a))
            });
            a.doc.getElementById("followerListWrap").appendChild(f);
            r.getBaseData(a.getNativeObj())
          }
          else a.doc.getElementById("followerListWrap").innerHTML = "<div class='noUser'>該当するプレイヤーが存在しません</div>";
          setTimeout(function()
          {
            f = null;
            a.scrollRefresh()
          }, 100)
        };
      d ? g(l, "notApi") : window.isLocal ? (b = 6E4 * ((new Date).getTime() / 6E4 | 0), require(["text!/magica/json//friend/follower/list.json?bust=" + b], function(a)
      {
        g(a)
      }), console.log("apiPage", c + 1 | 0)) : p.ajaxSimpleGet(a.linkList.followerList, c + 1 | 0, g)
    },
    blockerUpdate: function()
    {
      t && (t = null, this.trigger("collectRemove", "block"));
      var b = this,
        c = a.doc.createDocumentFragment();
      p.ajaxSimpleGet(a.linkList.blockList, "", function(d)
      {
        window.isLocal && (d = JSON.parse(d));
        t = new B(d);
        0 < t.length ? ("<div class='noUser'>該当するプレイヤーが存在しません</div>" === a.doc.getElementById("blockListWrap").innerHTML && (a.doc.getElementById("blockListWrap").innerHTML = ""), t.each(function(a, d)
        {
          d = a.toJSON().lastAccessDate ? Date.parse(a.toJSON().lastAccessDate) / 1E3 : null;
          d = b.calcTimeLag(d);
          a.set(
          {
            loginTimeLag: d
          });
          a = (new m(
          {
            model: a.toJSON()
          }, "block")).render().el;
          c.appendChild(a)
        }), a.doc.getElementById("blockListWrap").appendChild(c), r.getBaseData(a.getNativeObj())) : a.doc.getElementById("blockListWrap").innerHTML = "<div class='noUser'>該当するプレイヤーが存在しません</div>";
        a.scrollRefresh(null, null, !0)
      })
    },
    beforeSearch: function()
    {
      this.trigger("collectRemove", "search")
    },
    removeHandler: function()
    {
      k && k.trigger("removeChildView");
      l = f = A = v = k = null;
      this.pagingView.removeView();
      this.trigger("collectRemove", "search");
      this.trigger("removeView");
      a.followSave && !a.followSave.active && (a.followSave = null);
      this.off();
      this.remove()
    }
  })
});
