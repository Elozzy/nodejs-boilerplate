const crypto = require("crypto");
const {
  Sequelize: { Op }
} = require("sequelize");
const ErrorHandler = require("./ErrorHandler");

/**
 * @description: generate a random 6 digit numbers
 */

exports.randomSixDigits = () => {
  return String(Math.floor(100000 + Math.random() * 900000));
};

/**
 * @description: generate a random string for password
 */

exports.randomString = () => {
  return Math.random().toString(36).substr(2, 8);
};

/**
 * @description: insert space in between every 3 numbers
 */

exports.numbSpacing = (numb) => {
  return numb.replace(/(\w{3})/g, "$1 ").replace(/(^\s+|\s+$)/, "");
};

/**
 * @description: Get the diff in date time in minutes
 * @param: date
 */

exports.dateDiff = (date) => {
  const today = new Date(Date.now());
  const diffMs = today - new Date(date);
  return Math.round(((diffMs % 86400000) % 3600000) / 60000);
};

/**
 * @description: Generate random hex number encrypted with crypto
 * @param:
 */
exports.cryptWords = (word) => {
  return crypto.createHash("sha256").update(word).digest("hex");
};

/**
 *@description validate email
 @param: email
 */
exports.validateEmail = (email) => {
  var regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email);
};

/**
 * @description: Return custom file name of image
 * @eg 'company/logo/1585768176766-773026879.png'
 * @result 1585768176766-773026879.png
 */
exports.getFileName = (img) => img.split("/").slice(-1).join("");

/**
 * @description Checks if there is excess space between characters of a string
 * @param {1}: string
 */
exports.hasEmptySpace = (string) => {
  return /\s/g.test(string);
};

/**
 * @description Capitalize first letter
 * @param {1}: string
 */
exports.capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
