# Licensed under the Apache License. See footer for details.

.PHONY: vendor

WR         = node_modules/.bin/wr
SUPERVISOR = node_modules/.bin/node-supervisor
SERVE      = node_modules/.bin/serve
BROWSERIFY = node_modules/.bin/browserify
COFFEE     = node_modules/.bin/coffee
COFFEEC    = $(COFFEE) --bare --compile


.PHONY: vendor

main: help

#-------------------------------------------------------------------------------
build:
	@echo "--------------------------------------------------------------------"
	@mkdir -p lib
	@-rm  -rf lib/*

	@mkdir -p tmp/scripts
	@rm   -rf tmp/scripts/*

	@echo "compiling coffee files"
	@$(COFFEEC) --output tmp/scripts lib-src/*.coffee 

	@cp vendor/coffee-script.js tmp/scripts

	@$(COFFEE) tools/asite-build.coffee samples/a
	
	@echo "browserifying"
	@$(BROWSERIFY) \
		--debug \
		--outfile lib/asite.js \
		--noparse tmp/scripts/coffee-script.js \
		--require ./tmp/scripts/main.js:asite

	@$(COFFEE) tools/split-sourcemap-data-url.coffee lib/asite.js

#-------------------------------------------------------------------------------
serve:
	@$(SERVE)

#-------------------------------------------------------------------------------
build-n-serve: build serve

#-------------------------------------------------------------------------------
watch:
	@$(SUPERVISOR) \
	    --quiet \
	    --watch lib-src,tools,samples \
	    --extensions coffee \
	    --no-restart-on error \
	    --exec make \
	    -- build-n-serve

#-------------------------------------------------------------------------------
vendor:
	@-rm -rf  vendor/*
	@mkdir -p vendor

	@-rm -rf node_modules
	@-rm -rf bower_components

	@npm install

	@bower install angular\#1.0.x
	@bower install bootstrap\#2.3.x
	@bower install coffee-script\#1.6.x
	@bower install font-awesome\#3.2.x

	@cp bower_components/jquery/jquery.js    vendor
	@cp bower_components/angular/angular.js  vendor

	@mkdir vendor/bootstrap
	@mkdir vendor/bootstrap/css
	@mkdir vendor/bootstrap/img
	@mkdir vendor/bootstrap/js

	@cp bower_components/bootstrap/docs/assets/css/bootstrap*.css   vendor/bootstrap/css
	@cp bower_components/bootstrap/docs/assets/img/glyphicons-*.png vendor/bootstrap/img
	@cp bower_components/bootstrap/docs/assets/js/bootstrap.js      vendor/bootstrap/js

	@mkdir vendor/font-awesome
	@mkdir vendor/font-awesome/css
	@mkdir vendor/font-awesome/font

	@cp bower_components/font-awesome/css/font-awesome-ie7.css vendor/font-awesome/css
	@cp bower_components/font-awesome/css/font-awesome.css     vendor/font-awesome/css
	@cp bower_components/font-awesome/font/*				   vendor/font-awesome/font

	@cp bower_components/coffee-script/extras/coffee-script.js vendor/coffee-script.js

	rm -Rf bower_components

#-------------------------------------------------------------------------------
help:
	@echo "tasks available:"
	@echo "    build  -  build the asite script"
	@echo "    serve  -  run a local http server"
	@echo "    watch  -  build, serve, wait for src changes, build, serve ..."
	@echo "    vendor -  install 3rd party files"
	@echo "    help   -  print this help"

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
