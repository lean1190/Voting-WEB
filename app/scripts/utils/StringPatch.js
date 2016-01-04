(function () {
    "use strict";

    /**
     * Resolve a hashCode for this string, using bitwise operators
     * @returns {string} the resolved hash
     */
    String.prototype.hashCode = function () {
        var hash = 0;
        for (var i = 0; i < this.length; i++) {
            var chr = this.charCodeAt(i);
            hash = ((hash << 5) - hash) + chr;
            hash = hash & hash; // Convert to 32bit integer
        }

        return hash;
    };

    /**
     * Resolve a hashCode for this string, using numeric operators
     * More performant than bitwise
     * @returns {string} the resolved hash
     */
    String.prototype.hashCodeNum = function () {
        var hash = 0,
            len = this.length;
        for (var i = 0; i < len; i++) {
            hash = hash * 31 + this.charCodeAt(i);
        }

        return hash;
    };

    /**
     * Check if this string is insensitive equals to another string
     * @param   {string}  otherString  a string
     * @returns {boolean} true if the 2 strings are case insensitive equals
     */
    String.prototype.insensitiveEquals = function (otherString) {
        return this.toUpperCase() === otherString.toUpperCase();
    };

    /**
     * Get the current string without the last character
     * @returns {string} the string without the last character
     */
    String.prototype.withoutLastChar = function () {
        return this.slice(0, -1);
    };

}());
