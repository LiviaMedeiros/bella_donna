define("underscore backbone backboneCommon ajaxControl command text!template/gacha/SelectableGachaCharaSelect.html text!css/gacha/SelectableGachaCharaSelect.css".split(" "), function(g, d, a, h, c, q, r)
{
  var n = d.Model.extend(
    {}),
    k = {
      x: 285,
      y: 1024 === a.displayWidth ? Math.floor(a.doc.getElementsByTagName("body")[0].offsetHeight / 2) + 95 : Math.ceil(a.shortSize / 2) + 135,
      fade: .3,
      animeList: ["reaction", "stance"]
    },
    p = [42, 43, 51, 52],
    e, t = d.View.extend(
    {
      events: function()
      {
        var b = {};
        b[a.cgti + " .detailChangeBtn"] = this.detailChange;
        b[a.cgti + " .voiceBtn"] = this.playVoice;
        b[a.cgti + " #mainBtn"] = this.decideFunc;
        return b
      },
      initialize: function(a)
      {
        this.miniCharaNo = null;
        this.showType = "charaDetail";
        this.charaList = [];
        this.template = g.template(q);
        this.createDom();
        this.listenTo(this.model, "change", this.render)
      },
      render: function()
      {
        this.$el.html(this.template(
        {
          model: this.model.toJSON()
        }));
        a.addClass(this.el.querySelector("#" + this.showType), "show");
        "charaDetail" == this.showType && a.addClass(this.el.querySelector("#charaImg"), "show");
        "charaParameter" == this.showType && (c.hideMiniChara(), c.showMiniChara(k));
        c.getBaseData(a.getNativeObj());
        return this
      },
      createDom: function()
      {
        a.setGlobalView();
        a.content.append(this.render().el);
        this.createView();
        a.ready.hide()
      },
      createView: function()
      {
        var b = this;
        l.prototype.parentView = this;
        l.prototype.template = g.template($("#charaListTemp").text());
        var d = new l;
        a.content.append(d.render().el);
        m.prototype.parentView = this;
        m.prototype.template = g.template($("#charaListParts").text());
        var e = null,
          f = a.doc.createDocumentFragment();
        g.each(a.selectableGachaModel.selectableCharaList, function(c, d)
        {
          d = new m(
          {
            model: new n(c)
          });
          b.charaList.push(d);
          a.selectableChara && a.selectableChara[a.selectableGachaModel.id] && a.selectableChara[a.selectableGachaModel.id].gachaId === a.selectableGachaModel.id && c.defaultCard.cardId === a.selectableChara[a.selectableGachaModel.id].cardId && (e = d);
          f.appendChild(d.render().el)
        });
        a.doc.querySelector("#charaListElms").appendChild(f);
        e ? e.charaSelectFunc() : this.charaList[0].charaSelectFunc();
        this.render();
        c.getBaseData(a.getNativeObj());
        a.scrollSetX("charaListScrollWrap", "list")
      },
      detailChange: function(b)
      {
        b.preventDefault();
        a.isScrolled() || ("charaDetail" === this.showType ? (this.showType = "charaParameter", a.removeClass(a.doc.querySelector("#charaDetail"), "show"), a.removeClass(a.doc.querySelector("#charaImg"), "show"), a.addClass(a.doc.querySelector("#charaParameter"), "show"), c.showMiniChara(k)) : (this.showType = "charaDetail", a.addClass(a.doc.querySelector("#charaDetail"), "show"), a.addClass(a.doc.querySelector("#charaImg"), "show"), a.removeClass(a.doc.querySelector("#charaParameter"), "show"), c.hideMiniChara()))
      },
      playVoice: function(b)
      {
        if (b && (b.preventDefault(), a.isScrolled())) return;
        b = p[Math.floor(Math.random() * p.length)];
        c.stopVoice();
        b = "vo_char_" + this.model.toJSON().id + "_00_" + b;
        c.startVoice(b)
      },
      decideFunc: function(b)
      {
        b.preventDefault();
        if (!a.isScrolled()) switch (c.stopVoice(), b = this.model.toJSON(), a.selectableChara || (a.selectableChara = []), a.selectableChara[a.selectableGachaModel.id] = {
            gachaId: a.selectableGachaModel.id,
            cardId: b.defaultCardId,
            cardName: b.defaultCard.cardName,
            title: b.defaultCard.title,
            rank: b.defaultCard.rank,
            miniCharaNo: b.defaultCard.miniCharaNo,
            attributeId: b.attributeId
          }, a.selectableGachaModel.gachaType)
        {
          case "SELECTABLE_TUTORIAL":
            location.href = "#/GachaTop/SELECTABLE_TUTORIAL/TU520";
            break;
          case "SELECTABLE_SPECIAL":
          case "SELECTABLE_PICKUP":
            console.log(a.selectableChara[b.id]), console.log(a.selectableGachaModel), h.ajaxPost(a.linkList.gachaSelect,
            {
              gachaBeanKind: a.selectableGachaModel.gachaKindList[0].beenKind,
              gachaScheduleId: a.selectableGachaModel.id,
              cardId: a.selectableChara[a.selectableGachaModel.id].cardId
            }, function(b)
            {
              location.href = "#/GachaTop/" + a.selectableGachaModel.id
            })
        }
      }
    }),
    l = d.View.extend(
    {
      id: "charaListWrap",
      initialize: function()
      {
        this.listenTo(this.parentView, "removeView", this.removeView)
      },
      render: function()
      {
        this.$el.html(this.template());
        return this
      },
      removeView: function()
      {
        console.log("removeView");
        this.off();
        this.remove()
      }
    }),
    m = d.View.extend(
    {
      tagName: "li",
      className: function()
      {
        return "userCharaIcon " + this.model.toJSON().defaultCard.attributeId + " " + this.model.toJSON().defaultCard.rank
      },
      events: function()
      {
        var b = {};
        b[a.cgti] = this.charaSelect;
        return b
      },
      initialize: function()
      {
        this.listenTo(this.parentView, "removeView", this.removeView)
      },
      render: function()
      {
        this.$el.html(this.template(
        {
          model: this.model.toJSON()
        }));
        return this
      },
      charaSelect: function(b)
      {
        b.preventDefault();
        a.isScrolled() || (c.startSe("1002"), this.charaSelectFunc())
      },
      charaSelectFunc: function()
      {
        c.stopVoice();
        a.removeClass(a.doc.querySelector("#charaListElms .select"), "select");
        a.addClass(this.el, "select");
        this.parentView.miniCharaNo !== this.model.toJSON().defaultCard.miniCharaNo && (this.parentView.miniCharaNo = this.model.toJSON().defaultCard.miniCharaNo, k.id = String(this.parentView.miniCharaNo));
        this.parentView.model.clear(
        {
          silent: !0
        });
        this.parentView.model.set(g.clone(this.model.toJSON()));
        var b = this;
        f && clearTimeout(f);
        f = setTimeout(function()
        {
          b.parentView.playVoice()
        }, 500)
      },
      removeView: function()
      {
        console.log("removeView");
        this.off();
        this.remove()
      }
    }),
    f;
  return {
    needModelIdObj: [
    {
      id: "user"
    },
    {
      id: "gameUser"
    },
    {
      id: "userItemList"
    },
    {
      id: "userStatusList"
    },
    {
      id: "userPatrolList"
    }],
    fetch: function()
    {
      h.pageModelGet(this.needModelIdObj)
    },
    init: function()
    {
      a.tutorialUtil && a.removeClass(a.doc.querySelector("#tutorialContainer"), "show");
      a.selectableGachaModel ? (a.setStyle(r), h.getPageJson(), e = new t(
      {
        model: new n
      })) : c.nativeReload("#/TopPage")
    },
    startCommand: function() {},
    removeCommand: function() {},
    remove: function(a)
    {
      e && (e.trigger("removeView"), e.remove(), clearTimeout(f), c.hideMiniChara(), c.stopVoice());
      a()
    }
  }
});
