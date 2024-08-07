define("underscore backbone backboneCommon ajaxControl command text!template/top/Maintenance.html text!css/top/Top.css text!json/maintenance/maintenance.json text!template/user/AnnouncePopupTemp.html js/view/system/AnnounceView".split(" "), function(f, g, b, r, a, h, k, l, m, n)
{
  var c, d, e, q = g.View.extend(
  {
    events: function()
    {
      var a = {};
      a[b.cgti + " #openBrowser"] = this.openBrowser;
      a[b.cgti + " #announce"] = this.popupAnnounce;
      a[b.cgti + " .reloadBtn"] = this.reloadFunc;
      return a
    },
    initialize: function(a)
    {
      b.androidKeyStop = !0; - 1 < location.hostname.indexOf("dmm.") && (b.thisPlatform = "DMM");
      this.template = f.template(h);
      this.createDom()
    },
    render: function()
    {
      this.$el.html(this.template(
      {
        model: e
      }));
      return this
    },
    openBrowser: function(p)
    {
      p.preventDefault();
      b.isScrolled() || a.browserOpen("http://magireco.com/")
    },
    popupAnnounce: function(a)
    {
      a.preventDefault();
      b.isScrolled() || (c && c.trigger("removeView"), new b.PopupClass(
      {
        title: "&nbsp;",
        exClass: "announcementPopupMainte"
      }, m), a = 6E4 * ((new Date).getTime() / 6E4 | 0), require(["text!json/announcements/announcements.json?bust=" + a], function(a)
      {
        c = new n(
        {
          announcementJson: a,
          bannerJson: null
        })
      }))
    },
    createDom: function()
    {
      b.content.append(this.render().el);
      b.ready.hide();
      a.setWebView();
      b.tapBlock(!1);
      b.loading.hide()
    },
    reloadFunc: function(c)
    {
      c.preventDefault();
      b.isScrolled() || (160 > (window.app_ver.split(".").join("") | 0) ? (location.href = "#/TopPage", location.reload()) : a.nativeReload("#/TopPage"))
    }
  });
  return {
    init: function()
    {
      a.startBgm("bgm00_system01");
      a.changeBg("web_common.ExportJson");
      a.stopMemoriaTop();
      a.endQuest();
      a.endArena();
      a.endL2d();
      a.hideMiniChara();
      a.hideMultiMiniChara();
      a.popEventBranch();
      a.hideSubQuestBg();
      a.popEventSingleRaid();
      a.deleteEventWitchExchangeAnime();
      a.popEventStoryRaid();
      a.callTouchesClear();
      a.weekQuestTopUnset();
      a.stopComposeEffect();
      a.turnOffCamera();
      a.stopNormalGachaMemoria();
      a.formationPreviewRemove();
      a.enemyFormationPreviewRemove();
      a.endGachaAnimation();
      a.endPlayMovie();
      a.hideEventDungeon();
      a.hideEventRaid();
      a.popEmotionBoard();
      b.tutorialUtil && b.tutorialUtil.tutorialRemoveClass();
      b.setStyle(k);
      e = {};
      e.maintenance = JSON.parse(l);
      d = new q
    },
    remove: function(a)
    {
      c && c.trigger("removeView");
      d && d.remove();
      a()
    }
  }
});
