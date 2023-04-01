// Not supported in Firefox
if (typeof importScripts === 'function') {
  importScripts('utils.js');
}

chrome.commands.onCommand.addListener(command => {
  switch (command) {
    case 'toggle-speed': {
      getSpeedPreference().then(speed => {
        injectSpeedScript(speed, true);
      });
      break;
    }
    case 'increase-speed': {
      injectIncrementSpeedScript(0.1);
      break;
    }
    case 'decrease-speed': {
      injectIncrementSpeedScript(-0.1);
      break;
    }
    default: {
      break;
    }
  }
});
