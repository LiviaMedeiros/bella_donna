define(["underscore", "backbone", "backboneCommon", "ajaxControl", "text!template/test/ArenaStub.html"], function(g, h, b, c, k, l)
{
  var d, f, m = function()
  {
    b.setStyle(l);
    d = new(h.View.extend(
    {
      events: function()
      {
        var a = {};
        a[b.cgti + " .resultBtn"] = this.resultSend;
        return a
      },
      initialize: function(b)
      {
        this.template = g.template(k);
        this.createDom()
      },
      render: function()
      {
        console.log("render", c.getPageJson());
        this.$el.html(this.template(c.getPageJson()));
        return this
      },
      createDom: function()
      {
        b.content.append(this.render().el);
        b.ready.hide()
      },
      resultSend: function(a)
      {
        a.preventDefault();
        if (!b.isScrolled())
        {
          var d = a.currentTarget.getAttribute("data-result");
          f = b.arenaJson;
          console.log("questJson:", f);
          c.ajaxPost(b.linkList.arenaMissionStart, f, function(a)
          {
            var e = {};
            e.userQuestBattleResultId = a.userQuestBattleResultList[0].id;
            c.ajaxPost(b.linkList.questNativeGet, e, function(a)
            {
              a.webData && b.responseSetStorage(a.webData);
              console.log("getCallback", a);
              e.result = d;
              e.waveList = [];
              c.ajaxPost(b.linkList.questNativeResultSend, e, function(a)
              {
                console.log("sendCallback", a);
                b.questNativeResponse = a;
                location.href = "#/EventArenaMissionResult"
              })
            })
          })
        }
      }
    }))
  };
  return {
    needModelIdObj: [
    {
      id: "user"
    },
    {
      id: "userStatusList",
      refresh: !0
    },
    {
      id: "userPatrolList"
    }],
    fetch: function()
    {
      c.pageModelGet(this.needModelIdObj)
    },
    init: function()
    {
      $(b.ready.target).on("webkitAnimationEnd", function(a)
      {
        "readyFadeOut" == a.originalEvent.animationName && (b.ready.target.className = "")
      });
      m()
    },
    remove: function(a)
    {
      d && d.remove();
      a()
    }
  }
});
