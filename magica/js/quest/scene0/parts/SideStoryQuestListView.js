define("underscore backbone backboneCommon ajaxControl command text!template/quest/scene0/SideStoryQuestList.html js/quest/scene0/Utility".split(" "), function(d, e, b, g, h, f, k)
{
  return e.View.extend(
  {
    className: "listWrapSec",
    events: function()
    {
      var a = {};
      a[b.cgti + " #toggleBtn"] = this.tapToggleBtn;
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
      return {
        listTitle: "Film." + a.id,
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
      if (!b.isScrolled())
      {
        var c = $(a.currentTarget).data().listid;
        $("#" + c).hasClass("open") ? ($("#" + c).removeClass("open"), $(a.currentTarget).find(".toggleBtn").removeClass("up")) : ($("#" + c).addClass("open"), $(a.currentTarget).find(".toggleBtn").addClass("up"));
        setTimeout(function()
        {
          b.scrollRefresh()
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
