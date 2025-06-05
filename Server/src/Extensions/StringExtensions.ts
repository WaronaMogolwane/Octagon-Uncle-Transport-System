export { }; // to make it a module

declare global {
  // to access the global type String
  export interface String {
    format(...strings: string[]): string;
  }
}


/**
 * String formatter that uses the format `"{0}, {1}, {2}""` and replaces
 * with list of inputted strings.
 * @param {string} file: string
 * @returns {string}
 */
String.prototype.format = function () {
  var args = arguments;
  return this.replace(/{([0-9]+)}/g, function (match, index) {
    return typeof args[index] == "undefined" ? match : args[index];
  });
};


/**
 * String formatter that uses the format `"{0}, {1}, {2}"` and replaces
 * with list of inputted strings.
 * @param {string} template: string
 * @param {string} ...args: any[]
 * @returns {string} formattedString: string
 */
export function stringFormat(template: string, ...args: any[]): string {
  return template.replace(/{(\d+)}/g, function (match, number) {
    return typeof args[number] != 'undefined'
      ? args[number]
      : match
      ;
  });
};
