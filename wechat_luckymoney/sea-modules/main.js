/* global require, define,console,art */
//TODO 监听已打开对话框的对话

define(function(require, exports, module) {
"use strict";
var $ = require("jquery");
require("./bootstrap")($);
//var DB = require("./db");
var hasSentList = [];

$(document).ready(function() {
    var wxIframe = $("#wxIframe");
    var btnLogin = $("#btnLogin");
    var description = $("#description");

    var d = setInterval(function() {

        var doc = wxIframe.get(0).contentDocument;
        var win = wxIframe.get(0).contentWindow;
        var chatList = $("#conversationContainer", doc);

        if (chatList.length < 0) {
            return;
        }
        var chatListColumn = chatList.find(".chatListColumn");
        var chatmsglist = $("#chat_chatmsglist", doc);
        for (var i = 0; i < chatListColumn.length; i++) {
            var unreadDot = $(".unreadDot", chatListColumn[i]);
            var unreadDotS = $(".unreadDotS", chatListColumn[i]);

            if (unreadDot.css("display") != "none" || unreadDotS.css("display") != "none") {
                if($(".desc",chatListColumn[i]).html().indexOf("[链接]")==-1){
                    break;
                }
                debugger;
                var count = 0;
                if(unreadDot.css("display") != "none"){
                    count = unreadDot.html();
                }else{
                    count = 5;
                }
                chatListColumn.eq(i).trigger("click");

                setTimeout(function() {
                    chatmsglist = $("#chat_chatmsglist", doc);
                    var chatmsglistItems = chatmsglist.find(".chatItem");
                    for (var i = count - 1; i >= 0; i--) {
                        var link = chatmsglistItems.eq(i).find(".cloudMesgPanel a");

                        if (link.length > 0) {
                            if (link.attr("href").indexOf("hongbao") > 0) {
                                var flag = false;
                                for(var k =0;k<hasSentList.length;k++){
                                    if(hasSentList[k]== link.attr("href")){
                                        
                                        flag= true;  //去重
                                        break;
                                    }
                                }

                                if(flag){
                                    continue;
                                }
                                var nick = $(".chatItemContent img", chatmsglistItems[i]);
                                if(nick.length>0){
                                    nick = nick.attr("title");
                                }else{
                                    nick = "未知何许人也";
                                }

                                var group = $("#messagePanelTitle",doc);
                                if(group.length>0){
                                    group = group.html();
                                }else{
                                    group = "未知何许组也";
                                }
                                var date = new Date();
                                
                                $("#wxIframe").get(0).contentWindow.$("#conv_filehelper").trigger("click");
                                var input = win.WebMM.getCtrlInstants("chat_editor").getDom$().find(".chatInput");
                                input.insertTextToInput("发红包人："+ nick + ";\r\n");
                                input.insertTextToInput("发送群："+ group + ";\r\n");
                                input.insertTextToInput("发送时间："+ date.toString() + ";\r\n");
                                input.insertTextToInput("链接："+ link.attr("href"));
                                hasSentList.push(link.attr("href"));
                                if(hasSentList.length>50){
                                    hasSentList.splice(0,20);
                                }
                                win.WebMM.getCtrlInstants("chat_editor").getDom$().find(".chatSend").click();
                                break;
                            }
                        }
                    }
                }, 100);
                break;
            }
        }
    }, 1000);
});
});