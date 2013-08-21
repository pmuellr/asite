console.log "#{__asite.file}: module(#{__asite.module}) #{__asite.type}(#{__asite.name})"

ItemList = []
ItemMap  = {}
LastId   = 0

#-------------------------------------------------------------------------------
defService (localStorage) ->

    load()

    #---------------------------------------------------------------------------
    getItems: (id) -> 
        return ItemList

    #---------------------------------------------------------------------------
    getItem: (id) -> 
        return ItemMap[id]

    #---------------------------------------------------------------------------
    addItem: (text="") ->
        item = 
            id:   nextId()
            text: text
            date: new Date()

        ItemMap[id] = item
        ItemList.push item

        return item

    #---------------------------------------------------------------------------
    delItem: (id) ->
        item = ItemMap[id]
        return if !item?

        index = ItemList.indexOf item
        return if -1 == index

        ItemList.splice index, 1
        return item

#-------------------------------------------------------------------------------
nextId = ->
    LastId++
    save()

    return LastId

#-------------------------------------------------------------------------------
load = ->
    LastId    = localStorage.getItem "LastId"
    itemsJSON = localStorage.getItem "ItemList"

    ItemList = JSON.parse itemsJSON
    ItemMap  = {}

    for item in ItemList
        ItemMap[item.id] = item
        
    return

#-------------------------------------------------------------------------------
save = ->
    localStorage.setItem "LastId",   LastId
    localStorage.setItem "ItemList", JSON.stringify(ItemList)
        
    return
