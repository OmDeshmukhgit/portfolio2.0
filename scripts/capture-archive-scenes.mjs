import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\91940\\.gemini\\antigravity-ide\\brain\\de9f48ab-a2ab-4c8b-9bca-6ad2379009d6';
const port = 9222;

console.log('Launching Chrome for Archive CDP captures...');
const chrome = spawn(chromePath, [
  '--headless=new',
  '--disable-gpu',
  '--no-sandbox',
  `--remote-debugging-port=${port}`,
  '--window-size=1440,900',
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
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false
    });

    console.log('Navigating to http://localhost:3000 ...');
    await sendCommand('Page.navigate', { url: 'http://localhost:3000' });
    await new Promise(r => setTimeout(r, 3000));

    const scenesToCapture = [
      { id: 'scene-deep-space', name: 'archive_scene01_cosmic.png' },
      { id: 'scene-signal', name: 'archive_scene02_signal.png' },
      { id: 'scene-observer', name: 'archive_scene03_observer.png' },
      { id: 'scene-engineer', name: 'archive_scene04_transition.png' },
      { id: 'scene-systems', name: 'archive_scene05_systems.png' },
      { id: 'scene-projects', name: 'archive_scene06_projects.png' },
      { id: 'scene-archive-reflections', name: 'archive_scene07_reflections.png' },
      { id: 'scene-contact', name: 'archive_scene08_contact.png' }
    ];

    for (const sc of scenesToCapture) {
      console.log(`Scrolling to ${sc.id}...`);
      await sendCommand('Runtime.evaluate', {
        expression: `
          (() => {
            const el = document.getElementById('${sc.id}');
            if (el) {
              window.scrollTo(0, el.offsetTop);
              document.documentElement.scrollTop = el.offsetTop;
            }
          })()
        `
      });

      await new Promise(r => setTimeout(r, 1200));

      const screenshot = await sendCommand('Page.captureScreenshot', { format: 'png', fromSurface: true });
      const outFilePath = path.join(artifactDir, sc.name);
      fs.writeFileSync(outFilePath, Buffer.from(screenshot.data, 'base64'));
      console.log(`Saved screenshot: ${sc.name}`);
    }

    console.log('All archive scene captures completed successfully!');
    ws.close();
    chrome.kill();
    process.exit(0);
  } catch (err) {
    console.error('Error in archive capture:', err);
    ws.close();
    chrome.kill();
    process.exit(1);
  }
};
