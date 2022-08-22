import { task } from "hardhat/config";
import { readFileSync, appendFileSync } from "fs";
import { v4 } from "uuid";

import { opcodes } from "./helpers/opcodes";
import { validateStackResult } from "./helpers/validateStackResult";

function getOpcode(x: string) {
  const item: [string, number, number, number, string] | undefined =
    opcodes.find((element) => element[0] === x);

  if (item !== undefined)
    return {
      hex: item[1].toString(16),
      num: item[2],
      stackInput: item[3],
      stackResult: item[4],
    };

  return { hex: "0x100", num: 0 };
}

task("otb", "Opcodes to bytecode")
  .addParam("file", "path to file with opcodes")
  .addOptionalParam("stack", "write stack into other file")
  .setAction(async (taskArgs) => {
    const file: string = readFileSync(taskArgs.file, "utf-8");
    const arr: string[] = file.replace(/\r\n|\n|\r/gm, " ").split(" ");

    let stackFileName;
    let stack: string[] = [];
    if (taskArgs.stack) {
      stackFileName = `otb-${v4().slice(0, 7)}.txt`;
    }

    let res: string = "";

    for (let i = 0; i < arr.length; i++) {
      let stackRow: string = "";

      if (arr[i] === "") {
        continue;
      }

      let { hex, num, stackInput, stackResult } = getOpcode(
        arr[i].toUpperCase()
      );

      if (hex === "0x100") {
        console.log(`The opcode ${arr[i].toUpperCase()} does not exist`);
      }

      if (taskArgs.stack) {
        stackRow += arr[i].toUpperCase();
      }

      if (hex.length < 2) {
        hex = "0" + hex;
      }
      res += hex;

      let value;
      if (num > 0) {
        i++;

        value = arr[i].replace("0x", "");
        const difference = +num - value.length;
        for (let j = 0; j < difference; j++) {
          value = "0" + value;
        }
        res += value;
      }

      if (taskArgs.stack && stackFileName) {
        if (value) {
          let val: string = value;
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
        } else {
          if (stackRow.length < 23) {
            while (stackRow.length != 22) {
              stackRow += " ";
            }
          }
          stackRow += "| ";
        }

        stack = validateStackResult(
          stack,
          stackInput !== undefined ? stackInput : 0,
          stackResult !== undefined ? stackResult : "",
          "0x" + value
        );

        for (let j = stack.length - 1; j >= 0; j--) {
          stackRow += "[ " + stack[j] + " ]";
        }

        appendFileSync(stackFileName, stackRow + "\n");
      }
    }

    console.log(res);
  });

function cut(str: string, cutStart: number, cutEnd: number) {
  return str.substring(0, cutStart) + "..." + str.substring(cutEnd + 1);
}
