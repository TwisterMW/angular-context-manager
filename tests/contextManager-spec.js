(function(){
	'use strict';

	describe('Test suite for context manager', function(){

		var scope, mainController, $contextManager;

		beforeEach(module('App'));

		beforeEach(inject(function($rootScope, $controller, $injector){
			scope = $rootScope.$new();

			$contextManager = $injector.get('contextManager');

			mainController = $controller('mainController', {
				$scope: scope,
				contextManager: $contextManager
			});

		}));

		
		describe('When we initialize the controller', function(){
			it('should be properly defined', function(){
				expect(mainController).toBeDefined();
			});
		});

		describe('When we call add item function', function(){
			it('it should be properly stored as stringified JSON object', function(){
				mainController.addItem('context', 'user', 'Marc Hernández');
				
				expect(window.sessionStorage.getItem('context')).toEqual(JSON.stringify({
					'user': 'Marc Hernández'
				}));

				mainController.clearAllStorage();

				expect(JSON.stringify(window.sessionStorage)).toEqual('{}');
			});
		});

		describe('When we try to get entire object', function(){
			it('it should retrieve the entire object', function(){
				mainController.addItem('context', 'user', 'Marc Hernández');

				var item = mainController.getItem('context');

				expect(JSON.stringify(item)).toEqual(JSON.stringify({ 'user': 'Marc Hernández' }));
			});
		});

		describe('When we try to set a property of existing object', function(){
			it('should properly add the attribute to existing object and store it', function(){
				var item = JSON.stringify({ 'user': 'Marc Hernández' });

				window.sessionStorage.setItem('context', item);
				mainController.editItem('context', 'pass', '123456');

				expect(window.sessionStorage.getItem('context')).toEqual(JSON.stringify({
					'user': 'Marc Hernández',
					'pass': '123456'
				}));

				mainController.clearAllStorage();

				expect(JSON.stringify(window.sessionStorage)).toEqual('{}');
			});
		});

		describe('When we try to set a property of non existing object', function(){
			it('should throw an error as a console output and the sessionStorage mustn\'t be changed', function(){
				var item = JSON.stringify({ 'user': 'Marc Hernández' });

				window.sessionStorage.setItem('context', item);
				mainController.editItem('contxet', 'pass', '123456');

				expect(JSON.stringify(window.sessionStorage)).toEqual(JSON.stringify({'context': item }));

				mainController.clearAllStorage();

				expect(JSON.stringify(window.sessionStorage)).toEqual('{}');
			});
		});

		describe('When we try to get non existing property from existing stored object', function(){
			it('should not retrieve the value of property', function(){
				var item = JSON.stringify({ 'user': 'Marc Hernández' });

				window.sessionStorage.setItem('context', item);
				var prop = mainController.getItemProp('context', 'pass');

				expect(prop).toBe(undefined);

				mainController.clearAllStorage();

				expect(JSON.stringify(window.sessionStorage)).toEqual('{}');
			});
		});

		describe('When we try to a property of non existing object', function(){
			it('should not retrieve the value of property', function(){
				var item = JSON.stringify({ 'user': 'Marc Hernández' });

				window.sessionStorage.setItem('context', item);
				var prop = mainController.getItemProp('contxet', 'user');

				expect(prop).toBe(undefined);

				mainController.clearAllStorage();

				expect(JSON.stringify(window.sessionStorage)).toEqual('{}');
			});
		});

		describe('When we call getAllStorage', function(){
			it('should retrieve the entire object window.sessionStorage', function(){
				var item = JSON.stringify({ 'user': 'Marc Hernández' });

				window.sessionStorage.setItem('context', item);
				var storage = mainController.getAllStorage();

				expect(JSON.stringify(storage)).toEqual(JSON.stringify({ 'context': item }));

				mainController.clearAllStorage();

				expect(JSON.stringify(window.sessionStorage)).toEqual('{}');
			});
		});

		describe('When we call clear function', function(){
			it('should clean all sessionStorage object', function(){
				var item = JSON.stringify({ 'user': 'Marc Hernández' });

				window.sessionStorage.setItem('context', item);
				mainController.clearAllStorage();

				expect(JSON.stringify(window.sessionStorage)).toEqual('{}');
			});
		});

		describe('When we try to store a entire JS object', function(){
			it('should properly store the object with their properties', function(){
				var userObj = {
					user: 'twistermw',
					pass: '',
					email: [
						{
							domain: 'com',
							type: 'hotmail',
							direction: 'marcmhn'
						},{
							domain: 'com',
							type: 'twiscript',
							direction: 'marc.hernandez'
						}
					]
				};

				mainController.storeEntireObject('context', userObj);

				expect(window.sessionStorage.getItem('context')).toEqual(JSON.stringify(userObj));
			});
		});

	});

})();