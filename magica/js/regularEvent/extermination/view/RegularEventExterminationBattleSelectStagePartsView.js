define("underscore backbone backboneCommon ajaxControl command text!template/regularEvent/extermination/RegularEventExterminationBattleSelectStageParts.html".split(" "), function(e, g, a, h, f, k)
{
  return g.View.extend(
  {
    tagName: "div",
    className: "stageWrap se_decide TE",
    events: function()
    {
      var b = {};
      b[a.cgti + ".stageWrap"] = this.stageTap;
      return b
    },
    initialize: function(a)
    {
      this.listenTo(this.parentView, "removeView", this.removeView);
      this.listenTo(this.model, "change", this.replaceView);
      this.template = e.template(k);
      this.createDom()
    },
    render: function()
    {
      this.$el.html(this.template(
      {
        model: this.model.toJSON()
      }));
      return this
    },
    createDom: function(b)
    {
      var c = a.doc.createDocumentFragment(),
        d = this;
      e.each(d.collection, function(a, b)
      {
        a = d.$el.html(d.template(
        {
          model: a.toJSON()
        }));
        c.appendChild(a)
      });
      return c
    },
    replaceView: function(b)
    {
      this.$el.html(this.template(
      {
        model: this.model.toJSON()
      }));
      this.$el[0].className = "stageWrap se_decide TE number" + this.model.get("index") + " " + this.model.get("battleStatus") + " rebone";
      f.getBaseData(a.getNativeObj())
    },
    stageTap: function(b)
    {
      b.preventDefault();
      if (!a.isScrolled())
      {
        var c = this;
        if ("CONQUERED" == this.model.toJSON().battleStatus) var d = function(b)
          {
            a.responseSetStorage(b);
            c.model.set(
            {
              battleStatus: "CANPLAY"
            });
            b = c.model.get("index");
            a.userRegularEventExterminationDifficulty["battle" + b + "Status"] = "CANPLAY";
            c.parentView.trigger("reboneCheckFunc", c);
            setTimeout(function()
            {
              f.startSe(3211)
            }, 1E3);
            e.remove()
          },
          e = new a.PopupClass(
          {
            title: "制圧中",
            content: "制圧状態を解除し、再度制圧前の状態に戻せます。<br /><br /><span class='attention'>※解除後は再度制圧をする必要があります。<br />※制圧に参加した魔法少女を再編成できます。</span>",
            closeBtnText: "閉じる",
            decideBtnText: "解除する",
            decideBtnEvent: function()
            {
              var b = c.model.get("index");
              window.isLocal ? d() : h.ajaxPost(a.linkList.exterminationUnconquered,
              {
                index: b
              }, d)
            },
            popupType: "typeC"
          }, null);
        else "NEW" == this.model.toJSON().battleStatus || "CANPLAY" == this.model.toJSON().battleStatus ? (f.startSe(3220), this.parentView.trigger("createQuestModelFunc", this), a.currentExterminationDeckType = "", a.RegularEventExterminationBattleConfirm = this, location.href = "#/RegularEventExterminationBattleConfirm") : new a.PopupClass(
        {
          title: "終の結界",
          content: "他の結界を<span class='attention'>全て制圧すると挑戦</span>できます。",
          closeBtnText: "閉じる",
          popupType: "typeC"
        }, null)
      }
    },
    removeView: function()
    {
      this.off();
      this.remove()
    }
  })
});
