import { useState } from 'react';
import { Button, Card, Col, Input, Row, Space, Statistic, Tag, Typography, message } from 'antd';
import { ReloadOutlined, SaveOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { makePyramidRows } from '../../utils/helpers';
const { Title, Text } = Typography;
const STORAGE_KEY = 'lp_demo_results';
const START_VALUES = Array.from({ length: 15 }, (_, i) => i + 1);
function makeShuffle() {
  const result = [...START_VALUES];
  for (let i = result.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [result[i], result[j]] = [result[j], result[i]]; }
  return result;
}
export default function LuckyPyramid() {
  const [numbers, setNumbers] = useState(START_VALUES);
  const [selected, setSelected] = useState([]);
  const [roundName, setRoundName] = useState('My Lucky Entry');
  const [messageApi, contextHolder] = message.useMessage();
  const shuffle = () => { setNumbers(makeShuffle()); setSelected([]); };
  const toggle = value => setSelected(current => current.includes(value) ? current.filter(x => x !== value) : [...current, value]);
  const save = () => {
    const record = { id: globalThis.crypto?.randomUUID?.() || String(Date.now()), name: roundName.trim() || 'My Lucky Entry', date: new Date().toISOString(), numbers, selected };
    try { const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); localStorage.setItem(STORAGE_KEY, JSON.stringify([record, ...data])); messageApi.success('Practice entry saved on this device.'); }
    catch { messageApi.error('Could not save demo round in this browser.'); }
  };
  return <div>{contextHolder}<div className="page-heading"><div><span className="eyebrow">CHOOSE YOUR NUMBERS</span><Title level={2}>Lucky Pyramid</Title><Text type="secondary">Tap the numbers you like and save a practice entry.</Text></div><Tag color="gold">DEMO MODE</Tag></div>
    <Row gutter={[20, 20]}><Col xs={24} xl={16}><Card className="content-card"><div className="card-top"><div><h3>Number Pyramid</h3><Text type="secondary">Click any number to select or deselect it.</Text></div><Button icon={<ReloadOutlined />} onClick={shuffle}>Shuffle</Button></div>
      <div className="pyramid-stage"><div className="pyramid-grid">{makePyramidRows(numbers).map((row, index) => <div className="pyramid-row" key={index}>{row.map(n => <button type="button" aria-pressed={selected.includes(n)} className={`pyramid-cell ${selected.includes(n) ? 'selected' : ''}`} key={n} onClick={() => toggle(n)}>{String(n).padStart(2, '0')}</button>)}</div>)}</div><div className="pyramid-stage-footer">★ LUCKY PYRAMID ★</div></div>
      <Space wrap><Button type="primary" className="gold-button" icon={<ThunderboltOutlined />} onClick={shuffle}>Generate Layout</Button><Button onClick={() => setSelected([])}>Clear Selection</Button></Space></Card></Col>
      <Col xs={24} xl={8}><Card className="content-card"><h3>My Selection</h3><div className="field-label">Entry name</div><Input value={roundName} onChange={e => setRoundName(e.target.value)} maxLength={60}/><div className="stats-mini"><Statistic title="Total cells" value={numbers.length}/><Statistic title="Selected" value={selected.length}/></div><div className="field-label">Selected numbers</div><div className="selection-box">{selected.length ? [...selected].sort((a, b) => a - b).map(n => <Tag color="gold" key={n}>{String(n).padStart(2, '0')}</Tag>) : <Text type="secondary">No numbers selected</Text>}</div><Button block type="primary" className="gold-button" icon={<SaveOutlined />} onClick={save} style={{ marginTop: 22 }}>Save My Lucky Entry</Button><p className="small-note">Practice entries stay in this browser only. No lottery draws, purchases, prizes or backend connections are implemented.</p></Card></Col></Row>
  </div>;
}
