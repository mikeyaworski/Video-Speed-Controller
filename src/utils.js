function getSpeedPreference() {
  return new Promise(resolve => {
    chrome.storage.local.get(['speed'], ({ speed }) => {
      resolve(speed || 2.5);
    });
  });
}

function setVideoSpeeds(speed) {
  const speedNumber = Number(speed);
  document.querySelectorAll('video').forEach(vid => {
    vid.playbackRate = speedNumber;
  });
  console.log(`Changed video speeds to ${speed}x.`);
}

function toggleVideoSpeeds(speed) {
  const speedNumber = Number(speed);
  document.querySelectorAll('video').forEach(vid => {
    vid.playbackRate = vid.playbackRate === speedNumber ? 1 : speedNumber;
  });
  console.log(`Toggled video speeds between ${speed}x and 1x.`);
}

function stepVideoSpeeds(increment) {
  document.querySelectorAll('video').forEach(vid => {
    vid.playbackRate = Math.max(0.1, vid.playbackRate + increment);
  });
  console.log(`Video speeds ${increment < 0 ? 'decreased' : 'increased'} by ${Math.abs(increment)}x.`);
}

async function getActiveTabId() {
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  const tabId = tabs[0]?.id;
  return tabId;
}

async function injectSpeedScript(speed, shouldToggle = false) {
  const tabId = await getActiveTabId();
  chrome.scripting.executeScript({
    target: { tabId, allFrames: true },
    func: shouldToggle ? toggleVideoSpeeds : setVideoSpeeds,
    args: [speed],
  });
}

async function injectIncrementSpeedScript(increment) {
  const tabId = await getActiveTabId();
  chrome.scripting.executeScript({
    target: { tabId, allFrames: true },
    func: stepVideoSpeeds,
    args: [increment],
  });
}
