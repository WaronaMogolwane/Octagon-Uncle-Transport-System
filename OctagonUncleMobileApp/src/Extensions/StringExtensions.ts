
export { } // to make it a module

declare global { // to access the global type String
    interface String {
        format(...strings: string[]): string;
    }
}

String.prototype.format = function () {
    var args = arguments;
    return this.replace(/{([0-9]+)}/g, function (match, index) {
        return typeof args[index] == 'undefined' ? match : args[index];
    });
};