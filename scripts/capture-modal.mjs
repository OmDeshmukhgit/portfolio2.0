import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const port = 9224;

async function captureModal(selector, outputName) {
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
    await new Promise(r => setTimeout(r, 250));
    try {
      const res = await fetch(`http://127.0.0.1:${port}/json/new?http://localhost:3000`, { method: 'PUT' });
      if (res.ok) {
        const data = await res.json();
        targetWs = data.webSocketDebuggerUrl;
        break;
      }
    } catch (e) {}
  }

  if (!targetWs) {
    console.error('Failed to connect to CDP for', outputName);
    chrome.kill();
    return;
  }

  const ws = new WebSocket(targetWs);
  let id = 1;
  const send = (method, params = {}) => new Promise((resolve, reject) => {
    const curId = id++;
    const onMsg = (evt) => {
      const r = JSON.parse(evt.data);
      if (r.id === curId) {
        ws.removeEventListener('message', onMsg);
        if (r.error) reject(r.error);
        else resolve(r.result);
      }
    };
    ws.addEventListener('message', onMsg);
    ws.send(JSON.stringify({ id: curId, method, params }));
  });

  await new Promise((resolve) => {
    ws.onopen = async () => {
      try {
        await send('Page.enable');
        await send('Runtime.enable');
        await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
        
        // Wait for page to load
        await new Promise(r => setTimeout(r, 2500));

        // Click the selector
        console.log(`Clicking ${selector}...`);
        await send('Runtime.evaluate', {
          expression: `document.querySelector("${selector}")?.click()`
        });

        // Wait for modal animation to settle
        await new Promise(r => setTimeout(r, 1200));

        const res = await send('Page.captureScreenshot', { format: 'png' });
        const outPath = path.resolve('C:\\Users\\91940\\.gemini\\antigravity-ide\\brain\\de9f48ab-a2ab-4c8b-9bca-6ad2379009d6', outputName);
        fs.writeFileSync(outPath, Buffer.from(res.data, 'base64'));
        console.log(`Saved screenshot to ${outputName}`);
        ws.close();
        chrome.kill();
        resolve();
      } catch (err) {
        console.error('Error:', err);
        ws.close();
        chrome.kill();
        resolve();
      }
    };
  });
}

// Capture Projects modal and Goat dialog
await captureModal('#landmark-projects-btn', 'projects_tower_screenshot.png');
await captureModal('#landmark-goat-btn', 'horchato_goat_screenshot.png');
