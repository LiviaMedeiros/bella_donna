define("underscore backbone backboneCommon ajaxControl command QuestUtil text!template/quest/CharaQuest.html text!css/quest/CharaQuest.css text!css/quest/QuestCommon.css js/view/quest/ClearAnimationsView".split(" "), function(f, v, a, z, k, n, H, I, J, K)
{
  function C(b, d)
  {
    console.log(b, d);
    var h = "CHARA" === d ? p : w;
    if ("ALL" === b && "CHARA" === d) a.addClass(a.doc.querySelector("#charaQuestCation"), "none");
    else if ("ALL" === b && "COSTUME" === d)
    {
      b = 0;
      for (var c in h) b += h[c];
      0 < b ? a.addClass(a.doc.querySelector("#charaQuestCation"), "none") : a.removeClass(a.doc.querySelector("#charaQuestCation"), "none")
    }
    else 0 < h[b] ? a.addClass(a.doc.querySelector("#charaQuestCation"), "none") : a.removeClass(a.doc.querySelector("#charaQuestCation"), "none")
  }

  function L()
  {
    var a = e.userCharaList;
    a.sort(function(a, b)
    {
      return a.charaId < b.charaId ? -1 : a.charaId > b.charaId ? 1 : 0
    });
    var d = e.userSectionList,
      h = e.userQuestBattleList,
      c = [];
    f.each(a, function(a, b)
    {
      var l = a.charaId;
      a.section = [];
      f.each(d, function(b, c)
      {
        var d = b.sectionId;
        c = b.section.questType;
        if (l == b.section.genericId && "CHARA" == c)
        {
          c = "";
          var t = !1,
            A = !0,
            e = !0;
          b.questBattleList = [];
          b.section.questBattleCount = 0;
          f.each(h, function(a, c)
          {
            d == a.questBattle.sectionId && (a.questBattle.questBattleType && "NORMAL" == a.questBattle.questBattleType && b.section.questBattleCount++, b.questBattleList.push(a))
          });
          b.questBattleList.sort(function(a, b)
          {
            return a.questBattle.sectionIndex - b.questBattle.sectionIndex
          });
          b.questBattleList.length && f.each(b.questBattleList, function(a, b)
          {
            a.cleared || (t = !0, A = !1);
            b = "CLEARED" === a.missionStatus2 ? "cleared" : null;
            var c = "CLEARED" === a.missionStatus3 ? "cleared" : null;
            e = "CLEARED" === a.missionStatus1 && b && c ? e : !1
          });
          t ? (c = "new", q++) : A && !e ? c = "clear" : A && e && (c = "comp");
          b.canPlay || (c = "close", q--);
          b.questStatus = c;
          a.section.push(b)
        }
      });
      a.section.sort(function(a, b)
      {
        return a.section.genericIndex - b.section.genericIndex
      });
      a.section.length && c.push(a)
    });
    return c
  }

  function M()
  {
    var b = e.userCharaList;
    b.sort(function(a, b)
    {
      return a.charaId < b.charaId ? -1 : a.charaId > b.charaId ? 1 : 0
    });
    var d = e.userSectionList,
      h = e.userQuestBattleList,
      c = [];
    f.each(b, function(b, e)
    {
      var l = b.charaId;
      b.costumeSection = [];
      f.each(d, function(c, d)
      {
        var e = c.sectionId;
        d = c.section.questType;
        if (l == c.section.charaId && "COSTUME" == d)
        {
          d = (c.section.genericId + "").slice(-2);
          d = a.storage.userLive2dList.findWhere(
          {
            charaId: l,
            live2dId: d
          });
          c.section.live2d = d.toJSON();
          d = "";
          var t = !1,
            k = !0,
            g = !0;
          c.questBattleList = [];
          c.section.questBattleCount = 0;
          f.each(h, function(a, b)
          {
            e == a.questBattle.sectionId && (a.questBattle.questBattleType && "NORMAL" == a.questBattle.questBattleType && c.section.questBattleCount++, c.questBattleList.push(a))
          });
          c.questBattleList.sort(function(a, b)
          {
            return a.questBattle.sectionIndex - b.questBattle.sectionIndex
          });
          c.questBattleList.length && f.each(c.questBattleList, function(a, b)
          {
            a.cleared || (t = !0, k = !1);
            b = "CLEARED" === a.missionStatus2 ? "cleared" : null;
            var c = "CLEARED" === a.missionStatus3 ? "cleared" : null;
            g = "CLEARED" === a.missionStatus1 && b && c ? g : !1
          });
          t ? (d = "new", r++) : k && !g ? d = "clear" : k && g && (d = "comp");
          c.canPlay || (d = "close", r--);
          c.questStatus = d;
          b.costumeSection.push(c)
        }
      });
      b.costumeSection.sort(function(a, b)
      {
        return a.section.genericIndex - b.section.genericIndex
      });
      b.costumeSection.length && c.push(b)
    });
    return c
  }
  var B, e, D, E, u, m, F, p, w, q, r, g, N = v.View.extend(
    {
      events: function()
      {
        var b = {};
        b[a.cgti + " .tabBtns li"] = this.tabFunc;
        b[a.cgti + " #toggleBtns li"] = this.toggleFunc;
        b[a.cgti + " #orderBtn"] = this.orderFunc;
        return b
      },
      initialize: function(b)
      {
        this.sortPrm = a.sfml.CharaQuest ? a.sfml.CharaQuest : "";
        console.log("sortPrm", this.sortPrm);
        this.currentViewType = "CHARA";
        this.currentAtt = "ALL";
        this.template = f.template(H);
        this.createView()
      },
      render: function()
      {
        this.$el.html(this.template(z.getPageJson()));
        return this
      },
      createView: function()
      {
        r = q = 0;
        D = L();
        E = M();
        this.createDom();
        this.orderInit();
        this.questListSort()
      },
      createDom: function()
      {
        a.setGlobalView(
        {});
        a.content.append(this.render().el);
        x.prototype.template = f.template($("#CharaParts").text());
        x.prototype.rootView = this;
        var b = a.doc.createDocumentFragment(),
          d, h, c = !1;
        e.campaignList && (c = a.campaignParse(e.campaignList));
        f.each(D, function(c, l)
        {
          c.section.length && (d = a.storage.userCardList.findWhere(
          {
            id: c.userCardId
          }).toJSON(), c.card = d, h = new x(
          {
            model: c
          }, "CHARA"), b.appendChild(h.render().el), f.each(p, function(a, b)
          {
            b === c.chara.attributeId && (p[b] += 1)
          }))
        });
        f.each(E, function(c, l)
        {
          c.costumeSection.length && (d = a.storage.userCardList.findWhere(
          {
            id: c.userCardId
          }).toJSON(), c.card = d, h = new x(
          {
            model: c
          }, "COSTUME"), b.appendChild(h.render().el), f.each(p, function(a, b)
          {
            b === c.chara.attributeId && (w[b] += 1)
          }))
        });
        a.doc.getElementById("charaQuestInner").appendChild(b);
        y.prototype.rootView = this;
        y.prototype.template = f.template($("#Section").text());
        G.prototype.template = f.template($("#SectionParts").text());
        if (c.POINT_UP && !c.POINT_UP.globalBadge && 0 < c.POINT_UP.pointUpType.length)
        {
          var l = a.doc.getElementById("questLinkBtnWrap"); - 1 < c.POINT_UP.pointUpType.indexOf("MAIN") && a.addClass(l.getElementsByClassName("main")[0], "pointUp");
          if (-1 < c.POINT_UP.pointUpType.indexOf("SUB"))
          {
            var g = a.storage.gameUser.toJSON();
            g.closeFunctions && -1 === g.closeFunctions.indexOf("ARENA") && a.addClass(l.getElementsByClassName("side")[0], "pointUp")
          }(-1 < c.POINT_UP.pointUpType.indexOf("CHARA") || -1 < c.POINT_UP.pointUpType.indexOf("COSTUME")) && a.addClass(l.getElementsByClassName("chara")[0], "pointUp");
          (-1 < c.POINT_UP.pointUpType.indexOf("COMPOSE") || -1 < c.POINT_UP.pointUpType.indexOf("MATERIAL") || -1 < c.POINT_UP.pointUpType.indexOf("ENHANCEMENT_AROUSAL")) && a.addClass(l.getElementsByClassName("event")[0], "pointUp")
        }
        k.getBaseData(a.getNativeObj());
        var m = 0;
        f.each(e.userSectionList, function(a, b)
        {
          "SUB" == a.section.questType && m++
        });
        m || (a.removeClass(a.doc.querySelector(".side"), "linkBtn"), a.addClass(a.doc.querySelector(".side"), "off"));
        a.scrollSet("charaQuestWrap", "charaQuestInner");
        n.canPlayQuestNum();
        n.eventTabSwitch(e.eventList);
        a.charaQuestBeforeType && a.charaQuestBeforeCharaId && ("CHARA" !== a.charaQuestBeforeType && (c = a.doc.getElementById("toggleBtns").getElementsByClassName(a.charaQuestBeforeType)[0], l = c.dataset.type, a.doc.getElementById("CharaQuest").className = l, a.removeClass(a.doc.getElementById("toggleBtns").getElementsByClassName("current")[0], "current"), a.addClass(c, "current")), this.currentViewType = a.charaQuestBeforeType, this.trigger("quickShow", a.charaQuestBeforeCharaId));
        0 < q && (c = a.doc.getElementById("toggleBtns").getElementsByClassName("CHARA")[0], a.addClass(c, "batch"), c.getElementsByClassName("batch")[0].innerText = q);
        0 < r && (c = a.doc.getElementById("toggleBtns").getElementsByClassName("COSTUME")[0], a.addClass(c, "batch"), c.getElementsByClassName("batch")[0].innerText = r);
        a.firstNaviCheck(e);
        a.ready.hide();
        a.clearSectionModel && (c = a.clearSectionModel.section, l = n.clearRewardChestColor(c.clearReward), K.section(c.clearRewardCode, c, l), a.clearSectionModel = null)
      },
      tabFunc: function(b)
      {
        b.preventDefault();
        if (!a.isScrolled())
        {
          var d = b.currentTarget.getAttribute("data-att");
          a.doc.querySelector("#charaQuestInner").className = "charaQuestInner " + d.toLowerCase();
          this.currentAtt = d;
          C(this.currentAtt, this.currentViewType);
          a.removeClass(a.doc.querySelector(".tabBtns .current"), "current");
          a.addClass(b.currentTarget, "current");
          a.scrollRefresh(null, null, !0)
        }
      },
      toggleFunc: function(b)
      {
        b.preventDefault();
        if (!a.isScrolled())
        {
          var d = b.currentTarget.dataset.type;
          this.currentViewType = a.doc.getElementById("CharaQuest").className = d;
          a.removeClass(a.doc.getElementById("toggleBtns").getElementsByClassName("current")[0], "current");
          a.addClass(b.currentTarget, "current");
          C(this.currentAtt, this.currentViewType);
          a.scrollRefresh(null, null, !0)
        }
      },
      orderFunc: function(b)
      {
        b.preventDefault();
        if (!a.isScrolled())
        {
          switch (this.sortPrm)
          {
            case "":
              this.sortPrm = "newAsc";
              break;
            case "newAsc":
              this.sortPrm = "clearAsc";
              break;
            default:
              this.sortPrm = ""
          }
          this.orderInit();
          this.questListSort();
          a.sfml.CharaQuest = this.sortPrm;
          a.sfm()
        }
      },
      orderInit: function()
      {
        var b = a.doc.getElementById("orderBtn");
        switch (this.sortPrm)
        {
          case "newAsc":
            b.innerText = "未クリア優先";
            break;
          case "clearAsc":
            b.innerText = "未コンプリート";
            break;
          default:
            b.innerText = "ソートなし"
        }
      },
      questListSort: function()
      {
        var b = this.sortPrm,
          d = 0,
          h = a.doc.querySelector(".charaQuestInner");
        [].slice.call(h.querySelectorAll(".charaWrap")).map(function(a)
        {
          var b = a.querySelectorAll(".questState li"),
            c = $(b).hasClass("new"),
            b = $(b).hasClass("clear");
          return {
            dom: a,
            newFlag: c,
            clearFlag: b
          }
        }).sort(function(a, d)
        {
          if ("newAsc" === b)
          {
            if (a.newFlag && !d.newFlag) return -1;
            if (!a.newFlag && d.newFlag) return 1
          }
          else if ("clearAsc" === b)
          {
            if (a.clearFlag && !d.clearFlag) return -1;
            if (!a.clearFlag && d.clearFlag) return 1
          }
          return 0
        }).forEach(function(a)
        {
          a.dom.style.WebkitOrder = d;
          a.dom.style.order = d;
          d = d + 1 | 0
        })
      },
      removeView: function()
      {
        this.trigger("removeView");
        this.off();
        this.remove()
      }
    }),
    x = v.View.extend(
    {
      events: function()
      {
        var b = {};
        b[a.cgti] = this.sectionShow;
        return b
      },
      initialize: function(a, d)
      {
        this.listenTo(this.rootView, "removeView", this.removeView);
        this.listenTo(this.rootView, "quickShow", this.quickSectionShow);
        this.questType = d
      },
      className: function(a)
      {
        return "charaWrap se_decide " + this.model.chara.attributeId.toLowerCase()
      },
      render: function()
      {
        this.$el.html(this.template(
        {
          model: this.model,
          questType: this.questType
        }));
        this.el.className += " " + this.questType;
        return this
      },
      quickSectionShow: function(b)
      {
        if (this.model.charaId === a.charaQuestBeforeCharaId && this.questType === a.charaQuestBeforeType)
        {
          console.log("quickSectionShow", this.model.charaId, this.questType);
          b = Math.floor(6 * Math.random()) + 6;
          var d = String(b);
          1 == d.length && (d = "0" + d);
          this.model.displayMessage = f.findWhere(this.model.chara.charaMessageList,
          {
            messageId: b
          }).message;
          b = a.doc.createDocumentFragment();
          g = new y(
          {
            model: this.model
          }, this.questType);
          b.appendChild(g.render().el);
          a.doc.getElementById("charaSection").appendChild(b);
          a.scrollSet("questList", "sectionList");
          charaSection.className = "show";
          charaList.className = "hide";
          questLinkBtnWrap.className = "hide";
          setTimeout(function()
          {
            g.tapAnimeEnd();
            a.doc.querySelector("#questList .sectionList").appendChild(u);
            k.getBaseData(a.getNativeObj())
          }, 20);
          $(a.ready.content).on("webkitAnimationEnd", function()
          {
            $(a.ready.content).off();
            $(a.ready.content).on("webkitAnimationEnd", function(b)
            {
              "readyFadeIn" == b.originalEvent.animationName && (a.tapBlock(!1), a.scrollRefresh(null, null, null, !0))
            });
            m = a.doc.getElementById("globalBackBtn");
            var b = function()
            {
              m.removeEventListener(a.cgti, b);
              a.tapBlock(!0);
              k.stopVoice();
              charaSection.className = "hide";
              questLinkBtnWrap.className = "";
              charaList.className = "show";
              a.charaQuestBeforeType = null;
              a.charaQuestBeforeCharaId = null;
              g.trigger("remove");
              setTimeout(function()
              {
                a.tapBlock(!1)
              }, 500)
            };
            m.setAttribute("data-noLink", "true");
            m.addEventListener(a.cgti, b)
          })
        }
      },
      sectionShow: function(b)
      {
        b.preventDefault();
        if (!a.isScrolled())
        {
          a.tapBlock(!0);
          setTimeout(function()
          {
            a.tapBlock(!1)
          }, 500);
          a.doc.getElementById("orderBtn").style.display = "none";
          b = Math.floor(6 * Math.random()) + 6;
          var d = String(b);
          1 == d.length && (d = "0" + d);
          var h = "vo_char_" + this.model.charaId + "_00_" + d;
          this.model.displayMessage = f.findWhere(this.model.chara.charaMessageList,
          {
            messageId: b
          }).message;
          b = a.doc.createDocumentFragment();
          g = new y(
          {
            model: this.model
          }, this.questType);
          b.appendChild(g.render().el);
          a.doc.getElementById("charaSection").appendChild(b);
          a.scrollSet("questList", "sectionList");
          charaSection.className = "show";
          charaList.className = "hide";
          questLinkBtnWrap.className = "hide";
          setTimeout(function()
          {
            a.doc.querySelector("#questList .sectionList").appendChild(u);
            k.getBaseData(a.getNativeObj());
            k.stopVoice();
            k.startVoice(h)
          }, 20);
          m = a.doc.getElementById("globalBackBtn");
          var c = function()
          {
            m.removeEventListener(a.cgti, c);
            a.tapBlock(!0);
            setTimeout(function()
            {
              a.tapBlock(!1)
            }, 500);
            a.doc.getElementById("orderBtn").style.display = "block";
            k.stopVoice();
            charaSection.className = "hide";
            questLinkBtnWrap.className = "";
            charaList.className = "show";
            a.charaQuestBeforeType = null;
            a.charaQuestBeforeCharaId = null;
            g.trigger("remove")
          };
          m.setAttribute("data-noLink", "true");
          m.addEventListener(a.cgti, c);
          a.charaQuestBeforeType = this.rootView.currentViewType;
          a.charaQuestBeforeCharaId = this.model.charaId
        }
      },
      removeView: function()
      {
        this.off();
        this.remove()
      }
    }),
    y = v.View.extend(
    {
      events: function()
      {
        var b = {};
        b[a.cgti + " #animationWrap1"] = this.tapAnimeEnd;
        b["webkitTransitionEnd #animationWrap2 .patternbg4"] = this.animeEndFunc;
        b["webkitAnimationEnd #animationWrap2 .patternbg4"] = this.animeEndFunc;
        b["webkitanimationend #animationWrap2 .patternbg4"] = this.animeEndFunc;
        b["animationend #animationWrap2 .patternbg4"] = this.animeEndFunc;
        return b
      },
      initialize: function(a, d)
      {
        this.listenTo(this.rootView, "remove", this.removeView);
        this.listenTo(this, "remove", this.removeView);
        this.questType = d;
        this.createView()
      },
      render: function()
      {
        this.$el.html(this.template(
        {
          model: this.model
        }));
        return this
      },
      createView: function()
      {
        var a = this,
          d = "CHARA" === this.questType ? this.model.section : this.model.costumeSection;
        d.sort(function(a, b)
        {
          return a.section.genericIndex > b.section.genericIndex ? -1 : a.section.genericIndex < b.section.genericIndex ? 1 : 0
        });
        f.each(d, function(b, c)
        {
          b.name = a.model.chara.name;
          a.model.chara.title && (b.name += "(" + a.model.chara.title + ")");
          b.chestColor = n.clearRewardChestColor(b.section.clearReward);
          b = new G(
          {
            model: b
          });
          u.appendChild(b.render().el)
        })
      },
      tapAnimeEnd: function(b)
      {
        if (b && (b.preventDefault(), a.isScrolled())) return;
        a.addClass(this.el.getElementsByClassName("charaImg")[0], "animEnd");
        this.animeEndFunc();
        k.stopVoice()
      },
      animeEndFunc: function()
      {
        a.addClass(a.doc.getElementById("animationWrap1"), "off");
        a.addClass(a.doc.getElementById("animationWrap2"), "off");
        a.removeClass(a.doc.getElementById("questListWrap"), "off");
        a.scrollRefresh()
      },
      removeView: function()
      {
        this.off();
        this.remove()
      }
    }),
    G = v.View.extend(
    {
      className: "section se_decide",
      initialize: function() {},
      events: function()
      {
        var b = {};
        b[a.cgti] = this.sectionLink;
        return b
      },
      render: function()
      {
        console.log(this.model);
        this.$el.html(this.template(
        {
          model: this.model
        }));
        this.model.canPlay || (this.el.className += " off");
        return this
      },
      openConditionPopup: function()
      {
        var b = {
          exClass: "openConditionPopup",
          popupType: "original",
          name: this.model.name,
          conditionList: n.openConditionJson(this.model.section, this.model.name)
        };
        new a.PopupClass(b, F)
      },
      sectionLink: function(b)
      {
        b.preventDefault();
        a.isScrolled() || (b.currentTarget.classList.contains("off") ? this.openConditionPopup() : location.href = "#/QuestBattleSelect/" + this.model.sectionId)
      }
    });
  return {
    needModelIdObj: [
    {
      id: "user"
    },
    {
      id: "gameUser"
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
      id: "userStatusList"
    },
    {
      id: "userCharaList"
    },
    {
      id: "userCardList"
    },
    {
      id: "userDeckList"
    },
    {
      id: "userDoppelList"
    },
    {
      id: "userLive2dList"
    },
    {
      id: "userSectionList"
    },
    {
      id: "userQuestBattleList"
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
      id: "pieceList"
    },
    {
      id: "userFollowList"
    },
    {
      id: "userPatrolList"
    }],
    fetch: function()
    {
      z.pageModelGet(this.needModelIdObj)
    },
    init: function()
    {
      p = {
        FIRE: 0,
        WATER: 0,
        TIMBER: 0,
        LIGHT: 0,
        DARK: 0,
        VOID: 0
      };
      w = {
        FIRE: 0,
        WATER: 0,
        TIMBER: 0,
        LIGHT: 0,
        DARK: 0,
        VOID: 0
      };
      a.setStyle(I + J);
      e = z.getPageJson();
      u = a.doc.createDocumentFragment();
      n.supportPickUp(e);
      B = new N;
      F = $("#OpenConditionPopupTemp").text();
      k.getBaseData(a.getNativeObj());
      a.searchQuestGiftId = null
    },
    startCommand: function()
    {
      k.changeBg("web_common.ExportJson");
      k.startBgm("bgm04_movie12")
    },
    remove: function(a)
    {
      g && (g.trigger("remove"), g = null);
      r = q = u = null;
      B && B.removeView();
      a()
    }
  }
});
