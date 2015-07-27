app.controller('HomeCtrl', ['$scope', function ($scope) {

    $scope.fields = [
        {
            type: 'select',
            name: 'title',
            options: [
                {
                    text: 'Mr',
                    value: 'MrValue'
                },
                {
                    text: 'Mrs',
                    value: 'MrsValue'
                },
                {
                    text: 'Ms',
                    value: 'MsValue'
                },
                {
                    text: 'Miss',
                    value: 'MissValue'
                },
                {
                    text: 'Dr',
                    value: 'DrValue'
                },
                {
                    text: 'Rev',
                    value: 'RevValue'
                },
                {
                    text: 'Prof',
                    value: 'ProfValue'
                },
                {
                    text: 'Other',
                    value: 'OtherValue'
                }
            ],
            value: 'RevValue',
            properties: {
                "validation": [
                    {
                        "type": "required",
                        "rules": [
                            {
                                "value": true,
                                "id": "title.blank",
                                "message": "Please enter your title"
                            }
                        ]
                    },
                    {
                        "type": "inlist",
                        "rules": [
                            {
                                "value": [
                                    "MrValue",
                                    "MrsValue",
                                    "MsValue",
                                    "MissValue",
                                    "DrValue",
                                    "RevValue",
                                    "ProfValue",
                                    "OtherValue"
                                ],
                                "id": "title.invalid",
                                "message": "Title was not a valid choice"
                            }
                        ]
                    }
                ],
                "help": {
                    "code": "title.help",
                    "message": "Please choose your title"
                },
                "label": {
                    "code": "title.label",
                    "message": "Title"
                }
            }
        },
        {
            "name": "firstName",
            "type": "text",
            properties: {
                "validation": [
                    {
                        "type": "required",
                        "rules": [
                            {
                                "value": true,
                                "id": "firstName.blank",
                                "message": "Please enter your first name"
                            }
                        ]
                    },
                    {
                        "type": "maxlength",
                        "rules": [
                            {
                                "value": 50,
                                "id": "firstName.size.toobig",
                                "message": "Your first name needs to be less than 50 characters long"
                            }
                        ]
                    },
                    {
                        "type": "pattern",
                        "rules": [
                            {
                                "value": "^[a-zA-Z \\'-]+$",
                                "id": "firstName.invalid.characters",
                                "message": "Sorry, your first name can only include letters and spaces"
                            },
                            {
                                "value": "^[^-\\']",
                                "id": "firstName.invalid.characters.startorend",
                                "message": " Sorry, your first name canonly start and end with a letter"
                            },
                            {
                                "value": "[^-\\']$",
                                "id": "firstName.invalid.characters.startorend",
                                "message": "Sorry, your first name can only start and end with a letter"
                            }
                        ]
                    }
                ],
                "help": {
                    "code": "firstName.help",
                    "message": "Please enter your first name"
                },
                "label": {
                    "code": "firstName.label",
                    "message": "First name"
                },
                "businessrules": [
                    "noAutocomplete",
                    "noPaste"
                ]
            }
        },
        {
            "name": "lastName",
            "value": "y",
            "type": "text",
            properties: {
                "validation": [
                    {
                        "type": "required",
                        "rules": [
                            {
                                "value": true,
                                "id": "lastName.blank",
                                "message": "Please enter your last name"
                            }
                        ]
                    },
                    {
                        "type": "maxlength",
                        "rules": [
                            {
                                "value": 50,
                                "id": "lastName.size.toobig",
                                "message": "Your last name needs to be less than 50 characters long"
                            }
                        ]
                    },
                    {
                        "type": "dependentpattern",
                        "rules": [
                            {
                                "value": "firstName",
                                "patterns": {
                                    "frances": "(frances)",
                                    "bob": "^[a-d]+$"
                                },
                                "id": "lastName.size.toobig",
                                "message": "Must match Frances"
                            }
                        ]
                    },
                    {
                        "type": "pattern",
                        "rules": [
                            {
                                "value": "^[a-zA-Z \\'-]+$",
                                "id": "lastName.invalid.characters",
                                "message": "Sorry, your last name can only include letters and spaces"
                            },
                            {
                                "value": "^[^-\\']",
                                "id": "lastName.invalid.characters.startorend",
                                "message": "Sorry, your last name can only start and end with a letter"
                            },
                            {
                                "value": "[^-\\']$",
                                "id": "lastName.invalid.characters.startorend",
                                "message": "Sorry, your last name can only start and end with a letter"
                            }
                        ]
                    }
                ],
                "help": {
                    "code": "lastName.help",
                    "message": "Please enter your last name"
                },
                "label": {
                    "code": "lastName.label",
                    "message": "Last name"
                }
            }
        },
        {
            "name": "requiredfield",
            "value": null,
            "type": "text",
            properties: {
                "validation": [
                    {
                        "type": "dependentrequired",
                        "rules": [
                            {
                                "value" : "username",
                                "when" : [
                                    "fooUsername"
                                ],
                                "id" : "foo.dependent.required.username",
                                "message" : "Foo is required"
                            }
                        ]
                    }
                ],
                "label": {
                    "code": "requiredfield.label",
                    "message": "Dependent required"
                }
            }
        },
        {
            "name": "email",
            "value": "your@email.com",
            "type": "email",
            properties: {
                "validation": [
                    {
                        "type": "required",
                        "rules": [
                            {
                                "value": true,
                                "id": "email.blank",
                                "message": "Please enter your email address"
                            }
                        ]
                    },
                    {
                        "type": "email",
                        "rules": [
                            {
                                "value": true,
                                "id": "email.email.invalid",
                                "message": "Sorry, we do not recognise that email address, please check and try again"
                            }
                        ]
                    },
                    {
                        "type": "notpattern",
                        "rules": [
                            {
                                "value": "(\\@sky\\.co\\.uk)|(\\@sky\\.com)",
                                "id": "email.is.skycom",
                                "message": "You cannot choose a Sky email address"
                            }
                        ]
                    },
                    {
                        "type": "emailserver",
                        "rules": [
                            {
                                "value": null,
                                "id": "email.taken",
                                "message": "You've already created a Sky iD with this email address"
                            }
                        ]
                    }
                ],
                "help": {
                    "code": "email.help",
                    "message": "Tell us your email address"
                },
                "label": {
                    "code": "email.label",
                    "message": "Email address"
                }
            }
        },
        {
            "name": "confirmEmail",
            "value": "your@email.com",
            "type": "email",
            properties: {
                "validation": [
                    {
                        "type": "required",
                        "rules": [
                            {
                                "value": true,
                                "id": "confirmEmail.blank",
                                "message": "Please type your email address again"
                            }
                        ]
                    },
                    {
                        "type": "mustmatchcaseinsensitive",
                        "rules": [
                            {
                                "value": "email",
                                "id": "confirmEmail.must.match.email",
                                "message": "Sorry, your email addresses do not match. Please try again"
                            }
                        ]
                    }
                ],
                "help": {
                    "code": "confirmEmail.help",
                    "message": "Please type your email address again"
                },
                "label": {
                    "code": "confirmEmail.label",
                    "message": "Confirm email address"
                }
            }
        },
        {
            "name": "username",
            "type": "text",
            properties: {
                "validation": [
                    {
                        "type": "required",
                        "rules": [
                            {
                                "value": true,
                                "id": "username.blank",
                                "message": "Please choose a username"
                            }
                        ]
                    },
                    {
                        "type": "minlength",
                        "rules": [
                            {
                                "value": 3,
                                "id": "username.size.toosmall",
                                "message": "Your username can only have 3 - 32 characters"
                            }
                        ]
                    },
                    {
                        "type": "maxlength",
                        "rules": [
                            {
                                "value": 32,
                                "id": "username.size.toobig",
                                "message": "Your username can only have 3 - 32 characters"
                            }
                        ]
                    },
                    {
                        "type": "pattern",
                        "rules": [
                            {
                                "value": "^[a-zA-Z]+",
                                "id": "username.must.start.with.letter",
                                "message": "Your username can only start with a letter"
                            },
                            {
                                "value": "^[a-zA-Z0-9\\-\\._]+[a-zA-Z0-9]$",
                                "id": "username.invalid.characters",
                                "message": "Your username can only contain letters and numbers"
                            }
                        ]
                    },
                    {
                        "type": "notpattern",
                        "rules": [
                            {
                                "value": "[\\-\\.\\_][\\-\\.\\_]",
                                "id": "username.invalid.characters",
                                "message": "Your username can only contain letters and numbers"
                            }
                        ]
                    },
                    {
                        "type": "usernameserver",
                        "rules": [
                            {
                                "value": null,
                                "id": "username.taken",
                                "message": "Sorry, someone already has that username"
                            },
                            {
                                "value": null,
                                "id": "username.contains.profanity",
                                "message": "This is not a valid username"
                            }
                        ]
                    }
                ],
                "help": {
                    "code": "username.help",
                    "message": "Your username must have 3-32 characters and must only contain letters and numbers"
                },
                "label": {
                    "code": "username.label",
                    "message": "Username"
                }
            }
        },
        {
            "name": "password",
            "type": "password",
            properties: {
                "validation": [
                    {
                        "type": "required",
                        "rules": [
                            {
                                "value": true,
                                "id": "password.blank",
                                "message": "Please enter a valid password, it can't contain your username or the word 'password'"
                            }
                        ]
                    },
                    {
                        "type": "minlength",
                        "rules": [
                            {
                                "value": 8,
                                "id": "password.size.toosmall",
                                "message": "Your password can only have 8 - 32 characters"
                            }
                        ]
                    },
                    {
                        "type": "maxlength",
                        "rules": [
                            {
                                "value": 32,
                                "id": "password.size.toobig",
                                "message": "Your password can only have 8 - 32 characters"
                            }
                        ]
                    },
                    {
                        "type": "mustnotcontain",
                        "rules": [
                            {
                                "value": "username",
                                "id": "password.contains.username",
                                "message": "Please enter a valid password, it can't contain your username or the word 'password'"
                            }
                        ]
                    },
                    {
                        "type": "pattern",
                        "rules": [
                            {
                                "value": "[A-Za-z]",
                                "id": "password.must.contain.letter",
                                "message": "Your password needs to contain at least one letter"
                            },
                            {
                                "value": "^[\\!-\\%\\'-;=\\?-~]+$",
                                "id": "password.invalid.characters",
                                "message": "Your password contains invalid characters"
                            }
                        ]
                    },
                    {
                        "type": "notpattern",
                        "rules": [
                            {
                                "value": "(password)",
                                "id": "password.invalid",
                                "message": "Please enter a valid password, it can't contain your username or the word 'password'"
                            }
                        ]
                    }
                ],
                "help": {
                    "code": "password.help",
                    "message": "Must have 8-32 characters and cannot contain your username or the word 'password'"
                },
                "label": {
                    "code": "password.label",
                    "message": "Password"
                }
            }
        },
        {
            "name": "confirmPassword",
            "type": "password",
            properties: {
                "validation": [
                    {
                        "type": "required",
                        "rules": [
                            {
                                "value": true,
                                "id": "confirmPassword.blank",
                                "message": "Please type your password again"
                            }
                        ]
                    },
                    {
                        "type": "mustmatch",
                        "rules": [
                            {
                                "value": "password",
                                "id": "confirmPassword.must.match.password",
                                "message": "The passwords you entered didn't match. Please try again"
                            }
                        ]
                    }
                ],
                "help": {
                    "code": "confirmPassword.help",
                    "message": "Please type your password again"
                },
                "label": {
                    "code": "confirmPassword.label",
                    "message": "Confirm password"
                }
            }
        },
        {
            "name": "captcha",
            "type": "captchamario",
            properties: {
                "help": {
                    "code": "captcha.help",
                    "message": "Please complete the level"
                },
                "label": {
                    "code": "captcha.label",
                    "message": "Super mario captcha"
                },
                "validation": [
                    {
                        "type": "levelcomplete",
                        "rules": [
                            {
                                "id": "captcha.levelComplete",
                                "value": true,
                                "message": "You're NOT a human, STOP cheating please!"
                            }
                        ]
                    }
                ]
            }
        },
        {
            "name": "terms",
            "type": "checkbox",
            "value": true,
            properties: {
                "validation": [
                    {
                        "type": "mustbeequal",
                        "rules": [
                            {
                                "value": true,
                                "id": "terms.notequal",
                                "message": "You need to agree to the terms and conditions"
                            }
                        ]
                    }
                ],
                "help": {},
                "label": {
                    "code": "terms.label",
                    "message": "I have read and agree to the Sky terms & conditions and privacy & cookies notice"
                }
            }
        },
        {
            "name": "marketingConsent",
            "type": "checkbox",
            properties: {
                "validation": [],
                "help": {},
                "label": {
                    "code": "marketingConsent.label",
                    "message": "Sky may contact you about products and services you may like unless you click to opt out"
                }
            }
        },
        {
            "name": "serviceTerms",
            "type": "checkbox",
            properties: {
                "validation": [
                    {
                        "type": "mustbeequal",
                        "rules": [
                            {
                                "value": true,
                                "id": "serviceTerms.notequal",
                                "message": "You need to agree to the terms and conditions"
                            }
                        ]
                    }
                ],
                "help": {},
                "label": {
                    "code": "serviceTerms.label",
                    "message": "I have read and agree to the NOW TV terms & conditions"
                }
            }
        }
    ];
}])
    .directive('fakeFormHandler', [function () {
        return{
            require: 'nemoFormHandler',
            link: function (scope, element, attrs, formHandlerCtrl) {

                var iconVisibilityStates = {};

                scope.fakeSubmit = function () {
                    formHandlerCtrl.validateFormAndSetDirtyTouched();
                    if (scope.isFormValid()) {
                        formHandlerCtrl.forceInvalid('captcha.invalid');
                        formHandlerCtrl.giveFirstInvalidFieldFocus();
                    } else {
                        formHandlerCtrl.giveFirstInvalidFieldFocus();
                    }
                };

                scope.isFormValid = formHandlerCtrl.isFormValid;


                scope.getFieldStyleClasses = function (fieldName) {
                    return {
                        'ng-touched': formHandlerCtrl.isFieldTouched(fieldName),
                        'ng-invalid': !formHandlerCtrl.isFieldValid(fieldName)
                    };
                };

                scope.onErrorIconHover = function (fieldName) {
                    iconVisibilityStates[fieldName] = true;
                };

                scope.onErrorIconBlur = function (fieldName) {
                    iconVisibilityStates[fieldName] = false;
                };

                scope.isErrorIconVisible = function (fieldName) {
                    var isInvalid = !formHandlerCtrl.isFieldValid(fieldName),
                        isTouched = formHandlerCtrl.isFieldTouched(fieldName);
                    return isInvalid && isTouched;
                };

                scope.isErrorMessageVisible = function (fieldName) {
                    var isInvalid = !formHandlerCtrl.isFieldValid(fieldName),
                        isActive = formHandlerCtrl.isFieldActive(fieldName),
                        isTouched = formHandlerCtrl.isFieldTouched(fieldName),
                        isErrorIconHovered = iconVisibilityStates[fieldName];
                    return isInvalid && (isErrorIconHovered || (isActive && isTouched));
                };

                scope.isHoveredAndNotActive = function (fieldName) {
                    return iconVisibilityStates[fieldName] && !formHandlerCtrl.isFieldActive(fieldName);
                };

                scope.getFieldNgModelCtrl = formHandlerCtrl.getFieldNgModelCtrl;
            }
        }
    }]);