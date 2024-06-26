define("underscore backbone backboneCommon ajaxControl command text!template/event/EventWitch/parts/ExchangeMemoria.html js/event/EventWitch/Model js/event/EventWitch/Utility js/event/EventWitch/parts/MemoriaDetailPopup js/event/EventWitch/parts/IconCharaGauge".split(" "), function(d, k, b, f, p, l, q, r, m, n)
{
  var e, c = !1;
  return k.View.extend(
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
      this.template = d.template(l);
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
      this._views["ExchangeIconCharaGauge" + this.viewModel.charaId] = new n(
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
        var g = this.viewModel.charaId,
          d = this.viewModel.rewardPieceId,
          h = this.viewModel.storyId;
        e = new b.PopupClass(
        {
          popupType: "typeC",
          title: "メモリア獲得",
          content: this.viewModel.charaInfo.name + "のメモリアを獲得します。",
          closeBtnText: "閉じる",
          decideBtnText: "獲得する",
          decideBtnEvent: function()
          {
            c || (c = !0, f.ajaxPost(b.linkList.eventWitchMemoriaExchange,
            {
              charaId: g
            }, function(a)
            {
              "error" !== a.resultCode && (b.responseSetStorage(a), f.ajaxPost(b.linkList.userQuestAdventureRegist,
              {
                adventureId: String(h)
              }, function()
              {
                b.EventWitchMemoriaExchangeAnimePrm = {
                  charaId: g,
                  rewardPieceId: d,
                  storyId: h
                };
                c = !1;
                location.href = "#/EventWitchExchangeAnimePage"
              }))
            }))
          }
        }, null, null, null)
      }
    },
    tapMemoriaDetailBtn: function(a)
    {
      a.preventDefault();
      b.isScrolled() || (this._views.MemoriaDetailPopup = new m(
      {
        model: this.viewModel.rewardPieceInfo
      }))
    },
    removeView: function()
    {
      e && e.remove();
      c && (c = !1);
      this.off();
      this.remove()
    }
  })
});
