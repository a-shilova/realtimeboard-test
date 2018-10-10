function emailComponentController($scope, $window) {
	$scope.emails = [{
		text: 'sidorov@gmail.com',
		isValid: true
	}];

	$scope.showCountEmails = function () {
		$window.alert($scope.emails.length);
	};

	$scope.addEmails = function () {
		var domains = ['info.com', 'yandex.ru', 'gmail.com', 'list.org', 'realtimeboard.com', 'domru.ru'];
		var domainIndex = Math.floor(Math.random() * domains.length);

		var getRandomSym = function() {
			var z = 'z'.charCodeAt(0) + 1;
			var a = 'a'.charCodeAt(0);
			var code = Math.floor(Math.random() * (z - a)) + a;

			return String.fromCharCode(code);
		};

		var userName = '';
		var userNameLength = 5;
		for (var i = 0; i < userNameLength; i++) {
			userName += getRandomSym();
		}

		$scope.emails.push({
			text: userName + '@' + domains[domainIndex],
			isValid: true
		});
	}

}

angular.module('emailEditorApp')
	.component('emailsComponent', {
		templateUrl: 'emails-component/emails-component.html',
		controller: emailComponentController
	});