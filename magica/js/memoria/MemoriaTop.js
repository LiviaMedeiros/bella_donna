define("underscore backbone backboneCommon ajaxControl command text!template/memoria/MemoriaTop.html text!css/memoria/MemoriaTop.css".split(" "), function(e, n, a, g, d, p, q)
{
  var c, h, r = n.View.extend(
  {
    initialize: function(b)
    {
      this.template = e.template(p);
      this.createDom()
    },
    events: function()
    {
      var b = {};
      b[a.cgti + " .saleLinkBtn"] = this.salePop;
      b[a.cgti + " .archiveLinkBtn"] = this.archiveLinkPop;
      return b
    },
    render: function()
    {
      this.$el.html(this.template(g.getPageJson()));
      return this
    },
    createDom: function()
    {
      a.setGlobalView();
      a.content.append(this.render().el);
      a.firstNaviCheck(c);
      a.ready.hide()
    },
    salePop: function(b)
    {
      b.preventDefault();
      a.isScrolled() || new a.PopupClass(
      {
        data: c.storageData,
        piece: c.userPieceList,
        cardCapacity: a.storage.gameUser.toJSON().cardCapacity,
        content: "",
        exClass: "saleSelectPop",
        popupType: "typeC"
      }, $("#salePopTempParts").text(), function() {}, function() {})
    },
    archiveLinkPop: function(b)
    {
      b.preventDefault();
      a.isScrolled() || new a.PopupClass(
      {
        data: c.storageData,
        content: "",
        exClass: "archiveSelectPop",
        popupType: "typeC"
      }, $("#archivePopTempParts").text(), function() {}, function() {})
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
      id: "userLimitedChallengeList"
    },
    {
      id: "userPieceList"
    },
    {
      id: "userPieceArchiveList"
    },
    {
      id: "userPieceStorageList"
    },
    {
      id: "userPatrolList"
    }],
    fetch: function()
    {
      g.pageModelGet(this.needModelIdObj)
    },
    init: function()
    {
      c = g.getPageJson();
      for (var b = c.userPieceStorageList, d = c.userPieceArchiveList, k = [], f = 0; f < b.length; f++)
      {
        var l = e.findWhere(b,
          {
            setNum: f + 1
          }),
          m;
        m = e.where(d,
        {
          archive: l.setNum
        });
        k[f] = {
          storage: l,
          piece: m
        }
      }
      c.storageData = k;
      a.setStyle(q);
      h = new r
    },
    startCommand: function()
    {
      d.changeBg("web_0020.ExportJson");
      d.startBgm(a.settingBgm);
      var b = [],
        c = e.sample(a.storage.userPieceList.toJSON(), 5);
      c && e.each(c, function(a, c)
      {
        b.push(a.pieceId)
      });
      d.displayMemoriaTop(b)
    },
    remove: function(a)
    {
      h && h.remove();
      d.stopMemoriaTop();
      a()
    }
  }
});
