//Copyright (C) 2014 Panasonic Corporation. All Rights Reserved.
//
//*****************************************************************/
// File Name: happy_detail.js
// Purpose: This document creates the detail page
// File Created Date: Aug 3rd 2014
// Release Date: Sep 23rd 2014
// Release Version: 0.6
//*****************************************************************/
/*jslint browser:true, plusplus: true */
/*global $, jQuery, main, console*/
//namespace for detail screen
var detail = {
    contentType: "",
    contentTitle: "",
    disable: 0,
    prev: "",
    data: "",
    guide: false,
    isDetail: false,
    map: false,
    lat: [],
    lng: [],
    mapSet: true,
    weatherErr: false,
    item: false,
    arr: [],
    submenuOn: false,
    fromSub: false,
    guideFirst: false
};
var encodeVal = "AIzaSyBIScMiP4d9_y4qtEGspB6BSFHYolLJ2MY";
var initialize = function() {
    'use strict';
    var marker, mapDiv, myOptions, loopVar, directionsDisplay;
    marker = "";
    try {
        detail.lat[0] = parseFloat(detail.lat[0]);
        detail.lng[0] = parseFloat(detail.lng[0]);
        detail.location = new google.maps.LatLng(detail.lat[0], detail.lng[0]);
        mapDiv = document.getElementById('map');
        try {
            myOptions = {
                zoom: parseInt(10),
                maxZoom: 20,
                minZoom: 1,
                panControl: false,
                disableDefaultUI: true,
                center: detail.location,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            detail.mapVal = new google.maps.Map(mapDiv, myOptions);
        } catch (e) {}
        google.maps.event.addListener(detail.mapVal, 'tilesloaded', function() {
            if (!detail.mapObj.centre) {
                main.loading.Off();
                $("#map").css("visibility", "visible");
                $("#splashBlockLoading").removeClass("splashZindex");
                $(".mapTop").removeClass("mapOpacity");
                detail.mapObj.enter_focus();
                detail.mapObj.centre = false;
            }
        });
        google.maps.event.addListener(detail.mapVal, 'center_changed', function() {
            detail.mapObj.centre = true;
            setTimeout(function() {
                main.isLoading = false;
            }, 1000);
        });
        google.maps.event.addListener(detail.mapVal, 'zoom_changed', function() {
            detail.mapObj.centre = true;
            setTimeout(function() {
                main.isLoading = false;
            }, 1000);
        });
        for (loopVar = 0; loopVar < detail.lat.length; loopVar++) {
            if (detail.lat[loopVar] && detail.lng[loopVar] && detail.lat[loopVar] != "" && detail.lng[loopVar] != "") {
                detail.lat[loopVar] = parseFloat(detail.lat[loopVar]);
                detail.lng[loopVar] = parseFloat(detail.lng[loopVar]);
                detail.location = new google.maps.LatLng(detail.lat[loopVar], detail.lng[loopVar]);
                marker = new google.maps.Marker({
                    position: detail.location,
                    map: detail.mapVal,
                    animation: google.maps.Animation.BOUNCE
                });
            }
        }
        directionsDisplay = new google.maps.DirectionsRenderer({
            suppressMarkers: true
        });
    } catch (e) {
        main.loading.Off();
        $("#splashBlockLoading").removeClass("splashZindex");
        document.getElementById("mapContainerDiv").innerHTML = "<div id=mapbg class=mapbg></div><div id=mapCont class=mapCont></div>";
        detail.descObj.showErr({
            id: 'mapCont',
            msg: "Map unavailable."
        });
        (main.mapRet ? "" : main.focusedDom = detail.mapObj);
    }
};
detail.mapContainer = function() {
    'use strict';
    var curIndex = 1,
        map = "";
    this.centre = false;
    this.createMap = function() {
        main.loading.On();
        main.focusedDom = this;
        curIndex = 1;
        if ($("#mapContainerDiv").length > 0) {
            $("#mapContainerDiv").remove();
        }
        if ($("#mapbg").length > 0) {
            $("#mapbg").remove();
        }
        $("#splashBlockLoading").addClass("splashZindex");
        main.mapRet = false;
        detail.mapObj.centre = false;
        detail.mapFirst = true;
        map = "<div id=mapContainerDiv><div id=mapbg class=mapbg></div></div>";
        document.getElementById("contentSection").innerHTML += map;
        if (detail.lat.length === 0) {
            main.loading.Off();
            $("#splashBlockLoading").removeClass("splashZindex");
            document.getElementById("mapContainerDiv").innerHTML = "<div id=mapbg class=mapbg></div><div id=mapCont class=mapCont></div>";
            detail.descObj.showErr({
                id: 'mapCont',
                msg: "Map unavailable."
            });
            (main.mapRet ? "" : main.focusedDom = detail.mapObj);
        } else {
            this.loadScript();
        }
    };
    this.loadScript = function() {
        var map = "<div id=mapCont class=mapCont><div id=map></div></div>" + "<div id=mapLocationBg class=mapLocationBg></div><div id=mapLocationFooter class=mapLocationFooter><span class=mapLocation>Location:&nbsp;</span><div id=mapLocation></div></div><div id=mapFooter class=mapFooter></div>" + "<div id=mapNavTop class=mapNavTop>" + "<div id=map_1 class='mapOpacity mapTop mapNormal_1'></div><div id=map_2 class='mapOpacity mapTop mapNormal_2'></div><div id=map_3 class='mapOpacity mapTop mapNormal_3'></div><div id=map_4 class='mapOpacity mapTop mapNormal_4'></div>" + "</div>" + "<div id=mapNavBottom class=mapNavBottom>" + "<div id=map_5 class='mapOpacity mapTop mapNormal_5'></div><div id=map_6 class='mapOpacity mapTop mapNormal_6'></div>" + "</div>";
        document.getElementById("mapContainerDiv").innerHTML += map;
        $('#map_1').bind("transitionend webkitTransitionEnd", function() {
            if ($("#map_1").hasClass("mapAnim")) {
                $("#map_1").removeClass("mapAnim");
                $("#map_1").addClass("mapAnim1");
            } else if ($("#map_1").hasClass("mapAnim1")) {
                $("#map_1").removeClass("mapAnim1");
                try {
                    detail.mapVal.panBy(0, -100);
                } catch (e) {}
            }
        });
        $('#map_2').bind("transitionend webkitTransitionEnd", function() {
            if ($("#map_2").hasClass("mapAnim")) {
                $("#map_2").removeClass("mapAnim");
                $("#map_2").addClass("mapAnim1");
            } else if ($("#map_2").hasClass("mapAnim1")) {
                $("#map_2").removeClass("mapAnim1");
                detail.mapVal.panBy(0, 100);
            }
        });
        $('#map_3').bind("transitionend webkitTransitionEnd", function() {
            if ($("#map_3").hasClass("mapAnim")) {
                $("#map_3").removeClass("mapAnim");
                $("#map_3").addClass("mapAnim1");
            } else if ($("#map_3").hasClass("mapAnim1")) {
                $("#map_3").removeClass("mapAnim1");
                detail.mapVal.panBy(-100, 0);
            }
        });
        $('#map_4').bind("transitionend webkitTransitionEnd", function() {
            if ($("#map_4").hasClass("mapAnim")) {
                $("#map_4").removeClass("mapAnim");
                $("#map_4").addClass("mapAnim1");
            } else if ($("#map_4").hasClass("mapAnim1")) {
                $("#map_4").removeClass("mapAnim1");
                detail.mapVal.panBy(100, 0);
            }
        });
        document.getElementById("mapLocation").innerHTML = "";
        (detail.mapLocation ? document.getElementById("mapLocation").innerHTML = detail.mapLocation + " on map" : document.getElementById("mapLocationBg").style.display = 'none');
        (document.getElementById("mapLocation").innerHTML === "" ? document.getElementById("mapLocationFooter").style.display = 'none' : "");
        try {
            if (typeof google === 'object' && typeof google.maps === 'object') {
                initialize();
            } else {
                var script = document.createElement('script');
                script.type = 'text/javascript';
                script.src = "https://maps.googleapis.com/maps/api/js?key=" + encodeVal + "&callback=initialize";
                document.body.appendChild(script);
                script.onerror = function() {
                    main.loading.Off();
                    $("#splashBlockLoading").removeClass("splashZindex");
                    document.getElementById("mapContainerDiv").innerHTML = "<div id=mapbg class=mapbg></div><div id=mapCont class=mapCont></div>";
                    detail.descObj.showErr({
                        id: 'mapCont',
                        msg: "Map unavailable."
                    });
                    (main.mapRet ? "" : main.focusedDom = detail.mapObj);
                };
                document.body.appendChild(script);
            }
        } catch (e) {
            main.loading.Off();
            $("#splashBlockLoading").removeClass("splashZindex");
            document.getElementById("mapContainerDiv").innerHTML = "<div id=mapbg class=mapbg></div><div id=mapCont class=mapCont></div>";
            detail.descObj.showErr({
                id: 'mapCont',
                msg: "Map unavailable."
            });
            (main.mapRet ? "" : main.focusedDom = detail.mapObj);
        }
    };
    this.enter_focus = function() {
        (main.mapRet ? "" : main.focusedDom = this);
        $("#map_" + curIndex).removeClass("mapNormal_" + curIndex);
        $("#map_" + curIndex).addClass("mapCur_" + curIndex);
    };
    this.leave_focus = function() {
        $("#map_" + curIndex).removeClass("mapCur_" + curIndex);
        $("#map_" + curIndex).addClass("mapNormal_" + curIndex);
    };
    this.free = function() {
        $(".splash").removeClass("mapImageLoading").addClass("splashImageLoading");
        $(".loading").css("color", "#fff");
        curIndex = 1;
        if ($("#mapContainerDiv").length > 0) {
            $("#mapContainerDiv").remove();
        }
        if ($("#mapbg").length > 0) {
            $("#mapbg").remove();
        }
    };
    this.KeyboardEvent = function(e, eventType) {
        if (eventType === "keydown") {
            switch (e) {
                case "arrowdown":
                    if (curIndex === 1 || curIndex === 2) {
                        this.leave_focus();
                        ($("#map_5").hasClass('mapDisabled_5') ? curIndex = 6 : curIndex = 5);
                        this.enter_focus();
                    } else if (curIndex === 3 || curIndex === 4) {
                        this.leave_focus();
                        ($("#map_6").hasClass('mapDisabled_6') ? curIndex = 5 : curIndex = 6);
                        this.enter_focus();
                    }
                    break;
                case "arrowup":
                    if (curIndex === 5) {
                        this.leave_focus();
                        curIndex = 1;
                        this.enter_focus();
                    } else if (curIndex === 6) {
                        this.leave_focus();
                        curIndex = 3;
                        this.enter_focus();
                    }
                    break;
                case "arrowleft":
                    if (curIndex !== 1 && curIndex !== 5) {
                        if (!(curIndex == 6 && $("#map_5").hasClass("mapDisabled_5"))) {
                            this.leave_focus();
                            curIndex--;
                            this.enter_focus();
                        }
                    }
                    break;
                case "arrowright":
                    if (curIndex !== 4 && curIndex !== 6) {
                        if (!(curIndex == 5 && $("#map_6").hasClass("mapDisabled_6"))) {
                            this.leave_focus();
                            curIndex++;
                            this.enter_focus();
                        }
                    }
                    break;
                case "ok":
                    main.isLoading = true;
                    switch (curIndex) {
                        case 1:
                            detail.mapVal.panBy(0, -100);
                            break;
                        case 2:
                            detail.mapVal.panBy(0, 100);
                            break;
                        case 3:
                            detail.mapVal.panBy(-100, 0);
                            break;
                        case 4:
                            detail.mapVal.panBy(100, 0);
                            break;
                        case 5:
                            if (detail.mapVal.getZoom() + 1 <= 20) {
                                detail.mapVal.setZoom(detail.mapVal.getZoom() + 1);
                                $("#map_6").removeClass("mapDisabled_6");
                                $("#map_6").addClass("mapNormal_6");
                            }
                            if (detail.mapVal.getZoom() === 20) {
                                $("#map_5").removeClass("mapCur_5");
                                $("#map_5").addClass("mapDisabled_5");
                                curIndex++;
                                this.enter_focus();
                            }
                            break;
                        case 6:
                            if (detail.mapVal.getZoom() - 1 > 1) {
                                detail.mapVal.setZoom(detail.mapVal.getZoom() - 1);
                                $("#map_5").removeClass("mapDisabled_5");
                                $("#map_5").addClass("mapNormal_5");
                            }
                            if (detail.mapVal.getZoom() - 1 === 1) {
                                $("#map_6").removeClass("mapCur_6");
                                $("#map_6").addClass("mapDisabled_6");
                                curIndex--;
                                this.enter_focus();
                            }
                            break;
                    }
                    break;
                case "blue":
                    main.isLoading = true;
                    $("#map_4").addClass("mapAnim");
                    return true;
                case "red":
                    main.isLoading = true;
                    $("#map_1").addClass("mapAnim");
                    return true;
                case "green":
                    main.isLoading = true;
                    $("#map_2").addClass("mapAnim");
                    return true;
                case "yellow":
                    main.isLoading = true;
                    $("#map_3").addClass("mapAnim");
                    return true;
                case "return":
                    main.loading.Off();
                    this.free();
                    (detail.Slideprevmap === detail.subMenu && !detail.fromSub ? detail.submenuOn = true : detail.submenuOn = false);
                    (detail.Slideprevmap === detail.subMenu && detail.submenuOn ? detail.subMenu.slideOpen() : detail.Slideprevmap.enter_focus());
                    detail.Slideprevmap = null;
                    main.mapRet = true;
                    return true;
            }
            return false;
        }
    };
};
detail.mapObj = new detail.mapContainer();
detail.galleryContainer = function() {
    this.components = [];
    var moveLeft = 0,
        imgCount = 1,
        arrRight = false,
        arrLeft = false,
        obj = {},
        gallery_baseGrid;
    this.enter_focus = function() {
        main.focusedDom = this;
        if (arrRight) {
            $("#rightArrCont").removeClass("galleryNormal");
            $("#rightArrCont").removeClass("galleryCur");
            $("#rightArrCont").addClass("galleryCur");
        } else if (arrLeft) {
            $("#leftArrCont").removeClass("galleryNormal");
            $("#leftArrCont").removeClass("galleryCur");
            $("#leftArrCont").addClass("galleryCur");
        }
    };
    this.leave_focus = function() {
        if (arrRight) {
            $("#rightArrCont").addClass("galleryNormal");
        } else if (arrLeft) {
            $("#leftArrCont").addClass("galleryNormal");
        }
    };
    obj.enableleftArrow = function() {
        if (!arrLeft) {
            $("#leftArrCont").removeClass("galleryDisabled");
            $("#leftArrCont").removeClass("galleryCur");
            $("#leftArrCont").addClass("galleryNormal");
        } else {
            $("#leftArrCont").removeClass("galleryNormal");
            $("#leftArrCont").removeClass("galleryDisabled");
            $("#leftArrCont").addClass("galleryCur");
        }
    };
    obj.enablerightArrow = function() {
        if (!arrRight) {
            $("#rightArrCont").removeClass("galleryDisabled");
            $("#rightArrCont").removeClass("galleryCur");
            $("#rightArrCont").addClass("galleryNormal");
        } else {
            $("#rightArrCont").removeClass("galleryNormal");
            $("#rightArrCont").removeClass("galleryDisabled");
            $("#rightArrCont").addClass("galleryCur");
        }
    };
    obj.enableBothArrow = function() {
        obj.enableleftArrow();
        obj.enablerightArrow();
    };
    obj.disableBothArrow = function() {
        $("#leftArrCont").addClass("galleryDisabled");
        $("#rightArrCont").addClass("galleryDisabled");
    };
    obj.hideArrow = function() {
        $("#leftArrCont").addClass("loadingOff");
        $("#rightArrCont").addClass("loadingOff");
    };
    obj.showArrow = function() {
        $("leftArrCont").removeClass("loadingOff");
        $("#rightArrCont").removeClass("loadingOff");
    };
    gallery_baseGrid = function(param) {
		var config = param || {},
            obj = {},
            imgString = "",
            photo;
        imgString = "<img  class='imgGallery' id='imgGallery_" + config.id + "' />";
        obj = {
            "wrapper": "<div class='imgWrapper' id='imgWrapper_" + config.id + "'></div>",
            "loadingText": "<div class='imgLoading' id='imgLoading_" + config.id + "'>Loading...</div>",
            "hoverDiv": "<div class='imgLabelCont' id='imgLabelCont_" + config.id + "'><div class='imgLabel' id='imgLabel_" + config.id + "'></div><div class='photoby_credit'><div class=photoBy id=photoBy_" + config.id + "></div><div class=creditBy id=creditBy_" + config.id + "></div><div class=creditByText id=creditByText_" + config.id + "></div></div></div>",
            "image": imgString
        };
        document.getElementById("gallerySlideCont").innerHTML += obj.wrapper;
        obj.wrapper = document.getElementById("imgWrapper_" + config.id);
        obj.wrapper.innerHTML = obj.loadingText;
        obj.wrapper.innerHTML += obj.image;
        obj.wrapper.innerHTML += (config.credit ? obj.hoverDiv : "");
        photo = (config.credit ? config.credit.toString().split(":") : "");
        photo[1] = (photo[1] ? photo[1].split(",") : "");
        if (photo[1] && photo[1][1] && photo[1][1] !== "" && photo[1] !== "") {
            $("#photoBy_" + config.id).html(photo[0] + ":");
            $("#creditBy_" + config.id).html(photo[1][0] + ",");
            $("#creditBy_" + config.id).addClass('floatLef');
            $("#creditByText_" + config.id).html(photo[1][1]);
        } else if (config.credit) {
            $("#photoBy_" + config.id).html(photo[0] + ":");
            $("#creditBy_" + config.id).html(photo[1]);
        }
        (config.author ? (document.getElementById("breadAuthor").innerHTML = config.author) : (document.getElementById("breadAuthor").style.display = 'none'));
        (config.editor ? (document.getElementById("breadCredit").innerHTML = config.editor) : (document.getElementById("breadCredit").style.display = 'none'));
        (config.author && config.editor ? "" : document.getElementById("breadSep").style.display = 'none');
        obj.image = document.getElementById("imgGallery_" + config.id);
        $("#imgGallery_" + config.id).load(function() {
            $("#imgGallery_" + this.id.split("imgGallery_")[1]).css("display", "block");
            $("#imgGallery_" + this.id.split("imgGallery_")[1]).prev().css("display", "none");
            $("#imgGallery_" + this.id.split("imgGallery_")[1]).next().css("display", "block");
        });
        $("#imgGallery_" + config.id).error(function() {
            $("#imgGallery_" + this.id.split("imgGallery_")[1]).css("display", "block");
            $("#imgGallery_" + this.id.split("imgGallery_")[1]).css("opacity", "1");
            $("#imgGallery_" + this.id.split("imgGallery_")[1]).prev().css("display", "none");
            $("#imgGallery_" + this.id.split("imgGallery_")[1]).attr("src", "images/detail/default_img_gallery.jpg");
            var index = detail.lowerGalleryObj.getCur();
            if ($("#lowerimgGallery_" + index).css('display') == "none") {
                $("#lowerimgGallery_" + index).attr("src", "images/detail/default_img_gallery.jpg");
            }
        });
        obj.image.src = (config.src ? (config.src + ((detail.galleryView && !detail.guide) ? ("?") : (config.param.type !== "overview" ? "&" : "?")) + "resize_mode=4&height=548&width=808") : "images/detail/default_img_gallery.jpg");
        obj.loadingText = document.getElementById("imgLoading_" + config.id);
        return obj;
    };
    this.free = function() {
        this.components = [];
        moveLeft = 0;
        imgCount = 1;
        arrRight = false;
        arrLeft = false;
        (document.getElementById('gallerySlideCont') ? document.getElementById('gallerySlideCont').innerHTML = "" : "");
        detail.mapSet = true;
    };
    this.freeOnReturn = function() {
        this.free();
        detail.lowerGalleryObj.free();
        detail.descObj.free();
        document.getElementById('contentSection').innerHTML = "";
        detail.galleryView = false;
        detail.guide = false;
        detail.prev = "";
        detail.map = false;
        detail.subMenu.subMenu = false;
        main.isDetail = false;
        clearInterval(detail.setTimer);
        clearTimeout(detail.callout);
        detail.homeData = "";
        imageArr = [];
        hoverTxt = [];
        detail.weatherObj.components = [];
        detail.weatherErr = false;
        detail.submenuOn = false;
        detail.Slideprevmap = null;
        detail.Slideprev = null;
        detail.mapObj.free();
    };
    this.thumbnail = function(param) {
        var len = 0,
            limit = 0,
            hover = "",
            imageArr = [null],
            hoverTxt = [null],
            loopVar;
        this.free();
        if (detail.arr.length > 0) {
            len = detail.arr.length - 1;
            for (loopVar = 0; loopVar < detail.arr.length; loopVar++) {
                imageArr[loopVar] = (detail.arr[loopVar].src ? detail.arr[loopVar].src.replace("/photo", "http://timesofindia.indiatimes.com/thumb") : "");
                hoverTxt[loopVar] = (detail.arr[loopVar].photoBy ? detail.arr[loopVar].photoBy : null);
            }
        } else {
            len = 0;
            imageArr[0] = (detail.data.Thumb ? detail.data.Thumb : "");
            hoverTxt[0] = (detail.ImageCreditAuthor && detail.ImageCreditAuthor != "" ? "Photo by: " + detail.ImageCreditAuthor : null);
        }
        limit = (param.type === "overview" ? len : 0);
        for (loopVar = 0; loopVar <= limit; loopVar++) {
            hover = (hoverTxt[loopVar] ? hoverTxt[loopVar] : (detail.guide && param.type != "overview" && param.type != "gallery" ? (detail.data.ImageList && detail.data.ImageList[param.index] && detail.data.ImageList[param.index].ImageCreditAuthor ? "Photo by: " + detail.data.ImageList[param.index].ImageCreditAuthor : null) : (param.type === "overview" ? (hoverTxt[loopVar]) : (param.type === "gallery" && !detail.guide ? (detail.data && detail.data[param.index] && detail.data[param.index].PoiMetaDatadetail && detail.data[param.index].PoiMetaDatadetail.ImageCreditAuthor ? "Photo by: " + detail.data[param.index].PoiMetaDatadetail.ImageCreditAuthor : null) : (detail.data.CardList && detail.data.CardList[param.index] && detail.data.CardList[param.index].PoiMetaData && detail.data.CardList[param.index].PoiMetaData.ImageCreditAuthor ? "Photo by: " + detail.data.CardList[param.index].PoiMetaData.ImageCreditAuthor : null)))));
            this.components[loopVar] = gallery_baseGrid({
                'id': loopVar,
                'src': (detail.guide && param.type != "overview" && param.type != "gallery" ? (detail.data.ImageList && detail.data.ImageList[param.index] && detail.data.ImageList[param.index].Thumb ? detail.data.ImageList[param.index].Thumb : "") : (param.type === "overview" ? (imageArr[loopVar]) : (param.type === "gallery" && !detail.guide ? (detail.data && detail.data[param.index] && detail.data[param.index].Thumb ? detail.data[param.index].Thumb : "") : (detail.data.CardList && detail.data.CardList[param.index] && detail.data.CardList[param.index].Thumb ? detail.data.CardList[param.index].Thumb : "")))),
                'credit': hover,
                'editor': detail.data.Agency ? detail.data.Agency : null,
                'author': detail.data.Author ? detail.data.Author : null,
                'param': param
            });
        }
        len = this.components.length * 808;
        $("#gallerySlideCont").css("width", len + "px");
        obj.disableBothArrow();
        if (this.components.length > 1) {
            obj.enablerightArrow();
            arrRight = true;
        } else {
            obj.hideArrow();
        }
    };
    this.scrollLeft = function() {
        moveLeft -= 808;
        $("#gallerySlideCont").css("margin-left", moveLeft + "px");
        imgCount += 1;
        if (imgCount === this.components.length) {
            obj.disableBothArrow();
            arrLeft = true;
            arrRight = false;
            obj.enableleftArrow();
        } else {
            obj.enableBothArrow();
        }
    };
    this.scrollRight = function() {
        moveLeft += 808;
        $("#gallerySlideCont").css("margin-left", moveLeft + "px");
        imgCount -= 1;
        if (imgCount === 1) {
            obj.disableBothArrow();
            arrRight = true;
            arrLeft = false;
            obj.enablerightArrow();
        } else {
            obj.enableBothArrow();
        }
    };
    this.KeyboardEvent = function(e, eventType) {
        if ($("#subMenuSlider").css("margin-left") == "0px") {
            $(".subCallOut").remove();
            $("#subMenuSlider").removeClass("sliderZero");
            $("#subMenuSlider").addClass("submenuLeft");
            $(".subArrCont").css("margin-left", "-236px");
            $(".subArrContBg").css("margin-left", "-236px");
            $("#subMenuArr").css("-webkit-transform", "rotate(0deg)");
            return true;
        }
        event.preventDefault();
        if (eventType === "keydown") {
            switch (e) {
                case "arrowright":
                    if (arrLeft && imgCount !== this.components.length) {
                        this.leave_focus();
                        arrRight = true;
                        arrLeft = false;
                        this.enter_focus();
                    } else if (detail.arrRight || detail.arrLeft || detail.map) {
                        if (detail.pageDetails.currentPg !== 1) {
                            detail.arrRight = false;
                            detail.arrLeft = true;
                        } else {
                            detail.arrRight = true;
                            detail.arrLeft = false;
                        }
                        this.leave_focus();
                        detail.descObj.enter_focus();
                    } else if (detail.guide && detail.weatherObj.components.length > 1) {
                        arrow.leave_focus();
                        detail.weatherObj.enter_focus();
                    }
                    return false;
                case "arrowleft":
                    if (arrRight && imgCount !== 1) {
                        this.leave_focus();
                        arrLeft = true;
                        arrRight = false;
                        this.enter_focus();
                    } else if (detail.guide && $("#subMenuSlider").length > 0) {
                        detail.subMenuPrev = this;
                        this.leave_focus();
                        detail.subMenu.enter_focus();
                    }
                    return false;
                case "arrowdown":
                    if (detail.lowerGalleryObj.totalPg > 1 || detail.lowerGalleryObj.components.length > 1) {
                        detail.prev = this;
                        this.leave_focus();
                        detail.lowerGalleryObj.enter_focus();
                    }
                    return false;
                case "arrowup":
                    detail.prev = this;
                    this.leave_focus();
                    (main.isSearchScreen ? home.searchObj.enter_focus() : home.menuObj.enter_focus());
                    return false;
                case "ok":
                    if (arrRight) {
                        if (imgCount !== this.components.length) {
                            this.scrollLeft();
                        }
                    } else {
                        if (imgCount !== 1) {
                            this.scrollRight();
                        }
                    }
                    return false;
            }
            return false;
        }
    };
};
detail.galleryObj = new detail.galleryContainer();
detail.lowerGalleryContainer = function() {
    this.components = [];
    this.totalPg = 0;
    var curCur = 0,
        total = 0,
        curPg = 1,
        limit = 0,
        count = 0,
        prevCur = 0,
        marginLeft = 27;
    this.enter_focus = function() {
        var type, index;
        $("#lowerimgCursor_" + curCur).addClass('lowerimgCursor');
        if (prevCur !== curCur) {
            type = (detail.galleryView ? "gallery" : (curCur === 0 ? "overview" : ""));
            index = (detail.galleryView ? curCur : (curCur === 0 ? 0 : (curCur - 1)));
            detail.descObj.createDescription({
                "type": type,
                "index": index
            });
            detail.galleryObj.thumbnail({
                "type": type,
                "index": index
            });
        }
        main.focusedDom = this;
    };
    this.getCur = function() {
        return curCur;
    };
    this.leave_focus = function() {
        $("#lowerimgCursor_" + curCur).removeClass('lowerimgCursor');
        prevCur = curCur;
    };
    this.enableleftArrow = function() {
        $("#lowerArrLeft").removeClass("lowerArrDisabled");
        $("#lowerArrLeft").addClass("lowerArrEnabled");
    };
    this.enablerightArrow = function() {
        $("#lowerArrRight").removeClass("lowerArrDisabled");
        $("#lowerArrRight").addClass("lowerArrEnabled");
    };
    this.enableBothArrow = function() {
        this.enableleftArrow();
        this.enablerightArrow();
    };
    this.disableBothArrow = function() {
        $("#lowerArrLeft").removeClass("lowerArrEnabled");
        $("#lowerArrRight").removeClass("lowerArrEnabled");
        $("#lowerArrLeft").addClass("lowerArrDisabled");
        $("#lowerArrRight").addClass("lowerArrDisabled");
    };
    this.hideArrow = function() {
        $("#lowerArrLeft").addClass("hideVisibility");
        $("#lowerArrRight").addClass("hideVisibility");
    };
    this.hideOverView = function() {
        $(".overviewBg").addClass("loadingOff");
        $(".shadow_onepx_left").css("width", "263px");
    };
    this.showOverView = function() {
        $(".overviewBg").removeClass("loadingOff");
    };
    this.showArrow = function() {
        $("#lowerArrLeft").removeClass("hideVisibility");
        $("#lowerArrRight").removeClass("hideVisibility");
    };
    this.free = function() {
        curCur = 0;
        total = 0;
        this.totalPg = 0;
        curPg = 1;
        limit = 0;
        count = 0;
        prevCur = 0;
    };
    this.freePage = function() {
        marginLeft = 27;
        lowerGallerycont.innerHTML = "";
        this.components = [];
    };
    var gallery_baseGrid = function(param) {
        var config = param || {},
            obj = {},
            imgString = "";
        imgString = "<img class='lowerimgGallery' id='lowerimgGallery_" + config.id + "' />";
        obj = {
            "cursor": "<div class=shadowLeft><div id=shadowLeftt_" + config.id + " class=shadowLeftt></div><div id=shadowRight_" + config.id + " class=shadowRight><div class='lowerimgBg' id='lowerimgCursor_" + config.id + "'></div></div></div>",
            "wrapper": "<div class=wrapperBG></div><div class='lowerimgWrapper' id='lowerimgWrapper_" + config.id + "'></div>",
            "loadingText": "<div class='lowerimgLoading' id='lowerimgLoading_" + config.id + "'>Loading...</div>",
            "hoverDiv": "<div class='lowerimgLabelCont' id='lowerimgLabelCont_" + config.id + "'><div class='lowerimgLabel' id='lowerimgLabel_" + config.id + "'></div><div class=lowerimgcreditByText id=lowerimgcreditByText_" + config.id + ">" + config.hover + "</div></div>",
            "itemNumber": (!detail.guide && !detail.galleryView && config.id != 0 ? "<div id=itemNum_" + config.id + " class=itemNum>" + (config.id) + "</div>" : ""),
            "image": imgString
        };
        lowerGallerycont.innerHTML += obj.cursor;
        obj.cursor = document.getElementById("lowerimgCursor_" + config.id);
        obj.cursor.innerHTML = obj.wrapper;
        obj.wrapper = document.getElementById("lowerimgWrapper_" + config.id);
        obj.wrapper.innerHTML = obj.itemNumber;
        obj.wrapper.innerHTML += obj.loadingText;
        obj.wrapper.innerHTML += obj.image;
        obj.wrapper.innerHTML += (config.hover ? obj.hoverDiv : "");
        obj.hoverDiv = document.getElementById("lowerimgLabelCont_" + config.id);
        try {
            obj.image = document.getElementById("lowerimgGallery_" + config.id);
            obj.image.src = (config.src ? (config.src + (param.subMenu ? "&" : (config.id === 0 || detail.galleryView ? "?" : "&")) + "resize_mode=4&height=205&width=301") : "images/detail/default_img_gallery.jpg");
            obj.loadingText = document.getElementById("lowerimgLoading_" + config.id);
            if (config.id % 5 != 0) {
                marginLeft += 357;
                $("#shadowLeftt_" + config.id).css("margin-left", marginLeft + "px");
            }
            $("#lowerimgGallery_" + config.id).load(function() {
                $("#lowerimgGallery_" + this.id.split("lowerimgGallery_")[1]).prev().css("display", "none");
                $("#lowerimgGallery_" + this.id.split("lowerimgGallery_")[1]).css("display", "block");
                $("#lowerimgGallery_" + this.id.split("lowerimgGallery_")[1]).next().css("display", "block");
                $("#lowerimgGallery_" + this.id.split("lowerimgGallery_")[1]).attr("imgLoaded", true);
            });
            $("#lowerimgGallery_" + config.id).error(function() {
                $("#lowerimgGallery_" + this.id.split("lowerimgGallery_")[1]).prev().css("display", "none");
                $("#lowerimgGallery_" + this.id.split("lowerimgGallery_")[1]).css("display", "block");
                $("#lowerimgGallery_" + this.id.split("lowerimgGallery_")[1]).attr("src", "images/detail/default_img_gallery.jpg");
                $("#lowerimgGallery_" + this.id.split("lowerimgGallery_")[1]).attr("imgLoaded", false);
            });
        } catch (e) {}
        return obj;
    };
    this.createThumbnailGallery = function(param) {
        var init = 0,
            hoverTxt = "";
        this.freePage();
        total = detail.data.length;
        this.totalPg = Math.ceil((total) / 5);
        if (this.totalPg > 1) {
            $("#detailPagesDiv").removeClass("loadingOff");
            $("#detailCurPg").html(curPg);
            $("#detailtTtlPg").html(this.totalPg);
        } else {
            $("#detailPagesDiv").addClass("loadingOff");
        }
        if (detail.mapSet) {
            for (var loopVar = 0; loopVar < total; loopVar++) {
                (detail.data[loopVar] && detail.data[loopVar].PoiMetaData && detail.data[loopVar].PoiMetaData.Latitude && detail.data[loopVar].PoiMetaData.Latitude != "" ? detail.lat[detail.count] = detail.data[loopVar].PoiMetaData.Latitude : "");
                (detail.data[loopVar] && detail.data[loopVar].PoiMetaData && detail.data[loopVar].PoiMetaData.Longitude && detail.data[loopVar].PoiMetaData.Longitude != "" ? detail.lng[detail.count] = detail.data[loopVar].PoiMetaData.Longitude : "");
                if (detail.lat[detail.count] && detail.lat[detail.count] != "" && detail.lng[detail.count] && detail.lng[detail.count] != "") {
                    detail.count++;
                }
            }
            detail.mapSet = false;
        }
        if (curPg < this.totalPg) {
            limit = 5;
        } else {
            limit = total - ((curPg - 1) * 5);
        }
        if (total > 0) {
            for (loopVar = init; loopVar < limit; loopVar++) {
                hoverTxt = (detail.data[count].Tags && detail.data[count].Tags[0] && detail.data[count].Tags[0].Text ? detail.data[count].Tags[0].Text : "");
                hoverTxt += (detail.data[count].Tags && detail.data[count].Tags && detail.data[count].Tags[1] && detail.data[count].Tags[1].Text ? ", " + detail.data[count].Tags[1].Text : "");
                this.components[loopVar] = gallery_baseGrid({
                    'id': count,
                    'src': (detail.data[count] && detail.data[count].Thumb ? detail.data[count].Thumb : null),
                    'hover': (hoverTxt !== "" ? hoverTxt : null),
                    'subMenu': param ? param.submenu : ""
                });
                count++;
            }
            this.disableBothArrow();
            if (this.totalPg == 1) {
                this.hideArrow();
            } else if (curPg < this.totalPg) {
                this.showArrow();
                if (curPg == 1) {
                    this.enablerightArrow();
                } else {
                    this.enableBothArrow();
                }
            } else {
                this.showArrow();
                this.enableleftArrow();
            }
        } else {
            lowerGallerycont.innerHTML = "";
            this.hideOverView();
            this.hideArrow();
            detail.descObj.showErr({
                id: 'lowerGallerycont',
                msg: "No data available."
            });
        }
        this.animateThumbnail();
    };
    this.createThumbnail = function() {
        var hoverTxt = "",
            init;
        this.freePage();
        if (curPg === 1) {
            total = (detail.data.CardList ? (detail.data.CardList.length) : (detail.data.ImageList ? detail.data.ImageList.length : 0));
            if (detail.guide && !detail.data.ImageList && detail.data.CardList) {
                total = 0;
            }
            this.totalPg = Math.ceil((total + 1) / 5);
            if (this.totalPg > 1) {
                $("#detailPagesDiv").removeClass("loadingOff");
            } else {
                $("#detailPagesDiv").addClass("loadingOff");
            }
            if (detail.mapSet) {
                for (var loopVar = 0; loopVar < total; loopVar++) {
                    (detail.guide ? (detail.data.ImageList[loopVar] && detail.data.ImageList[loopVar].PoiMetaData && detail.data.ImageList[loopVar].PoiMetaData.Latitude && detail.data.ImageList[loopVar].PoiMetaData.Latitude != "" ? detail.lat[detail.count] = detail.data.ImageList[loopVar].PoiMetaData.Latitude : "") : (detail.data.CardList[loopVar] && detail.data.CardList[loopVar].PoiMetaData && detail.data.CardList[loopVar].PoiMetaData.Latitude && detail.data.CardList[loopVar].PoiMetaData.Latitude != "" ? detail.lat[detail.count] = detail.data.CardList[loopVar].PoiMetaData.Latitude : ""));
                    (detail.guide ? (detail.data.ImageList[loopVar] && detail.data.ImageList[loopVar].PoiMetaData && detail.data.ImageList[loopVar].PoiMetaData.Longitude && detail.data.ImageList[loopVar].PoiMetaData.Longitude != "" ? detail.lng[detail.count] = detail.data.ImageList[loopVar].PoiMetaData.Longitude : "") : (detail.data.CardList[loopVar] && detail.data.CardList[loopVar].PoiMetaData && detail.data.CardList[loopVar].PoiMetaData.Longitude && detail.data.CardList[loopVar].PoiMetaData.Longitude != "" ? detail.lng[detail.count] = detail.data.CardList[loopVar].PoiMetaData.Longitude : ""));
                    if (detail.lat[detail.count] && detail.lat[detail.count] != "" && detail.lng[detail.count] != "") {
                        detail.count++;
                    }
                }
                if (detail.count == 0 && (!detail.lat[0] || !detail.lng[0])) {
                    detail.lat = [];
                    detail.lng = [];
                }
                detail.mapSet = false;
            }
            if (detail.guide) {
                hoverTxt = (detail.data.Tags && detail.data.Tags[0] && detail.data.Tags[0].Text ? detail.data.Tags[0].Text : "");
                hoverTxt += (detail.data.Tags && detail.data.Tags[1] && detail.data.Tags[1].Text ? ", " + detail.data.Tags[1].Text : "");
            } else {
                hoverTxt = (detail.data.Tags && detail.data.Tags.primary && detail.data.Tags.primary[0] && detail.data.Tags.primary[0].Text ? detail.data.Tags.primary[0].Text : "");
                hoverTxt += (detail.data.Tags && detail.data.Tags.primary && detail.data.Tags.primary[1] && detail.data.Tags.primary[1].Text ? ", " + detail.data.Tags.primary[1].Text : "");
            }
            this.components[0] = gallery_baseGrid({
                'id': 0,
                'src': (detail.data.Thumb ? detail.data.Thumb : null),
                'hover': (hoverTxt !== "" ? hoverTxt : "HIGHLIGHTS"),
            });
            init = 1;
        } else {
            init = 0;
        }
        if (curPg < this.totalPg) {
            limit = 5;
        } else {
            limit = total - ((curPg - 1) * 5) + 1;
        }
        $("#detailCurPg").html(curPg);
        $("#detailtTtlPg").html(this.totalPg);
        if (total > 0) {
            for (loopVar = init; loopVar < limit; loopVar++) {
                hoverTxt = (!detail.guide ? (detail.data.CardList && detail.data.CardList[count] && detail.data.CardList[count].Tags && detail.data.CardList[count].Tags[0] && detail.data.CardList[count].Tags[0].Text ? detail.data.CardList[count].Tags[0].Text : "") : "");
                hoverTxt += (!detail.guide ? (detail.data.CardList && detail.data.CardList[count] && detail.data.CardList[count].Tags && detail.data.CardList[count].Tags[1] && detail.data.CardList[count].Tags[1].Text ? ", " + detail.data.CardList[count].Tags[1].Text : "") : "");
                this.components[loopVar] = gallery_baseGrid({
                    'id': count + 1,
                    'src': (detail.guide ? (detail.data.ImageList[count] && detail.data.ImageList[count].Thumb ? detail.data.ImageList[count].Thumb : null) : (detail.data.CardList[count] && detail.data.CardList[count].Thumb ? detail.data.CardList[count].Thumb : null)),
                    'hover': (hoverTxt != "" ? hoverTxt : null),
                });
                count++;
            }
            this.disableBothArrow();
            this.showArrow();
        } else if (this.components.length < 1) {
            lowerGallerycont.innerHTML = "";
            this.hideOverView();
            this.hideArrow();
            detail.descObj.showErr({
                id: 'lowerGallerycont',
                msg: "No data available."
            });
        }
        if (this.totalPg == 1) {
            this.hideArrow();
        } else if (curPg < this.totalPg) {
            this.showArrow();
            if (curPg == 1) {
                this.enablerightArrow();
            } else {
                this.enableBothArrow();
            }
        } else {
            this.enableleftArrow();
        }
        this.animateThumbnail();
    };
    this.animateThumbnail = function() {
        var loopVar = 0;
        for (loopVar = 0; loopVar < this.components.length; loopVar++) {
            clearInterval(detail.lowerTimer);
            detail.lowerTimer = setInterval(function() {
                $(".shadowRight").css("top", "0px");
            }, 100);
        }
    };
    this.KeyboardEvent = function(e, eventType) {
        if ($("#subMenuSlider").css("margin-left") == "0px") {
            $(".subCallOut").remove();
            $("#subMenuSlider").removeClass("sliderZero");
            $("#subMenuSlider").addClass("submenuLeft");
            $(".subArrCont").css("margin-left", "-236px");
            $(".subArrContBg").css("margin-left", "-236px");
            $("#subMenuArr").css("-webkit-transform", "rotate(0deg)");
            return true;
        }
        if (eventType === "keydown") {
            switch (e) {
                case "arrowright":
                    if ((curCur % 5 < (limit - 1)) && (curCur < total)) {
                        this.leave_focus();
                        curCur++;
                        this.enter_focus();
                    } else {
                        if (curPg < this.totalPg) {
                            curPg++;
                            (detail.galleryView ? this.createThumbnailGallery((detail.subMenu.subMenu ? {
                                submenu: true
                            } : "")) : this.createThumbnail());
                            curCur++;
                            this.enter_focus();
                        }
                    }
                    return false;
                case "arrowleft":
                    if (curCur % 5 != 0) {
                        this.leave_focus();
                        curCur--;
                        this.enter_focus();
                    } else if (curPg !== 1) {
                        count = (detail.galleryView ? (count - 5 - lowerGallerycont.children.length) : (count - (curPg === 2 ? 4 : 5) - lowerGallerycont.children.length));;
                        curPg--;
                        (detail.galleryView ? this.createThumbnailGallery((detail.subMenu.subMenu ? {
                            submenu: true
                        } : "")) : this.createThumbnail());
                        curCur--;
                        this.enter_focus();
                    }
                    return false;
                case "arrowdown":
                    return false;
                case "arrowup":
                    this.leave_focus();
                    detail.prev.enter_focus();
                    detail.prev = this;
                    return false;
                case "ok":
                    return false;
            }
            return false;
        }
    };
};
detail.lowerGalleryObj = new detail.lowerGalleryContainer();
detail.descriptionContainer = function() {
    "use strict";
    var arrow, scrollVal = 0,
        descData = {
            "gridDesc": ""
        },
        weatherData = {};
    this.replaceDelimiter = function(param) {
        var str = param.trim();
        str = str.replace(/\r\n/g, "<br/>");
        var lastInd = str.lastIndexOf("<br/>");
        var sum = parseInt(lastInd) + 5;
        str = str.replace(/<br\/><br\/>/g, "<br/>");
        str = str.replace(/[\s]<strong>/g, "<br/><strong>");
        str = str.replace(/<i>/g, "<i class=italicWordWrap>");
        if (str.length === sum) {
            str = str.substring(0, lastInd);
        }
        str = str.replace(/<p[^>]*>/g, "");
        str = str.replace(/<\/p[^>]*>/g, "");
        str = str.replace(/<st1[^>]*>/g, "");
        str = str.replace(/<\/st1[^>]*>/g, "");
        str = str.replace(/ʻ/g, "`");
        return str;
    };
    this.freeTextArea = function() {
        (document.getElementById('scrollContainer') ? scrollContainer.innerHTML = "" : "");
        scrollVal = 0;
    };
    this.free = function() {
        this.freeTextArea();
        arrow = "";
        scrollVal = 0;
        descData.gridDesc = "";
    };
    this.setDescriptionData = function(param) {
        var str = "";
        title.innerHTML = (detail.guide && param.type != "overview" ? (param.type == "gallery" ? (detail.data.CardList && detail.data.CardList[param.index] && detail.data.CardList[param.index].Title ? detail.data.CardList[param.index].Title : "") : (detail.data.ImageList && detail.data.ImageList[param.index] && detail.data.ImageList[param.index].Title ? detail.data.ImageList[param.index].Title : "")) : (param.type === "overview" ? (detail.data.Title ? detail.data.Title : "") : (param.type === "gallery" ? (detail.data && detail.data[param.index] && detail.data[param.index].Title ? detail.data[param.index].Title : "") : (detail.data.CardList && detail.data.CardList[param.index] && detail.data.CardList[param.index].Title ? detail.data.CardList[param.index].Title : ""))));
        (param.type !== "" ? titleBread.innerHTML = title.innerHTML : titleBreadLevel.innerHTML = title.innerHTML);
        if (title.innerHTML == "" && detail.title == "") {
            $("#descTitle").addClass("hideVisibility");
        } else if (title.innerHTML == detail.title) {
            $("#descTitle").removeClass("hideVisibility");
            title.innerHTML = detail.title;
        } else if (title.innerHTML == "" & detail.title != "") {
            $("#descTitle").removeClass("hideVisibility");
            title.innerHTML = detail.title;
        }
        (param.type !== "" ? titleBread.innerHTML = title.innerHTML : titleBreadLevel.innerHTML = title.innerHTML);
        if ($("#titleBread").html() == "") {
            $("#arrBread").addClass("loadingOff");
        } else {
            $("#arrBread").removeClass("loadingOff");
        }
        if ($("#titleBreadLevel").html() == "") {
            $("#titleBreadarr").addClass("loadingOff");
        } else {;
            $("#titleBreadarr").removeClass("loadingOff");
        }
        if (param.type === "") {
            $("#titleBread").addClass('floatLef');
            $("#titleBreadarr").removeClass("titleBreadLevel ");
            $("#titleBreadarr").addClass('floatLef');
            $("#titleBreadLevel").removeClass("titleBreadLevel ");
        } else {
            $("#titleBread").removeClass('floatLef');
            $("#titleBreadarr").addClass("titleBreadLevel ");
            $("#titleBreadarr").removeClass('floatLef');
            $("#titleBreadLevel").addClass("titleBreadLevel ");
        }
        if (detail.data.Story && detail.data.Story.div && detail.data.Story.div.div) {
            descData.gridDesc = JSON.stringify(detail.data.Story.div.div);
            if (descData.gridDesc.indexOf("#text") > -1) {
                descData.gridDesc = descData.gridDesc.replace("#text", "text");
                descData.gridDesc = JSON.parse(descData.gridDesc);
                for (var loopVar = 0; loopVar < descData.gridDesc.text.length; loopVar++) {
                    str += descData.gridDesc.text[loopVar];
                }
                descData.gridDesc = this.replaceDelimiter(str);
            } else {
                descData.gridDesc = "";
            }
        } else {
            descData.gridDesc = (detail.guide && param.type != "overview" ? (param.type == "gallery" ? (detail.data.CardList && detail.data.CardList[param.index] && detail.data.CardList[param.index].Description ? this.replaceDelimiter(detail.data.CardList[param.index].Description) : "") : (detail.data.ImageList && detail.data.ImageList[param.index] && detail.data.ImageList[param.index].Caption ? this.replaceDelimiter(detail.data.ImageList[param.index].Caption) : "")) : (param.type === "overview" ? (detail.data.Story ? this.replaceDelimiter(detail.data.Story) : "") : (param.type === "gallery" ? (detail.data && detail.data[param.index] && detail.data[param.index].Caption ? this.replaceDelimiter(detail.data[param.index].Caption) : "") : (detail.data.CardList && detail.data.CardList[param.index] && detail.data.CardList[param.index].Description ? this.replaceDelimiter(detail.data.CardList[param.index].Description) : ""))));
        }
        descData.gridDesc = this.filterData(descData.gridDesc);
        descData.gridDesc = (descData.gridDesc != "" ? descData.gridDesc.replace(/\.+ /g, ".<br/>") : "");
        descData.gridDesc = descData.gridDesc.trim();
        if (descData.gridDesc.indexOf("<br/>") == 0) {
            descData.gridDesc = descData.gridDesc.substring(5);
        }
    };
    this.filterData = function(str) {
        var regex = /<img.*?src="(.*?)"/,
            regex1 = /<img.*?data-author="(.*?)"/,
            src, photoBy, count = 0,
            strMatch = str.match(/<img[^>]*>/);
        detail.arr = [];
        try {
            while (strMatch) {
                src = (regex.exec(str) ? regex.exec(str)[1] : "");
                photoBy = (regex1.exec(str) ? regex1.exec(str)[1] : "");
                detail.arr[count] = {
                    "src": (src ? src.toString() : null),
                    "photoBy": (photoBy ? photoBy.toString() : null)
                };
                if (detail.arr[count].src) {
                    count++;
                }
                str = str.replace(/<img[^>]*>/, "");
                strMatch = str.match(/<img[^>]*>/);
            }
        } catch (e) {}
        return str;
    };
    this.createFastFacts = function() {
        var fastFacts = "" + "<div class='fastFactShadow'></div><div id=fastFactTitle class=fastFactTitle>FAST FACTS</div>" + "<div id=fastFactBody class=fastFactBody>" + "<div class='fastFacts nearestAirportTop'>Nearest Airport:</div><div class='nearestAirport nearestAirportTop'>" + (detail.data.PoiMetaData.NearestAirport ? detail.data.PoiMetaData.NearestAirport : "No data available") + "</div>" + "<div style=top:19px class=fastFactss>Best Time to Visit:</div><div style=top:24px class=nearestAirportt>" + (detail.data.PoiMetaData.BestTimeToVisit ? detail.data.PoiMetaData.BestTimeToVisit : "No data available") + "</div>" + "<div style=top:26px class=fastFactss>Currency:</div><div style=top:31px id=nearestMax class='nearestAirportt'>" + (detail.data.PoiMetaData.Currency ? detail.data.PoiMetaData.Currency : "No data available") + "</div>" + "<div style=top:31px class=fastFacts>Languages:</div><div style=top:31px class=nearestAirport>" + (detail.data.PoiMetaData.Languages ? detail.data.PoiMetaData.Languages : "No data available") + "</div>" + "<div class='fastFacts festivals'>Festivals:</div><div class='nearestAirport festivals'>" + (detail.data.PoiMetaData.Festivals ? detail.data.PoiMetaData.Festivals : "No data available") + "</div>" + "</div>" + "<div id=fastFactWeather class=fastFactWeather><div class=FFLoading>Loading...</div></div>";
        fastFactsOuter.innerHTML = fastFacts;
        detail.arrow = detail.createArrow();
    };
    this.showErr = function(param) {
        error.errorObj.contentCreate(param.id, param.msg);
        return "";
    };
    this.createDescription = function(param) {
        detail.subMenuPrev = null;
        var desc = "";
        this.freeTextArea();
        this.setDescriptionData(param);
        desc = "<div id='contentText' class=contentText></div>";
        scrollContainer.innerHTML += desc;
        document.getElementById("contentText").innerHTML = (descData.gridDesc == "" ? (this.showErr({
            id: 'scrollContainer',
            msg: 'No description available.'
        })) : descData.gridDesc);
        (detail.guides && detail.flag != 1 ? "" : detail.arrow = detail.createArrow());
        if (detail.galleryObj.components.length > 1) {
            detail.prev = detail.galleryObj;
        } else if (detail.pageDetails.totalPage > 1 || detail.map) {
            detail.prev = detail.descObj;
        } else if (detail.guide && detail.weatherObj.components.length > 0 && !detail.weatherErr) {
            detail.prev = detail.weatherObj;
        } else if (detail.guide && $("#subMenuSlider").length > 0) {
            detail.prev = detail.subMenu;
        } else {
            (main.isSearchScreen ? detail.prev = home.searchObj : detail.prev = home.menuObj);
        }
        detail.flag = 1;
        this.textScroll();
        setTimeout(function() {
            $("#contentText").addClass("contentTextAnim");
            if (detail.galleryObj.components.length > 1) {
                detail.prev = detail.galleryObj;
            } else if (detail.pageDetails.totalPage > 1 || detail.map) {
                detail.prev = detail.descObj;
            } else if (detail.guide && detail.weatherObj.components.length > 0 && !detail.weatherErr) {
                detail.prev = detail.weatherObj;
            } else if (detail.guide && $("#subMenuSlider").length > 0) {
                detail.prev = detail.subMenu;
            } else {
                (main.isSearchScreen ? detail.prev = home.searchObj : detail.prev = home.menuObj);
            }
        }, 10);
    };
    this.enter_focus = function() {
        main.focusedDom = this;
        detail.arrow.enter_focus();
    };
    this.leave_focus = function() {
        detail.arrow.leave_focus();
    };
    this.scrollUp = function() {
        scrollVal -= 405;
        $("#contentText").css("margin-top", scrollVal);
        detail.pageDetails.currentPg += 1;
        detail.arrow.setPage(detail.pageDetails.currentPg);
        main.isLoading = false;
    };
    this.textScroll = function() {
        titleMaskRight.style.visibility = "hidden";
        titleMaskLeft.style.visibility = "hidden";
        var split_title = title.innerHTML,
            split_title_cpy = title.innerHTML,
            split_title_cpy1 = "",
            divStr = "",
            str = "",
            index = 0,
            spanObj, total = 0,
            loopVar = 0,
            maxWid, arr = [];
        split_title_cpy1 = title.innerHTML.split(" ");
        split_title = split_title_cpy1;
        var tempBg = home.homeObj.createElement('div', {
            classname: 'tempBgDetail',
            id: 'tempBgDetail',
        });
        tempBg.style.position = "absolute";
        if ($(".tempBgDetail").length > 0)
            $(".tempBgDetail").remove();
        $("body").append(tempBg);
        detail.tempArr = [];
        while (total < split_title_cpy1.length) {
            for (loopVar = 0; loopVar < split_title.length; loopVar++, total++) {
                str = split_title[loopVar];
                str += " ";
                tempBg.innerHTML += str;
                (detail.guide ? maxWid = 553 : maxWid = 893);
                if (tempBg.scrollWidth > maxWid) {
                    tempBg.innerHTML = tempBg.innerHTML.substring(0, tempBg.innerHTML.lastIndexOf(split_title[loopVar]));
                    detail.tempArr[index] = tempBg.innerHTML;
                    tempBg.innerHTML = "";
                    loopVar--;
                    index++;
                }
            }
        }
        detail.tempArr[index] = tempBg.innerHTML;
        str = "";
        for (loopVar = 0; loopVar < detail.tempArr.length; loopVar++) {
            str += "<li class='titleTxt " + (detail.guide ? "guideContentWidth" : "titleWid") + "' id=titleTxt_" + loopVar + ">" + (loopVar == 0 ? detail.tempArr[detail.tempArr.length - 1] : detail.tempArr[loopVar - 1]) + "</li>";
        }
        divStr = "<ul id=titleScrollCont class=titleScrollCont>" + str + "</ul>";
        title.innerHTML = divStr;
        titleScrollCont.style.width = detail.tempArr.length * (detail.guide ? 510 : 854) + "px";
        detail.normalId = 0;
        clearInterval(detail.setTimer);
        if (detail.tempArr.length > 1) {
            titleMaskRight.style.visibility = "visible";
            $('#titleTxt_' + detail.normalId).css({
                marginLeft: '-893px'
            });
            clearInterval(detail.setTimer);
            detail.setTimer = setInterval(function() {
                titleMaskRight.style.visibility = "hidden";
                titleMaskLeft.style.visibility = "hidden";
                if (detail.normalId == 0) {
                    titleMaskLeft.style.visibility = "visible";
                } else if (detail.normalId == detail.tempArr.length - 1) {
                    titleMaskRight.style.visibility = "visible";
                } else {
                    titleMaskRight.style.visibility = "visible";
                    titleMaskLeft.style.visibility = "visible";
                }
                if (detail.normalId < detail.tempArr.length - 1) {
                    detail.normalId += 1;
                } else {
                    detail.normalId = 0;
                }
                $('.titleScrollCont li:first-child').css({
                    marginLeft: '0px'
                });
                $(".titleTxt").addClass("animTitle");
                $('#titleTxt_' + detail.normalId).css({
                    marginLeft: '-893px'
                });
                $('.titleScrollCont').append($('.titleScrollCont li:first-child'));
            }, 5000);
        } else {
            clearInterval(detail.setTimer);
            titleMaskRight.style.visibility = "hidden";
            titleMaskLeft.style.visibility = "hidden";
        }
    };
    this.scrollDown = function() {
        scrollVal += 405;
        $("#contentText").css("margin-top", scrollVal);
        detail.pageDetails.currentPg -= 1;
        detail.arrow.setPage(detail.pageDetails.currentPg);
        main.isLoading = false;
    };
    this.KeyboardEvent = function(e, eventType) {
        if ($("#subMenuSlider").css("margin-left") == "0px") {
            $(".subCallOut").remove();
            $("#subMenuSlider").removeClass("sliderZero");
            $("#subMenuSlider").addClass("submenuLeft");
            $(".subArrCont").css("margin-left", "-236px");
            $(".subArrContBg").css("margin-left", "-236px");
            $("#subMenuArr").css("-webkit-transform", "rotate(0deg)");
            return true;
        }
        if (eventType === "keydown") {
            switch (e) {
                case "arrowdown":
                    if (detail.lowerGalleryObj.components.length > 1 || detail.lowerGalleryObj.totalPg > 1) {
                        detail.prev = this;
                        this.leave_focus();
                        detail.lowerGalleryObj.enter_focus();
                    }
                    return false;
                case "arrowup":
                    detail.prev = this;
                    this.leave_focus();
                    (main.isSearchScreen ? home.searchObj.enter_focus() : home.menuObj.enter_focus());
                    return false;
                case "arrowleft":
                    if (detail.arrRight) {
                        if (detail.pageDetails.currentPg !== 1) {
                            detail.arrow.leave_focus();
                            detail.arrRight = false;
                            detail.arrLeft = true;
                            detail.arrow.enter_focus();
                        } else if (detail.galleryObj.components.length > 1) {
                            detail.arrow.leave_focus();
                            detail.galleryObj.enter_focus();
                        } else if (detail.guide && $("#subMenuSlider").length > 0) {
                            detail.subMenuPrev = this;
                            this.leave_focus();
                            detail.subMenu.enter_focus();
                        }
                    } else if (detail.arrLeft) {
                        if (detail.galleryObj.components.length > 1) {
                            detail.arrow.leave_focus();
                            detail.galleryObj.enter_focus();
                        } else if (detail.guide && $("#subMenuSlider").length > 0) {
                            detail.subMenuPrev = this;
                            this.leave_focus();
                            detail.subMenu.enter_focus();
                        }
                    } else if (detail.map) {
                        if (detail.pageDetails.totalPage > 1) {
                            detail.arrow.leave_focus();
                            if (detail.pageDetails.currentPg !== detail.pageDetails.totalPage) {
                                detail.arrRight = true;
                            } else {
                                detail.arrLeft = true;
                            }
                            detail.arrow.enter_focus();
                        } else if (detail.galleryObj.components.length > 1) {
                            detail.arrow.leave_focus();
                            detail.galleryObj.enter_focus();
                        } else if (detail.guide && $("#subMenuSlider").length > 0) {
                            detail.subMenuPrev = this;
                            this.leave_focus();
                            detail.subMenu.enter_focus();
                        }
                    }
                    return false;
                case "arrowright":
                    if (detail.arrLeft) {
                        if (detail.pageDetails.currentPg !== detail.pageDetails.totalPage) {
                            detail.arrow.leave_focus();
                            detail.arrLeft = false;
                            detail.arrRight = true;
                            detail.arrow.enter_focus();
                        } else if (detail.map) {
                            detail.arrow.leave_focus();
                            detail.arrLeft = false;
                            detail.arrow.enter_focus();
                        } else if (detail.guide && detail.weatherObj.components.length > 1) {
                            detail.arrow.leave_focus();
                            detail.arrLeft = false;
                            detail.weatherObj.enter_focus();
                        }
                    } else if (detail.arrRight && detail.map) {
                        detail.arrow.leave_focus();
                        detail.arrRight = false;
                        detail.arrow.enter_focus();
                    } else if (detail.guide && detail.weatherObj.components.length > 1) {
                        detail.arrow.leave_focus();
                        detail.weatherObj.enter_focus();
                    }
                    return false;
                case "ok":
                    if (detail.arrRight) {
                        if (detail.pageDetails.currentPg !== detail.pageDetails.totalPage) {
                            this.scrollUp();
                        }
                    } else if (detail.arrLeft) {
                        if (detail.pageDetails.currentPg !== 1) {
                            this.scrollDown();
                        }
                    } else {
                        $(".splash").removeClass("splashImageLoading").addClass("mapImageLoading");
                        $(".loading").css("color", "rgb(39, 136, 23)");
                        this.leave_focus();
                        detail.Slideprevmap = this;
                        detail.mapObj.createMap();
                    }
                    return false;
            }
            return false;
        }
    };
};
detail.descObj = new detail.descriptionContainer();
detail.weatherContainer = function() {
    var moveLeft = 0,
        imgCount = 1,
        arrRight = true,
        arrLeft = false,
        obj = {};
    this.components = [];
    this.enter_focus = function() {
        main.focusedDom = this;
        if (arrRight) {
            $("#FFRightArr").removeClass("FFArrEnabled").addClass("FFArrCur");
            $(".FFRightArr").removeClass("fontColor").addClass("fontColorCur");
        } else {
            $("#FFLeftArr").removeClass("FFArrEnabled").addClass("FFArrCur");
            $(".FFLeftArr").removeClass("fontColor").addClass("fontColorCur");
        }
    };
    this.leave_focus = function() {
        if (arrRight) {
            $("#FFRightArr").removeClass("FFArrCur").addClass("FFArrEnabled");
            $(".FFRightArr").removeClass("fontColorCur").addClass("fontColor");
        } else {
            $("#FFLeftArr").removeClass("FFArrCur").addClass("FFArrEnabled");
            $(".FFLeftArr").removeClass("fontColorCur").addClass("fontColor");
        }
    };
    obj.enableleftArrow = function() {
        $("#FFLeftArr").removeClass("FFArrDisabled").addClass("FFArrEnabled");
    };
    obj.enablerightArrow = function() {
        $("#FFRightArr").removeClass("FFArrDisabled").addClass("FFArrEnabled");
    };
    obj.enableBothArrow = function() {
        obj.enableleftArrow();
        obj.enablerightArrow();
    };
    obj.disableBothArrow = function() {
        $("#FFLeftArr").removeClass("FFArrEnabled").addClass("FFArrDisabled");
        $("#FFRightArr").removeClass("FFArrEnabled").addClass("FFArrDisabled");
    };
    obj.hideArrow = function() {
        $("#FFLeftArr").addClass("hideVisibility");
        $("#FFRightArr").addClass("hideVisibility");
    };
    obj.showArrow = function() {
        $("FFLeftArr").removeClass("hideVisibility");
        $("#FFRightArr").removeClass("hideVisibility");
    };
    var gallery_baseGrid = function(param) {
        var config = param || {},
            obj = {};
        obj = {
            "slider": "<div class=sliderCont id=sliderCont_" + config.id + "></div>",
            "sliderTop": "<div class='sliderData sliderDataTop' id=sliderTopData_" + config.id + "><div id=clouds1_" + config.id + " class=clouds></div><div class=degree id=celsiusMax_" + config.id + "><div class=max_min>MAX</div><div class=cels_faren>" + config.cel_max + "</div></div><div  class=degree id=celsiusMin_" + config.id + "><div class=max_min>MIN</div><div class=cels_faren>" + config.cel_min + "</div></div></div>",
            "sliderDivider": "<div class=sliderDivider></div>",
            "sliderBottom": "<div class='sliderData sliderDataBottom' id=sliderBottomData_" + config.id + "><div id=clouds2_" + config.id + " class=clouds></div><div class=degree id=farenMax_" + config.id + "><div class=max_min>MAX</div><div class=cels_faren>" + config.far_max + "</div></div><div class=degree id=farenMin_" + config.id + "><div class=max_min>MIN</div><div class=cels_faren>" + config.far_min + "</div></div></div>"
        };
        FFSlider.innerHTML += obj.slider;
        obj.slider = document.getElementById('sliderCont_' + config.id);
        obj.slider.innerHTML += obj.sliderTop;
        obj.slider.innerHTML += obj.sliderDivider;
        obj.slider.innerHTML += obj.sliderBottom;
        $("#clouds1_" + config.id).addClass((config.weatherImg ? config.weatherImg : "defaultWeather"));
        $("#clouds2_" + config.id).addClass((config.weatherImg ? config.weatherImg : "defaultWeather"));
        return obj;
    };
    this.createWeather = function(data) {
        var weather = "",
            slider = "";
        moveLeft = 0;
        imgCount = 1;
        arrRight = false;
        arrLeft = false;
        this.components = [];
        weatherData = data, weather = "</div><div id=innerFastFact class=innerFastFact>" + "<div id=FFTitle class='FFTitle fontColor'>" + getCurrentDay() + "</div>" + "<div id=FFBody class=FFBody>" + "<div class='FFLeftArr fontColor'></div><div id=FFLeftArr class='FFArr FFArrDisabled'></div>" + "<div id=FFWthrCont class=FFWthrCont><div id=FFSlider class=FFSlider></div></div>" + "<div class='FFRightArr fontColor'></div><div id=FFRightArr class='FFArr FFArrDisabled'></div>" + "</div>" + "</div>";
        fastFactWeather.innerHTML = weather;
        for (var loopVar = 0; loopVar < weatherData.length; loopVar++) {
            this.components[loopVar] = gallery_baseGrid({
                'id': loopVar,
                'cel_max': weatherData[loopVar] && weatherData[loopVar].temp_max ? (weatherData[loopVar].temp_max + "\&deg\;C") : "N/A",
                'cel_min': weatherData[loopVar] && weatherData[loopVar].temp_min ? (weatherData[loopVar].temp_min + "\&deg\;C") : "N/A",
                'far_max': this.celsiusToFarenheit(weatherData[loopVar] && weatherData[loopVar].temp_max ? weatherData[loopVar].temp_max : null),
                'far_min': this.celsiusToFarenheit(weatherData[loopVar] && weatherData[loopVar].temp_min ? weatherData[loopVar].temp_min : null),
                'weatherImg': weatherData[loopVar] && weatherData[loopVar].icon ? weatherData[loopVar].icon : null
            });
        }
        if (weatherData.length <= 1) {
            obj.hideArrow();
        } else {
            obj.disableBothArrow();
            obj.enablerightArrow();
            arrRight = true;
        }
        FFSlider.style.width = weatherData.length * 328 + "px";
    };

    function getCurrentDay() {
        var day = new Date(),
            date = "";
        var weekday = new Array(7);
        weekday[0] = "Sunday";
        weekday[1] = "Monday";
        weekday[2] = "Tuesday";
        weekday[3] = "Wednesday";
        weekday[4] = "Thursday";
        weekday[5] = "Friday";
        weekday[6] = "Saturday";
        var day = weekday[day.getDay()];
        if (weatherData[imgCount - 1] && weatherData[imgCount - 1].weekday && weatherData[imgCount - 1].weekday == day) {
            date = "Today, ";
        } else {
            date = weatherData[imgCount - 1].weekday + ", ";
        }
        date += getMonth(imgCount - 1);
        return date;
    }

    function getMonth(param) {
        var month = new Array(),
            index = "";
        month[1] = "January";
        month[2] = "February";
        month[3] = "March";
        month[4] = "April";
        month[5] = "May";
        month[6] = "June";
        month[7] = "July";
        month[8] = "August";
        month[9] = "September";
        month[10] = "October";
        month[11] = "November";
        month[12] = "December";
        if (weatherData[param] && weatherData[param].date && weatherData[param].date != "") {
            index = weatherData[param].date.split('-')[1].replace(/^0+/, '');
        }
        return (month[index] + " " + weatherData[param].date.split('-')[2]);
    }
    this.celsiusToFarenheit = function(param) {
        return param ? (Math.floor(param * 9 / 5 + 32) + "\&deg\;F") : "N/A";
    };
    this.scrollLeft = function() {
        moveLeft -= 312;
        $("#FFSlider").css("margin-left", moveLeft + "px");
        imgCount += 1;
        $("#FFTitle").html(getCurrentDay());
        if (imgCount === this.components.length) {
            obj.disableBothArrow();
            arrLeft = true;
            arrRight = false;
            $("#FFRightArr").removeClass("FFArrCur");
            $(".FFRightArr").removeClass("fontColorCur");
            $("#FFLeftArr").addClass("FFArrCur");
            $(".FFLeftArr").addClass("fontColorCur");
        } else {
            obj.enableBothArrow();
        }
    };
    this.scrollRight = function() {
        moveLeft += 312;
        $("#FFSlider").css("margin-left", moveLeft + "px");
        imgCount -= 1;
        $("#FFTitle").html(getCurrentDay());
        if (imgCount === 1) {
            obj.disableBothArrow();
            arrRight = true;
            arrLeft = false;
            $("#FFLeftArr").removeClass("FFArrCur");
            $(".FFLeftArr").removeClass("fontColorCur");
            $("#FFRightArr").addClass("FFArrCur");
            $(".FFRightArr").addClass("fontColorCur");
        } else {
            obj.enableBothArrow();
        }
    };
    this.KeyboardEvent = function(e, eventType) {
        if ($("#subMenuSlider").css("margin-left") == "0px") {
            $(".subCallOut").remove();
            $("#subMenuSlider").removeClass("sliderZero");
            $("#subMenuSlider").addClass("submenuLeft");
            $(".subArrCont").css("margin-left", "-236px");
            $(".subArrContBg").css("margin-left", "-236px");
            $("#subMenuArr").css("-webkit-transform", "rotate(0deg)");
            return true;
        }
        event.preventDefault();
        if (eventType === "keydown") {
            switch (e) {
                case "arrowright":
                    if (arrLeft && imgCount !== this.components.length) {
                        this.leave_focus();
                        arrRight = true;
                        arrLeft = false;
                        this.enter_focus();
                    }
                    return false;
                case "arrowleft":
                    if (arrRight && imgCount !== 1) {
                        this.leave_focus();
                        arrLeft = true;
                        arrRight = false;
                        this.enter_focus();
                    } else if (detail.arrRight || detail.arrLeft || detail.map) {
                        if (detail.map) {
                            detail.arrRight = false;
                            detail.arrLeft = false;
                        }
                        this.leave_focus();
                        detail.descObj.enter_focus();
                    } else if (detail.galleryObj.components.length > 1) {
                        this.leave_focus();
                        detail.galleryObj.enter_focus();
                    } else if (detail.guide && $("#subMenuSlider").length > 0) {
                        detail.subMenuPrev = this;
                        this.leave_focus();
                        detail.subMenu.enter_focus();
                    }
                    return false;
                case "arrowdown":
                    if (detail.lowerGalleryObj.totalPg > 1 || detail.lowerGalleryObj.components.length > 1) {
                        detail.prev = this;
                        this.leave_focus();
                        detail.lowerGalleryObj.enter_focus();
                    }
                    return false;
                case "arrowup":
                    detail.prev = this;
                    this.leave_focus();
                    (main.isSearchScreen ? home.searchObj.enter_focus() : home.menuObj.enter_focus());
                    return false;
                case "ok":
                    if (arrRight) {
                        if (imgCount !== this.components.length) {
                            this.scrollLeft();
                        }
                    } else {
                        if (imgCount !== 1) {
                            this.scrollRight();
                        }
                    }
                    return false;
            }
            return false;
        }
    };
};
detail.weatherObj = new detail.weatherContainer();
detail.createArrow = function() {
    "use strict";
    var obj = {},
        totalPage = 0,
        currentPg = 1,
        loopVar = 0,
        hotKey = "";
    detail.arrRight = false;
    detail.arrLeft = false;
    if ($("#arrCont").length > 0) {
        $("#arrCont").remove();
    }
    for (loopVar = 0; loopVar < 3; loopVar++) {
        hotKey += "<div class='hotKeyObj hotKeyDisabled_" + loopVar + "' id=hotKeyObj_" + loopVar + "></div>" + (loopVar < 2 ? '<div class=hotKeyDivider></div>' : "");
    }
    hotKeyCont.innerHTML = hotKey;
    obj.enter_focus = function() {
        if (detail.arrRight) {
            $("#hotKeyObj_1").removeClass("hotKeyNormal_1");
            $("#hotKeyObj_1").addClass("hotKeyCursor_1");
        } else if (detail.arrLeft) {
            $("#hotKeyObj_0").removeClass("hotKeyNormal_0");
            $("#hotKeyObj_0").addClass("hotKeyCursor_0");
        } else if (detail.map) {
            $("#hotKeyObj_2").removeClass("hotKeyNormal_2");
            $("#hotKeyObj_2").addClass("hotKeyCursor_2");
        }
    };
    obj.leave_focus = function() {
        if (detail.arrRight) {
            $("#hotKeyObj_1").removeClass("hotKeyCursor_1");
            if (currentPg === totalPage) {
                $("#hotKeyObj_1").addClass("hotKeyDisabled_1");
            } else {
                $("#hotKeyObj_1").addClass("hotKeyNormal_1");
            }
        } else if (detail.arrLeft) {
            $("#hotKeyObj_0").removeClass("hotKeyCursor_0");
            if (currentPg === 1) {
                $("#hotKeyObj_0").addClass("hotKeyDisabled_0");
            } else {
                $("#hotKeyObj_0").addClass("hotKeyNormal_0");
            }
        } else if (detail.map) {
            $("#hotKeyObj_2").removeClass("hotKeyCursor_2");
            $("#hotKeyObj_2").addClass("hotKeyNormal_2");
        }
    };
    obj.enableupArrow = function() {
        $("#upArr").removeClass("disabledUpArr");
        $("#upArr").addClass("enableUpArr");
        $("#hotKeyObj_0").removeClass("hotKeyDisabled_0");
        $("#hotKeyObj_0").addClass("hotKeyNormal_0");
    };
    obj.enabledownArrow = function() {
        $("#downArr").removeClass("disabledDownArr");
        $("#downArr").addClass("enableDownArr");
        $("#hotKeyObj_1").removeClass("hotKeyDisabled_1");
        $("#hotKeyObj_1").addClass("hotKeyNormal_1");
    };
    obj.enableBothArrow = function() {
        obj.enabledownArrow();
        obj.enableupArrow();
    };
    obj.DisableBothArrow = function() {
        $("#upArr").removeClass("enableUpArr");
        $("#downArr").removeClass("enableDownArr");
        $("#hotKeyObj_0").removeClass("hotKeyNormal_0");
        $("#hotKeyObj_1").removeClass("hotKeyNormal_1");
        $("#upArr").addClass("disabledUpArr");
        $("#downArr").addClass("disabledDownArr");
        $("#hotKeyObj_0").addClass("hotKeyDisabled_0");
        $("#hotKeyObj_1").addClass("hotKeyDisabled_1");
    };
    obj.enableMap = function() {
        detail.map = true;
        $("#hotKeyObj_2").addClass("hotKeyNormal_2");
        $("#hotKeyObj_2").removeClass("hotKeyDisabled_2");
    };
    obj.disableMap = function() {
        detail.map = false;
        $("#hotKeyObj_2").removeClass("hotKeyNormal_2");
        $("#hotKeyObj_2").addClass("hotKeyDisabled_2");
    };
    obj.hideArrow = function() {
        $("#arrCont").addClass("loadingOff");
        obj.DisableBothArrow();
    };
    obj.setArrow = function() {
        obj.DisableBothArrow();
        this.disableMap();
        if (currentPg === 1) {
            obj.enabledownArrow();
            (main.focusedDom === detail.descObj && !$("#hotKeyObj_2").hasClass("hotKeyCursor_2") ? obj.leave_focus() : "");
            if (!$("#hotKeyObj_2").hasClass("hotKeyCursor_2")) {
                detail.arrLeft = false;
                detail.arrRight = true;
            }
            (main.focusedDom === detail.descObj && !$("#hotKeyObj_2").hasClass("hotKeyCursor_2") ? obj.enter_focus() : "");
        } else if (currentPg === totalPage) {
            obj.enableupArrow();
            (main.focusedDom === detail.descObj && !$("#hotKeyObj_2").hasClass("hotKeyCursor_2") ? obj.leave_focus() : "");
            if (!$("#hotKeyObj_2").hasClass("hotKeyCursor_2")) {
                detail.arrRight = false;
                detail.arrLeft = true;
            }
            (main.focusedDom === detail.descObj && !$("#hotKeyObj_2").hasClass("hotKeyCursor_2") ? obj.enter_focus() : "");
        } else {
            obj.enableBothArrow();
        }
    };
    obj.setPage = function(current) {
        var pageWidth = 0;
        currentPg = current;
        if ($('#menuItem' + home.menuObj.selectedMenuId).text().toUpperCase() == "HOME") {
            descFooter.innerHTML = detail.homeData.dataType;
            descFooter.innerHTML += detail.homeData.dataPlace;
        } else {
            if (detail.data.Tags && detail.data.Tags.length) {
                descFooter.innerHTML = (detail.data.Tags && detail.data.Tags[0] && detail.data.Tags[0].Text ? detail.data.Tags[0].Text : "");
                descFooter.innerHTML += (detail.data.Tags && detail.data.Tags[1] && detail.data.Tags[1].Text ? ", " + detail.data.Tags[1].Text.toUpperCase() : "");
            } else {
                descFooter.innerHTML = (detail.data.Tags && detail.data.Tags.primary && detail.data.Tags.primary[0] && detail.data.Tags.primary[0].Text ? detail.data.Tags.primary[0].Text.toUpperCase() : "");
                descFooter.innerHTML += (detail.data.Tags && detail.data.Tags.primary && detail.data.Tags.primary[1] && detail.data.Tags.primary[1].Text ? ", " + detail.data.Tags.primary[1].Text.toUpperCase() : "");
            }
        }
        totalPage = obj.findTotalPage();
        detail.pageDetails = this.getPage();
        if (totalPage > 1) {
            obj.setArrow();
            $(".descPagesDiv").css("display", "block");
            $("#descCurPg").html(currentPg);
            $("#descTtlPg").html(totalPage);
        } else {
            obj.hideArrow();
            $(".descPagesDiv").css("display", "none");
            (detail.guide ? $("#descFooter").css("width", "300px") : $("#descFooter").css("width", "660px"));
        }
        (detail.lat.length > 0 ? obj.enableMap() : obj.disableMap());
    };
    obj.getPage = function() {
        return {
            currentPg: currentPg,
            totalPage: totalPage
        };
    };
    obj.findTotalPage = function() {
        if ($("#contentText").length > 0) {
            return Math.ceil(contentText.clientHeight / 405);
        }
    };
    obj.setPage(1);
    return obj;
};
detail.submenuContainer = function() {
    var scrollVal = 0,
        curCur = 0,
        moves = 0,
        curPg = 1;
    this.reset = function() {
        $("#subMenuItems_" + curCur).removeClass("subMenuCur");
        curCur = this.prevSelected;
        curPg = this.curPg;
        scrollVal = -320 * (curPg - 1);
        $("#subMenuList").css("margin-top", scrollVal + "px");
        this.setPage();
    };
    this.subMenu = false;
    this.prevSelected = 0;
    this.curPg = 1;
    this.enter_focus = function() {
        detail.subMenuTop = null;
        if ($("#subMenuSlider").css("margin-left") < "0px") {
            $(".subCursor").removeClass("loadingOff");
        }
        main.focusedDom = this;
        $("#subMenuItems_" + curCur).addClass("subMenuCur");
    };
    this.leave_focus = function() {
        if ($("#subMenuSlider").css("margin-left") < "0px") {
            $(".subCursor").addClass("loadingOff");
        }
        $("#subMenuItems_" + curCur).removeClass("subMenuCur");
    };
    this.free = function() {
        scrollVal = 0;
        curCur = 0;
        moves = 0;
        curPg = 1;
        this.curPg = 1;
        this.prevSelected = 0;
    };
    this.scroll_up = function() {
        scrollVal -= 320;
        $("#subMenuList").css("margin-top", scrollVal + "px");
        curCur++;
        curPg++;
        this.enter_focus();
        this.setPage();
    };
    this.scroll_down = function() {
        scrollVal += 320;
        $("#subMenuList").css("margin-top", scrollVal + "px");
        curCur--;
        curPg--;
        this.enter_focus();
        this.setPage();
    };
    this.findTotal = function() {
        moves = Math.ceil($(".subMenuItems").length / 5);
    };
    this.enableupArrow = function() {
        $("#subArrTop").removeClass("subDisabled");
        $("#subArrTop").addClass("subEnabled");
    };
    this.enabledownArrow = function() {
        $("#subArrDown").removeClass("subDisabled");
        $("#subArrDown").addClass("subEnabled");
    };
    this.enableBothArrow = function() {
        obj.enabledownArrow();
        obj.enableupArrow();
    };
    this.DisableBothArrow = function() {
        $("#subArrTop").removeClass("subEnabled");
        $("#subArrDown").removeClass("subEnabled");
        $("#subArrTop").addClass("subDisabled");
        $("#subArrDown").addClass("subDisabled");
    };
    this.hideArr = function() {
        $("#subArrTop").removeClass("subEnabled");
        $("#subArrTop").addClass("subDisabled");
        $("#subArrDown").removeClass("subEnabled");
        $("#subArrDown").addClass("subDisabled");
    };
    this.setPage = function() {
        this.DisableBothArrow();
        if (moves != 1) {
            if (curPg == moves) {
                this.enableupArrow();
            } else if (curPg == 1) {
                this.enabledownArrow();
            } else {
                this.enableBothArrow();
            }
        }
    };
    this.slideOpen = function() {
        $('#subMenuSlider').bind("transitionend webkitTransitionEnd", function() {
            main.isLoading = false;
            if ($("#subMenuSlider").css("margin-left") == "0px") {
                $(".subCursor").addClass("loadingOff");
                $("#subMenuItems_" + curCur).addClass("subMenuCur");
            }
        });
        try {
            main.isLoading = true;
            $(".subCursor").addClass("loadingOff");
            main.focusedDom.leave_focus();
            if (main.focusedDom != this) {
                detail.submenuOn = false;
            } else {
                detail.submenuOn = true;
            }
            if (detail.fromSub) {
                detail.submenuOn = true;
            }
            detail.Slideprev = (main.focusedDom != detail.mapObj ? main.focusedDom : detail.Slideprev);
            $("#subMenuSlider").removeClass("submenuLeft");
            $("#subMenuSlider").addClass("sliderZero");
            $(".subArrCont").css("margin-left", "0px");
            $(".subArrContBg").css("margin-left", "0px");
            $("#subMenuArr").css("-webkit-transform", "rotate(180deg)");
            main.focusedDom = this;
            $("#subMenuItems_" + curCur).addClass("subMenuCur");
            this.setPage();
        } catch (e) {}
    };
    this.slideClose = function() {
        main.isLoading = true;
        $("#subMenuSlider").removeClass("sliderZero");
        $("#subMenuSlider").addClass("submenuLeft");
        $(".subArrCont").css("margin-left", "-236px");
        $(".subArrContBg").css("margin-left", "-236px");
        $("#subMenuArr").css("-webkit-transform", "rotate(0deg)");
        this.leave_focus();
        setTimeout(function() {
            (detail.submenuOn ? $(".subCursor").removeClass("loadingOff") : $(".subCursor").addClass("loadingOff"));
            detail.submenuOn = false;
            (detail.Slideprevmap != this && detail.Slideprev ? detail.Slideprev.enter_focus() : null);
            detail.subMenu.reset();
        }, 400);
    };
    this.resetGridData = function() {
        detail.data = detail.data.CardList;
    };
    this.resetDescData = function() {
        if (detail.backUp.sections[this.prevSelected - 1].Cards && detail.backUp.sections[this.prevSelected - 1].Cards.length > 0) {
            detail.data.CardList = (detail.backUp.sections[this.prevSelected - 1].Cards ? detail.backUp.sections[this.prevSelected - 1].Cards : []);
        } else {
            detail.data.CardList = [];
            detail.data.CardList[0] = (detail.backUp.sections[this.prevSelected - 1].Cards && detail.backUp.sections[this.prevSelected - 1].Cards.Cards ? detail.backUp.sections[this.prevSelected - 1].Cards.Cards : []);
        }
    };
    this.setData = function() {
        detail.lat = [];
        detail.lng = [];
        detail.count = 0;
        this.subMenu = true;
        detail.backUp = detail.data;
        this.resetDescData();
        detail.galleryView = (detail.data.CardList.length > 0 ? true : false);
        this.slideClose();
        detail.galleryObj.thumbnail({
            "type": "gallery",
            "index": 0
        });
        detail.descObj.createDescription({
            "type": "gallery",
            "index": 0
        });
        this.resetGridData();
        detail.lowerGalleryObj.free();
        detail.mapSet = true;
        detail.lowerGalleryObj.createThumbnailGallery({
            submenu: true
        });
        (detail.lat.length > 0 ? detail.arrow.enableMap() : detail.arrow.disableMap());
        this.resetDescData();
        if (detail.galleryObj.components.length > 1) {
            detail.prev = detail.galleryObj;
        } else if (detail.pageDetails.totalPage > 1 || detail.map) {
            detail.prev = detail.descObj;
        } else if (detail.guide && detail.weatherObj.components.length > 0 && !detail.weatherErr) {
            detail.prev = detail.weatherObj;
        } else {
            (main.isSearchScreen ? detail.prev = home.searchObj : detail.prev = home.menuObj);
        }
        if (detail.lowerGalleryObj.components.length > 1) {
            detail.lowerGalleryObj.enter_focus();
        } else if (detail.galleryObj.components.length > 1) {
            detail.galleryObj.enter_focus();
        } else if (detail.pageDetails.totalPage > 1 || detail.map) {
            detail.descObj.enter_focus();
        } else if (detail.guide && detail.weatherObj.components.length > 0 && !detail.weatherErr) {
            detail.weatherObj.enter_focus();
        } else {
            detail.prev.enter_focus();
            detail.prev = null;
        }
    };
    this.createSubMenu = function() {
        $(".subCursor").addClass("loadingOff");
        scrollVal = 0;
        this.free();
        var subMenu = "" + "<div class=subArrContBg></div><div class=subArrCont><div class=arrSep></div><div id=subArrTop></div><div id=subArrDown></div></div><div id=subMenuSlider class='subMenuSlider sliderZero'>" + "<div class=itemsSliderBg></div><div class=itemsSlider>" + "<div id=subMenuList class=subMenuList>" + "<span id=subtxt_0 class='subFont white'>Overview</span><div id=subMenuItems_0 class='subMenuItems'></div>" + "<div class=subMenuDivider></div>" + "</div>" + "</div>" + "<div id=indicatorCont class=indicatorCont>" + "<div id=subMenuArr class='subMenuArr subMenuArrNor'></div>" + "<div id=textCont class=textCont>" + "<div id=subText class=subText>SUBMENU</div>" + "<div id=subMenuHotKey class=subMenuHotKey></div>" + "</div>" + "</div>" + "</div>";
        subMenuCont.innerHTML = subMenu;
        subMenu = "";
        for (var loopVar = 1; loopVar <= detail.data.sections.length; loopVar++) {
            subMenu += "" + "<div id=subtxt_" + loopVar + " class='subFont white omitterClass'>" + (detail.data.sections[loopVar - 1] && detail.data.sections[loopVar - 1].name ? detail.data.sections[loopVar - 1].name : 'Unknown') + "</div><div id=subMenuItems_" + loopVar + " class='subMenuItems'></div>" + "<div class=subMenuDivider></div>";
        }
        subMenuList.innerHTML += subMenu;
        $("#subtxt_" + this.prevSelected).removeClass("white");
        $("#subtxt_" + this.prevSelected).addClass("green");
        this.findTotal();
        this.setPage();
        if (moves == 1) {
            this.hideArr();
        }
    };
    this.KeyboardEvent = function(e, eventType) {
        if (eventType === "keydown") {
            switch (e) {
                case "arrowdown":
                    if ($("#subMenuSlider").css("margin-left") >= "0px") {
                        if (curCur % 5 < 4 && curCur < $(".subMenuItems").length - 1) {
                            this.leave_focus();
                            curCur++;
                            this.enter_focus();
                        } else if (curPg != moves) {
                            this.leave_focus();
                            this.scroll_up();
                        }
                    } else if (detail.lowerGalleryObj.totalPg > 1 || detail.lowerGalleryObj.components.length > 1) {
                        detail.prev = this;
                        this.leave_focus();
                        detail.lowerGalleryObj.enter_focus();
                    }
                    return false;
                case "arrowup":
                    if ($("#subMenuSlider").css("margin-left") >= "0px") {
                        if (curCur % 5 > 0) {
                            this.leave_focus();
                            curCur--;
                            this.enter_focus();
                        } else if (curPg != 1) {
                            this.leave_focus();
                            this.scroll_down();
                        }
                    } else if ($("#subMenuSlider").css("margin-left") < "0px") {
                        this.leave_focus();
                        (main.isSearchScreen ? home.searchObj.enter_focus() : home.menuObj.enter_focus());
                        detail.subMenuTop = this;
                    }
                    return false;
                case "arrowleft":
                    return false;
                case "arrowright":
                    if ($("#subMenuSlider").css("margin-left") < "0px") {
                        if (detail.subMenuPrev == detail.galleryObj || detail.galleryObj.components.length > 1) {
                            this.leave_focus();
                            detail.galleryObj.enter_focus();
                        } else if (detail.subMenuPrev == detail.descObj || (detail.arrRight || detail.arrLeft || detail.map)) {
                            this.leave_focus();
                            detail.descObj.enter_focus();
                        } else if (detail.subMenuPrev == detail.weatherObj || detail.guide && detail.weatherObj.components.length > 1) {
                            this.leave_focus();
                            detail.weatherObj.enter_focus();
                        }
                    }
                    return false;
                case "ok":
                    if ($("#subMenuSlider").css("margin-left") < "0px") {
                        main.isLoading = true;
                        detail.submenuOn = true;
                        this.slideOpen();
                    } else {
                        if (this.prevSelected !== curCur) {
                            main.isLoading = true;
                            detail.submenuOn = false;
                            detail.Slideprev = null;
                            $("#subtxt_" + this.prevSelected).removeClass("green").addClass("white");
                            this.prevSelected = curCur;
                            this.curPg = curPg;
                            $("#subtxt_" + this.prevSelected).addClass("green");
                            $("#menuBread").html((this.prevSelected == 0 ? "Guides" : $("#subtxt_" + this.prevSelected).html()));
                            $(".overviewCenter").html($("#subtxt_" + this.prevSelected).html());
                            var wid = 1777 - parseInt($(".shadow_onepx_left").outerWidth()) - parseInt($(".overviewBg").outerWidth());
                            $(".shadow_onepx_right").css("width", wid + "px");
                            detail.data = detail.backUp;
                            (this.prevSelected == 0 ? detail.data.CardList = null : "");
                            (this.prevSelected == 0 ? detail.createOverview() : this.setData());
                        } else {
                            this.slideClose();
                        }
                    }
                    return false;
                case "return":
                    if ($("#subMenuSlider").css("margin-left") >= "0px") {
                        this.slideClose();
                        setTimeout(function() {
                            ($("#subMenuSlider").css("margin-left") < "0px" ? detail.submenuOn = true : detail.submenuOn = false)
                        }, 400);
                        return true;
                    }
                    return false;
            }
            return false;
        }
    };
};
detail.subMenu = new detail.submenuContainer();
detail.createOverview = function() {
    if (!detail.guidesFirst) {
        $("#subMenuSlider").removeClass("sliderZero");
        $("#subMenuSlider").addClass("submenuLeft");
        $(".subArrCont").css("margin-left", "-236px");
        $(".subArrContBg").css("margin-left", "-236px");
        $("#subMenuArr").css("-webkit-transform", "rotate(0deg)");
    }
    detail.lat = [];
    detail.lng = [];
    detail.count = 0;
    (main.isSearchScreen ? (main.jsonObj.CardList[detail.index] && main.jsonObj.CardList[detail.index].PoiMetaData && main.jsonObj.CardList[detail.index].PoiMetaData.Latitude && main.jsonObj.CardList[detail.index].PoiMetaData.Latitude != "" ? detail.lat[detail.count] = main.jsonObj.CardList[detail.index].PoiMetaData.Latitude : "") : (main.listResult.CardList[detail.index].PoiMetaData && main.listResult.CardList[detail.index].PoiMetaData.Latitude && main.listResult.CardList[detail.index].PoiMetaData.Latitude != "" ? detail.lat[detail.count] = main.listResult.CardList[detail.index].PoiMetaData.Latitude : ""));
    (main.isSearchScreen ? (main.jsonObj.CardList[detail.index] && main.jsonObj.CardList[detail.index].PoiMetaData && main.jsonObj.CardList[detail.index].PoiMetaData.Longitude && main.jsonObj.CardList[detail.index].PoiMetaData.Longitude != "" ? detail.lng[detail.count] = main.jsonObj.CardList[detail.index].PoiMetaData.Longitude : "") : (main.listResult.CardList[detail.index].PoiMetaData && main.listResult.CardList[detail.index].PoiMetaData.Longitude && main.listResult.CardList[detail.index].PoiMetaData.Longitude != "" ? detail.lng[detail.count] = main.listResult.CardList[detail.index].PoiMetaData.Longitude : ""));
    if (detail.lat[detail.count] && detail.lng[detail.count] && detail.lat[detail.count] != "" && detail.lng[detail.count] != "") {
        detail.count++;
    }
    detail.galleryView = (detail.data.length > 0 ? true : false);
    detail.descObj.createDescription({
        "type": (detail.galleryView ? "gallery" : "overview"),
        "index": (detail.galleryView ? 0 : "")
    });
    detail.galleryObj.thumbnail({
        "type": (detail.galleryView ? "gallery" : "overview"),
        "index": (detail.galleryView ? 0 : "")
    });
    detail.lowerGalleryObj.free();
    (detail.galleryView ? detail.lowerGalleryObj.createThumbnailGallery() : detail.lowerGalleryObj.createThumbnail());
    (detail.lat.length > 0 ? detail.arrow.enableMap() : detail.arrow.disableMap());
    if (detail.guidesFirst) {
        ((detail.guide && detail.data.sections && detail.data.sections.length > 0) ? detail.subMenu.createSubMenu() : "");
    } else {
        detail.subMenu.leave_focus();
    }
    if (detail.galleryObj.components.length > 1) {
        detail.prev = detail.galleryObj;
    } else if (detail.pageDetails.totalPage > 1 || detail.map) {
        detail.prev = detail.descObj;
    } else if (detail.guide && detail.weatherObj.components.length > 0 && !detail.weatherErr) {
        detail.prev = detail.weatherObj;
    } else if (detail.guide && $("#subMenuSlider").length > 0) {
        detail.prev = detail.subMenu;
    } else {
        (main.isSearchScreen ? detail.prev = home.searchObj : detail.prev = home.menuObj);
    }
    detail.setCursor();
    if (detail.guide && detail.data.PoiMetaData) {
        if ($("#fastFactsOuter").html() == "") {
            $("#descriptionCont").addClass('guideContWidth');
            $("#footerDesc").addClass('guideContWidth');
            $("#footerDesc").css("background", "url(images/detail/divider_line.png) no-repeat");
            $("#descTitle").addClass('guideContentWidth');
            $("#title").addClass('guideContentWidth').removeClass("titleWid");
            $("#titleDivider").addClass('guideContentWidth');
            $(".errorContent").css('width', "553px");
            $("#scrollContainer").addClass('guideContentWidth');
            $("#contentText").addClass('guideContentWidth');
            $("#hotKeyCont").css("left", "200px");
            $("#titleMaskRight").css("left", "507px");
            $("#hotKeyCont").css("left", "380px");
            $("#descFooter").css("width", "300px");
            $("#descPagesDiv").css("right", "22px");
            $("#descPagesDiv").css("top", "494px");
            detail.descObj.createFastFacts();
        }
    } else {
        $("#descriptionCont").addClass('normalContentWidth');
        $("#descFooter").addClass('normalContentWidth');
        $("#descTitle").addClass('normalContentWidth');
        $("#title").addClass('normalContentWidth');
        $("#titleDivider").addClass('normalContentWidth');
        $("#scrollContainer").addClass('normalContentWidth');
        $("#contentText").addClass('normalContentWidth');
    }
};
detail.createDetailPage = function() {
    "use strict";
    detail.guidesFirst = true;
    $('#listingFooterSection').css('display', 'block');
    main.isDetail = true;
    if (main.isSearchScreen) {
        if (main.jsonObj.CardList && main.jsonObj.CardList[detail.index] && main.jsonObj.CardList[detail.index].Msid == "00000") {
            document.getElementById('searchReturnDiv').innerHTML = "Return To Menu";
            error.errorObj.screenFree();
            error.errorObj.isError = true;
            error.errorObj.screenCreate('No details available.');
            (main.isSearchScreen ? home.searchObj.enter_focus() : home.menuObj.enter_focus());
            return;
        } else {
            document.getElementById('searchReturnDiv').innerHTML = "Return To Search Results";
        }
    } else {
        if (main.listResult && main.listResult.CardList && main.listResult.CardList[detail.index] && main.listResult.CardList[detail.index].Msid == "00000") {
            error.errorObj.screenFree();
            error.errorObj.isError = true;
            error.errorObj.screenCreate('No details available.');
            (main.isSearchScreen ? home.searchObj.enter_focus() : home.menuObj.enter_focus());
            return;
        }
    }
    var layout = "" + "<section class='detailTop lifted_right'><div class=leftBreadCont><div class=breadLeft id=menuBread>" + (main.isSearchScreen ? "Search results" : $("#menuItem" + home.menuObj.selectedMenuId).text()) + "</div><div class=breadLeft id=arrBread></div><div class=breadLeft id=titleBread></div><div class='breadLeft titleBreadLevel' id=titleBreadarr></div><div class='breadLeft titleBreadLevel' id=titleBreadLevel></div></div>" + "<div id=rightBreadCont class=rightBreadCont>" + "<div class=breadRight id=breadCredit>default2</div><div class=breadRight id=breadSep></div><div class=breadRight id=breadAuthor>default1</div>" + "</div>" + "</section>" + "<section class='detailCenter  lifted_left'>" + "<div id=detailTopCont class='detailTopCont'>" + "<div id=galleryCont class=galleryCont>" + "<div id=detailGallery class=detailGallery><div id=gallerySlideCont class=gallerySlideCont></div></div>" + "<div id=leftArrCont class=leftArrCont></div>" + "<div id=rightArrCont class=rightArrCont></div>" + "</div>" + "<div id=descriptionCont class='descriptionCont'>" + "<div id=titleMaskLeft class=titleMask><img src='images/detail/shadow_arrow.png' /></div><div id=descTitle class=descTitle>" + "<div id=title class='title titleWid'>" + "</div>" + "<div id=titleDivider class=titleDivider>" + "</div>" + "</div><div id=titleMaskRight class=titleMask><img src='images/detail/shadow_arrow.png' /></div>" + "<div id=scrollContainer class=scrollContainer>" + "</div>" + "<div id=footerDesc class=footerDesc></div>" + "<div class='descPagesDiv' id='descPagesDiv'><div class='detailCurPg' id='descCurPg'>1</div><div class='detailpageDivider' id='detailpageDivider'></div><div class='detailCurPg' id='descTtlPg'>3</div></div>" + "<div id=descFooter class=descFooter>" + "</div>" + "<div id=hotKeyCont class=hotKeyCont>" + "</div>" + "</div>" + (detail.guide && detail.data.PoiMetaData ? "<div id=fastFactsOuter class=fastFactsOuter></div>" : "") + "</div>" + (detail.guide && detail.data.sections && detail.data.sections.length > 0 ? "<div class=subCallOut id=subCallOut><div class=callOutTxt>Press 'BLUE HOT KEY' to view sub-menu</div></div><div class='subCursor subCurTop'></div><div class='subCursor subCurLeft'></div><div class='subCursor subCurDown'></div><div id=subMenuCont class=subMenuCont></div>" : "") + "</section>" + "<div class='shadow_left shadow_left'></div><div class=shadowClass><div class='shadow_onepx shadow_onepx_left'></div><div class=overviewBg><div class='overviewBak overViewLeft'></div><div class='overviewCenter'>Overview</div><div class='overviewBak overViewRight'></div></div><div class='shadow_onepx shadow_onepx_right'></div></div><div class='shadow_right shadow_right'></div><section class=detailBottom>" + "<div id=lowerArrLeft class='lowerArr lowerArrDisabled'></div><div id=lowerGallerycont class=lowerGallerycont></div><div class=detailPagesDiv id=detailPagesDiv><div class=detailCurPg id=detailCurPg></div><div class=detailpageDivider id=detailpageDividerLower></div><div class=detailCurPg id=detailtTtlPg></div></div><div id=lowerArrRight class='lowerArr lowerArrDisabled'></div>" + "</section>";
    contentSection.innerHTML = layout;
    detail.flag = 0;
    detail.createOverview();
    detail.arrow.setPage(detail.pageDetails.currentPg);
    (detail.guide ? detail.showCallOut() : detail.setCursor());
    if (detail.prev == home.searchObj || detail.prev == home.menuObj) {
        detail.prev = null;
    }
}
detail.showCallOut = function() {
    detail.guidesFirst = false;
    main.isLoading = true;
    $('#subMenuSlider').bind("transitionend webkitTransitionEnd", function() {
        main.isLoading = false;
    });
    clearTimeout(detail.callout);
    detail.callout = setTimeout(function() {
        $('#subCallOut').remove();
        $("#subMenuSlider").removeClass("sliderZero");
        $("#subMenuSlider").addClass("submenuLeft");
        $(".subArrCont").css("margin-left", "-236px");
        $(".subArrContBg").css("margin-left", "-236px");
        $("#subMenuArr").css("-webkit-transform", "rotate(0deg)");
    }, 10000);
};
detail.setCursor = function() {
    if (detail.lowerGalleryObj.components.length > 1) {
        detail.lowerGalleryObj.enter_focus();
    } else if (detail.galleryObj.components.length > 1) {
        detail.galleryObj.enter_focus();
    } else if (detail.pageDetails.totalPage > 1 || detail.map) {
        detail.descObj.enter_focus();
    } else if (detail.guide && detail.weatherObj.components.length > 0 && !detail.weatherErr) {
        detail.weatherObj.enter_focus();
    } else if (detail.guide && $("#subMenuSlider").length > 0) {
        detail.subMenu.enter_focus();;
    } else {
        detail.prev.enter_focus();
    }
};
detail.getDetailResponse = function(baseUrl, param) {
    $("#contentMask").removeClass("loadingOff");
    main.loading.On();
    try {
        main.xhr = $.ajax({
            type: "GET",
            url: baseUrl,
            timeout: 30000,
            dataType: "jsonp",
            success: function(data) {
                detail.data = data;
                if (detail.data.toString().indexOf("<title>Error page</title>") > 0) {
                    error.errorObj.createMask();
                    error.errorObj.screenCreate('No details available.');
                    error.errorObj.isDetailError = true;
                    error.errorObj.isError = false;
                    main.focusedDom = listing.ListingGridContainerObj;
                    main.focusedDom.leave_focus();
                    main.prevFocus = main.focusedDom;
                } else {
                    detail.backUp = detail.data;
                    if (detail.data) {
                        home.carouselObj.free();
                        listing.gridsFree();
                        detail.createDetailPage();
                        ($("#fastFactsOuter").length > 0 && $("#fastFactsOuter").html() != "" && detail.guide && (main.menuResult && main.menuResult.travelConfig && main.menuResult.travelConfig.weather && main.menuResult.travelConfig.weather.multiforecast) ? detail.getDetailWeather(detail.replaceApiData()) : "");
                    } else {
                        main.focusedDom.leave_focus();
                        main.prevFocus = main.focusedDom;
                        error.errorObj.isError = false;
                        error.errorObj.isDetailError = true;
                        error.errorObj.screenFree();
                        error.errorObj.createMask();
                        error.errorObj.screenCreate('Unable to load data.');
                        error.errorObj.isError = false;
                        error.errorObj.isDetailError = true;
                    }
                }
                main.loading.Off();
                $("#contentMask").addClass("loadingOff")
            },
            error: function(jqXHR, textStatus, errorThrown) {
                main.focusedDom.leave_focus();
                main.prevFocus = main.focusedDom;
                error.errorObj.isError = false;
                error.errorObj.isDetailError = true;
                main.loading.Off();
                $("#contentMask").addClass("loadingOff")
                error.errorObj.screenFree();
                error.errorObj.createMask();
                if (!main.ajaxAbort) {
                    if (jqXHR.status == 200) {
                        error.errorObj.screenCreate('No details available.');
                    } else if (jqXHR.status == 0) {
                        error.errorObj.screenCreate('Internet connection is not available.');
                    } else {
                        error.errorObj.screenCreate('Unable to load data.');
                    }
                } else {
                    main.ajaxAbort = false;
                    error.errorObj.screenCreate('Request has cancelled.');
                }
                error.errorObj.isError = false;
                error.errorObj.isDetailError = true;
            }
        });
    } catch (e) {
        main.focusedDom.leave_focus();
        main.prevFocus = main.focusedDom;
        error.errorObj.isError = false;
        error.errorObj.isDetailError = true;
        main.loading.Off();
        $("#contentMask").addClass("loadingOff")
        error.errorObj.screenFree();
        error.errorObj.createMask();
        if (!main.ajaxAbort) {
            if (jqXHR.status == 200) {
                error.errorObj.screenCreate('No details available.');
            } else if (jqXHR.status == 0) {
                error.errorObj.screenCreate('Internet connection is not available.');
            } else {
                error.errorObj.screenCreate('Unable to load data.');
            }
        } else {
            main.ajaxAbort = false;
            error.errorObj.screenCreate('Request has cancelled.');
        }
        error.errorObj.isError = false;
        error.errorObj.isDetailError = true;
    }
};
detail.replaceApiData = function() {
    console.log(main.menuResult);
    console.log(detail);
    var weather_forecast = main.menuResult.travelConfig.weather.multiforecast;
    (detail.weather_lat ? weather_forecast = weather_forecast.toString().replace("@latitude", detail.weather_lat) : "");
    (detail.weather_lng ? weather_forecast = weather_forecast.toString().replace("@longitude", detail.weather_lng) : "");
    if (detail.weather_lat && detail.weather_lng) {
        return weather_forecast;
    }
    return null;
};
detail.getDetailWeather = function(baseUrl) {
    main.loading.On();
    $(".lowerGallerycont").css("left", "66px");
    console.log(baseUrl);
    try {
        $.ajax({
            type: "GET",
            url: baseUrl,
            timeout: 30000,
            dataType: "json",
            success: function(data) {
                main.loading.Off();
                if (data && data.length > 0) {
                    detail.weatherObj.createWeather(data);
                } else {
                    detail.descObj.showErr({
                        id: 'fastFactWeather',
                        msg: "Weather Unavailable."
                    });
                    detail.weatherErr = true;
                    $("#errorText").removeClass("errorClass");
                    $("#errorText").addClass("errorFont");
                    $("#errorImage").addClass("errorImage");
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                main.loading.Off();
                detail.descObj.showErr({
                    id: 'fastFactWeather',
                    msg: "Weather Unavailable."
                });
                detail.weatherErr = true;
                $("#errorText").removeClass("errorClass");
                $("#errorText").addClass("errorFont");
                $("#errorImage").addClass("errorImage");
            }
        });
    } catch (e) {
        main.loading.Off();
        detail.descObj.showErr({
            id: 'fastFactWeather',
            msg: "Weather Unavailable."
        });
        detail.weatherErr = true;
        $("#errorText").removeClass("errorClass");
        $("#errorText").addClass("errorFont");
        $("#errorImage").addClass("errorImage");
    }
};