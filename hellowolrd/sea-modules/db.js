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