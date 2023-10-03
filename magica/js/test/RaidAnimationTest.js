define("underscore backbone backboneCommon ajaxControl command text!../../template/test/RaidAnimationTest.html text!css/test/RaidAnimationTest.css".split(" "), function(g, h, a, k, e, l, m)
{
  var f, t = function()
    {
      var c = h.View.extend(
      {
        events: function()
        {
          var b = {};
          b[a.cgti + " .animStart"] = this.setRaidAnimation;
          b[a.cgti + " .doppelAnimStart"] = this.doppelAnimation;
          return b
        },
        initialize: function(a)
        {
          this.template = g.template(l);
          this.createDom()
        },
        render: function()
        {
          this.$el.html(this.template(
          {}));
          return this
        },
        createDom: function()
        {
          a.content.append(this.render().el);
          a.setGlobalView();
          n();
          p();
          a.ready.hide()
        },
        setRaidAnimation: function(c)
        {
          c.preventDefault();
          a.isScrolled() || q()
        },
        doppelAnimation: function(c)
        {
          c.preventDefault();
          a.isScrolled() || r()
        },
        removeView: function()
        {
          this.off();
          this.remove()
        }
      });
      a.setStyle(m);
      f = new c
    },
    n = function()
    {
      var a = "circle_05.png raid_mission_star_01.png raid_mission_star_01.png raid_mission_tx04.png raid_mission_tx03.png raid_mission_tx02.png raid_mission_tx01.png raid_mission_flag_02_a.png raid_mission_flag_01_a.png circle_06.png raid_mission_star_02.png".split(" "),
        b = function()
        {
          var c = a[0],
            d = new Image;
          d.src = "/magica/resource/image_web/event/singleraid/common/animation/" + c;
          d.onload = function()
          {
            a.shift();
            0 < a.length && b()
          }
        };
      b()
    },
    q = function(c)
    {
      a.androidKeyStop = !0;
      a.tapBlock(!0);
      var b = $("#raidAnimationTemp").text();
      a.doc.getElementById("overlapContainer").innerHTML += b;
      $("#missionClearMaskBg").on("webkitAnimationEnd", function()
      {
        $("#missionClearMaskBg").off();
        e.startSe(1603)
      });
      $(".raidStar01_1").on("webkitAnimationEnd", function()
      {
        $(".raidStar01_1").off();
        a.tapBlock(!1);
        $(".raidAnimationDom").on(a.cgti, function(b)
        {
          b.preventDefault();
          a.isScrolled() || (a.tapBlock(!0), a.androidKeyStop = !0, $(".raidAnimationDom").off(), a.addClass(a.doc.getElementById("overlapContainer").getElementsByClassName("raidAnimationDom")[0], "allAnimationFadeOut"), $(".animDoms").on("webkitAnimationEnd", function()
          {
            $(".animDoms").off();
            a.doc.getElementById("overlapContainer").innerHTML = '<div id="curtain"></div>';
            c ? c() : (a.androidKeyStop = !1, a.tapBlock(!1))
          }))
        })
      })
    },
    p = function()
    {
      var a = ["anim_title.png", "anim_complete.png", "anim_doppel_mark.png"],
        b = function()
        {
          var c = a[0],
            d = new Image;
          d.src = "/magica/resource/image_web/page/mission/doppelMission/common/" + c;
          d.onload = function()
          {
            a.shift();
            0 < a.length && b()
          }
        };
      b()
    },
    r = function(c)
    {
      a.androidKeyStop = !0;
      a.tapBlock(!0);
      var b = $("#doppelMissionAnimTemp").text();
      a.doc.getElementById("overlapContainer").innerHTML += b;
      $("#missionClearMaskBg").on("webkitAnimationEnd", function()
      {
        $("#missionClearMaskBg").off();
        e.startSe(1603)
      });
      $(".animMark").on("webkitAnimationEnd", function()
      {
        $(".animMark").off();
        a.tapBlock(!1);
        $(".doppelMissionAnimationDom").on(a.cgti, function(b)
        {
          b.preventDefault();
          a.isScrolled() || (a.tapBlock(!0), a.androidKeyStop = !0, $(".doppelMissionAnimationDom").off(), a.addClass(a.doc.getElementById("overlapContainer").getElementsByClassName("doppelMissionAnimationDom")[0], "allAnimationFadeOut"), $(".animDoms").on("webkitAnimationEnd", function()
          {
            $(".animDoms").off();
            a.androidKeyStop = !1;
            a.tapBlock(!0);
            a.doc.getElementById("overlapContainer").innerHTML = '<div id="curtain"></div>';
            c ? c() : (a.androidKeyStop = !1, a.tapBlock(!1))
          }))
        })
      })
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
      id: "userItemList"
    }],
    fetch: function(a, b)
    {
      k.pageModelGet(this.needModelIdObj)
    },
    init: function()
    {
      t()
    },
    startCommand: function()
    {
      e.changeBg("web_0011.ExportJson")
    },
    remove: function(a)
    {
      f.removeView();
      a()
    }
  }
});
