define("underscore backbone backboneCommon ajaxControl command text!template/campaign/sumo/CampaignSumoCharaSelect.html text!css/campaign/sumo/CampaignSumoCharaSelect.css text!resource/image_web/_json/campaignSumoChara.json".split(" "), function(g, m, b, n, k, p, q, r)
{
  var l, e, h, f = [],
    t = m.View.extend(
    {
      events: function()
      {
        var a = {};
        a[b.cgti + " .chara"] = this.charaSelect;
        a[b.cgti + " .decideBtn"] = this.decideBtn;
        a[b.cgti + " .arrow"] = this.carousel;
        return a
      },
      initialize: function(a)
      {
        this.template = g.template(p);
        this.charaJson = JSON.parse(r);
        this.decideFlag = !1;
        h = e = 1;
        this.createDom()
      },
      render: function()
      {
        this.charaListModel = [];
        for (var a = 1, c = 0; c < this.charaJson.charaList.length; c++)
        {
          var d = {};
          d.charaId = this.charaJson.charaList[c].charaId;
          d.organization = this.charaJson.charaList[c].organization;
          d.name = this.charaJson.charaList[c].name;
          d.interval = this.charaJson.charaList[c].interval;
          d.weight = this.charaJson.charaList[c].weight;
          d.pageNum = a;
          c >= 29 * a && (a++, h++);
          this.charaListModel.push(d)
        }
        f.splice(0);
        g.filter(this.charaListModel, function(a)
        {
          a.pageNum == e && f.push(a)
        });
        this.$el.html(this.template(
        {
          charaList: f
        }));
        b.removeClass(this.el.querySelector("#CampaignSumoCharaSelect .right"), "hide");
        return this
      },
      createDom: function()
      {
        b.content.append(this.render().el);
        b.setGlobalView();
        k.getBaseData(b.getNativeObj());
        b.ready.hide();
        $(b.doc.getElementsByClassName("chara")[0]).trigger(b.cgti)
      },
      charaSelect: function(a)
      {
        a.preventDefault();
        if (!b.isScrolled())
        {
          for (var c = b.doc.getElementsByClassName("chara"), d = 0; d < c.length;) b.removeClass(c[d], "selected"), d = d + 1 | 0;
          b.addClass(a.currentTarget, "selected");
          this.selectCharaId = parseInt(a.currentTarget.dataset.id)
        }
      },
      decideBtn: function(a)
      {
        a.preventDefault();
        b.isScrolled() || this.decideFlag || (this.decideFlag = !0, b.sumoPlayerModel = g.findWhere(this.charaJson.charaList,
        {
          charaId: this.selectCharaId
        }), b.addClass(a.currentTarget, "anim"), setTimeout(function()
        {
          location.href = "#/CampaignSumoMain"
        }, 800))
      },
      carousel: function(a)
      {
        a.preventDefault();
        if (!b.isScrolled())
        {
          var c = this.charaListModel;
          a.currentTarget.classList.contains("right") && e != h ? e++ : a.currentTarget.classList.contains("left") && 1 != e && e--;
          (function()
          {
            f.splice(0);
            g.filter(c, function(a)
            {
              a.pageNum == e && f.push(a)
            })
          })();
          this.$el.html(this.template(
          {
            charaList: f
          }));
          e == h && b.removeClass(this.el.querySelector("#CampaignSumoCharaSelect .charaList .left"), "hide");
          1 == e && b.removeClass(this.el.querySelector("#CampaignSumoCharaSelect .charaList .right"), "hide");
          a = b.doc.getElementsByClassName("chara");
          b.addClass(a[0], "selected");
          this.selectCharaId = parseInt(a[0].dataset.id)
        }
      },
      removeFunc: function(a)
      {
        this.off();
        this.remove();
        a && a()
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
      id: "userStatusList"
    },
    {
      id: "userItemList"
    },
    {
      id: "userPatrolList"
    }],
    fetch: function(a, b)
    {
      n.pageModelGet(this.needModelIdObj)
    },
    init: function()
    {
      b.setStyle(q);
      b.historyArr = ["MyPage", "CampaignSumoTop", "CampaignSumoCharaSelect"];
      l = new t
    },
    startCommand: function()
    {
      k.changeBg("web_31083.ExportJson");
      k.startBgm("bgm03_story16")
    },
    removeCommand: function() {},
    remove: function(a)
    {
      l ? l.removeFunc(a) : a()
    }
  }
});
