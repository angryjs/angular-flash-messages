(function(angular) {
'use strict';

angular.module('angryjs.flashMessages', [])

  .factory('FlashMessages', ['$rootScope', function ($rootScope) {
    var messages = [];

    var Flash = function ($rootScope) {
      this.$rootScope = $rootScope;
      $rootScope.$on('$routeChangeSuccess', this.show);
    };

    Flash.prototype.info = function(message) {
      return this.add('info', message);
    };

    Flash.prototype.error = function(message) {
      return this.add('error', message);
    };

    Flash.prototype.success = function(message) {
      return this.add('success', message);
    };

    Flash.prototype.add = function(type, message) {
      return messages.push({
        message: message,
        type: type
      });
    };

    Flash.prototype.show = function() {
      this.$rootScope.$broadcast('messages:show', messages);
      return messages = [];
    };

    Flash.prototype.reset = function() {
      return this.$rootScope.$broadcast('messages:reset');
    };

    return new Flash($rootScope);
  }])

  .directive('flashMessages', function() {
    var config, template;
    template = ['<div ng-show="messages.length">', '<div ng-repeat="(i, message) in messages" ng-show="message" class="alert alert-{{message.type}}">', '<button class="close" ng-click="closeAlertMessage(i)">×</button>', '<span>{{message.message}}</span>', '</div>', '</div>'].join("\n");
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