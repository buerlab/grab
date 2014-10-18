define(function(require, exports, module) {

exports.COIN = [
	{
		name:"btc",
		fullname:"Bitcoin",
		cname:"比特币"
	},
	{
		name:"ltc",
		fullname:"Litecoin",
		cname:"莱特币"
	},
	{
		name:"ppc",
		fullname:"Peercoin",
		cname:"点点币"
	},
{
		name:"nmc",
		fullname:"Namecoin",
		cname:"域名币"
	},
{
		name:"mec",
		fullname:"Megacoin",
		cname:"美卡币"
	},
{
		name:"pts",
		fullname:"ProtoShares",
		cname:"pts"
	},
{
		name:"qrk",
		fullname:"QuarkCoin",
		cname:"夸克币"
	},
{
		name:"wdc",
		fullname:"WorldCoin",
		cname:"比特币"
	},
{
		name:"xpm",
		fullname:"Primecoin",
		cname:"质数币"
	},
{
		name:"ftc",
		fullname:"Feathercoin",
		cname:"羽毛币"
	},
{
		name:"nxt",
		fullname:"Nxt",
		cname:"Nxt"
	},
{
		name:"nvc",
		fullname:"Novacoin",
		cname:"Novacoin"
	},{
		name:"frc",
		fullname:"Freicoin",
		cname:"运输币"
	},{
		name:"anc",
		fullname:"Anoncoin",
		cname:"Anoncion"
	},{
		name:"cgb",
		fullname:"CryptogenicBullion",
		cname:"CryptogenicBullion"
	},{
		name:"trc",
		fullname:"Terracoin",
		cname:"Terracoin"
	},{
		name:"zet",
		fullname:"Zetacoin",
		cname:"Zetacoin"
	},{
		name:"ifc",
		fullname:"Infinitecoin",
		cname:"无限币"
	},{
		name:"bqc",
		fullname:"BBQCoin",
		cname:"烧烤币"
	},{
		name:"yac",
		fullname:"Yacoin",
		cname:"雅币"
	},{
		name:"btb",
		fullname:"BitBar",
		cname:"比特金条"
	},{
		name:"cent",
		fullname:"Centcoin",
		cname:"便士币"
	},{
		name:"cmc",
		fullname:"CMC",
		cname:"宇宙币"
	},{
		name:"dtc",
		fullname:"DTC",
		cname:"数据币"
	},{
		name:"exc",
		fullname:"EXC",
		cname:"极点币"
	},{
		name:"src",
		fullname:"SRC",
		cname:"安全币"
	},{
		name:"cnc",
		fullname:"CNC",
		cname:"中国币"
	},{
		name:"zcc",
		fullname:"ZCC",
		cname:"ZCC"
	},{
		name:"red",
		fullname:"RED",
		cname:"红币"
	}]
});
define(function(require, exports, module) {
	exports.USDtoCNY = 6.0932;
});
define(function(require, exports, module) {
	DB = {
		set : function(key,value){
			localStorage.setItem(key, value);
		},
		get : function(key){
			return localStorage.getItem(key);
		}
	}
	exports.set = DB.set;
	exports.get = DB.get;
});
define(function(require, exports, module) {
/**
 * JavaScript format string function
 * 
 */
String.prototype.format = function()
{
  var args = arguments;

  return this.replace(/{(\d+)}/g, function(match, number)
  {
    return typeof args[number] != 'undefined' ? args[number] :
                                                '{' + number + '}';
  });
};


/**
 * Convert a Javascript Oject array or String array to an HTML table
 * JSON parsing has to be made before function call
 * It allows use of other JSON parsing methods like jQuery.parseJSON
 * http(s)://, ftp://, file:// and javascript:; links are automatically computed
 *
 * JSON data samples that should be parsed and then can be converted to an HTML table
 *     var objectArray = '[{"Total":"34","Version":"1.0.4","Office":"New York"},{"Total":"67","Version":"1.1.0","Office":"Paris"}]';
 *     var stringArray = '["New York","Berlin","Paris","Marrakech","Moscow"]';
 *     var nestedTable = '[{ key1: "val1", key2: "val2", key3: { tableId: "tblIdNested1", tableClassName: "clsNested", linkText: "Download", data: [{ subkey1: "subval1", subkey2: "subval2", subkey3: "subval3" }] } }]'; 
 *
 * Code sample to create a HTML table Javascript String
 *     var jsonHtmlTable = ConvertJsonToTable(eval(dataString), 'jsonTable', null, 'Download');
 *
 * Code sample explaned
 *  - eval is used to parse a JSON dataString
 *  - table HTML id attribute will be 'jsonTable'
 *  - table HTML class attribute will not be added
 *  - 'Download' text will be displayed instead of the link itself
 *
 * @author Afshin Mehrabani <afshin dot meh at gmail dot com>
 * 
 * @class ConvertJsonToTable
 * 
 * @method ConvertJsonToTable
 * 
 * @param parsedJson object Parsed JSON data
 * @param tableId string Optional table id 
 * @param tableClassName string Optional table css class name
 * @param linkText string Optional text replacement for link pattern
 *  
 * @return string Converted JSON to HTML table
 */
function ConvertJsonToTable(parsedJson, tableId, tableClassName, linkText)
{
    //Patterns for links and NULL value
    var italic = '<i>{0}</i>';
    var link = linkText ? '<a href="{0}">' + linkText + '</a>' :
                          '<a href="{0}">{0}</a>';

    //Pattern for table                          
    var idMarkup = tableId ? ' id="' + tableId + '"' :
                             '';

    var classMarkup = tableClassName ? ' class="' + tableClassName + '"' :
                                       '';

    var tbl = '<table border="1" cellpadding="1" cellspacing="1"' + idMarkup + classMarkup + '>{0}{1}</table>';

    //Patterns for table content
    var th = '<thead>{0}</thead>';
    var tb = '<tbody>{0}</tbody>';
    var tr = '<tr>{0}</tr>';
    var thRow = '<th>{0}</th>';
    var tdRow = '<td>{0}</td>';
    var thCon = '';
    var tbCon = '';
    var trCon = '';

    if (parsedJson)
    {
        var isStringArray = typeof(parsedJson[0]) == 'string';
        var headers;

        // Create table headers from JSON data
        // If JSON data is a simple string array we create a single table header
        if(isStringArray)
            thCon += thRow.format('value');
        else
        {
            // If JSON data is an object array, headers are automatically computed
            if(typeof(parsedJson[0]) == 'object')
            {
                headers = array_keys(parsedJson[0]);

                for (i = 0; i < headers.length; i++)
                    thCon += thRow.format(headers[i]);
            }
        }
        th = th.format(tr.format(thCon));
        
        // Create table rows from Json data
        if(isStringArray)
        {
            for (i = 0; i < parsedJson.length; i++)
            {
                tbCon += tdRow.format(parsedJson[i]);
                trCon += tr.format(tbCon);
                tbCon = '';
            }
        }
        else
        {
            if(headers)
            {
                var urlRegExp = new RegExp(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig);
                var javascriptRegExp = new RegExp(/(^javascript:[\s\S]*;$)/ig);
                
                for (i = 0; i < parsedJson.length; i++)
                {
                    for (j = 0; j < headers.length; j++)
                    {
                        var value = parsedJson[i][headers[j]];
                        var isUrl = urlRegExp.test(value) || javascriptRegExp.test(value);

                        if(isUrl)   // If value is URL we auto-create a link
                            tbCon += tdRow.format(link.format(value));
                        else
                        {
                            if(value){
                            	if(typeof(value) == 'object'){
                            		//for supporting nested tables
                            		tbCon += tdRow.format(ConvertJsonToTable(eval(value.data), value.tableId, value.tableClassName, value.linkText));
                            	} else {
                            		tbCon += tdRow.format(value);
                            	}
                                
                            } else {    // If value == null we format it like PhpMyAdmin NULL values
                                tbCon += tdRow.format(italic.format(value).toUpperCase());
                            }
                        }
                    }
                    trCon += tr.format(tbCon);
                    tbCon = '';
                }
            }
        }
        tb = tb.format(trCon);
        tbl = tbl.format(th, tb);

        return tbl;
    }
    return null;
}


/**
 * Return just the keys from the input array, optionally only for the specified search_value
 * version: 1109.2015
 *  discuss at: http://phpjs.org/functions/array_keys
 *  +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
 *  +      input by: Brett Zamir (http://brett-zamir.me)
 *  +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
 *  +   improved by: jd
 *  +   improved by: Brett Zamir (http://brett-zamir.me)
 *  +   input by: P
 *  +   bugfixed by: Brett Zamir (http://brett-zamir.me)
 *  *     example 1: array_keys( {firstname: 'Kevin', surname: 'van Zonneveld'} );
 *  *     returns 1: {0: 'firstname', 1: 'surname'}
 */
function array_keys(input, search_value, argStrict)
{
    var search = typeof search_value !== 'undefined', tmp_arr = [], strict = !!argStrict, include = true, key = '';

    if (input && typeof input === 'object' && input.change_key_case) { // Duck-type check for our own array()-created PHPJS_Array
        return input.keys(search_value, argStrict);
    }
 
    for (key in input)
    {
        if (input.hasOwnProperty(key))
        {
            include = true;
            if (search)
            {
                if (strict && input[key] !== search_value)
                    include = false;
                else if (input[key] != search_value)
                    include = false;
            } 
            if (include)
                tmp_arr[tmp_arr.length] = key;
        }
    }
    return tmp_arr;
}

    exports.ConvertJsonToTable = ConvertJsonToTable;
});
//组织好代码，模块化 ok
//登录问题解决 ok
//更好的展示
//alert
//nodejs 模块

