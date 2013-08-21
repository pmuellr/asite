# Licensed under the Apache License. See footer for details.

fs   = require "fs"
path = require "path"

coffee = require "coffee-script"

PROGRAM = path.basename(__filename)

#-------------------------------------------------------------------------------
main = (iDirName) ->
    unless fs.existsSync iDirName
        exit 1, "input directory '#{iDirName}' does not exist"

    stat = fs.statSync iDirName
    unless stat.isDirectory()
        exit 1, "input directory '#{iDirName}' isn't a directory"

    #----------------------------------
    oFileName = path.join iDirName, "asite-built.js"

    files = collectFiles iDirName, path.basename(path.resolve(iDirName))

    options =
        bare: true

    for file in files
        file.js = coffee.compile fs.readFileSync(file.name, "utf8"), options

    #----------------------------------
    lines = [ "// generated on #{new Date()}" ]

    for file in files
        evalDef  = processFile(file)
        evalDef += "\n//# sourceURL=http://asite/#{file.name}\n"

        evalDef = JSON.stringify(evalDef)
        lines.push "eval(#{evalDef})"

    lines.push ""
    lines = lines.join(";\n")

    fs.writeFileSync oFileName, lines
    log "generated file: #{oFileName}"

#-------------------------------------------------------------------------------
processFile = (file) ->
    switch
        when file.type is "module"     then return processFileModule     file
        when file.type is "routes"     then return processFileRoutes     file
        when file.type is "controller" then return processFileController file
        when file.type is "service"    then return processFileService    file

        else exit 1, "unknown type: #{file.type}"

#-------------------------------------------------------------------------------
processFileModule = (file) ->
    __asite = 
        file:   file.name
        module: file.module

    parms = []
    args  = []

    parms.push "__asite"
    args.push  JSON.stringify(__asite)

    parms.push "module"
    args.push  """angular.module("#{file.module}", [])"""

    result = """(function(#{parms.join ", "}){
        #{file.js}
        })(
            #{args.join ",\n    "}
        )"""

    console.log result
    return result

#-------------------------------------------------------------------------------
processFileRoutes = (file) ->
    return "1+1"

#-------------------------------------------------------------------------------
processFileController = (file) ->
    return "1+1"

#-------------------------------------------------------------------------------
processFileService = (file) ->
    return "1+1"

#-------------------------------------------------------------------------------
collectFiles = (iDirName, module) ->
    files = []

    if fs.existsSync "#{iDirName}/module.coffee"
        files.push
            module: module
            name:  "#{iDirName}/module.coffee"
            type:  "module"

    if fs.existsSync "#{iDirName}/routes.coffee"
        files.push
            module: module
            name:   "#{iDirName}/routes.coffee"
            type:   "routes"
            
    entries = fs.readdirSync "#{iDirName}/controllers"
    for entry in entries
        files.push
            module: module
            name:   "#{iDirName}/controllers/#{entry}"
            type:   "controller"

    entries = fs.readdirSync "#{iDirName}/services"
    for entry in entries
        files.push
            module: module
            name:   "#{iDirName}/services/#{entry}"
            type:   "service"

    return files

#-------------------------------------------------------------------------------
exit = (code, message) ->
    log(message)
    process.exit(code)
    return

#-------------------------------------------------------------------------------
log = (message) ->
    console.log "#{PROGRAM}: #{message}"
    return

#-------------------------------------------------------------------------------
main(process.argv[2])

#-------------------------------------------------------------------------------
# Copyright 2013 Patrick Mueller
# 
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
# 
#    http://www.apache.org/licenses/LICENSE-2.0
# 
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#-------------------------------------------------------------------------------
