app.directive 'messages', ->
  template = [
    '<div ng-show="messages.length">'
    '<div ng-repeat="(i, message) in messages" ng-show="message" class="alert alert-{{message.type}}">',
    '<button class="close" ng-click="closeAlertMessage(i)">×</button>',
    '<span>{{message.message}}</span>',
    '</div>',
    '</div>'
  ].join("\n");

  config =
    scope: {}
    restrict: 'E'
    template: template
    replace: yes
    link: (scope, element) ->

      scope.$on 'messages:show', (event, messages) ->
        scope.messages = messages

      scope.$on 'messages:reset', ->
        scope.messages = []

      scope.closeAlertMessage = (index) ->
        delete scope.messages[index]

  config