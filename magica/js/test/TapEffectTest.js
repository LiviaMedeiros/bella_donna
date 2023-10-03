define("underscore backbone backboneCommon ajaxControl command text!template/test/TapEffectTest.html text!css/test/TapEffectTest.css".split(" "), function(d, e, b, f, m, h, k)
{
  var c, l = e.View.extend(
    {
      events: function()
      {
        return {}
      },
      initialize: function(a)
      {
        this.template = d.template(h);
        this.createDom()
      },
      render: function()
      {
        this.$el.html(this.template(f.getPageJson()));
        return this
      },
      createDom: function()
      {
        b.setGlobalView();
        b.content.append(this.render().el);
        g.prototype.template = d.template($("#TapEffect").text());
        b.ready.hide()
      },
      touch: function(a)
      {
        a.preventDefault();
        if (!b.isScrolled())
        {
          a = a.originalEvent.changedTouches[0];
          var c = {
            x: a.pageX,
            y: a.pageY
          };
          debugX.innerText = a.pageX;
          debugY.innerText = a.pageY;
          a = new g(
          {
            model: c
          });
          b.doc.getElementById("TapEffectTest").appendChild(a.render().el)
        }
      }
    }),
    g = e.View.extend(
    {
      className: "commonEffect",
      events: function()
      {
        var a = {};
        a.webkitAnimationEnd = this.removeView;
        return a
      },
      render: function()
      {
        this.$el.html(this.template(
        {
          model: this.model
        }));
        this.el.style.top = this.model.y - 128 + "px";
        this.el.style.left = this.model.x - 128 + "px";
        console.log(this.el.style);
        return this
      },
      removeView: function()
      {
        this.remove()
      }
    });
  return {
    needModelIdObj: [
    {
      id: "user"
    },
    {
      id: "gameUser"
    },
    {
      id: "itemList"
    },
    {
      id: "userItemList"
    },
    {
      id: "userStatusList"
    }],
    fetch: function()
    {
      f.pageModelGet(this.needModelIdObj)
    },
    init: function()
    {
      b.setStyle(k);
      c = new l
    },
    remove: function(a)
    {
      c && c.remove();
      a()
    }
  }
});
