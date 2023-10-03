define("underscore backbone backboneCommon ajaxControl command js/view/arena/ArenaBpCureView text!template/arena/ArenaInfoParts.html".split(" "), function(p, q, a, t, v, r, u)
{
  var f;
  return q.View.extend(
  {
    events: function()
    {
      var b = {};
      b[a.cgti + " .bpPlusBtn"] = this.bpCurePop;
      return b
    },
    initialize: function()
    {
      this.model = a.storage.userStatusList.toJSON();
      this.template = p.template(u);
      this.listenTo(this.rootView, "removeView", this.removeView);
      this.listenTo(a.storage.userStatusList, "change", this.checkStatus)
    },
    render: function()
    {
      this.$el.html(this.template(
      {
        model: this.model
      }));
      this.statusSet();
      return this
    },
    bpCurePop: function(b)
    {
      b.preventDefault();
      a.isScrolled() || r.popupStart()
    },
    statusSet: function(b)
    {
      if (a.storage.userStatusList)
      {
        var g, n, d = a.storage.userStatusList.findWhere(
          {
            statusId: "BTP"
          }).toJSON(),
          h, k;
        h = a.storage.userStatusList.findWhere(
        {
          statusId: "MAX_BTP"
        }).toJSON().point;
        k = d.point;
        this.currentTime = b ? b : Date.parse(t.getPageJson().currentTime) / 1E3;
        var l = Date.parse(d.checkedAt) / 1E3 + 60 * d.checkPeriod;
        b = l - this.currentTime;
        var m = this;
        if (-1 > b)
        {
          h = 0;
          g = a.storage.userStatusList.findWhere(
          {
            statusId: "BTP"
          }).toJSON();
          for (n = a.storage.userStatusList.findWhere(
            {
              statusId: "MAX_BTP"
            }).toJSON().point; 0 > b && h + d.point < n;) h++, l += 60 * g.checkPeriod, b = l - m.currentTime;
          var c = new Date(1E3 * (l - 60 * d.checkPeriod));
          k = c.getFullYear();
          b = 10 > c.getMonth() ? "0" + (c.getMonth() + 1) : c.getMonth() + 1;
          var p = 10 > c.getDate() ? "0" + c.getDate() : c.getDate(),
            q = 10 > c.getHours() ? "0" + c.getHours() : c.getHours(),
            r = 10 > c.getMinutes() ? "0" + c.getMinutes() : c.getMinutes(),
            c = 10 > c.getSeconds() ? "0" + c.getSeconds() : c.getSeconds();
          b = k + "/" + b + "/" + p + " " + q + ":" + r + ":" + c;
          k = a.storage.userStatusList.findWhere(
          {
            statusId: "BTP"
          }).toJSON();
          k.point = h + d.point;
          k.checkedAt = b;
          d = a.storage.userStatusList.findWhere(
          {
            statusId: "BTP"
          });
          d.clear(
          {
            silent: !0
          });
          d.set(k);
          d = a.storage.userStatusList.findWhere(
          {
            statusId: "BTP"
          }).toJSON();
          h = a.storage.userStatusList.findWhere(
          {
            statusId: "MAX_BTP"
          }).toJSON().point;
          k = d.point
        }
        h > k ? (a.qureCount = 0, a.qureCountStart = Date.parse(new Date), f = setInterval(function()
        {
          if (a.storage.userStatusList)
            if (a.qureCount = Math.floor((Date.parse(new Date) - a.qureCountStart) / 1E3) | 0, g = a.storage.userStatusList.findWhere(
              {
                statusId: "BTP"
              }).toJSON(), n = a.storage.userStatusList.findWhere(
              {
                statusId: "MAX_BTP"
              }).toJSON().point, g.point < n && a.doc.getElementById("cureRemain"))
            {
              var b = l - m.currentTime - a.qureCount,
                c = b / 60 | 0,
                b = b - 60 * c | 0;
              a.doc.getElementById("cureRemain").textContent = ("0" + c).slice(-2) + ":" + ("0" + b).slice(-2);
              if (!(m.currentTime + a.qureCount < l))
              {
                m.currentTime = l;
                l += 60 * g.checkPeriod;
                a.qureCountStart = Date.parse(new Date);
                var e = new Date(1E3 * m.currentTime),
                  c = e.getFullYear(),
                  b = 10 > e.getMonth() ? "0" + (e.getMonth() + 1) : e.getMonth() + 1,
                  d = 10 > e.getDate() ? "0" + e.getDate() : e.getDate(),
                  h = 10 > e.getHours() ? "0" + e.getHours() : e.getHours(),
                  k = 10 > e.getMinutes() ? "0" + e.getMinutes() : e.getMinutes(),
                  e = 10 > e.getSeconds() ? "0" + e.getSeconds() : e.getSeconds(),
                  b = c + "/" + b + "/" + d + " " + h + ":" + k + ":" + e,
                  c = a.storage.userStatusList.findWhere(
                  {
                    statusId: "BTP"
                  }).toJSON();
                c.point = g.point + g.periodicPoint;
                c.checkedAt = b;
                b = a.storage.userStatusList.findWhere(
                {
                  statusId: "BTP"
                });
                b.clear(
                {
                  silent: !0
                });
                b.set(c)
              }
            }
          else clearInterval(f), a.qureCount = 0, a.qureCountStart = null, f = g = l = m.currentTime = null;
          else clearInterval(f),
            a.qureCount = 0, f = g = l = m.currentTime = null
        }, 1E3)) : (f && clearInterval(f), a.qureCount = 0, a.qureCountStart = null, f = g = l = m.currentTime = null)
      }
    },
    checkStatus: function()
    {
      var b = a.storage.userStatusList.findWhere(
        {
          statusId: "BTP"
        }).toJSON(),
        g = a.storage.userStatusList.findWhere(
        {
          statusId: "MAX_BTP"
        }).toJSON(),
        n = this.el.getElementsByClassName("bpPointWrap")[0].getElementsByTagName("li");
      if (!(4 < this.el.getElementsByClassName("bpPointWrap")[0].getElementsByClassName("on").length))
      {
        for (var d = 0, h = n.length; d < h; d++) b.point > d && a.addClass(n[d], "on");
        b.point >= g.point && (f && clearInterval(f), a.addClass(this.el.getElementsByClassName("bpRemainTime")[0], "off"))
      }
    },
    timerStop: function()
    {
      f && (clearInterval(f), f = null)
    },
    awakeSuspend: function(a)
    {
      clearInterval(f);
      this.statusSet(a)
    },
    afterReload: function(b)
    {
      this.model = a.storage.userStatusList.toJSON();
      this.$el.html(this.template(
      {
        model: this.model
      }));
      this.timerStop();
      this.statusSet(b)
    },
    removeView: function()
    {
      this.timerStop();
      this.off();
      this.remove()
    }
  })
});
