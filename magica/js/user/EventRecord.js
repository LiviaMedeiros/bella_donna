define("underscore backbone backboneCommon ajaxControl text!template/user/EventRecord.html text!css/user/EventRecord.css command".split(" "), function(f, h, a, g, k, l, m)
{
  var b, d, p = h.View.extend(
    {
      initialize: function(b)
      {
        this.template = f.template(k);
        this.createDom()
      },
      render: function()
      {
        this.$el.html(this.template(b));
        return this
      },
      createDom: function()
      {
        a.content.append(this.render().el);
        0 >= b.groupBattleResultList.length ? a.doc.getElementById("groupBattleResultList").innerHTML = "<p class='noList ts_white'>戦歴がありません</p>" : a.scrollSet("scrollOuter", "scrollInner");
        a.ready.hide()
      }
    }),
    q = function()
    {
      b = g.getPageJson();
      a.setStyle(l);
      var n = [2001, 2002];
      b.groupBattleResultList = [];
      f.each(b.userGroupBattle.allRegularEventList, function(a)
      {
        var c = a.regularEventId;
        if (!(-1 < n.indexOf(c)))
        {
          var d = b.userGroupBattle.totalMap[c],
            c = b.userGroupBattle.dailyMap[c];
          if (d || c)
          {
            var e = {};
            e.eventMaster = a;
            e.total = d ? d :
            {};
            e.daily = c ? c :
            {};
            e.maxDailyDamage = 0;
            c && (e.maxDailyDamage = Math.max.apply(null, c.map(function(a)
            {
              return a.maxDailyDamage
            })));
            b.groupBattleResultList.push(e)
          }
        }
      });
      d = new p
    };
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
      id: "itemList"
    },
    {
      id: "userItemList"
    },
    {
      id: "userPatrolList"
    }],
    startCommand: function()
    {
      m.changeBg("web_common.ExportJson")
    },
    fetch: function()
    {
      g.pageModelGet(this.needModelIdObj)
    },
    init: function()
    {
      a.setGlobalView();
      q()
    },
    remove: function(a)
    {
      d && d.remove();
      a()
    }
  }
});
