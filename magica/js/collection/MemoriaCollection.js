define("underscore backbone backboneCommon ajaxControl command text!template/collection/MemoriaCollection.html text!css/collection/MemoriaCollection.css js/memoria/MemoriaPopup cardUtil".split(" "), function(e, k, a, d, l, n, p, q, m)
{
  var g, r = k.View.extend(
    {
      events: function()
      {
        var b = {};
        b[a.cgti + " #sizeChange"] = this.sizeChange;
        b[a.cgti + " #globalBackBtn"] = this.tapGlobalBackBtn;
        return b
      },
      tapGlobalBackBtn: function(b)
      {
        b.preventDefault();
        a.isScrolled() || (location.href = "#/CollectionTop")
      },
      initialize: function(b)
      {
        this.template = e.template(n);
        this.createDom()
      },
      render: function()
      {
        this.$el.html(this.template(d.getPageJson()));
        return this
      },
      createDom: function()
      {
        this.model = d.getPageJson();
        a.content.append(this.render().el);
        this.createView()
      },
      createView: function()
      {
        h.prototype.parentView = this;
        h.prototype.template = e.template($("#MemoriaListParts").text());
        var b = this,
          c = 0,
          d = a.doc.createDocumentFragment();
        e.each(this.model.pieceList, function(a, f)
        {
          a = (f = e.findWhere(b.model.userPieceCollectionList,
          {
            pieceId: a.pieceId
          })) ? f : a;
          f && (a.openFlag = f ? !0 : !1, m.memoriaEventCheck(a) && (a = m.memoriaEventCheck(a)), c++);
          a = new h(
          {
            model: a
          });
          d.appendChild(a.render().el)
        });
        a.doc.querySelector("#memoriaWrapInner").appendChild(d);
        l.getBaseData(a.getNativeObj());
        a.doc.getElementById("info_memoriaCount").innerText = c;
        a.doc.getElementById("info_memoriaCapacity").innerText = this.model.pieceList.length;
        a.scrollSet("memoriaScrollWrap", "memoriaWrapInner");
        a.ready.hide()
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
              break;
            case "smallest":
              a.removeClass(c, "smaller");
              a.addClass(c, "smallest");
              b.currentTarget.dataset.size = "normal";
              a.removeClass(b.currentTarget, "smaller");
              a.addClass(b.currentTarget, "smallest");
              break;
            default:
              a.removeClass(c, "smallest"), b.currentTarget.dataset.size = "smaller", a.removeClass(b.currentTarget, "smallest")
          }
          a.scrollRefresh()
        }
      },
      removeView: function()
      {
        this.trigger("childRemove");
        this.off();
        this.remove()
      }
    }),
    h = k.View.extend(
    {
      events: function()
      {
        var b = {};
        b[a.cgti] = this.tapFunc;
        return b
      },
      className: function()
      {
        return "userMemoriaIcon " + (this.model.piece ? this.model.piece.pieceType : this.model.pieceType)
      },
      initialize: function(a)
      {
        this.listenTo(this.parentView, "childRemove", this.removeView)
      },
      render: function()
      {
        this.$el.html(this.template(
        {
          model: this.model
        }));
        return this
      },
      tapFunc: function(b)
      {
        b.preventDefault();
        a.isScrolled() || this.model.openFlag && q.maxParamPopup(b, this.model, !0)
      },
      removeView: function()
      {
        this.off();
        this.remove()
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
      id: "pieceList"
    },
    {
      id: "userStatusList"
    },
    {
      id: "userPieceList"
    },
    {
      id: "userPieceCollectionList"
    },
    {
      id: "userPieceArchiveList"
    }],
    fetch: function()
    {
      d.pageModelGet(this.needModelIdObj, null, "noConnect")
    },
    init: function()
    {
      a.setStyle(p);
      g = new r;
      a.historyArr = ["TopPage", "CollectionTop", "CollectionTop"]
    },
    startCommand: function()
    {
      l.changeBg("web_0015.ExportJson")
    },
    remove: function(a)
    {
      g && g.removeView();
      a()
    }
  }
});
