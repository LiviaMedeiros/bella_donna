define("underscore backbone backboneCommon ajaxControl text!template/memoria/PieceArchive.html js/view/memoria/PieceArchivePartsView js/view/memoria/MemoriaEquipInfoView cardUtil memoriaSortUtil memoriaUtil command".split(" "), function(f, g, a, h, B, p, u, v, C, q, r)
{
  var k = "rank level hp atk def lb get".split(" "),
    w = {
      rank: "レアリティ順",
      level: "レベル順",
      hp: "HP順",
      atk: "ATK順",
      def: "DEF順",
      lb: "限界突破順",
      get: "入手順"
    };
  g.Model.extend();
  var d;
  u = g.View.extend(
  {
    events: function()
    {
      var b = {};
      b[a.cgti + " #ascPanelMemoria li"] = this.ascStartMemoria;
      b[a.cgti + " #sortBtn"] = this.sortStart;
      b[a.cgti + " #sortPopupMemoria"] = this.sortPopMemoria;
      b[a.cgti + " #eventFilterBtn"] = this.eventFilterBtn;
      b[a.cgti + " #sizeChange"] = this.sizeChange;
      b[a.cgti + " #selectResetBtn"] = this.archiveAfterFunc;
      b[a.cgti + " #bulkSelectBtn"] = this.bulkSelectBtn;
      b[a.cgti + " #archiveBtn"] = this.archiveBtn;
      b[a.cgti + " .archiveMoveSelectPop .moveToBtn"] = this.moveToBtn;
      b[a.cgti + " #nameChangeBtn"] = this.nameChange;
      return b
    },
    initialize: function(b)
    {
      this.template = f.template(B);
      this.listenTo(this, "remove", this.removeView);
      this.listenTo(a.storage.userPieceList, "change", this.memoriaChangeCheck);
      this.equipInfo = b.equipInfo;
      this.mode = b.mode;
      this.memoriaSort = d = new C("normal" === this.mode ? "UserMemoriaList_card" : "UserMemoriaList_archive", this);
      this.hasChange = !1;
      this.userLimitArchive = this.userLimitHands = this.selectCount = this.archiveMemoriaCount = this.normalMemoriaCount = 0;
      a.setGlobalView();
      this.createDom()
    },
    render: function()
    {
      this.$el.html(this.template(h.getPageJson()));
      return this
    },
    createDom: function()
    {
      a.content.append(this.render().el);
      this.growViewSet();
      this.createView()
    },
    growViewSet: function()
    {
      x.prototype.rootView = this;
      new x;
      y.prototype.rootView = this;
      new y
    },
    createView: function()
    {
      this.memoriaUtil = q;
      this.memoriaPartsTemplate = f.template($("#MemoriaListParts").text());
      z.prototype.rootView = this;
      A.prototype.rootView = this;
      p.prototype.rootView = this;
      h.getPageJson();
      this.mode || a.addClass(a.doc.getElementById("UserMemoriaList"), "list");
      this.orderSet();
      d.isFilterOn() ? a.doc.getElementById("sortPopupMemoria").className = "se_tabs sb_gold_02 TE on" : a.doc.getElementById("sortPopupMemoria").className = "se_tabs sb_gold_02 TE off";
      a.doc.querySelector("#sortBtn").innerHTML = "<span class='b_screen'></span>" + w[d.getSortId()];
      a.addClass(a.doc.getElementById("memoriaWrapInner"), d.getSortId());
      this.firstCollectionSort();
      this.firstArchiveCollectionSort();
      this.normalListView = new z;
      this.archiveListView = new A;
      var b = "normal" === this.mode ? this.normalListView : this.archiveListView;
      a.doc.getElementById("memoriaWrapInner").appendChild(b.el);
      r.getBaseData(a.getNativeObj());
      a.scrollSet("scrollSet", "scrollInner");
      d.sortPrm[4] ? a.addClass(a.doc.getElementById("memoriaWrap"), "onlyEvent") : a.removeClass(a.doc.getElementById("memoriaWrap"), "onlyEvent");
      null !== d.sortPrm[4] && a.addClass(a.doc.getElementById("eventFilterBtn"), "on");
      var b = a.doc.getElementById("memoriaWrap"),
        c = a.doc.getElementById("sizeChange");
      switch (d.getDisplaySize())
      {
        case .8:
          a.addClass(b, "smaller");
          c.dataset.size = "smallest";
          a.addClass(c, "smaller");
          break;
        case .7:
          a.removeClass(b, "smaller");
          a.addClass(b, "smallest");
          c.dataset.size = "normal";
          a.removeClass(c, "smaller");
          a.addClass(c, "smallest");
          break;
        default:
          a.removeClass(b, "smallest"), c.dataset.size = "smaller", a.removeClass(c, "smallest")
      }
      b = a.storage.gameUser.toJSON().cardCapacity;
      this.userLimitHands = b - a.storage.userPieceList.length;
      this.archiveMemoriaCount = a.storage.userPieceArchiveList.length;
      this.userLimitArchives = [];
      for (c = 0; c < this.storageData.length; c++) this.userLimitArchives.push(500 - this.storageData[c].piece.length);
      this.userLimitArchive = this.userLimitArchives.reduce(function(a, b)
      {
        return Math.max(a, b)
      });
      this.userLimitHands < this.userLimitArchive && (this.userLimitHands = this.userLimitArchive);
      console.log("上限:", b, "移動可能数:", this.userLimitHands, "保管庫MAX空:", this.userLimitArchive, "保管庫総数:", this.archiveMemoriaCount, "各保管庫:", this.userLimitArchives);
      this.mode && -1 != this.mode.indexOf("archive") ? (b = this.mode.slice(-1) - 1, this.name = this.storageData[b].storage.name, this.storageId = b + 1) : this.storageId = 0;
      this.name && (a.doc.getElementById("archiveName").textContent = this.name);
      b = "normal" === this.mode ? "保管庫" : "所持枠";
      a.doc.getElementById("safeTitle").textContent = b;
      a.doc.getElementById("nowCount").textContent = "normal" === this.mode ? this.archiveMemoriaCount : a.storage.userPieceList.length;
      a.doc.getElementById("limitCount").textContent = "normal" === this.mode ? 500 : a.storage.gameUser.toJSON().cardCapacity;
      console.log("保管庫移動可能:", this.userLimitArchive, "所持枠移動可能:", this.userLimitHands);
      "normal" === this.mode ? 1 > this.userLimitArchive && a.addClass(a.doc.getElementById("memoriaWrap"), "reachLimit") : 1 > this.userLimitArchive && 1 > this.userLimitHands && a.addClass(a.doc.getElementById("memoriaWrap"), "reachLimit");
      "lv" !== d.getSortId() && "rank" !== d.getSortId() && "lb" !== d.getSortId() && this.trigger("dispChange", d.getSortId())
    },
    firstCollectionSort: function()
    {
      var b = {
          RANK_1: 0,
          RANK_2: 1,
          RANK_3: 2,
          RANK_4: 3,
          RANK_5: 4
        },
        c = "asc" === d.sortPrm[1] ? 1 : -1;
      a.storage.userPieceList.comparator = function(a, e)
      {
        if (d.sortPrm[4] && (a.get("eventEffect") || e.get("eventEffect")))
        {
          if (a.get("eventEffect") && !e.get("eventEffect")) return -1;
          if (!a.get("eventEffect") && e.get("eventEffect")) return 1
        }
        if ("rank" == d.sortPrm[0])
        {
          if (b[e.get("piece").rank] < b[a.get("piece").rank]) return -1 * c;
          if (b[e.get("piece").rank] > b[a.get("piece").rank]) return 1 * c
        }
        else if ("level" == d.sortPrm[0])
        {
          if (e.get("level") < a.get("level")) return -1 * c;
          if (e.get("level") > a.get("level")) return 1 * c
        }
        else if ("atk" == d.sortPrm[0])
        {
          if (e.get("attack") < a.get("attack")) return -1 * c;
          if (e.get("attack") > a.get("attack")) return 1 * c
        }
        else if ("def" == d.sortPrm[0])
        {
          if (e.get("defense") < a.get("defense")) return -1 * c;
          if (e.get("defense") > a.get("defense")) return 1 * c
        }
        else if ("hp" == d.sortPrm[0])
        {
          if (e.get("hp") < a.get("hp")) return -1 * c;
          if (e.get("hp") > a.get("hp")) return 1 * c
        }
        else if ("lb" == d.sortPrm[0])
        {
          if (e.get("lbCount") < a.get("lbCount")) return -1 * c;
          if (e.get("lbCount") > a.get("lbCount")) return 1 * c
        }
        if ("get" !== d.sortPrm[0])
        {
          if (e.get("pieceId") < a.get("pieceId")) return -1 * c;
          if (e.get("pieceId") > a.get("pieceId")) return 1 * c
        }
        return Date.parse(e.get("createdAt")) < Date.parse(a.get("createdAt")) ? -1 * c : Date.parse(e.get("createdAt")) > Date.parse(a.get("createdAt")) ? 1 * c : 0
      };
      a.storage.userPieceList.sort()
    },
    firstArchiveCollectionSort: function()
    {
      var b = {
          RANK_1: 0,
          RANK_2: 1,
          RANK_3: 2,
          RANK_4: 3,
          RANK_5: 4
        },
        c = "asc" === d.sortPrm[1] ? 1 : -1;
      a.storage.userPieceArchiveList.comparator = function(a, e)
      {
        if (d.sortPrm[4] && (a.get("eventEffect") || e.get("eventEffect")))
        {
          if (a.get("eventEffect") && !e.get("eventEffect")) return -1;
          if (!a.get("eventEffect") && e.get("eventEffect")) return 1
        }
        if (d.sortPrm[4] && (a.get("regularEventEffect") || e.get("regularEventEffect")))
        {
          if (a.get("regularEventEffect") && !e.get("regularEventEffect")) return -1;
          if (!a.get("regularEventEffect") && e.get("regularEventEffect")) return 1
        }
        if ("rank" == d.sortPrm[0])
        {
          if (b[e.get("piece").rank] < b[a.get("piece").rank]) return -1 * c;
          if (b[e.get("piece").rank] > b[a.get("piece").rank]) return 1 * c
        }
        else if ("level" == d.sortPrm[0])
        {
          if (e.get("level") < a.get("level")) return -1 * c;
          if (e.get("level") > a.get("level")) return 1 * c
        }
        else if ("atk" == d.sortPrm[0])
        {
          if (e.get("attack") < a.get("attack")) return -1 * c;
          if (e.get("attack") > a.get("attack")) return 1 * c
        }
        else if ("def" == d.sortPrm[0])
        {
          if (e.get("defense") < a.get("defense")) return -1 * c;
          if (e.get("defense") > a.get("defense")) return 1 * c
        }
        else if ("hp" == d.sortPrm[0])
        {
          if (e.get("hp") < a.get("hp")) return -1 * c;
          if (e.get("hp") > a.get("hp")) return 1 * c
        }
        else if ("lb" == d.sortPrm[0])
        {
          if (e.get("lbCount") < a.get("lbCount")) return -1 * c;
          if (e.get("lbCount") > a.get("lbCount")) return 1 * c
        }
        if ("get" !== d.sortPrm[0])
        {
          if (e.get("pieceId") < a.get("pieceId")) return -1 * c;
          if (e.get("pieceId") > a.get("pieceId")) return 1 * c
        }
        if (Date.parse(e.get("createdAt")) < Date.parse(a.get("createdAt"))) return -1 * c;
        if (Date.parse(e.get("createdAt")) > Date.parse(a.get("createdAt"))) return 1 * c;
        if ("get" === d.sortPrm[0])
        {
          if (e.get("pieceId") < a.get("pieceId")) return -1 * c;
          if (e.get("pieceId") > a.get("pieceId")) return 1 * c
        }
        return 0
      };
      a.storage.userPieceArchiveList.sort()
    },
    ascStartMemoria: function(b)
    {
      b.preventDefault();
      a.isScrolled() || (d.ascSort(b.currentTarget.dataset.ascid), this.orderSet())
    },
    orderSet: function()
    {
      "asc" === d.getAscId() ? (a.addClass(a.doc.getElementById("ascMemoria"), "none"), a.removeClass(a.doc.getElementById("descMemoria"), "none")) : (a.addClass(a.doc.getElementById("descMemoria"), "none"), a.removeClass(a.doc.getElementById("ascMemoria"), "none"))
    },
    eventFilterBtn: function(b)
    {
      b.preventDefault();
      if (!a.isScrolled())
      {
        b.currentTarget.classList.toggle("on");
        d.sortPrm[4] = null !== d.sortPrm[4] ? null : "on";
        switch (this.mode)
        {
          case "archive":
            a.sfml.UserMemoriaList_archive = d.sortPrm;
            break;
          default:
            a.sfml.UserMemoriaList_card = d.sortPrm
        }
        a.sfm();
        d.multiSort(d.sortPrm);
        d.sortPrm[4] ? a.addClass(a.doc.getElementById("memoriaWrap"), "onlyEvent") : a.removeClass(a.doc.getElementById("memoriaWrap"), "onlyEvent");
        a.scrollRefresh()
      }
    },
    sortPopMemoria: function(b)
    {
      b.preventDefault();
      a.isScrolled() || d.sortPopupOpen(b)
    },
    sortStart: function(b)
    {
      b.preventDefault();
      if (!a.isScrolled())
      {
        var c = k.indexOf(d.getSortId());
        a.removeClass(a.doc.getElementById("memoriaWrapInner"), d.getSortId());
        c = c + 1 >= k.length ? 0 : c + 1;
        d.sortPrm[0] = k[c];
        this.sortBtn = !0;
        d.multiSort(d.sortPrm);
        b.currentTarget.innerHTML = "<span class='b_screen'></span>" + w[k[c]];
        a.addClass(a.doc.getElementById("memoriaWrapInner"), d.getSortId());
        this.orderSet();
        "lv" != d.getSortId() && "rank" != d.getSortId() && "lb" != d.getSortId() && this.trigger("dispChange", d.getSortId())
      }
    },
    afterFilterFunc: function()
    {
      this.sortBtn ? this.sortBtn = !1 : (this.trigger("afterFilter"), d.isFilterOn() ? a.doc.getElementById("sortPopupMemoria").className = "se_tabs sb_gold_02 TE on" : a.doc.getElementById("sortPopupMemoria").className = "se_tabs sb_gold_02 TE off", a.scrollRefresh("scrollSet", "scrollInner"))
    },
    sizeChange: function(b)
    {
      b.preventDefault();
      if (!a.isScrolled())
      {
        var c = a.doc.getElementById("memoriaWrap");
        switch (b.currentTarget.dataset.size)
        {
          case "smaller":
            a.addClass(c, "smaller");
            b.currentTarget.dataset.size = "smallest";
            a.addClass(b.currentTarget, "smaller");
            b = .8;
            break;
          case "smallest":
            a.removeClass(c, "smaller");
            a.addClass(c, "smallest");
            b.currentTarget.dataset.size = "normal";
            a.removeClass(b.currentTarget, "smaller");
            a.addClass(b.currentTarget, "smallest");
            b = .7;
            break;
          default:
            a.removeClass(c, "smallest"), b.currentTarget.dataset.size = "smaller", a.removeClass(b.currentTarget, "smallest"), b = 1
        }
        d.sortPrm[6] = b;
        d.saveMemory();
        a.scrollRefresh()
      }
    },
    countChange: function()
    {
      var b = "normal" === this.mode ? this.archiveMemoriaCount : a.storage.userPieceList.length;
      a.doc.getElementById("nowCount").textContent = 0 < this.selectCount ? b + this.selectCount : b;
      a.doc.getElementById("selectCount").textContent = this.selectCount
    },
    changeBulkCount: function()
    {
      this.selectCount = $("#memoriaWrapInner .selected").length;
      0 >= this.selectCount ? a.addClass(a.doc.getElementById("archiveBtn"), "off") : a.removeClass(a.doc.getElementById("archiveBtn"), "off");
      this.countChange()
    },
    archiveBtn: function(b)
    {
      b.preventDefault();
      if (!a.isScrolled())
      {
        var c = this;
        new a.PopupClass(
        {
          data: this.storageData,
          piece: a.storage.userPieceList,
          count: this.selectCount,
          mode: this.mode,
          cardCapacity: a.storage.gameUser.toJSON().cardCapacity,
          content: "",
          decideBtnEvent: function(a)
          {
            var b = a.currentTarget.dataset.moveto - 0,
              d = "所持枠";
            void 0 != a.currentTarget.getElementsByClassName("name")[0] && (d = a.currentTarget.getElementsByClassName("name")[0].innerText);
            c.moveToBtn(b, d)
          }.bind(this),
          exClass: "archiveMoveSelectPop",
          popupType: "typeC"
        }, $("#movePopTempParts").text(), function() {}, function() {})
      }
    },
    escapehtml: function(a)
    {
      return "string" !== typeof a ? a : a.replace(/[&'`"<>]/g, function(a)
      {
        return {
          "&": "&amp;",
          "'": "&#x27;",
          "`": "&#x60;",
          '"': "&quot;",
          "<": "&lt;",
          ">": "&gt;"
        } [a]
      })
    },
    moveToBtn: function(b, c, d)
    {
      if (!a.isScrolled())
      {
        var e = this;
        void 0 == this.name && (this.name = "所持枠");
        d = this.escapehtml(this.name);
        var n = this.escapehtml(c);
        0 != b ? new a.PopupClass(
        {
          title: "メモリア保管庫",
          content: "選択したメモリアを" + d + "から<br><span class='c_red'>" + n + "</span>に移動します。<br>よろしいですか？",
          decideBtnText: "OK",
          decideBtnEvent: function()
          {
            e.sendArchive(b, c)
          },
          closeBtnText: "キャンセル",
          popupType: "typeC",
          exClass: "pieceArchivePop"
        }) : new a.PopupClass(
        {
          title: "メモリア保管庫",
          content: "選択したメモリアを" + d + "から<br><span class='c_red'>" + n + "</span>に移動します。<br>よろしいですか？",
          decideBtnText: "OK",
          decideBtnEvent: function()
          {
            e.reciveArchive(b, c)
          },
          closeBtnText: "キャンセル",
          popupType: "typeC",
          exClass: "pieceArchivePop"
        })
      }
    },
    sendArchive: function(b, c)
    {
      console.log("保管庫に送る");
      a.selectMemoria = [];
      0 == this.storageId ? this.trigger("selectAddArr", "normal") : this.trigger("selectAddArr", "archive");
      if (!(1 > a.selectMemoria.length))
      {
        var d = this,
          e = {};
        e.setNum = b;
        e.archiveUserPieceIdList = a.selectMemoria;
        h.ajaxPost(a.linkList.userPieceArchive, e, function(e)
        {
          if ("error" !== e.resultCode)
          {
            0 == d.storageId ? f.each(e.userPieceList, function(c)
            {
              var e = a.storage.userPieceList.findWhere(
              {
                id: c.id
              });
              a.storage.userPieceList.remove(e,
              {
                silent: !0
              });
              c.archive = b;
              a.storage.userPieceArchiveList.add(c)
            }) : f.each(e.userPieceList, function(c)
            {
              c = a.storage.userPieceArchiveList.findWhere(
              {
                id: c.id
              });
              0 == b ? a.storage.userPieceArchiveList.remove(c,
              {
                silent: !0
              }) : c.set(
              {
                archive: b
              },
              {
                silent: !0
              })
            });
            0 == d.storageId ? d.trigger("removeCheck", "normal") : d.trigger("removeCheck", "archive");
            d.normalMemoriaCount = d.normalMemoriaCount - e.userPieceList.length | 0;
            d.archiveMemoriaCount = d.archiveMemoriaCount + e.userPieceList.length | 0;
            e = d.escapehtml(d.name);
            var n = d.escapehtml(c);
            new a.PopupClass(
            {
              title: "メモリア保管庫",
              content: "選択したメモリアを" + e + "から<br><span class='c_red'>" + n + "</span>へ移動しました。",
              closeBtnText: "OK",
              popupType: "typeC",
              exClass: "pieceArchivePop"
            }, null, null, function()
            {
              d.archiveAfterFunc()
            })
          }
        })
      }
    },
    reciveArchive: function(b, c)
    {
      console.log("一覧に送る");
      a.selectMemoria = [];
      this.trigger("selectAddArr", "archive");
      if (!(1 > a.selectMemoria.length))
      {
        var d = this,
          e = {};
        e.archiveUserPieceIdList = a.selectMemoria;
        h.ajaxPost(a.linkList.userPieceUnArchive, e, function(e)
        {
          "error" !== e.resultCode && (a.responseSetStorage(e), f.each(e.userPieceList, function(c)
          {
            c.archive = b;
            c = a.storage.userPieceArchiveList.findWhere(
            {
              id: c.id
            });
            a.storage.userPieceArchiveList.remove(c,
            {
              silent: !0
            })
          }), d.trigger("removeCheck", "archive"), d.normalMemoriaCount = d.normalMemoriaCount + e.userPieceList.length | 0, d.archiveMemoriaCount = d.archiveMemoriaCount - e.userPieceList.length | 0, new a.PopupClass(
          {
            title: "メモリア保管庫",
            content: "選択したメモリアを" + d.name + "から<br><span class='c_red'>" + c + "</span>へ移動しました。",
            closeBtnText: "OK",
            popupType: "typeC",
            exClass: "pieceArchivePop"
          }, null, null, function()
          {
            d.archiveAfterFunc()
          }))
        })
      }
    },
    archiveAfterFunc: function(b)
    {
      d.resetSelectPrm();
      if (b)
      {
        b.preventDefault();
        if (a.isScrolled()) return;
        this.trigger("allUnselect")
      }
      else this.hasChange = !0;
      this.selectCount = 0;
      a.selectMemoria = null;
      var c = a.storage.userPieceStorageList.toJSON(),
        n = a.storage.userPieceArchiveList.toJSON(),
        e = [];
      for (b = 0; b < c.length; b++)
      {
        var l = f.findWhere(c,
          {
            setNum: b + 1
          }),
          m = null,
          m = f.where(n,
          {
            archive: l.setNum
          });
        e[b] = {
          storage: l,
          piece: m
        }
      }
      this.storageData = e;
      this.countChange();
      c = a.storage.gameUser.toJSON().cardCapacity;
      this.userLimitHands = c - a.storage.userPieceList.length;
      this.archiveMemoriaCount = a.storage.userPieceArchiveList.length;
      this.userLimitArchives = [];
      for (b = 0; b < this.storageData.length; b++) this.userLimitArchives.push(500 - this.storageData[b].piece.length);
      this.userLimitArchive = this.userLimitArchives.reduce(function(a, b)
      {
        return Math.max(a, b)
      });
      this.userLimitHands < this.userLimitArchive && (this.userLimitHands = this.userLimitArchive);
      a.doc.getElementById("limitCount").textContent = "normal" === this.mode ? 500 : c;
      b = null;
      0 != this.storageId && (b = this.storageData[this.storageId - 1].piece.length);
      a.doc.getElementById("info_memoriaCount").textContent = "normal" === this.mode ? a.storage.userPieceList.toJSON().length : b;
      console.log("保管庫移動可能:", this.userLimitArchive, "所持枠移動可能:", this.userLimitHands);
      "normal" === this.mode ? 1 > this.userLimitArchive && a.addClass(a.doc.getElementById("memoriaWrap"), "reachLimit") : 1 > this.userLimitArchive && 1 > this.userLimitHands && a.addClass(a.doc.getElementById("memoriaWrap"), "reachLimit");
      a.addClass(a.doc.getElementById("archiveBtn"), "off");
      a.scrollRefresh()
    },
    bulkSelectBtn: function(b)
    {
      b.preventDefault();
      a.isScrolled() || d.bulkSelectPopupOpen(
      {
        rootView: this
      })
    },
    memoriaChangeCheck: function()
    {
      "archive" === this.mode && this.trigger("archiveChangeCheck")
    },
    removeView: function()
    {
      this.trigger("removeView");
      a.doc.getElementById("memoriaSaleCurtain") && a.doc.getElementById("baseContainer").removeChild(a.doc.getElementById("memoriaSaleCurtain"));
      a.doc.getElementById("memoriaSaleGlowWrap") && a.doc.getElementById("baseContainer").removeChild(a.doc.getElementById("memoriaSaleGlowWrap"));
      this.off();
      this.remove()
    },
    nameChange: function(b)
    {
      if (0 != this.storageId && (b.preventDefault(), !a.isScrolled()))
      {
        g.Model.extend(
        {});
        b = $("#SetNameChangeTemp").text();
        var c = this.storageData[this.storageId - 1].storage;
        c.name = a.doc.getElementById("archiveName").innerText;
        c.exClass = "setNameChangePop";
        var d = new a.PopupClass(c, b, function()
        {
          a.nativeKeyBoard("commentInput", 10, null, "textCount");
          a.doc.getElementById("commentDecide").addEventListener(a.cgti, function(b)
          {
            b.preventDefault();
            if (!a.isScrolled())
            {
              a.tapBlock(!0);
              var e = function(b)
              {
                a.responseSetStorage(b);
                a.doc.getElementById("archiveName").innerText = b.userPieceStorageList[0].name;
                r.getBaseData(a.getNativeObj());
                d.remove();
                a.tapBlock(!1)
              };
              b = {
                setNum: c.setNum,
                name: a.doc.getElementById("commentInput").value
              };
              window.isLocal ? require(["text!/magica/json/userPieceArchive/save.json"], function(a)
              {
                e(JSON.parse(a))
              }) : h.ajaxPost(a.linkList.userPieceStorage, b, e)
            }
          });
          a.doc.getElementById("defaultNameBtn").addEventListener(a.cgti, function(b)
          {
            b.preventDefault();
            a.isScrolled() || (a.doc.getElementById("commentInput").value = "保管庫" + c.setNum, a.doc.getElementById("textCount").textContent = String("保管庫" + c.setNum).length)
          })
        })
      }
    }
  });
  var z = g.View.extend(
    {
      tagName: "div",
      id: "memoriaWrapInner",
      className: "scrollInner",
      initialize: function()
      {
        this.listenTo(this.rootView, "removeView", this.removeView);
        this.createList()
      },
      render: function()
      {
        return this
      },
      createList: function()
      {
        var b = this,
          c = a.doc.createDocumentFragment();
        a.storage.userPieceList.each(function(a, e)
        {
          (e = v.memoriaEventCheck(a.toJSON())) && a.set(e);
          e = a.toJSON();
          e.selectFlg && a.unset("selectFlg");
          a.set("maxLevel", q.getMaxLevel(e.piece.rank, e.lbCount));
          a = new p(
          {
            model: a,
            mode: "normal"
          });
          c.appendChild(a.render().el);
          b.rootView.normalMemoriaCount++
        });
        "normal" === this.rootView.mode && (a.doc.getElementById("info_memoriaCount").textContent = this.rootView.normalMemoriaCount, a.doc.getElementById("info_memoriaCapacity").textContent = a.storage.gameUser.toJSON().cardCapacity);
        this.el.appendChild(c);
        c = null;
        a.scrollRefresh("scrollSet", "scrollInner");
        a.ready.hide()
      },
      removeView: function()
      {
        this.trigger("removeView");
        this.off();
        this.remove()
      }
    }),
    A = g.View.extend(
    {
      tagName: "div",
      id: "memoriaWrapInner",
      className: "scrollInner",
      initialize: function()
      {
        this.listenTo(this.rootView, "removeView", this.removeView);
        this.createList()
      },
      render: function()
      {
        return this
      },
      createList: function()
      {
        for (var b = this, c = g.Collection.extend(), d = null, d = a.storage.userPieceStorageList.toJSON(), e = a.storage.userPieceArchiveList.toJSON(), l = [], m = 0; m < d.length; m++)
        {
          var h = f.findWhere(d,
            {
              setNum: m + 1
            }),
            k = null,
            k = f.where(e,
            {
              archive: h.setNum
            });
          l[m] = {
            storage: h,
            piece: k
          }
        }
        this.rootView.storageData = l;
        this.rootView.mode && -1 != this.rootView.mode.indexOf("archive") ? (e = this.rootView.mode.slice(-1) - 1, "number" == typeof e ? (d = new c(l[e].piece), this.name = l[e].storage.name, this.storageId = e + 1) : (d = a.storage.userPieceList, this.storageId = 0)) : (d = a.storage.userPieceList, this.storageId = 0);
        var t = a.doc.createDocumentFragment();
        d.each(function(a, c)
        {
          (c = v.memoriaEventCheck(a.toJSON())) && a.set(c);
          c = a.toJSON();
          c.selectFlg && a.unset("selectFlg");
          a.set("maxLevel", q.getMaxLevel(c.piece.rank, c.lbCount));
          a = new p(
          {
            model: a,
            mode: "archive"
          });
          t.appendChild(a.render().el);
          b.rootView.archiveMemoriaCount++
        });
        this.rootView.mode && 0 <= this.rootView.mode.indexOf("archive") && (a.doc.getElementById("info_memoriaCount").textContent = this.rootView.archiveMemoriaCount, a.doc.getElementById("info_memoriaCapacity").textContent = 500);
        this.el.appendChild(t);
        t = null;
        a.scrollRefresh("scrollSet", "scrollInner");
        r.getBaseData(a.getNativeObj());
        a.ready.hide()
      },
      removeView: function()
      {
        this.trigger("removeView");
        this.off();
        this.remove()
      }
    }),
    y = g.View.extend(
    {
      id: "memoriaSaleGlowWrap",
      initialize: function()
      {
        this.listenTo(this.rootView, "removeView", this.removeView);
        this.template = f.template($("#saleGlow").text());
        this.createDom()
      },
      render: function()
      {
        this.$el.html(this.template(
        {
          gameUser: a.storage.gameUser.toJSON()
        }));
        return this
      },
      createDom: function()
      {
        a.doc.getElementById("baseContainer").appendChild(this.render().el);
        if (this.rootView.mode && 0 <= this.rootView.mode.indexOf("archive"))
        {
          var b = this.el.getElementsByClassName("listIcon")[0];
          a.addClass(b, "archive");
          b = this.el.getElementsByClassName("hasMemoriaNum")[0];
          a.addClass(b, "archive")
        }
      },
      removeView: function()
      {
        this.off();
        this.remove()
      }
    }),
    x = g.View.extend(
    {
      id: "memoriaSaleCurtain",
      initialize: function()
      {
        this.listenTo(this.rootView, "removeView", this.removeView);
        this.createDom()
      },
      render: function()
      {
        this.$el.html();
        return this
      },
      createDom: function()
      {
        a.doc.getElementById("baseContainer").appendChild(this.render().el)
      },
      removeView: function()
      {
        this.off();
        this.remove()
      }
    });
  return u
});
