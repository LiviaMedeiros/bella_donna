define("underscore backbone backboneCommon ajaxControl text!template/memoria/UserMemoriaList.html js/view/memoria/UserMemoriaListPartsView js/view/memoria/MemoriaEquipInfoView cardUtil memoriaSortUtil memoriaUtil command".split(" "), function(g, h, a, k, x, p, q, y, z, r, A)
{
  var m = !1,
    n = "rank level hp atk def lb get".split(" "),
    t = {
      rank: "レアリティ順",
      level: "レベル順",
      hp: "HP順",
      atk: "ATK順",
      def: "DEF順",
      lb: "限界突破順",
      get: "入手順"
    },
    B = ["TOWER", "DAILYTOWER", "BRANCH", "SINGLERAID"],
    C = ["EXTERMINATION"],
    D = h.Model.extend(),
    E = h.Collection.extend(),
    e, F = h.View.extend(
    {
      events: function()
      {
        var b = {};
        b[a.cgti + " #ascPanelMemoria li"] = this.ascStartMemoria;
        b[a.cgti + " #sortBtn"] = this.sortStart;
        b[a.cgti + " #sortPopupMemoria"] = this.sortPopMemoria;
        b[a.cgti + " #eventFilterBtn"] = this.eventFilterBtn;
        b[a.cgti + " #sellResetBtn"] = this.sellReset;
        b[a.cgti + " #sellConfirm"] = this.sellConfirm;
        b[a.cgti + " #selectCommon"] = this.selectCommon;
        b[a.cgti + " #multiLock"] = this.multiLockMode;
        b[a.cgti + " #sizeChange"] = this.sizeChange;
        b[a.cgti + " #nameChangeBtn"] = this.nameChange;
        return b
      },
      initialize: function(b)
      {
        this.template = g.template(x);
        this.listenTo(a.storage.userItemList, "change", this.renderItem);
        this.listenTo(this, "remove", this.removeView);
        this.equipInfo = b.equipInfo;
        this.mode = b.mode;
        var c = a.storage.userPieceStorageList.toJSON(),
          f = a.storage.userPieceArchiveList.toJSON();
        b = [];
        for (var d = 0; d < c.length; d++)
        {
          var u = g.findWhere(c,
            {
              setNum: d + 1
            }),
            l;
          l = g.where(f,
          {
            archive: u.setNum
          });
          b[d] = {
            storage: u,
            piece: l
          }
        }
        this.storageData = b;
        var h;
        !this.mode || -1 == this.mode.indexOf("archive") && -1 == this.mode.indexOf("archiveSell") ? (h = "UserMemoriaList_card", this.pieceList = a.storage.userPieceList, this.storageId = 0) : (c = this.mode.slice(-1) - 1, "number" == typeof c ? (h = "UserMemoriaList_archive", this.pieceList = new E(b[c].piece), this.name = b[c].storage.name, this.storageId = c + 1) : (this.pieceList = a.storage.userPieceArchiveList, this.storageId = 0));
        this.memoriaSort = e = new z(h, this);
        this.sellModels = [];
        m = !1;
        a.setGlobalView();
        this.createDom()
      },
      render: function()
      {
        this.$el.html(this.template(k.getPageJson()));
        return this
      },
      renderItem: function()
      {
        for (var b = a.doc.getElementById("composeItemFrame").getElementsByClassName("num"), c = 0, f = b.length; c < f;)
        {
          var d = a.storage.userItemList.findWhere(
          {
            itemId: b[c].dataset.itemId
          });
          b[c].innerText = d ? d.toJSON().quantity | 0 : 0;
          c = c + 1 | 0
        }
      },
      createDom: function()
      {
        a.content.append(this.render().el);
        this.growViewSet();
        this.cautionViewUpdate();
        this.createView();
        this.renderItem();
        if (0 >= this.pieceList.length) switch (this.storageId)
        {
          case 0:
            a.doc.getElementById("listUtil").getElementsByClassName("archiveLinkBtn")[0].classList.add("off");
            break;
          case 1:
            a.doc.getElementById("toArchive1").classList.add("off");
            break;
          case 2:
            a.doc.getElementById("toArchive2").classList.add("off");
            break;
          case 3:
            a.doc.getElementById("toArchive3").classList.add("off");
            break;
          case 4:
            a.doc.getElementById("toArchive4").classList.add("off")
        }
      },
      growViewSet: function()
      {
        v.prototype.rootView = this;
        new v;
        w.prototype.rootView = this;
        new w
      },
      cautionViewUpdate: function()
      {
        var b;
        switch (this.mode)
        {
          case "equip":
            b = "装備するメモリアを選んでください";
            break;
          case "formationEquip":
            b = "装備するメモリアを選んでください";
            break;
          case "compose":
            b = "強化するメモリアを選んでください";
            break;
          case "limitbreak":
            b = "限界突破するメモリアを選んでください";
            break;
          case "multipleProtect":
            b = "ロック/解除するメモリアを選んでください";
            break;
          default:
            b = "詳細を確認するメモリアを選んでください"
        }!this.mode || "sell" != this.mode && -1 == this.mode.indexOf("archiveSell") || (b = "売却するメモリアを選んでください");
        a.doc.querySelector("#memoriaInfoWrap").textContent = b
      },
      createView: function()
      {
        var b = k.getPageJson();
        "formationEquip" == this.mode && a.addClass(a.doc.querySelector("#menu"), "noneDisp");
        var c = this;
        this.mode && a.addClass(a.doc.getElementById("UserMemoriaList"), this.mode);
        this.orderSet();
        e.isFilterOn() ? a.doc.getElementById("sortPopupMemoria").className = "se_tabs sb_gold_02 TE on" : a.doc.getElementById("sortPopupMemoria").className = "se_tabs sb_gold_02 TE off";
        a.doc.querySelector("#sortBtn").innerHTML = "<span class='b_screen'></span>" + t[e.getSortId()];
        a.addClass(a.doc.getElementById("memoriaWrapInner"), e.getSortId());
        a.scrollSet("scrollSet", "scrollInner");
        this.eventRunning = !1;
        b.eventList && g.each(b.eventList, function(b)
        {
          0 <= B.indexOf(b.eventType) && (c.eventRunning = !0, a.addClass(a.doc.getElementById("eventFilterBtn"), "onDisp"), e.sortPrm[4] ? a.addClass(a.doc.getElementById("memoriaWrap"), "onlyEvent") : a.removeClass(a.doc.getElementById("memoriaWrap"), "onlyEvent"))
        });
        this.eventRunning || g.each(b.regularEventList, function(b)
        {
          0 <= C.indexOf(b.regularEventType) && (c.eventRunning = !0, a.addClass(a.doc.getElementById("eventFilterBtn"), "onDisp"), e.sortPrm[4] ? a.addClass(a.doc.getElementById("memoriaWrap"), "onlyEvent") : a.removeClass(a.doc.getElementById("memoriaWrap"), "onlyEvent"))
        });
        this.memoriaPartsTemplate = g.template($("#MemoriaListParts").text());
        this.memoriaUtil = r;
        p.prototype.parentView = this;
        var b = a.doc.getElementById("memoriaWrap"),
          f = a.doc.getElementById("sizeChange");
        switch (e.getDisplaySize())
        {
          case .8:
            a.addClass(b, "smaller");
            f.dataset.size = "smallest";
            a.addClass(f, "smaller");
            break;
          case .7:
            a.removeClass(b, "smaller");
            a.addClass(b, "smallest");
            f.dataset.size = "normal";
            a.removeClass(f, "smaller");
            a.addClass(f, "smallest");
            break;
          default:
            a.removeClass(b, "smallest"),
              f.dataset.size = "smaller", a.removeClass(f, "smallest")
        }
        this.memoriaCount = 0;
        this.equipMemoriaId = null;
        this.firstCollectionSort();
        this.createListView()
      },
      createListView: function()
      {
        var b = this,
          c = a.doc.createDocumentFragment();
        this.pieceList.each(function(f, d)
        {
          (d = y.memoriaEventCheck(f.toJSON())) && f.set(d);
          d = f.toJSON();
          d.selectFlg && f.unset("selectFlg");
          d.formationEquipFlag && f.unset("formationEquipFlag");
          "formationEquip" == b.mode && d.equipFlag && f.unset("equipFlag");
          "formationEquip" === b.mode && b.equipInfo && b.equipInfo.allPiece && (b.equipInfo.pieceModel && d.id === b.equipInfo.pieceModel.id && (b.equipMemoriaId = d.id), b.equipInfo.allPiece[d.id] && b.equipInfo.allPiece[d.id].name && f.set(
          {
            formationEquipFlag: b.equipInfo.allPiece[d.id].charaId
          }));
          f.set("maxLevel", r.getMaxLevel(d.piece.rank, d.lbCount));
          f = new p(
          {
            model: f
          });
          c.appendChild(f.render().el);
          b.equipedPrimary && d.equipFlag && (f.el.style.WebkitOrder = "-1000", f.el.style.order = "-1000");
          b.memoriaCount++;
          30 === b.memoriaCount && (a.doc.getElementById("memoriaWrapInner").appendChild(c), "lv" !== e.getSortId() && "rank" !== e.getSortId() && "lb" !== e.getSortId() && b.trigger("dispChange", e.getSortId()), a.ready.hide(), c = null, c = a.doc.createDocumentFragment())
        });
        "lv" !== e.getSortId() && "rank" !== e.getSortId() && "lb" !== e.getSortId() && this.trigger("dispChange", e.getSortId());
        this.name && (a.doc.getElementById("archiveName").textContent = this.name);
        a.doc.getElementById("info_memoriaCount").textContent = this.memoriaCount;
        a.doc.getElementById("info_memoriaCapacity").textContent = "archiveList" === b.mode || "archiveList1" === b.mode || "archiveList2" === b.mode || "archiveList3" === b.mode || "archiveList4" === b.mode || "archiveSell1" === b.mode || "archiveSell2" === b.mode || "archiveSell3" === b.mode || "archiveSell4" === b.mode ? 500 : a.storage.gameUser.toJSON().cardCapacity;
        a.doc.getElementById("memoriaWrapInner").appendChild(c);
        c = null;
        "sell" === b.mode || "archiveSell1" === b.mode || "archiveSell2" === b.mode || "archiveSell3" === b.mode || "archiveSell4" === b.mode ? b.listenTo(b.pieceList, "change", b.calcSalePrice) : "equip" !== b.mode && "formationEquip" !== b.mode || b.equipInitalize();
        null !== e.sortPrm[4] && a.addClass(a.doc.getElementById("eventFilterBtn"), "on");
        a.scrollRefresh("scrollSet", "scrollInner");
        30 < this.memoriaCount || a.ready.hide()
      },
      firstCollectionSort: function()
      {
        var a = {
            RANK_1: 0,
            RANK_2: 1,
            RANK_3: 2,
            RANK_4: 3,
            RANK_5: 4
          },
          c = "asc" === e.sortPrm[1] ? 1 : -1;
        this.pieceList.comparator = function(b, d)
        {
          if ("rank" == e.sortPrm[0])
          {
            if (a[d.get("piece").rank] < a[b.get("piece").rank]) return -1 * c;
            if (a[d.get("piece").rank] > a[b.get("piece").rank]) return 1 * c
          }
          else if ("level" == e.sortPrm[0])
          {
            if (d.get("level") < b.get("level")) return -1 * c;
            if (d.get("level") > b.get("level")) return 1 * c
          }
          else if ("atk" == e.sortPrm[0])
          {
            if (d.get("attack") < b.get("attack")) return -1 * c;
            if (d.get("attack") > b.get("attack")) return 1 * c
          }
          else if ("def" == e.sortPrm[0])
          {
            if (d.get("defense") < b.get("defense")) return -1 * c;
            if (d.get("defense") > b.get("defense")) return 1 * c
          }
          else if ("hp" == e.sortPrm[0])
          {
            if (d.get("hp") < b.get("hp")) return -1 * c;
            if (d.get("hp") > b.get("hp")) return 1 * c
          }
          else if ("lb" == e.sortPrm[0])
          {
            if (d.get("lbCount") < b.get("lbCount")) return -1 * c;
            if (d.get("lbCount") > b.get("lbCount")) return 1 * c
          }
          if ("get" !== e.sortPrm[0])
          {
            if (d.get("pieceId") < b.get("pieceId")) return -1 * c;
            if (d.get("pieceId") > b.get("pieceId")) return 1 * c
          }
          if (Date.parse(d.get("createdAt")) < Date.parse(b.get("createdAt"))) return -1 * c;
          if (Date.parse(d.get("createdAt")) > Date.parse(b.get("createdAt"))) return 1 * c;
          if ("get" === e.sortPrm[0])
          {
            if (d.get("pieceId") < b.get("pieceId")) return -1 * c;
            if (d.get("pieceId") > b.get("pieceId")) return 1 * c
          }
          return 0
        };
        this.pieceList.sort()
      },
      equipInitalize: function()
      {
        var b = this.equipInfo;
        if ("formationEquip" == this.mode)
        {
          this.selectPieceId = this.selectPiece = null;
          var c = 0,
            f = null;
          for (this.hideMemoriaList = []; 4 > c;)
          {
            var d = b.pieceArr && b.pieceArr[c] ? b.pieceArr[c] : null;
            c == b.pieceIndex - 1 && d ? f = d.id : d && this.hideMemoriaList.push(d);
            c = c + 1 | 0
          }
          this.equipedPiece = f ? a.storage.userPieceList.findWhere(
          {
            id: f
          }) : null;
          this.memoriaAbilityEquipNum = b.memoriaAbilityEquipNum;
          this.memoriaSkillEquipNum = b.memoriaSkillEquipNum;
          this.equipedPiece && ("ABILITY" == this.equipedPiece.toJSON().piece.pieceType ? --this.memoriaAbilityEquipNum : "SKILL" == this.equipedPiece.toJSON().piece.pieceType && --this.memoriaSkillEquipNum);
          this.createEquipInfoView();
          this.trigger("equipAddClass");
          this.equipMemoriaId && (this.trigger("equipFirstSet", this.equipMemoriaId), this.equipMemoriaId = null)
        }
      },
      createEquipInfoView: function()
      {
        q.prototype.parentView = this;
        var b = a.doc.createDocumentFragment(),
          c = new q(
          {
            model: new D(
            {})
          });
        b.appendChild(c.render().el);
        a.doc.getElementById("UserMemoriaList").appendChild(b);
        this.equipInfoView = c
      },
      ascStartMemoria: function(b)
      {
        b.preventDefault();
        a.isScrolled() || (e.ascSort(b.currentTarget.dataset.ascid), this.orderSet())
      },
      orderSet: function()
      {
        "asc" === e.getAscId() ? (a.addClass(a.doc.getElementById("ascMemoria"), "none"), a.removeClass(a.doc.getElementById("descMemoria"), "none")) : (a.addClass(a.doc.getElementById("descMemoria"), "none"), a.removeClass(a.doc.getElementById("ascMemoria"), "none"))
      },
      eventFilterBtn: function(b)
      {
        b.preventDefault();
        if (!a.isScrolled())
        {
          b.currentTarget.classList.toggle("on");
          e.sortPrm[4] = null !== e.sortPrm[4] ? null : "on";
          switch (this.mode)
          {
            case "archiveSell":
            case "archiveList":
            case "archiveSell1":
            case "archiveList1":
            case "archiveSell2":
            case "archiveList2":
            case "archiveSell3":
            case "archiveList3":
            case "archiveSell4":
            case "archiveList4":
              a.sfml.UserMemoriaList_archive = e.sortPrm;
              break;
            default:
              a.sfml.UserMemoriaList_card = e.sortPrm
          }
          a.sfm();
          e.sortPrm[4] ? a.addClass(a.doc.getElementById("memoriaWrap"), "onlyEvent") : a.removeClass(a.doc.getElementById("memoriaWrap"), "onlyEvent");
          a.scrollRefresh()
        }
      },
      sortPopMemoria: function(b)
      {
        b.preventDefault();
        a.isScrolled() || e.sortPopupOpen(b)
      },
      sortStart: function(b)
      {
        b.preventDefault();
        if (!a.isScrolled())
        {
          var c = n.indexOf(e.getSortId());
          a.removeClass(a.doc.getElementById("memoriaWrapInner"), e.getSortId());
          c = c + 1 >= n.length ? 0 : c + 1;
          e.sortPrm[0] = n[c];
          this.sortBtn = !0;
          e.multiSort(e.sortPrm);
          b.currentTarget.innerHTML = "<span class='b_screen'></span>" + t[n[c]];
          a.addClass(a.doc.getElementById("memoriaWrapInner"), e.getSortId());
          this.orderSet();
          "lv" != e.getSortId() && "rank" != e.getSortId() && "lb" != e.getSortId() && this.trigger("dispChange", e.getSortId())
        }
      },
      afterFilterFunc: function()
      {
        this.sortBtn ? this.sortBtn = !1 : (this.trigger("afterFilter"), e.isFilterOn() ? a.doc.getElementById("sortPopupMemoria").className = "se_tabs sb_gold_02 TE on" : a.doc.getElementById("sortPopupMemoria").className = "se_tabs sb_gold_02 TE off", a.scrollRefresh("scrollSet", "scrollInner"))
      },
      sellReset: function(b)
      {
        if (b && (b.preventDefault(), a.isScrolled())) return;
        a.doc.getElementById("info_sellCount").textContent = 0;
        a.doc.getElementById("info_selectCount").textContent = 0;
        this.trigger("selectReset");
        this.calcSalePrice();
        a.addClass(a.doc.getElementById("sellConfirm"), ["noneEvent", "off"]);
        a.scrollRefresh()
      },
      calcSalePrice: function()
      {
        "MemoriaList" === a.location && (a.salePriceArr = [], this.trigger("salePrice"), a.doc.getElementById("info_selectCount").textContent = a.salePriceArr.length, a.doc.getElementById("info_sellCount").textContent = function()
        {
          return 1 > a.salePriceArr.length ? 0 : 1 === a.salePriceArr.length ? a.salePriceArr[0] : a.salePriceArr.reduce(function(a, c, f, d)
          {
            return a + c | 0
          })
        }(), 1 <= a.salePriceArr.length ? a.removeClass(a.doc.getElementById("sellConfirm"), "off") : a.addClass(a.doc.getElementById("sellConfirm"), "off"))
      },
      sellConfirm: function(b)
      {
        b.preventDefault();
        if (!a.isScrolled())
        {
          var c = this;
          a.selectMemoria = [];
          this.trigger("selectAddArr");
          b = a.selectMemoria.length;
          var f = a.doc.getElementById("info_sellCount").textContent;
          if (1 > b) new a.PopupClass(
          {
            title: "メモリア売却",
            content: "売却するメモリアが選択されていません。",
            closeBtnText: "閉じる",
            exClass: "memoriaConfirmPop"
          });
          else
          {
            var d = g.template($("#salePopTemp").text()),
              e = g.sortBy(this.sellModels, "rank").reverse(),
              l = !1;
            if (g.findWhere(e,
              {
                rank: "RANK_3"
              }) || g.findWhere(e,
              {
                rank: "RANK_4"
              }) || g.findWhere(e,
              {
                rank: "RANK_5"
              })) l = !0;
            new a.PopupClass(
            {
              title: "メモリア売却",
              content: d(
              {
                sellNum: b,
                sellPrice: f,
                rarityAlert: l
              }),
              decideBtnText: "売却",
              closeBtnText: "閉じる",
              exClass: "memoriaConfirmPop"
            }, null, null, function()
            {
              a.removeClass(a.doc.getElementById("memoriaSaleCurtain"), "on");
              a.removeClass(a.doc.getElementById("memoriaSaleGlowWrap"), "on");
              a.removeClass(a.doc.getElementById("sortPanel"), "off")
            });
            a.removeClass(a.doc.getElementById("popupCurtain"), "show");
            a.addClass(a.doc.getElementById("memoriaSaleCurtain"), "on");
            a.addClass(a.doc.getElementById("memoriaSaleGlowWrap"), "on");
            a.addClass(a.doc.getElementById("sortPanel"), "off");
            a.doc.getElementById("popupArea").getElementsByClassName("decideBtn")[0].addEventListener(a.cgti, function(b)
            {
              b.preventDefault();
              a.isScrolled() || c.sellDecide()
            }, !1)
          }
        }
      },
      sellDecide: function()
      {
        if (!m)
        {
          m = !0;
          a.androidKeyStop = !0;
          var b = this,
            c = [],
            f;
          for (f in a.selectMemoria) c.push(a.selectMemoria[f].id);
          k.ajaxPost(a.linkList.userPieceSell,
          {
            saleUserPieceIdList: c
          }, function(c)
          {
            a.responseSetStorage(c);
            new a.PopupClass(
            {
              title: "メモリア売却",
              content: "売却しました",
              closeBtnText: "閉じる",
              exClass: "memoriaConfirmPop"
            }, null, null, function()
            {
              m = !1;
              a.removeClass(a.doc.getElementById("memoriaSaleCurtain"), "on");
              a.removeClass(a.doc.getElementById("memoriaSaleGlowWrap"), "on");
              a.removeClass(a.doc.getElementById("sortPanel"), "off")
            });
            a.removeClass(a.doc.getElementById("popupCurtain"), "show");
            b.sellReset();
            a.doc.getElementById("info_totalGold").textContent = a.storage.gameUser.get("riche");
            b.trigger("saleUpdate");
            a.selectMemoria = [];
            b.sellModels = [];
            b.calcSalePrice();
            a.scrollRefresh("scrollSet", "scrollInner");
            a.androidKeyStop = !1
          })
        }
      },
      selectCommon: function(b)
      {
        b.preventDefault();
        a.isScrolled() || (this.trigger("selectCommons"), this.calcSalePrice())
      },
      multiLockMode: function(b)
      {
        b.preventDefault();
        a.isScrolled() || ("multipleProtect" !== this.mode ? (this.beforeMode = this.mode, this.mode = "multipleProtect", this.cautionViewUpdate(), a.addClassId("memoriaWrap", "lockMode")) : (a.tapBlock(!0), this.multipleProtect(), this.mode = this.beforeMode, this.cautionViewUpdate()))
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
          e.sortPrm[6] = b;
          e.saveMemory();
          a.scrollRefresh()
        }
      },
      multipleProtect: function()
      {
        for (var b = [], c = [], f = a.doc.getElementById("memoriaWrapInner").getElementsByClassName("selected"),
            d = f.length; 0 < d;)
        {
          d--;
          var e = f[d].getElementsByClassName("paramWrap")[0].dataset;
          f[d].classList.contains("protected") ? c.push(e.pid) : b.push(e.pid)
        }
        f = function(b)
        {
          a.responseSetStorage(b);
          a.removeClassId("memoriaWrap", "lockMode");
          this.trigger("unsetMultiSelect");
          a.tapBlock(!1)
        }.bind(this);
        0 == b.length && 0 == c.length ? (a.removeClassId("memoriaWrap", "lockMode"), a.tapBlock(!1)) : (d = {}, 0 < b.length && (d.protectUserPieceIdList = b), 0 < c.length && (d.unprotectUserPieceIdList = c), k.ajaxPost(a.linkList.userPieceMultipleProtect, d, f))
      },
      removeView: function()
      {
        if ("multipleProtect" === this.mode)
        {
          for (var b = [], c = [], e = a.doc.getElementById("memoriaWrapInner").getElementsByClassName("selected"), d = e.length; 0 < d;)
          {
            d--;
            var g = e[d].getElementsByClassName("paramWrap")[0].dataset;
            e[d].classList.contains("protected") ? c.push(g.pid) : b.push(g.pid)
          }
          if (0 < b.length || 0 < c.length) e = {}, 0 < b.length && (e.protectUserPieceIdList = b), 0 < c.length && (e.unprotectUserPieceIdList = c), k.ajaxPost(a.linkList.userPieceMultipleProtect, e, function(b)
          {
            a.responseSetStorage(b)
          })
        }
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
          h.Model.extend(
          {});
          b = $("#SetNameChangeTemp").text();
          var c = this.storageData[this.storageId - 1].storage;
          c.name = a.doc.getElementById("archiveName").innerText;
          c.exClass = "setNameChangePop";
          var e = new a.PopupClass(c, b, function()
          {
            a.nativeKeyBoard("commentInput", 10, null, "textCount");
            a.doc.getElementById("commentDecide").addEventListener(a.cgti, function(b)
            {
              b.preventDefault();
              if (!a.isScrolled())
              {
                a.tapBlock(!0);
                var d = function(b)
                {
                  a.responseSetStorage(b);
                  a.doc.getElementById("archiveName").innerText = b.userPieceStorageList[0].name;
                  A.getBaseData(a.getNativeObj());
                  e.remove();
                  a.tapBlock(!1)
                };
                b = {
                  setNum: c.setNum,
                  name: a.doc.getElementById("commentInput").value
                };
                window.isLocal ? require(["text!/magica/json/userPieceArchive/save.json"], function(a)
                {
                  d(JSON.parse(a))
                }) : k.ajaxPost(a.linkList.userPieceStorage, b, d)
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
    }),
    w = h.View.extend(
    {
      id: "memoriaSaleGlowWrap",
      initialize: function()
      {
        this.listenTo(this.rootView, "removeView", this.removeView);
        this.template = g.template($("#saleGlow").text());
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
        if (null != this.rootView.mode && ("sell" !== this.rootView.mode && "archiveSell1" !== this.rootView.mode && "archiveSell2" !== this.rootView.mode && "archiveSell3" !== this.rootView.mode && "archiveSell4" !== this.rootView.mode || a.addClass(this.el, "sale"), 0 <= this.rootView.mode.indexOf("archiveList") || "archiveSell1" === this.rootView.mode || "archiveSell2" === this.rootView.mode || "archiveSell3" === this.rootView.mode || "archiveSell4" === this.rootView.mode))
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
    v = h.View.extend(
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
  return F
});
