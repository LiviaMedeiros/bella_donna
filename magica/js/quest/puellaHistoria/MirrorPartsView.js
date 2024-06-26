define("underscore backbone backboneCommon ajaxControl command text!template/quest/puellaHistoria/MirrorParts.html text!template/quest/puellaHistoria/OverviewPopup.html".split(" "), function(f, A, d, C, l, B, y)
{
  var q, n, r = [],
    z, t, p, g = {
      soulX: 150,
      soulY: 375,
      soulScale: .76,
      startX: 320,
      startY: 317,
      mirrorScale: .76,
      mirrorW: 124,
      mirrorLag: 0
    },
    u = 0,
    v = 0,
    w = 1,
    b = [
    {
      x: 0,
      y: 0,
      scale: 1
    },
    {
      x: 0,
      y: 0,
      scale: 1
    },
    {
      x: 0,
      y: 0,
      scale: 1
    },
    {
      x: 0,
      y: 0,
      scale: 1
    },
    {
      x: 0,
      y: 0,
      scale: 1
    },
    {
      x: 0,
      y: 0,
      scale: 1
    }],
    k = {
      opened: 0,
      state_1: 0,
      isClear_1: !1,
      openUp_1: 0,
      state_2: 0,
      isClear_2: !1,
      openUp_2: 0,
      state_3: 0,
      isClear_3: !1,
      openUp_3: 0
    },
    x = function(a, c)
    {
      for (var e = [], m = "END" !== c ? "touches" : "changedTouches", h = 0; h < a.originalEvent[m].length; h++)
      {
        var b = a.originalEvent[m][h].identifier;
        0 > b && (b = -b);
        e[h] = {
          identifier: b,
          clientX: 1024 === d.displayWidth ? a.originalEvent[m][h].clientX : 1024 * a.originalEvent[m][h].clientX / 1280,
          clientY: 1024 === d.displayWidth ? a.originalEvent[m][h].clientY : 1024 * a.originalEvent[m][h].clientY / 1280
        }
      }
      switch (c)
      {
        case "START":
          l.callTouchesBegin(e);
          break;
        case "MOVE":
          l.callTouchesMove(e);
          break;
        case "END":
          l.callTouchesEnd(e)
      }
      window.isBrowser && "END" == c && $("#commandDiv").trigger("nativeCallback", [
      {
        type: "selectItem",
        id: 2
      }])
    };
  return A.View.extend(
  {
    events: function()
    {
      var a = {};
      a["touchstart #nativeTouchWrap"] = this.touchStart;
      a["touchmove #nativeTouchWrap"] = this.touchMove;
      a["touchend #nativeTouchWrap"] = this.touchEnd;
      return a
    },
    initialize: function(a)
    {
      this.template = f.template(B);
      a.commonStoryInfo && (n = a.commonStoryInfo);
      a.RippleAnimationView && (z = a.RippleAnimationView);
      a.ClearMovieBgHideView && (t = a.ClearMovieBgHideView);
      r = [];
      1024 !== d.displayWidth && (g = {
        soulX: 190,
        soulY: 310,
        soulScale: .76,
        startX: 330,
        startY: 270,
        mirrorScale: .76,
        mirrorW: 110,
        mirrorLag: 0
      });
      d.ua.ipad && (g = {
        soulX: 140,
        soulY: 430,
        soulScale: 1,
        startX: 320,
        startY: 426,
        mirrorScale: .8,
        mirrorW: 124,
        mirrorLag: 110
      });
      this.convertCoordinatesParameter();
      q = this.createModel(
      {
        model: this.model,
        commonStoryInfo: n,
        CreateModel: a.CreateModel
      });
      this.setNativeObj(
      {
        model: q
      });
      p = !0
    },
    render: function()
    {
      this.$el.html(this.template(
      {
        model: q
      }));
      return this
    },
    setNativeObj: function(a)
    {
      var c = this,
        e = a.model,
        b = 0;
      f.each(e.itemList, function(a, e, d)
      {
        a.isClear && (c.isPlayClearMovie = !0, b++)
      });
      1 == e.vesselSoul.effect && (c.isPlayClearMovie = !0, b = 1);
      0 < b && setTimeout(function()
      {
        d.forceTapBlock(
        {
          isBlock: !1
        })
      }, 5E3 * b + 1E4);
      $("#commandDiv").off();
      $("#commandDiv").on("nativeCallback", function(a, b)
      {
        b && ("selectItem" == b.type && c.tapMirror(
        {
          id: b.id
        }), "selectVesselSoul" == b.type && c.tapVesselSoul(
        {}), "clear" == b.type && (c.isPlayClearMovie = !1, t.removeView(), 1 == e.vesselSoul.effect ? c.setOpenLastNoticePopup(
        {}) : c.setOpenStoryPopup(
        {
          commonStoryInfo: n
        })))
      });
      window.isBrowser && c.isPlayClearMovie && setTimeout(function()
      {
        nativeCallback(
        {
          type: "clear"
        })
      }, 3E3);
      l.setPuellaHistoriaObject(e)
    },
    touchStart: function(a)
    {
      a.preventDefault();
      p && (d.tapEffectStop = !0, x(a, "START"))
    },
    touchMove: function(a)
    {
      a.preventDefault();
      p && x(a, "MOVE")
    },
    touchEnd: function(a)
    {
      a.preventDefault();
      p && (d.tapEffectStop = !1, x(a, "END"))
    },
    tapMirror: function(a)
    {
      var c = f.findWhere(this.model.mirrorInfoList,
      {
        id: a.id
      });
      !c.isOpenEvent && 0 == c.sectionId || "none" == c.overview.title || (a = "none", "none" != c.toUrl && (a = ""), l.startSe(1002), new d.PopupClass(
      {
        title: c.overview.title,
        content: c.overview.text,
        img: c.overview.img,
        decideBtnText: "時代を進める",
        decideBtnEvent: function()
        {
          var a = new z(
          {
            endCallback: function()
            {
              location.href = c.toUrl
            }
          });
          d.doc.getElementById("tapBlock").appendChild(a.render().el);
          d.tapBlock(!0)
        },
        decideBtnClass: a
      }, y), l.getBaseData(d.getNativeObj()))
    },
    tapVesselSoul: function(a) {},
    createModel: function(a)
    {
      var c = a.model,
        e = {
          vesselSoul:
          {
            opened: c.soulInfo.openNum,
            x: u,
            y: v,
            scale: w,
            effect: 0
          },
          itemList: []
        },
        d = this;
      c.isCommonStoryLastAlreadyWatch = a.CreateModel.isCommonStoryLastAlreadyWatch(
      {
        commonStoryInfo: a.commonStoryInfo
      });
      a = localStorage.getItem("PuellaHistoriaIsCommonStoryLastAlreadyWatch");
      c.isCommonStoryLastAlreadyWatch && (e.vesselSoul.effect = c.isOpenLastBattleEvent ? 3 : a ? 2 : 1, e.vesselSoul.effect = 0);
      f.each(c.mirrorInfoList, function(a, m, f)
      {
        f = !1;
        var h = 0,
          g = 0;
        0 != a.sectionId && (g = d.checkAlreadyEffect(
        {
          id: a.id
        }), !a.isClear || g || c.isCommonStoryLastAlreadyWatch || (f = !0), f && (h++, e.vesselSoul.opened--, 1 == a.id || 3 == a.id) && (h++, e.vesselSoul.opened--), g = a.isOpenEvent ? a.isClear ? 2 : 1 : a.isArchivesQuest ? a.isClear ? 6 : 5 : a.isClear ? 4 : 3, a.isClear && r.push(a.id));
        e.itemList.push(
        {
          id: a.id,
          isClear: f,
          openUp: h,
          state: g,
          x: b[m].x,
          y: b[m].y,
          scale: b[m].scale
        })
      });
      0 > e.vesselSoul.opened && (e.vesselSoul.opened = 0);
      return e
    },
    checkAlreadyEffect: function(a)
    {
      var c = Number(a.id),
        b = !1;
      if (a = localStorage.getItem("PuellaHistoriaIsAlreadyEffectId")) a = a.split(","), f.each(a, function(a, e, d)
      {
        a == c && (b = !0)
      });
      return b
    },
    setAlreadyEffectId: function(a)
    {
      a = a.idList.join(",");
      localStorage.setItem("PuellaHistoriaIsAlreadyEffectId", a)
    },
    setAlreadyLastPopupId: function(a)
    {
      localStorage.setItem("PuellaHistoriaIsCommonStoryLastAlreadyWatch", "true")
    },
    setOpenStoryPopup: function(a)
    {
      a = a.commonStoryInfo;
      var c = 101101;
      n.sectionInfoList.length && (c = n.sectionInfoList[a.sectionInfoList.length - 1].sectionId);
      new d.PopupClass(
      {
        title: "現代神浜編 ストーリー解放",
        content: "現代神浜編のストーリーが解放されました。",
        popupType: "typeC",
        decideBtnText: "進行",
        decideBtnLink: "#/QuestBattleSelect/" + c,
        exClass: "puellaHistoriaOpenStoryPop"
      }, null, function()
      {
        $(".puellaHistoriaOpenStoryPop .decideBtn").removeClass("b_pink");
        $(".puellaHistoriaOpenStoryPop .decideBtn").addClass("b_puellaHistoria")
      }, null);
      l.startSe(1002);
      this.setAlreadyEffectId(
      {
        idList: r
      })
    },
    setOpenLastNoticePopup: function(a)
    {
      l.startSe(1002);
      var c = new d.PopupClass(
      {
        title: "COMING SOON",
        content: "次の『ピュエラ・ヒストリア』イベントをお待ち下さい。",
        img: "/page/quest/puellaHistoria/top/synopsis_s_11.png",
        decideBtnText: "OK",
        decideBtnEvent: function()
        {
          c.remove()
        }
      }, y);
      this.setAlreadyLastPopupId(
      {})
    },
    openAdjustPopup: function()
    {
      var a = function()
      {
        f.each("soulX soulY soulScale startX startY mirrorScale mirrorW mirrorLag".split(" "), function(c, b, m)
        {
          window.isBrowser || d.nativeKeyBoard(c, 8, 1, null, function()
          {
            a()
          })
        })
      };
      this.adjustPopup = new d.PopupClass(
      {
        title: "位置調整",
        content: $("#adjustPopupTemp").text(),
        closeBtnText: "閉じる",
        decideBtnText: "再表示",
        decideBtnEvent: this.resetObject,
        popupType: "typeB",
        _this: this,
        exClass: "adjustPopupSec"
      }, null, function()
      {
        f.each(g, function(a, b, d)
        {
          $("#" + b).val(d[b])
        });
        a()
      })
    },
    resetObject: function()
    {
      var a = this._this;
      a.reInputCoordinates();
      a.convertCoordinatesParameter();
      l.deletePuellaHistoriaObject();
      a.initialize(
      {
        commonStoryInfo: n
      });
      a.adjustPopup.remove()
    },
    reInputCoordinates: function()
    {
      f.each(g, function(a, c, b)
      {
        b[c] = $("#" + c).val()
      })
    },
    convertCoordinatesParameter: function()
    {
      u = Number(g.soulX);
      v = Number(g.soulY);
      w = Number(g.soulScale);
      f.each(b, function(a, c, b)
      {
        a = Number(g.startY);
        b[c].x = Number(g.startX) + Number(g.mirrorW * c);
        b[c].y = a;
        b[c].scale = Number(g.mirrorScale);
        0 != c % 2 && (b[c].y = a - g.mirrorLag)
      })
    },
    openOverviewPopup: function()
    {
      this.tapMirror(
      {
        id: 1
      })
    },
    openOpenStoryPopup: function()
    {
      this.setOpenStoryPopup(
      {
        commonStoryInfo: n
      })
    },
    clearCheckPopup: function()
    {
      var a = this,
        c = function()
        {
          f.each("opened state_1 isClear_1 openUp_1 state_2 isClear_2 openUp_2 state_3 isClear_3 openUp_3".split(" "), function(a, b, e)
          {
            window.isBrowser || d.nativeKeyBoard(a, 8, 1, null, function()
            {
              c()
            })
          })
        },
        e = new d.PopupClass(
        {
          title: "クリア演出確認",
          content: $("#clearCheckPopupTemp").text(),
          closeBtnText: "閉じる",
          decideBtnText: "再表示",
          decideBtnEvent: function()
          {
            f.each(k, function(a, b, c)
            {
              c[b] = $("#" + b).val();
              "true" == c[b] ? c[b] = !0 : "false" == c[b] && (c[b] = !1)
            });
            l.deletePuellaHistoriaObject();
            var c = {
              vesselSoul:
              {
                opened: Number(k.opened),
                x: u,
                y: v,
                scale: w
              },
              itemList: [
              {
                id: 1,
                isClear: !!k.isClear_1,
                openUp: Number(k.openUp_1),
                state: Number(k.state_1),
                x: b[0].x,
                y: b[0].y,
                scale: b[0].scale
              },
              {
                id: 2,
                isClear: !!k.isClear_2,
                openUp: Number(k.openUp_2),
                state: Number(k.state_2),
                x: b[1].x,
                y: b[1].y,
                scale: b[1].scale
              },
              {
                id: 3,
                isClear: !!k.isClear_3,
                openUp: Number(k.openUp_3),
                state: Number(k.state_3),
                x: b[2].x,
                y: b[2].y,
                scale: b[2].scale
              },
              {
                id: 4,
                isClear: !1,
                openUp: 0,
                state: 0,
                x: b[3].x,
                y: b[3].y,
                scale: b[3].scale
              },
              {
                id: 5,
                isClear: !1,
                openUp: 0,
                state: 0,
                x: b[4].x,
                y: b[4].y,
                scale: b[4].scale
              },
              {
                id: 6,
                isClear: !1,
                openUp: 0,
                state: 0,
                x: b[5].x,
                y: b[5].y,
                scale: b[5].scale
              }]
            };
            a.setNativeObj(
            {
              model: c
            });
            e.remove();
            var h = 0;
            f.each(c.itemList, function(b, c, d)
            {
              b.isClear && (a.isPlayClearMovie = !0, h++)
            });
            a.isPlayClearMovie && $("#overlapContainer").append(t.render().el);
            0 < h && setTimeout(function()
            {
              d.forceTapBlock(
              {
                isBlock: !1
              })
            }, 5E3 * h + 1E4)
          },
          popupType: "typeB",
          _this: this,
          exClass: "clearCheckPopupSec"
        }, null, function()
        {
          f.each(k, function(a, b, c)
          {
            $("#" + b).val(c[b])
          });
          c()
        })
    },
    isPlayClearMovie: !1,
    removeView: function()
    {
      $("#commandDiv").off();
      l.deletePuellaHistoriaObject();
      d.forceTapBlock(
      {
        isBlock: !1
      });
      p = null;
      this.off();
      this.remove()
    }
  })
});
