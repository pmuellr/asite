console.log "#{__asite.file}: module(#{__asite.module}) #{__asite.type}(#{__asite.name})"

#-------------------------------------------------------------------------------
defController ($scope, itemList) ->
    $scope.items = itemList.getItems()
