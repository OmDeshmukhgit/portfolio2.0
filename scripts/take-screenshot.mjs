import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outputPath = path.resolve('C:\\Users\\91940\\.gemini\\antigravity-ide\\brain\\de9f48ab-a2ab-4c8b-9bca-6ad2379009d6\\first_environment_screenshot.png');
const port = 9222;

console.log('Launching Chrome for CDP screenshot...');
const chrome = spawn(chromePath, [
  '--headless=new',
  '--disable-gpu',
  '--no-sandbox',
  `--remote-debugging-port=${port}`,
  '--window-size=1440,900',
  'about:blank'
], { stdio: 'ignore' });

// Clean exit on interrupt
process.on('exit', () => chrome.kill());

// Wait for Chrome CDP port to open
let targetWs = null;
for (let i = 0; i < 30; i++) {
  await new Promise(r => setTimeout(r, 300));
  try {
    const res = await fetch(`http://127.0.0.1:${port}/json/new?http://localhost:3000`, { method: 'PUT' });
    if (res.ok) {
      const data = await res.json();
      targetWs = data.webSocketDebuggerUrl;
      console.log('Target created:', targetWs);
      break;
    }
  } catch (err) {
    // wait for next loop
  }
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
    console.log('Connected to CDP websocket. Enabling domains...');
    await sendCommand('Page.enable');
    await sendCommand('DOM.enable');
    await sendCommand('Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false
    });

    console.log('Navigating to http://localhost:3000 ...');
    await sendCommand('Page.navigate', { url: 'http://localhost:3000' });

    // Wait 3.5 seconds for all assets, images, fonts to settle and render cleanly
    console.log('Waiting 3.5s for render...');
    await new Promise(r => setTimeout(r, 3500));

    console.log('Capturing screenshot...');
    const result = await sendCommand('Page.captureScreenshot', { format: 'png', fromSurface: true });

    const buffer = Buffer.from(result.data, 'base64');
    fs.writeFileSync(outputPath, buffer);
    console.log('Screenshot successfully saved to:', outputPath, `(${buffer.length} bytes)`);

    ws.close();
    chrome.kill();
    process.exit(0);
  } catch (e) {
    console.error('Error during CDP interaction:', e);
    ws.close();
    chrome.kill();
    process.exit(1);
  }
};
