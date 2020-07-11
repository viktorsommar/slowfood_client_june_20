const COMMAND_DELAY = 150;

for (const command of [
  "get",
  "visit",
  "click",
  "trigger",
  "type",
  "clear",
  "reload",
  "contains",
]) {
  cypress.Commands.overwrite(command, (originalFn, ...args) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(origVal);
      }, COMMAND_DELAY);
    });
  });
}