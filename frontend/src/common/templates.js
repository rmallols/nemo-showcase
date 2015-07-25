angular.module('templates-main', ['home.html', 'index.html']);

angular.module("home.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("home.html",
    "<style type=\"text/css\">\n" +
    "\n" +
    "    .container {\n" +
    "        background-color: #eee;\n" +
    "        border: 1px solid #00aaef;\n" +
    "        width: 400px;\n" +
    "        margin: 0 auto;\n" +
    "        padding: 10px;\n" +
    "    }\n" +
    "\n" +
    "    .column {\n" +
    "        float: left;\n" +
    "        box-sizing: border-box;\n" +
    "        padding: 10px 20px;\n" +
    "        width: 50%;\n" +
    "    }\n" +
    "\n" +
    "    .label {\n" +
    "        text-align: right;\n" +
    "    }\n" +
    "\n" +
    "    .field {\n" +
    "        text-align: left;\n" +
    "    }\n" +
    "\n" +
    "    .field * {\n" +
    "        width: 100%;\n" +
    "    }\n" +
    "\n" +
    "    .clearfix {\n" +
    "        overflow: auto;\n" +
    "    }\n" +
    "\n" +
    "    .nemo-captcha-audio {\n" +
    "        display: none;\n" +
    "    }\n" +
    "\n" +
    "    .nemo-captcha-play {\n" +
    "        background: transparent url('/app/sample/grey-audio-Icon.png') no-repeat 0 0;\n" +
    "        width: 21px;\n" +
    "        height: 20px;\n" +
    "        display: inline-block;\n" +
    "        cursor: pointer;\n" +
    "    }\n" +
    "\n" +
    "    .nemo-captcha-refresh {\n" +
    "        cursor: pointer;\n" +
    "        text-decoration: underline;\n" +
    "    }\n" +
    "\n" +
    "    .nemo-captcha-img {\n" +
    "        display: inline-block;\n" +
    "    }\n" +
    "\n" +
    "    [input-checkbox] {\n" +
    "        width: 24px;\n" +
    "        height: 24px;\n" +
    "        border: 1px solid grey;\n" +
    "        background-color: white;\n" +
    "        cursor: pointer;\n" +
    "    }\n" +
    "\n" +
    "    [input-checkbox].focused {\n" +
    "        border-color: black;\n" +
    "    }\n" +
    "\n" +
    "    [input-checkbox] label {\n" +
    "        display: block;\n" +
    "        width: 100%;\n" +
    "        height: 100%;\n" +
    "        text-align: center;\n" +
    "        line-height: 1.7;\n" +
    "        cursor: pointer;\n" +
    "    }\n" +
    "\n" +
    "</style>\n" +
    "\n" +
    "<form nemo-form-handler class=\"container\" ng-submit=\"fakeSubmit()\" fake-form-handler novalidate>\n" +
    "    <div class=\"clearfix\" ng-repeat=\"field in fields\" data-ng-class=\"getFieldStyleClasses(field.name)\">\n" +
    "        <div class=\"column label\">\n" +
    "            <span ng-if=\"field.name == 'captchaId'\">Captcha Id</span>\n" +
    "            {{field.properties.label.message}}: {{field.value}}\n" +
    "        </div>\n" +
    "        <div class=\"column field\">\n" +
    "            <nemo-input model=\"field\" has-focus=\"$index === 0\"></nemo-input>\n" +
    "            <div class=\"field-error-icon\"\n" +
    "                 data-ng-mouseenter=\"onErrorIconHover(field.name)\"\n" +
    "                 data-ng-mouseleave=\"onErrorIconBlur(field.name)\"\n" +
    "                 data-ng-show=\"isErrorIconVisible(field.name)\">@</div>\n" +
    "            <data-nemo-validation-messages model=\"getFieldNgModelCtrl(field.name)\" class=\"field-error-wrapper\" data-t-error\n" +
    "                                           data-ng-show=\"isErrorMessageVisible(field.name)\"\n" +
    "                                           data-ng-class=\"{'is-hovered-not-active' : isHoveredAndNotActive(field.name)}\"></data-nemo-validation-messages>\n" +
    "\n" +
    "\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    Is form valid? {{isFormValid()}}\n" +
    "    <input type=\"submit\" value=\"Submit!\" />\n" +
    "</form>");
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
