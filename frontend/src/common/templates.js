angular.module('templates-main', ['home.html', 'index.html']);

angular.module("home.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("home.html",
    "<div>Hello world Home</div>");
}]);

angular.module("index.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("index.html",
    "<html ng-app=\"app\" class=\"ua-{{userAgent}}\">\n" +
    "    <head>\n" +
    "        <title ng-bind=\"pageTitle\"></title>\n" +
    "        <meta name=\"viewport\" content=\"width=device-width\"/>\n" +
    "        <link rel=\"icon\" type=\"image/png\" href=\"src/favicon.png\">\n" +
    "        <link rel=\"stylesheet\" type=\"text/css\" href=\"dist/css.css\">\n" +
    "        <script src=\"dist/js.min.js\" type=\"text/javascript\"></script>\n" +
    "    </head>\n" +
    "    <body>\n" +
    "        <div ui-view></div>\n" +
    "    </body>\n" +
    "</html>\n" +
    "\n" +
    "\n" +
    "\n" +
    "");
}]);
