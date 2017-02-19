//Copyright (C) 2014 Panasonic Corporation. All Rights Reserved.
//
//*****************************************************************/
// File Name: happy_main.js
// Purpose: This document creates main page
// File Created Date: Aug 3rd 2014
// Release Date: Sep 23rd 2014
// Release Version: 0.6
//*****************************************************************/
/*jslint browser:true, plusplus: true */
/*global $, jQuery, main, console*/
var main = (function (window, document, main) {
    "use strict";
    var main = {
        keyCodeDic: {
            38: "arrowup",
            40: "arrowdown",
            37: "arrowleft",
            39: "arrowright",
            13: "ok",
            8: "return",
            120: "red",
            403: "red",
            404: "green",
            121: "green",
            405: "yellow",
            122: "yellow",
            406: "blue",
            123: "blue"
        },
        focusedDom: "",
        prevFocus: "",
        isLoading: true,
        isDetail: false,
        menuApi: "http://www.happytrips.com/feeds/feedurllist.cms?feedtype=json&type=tv",
        jsonObj: {},
        paginationResult: "",
        isListingScreen: false,
        isSearchScreen: false,
        prevPageVar: false,
        nextPageVar: false,
        pagination: false,
        ajaxAbort: false,
        ajaxOn: false,
        mapRet: false,
        openSub: false
    };
    (function () {
        var imagesCode = "",
            i, imagesBufArray = ['images/detail/descArr.png', 'images/detail/descArrCur.png', 'images/loadingmap.png', 'images/listing/arrow_d.png', 'images/listing/page_bg.png', 'images/listing/coming_soon_img.png', 'images/search/return_icon.png', 'images/listing/default_img.jpg', 'images/detail/subMenuCallout.png', 'images/detail/default_img_gallery.jpg', 'images/search_icon_c.png', 'images/search_but_c.png', 'images/footer_bg_error.png', 'images/detail/lowerArr.png', 'images/detail/fast_facts_bg_shadow.png', 'images/loading.png', 'images/search_Menu.png', 'images/detail/ffBg.png', 'images/detail/ffTop.png', 'images/detail/breadcrumb_arrow.png', 'images/detail/divider_line.png', 'images/detail/lowerArr_cur.png', 'images/detail/bottom_arrow.png', 'images/detail/submenu_arrow.png', 'images/detail/hotKey.png', 'images/detail/lowerArr_enabled.png', 'images/detail/overview_m_bg.png', 'images/detail/overview_c_bg.png', 'images/detail/fast_facts_bg.png', 'images/detail/overview_onepx.png', 'images/exit_Button.png', 'images/search_Image.png', 'images/thumbnail_Ring.png', 'images/search_Image.png', 'images/footer_img.png', 'images/Press_ok.png', 'images/menu_Cursor_bg.png', 'images/bg_blur.png', 'images/Splash_bg.png', 'images/happytrips.png', 'images/slider_title_bg.png', 'images/default_menu.png', 'images/default_img_large.jpg', 'images/default_img_thumbnail.png', 'images/footer_bg_exit.png', 'images/footer_bg.png', 'images/flight_img.png', 'images/header_bg.png', 'images/header_img.png', 'images/top_img.png', 'images/bg.png', 'images/menu_Sprite.png', 'images/menu_arrow.png', 'images/error_box_bg.png', 'images/error_icon.png', 'images/Splash_Logo.png', 'images/splash.png', 'images/splash_logo_bg.png', 'images/slider_green_bg.png', 'images/slider_left.png', 'images/slider_right.png', 'images/slider_top.png', 'images/slider_bottom.png', 'images/slider_content_sep.png', 'images/footer_bg.png', 'images/character_img_1.png', 'images/exit_box_bg.png'];
        for (i = 0; i < imagesBufArray.length; i += 1) {
            imagesCode += "<img id ='buffer_" + i + "' class='bufferImg' src= " + imagesBufArray[i] + "></img>";
        }
        document.getElementById("buffer").innerHTML = imagesCode;
    }());
    main.target = function (e) {
        !e && (e = event);
        var target = (e.target || e.srcElement) || {};
        target.keyCode = e.which;
        return target;
    };
    return main;
}(window, document, main));
var home = {};
var error = {};
var exit = {};
var listing = {
    tag: 0,
    index: 0,
    currentPage: 1,
    totalPages: 0,
    previousPage: 0
};
var search = {
    tag: 0,
    index: 0
};
main.splashScreen = (function (window, document, main, splashScreen) {
    "use strict";
    var splashScreen = {
        isVisible: true
    },
        splash_cont = document.getElementById('splashScreen');
    splashScreen.stopCount = function () {
        clearTimeout(time);
        timer_is_on = 0;
    };
    splashScreen.start = function () {
        main.isLoading = true;
        main.pageLoad();
    };
    splashScreen.free = function () {
        $('.splashGrid').removeClass('splashActive').addClass('splashNormal');
        splash_cont.innerHTML = "";
        splash_cont.parentNode.removeChild(splash_cont);
        splashScreen.isVisible = false;
        main.isLoading = false;
        main.splashScreen.stopCount();
    };
    return splashScreen;
}(window, document, main, main.splashScreen));
main.pageLoad = function () {
    'use strict';
    home.homeObj.getMenu(main.menuApi);
};
main.loading = document.getElementById("loading");
main.loading.On = function () {
    'use strict';
    try {
        main.ajaxOn = true;
        main.isLoading = true;
        splashId = 0;
        $('.splashGrid').removeClass('splashActive').addClass('splashNormal');
        $('#splashGrid0').addClass('splashActive').removeClass('splashNormal');
        startCount();
        isSplashScreen = false;
        if (!main.isListingScreen && !main.isDetail && !main.isSearchScreen) {
            main.loading.className = "loading loadingOn";
        } else if (main.isDetail) {
            main.loading.className = "loading loadingOn loadingDetail";
        } else {
            main.loading.className = "loading loadingOn loadingDownOn";
        }
        loadingTxt.className = "loadingTxt loadingOn";
    } catch (e) { }
};
main.loading.Off = function () {
    'use strict';
    main.splashScreen.stopCount();
    if (!main.isListingScreen) {
        main.loading.className = "loading loadingOff";
    } else {
        main.loading.className = "loading loadingOff loadingDownOff";
    }
    loadingTxt.className = "loadingTxt loadingOff";
    main.isLoading = false;
    main.ajaxOn = false;
};
home.HomeContainer = function () {
    'use strict';
    this.currentPage = 1;
    this.totalIcons = 5;
    this.createElement = function (type, param) {
        type = type || 'div';
        param = param || {};
        var ele = document.createElement(type);
        if (param.classname) {
            ele.className = param.classname;
        }
        if (param.id) {
            ele.id = param.id;
        }
        if (param.content) {
            ele.innerHTML = param.content;
        }
        if (param.src) {
            ele.src = param.src;
        }
        return ele;
    };
    this.setOmitter = function (text, height, width, font, word) {
        try {
            var height = height || 390;
            var text = text || "";
            var width = width || 687;
            var font = font || 26;
            var wordWrap = word || false;
            var tempBg = home.homeObj.createElement('div', {
                classname: 'tempBg',
                id: 'tempBg',
                content: text
            });
            $("#tempBg").remove();
            $("body").append(tempBg);
            $('#tempBg').css("width", width + "px");
            $('#tempBg').css("font-size", font + "px");
            if (wordWrap) {
                $('#tempBg').removeClass('wordwrapNormal').addClass('wordwrapBreakword');
            } else {
                $('#tempBg').removeClass('wordwrapBreakword').addClass('wordwrapNormal');
            }
            var divh = $('#tempBg').height();
            var txt = text;
            var count = 0;
            while (divh > height) {
                $('#tempBg').html(function (index, html) {
                    txt = html.replace(/\W*\s(\S)*$/, '...');
                    return txt;
                });
                divh = $('#tempBg').height();
            }
            $("#tempBg").remove();
            return txt;
        } catch (e) { }
    };
    this.create = function () {
        if (!main.isSearchScreen) {
            if ($('#menuItem' + home.menuObj.selectedMenuId).text().toUpperCase() === 'HOME') {
                main.isListingScreen = false;
                main.listResult = main.homeResult;
                if (main.listResult && main.listResult.CardList && (main.listResult.CardList !== "") && main.listResult.CardList.length) {
                    if (main.listResult.CardList.length) {
                        if (main.listResult.CardList.length < home.homeObj.totalIcons) {
                            home.homeObj.totalIcons = main.listResult.CardList.length;
                        }
                        home.carouselObj.create();
                        home.thumbnailObj.create();
                        if (home.homeObj.totalIcons > 1) {
                            main.focusedDom = home.thumbnailObj;
                            home.thumbnailObj.enter_focus();
                            home.thumbnailObj.disable_auto_focus();
                        } else {
                            main.focusedDom = home.thumbnailObj;
                            home.thumbnailObj.enter_focus();
                            home.thumbnailObj.disable_auto_focus();
                            home.thumbnailObj.error = true;
                        }
                        main.prevFocus = main.focusedDom;
                    } else {
                        error.errorObj.screenFree();
                        home.menuObj.error = false;
                        error.errorObj.screenCreate('No information available.');
                    }
                }
                home.thumbnailObj.animation = false;
                home.thumbnailObj.stopCount();
                $('#listingFooterSection').removeClass('show').addClass('loadingOff');
                if (home.carouselObj.isStart) {
                    home.carouselObj.isStart = false;
                    setTimeout(function () {
                        $('#thumbnailText').remove();
                    }, 15000);
                }
                $('#searchTextBox').val("");
                $('#searchText').html('Search happytrips');
            } else {
                main.listResult = main.normalListResult;
                if (main.listResult && main.listResult.pagination && main.listResult.pagination.total && main.listResult.pagination.total !== "") {
                    listing.totalPages = main.listResult.pagination.total;
                }
                if (main.listResult.CardList && main.listResult.CardList != "" && main.listResult.CardList.length) {
                    listing.previousPage = listing.currentPage;
                    main.paginationResult = main.listResult;
                    listing.ListingContainerObj.create();
                    main.isListingScreen = true;
                    listing.setData();
                    main.focusedDom = listing.ListingGridContainerObj;
                    main.focusedDom.enter_focus();
                    main.prevFocus = main.focusedDom;
                } else {
                    main.listResult = main.paginationResult;
                    listing.currentPage = listing.previousPage;
                    error.errorObj.screenCreate('No information available.');
                }
                $('#listingFooterSection').removeClass('loadingOff').addClass('show');
            }
        } else {
            main.listResult = main.jsonObj.CardList;
            if (main.listResult && main.listResult.length) {
                listing.ListingContainerObj.create();
                search.encodedValue = search.prevValue;
                main.keyboardContainer.setData();
                main.focusedDom = listing.ListingGridContainerObj;
                main.focusedDom.enter_focus();
                main.prevFocus = main.focusedDom;
            } else {
                error.errorObj.screenCreate('No information available.');
            }
            $('#listingFooterSection').removeClass('loadingOff').addClass('show');
        }
        error.errorObj.isError = false;
    };
    this.getMenu = function (baseUrl) {
        try {
            main.xhr = $.ajax({
                type: "GET",
                url: baseUrl,
                timeout: 30000,
                dataType: 'jsonp',
                success: function (data) {
                    try {
                        main.menuResult = data;
                        if (main.menuResult && main.menuResult.navigationMenu && main.menuResult.navigationMenu !== "") {
                            main.splashScreen.free();
                            home.menuObj.create();
                            home.menuObj.getApiData();
                            home.searchObj.create();
                        } else {
                            error.errorObj.splashCreate('No data available.');
                        }
                    } catch (ex) {
                        error.errorObj.splashCreate('No data available.');
                    }
                },
                error: function (ex) {
                    if (!main.ajaxAbort) {
                        if (ex.status === 200) {
                            error.errorObj.splashCreate('No data available.');
                        } else if (ex.status === 0) {
                            error.errorObj.splashCreate('Internet connection is not available.');
                        } else {
                            error.errorObj.splashCreate('No data available.');
                        }
                    } else {
                        main.ajaxAbort = false;
                        error.errorObj.splashCreate('Request has cancelled.');
                    }
                }
            });
        } catch (ex) {
            if (!main.ajaxAbort) {
                if (ex.status === 200) {
                    error.errorObj.splashCreate('No data available.');
                } else if (ex.status === 0) {
                    error.errorObj.splashCreate('Internet connection is not available.');
                } else {
                    error.errorObj.splashCreate('No data available.');
                }
            } else {
                main.ajaxAbort = false;
                error.errorObj.splashCreate('Request has cancelled.');
            }
        }
    };
    this.getList = function (baseUrl) {
        main.loading.On();
        error.errorObj.screenFree();
        try {
            main.xhr = $.ajax({
                type: "GET",
                url: baseUrl,
                timeout: 30000,
                dataType: "jsonp",
                success: function (data) {
                    try {
                        error.errorObj.screenFree();
                        home.menuObj.error = false;
                        main.listResult = data;
                        if (!(main.listResult === '')) {
                            if ($('#menuItem' + home.menuObj.selectedMenuId).text().toUpperCase() === 'HOME') {
                                main.isListingScreen = false;
                                main.homeResult = main.listResult;
                            } else if (main.listResult.CardList && main.listResult.CardList != "" && main.listResult.CardList.length) {
                                main.normalListResult = main.listResult;
                            }
                            home.homeObj.create();
                            main.pagination = false;
                        } else {
                            if ($('#menuItem' + home.menuObj.selectedMenuId).text().toUpperCase() === 'HOME') {
                                error.errorObj.screenCreate('No information available.');
                            } else {
                                error.errorObj.screenCreate('No information available.');
                            }
                        }
                    } catch (ex) {
                        error.errorObj.screenFree();
                        home.menuObj.error = false;
                        error.errorObj.screenCreate('Request has cancelled.');
                        listing.currentPage = listing.previousPage;
                    }
                    main.loading.Off();
                },
                error: function (ex) {
                    error.errorObj.screenFree();
                    home.menuObj.error = false;
                    if (!main.ajaxAbort) {
                        if (ex.status === 200) {
                            if ($('#menuItem' + home.menuObj.selectedMenuId).text().toUpperCase() === 'HOME') {
                                error.errorObj.screenCreate('No information available.');
                            } else {
                                error.errorObj.screenCreate('No information available.');
                            }
                        } else if (ex.status === 0) {
                            error.errorObj.screenCreate('Internet connection is not available.');
                        } else {
                            if ($('#menuItem' + home.menuObj.selectedMenuId).text().toUpperCase() === 'HOME') {
                                error.errorObj.screenCreate('No information available.');
                            } else {
                                error.errorObj.screenCreate('No information available.');
                            }
                        }
                        if (main.pagination) {
                            error.errorObj.isError = false;
                            error.errorObj.isDetailError = true;
                            main.pagination = false;
                            listing.currentPage = listing.previousPage;
                            if (main.prevPageVar) {
                                listing.index = 0;
                                main.prevPageVar = false;
                            }
                        }
                    } else {
                        main.ajaxAbort = false;
                        error.errorObj.screenCreate('Request has cancelled.');
                    }
                }
            });
        } catch (ex) {
            error.errorObj.screenFree();
            home.menuObj.error = false;
            if (!main.ajaxAbort) {
                if (ex.status === 200) {
                    if ($('#menuItem' + home.menuObj.selectedMenuId).text().toUpperCase() === 'HOME') {
                        error.errorObj.screenCreate('No information available.');
                    } else {
                        error.errorObj.screenCreate('No information available.');
                    }
                } else if (ex.status === 0) {
                    error.errorObj.screenCreate('Internet connection is not available.');
                } else {
                    if ($('#menuItem' + home.menuObj.selectedMenuId).text().toUpperCase() === 'HOME') {
                        error.errorObj.screenCreate('No information available.');
                    } else {
                        error.errorObj.screenCreate('No information available.');
                    }
                }
                if (main.pagination) {
                    error.errorObj.isError = false;
                    error.errorObj.isDetailError = true;
                    main.pagination = false;
                    if (main.prevPageVar) {
                        listing.index = 0;
                        main.prevPageVar = false;
                    }
                }
            } else {
                main.ajaxAbort = false;
                error.errorObj.screenCreate('Request has cancelled.');
            }
        }
    };
};
home.homeObj = new home.HomeContainer();
home.SearchContainer = function () {
    'use strict';
    this.create = function () {
        var searchMenu = home.homeObj.createElement('div', {
            'classname': 'searchMenu'
        }),
            searchText = home.homeObj.createElement('div', {
                'id': 'searchText',
                'classname': 'searchText',
                'content': 'Search happytrips'
            }),
            searchImage = home.homeObj.createElement('div', {
                'id': 'searchImage',
                'classname': 'searchImage'
            });
        $('#topSection').append(searchMenu);
        $(searchMenu).append(searchText);
        $(searchMenu).append(searchImage);
    };
    this.enter_focus = function () {
        main.focusedDom = this;
        $('.searchMenu').addClass('searchCursor');
        $('.searchImage').addClass('searchImageCursor');
        $('#searchText').addClass('searchTextCursor');
        if (!main.isSearchScreen) {
            $('#searchText').html('Search happytrips');
        }
    };
    this.leave_focus = function () {
        $('.searchMenu').removeClass('searchCursor');
        $('.searchImage').removeClass('searchImageCursor');
        $('#searchText').removeClass('searchTextCursor');
        if (!main.isSearchScreen) {
            $('#searchText').html('Search happytrips');
        }
    };
    this.KeyboardEvent = function (key, eventType) {
        if (main.isDetail && $("#subMenuSlider").length > 0 && $("#subMenuSlider").css("margin-left") == "0px") {
            $(".subCallOut").remove();
            $("#subMenuSlider").removeClass("sliderZero");
            $("#subMenuSlider").addClass("submenuLeft");
            $(".subArrCont").css("margin-left", "-236px");
            $(".subArrContBg").css("margin-left", "-236px");
            $("#subMenuArr").css("-webkit-transform", "rotate(0deg)");
            return true;
        }
        switch (eventType) {
            case 'keydown':
                switch (key) {
                    case 'arrowdown':
                        if (!error.errorObj.isError || $(".menuList").length > 0) {
                            home.searchObj.leave_focus();
                            if (!main.isSearchScreen) {
                                main.focusedDom = home.menuObj;
                            } else if (main.isDetail) {
                                (detail.subMenuTop === detail.subMenu ? main.focusedDom = detail.subMenuTop : main.focusedDom = detail.prev);
                                if (detail.prev != detail.galleryObj && detail.prev != detail.descObj && detail.prev != detail.weatherObj && detail.prev != detail.lowerGalleryObj && detail.prev != main.menuObj) {
                                    if (detail.lowerGalleryObj.totalPg > 1 || detail.lowerGalleryObj.components.length > 1) {
                                        main.focusedDom = detail.lowerGalleryObj;
                                    }
                                }
                            } else {
                                main.focusedDom = listing.ListingGridContainerObj;
                            }
                            main.focusedDom.enter_focus();
                        }
                        break;
                    case 'ok':
                        main.isLoading = true;
                        home.searchObj.leave_focus();
                        if (home.thumbnailObj.animation) {
                            home.thumbnailObj.stopCount();
                        }
                        main.keyboardContainer.animTop();
                        break;
                    case 'return':
                        if (main.isSearchScreen) {
                            if (main.isDetail) {
                                detail.galleryObj.freeOnReturn();
                                document.getElementById('searchReturnDiv').innerHTML = "Return To Menu";
                                home.homeObj.create();
                            } else {
                                this.leave_focus();
                                home.thumbnailObj.animation = false;
                                main.searchGridsObj.free();
                                home.menuObj.cursorMenuId = 0;
                                home.menuObj.selectedMenuId = home.menuObj.cursorMenuId;
                                home.thumbnailObj.normalId = 0;
                                listing.tag = 0;
                                listing.index = 0;
                                home.menuObj.create();
                                home.menuObj.getApiData();
                                error.errorObj.screenFree();
                                error.errorObj.isError = false;
                                error.errorObj.isDetailError = false;
                                return true;
                            }
                        }
                        break;
                    default:
                        break;
                }
                break;
        }
    };
    this.free = function () {
        $('.searchMenu').remove();
    };
};
home.searchObj = new home.SearchContainer();
var getDetailUrl = function () {
    'use strict';
    var data = {};
	
    detail.title = "";
    detail.index = ($('#menuItem' + home.menuObj.selectedMenuId).text().toUpperCase() !== "HOME" ? (listing.tag * 3 + listing.index) : detail.index = home.thumbnailObj.normalId);
    data = (main.isSearchScreen ? (main.jsonObj.CardList && main.jsonObj.CardList[detail.index] ? main.jsonObj.CardList[detail.index] : null) : (main.listResult.CardList && main.listResult.CardList[detail.index] ? main.listResult.CardList[detail.index] : null));
    console.log(data);
	detail.weather_lat = 20;
    detail.weather_lng = 20;
	detail.mapLocation = data.PoiMetaData && data.PoiMetaData.TravelLocationTag ? data.PoiMetaData.TravelLocationTag : null;
    if (data) {
        detail.title = $("#gridsNamesMask" + listing.tag + listing.index).html();
        if ($('#menuItem' + home.menuObj.selectedMenuId).text().toUpperCase() === "GUIDES" || (data.Type && data.Type === "cs")) {
            detail.guide = true;
            if (data.PoiMetaData) {
				//console.log(data)
                detail.weather_lat = (data.PoiMetaData.Latitude ? data.PoiMetaData.Latitude : null);
                detail.weather_lng = (data.PoiMetaData.Longitude ? data.PoiMetaData.Longitude : null);
            }
        } else if ($('#menuItem' + home.menuObj.selectedMenuId).text().toUpperCase() === "HOME") {
            detail.title = $("#carouselTitle").html();
            detail.homeData = {
                dataType: (carouselSeparatorData.innerHTML === "" ? "" : (carouselSeparatorData.innerHTML.split(",")[0] ? carouselSeparatorData.innerHTML.split(",")[0] : "")),
                dataPlace: (carouselSeparatorData.innerHTML === "" ? "" : (carouselSeparatorData.innerHTML.split(",")[1] ? ", " + carouselSeparatorData.innerHTML.split(",")[1] : ""))
            };
        }
        return (data.DetailUrl ? data.DetailUrl : null);
    } else {
        return null;
    }
}
home.CarouselContainer = function () {
    'use strict';
    this.isStart = true;
    var backgroundList = function (count) {
        var backgroundInnerList = home.homeObj.createElement('li', {
            'classname': 'backgroundInnerList loadingOff',
            'id': 'backgroundInnerList' + count
        });
        var backgroundInnerListImage = home.homeObj.createElement('img', {
            'classname': 'backgroundInnerListImage',
            'id': 'backgroundInnerListImage' + count
        });
        $('#backgroundOuterList').append(backgroundInnerList);
        $(backgroundInnerList).append(backgroundInnerListImage);
        $('#backgroundInnerListImage0').error(function () {
            $('#backgroundInnerListImage0').attr('src', $('#image0').attr('src'));
        });
        $('#backgroundInnerListImage1').error(function () {
            $('#backgroundInnerListImage1').attr('src', $('#image1').attr('src'));
        });
        $('#backgroundInnerListImage2').error(function () {
            $('#backgroundInnerListImage2').attr('src', $('#image2').attr('src'));
        });
        $('#backgroundInnerListImage3').error(function () {
            $('#backgroundInnerListImage3').attr('src', $('#image3').attr('src'));
        });
        $('#backgroundInnerListImage4').error(function () {
            $('#backgroundInnerListImage4').attr('src', $('#image4').attr('src'));
        });
        if (home.homeObj.totalIcons < 2 && $('.outerList li:first-child')) {
            $('#backgroundOuterList li:first-child').css('margin-left', '0px');
        }
    };
    this.create = function () {
        var count = 0,
            backgroundGrid = home.homeObj.createElement('div', {
                'id': 'backgroundGrid'
            }),
            blurGrid = home.homeObj.createElement('div', {
                'id': 'blurGrid'
            }),
            mainGrid = home.homeObj.createElement('div', {
                'classname': 'mainGrid'
            }),
            footerSection = home.homeObj.createElement('div', {
                'id': 'footerSection'
            }),
            backgroundOuterList = home.homeObj.createElement('ul', {
                'id': 'backgroundOuterList'
            });
        $('#contentSection').append(backgroundGrid);
        $('#contentSection').append(blurGrid);
        $('#contentSection').append(mainGrid);
        $('#contentSection').append(footerSection);
        $('#backgroundGrid').append(backgroundOuterList);
        for (count = 0; count < home.homeObj.totalIcons; count++) {
            backgroundList(count);
        }
        $('#menuShadow').remove();
        var footerImage_1 = home.homeObj.createElement('div', {
            'id': 'footerImage_1'
        }),
            footerImage_2 = home.homeObj.createElement('div', {
                'id': 'footerImage_2'
            }),
            menuShadow = home.homeObj.createElement('div', {
                'id': 'menuShadow'
            }),
            carouselGrid = home.homeObj.createElement('div', {
                'id': 'carouselGrid'
            }),
            thumbnailGrid = home.homeObj.createElement('div', {
                'id': 'thumbnailGrid'
            });
        $('#footerSection').append(footerImage_1);
        $('#footerSection').append(footerImage_2);
        $('#menuSection').append(menuShadow);
        $('.mainGrid').append(carouselGrid);
        $('.mainGrid').append(thumbnailGrid);
        if (this.isStart) {
            var thumbnailText = home.homeObj.createElement('div', {
                'classname': 'thumbnailText',
                'id': 'thumbnailText'
            });
            $('#thumbnailGrid').append(thumbnailText);
        }
        for (count = 0; count < 4; count++) {
            var carouselSliderBg = home.homeObj.createElement('div', {
                'classname': 'carouselSliderBg',
                'id': 'carouselSliderBg' + count
            });
            $('.mainGrid').append(carouselSliderBg);
        }
        var carouselShadow = home.homeObj.createElement('div', {
            'id': 'carouselShadow'
        });
        $('.mainGrid').append(carouselShadow);
        var carouselImage = home.homeObj.createElement('div', {
            'id': 'carouselImage'
        }),
            outerList = home.homeObj.createElement('ul', {
                'classname': 'outerList'
            }),
            carouselPhotoByGrid = home.homeObj.createElement('div', {
                'id': 'carouselPhotoByGrid',
            }),
            carouselPhotoByDiv = home.homeObj.createElement('div', {
                'id': 'carouselPhotoByDiv',
            }),
            carouselPhotoBy = home.homeObj.createElement('div', {
                'id': 'carouselPhotoBy',
                'content': 'Photo by: '
            }),
            carouselPhotoByData = home.homeObj.createElement('div', {
                'id': 'carouselPhotoByData'
            }),
            carouselData = home.homeObj.createElement('div', {
                'id': 'carouselData'
            }),
            carouselTitle = home.homeObj.createElement('div', {
                'id': 'carouselTitle'
            }),
            carouselDescriptionDiv = home.homeObj.createElement('div', {
                'id': 'carouselDescriptionDiv'
            }),
            carouselDescriptionOuter = home.homeObj.createElement('div', {
                'id': 'carouselDescriptionOuter'
            }),
            carouselDescription = home.homeObj.createElement('div', {
                'id': 'carouselDescription'
            }),
            carouselSeparator = home.homeObj.createElement('div', {
                'id': 'carouselSeparator'
            }),
            carouselSeparatorData = home.homeObj.createElement('div', {
                'id': 'carouselSeparatorData'
            });
        $(carouselGrid).append(carouselImage);
        $(carouselImage).append(outerList);
        $(carouselImage).append(carouselPhotoByGrid);
        $(carouselPhotoByGrid).append(carouselPhotoByDiv);
        $(carouselPhotoByGrid).append(carouselPhotoBy);
        $(carouselPhotoBy).append(carouselPhotoByData);
        $(carouselGrid).append(carouselData);
        $(carouselData).append(carouselTitle);
        $(carouselData).append(carouselDescriptionDiv);
        $(carouselDescriptionDiv).append(carouselDescriptionOuter);
        $(carouselDescriptionOuter).append(carouselDescription);
        $(carouselData).append(carouselSeparator);
        $(carouselSeparator).append(carouselSeparatorData);
        this.imageList();
        home.carouselObj.setData();
    };
    this.imageList = function () {
        for (var count = 0; count < home.homeObj.totalIcons; count++) {
            var innerList = home.homeObj.createElement('li', {
                'classname': 'innerList',
                'id': 'list' + count
            });
            $('.outerList').append(innerList);
            var imageDisplay = home.homeObj.createElement('img', {
                'classname': 'image loadingOff',
                'id': 'image' + count
            });
            innerList.appendChild(imageDisplay);
            var carouselImageLoading = home.homeObj.createElement('div', {
                'id': 'carouselImageLoading' + count,
                'classname': 'carouselImageLoading',
                'content': 'Loading...'
            });
            $(innerList).append(carouselImageLoading);
            $('#image0').load(function () {
                $('#image0').removeClass('loadingOff').addClass('show');
                $('#carouselImageLoading0').html('');
            });
            $('#image0').error(function () {
                $('#image0').removeClass('loadingOff').addClass('show');
                $('#carouselImageLoading0').html('');
                $('#image0').attr('src', 'images/default_img_large.jpg');
            });
            $('#image1').load(function () {
                $('#image1').removeClass('loadingOff').addClass('show');
                $('#carouselImageLoading1').html('');
            });
            $('#image1').error(function () {
                $('#image1').removeClass('loadingOff').addClass('show');
                $('#carouselImageLoading1').html('');
                $('#image1').attr('src', 'images/default_img_large.jpg');
            });
            $('#image2').load(function () {
                $('#image2').removeClass('loadingOff').addClass('show');
                $('#carouselImageLoading2').html('');
            });
            $('#image2').error(function () {
                $('#image2').removeClass('loadingOff').addClass('show');
                $('#carouselImageLoading2').html('');
                $('#image2').attr('src', 'images/default_img_large.jpg');
            });
            $('#image3').load(function () {
                $('#image3').removeClass('loadingOff').addClass('show');
                $('#carouselImageLoading3').html('');
            });
            $('#image3').error(function () {
                $('#image3').removeClass('loadingOff').addClass('show');
                $('#carouselImageLoading3').html('');
                $('#image3').attr('src', 'images/default_img_large.jpg');
            });
            $('#image4').load(function () {
                $('#image4').removeClass('loadingOff').addClass('show');
                $('#carouselImageLoading4').html('');
            });
            $('#image4').error(function () {
                $('#image4').removeClass('loadingOff').addClass('show');
                $('#carouselImageLoading4').html('');
                $('#image4').attr('src', 'images/default_img_large.jpg');
            });
        }
        if (home.homeObj.totalIcons < 2 && $('.outerList li:first-child')) {
            $('.outerList li:first-child').css('margin-left', '0px');
        }
    }
    this.free = function () {
        $('.mainGrid').remove();
        $('#blurGrid').remove();
        $('#footerSection').remove();
        $('#backgroundGrid').remove();
    };
	this.count=1;
    this.setData = function () {
        if (main.listResult && main.listResult.CardList && main.listResult.CardList[home.thumbnailObj.normalId]) {
            if (main.listResult.CardList[home.thumbnailObj.normalId].Title && main.listResult.CardList[home.thumbnailObj.normalId].Title != "") {
                $('#carouselTitle').html(main.listResult.CardList[home.thumbnailObj.normalId].Title);
            } else {
                $('#carouselTitle').html('');
            }
			
            if (main.listResult.CardList[home.thumbnailObj.normalId].Description && main.listResult.CardList[home.thumbnailObj.normalId].Description != "") {
                var string, result = "";
                string = main.listResult.CardList[home.thumbnailObj.normalId].Description;
                string = string.split(". ");
                for (var count = 0; count < string.length - 1; count++) {
                    result = result.concat(string[count] + '.</br>');
                }
                result = result.concat(string[string.length - 1]);
                var stringResult = home.homeObj.setOmitter(result, 364, 687, 26, true);
                $('#carouselDescription').html(stringResult);
            } else {
				
                if(this.count %2 != 0){
					error.errorObj.contentCreate('carouselDescription', 'No description available.');this.count++;
				} else {
					if(this.count%4 == 0){
						stringResult = "Paragliding is a relatively new sport in India. The major paragliding sites in India are Billing, Kullu, Solang, Lahaul & Spiti(all in Himachal), Naukutchiyatal, Dayara Bugyal, Dhanolti Ridge, Bedni Bugyal (all in Uttarakhand), Jaipur, Jaisalmer, Jodhpur, Udaipur, Bikaner (all in Rajasthan), Matheran, Deolali, Mahabaleshwar (all in Maharashtra). The flying season spans September to December and then March to June.";
					}else {
						stringResult = "Rock Climbing in India assumed the shape of a popular sport nearly a decade ago. Though rock faces, ideal for rock climbing, can be found in many marts of the country, the Aravali range, Western Ghats, Himachal Pradesh and Karnataka provide some of the best climbing faces. Places like Dumdama, Manali and Rohtang Pass are quite popular among rock climbers. The best season for this tricky and risky activity is between October and February.";
					}
					$('#carouselDescription').html(stringResult);
					this.count++;
				}
				
            }
            if (main.listResult.CardList[home.thumbnailObj.normalId].Tags && main.listResult.CardList[home.thumbnailObj.normalId].Tags[0] && main.listResult.CardList[home.thumbnailObj.normalId].Tags[0].Text && main.listResult.CardList[home.thumbnailObj.normalId].Tags[0].Text != "") {
                if (main.listResult.CardList[home.thumbnailObj.normalId].Tags && main.listResult.CardList[home.thumbnailObj.normalId].Tags[1] && main.listResult.CardList[home.thumbnailObj.normalId].Tags[1].Text && main.listResult.CardList[home.thumbnailObj.normalId].Tags[1].Text != "") {
                    $('#carouselSeparatorData').html(main.listResult.CardList[home.thumbnailObj.normalId].Tags[0].Text + ', ' + main.listResult.CardList[home.thumbnailObj.normalId].Tags[1].Text);
                } else {
                    $('#carouselSeparatorData').html(main.listResult.CardList[home.thumbnailObj.normalId].Tags[0].Text);
                }
            } else if (main.listResult.CardList[home.thumbnailObj.normalId].Tags && main.listResult.CardList[home.thumbnailObj.normalId].Tags[1] && main.listResult.CardList[home.thumbnailObj.normalId].Tags[1].Text && main.listResult.CardList[home.thumbnailObj.normalId].Tags[1].Text != "") {
                $('#carouselSeparatorData').html(main.listResult.CardList[home.thumbnailObj.normalId].Tags[1].Text);
            } else {
                $('#carouselSeparatorData').html(' ');
            }
            if (main.listResult.CardList[home.thumbnailObj.normalId].PoiMetaData && main.listResult.CardList[home.thumbnailObj.normalId].PoiMetaData.ImageCreditAuthor && main.listResult.CardList[home.thumbnailObj.normalId].PoiMetaData.ImageCreditAuthor != "") {
                $('#carouselPhotoByGrid').removeClass('loadingOff').addClass('show');
                $('#carouselPhotoByData').html(main.listResult.CardList[home.thumbnailObj.normalId].PoiMetaData.ImageCreditAuthor);
            } else {
                $('#carouselPhotoByGrid').removeClass('show').addClass('loadingOff');
            }
        }
    };
	
    this.leftAnimation = function () {
        if (main.listResult.CardList.length > 1) {
            $('#backgroundInnerList' + (home.thumbnailObj.normalId + 2) % home.homeObj.totalIcons).removeClass('show').addClass('loadingOff');
            $('.outerList').prepend($('.outerList li:last-child'));
            $('#list' + ((home.thumbnailObj.normalId) % home.homeObj.totalIcons)).css({
                marginLeft: '-1002px'
            });
            $('.outerList li:nth-child(2)').css({
                marginLeft: '0px'
            });
            this.setData();
            $('#list' + ((home.thumbnailObj.normalId) % home.homeObj.totalIcons)).bind("transitionend webkitTransitionEnd", function () {
                setTimeout(function () {
                    $('#backgroundInnerList' + ((home.thumbnailObj.normalId + 1) % home.homeObj.totalIcons)).removeClass('loadingOff').addClass('show');
                }, 5);
            });
        }
    };
    this.rightAnimation = function () {
        if (main.listResult.CardList.length > 1) {
            $('#backgroundInnerList' + home.thumbnailObj.normalId).removeClass('show').addClass('loadingOff');
            $('.outerList li:first-child').css({
                marginLeft: '0px'
            });
            $('#list' + home.thumbnailObj.normalId).css({
                marginLeft: '-1002px'
            });
            $('.outerList').append($('.outerList li:first-child'));
            this.setData();
            $('#list' + home.thumbnailObj.normalId).bind("transitionend webkitTransitionEnd", function () {
                setTimeout(function () {
                    $('#backgroundInnerList' + (home.thumbnailObj.normalId + home.homeObj.totalIcons + 1) % home.homeObj.totalIcons).removeClass('loadingOff').addClass('show');
                }, 5);
            });
        }
    };
}
home.carouselObj = new home.CarouselContainer();
home.ThumbnailContainer = function () {
    var time, timer_is_on = 0,
        isCursor = true;
    this.normalId = 0;
    this.create = function () {
        timer_is_on = 0;
        this.error = false;
        this.animation = false;
        $('.backgroundInnerList').removeClass('show').addClass('loadingOff');
        var iconDiv = home.homeObj.createElement('div', {
            'id': 'iconDiv'
        });
        $('#thumbnailGrid').append(iconDiv);
        for (var count = 0; count < home.homeObj.totalIcons; count++) {
            this.itemCreate(count);
        }
        this.setData();
        for (var count = 0; count < home.homeObj.totalIcons; count++) {
            home.carouselObj.leftAnimation();
        }
        for (var count = 0; count < this.normalId; count++) {
            home.carouselObj.rightAnimation();
        }
        $('#backgroundInnerList' + (home.thumbnailObj.normalId + home.homeObj.totalIcons + 1) % home.homeObj.totalIcons).removeClass('loadingOff').addClass('show');
        this.enter_focus();
    };
    this.itemCreate = function (count) {
        var iconImageDiv = home.homeObj.createElement('div', {
            'classname': 'iconImageDiv',
            'id': 'iconImageDiv' + count
        });
        $('#iconDiv').append(iconImageDiv);
        var iconImage = home.homeObj.createElement('img', {
            'classname': 'iconImage',
            'id': 'iconImage' + count
        });
        $(iconImageDiv).append(iconImage);
        var iconImageMask = home.homeObj.createElement('div', {
            'classname': 'iconImageMask',
            'id': 'iconImageMask' + count
        });
        $(iconImageDiv).append(iconImageMask);
        var iconBorder = home.homeObj.createElement('div', {
            'classname': 'iconBorder darkGreyBorder',
            'id': 'iconBorder' + count
        });
        $(iconImageDiv).append(iconBorder);
        var iconLoading = home.homeObj.createElement('div', {
            'classname': 'iconLoading',
            'id': 'iconLoading' + count,
            'content': 'Loading...'
        });
        $(iconImageDiv).append(iconLoading);
        $('#iconImage0').error(function () {
            $('#iconImage0').attr('src', "images/default_img_thumbnail.png");
        });
        $('#iconImage1').error(function () {
            $('#iconImage1').attr('src', "images/default_img_thumbnail.png");
        });
        $('#iconImage2').error(function () {
            $('#iconImage2').attr('src', "images/default_img_thumbnail.png");
        });
        $('#iconImage3').error(function () {
            $('#iconImage3').attr('src', "images/default_img_thumbnail.png");
        });
        $('#iconImage4').error(function () {
            $('#iconImage4').attr('src', "images/default_img_thumbnail.png");
        });
    };
    this.setData = function () {
        for (var count = 0; count < home.homeObj.totalIcons; count++) {
            if (main.listResult && main.listResult.CardList && main.listResult.CardList[count] && main.listResult.CardList[count].Thumb && main.listResult.CardList[count].Thumb != "") {
                $('#iconImage' + count).attr({
                    'src': main.listResult.CardList[count].Thumb + '&resize_mode=4&width=80&height=80'
                });
                try {
                    $('#image' + ((count + home.homeObj.totalIcons + 1) % home.homeObj.totalIcons)).attr('src', main.listResult.CardList[count].Thumb + '&resize_mode=4&width=1002&height=616');
                } catch (e) {
                    $('#image' + ((count + home.homeObj.totalIcons + 1) % home.homeObj.totalIcons)).attr('src', 'images/default_img_large.jpg');
                }
                try {
                    $('#backgroundInnerListImage' + ((count + home.homeObj.totalIcons + 1) % home.homeObj.totalIcons)).attr('src', $('#image' + ((count + home.homeObj.totalIcons + 1) % home.homeObj.totalIcons)).attr('src'));
                } catch (e) {
                    $('#backgroundInnerListImage' + ((count + home.homeObj.totalIcons + 1) % home.homeObj.totalIcons)).attr('src', 'images/default_img_large.jpg');
                }
            } else {
                $('#iconImage' + count).attr({
                    'src': "images/default_img_thumbnail.png"
                });
                $('#image' + ((count + home.homeObj.totalIcons + 1) % home.homeObj.totalIcons)).attr('src', 'images/default_img_large.jpg');
                $('#backgroundInnerListImage' + ((count + home.homeObj.totalIcons + 1) % home.homeObj.totalIcons)).attr('src', 'images/default_img_large.jpg');
            }
        }
    };
    this.enter_focus = function () {
        if (isCursor) {
            $('#iconBorder' + this.normalId).removeClass('darkGreyBorder').addClass('greenBorder');
        } else {
            $('#iconBorder' + this.normalId).removeClass('darkGreyBorder').addClass('greyBorder');
        }
        $('#iconImageMask' + this.normalId).removeClass('opacityHalf').addClass('opacityZero');
    };
    this.leave_focus = function () {
        if (isCursor) {
            $('#iconBorder' + this.normalId).removeClass('greenBorder').addClass('darkGreyBorder');
        } else {
            $('#iconBorder' + this.normalId).removeClass('greyBorder').addClass('darkGreyBorder');
        }
        $('#iconImageMask' + this.normalId).removeClass('opacityZero').addClass('opacityHalf');
    };
    this.enable_auto_focus = function () {
        $('#iconBorder' + this.normalId).removeClass('greenBorder').addClass('greyBorder');
        isCursor = false;
        this.animation = true;
        home.thumbnailObj.startCount();
    };
    this.disable_auto_focus = function () {
        $('#iconBorder' + this.normalId).removeClass('greyBorder').addClass('greenBorder');
        isCursor = true;
        this.animation = false;
        home.thumbnailObj.stopCount();
    };
    this.KeyboardEvent = function (key, eventType) {
        switch (eventType) {
            case 'keydown':
                switch (key) {
                    case 'arrowright':
                        this.leave_focus();
                        if (this.normalId < home.homeObj.totalIcons - 1) {
                            this.normalId += 1;
                        } else {
                            this.normalId = 0;
                        }
                        this.enter_focus();
                        home.carouselObj.rightAnimation();
                        break;
                    case 'arrowleft':
                        this.leave_focus();
                        if (this.normalId > 0) {
                            this.normalId -= 1;
                        } else {
                            this.normalId = home.homeObj.totalIcons - 1;
                        }
                        this.enter_focus();
                        home.carouselObj.leftAnimation();
                        break;
                    case 'arrowup':
                        this.enable_auto_focus();
                        main.focusedDom = home.menuObj;
                        home.menuObj.enter_focus();
                        break;
                    case 'ok':
                        if (getDetailUrl()) {
                            detail.getDetailResponse(getDetailUrl());
                        }
                        break;
                    default:
                        break;
                }
        }
    };
    this.timedCount = function () {
        clearTimeout(time);
        time = setTimeout(function () {
            home.thumbnailObj.leave_focus();
            if (home.thumbnailObj.normalId < home.homeObj.totalIcons - 1) {
                home.thumbnailObj.normalId += 1;
            } else {
                home.thumbnailObj.normalId = 0;
            }
            home.thumbnailObj.enter_focus();
            home.carouselObj.rightAnimation();
            home.thumbnailObj.timedCount();
        }, 5000);
    };
    this.startCount = function () {
        if (!timer_is_on) {
            timer_is_on = 1;
            this.timedCount();
        }
    };
    this.stopCount = function () {
        clearTimeout(time);
        timer_is_on = 0;
    };
    this.free = function () {
        $('#thumbnailGrid').remove();
    };
}
home.thumbnailObj = new home.ThumbnailContainer();
home.MenuContainer = function () {
    this.cursorMenuId = 0;
    var totalWidth, presentWidth, pageCount, menuPage, move, isDetail = false;
    this.error = false;
    this.selectedMenuId = this.cursorMenuId;
    var array = ['HOME', 'DESTINATIONS', 'HOTELS', 'THINGS TO DO', 'EATING OUT', 'NIGHTLIFE', 'GUIDES'];
    this.create = function () {
        totalWidth = 0;
        presentWidth = 0;
        pageCount = 0;
        menuPage = 0;
        move = 0;
        if (main.isSearchScreen) {
            main.isSearchScreen = false;
        }
        var leftArrow = home.homeObj.createElement('div', {
            'id': 'leftArrow',
            'classname': 'menuArrow'
        });
        $('#menuSection').append(leftArrow);
        var menuDiv = home.homeObj.createElement('div', {
            'id': 'menu_Normal',
            'classname': 'menu_Normal'
        });
        $('#menuSection').append(menuDiv);
        var menuMainDiv = home.homeObj.createElement('div', {
            'id': 'menuMainDiv',
            'classname': 'menuMainDiv'
        });
        $('#menu_Normal').append(menuMainDiv);
        var rightArrow = home.homeObj.createElement('div', {
            'id': 'rightArrow',
            'classname': 'menuArrow'
        });
        $('#menuSection').append(rightArrow);
        var menuList = home.homeObj.createElement('div', {
            'id': 'menuList' + pageCount,
            'classname': 'menuList'
        });
        $('#menuMainDiv').append(menuList);
        var MenuCursor = home.homeObj.createElement('div', {
            'id': 'MenuCursor',
            'classname': 'MenuCursorDisable'
        });
        $('#menuSection').append(MenuCursor);
        if (main.menuResult && main.menuResult.navigationMenu && main.menuResult.navigationMenu != "") {
            for (var count = 0; count < main.menuResult.navigationMenu.length; count++) {
                if (main.menuResult.navigationMenu[count] && main.menuResult.navigationMenu[count].ReadableName && main.menuResult.navigationMenu[count].ReadableName != "") {
                    var name = main.menuResult.navigationMenu[count].ReadableName.toUpperCase();
                    if ((name === 'HOME') || (name === 'DESTINATIONS') || (name === 'HOTELS') || (name === 'THINGS TO DO') || (name === 'EATING OUT') || (name === 'NIGHTLIFE') || (name === 'GUIDES')) {
                        this.itemCreate(count);
                    }
                }
            }
            var child = document.getElementById('MenuCursor');
            child.parentNode.removeChild(child);
            $('#menuItem' + this.cursorMenuId).append(child);
            var width = 1820 * (pageCount + 1);
            $('#menuMainDiv').css('width', width + 'px');
            main.focusedDom = home.thumbnailObj;
            this.selectedMenu();
            pageCount = 0;
            this.trackArrow();
        }
    };
    this.itemCreate = function (count) {
        if (main.menuResult && main.menuResult.navigationMenu && main.menuResult.navigationMenu[count]) {
            var menuItemDiv = home.homeObj.createElement('div', {
                'classname': 'menuItemDiv',
                'id': 'menuItemDiv' + count
            }),
                menuItem = home.homeObj.createElement('div', {
                    'classname': 'menuItem',
                    'id': 'menuItem' + count,
                });
            $('#menuList' + pageCount).append(menuItemDiv);
            $(menuItemDiv).append(menuItem);
            var menuImage = home.homeObj.createElement('div', {
                'classname': 'menuImage menuNormal',
                'id': 'menuImage' + count
            });
            $(menuItem).append(menuImage);
            if (main.menuResult && main.menuResult.navigationMenu && main.menuResult.navigationMenu[count] && main.menuResult.navigationMenu[count].ReadableName && main.menuResult.navigationMenu[count].ReadableName != "") {
                var menuText = home.homeObj.createElement('div', {
                    'classname': 'menuText',
                    'id': 'menuText' + count,
                    'content': main.menuResult.navigationMenu[count].ReadableName
                });
            } else {
                var menuText = home.homeObj.createElement('div', {
                    'classname': 'menuText',
                    'id': 'menuText' + count,
                    'content': 'Unknown'
                });
            }
            $(menuItem).append(menuText);
            setImage(count);
            paginate(count);
        }
    };
    var setImage = function (count) {
        var name = $('#menuItem' + count).text().toUpperCase();
        switch (name) {
            case 'HOME':
                $('#menuImage' + count).addClass('home');
                break;
            case 'DESTINATIONS':
                $('#menuImage' + count).addClass('destinations');
                break;
            case 'HOTELS':
                $('#menuImage' + count).addClass('hotels');
                break;
            case 'THINGS TO DO':
                $('#menuImage' + count).addClass('thingsToDo');
                break;
            case 'EATING OUT':
                $('#menuImage' + count).addClass('eatingOut');
                break;
            case 'NIGHTLIFE':
                $('#menuImage' + count).addClass('nightLife');
                break;
            case 'GUIDES':
                $('#menuImage' + count).addClass('guides');
                break;
            default:
                $('#menuImage' + count).removeClass('menuNormal').addClass('menuDefault defaultMenu');
                break;
        }
    };
    this.normalMenu = function () {
        $('#menuText' + this.selectedMenuId).removeClass('menu_Selected');
        $('#menuItemDiv' + this.selectedMenuId).removeClass('menuDiv_Selected');
        var name = $('#menuItem' + this.selectedMenuId).text().toUpperCase();
        switch (name) {
            case 'HOME':
                $('#menuImage' + this.selectedMenuId).removeClass('home_s').addClass('home');
                break;
            case 'DESTINATIONS':
                $('#menuImage' + this.selectedMenuId).removeClass('destinations_s').addClass('destinations');
                break;
            case 'HOTELS':
                $('#menuImage' + this.selectedMenuId).removeClass('hotels_s').addClass('hotels');
                break;
            case 'THINGS TO DO':
                $('#menuImage' + this.selectedMenuId).removeClass('thingsToDo_s').addClass('thingsToDo');
                break;
            case 'EATING OUT':
                $('#menuImage' + this.selectedMenuId).removeClass('eatingOut_s').addClass('eatingOut');
                break;
            case 'NIGHTLIFE':
                $('#menuImage' + this.selectedMenuId).removeClass('nightLife_s').addClass('nightLife');
                break;
            case 'GUIDES':
                $('#menuImage' + this.selectedMenuId).removeClass('guides_s').addClass('guides');
                break;
            default:
                $('#menuImage' + this.selectedMenuId).removeClass('defaultMenu_s').addClass('defaultMenu');
                break;
        }
    };
    this.selectedMenu = function () {
        $('#menuText' + this.selectedMenuId).addClass('menu_Selected');
        $('#menuItemDiv' + this.selectedMenuId).addClass('menuDiv_Selected');
        var name = $('#menuItem' + this.selectedMenuId).text().toUpperCase();
        switch (name) {
            case 'HOME':
                $('#menuImage' + this.selectedMenuId).addClass('home_s').removeClass('home');
                break;
            case 'DESTINATIONS':
                $('#menuImage' + this.selectedMenuId).addClass('destinations_s').removeClass('destinations');
                break;
            case 'HOTELS':
                $('#menuImage' + this.selectedMenuId).addClass('hotels_s').removeClass('hotels');
                break;
            case 'THINGS TO DO':
                $('#menuImage' + this.selectedMenuId).addClass('thingsToDo_s').removeClass('thingsToDo');
                break;
            case 'EATING OUT':
                $('#menuImage' + this.selectedMenuId).addClass('eatingOut_s').removeClass('eatingOut');
                break;
            case 'NIGHTLIFE':
                $('#menuImage' + this.selectedMenuId).addClass('nightLife_s').removeClass('nightLife');
                break;
            case 'GUIDES':
                $('#menuImage' + this.selectedMenuId).addClass('guides_s').removeClass('guides');
                break;
            default:
                $('#menuImage' + this.selectedMenuId).addClass('defaultMenu_s').removeClass('defaultMenu');
                break;
        }
    }
    this.getApiData = function () {
        this.selectedMenuId = this.cursorMenuId;
        if ($('#menuItem' + this.selectedMenuId).text().toUpperCase() == 'HOME') {
            if (main.menuResult && main.menuResult.navigationMenu && main.menuResult.navigationMenu[this.selectedMenuId] && main.menuResult.navigationMenu[this.selectedMenuId].Top && main.menuResult.navigationMenu[this.selectedMenuId].Top != "") {
                $(".ListingDiv").remove();
                $(".ListingDivMaskChange").remove();
                var menuURL = main.menuResult.navigationMenu[this.selectedMenuId].Top;
                menuURL = menuURL.replace("@identifier", home.homeObj.currentPage);
                main.isLoading = true;
                home.homeObj.getList(menuURL);
            }
        } else {
            if (main.menuResult && main.menuResult.navigationMenu && main.menuResult.navigationMenu[this.selectedMenuId] && main.menuResult.navigationMenu[this.selectedMenuId].Body && main.menuResult.navigationMenu[this.selectedMenuId].Body != "") {
                var menuURL = main.menuResult.navigationMenu[this.selectedMenuId].Body;
                menuURL = menuURL.replace("@identifier", listing.currentPage);
                main.isLoading = true;
                home.homeObj.getList(menuURL);
            }
        }
    }
    this.getListApiData = function () {
        if (main.isSearchScreen) {
            main.keyboardContainer.getApi(search.encodedValue, search.currentPage);
        } else {
            if (main.menuResult && main.menuResult.navigationMenu && main.menuResult.navigationMenu[this.selectedMenuId] && main.menuResult.navigationMenu[this.selectedMenuId].Body && main.menuResult.navigationMenu[this.selectedMenuId].Body != "") {
                var menuURL = main.menuResult.navigationMenu[this.selectedMenuId].Body;
                menuURL = menuURL.replace("@identifier", listing.currentPage);
                main.isLoading = true;
                home.homeObj.getList(menuURL);
            }
        }
    }
    var paginate = function (count) {
        presentWidth = parseInt($('#menuItemDiv' + count).outerWidth(true));
        totalWidth += presentWidth;
        if (totalWidth >= 1820) {
            totalWidth = presentWidth;
            pageCount += 1;
            var menuList = home.homeObj.createElement('div', {
                'id': 'menuList' + pageCount,
                'classname': 'menuList'
            });
            $('#menuMainDiv').append(menuList);
            var child = document.getElementById('menuItemDiv' + count);
            child.parentNode.removeChild(child);
            document.getElementById('menuList' + pageCount).appendChild(child);
        }
    }
    this.trackArrow = function () {
        if ($('#menuMainDiv').children('div').length - 1) {
            if ((pageCount > 0) && (pageCount < $('#menuMainDiv').children('div').length - 1)) {
                $('.menuArrow').removeClass('menuArrowNoImage').addClass('menuArrowImage');
            } else if (pageCount >= $('#menuMainDiv').children('div').length - 1) {
                $('#rightArrow').removeClass('menuArrowImage').addClass('menuArrowNoImage');
                $('#leftArrow').removeClass('menuArrowNoImage').addClass('menuArrowImage');
            } else if (pageCount <= 0) {
                $('#leftArrow').removeClass('menuArrowImage').addClass('menuArrowNoImage');
                $('#rightArrow').removeClass('menuArrowNoImage').addClass('menuArrowImage');
            }
        } else {
            $('.menuArrow').removeClass('menuArrowImage').addClass('menuArrowNoImage');
        }
    }
    this.enter_focus = function () {
        main.focusedDom = this;
        var child = document.getElementById('MenuCursor');
        child.parentNode.removeChild(child);
        $('#menuText' + this.cursorMenuId).addClass('menu_Cursor');
        $('#menuItemDiv' + this.cursorMenuId).addClass('menuDiv_Cursor');
        if (this.selectedMenuId == this.cursorMenuId) {
            var name = $('#menuItem' + this.selectedMenuId).text().toUpperCase();
            switch (name) {
                case 'HOME':
                    $('#menuImage' + this.selectedMenuId).removeClass('home_s').addClass('home');
                    break;
                case 'DESTINATIONS':
                    $('#menuImage' + this.selectedMenuId).removeClass('destinations_s').addClass('destinations');
                    break;
                case 'HOTELS':
                    $('#menuImage' + this.selectedMenuId).removeClass('hotels_s').addClass('hotels');
                    break;
                case 'THINGS TO DO':
                    $('#menuImage' + this.selectedMenuId).removeClass('thingsToDo_s').addClass('thingsToDo');
                    break;
                case 'EATING OUT':
                    $('#menuImage' + this.selectedMenuId).removeClass('eatingOut_s').addClass('eatingOut');
                    break;
                case 'NIGHTLIFE':
                    $('#menuImage' + this.selectedMenuId).removeClass('nightLife_s').addClass('nightLife');
                    break;
                case 'GUIDES':
                    $('#menuImage' + this.selectedMenuId).removeClass('guides_s').addClass('guides');
                    break;
                default:
                    $('#menuImage' + this.selectedMenuId).removeClass('defaultMenu_s').addClass('defaultMenu');
                    break;
            }
        }
        document.getElementById('menuItem' + this.cursorMenuId).appendChild(child);
        $('#MenuCursor').removeClass('MenuCursorDisable').addClass('MenuCursorEnable');
    };
    this.leave_focus = function () {
        $('#menuText' + this.cursorMenuId).removeClass('menu_Cursor');
        $('#menuItemDiv' + this.cursorMenuId).removeClass('menuDiv_Cursor');
        if (this.selectedMenuId == this.cursorMenuId) {
            var name = $('#menuItem' + this.selectedMenuId).text().toUpperCase();
            switch (name) {
                case 'HOME':
                    $('#menuImage' + this.selectedMenuId).addClass('home_s').removeClass('home');
                    break;
                case 'DESTINATIONS':
                    $('#menuImage' + this.selectedMenuId).addClass('destinations_s').removeClass('destinations');
                    break;
                case 'HOTELS':
                    $('#menuImage' + this.selectedMenuId).addClass('hotels_s').removeClass('hotels');
                    break;
                case 'THINGS TO DO':
                    $('#menuImage' + this.selectedMenuId).addClass('thingsToDo_s').removeClass('thingsToDo');
                    break;
                case 'EATING OUT':
                    $('#menuImage' + this.selectedMenuId).addClass('eatingOut_s').removeClass('eatingOut');
                    break;
                case 'NIGHTLIFE':
                    $('#menuImage' + this.selectedMenuId).addClass('nightLife_s').removeClass('nightLife');
                    break;
                case 'GUIDES':
                    $('#menuImage' + this.selectedMenuId).addClass('guides_s').removeClass('guides');
                    break;
                default:
                    $('#menuImage' + this.selectedMenuId).addClass('defaultMenu_s').removeClass('defaultMenu');
                    break;
            }
        }
        $('#MenuCursor').removeClass('MenuCursorEnable').addClass('MenuCursorDisable');
    };
    this.KeyboardEvent = function (key, eventType) {
        if (main.isDetail && $("#subMenuSlider").length > 0 && $("#subMenuSlider").css("margin-left") == "0px") {
            $(".subCallOut").remove();
            $("#subMenuSlider").removeClass("sliderZero");
            $("#subMenuSlider").addClass("submenuLeft");
            $(".subArrCont").css("margin-left", "-236px");
            $(".subArrContBg").css("margin-left", "-236px");
            $("#subMenuArr").css("-webkit-transform", "rotate(0deg)");
            return true;
        }
        switch (eventType) {
            case 'keydown':
                switch (key) {
                    case 'arrowright':
                        this.leave_focus();
                        if ((this.cursorMenuId - menuPage) < ($('#menuList' + pageCount).children('div').length) - 1) {
                            this.cursorMenuId += 1;
                        } else {
                            if ($('#menuList' + (pageCount + 1)) && $('#menuList' + (pageCount + 1)).children('div') && $('#menuList' + (pageCount + 1)).children('div').length) {
                                menuPage += $('#menuList' + (pageCount)).children('div').length;
                                pageCount += 1;
                                move = -pageCount * 1820;
                                if ((this.cursorMenuId - menuPage - 1) < ($('#menuList' + (pageCount)).children('div').length)) {
                                    $('#menuMainDiv').css('marginLeft', move + 'px');
                                    this.cursorMenuId += 1;
                                }
                            } else {
                                $('#menuMainDiv').css({
                                    'marginLeft': '0px'
                                });
                                this.cursorMenuId = 0;
                                pageCount = 0;
                                menuPage = 0;
                            }
                        }
                        this.trackArrow();
                        this.enter_focus();
                        break;
                    case 'arrowleft':
                        this.leave_focus();
                        if (this.cursorMenuId > 0) {
                            if ((this.cursorMenuId - menuPage) > 0) {
                                this.cursorMenuId -= 1;
                            } else {
                                if ((this.cursorMenuId - menuPage) == 0) {
                                    pageCount -= 1;
                                    menuPage -= ($('#menuList' + (pageCount)).children('div').length);
                                    if (pageCount == 0) {
                                        $('#menuMainDiv').css('margin-left', '0px');
                                    } else {
                                        move = -pageCount * 1820;
                                        $('#menuMainDiv').css('margin-left', move + 'px');
                                    }
                                    this.cursorMenuId -= 1;
                                }
                            }
                        } else {
                            if ($('#menuMainDiv') && $('#menuMainDiv').children('div') && $('#menuMainDiv').children('div').length) {
                                pageCount = $('#menuMainDiv').children('div').length - 1;
                                menuPage = 0;
                                for (var count = 0; count < pageCount; count++) {
                                    menuPage += $('#menuList' + (count)).children('div').length;
                                }
                                move = -pageCount * 1820;
                                $('#menuMainDiv').css('margin-left', move + 'px');
                                this.cursorMenuId = $('#menuMainDiv').children('div').length * ($('#menuList0').children('div').length - 1);
                            }
                        }
                        this.trackArrow();
                        this.enter_focus();
                        break;
                    case 'arrowup':
                        this.leave_focus();
                        home.searchObj.enter_focus();
                        main.focusedDom = home.searchObj;
                        break;
                    case 'arrowdown':
                        if (main.isDetail && !error.errorObj.isError) {
                            try {
                                if (detail.subMenuTop) {
                                    this.leave_focus();
                                    detail.subMenuTop.enter_focus();
                                } else if (detail.prev) {
                                    this.leave_focus();
                                    if (detail.prev == home.menuObj) {
                                        if (detail.lowerGalleryObj.totalPg > 1 || detail.lowerGalleryObj.components.length > 1) {
                                            detail.prev = detail.lowerGalleryObj;
                                        }
                                    }
                                    detail.prev.enter_focus();
                                    detail.prev = this;
                                }
                            } catch (e) { }
                        } else if (!error.errorObj.isError) {
                            if ($('#menuItem' + this.selectedMenuId).text().toUpperCase() == 'HOME') {
                                if (!(home.thumbnailObj.error)) {
                                    this.leave_focus();
                                    main.focusedDom = home.thumbnailObj;
                                    home.thumbnailObj.disable_auto_focus();
                                    home.thumbnailObj.stopCount();
                                } else {
                                    this.leave_focus();
                                    main.focusedDom = home.thumbnailObj;
                                    home.thumbnailObj.disable_auto_focus();
                                    home.thumbnailObj.stopCount();
                                }
                            } else {
                                this.leave_focus();
                                main.focusedDom = listing.ListingGridContainerObj;
                                main.focusedDom.enter_focus();
                            }
                        }
                        break;
                    case 'ok':
                        this.leave_focus();
                        this.normalMenu();
                        home.thumbnailObj.stopCount();
                        main.focusedDom = home.thumbnailObj;
                        home.thumbnailObj.animation = false;
                        home.thumbnailObj.leave_focus();
                        if (main.isDetail) {
                            isDetail = true;
                            detail.galleryObj.freeOnReturn();
                        }
                        if ((this.selectedMenuId != this.cursorMenuId) || isDetail || home.menuObj.error || error.errorObj.isError) {
                            if ($('#menuItem' + this.selectedMenuId).text().toUpperCase() == 'HOME') {
                                main.isLoading = true;
                                home.thumbnailObj.free();
                                home.carouselObj.free();
                                home.thumbnailObj.normalId = 0;
                            } else {
                                main.isListingScreen = true;
                                listing.gridsFree();
                                listing.currentPage = 1;
                                listing.tag = 0;
                                listing.index = 0;
                            }
                            if (!isDetail && (this.selectedMenuId == this.cursorMenuId) && !error.errorObj.isError) {
                                error.errorObj.isError = false;
                                home.homeObj.create();
                                main.isLoading = false;
                            } else {
                                error.errorObj.isError = false;
                                this.getApiData();
                                isDetail = false;
                            }
                            this.selectedMenu();
                        } else {
                            error.errorObj.isError = false;
                            if (!home.menuObj.error) {
                                if ($('#menuItem' + this.selectedMenuId).text().toUpperCase() == 'HOME') {
                                    if (!(home.thumbnailObj.error)) {
                                        home.thumbnailObj.disable_auto_focus();
                                        home.thumbnailObj.animation = false;
                                        home.thumbnailObj.enter_focus();
                                        this.selectedMenu();
                                    } else {
                                        this.selectedMenu();
                                        this.enter_focus();
                                        main.focusedDom = home.menuObj;
                                    }
                                } else {
                                    this.selectedMenu();
                                    main.focusedDom = listing.ListingGridContainerObj;
                                    main.focusedDom.enter_focus();
                                }
                            } else {
                                this.selectedMenu();
                                error.errorObj.screenCreate('No data available.');
                            }
                        }
                        break;
                    default:
                        break;
                }
        }
    };
    this.free = function () {
        $('.menuArrow').remove();
        $('.menu_Normal').remove();
        $('#menuShadow').remove();
    };
}
home.menuObj = new home.MenuContainer();
listing.gridsFree = function () {
    contentSection.innerHTML = "";
}
listing.nextPage = function () {
    main.pagination = true;
    listing.nextPageVar = true;
    listing.ListingGridContainerObj.leave_focus();
    if (!main.isSearchScreen) {
        error.errorObj.createMask();
    } else {
        error.errorObj.createMask();
    }
    home.menuObj.getListApiData();
}
listing.prevPage = function () {
    main.prevPageVar = true;
    main.pagination = true;
    listing.ListingGridContainerObj.leave_focus();
    listing.index = 2;
    if (!main.isSearchScreen) {
        error.errorObj.createMask();
    } else {
        error.errorObj.createMask();
    }
    home.menuObj.getListApiData();
}
listing.createElement = function (type, param) {
    type = type || 'div';
    param = param || {};
    var ele = document.createElement(type);
    if (param.classname) {
        ele.className = param.classname;
    }
    if (param.id) {
        ele.id = param.id;
    }
    if (param.content) {
        ele.innerHTML = param.content;
    }
    if (param.src) {
        ele.src = param.src;
    }
    return ele;
};
listing.ListingContainer = function () {
    var tag, index;
    this.create = function () {
        listing.gridsFree();
        var home = document.getElementById("contentSection");
        var ListingDiv = listing.createElement("div", {
            "id": "ListingDiv",
            "classname": "ListingDiv"
        });
        home.appendChild(ListingDiv);
        var mainShadow = listing.createElement("div", {
            "id": "mainShadow",
            "classname": "mainShadow"
        });
        ListingDiv.appendChild(mainShadow);
        var leftDiv = listing.createElement("div", {
            "id": "leftDiv",
            "classname": "leftDiv"
        });
        ListingDiv.appendChild(leftDiv);
        var mainDiv = listing.createElement("div", {
            "id": "mainDiv",
            "classname": "mainDiv"
        });
        ListingDiv.appendChild(mainDiv);
        var LeftArrowDiv = listing.createElement("div", {
            "id": "LeftArrowDiv",
            "classname": "LeftArrowDiv"
        });
        ListingDiv.appendChild(LeftArrowDiv);
        var RightArrowDiv = listing.createElement("div", {
            "id": "RightArrowDiv",
            "classname": "RightArrowDiv"
        });
        ListingDiv.appendChild(RightArrowDiv);
        var pagesDiv = listing.createElement("div", {
            "id": "pagesDiv",
            "classname": "pagesDiv"
        });
        ListingDiv.appendChild(pagesDiv);
        var page = listing.createElement("div", {
            "id": "page",
            "classname": "page"
        });
        pagesDiv.appendChild(page);
        var pageDivider = listing.createElement("div", {
            "id": "pageDivider",
            "classname": "pageDivider"
        });
        pagesDiv.appendChild(pageDivider);
        var totalPages = listing.createElement("div", {
            "id": "totalPages",
            "classname": "totalPages"
        });
        pagesDiv.appendChild(totalPages);
        listing.ListingScreenContainerObj.create(mainDiv);
    }
};
listing.ListingContainerObj = new listing.ListingContainer();
listing.ListingScreenContainer = function () {
    this.create = function (mainDiv) {
        var gridsDiv = listing.createElement("div", {
            "id": "gridsDiv",
            "classname": "gridsDiv"
        });
        mainDiv.appendChild(gridsDiv);
        var namesDiv = listing.createElement("div", {
            "id": "namesDiv",
            "classname": "namesDiv"
        });
        mainDiv.appendChild(namesDiv);
        var detailDiv = listing.createElement("div", {
            "id": "detailDiv",
            "classname": "detailDiv"
        });
        mainDiv.appendChild(detailDiv);
        var footerArrow = listing.createElement("div", {
            "id": "footerArrow",
            "classname": "footerArrow"
        });
        mainDiv.appendChild(footerArrow);
        for (var loopVar = 0; loopVar < 3; loopVar++) {
            listing.ListingGridContainerObj.create(gridsDiv, loopVar);
        }
        listing.ListingDescriptionContainerobj.create(detailDiv);
    }
};
listing.ListingScreenContainerObj = new listing.ListingScreenContainer();
listing.ListingGridContainer = function () {
    this.create = function (gridsDiv, tag) {
        var gridDiv = listing.createElement("div", {
            "id": "gridDiv" + tag,
            "classname": "gridDiv" + tag
        });
        gridsDiv.appendChild(gridDiv);
        for (var loopVar = 0; loopVar < 3; loopVar++) {
            this.createGrids(gridDiv, tag, loopVar);
        }
    }
    this.createGrids = function (gridDiv, tag, loopVar) {
        var grids = listing.createElement("div", {
            "id": "grids" + tag + loopVar,
            "classname": "grids" + tag,
            "focus": false
        });
        gridDiv.appendChild(grids);
        var gridsCursorLeft = listing.createElement("div", {
            "id": "gridsCursorLeft" + tag + loopVar,
            "classname": "gridsCursorLeft" + tag
        });
        grids.appendChild(gridsCursorLeft);
        var gridsCursorTop = listing.createElement("div", {
            "id": "gridsCursorTop" + tag + loopVar,
            "classname": "gridsCursorTop" + tag
        });
        grids.appendChild(gridsCursorTop);
        var gridsCursorRight = listing.createElement("div", {
            "id": "gridsCursorRight" + tag + loopVar,
            "classname": "gridsCursorRight" + tag
        });
        grids.appendChild(gridsCursorRight);
        var gridsCursorBottom = listing.createElement("div", {
            "id": "gridsCursorBottom" + tag + loopVar,
            "classname": "gridsCursorBottom" + tag
        });
        grids.appendChild(gridsCursorBottom);
        var gridsLoadingText = listing.createElement("div", {
            "id": "gridsLoadingText" + tag + loopVar,
            "classname": "gridsLoadingText" + tag,
            "content": "Loading..."
        });
        grids.appendChild(gridsLoadingText);
        var gridsImg = listing.createElement("img", {
            "id": "gridsImg" + tag + loopVar,
            "classname": "gridsImg" + tag
        });
        grids.appendChild(gridsImg);
        gridsImg.onload = function () {
            gridsLoadingText.innerHTML = "";
            gridsImg.style.display = "block";
            gridsNames.style.display = "block";
            gridsNamesMask.style.display = "block";
        }
        gridsImg.onerror = function () {
            gridsImg.src = "images/listing/default_img.jpg";
            gridsImg.style.display = "block";
            gridsNames.style.display = "block";
            gridsNamesMask.style.display = "block";
        }
        var gridsMask = listing.createElement("div", {
            "id": "gridsMask" + tag + loopVar,
            "classname": "gridsMask" + tag
        });
        grids.appendChild(gridsMask);
        var gridsNames = listing.createElement("div", {
            "id": "gridsNames" + tag + loopVar,
            "classname": "gridsNames" + tag
        });
        grids.appendChild(gridsNames);
        var gridsNamesMask = listing.createElement("div", {
            "id": "gridsNamesMask" + tag + loopVar,
            "classname": "gridsNamesMask" + tag
        });
        grids.appendChild(gridsNamesMask);
    }
    this.check = function (a, b) {
        return ($("#grids" + a + (b + 1)).attr("focus"));
    }
    this.checkDown = function (a, b) {
        return ($("#grids" + a + b).attr("focus"));
    }
    this.restrict = function () {
        var temp = listing.tag + 1;
        var temp1 = listing.index;
        var temp2 = 0;
        for (temp1; temp1 <= 2; temp1++) {
            if (this.checkDown(temp, temp1)) {
                return true;
            } else {
                for (var loopVar = 0; loopVar <= 2; loopVar++) {
                    temp1--;
                    if (this.checkDown(temp, temp1)) {
                        this.leave_focus();
                        listing.index = temp1;
                        return true;
                    }
                }
                return false;
            }
        }
    }
    this.enableRightArrow = function () {
        document.getElementById("RightArrowDiv").setAttribute("class", "RightArrowDiv");
    }
    this.disableRightArrow = function () {
        document.getElementById("RightArrowDiv").setAttribute("class", "RightArrowDivChange");
    }
    this.enableLeftArrow = function () {
        document.getElementById("LeftArrowDiv").setAttribute("class", "LeftArrowDiv");
    }
    this.disableLeftArrow = function () {
        document.getElementById("LeftArrowDiv").setAttribute("class", "LeftArrowDivChange");
    }
    this.enter_focus = function () {
        document.getElementById("gridsCursorLeft" + listing.tag + listing.index).setAttribute("class", "gridsCursorLeft" + listing.tag + "Change");
        document.getElementById("gridsCursorTop" + listing.tag + listing.index).setAttribute("class", "gridsCursorTop" + listing.tag + "Change");
        document.getElementById("gridsCursorRight" + listing.tag + listing.index).setAttribute("class", "gridsCursorRight" + listing.tag + "Change");
        document.getElementById("gridsCursorBottom" + listing.tag + listing.index).setAttribute("class", "gridsCursorBottom" + listing.tag + "Change");
        document.getElementById("gridsMask" + listing.tag + listing.index).setAttribute("class", "gridsMask" + listing.tag + "Change");
        document.getElementById("gridsNames" + listing.tag + listing.index).setAttribute("class", "gridsNames" + listing.tag + "Change");
        document.getElementById("gridsNamesMask" + listing.tag + listing.index).setAttribute("class", "gridsNamesMask" + listing.tag + "Change");
        if (!main.isSearchScreen) {
            document.getElementById("detailsImg").setAttribute("src", "");
            $("#detailsImg").removeClass('detailsImgChange').addClass('detailsImg');
            $('#detailsImgLoadingText').css('display', 'block');
            document.getElementById("detailsImg").setAttribute("src", main.listResult.CardList[(3 * listing.tag) + listing.index].Thumb ? main.listResult.CardList[(3 * listing.tag) + listing.index].Thumb + "&resize_mode=4&width=560&height=378" : "images/listing/default_img.jpg");
            document.getElementById("detailsText").innerHTML = (main.listResult && main.listResult.CardList[(3 * listing.tag) + listing.index] && main.listResult.CardList[(3 * listing.tag) + listing.index].Tags) ? (((main.listResult && main.listResult.CardList[(3 * listing.tag) + listing.index] && main.listResult.CardList[(3 * listing.tag) + listing.index].Tags[1] && main.listResult.CardList[(3 * listing.tag) + listing.index].Tags[1].Text) ? ((main.listResult.CardList[(3 * listing.tag) + listing.index].Tags[0] && main.listResult.CardList[(3 * listing.tag) + listing.index].Tags[0].Text) ? main.listResult.CardList[(3 * listing.tag) + listing.index].Tags[0].Text + "," + " " + main.listResult.CardList[(3 * listing.tag) + listing.index].Tags[1].Text : "") : (main.listResult.CardList[(3 * listing.tag) + listing.index].Tags[0] && main.listResult.CardList[(3 * listing.tag) + listing.index].Tags[0].Text) ? main.listResult.CardList[(3 * listing.tag) + listing.index].Tags[0].Text : "")) : "";
            ($("#detailsText").html() == "" ? $("#detailsTextImg").css("visibility", "hidden") : $("#detailsTextImg").css("visibility", "visible"));
            if ($("#gridsNamesMask" + listing.tag + listing.index).html() == "") {
                document.getElementById("namesDiv").innerHTML = "";
            } else {
                document.getElementById("namesDiv").innerHTML = main.listResult.CardList[(3 * listing.tag) + listing.index].Title ? main.listResult.CardList[(3 * listing.tag) + listing.index].Title : (main.listResult.CardList[(3 * listing.tag) + listing.index].Caption ? main.listResult.CardList[(3 * listing.tag) + listing.index].Caption : "");
            }
            if (main.listResult.CardList[(3 * listing.tag) + listing.index] && main.listResult.CardList[(3 * listing.tag) + listing.index].Description) {
                $("#detailsImgLoadingText").removeClass('detailsImgLoadingTextChange').addClass('detailsImgLoadingText');
                $("#detailsImgDiv").removeClass('detailsImgDivChange').addClass('detailsImgDiv');
                $("#detailsImgShadow").removeClass('detailsImgShadowChange').addClass('detailsImgShadow');
                var listingDescription = main.listResult.CardList[(3 * listing.tag) + listing.index].Description;
                listingDescription = home.homeObj.setOmitter(listingDescription, 254.8, 550, 26, true);
                document.getElementById("detailsDescripInnerDiv").innerHTML = listingDescription;
            } else {
                $("#detailsImgLoadingText").removeClass('detailsImgLoadingText').addClass('detailsImgLoadingTextChange');
                $("#detailsImgDiv").removeClass('detailsImgDiv').addClass('detailsImgDivChange');
                $("#detailsImgShadow").removeClass('detailsImgShadow').addClass('detailsImgShadowChange');
                document.getElementById("detailsDescripInnerDiv").innerHTML = "";
            }
        } else {
            document.getElementById("detailsImg").setAttribute("src", "");
            $("#detailsImg").removeClass('detailsImgChange').addClass('detailsImg');
            $('#detailsImgLoadingText').css('display', 'block');
            document.getElementById("detailsImg").setAttribute("src", main.jsonObj.CardList[(3 * listing.tag) + listing.index].Thumb ? main.jsonObj.CardList[(3 * listing.tag) + listing.index].Thumb + "&resize_mode=4&width=560&height=378" : "images/listing/default_img.jpg");
            document.getElementById("detailsText").innerHTML = (main.jsonObj && main.jsonObj.CardList[(3 * listing.tag) + listing.index] && main.jsonObj.CardList[(3 * listing.tag) + listing.index].Tags) ? (((main.jsonObj && main.jsonObj.CardList[(3 * listing.tag) + listing.index] && main.jsonObj.CardList[(3 * listing.tag) + listing.index].Tags[1] && main.jsonObj.CardList[(3 * listing.tag) + listing.index].Tags[1].Text) ? ((main.jsonObj.CardList[(3 * listing.tag) + listing.index].Tags[0] && main.jsonObj.CardList[(3 * listing.tag) + listing.index].Tags[0].Text) ? main.jsonObj.CardList[(3 * listing.tag) + listing.index].Tags[0].Text + "," + " " + main.jsonObj.CardList[(3 * listing.tag) + listing.index].Tags[1].Text : "") : (main.jsonObj.CardList[(3 * listing.tag) + listing.index].Tags[0] && main.jsonObj.CardList[(3 * listing.tag) + listing.index].Tags[0].Text) ? main.jsonObj.CardList[(3 * listing.tag) + listing.index].Tags[0].Text : "")) : "";
            ($("#detailsText").html() == "" ? $("#detailsTextImg").css("visibility", "hidden") : $("#detailsTextImg").css("visibility", "visible"));
            if ($("#gridsNamesMask" + listing.tag + listing.index).html() == "") {
                document.getElementById("namesDiv").innerHTML = "";
            } else {
                document.getElementById("namesDiv").innerHTML = main.jsonObj.CardList[(3 * listing.tag) + listing.index].Title ? main.jsonObj.CardList[(3 * listing.tag) + listing.index].Title : (main.jsonObj.CardList[(3 * listing.tag) + listing.index].Caption ? main.jsonObj.CardList[(3 * listing.tag) + listing.index].Caption : "");
            }
            if (main.jsonObj.CardList[(3 * listing.tag) + listing.index] && main.jsonObj.CardList[(3 * listing.tag) + listing.index].Description && main.jsonObj.CardList[(3 * listing.tag) + listing.index].Description) {
                $("#detailsImgLoadingText").removeClass('detailsImgLoadingTextChange').addClass('detailsImgLoadingText');
                $("#detailsImgDiv").removeClass('detailsImgDivChange').addClass('detailsImgDiv');
                $("#detailsImgShadow").removeClass('detailsImgShadowChange').addClass('detailsImgShadow');
                var listingDescription = main.jsonObj.CardList[(3 * listing.tag) + listing.index].Description;
                listingDescription = home.homeObj.setOmitter(listingDescription, 254.8, 550, 26, true);
                document.getElementById("detailsDescripInnerDiv").innerHTML = listingDescription;
            } else {
                $("#detailsImgLoadingText").removeClass('detailsImgLoadingText').addClass('detailsImgLoadingTextChange');
                $("#detailsImgDiv").removeClass('detailsImgDiv').addClass('detailsImgDivChange');
                $("#detailsImgShadow").removeClass('detailsImgShadow').addClass('detailsImgShadowChange');
                document.getElementById("detailsDescripInnerDiv").innerHTML = "";
            }
        }
    }
    this.leave_focus = function () {
        document.getElementById("gridsCursorLeft" + listing.tag + listing.index).setAttribute("class", "gridsCursorLeft" + listing.tag);
        document.getElementById("gridsCursorTop" + listing.tag + listing.index).setAttribute("class", "gridsCursorTop" + listing.tag);
        document.getElementById("gridsCursorRight" + listing.tag + listing.index).setAttribute("class", "gridsCursorRight" + listing.tag);
        document.getElementById("gridsCursorBottom" + listing.tag + listing.index).setAttribute("class", "gridsCursorBottom" + listing.tag);
        document.getElementById("gridsMask" + listing.tag + listing.index).setAttribute("class", "gridsMask" + listing.tag);
        document.getElementById("gridsNames" + listing.tag + listing.index).setAttribute("class", "gridsNames" + listing.tag);
        document.getElementById("gridsNamesMask" + listing.tag + listing.index).setAttribute("class", "gridsNamesMask" + listing.tag);
    }
    this.KeyboardEvent = function (e) {
        switch (e) {
            case "arrowleft":
                if (!main.isSearchScreen) {
                    if (listing.index != 0) {
                        this.leave_focus();
                        listing.index--;
                        this.enter_focus();
                    } else if (listing.currentPage > 1) {
                        listing.currentPage -= 1;
                        if (!main.isSearchScreen) {
                            listing.prevPage();
                        }
                    }
                } else {
                    if (listing.index != 0) {
                        this.leave_focus();
                        listing.index--;
                        this.enter_focus();
                    } else if (search.currentPage > 1) {
                        search.currentPage -= 1;
                        listing.prevPage();
                    }
                }
                break;
            case "arrowright":
                if (!main.isSearchScreen) {
                    if (listing.index != 2 && this.check(listing.tag, listing.index)) {
                        this.leave_focus();
                        listing.index++;
                        this.enter_focus();
                    } else if (listing.currentPage < listing.totalPages) {
                        listing.currentPage += 1;
                        listing.nextPage();
                    }
                } else {
                    if (listing.index != 2 && this.check(listing.tag, listing.index)) {
                        this.leave_focus();
                        listing.index++;
                        this.enter_focus();
                    } else if (search.currentPage < search.totalPages) {
                        search.currentPage += 1;
                        listing.nextPage();
                    }
                }
                break;
            case "arrowup":
                if (listing.tag == 0) {
                    this.leave_focus();
                    if (main.isSearchScreen) {
                        main.focusedDom = home.searchObj;
                        main.focusedDom.enter_focus();
                    } else {
                        main.focusedDom = home.menuObj;
                        home.menuObj.enter_focus();
                    }
                    break;
                } else if (listing.tag == 1) {
                    this.leave_focus();
                    listing.tag = 0;
                    this.enter_focus();
                } else if (listing.tag == 2) {
                    this.leave_focus();
                    listing.tag = 1;
                    this.enter_focus();
                }
                break;
            case "arrowdown":
                if (listing.tag == 0 && this.restrict()) {
                    this.leave_focus();
                    listing.tag = 1;
                    this.enter_focus();
                } else if (listing.tag == 1 && this.restrict()) {
                    this.leave_focus();
                    listing.tag = 2;
                    this.enter_focus();
                } else if (listing.tag == 2) {
                    break;
                }
                break;
            case "ok":
                if (main.isSearchScreen) {
                    if (main.jsonObj.CardList[(3 * listing.tag) + listing.index].Msid === "00000") {
                        error.errorObj.createMask();
                        error.errorObj.screenCreate('No details available.');
                        error.errorObj.isDetailError = true;
                        error.errorObj.isError = false;
                        main.focusedDom = listing.ListingGridContainerObj;
                        main.focusedDom.leave_focus();
                        main.prevFocus = main.focusedDom;
                        break;
                    }
                } else {
                    if (main.listResult.CardList[(3 * listing.tag) + listing.index].Msid === "00000") {
                        error.errorObj.createMask();
                        error.errorObj.screenCreate('No details available.');
                        error.errorObj.isDetailError = true;
                        error.errorObj.isError = false;
                        main.focusedDom = listing.ListingGridContainerObj;
                        main.focusedDom.leave_focus();
                        main.prevFocus = main.focusedDom;
                        break;
                    }
                }
                if (getDetailUrl()) {
                    detail.getDetailResponse(getDetailUrl());
                    home.searchObj.leave_focus();
                }
                break;
            case "return":
                if (main.isSearchScreen) {
                    home.thumbnailObj.animation = false;
                    main.searchGridsObj.free();
                    home.menuObj.cursorMenuId = 0;
                    home.menuObj.selectedMenuId = home.menuObj.cursorMenuId;
                    home.thumbnailObj.normalId = 0;
                    listing.tag = 0;
                    listing.index = 0;
                    home.menuObj.create();
                    home.menuObj.getApiData();
                    return true;
                }
                break;
        }
    }
};
listing.ListingGridContainerObj = new listing.ListingGridContainer();
listing.ListingDescriptionContainer = function () {
    this.create = function (detailDiv) {
        var detailsTextImg = listing.createElement("div", {
            "id": "detailsTextImg",
            "classname": "detailsTextImg"
        });
        detailDiv.appendChild(detailsTextImg);
        var detailsText = listing.createElement("div", {
            "id": "detailsText",
            "classname": "detailsText"
        });
        detailDiv.appendChild(detailsText);
        var detailsImgShadow = listing.createElement("div", {
            "id": "detailsImgShadow",
            "classname": "detailsImgShadow"
        });
        detailDiv.appendChild(detailsImgShadow);
        var detailsImgDiv = listing.createElement("div", {
            "id": "detailsImgDiv",
            "classname": "detailsImgDiv"
        });
        detailDiv.appendChild(detailsImgDiv);
        var detailsImgLoadingText = listing.createElement("div", {
            "id": "detailsImgLoadingText",
            "classname": "detailsImgLoadingText",
            "content": "Loading..."
        });
        detailDiv.appendChild(detailsImgLoadingText);
        var detailsImg = listing.createElement("img", {
            "id": "detailsImg",
            "classname": "detailsImg"
        });
        detailsImgDiv.appendChild(detailsImg);
        detailsImg.onload = function () {
            $('#detailsImgLoadingText').css('display', 'none');
            $("#detailsImg").removeClass('detailsImg').addClass('detailsImgChange');
        }
        detailsImg.onerror = function () {
            detailsImg.src = "images/listing/default_img.jpg";
        }
        var detailsDescripOuterDiv = listing.createElement("div", {
            "id": "detailsDescripOuterDiv",
            "classname": "detailsDescripOuterDiv"
        });
        detailDiv.appendChild(detailsDescripOuterDiv);
        var detailsDescripInnerDiv = listing.createElement("div", {
            "id": "detailsDescripInnerDiv",
            "classname": "detailsDescripInnerDiv"
        });
        detailsDescripOuterDiv.appendChild(detailsDescripInnerDiv);
    }
};
listing.ListingDescriptionContainerobj = new listing.ListingDescriptionContainer();
listing.setData = function () {
    var limit;
    var subLimit;
    if (listing.currentPage == listing.totalPages) {
        limit = Math.ceil(main.listResult.CardList.length / 3);
    } else {
        limit = 3;
    }
    for (var tag = 0; tag < limit; tag++) {
        switch (tag) {
            case 0:
                if (listing.currentPage == listing.totalPages) {
                    if (main.listResult.CardList.length >= 3) {
                        subLimit = 3;
                    } else {
                        subLimit = main.listResult.CardList.length % 3;
                    }
                } else {
                    subLimit = 3;
                }
                break;
            case 1:
                if (listing.currentPage == listing.totalPages) {
                    if (main.listResult.CardList.length >= 6) {
                        subLimit = 3;
                    } else {
                        subLimit = main.listResult.CardList.length % 3;
                    }
                } else {
                    subLimit = 3;
                }
                break;
            case 2:
                if (listing.currentPage == listing.totalPages) {
                    if (main.listResult.CardList.length % 3 == 0) {
                        subLimit = 3;
                    } else {
                        subLimit = main.listResult.CardList.length % 3;
                    }
                } else {
                    subLimit = 3;
                }
                break;
        }
        for (var loopVar = 0; loopVar < subLimit; loopVar++) {
            document.getElementById("gridsImg" + tag + loopVar).setAttribute("src", main.listResult.CardList[(3 * tag) + loopVar] && main.listResult.CardList[(3 * tag) + loopVar].Thumb ? main.listResult.CardList[(3 * tag) + loopVar].Thumb + "&resize_mode=4&width=379&height=253" : "images/listing/default_img.jpg");
            document.getElementById("gridsImg" + tag + loopVar).setAttribute("src", main.listResult.CardList[(3 * tag) + loopVar] && main.listResult.CardList[(3 * tag) + loopVar].Thumb ? main.listResult.CardList[(3 * tag) + loopVar].Thumb + "&resize_mode=4&width=379&height=253" : "images/listing/default_img.jpg");
            document.getElementById("gridsImg" + tag + loopVar).setAttribute("src", main.listResult.CardList[(3 * tag) + loopVar] && main.listResult.CardList[(3 * tag) + loopVar].Thumb ? main.listResult.CardList[(3 * tag) + loopVar].Thumb + "&resize_mode=4&width=379&height=253" : "images/listing/default_img.jpg");
            document.getElementById("gridsNamesMask" + tag + loopVar).innerHTML = main.listResult.CardList[(3 * tag) + loopVar] && main.listResult.CardList[(3 * tag) + loopVar].Title ? main.listResult.CardList[(3 * tag) + loopVar].Title : (main.listResult.CardList[(3 * tag) + loopVar].Caption ? main.listResult.CardList[(3 * tag) + loopVar].Caption : "");
            document.getElementById("gridsNamesMask" + tag + loopVar).innerHTML = main.listResult.CardList[(3 * tag) + loopVar] && main.listResult.CardList[(3 * tag) + loopVar].Title ? main.listResult.CardList[(3 * tag) + loopVar].Title : (main.listResult.CardList[(3 * tag) + loopVar].Caption ? main.listResult.CardList[(3 * tag) + loopVar].Caption : "");
            document.getElementById("gridsNamesMask" + tag + loopVar).innerHTML = main.listResult.CardList[(3 * tag) + loopVar] && main.listResult.CardList[(3 * tag) + loopVar].Title ? main.listResult.CardList[(3 * tag) + loopVar].Title : (main.listResult.CardList[(3 * tag) + loopVar].Caption ? main.listResult.CardList[(3 * tag) + loopVar].Caption : "");
            document.getElementById("grids" + tag + loopVar).setAttribute("focus", true);
        }
    }
    if (listing.nextPageVar) {
        listing.index = 0;
        if (listing.currentPage >= listing.totalPages) {
            if (listing.tag !== 0) {
                if (!$("#grids" + listing.tag + listing.index).attr("focus")) {
                    listing.tag -= 1;
                    if (!$("#grids" + listing.tag + listing.index).attr("focus")) {
                        listing.tag -= 1;
                    }
                }
            }
        }
        listing.nextPageVar = false;
    }
    document.getElementById("detailsImg").setAttribute("src", main.listResult.CardList[(3 * listing.tag) + listing.index].Thumb ? main.listResult.CardList[(3 * listing.tag) + listing.index].Thumb + "&resize_mode=4&width=560&height=378" : "images/listing/default_img.jpg");
    document.getElementById("detailsText").innerHTML = (main.listResult && main.listResult.CardList[(3 * listing.tag) + listing.index] && main.listResult.CardList[(3 * listing.tag) + listing.index].Tags) ? (((main.listResult && main.listResult.CardList[(3 * listing.tag) + listing.index] && main.listResult.CardList[(3 * listing.tag) + listing.index].Tags[1] && main.listResult.CardList[(3 * listing.tag) + listing.index].Tags[1].Text) ? ((main.listResult.CardList[(3 * listing.tag) + listing.index].Tags[0] && main.listResult.CardList[(3 * listing.tag) + listing.index].Tags[0].Text) ? main.listResult.CardList[(3 * listing.tag) + listing.index].Tags[0].Text + "," + " " + main.listResult.CardList[(3 * listing.tag) + listing.index].Tags[1].Text : "") : (main.listResult.CardList[(3 * listing.tag) + listing.index].Tags[0] && main.listResult.CardList[(3 * listing.tag) + listing.index].Tags[0].Text) ? main.listResult.CardList[(3 * listing.tag) + listing.index].Tags[0].Text : "")) : "";
    ($("#detailsText").html() == "" ? $("#detailsTextImg").css("visibility", "hidden") : $("#detailsTextImg").css("visibility", "visible"));
    if ($("#gridsNamesMask" + listing.tag + listing.index).html() == "") {
        document.getElementById("namesDiv").innerHTML = "";
    } else {
        document.getElementById("namesDiv").innerHTML = main.listResult.CardList[(3 * listing.tag) + listing.index].Title ? main.listResult.CardList[(3 * listing.tag) + listing.index].Title : (main.listResult.CardList[(3 * listing.tag) + listing.index].Caption ? main.listResult.CardList[(3 * listing.tag) + listing.index].Caption : "");
    }
    if (main.listResult.CardList[(3 * listing.tag) + listing.index] && main.listResult.CardList[(3 * listing.tag) + listing.index].Description) {
        $("#detailsImgLoadingText").removeClass('detailsImgLoadingTextChange').addClass('detailsImgLoadingText');
        $("#detailsImgDiv").removeClass('detailsImgDivChange').addClass('detailsImgDiv');
        $("#detailsImgShadow").removeClass('detailsImgShadowChange').addClass('detailsImgShadow');
        var listingDescription = main.listResult.CardList[(3 * listing.tag) + listing.index].Description;
        listingDescription = home.homeObj.setOmitter(listingDescription, 254.8, 550, 26, true);
        document.getElementById("detailsDescripInnerDiv").innerHTML = listingDescription;
    } else {
        $("#detailsImgLoadingText").removeClass('detailsImgLoadingText').addClass('detailsImgLoadingTextChange');
        $("#detailsImgDiv").removeClass('detailsImgDiv').addClass('detailsImgDivChange');
        $("#detailsImgShadow").removeClass('detailsImgShadow').addClass('detailsImgShadowChange');
        document.getElementById("detailsDescripInnerDiv").innerHTML = "";
    }
    for (var tag = 0; tag < 3; tag++) {
        for (var loopVar = -1; loopVar < 2; loopVar++) {
            if (!listing.ListingGridContainerObj.check(tag, loopVar)) {
                document.getElementById("gridsImg" + tag + (loopVar + 1)).setAttribute("src", "images/listing/coming_soon_img.png");
                $("#gridsNames" + tag + (loopVar + 1)).remove();
            }
        }
    }
    if (listing.currentPage == 1) {
        listing.ListingGridContainerObj.disableLeftArrow();
    }
    if (listing.currentPage == listing.totalPages) {
        listing.ListingGridContainerObj.disableRightArrow();
    } else {
        listing.ListingGridContainerObj.enableRightArrow();
    }
    if (listing.currentPage == 2) {
        listing.ListingGridContainerObj.enableLeftArrow();
    }
    document.getElementById("page").innerHTML = listing.currentPage;
    document.getElementById("totalPages").innerHTML = listing.totalPages;
}
main.searchGrids = function () {
    this.free = function () {
        $("#ListingDiv").remove();
        $("#ListingDivMask").remove();
        $("#searchTextDiv").remove();
        $("#searchInputDiv").remove();
        $("#searchReturnDiv").remove();
        $("#searchReturnImgDiv").remove();
    }
}
main.searchGridsObj = new main.searchGrids();
error.ErrorContainer = function () {
    this.isError = false;
    this.isDetailError = false;
    this.isSplashError = false;
    this.splashCreate = function (message) {
        this.isSplashError = true;
        main.isLoading = false;
        main.splashScreen.stopCount();
        $('#splashBlock').empty();;
        var errorContainer = home.homeObj.createElement('div', {
            'id': 'errorContainer'
        });
        $('#splashBlock').append(errorContainer);
        var errorPopUp = home.homeObj.createElement('div', {
            'id': 'errorPopUp'
        });
        $(errorContainer).append(errorPopUp);
        var errorImage = home.homeObj.createElement('div', {
            'id': 'errorImage'
        });
        $(errorPopUp).append(errorImage);
        var errorText = home.homeObj.createElement('div', {
            'id': 'errorText',
            'content': message
        });
        $(errorPopUp).append(errorText);
    };
    this.searchCreate = function (message) {
        var errorSearchContainer = home.homeObj.createElement('div', {
            'id': 'errorSearchContainer'
        });
        $('#wrapper').append(errorSearchContainer);
        var errorPopUp = home.homeObj.createElement('div', {
            'id': 'errorPopUp'
        });
        $(errorSearchContainer).append(errorPopUp);
        var errorImage = home.homeObj.createElement('div', {
            'id': 'errorImage'
        });
        $(errorPopUp).append(errorImage);
        var errorSearchText = home.homeObj.createElement('div', {
            'id': 'errorSearchText',
            'content': "No results found for"
        });
        $(errorPopUp).append(errorSearchText);
        var errorSearchTextNext = home.homeObj.createElement('div', {
            'id': 'errorSearchTextNext',
            'content': message
        });
        $(errorPopUp).append(errorSearchTextNext);
        main.isLoading = false;
        $('#footerAnim').css('display', 'none');
    };
    this.createMask = function () {
        var errorScreenBackground = home.homeObj.createElement('div', {
            'classname': 'errorScreenBackground'
        });
        $('#contentSection').append(errorScreenBackground);
    }
    this.screenCreate = function (message) {
        var errorScreen = home.homeObj.createElement('div', {
            'classname': 'errorScreen'
        });
        $('#contentSection').append(errorScreen);
        var errorScreenPopUp = home.homeObj.createElement('div', {
            'id': 'errorScreenPopUp'
        });
        $(errorScreen).append(errorScreenPopUp);
        var errorScreenImage = home.homeObj.createElement('div', {
            'id': 'errorScreenImage'
        });
        $(errorScreenPopUp).append(errorScreenImage);
        var errorText = home.homeObj.createElement('div', {
            'id': 'errorText',
            'content': message
        });
        $(errorScreenPopUp).append(errorText);
        if (!error.errorObj.isDetailError && ($('.errorScreenBackground').length <= 0)) {
            if (!main.isSearchScreen) {
                main.focusedDom = home.menuObj;
                main.loading.Off();
                home.menuObj.error = true;
                this.isError = true;
            } else {
                main.focusedDom = home.searchObj;
                main.loading.Off();
                home.menuObj.error = true;
                this.isError = true;
            }
            main.prevFocus = main.focusedDom;
            main.focusedDom.enter_focus();
        } else {
            main.loading.Off();
            home.menuObj.error = true;
            this.isError = true;
        }
    };
    this.contentCreate = function (contentId, message) {
        var objectId = document.getElementById(contentId);
        objectId.innerHTML = '';
        var errorContent = home.homeObj.createElement('div', {
            'classname': 'errorContent'
        });
        objectId.appendChild(errorContent);
        $(errorContent).css({
            'width': $(objectId).width() + 'px',
            'height': $(objectId).height() + 'px'
        });
        var errorContentPopUp = home.homeObj.createElement('div', {
            'id': 'errorContentPopUp'
        });
        $(errorContent).append(errorContentPopUp);
        $(errorContentPopUp).css('max-width', $(errorContent).width());
        var errorImage = home.homeObj.createElement('div', {
            'id': 'errorImage'
        });
        $(errorContentPopUp).append(errorImage);
        var errorText = home.homeObj.createElement('div', {
            'id': 'errorText',
            'content': message,
            'classname': 'errorClass'
        });
        $(errorContentPopUp).append(errorText);
    };
    this.splashFree = function () {
        $('#errorContainer').remove();
        this.isSplashError = false;
    };
    this.screenFree = function () {
        home.thumbnailObj.error = false;
        $('.errorScreen').remove();
    };
    this.freeMask = function () {
        $('.errorScreenBackground').remove();
    }
    this.searchFree = function () {
        $('#errorSearchContainer').remove();
    };
}
error.errorObj = new error.ErrorContainer();
exit.ExitContainer = function () {
    var exitId = 0;
    this.isVisible = false;
    (function () {
        var exitScreenContainer = home.homeObj.createElement('div', {
            'id': 'exitScreenContainer'
        });
        $('#wrapper').append(exitScreenContainer);
        var exitScreen = home.homeObj.createElement('div', {
            'id': 'exitScreen'
        });
        $(exitScreenContainer).append(exitScreen);
        var exitPopUp = home.homeObj.createElement('div', {
            'id': 'exitPopUp'
        });
        $(exitScreenContainer).append(exitPopUp);
        var exitLogo = home.homeObj.createElement('div', {
            'id': 'exitLogo'
        });
        $(exitPopUp).append(exitLogo);
        var exitTopImage = home.homeObj.createElement('div', {
            'id': 'exitTopImage'
        });
        $(exitPopUp).append(exitTopImage);
        var exitText = home.homeObj.createElement('div', {
            'classname': 'exitText',
            'id': 'exitText',
            'content': 'Do you want to exit the application ?'
        });
        $(exitPopUp).append(exitText);
        var exitYes = home.homeObj.createElement('div', {
            'classname': 'exitOption exitHover',
            'id': 'exit0',
            'content': 'YES'
        });
        $(exitPopUp).append(exitYes);
        var exitNo = home.homeObj.createElement('div', {
            'classname': 'exitOption exitNormal',
            'id': 'exit1',
            'content': 'NO'
        });
        $(exitPopUp).append(exitNo);
        var exitFlightImage = home.homeObj.createElement('div', {
            'id': 'exitFlightImage'
        });
        $(exitScreenContainer).append(exitFlightImage);
        var exitFooter = home.homeObj.createElement('div', {
            'id': 'exitFooter'
        });
        $(exitScreenContainer).append(exitFooter);
        $('#exitScreenContainer').hide();
    })();
    this.appear = function () {
        $('#exitScreenContainer').show();
        enter_focus();
        main.prevFocus = main.focusedDom;
        main.focusedDom = exit.exitObj;
        this.isVisible = true;
        if ($('#menuItem' + home.menuObj.selectedMenuId).text().toUpperCase() === 'HOME') {
            if (home.thumbnailObj.animation) {
                home.thumbnailObj.stopCount();
            }
        }
    };
    var enter_focus = function () {
        $('#exit' + exitId).removeClass('exitNormal');
        $('#exit' + exitId).addClass('exitHover');
    };
    var leave_focus = function () {
        $('#exit' + exitId).addClass('exitNormal');
        $('#exit' + exitId).removeClass('exitHover');
    };
    this.KeyboardEvent = function (key, eventType) {
        switch (eventType) {
            case "keydown":
                switch (key) {
                    case "arrowleft":
                        leave_focus();
                        if (exitId == 1) {
                            exitId = 0;
                        } else {
                            exitId = 1;
                        }
                        enter_focus();
                        return true;
                        break;
                    case "arrowright":
                        leave_focus();
                        if (exitId == 0) {
                            exitId = 1;
                        } else {
                            exitId = 0;
                        }
                        enter_focus();
                        return true;
                        break;
                    case 'ok':
                        if (exitId == 0) {
                            window.history.back();
                        } else {
                            this.free();
                        }
                        return true;
                        break;
                    case 'return':
                        this.free();
                        if (error.errorObj.isError) {
                            main.focusedDom = main.prevFocus;
                            main.focusedDom.enter_focus();
                        }
                        return true;
                        break;
                    default:
                        break;
                }
        }
    };
    this.free = function () {
        $('#exitScreenContainer').hide();
        leave_focus();
        main.focusedDom = main.prevFocus;
        main.focusedDom.enter_focus();
        exitId = 0;
        this.isVisible = false;
        if ($('#menuItem' + home.menuObj.selectedMenuId).text().toUpperCase() === 'HOME') {
            if (home.thumbnailObj.animation) {
                home.thumbnailObj.startCount();
            }
        }
        return;
    };
}
exit.exitObj = new exit.ExitContainer();
main.MainKeyboardEvent = function (e, eventType) {
    var target = main.target(e),
        keyCode = target.keyCode,
        key = main.keyCodeDic[keyCode];
    e.preventDefault();
    if (main.isDetail) {
        clearTimeout(detail.callout);
    }
    if (main.ajaxOn && key == 'return' && !main.isDetail) {
        main.ajaxAbort = true;
        main.xhr.abort();
        if (!main.isSearchScreen) {
            $('#searchTextBox').val("");
            $('#searchText').html('Search happytrips');
        } else {
            document.getElementById('searchReturnDiv').innerHTML = "Return To menu";
        }
        main.loading.Off();
        if ($('.errorScreenBackground').length > 0) {
            error.errorObj.screenFree();
            error.errorObj.freeMask();
            main.focusedDom = main.prevFocus;
            main.focusedDom.enter_focus();
            if (main.pagination) {
                if (!main.isSearchScreen) {
                    listing.currentPage = listing.previousPage;
                } else {
                    search.currentPage = search.prevCurrentPage;
                }
                main.focusedDom.leave_focus();
                if (main.prevPageVar) {
                    if (listing.nextPageVar) {
                        listing.index = 2;
                    } else {
                        listing.index = 0;
                        main.prevPageVar = false;
                    }
                }
                main.focusedDom.enter_focus();
                error.errorObj.isError = false;
                error.errorObj.isDetailError = false;
                main.pagination = false;
                return true;
            }
        } else {
            return true;
        }
    }
    if (this.isLoading && main.focusedDom != detail.mapObj) {
        if (isSplashScreen && key == 'return') {
            window.history.back();
        }
        return true;
    } else if (this.isLoading && main.focusedDom == detail.mapObj && key == 'return') {
        main.loading.Off();
        detail.mapObj.free();
        (detail.Slideprevmap === detail.subMenu && !detail.fromSub ? detail.submenuOn = true : detail.submenuOn = false);
        (detail.Slideprevmap === detail.subMenu && detail.submenuOn ? detail.subMenu.slideOpen() : detail.Slideprevmap.enter_focus());
        detail.Slideprevmap = null;
        main.mapRet = true;
        return false;
    } else if (this.isLoading && main.focusedDom == detail.mapObj && key != 'return') {
        return true;
    }
    if (!error.errorObj.isError && !error.errorObj.isDetailError && !error.errorObj.isSplashError && !exit.exitObj.isVisible) {
        error.errorObj.freeMask();
        error.errorObj.screenFree();
        home.menuObj.error = false;
        listing.nextPageVar = false;
    } else if (!error.errorObj.isError && error.errorObj.isDetailError && !error.errorObj.isSplashError && !exit.exitObj.isVisible) {
        listing.nextPageVar = false;
        error.errorObj.freeMask();
        error.errorObj.screenFree();
        error.errorObj.isDetailError = false;
        home.menuObj.error = false;
        main.focusedDom = main.prevFocus;
        main.focusedDom.enter_focus();
        return true;
    }
    if (main.focusedDom && main.focusedDom.KeyboardEvent && main.focusedDom.KeyboardEvent(key, eventType)) {
        return true;
    }
    switch (eventType) {
        case "keydown":
            switch (key) {
                case "arrowdown":
                    break;
                case "arrowup":
                    break;
                case "ok":
                    break;
                case "yellow":
                    e.preventDefault();
                    if (main.isDetail && detail.map) {
                        detail.Slideprevmap = main.focusedDom;
                        $(".splash").removeClass("splashImageLoading").addClass("mapImageLoading");
                        $(".loading").css("color", "rgb(39, 136, 23)");
                        $("#hotKeyObj_2").bind("transitionend webkitTransitionEnd", function () {
                            main.isLoading = false;
                            $("#hotKeyObj_2").removeClass("hotAnim");
                            detail.Slideprevmap.leave_focus();
                            (main.focusedDom == detail.subMenu && $("#subMenuSlider").css("margin-left") < "0px" ? detail.fromSub = true : detail.fromSub = false);
                            (detail.fromSub == false ? detail.submenuOn = false : detail.submenuOn = true);
                            if (main.focusedDom == detail.subMenu && $("#subMenuSlider").css("margin-left") == "0px") {
                                main.isLoading = true;
                                $("#subMenuSlider").removeClass("sliderZero");
                                $("#subMenuSlider").addClass("submenuLeft");
                                $(".subArrCont").css("margin-left", "-236px");
                                $(".subArrContBg").css("margin-left", "-236px");
                                $("#subMenuArr").css("-webkit-transform", "rotate(0deg)");
                                detail.subMenu.leave_focus();
                            }
                            detail.mapObj.createMap();
                        });
                        main.isLoading = true;
                        $("#hotKeyObj_2").addClass("hotAnim");
                    }
                    break;
                case "blue":
                    e.preventDefault();
                    if (main.isDetail && detail.guide && $("#subMenuSlider").length > 0) {
                        main.isLoading = true;
                        ($("#subMenuSlider").css("margin-left") < "0px" ? detail.subMenu.slideOpen() : detail.subMenu.slideClose());
                    }
                    break;
                case "red":
                    if (main.isDetail && !$("#hotKeyObj_0").hasClass("hotKeyDisabled_0")) {
                        detail.scroolVal = false;
                        if (detail.pageDetails.currentPg !== 1) {
                            $("#hotKeyObj_0").bind("transitionend webkitTransitionEnd", function () {
                                main.isLoading = false;
                                if (detail.pageDetails.currentPg == 2 && !$("#hotKeyObj_0").hasClass("hotAnim") && detail.scroolVal) {
                                    detail.descObj.scrollDown();
                                    detail.scroolVal = false;
                                }
                                $("#hotKeyObj_0").removeClass("hotAnim");
                            });
                            main.isLoading = true;
                            $("#hotKeyObj_0").addClass("hotAnim");
                            if (detail.pageDetails.currentPg != 2 && $("#hotKeyObj_0").hasClass("hotAnim")) {
                                detail.descObj.scrollDown();
                            } else {
                                detail.scroolVal = true;
                            }
                        }
                    }
                    break;
                case "green":
                    if (main.isDetail && !$("#hotKeyObj_1").hasClass("hotKeyDisabled_1")) {
                        detail.scroolVal = false;
                        if (detail.pageDetails.currentPg !== detail.pageDetails.totalPage) {
                            $("#hotKeyObj_1").bind("transitionend webkitTransitionEnd", function () {
                                if (detail.pageDetails.currentPg == detail.pageDetails.totalPage - 1 && !$("#hotKeyObj_1").hasClass("hotAnim") && detail.scroolVal) {
                                    detail.descObj.scrollUp();
                                    detail.scroolVal = false;
                                } else {
                                    $("#hotKeyObj_1").removeClass("hotAnim");
                                }
                            });
                            main.isLoading = true;
                            $("#hotKeyObj_1").addClass("hotAnim");
                            if (detail.pageDetails.currentPg != detail.pageDetails.totalPage - 1) {
                                detail.descObj.scrollUp();
                            } else {
                                detail.scroolVal = true;
                            }
                        }
                    }
                    break;
                case "return":
                    if (error.errorObj.isSplashError && !error.errorObj.isError) {
                        window.history.back();
                        error.errorObj.splashFree();
                        return true;
                    } else if (main.isDetail) {
                        detail.galleryObj.freeOnReturn();
                        if (main.focusedDom == home.menuObj) {
                            main.focusedDom.leave_focus();
                        }
                        error.errorObj.isError = false;
                        home.homeObj.create();
                        home.searchObj.leave_focus();
                        if (main.isSearchScreen) {
                            document.getElementById('searchReturnDiv').innerHTML = "Return To Menu";
                        }
                        return true;
                    }
                    if (!exit.exitObj.isVisible && !main.isDetail) {
                        if (!main.isSearchScreen) {
                            main.focusedDom.leave_focus();
                            main.prevFocus = main.focusedDom;
                            exit.exitObj.appear();
                        }
                        home.searchObj.leave_focus();
                        return true;
                    }
                    break;
            }
            return true;
    }
    return true;
};
document.onkeydown = function (e) {
    "use strict";
    main.MainKeyboardEvent(e, "keydown");
};