define("underscore backbone backboneCommon ajaxControl command text!template/event/EventWitch/parts/ExchangeMemoria.html js/event/EventWitch/Model js/event/EventWitch/Utility js/event/EventWitch/parts/MemoriaDetailPopup js/event/EventWitch/parts/IconCharaGauge".split(" "), function(c, h, b, e, n, k, p, q, l, m)
{
  var d;
  return h.View.extend(
  {
    className: function(a)
    {
      return "ExchangeMemoriaMain charaId" + this.model.charaId
    },
    events: function()
    {
      var a = {};
      a[b.cgti + " .ExchangeBtn"] = this.tapExchangeBtn;
      a[b.cgti + " .memoriaDetailBtn"] = this.tapMemoriaDetailBtn;
      return a
    },
    initialize: function(a)
    {
      var b = a.appendSelector;
      this.template = c.template(k);
      this.model = a.model;
      this._views = a._views;
      this.viewModel = this.createModel(
      {
        model: this.model
      });
      $(b).append(this.render().el);
      this.createDom()
    },
    render: function()
    {
      this.$el.html(this.template(
      {
        model: this.viewModel
      }));
      return this
    },
    createModel: function(a)
    {
      a = a.model;
      a.ExchangeBtnClass = "noChange";
      100 <= a.currentRatio && (a.ExchangeBtnClass = "");
      var b = 1;
      "ABILITY" == a.rewardPieceInfo.pieceType && (b = 2);
      a.rewardPieceInfo.memoriaImg = "/magica/resource/image_web/event/eventWitch/common/alina_request/memoria_thumb_s4_" + b + ".png";
      a.rewardPieceInfo.exchangedImgClass = "";
      a.rewardPieceInfo.isExchanged && (a.rewardPieceInfo.memoriaImg = "/magica/resource/image_web/memoria/memoria_" + a.rewardPieceInfo.pieceId + "_s.png", a.ExchangedImgClass = "exchanged", a.ExchangeBtnClass = "noChange");
      return a
    },
    createDom: function()
    {
      this._views["ExchangeIconCharaGauge" + this.viewModel.charaId] = new m(
      {
        model: this.viewModel,
        appendSelector: ".ExchangeMemoriaMain.charaId" + this.viewModel.charaId
      })
    },
    tapExchangeBtn: function(a)
    {
      a.preventDefault();
      if (!b.isScrolled() && "noChange" != this.viewModel.ExchangeBtnClass && !this.viewModel.rewardPieceInfo.isExchanged)
      {
        var f = this.viewModel.charaId,
          c = this.viewModel.rewardPieceId,
          g = this.viewModel.storyId;
        d = new b.PopupClass(
        {
          popupType: "typeC",
          title: "メモリア獲得",
          content: this.viewModel.charaInfo.name + "のメモリアを獲得します。",
          closeBtnText: "閉じる",
          decideBtnText: "獲得する",
          decideBtnEvent: function()
          {
            e.ajaxPost(b.linkList.eventWitchMemoriaExchange,
            {
              charaId: f
            }, function(a)
            {
              "error" !== a.resultCode && (b.responseSetStorage(a), e.ajaxPost(b.linkList.userQuestAdventureRegist,
              {
                adventureId: String(g)
              }, function()
              {
                b.EventWitchMemoriaExchangeAnimePrm = {
                  charaId: f,
                  rewardPieceId: c,
                  storyId: g
                };
                location.href = "#/EventWitchExchangeAnimePage"
              }))
            })
          }
        }, null, null, null)
      }
    },
    tapMemoriaDetailBtn: function(a)
    {
      a.preventDefault();
      b.isScrolled() || (this._views.MemoriaDetailPopup = new l(
      {
        model: this.viewModel.rewardPieceInfo
      }))
    },
    removeView: function()
    {
      d && d.remove();
      this.off();
      this.remove()
    }
  })
});
