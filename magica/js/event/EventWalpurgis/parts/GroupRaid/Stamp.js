define("underscore backbone backboneCommon ajaxControl command text!template/event/EventWalpurgis/Stamp.html text!js/event/EventWalpurgis/json/stamp/list.json text!js/event/EventWalpurgis/json/stamp/commentList.json js/event/EventWalpurgis/Model".split(" "), function(f, p, d, r, x, y, z, A, B)
{
  var l, e, t, q, b = {},
    h = !1,
    g;
  r = p.View.extend(
  {
    events: function()
    {
      var a = {};
      a[d.cgti + " #stampBtn"] = this.tapStampBtn;
      return a
    },
    initialize: function(a)
    {
      l = a.model;
      e = a._views;
      t = a.getIsStampDisp;
      q = a.setIsStampDisp;
      this.template = f.template(y);
      b = {}
    },
    render: function()
    {
      this.$el.html(this.template(
      {
        model: l
      }));
      return this
    },
    tapStampBtn: function(a)
    {
      a.preventDefault();
      if (!d.isScrolled() && !t())
      {
        q(!0);
        e.ListView = new C(
        {
          model:
          {}
        });
        $("#stampSec").append(e.ListView.render().el);
        a = JSON.parse(z);
        f.each(a.stampList, function(a, c, b)
        {
          e["stampItemAll" + c] = new u(
          {
            model:
            {
              img: a
            }
          });
          $("#stampListMainWrapSec .stampListAllSec").append(e["stampItemAll" + c].render().el)
        });
        d.scrollSet("stampListMainWrapSec", "stampListAllSec");
        if (a = localStorage.getItem("eventWalpurgisUsedStampList"))
        {
          $("#stampListMainWrapSec .stampListUsedSec").empty();
          var c = a.split(",");
          f.each(c, function(a, c, b)
          {
            e["stampItemUsed" + c] = new u(
            {
              model:
              {
                img: a
              }
            });
            $("#stampListMainWrapSec .stampListUsedSec").append(e["stampItemUsed" + c].render().el)
          });
          10 < c.length && d.scrollSet("stampListMainWrapSec", "stampListUsedSec")
        }
        var m = localStorage.getItem("eventWalpurgisUsedComment"),
          c = JSON.parse(A);
        $("#commentSec .commentSelect").append('<option value="0">▼ コメントを選ぶ</option>');
        f.each(c.commentList, function(a, c, b)
        {
          c = "";
          m == a && (c = "selected");
          a = '<option value="' + a + '" ' + c + ">" + a + "</option>";
          $("#commentSec .commentSelect").append(a)
        });
        m && (b.comment = m, $("#dispSelected").html(m));
        n(
        {
          tabType: "all"
        });
        a && n(
        {
          tabType: "used"
        });
        a = d.getDateShortening(
        {
          date: new Date
        });
        D(
        {
          currentTime: a.yr + "/" + a.mo + "/" + a.da + " " + a.ho + ":" + a.mi + ":" + a.se
        })
      }
    },
    removeView: function()
    {
      g && g.stop();
      this.off();
      this.remove()
    }
  });
  var C = p.View.extend(
    {
      className: "stampListWrapperSec",
      events: function()
      {
        var a = {};
        a["animationend #stampListSec"] = this.removeStampList;
        a[d.cgti + " #closeBtn"] = this.tapCloseBtn;
        a[d.cgti + " #usedStampBtn"] = this.tapUsedStampBtn;
        a[d.cgti + " #allStampBtn"] = this.tapAllStampBtn;
        a[d.cgti + " #sendBtn"] = this.tapSendBtn;
        a["change .commentSelect"] = this.changeCommentSelect;
        return a
      },
      initialize: function(a)
      {
        l = a.model;
        this.template = f.template($("#tempStampList").text())
      },
      render: function()
      {
        this.$el.html(this.template(
        {
          model: l
        }));
        return this
      },
      tapCloseBtn: function(a)
      {
        a.preventDefault();
        d.isScrolled() || v(
        {})
      },
      tapUsedStampBtn: function(a)
      {
        a.preventDefault();
        d.isScrolled() || n(
        {
          tabType: "used"
        })
      },
      tapAllStampBtn: function(a)
      {
        a.preventDefault();
        d.isScrolled() || n(
        {
          tabType: "all"
        })
      },
      changeCommentSelect: function(a)
      {
        a.preventDefault();
        if (!d.isScrolled())
        {
          var c = a.currentTarget.value;
          0 == Number(c) && (c = "▼ コメントを選ぶ");
          $("#dispSelected").html(c);
          b.comment = a.currentTarget.value;
          k(
          {})
        }
      },
      tapSendBtn: function(a)
      {
        a.preventDefault();
        d.isScrolled() || h && b.stampId && b.comment && "0" != b.comment && B.sendStampInfo(
        {
          prm: b,
          callback: function(a)
          {
            (a = localStorage.getItem("eventWalpurgisUsedStampList")) ? b.stampId == a ? localStorage.setItem("eventWalpurgisUsedStampList", b.stampId) : (-1 != a.indexOf(b.stampId) && (a = a.replace(b.stampId + ",", ""), a = a.replace("," + b.stampId, "")), localStorage.setItem("eventWalpurgisUsedStampList", b.stampId + "," + a)): localStorage.setItem("eventWalpurgisUsedStampList", b.stampId);
            localStorage.setItem("eventWalpurgisUsedComment", b.comment);
            a = d.getDateShortening(
            {
              date: new Date
            });
            localStorage.setItem("eventWalpurgisStampSendTime", a.yr + "/" + a.mo + "/" + a.da + " " + a.ho + ":" + a.mi + ":" + a.se);
            v(
            {})
          }
        })
      },
      removeStampList: function()
      {
        -1 != $("#stampListSec").attr("class").indexOf("hide") && (q(!1), b = {}, $(".stampListWrapperSec").remove())
      },
      removeView: function()
      {
        b = {};
        this.off();
        this.remove()
      }
    }),
    u = p.View.extend(
    {
      tagName: "li",
      className: "stampImgSec",
      events: function()
      {
        var a = {};
        a[d.cgti + " .selectSec"] = this.tapStamp;
        return a
      },
      initialize: function(a)
      {
        this.template = f.template($("#tempStampItem").text())
      },
      render: function()
      {
        this.$el.html(this.template(
        {
          model: this.model
        }));
        return this
      },
      tapStamp: function(a)
      {
        a.preventDefault();
        if (!d.isScrolled())
        {
          var c = a.currentTarget.dataset.id;
          w();
          $(a.currentTarget).addClass("selected");
          b.stampId = c;
          k(
          {})
        }
      },
      removeView: function()
      {
        this.off();
        this.remove()
      }
    }),
    n = function(a)
    {
      a = a.tabType;
      $(".typeBtn").removeClass("on");
      $("#stampListMainWrapSec").removeClass();
      w();
      var c = "#usedStampBtn",
        b = "onUsed",
        e = "stampListUsedSec";
      "all" == a && (c = "#allStampBtn", b = "onAll", e = "stampListAllSec");
      $(c).addClass("on");
      $("#stampListMainWrapSec").addClass(b);
      d.scrollRefresh("stampListMainWrapSec", e)
    },
    w = function()
    {
      $(".selectSec").removeClass("selected");
      b.stampId = null;
      k(
      {})
    },
    v = function()
    {
      $("#stampListSec").removeClass("show");
      $("#stampListSec").addClass("hide");
      x.startSe(1003)
    },
    k = function()
    {
      h ? b.stampId && b.comment && "0" != b.comment ? $("#sendBtn").removeClass("off") : ($("#sendBtn").addClass("off"), $("#sendBtn").addClass("passTime")) : ($("#sendBtn").addClass("off"), $("#sendBtn").removeClass("passTime"))
    },
    D = function(a)
    {
      a = a.currentTime;
      var b = localStorage.getItem("eventWalpurgisStampSendTime");
      h = !1;
      b ? (b = d.getAddDate(
      {
        date: b,
        amount: 60,
        type: "seconds"
      }), g && g.stop(), g = d.countDownTimerManager(
      {
        currentTime: a,
        endTime: b,
        isOnlyS: !0,
        setSelector: "#sendBtn .countdown",
        callback: function()
        {
          h = !0;
          k()
        }
      }), g.start()) : h = !0;
      k()
    };
  return r
});
