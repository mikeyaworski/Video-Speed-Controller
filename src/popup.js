chrome.storage.local.get(['speed'], ({ speed }) => {
  document.getElementById('speed').value = speed || 2.5;
});

document.getElementById('speed').addEventListener('change', e => {
  const speed = Number(e.target.value);
  if (speed && !Number.isNaN(speed)) {
    chrome.storage.local.set({ speed });
  }
});

function changeVideoSpeeds(speed) {
  console.log(`Changed video speeds to ${speed}x.`);
  document.querySelectorAll('video').forEach(vid => {
    vid.playbackRate = Number(speed);
  });
}

async function injectSpeedScript(speed) {
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  const tabId = tabs[0]?.id;
  chrome.scripting.executeScript({
    target: { tabId, allFrames: true },
    func: changeVideoSpeeds,
    args: [speed],
  });
}

document.getElementById('form').addEventListener('submit', e => {
  e.preventDefault();
  const data = new FormData(e.target);
  const { speed } = Object.fromEntries(data);
  if (speed) injectSpeedScript(speed);
});

document.getElementById('reset').addEventListener('click', () => {
  injectSpeedScript(1);
});
