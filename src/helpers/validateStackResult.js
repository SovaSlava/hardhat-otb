"use strict";
exports.__esModule = true;
exports.validateStackResult = void 0;
function validateStackResult(currentStack, stackInput, stackResult, value) {
    var shift;
    switch (stackResult) {
        case "+":
            currentStack.push("".concat(currentStack.pop(), "+").concat(currentStack.pop()));
            return currentStack;
        case "*":
            currentStack.push("".concat(currentStack.pop(), "*").concat(currentStack.pop()));
            return currentStack;
        case "-":
            currentStack.push("".concat(currentStack.pop(), "-").concat(currentStack.pop()));
            return currentStack;
        case "/":
            currentStack.push("".concat(currentStack.pop(), "/").concat(currentStack.pop()));
            return currentStack;
        case "%":
            currentStack.push("".concat(currentStack.pop(), "%").concat(currentStack.pop()));
            return currentStack;
        case "+%":
            currentStack.push("(".concat(currentStack.pop(), "+").concat(currentStack.pop(), ")%").concat(currentStack.pop()));
            return currentStack;
        case "*%":
            currentStack.push("(".concat(currentStack.pop(), "*").concat(currentStack.pop(), ")%").concat(currentStack.pop()));
            return currentStack;
        case "**":
            currentStack.push("".concat(currentStack.pop(), "**").concat(currentStack.pop()));
            return currentStack;
        case "result":
            while (stackInput > 0) {
                currentStack.pop();
                stackInput--;
            }
            currentStack.push(stackResult);
            return currentStack;
        case "<":
            currentStack.push("".concat(currentStack.pop(), "<").concat(currentStack.pop()));
            return currentStack;
        case ">":
            currentStack.push("".concat(currentStack.pop(), ">").concat(currentStack.pop()));
            return currentStack;
        case "==":
            currentStack.push("".concat(currentStack.pop(), "==").concat(currentStack.pop()));
            return currentStack;
        case "== 0":
            currentStack.push("".concat(currentStack.pop(), "==0"));
            return currentStack;
        case "&":
            currentStack.push("".concat(currentStack.pop(), "&").concat(currentStack.pop()));
            return currentStack;
        case "|":
            currentStack.push("".concat(currentStack.pop(), "|").concat(currentStack.pop()));
            return currentStack;
        case "^":
            currentStack.push("".concat(currentStack.pop(), "^").concat(currentStack.pop()));
            return currentStack;
        case "!":
            currentStack.push("not".concat(currentStack.pop()));
            return currentStack;
        case "<<":
            shift = currentStack.pop();
            currentStack.push("".concat(currentStack.pop(), "<<").concat(shift));
            return currentStack;
        case ">>":
            shift = currentStack.pop();
            currentStack.push("".concat(currentStack.pop(), ">>").concat(shift));
            return currentStack;
        case "keccak-hash":
            currentStack.pop();
            currentStack.pop();
            currentStack.push(stackResult);
            return currentStack;
        case "address(this)":
            currentStack.push(stackResult);
            return currentStack;
        case "balance":
            currentStack.pop();
            currentStack.push(stackResult);
            return currentStack;
        case "tx.origin":
            currentStack.push(stackResult);
            return currentStack;
        case "msg.sender":
            currentStack.push(stackResult);
            return currentStack;
        case "msg.value":
            currentStack.push(stackResult);
            return currentStack;
        case "data[i]":
            currentStack.push("data[".concat(currentStack.pop(), "]"));
            return currentStack;
        case "size":
            if (stackInput) {
                currentStack.pop();
                currentStack.push(stackResult);
                return currentStack;
            }
            else {
                currentStack.push(stackResult);
                return currentStack;
            }
        case "gasprice":
            currentStack.push(stackResult);
            return currentStack;
        case "hash":
            currentStack.pop();
            currentStack.push(stackResult);
            return currentStack;
        case "block.coinbase":
            currentStack.push(stackResult);
            return currentStack;
        case "block.timestamp":
            currentStack.push(stackResult);
            return currentStack;
        case "block.number":
            currentStack.push(stackResult);
            return currentStack;
        case "block.difficulty":
            currentStack.push(stackResult);
            return currentStack;
        case "gasLimit":
            currentStack.push(stackResult);
            return currentStack;
        case "chainId":
            currentStack.push(stackResult);
            return currentStack;
        case "address(this).balance":
            currentStack.push(stackResult);
            return currentStack;
        case "baseFee":
            currentStack.push(stackResult);
            return currentStack;
        case "PC":
            currentStack.push(stackResult);
            return currentStack;
        case "gas":
            currentStack.push(stackResult);
            return currentStack;
        case "push":
            currentStack.push(value);
            return currentStack;
        case "dup":
            currentStack.push(currentStack[currentStack.length - stackInput]);
            return currentStack;
        case "swap":
            var swapElement = currentStack[currentStack.length - stackInput];
            currentStack[currentStack.length - stackInput] =
                currentStack[currentStack.length - 1];
            currentStack[currentStack.length - 1] = swapElement;
            return currentStack;
        case "created address":
            while (stackInput > 0) {
                currentStack.pop();
                stackInput--;
            }
            currentStack.push(stackResult);
            return currentStack;
        case "CALL-result":
            while (stackInput > 0) {
                currentStack.pop();
                stackInput--;
            }
            currentStack.push(stackResult);
            return currentStack;
        case "":
            if (stackInput) {
                while (stackInput > 0) {
                    currentStack.pop();
                    stackInput--;
                }
                return currentStack;
            }
            else {
                return currentStack;
            }
        default:
            return currentStack;
    }
}
exports.validateStackResult = validateStackResult;
