(function(angular) {
'use strict';

angular.module('angryjs.flashMessages', [])

  .factory('FlashMessages', ['$rootScope', function ($rootScope) {
    var messages = [];

    var FlashMessages = function ($rootScope) {
      var self = this;
      this.$rootScope = $rootScope;
      $rootScope.$on('$routeChangeSuccess', function () {
        self.show();
      });
    };

    FlashMessages.prototype.info = function(message) {
      return this.add('info', message);
    };

    FlashMessages.prototype.error = function(message) {
      return this.add('danger', message);
    };

    FlashMessages.prototype.warning = function(message) {
      return this.add('warning', message);
    };

    FlashMessages.prototype.success = function(message) {
      return this.add('success', message);
    };

    FlashMessages.prototype.add = function(type, message) {
      return messages.push({
        message: message,
        type: type
      });
    };

    FlashMessages.prototype.show = function() {
      this.$rootScope.$broadcast('messages:show', messages);
      messages = [];
    };

    FlashMessages.prototype.reset = function() {
      this.$rootScope.$broadcast('messages:reset');
      messages = [];
    };

    return new FlashMessages($rootScope);
  }])

  .directive('flashMessages', function() {
    var config, template;
    template = [
      '<div ng-show="messages.length">',
        '<div ng-repeat="(i, message) in messages" ng-show="message" class="alert alert-{{message.type}}">',
          '<button class="close" ng-click="closeAlertMessage(i)">&times;</button>', '<span>{{message.message}}</span>',
        '</div>',
      '</div>'
    ].join("\n");
    config = {
      scope: {},
      restrict: 'E',
      template: template,
      replace: true,
      link: function(scope, element) {
        scope.$on('messages:show', function(event, messages) {
          return scope.messages = messages;
        });
        scope.$on('messages:reset', function() {
          return scope.messages = [];
        });
        return scope.closeAlertMessage = function(index) {
          return delete scope.messages[index];
        };
      }
    };
    return config;
  });


})(window.angular);