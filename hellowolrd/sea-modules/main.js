/* global require, define,console,art */
//组织好代码，模块化 ok
//登录问题解决 ok
//更好的展示
//alert
//nodejs 模块

var gui = require("nw.gui");

define(function(require, exports, module) {
    "use strict";
    var $ = require("jquery");
    var convertJsonToTable = require("./jsontotable").ConvertJsonToTable;
    var DB = require("./db");



    $(document).ready(function() {

        var $okcoinFrame = $("iframe#okcoinFrame");
        var $bterFrame = $("iframe#bterFrame");
        var $bterFrameMe = $("iframe#bterFrameMe");
        var $bterFrameHistory = $("iframe#bterFrameHistory");
        var $bterFrameMyFund = $("iframe#bterFrameMyFund");
        var $btceFrame = $("iframe#btceFrame");
        var $coinmarketcap = $("#coinmarketcap");
        var data = {};
        var lastData = {};

        //$okcoinFrame.attr("src","https://www.okcoin.com");
        if (DB) {
            var dataString = DB.get("historydata");
            if (dataString) {
                lastData = JSON.parse(dataString);
            }

        }
        var dataTableMaker = function(data) {
            var array = [];
            var total = {
                "币种": "",
                "行为": "",
                "购买/出售价格": "",
                "当前价格": "",
                "价格百分比": "",
                "降跌": "",
                "持有量": "",
                "购买总额": 0,
                "目前总额": 0,
                "所得差价": 0
            };
            for (var i = 0; i < data.bterData.tradeList.length; i++) {
                var item = data.bterData.tradeList[i];
                for (var j = 0; j < data.bterData.tradeList.length; j++) {
                    var itemB = data.bterData.tradeList[j];
                    if (i != j && item && itemB &&
                        item.action == itemB.action &&
                        item.moneyType == itemB.moneyType &&
                        item.price == itemB.price
                    ) {
                        item.count = item.count + itemB.count;
                        delete data.bterData.tradeList[j];
                    }
                    if (i != j && item && itemB &&
                        item.moneyType == itemB.moneyType &&
                        item.action != itemB.action) {
                        if (item.action == "买入") {
                            item.count = item.count - itemB.count;
                            delete data.bterData.tradeList[j];
                        }
                    }
                    if (i != j && item && itemB &&
                        item.action == itemB.action &&
                        item.moneyType == itemB.moneyType &&
                        (itemB.count < 0)
                    ) {
                        item.count = item.count + itemB.count;
                        delete data.bterData.tradeList[j];
                    }
                }
            }

            for (var i = 0, len = data.bterData.tradeList.length; i < len; i++) {
                var item = data.bterData.tradeList[i];
                if (item) {
                    var t = {
                        "币种": item.moneyType,
                        "行为": item.action,
                        "购买/出售价格": item.price,
                        "当前价格": data.bterData[item.moneyType],
                        "价格百分比": (data.bterData[item.moneyType] / item.price * 100).toFixed(2) + "%",
                        "降跌": lastData.bterData ? ((data.bterData[item.moneyType] - lastData.bterData[item.moneyType]) / lastData.bterData[item.moneyType] * 100).toFixed(2) + "%" : "",
                        "持有量": item.count.toFixed(2),
                        "购买总额": (item.price * item.count).toFixed(2),
                        "目前总额": (data.bterData[item.moneyType] * item.count).toFixed(2),
                        "所得差价": ((data.bterData[item.moneyType] - item.price) * item.count).toFixed(2)
                    };
                    array.push(t);
                    total["购买总额"] += item.price * item.count;
                    total["目前总额"] += data.bterData[item.moneyType] * item.count;
                    total["所得差价"] += (data.bterData[item.moneyType] - item.price) * item.count;
                }
            }
            total["购买总额"] = total["购买总额"].toFixed(2);
            total["目前总额"] = total["目前总额"].toFixed(2);
            total["所得差价"] = total["所得差价"].toFixed(2);

            array.push(total);
            var cny = [{
                "币种": "cny",
                "行为": "剩余",
                "购买/出售价格": "",
                "当前价格": "",
                "价格百分比": "",
                "降跌": "",
                "持有量": "",
                "购买总额": "",
                "目前总额": data.bterData.cny,
                "所得差价": ""
            }, {
                "币种": "总和",
                "行为": "剩余",
                "购买/出售价格": "",
                "当前价格": "",
                "价格百分比": "",
                "降跌": "",
                "持有量": "",
                "购买总额": "",
                "目前总额": (parseFloat(total["目前总额"]) + data.bterData.cny).toFixed(2),
                "所得差价": ""
            }];

            array = array.concat(cny);

            return array;
        };



        $okcoinFrame.load(function() {
            var okcoinData = {};
            var doc = $okcoinFrame.get(0).contentDocument;
            okcoinData.ltc = $("#bannerLtcLast", doc).html();
            okcoinData.btc = $("#bannerBtcLast", doc).html();
            okcoinData.allMoney = $(".nav2-center .money", doc).html();
            //console.log(okcoinData);
            //$("#output").html($("#output").html() + JSON.stringify(okcoinData));
            data.okcoinData = okcoinData;

            console.log(doc.cookie);
            if (!okcoinData.allMoney) {
                $okcoinFrame.removeClass("none");
                $okcoinFrame.css({
                    "width": "100%",
                    "height": 600
                });
                art.dialog({
                    content: "你还没有登录okcoin，请登录"
                });
            } else {
                $okcoinFrame.addClass("none");
                var d = [{
                    "BTC": okcoinData.btc,
                    "LTC": okcoinData.ltc,
                    "资金总额": okcoinData.allMoney
                }];
                var jsonHtmlTable = convertJsonToTable(d);
                $("body").append("<h2>okcoin的行情</h2>");
                $("body").append(jsonHtmlTable);

            }
        });

        $bterFrame.attr("src", "http://cn.bter.com");
        $btceFrame.load(function() {

            var doc = $btceFrame.get(0).contentDocument;
            var rate = 6.0932;
            var btcedata = {
                btc: (parseFloat($("#last1", doc).html()) * rate).toFixed(2),
                ltc: (parseFloat($("#last14", doc).html()) * rate).toFixed(2),
                nmc: (parseFloat($("#last28", doc).html()) * rate).toFixed(2),
                ppc: (parseFloat($("#last31", doc).html()) * rate).toFixed(2)
            };
            $("body").append("<h2>bte-e 的行情</h2>");
            $("body").append(convertJsonToTable([btcedata], null, "table-3"));
        });

        $bterFrame.load(function() {
            setTimeout(function() {
                var bterData = {};
                var $ul = $("#bar_left_content ul", $bterFrame.get(0).contentDocument).eq(1);
                var dataList = $("li a span", $ul);
                if (!dataList.eq(0).html()) {
                    $bterFrame.attr("src", "http://cn.bter.com");
                } else {
                    var k=0;
                    bterData.btc = parseFloat(dataList.eq(k++).html());
                    k++;
                    bterData.ltc = parseFloat(dataList.eq(k++).html());
                    bterData.bqc = parseFloat(dataList.eq(k++).html());
                    k++;
                    bterData.cent = parseFloat(dataList.eq(k++).html());
                    k++;
                    bterData.cnc = parseFloat(dataList.eq(k++).html());
                    k++;
                    bterData.dtc = parseFloat(dataList.eq(k++).html());

                    bterData.exc = parseFloat(dataList.eq(k++).html());
                    k++;
                    k++;
                    bterData.ifc = parseFloat(dataList.eq(k++).html());
                    bterData.mec = parseFloat(dataList.eq(k++).html());
                    bterData.nmc = parseFloat(dataList.eq(k++).html());
                    bterData.ppc = parseFloat(dataList.eq(k++).html());
                    k++;
                    bterData.qrk = parseFloat(dataList.eq(k++).html());
                    bterData.red = parseFloat(dataList.eq(k++).html());
                    k++;
                    k++;
                    k++;
                    k++;
                    bterData.xpm = parseFloat(dataList.eq(k++).html());
                    bterData.yac = parseFloat(dataList.eq(k++).html());
                    console.log(bterData);
                    //$("#output").html($("#output").html() + JSON.stringify(data.bterData ));
                    data.bterData = bterData;

                    $bterFrameMe.attr("src", "http://cn.bter.com/myaccount");
                }

            }, 0);

        });


        $bterFrameMe.load(function() {
            var doc = $bterFrameMe.get(0).contentDocument;
            var allMoney = $("span", $("#sidebartitlewrapper", doc).next().next()).eq(0).html();
            if (!allMoney) {
                $bterFrameMe.removeClass("none");
                $bterFrameMe.css({
                    "width": "100%",
                    "height": 600,
                });
                art.dialog({
                    content: "你还没有登录okcoin，请登录"
                });
            } else {
                data.bterData = data.bterData || {};
                data.bterData.allMoney = allMoney;
                //$("#output").html($("#output").html() + JSON.stringify(data.bterData ));

                $bterFrameHistory.attr("src", "http://cn.bter.com/myaccount/myhistory");
            }
        });


        $bterFrameHistory.load(function() {
            var doc = $bterFrameHistory.get(0).contentDocument;
            var $trList = $("#divMyTradeHistoryList", doc).children().children().children();
            var tradeList = [];

            if ($trList.length > 0) {
                for (var i = 1, len = $trList.length; i < len; i++) {
                    var item = $trList.eq(i);
                    var $td = $("td", item);

                    var trade = {
                        "time": $td.eq(0).html(),
                        "action": ($td.eq(1).html().indexOf("买入") > 0 ? "买入" : "卖出"),
                        "moneyType": $td.eq(2).html().replace("/CNY", "").toLowerCase(),
                        "price": parseFloat($td.eq(3).html().replace(/,/g, "")),
                        "count": parseFloat($td.eq(4).html().replace(/,/g, "")),
                        "total": parseFloat($td.eq(5).html().replace(/,/g, ""))
                    };

                    tradeList.push(trade);
                }
            }

            data.bterData.tradeList = tradeList;
            $bterFrameMyFund.attr("src", " http://cn.bter.com/myaccount/myfunds");
        });

        $bterFrameMyFund.load(function() {
            var doc = $bterFrameMyFund.get(0).contentDocument;
            var $trList = $("#homepost", doc).find("table").eq(0).find("tbody tr");
            if (!$trList.eq(1).find("td").eq(1).html()) {
                $bterFrameMyFund.removeClass("none");
                $bterFrameMyFund.css({
                    "width": "100%",
                    "height": 600,
                });
                art.dialog({
                    content: "你还没有登录bter，请登录"
                });
            } else {
                $bterFrameMyFund.addClass("none");
                data.bterData.cny = parseFloat($trList.eq(1).find("td").eq(3).html().replace(/,/g, ""));
                data.bterData.allMoney = parseFloat($("#sidebartitlewrapper", doc).next().next().find("span").eq(0).html().replace(/,/g, ""));
                var tableData = dataTableMaker(data);
                var jsonHtmlTable = convertJsonToTable(tableData, "jsonTable", "table-3", "Download");
                $("body").append("<h2>bter 行情 </h2>");
                $("body").append(jsonHtmlTable);

                if (DB) {
                    if (!DB.get("historydata")) {
                        DB.set("historydata", JSON.stringify(data));
                    } else {
                        if (DB.get("lastdata")) {
                            var lastdata = JSON.parse(DB.get("lastdata"));
                            var historydata = JSON.parse(DB.get("historydata"));
                            if (lastdata.bterData.allMoney != data.bterData.allMoney || !historydata.bterData.bqc) {
                                DB.set("historydata", JSON.stringify(lastdata));
                            }
                        }
                    }
                    DB.set("lastdata", JSON.stringify(data));
                }
                $btceFrame.attr("src", "https://btc-e.com/");
            }
        });

        $coinmarketcap.attr("src", "http://coinmarketcap.com/");
        $coinmarketcap.load(function() {
            // var doc = $coinmarketcap.get(0).contentDocument;
            parseFloat($("#btc").parent().parent().find("td").eq(3).find(".price-usd").html().replace(/[$,]/g, ""));
        });

    });

});