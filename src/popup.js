getSpeedPreference().then(speed => {
  document.getElementById('speed').value = speed;
});

document.getElementById('speed').addEventListener('change', e => {
  const speed = Number(e.target.value);
  if (speed && !Number.isNaN(speed)) {
    chrome.storage.local.set({ speed });
  }
});

document.getElementById('form').addEventListener('submit', e => {
  e.preventDefault();
  const data = new FormData(e.target);
  const { speed } = Object.fromEntries(data);
  if (speed) injectSpeedScript(speed, false);
});

document.getElementById('reset').addEventListener('click', () => {
  injectSpeedScript(1, false);
});