var gui = require('nw.gui'); 

define(function(require, exports, module) {

var  $ = require("jquery");
var ConvertJsonToTable = require("./jsontotable").ConvertJsonToTable;
var DB = require("./db");




$( document ).ready(function() {

    var $okcoinFrame = $("iframe#okcoinFrame");
    var $bterFrame = $("iframe#bterFrame");
    var $bterFrameMe = $("iframe#bterFrameMe");
    var $bterFrameHistory = $("iframe#bterFrameHistory");
    var $bterFrameMyFund = $("iframe#bterFrameMyFund");
    var $btceFrame = $("iframe#btceFrame");
    var $coinmarketcap = $("#coinmarketcap");
    var data={};
    var lastData = {};

    //$okcoinFrame.attr("src","https://www.okcoin.com");
    if(DB){
        var dataString = DB.get("historydata");
    	if(dataString){
    		lastData = JSON.parse(dataString);
    	}
    	
    }
    var dataTableMaker = function(data){
    	var array =[];
    	var total ={
			"币种": "",
			"行为": "",
			"购买/出售价格": "",
			"当前价格": "",
			"价格百分比": "",
			"降跌": "",
			"持有量": "",
			"购买总额": 0,
			"目前总额":0,
			"所得差价":0
    	}
    	for(var i =0;i<data.bterData.tradeList.length;i++){
    		var item = data.bterData.tradeList[i];
    		for(var j=0;j<data.bterData.tradeList.length;j++){
    			var itemB = data.bterData.tradeList[j];
    			if(i!=j && item && itemB && 
    				item.action == itemB.action && 
    				item.moneyType == itemB.moneyType && 
    				item.price == itemB.price
    			){
    				item.count = item.count + itemB.count;
    				delete data.bterData.tradeList[j];
    			}
    			if(i!=j && item && itemB && 
    				item.moneyType == itemB.moneyType && 
    				item.action != itemB.action){
    				if(item.action =="买入"){
    					item.count = item.count - itemB.count;
    					delete data.bterData.tradeList[j];
    				}
    			}
                if(i!=j && item && itemB && 
                    item.action == itemB.action && 
                    item.moneyType == itemB.moneyType && 
                    (itemB.count < 0)
                ){
                    item.count = item.count + itemB.count;
                    delete data.bterData.tradeList[j];
                }    		
            }
    	}

    	for(var i =0,len =data.bterData.tradeList.length;i<len;i++){
    		var item = data.bterData.tradeList[i];
    		if(item){
				var t = {
					"币种": item.moneyType,
					"行为": item.action,
					"购买/出售价格": item.price,
					"当前价格": data.bterData[item.moneyType],
					"价格百分比": (data.bterData[item.moneyType] / item.price * 100).toFixed(2) + "%",
					"降跌": lastData.bterData ? ((data.bterData[item.moneyType] - lastData.bterData[item.moneyType])/lastData.bterData[item.moneyType] * 100).toFixed(2) + "%" : "",
					"持有量": item.count.toFixed(2),
					"购买总额": (item.price * item.count).toFixed(2),
					"目前总额":(data.bterData[item.moneyType]* item.count).toFixed(2),
					"所得差价": ((data.bterData[item.moneyType] - item.price) * item.count).toFixed(2)
				}
				array.push(t);
				total["购买总额"] += item.price * item.count;
				total["目前总额"] += data.bterData[item.moneyType]* item.count;
				total["所得差价"] += (data.bterData[item.moneyType] - item.price) * item.count;
    		}
		}
		total["购买总额"] = total["购买总额"].toFixed(2);
		total["目前总额"] = total["目前总额"].toFixed(2);
		total["所得差价"] = total["所得差价"].toFixed(2);

		array.push(total);
    	var cny =[{
			"币种": "cny",
			"行为": "剩余",
			"购买/出售价格": "",
			"当前价格": "",
			"价格百分比": "",
			"降跌":"",
			"持有量": "",
			"购买总额": "",
			"目前总额":data.bterData.cny,
			"所得差价":""
    	},{
			"币种": "总和",
			"行为": "剩余",
			"购买/出售价格": "",
			"当前价格": "",
			"价格百分比": "",
			"降跌":"",
			"持有量": "",
			"购买总额": "",
			"目前总额":(parseFloat(total["目前总额"])+ data.bterData.cny).toFixed(2),
			"所得差价":""
    	}
    	]

    	array = array.concat(cny);

    	return array;
    }


	
    $okcoinFrame.load(function(){
    	var okcoinData={};
    	var doc = $okcoinFrame.get(0).contentDocument;
       	okcoinData.ltc = $("#bannerLtcLast",doc).html();    
    	okcoinData.btc = $("#bannerBtcLast",doc).html();
    	okcoinData.allMoney = $(".nav2-center .money",doc).html()
    	//console.log(okcoinData);
    	//$("#output").html($("#output").html() + JSON.stringify(okcoinData));
    	data.okcoinData = okcoinData;

        console.log(doc.cookie);
    	if(!okcoinData.allMoney){
            $okcoinFrame.removeClass("none");
            $okcoinFrame.css({
                "width": "100%",
                "height": 600
            });
            art.dialog({
                content: '你还没有登录okcoin，请登录'
            });
        }else{
            $okcoinFrame.addClass("none");
            var d = [{
                "BTC" : okcoinData.btc,
                "LTC" : okcoinData.ltc,
                "资金总额": okcoinData.allMoney
            }];
            var jsonHtmlTable = ConvertJsonToTable(d);
            $("body").append("<h2>okcoin的行情</h2>")
            $("body").append(jsonHtmlTable);    
                    
        }
    });
    
    $bterFrame.attr("src", "http://bter.com");  
    $btceFrame.load(function(){
    	
    	var doc = $btceFrame.get(0).contentDocument;
    	var rate =  6.0932;
    	var btcedata = {
    		btc : (parseFloat($("#last1", doc).html()) * rate).toFixed(2),
    		ltc : (parseFloat($("#last14",doc).html()) * rate).toFixed(2),
    		nmc : (parseFloat($("#last28",doc).html()) * rate).toFixed(2),
    		ppc : (parseFloat($("#last31",doc).html()) * rate).toFixed(2)
    	}
    	$("body").append("<h2>bte-e 的行情</h2>");
    	$("body").append(ConvertJsonToTable([btcedata],null,"table-3"));

    })
    
    $bterFrame.load(function(){
    	setTimeout(function(){
	        var bterData={};
	        var $ul = $("#bar_left_content ul",$bterFrame.get(0).contentDocument).eq(1);
	        var dataList = $("li a span",$ul);
            if(!dataList.eq(0).html()){
                $bterFrame.attr("src","http://bter.com");
            }else{
                bterData.btc = parseFloat(dataList.eq(0).html());
                bterData.ltc = parseFloat(dataList.eq(2).html());
                bterData.bqc = parseFloat(dataList.eq(3).html());
                bterData.cent = parseFloat(dataList.eq(5).html());
                bterData.cnc = parseFloat(dataList.eq(7).html());
                bterData.dtc = parseFloat(dataList.eq(8).html());

                bterData.exc = parseFloat(dataList.eq(9).html());
                bterData.ifc = parseFloat(dataList.eq(12).html());

                bterData.red = parseFloat(dataList.eq(18).html());
                bterData.mec = parseFloat(dataList.eq(13).html());
                bterData.nmc = parseFloat(dataList.eq(14).html());
                bterData.ppc = parseFloat(dataList.eq(15).html());
                bterData.qrk = parseFloat(dataList.eq(17).html());
                bterData.xpm = parseFloat(dataList.eq(23).html());
                bterData.yac = parseFloat(dataList.eq(24).html());
                console.log(bterData);
                //$("#output").html($("#output").html() + JSON.stringify(data.bterData ));
                data.bterData = bterData;

                $bterFrameMe.attr("src","http://bter.com/myaccount");    
            }
	       	
    	},0);

    });

    
    $bterFrameMe.load(function(){
        var bterData={};
        var doc = $bterFrameMe.get(0).contentDocument;
    	var allMoney = $("span",$("#sidebartitlewrapper",doc).next().next()).eq(0).html();
        if(!allMoney){
            $bterFrameMe.removeClass("none");
            $bterFrameMe.css({
                "width":"100%",
                "height":600,
            });
            art.dialog({
                content: '你还没有登录okcoin，请登录'
            });
        }else{
            data.bterData = data.bterData || {};
            data.bterData.allMoney = allMoney;
            //$("#output").html($("#output").html() + JSON.stringify(data.bterData ));

            $bterFrameHistory.attr("src","http://bter.com/myaccount/myhistory");
        }
    });
 

     $bterFrameHistory.load(function(){
        var doc = $bterFrameHistory.get(0).contentDocument;
    	var $trList = $("#divMyTradeHistoryList",doc).children().children().children();
    	var tradeList = [];
        debugger;
    	if($trList.length>0){
    		for(var i =1,len = $trList.length;i<len;i++){
    			var item = $trList.eq(i);
    			var $td = $("td",item);

    			var trade = {
    				"time":$td.eq(0).html(),
    				"action": ($td.eq(1).html().indexOf("买入")>0? "买入":"卖出"),
    				"moneyType": $td.eq(2).html().replace("/CNY","").toLowerCase(),
    				"price": parseFloat($td.eq(3).html().replace(/,/g,"")),
    				"count": parseFloat($td.eq(4).html().replace(/,/g,"")),
    				"total": parseFloat($td.eq(5).html().replace(/,/g,""))
    			};
    			
    			tradeList.push(trade);
    		}
    	}
    	
    	data.bterData.tradeList = tradeList;
    	$bterFrameMyFund.attr("src"," http://bter.com/myaccount/myfunds");
    });

     $bterFrameMyFund.load(function(){
        var doc = $bterFrameMyFund.get(0).contentDocument;
    	var $trList = $("#homepost",doc).find("table").eq(0).find("tbody tr");
        if(!$trList.eq(1).find("td").eq(1).html()){
            $bterFrameMyFund.removeClass("none");
            $bterFrameMyFund.css({
                "width":"100%",
                "height":600,
            });
            art.dialog({
                content: '你还没有登录bter，请登录'
            });
        }else{
            $bterFrameMyFund.addClass("none");
            data.bterData.cny =parseFloat( $trList.eq(1).find("td").eq(3).html().replace(/,/g,""));
            data.bterData.allMoney = parseFloat($("#sidebartitlewrapper",doc).next().next().find("span").eq(0).html().replace(/,/g,""));
            var tableData = dataTableMaker(data);
            var jsonHtmlTable = ConvertJsonToTable(tableData, 'jsonTable', "table-3", 'Download');
            $("body").append("<h2>bter 行情 </h2>");
            $("body").append(jsonHtmlTable);

            if(DB){
                if(!DB.get("historydata")){
                    DB.set("historydata",JSON.stringify(data));
                }else {
                    if(DB.get("lastdata")){
                        var lastdata = JSON.parse(DB.get("lastdata"));
                        var historydata = JSON.parse(DB.get("historydata"));
                        if(lastdata.bterData.allMoney != data.bterData.allMoney ||
                            !historydata.bterData.bqc){
                            DB.set("historydata", JSON.stringify(lastdata));
                        }
                    }
                }
                DB.set("lastdata",JSON.stringify(data));
            }
            $btceFrame.attr("src", "https://btc-e.com/");
        }
    });
    
    $coinmarketcap.attr("src","http://coinmarketcap.com/");
    $coinmarketcap.load(function(){
        var doc = $coinmarketcap.get(0).contentDocument;
           parseFloat($("#btc").parent().parent().find("td").eq(3).find(".price-usd").html().replace(/[$,]/g,""))
    });
      
});

});


