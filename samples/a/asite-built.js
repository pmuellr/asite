// generated on Tue Aug 20 2013 23:42:45 GMT-0400 (EDT);
eval("(function(__asite, module){\nconsole.log(\"\" + __asite.file + \": module(\" + __asite.module + \") moduleObject(\" + module + \")\");\n\nmodule.config(function(localStorage) {\n  return localStorage.setPrefix(\"asite.sample-a\");\n});\n\nmodule.run(function() {});\n\n})(\n    {\"file\":\"samples/a/module.coffee\",\"module\":\"a\"},\n    angular.module(\"a\", [])\n)\n//# sourceURL=http://asite/samples/a/module.coffee\n");
eval("(function(__asite){\ndefRoute = function(view, url) {\n    var amod = angular.module('a')\n    amod.config(function($routeProvider) {\n        if (view)\n            $routerProvider.when(url, {\n                templateUrl: 'a/views/' + view + '.html',\n                controller:  view + '-controller'\n            })\n        else\n            $routerProvider.otherwise({\n                redirectTo: url\n            })\n    })\n}\nconsole.log(\"\" + __asite.file + \": module(\" + __asite.module + \") routes\");\ndefRoute(\"list\", \"/list\");\ndefRoute(\"item\", \"/item/:id\");\ndefRoute(null, \"/list\");\n})(\n    {\"file\":\"samples/a/routes.coffee\",\"module\":\"a\"}\n)\n//# sourceURL=http://asite/samples/a/routes.coffee\n");
eval("(function(__asite){\ndefController = function(fn) {\n    var amod = angular.module('a')\n    amod.controller('body.coffee', fn)\n}\nconsole.log(\"\" + __asite.file + \": module(\" + __asite.module + \") \" + __asite.type + \"(\" + __asite.name + \")\");\ndefController(function($scope) {\n  return console.log(\"$scope: \" + $scope);\n});\n})(\n    {\"file\":\"samples/a/controllers/body.coffee\",\"module\":\"a\"}\n)\n//# sourceURL=http://asite/samples/a/controllers/body.coffee\n");
eval("(function(__asite){\ndefController = function(fn) {\n    var amod = angular.module('a')\n    amod.controller('item.coffee', fn)\n}\nconsole.log(\"\" + __asite.file + \": module(\" + __asite.module + \") \" + __asite.type + \"(\" + __asite.name + \")\");\ndefController(function($scope, $routeParams, itemList) {\n  return $scope.item = itemList.getItem($routeParams.id);\n});\n})(\n    {\"file\":\"samples/a/controllers/item.coffee\",\"module\":\"a\"}\n)\n//# sourceURL=http://asite/samples/a/controllers/item.coffee\n");
eval("(function(__asite){\ndefController = function(fn) {\n    var amod = angular.module('a')\n    amod.controller('list.coffee', fn)\n}\nconsole.log(\"\" + __asite.file + \": module(\" + __asite.module + \") \" + __asite.type + \"(\" + __asite.name + \")\");\ndefController(function($scope, itemList) {\n  return $scope.items = itemList.getItems();\n});\n})(\n    {\"file\":\"samples/a/controllers/list.coffee\",\"module\":\"a\"}\n)\n//# sourceURL=http://asite/samples/a/controllers/list.coffee\n");
eval("1+1\n//# sourceURL=http://asite/samples/a/services/itemList.coffee\n");
eval("1+1\n//# sourceURL=http://asite/samples/a/services/localStorage.coffee\n");
