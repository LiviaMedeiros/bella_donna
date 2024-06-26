define("underscore backbone backboneCommon ajaxControl command text!template/quest/secondPartLast/parts/StageParts.html js/quest/secondPartLast/EnemyDetailPopup".split(" "), function(d, g, a, h, e, k, l)
{
  var m = function(b)
  {
    $("#tapBlock").removeClass("whiteOut");
    $("#tapBlock").addClass("whiteIn");
    setTimeout(function()
    {
      $("#tapBlock").removeClass("whiteIn");
      a.tapBlock(!1)
    }, 2E3)
  };
  return g.View.extend(
  {
    tagName: "div",
    className: "stageWrap",
    events: function()
    {
      var b = {};
      b[a.cgti + ".stageWrap .stageBtn"] = this.stageTap;
      b[a.cgti + ".stageWrap .bossStageBtn"] = this.stageTap;
      b[a.cgti + ".stageWrap .detailBtn"] = this.detailBtnTap;
      return b
    },
    initialize: function(a)
    {
      this.listenTo(this.parentView, "removeView", this.removeView);
      this.listenTo(this.model, "change", this.replaceView);
      this.template = d.template(k)
    },
    render: function()
    {
      this.$el.html(this.template(
      {
        model: this.model
      }));
      return this
    },
    replaceView: function(b)
    {
      this.$el.html(this.template(
      {
        model: this.model
      }));
      this.$el[0].className = "stageWrap stage" + this.model.get("index") + " " + this.model.get("battleStatus") + " rebone";
      e.getBaseData(a.getNativeObj())
    },
    stageTap: function(b)
    {
      b.preventDefault();
      if (!a.isScrolled())
      {
        var c = this;
        b = function(a)
        {
          a = "CANPLAY";
          var b = c.$el[0].className;
          ~b.indexOf("CONQUERED") ? a = "CONQUERED" : ~b.indexOf("LOCK") && (a = "LOCK");
          return a
        };
        if ("CONQUERED" == b(
          {})) var f = function(b)
          {
            a.responseSetStorage(b);
            c.model.battleStatus = "CANPLAY";
            b = c.model.index;
            a.secondPartLastInfo.battleInfo["battle" + b + "Status"] = "CANPLAY";
            c.$el[0].className = "stageWrap stage" + b + " CANPLAY";
            $("#boss").removeClass("stage" + b + "CONQUERED");
            $("#crashSec").removeClass("stage" + b + "CONQUERED");
            $(".stageWrap.stage5").removeClass("CANPLAY");
            $(".stageWrap.stage5").addClass("LOCK");
            setTimeout(function()
            {
              e.startSe(3211)
            }, 1E3);
            m(
            {})
          },
          d = new a.PopupClass(
          {
            title: "制圧中",
            content: "制圧状態を解除し、再度制圧前の状態に戻せます。<br /><br /><span class='attention'>※解除後は再度制圧をする必要があります。<br />※制圧に参加した魔法少女を再編成できます。</span>",
            closeBtnText: "閉じる",
            decideBtnText: "解除する",
            decideBtnEvent: function()
            {
              a.tapBlock(!0);
              $("#tapBlock").addClass("whiteOut");
              window.isLocal ? setTimeout(function()
              {
                f(
                {})
              }, 3E3) : h.ajaxPost(a.linkList.secondPartLastUnconquered,
              {
                questBattleId: c.model.questModel.questBattleId
              }, function(a)
              {
                setTimeout(function()
                {
                  f(a)
                }, 3E3)
              });
              d.remove()
            },
            popupType: "typeC"
          }, null);
        else "CANPLAY" == b(
        {}) ? (e.startSe(3220), a.currentSecondPartLastDeckType = "", a.SecondPartLastBattleConfirmModel = this.model, location.href = "#/SecondPartLastBattleConfirm") : new a.PopupClass(
        {
          title: "鏡の魔女",
          content: "鏡の魔女の腕を<span class='attention'>全て制圧すると挑戦</span>できます。",
          closeBtnText: "閉じる",
          popupType: "typeC"
        }, null)
      }
    },
    detailBtnTap: function(b)
    {
      b.preventDefault();
      a.isScrolled() || l.detailPop(a.secondPartLastInfo.enemyInfo, a.secondPartLastInfo.battleInfo, this.model.index - 1)
    },
    removeView: function()
    {
      this.off();
      this.remove()
    }
  })
});
