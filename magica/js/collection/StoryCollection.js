define("underscore backbone backboneCommon ajaxControl command QuestUtil text!template/collection/StoryCollection.html text!css/collection/StoryCollection.css text!template/quest/OutlinePopup.html js/quest/puellaHistoria/CreateModel js/quest/puellaHistoria/lastBattle/Utility".split(" "), function(f, p, b, D, h, T, U, V, W, X, Y)
{
  var k, F, m, t, A, u, y, z, B, l, q, C, E, fa = p.View.extend(
    {
      initialize: function(a)
      {
        this.template = f.template(U);
        this.createDom()
      },
      events: function()
      {
        var a = {};
        a[b.cgti + " #middlePlayBtn"] = this.middlePlayBtn;
        a[b.cgti + " #continuousPlayBtn"] = this.continuousPlayBtn;
        a[b.cgti + " #tabBtn .btn"] = this.tabScreen;
        a[b.cgti + " .chapterTitleWrap"] = this.openColumn;
        a[b.cgti + " .prologueStart"] = this.prologueStart;
        a[b.cgti + " .movieBtn"] = this.playMovie;
        return a
      },
      render: function()
      {
        this.$el.html(this.template(k));
        return this
      },
      createDom: function()
      {
        b.setGlobalView();
        m = "main";
        this.storyMainSub = Z();
        this.puellaHistoriaModel = aa();
        b.content.append(this.render().el);
        G.prototype.parentView = this;
        G.prototype.template = f.template($("#ChapterTemp").text());
        J.prototype.template = f.template($("#SectionTemp").text());
        K.prototype.template = f.template($("#PuellaHistoriaChapterTemp").text());
        L.prototype.template = f.template($("#PuellaHistoriaSectionTemp").text());
        M.prototype.template = f.template($("#MirrorBattleSectionTemp").text());
        N();
        this.createView()
      },
      createView: function()
      {
        v("main", this.storyMainSub.mainStoryModels);
        v("mainSecond", this.storyMainSub.mainStoryModels);
        ba(this.puellaHistoriaModel);
        v("sub", this.storyMainSub.subStoryModels);
        v("subSecond", this.storyMainSub.subStoryModels);
        v("chara", ca());
        v("arena", da());
        r.prototype.parentView = this;
        r.prototype.templatePuellaHistoria = f.template($("#PuellaHistoriaTemp").text());
        r.prototype.templateCommon = f.template($("#EventStoryTempCommon").text());
        r.prototype.templateBranch = f.template($("#EventStoryTempBranch").text());
        r.prototype.templateWitch = f.template($("#EventStoryTempWitch").text());
        r.prototype.templateSpecial = f.template($("#SpecialStoryTemp").text());
        r.prototype.templateAccomplish = f.template($("#AccomplishStoryTemp").text());
        var a = D.getPageJson();
        if (a.eventStoryList && 0 < a.eventStoryList.length)
        {
          b.removeClass(b.doc.getElementById("tabBtn").getElementsByClassName("event")[0], "none");
          var c = 0;
          f.each(a.eventStoryList, function(a, b, g)
          {
            1164 == a.eventId && (c = b)
          });
          a.eventStoryList.splice(c, 0,
          {
            regularEventId: 2019,
            eventName: "キモチ戦特別編 アリナ・イブ",
            regularEventType: "GROUPBATTLE",
            storyList: [
            {
              storyTitle: "OP",
              storyIds: "420191-0",
              isOpen: !0
            }],
            isOpen: !0
          });
          f.each(a.eventStoryList, function(a, b)
          {
            O(a);
            !1 === a.isOpen && y++
          });
          b.scrollSet("eventHiddenWrap", "scrollInner")
        }
        a.campaignStoryList && 0 < a.campaignStoryList.length && (b.removeClass(b.doc.getElementById("tabBtn").getElementsByClassName("special")[0], "none"), a = f.sortBy(a.campaignStoryList, function(a)
        {
          return -1 * a.campaignId
        }), f.each(a, function(a, b)
        {
          O(a);
          !1 === a.isOpen && z++
        }), b.scrollSet("specialHiddenWrap", "scrollInner"));
        v("accomplish", ea());
        (a = b.storage.userSectionList.findWhere(
        {
          sectionId: 102005
        })) && a.toJSON().cleared && b.removeClass(b.doc.getElementById("tabBtn").getElementsByClassName("ep1ending")[0], "none");
        (a = b.storage.userSectionList.findWhere(
        {
          sectionId: 102204
        })) && a.toJSON().cleared && b.removeClass(b.doc.getElementById("tabBtn").getElementsByClassName("ep2opening")[0], "none");
        (a = b.storage.userSectionList.findWhere(
        {
          sectionId: 103306
        })) && a.toJSON().cleared && b.removeClass(b.doc.getElementById("tabBtn").getElementsByClassName("ep2ending")[0], "none");
        h.getBaseData(b.getNativeObj());
        b.scrollSet("mainHiddenWrap", "scrollInner");
        b.scrollSet("mainSecondHiddenWrap", "scrollInner");
        b.scrollSet("puellaHistoriaHiddenWrap", "scrollInner");
        b.scrollSet("subHiddenWrap", "scrollInner");
        b.scrollSet("subSecondHiddenWrap", "scrollInner");
        b.scrollSet("charaHiddenWrap", "scrollInner");
        b.scrollSet("arenaHiddenWrap", "scrollInner");
        b.scrollSet("accomplishHiddenWrap", "scrollInner");
        b.scrollSet("storyTabScroll", "common_tab");
        b.ready.hide()
      },
      middlePlayBtn: function(a)
      {
        a.preventDefault();
        if (!b.isScrolled())
          if (a.currentTarget.classList.contains("on"))
          {
            a = localStorage.getItem("storedStoryIds");
            var c;
            if (l)
            {
              var d = w(a),
                e = d.indexOf(C); - 1 < e && (d.splice(0, e), c = d)
            }
            else
            {
              a = a.split(":");
              for (var g = 0; g < a.length; g++)
                if (d = a[g].split(","), e = d.indexOf(C), -1 < e)
                {
                  d.splice(0, e);
                  c = d;
                  break
                }
            }
            if (!c || 0 >= c.length) new b.PopupClass(
            {
              title: "ストーリー確認",
              content: "ストーリーがありません",
              closeBtnText: "OK"
            });
            else
            {
              q = a;
              var n = localStorage.getItem("storedVoiceTarget");
              n && (n = H(n));
              var P = function()
              {
                $("#commandDiv").on("nativeCallback", function(a, d)
                {
                  $("#commandDiv").off();
                  d && d.isSaved ? (b.addClass(middlePlayBtn, "on"), c = []) : (localStorage.removeItem("storedVoiceTarget"), localStorage.removeItem("storedStoryIds"), b.removeClassId("middlePlayBtn", "on"), C = null, c.splice(0, 1));
                  c[0] ? x(c, n) : setTimeout(function()
                  {
                    h.changeBg(b.background);
                    h.startBgm(b.bgm);
                    h.setWebView(!0);
                    b.ready.target.className = "nativeFadeOut";
                    $("#commandDiv").off();
                    b.androidKeyStop = !1
                  }, 300)
                });
                h.startStoredStory();
                window.isBrowser && nativeCallback()
              };
              n ? b.preNativeFadeIn(function()
              {
                $("#commandDiv").on("nativeCallback", function()
                {
                  $("#commandDiv").off();
                  P()
                });
                H(n);
                h.downloadFileFullVoice(n);
                window.isBrowser && nativeCallback()
              }) : b.preNativeFadeIn(function()
              {
                P()
              })
            }
          }
        else new b.PopupClass(
        {
          title: "ストーリー確認",
          content: "中断したストーリーがありません",
          closeBtnText: "OK"
        })
      },
      continuousPlayBtn: function(a)
      {
        a.preventDefault();
        b.isScrolled() || (l = !l, a.currentTarget.classList.toggle("on"), localStorage.setItem("continuousPlayFlag", l ? "1" : "0"))
      },
      tabScreen: function(a)
      {
        a.preventDefault();
        if (!b.isScrolled() && a.currentTarget.dataset.wrap && a.currentTarget.dataset.wrap !== m)
        {
          b.doc.getElementById("listTitle").innerText = a.currentTarget.getElementsByTagName("span")[0].innerText;
          b.removeClass(b.doc.getElementById("listWrap"), m);
          var c = b.doc.getElementById("tabBtn").getElementsByClassName("current")[0];
          b.removeClass(c, "current");
          b.addClass(b.doc.getElementById("listWrap"), a.currentTarget.dataset.wrap);
          b.addClass(a.currentTarget, "current");
          m = a.currentTarget.dataset.wrap;
          b.scrollRefresh("mainHiddenWrap", "scrollInner", !0);
          b.scrollRefresh("mainSecondHiddenWrap", "scrollInner", !0);
          "puellaHistoria" === m && b.scrollRefresh("puellaHistoriaHiddenWrap", "scrollInner", !0);
          b.scrollRefresh("subHiddenWrap", "scrollInner", !0);
          b.scrollRefresh("subSecondHiddenWrap", "scrollInner", !0);
          b.scrollRefresh("charaHiddenWrap", "scrollInner", !0);
          b.scrollRefresh("arenaHiddenWrap", "scrollInner", !0);
          "event" === m && b.scrollRefresh("eventHiddenWrap", "scrollInner", !0);
          "special" === m && b.scrollRefresh("specialHiddenWrap", "scrollInner", !0);
          "accomplish" === m && b.scrollRefresh("accomplishHiddenWrap", "scrollInner", !0)
        }
      },
      openColumn: function(a)
      {
        a.preventDefault();
        if (!b.isScrolled())
        {
          var c = b.doc.getElementById(m),
            d = c.getElementsByClassName("chapterId" + a.currentTarget.dataset.chapter)[0];
          d.classList.toggle("on");
          var e = c.getElementsByClassName("chapterGallery" + a.currentTarget.dataset.chapter)[0];
          e && e.classList.toggle("on");
          c.getElementsByClassName("chapterIdPan" + a.currentTarget.dataset.chapter)[0].classList.toggle("on");
          d.classList.contains("on") && (c.scrollTop = a.currentTarget.parentNode.offsetTop - 20);
          b.doc.getElementById(m + "HiddenWrap") ? b.scrollRefresh(m + "HiddenWrap", "scrollInner") : b.scrollRefresh()
        }
      },
      prologueStart: function(a)
      {
        a.preventDefault();
        if (!b.isScrolled())
        {
          var c = "000001-1 000002-1 000003-1 000003-2 000003-3 000003-4 000003-5".split(" ");
          q = c.join(",");
          0 === c.length ? new b.PopupClass(
          {
            title: "ストーリー確認",
            content: "ストーリーがありません",
            closeBtnText: "OK"
          }) : b.preNativeFadeIn(function()
          {
            x(c)
          })
        }
      },
      playMovie: function(a)
      {
        a.preventDefault();
        b.isScrolled() || b.preNativeFadeIn(function()
        {
          b.ready.show();
          h.stopBgm();
          $("#commandDiv").on("nativeCallback", function(a, c)
          {
            $("#commandDiv").off();
            b.ready.target.className = "";
            h.changeBg(b.background);
            h.startBgm(b.bgm);
            b.androidKeyStop = !1;
            h.setWebView();
            b.ready.hide()
          });
          var c = "";
          switch (a.currentTarget.dataset.id)
          {
            case "ep1opening":
              c = "resource/movie/other/op_movie.usm";
              break;
            case "ep1ending":
              c = "resource/movie/other/102005_epilogue.usm";
              break;
            case "ep2opening":
              c = "resource/movie/other/op_movie2.usm";
              break;
            case "ep2ending":
              c = "resource/movie/other/103305_epilogue.usm"
          }
          h.playMovie(c);
          window.isBrowser && nativeCallback()
        }, 500)
      }
    }),
    G = p.View.extend(
    {
      className: "wrap",
      events: function()
      {
        var a = {};
        a[b.cgti + " .popupGalleryBtn"] = this.popupGallery;
        return a
      },
      initialize: function(a)
      {
        this.type = a.type;
        this.frgmntNode = b.doc.createDocumentFragment();
        this.continuousIds = [];
        var c = this;
        f.each(this.model.sectionList, function(a, b)
        {
          a.parentModel = c.model;
          "arena" === c.type ? c.continuousIds = B : a.cleared && a.canPlay && a.storyArr.length && c.continuousIds.push(a.storyArr.join(","));
          103305 == a.sectionId && a.cleared && (b = new M(
          {}), c.frgmntNode.appendChild(b.render().el));
          b = new J(
          {
            model: a
          });
          c.frgmntNode.appendChild(b.render().el)
        });
        this.model.continuousIds = c.continuousIds.join(":");
        this.model.isStillBtn = -1 < f.findIndex(E,
        {
          chapterId: this.model.chapterId
        })
      },
      render: function()
      {
        this.$el.html(this.template(
        {
          model: this.model
        }));
        this.el.getElementsByClassName("sectionListWrap")[0].appendChild(this.frgmntNode);
        return this
      },
      popupGallery: function(a)
      {
        a.preventDefault();
        if (!b.isScrolled())
        {
          var c = this.model;
          I.prototype.stillModelList = f.filter(E, function(a)
          {
            return a.partNo === c.partNo
          });
          I.prototype.template = f.template($("#StillPopupTemp").text());
          new I(this.model.chapterId)
        }
      }
    }),
    I = p.View.extend(
    {
      events: function()
      {
        var a = {};
        a[b.cgti + " .arrow"] = this.changeGallery;
        a[b.cgti + " .imageWrap"] = this.detailPopup;
        return a
      },
      initialize: function(a)
      {
        this.index = f.findIndex(this.stillModelList,
        {
          chapterId: a
        });
        if (-1 < this.index)
        {
          a = function()
          {
            this.createGallery()
          }.bind(this);
          var c = function()
          {
            this.removeView()
          }.bind(this);
          new b.PopupClass(
          {
            popupId: "stillListPopup",
            title: this.stillModelList[this.index].title,
            popupType: "typeB"
          }, null, a, c)
        }
        else new b.PopupClass(
        {
          title: "ギャラリー",
          content: "表示できる一枚絵がありません。",
          closeBtnText: "OK"
        })
      },
      render: function()
      {
        this.$el.html(this.template(
        {
          stillModelList: this.stillModelList[this.index],
          isNeedArrow: 1 < this.stillModelList.length
        }));
        return this
      },
      changeGallery: function(a)
      {
        a.preventDefault();
        b.isScrolled() || (a.currentTarget.classList.contains("arrowRight") ? (this.index++, this.index >= this.stillModelList.length && (this.index = 0)) : (this.index--, 0 > this.index && (this.index = this.stillModelList.length - 1)), this.createGallery())
      },
      createGallery: function()
      {
        var a = this.stillModelList[this.index];
        b.doc.getElementById("popupInfoDetailTitle").textContent = a.title;
        b.doc.getElementById("popupArea").getElementsByClassName("popupTextArea")[0].appendChild(this.render().el);
        for (var c = b.doc.getElementById("stillListWrap").getElementsByTagName("img"), d = 0, a = 0; a < c.length; a++)
        {
          var e = new Image;
          e.onload = function()
          {
            d++;
            d >= c.length && b.scrollSet("stillListWrap", "scrollInner", !0)
          };
          e.src = c[a].src
        }
      },
      detailPopup: function(a)
      {
        a.preventDefault();
        if (!b.isScrolled() && a.currentTarget.dataset.index)
        {
          var c = this.stillModelList[this.index].stillList[a.currentTarget.dataset.index],
            d = "scenario_",
            d = d + (this.stillModelList[this.index].chapterId + a.currentTarget.dataset.index);
          new(p.View.extend(
          {
            id: "stillDetail",
            events: function()
            {
              var a = {};
              a[b.cgti] = this.removeView;
              return a
            },
            initialize: function(a)
            {
              b.androidKeyForceStop = !0;
              b.addClass(b.doc.getElementById("curtain"), "show");
              this.createDom()
            },
            render: function()
            {
              var a = b.doc.createElement("img");
              a.dataset.nativeimgkey = d;
              a.dataset.src = "resource/scenario/img/" + c;
              a.setAttribute("height", b.displayHeight ? b.displayHeight : "100%");
              this.el.appendChild(a);
              return this.el
            },
            createDom: function()
            {
              b.doc.getElementById("overlapContainer").appendChild(this.render());
              b.doc.getElementById("overlapContainer").style.zIndex = "1000001";
              h.getBaseData(b.getNativeObj())
            },
            removeView: function()
            {
              b.removeClass(b.doc.getElementById("curtain"), "show");
              b.androidKeyForceStop = !1;
              b.doc.getElementById("overlapContainer").style.zIndex = "";
              this.off();
              this.remove()
            }
          }))
        }
      },
      removeView: function()
      {
        this.off();
        this.remove()
      }
    }),
    Q, J = p.View.extend(
    {
      className: function()
      {
        var a = "sectionWrap commonFrame3 ";
        if ("CHARA" == this.model.parentModel.questType || "ARENA" == this.model.parentModel.questType) this.model.canPlay || (a += "LOCKED");
        this.model.cleared && -1 == a.indexOf("LOCKED") ? a += "CLEARED" : -1 == a.indexOf("LOCKED") && (a += "NON_CLEAR");
        return a += " sectionId" + this.model.sectionId
      },
      initialize: function()
      {
        this.model.parentModel.chapterNoForView && (this.model.chapterNoForView = this.model.parentModel.chapterNoForView)
      },
      events: function()
      {
        var a = {};
        a[b.cgti + " .nextQuest"] = this.nextQuest;
        a[b.cgti + " .outline"] = this.outline;
        a[b.cgti + " .storyStart"] = this.storyStart;
        a[b.cgti + " .lockQuest"] = this.lockQuest;
        return a
      },
      render: function()
      {
        this.$el.html(this.template(
        {
          model: this.model
        }));
        return this
      },
      nextQuest: function(a)
      {
        a.preventDefault();
        b.isScrolled() || (location.href = 103305 == this.model.sectionId ? "#/SecondPartLastRouter" : "#/QuestBattleSelect/" + this.model.sectionId)
      },
      outline: function(a)
      {
        a.preventDefault();
        b.isScrolled() || (a = {}, a.title = this.model.chapterNoForView + this.model.sectionNo + "話までのあらすじ", a.outline = this.model.outline.replace(/＠/g, "<br>"), a.defaultCardId = this.model.outlineCardId, new b.PopupClass(a, W), h.getBaseData(b.getNativeObj()))
      },
      storyStart: function(a)
      {
        a.preventDefault();
        if (!b.isScrolled())
        {
          var c = this.model.storyArr[0];
          q = this.model.parentModel.continuousIds;
          a = w(this.model.parentModel.continuousIds);
          c = a.indexOf(c); - 1 < c ? a.splice(0, c) : a = [];
          var d;
          d = l ? a : this.model.storyArr.concat();
          if (0 === d.length) new b.PopupClass(
          {
            title: "ストーリー確認",
            content: "ストーリーがありません",
            closeBtnText: "OK"
          });
          else
          {
            if ("main" === m || "mainSecond" === m)
            {
              var e = "section_" + this.model.sectionId,
                g = H(e);
              a = function()
              {
                $("#commandDiv").on("nativeCallback", function()
                {
                  $("#commandDiv").off();
                  x(d, e)
                });
                h.downloadFileFullVoice(g);
                window.isBrowser && nativeCallback()
              }
            }
            else a = function()
            {
              x(d)
            };
            b.preNativeFadeIn(a)
          }
        }
      },
      lockQuest: function(a)
      {
        a.preventDefault();
        b.isScrolled() || (Q = $("#OpenConditionPopupTemp").text(), a = {
          exClass: "openConditionPopup",
          popupType: "original",
          conditionList: T.openConditionJson(this.model, this.model.parentModel.title)
        }, new b.PopupClass(a, Q))
      }
    }),
    M = p.View.extend(
    {
      className: function()
      {
        return "sectionWrap commonFrame3 CLEARED mirrorBattle"
      },
      initialize: function() {},
      events: function()
      {
        var a = {};
        a[b.cgti + " .storyStart"] = this.storyStart;
        return a
      },
      render: function()
      {
        this.$el.html(this.template(
        {}));
        return this
      },
      storyStart: function(a)
      {
        a.preventDefault();
        b.isScrolled() || b.preNativeFadeIn(function()
        {
          h.setWebView(!1);
          h.startMirrorBattle(
          {
            resultUrl: "/magica/index.html#/StoryCollection",
            retireUrl: "/magica/index.html#/StoryCollection"
          });
          location.href = "#/QuestBackground";
          window.isBrowser && setTimeout(function()
          {
            location.href = "#/StoryCollection"
          }, 1E3)
        })
      }
    }),
    H = function(a)
    {
      var b = a;
      l && 0 > b.indexOf("_event_") && (b = a.slice(0, -2));
      return b
    },
    x = function(a, c)
    {
      var d = function()
      {
        a && a[0] && h.startStory(a[0],
        {
          canSave: !0
        });
        window.isBrowser && nativeCallback(
        {})
      };
      $("#commandDiv").on("nativeCallback", function(e, g)
      {
        g && g.isSaved ? (c ? (0 > c.indexOf("_event_") && (c = "section_" + a[0].split("-")[0]), localStorage.setItem("storedVoiceTarget", c)) : localStorage.removeItem("storedVoiceTarget"), localStorage.setItem("storedStoryIds", q), b.addClassId("middlePlayBtn", "on"), a = [], N()) : a.splice(0, 1);
        a[0] ? d() : setTimeout(function()
        {
          h.changeBg(b.background);
          h.startBgm(b.bgm);
          h.setWebView(!0);
          b.ready.target.className = "nativeFadeOut";
          $("#commandDiv").off();
          b.androidKeyStop = !1
        }, 300)
      });
      d()
    },
    N = function()
    {
      $("#commandDiv").on("saveDataCallback", function(a, c)
      {
        $("#commandDiv").off();
        c && c.storyId && null !== localStorage.getItem("storedStoryIds") && (b.addClassId("middlePlayBtn", "on"), C = c.storyId)
      });
      h.getStorySaveData();
      window.isLocal && saveDataCallback(
      {
        storyId: "513005-2_EVgh5"
      })
    },
    v = function(a, c)
    {
      var d = b.doc.getElementById(a),
        e;
      d && (e = d.getElementsByClassName("scrollInner")[0]);
      if (e)
      {
        var g = b.doc.createDocumentFragment();
        c.length ? f.each(c, function(b, c)
        {
          if ("main" != a && "sub" != a || 1 === b.partNo)
            if ("mainSecond" != a && "subSecond" != a || 2 === b.partNo) b = new G(
            {
              model: b,
              type: a
            }), g.appendChild(b.render().el)
        }) : (c = b.doc.createElement("p"), c.className = "storyCautionText ts_white", c.innerText = "対象のストーリーがありません", g.appendChild(c));
        e.appendChild(g)
      }
    },
    ga = function()
    {
      var a = [];
      f.each(k.userChapterList, function(b)
      {
        if ("MAIN" == b.chapter.questType)
        {
          var c = f.filter(k.userSectionList, function(a)
          {
            return b.chapterId === a.section.genericId
          });
          c.sort(function(a, b)
          {
            return a.sectionId < b.sectionId ? -1 : a.sectionId > b.sectionId ? 1 : 0
          });
          var e = [];
          f.each(c, function(a)
          {
            var b = f.findWhere(k.sectionStillList,
            {
              sectionId: a.sectionId
            });
            b && b.viewParameters && (b = b.viewParameters.split(";"), f.each(b, function(b)
            {
              if (0 <= b.indexOf("IMAGE_PATH="))
              {
                b = b.split("=")[1].split(",");
                if (a.cleared) e = e.concat(b);
                else
                  for (var c = 0; c < b.length; c++) e.push("");
                return !1
              }
            }))
          });
          e.length && (c = {}, c.chapterId = b.chapterId, c.partNo = b.chapter.partNo, c.title = "メイン【第" + b.chapter.partNo + "部】　" + b.chapter.chapterNoForView, c.stillList = e, a.push(c))
        }
      });
      a.sort(function(a, b)
      {
        return a.chapterId < b.chapterId ? -1 : a.chapterId > b.chapterId ? 1 : 0
      });
      return a
    },
    ea = function()
    {
      var a = [];
      a.push(
      {
        title: "プロローグ",
        chapterId: 2013,
        sectionList: [
        {
          canPlay: !0,
          cleared: !0,
          sectionNo: "序",
          title: "プロローグ",
          storyArr: ["420131-0"]
        }]
      });
      k.userSectionList.sort(function(a, b)
      {
        return a.sectionId < b.sectionId ? -1 : a.sectionId > b.sectionId ? 1 : 0
      });
      f.each(k.userSectionList, function(b, d)
      {
        if ("REG_ACC" == b.section.questType)
        {
          var c = {};
          c.title = b.section.title;
          c.chapterId = b.sectionId;
          c.sectionList = [];
          var g = [];
          f.each(k.userQuestBattleList, function(a)
          {
            b.section.sectionId === a.questBattle.sectionId && a.questBattle.startStory && g.push(a)
          });
          g.sort(function(a, b)
          {
            return a.questBattleId < b.questBattleId ? -1 : a.questBattleId > b.questBattleId ? 1 : 0
          });
          var n = 1;
          f.each(g, function(a, d)
          {
            c.cardId = a.questBattle.parameterMap ? a.questBattle.parameterMap.CARDID : null;
            c.cardId && (c.displayCardId = c.cardId);
            if (a.cleared)
            {
              var e = {
                canPlay: !0,
                cleared: !0
              };
              e.sectionId = b.sectionId;
              e.storyArr = [];
              e.sectionNo = a.questBattle.parameterMap && a.questBattle.parameterMap.FLOOR ? "Stage" + a.questBattle.parameterMap.FLOOR : "Stage" + (d + 1);
              e.title = n + "話";
              e.storyArr = [a.questBattle.startStory];
              c.sectionList.push(e);
              n++
            }
          });
          c.sectionList.length && a.push(c)
        }
      });
      return a
    },
    da = function()
    {
      var a = b.storage.userArenaBattle.toJSON(),
        c = [];
      B = [];
      f.each(k.arenaBattleFreeRankClassList, function(d)
      {
        var e = Number(a.currentFreeRankClassType.split("_")[2]),
          g = Number(d.arenaBattleFreeRankClass.split("_")[2]);
        e >= g && (d.chapterId = d.arenaBattleFreeRankClass, d.title = d.className, d.questType = "ARENA", d.sectionList = [], e = {}, e.sectionId = d.openConditionSectionId, e.sectionNo = d.className, e.title = d.className, b.storage.userQuestAdventureList.findWhere(
        {
          adventureId: d.storyId
        }) && (e.canPlay = !0, e.cleared = !0, e.storyArr = [d.storyId], d.sectionList.push(e), c.push(d)))
      });
      c.sort(function(a, b)
      {
        return a.sortKey > b.sortKey ? -1 : a.sortKey < b.sortKey ? 1 : 0
      });
      f.each(c, function(a, c, g)
      {
        b.storage.userQuestAdventureList.findWhere(
        {
          adventureId: a.storyId
        }) && B.push(a.storyId)
      });
      B.join(",");
      return c
    },
    ca = function()
    {
      var a = [];
      b.storage.userCharaList.each(function(c)
      {
        var d = {},
          e = c.toJSON();
        d.chapterId = e.charaId;
        d.title = e.chara.title ? e.chara.name + "(" + e.chara.title + ")" : e.chara.name;
        d.cardId = e.chara.defaultCardId;
        d.questType = "CHARA";
        d.sectionList = [];
        b.storage.userCardList.findWhere(
        {
          id: e.userCardId
        }) ? d.displayCardId = b.storage.userCardList.findWhere(
        {
          id: e.userCardId
        }).toJSON().displayCardId : d.displayCardId = d.cardId;
        f.each(k.userSectionList, function(a, e)
        {
          if ("CHARA" == a.section.questType && c.toJSON().charaId == a.section.genericId || "COSTUME" == a.section.questType && c.toJSON().charaId == a.section.charaId)
          {
            var g = {};
            g.canPlay = a.canPlay;
            g.cleared = a.cleared;
            g.sectionId = a.sectionId;
            g.title = a.section.title;
            "CHARA" == a.section.questType ? (c.toJSON().chara.title && (g.title += "(" + c.toJSON().chara.title + ")"), g.sectionNo = a.section.genericIndex + "話") : "COSTUME" == a.section.questType && (e = (a.section.genericId + "").slice(-2), e = b.storage.userLive2dList.findWhere(
            {
              charaId: c.toJSON().charaId,
              live2dId: e
            }), c.toJSON().chara.title && (g.title += "(" + c.toJSON().chara.title + ")"), e && (g.sectionNo = e.toJSON().live2d.description));
            g.openConditionMagiaLevel = a.section.openConditionMagiaLevel || null;
            g.openConditionCharaBondsPt = a.section.openConditionCharaBondsPt || null;
            g.openConditionSection = a.section.openConditionSection || null;
            g.openConditionChapter = a.section.openConditionChapter || null;
            g.questList = [];
            g.storyArr = [];
            f.each(k.userQuestBattleList, function(b)
            {
              a.section.sectionId === b.questBattle.sectionId && g.questList.push(b)
            });
            g.questList.sort(function(a, b)
            {
              return a.questBattleId < b.questBattleId ? -1 : a.questBattleId > b.questBattleId ? 1 : 0
            });
            f.each(g.questList, function(a)
            {
              a.questBattle.startStory && g.storyArr.push(a.questBattle.startStory);
              a.questBattle.questStoryList && f.each(a.questBattle.questStoryList, function(a)
              {
                a && g.storyArr.push(a)
              });
              a.questBattle.endStory && g.storyArr.push(a.questBattle.endStory)
            });
            d.sectionList.push(g)
          }
        });
        d.sectionList.sort(function(a, b)
        {
          return a.sectionId < b.sectionId ? -1 : a.sectionId > b.sectionId ? 1 : 0
        });
        a.push(d)
      });
      a.sort(function(a, b)
      {
        return a.chapterId < b.chapterId ? -1 : a.chapterId > b.chapterId ? 1 : 0
      });
      return a
    },
    Z = function()
    {
      var a = {},
        b = [],
        d = [];
      f.each(k.userChapterList, function(a)
      {
        if ("MAIN" == a.chapter.questType || "SUB" == a.chapter.questType)
        {
          var c = {};
          c.chapterId = a.chapterId;
          c.title = a.chapter.title;
          c.questType = a.chapter.questType;
          c.chapterNoForView = a.chapter.chapterNoForView;
          a.chapter.partNo && (c.partNo = a.chapter.partNo);
          c.sectionList = [];
          f.each(k.userSectionList, function(b, d)
          {
            var e = {};
            a.chapterId === b.section.genericId && (e.canPlay = b.canPlay, e.cleared = b.cleared, e.sectionId = b.sectionId, e.title = b.section.title, e.outline = b.section.outline, e.sectionNo = b.section.genericIndex, e.outlineCardId = b.section.defaultCardId, e.questList = [], e.storyArr = [], f.each(k.userQuestBattleList, function(a)
            {
              b.section.sectionId !== a.questBattle.sectionId || a.questBattle.questBattleType && "HARD" == a.questBattle.questBattleType || e.questList.push(a)
            }), e.questList.sort(function(a, b)
            {
              return a.questBattleId < b.questBattleId ? -1 : a.questBattleId > b.questBattleId ? 1 : 0
            }), f.each(e.questList, function(a)
            {
              var c = b.section.secret ? "_" + b.section.secret : "";
              a.questBattle.startStory && e.storyArr.push(a.questBattle.startStory + c);
              a.questBattle.questStoryList && f.each(a.questBattle.questStoryList, function(a)
              {
                a && e.storyArr.push(a + c)
              });
              a.questBattle.endStory && e.storyArr.push(a.questBattle.endStory + c)
            }), 103305 == e.sectionId && (e.storyArr = [], f.each("103305-1_eP5wU 103305-3_eP5wU 103305-4_eP5wU 103305-5_eP5wU 103305-6_eP5wU 103305-7_eP5wU 103305-10_eP5wU 103305-11_eP5wU 103305-8_eP5wU 103305-9_eP5wU 103305-12_eP5wU 103305-13_eP5wU 103305-14_eP5wU 103305-15_eP5wU 103305-16_eP5wU 103305-17_eP5wU 103305-18_eP5wU 103305-19_eP5wU".split(" "), function(a, b, c)
            {
              e.storyArr.push(a)
            })), c.sectionList.push(e))
          });
          c.sectionList.sort(function(a, b)
          {
            return a.sectionId < b.sectionId ? -1 : a.sectionId > b.sectionId ? 1 : 0
          });
          switch (c.questType)
          {
            case "MAIN":
              b.push(c);
              break;
            case "SUB":
              d.push(c)
          }
        }
      });
      b.sort(function(a, b)
      {
        return a.chapterId < b.chapterId ? -1 : a.chapterId > b.chapterId ? 1 : 0
      });
      d.sort(function(a, b)
      {
        return a.chapterId < b.chapterId ? -1 : a.chapterId > b.chapterId ? 1 : 0
      });
      a.mainStoryModels = b;
      a.subStoryModels = d;
      return a
    },
    aa = function()
    {
      var a = [];
      f.each(k.puellaStoryList, function(b)
      {
        var c = {};
        c.questType = b.eventType;
        c.eventId = b.eventId;
        c.eventName = b.eventName;
        c.isOpen = b.isOpen;
        c.storyList = b.storyList;
        a.push(c)
      });
      var b = ha(
      {});
      a.unshift(b);
      a.sort(function(a, b)
      {
        return a.eventId < b.eventId ? -1 : a.eventId > b.eventId ? 1 : 0
      });
      b = ia(
      {});
      b.isOpen && a.push(b);
      return a
    },
    ha = function(a)
    {
      var b = {};
      a = X.getPuellaHistoriaInfo(
      {
        puellaHistoriaNum: 99,
        pageJson: k
      });
      b.questType = "";
      b.eventId = 0;
      b.eventName = "現代神浜編";
      b.isOpen = !1;
      b.storyList = [];
      f.each(a.questInfoList, function(a, c, g)
      {
        g = {};
        g.storyTitle = a.questBattle.sectionIndex + "話";
        g.storyIds = a.questBattle.startStory;
        a.secret && (g.storyIds = a.questBattle.startStory + "_" + a.secret);
        g.isOpen = a.cleared;
        0 == c && (g.storyTitle = "Prologue");
        b.storyList.push(g)
      });
      0 < b.storyList.length && (b.isOpen = !0);
      return b
    },
    ia = function(a)
    {
      var b = {
        questType: "",
        eventId: 99,
        eventName: "Pillar of Tomorrow編",
        isOpen: !1,
        storyList: []
      };
      a = Y.getStoryIdList();
      f.each(a, function(a, c, g)
      {
        f.each(a, function(a, c, d)
        {
          var e = {};
          e.storyTitle = a.storyTitle;
          e.storyIds = a.storyId;
          f.each(k.userQuestAdventureList, function(c, d, g)
          {
            c.adventureId == a.storyId && (e.isOpen = !0, a.secret && (e.storyIds = a.storyId + "_" + a.secret), b.storyList.push(e))
          })
        })
      });
      0 < b.storyList.length && (b.isOpen = !0);
      return b
    },
    ba = function(a)
    {
      var c = function(c)
        {
          f.each(a, function(a)
          {
            a = new K(
            {
              model: a
            });
            b.doc.getElementById(c).getElementsByClassName("scrollInner")[0].appendChild(a.render().el)
          })
        },
        d = function(a)
        {
          var c = b.doc.createElement("p");
          c.className = "storyCautionText ts_white";
          c.innerText = "対象のストーリーがありません";
          b.doc.getElementById(a).getElementsByClassName("scrollInner")[0].appendChild(c)
        };
      !a || 1 > a[0].storyList.length ? d("puellaHistoriaHiddenWrap") : c("puellaHistoriaHiddenWrap")
    },
    K = p.View.extend(
    {
      id: "wrap",
      className: function()
      {
        return "wrap"
      },
      initialize: function()
      {
        this.frgmntNode = b.doc.createDocumentFragment();
        this.model.storyIdsList = [];
        var a = this;
        f.each(this.model.storyList, function(b, d)
        {
          b.isOpen && a.model.storyIdsList.push(b.storyIds);
          b = new L(
          {
            storyIdsList: a.model.storyIdsList,
            list: b,
            index: d
          });
          a.frgmntNode.appendChild(b.render().el)
        })
      },
      render: function()
      {
        this.$el.html(f.template($("#PuellaHistoriaChapterTemp").text())(
        {
          model: this.model
        }));
        this.el.getElementsByClassName("eventMultiStory")[0].appendChild(this.frgmntNode);
        return this
      }
    }),
    L = p.View.extend(
    {
      initialize: function(a)
      {
        this.storyIdsList = a.storyIdsList;
        this.list = a.list;
        this.index = a.index
      },
      events: function()
      {
        var a = {};
        a[b.cgti + " .puellaHistoriaStoryStart"] = this.puellaHistoriaStoryStart;
        return a
      },
      render: function()
      {
        this.$el.html(this.template(
        {
          list: this.list,
          index: this.index
        }));
        return this
      },
      puellaHistoriaStoryStart: function(a)
      {
        a.preventDefault();
        if (!b.isScrolled() && !a.currentTarget.parentNode.classList.contains("lock"))
        {
          var c = "",
            d = a.currentTarget.dataset.ids;
          l ? (q = a = this.storyIdsList.join(","), d = a.indexOf(d), -1 < d && (a = a.substring(d), c = w(a))) : c = w(d);
          0 === c.length ? new b.PopupClass(
          {
            title: "ストーリー確認",
            content: "ストーリーがありません",
            closeBtnText: "OK"
          }) : b.preNativeFadeIn(function()
          {
            x(c)
          })
        }
      }
    }),
    O = function(a)
    {
      if (!(1 > a.storyList.length))
      {
        var c = function(c)
        {
          var d = new r(
          {
            model: a
          });
          b.doc.getElementById(c).getElementsByClassName("scrollInner")[0].appendChild(d.render().el)
        };
        a.eventId || a.regularEventId ? c("eventHiddenWrap") : a.campaignId && c("specialHiddenWrap")
      }
    },
    r = p.View.extend(
    {
      className: function()
      {
        var a = "wrap";
        !1 === this.model.isOpen && (a += " lock");
        "BRANCH" === this.model.eventType && (a += " BRANCH");
        "WITCH" === this.model.eventType && (a += " WITCH");
        return a
      },
      events: function()
      {
        var a = {};
        a[b.cgti + " .eventStoryStart"] = this.eventStoryStart;
        return a
      },
      initialize: function() {},
      render: function()
      {
        this.$el.html((this.model.campaignId ? this.templateSpecial : "BRANCH" === this.model.eventType ? this.templateBranch : "WITCH" === this.model.eventType ? this.templateWitch : this.templateCommon)(
        {
          model: this.model
        }));
        this.el.dataset.scrollHash = this.model.eventId ? this.model.eventId : this.model.campaignId ? this.model.campaignId : this.model.regularEventId;
        return this
      },
      eventStoryStart: function(a)
      {
        a.preventDefault();
        if (!b.isScrolled())
        {
          var c = "",
            d = "";
          if ("BRANCH" !== this.model.eventType || "WITCH" !== this.model.eventType)
          {
            for (var e = a.currentTarget.parentNode.parentNode.getElementsByClassName("eventStoryStart"), g = !1, f = 0; f < e.length; f++)
            {
              var h = e[f].dataset.ids;
              h === a.currentTarget.dataset.ids && (g = !0);
              g && (e[f].parentNode.classList.contains("lock") ? ("" !== d && (d += ":"), d += h) : ("" !== c && (c += ":"), c += h))
            }
            q = c
          }
          else q = a.currentTarget.dataset.ids;
          "BRANCH" !== this.model.eventType && "WITCH" !== this.model.eventType && l ? e = "" !== d : (e = a.currentTarget.parentNode.classList.contains("lock")) ? d = a.currentTarget.dataset.ids : c = a.currentTarget.dataset.ids;
          e ? this.openStory(c, d) : this.startStory(w(c))
        }
      },
      openStory: function(a, c)
      {
        var d = b.doc.getElementById("openStoryPopTemp").textContent,
          e = this.model.eventName,
          g = function()
          {
            var c = function(c)
            {
              c.preventDefault();
              b.isScrolled() || (b.g_popup_instance.popupView.close(), this.startStory(w(a)))
            }.bind(this);
            new b.PopupClass(
            {
              title: "ストーリー確認",
              content: "ストーリーを鑑賞しますか？<br><span class='c_red'>※解放済みのストーリーまで連続で鑑賞することができます。</span>",
              decideBtnText: "はい",
              decideBtnEvent: c,
              closeBtnText: "いいえ"
            })
          }.bind(this);
        if (0 < u)
        {
          var f = function(f)
            {
              f.preventDefault();
              if (!b.isScrolled())
              {
                var g = this.model.eventId,
                  h = this.model.campaignId,
                  k = this.model.regularEventId;
                f = function(f)
                {
                  b.responseSetStorage(f);
                  R();
                  (g || k) && y--;
                  h && z--;
                  S();
                  f = function()
                  {
                    var a = b.doc.getElementsByClassName(g ? "chapterIdEvent" + String(g) : h ? "chapterIdSpecial" + String(h) : "chapterIdEvent" + String(k));
                    b.removeClass(this.el, "lock");
                    a = a[0].getElementsByClassName("btnWrap");
                    $(a).removeClass("lock")
                  }.bind(this);
                  var l = function(d)
                  {
                    d.preventDefault();
                    b.isScrolled() || (b.g_popup_instance.popupView.close(), "" !== a && (a += ":"), q = a += c, this.startStory(w(a)))
                  }.bind(this);
                  new b.PopupClass(
                  {
                    title: "ストーリー解放",
                    content: "下記ストーリーを解放しました。",
                    eventName: e,
                    itemNum: u,
                    exClass: "openStoryPopup",
                    decideBtnText: "すぐに読む",
                    decideBtnEvent: l,
                    closeBtnText: "あとで読む"
                  }, d, f)
                }.bind(this);
                var l = {};
                g && (l.eventId = g);
                h && (l.campaignId = h);
                k && (l.regularEventId = k);
                D.ajaxPost(b.linkList.eventStoryUnlock, l, f)
              }
            }.bind(this),
            h = null;
          l && "" !== a && (h = g);
          new b.PopupClass(
          {
            title: "ストーリー解放",
            content: "<span class='c_pink'>" + A + "</span>を<span class='c_pink'>１個</span>消費してストーリーを解放します。<br>よろしいですか？",
            eventName: e,
            itemNum: u,
            exClass: "openStoryPopup",
            decideBtnText: "解放する",
            decideBtnEvent: f,
            closeBtnText: "キャンセル"
          }, d, null, h)
        }
        else f = "<span class='c_pink'>" + A + "</span>が<span class='c_pink'>１個</span>不足しています。",
          l && (f += "<br><span class='c_red'>" + A + "で解放することで最後まで連続で再生できます。</span>"), h = null, l && "" !== a && (h = g), new b.PopupClass(
          {
            title: "ストーリー解放",
            content: f,
            itemNum: u,
            exClass: "openStoryPopup",
            decideBtnText: "ショップへ",
            decideBtnLink: "#/ShopTop/2",
            closeBtnText: "キャンセル"
          }, d, null, h)
      },
      startStory: function(a)
      {
        if (0 === a.length) new b.PopupClass(
        {
          title: "ストーリー確認",
          content: "ストーリーがありません",
          closeBtnText: "OK"
        });
        else
        {
          var c;
          if (this.model.existsVoice)
          {
            var d = "section_event_" + this.model.eventId;
            c = function()
            {
              $("#commandDiv").on("nativeCallback", function()
              {
                $("#commandDiv").off();
                x(a, d)
              });
              h.downloadFileFullVoice(d);
              window.isBrowser && nativeCallback()
            }
          }
          else c = function()
          {
            x(a)
          };
          b.preNativeFadeIn(c)
        }
      }
    }),
    R = function()
    {
      var a = b.storage.userItemList.findWhere(
      {
        itemId: "EVENTSTORY_OPEN_KEY"
      });
      u = a ? a.get("quantity") : 0;
      b.doc.getElementById("unlockItemNum").innerText = u
    },
    S = function()
    {
      var a = b.doc.getElementById("eventBatch");
      0 < y ? (a.textContent = y, b.addClass(a, "on")) : b.removeClass(a, "on");
      a = b.doc.getElementById("specialBatch");
      0 < z ? (a.textContent = z, b.addClass(a, "on")) : b.removeClass(a, "on")
    },
    w = function(a)
    {
      a = a.replace(/:/g, ",");
      a = "" !== a ? a.split(",") : [];
      var b = [];
      f.each(a, function(a)
      {
        a && b.push(a)
      });
      return b
    };
  return {
    needModelIdObj: [
    {
      id: "user"
    },
    {
      id: "gameUser"
    },
    {
      id: "userStatusList"
    },
    {
      id: "userChapterList"
    },
    {
      id: "userSectionList"
    },
    {
      id: "userQuestBattleList"
    },
    {
      id: "userCharaList"
    },
    {
      id: "userCardList"
    },
    {
      id: "userDoppelList"
    },
    {
      id: "userDailyChallengeList"
    },
    {
      id: "userTotalChallengeList"
    },
    {
      id: "userLimitedChallengeList"
    },
    {
      id: "itemList"
    },
    {
      id: "userItemList"
    },
    {
      id: "giftList"
    },
    {
      id: "userGiftList"
    },
    {
      id: "pieceList"
    },
    {
      id: "userPieceList"
    },
    {
      id: "userPieceSetList"
    },
    {
      id: "userDeckList"
    },
    {
      id: "userArenaBattle"
    },
    {
      id: "userLive2dList"
    },
    {
      id: "userQuestAdventureList"
    },
    {
      id: "userPatrolList"
    }],
    fetch: function(a)
    {
      D.pageModelGet(this.needModelIdObj);
      t = a
    },
    init: function()
    {
      b.ready.target.className = "";
      h.changeBg(b.background);
      h.startBgm(b.bgm);
      b.androidKeyStop = !1;
      h.setWebView(!0);
      b.ready.hide();
      b.setStyle(V);
      k = D.getPageJson();
      l = "1" === localStorage.getItem("continuousPlayFlag");
      z = y = 0;
      var a = b.storage.itemList.findWhere(
      {
        itemCode: "EVENTSTORY_OPEN_KEY"
      });
      A = a ? a.get("name") : "追想の欠片";
      E = ga();
      F = new fa;
      R();
      S();
      l && b.addClassId("continuousPlayBtn", "on");
      if (t)
        if ("accomplish" === t) a = b.doc.getElementById("tabBtn").getElementsByClassName("accomplish"), 0 < a.length && $(a[0]).trigger(b.cgti);
        else if ("puellaHistoria" === t) a = b.doc.getElementById("tabBtn").getElementsByClassName("puellaHistoria"), 0 < a.length && $(a[0]).trigger(b.cgti);
      else
      {
        b.forceScrollPreset("eventHiddenWrap", "scrollInner", t, !0);
        var c = b.doc.getElementById("event").getElementsByClassName("chapterIdPanEvent" + t),
          a = b.doc.getElementById("tabBtn").getElementsByClassName("event");
        0 < a.length && $(a[0]).trigger(b.cgti);
        0 < c.length && $(c[0]).trigger(b.cgti)
      }
    },
    startCommand: function()
    {
      h.changeBg("web_0015.ExportJson");
      h.startBgm("bgm02_anime11")
    },
    remove: function(a)
    {
      E = C = q = l = B = z = y = u = A = t = null;
      F && F.remove();
      a()
    }
  }
});
