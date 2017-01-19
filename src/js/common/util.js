/**
 * post方法
 *
 * @param confObj
 * @returns {boolean}
 */
export default function post(confObj) {
    if (typeof confObj == "undefined") {
        confObj = {};
    }
    if (typeof confObj.commonUrl == 'undefined') {
        confObj.data.codeFlag = '1';
    }
    var defConf = {
        supportCors: true,
        commonUrl: null,
        needJson: true,
        url: "",
        data: {},
        timeout: 50000,
        async: true,
        crossDomain: true,
        headers: {
            Accept: "application/json; charset=utf-8"
        },
        //contentType : "application/json",
        success: function (data) {

        },
        error: function (xml, XMLHttpRequest, errMsg, e) {
            return false;
        }
    };
    var setting = $.extend(true, defConf, confObj);
    if (!setting.url) {
        return false;
    }
    jQuery.support.cors = setting.supportCors;
    $.ajax({
        url: 'http://172.31.81.27:8080/' + setting.url,
        data: setting.needJson ? JSON.stringify(setting.data) : setting.data,
        type: "post",
        dataType: "JSON", /*
         * xhrFields: { withCredentials: true },
         * crossDomain: true,
         */
        async: setting.async,
        timeout: setting.timeout,
        headers: setting.headers,
        success: setting.success,
        error: setting.success
    });
}

/**
 * get请求方法。参数类型{url：‘’，data：‘’}
 *
 * @param confObj
 * @returns {boolean}
 */
export function get(confObj) {
    if (typeof confObj == "undefined") {
        confObj = {};
    }
    if (typeof confObj.commonUrl == 'undefined') {
        confObj.data.codeFlag = '1';
    }
    var defConf = {
        supportCors: true,
        commonUrl: null,
        url: "",
        data: {},
        timeout: 50000,
        async: true,
        crossDomain: true,
        cache: false,
        headers: {
            Accept: "application/json; charset=utf-8"
        },
        success: function () {
        },
        error: function (xml, XMLHttpRequest, errMsg, e) {
        }
    };
    var setting = $.extend(true, defConf, confObj);

    if (!setting.url) {
        return false;
    }
    jQuery.support.cors = setting.supportCors;
    $.ajax({
        url: (setting.commonUrl ? setting.commonUrl : config.url) + setting.url,
        data: setting.data,
        type: "get",
        dataType: "JSON",
        async: setting.async,
        timeout: setting.timeout,
        headers: setting.headers,
        success: setting.success,
        error: setting.success
    });
}

/**
 * 设置cookie
 * @param cookiename
 * @param cookievalue
 * @param hours
 */
export function setCookie(name, value) {
    var exp = new Date();
    exp.setTime(exp.getTime() + 3 * 24 * 60 * 60 * 1000); //3天过期
    document.cookie = name + "=" + encodeURIComponent(value) + ";expires=" + exp.toGMTString() + ";path=/";
}

/**
 * 获取cookie
 * @param cookiename
 * @returns {*}
 */
export function getCookie(cookiename) {
    var result;
    var mycookie = document.cookie;
    var start2 = mycookie.indexOf(cookiename + "=");
    if (start2 > -1) {
        start = mycookie.indexOf("=", start2) + 1;
        var end = mycookie.indexOf(";", start);
        if (end == -1) {
            end = mycookie.length;
        }
        result = unescape(mycookie.substring(start, end));
    }
    return result;
}


