import { Yy, TextLocation } from "../types/tysonTypeDict";

export function getYyImpl(): Yy {
  let previousLocation = {
    line: 0,
    column: 0,
    index: 0,
  };

  let currentLocation = {
    line: 0,
    column: 0,
    index: 0,
  };

  return {
    reset(): void {
      console.log("RESET");
      previousLocation = {
        line: 0,
        column: 0,
        index: 0,
      };
      currentLocation = {
        line: 0,
        column: 0,
        index: 0,
      };
    },

    recordTokenLocationBasedOnCurrentMatch(): void {
      const { match } = (this as any).lexer;
      let { line, column, index } = currentLocation;
      for (let i = 0; i < match.length; ++i) {
        ++index;
        if (match[i] === "\n") {
          ++line;
          column = 0;
        } else {
          ++column;
        }
      }

      console.log({
        match,
        curLoc: currentLocation,
        newCurLoc: { line, column, index },
        prevLoc: previousLocation,
      });
      previousLocation = currentLocation;
      currentLocation = { line, column, index };
    },

    getPreviousTextLocation(): TextLocation {
      console.log({ getPrevLoc: previousLocation });
      return previousLocation;
    },

    getCurrentTextLocation(): TextLocation {
      return currentLocation;
    },
  };
}
