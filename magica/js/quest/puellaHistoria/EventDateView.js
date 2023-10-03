define("underscore backbone backboneCommon ajaxControl command text!template/quest/puellaHistoria/EventDate.html".split(" "), function(e, g, h, l, m, k)
{
  var c, f;
  return g.View.extend(
  {
    events: function()
    {
      return {}
    },
    initialize: function(a)
    {
      this.template = e.template(k);
      f = a.pageModel;
      c = this.createModel(
      {
        pageModel: f
      })
    },
    render: function()
    {
      this.$el.html(this.template(
      {
        model: c
      }));
      return this
    },
    createModel: function(a)
    {
      a = a.pageModel;
      var c = a.currentTime.split(" ")[0],
        d = {
          dateText: "00/00",
          eventNumClass: "none"
        };
      e.each(a.mirrorInfoList, function(b, a, e)
      {
        b.isOpenEvent && b.endAt && (a = h.getDateShortening(
        {
          date: b.endAt
        }), d.eventNumClass = "event" + b.id, d.dateText = a.mo + "/" + a.da, b = b.endAt.split(" ")[0], c == b && (d.dateText = a.ho + ":" + a.mi))
      });
      return d
    },
    removeView: function()
    {
      this.off();
      this.remove()
    }
  })
});
