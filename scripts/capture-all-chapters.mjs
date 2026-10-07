import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\91940\\.gemini\\antigravity-ide\\brain\\de9f48ab-a2ab-4c8b-9bca-6ad2379009d6';
const port = 9222;

console.log('Launching Chrome for multi-chapter CDP captures...');
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
      console.log('Target created:', targetWs);
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
    console.log('Connected to CDP. Initializing viewport...');
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

    // Check all element IDs in DOM
    const checkDom = await sendCommand('Runtime.evaluate', {
      expression: `
        Array.from(document.querySelectorAll('section')).map(s => ({
          id: s.id,
          top: s.offsetTop,
          height: s.offsetHeight
        }))
      `,
      returnByValue: true
    });
    console.log('Sections found:', JSON.stringify(checkDom.result.value, null, 2));

    const chaptersToCapture = [
      { id: 'chapter-cosmos', name: 'ch1_cosmos_view.png' },
      { id: 'chapter-moonlit', name: 'ch2_moonlit_view.png' },
      { id: 'chapter-dawn', name: 'ch3_dawn_about_view.png' },
      { id: 'chapter-kingdom', name: 'ch4_kingdom_view.png' },
      { id: 'chapter-citadel', name: 'ch5_citadel_skills_view.png' },
      { id: 'chapter-projects', name: 'ch6_projects_view.png' },
      { id: 'chapter-golden-hour', name: 'ch7_golden_hour_view.png' },
      { id: 'chapter-twilight', name: 'ch8_twilight_view.png' },
      { id: 'chapter-night', name: 'ch9_night_contact_view.png' }
    ];

    for (const ch of chaptersToCapture) {
      console.log(`Scrolling to ${ch.id}...`);
      const scrollResult = await sendCommand('Runtime.evaluate', {
        expression: `
          (() => {
            const el = document.getElementById('${ch.id}');
            if (!el) return { found: false };
            const top = el.offsetTop;
            window.scrollTo(0, top);
            document.documentElement.scrollTop = top;
            document.body.scrollTop = top;
            return { found: true, targetTop: top, actualScrollY: window.scrollY };
          })()
        `,
        returnByValue: true
      });
      console.log(`Scroll result for ${ch.id}:`, scrollResult.result.value);

      // Wait 1.5s
      await new Promise(r => setTimeout(r, 1500));

      const screenshot = await sendCommand('Page.captureScreenshot', { format: 'png', fromSurface: true });
      const outFilePath = path.join(artifactDir, ch.name);
      fs.writeFileSync(outFilePath, Buffer.from(screenshot.data, 'base64'));
      console.log(`Saved screenshot: ${ch.name}`);
    }

    console.log('All 9 chapter captures completed successfully!');
    ws.close();
    chrome.kill();
    process.exit(0);
  } catch (err) {
    console.error('Error during multi-chapter capture:', err);
    ws.close();
    chrome.kill();
    process.exit(1);
  }
};
