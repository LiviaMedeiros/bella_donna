define("underscore backbone backboneCommon ajaxControl text!template/memoria/MemoriaPopup.html memoriaUtil command".split(" "), function(f, p, a, n, q, h, k)
{
  var d, l = !1;
  a.ua.android && a.doc.addEventListener("touchmove", function()
  {
    clearTimeout(a.popupTimerObj)
  }, !0);
  var m = function()
  {
    var g = p.View.extend(
    {
      className: "memoriaDetailPopInner",
      events: function()
      {
        var b = {};
        b[a.cgti + " #memoriaProtect"] = this.protectHandler;
        b[a.cgti + " #memoriaPopClose"] = this.removeHandler;
        b[a.cgti + " .popupCardImage"] = this.cardZoom;
        b[a.cgti + " #strengtheningBtn"] = this.strengtheningFunc;
        b[a.cgti + " #breakthroughBtn"] = this.breakthroughFunc;
        return b
      },
      initialize: function()
      {
        d.piece.description = d.piece.description.replace(/＠/g, "<br>");
        this.model = d;
        this.model.maxLevel || (this.model.maxLevel = h.getMaxLevel(this.model.piece.rank, this.model.lbCount));
        if (this.model.piece.charaList)
        {
          var b = a.storage.user.get("loginName");
          f.each(this.model.piece.charaList, function(a, c)
          {
            a.name = a.name.replace(/userName/g, b)
          }.bind(this))
        }
        this.model.isHideHasNum = !0;
        if (-1 === [1147, 1148, 1297, 1298].indexOf(this.model.piece.pieceId) && "ProfileFormationSupport" !== a.location)
        {
          this.model.isHideHasNum = !1;
          var c = a.storage.userPieceList.filter(function(a)
          {
            return a.get("pieceId") === this.model.piece.pieceId
          }.bind(this));
          this.model.listNum = 0;
          f.each(c, function(a)
          {
            this.model.listNum++
          }.bind(this));
          c = a.storage.userPieceArchiveList.filter(function(a)
          {
            return a.get("pieceId") === this.model.piece.pieceId
          }.bind(this));
          this.model.archiveNum = 0;
          f.each(c, function(a)
          {
            this.model.archiveNum++
          }.bind(this))
        }
        c = a.historyArr[a.historyArr.length - 1];
        switch (c)
        {
          case "MemoriaCompose/compose":
          case "MemoriaCompose/limitbreak":
          case "MemoriaList/sell":
          case "PieceArchive/normal":
            this.model.btnHide = !0
        }
        if (-1 != c.indexOf("MemoriaList/archiveList") || -1 != c.indexOf("MemoriaList/archiveSell") || -1 != c.indexOf("PieceArchive/archive")) this.model.btnHide = !0;
        this.template = f.template(q);
        this.createDom()
      },
      render: function()
      {
        this.$el.html(this.template(
        {
          model: this.model
        }));
        this.el.style.height = "100%";
        this.el.style.width = "100%";
        return this
      },
      createDom: function()
      {
        f.each(a.doc.querySelector("#baseContainer").children, function(b)
        {
          a.addClass(b, "hide")
        });
        var b = a.doc.createElement("div");
        b.id = "memoriaDetailWrap";
        b.appendChild(this.render().el);
        k.startSe(1002);
        h.getMaxLevel(d.piece.rank, d.lbCount);
        a.doc.getElementById("baseContainer").appendChild(b);
        k.getBaseData(a.getNativeObj());
        a.scrollSet("memoriaPopScroll", "infoWrap");
        this.btnChack();
        a.disableLink = !1
      },
      protectHandler: function(b)
      {
        b.preventDefault();
        if (!(a.isScrolled() || l || d.lockFlg || d.lockFlg))
          if (d.unprotectLimitFlag) new a.PopupClass(
          {
            title: "メモリアロック解除",
            content: "イベント期間中にこのメモリアのロックを<br>解除することはできません。",
            closeBtnText: "OK",
            popupType: "typeC"
          });
          else
          {
            l = !0;
            var c = b.currentTarget,
              e = this,
              g = function(b)
              {
                "error" !== b.resultCode && (b.userPieceList[0].equipFlag = e.model.equipFlag, b.userPieceList[0].equipDeck = e.model.equipDeck, b.userPieceList[0].eventDescription = e.model.eventDescription, b.userPieceList[0].eventEffect = e.model.eventEffect, b.userPieceList[0].regularEventDescription = e.model.regularEventDescription, b.userPieceList[0].regularEventEffect = e.model.regularEventEffect, b.userPieceList[0].equipRemoveFlag = e.model.equipRemoveFlag, "PieceArchive" === a.location && (e.model.archive && (b.userPieceList[0].archive = e.model.archive), e.model.selectFlg && (b.userPieceList[0].selectFlg = e.model.selectFlg)), e.model.archive && (b.userPieceArchiveList = b.userPieceList, delete b.userPieceList), a.responseSetStorage(b), b = a.historyArr[a.historyArr.length - 1], (0 <= b.indexOf("PieceArchive/archive") || 0 <= b.indexOf("MemoriaList/archiveList") || 0 <= b.indexOf("MemoriaList/archiveSell")) && a.popModel && (a.popModel.attributes.protect = !a.popModel.attributes.protect, a.popModel.trigger("latestData")), c.classList.contains("protected") ? c.textContent = "ロック" : c.textContent = "ロック中", c.classList.toggle("protected"));
                l = !1
              },
              f = {
                userPieceId: d.id
              };
            b.currentTarget.classList.contains("protected") ? n.ajaxPost(a.linkList.userPieceUnprotect, f, g) : n.ajaxPost(a.linkList.userPieceProtect, f, g)
          }
      },
      cardZoom: function(b)
      {
        b.preventDefault();
        a.isScrolled() || (b.currentTarget.classList.toggle("zoom"), 1024 !== a.displayWidth && b.currentTarget.classList.contains("zoom") ? b.currentTarget.getElementsByTagName("img")[0].style = "top:-webkit-calc(50% + 16px - 432.5px);" : b.currentTarget.getElementsByTagName("img")[0].style = "")
      },
      btnChack: function()
      {
        this.model.level === this.model.maxLevel && a.doc.getElementById("strengtheningBtn").classList.add("off");
        if (3 < this.model.lbCount) a.doc.getElementById("breakthroughBtn").classList.add("off");
        else
        {
          var b = a.storage.userPieceList.where(
            {
              pieceId: this.model.pieceId
            }),
            c = "";
          switch (this.model.piece.rank)
          {
            case "RANK_3":
              c = "OVER_LIMITTER";
              break;
            case "RANK_4":
              c = "OVER_LIMITTER_CORE"
          }
          c = (c = a.storage.userItemList.findWhere(
          {
            itemId: c
          })) ? c.get("quantity") : 0;
          1 < b.length || 0 < c ? a.doc.getElementById("breakthroughBtn").classList.remove("off") : a.doc.getElementById("breakthroughBtn").classList.add("off")
        }
      },
      strengtheningFunc: function(b)
      {
        a.isScrolled() || (b.preventDefault(), a.memoriaComposeTarget = this.model, location.href = "#/MemoriaCompose/compose")
      },
      breakthroughFunc: function(b)
      {
        a.isScrolled() || (b.preventDefault(), a.memoriaComposeTarget = this.model, location.href = "#/MemoriaCompose/limitbreak")
      },
      removeHandler: function()
      {
        a.androidKeyStop = !1;
        a.disableLink = !1;
        f.each(a.doc.querySelector("#baseContainer").children, function(b)
        {
          a.removeClass(b, "hide")
        });
        this.model.closeEvent && this.model.closeEvent();
        a.doc.getElementById("memoriaDetailWrap") && a.doc.getElementById("baseContainer").removeChild(a.doc.getElementById("memoriaDetailWrap"));
        a.detailPopup && (a.detailPopup.remove(), a.detailPopup = null)
      }
    });
    a.detailPopup = new g
  };
  return {
    cardDetailPopup: function(g, b, c)
    {
      clearTimeout(a.popupTimerObj);
      a.disableLink = !0;
      a.popupTimerObj = setTimeout(function()
      {
        a.isScrolled() ? a.disableLink = !1 : (a.doc.querySelector("#sideMenu") && (a.removeClass(a.doc.querySelector("#sideMenu"), "close"), a.removeClass(a.doc.querySelector("#sideMenu"), "anim")), g.preventDefault(), g.stopPropagation(), d = b, c && k.endL2d(), m())
      }, 500)
    },
    popupTimerStop: function(d)
    {
      a.disableLink = !1;
      clearTimeout(a.popupTimerObj)
    },
    instantPopup: function(g, b, c)
    {
      clearTimeout(a.popupTimerObj);
      d = b;
      d.btnHide = c || 1 == c ? !0 : !1;
      m()
    },
    maxParamPopup: function(a, b, c, e, f)
    {
      d = b;
      d.level = h.getMaxLevel(b.piece.rank, 4);
      d.maxLevel = d.level;
      d.lbCount = 4;
      d.experience = 0;
      b = h.getParam(b, d.level);
      d.attack = b.attack;
      d.defense = b.defense;
      d.hp = b.hp;
      c && (d.lockFlg = !0);
      d.btnHide = !0;
      e ? this.cardDetailPopup(a, d, f) : m()
    }
  }
});