/*TODO
	尝试一次搬砖
	利用https://www.cryptsy.com/ 的api 补充数据
	了解各种手续费
	计算各种搬砖方案，然后得到最后方案
	每天领取0.1xpm
	一键买入，一键卖出
*/ 

debugger;
var http = require("http");

define(function(require, exports, module) {

var  $ = require("jquery"),
	ConvertJsonToTable = require("./jsontotable").ConvertJsonToTable,
	DB = require("./db"),
	COIN = require("./coin_type").COIN,
	CommonData = require("./common");

var priceList = {},
	i,
	dataString,
	lastdata ,
	rate = CommonData.USDtoCNY;

if(DB){
    dataString = DB.get("historyPrice");
	if(dataString){
		lastdata = JSON.parse(dataString);
	}	
}

for (i = 0; i < COIN.length; i++) {
	priceList[COIN[i].name] = {
		name : COIN[i].name,
		fullname : COIN[i].fullname,
		cname : COIN[i].cname,
		okcoin_last: lastdata && lastdata[COIN[i].name] && lastdata[COIN[i].name].okcoin,
		bter_last: lastdata && lastdata[COIN[i].name] &&lastdata[COIN[i].name].bter,
		btce_last: lastdata && lastdata[COIN[i].name] &&lastdata[COIN[i].name].btce,
		coinmarketcap_last: lastdata && lastdata[COIN[i].name] &&lastdata[COIN[i].name].coinmarketcap,
		coinmarketcapUpDown_last: lastdata && lastdata[COIN[i].name]&&lastdata[COIN[i].name].coinmarketcapUpDown
	}
}

function a(){
	this.a = 1;
	var b = function (){
		console.log(this);
	}
	b();
}

a();


var writeTable = function(pl){
	if(pl){
		var array = [];

		var makeView = function(price, lastPrice,percent){
			if(!price){
				return "";
			}

			if(!lastPrice){
				return price;
			}

			var rest  =  ((price - lastPrice) / lastPrice * 100).toFixed(2);
			var color = rest>0 ? "green" : "red";
			if(rest==0){
				color = "black";
			} 
			if(percent){
				price = (price * 100).toFixed(2) + "%";
			}
			return "<span style='color:"+ color + "'>" + price + "(" + rest + "%)</span>";
		}

		var profit = function(coinmarketcap,bter){
			var iHave = 1000,
				c1,
				get,
				ret;

			c1 = iHave / coinmarketcap;
			get = bter * c1;
			ret = get -iHave;
			return ret;
		}
		for(var i in pl) {
		    if (pl.hasOwnProperty(i)) {
		        array.push({
		        	"name" : pl[i].name,
		        	"fullname" : pl[i].fullname,
		        	"中文名" : pl[i].cname,
		        	"okcoin" : makeView(pl[i].okcoin, pl[i].okcoin_last),
		        	"bter" : makeView(pl[i].bter, pl[i].bter_last),
		        	"btc-e" : makeView(pl[i].btce, pl[i].btce_last),
		        	"coinmarketcap" : makeView(pl[i].coinmarketcap, pl[i].coinmarketcap_last),
		        	"涨跌": makeView(pl[i].coinmarketcapUpDown, pl[i].coinmarketcapUpDown_last, 1),
		        	"每搬1000元砖的利润":profit(pl[i].coinmarketcap,pl[i].bter)
		        });
		    }
		}
 		var jsonHtmlTable = ConvertJsonToTable(array, 'jsonTable', "table-3", 'Download');
        $("#pricelist").html(jsonHtmlTable);		
	}
}

$( document ).ready(function() {

    var $okcoinFrame = $("iframe#okcoinFrame");
    var $bterFrame = $("iframe#bterFrame");
    var $bterFrameMe = $("iframe#bterFrameMe");
    var $bterFrameHistory = $("iframe#bterFrameHistory");
    var $bterFrameMyFund = $("iframe#bterFrameMyFund");
    var $btceFrame = $("iframe#btceFrame");
    var $coinmarketcap = $("#coinmarketcap");

    $okcoinFrame.attr("src","https://www.okcoin.com");
    $okcoinFrame.load(function(){
    	var doc = $okcoinFrame.get(0).contentDocument;
    	if(!$("#bannerLtcLast",doc).html()){
    		setTimeout(function(){
    			$okcoinFrame.attr("src","https://www.okcoin.com");
    		},1000);
    		return;
    	}
       	priceList.ltc.okcoin = $("#bannerLtcLast",doc).html();    
    	priceList.btc.okcoin = $("#bannerBtcLast",doc).html();
    	writeTable(priceList);

    });
    
    $btceFrame.attr("src", "https://btc-e.com/");  
    $btceFrame.load(function(){
    	var doc = $btceFrame.get(0).contentDocument;
    	if(!$("#last1",doc).html()){
    		setTimeout(function(){
    			$okcoinFrame.attr("src","http://bter.com");
    		},1000);
    		return;
    	}
    	priceList.btc.btce = (parseFloat($("#last1", doc).html()) * rate).toFixed(2);
    	priceList.ltc.btce = (parseFloat($("#last14",doc).html()) * rate).toFixed(2);
    	priceList.nmc.btce = (parseFloat($("#last28",doc).html()) * rate).toFixed(2);
    	priceList.ppc.btce = (parseFloat($("#last31",doc).html()) * rate).toFixed(2);
    	writeTable(priceList);
        if(DB){
            if(!DB.get("historyPrice")){
                DB.set("historyPrice",JSON.stringify(priceList));
            }else {
                if(DB.get("lastPrice")){
                    var lastPrice = JSON.parse(DB.get("lastPrice"));
                    var historyPrice = JSON.parse(DB.get("historyPrice"));
                    debugger;
					for(var i in historyPrice) {
					    if (historyPrice.hasOwnProperty(i)) {
					    	if(historyPrice[i].okcoin != lastPrice[i].okcoin){
					    		historyPrice[i].okcoin = lastPrice[i].okcoin;
					    	}
					    	if(lastPrice[i].okcoin_last && historyPrice[i].okcoin_last != lastPrice[i].okcoin_last){
					    		historyPrice[i].okcoin_last = lastPrice[i].okcoin_last;
					    	}
					    	if(lastPrice[i].bter && historyPrice[i].bter != lastPrice[i].bter){
					    		historyPrice[i].bter = lastPrice[i].bter;
					    	}
					    	if(lastPrice[i].bter_last && historyPrice[i].bter_last != lastPrice[i].bter_last){
					    		historyPrice[i].bter_last = lastPrice[i].bter_last;
					    	}
					    	if(lastPrice[i].btce && historyPrice[i].btce != lastPrice[i].btce){
					    		historyPrice[i].btce = lastPrice[i].btce;
					    	}
					    	if(lastPrice[i].btce_last && historyPrice[i].btce_last != lastPrice[i].btce_last){
					    		historyPrice[i].btce_last = lastPrice[i].btce_last;
					    	}
					    	if(lastPrice[i].coinmarketcap_last && historyPrice[i].coinmarketcap_last != lastPrice[i].coinmarketcap_last){
					    		historyPrice[i].coinmarketcap_last = lastPrice[i].coinmarketcap_last;
					    	}
					    	if(lastPrice[i].coinmarketcap && historyPrice[i].coinmarketcap != lastPrice[i].coinmarketcap){
					    		historyPrice[i].coinmarketcap = lastPrice[i].coinmarketcap;
					    	}
					    	if(lastPrice[i].coinmarketcapUpDown && historyPrice[i].coinmarketcapUpDown != lastPrice[i].coinmarketcapUpDown){
					    		historyPrice[i].coinmarketcapUpDown = lastPrice[i].coinmarketcapUpDown;
					    	}
					    	if(lastPrice[i].coinmarketcapUpDown_last && historyPrice[i].coinmarketcapUpDown_last != lastPrice[i].coinmarketcapUpDown_last){
					    		historyPrice[i].coinmarketcapUpDown_last = lastPrice[i].coinmarketcapUpDown_last;
					    	}
					    }
					}
                    DB.set("historyPrice", JSON.stringify(historyPrice));
                }
            }
            DB.set("lastPrice",JSON.stringify(priceList));
        }
    })
    
    $bterFrame.attr("src", "http://bter.com"); 
    $bterFrame.load(function(){
        var $ul = $("#bar_left_content ul",$bterFrame.get(0).contentDocument).eq(1);
        var dataList = $("li a span",$ul);
        if(!dataList.eq(0).html()){
        	setTimeout(function(){
            	$bterFrame.attr("src","http://bter.com");
            },1000);
            return;
        }else{
        	debugger;
            priceList.btc.bter = parseFloat(dataList.eq(0).html());
            priceList.ltc.bter = parseFloat(dataList.eq(2).html());
            priceList.bqc.bter = parseFloat(dataList.eq(3).html());
            priceList.btb.bter = parseFloat(dataList.eq(4).html());
            priceList.cent.bter = parseFloat(dataList.eq(5).html());
            priceList.cmc.bter = parseFloat(dataList.eq(6).html());
            priceList.cnc.bter = parseFloat(dataList.eq(7).html());
            priceList.dtc.bter = parseFloat(dataList.eq(8).html());
            priceList.exc.bter = parseFloat(dataList.eq(9).html());
            priceList.frc.bter = parseFloat(dataList.eq(10).html());
            priceList.ftc.bter = parseFloat(dataList.eq(11).html());
            priceList.ifc.bter = parseFloat(dataList.eq(12).html());
            priceList.mec.bter = parseFloat(dataList.eq(13).html());
            priceList.nmc.bter = parseFloat(dataList.eq(14).html());
            priceList.ppc.bter = parseFloat(dataList.eq(15).html());
            priceList.pts.bter = parseFloat(dataList.eq(16).html());
            priceList.qrk.bter = parseFloat(dataList.eq(17).html());
            priceList.red.bter = parseFloat(dataList.eq(18).html());
            priceList.xpm.bter = parseFloat(dataList.eq(23).html());
            priceList.yac.bter = parseFloat(dataList.eq(24).html());
            priceList.zcc.bter = parseFloat(dataList.eq(25).html());
            writeTable(priceList);

        }
    });

    $coinmarketcap.attr("src","http://coinmarketcap.com/");
    $coinmarketcap.load(function(){
        var doc = $coinmarketcap.get(0).contentDocument;
        if(!$("#btc").length === 0){
        	setTimeout(function(){
            	$coinmarketcap.attr("src","http://coinmarketcap.com");
            },1000);
            return;
        }else{
	        for (var i = 0; i < COIN.length; i++) {
	        	var coin = COIN[i].name;
	        	if(priceList[coin] && $("#"+ coin,doc).length>0){
	        		
	        		priceList[coin].coinmarketcap = (parseFloat($("#"+ coin,doc).parent().parent().find("td").eq(3).find(".price-usd").html().replace(/[$,]/g,"")) * rate);
	        		if(priceList[coin].coinmarketcap >0.01){
	        			priceList[coin].coinmarketcap = priceList[coin].coinmarketcap.toFixed(2);
	        		}
	        		priceList[coin].coinmarketcapUpDown = parseFloat ($("#"+ coin,doc).parent().parent().find("td").eq(5).html().replace("%","")) /100;
	        	}
	        }
	        writeTable(priceList);

	   	 }
    });
      
});

});

