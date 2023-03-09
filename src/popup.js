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

document.getElementById('form').addEventListener('submit', async e => {
  e.preventDefault();
  const data = new FormData(e.target);
  const { speed } = Object.fromEntries(data);
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  const tabId = tabs[0]?.id;
  if (tabId && speed) {
    chrome.scripting.executeScript({
      target: { tabId },
      func: changeVideoSpeeds,
      args: [speed],
    });
  }
})
