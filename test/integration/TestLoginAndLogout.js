/* globals element, by, browser */

describe('User login and logout process', function () {
    "use strict";

    var LoginPage = function () {
        var facebookLoginButton = element(by.id('facebook-login-button'));

        this.get = function () {
            browser.get('http://0.0.0.0:9000/#/');
        };

        this.login = function () {
            facebookLoginButton.click();
        };

    };

    var loginPage = new LoginPage();

    beforeEach(function () {
        loginPage.get();
    });

    it('should have a history', function () {
        var mainWindow;
        browser.getAllWindowHandles().then(function (handles) {
            mainWindow = handles[0]; //at this point there should be only 1 window
        });

        var emailInput = element(by.id('loadLogin'));
        browser.ignoreSynchronization = true;
        loginPage.login();

        expect(emailInput.waitReady()).toBeTruthy();
        emailInput.sendKeys("leian1306@gmail.com");

        /*browser.getAllWindowHandles().then(function (handles) {
            handles.forEach(function (handle) {
                if (handle !== mainWindow) {
                    browser.switchTo().window(handle);
                    var emailInput = element(by.id('loadLogin'));
                    emailInput.sendKeys("leian1306@gmail.com");
                }
            });
        });*/
        /*browser.driver.switchTo().activeElement().then(function() {
            var emailInput = element(by.id("email"));
            emailInput.sendKeys("leian1306@gmail.com");
        });*/
    });

});

/*

element takes one parameter, a Locator, which describes how to find the element. The by object creates Locators. Here, we're using three types of Locators:

by.model('first') to find the element with ng-model="first". If you inspect the Calculator page source, you will see this is <input type=text ng-model="first">.
by.id('gobutton') to find the element with the given id. This finds <button id="gobutton">.
by.binding('latest') to find the element bound to the variable latest. This finds the span containing {{latest}}

*/
