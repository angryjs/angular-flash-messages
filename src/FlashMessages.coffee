class Flash

  messages = []

  constructor: (@$rootScope) ->
    $rootScope.$on '$routeChangeSuccess', =>
      @show()

  info: (message) ->
    @add 'info', message

  error: (message) ->
    @add 'error', message

  success: (message) ->
    @add 'success', message

  add: (type, message) ->
    messages.push
      message: message
      type: type

  show: ->
    @$rootScope.$broadcast 'messages:show', messages
    messages = []

  reset: ->
    @$rootScope.$broadcast 'messages:reset'

appService.factory 'Flash', ['$rootScope', ($rootScope) ->
  new Flash $rootScope
]