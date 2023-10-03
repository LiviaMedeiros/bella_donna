define("underscore backbone backboneCommon ajaxControl command text!template/gacha/SelectableGachaPieceSelect.html text!css/gacha/SelectableGachaPieceSelect.css".split(" "), function(f, k, a, p, h, u, v)
{
  var l = k.Model.extend(),
    m, w = k.View.extend(
    {
      events: function()
      {
        var b = {};
        b[a.cgti + " #sizeChange"] = this.sizeChange;
        b[a.cgti + " #allRemoveBtn"] = this.allRemoveFunc;
        return b
      },
      initialize: function(a)
      {
        this.template = f.template(u);
        this.equipedPiece = this.selectPieceId = this.selectPiece = null;
        this.createDom()
      },
      render: function()
      {
        this.$el.html(this.template(a.selectableGachaModel));
        return this
      },
      createDom: function()
      {
        a.setGlobalView();
        a.content.append(this.render().el);
        q.prototype.parentView = this;
        q.prototype.template = f.template($("#EquipInfoParts").text());
        var b = a.doc.createDocumentFragment();
        this.equipInfoView = new q(
        {
          model: new l(
          {})
        });
        b.appendChild(this.equipInfoView.render().el);
        a.doc.querySelector("#MemoriaEquip").appendChild(b);
        var c = new l,
          d = a.selectablePiece ? a.selectablePiece.pieceIdList : a.selectablePieceIdList ? a.selectablePieceIdList : null;
        d ? (c.pieceArr = [], f.each(a.selectableGachaModel.selectablePieceList, function(a, b)
        {
          -1 !== d.indexOf(a.pieceId) && c.pieceArr.push(a)
        })) : c.pieceArr = Array(4);
        r.prototype.parentView = this;
        r.prototype.template = f.template($("#EquipDetailParts").text());
        b = a.doc.createDocumentFragment();
        this.equipDetailView = new r(
        {
          model: new l(c)
        });
        b.appendChild(this.equipDetailView.render().el);
        a.doc.querySelector("#MemoriaEquip").appendChild(b);
        0 < this.equipDetailView.model.toJSON().pieceIndex && this.equipDetailView.equipFrameActivation(null, this.equipDetailView.model.toJSON().pieceIndex);
        a.scrollSet("scrollOuter", "scrollInner");
        a.doc.getElementById("memoriaListWrap");
        a.doc.getElementById("sizeChange");
        this.createListView();
        n(c.pieceArr);
        this.trigger("viewUpdate")
      },
      createListView: function()
      {
        this.memoriaPartsTemplate = f.template($("#MemoriaListParts").text());
        t.prototype.parentView = this;
        this.pieceViewList = [];
        var b = this,
          c = a.doc.createDocumentFragment();
        f.each(a.selectableGachaModel.selectablePieceList, function(d, e)
        {
          d = new t(
          {
            model: new l(d)
          });
          b.pieceViewList.push(d);
          c.appendChild(d.render().el);
          b.memoriaCount++;
          30 === b.memoriaCount && (a.doc.getElementById("memoriaListWrap").appendChild(c), h.getBaseData(a.getNativeObj()), a.ready.hide(), c = null, c = a.doc.createDocumentFragment())
        }.bind(this));
        console.log("pieceViewList", this.pieceViewList);
        a.doc.getElementById("scrollInner").appendChild(c);
        c = null;
        a.scrollRefresh("scrollOuter", "scrollInner");
        30 < this.memoriaCount ? h.getBaseData(a.getNativeObj()) : (h.getBaseData(a.getNativeObj()), a.ready.hide())
      },
      allRemoveFunc: function(b)
      {
        b.preventDefault();
        a.isScrolled() || this.equipDetailView.allRemoveFunc()
      },
      sizeChange: function(b)
      {
        b.preventDefault();
        if (!a.isScrolled())
        {
          var c = a.doc.getElementById("memoriaListWrap");
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
          a.scrollRefresh("scrollOuter", "scrollInner")
        }
      }
    }),
    r = k.View.extend(
    {
      id: "equipDetailWrap",
      className: function()
      {
        return ""
      },
      events: function()
      {
        var b = {};
        b[a.cgti + " .equip"] = this.equipFrameActivation;
        b[a.cgti + " .canSet"] = this.equipFrameActivation;
        b[a.cgti + " #mainBtn"] = this.equipFunc;
        return b
      },
      initialize: function(a)
      {
        this.selectFrame = null;
        this.listenTo(this.model, "change", this.render);
        this.listenTo(this.parentView, "removeView", this.removeView)
      },
      render: function()
      {
        this.$el.html(this.template(
        {
          model: this.model.toJSON()
        }));
        h.getBaseData(a.getNativeObj());
        return this
      },
      equipFrameActivation: function(b, c)
      {
        if (b)
        {
          b.preventDefault();
          if (a.isScrolled()) return;
          c = Number(b.currentTarget.dataset.framenum)
        }
        else --c;
        b = this.el;
        this.parentView.trigger("equipedReset");
        a.removeClass(a.doc.querySelector("#equipDetailWrap .memoriaWrap .selected"), "selected");
        this.parentView.trigger("viewUpdate");
        if (this.selectFrame == c) this.selectFrame = null, a.removeClass(b.querySelector(".memoriaWrap .selected"), "selected"), n(this.model.get("pieceArr")),
          a.removeClass(a.doc.querySelector("#allRemoveBtn"), "off"), this.parentView.equipedPiece = null, this.parentView.selectPiece = null, this.parentView.selectPieceId = null, this.parentView.equipInfoView.model.clear();
        else
        {
          this.selectFrame = c;
          a.addClass(this.el.querySelectorAll(".memoriaWrap .memoria")[c], "selected");
          a.removeClass(a.doc.querySelector("#memoriaListWrap"), "cantTap");
          a.addClass(a.doc.querySelector("#mainBtn"), "off");
          a.addClass(a.doc.querySelector("#allRemoveBtn"), "off");
          var d = this.model.toJSON().pieceArr[c] ||
          {};
          console.log(d);
          var e = null;
          f.each(this.parentView.pieceViewList, function(a)
          {
            if (a.model.get("pieceId") == d.pieceId) return e = a, !0
          });
          this.parentView.equipedPiece = e ? e.model : null;
          this.parentView.selectPiece = e ? e.model : null;
          this.parentView.selectPieceId = d.pieceId || null;
          this.parentView.equipedPiece && this.parentView.equipedPiece.toJSON() ? (this.parentView.selectPiece.set(
          {
            equipRemoveFlag: !0
          }), this.parentView.equipInfoView.model.clear(
          {
            silent: !0
          }), this.parentView.equipInfoView.model.set(this.parentView.selectPiece.toJSON())) : this.parentView.equipInfoView.model.clear()
        }
        this.parentView.trigger("viewUpdate")
      },
      equipFunc: function(b)
      {
        b.preventDefault();
        if (!a.isScrolled())
        {
          var c = {
            gachaScheduleId: a.selectableGachaModel.id,
            pieceIdList: []
          };
          f.each(this.model.toJSON().pieceArr, function(a)
          {
            c.pieceIdList.push(a.pieceId)
          });
          var d = "#/GachaTop/" + a.selectableGachaModel.id;
          4 > c.pieceIdList.length && (a.selectablePiece = null, location.href = d);
          console.log("gachaSelectMemoria:Prm", c);
          p.ajaxPost(a.linkList.gachaSelectMemoria, c, function(b)
          {
            a.selectablePiece = {
              gachaId: a.selectableGachaModel.id,
              pieceIdList: c.pieceIdList
            };
            location.href = d
          })
        }
      },
      allRemoveFunc: function()
      {
        var a = f.clone(this.model.toJSON());
        f.each(a.pieceArr, function(b, d)
        {
          b && (a.pieceArr[d] = null)
        });
        this.model.clear(
        {
          silent: !0
        });
        this.model.set(a);
        this.parentView.trigger("viewUpdate");
        n(a.pieceArr)
      },
      removeView: function()
      {
        this.off();
        this.remove()
      }
    }),
    q = k.View.extend(
    {
      id: "equipInfo",
      className: "commonFrame1",
      events: function()
      {
        var b = {};
        b[a.cgti + " #memoriaEquipBtn"] = this.memoriaSet;
        return b
      },
      initialize: function(a)
      {
        this.listenTo(this.model, "change", this.render);
        this.listenTo(this.parentView, "removeView", this.removeView)
      },
      render: function()
      {
        var b = this.model.toJSON();
        this.$el.html(this.template(
        {
          model: b
        }));
        h.getBaseData(a.getNativeObj());
        return this
      },
      memoriaSet: function(b)
      {
        b.preventDefault();
        if (!a.isScrolled() && !b.currentTarget.classList.contains("off"))
        {
          b = this.parentView.equipDetailView;
          var c = b.selectFrame,
            d = f.clone(this.model.toJSON()),
            e = f.clone(b.model.toJSON());
          delete d.equipRemoveFlag;
          delete d.selectFlg;
          if (null == c)
          {
            for (var h = null,
                g = 0; 4 > g;)
            {
              if (e.pieceArr[g])
              {
                if (e.pieceArr[g].pieceId == d.pieceId)
                {
                  c = g;
                  break
                }
              }
              else null === h && (h = g);
              g = g + 1 | 0
            }
            c = null !== c ? c : h
          }
          if (e.pieceArr[c] && e.pieceArr[c].pieceId == d.pieceId) e.pieceArr[c] = null;
          else
          {
            for (g = 0; 4 > g;)
            {
              if (e.pieceArr[g] && e.pieceArr[g].pieceId == d.pieceId)
              {
                e.pieceArr[g] = null;
                break
              }
              g = g + 1 | 0
            }
            e.pieceArr[c] = d
          }
          b.model.clear(
          {
            silent: !0
          });
          b.model.set(e);
          b.selectFrame = null;
          a.removeClass(b.el.querySelector(".memoriaWrap .selected"), "selected");
          n(e.pieceArr);
          a.removeClass(a.doc.querySelector("#allRemoveBtn"), "off");
          this.parentView.equipedPiece = null;
          this.parentView.selectPiece = null;
          this.parentView.selectPieceId = null;
          this.model.clear();
          this.parentView.trigger("equipedReset");
          this.parentView.trigger("viewUpdate")
        }
      },
      removeView: function()
      {
        this.off();
        this.remove()
      }
    }),
    t = k.View.extend(
    {
      tagName: "p",
      className: function()
      {
        var a = "userMemoriaIcon";
        this.model.toJSON().selectFlg && (a += " selected");
        return a
      },
      events: function()
      {
        var b = {};
        b[a.cgti] = this.touchHandler;
        return b
      },
      initialize: function(a)
      {
        this.listenTo(this.parentView, "removeView", this.removeView);
        this.listenTo(this.parentView, "viewUpdate", this.viewUpdate);
        this.listenTo(this.parentView, "equipedReset", this.equipedReset);
        this.listenTo(this.model, "change", this.viewUpdate)
      },
      render: function()
      {
        this.el.innerHTML = this.parentView.memoriaPartsTemplate(
        {
          model: this.model.toJSON()
        });
        return this
      },
      viewUpdate: function()
      {
        this.model.get("pieceId") === this.parentView.selectPieceId ? this.model.set(
        {
          selectFlg: !0
        }) : this.model.unset("selectFlg");
        this.el.className = this.className();
        f.each(this.parentView.equipDetailView.model.toJSON().pieceArr, function(b)
        {
          if (b && b.pieceId === this.model.get("pieceId")) return a.addClass(this.el, "equiped"), this.model.get("selectFlg") && a.addClass(this.el, "remove"), !0
        }.bind(this))
      },
      equipedReset: function()
      {
        this.model.unset("equipRemoveFlag")
      },
      touchHandler: function(b)
      {
        a.isScrolled() || a.detailPopup || (b.preventDefault(), h.startSe(1002), a.doc.querySelector("#memoriaListWrap.cantTap") || (this.parentView.selectPieceId = this.model.toJSON().pieceId, this.parentView.selectPiece && this.parentView.selectPiece.unset("selectFlg"), this.parentView.selectPiece = this.model, this.model.set(
        {
          selectFlg: !0
        }), this.$el.hasClass("equiped") && (this.parentView.equipedPiece && this.parentView.equipedPiece.get("pieceId") !== this.model.toJSON().pieceId ? this.model.unset("equipRemoveFlag") : this.model.set(
        {
          equipRemoveFlag: !0
        })), b = this.parentView.selectPiece ? this.parentView.selectPiece.toJSON() :
        {}, this.parentView.equipInfoView.model.clear(
        {
          silent: !0
        }), this.parentView.equipInfoView.model.set(b)))
      },
      removeView: function()
      {
        this.model.get("selectFlg") && this.model.unset("selectFlg");
        this.model.get("equipRemoveFlag") && this.model.unset("equipRemoveFlag");
        this.off();
        this.remove()
      }
    }),
    n = function(b)
    {
      var c = 0;
      f.each(b, function(a)
      {
        a && c++
      });
      4 <= c ? (a.removeClass(a.doc.querySelector("#mainBtn"), "off"), a.addClass(a.doc.querySelector("#memoriaListWrap"), "cantTap")) : (a.addClass(a.doc.querySelector("#mainBtn"), "off"), a.removeClass(a.doc.querySelector("#memoriaListWrap"), "cantTap"));
      a.doc.getElementById("selectCurrentNum").innerText = c
    };
  return {
    needModelIdObj: [
    {
      id: "user"
    },
    {
      id: "userStatusList"
    },
    {
      id: "gameUser"
    },
    {
      id: "pieceList"
    },
    {
      id: "userPieceList"
    },
    {
      id: "userPatrolList"
    }],
    fetch: function()
    {
      p.pageModelGet(this.needModelIdObj)
    },
    init: function()
    {
      console.log("selectableGachaModel", a.selectableGachaModel);
      a.setStyle(v);
      p.getPageJson();
      m = new w;
      h.getBaseData(a.getNativeObj())
    },
    remove: function(b)
    {
      a.removeBackHandler();
      m && (m.trigger("removeView"), m.remove());
      b()
    }
  }
});
