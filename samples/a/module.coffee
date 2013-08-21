console.log "#{__asite.file}: module(#{__asite.module}) moduleObject(#{module})"

#-------------------------------------------------------------------------------
module.config (localStorage) ->
    localStorage.setPrefix "asite.sample-a"

#-------------------------------------------------------------------------------
module.run ->
