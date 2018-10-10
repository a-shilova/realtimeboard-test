(function(angular) {
'use strict';

angular.module('emailEditorApp')
	.directive('emailsEditor', ['$timeout', function ($timeout) {
		return {
			restrict: 'EA',
			transclude: true,
			templateUrl: 'emails-editor/emails-editor.html',
			scope: {
				emails: '='
			},
			link: function(scope, element, attrs) {
				/**
				 * Add new emails to list after push ENTER, ',' and blur input
				 */
				scope.onChangeInput = function () {
					$timeout(function() {
						var input = scope.inputEmail;
						if (input.length > 0) {
							pushEmails(input);
						}
					});
				};

				scope.onPaste = function ($event) {
					console.log($event);
					$timeout(function() {
						pushEmails(angular.element($event.target).val());
					});
				};

				scope.remove = function(el) {
					var index = scope.emails.indexOf(el);
					scope.emails.splice(index, 1);
				};


				/**
				 * Add emails to DOM and clear input
				 * @param str
				 */
				var pushEmails = function(str) {
					var reg = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

					if (str.indexOf(',') > -1) {
						var emails = getEmailsList(str);
						emails.forEach(function(email) {
							var isValid = reg.test(String(email).toLowerCase());

							scope.emails.push({
								text: email,
								isValid: isValid
							})
						});
					} else {
                        var isValid = reg.test(String(str).toLowerCase());

                        scope.emails.push({
							text: str,
							isValid: isValid
						});
					}
					scope.inputEmail = '';
				};

				/**
				 * Generate list emails from string
				 * @param {string} str
				 * @returns {Array<string>}
				 */
				var getEmailsList = function(str) {
					str = str.replace(/\s/g, "");
					var emails = str.split(',');
					var count = emails.length;

					if (emails[count - 1].length === 0) {
						emails.pop();
					}

					return emails.filter(function(email) {
						return email.length > 0;
					});
				}
			}
		}
	}]);})(window.angular);