// Declare the module
var utils = utils || (function () {
    'use strict';

    var helper = helper || {};

    /**
     * Check if the object has a property
     * @param   {object}  object the object to check if empty
     * @returns {boolean} true if the object has no properties
     */
    helper.isEmptyObject = function (object) {
        for (var property in object) {
            if (object.hasOwnProperty(property)) {
                return false;
            }
        }

        return true;
    };

    /**
     * Check if a variable is empty, null, undefined or blank .
     * @param   {any type} variable the variable to check if empty
     * @returns {boolean}  true if the object is empty
     */
    helper.isEmpty = function (variable) {
        return (variable === null || typeof variable === "undefined" || variable === "" || variable === {} || this.isEmptyObject(variable));
    };

    /**
     * Check if 2 strings are case insensitive equals
     * @param   {string}  firstString  one string
     * @param   {string}  secondString another string
     * @returns {boolean} true if the 2 strings are case insensitive equals
     */
    helper.isStringInsensitiveEquals = function (firstString, secondString) {
        return firstString.toUpperCase() === secondString.toUpperCase();
    };

    /**
     * Cut the last character from a string
     * @param   {string} string the string to cut the last character
     * @returns {string} the given string without the last character
     */
    helper.cutLastChar = function (string) {
        return string.slice(0, -1);
    };

    /**
     * Transform a request parameter json object to string
     * JSON format: {key : "value", key : "value"} ==> to String: key=value&key=value
     * @param   {object} paramsObject the object with the paremeters
     * @returns {string} the given parameters as URL format string
     */
    helper.paramsToString = function (paramsObject) {
        var stringParams = "";
        for (var property in paramsObject) {
            if (paramsObject.hasOwnProperty(property)) {
                stringParams += property + "=" + paramsObject[property] + "&";
            }
        }

        // Cut last "&" character
        return (this.cutLastChar(stringParams)).trim();
    };

    /**
     * Returns the extension from a filename
     * e.g. exampleImg.png => file extension: png
     * @param   {string} fileName the file name with the extension
     * @returns {string} the file extension
     */
    helper.getFileExtension = function (fileName) {
        var extension = fileName.split('.');

        return extension[extension.length - 1];
    };

    /**
     * Returns the file name from a full path url
     * e.g /resources/images/thatimage.png => file name: thatimage.png
     * @param   {string} filePath the whole file path
     * @returns {string} the file name
     */
    helper.getFileNameFromPath = function (filePath) {
        var splitResult = filePath.split("/");

        return splitResult[splitResult.length - 1];
    };

    return helper;

}());
