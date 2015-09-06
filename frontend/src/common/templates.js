angular.module('templates-main', ['home.html', 'index.html', 'stats.html', 'thanks.html']);

angular.module("home.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("home.html",
    "<form nemo-form-handler home-form-handler class=\"container\" ng-submit=\"submit()\"\n" +
    "      ng-show=\"fields\" novalidate>\n" +
    "    <div class=\"clearfix\" ng-repeat=\"field in fields\"\n" +
    "         data-ng-class=\"getFieldStyleClasses(field.name)\">\n" +
    "        <div class=\"column column_label\">\n" +
    "            <span ng-if=\"field.name == 'captchaId'\">Captcha Id</span>\n" +
    "            {{field.properties.label.message}}: {{field.value}}\n" +
    "        </div>\n" +
    "        <div class=\"column column_field\">\n" +
    "            <div class=\"input-wrapper\">\n" +
    "                <data-nemo-input model=\"field\" has-focus=\"$index === 0\"></data-nemo-input>\n" +
    "                <data-nemo-icon type=\"{{getMessageType(field.name)}}\" field-name=\"{{field.name}}\"\n" +
    "                                on-hover=\"onIconHover(fieldName)\" on-blur=\"onIconBlur(fieldName)\"></data-nemo-icon>\n" +
    "                <data-nemo-validation-messages model=\"getFieldNgModelCtrl(field.name)\" class=\"field-error-wrapper\"\n" +
    "                                               data-t-error data-ng-if=\"isErrorMessageVisible(field.name)\"></data-nemo-validation-messages>\n" +
    "                <data-nemo-help-messages field-name=\"{{field.name}}\" model=\"field.properties.help\" class=\"field-help-wrapper\"\n" +
    "                                         data-t-help data-ng-if=\"isHelpMessageVisible(field.name)\"></data-nemo-help-messages>\n" +
    "            </div>\n" +
    "\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    Is form valid? {{isFormValid()}}\n" +
    "    <input type=\"submit\" value=\"Submit!\"/>\n" +
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
    "        <loading></loading>\n" +
    "    </body>\n" +
    "</html>\n" +
    "\n" +
    "\n" +
    "\n" +
    "");
}]);

angular.module("stats.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("stats.html",
    "<h1>Error stats</h1>\n" +
    "<linechart data=\"data\" options=\"options\" mode=\"\" width=\"900\" height=\"500\"></linechart>\n" +
    "<br/><br/>\n" +
    "<a ui-sref=\"home\">Go back to the form</a>");
}]);

angular.module("thanks.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("thanks.html",
    "Hello thanks");
}]);
