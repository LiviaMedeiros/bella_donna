define(["underscore", "backbone", "backboneCommon"], function(e, c, d)
{
  return c.View.extend(
  {
    initialize: function()
    {
      this.listenTo(this.model, "change", this.render);
      this.render()
    },
    render: function()
    {
      var a = d.storage.userStatusList,
        b = {},
        f = c.Model.extend();
      b.ACP = a.findWhere(
      {
        statusId: "ACP"
      }).toJSON().point || "0";
      b.MAX_ACP = a.findWhere(
      {
        statusId: "MAX_ACP"
      }).toJSON().point || "0";
      this.model = new f(b);
      a = this.model.toJSON();
      e.each(a, function(a, b)
      {
        d.doc.querySelector("." + b).textContent = a
      })
    },
    removeView: function()
    {
      this.model.clear();
      delete this.model;
      this.off();
      this.remove()
    }
  })
});
