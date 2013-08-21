console.log "#{__asite.file}: module(#{__asite.module}) #{__asite.type}(#{__asite.name})"

#-------------------------------------------------------------------------------
defController ($scope, $routeParams, itemList) ->
    $scope.item = itemList.getItem $routeParams.id
