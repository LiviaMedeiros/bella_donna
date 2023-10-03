define("underscore backbone backboneCommon ajaxControl command text!template/quest/scene0/UseItem.html text!css/quest/scene0/UseItem.css".split(" "), function(c, d, e, h, k, f, g)
{
  var b;
  return d.View.extend(
  {
    events: function()
    {
      return {}
    },
    initialize: function(a)
    {
      this.template = c.template(f);
      this.pageModel = a.pageModel;
      e.addStyle(g);
      b = this.createModel(
      {
        pageModel: this.pageModel
      })
    },
    render: function()
    {
      this.$el.html(this.template(
      {
        model: b
      }));
      return this
    },
    createModel: function(a)
    {
      a = a.pageModel;
      return {
        type: a.type,
        itemNum: a.itemInfo.quantity
      }
    },
    removeView: function()
    {
      this.off();
      this.remove()
    }
  })
});
