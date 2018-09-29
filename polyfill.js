/**
 * Array.moveUp & moveDown
 * @see https://stackoverflow.com/a/23391898
 */
Array.prototype.moveUp = function (value, by) {
    var index = this.indexOf(value),
        newPos = index - (by || 1);

    if (index === -1)
        throw new Error("Element not found in array");

    if (newPos < 0)
        newPos = 0;

    this.splice(index, 1);
    this.splice(newPos, 0, value);
};

Array.prototype.moveDown = function (value, by) {
    var index = this.indexOf(value),
        newPos = index + (by || 1);

    if (index === -1)
        throw new Error("Element not found in array");

    if (newPos >= this.length)
        newPos = this.length;

    this.splice(index, 1);
    this.splice(newPos, 0, value);
};

/**
 * String and Array contains
 */
String.prototype.contains = function(substring){
 return this.indexOf(substring) > -1;
}
Array.prototype.contains = function(element){
 return this.indexOf(element) > -1;
}
