define(["underscore", "backbone", "backboneCommon", "ajaxControl", "command"], function(k, m, e, z, G)
{
  function A(b)
  {
    var c = [],
      a = b.questBattle;
    !b.cleared && a.firstClearRewardCodes && (b = a.firstClearRewardCodes.split(","), k.each(b, function(a, b)
    {
      c.push(
      {
        firstClearRewardCode: a
      })
    }));
    a.addDropItemId && c.push(
    {
      addDropItemId: a.addDropItemId
    });
    a.defaultDropItem && c.push(a.defaultDropItem);
    for (b = 0; 5 > b;) a["dropItem" + (b + 1)] && c.push(a["dropItem" + (b + 1)]), b = b + 1 | 0;
    return c
  }

  function B(b)
  {
    var c = null,
      a = [],
      f = [],
      d = {},
      r = [],
      n = [];
    k.each(b, function(b, f)
    {
      if (b.firstClearRewardCode) r.push(b.firstClearRewardCode);
      else if (b.addDropItemId) c = b.addDropItemId;
      else
        for (f = 0; 10 > f;) b["rewardCode" + (f + 1)] && a.push(b["rewardCode" + (f + 1)]), f = f + 1 | 0
    });
    0 < r.length && (d.firstClearReward = [], d.firstClearRewardName = [], d.firstClearRewardQuantity = [], k.each(r, function(a)
    {
      a = e.itemSet(a);
      a.isFirstClear = !0;
      n.push(a);
      a = a.itemCode.toLowerCase();
      d.firstClearReward.push(a);
      var b, c; - 1 !== a.indexOf("gift") ? (b = e.storage.giftList.findWhere(
      {
        id: Number(a.split("item_gift_")[1])
      }), c = e.storage.userGiftList.findWhere(
      {
        giftId: Number(a.split("item_gift_")[1])
      })) : (b = e.storage.itemList.findWhere(
      {
        itemCode: a.toUpperCase()
      }), c = e.storage.userItemList.findWhere(
      {
        itemId: a.toUpperCase()
      }));
      if (b) d.firstClearRewardName.push(b.toJSON().name), c ? d.firstClearRewardQuantity.push(c.toJSON().quantity) : d.firstClearRewardQuantity.push("0");
      else switch (a)
      {
        case "riche":
          d.firstClearRewardName.push("カースチップ"), d.firstClearRewardQuantity.push(e.storage.gameUser.toJSON().riche)
      }
    }));
    if (c)
    {
      d.addDropItem = c.toLowerCase();
      b = d.addDropItem;
      var v = null,
        q = null,
        v = e.storage.itemList.findWhere(
        {
          itemCode: b.toUpperCase()
        }),
        q = e.storage.userItemList.findWhere(
        {
          itemId: b.toUpperCase()
        });
      v && (d.addDropItemName = v.toJSON().name, d.addDropItemQuantity = q ? q.toJSON().quantity : "0")
    }
    k.each(a, function(a, b)
    {
      a = e.itemSet(a);
      n.push(a);
      a && (a = a.itemCode.toLowerCase(), f.push(a))
    });
    var f = f.filter(function(a, b, c)
      {
        return c.indexOf(a) === b
      }),
      p = [],
      h = [];
    k.each(f, function(a)
    {
      var b, c;
      "riche" == a ? (c = "カースチップ", b = e.storage.gameUser.toJSON().riche) : (-1 !== a.indexOf("gift") ? (b = e.storage.giftList.findWhere(
      {
        id: Number(a.split("item_gift_")[1])
      }), a = e.storage.userGiftList.findWhere(
      {
        giftId: Number(a.split("item_gift_")[1])
      })) : (b = e.storage.itemList.findWhere(
      {
        itemCode: a.toUpperCase()
      }), a = e.storage.userItemList.findWhere(
      {
        itemId: a.toUpperCase()
      })), b && (c = b.toJSON().name), b = a ? a.toJSON().quantity : "0");
      p.push(c);
      h.push(b)
    });
    d.list = f;
    d.nameList = p;
    d.quantityList = h;
    d.itemSetList = n;
    return d
  }
  m = {};
  var w = !1;
  m.createChapterModel = function(b)
  {
    var c = e.storage.userChapterList.findWhere(
    {
      chapterId: b
    }).toJSON();
    b = k.filter(e.storage.userSectionList.toJSON(), function(a)
    {
      return a.section.genericId == c.chapterId
    });
    var a = k.filter(e.storage.userQuestBattleList.toJSON(), function(a)
    {
      return 1E5 <= a.questBattle.sectionId && 2E5 > a.questBattle.sectionId
    });
    c.sectionList = [];
    k.each(b, function(b, d)
    {
      b.section.questBattleList = [];
      k.each(a, function(a)
      {
        if (b.sectionId === a.questBattle.sectionId && e.mainQuestMode == a.questBattle.questBattleType)
        {
          var c = "CLEARED" === a.missionStatus2 ? "cleared" : null,
            d = "CLEARED" === a.missionStatus3 ? "cleared" : null,
            f = a.cleared ? "clear" : "new";
          a.questState = "CLEARED" === a.missionStatus1 && c && d ? "comp" : f;
          b.section.questBattleList.push(a)
        }
      });
      b.section.questBattleList.length && (b.section.questBattleList.sort(function(a, b)
      {
        return a.questBattle.sectionIndex - b.questBattle.sectionIndex
      }), c.sectionList.push(b))
    });
    c.sectionList.sort(function(a, b)
    {
      return a.sectionId > b.sectionId ? -1 : a.sectionId < b.sectionId ? 1 : 0
    });
    return c
  };
  m.openCampaignCheck = function(b)
  {
    k.each(b, function(b, a) {})
  };
  m.openEventCheck = function(b, c)
  {
    var a = {
      event:
      {},
      eventOpenFlag: !1
    };
    k.each(c, function(c, d)
    {
      b == c.eventId && (a.event = c, a.eventOpenFlag = !0, a.event.endAtText = e.getTimeText(a.event.endAt))
    });
    return a
  };
  var h;
  m.canPlayQuestNum = function()
  {
    h = {
      MAIN: 0,
      SUB: 0,
      CHARA: 0,
      EVENT: 0
    };
    var b = e.storage.userSectionList.toJSON().concat(),
      c = e.storage.userQuestBattleList.toJSON();
    k.each(b, function(a, b)
    {
      if ("MAIN" == a.section.questType)
      {
        if (a.canPlay)
        {
          var d = !1;
          k.each(c, function(b, c)
          {
            a.sectionId == b.questBattle.sectionId && (b.cleared || (d = !0))
          });
          d && (h.MAIN += 1)
        }
      }
      else a.canPlay && !a.cleared && (b = a.section.questType, "ENHANCEMENT_AROUSAL" == b ? b = "EVENT" : "COSTUME" == b ? b = "CHARA" : b in h || (h[b] = 0), a.canPlay && (d = !1, k.each(c, function(b, c)
      {
        a.sectionId == b.questBattle.sectionId && (b.cleared || (d = !0))
      }), d && (h[b] += 1)))
    });
    0 < h.MAIN && e.addClass(e.doc.querySelector("#questLinkBtnWrap .main"), "batch");
    0 < h.SUB && e.addClass(e.doc.querySelector("#questLinkBtnWrap .side"), "batch");
    0 < h.CHARA && (e.addClass(e.doc.querySelector("#questLinkBtnWrap .chara"), "batch"), e.doc.querySelector("#questLinkBtnWrap .chara span").textContent = h.CHARA);
    0 < h.EVENT && (e.addClass(e.doc.querySelector("#questLinkBtnWrap .event"), "batch"), e.doc.querySelector("#questLinkBtnWrap .event span").textContent = h.EVENT)
  };
  var C = "TOWER DAILYTOWER BRANCH ARENAMISSION SINGLERAID STORYRAID TRAINING ACCOMPLISH DUNGEON RAID PUELLA_RAID".split(" "),
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
      PUELLA_RAID: "#/PuellaHistoriaRouter"
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
      PUELLA_RAID: "puellaRaid"
    };
  m.eventTabSwitch = function(b, c)
  {
    if (b && !e.tutorialId)
    {
      var a = "se_decide linkBtn";
      c && (a = c);
      var f = null;
      k.each(b, function(a, b)
      {
        -1 < C.indexOf(a.eventType) && (f = a)
      });
      if (f)
      {
        b = e.doc.querySelector("#questLinkBtnWrap .btns");
        e.addClass(b, "type_s");
        f.eventType.toLowerCase();
        c = document.createElement("li");
        c.innerHTML = "<span></span><div class='bg'></div>";
        c.className = "limitedEvent " + a;
        c.dataset.href = D[f.eventType];
        a = "";
        switch (x[f.eventType])
        {
          case "training":
            a = 'url("/magica/resource/image_web/event/training/common/tab_limited_quest_s_a.png")';
            break;
          case "puellaRaid":
            a = 'url("/magica/resource/image_web/page/quest/puellaHistoria_lastBattle/event/1198/tab_limited_quest_s.png")';
            break;
          default:
            a = 'url("/magica/resource/image_web/event/' + x[f.eventType] + "/" + f.eventId + '/tab_limited_quest_s.png")'
        }
        c.querySelector(".bg").style.background = a;
        0 < h[f.eventType] && "BRANCH" !== f.eventType && "ACCOMPLISH" !== f.eventType && (e.addClass(c, "batch"), "PUELLA_RAID" !== f.eventType && (c.querySelector("span").textContent = h[f.eventType]));
        b.appendChild(c)
      }
    }
  };
  m.charaConditionText = function(b)
  {
    var c;
    b.onlyCharaIds && (c = "ONLY");
    b.containCharaIds && (c = "CONTAIN");
    var a = b.charaIdNameMap;
    b = (b.onlyCharaIds || b.containCharaIds).split(",");
    var e = "このクエストには以下の開始条件があります<br>",
      d = "";
    k.each(b, function(b, c)
    {
      0 !== c && (d += ",");
      d += "<span class='c_pink'>" + a[b] + "</span>"
    });
    e += d;
    "ONLY" == c ? e += "<br>のみのチームでクエストを開始" : "CONTAIN" == c && (e += "<br>を含むチームでクエストを開始");
    return e
  };
  m.charaConditionCheck = function(b, c)
  {
    if (!e.storage.userCardListEx) return !1;
    var a;
    b.onlyCharaIds && (a = "ONLY");
    b.containCharaIds && (a = "CONTAIN");
    var f = (b.onlyCharaIds || b.containCharaIds).split(","),
      d = [],
      r = {};
    k.each(f, function(a, b)
    {
      r[a] = !1;
      k.each(c, function(b, c)
      {
        b = e.storage.userCardListEx.findWhere(
        {
          userCardId: b
        }).toJSON();
        a == b.charaId && (r[a] = !0);
        d.push(b.charaId)
      })
    });
    var n = !0;
    k.each(r, function(a, b)
    {
      a || (n = !1)
    });
    "ONLY" == a && k.each(d, function(a, b)
    {
      var c = !1;
      k.each(f, function(b, d)
      {
        a == b && (c = !0)
      });
      c || (n = !1)
    });
    return n
  };
  m.dropItemJson = function(b)
  {
    b = A(b);
    return B(b)
  };
  m.clearRewardChestColor = function(b)
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
    switch (b.presentType)
    {
      case "ITEM":
        return b.item.treasureChestColor;
      case "GIFT":
        return c(b.gift.rank);
      case "CARD":
        return c(b.card.rank);
      case "PIECE":
      case "MAXPIECE":
        return c(b.piece.rank);
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
  m.openConditionJson = function(b, c, a)
  {
    c = c ? c : "";
    a = a ? "" : c + " ";
    var f = [];
    if ("CHARA" == b.questType)
    {
      var d = b.genericId,
        r = b.genericIndex,
        n = null,
        h = e.storage.userSectionList.filter(function(a)
        {
          return a.toJSON().section.genericId == d
        });
      k.each(h, function(a, b)
      {
        r - 1 == a.toJSON().section.genericIndex && (n = a.toJSON().section)
      });
      n && (c = c + " ストーリー" + n.genericIndex + "話をクリア", f.push(c))
    }
    b.openConditionSection && f.push("メインストーリー 第" + b.openConditionChapter.partNo + "部 " + b.openConditionChapter.chapterNoForView + " " + b.openConditionSection.genericIndex + "話をクリア");
    999999 == b.openConditionSectionId && f.push("今後追加のストーリーをクリア");
    b.openConditionCharaBondsPt && (c = a + "エピソードLv" + b.openConditionCharaBondsPt + "以上", f.push(c));
    b.openConditionMagiaLevel && (c = a + "マギアLv" + b.openConditionMagiaLevel, f.push(c));
    b.openConditionRank && (c = a + "レアリティ" + E[b.openConditionRank] + "以上", f.push(c));
    return f
  };
  m.supportPickUp = function(b)
  {
    if (b.gameUser && !e.strSupportPickUpUserIds && !e.tutorialId)
    {
      var c, a = b.gameUser;
      c = 70 > a.level ? 70 : a.level - 5;
      var f = 70 > a.level ? 85 : a.level + 5,
        d = Date.parse(b.currentTime) / 1E3,
        a = 70 > a.level ? new Date(1E3 * (d - 86400)) : new Date(1E3 * (d - 864E3)),
        d = new Date(1E3 * (d + 600)),
        k, n, h, m, p, u, t, g;
      k = 10 > a.getMonth() + 1 ? "0" + (a.getMonth() + 1) : a.getMonth() + 1;
      n = 10 > a.getDate() ? "0" + a.getDate() : a.getDate();
      h = 10 > a.getHours() ? "0" + a.getHours() : a.getHours();
      m = 10 > a.getMinutes() ? "0" + a.getMinutes() : a.getMinutes();
      p = 10 > d.getMonth() + 1 ? "0" + (d.getMonth() + 1) : d.getMonth() + 1;
      u = 10 > d.getDate() ? "0" + d.getDate() : d.getDate();
      t = 10 > d.getHours() ? "0" + d.getHours() : d.getHours();
      g = 10 > d.getMinutes() ? "0" + d.getMinutes() : d.getMinutes();
      a = a.getFullYear() + "-" + k + "-" + n + "T" + h + ":" + m + ":00.000+0900";
      d = d.getFullYear() + "-" + p + "-" + u + "T" + t + ":" + g + ":00.000+0900";
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
                      lte: f
                    }
                  }
                },
                {
                  range:
                  {
                    lastAccessDate:
                    {
                      gte: a,
                      lte: d
                    }
                  }
                }],
                must_not:
                {
                  term:
                  {
                    _id: String(e.storage.gameUser.get("userId"))
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
      y(c, b)
    }
  };
  var y = function(b, c)
    {
      e.tutorialId || !c.gameUser || e.supportUserList || (e.supportPickUpUserIds = [], e.strSupportPickUpUserIds = "", z.ajaxPost(e.searchLinkList.friend, b, function(a)
      {
        var f, d, h, n, m, q, p;
        a = a.hits.hits;
        var u = e.storage.userFollowList ? e.storage.userFollowList.toJSON() : [],
          t = !1;
        a[0] && a[0].fields && (t = !0);
        k.each(a, function(a)
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
          d || e.supportPickUpUserIds.push(
          {
            userRank: b.userRank,
            id: b.id
          })
        });
        if (0 != e.supportPickUpUserIds.length || w) w = !1, F();
        else
        {
          w = !0;
          a = c.gameUser;
          if (70 > a.level)
          {
            b.query.function_score.query.bool.must[0].range.userRank.gte = 1 > a.level - 15 ? 1 : a.level - 15;
            b.query.function_score.query.bool.must[0].range.userRank.lte = a.level + 15;
            a = Date.parse(c.currentTime) / 1E3;
            var g = new Date(1E3 * (a - 864E3)),
              l = new Date(1E3 * (a + 600));
            h = d = f = a = p = q = m = n = void 0;
            n = 10 > g.getMonth() + 1 ? "0" + (g.getMonth() + 1) : g.getMonth() + 1;
            m = 10 > g.getDate() ? "0" + g.getDate() : g.getDate();
            q = 10 > g.getHours() ? "0" + g.getHours() : g.getHours();
            p = 10 > g.getMinutes() ? "0" + g.getMinutes() : g.getMinutes();
            a = 10 > l.getMonth() + 1 ? "0" + (l.getMonth() + 1) : l.getMonth() + 1;
            f = 10 > l.getDate() ? "0" + l.getDate() : l.getDate();
            d = 10 > l.getHours() ? "0" + l.getHours() : l.getHours();
            h = 10 > l.getMinutes() ? "0" + l.getMinutes() : l.getMinutes();
            g = g.getFullYear() + "-" + n + "-" + m + "T" + q + ":" + p + ":00.000+0900";
            a = l.getFullYear() + "-" + a + "-" + f + "T" + d + ":" + h + ":00.000+0900";
            b.query.function_score.query.bool.must[1].range.lastAccessDate.gte = g;
            b.query.function_score.query.bool.must[1].range.lastAccessDate.lte = a
          }
          else 145 < a.level ? (b.query.function_score.query.bool.must[0].range.userRank.gte = 115, b.query.function_score.query.bool.must[0].range.userRank.lte = 200, a = Date.parse(c.currentTime) / 1E3, g = new Date(1E3 * (a - 864E3)), l = new Date(1E3 * (a + 600)), h = d = f = a = p = q = m = n = void 0, n = 10 > g.getMonth() + 1 ? "0" + (g.getMonth() + 1) : g.getMonth() + 1, m = 10 > g.getDate() ? "0" + g.getDate() : g.getDate(), q = 10 > g.getHours() ? "0" + g.getHours() : g.getHours(), p = 10 > g.getMinutes() ? "0" + g.getMinutes() : g.getMinutes(), a = 10 > l.getMonth() + 1 ? "0" + (l.getMonth() + 1) : l.getMonth() + 1, f = 10 > l.getDate() ? "0" + l.getDate() : l.getDate(), d = 10 > l.getHours() ? "0" + l.getHours() : l.getHours(), h = 10 > l.getMinutes() ? "0" + l.getMinutes() : l.getMinutes(), g = g.getFullYear() + "-" + n + "-" + m + "T" + q + ":" + p + ":00.000+0900", a = l.getFullYear() + "-" + a + "-" + f + "T" + d + ":" + h + ":00.000+0900", b.query.function_score.query.bool.must[1].range.lastAccessDate.gte = g, b.query.function_score.query.bool.must[1].range.lastAccessDate.lte = a) : b.query.function_score.query.bool.must[0].range.userRank.gte = a.level - 30;
          y(b, c)
        }
      }))
    },
    F = function()
    {
      e.strSupportPickUpUserIds = "";
      e.supportPickUpUserIds.sort(function(b, c)
      {
        return b.userRank > c.userRank ? -1 : b.userRank < c.userRank ? 1 : 0
      });
      e.supportPickUpUserIds = e.supportPickUpUserIds.slice(0, 15);
      k.each(e.supportPickUpUserIds, function(b, c)
      {
        var a = ",";
        0 === c && (a = "");
        e.strSupportPickUpUserIds += a + b.id
      })
    };
  m.getQuestLoopStatus = function(b)
  {
    if (!b) return "none";
    var c = "able";
    if (!b.cleared || "CLEARED" !== b.missionStatus1 || "CLEARED" !== b.missionStatus2 || "CLEARED" !== b.missionStatus3 || b.questBattle.skipHelper || b.questBattle.onlyCharaIds || b.questBattle.containCharaIds) c = "none";
    b.questBattle.autoRun || (c = "none");
    return c
  };
  return m
});
