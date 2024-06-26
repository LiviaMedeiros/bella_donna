define(["underscore", "backbone", "backboneCommon", "ajaxControl", "command"], function(k, G, f, z, H)
{
  function A(a)
  {
    var c = [],
      b = a.questBattle;
    !a.cleared && b.firstClearRewardCodes && (a = b.firstClearRewardCodes.split(","), k.each(a, function(a, b)
    {
      c.push(
      {
        firstClearRewardCode: a
      })
    }));
    b.addDropItemId && c.push(
    {
      addDropItemId: b.addDropItemId
    });
    b.defaultDropItem && c.push(b.defaultDropItem);
    for (a = 0; 5 > a;) b["dropItem" + (a + 1)] && c.push(b["dropItem" + (a + 1)]), a = a + 1 | 0;
    return c
  }

  function B(a)
  {
    var c = null,
      b = [],
      d = [],
      e = {},
      r = [],
      n = [];
    k.each(a, function(a, d)
    {
      if (a.firstClearRewardCode) r.push(a.firstClearRewardCode);
      else if (a.addDropItemId) c = a.addDropItemId;
      else
        for (d = 0; 10 > d;) a["rewardCode" + (d + 1)] && b.push(a["rewardCode" + (d + 1)]), d = d + 1 | 0
    });
    0 < r.length && (e.firstClearReward = [], e.firstClearRewardName = [], e.firstClearRewardQuantity = [], k.each(r, function(a)
    {
      a = f.itemSet(a);
      a.isFirstClear = !0;
      n.push(a);
      a = a.itemCode.toLowerCase();
      e.firstClearReward.push(a);
      var b, c; - 1 !== a.indexOf("gift") ? (b = f.storage.giftList.findWhere(
      {
        id: Number(a.split("item_gift_")[1])
      }), c = f.storage.userGiftList.findWhere(
      {
        giftId: Number(a.split("item_gift_")[1])
      })) : (b = f.storage.itemList.findWhere(
      {
        itemCode: a.toUpperCase()
      }), c = f.storage.userItemList.findWhere(
      {
        itemId: a.toUpperCase()
      }));
      if (b) e.firstClearRewardName.push(b.toJSON().name), c ? e.firstClearRewardQuantity.push(c.toJSON().quantity) : e.firstClearRewardQuantity.push("0");
      else switch (a)
      {
        case "riche":
          e.firstClearRewardName.push("カースチップ"), e.firstClearRewardQuantity.push(f.storage.gameUser.toJSON().riche)
      }
    }));
    if (c)
    {
      e.addDropItem = c.toLowerCase();
      a = e.addDropItem;
      var v = null,
        q = null,
        v = f.storage.itemList.findWhere(
        {
          itemCode: a.toUpperCase()
        }),
        q = f.storage.userItemList.findWhere(
        {
          itemId: a.toUpperCase()
        });
      v && (e.addDropItemName = v.toJSON().name, e.addDropItemQuantity = q ? q.toJSON().quantity : "0")
    }
    k.each(b, function(a, b)
    {
      a = f.itemSet(a);
      n.push(a);
      a && (a = a.itemCode.toLowerCase(), d.push(a))
    });
    var d = d.filter(function(a, b, c)
      {
        return c.indexOf(a) === b
      }),
      p = [],
      h = [];
    k.each(d, function(a)
    {
      var b, c;
      "riche" == a ? (c = "カースチップ", b = f.storage.gameUser.toJSON().riche) : (-1 !== a.indexOf("gift") ? (b = f.storage.giftList.findWhere(
      {
        id: Number(a.split("item_gift_")[1])
      }), a = f.storage.userGiftList.findWhere(
      {
        giftId: Number(a.split("item_gift_")[1])
      })) : (b = f.storage.itemList.findWhere(
      {
        itemCode: a.toUpperCase()
      }), a = f.storage.userItemList.findWhere(
      {
        itemId: a.toUpperCase()
      })), b && (c = b.toJSON().name), b = a ? a.toJSON().quantity : "0");
      p.push(c);
      h.push(b)
    });
    e.list = d;
    e.nameList = p;
    e.quantityList = h;
    e.itemSetList = n;
    return e
  }
  var h = {},
    w = !1;
  h.createChapterModel = function(a)
  {
    var c = f.storage.userChapterList.findWhere(
    {
      chapterId: a
    }).toJSON();
    a = k.filter(f.storage.userSectionList.toJSON(), function(a)
    {
      return a.section.genericId == c.chapterId
    });
    var b = k.filter(f.storage.userQuestBattleList.toJSON(), function(a)
    {
      return 1E5 <= a.questBattle.sectionId && 2E5 > a.questBattle.sectionId
    });
    c.sectionList = [];
    k.each(a, function(a, e)
    {
      a.section.questBattleList = [];
      k.each(b, function(b)
      {
        if (a.sectionId === b.questBattle.sectionId && f.mainQuestMode == b.questBattle.questBattleType)
        {
          var c = "CLEARED" === b.missionStatus2 ? "cleared" : null,
            e = "CLEARED" === b.missionStatus3 ? "cleared" : null,
            d = b.cleared ? "clear" : "new";
          b.questState = "CLEARED" === b.missionStatus1 && c && e ? "comp" : d;
          a.section.questBattleList.push(b)
        }
      });
      a.section.questBattleList.length && (a.section.questBattleList.sort(function(a, b)
      {
        return a.questBattle.sectionIndex - b.questBattle.sectionIndex
      }), c.sectionList.push(a))
    });
    c.sectionList.sort(function(a, b)
    {
      return a.sectionId > b.sectionId ? -1 : a.sectionId < b.sectionId ? 1 : 0
    });
    return c
  };
  h.openCampaignCheck = function(a)
  {
    k.each(a, function(a, b) {})
  };
  h.openEventCheck = function(a, c)
  {
    var b = {
      event:
      {},
      eventOpenFlag: !1
    };
    k.each(c, function(c, e)
    {
      a == c.eventId && (b.event = c, b.eventOpenFlag = !0, b.event.endAtText = f.getTimeText(b.event.endAt))
    });
    return b
  };
  var m;
  h.canPlayQuestNum = function()
  {
    m = {
      MAIN: 0,
      SUB: 0,
      CHARA: 0,
      EVENT: 0
    };
    var a = f.storage.userSectionList.toJSON().concat(),
      c = f.storage.userQuestBattleList.toJSON();
    k.each(a, function(a, d)
    {
      if ("MAIN" == a.section.questType)
      {
        if (a.canPlay)
        {
          var b = !1;
          k.each(c, function(c, d)
          {
            a.sectionId == c.questBattle.sectionId && (c.cleared || (b = !0))
          });
          h.getIsScene0Info(
          {
            section: a
          }).isScene0 && (b = !1);
          b && (m.MAIN += 1)
        }
      }
      else a.canPlay && !a.cleared && (d = a.section.questType, "ENHANCEMENT_AROUSAL" == d ? d = "EVENT" : "COSTUME" == d ? d = "CHARA" : d in m || (m[d] = 0), a.canPlay && (b = !1, k.each(c, function(c, d)
      {
        a.sectionId == c.questBattle.sectionId && (c.cleared || (b = !0))
      }), b && (m[d] += 1)))
    });
    0 < m.MAIN && f.addClass(f.doc.querySelector("#questLinkBtnWrap .main"), "batch");
    0 < m.SUB && f.addClass(f.doc.querySelector("#questLinkBtnWrap .side"), "batch");
    0 < m.CHARA && (f.addClass(f.doc.querySelector("#questLinkBtnWrap .chara"), "batch"), f.doc.querySelector("#questLinkBtnWrap .chara span").textContent = m.CHARA);
    0 < m.EVENT && (f.addClass(f.doc.querySelector("#questLinkBtnWrap .event"), "batch"), f.doc.querySelector("#questLinkBtnWrap .event span").textContent = m.EVENT)
  };
  var C = "TOWER DAILYTOWER BRANCH ARENAMISSION SINGLERAID STORYRAID TRAINING ACCOMPLISH DUNGEON RAID PUELLA_RAID WITCH WALPURGIS".split(" "),
    D = {
      TOWER: "#/EventTowerTop",
      DAILYTOWER: "#/EventDailyTowerTop",
      BRANCH: "#/EventBranchTop",
      ARENAMISSION: "#/EventArenaMissionTop",
      SINGLERAID: "#/EventSingleRaidTop",
      STORYRAID: "#/EventStoryRaidTop",
      TRAINING: "#/EventTrainingTop",
      ACCOMPLISH: "#/EventAccomplishTop",
      DUNGEON: "#/EventDungeonTop",
      RAID: "#/EventRaidTop",
      PUELLA_RAID: "#/PuellaHistoriaRouter",
      WITCH: "#/EventWitchTopPage",
      WALPURGIS: "#/EventWalpurgisRaidTop"
    },
    x = {
      TOWER: "tower",
      DAILYTOWER: "dailytower",
      BRANCH: "branch",
      ARENAMISSION: "arenaMission",
      SINGLERAID: "singleraid",
      STORYRAID: "storyraid",
      TRAINING: "training",
      ACCOMPLISH: "accomplish",
      DUNGEON: "dungeon",
      RAID: "raid",
      PUELLA_RAID: "puellaRaid",
      WITCH: "eventWitch",
      WALPURGIS: "eventWalpurgis"
    };
  h.eventTabSwitch = function(a, c)
  {
    if (a && !f.tutorialId)
    {
      var b = "se_decide linkBtn";
      c && (b = c);
      var d = null;
      k.each(a, function(a, b)
      {
        -1 < C.indexOf(a.eventType) && (d = a)
      });
      if (d)
      {
        a = f.doc.querySelector("#questLinkBtnWrap .btns");
        f.addClass(a, "type_s");
        d.eventType.toLowerCase();
        c = document.createElement("li");
        c.innerHTML = "<span></span><div class='bg'></div>";
        c.className = "limitedEvent " + b;
        c.dataset.href = D[d.eventType];
        b = "";
        switch (x[d.eventType])
        {
          case "training":
            b = 'url("/magica/resource/image_web/event/training/common/tab_limited_quest_s_a.png")';
            break;
          case "puellaRaid":
            b = 'url("/magica/resource/image_web/page/quest/puellaHistoria_lastBattle/event/1198/tab_limited_quest_s.png")';
            break;
          default:
            b = 'url("/magica/resource/image_web/event/' + x[d.eventType] + "/" + d.eventId + '/tab_limited_quest_s.png")'
        }
        c.querySelector(".bg").style.background = b;
        0 < m[d.eventType] && "BRANCH" !== d.eventType && "ACCOMPLISH" !== d.eventType && (f.addClass(c, "batch"), "PUELLA_RAID" !== d.eventType || "WALPURGIS" !== d.eventType) && (c.querySelector("span").textContent = m[d.eventType]);
        a.appendChild(c)
      }
    }
  };
  h.charaConditionText = function(a)
  {
    var c;
    a.onlyCharaIds && (c = "ONLY");
    a.containCharaIds && (c = "CONTAIN");
    var b = a.charaIdNameMap;
    a = (a.onlyCharaIds || a.containCharaIds).split(",");
    var d = "このクエストには以下の開始条件があります<br>",
      e = "";
    k.each(a, function(a, c)
    {
      0 !== c && (e += ",");
      e += "<span class='c_pink'>" + b[a] + "</span>"
    });
    d += e;
    "ONLY" == c ? d += "<br>のみのチームでクエストを開始" : "CONTAIN" == c && (d += "<br>を含むチームでクエストを開始");
    return d
  };
  h.charaConditionCheck = function(a, c)
  {
    if (!f.storage.userCardListEx) return !1;
    var b;
    a.onlyCharaIds && (b = "ONLY");
    a.containCharaIds && (b = "CONTAIN");
    var d = (a.onlyCharaIds || a.containCharaIds).split(","),
      e = [],
      r = {};
    k.each(d, function(a, b)
    {
      r[a] = !1;
      k.each(c, function(b, c)
      {
        b = f.storage.userCardListEx.findWhere(
        {
          userCardId: b
        }).toJSON();
        a == b.charaId && (r[a] = !0);
        e.push(b.charaId)
      })
    });
    var n = !0;
    k.each(r, function(a, b)
    {
      a || (n = !1)
    });
    "ONLY" == b && k.each(e, function(a, b)
    {
      var c = !1;
      k.each(d, function(b, d)
      {
        a == b && (c = !0)
      });
      c || (n = !1)
    });
    return n
  };
  h.dropItemJson = function(a)
  {
    a = A(a);
    return B(a)
  };
  h.clearRewardChestColor = function(a)
  {
    function c(a)
    {
      switch ("string" == typeof a && -1 !== a.indexOf("RANK_") ? a.split("_")[1] | 0 : a)
      {
        case 1:
          return "BRONZE";
        case 2:
          return "SILVER";
        default:
          return "GOLD"
      }
    }
    switch (a.presentType)
    {
      case "ITEM":
        return a.item.treasureChestColor;
      case "GIFT":
        return c(a.gift.rank);
      case "CARD":
        return c(a.card.rank);
      case "PIECE":
      case "MAXPIECE":
        return c(a.piece.rank);
      case "DOPPEL":
      case "LIVE2D":
      case "FORMATIONSHEET":
      case "GEM":
        return "GOLD";
      case "RICHE":
        return "BRONZE"
    }
  };
  var E = {
    RANK_1: "★1",
    RANK_2: "★2",
    RANK_3: "★3",
    RANK_4: "★4",
    RANK_5: "★5"
  };
  h.openConditionJson = function(a, c, b)
  {
    c = c ? c : "";
    b = b ? "" : c + " ";
    var d = [];
    if ("CHARA" == a.questType)
    {
      var e = a.genericId,
        r = a.genericIndex,
        n = null,
        h = f.storage.userSectionList.filter(function(a)
        {
          return a.toJSON().section.genericId == e
        });
      k.each(h, function(a, b)
      {
        r - 1 == a.toJSON().section.genericIndex && (n = a.toJSON().section)
      });
      n && (c = c + " ストーリー" + n.genericIndex + "話をクリア", d.push(c))
    }
    a.openConditionSection && d.push("メインストーリー 第" + a.openConditionChapter.partNo + "部 " + a.openConditionChapter.chapterNoForView + " " + a.openConditionSection.genericIndex + "話をクリア");
    999999 == a.openConditionSectionId && d.push("今後追加のストーリーをクリア");
    a.openConditionCharaBondsPt && (c = b + "エピソードLv" + a.openConditionCharaBondsPt + "以上", d.push(c));
    a.openConditionMagiaLevel && (c = b + "マギアLv" + a.openConditionMagiaLevel, d.push(c));
    a.openConditionRank && (c = b + "レアリティ" + E[a.openConditionRank] + "以上", d.push(c));
    return d
  };
  h.supportPickUp = function(a)
  {
    if (a.gameUser && !f.strSupportPickUpUserIds && !f.tutorialId)
    {
      var c, b = a.gameUser;
      c = 70 > b.level ? 70 : b.level - 5;
      var d = 70 > b.level ? 85 : b.level + 5,
        e = Date.parse(a.currentTime) / 1E3,
        b = 70 > b.level ? new Date(1E3 * (e - 86400)) : new Date(1E3 * (e - 864E3)),
        e = new Date(1E3 * (e + 600)),
        k, n, h, m, p, u, t, g;
      k = 10 > b.getMonth() + 1 ? "0" + (b.getMonth() + 1) : b.getMonth() + 1;
      n = 10 > b.getDate() ? "0" + b.getDate() : b.getDate();
      h = 10 > b.getHours() ? "0" + b.getHours() : b.getHours();
      m = 10 > b.getMinutes() ? "0" + b.getMinutes() : b.getMinutes();
      p = 10 > e.getMonth() + 1 ? "0" + (e.getMonth() + 1) : e.getMonth() + 1;
      u = 10 > e.getDate() ? "0" + e.getDate() : e.getDate();
      t = 10 > e.getHours() ? "0" + e.getHours() : e.getHours();
      g = 10 > e.getMinutes() ? "0" + e.getMinutes() : e.getMinutes();
      b = b.getFullYear() + "-" + k + "-" + n + "T" + h + ":" + m + ":00.000+0900";
      e = e.getFullYear() + "-" + p + "-" + u + "T" + t + ":" + g + ":00.000+0900";
      c = {
        size: 30,
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
                      gte: c,
                      lte: d
                    }
                  }
                },
                {
                  range:
                  {
                    lastAccessDate:
                    {
                      gte: b,
                      lte: e
                    }
                  }
                }],
                must_not:
                {
                  term:
                  {
                    _id: String(f.storage.gameUser.get("userId"))
                  }
                }
              }
            },
            functions: [
            {
              random_score:
              {}
            }]
          }
        },
        stored_fields: "id userName attributeId lastAccessDate inviteCode userRank cardId cardRank displayCardId level revision lbCount".split(" ")
      };
      console.log("searchQuery", c);
      y(c, a)
    }
  };
  var y = function(a, c)
    {
      f.tutorialId || !c.gameUser || f.supportUserList || (f.supportPickUpUserIds = [], f.strSupportPickUpUserIds = "", z.ajaxPost(f.searchLinkList.friend, a, function(b)
      {
        var d, e, h, n, m, q, p;
        b = b.hits.hits;
        var u = f.storage.userFollowList ? f.storage.userFollowList.toJSON() : [],
          t = !1;
        b[0] && b[0].fields && (t = !0);
        k.each(b, function(a)
        {
          var b;
          if (t)
          {
            b = {};
            for (var c in a.fields) b[c] = a.fields[c][0]
          }
          else b = a._source;
          var d = !1;
          k.each(u, function(a)
          {
            b.id == a.followUserId && (d = !0)
          });
          d || f.supportPickUpUserIds.push(
          {
            userRank: b.userRank,
            id: b.id
          })
        });
        if (0 != f.supportPickUpUserIds.length || w) w = !1, F();
        else
        {
          w = !0;
          b = c.gameUser;
          if (70 > b.level)
          {
            a.query.function_score.query.bool.must[0].range.userRank.gte = 1 > b.level - 15 ? 1 : b.level - 15;
            a.query.function_score.query.bool.must[0].range.userRank.lte = b.level + 15;
            b = Date.parse(c.currentTime) / 1E3;
            var g = new Date(1E3 * (b - 864E3)),
              l = new Date(1E3 * (b + 600));
            h = e = d = b = p = q = m = n = void 0;
            n = 10 > g.getMonth() + 1 ? "0" + (g.getMonth() + 1) : g.getMonth() + 1;
            m = 10 > g.getDate() ? "0" + g.getDate() : g.getDate();
            q = 10 > g.getHours() ? "0" + g.getHours() : g.getHours();
            p = 10 > g.getMinutes() ? "0" + g.getMinutes() : g.getMinutes();
            b = 10 > l.getMonth() + 1 ? "0" + (l.getMonth() + 1) : l.getMonth() + 1;
            d = 10 > l.getDate() ? "0" + l.getDate() : l.getDate();
            e = 10 > l.getHours() ? "0" + l.getHours() : l.getHours();
            h = 10 > l.getMinutes() ? "0" + l.getMinutes() : l.getMinutes();
            g = g.getFullYear() + "-" + n + "-" + m + "T" + q + ":" + p + ":00.000+0900";
            b = l.getFullYear() + "-" + b + "-" + d + "T" + e + ":" + h + ":00.000+0900";
            a.query.function_score.query.bool.must[1].range.lastAccessDate.gte = g;
            a.query.function_score.query.bool.must[1].range.lastAccessDate.lte = b
          }
          else 145 < b.level ? (a.query.function_score.query.bool.must[0].range.userRank.gte = 115, a.query.function_score.query.bool.must[0].range.userRank.lte = 200, b = Date.parse(c.currentTime) / 1E3, g = new Date(1E3 * (b - 864E3)), l = new Date(1E3 * (b + 600)), h = e = d = b = p = q = m = n = void 0, n = 10 > g.getMonth() + 1 ? "0" + (g.getMonth() + 1) : g.getMonth() + 1, m = 10 > g.getDate() ? "0" + g.getDate() : g.getDate(), q = 10 > g.getHours() ? "0" + g.getHours() : g.getHours(), p = 10 > g.getMinutes() ? "0" + g.getMinutes() : g.getMinutes(), b = 10 > l.getMonth() + 1 ? "0" + (l.getMonth() + 1) : l.getMonth() + 1, d = 10 > l.getDate() ? "0" + l.getDate() : l.getDate(), e = 10 > l.getHours() ? "0" + l.getHours() : l.getHours(), h = 10 > l.getMinutes() ? "0" + l.getMinutes() : l.getMinutes(), g = g.getFullYear() + "-" + n + "-" + m + "T" + q + ":" + p + ":00.000+0900", b = l.getFullYear() + "-" + b + "-" + d + "T" + e + ":" + h + ":00.000+0900", a.query.function_score.query.bool.must[1].range.lastAccessDate.gte = g, a.query.function_score.query.bool.must[1].range.lastAccessDate.lte = b) : a.query.function_score.query.bool.must[0].range.userRank.gte = b.level - 30;
          y(a, c)
        }
      }))
    },
    F = function()
    {
      f.strSupportPickUpUserIds = "";
      f.supportPickUpUserIds.sort(function(a, c)
      {
        return a.userRank > c.userRank ? -1 : a.userRank < c.userRank ? 1 : 0
      });
      f.supportPickUpUserIds = f.supportPickUpUserIds.slice(0, 15);
      k.each(f.supportPickUpUserIds, function(a, c)
      {
        var b = ",";
        0 === c && (b = "");
        f.strSupportPickUpUserIds += b + a.id
      })
    };
  h.getQuestLoopStatus = function(a)
  {
    if (!a) return "none";
    var c = "able";
    if (!a.cleared || "CLEARED" !== a.missionStatus1 || "CLEARED" !== a.missionStatus2 || "CLEARED" !== a.missionStatus3 || a.questBattle.skipHelper || a.questBattle.onlyCharaIds || a.questBattle.containCharaIds) c = "none";
    a.questBattle.autoRun || (c = "none");
    return c
  };
  h.getIsScene0Info = function(a)
  {
    var c = a.section;
    a = {
      filmNum: !1,
      challengeBattleNum: !1,
      sideStoryNum: !1,
      isScene0: !1
    };
    c && c.section && (c = c.section, c.viewParameterMap && c.viewParameterMap.SCENE0_FILM_NUM && (a.filmNum = Number(c.viewParameterMap.SCENE0_FILM_NUM), a.isScene0 = !0), c.viewParameterMap && c.viewParameterMap.SCENE0_CHALLENGEBATTLE_NUM && (a.challengeBattleNum = Number(c.viewParameterMap.SCENE0_CHALLENGEBATTLE_NUM), a.isScene0 = !0), c.viewParameterMap && c.viewParameterMap.SCENE0_SIDESTORY_NUM && (a.sideStoryNum = Number(c.viewParameterMap.SCENE0_SIDESTORY_NUM), a.isScene0 = !0));
    return a
  };
  return h
});
