console.log "#{__asite.file}: module(#{__asite.module}) routes"

#-------------------------------------------------------------------------------
defRoute "list", "/list"
defRoute "item", "/item/:id"
defRoute null,   "/list"
