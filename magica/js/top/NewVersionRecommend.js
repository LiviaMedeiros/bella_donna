define("underscore backbone backboneCommon ajaxControl command text!template/top/NewVersionRecommend.html text!css/top/NewVersionRecommend.css".split(" "), function(g, h, b, d, a, k, l)
{
  var f, e, m = h.View.extend(
  {
    events: function()
    {
      var a = {};
      a[b.cgti + " #contactBtn"] = this.contactLink;
      a[b.cgti + " #verUpBtn"] = this.verUpLink;
      return a
    },
    initialize: function(a)
    {
      b.androidKeyStop = !0;
      this.template = g.template(k);
      this.createDom()
    },
    render: function()
    {
      this.$el.html(this.template(d.getPageJson()));
      return this
    },
    createDom: function()
    {
      b.content.append(this.render().el);
      b.doc.getElementById("app_ver").getElementsByTagName("span")[0].textContent = window.app_ver;
      b.doc.getElementById("app_new_ver").getElementsByTagName("span")[0].textContent = f.requiredVersion;
      "DMM" === d.getPageJson().currentPlatform && (b.doc.getElementById("verUpBtn").style.display = "none");
      b.ready.hide()
    },
    verUpLink: function(c)
    {
      c.preventDefault();
      b.isScrolled() || (c = null, b.ua.ios && (c = "https://itunes.apple.com/jp/app/%E3%83%9E%E3%82%AE%E3%82%A2%E3%83%AC%E3%82%B3%E3%83%BC%E3%83%89-%E9%AD%94%E6%B3%95%E5%B0%91%E5%A5%B3%E3%81%BE%E3%81%A9%E3%81%8B%E3%83%9E%E3%82%AE%E3%82%AB%E5%A4%96%E4%BC%9D/id1164785360?l=ja&ls=1&mt=8"), b.ua.android && (c = "https://play.google.com/store/apps/details?id=com.aniplex.magireco"), c && a.browserOpen(c))
    },
    contactLink: function(c)
    {
      c.preventDefault();
      b.isScrolled() || a.browserOpen("https://faq.magireco.com/")
    }
  });
  return {
    needModelIdObj: [
    {
      id: "user",
      refresh: !0
    },
    {
      id: "gameUser",
      refresh: !0
    }],
    fetch: function()
    {
      d.pageModelGet(this.needModelIdObj)
    },
    init: function()
    {
      a.startBgm("bgm00_system01");
      a.changeBg("web_common.ExportJson");
      a.stopMemoriaTop();
      a.endQuest();
      a.endArena();
      a.endL2d();
      a.hideMiniChara();
      a.popEventBranch();
      a.hideSubQuestBg();
      a.popEventSingleRaid();
      a.callTouchesClear();
      a.weekQuestTopUnset();
      a.stopComposeEffect();
      a.turnOffCamera();
      a.stopNormalGachaMemoria();
      a.formationPreviewRemove();
      a.enemyFormationPreviewRemove();
      a.endGachaAnimation();
      a.endPlayMovie();
      f = d.getPageJson();
      b.setStyle(l);
      e = new m;
      b.globalMenuView && b.globalMenuView.removeView();
      b.nativeDownload || a.setWebView();
      b.tutorialUtil && b.tutorialUtil.tutorialRemoveClass()
    },
    remove: function(a)
    {
      e && e.remove();
      a()
    }
  }
});
