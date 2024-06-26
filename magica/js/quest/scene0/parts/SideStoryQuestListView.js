define("underscore backbone backboneCommon ajaxControl command text!template/quest/scene0/SideStoryQuestList.html js/quest/scene0/Utility".split(" "), function(d, e, c, g, h, f, k)
{
  return e.View.extend(
  {
    className: "listWrapSec",
    events: function()
    {
      var a = {};
      a[c.cgti + " #toggleBtn"] = this.tapToggleBtn;
      return a
    },
    initialize: function(a)
    {
      this.template = d.template(f);
      this.model = a.model;
      this.viewModel = this.createModel(
      {
        model: this.model
      })
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
      this.listId = "SideStoryFilm" + a.id;
      var b = "Film." + a.id;
      13 == a.id && (b = "Film.0");
      return {
        listTitle: b,
        listId: this.listId
      }
    },
    getListId: function()
    {
      return this.listId
    },
    tapToggleBtn: function(a)
    {
      a.preventDefault();
      if (!c.isScrolled())
      {
        var b = $(a.currentTarget).data().listid;
        $("#" + b).hasClass("open") ? ($("#" + b).removeClass("open"), $(a.currentTarget).find(".toggleBtn").removeClass("up")) : ($("#" + b).addClass("open"), $(a.currentTarget).find(".toggleBtn").addClass("up"));
        setTimeout(function()
        {
          c.scrollRefresh()
        }, 50)
      }
    },
    removeView: function()
    {
      this.off();
      this.remove()
    }
  })
});
