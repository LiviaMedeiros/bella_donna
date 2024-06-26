define("underscore backbone backboneCommon ajaxControl command text!template/mission/PanelMissionTop.html text!css/mission/PanelMissionTop.css js/view/item/ItemImgPartsView".split(" "), function(f, k, a, l, c, n, p, q)
{
  k.Model.extend();
  var h, d, r = k.View.extend(
    {
      events: function()
      {
        return {}
      },
      initialize: function(a)
      {
        m.prototype.rootView = this;
        this.template = f.template(n);
        this.createDom()
      },
      render: function()
      {
        this.$el.html(this.template(
        {
          panelId: d.id,
          lastMission: d.missionList[9]
        }));
        return this
      },
      createDom: function()
      {
        a.setGlobalView();
        a.content.append(this.render().el);
        this.createView();
        c.getBaseData(a.getNativeObj());
        c.endL2d();
        var b = {
          key: "502200",
          type: 1,
          id: "0",
          x: 160
        };
        b.y = 1024 === a.displayWidth ? Math.floor(a.doc.getElementsByTagName("body")[0].offsetHeight / 2) : Math.ceil(a.shortSize / 2);
        c.startL2d(b);
        a.ready.hide()
      },
      createView: function()
      {
        this.partsTemp = f.template($("#missionParts").text());
        for (var b = 0; 9 > b; b++)
        {
          var c = new m(
          {
            model: d.missionList[b]
          });
          a.doc.getElementById("panelWrapInner").appendChild(c.render().el)
        }
        b = d.missionList[9];
        b.isLast = !0;
        b = new m(
        {
          model: b
        });
        a.doc.getElementById("lastMision").appendChild(b.render().el);
        if (d.requiredGroupId)
        {
          var b = f.findWhere(a.panelMissionList,
            {
              id: d.requiredGroupId | 0
            }),
            c = !0,
            e = b.missionList.length;
          for (console.log("_require", b); 0 < e;) e--, b.missionList[e].receivedAt || (c = !1);
          this.notRequired = !1;
          c || (this.notRequired = !0, b = a.doc.getElementsByClassName("missionBtn"), f.forEach(b, function(b, c)
          {
            console.log("dom", b);
            a.addClass(b, "disable")
          }))
        }
        this.trigger("allCheck");
        this.trigger("lastCheck")
      }
    }),
    g = !1,
    m = k.View.extend(
    {
      className: "missionWrap",
      events: function()
      {
        var b = {};
        b[a.cgti + " .missionBtn"] = this.btnFunc;
        return b
      },
      initialize: function(a)
      {
        this.listenTo(this.rootView, "removeView", this.removeView);
        this.listenTo(this.rootView, "allCheck", this.allCheck);
        this.model.isLast && this.listenTo(this.rootView, "lastCheck", this.lastCheck)
      },
      render: function()
      {
        var a = this.model;
        this.$el.html(this.rootView.partsTemp(
        {
          model: a
        }));
        this.itemImgPartsView = new q(
        {
          model: a.challenge.rewardList[0],
          type: a.challenge.rewardList[0].presentType
        });
        this.el.appendChild(this.itemImgPartsView.render().el);
        return this
      },
      allCheck: function()
      {
        if (!this.model.isLast)
        {
          var b = a.storage.userLimitedChallengeList.findWhere(
          {
            challengeId: this.model.challengeId
          });
          b.toJSON().receivedAt && (this.model.receivedAt = b.toJSON().receivedAt);
          b.toJSON().clearedCount && (this.model.clearedCount = b.toJSON().clearedCount);
          this.model.receivedAt ? (a.addClass(this.el.getElementsByClassName("missionBtn")[0], "received"), a.addClass(this.el, "complete")) : this.model.clearedCount >= this.model.challenge.count && a.addClass(this.el.getElementsByClassName("missionBtn")[0], "clear")
        }
      },
      lastCheck: function()
      {
        if (this.model.isLast)
        {
          var b = a.storage.userLimitedChallengeList.findWhere(
          {
            challengeId: this.model.challengeId
          });
          b.toJSON().receivedAt && (this.model.receivedAt = b.toJSON().receivedAt);
          b.toJSON().clearedCount && (this.model.clearedCount = b.toJSON().clearedCount);
          this.render();
          this.rootView.notRequired && a.addClass(this.el.getElementsByClassName("missionBtn")[0], "disable");
          this.model.isLast && (a.doc.getElementById("panelWrapInner").getElementsByClassName("missionBtn received"), this.model.receivedAt ? (a.addClass(this.el.getElementsByClassName("missionBtn")[0], "received"), a.addClassId("lastMision", "clear"), a.addClassId("titleInfo", "hide")) : this.model.clearedCount >= this.model.challenge.count && (a.addClass(this.el.getElementsByClassName("missionBtn")[0], "clear"), a.addClassId("lastMision", "clear"), a.addClassId("titleInfo", "hide")))
        }
      },
      btnFunc: function(b)
      {
        b.preventDefault();
        a.isScrolled() || (b.currentTarget.classList.contains("clear") ? this.receive() : this.model.challenge.pageLink && (location.href = this.model.challenge.pageLink))
      },
      receive: function()
      {
        if (!g)
        {
          g = !0;
          var b = function()
            {
              this.rootView.trigger("allCheck");
              this.rootView.trigger("lastCheck")
            }.bind(this),
            d = this,
            e = function(e)
            {
              a.responseSetStorage(e);
              g = !1;
              d.model.isLast ? ($(".itemPetal1").on("webkitAnimationStart", function()
              {
                $(".itemPetal1").off();
                c.startSe(1701)
              }), $(".itemPetal2").on("webkitAnimationEnd", function()
              {
                $(".itemPetal2").off();
                $("#campaignAnimationWrap").on(a.cgti, function(d)
                {
                  d && (d.preventDefault(), a.isScrolled() || ($("#campaignAnimationWrap").off(), c.startSe(1002), $("#campaignAnimationWrap").on("webkitAnimationEnd", function()
                  {
                    $("#campaignAnimationWrap").off();
                    a.tapBlock(!1);
                    a.removeClass(a.doc.getElementById("campaignAnimationWrap"), "anim");
                    a.removeClass(a.doc.getElementById("campaignAnimationWrap"), "fadeOut");
                    new a.PopupClass(
                    {
                      content: "ミッション報酬を1件受け取りました。<br><br>※魔法少女はプレゼントボックスよりお受け取りください。<br>※受け取ったアイテムは直接付与されています。",
                      closeBtnText: "OK",
                      popupType: "typeC",
                      exClass: "missionPop"
                    }, null, null, b)
                  }), a.addClass(a.doc.getElementById("campaignAnimationWrap"), "fadeOut")))
                });
                a.tapBlock(!1)
              }), a.addClass(a.doc.getElementById("campaignAnimationWrap"), "anim")) : new a.PopupClass(
              {
                content: "ミッション報酬を1件受け取りました。<br><br>※魔法少女はプレゼントボックスよりお受け取りください。<br>※受け取ったアイテムは直接付与されています。",
                closeBtnText: "OK",
                popupType: "typeC",
                exClass: "missionPop"
              }, null, null, b)
            };
          window.isBrowser && window.isLocal ? e() : l.ajaxPost(a.linkList.userLimitedChallengeReceive,
          {
            challengeId: this.model.challengeId
          }, e)
        }
      },
      removeView: function()
      {
        this.itemImgPartsView && this.itemImgPartsView.removeView();
        this.off();
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
      id: "userItemList"
    },
    {
      id: "userStatusList"
    },
    {
      id: "userPatrolList"
    }],
    fetch: function(b)
    {
      b && a.panelMissionList ? (d = f.findWhere(a.panelMissionList,
      {
        id: b | 0
      }), l.pageModelGet(this.needModelIdObj)) : location.href = "#/MissionTop"
    },
    init: function()
    {
      a.historyArr = ["MyPage", "MissionTop"];
      g = !1;
      a.setStyle(p);
      l.getPageJson();
      h = new r
    },
    startCommand: function()
    {
      c.changeBg("web_0018.ExportJson");
      c.startBgm(a.settingBgm)
    },
    remove: function(a)
    {
      g = !1;
      d = null;
      c.endL2d();
      h && (h.trigger("removeView"), h.remove());
      a()
    }
  }
});
