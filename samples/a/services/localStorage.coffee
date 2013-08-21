console.log "#{__asite.file}: module(#{__asite.module}) #{__asite.type}(#{__asite.name})"

Prefix = ""

#-------------------------------------------------------------------------------
defService ($window) ->

    setPrefix: (prefix) ->
        Prefix = prefix

    getItem: (key) -> 
        return $window.localStorage.getItem "#{Prefix}#{key}"

    setItem: (key, val) -> 
        return $window.localStorage.setItem "#{Prefix}#{key}", val
