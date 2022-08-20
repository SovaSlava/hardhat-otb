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
(0, config_1.task)("otb", "Opcoses to bytecode")
    .addParam("file", "path to file with opcodes")
    .setAction(function (taskArgs) { return __awaiter(void 0, void 0, void 0, function () {
    function getOpcode(x) {
        var item = opcodes.find(function (element) { return element[0] === x; });
        if (item !== undefined)
            return { hex: item[1].toString(16), num: item[2] };
        return { hex: "0x100", num: 0 };
    }
    var opcodes, file, arr, res, i, _a, hex, num, value, difference, j;
    return __generator(this, function (_b) {
        opcodes = [
            ["STOP", 0x00, 0],
            ["ADD", 0x01, 0],
            ["MUL", 0x02, 0],
            ["SUB", 0x03, 0],
            ["DIV", 0x04, 0],
            ["SDIV", 0x05, 0],
            ["MOD", 0x06, 0],
            ["SMOD", 0x07, 0],
            ["ADDMOD", 0x08, 0],
            ["MULMOD", 0x09, 0],
            ["EXP", 0x0a, 0],
            ["SIGNEXTEND", 0x0b, 0],
            ["LT", 0x10, 0],
            ["GT", 0x11, 0],
            ["SLT", 0x12, 0],
            ["SGT", 0x13, 0],
            ["EQ", 0x14, 0],
            ["ISZERO", 0x15, 0],
            ["AND", 0x16, 0],
            ["OR", 0x17, 0],
            ["XOR", 0x18, 0],
            ["NOT", 0x19, 0],
            ["BYTE", 0x1a, 0],
            ["SHL", 0x1b, 0],
            ["SHR", 0x1c, 0],
            ["SAR", 0x1d, 0],
            ["SHA3", 0x20, 0],
            ["ADDRESS", 0x30, 0],
            ["BALANCE", 0x31, 0],
            ["ORIGIN", 0x32, 0],
            ["CALLER", 0x33, 0],
            ["CALLVALUE", 0x34, 0],
            ["CALLDATALOAD", 0x35, 0],
            ["CALLDATASIZE", 0x36, 0],
            ["CALLDATACOPY", 0x37, 0],
            ["CODESIZE", 0x38, 0],
            ["CODECOPY", 0x39, 0],
            ["GASPRICE", 0x3a, 0],
            ["EXTCODESIZE", 0x3b, 0],
            ["EXTCODECOPY", 0x3c, 0],
            ["RETURNDATASIZE", 0x3d, 0],
            ["RETURNDATACOPY", 0x3e, 0],
            ["EXTCODEHASH", 0x3f, 0],
            ["BLOCKHASH", 0x40, 0],
            ["COINBASE", 0x41, 0],
            ["TIMESTAMP", 0x42, 0],
            ["NUMBER", 0x43, 0],
            ["DIFFICULTY", 0x44, 0],
            ["GASLIMIT", 0x45, 0],
            ["CHAINID", 0x46, 0],
            ["SELFBALANCE", 0x47, 0],
            ["BASEFEE", 0x48, 0],
            ["POP", 0x50, 0],
            ["MLOAD", 0x51, 0],
            ["MSTORE", 0x52, 0],
            ["MSTORE8", 0x53, 0],
            ["SLOAD", 0x54, 0],
            ["SSTORE", 0x55, 0],
            ["JUMP", 0x56, 0],
            ["JUMPI", 0x57, 0],
            ["PC", 0x58, 0],
            ["MSIZE", 0x59, 0],
            ["GAS", 0x5a, 0],
            ["JUMPDEST", 0x5b, 0],
            ["PUSH1", 0x60, 2],
            ["PUSH2", 0x61, 4],
            ["PUSH3", 0x62, 6],
            ["PUSH4", 0x63, 8],
            ["PUSH5", 0x64, 10],
            ["PUSH6", 0x65, 12],
            ["PUSH7", 0x66, 14],
            ["PUSH8", 0x67, 16],
            ["PUSH9", 0x68, 18],
            ["PUSH10", 0x69, 20],
            ["PUSH11", 0x6a, 22],
            ["PUSH12", 0x6b, 24],
            ["PUSH13", 0x6c, 26],
            ["PUSH14", 0x6d, 28],
            ["PUSH15", 0x6e, 30],
            ["PUSH16", 0x6f, 32],
            ["PUSH17", 0x70, 34],
            ["PUSH18", 0x71, 36],
            ["PUSH19", 0x72, 38],
            ["PUSH20", 0x73, 40],
            ["PUSH21", 0x74, 42],
            ["PUSH22", 0x75, 44],
            ["PUSH23", 0x76, 46],
            ["PUSH24", 0x77, 48],
            ["PUSH25", 0x78, 50],
            ["PUSH26", 0x79, 52],
            ["PUSH27", 0x7a, 54],
            ["PUSH28", 0x7b, 56],
            ["PUSH29", 0x7c, 58],
            ["PUSH30", 0x7d, 60],
            ["PUSH31", 0x7e, 62],
            ["PUSH32", 0x7f, 64],
            ["DUP1", 0x80, 0],
            ["DUP2", 0x81, 0],
            ["DUP3", 0x82, 0],
            ["DUP4", 0x83, 0],
            ["DUP5", 0x84, 0],
            ["DUP6", 0x85, 0],
            ["DUP7", 0x86, 0],
            ["DUP8", 0x87, 0],
            ["DUP9", 0x88, 0],
            ["DUP10", 0x89, 0],
            ["DUP11", 0x8a, 0],
            ["DUP12", 0x8b, 0],
            ["DUP13", 0x8c, 0],
            ["DUP14", 0x8d, 0],
            ["DUP15", 0x8e, 0],
            ["DUP16", 0x8f, 0],
            ["SWAP1", 0x90, 0],
            ["SWAP2", 0x91, 0],
            ["SWAP3", 0x92, 0],
            ["SWAP4", 0x93, 0],
            ["SWAP5", 0x94, 0],
            ["SWAP6", 0x95, 0],
            ["SWAP7", 0x96, 0],
            ["SWAP8", 0x97, 0],
            ["SWAP9", 0x98, 0],
            ["SWAP10", 0x99, 0],
            ["SWAP11", 0x9a, 0],
            ["SWAP12", 0x9b, 0],
            ["SWAP13", 0x9c, 0],
            ["SWAP14", 0x9d, 0],
            ["SWAP15", 0x9e, 0],
            ["SWAP16", 0x9f, 0],
            ["LOG0", 0xa0, 0],
            ["LOG1", 0xa1, 0],
            ["LOG2", 0xa2, 0],
            ["LOG3", 0xa3, 0],
            ["LOG4", 0xa4, 0],
            ["CREATE", 0xf0, 0],
            ["CALL", 0xf1, 0],
            ["CALLCODE", 0xf2, 0],
            ["RETURN", 0xf3, 0],
            ["DELEGATECALL", 0xf4, 0],
            ["CREATE2", 0xf5, 0],
            ["STATICCALL", 0xfa, 0],
            ["REVERT", 0xfd, 0],
            ["INVALID", 0xfe, 0],
            ["SELFDESTRUCT", 0xff, 0],
        ];
        file = (0, fs_1.readFileSync)(taskArgs.file, 'utf-8');
        arr = file.replace(/\r\n|\n|\r/gm, " ").split(" ");
        res = "";
        for (i = 0; i < arr.length; i++) {
            if (arr[i] === "") {
                continue;
            }
            _a = getOpcode(arr[i].toUpperCase()), hex = _a.hex, num = _a.num;
            if (hex === "0x100") {
                console.log("The opcode ".concat(hex, " does not exist"));
            }
            if (hex.length < 2) {
                hex = "0" + hex;
                console.log('z');
            }
            res += hex;
            if (num > 0) {
                i++;
                value = arr[i].replace("0x", "");
                difference = +num - value.length;
                for (j = 0; j < difference; j++) {
                    value = "0" + value;
                }
                res += value;
            }
        }
        console.log(res);
        return [2 /*return*/];
    });
}); });
