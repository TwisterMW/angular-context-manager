(function(){
	'use-strict';

	angular
		.module('App.contextManager', [])
		.factory('contextManager', contextManager);

	contextManager.$inject = ['$log'];

	function contextManager($log){
		var debug = false;
		var STR_OUTPUT = "SStorage Out: ";

		// Declaration
		var service = {
			clear: clear,
			debug: debug,
			setItem: setItem,
			getItem: getItem,
			setValue: setValue,
			getValue: getValue,
			STR_OUTPUT: STR_OUTPUT,
			getAllStorage: getAllStorage,
			storeEntireObject: storeEntireObject
		};

		return service;

		// Definition
		function setItem(item, propName, propValue){
			var obj = {};

			obj[propName] = propValue;
			window.sessionStorage.setItem(item, JSON.stringify(obj));

			if(this.debug) $log.info(STR_OUTPUT + "Value of item: " + window.sessionStorage.getItem(item));
		}

		function getItem(item){
			if(this.debug) $log.info(STR_OUTPUT + "Value of item: " + window.sessionStorage.getItem(item));

			if(JSON.parse(window.sessionStorage.getItem(item)) !== null){
				return JSON.parse(window.sessionStorage.getItem(item));
			}else{
				if(this.debug) $log.warn(STR_OUTPUT + "You're trying to get non existing object! Obj: " + item);
			}
		}

		function setValue(item, propName, propValue){
			var obj = JSON.parse(window.sessionStorage.getItem(item));

			if(obj !== null){
				obj[propName] = propValue;
				window.sessionStorage.setItem(item, JSON.stringify(obj));

				if(this.debug) $log.info(STR_OUTPUT + "Value of item: " + window.sessionStorage.getItem(item));

			}else{
				if(this.debug) $log.error(STR_OUTPUT + "Object " + item + " doesn't exist!");
			}
		}

		function getValue(item, propName){
			if(JSON.parse(window.sessionStorage.getItem(item)) !== null){
				if(JSON.parse(window.sessionStorage.getItem(item))[propName] !== undefined){
					if(this.debug) $log.info(STR_OUTPUT + "Value of item: " + window.sessionStorage.getItem(item)[propName]);

					return JSON.parse(window.sessionStorage.getItem(item))[propName];
				}else{
					if(this.debug) $log.warn(STR_OUTPUT + "You're trying to get an undefined property! Prop: " + propName);
				}
			}else{
				if(this.debug) $log.error(STR_OUTPUT + "Object " + item + " doesn't exist!");
			}
		}

		function clear(){
			window.sessionStorage.clear();

			if(this.debug) $log.info(STR_OUTPUT + "Value of session storage: " + JSON.stringify(window.sessionStorage));
		}

		function getAllStorage(){
			if(this.debug) $log.info(STR_OUTPUT + "Value of session storage: " + JSON.stringify(window.sessionStorage));

			return window.sessionStorage;
		}

		function storeEntireObject(objName, obj){
			if(this.debug) $log.info(STR_OUTPUT + "Value of object: " + JSON.stringify(obj));

			window.sessionStorage.setItem(objName, JSON.stringify(obj));

			if(this.debug) $log.info(STR_OUTPUT + "Value of session storage: " + JSON.stringify(window.sessionStorage));
		}
	}

})();