import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\91940\\.gemini\\antigravity-ide\\brain\\de9f48ab-a2ab-4c8b-9bca-6ad2379009d6';
const port = 9222;

console.log('Launching Chrome for mobile Archive CDP captures...');
const chrome = spawn(chromePath, [
  '--headless=new',
  '--disable-gpu',
  '--no-sandbox',
  `--remote-debugging-port=${port}`,
  '--window-size=390,844',
  'about:blank'
], { stdio: 'ignore' });

process.on('exit', () => chrome.kill());

let targetWs = null;
for (let i = 0; i < 30; i++) {
  await new Promise(r => setTimeout(r, 300));
  try {
    const res = await fetch(`http://127.0.0.1:${port}/json/new?http://localhost:3000`, { method: 'PUT' });
    if (res.ok) {
      const data = await res.json();
      targetWs = data.webSocketDebuggerUrl;
      break;
    }
  } catch (err) {}
}

if (!targetWs) {
  console.error('Failed to connect to Chrome CDP.');
  chrome.kill();
  process.exit(1);
}

const ws = new WebSocket(targetWs);
let msgId = 1;

function sendCommand(method, params = {}) {
  return new Promise((resolve, reject) => {
    const id = msgId++;
    const handler = (evt) => {
      const resp = JSON.parse(evt.data);
      if (resp.id === id) {
        ws.removeEventListener('message', handler);
        if (resp.error) reject(resp.error);
        else resolve(resp.result);
      }
    };
    ws.addEventListener('message', handler);
    ws.send(JSON.stringify({ id, method, params }));
  });
}

ws.onopen = async () => {
  try {
    await sendCommand('Page.enable');
    await sendCommand('DOM.enable');
    await sendCommand('Runtime.enable');
    await sendCommand('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true
    });

    console.log('Navigating to http://localhost:3000 (mobile)...');
    await sendCommand('Page.navigate', { url: 'http://localhost:3000' });
    await new Promise(r => setTimeout(r, 3000));

    const scenes = [
      { id: 'scene-deep-space', file: 'archive_mobile_scene01.png' },
      { id: 'scene-observer', file: 'archive_mobile_scene03.png' },
      { id: 'scene-systems', file: 'archive_mobile_scene05.png' },
      { id: 'scene-projects', file: 'archive_mobile_scene06.png' },
      { id: 'scene-contact', file: 'archive_mobile_scene08.png' }
    ];

    for (const sc of scenes) {
      await sendCommand('Runtime.evaluate', {
        expression: `
          (() => {
            const el = document.getElementById('${sc.id}');
            if (el) {
              const top = el.offsetTop;
              window.scrollTo(0, top);
              document.documentElement.scrollTop = top;
              document.body.scrollTop = top;
            }
          })()
        `
      });
      await new Promise(r => setTimeout(r, 1500));
      const screenshot = await sendCommand('Page.captureScreenshot', { format: 'png', fromSurface: true });
      fs.writeFileSync(path.join(artifactDir, sc.file), Buffer.from(screenshot.data, 'base64'));
      console.log(`Saved ${sc.file}`);
    }

    console.log('All mobile captures saved!');
    ws.close();
    chrome.kill();
    process.exit(0);
  } catch (err) {
    console.error('Mobile capture error:', err);
    ws.close();
    chrome.kill();
    process.exit(1);
  }
};
