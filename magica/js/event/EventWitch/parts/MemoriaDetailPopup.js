define("underscore backbone backboneCommon ajaxControl command text!template/event/EventWitch/parts/MemoriaDetailPopup.html".split(" "), function(d, e, c, h, f, g)
{
  var b;
  return e.View.extend(
  {
    events: function()
    {
      return {}
    },
    initialize: function(a)
    {
      this.model = a.model;
      this.model = this.createModel(
      {
        model: this.model
      });
      this.template = d.template(g);
      this.createDom()
    },
    render: function()
    {
      this.$el.html(this.template(
      {
        model: this.model
      }));
      return this
    },
    createModel: function(a)
    {
      a = a.model;
      a.displayName = a.pieceName;
      a.isExchanged || (a.displayName = "？？？？？");
      return a
    },
    createDom: function()
    {
      var a = this;
      b = new c.PopupClass(
      {
        exClass: "EventMemoriaDetailPopup",
        popupType: "typeA",
        title: "メモリア詳細",
        content: "",
        closeBtnText: "閉じる"
      }, null, function()
      {
        $(".EventMemoriaDetailPopup .popupTextArea").append(a.render().el);
        f.getBaseData(c.getNativeObj())
      }, null)
    },
    removeView: function()
    {
      b && b.remove();
      this.off();
      this.remove()
    }
  })
});
