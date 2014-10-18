/* TODO
    尝试一次搬砖
	利用https://www.cryptsy.com/ 的api 补充数据
	了解各种手续费
	计算各种搬砖方案，然后得到最后方案
	每天领取0.1xpm
    一键买入，一键卖出
*/

/* global define*/
//var http = require("http");

define(function(require, exports, module) {

    "use strict";
    var $ = require("jquery"),
        convertJsonToTable = require("./jsontotable").ConvertJsonToTable,
        DB = require("./db"),
        COIN = require("./coin_type").COIN,
        CommonData = require("./common");

    var priceList = {},
        i,
        dataString,
        lastdata,
        rate = CommonData.USDtoCNY;

    if (DB) {
        dataString = DB.get("historyPrice");
        if (dataString) {
            lastdata = JSON.parse(dataString);
        }
    }

    for (i = 0; i < COIN.length; i++) {
        priceList[COIN[i].name] = {
            name: COIN[i].name,
            fullname: COIN[i].fullname,
            cname: COIN[i].cname,
            okcoin_last: lastdata && lastdata[COIN[i].name] && lastdata[COIN[i].name].okcoin,
            bter_last: lastdata && lastdata[COIN[i].name] && lastdata[COIN[i].name].bter,
            btce_last: lastdata && lastdata[COIN[i].name] && lastdata[COIN[i].name].btce,
            coinmarketcap_last: lastdata && lastdata[COIN[i].name] && lastdata[COIN[i].name].coinmarketcap,
            coinmarketcapUpDown_last: lastdata && lastdata[COIN[i].name] && lastdata[COIN[i].name].coinmarketcapUpDown
        };
    }


    var writeTable = function(pl) {
        if (pl) {
            var array = [];

            var makeView = function(price, lastPrice, percent) {
                if (!price) {
                    return "";
                }

                if (!lastPrice) {
                    return price;
                }

                var rest = ((price - lastPrice) / lastPrice * 100).toFixed(2);
                var color = rest > 0 ? "green" : "red";
                if (rest === 0) {
                    color = "black";
                }
                if (percent) {
                    price = (price * 100).toFixed(2) + "%";
                }
                return "<span style='color:" + color + "'>" + price + "(" + rest + "%)</span>";
            };

            var profit = function(coinmarketcap, bter) {
                var iHave = 1000,
                    c1,
                    get,
                    ret;

                c1 = iHave / coinmarketcap;
                get = bter * c1;
                ret = get - iHave;
                return ret;
            };
            for (var i in pl) {
                if (pl.hasOwnProperty(i)) {
                    array.push({
                        "name": pl[i].name,
                        "fullname": pl[i].fullname,
                        "中文名": pl[i].cname,
                        "okcoin": makeView(pl[i].okcoin, pl[i].okcoin_last),
                        "bter": makeView(pl[i].bter, pl[i].bter_last),
                        "btc-e": makeView(pl[i].btce, pl[i].btce_last),
                        "coinmarketcap": makeView(pl[i].coinmarketcap, pl[i].coinmarketcap_last),
                        "涨跌": makeView(pl[i].coinmarketcapUpDown, pl[i].coinmarketcapUpDown_last, 1),
                        "每搬1000元砖的利润": profit(pl[i].coinmarketcap, pl[i].bter)
                    });
                }
            }
            var jsonHtmlTable = convertJsonToTable(array, "jsonTable", "table-3", "Download");
            $("#pricelist").html(jsonHtmlTable);
        }
    };

    $(document).ready(function() {

        var $okcoinFrame = $("iframe#okcoinFrame");
        var $bterFrame = $("iframe#bterFrame");
        //var $bterFrameMe = $("iframe#bterFrameMe");
        //var $bterFrameHistory = $("iframe#bterFrameHistory");
        //var $bterFrameMyFund = $("iframe#bterFrameMyFund");
        var $btceFrame = $("iframe#btceFrame");
        var $coinmarketcap = $("#coinmarketcap");

        $okcoinFrame.attr("src", "https://www.okcoin.com");
        $okcoinFrame.load(function() {
            var doc = $okcoinFrame.get(0).contentDocument;
            if (!$("#bannerLtcLast", doc).html()) {
                setTimeout(function() {
                    $okcoinFrame.attr("src", "https://www.okcoin.com");
                }, 1000);
                return;
            }
            priceList.ltc.okcoin = $("#bannerLtcLast", doc).html();
            priceList.btc.okcoin = $("#bannerBtcLast", doc).html();
            writeTable(priceList);

        });

        $btceFrame.attr("src", "https://btc-e.com/");
        $btceFrame.load(function() {
            var doc = $btceFrame.get(0).contentDocument;
            if (!$("#last1", doc).html()) {
                setTimeout(function() {
                    $okcoinFrame.attr("src", "http://cn.bter.com");
                }, 1000);
                return;
            }
            priceList.btc.btce = (parseFloat($("#last1", doc).html()) * rate).toFixed(2);
            priceList.ltc.btce = (parseFloat($("#last14", doc).html()) * rate).toFixed(2);
            priceList.nmc.btce = (parseFloat($("#last28", doc).html()) * rate).toFixed(2);
            priceList.ppc.btce = (parseFloat($("#last31", doc).html()) * rate).toFixed(2);
            writeTable(priceList);
            if (DB) {
                if (!DB.get("historyPrice")) {
                    DB.set("historyPrice", JSON.stringify(priceList));
                } else {
                    if (DB.get("lastPrice")) {
                        var lastPrice = JSON.parse(DB.get("lastPrice"));
                        var historyPrice = JSON.parse(DB.get("historyPrice"));
                        
                        for (var i in historyPrice) {
                            if (historyPrice.hasOwnProperty(i)) {
                                if (historyPrice[i].okcoin != lastPrice[i].okcoin) {
                                    historyPrice[i].okcoin = lastPrice[i].okcoin;
                                }
                                if (lastPrice[i].okcoin_last && historyPrice[i].okcoin_last != lastPrice[i].okcoin_last) {
                                    historyPrice[i].okcoin_last = lastPrice[i].okcoin_last;
                                }
                                if (lastPrice[i].bter && historyPrice[i].bter != lastPrice[i].bter) {
                                    historyPrice[i].bter = lastPrice[i].bter;
                                }
                                if (lastPrice[i].bter_last && historyPrice[i].bter_last != lastPrice[i].bter_last) {
                                    historyPrice[i].bter_last = lastPrice[i].bter_last;
                                }
                                if (lastPrice[i].btce && historyPrice[i].btce != lastPrice[i].btce) {
                                    historyPrice[i].btce = lastPrice[i].btce;
                                }
                                if (lastPrice[i].btce_last && historyPrice[i].btce_last != lastPrice[i].btce_last) {
                                    historyPrice[i].btce_last = lastPrice[i].btce_last;
                                }
                                if (lastPrice[i].coinmarketcap_last && historyPrice[i].coinmarketcap_last != lastPrice[i].coinmarketcap_last) {
                                    historyPrice[i].coinmarketcap_last = lastPrice[i].coinmarketcap_last;
                                }
                                if (lastPrice[i].coinmarketcap && historyPrice[i].coinmarketcap != lastPrice[i].coinmarketcap) {
                                    historyPrice[i].coinmarketcap = lastPrice[i].coinmarketcap;
                                }
                                if (lastPrice[i].coinmarketcapUpDown && historyPrice[i].coinmarketcapUpDown != lastPrice[i].coinmarketcapUpDown) {
                                    historyPrice[i].coinmarketcapUpDown = lastPrice[i].coinmarketcapUpDown;
                                }
                                if (lastPrice[i].coinmarketcapUpDown_last && historyPrice[i].coinmarketcapUpDown_last != lastPrice[i].coinmarketcapUpDown_last) {
                                    historyPrice[i].coinmarketcapUpDown_last = lastPrice[i].coinmarketcapUpDown_last;
                                }
                            }
                        }
                        DB.set("historyPrice", JSON.stringify(historyPrice));
                    }
                }
                DB.set("lastPrice", JSON.stringify(priceList));
            }
        });

        $bterFrame.attr("src", "http://cn.bter.com");
        $bterFrame.load(function() {
            var $ul = $("#bar_left_content ul", $bterFrame.get(0).contentDocument).eq(1);
            var dataList = $("li a span", $ul);
            if (!dataList.eq(0).html()) {
                setTimeout(function() {
                    $bterFrame.attr("src", "http://cn.bter.com");
                }, 1000);
                return;
            } else {
                var k =0;
                priceList.btc.bter = parseFloat(dataList.eq(k++).html());
                k++;
                priceList.ltc.bter = parseFloat(dataList.eq(k++).html());
                priceList.bqc.bter = parseFloat(dataList.eq(k++).html());
                priceList.btb.bter = parseFloat(dataList.eq(k++).html());
                priceList.cent.bter = parseFloat(dataList.eq(k++).html());
                priceList.cmc.bter = parseFloat(dataList.eq(k++).html());
                priceList.cnc.bter = parseFloat(dataList.eq(k++).html());
                //priceList.dgc.bter = parseFloat(dataList.eq(k++).html());
                k++;
                priceList.dtc.bter = parseFloat(dataList.eq(k++).html());
                priceList.exc.bter = parseFloat(dataList.eq(k++).html());
                priceList.frc.bter = parseFloat(dataList.eq(k++).html());
                priceList.ftc.bter = parseFloat(dataList.eq(k++).html());
                priceList.ifc.bter = parseFloat(dataList.eq(k++).html());
                priceList.mec.bter = parseFloat(dataList.eq(k++).html());
                priceList.nmc.bter = parseFloat(dataList.eq(k++).html());
                priceList.ppc.bter = parseFloat(dataList.eq(k++).html());
                priceList.pts.bter = parseFloat(dataList.eq(k++).html());
                priceList.qrk.bter = parseFloat(dataList.eq(k++).html());
                priceList.red.bter = parseFloat(dataList.eq(k++).html());
                k++;
                k++;
                k++;
                k++;
                priceList.xpm.bter = parseFloat(dataList.eq(k++).html());
                priceList.yac.bter = parseFloat(dataList.eq(k++).html());
                priceList.zcc.bter = parseFloat(dataList.eq(k++).html());
                writeTable(priceList);

            }
        });

        $coinmarketcap.attr("src", "http://coinmarketcap.com/");
        $coinmarketcap.load(function() {
            var doc = $coinmarketcap.get(0).contentDocument;
            if($("#btc").length !== 0) {
                setTimeout(function() {
                    $coinmarketcap.attr("src", "http://coinmarketcap.com");
                }, 1000);
                return;
            } else {
                for (var i = 0; i < COIN.length; i++) {
                    var coin = COIN[i].name;
                    if (priceList[coin] && $("#" + coin, doc).length > 0) {

                        priceList[coin].coinmarketcap = (parseFloat($("#" + coin, doc).parent().parent().find("td").eq(3).find(".price-usd").html().replace(/[$,]/g, "")) * rate);
                        if (priceList[coin].coinmarketcap > 0.01) {
                            priceList[coin].coinmarketcap = priceList[coin].coinmarketcap.toFixed(2);
                        }
                        priceList[coin].coinmarketcapUpDown = parseFloat($("#" + coin, doc).parent().parent().find("td").eq(5).html().replace("%", "")) / 100;
                    }
                }
                writeTable(priceList);

            }
        });

    });

});