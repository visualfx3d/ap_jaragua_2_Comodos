(function(){
    var script = {
 "scrollBarVisible": "rollOver",
 "data": {
  "name": "Player7533"
 },
 "class": "Player",
 "children": [
  "this.MainViewer",
  "this.MapViewer",
  "this.Container_F0FB7EC7_E4EE_5375_41DE_E8AFA242BCDC",
  "this.Container_C143FBBC_E571_D11A_41C7_2D68CD2F6918",
  "this.HTMLText_F47F2DC0_FA45_7AE7_41E0_406528D874BE"
 ],
 "id": "rootPlayer",
 "backgroundPreloadEnabled": true,
 "paddingRight": 0,
 "scripts": {
  "visibleComponentsIfPlayerFlagEnabled": function(components, playerFlag){  var enabled = this.get(playerFlag); for(var i in components){ components[i].set('visible', enabled); } },
  "getMediaFromPlayer": function(player){  switch(player.get('class')){ case 'PanoramaPlayer': return player.get('panorama') || player.get('video'); case 'VideoPlayer': case 'Video360Player': return player.get('video'); case 'PhotoAlbumPlayer': return player.get('photoAlbum'); case 'MapPlayer': return player.get('map'); } },
  "isCardboardViewMode": function(){  var players = this.getByClassName('PanoramaPlayer'); return players.length > 0 && players[0].get('viewMode') == 'cardboard'; },
  "showWindow": function(w, autoCloseMilliSeconds, containsAudio){  if(w.get('visible') == true){ return; } var closeFunction = function(){ clearAutoClose(); this.resumePlayers(playersPaused, !containsAudio); w.unbind('close', closeFunction, this); }; var clearAutoClose = function(){ w.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ w.hide(); }; w.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } var playersPaused = this.pauseCurrentPlayers(!containsAudio); w.bind('close', closeFunction, this); w.show(this, true); },
  "shareWhatsapp": function(url){  window.open('https://api.whatsapp.com/send/?text=' + encodeURIComponent(url), '_blank'); },
  "getMediaHeight": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxH=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('height') > maxH) maxH = r.get('height'); } return maxH; }else{ return r.get('height') } default: return media.get('height'); } },
  "shareTwitter": function(url){  window.open('https://twitter.com/intent/tweet?source=webclient&url=' + url, '_blank'); },
  "showPopupMedia": function(w, media, playList, popupMaxWidth, popupMaxHeight, autoCloseWhenFinished, stopAudios){  var self = this; var closeFunction = function(){ playList.set('selectedIndex', -1); self.MainViewer.set('toolTipEnabled', true); if(stopAudios) { self.resumeGlobalAudios(); } this.resumePlayers(playersPaused, !stopAudios); if(isVideo) { this.unbind('resize', resizeFunction, this); } w.unbind('close', closeFunction, this); }; var endFunction = function(){ w.hide(); }; var resizeFunction = function(){ var getWinValue = function(property){ return w.get(property) || 0; }; var parentWidth = self.get('actualWidth'); var parentHeight = self.get('actualHeight'); var mediaWidth = self.getMediaWidth(media); var mediaHeight = self.getMediaHeight(media); var popupMaxWidthNumber = parseFloat(popupMaxWidth) / 100; var popupMaxHeightNumber = parseFloat(popupMaxHeight) / 100; var windowWidth = popupMaxWidthNumber * parentWidth; var windowHeight = popupMaxHeightNumber * parentHeight; var footerHeight = getWinValue('footerHeight'); var headerHeight = getWinValue('headerHeight'); if(!headerHeight) { var closeButtonHeight = getWinValue('closeButtonIconHeight') + getWinValue('closeButtonPaddingTop') + getWinValue('closeButtonPaddingBottom'); var titleHeight = self.getPixels(getWinValue('titleFontSize')) + getWinValue('titlePaddingTop') + getWinValue('titlePaddingBottom'); headerHeight = closeButtonHeight > titleHeight ? closeButtonHeight : titleHeight; headerHeight += getWinValue('headerPaddingTop') + getWinValue('headerPaddingBottom'); } var contentWindowWidth = windowWidth - getWinValue('bodyPaddingLeft') - getWinValue('bodyPaddingRight') - getWinValue('paddingLeft') - getWinValue('paddingRight'); var contentWindowHeight = windowHeight - headerHeight - footerHeight - getWinValue('bodyPaddingTop') - getWinValue('bodyPaddingBottom') - getWinValue('paddingTop') - getWinValue('paddingBottom'); var parentAspectRatio = contentWindowWidth / contentWindowHeight; var mediaAspectRatio = mediaWidth / mediaHeight; if(parentAspectRatio > mediaAspectRatio) { windowWidth = contentWindowHeight * mediaAspectRatio + getWinValue('bodyPaddingLeft') + getWinValue('bodyPaddingRight') + getWinValue('paddingLeft') + getWinValue('paddingRight'); } else { windowHeight = contentWindowWidth / mediaAspectRatio + headerHeight + footerHeight + getWinValue('bodyPaddingTop') + getWinValue('bodyPaddingBottom') + getWinValue('paddingTop') + getWinValue('paddingBottom'); } if(windowWidth > parentWidth * popupMaxWidthNumber) { windowWidth = parentWidth * popupMaxWidthNumber; } if(windowHeight > parentHeight * popupMaxHeightNumber) { windowHeight = parentHeight * popupMaxHeightNumber; } w.set('width', windowWidth); w.set('height', windowHeight); w.set('x', (parentWidth - getWinValue('actualWidth')) * 0.5); w.set('y', (parentHeight - getWinValue('actualHeight')) * 0.5); }; if(autoCloseWhenFinished){ this.executeFunctionWhenChange(playList, 0, endFunction); } var mediaClass = media.get('class'); var isVideo = mediaClass == 'Video' || mediaClass == 'Video360'; playList.set('selectedIndex', 0); if(isVideo){ this.bind('resize', resizeFunction, this); resizeFunction(); playList.get('items')[0].get('player').play(); } else { w.set('width', popupMaxWidth); w.set('height', popupMaxHeight); } this.MainViewer.set('toolTipEnabled', false); if(stopAudios) { this.pauseGlobalAudios(); } var playersPaused = this.pauseCurrentPlayers(!stopAudios); w.bind('close', closeFunction, this); w.show(this, true); },
  "initGA": function(){  var sendFunc = function(category, event, label) { ga('send', 'event', category, event, label); }; var media = this.getByClassName('Panorama'); media = media.concat(this.getByClassName('Video360')); media = media.concat(this.getByClassName('Map')); for(var i = 0, countI = media.length; i<countI; ++i){ var m = media[i]; var mediaLabel = m.get('label'); var overlays = this.getOverlays(m); for(var j = 0, countJ = overlays.length; j<countJ; ++j){ var overlay = overlays[j]; var overlayLabel = overlay.get('data') != undefined ? mediaLabel + ' - ' + overlay.get('data')['label'] : mediaLabel; switch(overlay.get('class')) { case 'HotspotPanoramaOverlay': case 'HotspotMapOverlay': var areas = overlay.get('areas'); for (var z = 0; z<areas.length; ++z) { areas[z].bind('click', sendFunc.bind(this, 'Hotspot', 'click', overlayLabel), this); } break; case 'CeilingCapPanoramaOverlay': case 'TripodCapPanoramaOverlay': overlay.bind('click', sendFunc.bind(this, 'Cap', 'click', overlayLabel), this); break; } } } var components = this.getByClassName('Button'); components = components.concat(this.getByClassName('IconButton')); for(var i = 0, countI = components.length; i<countI; ++i){ var c = components[i]; var componentLabel = c.get('data')['name']; c.bind('click', sendFunc.bind(this, 'Skin', 'click', componentLabel), this); } var items = this.getByClassName('PlayListItem'); var media2Item = {}; for(var i = 0, countI = items.length; i<countI; ++i) { var item = items[i]; var media = item.get('media'); if(!(media.get('id') in media2Item)) { item.bind('begin', sendFunc.bind(this, 'Media', 'play', media.get('label')), this); media2Item[media.get('id')] = item; } } },
  "showComponentsWhileMouseOver": function(parentComponent, components, durationVisibleWhileOut){  var setVisibility = function(visible){ for(var i = 0, length = components.length; i<length; i++){ var component = components[i]; if(component.get('class') == 'HTMLText' && (component.get('html') == '' || component.get('html') == undefined)) { continue; } component.set('visible', visible); } }; if (this.rootPlayer.get('touchDevice') == true){ setVisibility(true); } else { var timeoutID = -1; var rollOverFunction = function(){ setVisibility(true); if(timeoutID >= 0) clearTimeout(timeoutID); parentComponent.unbind('rollOver', rollOverFunction, this); parentComponent.bind('rollOut', rollOutFunction, this); }; var rollOutFunction = function(){ var timeoutFunction = function(){ setVisibility(false); parentComponent.unbind('rollOver', rollOverFunction, this); }; parentComponent.unbind('rollOut', rollOutFunction, this); parentComponent.bind('rollOver', rollOverFunction, this); timeoutID = setTimeout(timeoutFunction, durationVisibleWhileOut); }; parentComponent.bind('rollOver', rollOverFunction, this); } },
  "updateMediaLabelFromPlayList": function(playList, htmlText, playListItemStopToDispose){  var changeFunction = function(){ var index = playList.get('selectedIndex'); if(index >= 0){ var beginFunction = function(){ playListItem.unbind('begin', beginFunction); setMediaLabel(index); }; var setMediaLabel = function(index){ var media = playListItem.get('media'); var text = media.get('data'); if(!text) text = media.get('label'); setHtml(text); }; var setHtml = function(text){ if(text !== undefined) { htmlText.set('html', '<div style=\"text-align:left\"><SPAN STYLE=\"color:#FFFFFF;font-size:12px;font-family:Verdana\"><span color=\"white\" font-family=\"Verdana\" font-size=\"12px\">' + text + '</SPAN></div>'); } else { htmlText.set('html', ''); } }; var playListItem = playList.get('items')[index]; if(htmlText.get('html')){ setHtml('Loading...'); playListItem.bind('begin', beginFunction); } else{ setMediaLabel(index); } } }; var disposeFunction = function(){ htmlText.set('html', undefined); playList.unbind('change', changeFunction, this); playListItemStopToDispose.unbind('stop', disposeFunction, this); }; if(playListItemStopToDispose){ playListItemStopToDispose.bind('stop', disposeFunction, this); } playList.bind('change', changeFunction, this); changeFunction(); },
  "getMediaByName": function(name){  var list = this.getByClassName('Media'); for(var i = 0, count = list.length; i<count; ++i){ var media = list[i]; if((media.get('class') == 'Audio' && media.get('data').label == name) || media.get('label') == name){ return media; } } return undefined; },
  "updateVideoCues": function(playList, index){  var playListItem = playList.get('items')[index]; var video = playListItem.get('media'); if(video.get('cues').length == 0) return; var player = playListItem.get('player'); var cues = []; var changeFunction = function(){ if(playList.get('selectedIndex') != index){ video.unbind('cueChange', cueChangeFunction, this); playList.unbind('change', changeFunction, this); } }; var cueChangeFunction = function(event){ var activeCues = event.data.activeCues; for(var i = 0, count = cues.length; i<count; ++i){ var cue = cues[i]; if(activeCues.indexOf(cue) == -1 && (cue.get('startTime') > player.get('currentTime') || cue.get('endTime') < player.get('currentTime')+0.5)){ cue.trigger('end'); } } cues = activeCues; }; video.bind('cueChange', cueChangeFunction, this); playList.bind('change', changeFunction, this); },
  "setCameraSameSpotAsMedia": function(camera, media){  var player = this.getCurrentPlayerWithMedia(media); if(player != undefined) { var position = camera.get('initialPosition'); position.set('yaw', player.get('yaw')); position.set('pitch', player.get('pitch')); position.set('hfov', player.get('hfov')); } },
  "getGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios != undefined && audio.get('id') in audios){ audio = audios[audio.get('id')]; } return audio; },
  "openLink": function(url, name){  if(url == location.href) { return; } var isElectron = (window && window.process && window.process.versions && window.process.versions['electron']) || (navigator && navigator.userAgent && navigator.userAgent.indexOf('Electron') >= 0); if (name == '_blank' && isElectron) { if (url.startsWith('/')) { var r = window.location.href.split('/'); r.pop(); url = r.join('/') + url; } var extension = url.split('.').pop().toLowerCase(); if(extension != 'pdf' || url.startsWith('file://')) { var shell = window.require('electron').shell; shell.openExternal(url); } else { window.open(url, name); } } else if(isElectron && (name == '_top' || name == '_self')) { window.location = url; } else { var newWindow = window.open(url, name); newWindow.focus(); } },
  "fixTogglePlayPauseButton": function(player){  var state = player.get('state'); var buttons = player.get('buttonPlayPause'); if(typeof buttons !== 'undefined' && player.get('state') == 'playing'){ if(!Array.isArray(buttons)) buttons = [buttons]; for(var i = 0; i<buttons.length; ++i) buttons[i].set('pressed', true); } },
  "shareFacebook": function(url){  window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, '_blank'); },
  "stopGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; if(audio){ delete audios[audio.get('id')]; if(Object.keys(audios).length == 0){ window.currentGlobalAudios = undefined; } } } if(audio) audio.stop(); },
  "setComponentVisibility": function(component, visible, applyAt, effect, propertyEffect, ignoreClearTimeout){  var keepVisibility = this.getKey('keepVisibility_' + component.get('id')); if(keepVisibility) return; this.unregisterKey('visibility_'+component.get('id')); var changeVisibility = function(){ if(effect && propertyEffect){ component.set(propertyEffect, effect); } component.set('visible', visible); if(component.get('class') == 'ViewerArea'){ try{ if(visible) component.restart(); else if(component.get('playbackState') == 'playing') component.pause(); } catch(e){}; } }; var effectTimeoutName = 'effectTimeout_'+component.get('id'); if(!ignoreClearTimeout && window.hasOwnProperty(effectTimeoutName)){ var effectTimeout = window[effectTimeoutName]; if(effectTimeout instanceof Array){ for(var i=0; i<effectTimeout.length; i++){ clearTimeout(effectTimeout[i]) } }else{ clearTimeout(effectTimeout); } delete window[effectTimeoutName]; } else if(visible == component.get('visible') && !ignoreClearTimeout) return; if(applyAt && applyAt > 0){ var effectTimeout = setTimeout(function(){ if(window[effectTimeoutName] instanceof Array) { var arrayTimeoutVal = window[effectTimeoutName]; var index = arrayTimeoutVal.indexOf(effectTimeout); arrayTimeoutVal.splice(index, 1); if(arrayTimeoutVal.length == 0){ delete window[effectTimeoutName]; } }else{ delete window[effectTimeoutName]; } changeVisibility(); }, applyAt); if(window.hasOwnProperty(effectTimeoutName)){ window[effectTimeoutName] = [window[effectTimeoutName], effectTimeout]; }else{ window[effectTimeoutName] = effectTimeout; } } else{ changeVisibility(); } },
  "setStartTimeVideoSync": function(video, player){  this.setStartTimeVideo(video, player.get('currentTime')); },
  "resumeGlobalAudios": function(caller){  if (window.pauseGlobalAudiosState == undefined || !(caller in window.pauseGlobalAudiosState)) return; var audiosPaused = window.pauseGlobalAudiosState[caller]; delete window.pauseGlobalAudiosState[caller]; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = audiosPaused.length-1; j>=0; --j) { var a = audiosPaused[j]; if(objAudios.indexOf(a) != -1) audiosPaused.splice(j, 1); } } for (var i = 0, count = audiosPaused.length; i<count; ++i) { var a = audiosPaused[i]; if (a.get('state') == 'paused') a.play(); } },
  "getCurrentPlayers": function(){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); return players; },
  "showPopupPanoramaOverlay": function(popupPanoramaOverlay, closeButtonProperties, imageHD, toggleImage, toggleImageHD, autoCloseMilliSeconds, audio, stopBackgroundAudio){  var self = this; this.MainViewer.set('toolTipEnabled', false); var cardboardEnabled = this.isCardboardViewMode(); if(!cardboardEnabled) { var zoomImage = this.zoomImagePopupPanorama; var showDuration = popupPanoramaOverlay.get('showDuration'); var hideDuration = popupPanoramaOverlay.get('hideDuration'); var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); var popupMaxWidthBackup = popupPanoramaOverlay.get('popupMaxWidth'); var popupMaxHeightBackup = popupPanoramaOverlay.get('popupMaxHeight'); var showEndFunction = function() { var loadedFunction = function(){ if(!self.isCardboardViewMode()) popupPanoramaOverlay.set('visible', false); }; popupPanoramaOverlay.unbind('showEnd', showEndFunction, self); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', 1); self.showPopupImage(imageHD, toggleImageHD, popupPanoramaOverlay.get('popupMaxWidth'), popupPanoramaOverlay.get('popupMaxHeight'), null, null, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedFunction, hideFunction); }; var hideFunction = function() { var restoreShowDurationFunction = function(){ popupPanoramaOverlay.unbind('showEnd', restoreShowDurationFunction, self); popupPanoramaOverlay.set('visible', false); popupPanoramaOverlay.set('showDuration', showDuration); popupPanoramaOverlay.set('popupMaxWidth', popupMaxWidthBackup); popupPanoramaOverlay.set('popupMaxHeight', popupMaxHeightBackup); }; self.resumePlayers(playersPaused, audio == null || !stopBackgroundAudio); var currentWidth = zoomImage.get('imageWidth'); var currentHeight = zoomImage.get('imageHeight'); popupPanoramaOverlay.bind('showEnd', restoreShowDurationFunction, self, true); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', hideDuration); popupPanoramaOverlay.set('popupMaxWidth', currentWidth); popupPanoramaOverlay.set('popupMaxHeight', currentHeight); if(popupPanoramaOverlay.get('visible')) restoreShowDurationFunction(); else popupPanoramaOverlay.set('visible', true); self.MainViewer.set('toolTipEnabled', true); }; if(!imageHD){ imageHD = popupPanoramaOverlay.get('image'); } if(!toggleImageHD && toggleImage){ toggleImageHD = toggleImage; } popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); } else { var hideEndFunction = function() { self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } popupPanoramaOverlay.unbind('hideEnd', hideEndFunction, self); self.MainViewer.set('toolTipEnabled', true); }; var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } popupPanoramaOverlay.bind('hideEnd', hideEndFunction, this, true); } popupPanoramaOverlay.set('visible', true); },
  "resumePlayers": function(players, onlyResumeCameraIfPanorama){  for(var i = 0; i<players.length; ++i){ var player = players[i]; if(onlyResumeCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.resumeCamera(); } else{ player.play(); } } },
  "historyGoForward": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.forward(); } },
  "triggerOverlay": function(overlay, eventName){  if(overlay.get('areas') != undefined) { var areas = overlay.get('areas'); for(var i = 0; i<areas.length; ++i) { areas[i].trigger(eventName); } } else { overlay.trigger(eventName); } },
  "setStartTimeVideo": function(video, time){  var items = this.getPlayListItems(video); var startTimeBackup = []; var restoreStartTimeFunc = function() { for(var i = 0; i<items.length; ++i){ var item = items[i]; item.set('startTime', startTimeBackup[i]); item.unbind('stop', restoreStartTimeFunc, this); } }; for(var i = 0; i<items.length; ++i) { var item = items[i]; var player = item.get('player'); if(player.get('video') == video && player.get('state') == 'playing') { player.seek(time); } else { startTimeBackup.push(item.get('startTime')); item.set('startTime', time); item.bind('stop', restoreStartTimeFunc, this); } } },
  "historyGoBack": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.back(); } },
  "syncPlaylists": function(playLists){  var changeToMedia = function(media, playListDispatched){ for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(playList != playListDispatched){ var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ if(items[j].get('media') == media){ if(playList.get('selectedIndex') != j){ playList.set('selectedIndex', j); } break; } } } } }; var changeFunction = function(event){ var playListDispatched = event.source; var selectedIndex = playListDispatched.get('selectedIndex'); if(selectedIndex < 0) return; var media = playListDispatched.get('items')[selectedIndex].get('media'); changeToMedia(media, playListDispatched); }; var mapPlayerChangeFunction = function(event){ var panoramaMapLocation = event.source.get('panoramaMapLocation'); if(panoramaMapLocation){ var map = panoramaMapLocation.get('map'); changeToMedia(map); } }; for(var i = 0, count = playLists.length; i<count; ++i){ playLists[i].bind('change', changeFunction, this); } var mapPlayers = this.getByClassName('MapPlayer'); for(var i = 0, count = mapPlayers.length; i<count; ++i){ mapPlayers[i].bind('panoramaMapLocation_change', mapPlayerChangeFunction, this); } },
  "playGlobalAudio": function(audio, endCallback){  var endFunction = function(){ audio.unbind('end', endFunction, this); this.stopGlobalAudio(audio); if(endCallback) endCallback(); }; audio = this.getGlobalAudio(audio); var audios = window.currentGlobalAudios; if(!audios){ audios = window.currentGlobalAudios = {}; } audios[audio.get('id')] = audio; if(audio.get('state') == 'playing'){ return audio; } if(!audio.get('loop')){ audio.bind('end', endFunction, this); } audio.play(); return audio; },
  "setPanoramaCameraWithSpot": function(playListItem, yaw, pitch){  var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); var initialPosition = newCamera.get('initialPosition'); initialPosition.set('yaw', yaw); initialPosition.set('pitch', pitch); this.startPanoramaWithCamera(panorama, newCamera); },
  "getPlayListItems": function(media, player){  var itemClass = (function() { switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': return 'PanoramaPlayListItem'; case 'Video360': return 'Video360PlayListItem'; case 'PhotoAlbum': return 'PhotoAlbumPlayListItem'; case 'Map': return 'MapPlayListItem'; case 'Video': return 'VideoPlayListItem'; } })(); if (itemClass != undefined) { var items = this.getByClassName(itemClass); for (var i = items.length-1; i>=0; --i) { var item = items[i]; if(item.get('media') != media || (player != undefined && item.get('player') != player)) { items.splice(i, 1); } } return items; } else { return []; } },
  "init": function(){  if(!Object.hasOwnProperty('values')) { Object.values = function(o){ return Object.keys(o).map(function(e) { return o[e]; }); }; } var history = this.get('data')['history']; var playListChangeFunc = function(e){ var playList = e.source; var index = playList.get('selectedIndex'); if(index < 0) return; var id = playList.get('id'); if(!history.hasOwnProperty(id)) history[id] = new HistoryData(playList); history[id].add(index); }; var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i) { var playList = playLists[i]; playList.bind('change', playListChangeFunc, this); } },
  "setPanoramaCameraWithCurrentSpot": function(playListItem){  var currentPlayer = this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer == undefined){ return; } var playerClass = currentPlayer.get('class'); if(playerClass != 'PanoramaPlayer' && playerClass != 'Video360Player'){ return; } var fromMedia = currentPlayer.get('panorama'); if(fromMedia == undefined) { fromMedia = currentPlayer.get('video'); } var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, fromMedia); this.startPanoramaWithCamera(panorama, newCamera); },
  "getPixels": function(value){  var result = new RegExp('((\\+|\\-)?\\d+(\\.\\d*)?)(px|vw|vh|vmin|vmax)?', 'i').exec(value); if (result == undefined) { return 0; } var num = parseFloat(result[1]); var unit = result[4]; var vw = this.rootPlayer.get('actualWidth') / 100; var vh = this.rootPlayer.get('actualHeight') / 100; switch(unit) { case 'vw': return num * vw; case 'vh': return num * vh; case 'vmin': return num * Math.min(vw, vh); case 'vmax': return num * Math.max(vw, vh); default: return num; } },
  "getCurrentPlayerWithMedia": function(media){  var playerClass = undefined; var mediaPropertyName = undefined; switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'panorama'; break; case 'Video360': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'video'; break; case 'PhotoAlbum': playerClass = 'PhotoAlbumPlayer'; mediaPropertyName = 'photoAlbum'; break; case 'Map': playerClass = 'MapPlayer'; mediaPropertyName = 'map'; break; case 'Video': playerClass = 'VideoPlayer'; mediaPropertyName = 'video'; break; }; if(playerClass != undefined) { var players = this.getByClassName(playerClass); for(var i = 0; i<players.length; ++i){ var player = players[i]; if(player.get(mediaPropertyName) == media) { return player; } } } else { return undefined; } },
  "playGlobalAudioWhilePlay": function(playList, index, audio, endCallback){  var changeFunction = function(event){ if(event.data.previousSelectedIndex == index){ this.stopGlobalAudio(audio); if(isPanorama) { var media = playListItem.get('media'); var audios = media.get('audios'); audios.splice(audios.indexOf(audio), 1); media.set('audios', audios); } playList.unbind('change', changeFunction, this); if(endCallback) endCallback(); } }; var audios = window.currentGlobalAudios; if(audios && audio.get('id') in audios){ audio = audios[audio.get('id')]; if(audio.get('state') != 'playing'){ audio.play(); } return audio; } playList.bind('change', changeFunction, this); var playListItem = playList.get('items')[index]; var isPanorama = playListItem.get('class') == 'PanoramaPlayListItem'; if(isPanorama) { var media = playListItem.get('media'); var audios = (media.get('audios') || []).slice(); if(audio.get('class') == 'MediaAudio') { var panoramaAudio = this.rootPlayer.createInstance('PanoramaAudio'); panoramaAudio.set('autoplay', false); panoramaAudio.set('audio', audio.get('audio')); panoramaAudio.set('loop', audio.get('loop')); panoramaAudio.set('id', audio.get('id')); var stateChangeFunctions = audio.getBindings('stateChange'); for(var i = 0; i<stateChangeFunctions.length; ++i){ var f = stateChangeFunctions[i]; if(typeof f == 'string') f = new Function('event', f); panoramaAudio.bind('stateChange', f, this); } audio = panoramaAudio; } audios.push(audio); media.set('audios', audios); } return this.playGlobalAudio(audio, endCallback); },
  "getPlayListItemByMedia": function(playList, media){  var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media) return item; } return undefined; },
  "getPlayListWithMedia": function(media, onlySelected){  var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(onlySelected && playList.get('selectedIndex') == -1) continue; if(this.getPlayListItemByMedia(playList, media) != undefined) return playList; } return undefined; },
  "getActivePlayerWithViewer": function(viewerArea){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); players = players.concat(this.getByClassName('MapPlayer')); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('viewerArea') == viewerArea) { var playerClass = player.get('class'); if(playerClass == 'PanoramaPlayer' && (player.get('panorama') != undefined || player.get('video') != undefined)) return player; else if((playerClass == 'VideoPlayer' || playerClass == 'Video360Player') && player.get('video') != undefined) return player; else if(playerClass == 'PhotoAlbumPlayer' && player.get('photoAlbum') != undefined) return player; else if(playerClass == 'MapPlayer' && player.get('map') != undefined) return player; } } return undefined; },
  "playAudioList": function(audios){  if(audios.length == 0) return; var currentAudioCount = -1; var currentAudio; var playGlobalAudioFunction = this.playGlobalAudio; var playNext = function(){ if(++currentAudioCount >= audios.length) currentAudioCount = 0; currentAudio = audios[currentAudioCount]; playGlobalAudioFunction(currentAudio, playNext); }; playNext(); },
  "stopAndGoCamera": function(camera, ms){  var sequence = camera.get('initialSequence'); sequence.pause(); var timeoutFunction = function(){ sequence.play(); }; setTimeout(timeoutFunction, ms); },
  "pauseGlobalAudios": function(caller, exclude){  if (window.pauseGlobalAudiosState == undefined) window.pauseGlobalAudiosState = {}; if (window.pauseGlobalAudiosList == undefined) window.pauseGlobalAudiosList = []; if (caller in window.pauseGlobalAudiosState) { return; } var audios = this.getByClassName('Audio').concat(this.getByClassName('VideoPanoramaOverlay')); if (window.currentGlobalAudios != undefined) audios = audios.concat(Object.values(window.currentGlobalAudios)); var audiosPaused = []; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = 0; j<objAudios.length; ++j) { var a = objAudios[j]; if(audiosPaused.indexOf(a) == -1) audiosPaused.push(a); } } window.pauseGlobalAudiosState[caller] = audiosPaused; for (var i = 0, count = audios.length; i < count; ++i) { var a = audios[i]; if (a.get('state') == 'playing' && (exclude == undefined || exclude.indexOf(a) == -1)) { a.pause(); audiosPaused.push(a); } } },
  "setOverlayBehaviour": function(overlay, media, action){  var executeFunc = function() { switch(action){ case 'triggerClick': this.triggerOverlay(overlay, 'click'); break; case 'stop': case 'play': case 'pause': overlay[action](); break; case 'togglePlayPause': case 'togglePlayStop': if(overlay.get('state') == 'playing') overlay[action == 'togglePlayPause' ? 'pause' : 'stop'](); else overlay.play(); break; } if(window.overlaysDispatched == undefined) window.overlaysDispatched = {}; var id = overlay.get('id'); window.overlaysDispatched[id] = true; setTimeout(function(){ delete window.overlaysDispatched[id]; }, 2000); }; if(window.overlaysDispatched != undefined && overlay.get('id') in window.overlaysDispatched) return; var playList = this.getPlayListWithMedia(media, true); if(playList != undefined){ var item = this.getPlayListItemByMedia(playList, media); if(playList.get('items').indexOf(item) != playList.get('selectedIndex')){ var beginFunc = function(e){ item.unbind('begin', beginFunc, this); executeFunc.call(this); }; item.bind('begin', beginFunc, this); return; } } executeFunc.call(this); },
  "startPanoramaWithCamera": function(media, camera){  if(window.currentPanoramasWithCameraChanged != undefined && window.currentPanoramasWithCameraChanged.indexOf(media) != -1){ return; } var playLists = this.getByClassName('PlayList'); if(playLists.length == 0) return; var restoreItems = []; for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media && (item.get('class') == 'PanoramaPlayListItem' || item.get('class') == 'Video360PlayListItem')){ restoreItems.push({camera: item.get('camera'), item: item}); item.set('camera', camera); } } } if(restoreItems.length > 0) { if(window.currentPanoramasWithCameraChanged == undefined) { window.currentPanoramasWithCameraChanged = [media]; } else { window.currentPanoramasWithCameraChanged.push(media); } var restoreCameraOnStop = function(){ var index = window.currentPanoramasWithCameraChanged.indexOf(media); if(index != -1) { window.currentPanoramasWithCameraChanged.splice(index, 1); } for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.set('camera', restoreItems[i].camera); restoreItems[i].item.unbind('stop', restoreCameraOnStop, this); } }; for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.bind('stop', restoreCameraOnStop, this); } } },
  "pauseGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; } if(audio.get('state') == 'playing') audio.pause(); },
  "executeFunctionWhenChange": function(playList, index, endFunction, changeFunction){  var endObject = undefined; var changePlayListFunction = function(event){ if(event.data.previousSelectedIndex == index){ if(changeFunction) changeFunction.call(this); if(endFunction && endObject) endObject.unbind('end', endFunction, this); playList.unbind('change', changePlayListFunction, this); } }; if(endFunction){ var playListItem = playList.get('items')[index]; if(playListItem.get('class') == 'PanoramaPlayListItem'){ var camera = playListItem.get('camera'); if(camera != undefined) endObject = camera.get('initialSequence'); if(endObject == undefined) endObject = camera.get('idleSequence'); } else{ endObject = playListItem.get('media'); } if(endObject){ endObject.bind('end', endFunction, this); } } playList.bind('change', changePlayListFunction, this); },
  "showPopupPanoramaVideoOverlay": function(popupPanoramaOverlay, closeButtonProperties, stopAudios){  var self = this; var showEndFunction = function() { popupPanoramaOverlay.unbind('showEnd', showEndFunction); closeButton.bind('click', hideFunction, this); setCloseButtonPosition(); closeButton.set('visible', true); }; var endFunction = function() { if(!popupPanoramaOverlay.get('loop')) hideFunction(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); popupPanoramaOverlay.set('visible', false); closeButton.set('visible', false); closeButton.unbind('click', hideFunction, self); popupPanoramaOverlay.unbind('end', endFunction, self); popupPanoramaOverlay.unbind('hideEnd', hideFunction, self, true); self.resumePlayers(playersPaused, true); if(stopAudios) { self.resumeGlobalAudios(); } }; var setCloseButtonPosition = function() { var right = 10; var top = 10; closeButton.set('right', right); closeButton.set('top', top); }; this.MainViewer.set('toolTipEnabled', false); var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(true); if(stopAudios) { this.pauseGlobalAudios(); } popupPanoramaOverlay.bind('end', endFunction, this, true); popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); popupPanoramaOverlay.bind('hideEnd', hideFunction, this, true); popupPanoramaOverlay.set('visible', true); },
  "pauseGlobalAudiosWhilePlayItem": function(playList, index, exclude){  var self = this; var item = playList.get('items')[index]; var media = item.get('media'); var player = item.get('player'); var caller = media.get('id'); var endFunc = function(){ if(playList.get('selectedIndex') != index) { if(hasState){ player.unbind('stateChange', stateChangeFunc, self); } self.resumeGlobalAudios(caller); } }; var stateChangeFunc = function(event){ var state = event.data.state; if(state == 'stopped'){ this.resumeGlobalAudios(caller); } else if(state == 'playing'){ this.pauseGlobalAudios(caller, exclude); } }; var mediaClass = media.get('class'); var hasState = mediaClass == 'Video360' || mediaClass == 'Video'; if(hasState){ player.bind('stateChange', stateChangeFunc, this); } this.pauseGlobalAudios(caller, exclude); this.executeFunctionWhenChange(playList, index, endFunc, endFunc); },
  "cloneCamera": function(camera){  var newCamera = this.rootPlayer.createInstance(camera.get('class')); newCamera.set('id', camera.get('id') + '_copy'); newCamera.set('idleSequence', camera.get('initialSequence')); return newCamera; },
  "pauseCurrentPlayers": function(onlyPauseCameraIfPanorama){  var players = this.getCurrentPlayers(); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('state') == 'playing') { if(onlyPauseCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.pauseCamera(); } else { player.pause(); } } else { players.splice(i, 1); } } return players; },
  "changePlayListWithSameSpot": function(playList, newIndex){  var currentIndex = playList.get('selectedIndex'); if (currentIndex >= 0 && newIndex >= 0 && currentIndex != newIndex) { var currentItem = playList.get('items')[currentIndex]; var newItem = playList.get('items')[newIndex]; var currentPlayer = currentItem.get('player'); var newPlayer = newItem.get('player'); if ((currentPlayer.get('class') == 'PanoramaPlayer' || currentPlayer.get('class') == 'Video360Player') && (newPlayer.get('class') == 'PanoramaPlayer' || newPlayer.get('class') == 'Video360Player')) { var newCamera = this.cloneCamera(newItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, currentItem.get('media')); this.startPanoramaWithCamera(newItem.get('media'), newCamera); } } },
  "existsKey": function(key){  return key in window; },
  "setMediaBehaviour": function(playList, index, mediaDispatcher){  var self = this; var stateChangeFunction = function(event){ if(event.data.state == 'stopped'){ dispose.call(this, true); } }; var onBeginFunction = function() { item.unbind('begin', onBeginFunction, self); var media = item.get('media'); if(media.get('class') != 'Panorama' || (media.get('camera') != undefined && media.get('camera').get('initialSequence') != undefined)){ player.bind('stateChange', stateChangeFunction, self); } }; var changeFunction = function(){ var index = playListDispatcher.get('selectedIndex'); if(index != -1){ indexDispatcher = index; dispose.call(this, false); } }; var disposeCallback = function(){ dispose.call(this, false); }; var dispose = function(forceDispose){ if(!playListDispatcher) return; var media = item.get('media'); if((media.get('class') == 'Video360' || media.get('class') == 'Video') && media.get('loop') == true && !forceDispose) return; playList.set('selectedIndex', -1); if(panoramaSequence && panoramaSequenceIndex != -1){ if(panoramaSequence) { if(panoramaSequenceIndex > 0 && panoramaSequence.get('movements')[panoramaSequenceIndex-1].get('class') == 'TargetPanoramaCameraMovement'){ var initialPosition = camera.get('initialPosition'); var oldYaw = initialPosition.get('yaw'); var oldPitch = initialPosition.get('pitch'); var oldHfov = initialPosition.get('hfov'); var previousMovement = panoramaSequence.get('movements')[panoramaSequenceIndex-1]; initialPosition.set('yaw', previousMovement.get('targetYaw')); initialPosition.set('pitch', previousMovement.get('targetPitch')); initialPosition.set('hfov', previousMovement.get('targetHfov')); var restoreInitialPositionFunction = function(event){ initialPosition.set('yaw', oldYaw); initialPosition.set('pitch', oldPitch); initialPosition.set('hfov', oldHfov); itemDispatcher.unbind('end', restoreInitialPositionFunction, this); }; itemDispatcher.bind('end', restoreInitialPositionFunction, this); } panoramaSequence.set('movementIndex', panoramaSequenceIndex); } } if(player){ item.unbind('begin', onBeginFunction, this); player.unbind('stateChange', stateChangeFunction, this); for(var i = 0; i<buttons.length; ++i) { buttons[i].unbind('click', disposeCallback, this); } } if(sameViewerArea){ var currentMedia = this.getMediaFromPlayer(player); if(currentMedia == undefined || currentMedia == item.get('media')){ playListDispatcher.set('selectedIndex', indexDispatcher); } if(playList != playListDispatcher) playListDispatcher.unbind('change', changeFunction, this); } else{ viewerArea.set('visible', viewerVisibility); } playListDispatcher = undefined; }; var mediaDispatcherByParam = mediaDispatcher != undefined; if(!mediaDispatcher){ var currentIndex = playList.get('selectedIndex'); var currentPlayer = (currentIndex != -1) ? playList.get('items')[playList.get('selectedIndex')].get('player') : this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer) { mediaDispatcher = this.getMediaFromPlayer(currentPlayer); } } var playListDispatcher = mediaDispatcher ? this.getPlayListWithMedia(mediaDispatcher, true) : undefined; if(!playListDispatcher){ playList.set('selectedIndex', index); return; } var indexDispatcher = playListDispatcher.get('selectedIndex'); if(playList.get('selectedIndex') == index || indexDispatcher == -1){ return; } var item = playList.get('items')[index]; var itemDispatcher = playListDispatcher.get('items')[indexDispatcher]; var player = item.get('player'); var viewerArea = player.get('viewerArea'); var viewerVisibility = viewerArea.get('visible'); var sameViewerArea = viewerArea == itemDispatcher.get('player').get('viewerArea'); if(sameViewerArea){ if(playList != playListDispatcher){ playListDispatcher.set('selectedIndex', -1); playListDispatcher.bind('change', changeFunction, this); } } else{ viewerArea.set('visible', true); } var panoramaSequenceIndex = -1; var panoramaSequence = undefined; var camera = itemDispatcher.get('camera'); if(camera){ panoramaSequence = camera.get('initialSequence'); if(panoramaSequence) { panoramaSequenceIndex = panoramaSequence.get('movementIndex'); } } playList.set('selectedIndex', index); var buttons = []; var addButtons = function(property){ var value = player.get(property); if(value == undefined) return; if(Array.isArray(value)) buttons = buttons.concat(value); else buttons.push(value); }; addButtons('buttonStop'); for(var i = 0; i<buttons.length; ++i) { buttons[i].bind('click', disposeCallback, this); } if(player != itemDispatcher.get('player') || !mediaDispatcherByParam){ item.bind('begin', onBeginFunction, self); } this.executeFunctionWhenChange(playList, index, disposeCallback); },
  "setMainMediaByName": function(name){  var items = this.mainPlayList.get('items'); for(var i = 0; i<items.length; ++i){ var item = items[i]; if(item.get('media').get('label') == name) { this.mainPlayList.set('selectedIndex', i); return item; } } },
  "changeBackgroundWhilePlay": function(playList, index, color){  var stopFunction = function(event){ playListItem.unbind('stop', stopFunction, this); if((color == viewerArea.get('backgroundColor')) && (colorRatios == viewerArea.get('backgroundColorRatios'))){ viewerArea.set('backgroundColor', backgroundColorBackup); viewerArea.set('backgroundColorRatios', backgroundColorRatiosBackup); } }; var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var viewerArea = player.get('viewerArea'); var backgroundColorBackup = viewerArea.get('backgroundColor'); var backgroundColorRatiosBackup = viewerArea.get('backgroundColorRatios'); var colorRatios = [0]; if((color != backgroundColorBackup) || (colorRatios != backgroundColorRatiosBackup)){ viewerArea.set('backgroundColor', color); viewerArea.set('backgroundColorRatios', colorRatios); playListItem.bind('stop', stopFunction, this); } },
  "getKey": function(key){  return window[key]; },
  "loadFromCurrentMediaPlayList": function(playList, delta){  var currentIndex = playList.get('selectedIndex'); var totalItems = playList.get('items').length; var newIndex = (currentIndex + delta) % totalItems; while(newIndex < 0){ newIndex = totalItems + newIndex; }; if(currentIndex != newIndex){ playList.set('selectedIndex', newIndex); } },
  "setMainMediaByIndex": function(index){  var item = undefined; if(index >= 0 && index < this.mainPlayList.get('items').length){ this.mainPlayList.set('selectedIndex', index); item = this.mainPlayList.get('items')[index]; } return item; },
  "unregisterKey": function(key){  delete window[key]; },
  "getComponentByName": function(name){  var list = this.getByClassName('UIComponent'); for(var i = 0, count = list.length; i<count; ++i){ var component = list[i]; var data = component.get('data'); if(data != undefined && data.name == name){ return component; } } return undefined; },
  "getPanoramaOverlayByName": function(panorama, name){  var overlays = this.getOverlays(panorama); for(var i = 0, count = overlays.length; i<count; ++i){ var overlay = overlays[i]; var data = overlay.get('data'); if(data != undefined && data.label == name){ return overlay; } } return undefined; },
  "loopAlbum": function(playList, index){  var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var loopFunction = function(){ player.play(); }; this.executeFunctionWhenChange(playList, index, loopFunction); },
  "setMapLocation": function(panoramaPlayListItem, mapPlayer){  var resetFunction = function(){ panoramaPlayListItem.unbind('stop', resetFunction, this); player.set('mapPlayer', null); }; panoramaPlayListItem.bind('stop', resetFunction, this); var player = panoramaPlayListItem.get('player'); player.set('mapPlayer', mapPlayer); },
  "registerKey": function(key, value){  window[key] = value; },
  "getOverlays": function(media){  switch(media.get('class')){ case 'Panorama': var overlays = media.get('overlays').concat() || []; var frames = media.get('frames'); for(var j = 0; j<frames.length; ++j){ overlays = overlays.concat(frames[j].get('overlays') || []); } return overlays; case 'Video360': case 'Map': return media.get('overlays') || []; default: return []; } },
  "setEndToItemIndex": function(playList, fromIndex, toIndex){  var endFunction = function(){ if(playList.get('selectedIndex') == fromIndex) playList.set('selectedIndex', toIndex); }; this.executeFunctionWhenChange(playList, fromIndex, endFunction); },
  "autotriggerAtStart": function(playList, callback, once){  var onChange = function(event){ callback(); if(once == true) playList.unbind('change', onChange, this); }; playList.bind('change', onChange, this); },
  "showPopupImage": function(image, toggleImage, customWidth, customHeight, showEffect, hideEffect, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedCallback, hideCallback){  var self = this; var closed = false; var playerClickFunction = function() { zoomImage.unbind('loaded', loadedFunction, self); hideFunction(); }; var clearAutoClose = function(){ zoomImage.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var resizeFunction = function(){ setTimeout(setCloseButtonPosition, 0); }; var loadedFunction = function(){ self.unbind('click', playerClickFunction, self); veil.set('visible', true); setCloseButtonPosition(); closeButton.set('visible', true); zoomImage.unbind('loaded', loadedFunction, this); zoomImage.bind('userInteractionStart', userInteractionStartFunction, this); zoomImage.bind('userInteractionEnd', userInteractionEndFunction, this); zoomImage.bind('resize', resizeFunction, this); timeoutID = setTimeout(timeoutFunction, 200); }; var timeoutFunction = function(){ timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ hideFunction(); }; zoomImage.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } zoomImage.bind('backgroundClick', hideFunction, this); if(toggleImage) { zoomImage.bind('click', toggleFunction, this); zoomImage.set('imageCursor', 'hand'); } closeButton.bind('click', hideFunction, this); if(loadedCallback) loadedCallback(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); closed = true; if(timeoutID) clearTimeout(timeoutID); if (timeoutUserInteractionID) clearTimeout(timeoutUserInteractionID); if(autoCloseMilliSeconds) clearAutoClose(); if(hideCallback) hideCallback(); zoomImage.set('visible', false); if(hideEffect && hideEffect.get('duration') > 0){ hideEffect.bind('end', endEffectFunction, this); } else{ zoomImage.set('image', null); } closeButton.set('visible', false); veil.set('visible', false); self.unbind('click', playerClickFunction, self); zoomImage.unbind('backgroundClick', hideFunction, this); zoomImage.unbind('userInteractionStart', userInteractionStartFunction, this); zoomImage.unbind('userInteractionEnd', userInteractionEndFunction, this, true); zoomImage.unbind('resize', resizeFunction, this); if(toggleImage) { zoomImage.unbind('click', toggleFunction, this); zoomImage.set('cursor', 'default'); } closeButton.unbind('click', hideFunction, this); self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } }; var endEffectFunction = function() { zoomImage.set('image', null); hideEffect.unbind('end', endEffectFunction, this); }; var toggleFunction = function() { zoomImage.set('image', isToggleVisible() ? image : toggleImage); }; var isToggleVisible = function() { return zoomImage.get('image') == toggleImage; }; var setCloseButtonPosition = function() { var right = zoomImage.get('actualWidth') - zoomImage.get('imageLeft') - zoomImage.get('imageWidth') + 10; var top = zoomImage.get('imageTop') + 10; if(right < 10) right = 10; if(top < 10) top = 10; closeButton.set('right', right); closeButton.set('top', top); }; var userInteractionStartFunction = function() { if(timeoutUserInteractionID){ clearTimeout(timeoutUserInteractionID); timeoutUserInteractionID = undefined; } else{ closeButton.set('visible', false); } }; var userInteractionEndFunction = function() { if(!closed){ timeoutUserInteractionID = setTimeout(userInteractionTimeoutFunction, 300); } }; var userInteractionTimeoutFunction = function() { timeoutUserInteractionID = undefined; closeButton.set('visible', true); setCloseButtonPosition(); }; this.MainViewer.set('toolTipEnabled', false); var veil = this.veilPopupPanorama; var zoomImage = this.zoomImagePopupPanorama; var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } var timeoutID = undefined; var timeoutUserInteractionID = undefined; zoomImage.bind('loaded', loadedFunction, this); setTimeout(function(){ self.bind('click', playerClickFunction, self, false); }, 0); zoomImage.set('image', image); zoomImage.set('customWidth', customWidth); zoomImage.set('customHeight', customHeight); zoomImage.set('showEffect', showEffect); zoomImage.set('hideEffect', hideEffect); zoomImage.set('visible', true); return zoomImage; },
  "getMediaWidth": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxW=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('width') > maxW) maxW = r.get('width'); } return maxW; }else{ return r.get('width') } default: return media.get('width'); } },
  "keepComponentVisibility": function(component, keep){  var key = 'keepVisibility_' + component.get('id'); var value = this.getKey(key); if(value == undefined && keep) { this.registerKey(key, keep); } else if(value != undefined && !keep) { this.unregisterKey(key); } }
 },
 "defaultVRPointer": "laser",
 "contentOpaque": false,
 "paddingLeft": 0,
 "paddingBottom": 0,
 "buttonToggleFullscreen": "this.Button_F0FB6EC7_E4EE_5375_41E4_BF58E8BED9C0",
 "verticalAlign": "top",
 "width": "100%",
 "scrollBarMargin": 2,
 "minHeight": 20,
 "borderRadius": 0,
 "downloadEnabled": true,
 "propagateClick": false,
 "borderSize": 0,
 "minWidth": 20,
 "creationPolicy": "inAdvance",
 "scrollBarWidth": 10,
 "overflow": "visible",
 "definitions": [{
 "items": [
  "this.PanoramaPlayListItem_E3382D22_FA43_DBAB_41E3_9D5BE4D89F76",
  "this.PanoramaPlayListItem_E327DD22_FA43_DBAB_41D2_236B8B35B4B7",
  "this.PanoramaPlayListItem_E3274D23_FA43_DBA9_41E5_16DF5EE9CBAD",
  "this.PanoramaPlayListItem_E3261D23_FA43_DBA9_41EA_1B964C1C45FE",
  "this.PanoramaPlayListItem_E3259D24_FA43_DBAF_41DD_71804F35CE15",
  "this.PanoramaPlayListItem_E3256D24_FA43_DBAF_41E8_7B5056A93602",
  "this.PanoramaPlayListItem_E3243D25_FA43_DBA9_41D1_776DCB88C7C1",
  "this.PanoramaPlayListItem_E3238D25_FA43_DBA9_41BA_A96BDF4DECE5",
  "this.PanoramaPlayListItem_E3235D26_FA43_DBAB_41D6_0B78799BBA4F"
 ],
 "id": "mainPlayList",
 "class": "PlayList"
},
{
 "thumbnailUrl": "media/panorama_CA0D2937_DB90_5C1F_41C1_3A22D6FAEAF2_t.jpg",
 "partial": false,
 "label": "05",
 "class": "Panorama",
 "frames": [
  {
   "thumbnailUrl": "media/panorama_CA0D2937_DB90_5C1F_41C1_3A22D6FAEAF2_t.jpg",
   "front": {
    "levels": [
     {
      "url": "media/panorama_CA0D2937_DB90_5C1F_41C1_3A22D6FAEAF2_0/f/0/{row}_{column}.jpg",
      "colCount": 3,
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_CA0D2937_DB90_5C1F_41C1_3A22D6FAEAF2_0/f/1/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CA0D2937_DB90_5C1F_41C1_3A22D6FAEAF2_0/f/2/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_CA0D2937_DB90_5C1F_41C1_3A22D6FAEAF2_0/u/0/{row}_{column}.jpg",
      "colCount": 3,
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_CA0D2937_DB90_5C1F_41C1_3A22D6FAEAF2_0/u/1/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CA0D2937_DB90_5C1F_41C1_3A22D6FAEAF2_0/u/2/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_CA0D2937_DB90_5C1F_41C1_3A22D6FAEAF2_0/r/0/{row}_{column}.jpg",
      "colCount": 3,
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_CA0D2937_DB90_5C1F_41C1_3A22D6FAEAF2_0/r/1/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CA0D2937_DB90_5C1F_41C1_3A22D6FAEAF2_0/r/2/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_CA0D2937_DB90_5C1F_41C1_3A22D6FAEAF2_0/b/0/{row}_{column}.jpg",
      "colCount": 3,
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_CA0D2937_DB90_5C1F_41C1_3A22D6FAEAF2_0/b/1/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CA0D2937_DB90_5C1F_41C1_3A22D6FAEAF2_0/b/2/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_CA0D2937_DB90_5C1F_41C1_3A22D6FAEAF2_0/d/0/{row}_{column}.jpg",
      "colCount": 3,
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_CA0D2937_DB90_5C1F_41C1_3A22D6FAEAF2_0/d/1/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CA0D2937_DB90_5C1F_41C1_3A22D6FAEAF2_0/d/2/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_CA0D2937_DB90_5C1F_41C1_3A22D6FAEAF2_0/l/0/{row}_{column}.jpg",
      "colCount": 3,
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_CA0D2937_DB90_5C1F_41C1_3A22D6FAEAF2_0/l/1/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CA0D2937_DB90_5C1F_41C1_3A22D6FAEAF2_0/l/2/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "id": "panorama_CA0D2937_DB90_5C1F_41C1_3A22D6FAEAF2",
 "cardboardMenu": "this.Menu_E3217D28_FA43_DBA7_41D4_EC8E3D3D5334",
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_CBFBDDCD_DB91_D473_41BC_ACAA1C31DBB5",
   "yaw": 129.66,
   "class": "AdjacentPanorama",
   "backwardYaw": -15.85,
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 120,
 "mapLocations": [
  {
   "map": "this.map_EC81520A_E266_EAB5_41E5_A93A73CA8842",
   "x": 106.46,
   "angle": -16.14,
   "y": 100.78,
   "class": "PanoramaMapLocation"
  }
 ],
 "overlays": [
  "this.overlay_CA0D0937_DB90_5C1F_41C4_B64349792813",
  "this.overlay_CA0DE937_DB90_5C1F_41B7_36194306DD6E",
  "this.overlay_F0A3B908_E00E_CF5C_41BE_951744098ED8"
 ],
 "hfov": 360,
 "pitch": 0
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 106.97,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_E025EECE_FA43_D6FB_41E5_91089EB92FD2",
 "automaticZoomSpeed": 10
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -26.59,
  "pitch": 0,
  "hfov": 70
 },
 "id": "camera_E003EE87_FA43_D969_41E0_BE71931D7FC8",
 "automaticZoomSpeed": 10
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 76.91,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_E040FDFB_FA43_DA99_41EE_D90A416C4E79",
 "automaticZoomSpeed": 10
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -97.9,
  "pitch": 0,
  "hfov": 104
 },
 "id": "camera_E0F99F57_FA43_D7E9_41B3_4B207D263A40",
 "automaticZoomSpeed": 10
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_CA423771_DBB7_F413_41C3_0D355D63A920_camera",
 "automaticZoomSpeed": 10
},
{
 "thumbnailUrl": "media/video_F07A4F69_E00D_43DD_41E7_FF7000D69CFB_t.jpg",
 "label": "site",
 "class": "Video",
 "width": 720,
 "loop": false,
 "id": "video_F07A4F69_E00D_43DD_41E7_FF7000D69CFB",
 "scaleMode": "fit_inside",
 "height": 480,
 "video": {
  "mp4Url": "media/video_F07A4F69_E00D_43DD_41E7_FF7000D69CFB.mp4",
  "width": 720,
  "class": "VideoResource",
  "height": 480
 }
},
{
 "items": [
  {
   "media": "this.video_F07A4F69_E00D_43DD_41E7_FF7000D69CFB",
   "start": "this.MainViewerVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.playList_E339CD21_FA43_DBA9_41E0_B4300291F8E0, 0, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.playList_E339CD21_FA43_DBA9_41E0_B4300291F8E0, 0)",
   "begin": "this.fixTogglePlayPauseButton(this.MainViewerVideoPlayer)",
   "player": "this.MainViewerVideoPlayer",
   "class": "VideoPlayListItem"
  }
 ],
 "id": "playList_E339CD21_FA43_DBA9_41E0_B4300291F8E0",
 "class": "PlayList"
},
{
 "thumbnailUrl": "media/panorama_CA423771_DBB7_F413_41C3_0D355D63A920_t.jpg",
 "partial": false,
 "label": "08",
 "class": "Panorama",
 "frames": [
  {
   "thumbnailUrl": "media/panorama_CA423771_DBB7_F413_41C3_0D355D63A920_t.jpg",
   "front": {
    "levels": [
     {
      "url": "media/panorama_CA423771_DBB7_F413_41C3_0D355D63A920_0/f/0/{row}_{column}.jpg",
      "colCount": 3,
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_CA423771_DBB7_F413_41C3_0D355D63A920_0/f/1/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CA423771_DBB7_F413_41C3_0D355D63A920_0/f/2/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_CA423771_DBB7_F413_41C3_0D355D63A920_0/u/0/{row}_{column}.jpg",
      "colCount": 3,
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_CA423771_DBB7_F413_41C3_0D355D63A920_0/u/1/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CA423771_DBB7_F413_41C3_0D355D63A920_0/u/2/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_CA423771_DBB7_F413_41C3_0D355D63A920_0/r/0/{row}_{column}.jpg",
      "colCount": 3,
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_CA423771_DBB7_F413_41C3_0D355D63A920_0/r/1/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CA423771_DBB7_F413_41C3_0D355D63A920_0/r/2/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_CA423771_DBB7_F413_41C3_0D355D63A920_0/b/0/{row}_{column}.jpg",
      "colCount": 3,
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_CA423771_DBB7_F413_41C3_0D355D63A920_0/b/1/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CA423771_DBB7_F413_41C3_0D355D63A920_0/b/2/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_CA423771_DBB7_F413_41C3_0D355D63A920_0/d/0/{row}_{column}.jpg",
      "colCount": 3,
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_CA423771_DBB7_F413_41C3_0D355D63A920_0/d/1/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CA423771_DBB7_F413_41C3_0D355D63A920_0/d/2/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_CA423771_DBB7_F413_41C3_0D355D63A920_0/l/0/{row}_{column}.jpg",
      "colCount": 3,
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_CA423771_DBB7_F413_41C3_0D355D63A920_0/l/1/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CA423771_DBB7_F413_41C3_0D355D63A920_0/l/2/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "id": "panorama_CA423771_DBB7_F413_41C3_0D355D63A920",
 "cardboardMenu": "this.Menu_E3217D28_FA43_DBA7_41D4_EC8E3D3D5334",
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_D4A11BCC_DBB0_FC71_41D0_94884094A022",
   "yaw": 5.54,
   "class": "AdjacentPanorama",
   "backwardYaw": -19.24,
   "distance": 1
  },
  {
   "panorama": "this.panorama_CB758832_DBB0_7C11_41E1_D49EC19CD9F2",
   "yaw": -95.05,
   "class": "AdjacentPanorama",
   "backwardYaw": 88.87,
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 120,
 "mapLocations": [
  {
   "map": "this.map_EC81520A_E266_EAB5_41E5_A93A73CA8842",
   "x": 345.46,
   "angle": 0,
   "y": 381.78,
   "class": "PanoramaMapLocation"
  }
 ],
 "overlays": [
  "this.overlay_CA422772_DBB7_F410_41DF_870376CAF14D",
  "this.overlay_CA424772_DBB7_F410_41E5_CBD229C07280",
  "this.overlay_CF31A32C_DC90_CC31_41D5_F2D3F839AC8B"
 ],
 "hfov": 360,
 "pitch": 0
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 85.13,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_E08C7FAF_FA43_D6B9_41E6_C3F91E7F4CC6",
 "automaticZoomSpeed": 10
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 160.76,
  "pitch": 0,
  "hfov": 104
 },
 "id": "camera_E3DAAD48_FA43_DBE7_41EC_40F4DE7C654B",
 "automaticZoomSpeed": 10
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_CA0D2937_DB90_5C1F_41C1_3A22D6FAEAF2_camera",
 "automaticZoomSpeed": 10
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 124.28,
  "pitch": 0,
  "hfov": 104
 },
 "id": "camera_E3F28D6E_FA43_DBBB_41DE_8B5F3ECA681D",
 "automaticZoomSpeed": 10
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -97.9,
  "pitch": 0,
  "hfov": 104
 },
 "id": "camera_E0C9EF36_FA43_D7AB_41EF_0D8258E183BE",
 "automaticZoomSpeed": 10
},
{
 "items": [
  {
   "begin": "this.MapViewerMapPlayer.set('movementMode', 'constrained')",
   "media": "this.map_EC81520A_E266_EAB5_41E5_A93A73CA8842",
   "class": "MapPlayListItem",
   "player": "this.MapViewerMapPlayer"
  }
 ],
 "id": "playList_E339AD21_FA43_DBA9_41EA_3074AED66252",
 "class": "PlayList"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_CB758832_DBB0_7C11_41E1_D49EC19CD9F2_camera",
 "automaticZoomSpeed": 10
},
{
 "thumbnailUrl": "media/panorama_C9F9CB78_DB90_FC11_41E9_6E303CA66A0D_t.jpg",
 "partial": false,
 "label": "06",
 "class": "Panorama",
 "frames": [
  {
   "thumbnailUrl": "media/panorama_C9F9CB78_DB90_FC11_41E9_6E303CA66A0D_t.jpg",
   "front": {
    "levels": [
     {
      "url": "media/panorama_C9F9CB78_DB90_FC11_41E9_6E303CA66A0D_0/f/0/{row}_{column}.jpg",
      "colCount": 3,
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_C9F9CB78_DB90_FC11_41E9_6E303CA66A0D_0/f/1/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C9F9CB78_DB90_FC11_41E9_6E303CA66A0D_0/f/2/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_C9F9CB78_DB90_FC11_41E9_6E303CA66A0D_0/u/0/{row}_{column}.jpg",
      "colCount": 3,
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_C9F9CB78_DB90_FC11_41E9_6E303CA66A0D_0/u/1/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C9F9CB78_DB90_FC11_41E9_6E303CA66A0D_0/u/2/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_C9F9CB78_DB90_FC11_41E9_6E303CA66A0D_0/r/0/{row}_{column}.jpg",
      "colCount": 3,
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_C9F9CB78_DB90_FC11_41E9_6E303CA66A0D_0/r/1/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C9F9CB78_DB90_FC11_41E9_6E303CA66A0D_0/r/2/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_C9F9CB78_DB90_FC11_41E9_6E303CA66A0D_0/b/0/{row}_{column}.jpg",
      "colCount": 3,
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_C9F9CB78_DB90_FC11_41E9_6E303CA66A0D_0/b/1/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C9F9CB78_DB90_FC11_41E9_6E303CA66A0D_0/b/2/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_C9F9CB78_DB90_FC11_41E9_6E303CA66A0D_0/d/0/{row}_{column}.jpg",
      "colCount": 3,
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_C9F9CB78_DB90_FC11_41E9_6E303CA66A0D_0/d/1/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C9F9CB78_DB90_FC11_41E9_6E303CA66A0D_0/d/2/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_C9F9CB78_DB90_FC11_41E9_6E303CA66A0D_0/l/0/{row}_{column}.jpg",
      "colCount": 3,
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_C9F9CB78_DB90_FC11_41E9_6E303CA66A0D_0/l/1/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C9F9CB78_DB90_FC11_41E9_6E303CA66A0D_0/l/2/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "id": "panorama_C9F9CB78_DB90_FC11_41E9_6E303CA66A0D",
 "cardboardMenu": "this.Menu_E3217D28_FA43_DBA7_41D4_EC8E3D3D5334",
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_CBFBDDCD_DB91_D473_41BC_ACAA1C31DBB5",
   "yaw": 10.74,
   "class": "AdjacentPanorama",
   "backwardYaw": 65.64,
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 120,
 "mapLocations": [
  {
   "map": "this.map_EC81520A_E266_EAB5_41E5_A93A73CA8842",
   "x": 268.46,
   "angle": 166.75,
   "y": 117.78,
   "class": "PanoramaMapLocation"
  }
 ],
 "overlays": [
  "this.overlay_C9F96B78_DB90_FC11_41CE_3AB63512CE50",
  "this.overlay_C9FE9B79_DB90_FC13_41E5_5514ED05B836"
 ],
 "hfov": 360,
 "pitch": 0
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -174.46,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_E013DE66_FA43_D9AB_41EB_8829DDEECA91",
 "automaticZoomSpeed": 10
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_D4F951E6_DBB0_4C31_41C3_F5A2780BAC65_camera",
 "automaticZoomSpeed": 10
},
{
 "opacity": 0.4,
 "rollOverOpacity": 0.8,
 "backgroundColor": "#404040",
 "children": [
  {
   "label": "01",
   "class": "MenuItem",
   "click": "this.mainPlayList.set('selectedIndex', 0)"
  },
  {
   "label": "02",
   "class": "MenuItem",
   "click": "this.mainPlayList.set('selectedIndex', 1)"
  },
  {
   "label": "03",
   "class": "MenuItem",
   "click": "this.mainPlayList.set('selectedIndex', 2)"
  },
  {
   "label": "04",
   "class": "MenuItem",
   "click": "this.mainPlayList.set('selectedIndex', 3)"
  },
  {
   "label": "05",
   "class": "MenuItem",
   "click": "this.mainPlayList.set('selectedIndex', 4)"
  },
  {
   "label": "06",
   "class": "MenuItem",
   "click": "this.mainPlayList.set('selectedIndex', 5)"
  },
  {
   "label": "07",
   "class": "MenuItem",
   "click": "this.mainPlayList.set('selectedIndex', 6)"
  },
  {
   "label": "08",
   "class": "MenuItem",
   "click": "this.mainPlayList.set('selectedIndex', 7)"
  },
  {
   "label": "09",
   "class": "MenuItem",
   "click": "this.mainPlayList.set('selectedIndex', 8)"
  }
 ],
 "label": "Media",
 "rollOverFontColor": "#FFFFFF",
 "class": "Menu",
 "selectedFontColor": "#FFFFFF",
 "fontColor": "#FFFFFF",
 "id": "Menu_E3217D28_FA43_DBA7_41D4_EC8E3D3D5334",
 "fontFamily": "Arial",
 "rollOverBackgroundColor": "#000000",
 "selectedBackgroundColor": "#202020"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 76.91,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_E05EBDEB_FA43_DAB9_41D2_D935B3A44ED0",
 "automaticZoomSpeed": 10
},
{
 "thumbnailUrl": "media/panorama_D4373514_DBB0_5411_41E3_3F811A9931A3_t.jpg",
 "partial": false,
 "label": "01",
 "class": "Panorama",
 "frames": [
  {
   "thumbnailUrl": "media/panorama_D4373514_DBB0_5411_41E3_3F811A9931A3_t.jpg",
   "front": {
    "levels": [
     {
      "url": "media/panorama_D4373514_DBB0_5411_41E3_3F811A9931A3_0/f/0/{row}_{column}.jpg",
      "colCount": 3,
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_D4373514_DBB0_5411_41E3_3F811A9931A3_0/f/1/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_D4373514_DBB0_5411_41E3_3F811A9931A3_0/f/2/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_D4373514_DBB0_5411_41E3_3F811A9931A3_0/u/0/{row}_{column}.jpg",
      "colCount": 3,
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_D4373514_DBB0_5411_41E3_3F811A9931A3_0/u/1/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_D4373514_DBB0_5411_41E3_3F811A9931A3_0/u/2/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_D4373514_DBB0_5411_41E3_3F811A9931A3_0/r/0/{row}_{column}.jpg",
      "colCount": 3,
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_D4373514_DBB0_5411_41E3_3F811A9931A3_0/r/1/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_D4373514_DBB0_5411_41E3_3F811A9931A3_0/r/2/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_D4373514_DBB0_5411_41E3_3F811A9931A3_0/b/0/{row}_{column}.jpg",
      "colCount": 3,
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_D4373514_DBB0_5411_41E3_3F811A9931A3_0/b/1/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_D4373514_DBB0_5411_41E3_3F811A9931A3_0/b/2/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_D4373514_DBB0_5411_41E3_3F811A9931A3_0/d/0/{row}_{column}.jpg",
      "colCount": 3,
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_D4373514_DBB0_5411_41E3_3F811A9931A3_0/d/1/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_D4373514_DBB0_5411_41E3_3F811A9931A3_0/d/2/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_D4373514_DBB0_5411_41E3_3F811A9931A3_0/l/0/{row}_{column}.jpg",
      "colCount": 3,
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_D4373514_DBB0_5411_41E3_3F811A9931A3_0/l/1/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_D4373514_DBB0_5411_41E3_3F811A9931A3_0/l/2/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "id": "panorama_D4373514_DBB0_5411_41E3_3F811A9931A3",
 "cardboardMenu": "this.Menu_E3217D28_FA43_DBA7_41D4_EC8E3D3D5334",
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_D4A11BCC_DBB0_FC71_41D0_94884094A022",
   "yaw": 153.41,
   "class": "AdjacentPanorama",
   "backwardYaw": -55.72,
   "distance": 1
  },
  {
   "panorama": "this.panorama_D4A11BCC_DBB0_FC71_41D0_94884094A022",
   "yaw": 122.02,
   "class": "AdjacentPanorama",
   "backwardYaw": -55.72,
   "distance": 1
  },
  {
   "panorama": "this.panorama_CA0D2937_DB90_5C1F_41C1_3A22D6FAEAF2",
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_D4F951E6_DBB0_4C31_41C3_F5A2780BAC65",
   "yaw": 122.02,
   "class": "AdjacentPanorama",
   "backwardYaw": -47.81,
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 90,
 "mapLocations": [
  {
   "map": "this.map_EC81520A_E266_EAB5_41E5_A93A73CA8842",
   "x": 465.46,
   "angle": 176.55,
   "y": 384.78,
   "class": "PanoramaMapLocation"
  }
 ],
 "overlays": [
  "this.overlay_D436E515_DBB0_5413_41B7_817FEDE59BFE",
  "this.overlay_D436F515_DBB0_5413_41E4_665E78635BB8",
  "this.overlay_D43DA1A2_DB90_CC31_41B7_C8AB4A8B6314",
  "this.overlay_F304BA2B_E03B_4D5D_41D3_63C78BDC7DDF"
 ],
 "pitch": 0,
 "hfov": 360
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -91.13,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_E3CF0D5B_FA43_DB99_41EA_D135D5473930",
 "automaticZoomSpeed": 10
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -57.98,
  "pitch": 0,
  "hfov": 70
 },
 "id": "camera_E0EA5F7D_FA43_D799_41E2_64B5AC5F50F1",
 "automaticZoomSpeed": 10
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 124.28,
  "pitch": 0,
  "hfov": 104
 },
 "id": "camera_E3E7AD81_FA43_DB69_41ED_29B8A12FC55A",
 "automaticZoomSpeed": 10
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 132.19,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_E3EA4D94_FA43_DB6F_41DC_31BF19DEF47C",
 "automaticZoomSpeed": 10
},
{
 "items": [
  {
   "begin": "this.MapViewerMapPlayer.set('movementMode', 'constrained')",
   "media": "this.map_EC81520A_E266_EAB5_41E5_A93A73CA8842",
   "class": "MapPlayListItem",
   "player": "this.MapViewerMapPlayer"
  }
 ],
 "id": "playList_E339FD21_FA43_DBA9_41E2_5946A52ECF46",
 "class": "PlayList"
},
{
 "thumbnailUrl": "media/panorama_D4F951E6_DBB0_4C31_41C3_F5A2780BAC65_t.jpg",
 "partial": false,
 "label": "03",
 "class": "Panorama",
 "frames": [
  {
   "thumbnailUrl": "media/panorama_D4F951E6_DBB0_4C31_41C3_F5A2780BAC65_t.jpg",
   "front": {
    "levels": [
     {
      "url": "media/panorama_D4F951E6_DBB0_4C31_41C3_F5A2780BAC65_0/f/0/{row}_{column}.jpg",
      "colCount": 3,
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_D4F951E6_DBB0_4C31_41C3_F5A2780BAC65_0/f/1/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_D4F951E6_DBB0_4C31_41C3_F5A2780BAC65_0/f/2/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_D4F951E6_DBB0_4C31_41C3_F5A2780BAC65_0/u/0/{row}_{column}.jpg",
      "colCount": 3,
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_D4F951E6_DBB0_4C31_41C3_F5A2780BAC65_0/u/1/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_D4F951E6_DBB0_4C31_41C3_F5A2780BAC65_0/u/2/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_D4F951E6_DBB0_4C31_41C3_F5A2780BAC65_0/b/0/{row}_{column}.jpg",
      "colCount": 3,
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_D4F951E6_DBB0_4C31_41C3_F5A2780BAC65_0/b/1/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_D4F951E6_DBB0_4C31_41C3_F5A2780BAC65_0/b/2/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_D4F951E6_DBB0_4C31_41C3_F5A2780BAC65_0/d/0/{row}_{column}.jpg",
      "colCount": 3,
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_D4F951E6_DBB0_4C31_41C3_F5A2780BAC65_0/d/1/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_D4F951E6_DBB0_4C31_41C3_F5A2780BAC65_0/d/2/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_D4F951E6_DBB0_4C31_41C3_F5A2780BAC65_0/l/0/{row}_{column}.jpg",
      "colCount": 3,
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_D4F951E6_DBB0_4C31_41C3_F5A2780BAC65_0/l/1/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_D4F951E6_DBB0_4C31_41C3_F5A2780BAC65_0/l/2/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_D4F951E6_DBB0_4C31_41C3_F5A2780BAC65_0/r/0/{row}_{column}.jpg",
      "colCount": 3,
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_D4F951E6_DBB0_4C31_41C3_F5A2780BAC65_0/r/1/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_D4F951E6_DBB0_4C31_41C3_F5A2780BAC65_0/r/2/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "id": "panorama_D4F951E6_DBB0_4C31_41C3_F5A2780BAC65",
 "cardboardMenu": "this.Menu_E3217D28_FA43_DBA7_41D4_EC8E3D3D5334",
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_CA423771_DBB7_F413_41C3_0D355D63A920",
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_D4A11BCC_DBB0_FC71_41D0_94884094A022",
   "yaw": -73.03,
   "class": "AdjacentPanorama",
   "backwardYaw": 82.1,
   "distance": 1
  },
  {
   "panorama": "this.panorama_D4A11BCC_DBB0_FC71_41D0_94884094A022",
   "yaw": -47.81,
   "class": "AdjacentPanorama",
   "backwardYaw": 82.1,
   "distance": 1
  },
  {
   "panorama": "this.panorama_D4373514_DBB0_5411_41E3_3F811A9931A3",
   "yaw": -47.81,
   "class": "AdjacentPanorama",
   "backwardYaw": 122.02,
   "distance": 1
  },
  {
   "panorama": "this.panorama_CBFBDDCD_DB91_D473_41BC_ACAA1C31DBB5",
   "yaw": -103.09,
   "class": "AdjacentPanorama",
   "backwardYaw": -94.87,
   "distance": 1
  },
  {
   "panorama": "this.panorama_CBFBDDCD_DB91_D473_41BC_ACAA1C31DBB5",
   "yaw": -73.03,
   "class": "AdjacentPanorama",
   "backwardYaw": -94.87,
   "distance": 1
  },
  {
   "panorama": "this.panorama_CBFBDDCD_DB91_D473_41BC_ACAA1C31DBB5",
   "yaw": -47.81,
   "class": "AdjacentPanorama",
   "backwardYaw": -94.87,
   "distance": 1
  },
  {
   "panorama": "this.panorama_CBCD6822_DB90_5C31_41E8_D76D0E29E1B1",
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "hfovMax": 120,
 "mapLocations": [
  {
   "map": "this.map_EC81520A_E266_EAB5_41E5_A93A73CA8842",
   "x": 147.46,
   "angle": 148.38,
   "y": 275.78,
   "class": "PanoramaMapLocation"
  }
 ],
 "overlays": [
  "this.overlay_D4F931E6_DBB0_4C31_41D7_92DF625C8DFA",
  "this.overlay_D4F8F1E7_DBB0_4C3F_41E3_4855E722B0BA",
  "this.overlay_CE35D269_DC90_CC33_41E3_5F31BDC8D2C4",
  "this.overlay_CD699DA3_DC90_3430_4171_AD352D14A8F5",
  "this.overlay_CDF702AB_DC91_CC30_41CC_A6A2EF8B23FB",
  "this.overlay_CE2949D7_DC90_DC1F_41E4_12225F2BC492",
  "this.overlay_CED290E4_DC97_CC31_41DC_322188572E38",
  "this.overlay_F3AEB6A6_E00B_4557_419C_483F6091DE1D",
  "this.overlay_C4F05C39_E557_D71A_41EA_040FE899353C"
 ],
 "hfov": 360,
 "pitch": 0
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "displayMovements": [
  {
   "duration": 1000,
   "class": "TargetRotationalCameraDisplayMovement",
   "easing": "linear"
  },
  {
   "duration": 3000,
   "targetHfov": 70,
   "targetPitch": -10.09,
   "targetStereographicFactor": 0,
   "class": "TargetRotationalCameraDisplayMovement",
   "easing": "cubic_in_out"
  }
 ],
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 137.96,
  "pitch": -10.09,
  "hfov": 70
 },
 "id": "panorama_D4373514_DBB0_5411_41E3_3F811A9931A3_camera",
 "displayOriginPosition": {
  "stereographicFactor": 1,
  "class": "RotationalCameraDisplayPosition",
  "yaw": 137.96,
  "pitch": -90,
  "hfov": 165
 },
 "automaticZoomSpeed": 10
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 18.92,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_E0351EAD_FA43_D6B9_41E8_8B64666DA618",
 "automaticZoomSpeed": 10
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 85.13,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_E0BE5FC0_FA43_D6E7_41D8_16DF0CF0272A",
 "automaticZoomSpeed": 10
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0,
  "hfov": 104
 },
 "id": "panorama_D4A11BCC_DBB0_FC71_41D0_94884094A022_camera",
 "automaticZoomSpeed": 10
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_CBFBDDCD_DB91_D473_41BC_ACAA1C31DBB5_camera",
 "automaticZoomSpeed": 10
},
{
 "thumbnailUrl": "media/panorama_CBCD6822_DB90_5C31_41E8_D76D0E29E1B1_t.jpg",
 "partial": false,
 "label": "07",
 "class": "Panorama",
 "frames": [
  {
   "thumbnailUrl": "media/panorama_CBCD6822_DB90_5C31_41E8_D76D0E29E1B1_t.jpg",
   "front": {
    "levels": [
     {
      "url": "media/panorama_CBCD6822_DB90_5C31_41E8_D76D0E29E1B1_0/f/0/{row}_{column}.jpg",
      "colCount": 3,
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_CBCD6822_DB90_5C31_41E8_D76D0E29E1B1_0/f/1/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CBCD6822_DB90_5C31_41E8_D76D0E29E1B1_0/f/2/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_CBCD6822_DB90_5C31_41E8_D76D0E29E1B1_0/u/0/{row}_{column}.jpg",
      "colCount": 3,
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_CBCD6822_DB90_5C31_41E8_D76D0E29E1B1_0/u/1/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CBCD6822_DB90_5C31_41E8_D76D0E29E1B1_0/u/2/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_CBCD6822_DB90_5C31_41E8_D76D0E29E1B1_0/r/0/{row}_{column}.jpg",
      "colCount": 3,
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_CBCD6822_DB90_5C31_41E8_D76D0E29E1B1_0/r/1/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CBCD6822_DB90_5C31_41E8_D76D0E29E1B1_0/r/2/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_CBCD6822_DB90_5C31_41E8_D76D0E29E1B1_0/b/0/{row}_{column}.jpg",
      "colCount": 3,
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_CBCD6822_DB90_5C31_41E8_D76D0E29E1B1_0/b/1/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CBCD6822_DB90_5C31_41E8_D76D0E29E1B1_0/b/2/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_CBCD6822_DB90_5C31_41E8_D76D0E29E1B1_0/d/0/{row}_{column}.jpg",
      "colCount": 3,
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_CBCD6822_DB90_5C31_41E8_D76D0E29E1B1_0/d/1/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CBCD6822_DB90_5C31_41E8_D76D0E29E1B1_0/d/2/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_CBCD6822_DB90_5C31_41E8_D76D0E29E1B1_0/l/0/{row}_{column}.jpg",
      "colCount": 3,
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_CBCD6822_DB90_5C31_41E8_D76D0E29E1B1_0/l/1/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CBCD6822_DB90_5C31_41E8_D76D0E29E1B1_0/l/2/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "id": "panorama_CBCD6822_DB90_5C31_41E8_D76D0E29E1B1",
 "cardboardMenu": "this.Menu_E3217D28_FA43_DBA7_41D4_EC8E3D3D5334",
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_CBFBDDCD_DB91_D473_41BC_ACAA1C31DBB5",
   "yaw": 139.53,
   "class": "AdjacentPanorama",
   "backwardYaw": 127.28,
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 120,
 "mapLocations": [
  {
   "map": "this.map_EC81520A_E266_EAB5_41E5_A93A73CA8842",
   "x": 409.46,
   "angle": 96.91,
   "y": 126.78,
   "class": "PanoramaMapLocation"
  }
 ],
 "overlays": [
  "this.overlay_CBCD7822_DB90_5C31_41D0_BB82B606DB71",
  "this.overlay_CBCD1822_DB90_5C31_41DF_8A2006DB3362"
 ],
 "hfov": 360,
 "pitch": 0
},
{
 "displayPlaybackBar": true,
 "viewerArea": "this.MainViewer",
 "id": "MainViewerVideoPlayer",
 "class": "VideoPlayer"
},
{
 "thumbnailUrl": "media/panorama_D4A11BCC_DBB0_FC71_41D0_94884094A022_t.jpg",
 "partial": false,
 "label": "02",
 "class": "Panorama",
 "frames": [
  {
   "thumbnailUrl": "media/panorama_D4A11BCC_DBB0_FC71_41D0_94884094A022_t.jpg",
   "front": {
    "levels": [
     {
      "url": "media/panorama_D4A11BCC_DBB0_FC71_41D0_94884094A022_0/f/0/{row}_{column}.jpg",
      "colCount": 3,
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_D4A11BCC_DBB0_FC71_41D0_94884094A022_0/f/1/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_D4A11BCC_DBB0_FC71_41D0_94884094A022_0/f/2/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_D4A11BCC_DBB0_FC71_41D0_94884094A022_0/u/0/{row}_{column}.jpg",
      "colCount": 3,
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_D4A11BCC_DBB0_FC71_41D0_94884094A022_0/u/1/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_D4A11BCC_DBB0_FC71_41D0_94884094A022_0/u/2/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_D4A11BCC_DBB0_FC71_41D0_94884094A022_0/r/0/{row}_{column}.jpg",
      "colCount": 3,
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_D4A11BCC_DBB0_FC71_41D0_94884094A022_0/r/1/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_D4A11BCC_DBB0_FC71_41D0_94884094A022_0/r/2/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_D4A11BCC_DBB0_FC71_41D0_94884094A022_0/b/0/{row}_{column}.jpg",
      "colCount": 3,
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_D4A11BCC_DBB0_FC71_41D0_94884094A022_0/b/1/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_D4A11BCC_DBB0_FC71_41D0_94884094A022_0/b/2/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_D4A11BCC_DBB0_FC71_41D0_94884094A022_0/d/0/{row}_{column}.jpg",
      "colCount": 3,
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_D4A11BCC_DBB0_FC71_41D0_94884094A022_0/d/1/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_D4A11BCC_DBB0_FC71_41D0_94884094A022_0/d/2/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_D4A11BCC_DBB0_FC71_41D0_94884094A022_0/l/0/{row}_{column}.jpg",
      "colCount": 3,
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_D4A11BCC_DBB0_FC71_41D0_94884094A022_0/l/1/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_D4A11BCC_DBB0_FC71_41D0_94884094A022_0/l/2/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "id": "panorama_D4A11BCC_DBB0_FC71_41D0_94884094A022",
 "cardboardMenu": "this.Menu_E3217D28_FA43_DBA7_41D4_EC8E3D3D5334",
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_CA423771_DBB7_F413_41C3_0D355D63A920",
   "yaw": -19.24,
   "class": "AdjacentPanorama",
   "backwardYaw": 5.54,
   "distance": 1
  },
  {
   "panorama": "this.panorama_D4373514_DBB0_5411_41E3_3F811A9931A3",
   "yaw": -55.72,
   "class": "AdjacentPanorama",
   "backwardYaw": 153.41,
   "distance": 1
  },
  {
   "panorama": "this.panorama_CBFBDDCD_DB91_D473_41BC_ACAA1C31DBB5",
   "yaw": 124.29,
   "class": "AdjacentPanorama",
   "backwardYaw": -161.08,
   "distance": 1
  },
  {
   "panorama": "this.panorama_CA0D2937_DB90_5C1F_41C1_3A22D6FAEAF2",
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_D4F951E6_DBB0_4C31_41C3_F5A2780BAC65",
   "yaw": 82.1,
   "class": "AdjacentPanorama",
   "backwardYaw": -73.03,
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 115,
 "mapLocations": [
  {
   "map": "this.map_EC81520A_E266_EAB5_41E5_A93A73CA8842",
   "x": 352.46,
   "angle": 180.72,
   "y": 269.78,
   "class": "PanoramaMapLocation"
  }
 ],
 "overlays": [
  "this.overlay_D4A13BCD_DBB0_FC73_41BD_796342F7F489",
  "this.overlay_D4A12BCD_DBB0_FC73_41B6_F0B84531EC3C",
  "this.overlay_D4A14BCD_DBB0_FC73_41EA_F972924D0A25",
  "this.overlay_D4A17BCD_DBB0_FC73_41E1_07497EB8A654",
  "this.overlay_D4A16BCD_DBB0_FC73_41D7_CC357AA1FDB5",
  "this.overlay_D4A09BCD_DBB0_FC73_41E7_499368DDF689"
 ],
 "pitch": 0,
 "hfov": 360
},
{
 "thumbnailUrl": "media/panorama_CBFBDDCD_DB91_D473_41BC_ACAA1C31DBB5_t.jpg",
 "partial": false,
 "label": "04",
 "class": "Panorama",
 "frames": [
  {
   "thumbnailUrl": "media/panorama_CBFBDDCD_DB91_D473_41BC_ACAA1C31DBB5_t.jpg",
   "front": {
    "levels": [
     {
      "url": "media/panorama_CBFBDDCD_DB91_D473_41BC_ACAA1C31DBB5_0/f/0/{row}_{column}.jpg",
      "colCount": 3,
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_CBFBDDCD_DB91_D473_41BC_ACAA1C31DBB5_0/f/1/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CBFBDDCD_DB91_D473_41BC_ACAA1C31DBB5_0/f/2/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_CBFBDDCD_DB91_D473_41BC_ACAA1C31DBB5_0/u/0/{row}_{column}.jpg",
      "colCount": 3,
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_CBFBDDCD_DB91_D473_41BC_ACAA1C31DBB5_0/u/1/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CBFBDDCD_DB91_D473_41BC_ACAA1C31DBB5_0/u/2/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_CBFBDDCD_DB91_D473_41BC_ACAA1C31DBB5_0/r/0/{row}_{column}.jpg",
      "colCount": 3,
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_CBFBDDCD_DB91_D473_41BC_ACAA1C31DBB5_0/r/1/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CBFBDDCD_DB91_D473_41BC_ACAA1C31DBB5_0/r/2/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_CBFBDDCD_DB91_D473_41BC_ACAA1C31DBB5_0/b/0/{row}_{column}.jpg",
      "colCount": 3,
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_CBFBDDCD_DB91_D473_41BC_ACAA1C31DBB5_0/b/1/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CBFBDDCD_DB91_D473_41BC_ACAA1C31DBB5_0/b/2/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_CBFBDDCD_DB91_D473_41BC_ACAA1C31DBB5_0/d/0/{row}_{column}.jpg",
      "colCount": 3,
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_CBFBDDCD_DB91_D473_41BC_ACAA1C31DBB5_0/d/1/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CBFBDDCD_DB91_D473_41BC_ACAA1C31DBB5_0/d/2/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_CBFBDDCD_DB91_D473_41BC_ACAA1C31DBB5_0/l/0/{row}_{column}.jpg",
      "colCount": 3,
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_CBFBDDCD_DB91_D473_41BC_ACAA1C31DBB5_0/l/1/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CBFBDDCD_DB91_D473_41BC_ACAA1C31DBB5_0/l/2/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "id": "panorama_CBFBDDCD_DB91_D473_41BC_ACAA1C31DBB5",
 "cardboardMenu": "this.Menu_E3217D28_FA43_DBA7_41D4_EC8E3D3D5334",
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_D4A11BCC_DBB0_FC71_41D0_94884094A022",
   "yaw": -161.08,
   "class": "AdjacentPanorama",
   "backwardYaw": 124.29,
   "distance": 1
  },
  {
   "panorama": "this.panorama_D4373514_DBB0_5411_41E3_3F811A9931A3",
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_D4373514_DBB0_5411_41E3_3F811A9931A3",
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_C9F9CB78_DB90_FC11_41E9_6E303CA66A0D",
   "yaw": 65.64,
   "class": "AdjacentPanorama",
   "backwardYaw": 10.74,
   "distance": 1
  },
  {
   "panorama": "this.panorama_CBCD6822_DB90_5C31_41E8_D76D0E29E1B1",
   "yaw": 127.28,
   "class": "AdjacentPanorama",
   "backwardYaw": 139.53,
   "distance": 1
  },
  {
   "panorama": "this.panorama_CA423771_DBB7_F413_41C3_0D355D63A920",
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_CA0D2937_DB90_5C1F_41C1_3A22D6FAEAF2",
   "yaw": -15.85,
   "class": "AdjacentPanorama",
   "backwardYaw": 129.66,
   "distance": 1
  },
  {
   "panorama": "this.panorama_D4F951E6_DBB0_4C31_41C3_F5A2780BAC65",
   "yaw": -94.87,
   "class": "AdjacentPanorama",
   "backwardYaw": -103.09,
   "distance": 1
  },
  {
   "panorama": "this.panorama_D4F951E6_DBB0_4C31_41C3_F5A2780BAC65",
   "yaw": -94.87,
   "class": "AdjacentPanorama",
   "backwardYaw": -103.09,
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 120,
 "mapLocations": [
  {
   "map": "this.map_EC81520A_E266_EAB5_41E5_A93A73CA8842",
   "x": 263.46,
   "angle": -45.12,
   "y": 192.78,
   "class": "PanoramaMapLocation"
  }
 ],
 "overlays": [
  "this.overlay_CBFBFDCD_DB91_D473_41A0_F585E481EFDE",
  "this.overlay_CBFA4DCD_DB91_D473_41D2_B6281C1F476F",
  "this.overlay_CBFA6DCD_DB91_D473_41E9_9EFA973D8427",
  "this.overlay_CBFA7DCE_DB91_D471_41E8_C85F7BB1D8B9",
  "this.overlay_CBFA9DCE_DB91_D471_41D0_3054D02DA76C",
  "this.overlay_CFBB4567_DC90_D430_41D9_6339580DA433",
  "this.overlay_CEAFB66D_DC90_5433_41D8_A95A7D5CC33A",
  "this.overlay_CEFEEBAF_DC90_3C30_41D8_3186AD139960",
  "this.overlay_CFAA4639_DC90_F416_41CD_AE032B6F48F8"
 ],
 "hfov": 360,
 "pitch": 0
},
{
 "thumbnailUrl": "media/video_C4B7A912_E557_DEEF_41C4_D63191847C70_t.jpg",
 "label": "paisagem",
 "class": "Video",
 "width": 854,
 "loop": false,
 "id": "video_C4B7A912_E557_DEEF_41C4_D63191847C70",
 "scaleMode": "fit_inside",
 "height": 480,
 "video": {
  "mp4Url": "media/video_C4B7A912_E557_DEEF_41C4_D63191847C70.mp4",
  "width": 854,
  "class": "VideoResource",
  "height": 480
 }
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 85.13,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_E09C4F9E_FA43_D69B_41EC_ECB1F89F3BC1",
 "automaticZoomSpeed": 10
},
{
 "items": [
  {
   "media": "this.video_C4B7A912_E557_DEEF_41C4_D63191847C70",
   "start": "this.MainViewerVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.playList_E3391D21_FA43_DBA9_41C0_D0150AE238FB, 0, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.playList_E3391D21_FA43_DBA9_41C0_D0150AE238FB, 0)",
   "begin": "this.fixTogglePlayPauseButton(this.MainViewerVideoPlayer)",
   "player": "this.MainViewerVideoPlayer",
   "class": "VideoPlayListItem"
  }
 ],
 "id": "playList_E3391D21_FA43_DBA9_41C0_D0150AE238FB",
 "class": "PlayList"
},
{
 "thumbnailUrl": "media/map_EC81520A_E266_EAB5_41E5_A93A73CA8842_t.png",
 "height": 454,
 "fieldOfViewOverlayInsideOpacity": 0.54,
 "label": "flow",
 "initialZoomFactor": 1,
 "class": "Map",
 "width": 520,
 "id": "map_EC81520A_E266_EAB5_41E5_A93A73CA8842",
 "image": {
  "levels": [
   {
    "url": "media/map_EC81520A_E266_EAB5_41E5_A93A73CA8842.png",
    "width": 520,
    "class": "ImageResourceLevel",
    "height": 454
   },
   {
    "url": "media/map_EC81520A_E266_EAB5_41E5_A93A73CA8842_lq.png",
    "width": 273,
    "class": "ImageResourceLevel",
    "height": 239,
    "tags": "preload"
   }
  ],
  "class": "ImageResource"
 },
 "minimumZoomFactor": 0.5,
 "fieldOfViewOverlayOutsideColor": "#000000",
 "overlays": [
  "this.overlay_F418D4F4_E225_2F5D_41C3_24A31AB30CB9",
  "this.overlay_F4A362EE_E223_2B4D_41C1_2A116900D7F0",
  "this.overlay_F54543A3_E223_69FB_41B0_0516573A6E4A",
  "this.overlay_F5142BD6_E223_195D_41E1_281B0CA884B5",
  "this.overlay_F4ED64B6_E223_2FDD_41EB_EEDC3AC1A1F1",
  "this.overlay_F4AAEBE3_E223_F97B_41B8_DC03E7E2D68E",
  "this.overlay_F54572BA_E223_6BD5_41B2_0C67EE85FA7F",
  "this.overlay_F5CE98FC_E223_274D_41E2_1AB37416A47E",
  "this.overlay_F4C64469_E222_EF74_41E2_46F38129B912"
 ],
 "scaleMode": "fit_inside",
 "fieldOfViewOverlayOutsideOpacity": 0,
 "fieldOfViewOverlayRadiusScale": 0.16,
 "fieldOfViewOverlayInsideColor": "#FFFFFF",
 "maximumZoomFactor": 1.2
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 84.95,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_E0D7CEEF_FA43_D6B9_41EE_46E8BAB68F03",
 "automaticZoomSpeed": 10
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -40.47,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_E3BCCDC9_FA43_DAF9_41E1_4FE5CCB4B35E",
 "automaticZoomSpeed": 10
},
{
 "displayPlaybackBar": true,
 "touchControlMode": "drag_rotation",
 "buttonToggleGyroscope": "this.Button_F0FABEC7_E4EE_5375_41DD_B033D3902DC3",
 "mouseControlMode": "drag_acceleration",
 "gyroscopeEnabled": true,
 "viewerArea": "this.MainViewer",
 "id": "MainViewerPanoramaPlayer",
 "class": "PanoramaPlayer",
 "buttonToggleHotspots": "this.Button_F0FB5EC7_E4EE_5375_41E8_5828D3AD5CEC",
 "gyroscopeVerticalDraggingEnabled": true
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 164.15,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_E0C79F15_FA43_D769_41E9_F5C6135A7950",
 "automaticZoomSpeed": 10
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -50.34,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_E3AE3DDA_FA43_DA9B_41E9_158D27691A99",
 "automaticZoomSpeed": 10
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -52.72,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_E0636E45_FA43_D9E9_41E8_5735310D33F9",
 "automaticZoomSpeed": 10
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_CBCD6822_DB90_5C31_41E8_D76D0E29E1B1_camera",
 "automaticZoomSpeed": 10
},
{
 "viewerArea": "this.MapViewer",
 "id": "MapViewerMapPlayer",
 "class": "MapPlayer",
 "movementMode": "constrained"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -169.26,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_E38C6DB9_FA43_DA99_41DF_861F80BB6C89",
 "automaticZoomSpeed": 10
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_C9F9CB78_DB90_FC11_41E9_6E303CA66A0D_camera",
 "automaticZoomSpeed": 10
},
{
 "class": "MediaAudio",
 "audio": {
  "mp3Url": "media/audio_E8A93F21_FA5F_B7A9_41E3_21477D074F27.mp3",
  "class": "AudioResource",
  "oggUrl": "media/audio_E8A93F21_FA5F_B7A9_41E3_21477D074F27.ogg"
 },
 "data": {
  "label": "paisagem_1"
 },
 "id": "audio_E8A93F21_FA5F_B7A9_41E3_21477D074F27",
 "autoplay": true
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -55.71,
  "pitch": 0,
  "hfov": 104
 },
 "id": "camera_E39BADA7_FA43_DAA9_41E2_0EFE46EC9824",
 "automaticZoomSpeed": 10
},
{
 "thumbnailUrl": "media/panorama_CB758832_DBB0_7C11_41E1_D49EC19CD9F2_t.jpg",
 "partial": false,
 "label": "09",
 "class": "Panorama",
 "frames": [
  {
   "thumbnailUrl": "media/panorama_CB758832_DBB0_7C11_41E1_D49EC19CD9F2_t.jpg",
   "front": {
    "levels": [
     {
      "url": "media/panorama_CB758832_DBB0_7C11_41E1_D49EC19CD9F2_0/f/0/{row}_{column}.jpg",
      "colCount": 3,
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_CB758832_DBB0_7C11_41E1_D49EC19CD9F2_0/f/1/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CB758832_DBB0_7C11_41E1_D49EC19CD9F2_0/f/2/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_CB758832_DBB0_7C11_41E1_D49EC19CD9F2_0/u/0/{row}_{column}.jpg",
      "colCount": 3,
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_CB758832_DBB0_7C11_41E1_D49EC19CD9F2_0/u/1/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CB758832_DBB0_7C11_41E1_D49EC19CD9F2_0/u/2/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_CB758832_DBB0_7C11_41E1_D49EC19CD9F2_0/r/0/{row}_{column}.jpg",
      "colCount": 3,
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_CB758832_DBB0_7C11_41E1_D49EC19CD9F2_0/r/1/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CB758832_DBB0_7C11_41E1_D49EC19CD9F2_0/r/2/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_CB758832_DBB0_7C11_41E1_D49EC19CD9F2_0/b/0/{row}_{column}.jpg",
      "colCount": 3,
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_CB758832_DBB0_7C11_41E1_D49EC19CD9F2_0/b/1/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CB758832_DBB0_7C11_41E1_D49EC19CD9F2_0/b/2/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_CB758832_DBB0_7C11_41E1_D49EC19CD9F2_0/d/0/{row}_{column}.jpg",
      "colCount": 3,
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_CB758832_DBB0_7C11_41E1_D49EC19CD9F2_0/d/1/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CB758832_DBB0_7C11_41E1_D49EC19CD9F2_0/d/2/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "left": {
    "levels": [
     {
      "url": "media/panorama_CB758832_DBB0_7C11_41E1_D49EC19CD9F2_0/l/0/{row}_{column}.jpg",
      "colCount": 3,
      "rowCount": 3,
      "tags": "ondemand",
      "width": 1536,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_CB758832_DBB0_7C11_41E1_D49EC19CD9F2_0/l/1/{row}_{column}.jpg",
      "colCount": 2,
      "rowCount": 2,
      "tags": "ondemand",
      "width": 1024,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_CB758832_DBB0_7C11_41E1_D49EC19CD9F2_0/l/2/{row}_{column}.jpg",
      "colCount": 1,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "id": "panorama_CB758832_DBB0_7C11_41E1_D49EC19CD9F2",
 "cardboardMenu": "this.Menu_E3217D28_FA43_DBA7_41D4_EC8E3D3D5334",
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_CA423771_DBB7_F413_41C3_0D355D63A920",
   "yaw": 88.87,
   "class": "AdjacentPanorama",
   "backwardYaw": -95.05,
   "distance": 1
  }
 ],
 "vfov": 180,
 "hfovMax": 120,
 "mapLocations": [
  {
   "map": "this.map_EC81520A_E266_EAB5_41E5_A93A73CA8842",
   "x": 195.46,
   "angle": 22.88,
   "y": 375.78,
   "class": "PanoramaMapLocation"
  }
 ],
 "overlays": [
  "this.overlay_CB765832_DBB0_7C11_41C3_BFD3E65C8512",
  "this.overlay_CF15639B_DC91_CC17_41D9_49B76757C203",
  "this.overlay_F5460AA6_E00B_4D57_4196_B8FA5822BA90"
 ],
 "hfov": 360,
 "pitch": 0
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ]
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -114.36,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_E071CE1E_FA43_D99B_41D0_F5B44DF66C32",
 "automaticZoomSpeed": 10
},
{
 "toolTipBackgroundColor": "#00FFFF",
 "progressBarOpacity": 1,
 "vrPointerColor": "#FFFFFF",
 "class": "ViewerArea",
 "left": 0,
 "progressBorderSize": 0,
 "id": "MainViewer",
 "playbackBarHeadShadowOpacity": 0.7,
 "width": "100%",
 "toolTipBorderSize": 1,
 "playbackBarBorderColor": "#FFFFFF",
 "toolTipPaddingRight": 6,
 "paddingLeft": 0,
 "paddingBottom": 0,
 "toolTipPaddingTop": 4,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "minHeight": 50,
 "toolTipPaddingLeft": 6,
 "progressBorderRadius": 0,
 "toolTipDisplayTime": 600,
 "playbackBarHeadHeight": 15,
 "borderRadius": 0,
 "playbackBarLeft": 0,
 "toolTipBorderRadius": 3,
 "progressBackgroundColorRatios": [
  0,
  1
 ],
 "progressBackgroundColorDirection": "vertical",
 "playbackBarHeadShadowBlurRadius": 3,
 "height": "100%",
 "borderSize": 0,
 "playbackBarBottom": 5,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "displayTooltipInTouchScreens": true,
 "progressBarBackgroundColorRatios": [
  0
 ],
 "minWidth": 100,
 "playbackBarHeadOpacity": 1,
 "progressBorderColor": "#000000",
 "toolTipShadowSpread": 0,
 "progressBarBorderColor": "#000000",
 "toolTipBorderColor": "#767676",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "progressBackgroundColor": [
  "#000000",
  "#000000"
 ],
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "toolTipOpacity": 1,
 "paddingTop": 0,
 "playbackBarHeight": 10,
 "shadow": false,
 "toolTipShadowBlurRadius": 3,
 "toolTipFontSize": "12px",
 "playbackBarRight": 0,
 "toolTipTextShadowColor": "#000000",
 "playbackBarBackgroundColorDirection": "vertical",
 "transitionDuration": 500,
 "playbackBarHeadWidth": 6,
 "toolTipTextShadowBlurRadius": 3,
 "toolTipPaddingBottom": 4,
 "toolTipFontWeight": "normal",
 "progressBarBorderRadius": 0,
 "progressBarBorderSize": 0,
 "playbackBarProgressBorderRadius": 0,
 "playbackBarProgressBorderSize": 0,
 "paddingRight": 0,
 "toolTipShadowColor": "#333333",
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderRadius": 0,
 "playbackBarBorderRadius": 0,
 "playbackBarHeadBorderColor": "#000000",
 "progressLeft": 0,
 "playbackBarHeadShadowHorizontalLength": 0,
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "playbackBarBorderSize": 0,
 "toolTipFontStyle": "normal",
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarBackgroundOpacity": 1,
 "playbackBarHeadShadowVerticalLength": 0,
 "propagateClick": false,
 "toolTipTextShadowOpacity": 0,
 "toolTipShadowOpacity": 1,
 "transitionMode": "blending",
 "toolTipFontFamily": "Arial",
 "playbackBarHeadShadowColor": "#000000",
 "top": 0,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "toolTipShadowHorizontalLength": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "progressBarBackgroundColorDirection": "vertical",
 "toolTipShadowVerticalLength": 0,
 "progressBottom": 0,
 "playbackBarHeadShadow": true,
 "progressHeight": 10,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "data": {
  "name": "Main Viewer"
 },
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "toolTipFontColor": "#606060"
},
{
 "toolTipBackgroundColor": "#00FFFF",
 "progressBarOpacity": 1,
 "vrPointerColor": "#FFFFFF",
 "class": "ViewerArea",
 "left": "11.8%",
 "progressBorderSize": 0,
 "id": "MapViewer",
 "playbackBarHeadShadowOpacity": 0.7,
 "width": "33.034%",
 "toolTipBorderSize": 1,
 "playbackBarBorderColor": "#FFFFFF",
 "toolTipPaddingRight": 6,
 "paddingLeft": 0,
 "paddingBottom": 0,
 "toolTipPaddingTop": 4,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "minHeight": 1,
 "toolTipPaddingLeft": 6,
 "progressBorderRadius": 0,
 "toolTipDisplayTime": 600,
 "playbackBarHeadHeight": 15,
 "borderRadius": 0,
 "playbackBarLeft": 0,
 "toolTipBorderRadius": 3,
 "progressBackgroundColorRatios": [
  0,
  1
 ],
 "progressBackgroundColorDirection": "vertical",
 "playbackBarHeadShadowBlurRadius": 3,
 "height": "48.709%",
 "borderSize": 0,
 "minWidth": 1,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "displayTooltipInTouchScreens": true,
 "progressBarBackgroundColorRatios": [
  0
 ],
 "playbackBarBottom": 0,
 "playbackBarHeadOpacity": 1,
 "progressBorderColor": "#000000",
 "toolTipShadowSpread": 0,
 "progressBarBorderColor": "#000000",
 "toolTipBorderColor": "#767676",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "progressBackgroundColor": [
  "#000000",
  "#000000"
 ],
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "toolTipOpacity": 1,
 "paddingTop": 0,
 "playbackBarHeight": 10,
 "shadow": false,
 "toolTipShadowBlurRadius": 3,
 "toolTipFontSize": "12px",
 "playbackBarRight": 0,
 "toolTipTextShadowColor": "#000000",
 "playbackBarBackgroundColorDirection": "vertical",
 "transitionDuration": 500,
 "playbackBarHeadWidth": 6,
 "toolTipTextShadowBlurRadius": 3,
 "toolTipPaddingBottom": 4,
 "toolTipFontWeight": "normal",
 "progressBarBorderRadius": 0,
 "progressBarBorderSize": 0,
 "playbackBarProgressBorderRadius": 0,
 "playbackBarProgressBorderSize": 0,
 "paddingRight": 0,
 "toolTipShadowColor": "#333333",
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderRadius": 0,
 "playbackBarBorderRadius": 0,
 "playbackBarHeadBorderColor": "#000000",
 "progressLeft": 0,
 "playbackBarHeadShadowHorizontalLength": 0,
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "bottom": "21.9%",
 "playbackBarBorderSize": 0,
 "toolTipShadowOpacity": 1,
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarBackgroundOpacity": 1,
 "playbackBarHeadShadowVerticalLength": 0,
 "propagateClick": false,
 "toolTipTextShadowOpacity": 0,
 "toolTipFontStyle": "normal",
 "transitionMode": "fade_out_fade_in",
 "toolTipFontFamily": "Arial",
 "playbackBarHeadShadowColor": "#000000",
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "toolTipShadowHorizontalLength": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "progressBarBackgroundColorDirection": "vertical",
 "toolTipShadowVerticalLength": 0,
 "progressBottom": 2,
 "playbackBarHeadShadow": true,
 "progressHeight": 10,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "data": {
  "name": "foor"
 },
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "visible": false,
 "toolTipFontColor": "#606060"
},
{
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "-button set"
 },
 "class": "Container",
 "left": 46,
 "creationPolicy": "inAdvance",
 "width": 60,
 "id": "Container_F0FB7EC7_E4EE_5375_41DE_E8AFA242BCDC",
 "paddingRight": 0,
 "children": [
  "this.IconButton_F953B66C_E4B3_F33A_41E4_417B1EFF1228",
  "this.IconButton_F0745506_E4F1_F6F6_41CD_D7A14257209E",
  "this.IconButton_EB0C8DDE_E4D2_F117_41D3_B9E6A5071D2C",
  "this.Button_F0FA9EC7_E4EE_5375_41BE_F26B3FC7C264",
  "this.Button_F0FABEC7_E4EE_5375_41DD_B033D3902DC3",
  "this.Button_F0FB4EC7_E4EE_5375_41CF_622F4DD6CA59",
  "this.Button_F0FB5EC7_E4EE_5375_41E8_5828D3AD5CEC",
  "this.Button_F0FB6EC7_E4EE_5375_41E4_BF58E8BED9C0"
 ],
 "contentOpaque": true,
 "paddingLeft": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0.14,
 "verticalAlign": "middle",
 "scrollBarMargin": 2,
 "minHeight": 1,
 "borderRadius": 0,
 "bottom": "13.2%",
 "height": 515.03,
 "propagateClick": false,
 "minWidth": 1,
 "backgroundColorRatios": [
  0.01
 ],
 "backgroundColor": [
  "#333333"
 ],
 "borderSize": 0,
 "scrollBarWidth": 10,
 "overflow": "scroll",
 "gap": 3,
 "horizontalAlign": "center",
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "scrollBarColor": "#000000",
 "shadow": false,
 "layout": "vertical"
},
{
 "scrollBarVisible": "rollOver",
 "class": "Container",
 "left": "90.06%",
 "creationPolicy": "inAdvance",
 "children": [
  "this.IconButton_C02767A0_E5BE_712A_41CC_81C3F92FFCE5"
 ],
 "id": "Container_C143FBBC_E571_D11A_41C7_2D68CD2F6918",
 "right": "2.09%",
 "paddingRight": 0,
 "paddingLeft": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "verticalAlign": "middle",
 "contentOpaque": true,
 "scrollBarMargin": 2,
 "minHeight": 1,
 "borderRadius": 0,
 "bottom": "4.35%",
 "top": "84.08%",
 "propagateClick": false,
 "minWidth": 1,
 "borderSize": 0,
 "scrollBarWidth": 10,
 "overflow": "visible",
 "gap": 0,
 "horizontalAlign": "center",
 "data": {
  "name": "Container23602"
 },
 "paddingTop": 0,
 "scrollBarColor": "#000000",
 "shadow": false,
 "scrollBarOpacity": 0.5,
 "layout": "absolute"
},
{
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "class": "HTMLText",
 "width": "33.11%",
 "id": "HTMLText_F47F2DC0_FA45_7AE7_41E0_406528D874BE",
 "shadowBlurRadius": 7,
 "right": "6%",
 "shadowSpread": 1,
 "paddingRight": 20,
 "shadowColor": "#000000",
 "paddingLeft": 20,
 "paddingBottom": 10,
 "backgroundOpacity": 0.91,
 "shadowVerticalLength": 2,
 "scrollBarMargin": 2,
 "minHeight": 1,
 "shadowOpacity": 0.19,
 "borderRadius": 10,
 "propagateClick": false,
 "backgroundColor": [
  "#FFFFFF",
  "#CCCCCC"
 ],
 "top": "15.1%",
 "minWidth": 1,
 "backgroundColorRatios": [
  0.73,
  1
 ],
 "height": "60.959%",
 "borderSize": 0,
 "scrollBarWidth": 10,
 "shadowHorizontalLength": 2,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#0099ff;font-size:37px;\"><B>Informa\u00e7\u00f5es</B></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:22px;\"><B>Apartamento com 2 Quartos e 1 banheiro</B></SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:12px;\"><BR STYLE=\"letter-spacing:0px;color:#000000;font-size:12px;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:justify;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-size:12px;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#333333;\">Im\u00f3vel aconchegante para alugar com 2 quartos e 1 banheiro no total. O condom\u00ednio \u00e9 bem equipado com diversas instala\u00e7\u00f5es, apropriado para quem busca lazer sem sair de casa e fica localizado em Avenida Doutor Felipe Pinel no bairro Pirituba em S\u00e3o Paulo. Est\u00e1 pr\u00f3ximo a pontos de interesse de Pirituba, tais como Esta\u00e7\u00e3o Jaragu\u00e1 e Adelia Costa e Silva Col\u00e9gio.</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:12px;\"><BR STYLE=\"letter-spacing:0px;color:#000000;font-size:12px;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:justify;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#333333;font-size:16px;\"><B>Itens dispon\u00edveis</B></SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:16px;\"><BR STYLE=\"letter-spacing:0px;color:#000000;font-size:12px;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:justify;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-size:12px;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#333333;font-size:15px;\">  \u2022  </SPAN><SPAN STYLE=\"color:#333333;\">Chuveiro a g\u00e1s</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:12px;\"><BR STYLE=\"letter-spacing:0px;color:#000000;font-size:12px;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:justify;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-size:12px;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#333333;font-size:15px;\">  \u2022  </SPAN><SPAN STYLE=\"color:#333333;\">Cozinha americana</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:12px;\"><BR STYLE=\"letter-spacing:0px;color:#000000;font-size:12px;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:justify;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-size:12px;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#333333;font-size:15px;\">  \u2022  </SPAN><SPAN STYLE=\"color:#333333;\">Jardim</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:12px;\"><BR STYLE=\"letter-spacing:0px;color:#000000;font-size:12px;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:justify;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-size:12px;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#333333;font-size:15px;\">  \u2022  </SPAN><SPAN STYLE=\"color:#333333;\">Quartos e corredores com portas amplas</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:12px;\"><BR STYLE=\"letter-spacing:0px;color:#000000;font-size:12px;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:justify;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-size:12px;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#333333;font-size:15px;\">  \u2022  </SPAN><SPAN STYLE=\"color:#333333;\">Somente uma casa no terreno</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:12px;\"><BR STYLE=\"letter-spacing:0px;color:#000000;font-size:12px;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:justify;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-size:12px;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#333333;font-size:15px;\">  \u2022  </SPAN><SPAN STYLE=\"color:#333333;\">\u00c1rea de servi\u00e7o</SPAN></SPAN></DIV></div>",
 "backgroundColorDirection": "vertical",
 "paddingTop": 20,
 "scrollBarColor": "#000000",
 "shadow": true,
 "visible": false,
 "data": {
  "name": "Info"
 }
},
{
 "textDecoration": "none",
 "layout": "horizontal",
 "data": {
  "name": "Button Settings Fullscreen"
 },
 "iconURL": "skin/Button_F0FB6EC7_E4EE_5375_41E4_BF58E8BED9C0.png",
 "class": "Button",
 "fontStyle": "normal",
 "width": 60,
 "id": "Button_F0FB6EC7_E4EE_5375_41E4_BF58E8BED9C0",
 "fontFamily": "Arial",
 "shadowBlurRadius": 6,
 "shadowSpread": 1,
 "paddingRight": 0,
 "shadowColor": "#000000",
 "iconHeight": 30,
 "pressedIconWidth": 30,
 "paddingLeft": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "iconWidth": 30,
 "verticalAlign": "middle",
 "minHeight": 1,
 "borderRadius": 0,
 "borderColor": "#000000",
 "borderSize": 0,
 "propagateClick": false,
 "minWidth": 1,
 "mode": "toggle",
 "backgroundColorRatios": [
  0
 ],
 "height": 60,
 "fontSize": 12,
 "pressedIconURL": "skin/Button_F0FB6EC7_E4EE_5375_41E4_BF58E8BED9C0_pressed.png",
 "rollOverBackgroundOpacity": 1,
 "gap": 5,
 "backgroundColor": [
  "#FFFF00"
 ],
 "fontColor": "#FFFF00",
 "iconBeforeLabel": true,
 "pressedIconHeight": 30,
 "horizontalAlign": "center",
 "rollOverBackgroundColor": [
  "#00FFFF"
 ],
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "shadow": false,
 "cursor": "hand",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "fontWeight": "normal"
},
{
 "textDecoration": "none",
 "layout": "horizontal",
 "data": {
  "name": "Button Settings Mute"
 },
 "iconURL": "skin/Button_F0FB4EC7_E4EE_5375_41CF_622F4DD6CA59.png",
 "class": "Button",
 "fontStyle": "normal",
 "width": 60,
 "id": "Button_F0FB4EC7_E4EE_5375_41CF_622F4DD6CA59",
 "fontFamily": "Arial",
 "shadowBlurRadius": 6,
 "shadowSpread": 1,
 "paddingRight": 0,
 "shadowColor": "#000000",
 "iconHeight": 30,
 "pressedIconWidth": 30,
 "paddingLeft": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "iconWidth": 30,
 "verticalAlign": "middle",
 "minHeight": 1,
 "borderRadius": 0,
 "borderColor": "#000000",
 "borderSize": 0,
 "propagateClick": false,
 "minWidth": 1,
 "mode": "toggle",
 "backgroundColorRatios": [
  0
 ],
 "height": 60,
 "fontSize": 12,
 "pressedIconURL": "skin/Button_F0FB4EC7_E4EE_5375_41CF_622F4DD6CA59_pressed.png",
 "rollOverBackgroundOpacity": 1,
 "gap": 5,
 "backgroundColor": [
  "#00FFFF"
 ],
 "fontColor": "#FFFFFF",
 "iconBeforeLabel": true,
 "pressedIconHeight": 30,
 "horizontalAlign": "center",
 "rollOverBackgroundColor": [
  "#00FFFF"
 ],
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "shadow": false,
 "cursor": "hand",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "fontWeight": "normal"
},
{
 "media": "this.panorama_D4373514_DBB0_5411_41E3_3F811A9931A3",
 "class": "PanoramaPlayListItem",
 "player": "this.MainViewerPanoramaPlayer",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_E3382D22_FA43_DBAB_41E3_9D5BE4D89F76, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 0, 1)",
 "camera": "this.panorama_D4373514_DBB0_5411_41E3_3F811A9931A3_camera",
 "id": "PanoramaPlayListItem_E3382D22_FA43_DBAB_41E3_9D5BE4D89F76"
},
{
 "media": "this.panorama_D4A11BCC_DBB0_FC71_41D0_94884094A022",
 "class": "PanoramaPlayListItem",
 "player": "this.MainViewerPanoramaPlayer",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_E327DD22_FA43_DBAB_41D2_236B8B35B4B7, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 1, 2)",
 "camera": "this.panorama_D4A11BCC_DBB0_FC71_41D0_94884094A022_camera",
 "id": "PanoramaPlayListItem_E327DD22_FA43_DBAB_41D2_236B8B35B4B7"
},
{
 "media": "this.panorama_D4F951E6_DBB0_4C31_41C3_F5A2780BAC65",
 "class": "PanoramaPlayListItem",
 "player": "this.MainViewerPanoramaPlayer",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_E3274D23_FA43_DBA9_41E5_16DF5EE9CBAD, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 2, 3)",
 "camera": "this.panorama_D4F951E6_DBB0_4C31_41C3_F5A2780BAC65_camera",
 "id": "PanoramaPlayListItem_E3274D23_FA43_DBA9_41E5_16DF5EE9CBAD"
},
{
 "media": "this.panorama_CBFBDDCD_DB91_D473_41BC_ACAA1C31DBB5",
 "class": "PanoramaPlayListItem",
 "player": "this.MainViewerPanoramaPlayer",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_E3261D23_FA43_DBA9_41EA_1B964C1C45FE, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 3, 4)",
 "camera": "this.panorama_CBFBDDCD_DB91_D473_41BC_ACAA1C31DBB5_camera",
 "id": "PanoramaPlayListItem_E3261D23_FA43_DBA9_41EA_1B964C1C45FE"
},
{
 "media": "this.panorama_CA0D2937_DB90_5C1F_41C1_3A22D6FAEAF2",
 "class": "PanoramaPlayListItem",
 "player": "this.MainViewerPanoramaPlayer",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_E3259D24_FA43_DBAF_41DD_71804F35CE15, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 4, 5)",
 "camera": "this.panorama_CA0D2937_DB90_5C1F_41C1_3A22D6FAEAF2_camera",
 "id": "PanoramaPlayListItem_E3259D24_FA43_DBAF_41DD_71804F35CE15"
},
{
 "media": "this.panorama_C9F9CB78_DB90_FC11_41E9_6E303CA66A0D",
 "class": "PanoramaPlayListItem",
 "player": "this.MainViewerPanoramaPlayer",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_E3256D24_FA43_DBAF_41E8_7B5056A93602, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 5, 6)",
 "camera": "this.panorama_C9F9CB78_DB90_FC11_41E9_6E303CA66A0D_camera",
 "id": "PanoramaPlayListItem_E3256D24_FA43_DBAF_41E8_7B5056A93602"
},
{
 "media": "this.panorama_CBCD6822_DB90_5C31_41E8_D76D0E29E1B1",
 "class": "PanoramaPlayListItem",
 "player": "this.MainViewerPanoramaPlayer",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_E3243D25_FA43_DBA9_41D1_776DCB88C7C1, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 6, 7)",
 "camera": "this.panorama_CBCD6822_DB90_5C31_41E8_D76D0E29E1B1_camera",
 "id": "PanoramaPlayListItem_E3243D25_FA43_DBA9_41D1_776DCB88C7C1"
},
{
 "media": "this.panorama_CA423771_DBB7_F413_41C3_0D355D63A920",
 "class": "PanoramaPlayListItem",
 "player": "this.MainViewerPanoramaPlayer",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_E3238D25_FA43_DBA9_41BA_A96BDF4DECE5, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 7, 8)",
 "camera": "this.panorama_CA423771_DBB7_F413_41C3_0D355D63A920_camera",
 "id": "PanoramaPlayListItem_E3238D25_FA43_DBA9_41BA_A96BDF4DECE5"
},
{
 "media": "this.panorama_CB758832_DBB0_7C11_41E1_D49EC19CD9F2",
 "end": "this.trigger('tourEnded')",
 "class": "PanoramaPlayListItem",
 "player": "this.MainViewerPanoramaPlayer",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_E3235D26_FA43_DBAB_41D6_0B78799BBA4F, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 8, 0)",
 "camera": "this.panorama_CB758832_DBB0_7C11_41E1_D49EC19CD9F2_camera",
 "id": "PanoramaPlayListItem_E3235D26_FA43_DBAB_41D6_0B78799BBA4F"
},
{
 "class": "LensFlarePanoramaOverlay",
 "bleachingDistance": 0.52,
 "bleaching": 0.84,
 "pitch": 18,
 "id": "overlay_CA0D0937_DB90_5C1F_41C4_B64349792813",
 "yaw": -9.94
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CBFBDDCD_DB91_D473_41BC_ACAA1C31DBB5, this.camera_E0C79F15_FA43_D769_41E9_F5C6135A7950); this.mainPlayList.set('selectedIndex', 3)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 21.87,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CA0D2937_DB90_5C1F_41C1_3A22D6FAEAF2_0_HS_0_0.png",
      "width": 236,
      "class": "ImageResourceLevel",
      "height": 883
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 5.63,
   "roll": 0,
   "yaw": 129.66
  }
 ],
 "id": "overlay_CA0DE937_DB90_5C1F_41B7_36194306DD6E",
 "data": {
  "label": "Polygon"
 },
 "rollOverDisplay": true,
 "maps": [
  {
   "yaw": 129.66,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_CA0D2937_DB90_5C1F_41C1_3A22D6FAEAF2_0_HS_0_1_0_map.gif",
      "width": 53,
      "class": "ImageResourceLevel",
      "height": 200
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 5.63,
   "hfov": 21.87
  }
 ]
},
{
 "videoVisibleOnStop": true,
 "data": {
  "label": "Video"
 },
 "class": "VideoPanoramaOverlay",
 "autoplay": false,
 "blending": 0.09,
 "loop": false,
 "id": "overlay_F0A3B908_E00E_CF5C_41BE_951744098ED8",
 "image": {
  "levels": [
   {
    "url": "media/overlay_F0A3B908_E00E_CF5C_41BE_951744098ED8_t.jpg",
    "width": 720,
    "class": "ImageResourceLevel",
    "height": 480
   }
  ],
  "class": "ImageResource"
 },
 "pitch": 5.87,
 "enabledInCardboard": true,
 "roll": 3.32,
 "click": "if(this.overlay_F0A3B908_E00E_CF5C_41BE_951744098ED8.get('state') != 'playing'){ this.overlay_F0A3B908_E00E_CF5C_41BE_951744098ED8.play(); } else { this.overlay_F0A3B908_E00E_CF5C_41BE_951744098ED8.pause(); }",
 "yaw": 67.76,
 "vfov": 10.33,
 "rotationY": -19.59,
 "rotationX": -6.39,
 "useHandCursor": true,
 "hfov": 16.03,
 "distance": 50,
 "video": {
  "mp4Url": "media/video_F07A4F69_E00D_43DD_41E7_FF7000D69CFB.mp4",
  "width": 720,
  "class": "VideoResource",
  "height": 480
 }
},
{
 "class": "LensFlarePanoramaOverlay",
 "bleachingDistance": 0.72,
 "bleaching": 0.8,
 "pitch": 10.83,
 "id": "overlay_CA422772_DBB7_F410_41DF_870376CAF14D",
 "yaw": -98.55
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_D4A11BCC_DBB0_FC71_41D0_94884094A022, this.camera_E3DAAD48_FA43_DBE7_41EC_40F4DE7C654B); this.mainPlayList.set('selectedIndex', 1)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 90,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CA423771_DBB7_F413_41C3_0D355D63A920_0_HS_1_00000.png",
      "width": 608,
      "class": "ImageResourceLevel",
      "height": 608
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0,
   "roll": 0,
   "yaw": 0
  },
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CA423771_DBB7_F413_41C3_0D355D63A920_0_HS_1_00001.png",
      "width": 608,
      "class": "ImageResourceLevel",
      "height": 608
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0,
   "yaw": 90,
   "hfov": 90
  },
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CA423771_DBB7_F413_41C3_0D355D63A920_0_HS_1_00004.png",
      "width": 608,
      "class": "ImageResourceLevel",
      "height": 608
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 90,
   "yaw": 0,
   "hfov": 90
  },
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CA423771_DBB7_F413_41C3_0D355D63A920_0_HS_1_00005.png",
      "width": 608,
      "class": "ImageResourceLevel",
      "height": 608
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -90,
   "yaw": 0,
   "hfov": 90
  }
 ],
 "id": "overlay_CA424772_DBB7_F410_41E5_CBD229C07280",
 "data": {
  "label": "Polygon"
 },
 "rollOverDisplay": true,
 "maps": [
  {
   "yaw": 0,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_CA423771_DBB7_F413_41C3_0D355D63A920_0_HS_1_1_0_map.gif",
      "width": 200,
      "class": "ImageResourceLevel",
      "height": 200
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0,
   "hfov": 90
  },
  {
   "yaw": 90,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_CA423771_DBB7_F413_41C3_0D355D63A920_0_HS_1_2_1_map.gif",
      "width": 200,
      "class": "ImageResourceLevel",
      "height": 200
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0,
   "hfov": 90
  },
  {
   "yaw": 0,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_CA423771_DBB7_F413_41C3_0D355D63A920_0_HS_1_3_4_map.gif",
      "width": 200,
      "class": "ImageResourceLevel",
      "height": 200
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 90,
   "hfov": 90
  },
  {
   "yaw": 0,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_CA423771_DBB7_F413_41C3_0D355D63A920_0_HS_1_4_5_map.gif",
      "width": 200,
      "class": "ImageResourceLevel",
      "height": 200
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -90,
   "hfov": 90
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "rollOver": "this.AnimatedImageResource_EB05C9F7_E4D2_5116_41C5_E6803030810E.play()",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CB758832_DBB0_7C11_41E1_D49EC19CD9F2, this.camera_E3CF0D5B_FA43_DB99_41EA_D135D5473930); this.mainPlayList.set('selectedIndex', 8); this.AnimatedImageResource_EB05C9F7_E4D2_5116_41C5_E6803030810E.stop()"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_EB05C9F7_E4D2_5116_41C5_E6803030810E",
   "pitch": -27.11,
   "yaw": -95.05,
   "hfov": 14.99,
   "distance": 50
  }
 ],
 "id": "overlay_CF31A32C_DC90_CC31_41D5_F2D3F839AC8B",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": -95.05,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_CA423771_DBB7_F413_41C3_0D355D63A920_1_HS_2_0_0_map.gif",
      "width": 33,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -27.11,
   "hfov": 14.99
  }
 ]
},
{
 "class": "LensFlarePanoramaOverlay",
 "bleachingDistance": 0.4,
 "bleaching": 0.78,
 "pitch": 37.55,
 "id": "overlay_C9F96B78_DB90_FC11_41CE_3AB63512CE50",
 "yaw": 176.09
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CBFBDDCD_DB91_D473_41BC_ACAA1C31DBB5, this.camera_E071CE1E_FA43_D99B_41D0_F5B44DF66C32); this.mainPlayList.set('selectedIndex', 3)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 50.69,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_C9F9CB78_DB90_FC11_41E9_6E303CA66A0D_0_HS_0_0.png",
      "width": 579,
      "class": "ImageResourceLevel",
      "height": 1811
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0.41,
   "roll": 0,
   "yaw": 10.74
  }
 ],
 "id": "overlay_C9FE9B79_DB90_FC13_41E5_5514ED05B836",
 "data": {
  "label": "Polygon"
 },
 "rollOverDisplay": true,
 "maps": [
  {
   "yaw": 10.74,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_C9F9CB78_DB90_FC11_41E9_6E303CA66A0D_0_HS_0_1_0_map.gif",
      "width": 63,
      "class": "ImageResourceLevel",
      "height": 200
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0.41,
   "hfov": 50.69
  }
 ]
},
{
 "class": "LensFlarePanoramaOverlay",
 "bleachingDistance": 0.75,
 "bleaching": 0.85,
 "pitch": 4.97,
 "id": "overlay_D436E515_DBB0_5413_41B7_817FEDE59BFE",
 "yaw": 113.21
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "rollOver": "this.AnimatedImageResource_EB7CE9E3_E4D2_512E_41E0_8FCE18ED4C7B.play()",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_D4A11BCC_DBB0_FC71_41D0_94884094A022, this.camera_E3F28D6E_FA43_DBBB_41DE_8B5F3ECA681D); this.mainPlayList.set('selectedIndex', 1); this.AnimatedImageResource_EB7CE9E3_E4D2_512E_41E0_8FCE18ED4C7B.stop()"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_EB7CE9E3_E4D2_512E_41E0_8FCE18ED4C7B",
   "pitch": -21.99,
   "yaw": 153.41,
   "hfov": 8.26,
   "distance": 50
  }
 ],
 "id": "overlay_D436F515_DBB0_5413_41E4_665E78635BB8",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": 153.41,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_D4373514_DBB0_5411_41E3_3F811A9931A3_1_HS_3_0_0_map.gif",
      "width": 33,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -21.99,
   "hfov": 8.26
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 4)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 8.15,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_D4373514_DBB0_5411_41E3_3F811A9931A3_1_HS_4_0.png",
      "width": 87,
      "class": "ImageResourceLevel",
      "height": 318
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 4.82,
   "roll": 0,
   "yaw": 137.97
  }
 ],
 "id": "overlay_D43DA1A2_DB90_CC31_41B7_C8AB4A8B6314",
 "data": {
  "label": "Polygon"
 },
 "rollOverDisplay": true,
 "maps": [
  {
   "yaw": 137.97,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_D4373514_DBB0_5411_41E3_3F811A9931A3_1_HS_4_1_0_map.gif",
      "width": 43,
      "class": "ImageResourceLevel",
      "height": 159
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 4.82,
   "hfov": 8.15
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "rollOver": "this.AnimatedImageResource_EB7D29EA_E4D2_513E_41DB_97D187AB4F36.play()",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_D4F951E6_DBB0_4C31_41C3_F5A2780BAC65, this.camera_E3EA4D94_FA43_DB6F_41DC_31BF19DEF47C); this.mainPlayList.set('selectedIndex', 1); this.mainPlayList.set('selectedIndex', 2); this.AnimatedImageResource_EB7D29EA_E4D2_513E_41DB_97D187AB4F36.stop()"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_EB7D29EA_E4D2_513E_41DB_97D187AB4F36",
   "pitch": -12.89,
   "yaw": 122.02,
   "hfov": 9.89,
   "distance": 50
  }
 ],
 "id": "overlay_F304BA2B_E03B_4D5D_41D3_63C78BDC7DDF",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": 122.02,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_D4373514_DBB0_5411_41E3_3F811A9931A3_1_HS_5_0_0_map.gif",
      "width": 33,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -12.89,
   "hfov": 9.89
  }
 ]
},
{
 "class": "LensFlarePanoramaOverlay",
 "bleachingDistance": 0.58,
 "bleaching": 0.81,
 "pitch": 24.84,
 "id": "overlay_D4F931E6_DBB0_4C31_41D7_92DF625C8DFA",
 "yaw": 103.11
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 7)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 7.9,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_D4F951E6_DBB0_4C31_41C3_F5A2780BAC65_0_HS_0_0.png",
      "width": 84,
      "class": "ImageResourceLevel",
      "height": 429
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 1.96,
   "roll": 0,
   "yaw": -37.58
  }
 ],
 "id": "overlay_D4F8F1E7_DBB0_4C3F_41E3_4855E722B0BA",
 "data": {
  "label": "Polygon"
 },
 "rollOverDisplay": true,
 "maps": [
  {
   "yaw": -37.58,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_D4F951E6_DBB0_4C31_41C3_F5A2780BAC65_0_HS_0_1_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 200
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 1.96,
   "hfov": 7.9
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "rollOver": "this.AnimatedImageResource_EB7F89ED_E4D2_513A_41D7_E074C0656CBD.play()",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CBFBDDCD_DB91_D473_41BC_ACAA1C31DBB5, this.camera_E09C4F9E_FA43_D69B_41EC_ECB1F89F3BC1); this.mainPlayList.set('selectedIndex', 3); this.AnimatedImageResource_EB7F89ED_E4D2_513A_41D7_E074C0656CBD.stop()"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_EB7F89ED_E4D2_513A_41D7_E074C0656CBD",
   "pitch": -19.8,
   "yaw": -103.09,
   "hfov": 9.33,
   "distance": 50
  }
 ],
 "id": "overlay_CE35D269_DC90_CC33_41E3_5F31BDC8D2C4",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": -103.09,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_D4F951E6_DBB0_4C31_41C3_F5A2780BAC65_1_HS_3_0_0_map.gif",
      "width": 33,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -19.8,
   "hfov": 9.33
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 6)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 15.71,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_D4F951E6_DBB0_4C31_41C3_F5A2780BAC65_0_HS_4_0.png",
      "width": 168,
      "class": "ImageResourceLevel",
      "height": 572
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 4.07,
   "roll": 0,
   "yaw": -102.43
  }
 ],
 "id": "overlay_CD699DA3_DC90_3430_4171_AD352D14A8F5",
 "data": {
  "label": "Polygon"
 },
 "rollOverDisplay": true,
 "maps": [
  {
   "yaw": -102.43,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_D4F951E6_DBB0_4C31_41C3_F5A2780BAC65_0_HS_4_1_0_map.gif",
      "width": 58,
      "class": "ImageResourceLevel",
      "height": 200
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 4.07,
   "hfov": 15.71
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 6.27,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_D4F951E6_DBB0_4C31_41C3_F5A2780BAC65_0_HS_5_0.png",
      "width": 66,
      "class": "ImageResourceLevel",
      "height": 324
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 10.92,
   "roll": 0,
   "yaw": -114.9
  }
 ],
 "id": "overlay_CDF702AB_DC91_CC30_41CC_A6A2EF8B23FB",
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": true,
 "maps": [
  {
   "yaw": -114.9,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_D4F951E6_DBB0_4C31_41C3_F5A2780BAC65_0_HS_5_1_0_map.gif",
      "width": 33,
      "class": "ImageResourceLevel",
      "height": 162
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 10.92,
   "hfov": 6.27
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "rollOver": "this.AnimatedImageResource_EB78C9ED_E4D2_513A_41E5_048CA4315565.play()",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CBFBDDCD_DB91_D473_41BC_ACAA1C31DBB5, this.camera_E08C7FAF_FA43_D6B9_41E6_C3F91E7F4CC6); this.mainPlayList.set('selectedIndex', 3); this.mainPlayList.set('selectedIndex', 1); this.AnimatedImageResource_EB78C9ED_E4D2_513A_41E5_048CA4315565.stop()"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_EB78C9ED_E4D2_513A_41E5_048CA4315565",
   "pitch": -15.04,
   "yaw": -73.03,
   "hfov": 7.49,
   "distance": 50
  }
 ],
 "id": "overlay_CE2949D7_DC90_DC1F_41E4_12225F2BC492",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": -73.03,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_D4F951E6_DBB0_4C31_41C3_F5A2780BAC65_1_HS_6_0_0_map.gif",
      "width": 33,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -15.04,
   "hfov": 7.49
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "rollOver": "this.AnimatedImageResource_EB78A9EE_E4D2_5136_41D7_962717C19677.play()",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CBFBDDCD_DB91_D473_41BC_ACAA1C31DBB5, this.camera_E0BE5FC0_FA43_D6E7_41D8_16DF0CF0272A); this.mainPlayList.set('selectedIndex', 3); this.mainPlayList.set('selectedIndex', 1); this.mainPlayList.set('selectedIndex', 0); this.AnimatedImageResource_EB78A9EE_E4D2_5136_41D7_962717C19677.stop()"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_EB78A9EE_E4D2_5136_41D7_962717C19677",
   "pitch": -13.97,
   "yaw": -47.81,
   "hfov": 5.84,
   "distance": 50
  }
 ],
 "id": "overlay_CED290E4_DC97_CC31_41DC_322188572E38",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": -47.81,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_D4F951E6_DBB0_4C31_41C3_F5A2780BAC65_1_HS_7_0_0_map.gif",
      "width": 33,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -13.97,
   "hfov": 5.84
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "if(this.AnimatedImageResource_EB79C9EE_E4D2_5136_41E7_30B41871097E.get('state') != 'playing'){ this.AnimatedImageResource_EB79C9EE_E4D2_5136_41E7_30B41871097E.play(); } else { this.AnimatedImageResource_EB79C9EE_E4D2_5136_41E7_30B41871097E.stop(); }"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_EB79C9EE_E4D2_5136_41E7_30B41871097E",
   "pitch": -3.94,
   "yaw": -157.08,
   "hfov": 35.09,
   "distance": 50
  }
 ],
 "id": "overlay_F3AEB6A6_E00B_4557_419C_483F6091DE1D",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": -157.08,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_D4F951E6_DBB0_4C31_41C3_F5A2780BAC65_1_HS_10_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -3.94,
   "hfov": 35.09
  }
 ]
},
{
 "videoVisibleOnStop": true,
 "data": {
  "label": "Video"
 },
 "class": "VideoPanoramaOverlay",
 "autoplay": true,
 "blending": 0.04,
 "loop": false,
 "id": "overlay_C4F05C39_E557_D71A_41EA_040FE899353C",
 "image": {
  "levels": [
   {
    "url": "media/overlay_C4F05C39_E557_D71A_41EA_040FE899353C_t.jpg",
    "width": 854,
    "class": "ImageResourceLevel",
    "height": 480
   }
  ],
  "class": "ImageResource"
 },
 "pitch": 21.36,
 "enabledInCardboard": true,
 "roll": 2.6,
 "click": "if(this.overlay_C4F05C39_E557_D71A_41EA_040FE899353C.get('state') != 'playing'){ this.overlay_C4F05C39_E557_D71A_41EA_040FE899353C.play(); } else { this.overlay_C4F05C39_E557_D71A_41EA_040FE899353C.pause(); }",
 "yaw": -169.5,
 "vfov": 32.34,
 "rotationY": -9.44,
 "stateChange": "if(this.overlay_C4F05C39_E557_D71A_41EA_040FE899353C.get('state') == 'playing'){ this.pauseGlobalAudios('overlay_C4F05C39_E557_D71A_41EA_040FE899353C', [this.overlay_C4F05C39_E557_D71A_41EA_040FE899353C]); } else { this.resumeGlobalAudios('overlay_C4F05C39_E557_D71A_41EA_040FE899353C'); }",
 "useHandCursor": true,
 "rotationX": -18.35,
 "distance": 50,
 "hfov": 53.88,
 "video": {
  "mp4Url": "media/video_C4B7A912_E557_DEEF_41C4_D63191847C70.mp4",
  "width": 854,
  "class": "VideoResource",
  "height": 480
 }
},
{
 "class": "LensFlarePanoramaOverlay",
 "bleachingDistance": 0.68,
 "bleaching": 0.86,
 "pitch": 10.51,
 "id": "overlay_CBCD7822_DB90_5C31_41D0_BB82B606DB71",
 "yaw": -78.35
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CBFBDDCD_DB91_D473_41BC_ACAA1C31DBB5, this.camera_E0636E45_FA43_D9E9_41E8_5735310D33F9); this.mainPlayList.set('selectedIndex', 3)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 21.01,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CBCD6822_DB90_5C31_41E8_D76D0E29E1B1_0_HS_0_0.png",
      "width": 226,
      "class": "ImageResourceLevel",
      "height": 886
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 2.83,
   "roll": 0,
   "yaw": 139.53
  }
 ],
 "id": "overlay_CBCD1822_DB90_5C31_41DF_8A2006DB3362",
 "data": {
  "label": "Polygon"
 },
 "rollOverDisplay": true,
 "maps": [
  {
   "yaw": 139.53,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_CBCD6822_DB90_5C31_41E8_D76D0E29E1B1_0_HS_0_1_0_map.gif",
      "width": 51,
      "class": "ImageResourceLevel",
      "height": 200
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 2.83,
   "hfov": 21.01
  }
 ]
},
{
 "class": "LensFlarePanoramaOverlay",
 "bleachingDistance": 0.64,
 "bleaching": 0.85,
 "pitch": 10.83,
 "id": "overlay_D4A13BCD_DBB0_FC73_41BD_796342F7F489",
 "yaw": 75.1
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 4)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 15.56,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_D4A11BCC_DBB0_FC71_41D0_94884094A022_1_HS_2_0.png",
      "width": 167,
      "class": "ImageResourceLevel",
      "height": 581
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 5.76,
   "roll": 0,
   "yaw": 118.38
  }
 ],
 "id": "overlay_D4A12BCD_DBB0_FC73_41B6_F0B84531EC3C",
 "data": {
  "label": "Polygon"
 },
 "rollOverDisplay": true,
 "maps": [
  {
   "yaw": 118.38,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_D4A11BCC_DBB0_FC71_41D0_94884094A022_1_HS_2_1_0_map.gif",
      "width": 57,
      "class": "ImageResourceLevel",
      "height": 200
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 5.76,
   "hfov": 15.56
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "rollOver": "this.AnimatedImageResource_EB7E69EB_E4D2_513E_41D7_F7C4DBECEB2B.play()",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_D4373514_DBB0_5411_41E3_3F811A9931A3, this.camera_E003EE87_FA43_D969_41E0_BE71931D7FC8); this.mainPlayList.set('selectedIndex', 0); this.AnimatedImageResource_EB7E69EB_E4D2_513E_41D7_F7C4DBECEB2B.stop()"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_EB7E69EB_E4D2_513E_41D7_F7C4DBECEB2B",
   "pitch": -27.1,
   "yaw": -55.72,
   "hfov": 8.35,
   "distance": 50
  }
 ],
 "id": "overlay_D4A14BCD_DBB0_FC73_41EA_F972924D0A25",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": -55.72,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_D4A11BCC_DBB0_FC71_41D0_94884094A022_1_HS_5_0_0_map.gif",
      "width": 33,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -27.1,
   "hfov": 8.35
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "rollOver": "this.AnimatedImageResource_EB7ED9EB_E4D2_513E_41E6_FDF1F4537A39.play()",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_D4F951E6_DBB0_4C31_41C3_F5A2780BAC65, this.camera_E025EECE_FA43_D6FB_41E5_91089EB92FD2); this.mainPlayList.set('selectedIndex', 2); this.AnimatedImageResource_EB7ED9EB_E4D2_513E_41E6_FDF1F4537A39.stop()"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_EB7ED9EB_E4D2_513E_41E6_FDF1F4537A39",
   "pitch": -17.11,
   "yaw": 82.1,
   "hfov": 10.75,
   "distance": 50
  }
 ],
 "id": "overlay_D4A17BCD_DBB0_FC73_41E1_07497EB8A654",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": 82.1,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_D4A11BCC_DBB0_FC71_41D0_94884094A022_1_HS_6_0_0_map.gif",
      "width": 33,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -17.11,
   "hfov": 10.75
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "rollOver": "this.AnimatedImageResource_EB7EB9EC_E4D2_513A_41C9_98ACD1465949.play()",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CBFBDDCD_DB91_D473_41BC_ACAA1C31DBB5, this.camera_E0351EAD_FA43_D6B9_41E8_8B64666DA618); this.mainPlayList.set('selectedIndex', 3); this.AnimatedImageResource_EB7EB9EC_E4D2_513A_41C9_98ACD1465949.stop()"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_EB7EB9EC_E4D2_513A_41C9_98ACD1465949",
   "pitch": -23.03,
   "yaw": 124.29,
   "hfov": 8.63,
   "distance": 50
  }
 ],
 "id": "overlay_D4A16BCD_DBB0_FC73_41D7_CC357AA1FDB5",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": 124.29,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_D4A11BCC_DBB0_FC71_41D0_94884094A022_1_HS_7_0_0_map.gif",
      "width": 33,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -23.03,
   "hfov": 8.63
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CA423771_DBB7_F413_41C3_0D355D63A920, this.camera_E013DE66_FA43_D9AB_41EB_8829DDEECA91); this.mainPlayList.set('selectedIndex', 7)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 34.47,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_D4A11BCC_DBB0_FC71_41D0_94884094A022_1_HS_8_0.png",
      "width": 379,
      "class": "ImageResourceLevel",
      "height": 1044
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 2.94,
   "roll": 0,
   "yaw": -19.24
  }
 ],
 "id": "overlay_D4A09BCD_DBB0_FC73_41E7_499368DDF689",
 "data": {
  "label": "Polygon"
 },
 "rollOverDisplay": true,
 "maps": [
  {
   "yaw": -19.24,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_D4A11BCC_DBB0_FC71_41D0_94884094A022_1_HS_8_1_0_map.gif",
      "width": 72,
      "class": "ImageResourceLevel",
      "height": 200
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 2.94,
   "hfov": 34.47
  }
 ]
},
{
 "class": "LensFlarePanoramaOverlay",
 "bleachingDistance": 0.52,
 "bleaching": 0.76,
 "pitch": 2.69,
 "id": "overlay_CBFBFDCD_DB91_D473_41A0_F585E481EFDE",
 "yaw": -67.28
},
{
 "class": "LensFlarePanoramaOverlay",
 "bleachingDistance": 0.4,
 "bleaching": 0.54,
 "pitch": 16.37,
 "id": "overlay_CBFA4DCD_DB91_D473_41D2_B6281C1F476F",
 "yaw": 57.18
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_C9F9CB78_DB90_FC11_41E9_6E303CA66A0D, this.camera_E38C6DB9_FA43_DA99_41DF_861F80BB6C89); this.mainPlayList.set('selectedIndex', 5)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 51.79,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CBFBDDCD_DB91_D473_41BC_ACAA1C31DBB5_0_HS_4_0.png",
      "width": 593,
      "class": "ImageResourceLevel",
      "height": 1831
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 1.4,
   "roll": 0,
   "yaw": 65.64
  }
 ],
 "id": "overlay_CBFA6DCD_DB91_D473_41E9_9EFA973D8427",
 "data": {
  "label": "Polygon"
 },
 "rollOverDisplay": true,
 "maps": [
  {
   "yaw": 65.64,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_CBFBDDCD_DB91_D473_41BC_ACAA1C31DBB5_0_HS_4_1_0_map.gif",
      "width": 64,
      "class": "ImageResourceLevel",
      "height": 200
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 1.4,
   "hfov": 51.79
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CA0D2937_DB90_5C1F_41C1_3A22D6FAEAF2, this.camera_E3AE3DDA_FA43_DA9B_41E9_158D27691A99); this.mainPlayList.set('selectedIndex', 4)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 58.96,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CBFBDDCD_DB91_D473_41BC_ACAA1C31DBB5_0_HS_3_0.png",
      "width": 691,
      "class": "ImageResourceLevel",
      "height": 1942
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 2.53,
   "roll": 0,
   "yaw": -15.85
  }
 ],
 "id": "overlay_CBFA7DCE_DB91_D471_41E8_C85F7BB1D8B9",
 "data": {
  "label": "Polygon"
 },
 "rollOverDisplay": true,
 "maps": [
  {
   "yaw": -15.85,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_CBFBDDCD_DB91_D473_41BC_ACAA1C31DBB5_0_HS_3_1_0_map.gif",
      "width": 71,
      "class": "ImageResourceLevel",
      "height": 200
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 2.53,
   "hfov": 58.96
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 7)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 15.67,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CBFBDDCD_DB91_D473_41BC_ACAA1C31DBB5_0_HS_2_0.png",
      "width": 168,
      "class": "ImageResourceLevel",
      "height": 483
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 3.68,
   "roll": 0,
   "yaw": -148.41
  }
 ],
 "id": "overlay_CBFA9DCE_DB91_D471_41D0_3054D02DA76C",
 "data": {
  "label": "Polygon"
 },
 "rollOverDisplay": true,
 "maps": [
  {
   "yaw": -148.41,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_CBFBDDCD_DB91_D473_41BC_ACAA1C31DBB5_0_HS_2_1_0_map.gif",
      "width": 69,
      "class": "ImageResourceLevel",
      "height": 200
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 3.68,
   "hfov": 15.67
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CBCD6822_DB90_5C31_41E8_D76D0E29E1B1, this.camera_E3BCCDC9_FA43_DAF9_41E1_4FE5CCB4B35E); this.mainPlayList.set('selectedIndex', 6)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 78.58,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CBFBDDCD_DB91_D473_41BC_ACAA1C31DBB5_0_HS_6_0.png",
      "width": 821,
      "class": "ImageResourceLevel",
      "height": 2048
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 6.39,
   "roll": 0,
   "yaw": 127.28
  }
 ],
 "id": "overlay_CFBB4567_DC90_D430_41D9_6339580DA433",
 "data": {
  "label": "Polygon"
 },
 "rollOverDisplay": true,
 "maps": [
  {
   "yaw": 127.28,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_CBFBDDCD_DB91_D473_41BC_ACAA1C31DBB5_0_HS_6_1_0_map.gif",
      "width": 80,
      "class": "ImageResourceLevel",
      "height": 200
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 6.39,
   "hfov": 78.58
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "rollOver": "this.AnimatedImageResource_EB7AB9F0_E4D2_512A_41DF_2AD2EC1B8918.play()",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_D4F951E6_DBB0_4C31_41C3_F5A2780BAC65, this.camera_E040FDFB_FA43_DA99_41EE_D90A416C4E79); this.mainPlayList.set('selectedIndex', 2); this.mainPlayList.set('selectedIndex', 2); this.AnimatedImageResource_EB7AB9F0_E4D2_512A_41DF_2AD2EC1B8918.stop()"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_EB7AB9F0_E4D2_512A_41DF_2AD2EC1B8918",
   "pitch": -28.08,
   "yaw": -94.87,
   "hfov": 13.4,
   "distance": 50
  }
 ],
 "id": "overlay_CEAFB66D_DC90_5433_41D8_A95A7D5CC33A",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": -94.87,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_CBFBDDCD_DB91_D473_41BC_ACAA1C31DBB5_1_HS_7_0_0_map.gif",
      "width": 33,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -28.08,
   "hfov": 13.4
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "rollOver": "this.AnimatedImageResource_EB7B09F0_E4D2_512A_41BD_8E6FBD600FD2.play()",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 0); this.AnimatedImageResource_EB7B09F0_E4D2_512A_41BD_8E6FBD600FD2.stop()"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_EB7B09F0_E4D2_512A_41BD_8E6FBD600FD2",
   "pitch": -7.5,
   "yaw": -166.97,
   "hfov": 7.61,
   "distance": 50
  }
 ],
 "id": "overlay_CEFEEBAF_DC90_3C30_41D8_3186AD139960",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": -166.97,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_CBFBDDCD_DB91_D473_41BC_ACAA1C31DBB5_1_HS_8_0_0_map.gif",
      "width": 33,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -7.5,
   "hfov": 7.61
  }
 ]
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "rollOver": "this.AnimatedImageResource_EB7BE9F0_E4D2_512A_41D7_D8C1EFB86519.play()",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 0); this.mainPlayList.set('selectedIndex', 1); this.AnimatedImageResource_EB7BE9F0_E4D2_512A_41D7_D8C1EFB86519.stop()"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_EB7BE9F0_E4D2_512A_41D7_D8C1EFB86519",
   "pitch": -25.05,
   "yaw": -161.08,
   "hfov": 10.76,
   "distance": 50
  }
 ],
 "id": "overlay_CFAA4639_DC90_F416_41CD_AE032B6F48F8",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": -161.08,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_CBFBDDCD_DB91_D473_41BC_ACAA1C31DBB5_1_HS_9_0_0_map.gif",
      "width": 33,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -25.05,
   "hfov": 10.76
  }
 ]
},
{
 "map": {
  "width": 51.43,
  "x": 439.75,
  "offsetY": 0,
  "image": {
   "levels": [
    {
     "url": "media/map_EC81520A_E266_EAB5_41E5_A93A73CA8842_HS_10_map.gif",
     "width": 25,
     "class": "ImageResourceLevel",
     "height": 14
    }
   ],
   "class": "ImageResource"
  },
  "y": 370.6,
  "class": "HotspotMapOverlayMap",
  "height": 28.36,
  "offsetX": 0
 },
 "class": "AreaHotspotMapOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotMapOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 0)"
  }
 ],
 "image": {
  "x": 439.75,
  "y": 370.6,
  "class": "HotspotMapOverlayImage",
  "width": 51.43,
  "image": {
   "levels": [
    {
     "url": "media/map_EC81520A_E266_EAB5_41E5_A93A73CA8842_HS_10.png",
     "width": 51,
     "class": "ImageResourceLevel",
     "height": 28
    }
   ],
   "class": "ImageResource"
  },
  "height": 28.36
 },
 "useHandCursor": false,
 "id": "overlay_F418D4F4_E225_2F5D_41C3_24A31AB30CB9",
 "data": {
  "label": "01"
 },
 "rollOverDisplay": false
},
{
 "map": {
  "width": 51.43,
  "x": 326.75,
  "offsetY": 0,
  "image": {
   "levels": [
    {
     "url": "media/map_EC81520A_E266_EAB5_41E5_A93A73CA8842_HS_11_map.gif",
     "width": 25,
     "class": "ImageResourceLevel",
     "height": 14
    }
   ],
   "class": "ImageResource"
  },
  "y": 255.6,
  "class": "HotspotMapOverlayMap",
  "height": 28.36,
  "offsetX": 0
 },
 "class": "AreaHotspotMapOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotMapOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 1)"
  }
 ],
 "image": {
  "x": 326.75,
  "y": 255.6,
  "class": "HotspotMapOverlayImage",
  "width": 51.43,
  "image": {
   "levels": [
    {
     "url": "media/map_EC81520A_E266_EAB5_41E5_A93A73CA8842_HS_11.png",
     "width": 51,
     "class": "ImageResourceLevel",
     "height": 28
    }
   ],
   "class": "ImageResource"
  },
  "height": 28.36
 },
 "useHandCursor": false,
 "id": "overlay_F4A362EE_E223_2B4D_41C1_2A116900D7F0",
 "data": {
  "label": "02"
 },
 "rollOverDisplay": false
},
{
 "map": {
  "width": 51.43,
  "x": 121.75,
  "offsetY": 0,
  "image": {
   "levels": [
    {
     "url": "media/map_EC81520A_E266_EAB5_41E5_A93A73CA8842_HS_12_map.gif",
     "width": 29,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ],
   "class": "ImageResource"
  },
  "y": 261.6,
  "class": "HotspotMapOverlayMap",
  "height": 28.36,
  "offsetX": 0
 },
 "class": "AreaHotspotMapOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotMapOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 2)"
  }
 ],
 "image": {
  "x": 121.75,
  "y": 261.6,
  "class": "HotspotMapOverlayImage",
  "width": 51.43,
  "image": {
   "levels": [
    {
     "url": "media/map_EC81520A_E266_EAB5_41E5_A93A73CA8842_HS_12.png",
     "width": 51,
     "class": "ImageResourceLevel",
     "height": 28
    }
   ],
   "class": "ImageResource"
  },
  "height": 28.36
 },
 "useHandCursor": true,
 "id": "overlay_F54543A3_E223_69FB_41B0_0516573A6E4A",
 "data": {
  "label": "03"
 },
 "rollOverDisplay": false
},
{
 "map": {
  "width": 51.43,
  "x": 237.75,
  "offsetY": 0,
  "image": {
   "levels": [
    {
     "url": "media/map_EC81520A_E266_EAB5_41E5_A93A73CA8842_HS_13_map.gif",
     "width": 29,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ],
   "class": "ImageResource"
  },
  "y": 178.6,
  "class": "HotspotMapOverlayMap",
  "height": 28.36,
  "offsetX": 0
 },
 "class": "AreaHotspotMapOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotMapOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 3)"
  }
 ],
 "image": {
  "x": 237.75,
  "y": 178.6,
  "class": "HotspotMapOverlayImage",
  "width": 51.43,
  "image": {
   "levels": [
    {
     "url": "media/map_EC81520A_E266_EAB5_41E5_A93A73CA8842_HS_13.png",
     "width": 51,
     "class": "ImageResourceLevel",
     "height": 28
    }
   ],
   "class": "ImageResource"
  },
  "height": 28.36
 },
 "useHandCursor": true,
 "id": "overlay_F5142BD6_E223_195D_41E1_281B0CA884B5",
 "data": {
  "label": "04"
 },
 "rollOverDisplay": false
},
{
 "map": {
  "width": 51.43,
  "x": 242.75,
  "offsetY": 0,
  "image": {
   "levels": [
    {
     "url": "media/map_EC81520A_E266_EAB5_41E5_A93A73CA8842_HS_14_map.gif",
     "width": 29,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ],
   "class": "ImageResource"
  },
  "y": 103.6,
  "class": "HotspotMapOverlayMap",
  "height": 28.36,
  "offsetX": 0
 },
 "class": "AreaHotspotMapOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotMapOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 5)"
  }
 ],
 "image": {
  "x": 242.75,
  "y": 103.6,
  "class": "HotspotMapOverlayImage",
  "width": 51.43,
  "image": {
   "levels": [
    {
     "url": "media/map_EC81520A_E266_EAB5_41E5_A93A73CA8842_HS_14.png",
     "width": 51,
     "class": "ImageResourceLevel",
     "height": 28
    }
   ],
   "class": "ImageResource"
  },
  "height": 28.36
 },
 "useHandCursor": true,
 "id": "overlay_F4ED64B6_E223_2FDD_41EB_EEDC3AC1A1F1",
 "data": {
  "label": "06"
 },
 "rollOverDisplay": false
},
{
 "map": {
  "width": 51.43,
  "x": 383.75,
  "offsetY": 0,
  "image": {
   "levels": [
    {
     "url": "media/map_EC81520A_E266_EAB5_41E5_A93A73CA8842_HS_15_map.gif",
     "width": 29,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ],
   "class": "ImageResource"
  },
  "y": 112.6,
  "class": "HotspotMapOverlayMap",
  "height": 28.36,
  "offsetX": 0
 },
 "class": "AreaHotspotMapOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotMapOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 6)"
  }
 ],
 "image": {
  "x": 383.75,
  "y": 112.6,
  "class": "HotspotMapOverlayImage",
  "width": 51.43,
  "image": {
   "levels": [
    {
     "url": "media/map_EC81520A_E266_EAB5_41E5_A93A73CA8842_HS_15.png",
     "width": 51,
     "class": "ImageResourceLevel",
     "height": 28
    }
   ],
   "class": "ImageResource"
  },
  "height": 28.36
 },
 "useHandCursor": true,
 "id": "overlay_F4AAEBE3_E223_F97B_41B8_DC03E7E2D68E",
 "data": {
  "label": "07"
 },
 "rollOverDisplay": false
},
{
 "map": {
  "width": 51.43,
  "x": 80.75,
  "offsetY": 0,
  "image": {
   "levels": [
    {
     "url": "media/map_EC81520A_E266_EAB5_41E5_A93A73CA8842_HS_16_map.gif",
     "width": 29,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ],
   "class": "ImageResource"
  },
  "y": 86.6,
  "class": "HotspotMapOverlayMap",
  "height": 28.36,
  "offsetX": 0
 },
 "class": "AreaHotspotMapOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotMapOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 4)"
  }
 ],
 "image": {
  "x": 80.75,
  "y": 86.6,
  "class": "HotspotMapOverlayImage",
  "width": 51.43,
  "image": {
   "levels": [
    {
     "url": "media/map_EC81520A_E266_EAB5_41E5_A93A73CA8842_HS_16.png",
     "width": 51,
     "class": "ImageResourceLevel",
     "height": 28
    }
   ],
   "class": "ImageResource"
  },
  "height": 28.36
 },
 "useHandCursor": true,
 "id": "overlay_F54572BA_E223_6BD5_41B2_0C67EE85FA7F",
 "data": {
  "label": "05"
 },
 "rollOverDisplay": false
},
{
 "map": {
  "width": 51.43,
  "x": 319.75,
  "offsetY": 0,
  "image": {
   "levels": [
    {
     "url": "media/map_EC81520A_E266_EAB5_41E5_A93A73CA8842_HS_17_map.gif",
     "width": 29,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ],
   "class": "ImageResource"
  },
  "y": 367.6,
  "class": "HotspotMapOverlayMap",
  "height": 28.36,
  "offsetX": 0
 },
 "class": "AreaHotspotMapOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotMapOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 7)"
  }
 ],
 "image": {
  "x": 319.75,
  "y": 367.6,
  "class": "HotspotMapOverlayImage",
  "width": 51.43,
  "image": {
   "levels": [
    {
     "url": "media/map_EC81520A_E266_EAB5_41E5_A93A73CA8842_HS_17.png",
     "width": 51,
     "class": "ImageResourceLevel",
     "height": 28
    }
   ],
   "class": "ImageResource"
  },
  "height": 28.36
 },
 "useHandCursor": true,
 "id": "overlay_F5CE98FC_E223_274D_41E2_1AB37416A47E",
 "data": {
  "label": "08"
 },
 "rollOverDisplay": false
},
{
 "map": {
  "width": 51.43,
  "x": 169.75,
  "offsetY": 0,
  "image": {
   "levels": [
    {
     "url": "media/map_EC81520A_E266_EAB5_41E5_A93A73CA8842_HS_18_map.gif",
     "width": 29,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ],
   "class": "ImageResource"
  },
  "y": 361.6,
  "class": "HotspotMapOverlayMap",
  "height": 28.36,
  "offsetX": 0
 },
 "class": "AreaHotspotMapOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotMapOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 8)"
  }
 ],
 "image": {
  "x": 169.75,
  "y": 361.6,
  "class": "HotspotMapOverlayImage",
  "width": 51.43,
  "image": {
   "levels": [
    {
     "url": "media/map_EC81520A_E266_EAB5_41E5_A93A73CA8842_HS_18.png",
     "width": 51,
     "class": "ImageResourceLevel",
     "height": 28
    }
   ],
   "class": "ImageResource"
  },
  "height": 28.36
 },
 "useHandCursor": true,
 "id": "overlay_F4C64469_E222_EF74_41E2_46F38129B912",
 "data": {
  "label": "09"
 },
 "rollOverDisplay": false
},
{
 "textDecoration": "none",
 "layout": "horizontal",
 "data": {
  "name": "Button Settings Gyro"
 },
 "iconURL": "skin/Button_F0FABEC7_E4EE_5375_41DD_B033D3902DC3.png",
 "class": "Button",
 "fontStyle": "normal",
 "width": 60,
 "id": "Button_F0FABEC7_E4EE_5375_41DD_B033D3902DC3",
 "fontFamily": "Arial",
 "shadowBlurRadius": 6,
 "shadowSpread": 1,
 "paddingRight": 0,
 "shadowColor": "#000000",
 "iconHeight": 30,
 "pressedIconWidth": 30,
 "paddingLeft": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "iconWidth": 30,
 "verticalAlign": "middle",
 "rollOverIconHeight": 30,
 "minHeight": 1,
 "borderRadius": 0,
 "borderColor": "#000000",
 "borderSize": 0,
 "propagateClick": false,
 "minWidth": 1,
 "mode": "toggle",
 "backgroundColorRatios": [
  0
 ],
 "height": 60,
 "fontSize": 12,
 "pressedIconURL": "skin/Button_F0FABEC7_E4EE_5375_41DD_B033D3902DC3_pressed.png",
 "rollOverBackgroundOpacity": 1,
 "backgroundColor": [
  "#00FFFF"
 ],
 "fontColor": "#FFFFFF",
 "iconBeforeLabel": true,
 "gap": 5,
 "pressedIconHeight": 30,
 "horizontalAlign": "center",
 "rollOverBackgroundColor": [
  "#00FFFF"
 ],
 "rollOverIconWidth": 30,
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "shadow": false,
 "cursor": "hand",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "fontWeight": "normal"
},
{
 "textDecoration": "none",
 "layout": "horizontal",
 "data": {
  "name": "Button Settings HS"
 },
 "iconURL": "skin/Button_F0FB5EC7_E4EE_5375_41E8_5828D3AD5CEC.png",
 "class": "Button",
 "fontStyle": "normal",
 "width": 60,
 "id": "Button_F0FB5EC7_E4EE_5375_41E8_5828D3AD5CEC",
 "fontFamily": "Arial",
 "shadowBlurRadius": 6,
 "shadowSpread": 1,
 "paddingRight": 0,
 "shadowColor": "#000000",
 "iconHeight": 30,
 "pressedIconWidth": 30,
 "paddingLeft": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "iconWidth": 30,
 "verticalAlign": "middle",
 "rollOverIconHeight": 30,
 "minHeight": 1,
 "borderRadius": 0,
 "borderColor": "#000000",
 "borderSize": 0,
 "propagateClick": false,
 "minWidth": 1,
 "mode": "toggle",
 "backgroundColorRatios": [
  0
 ],
 "height": 60,
 "fontSize": 12,
 "pressedIconURL": "skin/Button_F0FB5EC7_E4EE_5375_41E8_5828D3AD5CEC_pressed.png",
 "rollOverBackgroundOpacity": 1,
 "gap": 5,
 "backgroundColor": [
  "#00FFFF"
 ],
 "fontColor": "#FFFFFF",
 "iconBeforeLabel": true,
 "pressedIconHeight": 30,
 "horizontalAlign": "center",
 "rollOverBackgroundColor": [
  "#00FFFF"
 ],
 "rollOverIconWidth": 30,
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "shadow": false,
 "cursor": "hand",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "fontWeight": "normal"
},
{
 "class": "LensFlarePanoramaOverlay",
 "bleachingDistance": 0.71,
 "bleaching": 0.78,
 "pitch": 15.72,
 "id": "overlay_CB765832_DBB0_7C11_41C3_BFD3E65C8512",
 "yaw": -98.23
},
{
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "rollOver": "this.AnimatedImageResource_EB0659F8_E4D2_511A_41E8_0A1E2B454CA1.play()",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_CA423771_DBB7_F413_41C3_0D355D63A920, this.camera_E0D7CEEF_FA43_D6B9_41EE_46E8BAB68F03); this.mainPlayList.set('selectedIndex', 7); this.AnimatedImageResource_EB0659F8_E4D2_511A_41E8_0A1E2B454CA1.stop()"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_EB0659F8_E4D2_511A_41E8_0A1E2B454CA1",
   "pitch": -23.22,
   "yaw": 88.87,
   "hfov": 17.55,
   "distance": 50
  }
 ],
 "id": "overlay_CF15639B_DC91_CC17_41D9_49B76757C203",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": 88.87,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_CB758832_DBB0_7C11_41E1_D49EC19CD9F2_1_HS_1_0_0_map.gif",
      "width": 33,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -23.22,
   "hfov": 17.55
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.AnimatedImageResource_EB06D9F8_E4D2_511A_41DE_669942DD3B90.play()"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_EB06D9F8_E4D2_511A_41DE_669942DD3B90",
   "pitch": -28.72,
   "yaw": -152.16,
   "hfov": 51.09,
   "distance": 50
  }
 ],
 "id": "overlay_F5460AA6_E00B_4D57_4196_B8FA5822BA90",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "yaw": -152.16,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_CB758832_DBB0_7C11_41E1_D49EC19CD9F2_1_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -28.72,
   "hfov": 51.09
  }
 ]
},
{
 "maxWidth": 56,
 "iconURL": "skin/IconButton_F953B66C_E4B3_F33A_41E4_417B1EFF1228.png",
 "class": "IconButton",
 "maxHeight": 58,
 "width": 52,
 "id": "IconButton_F953B66C_E4B3_F33A_41E4_417B1EFF1228",
 "paddingRight": 0,
 "paddingLeft": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "verticalAlign": "middle",
 "transparencyActive": false,
 "minHeight": 1,
 "borderRadius": 0,
 "rollOverIconURL": "skin/IconButton_F953B66C_E4B3_F33A_41E4_417B1EFF1228_rollover.png",
 "borderSize": 0,
 "propagateClick": false,
 "minWidth": 1,
 "click": "this.openLink('http://victorfx3d.com.br', '_blank')",
 "mode": "push",
 "height": 53,
 "horizontalAlign": "center",
 "data": {
  "name": "IconButton19719"
 },
 "paddingTop": 0,
 "shadow": false,
 "cursor": "hand"
},
{
 "maxWidth": 62,
 "iconURL": "skin/IconButton_F0745506_E4F1_F6F6_41CD_D7A14257209E.png",
 "class": "IconButton",
 "maxHeight": 62,
 "width": 38,
 "id": "IconButton_F0745506_E4F1_F6F6_41CD_D7A14257209E",
 "paddingRight": 0,
 "paddingLeft": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "verticalAlign": "middle",
 "transparencyActive": false,
 "minHeight": 1,
 "borderRadius": 0,
 "rollOverIconURL": "skin/IconButton_F0745506_E4F1_F6F6_41CD_D7A14257209E_rollover.png",
 "borderSize": 0,
 "propagateClick": false,
 "minWidth": 1,
 "click": "if(!this.HTMLText_F47F2DC0_FA45_7AE7_41E0_406528D874BE.get('visible')){ this.setComponentVisibility(this.HTMLText_F47F2DC0_FA45_7AE7_41E0_406528D874BE, true, 0, null, null, false) } else { this.setComponentVisibility(this.HTMLText_F47F2DC0_FA45_7AE7_41E0_406528D874BE, false, 0, null, null, false) }",
 "mode": "push",
 "height": 41,
 "horizontalAlign": "center",
 "data": {
  "name": "IconButton9093"
 },
 "paddingTop": 0,
 "shadow": false,
 "cursor": "hand"
},
{
 "maxWidth": 67,
 "iconURL": "skin/IconButton_EB0C8DDE_E4D2_F117_41D3_B9E6A5071D2C.png",
 "class": "IconButton",
 "maxHeight": 53,
 "width": 43,
 "id": "IconButton_EB0C8DDE_E4D2_F117_41D3_B9E6A5071D2C",
 "paddingRight": 0,
 "paddingLeft": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "verticalAlign": "middle",
 "transparencyActive": false,
 "minHeight": 1,
 "borderRadius": 0,
 "rollOverIconURL": "skin/IconButton_EB0C8DDE_E4D2_F117_41D3_B9E6A5071D2C_rollover.png",
 "borderSize": 0,
 "propagateClick": false,
 "minWidth": 1,
 "click": "if(!this.MapViewer.get('visible')){ this.setComponentVisibility(this.MapViewer, true, 0, null, null, false) } else { this.setComponentVisibility(this.MapViewer, false, 0, null, null, false) }",
 "mode": "push",
 "height": 53,
 "horizontalAlign": "center",
 "data": {
  "name": "IconButton5217"
 },
 "paddingTop": 0,
 "shadow": false,
 "cursor": "hand"
},
{
 "textDecoration": "none",
 "layout": "horizontal",
 "data": {
  "name": "Button settings VR"
 },
 "iconURL": "skin/Button_F0FA9EC7_E4EE_5375_41BE_F26B3FC7C264.png",
 "class": "Button",
 "fontStyle": "normal",
 "width": 60,
 "id": "Button_F0FA9EC7_E4EE_5375_41BE_F26B3FC7C264",
 "fontFamily": "Arial",
 "shadowBlurRadius": 6,
 "shadowSpread": 1,
 "paddingRight": 0,
 "shadowColor": "#000000",
 "iconHeight": 30,
 "paddingLeft": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "iconWidth": 30,
 "verticalAlign": "middle",
 "minHeight": 1,
 "borderRadius": 0,
 "borderColor": "#000000",
 "borderSize": 0,
 "propagateClick": false,
 "minWidth": 1,
 "mode": "toggle",
 "backgroundColorRatios": [
  0
 ],
 "height": 60,
 "fontSize": 12,
 "pressedIconURL": "skin/Button_F0FA9EC7_E4EE_5375_41BE_F26B3FC7C264_pressed.png",
 "rollOverBackgroundOpacity": 1,
 "gap": 5,
 "backgroundColor": [
  "#00FFFF"
 ],
 "click": "this.setComponentVisibility(this.Button_F0FA9EC7_E4EE_5375_41BE_F26B3FC7C264, true, 0, null, null, false)",
 "fontColor": "#FFFFFF",
 "iconBeforeLabel": true,
 "horizontalAlign": "center",
 "rollOverBackgroundColor": [
  "#00FFFF"
 ],
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "shadow": false,
 "cursor": "hand",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "fontWeight": "normal"
},
{
 "maxWidth": 282,
 "iconURL": "skin/IconButton_C02767A0_E5BE_712A_41CC_81C3F92FFCE5.png",
 "class": "IconButton",
 "left": "0%",
 "maxHeight": 282,
 "width": 105.03,
 "id": "IconButton_C02767A0_E5BE_712A_41CC_81C3F92FFCE5",
 "paddingRight": 0,
 "paddingLeft": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "verticalAlign": "middle",
 "transparencyActive": false,
 "minHeight": 1,
 "borderRadius": 0,
 "rollOverIconURL": "skin/IconButton_C02767A0_E5BE_712A_41CC_81C3F92FFCE5_rollover.png",
 "propagateClick": false,
 "top": "0%",
 "minWidth": 1,
 "click": "this.openLink('https://api.whatsapp.com/send/?phone=5511954446815&text=Olá+eu+vim+tuor+360+graus+da+Visual+FX+3D', '_blank')",
 "mode": "push",
 "height": 85.04,
 "borderSize": 0,
 "horizontalAlign": "center",
 "data": {
  "name": "IconButton29664"
 },
 "paddingTop": 0,
 "shadow": false,
 "cursor": "hand"
},
{
 "colCount": 7,
 "frameCount": 50,
 "id": "AnimatedImageResource_EB05C9F7_E4D2_5116_41C5_E6803030810E",
 "autoplay": false,
 "levels": [
  {
   "url": "media/panorama_CA423771_DBB7_F413_41C3_0D355D63A920_1_HS_2_0.png",
   "width": 1932,
   "class": "ImageResourceLevel",
   "height": 1040
  }
 ],
 "rowCount": 8,
 "class": "AnimatedImageResource",
 "frameDuration": 40
},
{
 "colCount": 7,
 "frameCount": 50,
 "id": "AnimatedImageResource_EB7CE9E3_E4D2_512E_41E0_8FCE18ED4C7B",
 "autoplay": false,
 "levels": [
  {
   "url": "media/panorama_D4373514_DBB0_5411_41E3_3F811A9931A3_1_HS_3_0.png",
   "width": 1932,
   "class": "ImageResourceLevel",
   "height": 1040
  }
 ],
 "repeat": 1,
 "rowCount": 8,
 "class": "AnimatedImageResource",
 "frameDuration": 40
},
{
 "colCount": 7,
 "frameCount": 50,
 "id": "AnimatedImageResource_EB7D29EA_E4D2_513E_41DB_97D187AB4F36",
 "autoplay": false,
 "levels": [
  {
   "url": "media/panorama_D4373514_DBB0_5411_41E3_3F811A9931A3_1_HS_5_0.png",
   "width": 1932,
   "class": "ImageResourceLevel",
   "height": 1040
  }
 ],
 "repeat": 1,
 "rowCount": 8,
 "class": "AnimatedImageResource",
 "frameDuration": 40
},
{
 "colCount": 7,
 "frameCount": 50,
 "id": "AnimatedImageResource_EB7F89ED_E4D2_513A_41D7_E074C0656CBD",
 "autoplay": false,
 "levels": [
  {
   "url": "media/panorama_D4F951E6_DBB0_4C31_41C3_F5A2780BAC65_1_HS_3_0.png",
   "width": 1932,
   "class": "ImageResourceLevel",
   "height": 1040
  }
 ],
 "repeat": 1,
 "rowCount": 8,
 "class": "AnimatedImageResource",
 "frameDuration": 40
},
{
 "colCount": 7,
 "frameCount": 50,
 "id": "AnimatedImageResource_EB78C9ED_E4D2_513A_41E5_048CA4315565",
 "autoplay": false,
 "levels": [
  {
   "url": "media/panorama_D4F951E6_DBB0_4C31_41C3_F5A2780BAC65_1_HS_6_0.png",
   "width": 1932,
   "class": "ImageResourceLevel",
   "height": 1040
  }
 ],
 "repeat": 1,
 "rowCount": 8,
 "class": "AnimatedImageResource",
 "frameDuration": 40
},
{
 "colCount": 7,
 "frameCount": 50,
 "id": "AnimatedImageResource_EB78A9EE_E4D2_5136_41D7_962717C19677",
 "autoplay": false,
 "levels": [
  {
   "url": "media/panorama_D4F951E6_DBB0_4C31_41C3_F5A2780BAC65_1_HS_7_0.png",
   "width": 1932,
   "class": "ImageResourceLevel",
   "height": 1040
  }
 ],
 "repeat": 1,
 "rowCount": 8,
 "class": "AnimatedImageResource",
 "frameDuration": 40
},
{
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_EB79C9EE_E4D2_5136_41E7_30B41871097E",
 "autoplay": false,
 "levels": [
  {
   "url": "media/panorama_D4F951E6_DBB0_4C31_41C3_F5A2780BAC65_1_HS_10_0.png",
   "width": 940,
   "class": "ImageResourceLevel",
   "height": 1410
  }
 ],
 "repeat": 1,
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameDuration": 35
},
{
 "colCount": 7,
 "frameCount": 50,
 "id": "AnimatedImageResource_EB7E69EB_E4D2_513E_41D7_F7C4DBECEB2B",
 "autoplay": false,
 "levels": [
  {
   "url": "media/panorama_D4A11BCC_DBB0_FC71_41D0_94884094A022_1_HS_5_0.png",
   "width": 1932,
   "class": "ImageResourceLevel",
   "height": 1040
  }
 ],
 "repeat": 1,
 "rowCount": 8,
 "class": "AnimatedImageResource",
 "frameDuration": 40
},
{
 "colCount": 7,
 "frameCount": 50,
 "id": "AnimatedImageResource_EB7ED9EB_E4D2_513E_41E6_FDF1F4537A39",
 "autoplay": false,
 "levels": [
  {
   "url": "media/panorama_D4A11BCC_DBB0_FC71_41D0_94884094A022_1_HS_6_0.png",
   "width": 1932,
   "class": "ImageResourceLevel",
   "height": 1040
  }
 ],
 "repeat": 1,
 "rowCount": 8,
 "class": "AnimatedImageResource",
 "frameDuration": 40
},
{
 "colCount": 7,
 "frameCount": 50,
 "id": "AnimatedImageResource_EB7EB9EC_E4D2_513A_41C9_98ACD1465949",
 "autoplay": false,
 "levels": [
  {
   "url": "media/panorama_D4A11BCC_DBB0_FC71_41D0_94884094A022_1_HS_7_0.png",
   "width": 1932,
   "class": "ImageResourceLevel",
   "height": 1040
  }
 ],
 "repeat": 1,
 "rowCount": 8,
 "class": "AnimatedImageResource",
 "frameDuration": 40
},
{
 "colCount": 7,
 "frameCount": 50,
 "id": "AnimatedImageResource_EB7AB9F0_E4D2_512A_41DF_2AD2EC1B8918",
 "autoplay": false,
 "levels": [
  {
   "url": "media/panorama_CBFBDDCD_DB91_D473_41BC_ACAA1C31DBB5_1_HS_7_0.png",
   "width": 1932,
   "class": "ImageResourceLevel",
   "height": 1040
  }
 ],
 "rowCount": 8,
 "class": "AnimatedImageResource",
 "frameDuration": 41
},
{
 "colCount": 7,
 "frameCount": 50,
 "id": "AnimatedImageResource_EB7B09F0_E4D2_512A_41BD_8E6FBD600FD2",
 "autoplay": false,
 "levels": [
  {
   "url": "media/panorama_CBFBDDCD_DB91_D473_41BC_ACAA1C31DBB5_1_HS_8_0.png",
   "width": 1932,
   "class": "ImageResourceLevel",
   "height": 1040
  }
 ],
 "rowCount": 8,
 "class": "AnimatedImageResource",
 "frameDuration": 40
},
{
 "colCount": 7,
 "frameCount": 50,
 "id": "AnimatedImageResource_EB7BE9F0_E4D2_512A_41D7_D8C1EFB86519",
 "autoplay": false,
 "levels": [
  {
   "url": "media/panorama_CBFBDDCD_DB91_D473_41BC_ACAA1C31DBB5_1_HS_9_0.png",
   "width": 1932,
   "class": "ImageResourceLevel",
   "height": 1040
  }
 ],
 "rowCount": 8,
 "class": "AnimatedImageResource",
 "frameDuration": 40
},
{
 "colCount": 7,
 "frameCount": 50,
 "id": "AnimatedImageResource_EB0659F8_E4D2_511A_41E8_0A1E2B454CA1",
 "autoplay": false,
 "levels": [
  {
   "url": "media/panorama_CB758832_DBB0_7C11_41E1_D49EC19CD9F2_1_HS_1_0.png",
   "width": 1932,
   "class": "ImageResourceLevel",
   "height": 1040
  }
 ],
 "rowCount": 8,
 "class": "AnimatedImageResource",
 "frameDuration": 40
},
{
 "colCount": 4,
 "frameCount": 24,
 "id": "AnimatedImageResource_EB06D9F8_E4D2_511A_41DE_669942DD3B90",
 "autoplay": false,
 "levels": [
  {
   "url": "media/panorama_CB758832_DBB0_7C11_41E1_D49EC19CD9F2_1_HS_2_0.png",
   "width": 940,
   "class": "ImageResourceLevel",
   "height": 1410
  }
 ],
 "repeat": 1,
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "frameDuration": 45
}],
 "gap": 10,
 "buttonToggleMute": "this.Button_F0FB4EC7_E4EE_5375_41CF_622F4DD6CA59",
 "start": "this.playAudioList([this.audio_E8A93F21_FA5F_B7A9_41E3_21477D074F27]); this.init(); this.visibleComponentsIfPlayerFlagEnabled([this.Button_F0FABEC7_E4EE_5375_41DD_B033D3902DC3], 'gyroscopeAvailable'); this.playList_E339AD21_FA43_DBA9_41EA_3074AED66252.set('selectedIndex', 0); if(!this.get('fullscreenAvailable')) { [this.Button_F0FB6EC7_E4EE_5375_41E4_BF58E8BED9C0].forEach(function(component) { component.set('visible', false); }) }",
 "desktopMipmappingEnabled": false,
 "horizontalAlign": "left",
 "mouseWheelEnabled": true,
 "vrPolyfillScale": 0.5,
 "mobileMipmappingEnabled": false,
 "paddingTop": 0,
 "scrollBarColor": "#000000",
 "shadow": false,
 "scrollBarOpacity": 0.5,
 "height": "100%",
 "layout": "absolute"
};

    
    function HistoryData(playList) {
        this.playList = playList;
        this.list = [];
        this.pointer = -1;
    }

    HistoryData.prototype.add = function(index){
        if(this.pointer < this.list.length && this.list[this.pointer] == index) {
            return;
        }
        ++this.pointer;
        this.list.splice(this.pointer, this.list.length - this.pointer, index);
    };

    HistoryData.prototype.back = function(){
        if(!this.canBack()) return;
        this.playList.set('selectedIndex', this.list[--this.pointer]);
    };

    HistoryData.prototype.forward = function(){
        if(!this.canForward()) return;
        this.playList.set('selectedIndex', this.list[++this.pointer]);
    };

    HistoryData.prototype.canBack = function(){
        return this.pointer > 0;
    };

    HistoryData.prototype.canForward = function(){
        return this.pointer >= 0 && this.pointer < this.list.length-1;
    };
    //

    if(script.data == undefined)
        script.data = {};
    script.data["history"] = {};    //playListID -> HistoryData

    TDV.PlayerAPI.defineScript(script);
})();
