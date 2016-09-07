(function(){
	'use-strict';

	angular
		.module('App.main', [])
		.controller('mainController', mainController);

	mainController.$inject = ['contextManager'];

	function mainController(contextManager){
		var vm = this;

		// Declaration
		vm.init = init;
		vm.getItem = getItem;
		vm.addItem = addItem;
		vm.editItem = editItem;
		vm.getItemProp = getItemProp;
		vm.getAllStorage = getAllStorage;
		vm.clearAllStorage = clearAllStorage;
		vm.storeEntireObject = storeEntireObject;

		// Definition
		function init(){ contextManager.debug = true; }

		function getItem(item){ return contextManager.getItem(item); }

		function addItem(item, propName, propValue){ contextManager.setItem(item, propName, propValue); }

		function editItem(item, propName, propValue){ contextManager.setValue(item, propName, propValue); }

		function getItemProp(item, propName){ return contextManager.getValue(item, propName); }

		function getAllStorage(){ return contextManager.getAllStorage(); }

		function clearAllStorage(){ contextManager.clear(); }

		function storeEntireObject(objName, obj){ contextManager.storeEntireObject(objName, obj); }

		// Initialization
		vm.init();
	}

})();