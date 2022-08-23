"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var config_1 = require("hardhat/config");
var fs_1 = require("fs");
var uuid_1 = require("uuid");
var opcodes_1 = require("./helpers/opcodes");
var validateStackResult_1 = require("./helpers/validateStackResult");
function getOpcode(x) {
    var item = opcodes_1.opcodes.find(function (element) { return element[0] === x; });
    if (item !== undefined)
        return {
            hex: item[1].toString(16),
            num: item[2],
            stackInput: item[3],
            stackResult: item[4]
        };
    return { hex: "0x100", num: 0 };
}
function cut(str, cutStart, cutEnd) {
    return str.substring(0, cutStart) + "..." + str.substring(cutEnd + 1);
}
(0, config_1.task)("otb", "Opcodes to bytecode")
    .addParam("file", "path to file with opcodes")
    .addOptionalParam("stack", "write stack into other file")
    .setAction(function (taskArgs) { return __awaiter(void 0, void 0, void 0, function () {
    var file, arr, stackFileName, stack, res, i, stackRow, _a, hex, num, stackInput, stackResult, value, difference, j, val, j;
    return __generator(this, function (_b) {
        file = (0, fs_1.readFileSync)(taskArgs.file, "utf-8");
        arr = file.replace(/\r\n|\n|\r/gm, " ").split(" ");
        stackFileName = "";
        stack = [];
        if (taskArgs.stack) {
            stackFileName = "otb-".concat((0, uuid_1.v4)().slice(0, 7), ".txt");
        }
        res = "";
        for (i = 0; i < arr.length; i++) {
            stackRow = "";
            if (arr[i] === "") {
                continue;
            }
            _a = getOpcode(arr[i].toUpperCase()), hex = _a.hex, num = _a.num, stackInput = _a.stackInput, stackResult = _a.stackResult;
            if (hex === "0x100") {
                console.log("The opcode ".concat(arr[i].toUpperCase(), " does not exist"));
            }
            if (taskArgs.stack) {
                stackRow += arr[i].toUpperCase();
            }
            if (hex.length < 2) {
                hex = "0" + hex;
            }
            res += hex;
            value = void 0;
            if (num > 0) {
                i++;
                value = arr[i].replace("0x", "");
                difference = +num - value.length;
                for (j = 0; j < difference; j++) {
                    value = "0" + value;
                }
                res += value;
            }
            if (taskArgs.stack && stackFileName) {
                if (value) {
                    val = value;
                    if (value.length > 12) {
                        val = cut(value, 4, value.length - 6);
                    }
                    stackRow += " 0x" + val;
                    if (stackRow.length < 23) {
                        while (stackRow.length != 22) {
                            stackRow += " ";
                        }
                    }
                    stackRow += "| ";
                }
                else {
                    if (stackRow.length < 23) {
                        while (stackRow.length != 22) {
                            stackRow += " ";
                        }
                    }
                    stackRow += "| ";
                }
                stack = (0, validateStackResult_1.validateStackResult)(stack, stackInput !== undefined ? stackInput : 0, stackResult !== undefined ? stackResult : "", "0x" + value);
                for (j = stack.length - 1; j >= 0; j--) {
                    stackRow += "[ " + stack[j] + " ]";
                }
                (0, fs_1.appendFileSync)(stackFileName, stackRow + "\n");
            }
        }
        console.log("Bytecode - ".concat(res));
        console.log("Opcdes with stack saved to ".concat(stackFileName));
        return [2 /*return*/];
    });
}); });
