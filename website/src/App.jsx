import { createContext, useCallback, useContext, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';

// Assets live in the repo root, one level above the `website` folder.
// If your website folder sits somewhere else, change '../../' in the glob and in A() (2 places).
const ASSET_URLS = import.meta.glob(
  '../../{ITI-Labs,projects,design-challenges,noise-assignment,certificate,logos}/**/*.{pdf,png,jpg,jpeg,svg,csv}',
  { eager: true, query: '?url', import: 'default' }
);
const A = (p) => ASSET_URLS['../../' + p] || '';

/* ===================== REPO ===================== */

const REPO = 'https://github.com/Mohammed-Nasr-Aldin/ITI-Analog-Design';

/* ===================== DATA ===================== */

const CONTACTS = [
  { id: 'github', label: 'GitHub', href: 'https://github.com/Mohammed-Nasr-Aldin', color: '#181717', slug: 'github' },
  { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/mohammed-nasreldin', color: '#0A66C2', text: 'in' },
  { id: 'whatsapp', label: 'WhatsApp', href: 'https://wa.me/201156108363', color: '#25D366', slug: 'whatsapp' },
  { id: 'email', label: 'Email', href: 'mailto:mohammednasrsmail@gmail.com', color: '#EA4335', mail: true },
];

const COURSE = [
  { t: 'Course information', d: 'Prerequisites, description, and why it is different.', href: 'https://www.master-micro.com/professional-courses/analog-ic-design/course-information' },
  { t: 'Course plan', d: 'A suggested plan for the lectures and labs journey.', href: 'https://www.master-micro.com/professional-courses/analog-ic-design/course-plan' },
  { t: 'Course resources', d: 'Videos, lecture slides, labs, and more.', href: 'https://www.master-micro.com/professional-courses/analog-ic-design/course-resources' },
];

const REFS = [
  'B. Razavi, Design of Analog CMOS Integrated Circuits.',
  'D. Johns and K. Martin, Analog Integrated Circuit Design (2012). CD-buffer compensation (Sec. 4.4) and noise assignment (Ex. 9.10).',
  'A. Sedra and K. Smith, Microelectronic Circuits.',
  'R. Hogervorst et al., Rail-to-Rail Input/Output Operational Amplifier for VLSI Cell Libraries, IEEE JSSC, Dec. 1994.',
  'H. Omran, Optimum Split Ratio for Folded Cascode OTA Bias Current, Designs, 2019.',
];

/* ---------------------------------- LABS ---------------------------------- */
const CATS = {
  passive: { name: 'Passive', color: '#6B4EFF' },
  single: { name: 'Single stage', color: '#2A55E5' },
  mirror: { name: 'Mirrors and pairs', color: '#0E8F6E' },
  ota: { name: 'OTA and feedback', color: '#C8102E' },
  noise: { name: 'Noise', color: '#C77700' },
};

const LAB_TECH = 'GF180 · 180 nm · VDD 1.8 V';
const XS = ['xschem + ngspice', 'Spice Station'];
const CV = ['Cadence Virtuoso (ADE)'];

// Tools were checked against the lab reports: Labs 00-07 = xschem + ngspice, Labs 08 and 10 = Cadence Virtuoso.
const LABS = [
  { id: '00', cat: 'passive', title: 'RLC circuits', sim: XS, tech: 'None (passive RLC)', size: 'None (passive circuit)', kw: 'rlc resonance impedance q factor bandwidth damping', an: ['AC', 'Transient', 'Parametric sweep'],
    blurb: 'Parallel and series RLC: impedance, resonance, Q, bandwidth, R sweeps and step-response damping.',
    stats: [['f0', '5.03 GHz hand · 5.018 GHz sim'], ['Q', '31.6 hand · 30.1 / 30.8 sim']] },
  { id: '01', cat: 'single', title: 'LPF and MOSFET characteristics', sim: XS, size: 'None (device characterization)', kw: 'lpf rc low pass filter mosfet characteristics long channel short channel velocity saturation', an: ['Transient', 'AC', 'DC sweep'],
    blurb: 'RC low-pass filter, then long channel (30 µm / 2 µm) against short channel (3 µm / 200 nm): ID-VGS, gm-VGS, ID-VDS, velocity saturation, channel-length modulation.',
    stats: [['Rise time', '1.104 ns vs 1.1 ns'], ['f-3dB', '317.6 vs 318.3 MHz'], ['NMOS/PMOS current ratio', '3.85 long · 2.48 short']] },
  { id: '02', cat: 'single', title: 'Common-source amplifier', sim: XS, kw: 'cs common source amplifier gain linearization', an: ['DC', 'AC', 'Transient'],
    blurb: 'Sizing chart for Av = −8 at 100 µA, gain non-linearity and its linearization with feedback, PMOS load.',
    stats: [['Sizing', 'W 34.5 µm · L 2 µm · RD 9 kΩ'], ['Gain', '−7.68 sim vs −8'], ['Linear input range', '0.208 V vs 0.21 V']] },
  { id: '03', cat: 'single', title: 'Cascode amplifier', sim: XS, kw: 'cascode amplifier gain bandwidth miller', an: ['AC', 'Transient'],
    blurb: 'gm·ro = 80 at 50 µA (L = 350 nm, W = 3.57 µm). Cascode used once for gain and once for bandwidth.',
    stats: [['Gain', '2111 (66.5 dB) vs 72 CS'], ['Bandwidth', '35.9 kHz vs 1.09 MHz'], ['Miller-reduced BW', '3 vs 1.69 MHz']] },
  { id: '04', cat: 'single', title: 'Common-drain buffer', sim: XS, kw: 'cd common drain source follower buffer compensation', an: ['AC', 'Transient', 'Zout'],
    blurb: 'ID = 10 µA, gm/ID = 10, L = 1 µm, W = 19.36 µm. Ringing fixed with a load cap, then the C1-R2-C2 network from Johns and Martin.',
    stats: [['Overshoot', '49.6 % at Q ≈ 2.3'], ['After compensation', 'no ringing, no overshoot']] },
  { id: '05', cat: 'mirror', title: 'Current mirrors', sim: XS, kw: 'current mirror mismatch monte carlo wide swing cascode', an: ['DC', 'Monte Carlo (200 runs)'],
    blurb: 'Mismatch below 2 % and λ below 0.1 V⁻¹ (V* = 150 mV, L = 1.42 µm, W = 14.6 µm, m = 2). Simple, wide-swing and cascode mirrors.',
    stats: [['Rout', '1.585 MΩ vs 216 MΩ'], ['Compliance', '0.15 V vs 0.25 V'], ['ΔIout', '2.27 / 2.24 / 0.016 %'], ['Monte Carlo', '1.93 % vs 1.87 %']] },
  { id: '06', cat: 'mirror', title: 'Differential amplifier', sim: XS, kw: 'differential pair amplifier cmrr cmir', an: ['DC', 'AC', 'CMIR'],
    blurb: 'PMOS input pair, ISS = 40 µA, RD = 30 kΩ. Simple against wide-swing mirror load.',
    stats: [['Avd', '7.81 vs 8 hand'], ['BW', '5.7 MHz'], ['|Avcm|', '0.039'], ['CMIR', '1.19 V simple · 1.14 V wide-swing']] },
  { id: '07', cat: 'ota', title: 'Five-transistor OTA', sim: XS, kw: '5t five transistor ota cmrr gbw', an: ['OP', 'AC', 'Loop gain', 'CMIR'],
    blurb: 'NMOS input pair, gm/ID sizing, minimum area read from an Area × ID plot.',
    stats: [['Avd', '34.25 dB'], ['CMRR', '74.2 dB'], ['GBW', '5 MHz at 5 pF'], ['Area · current', '11.8 µm² · 35.25 µA'], ['Phase margin', '89°']] },
  { id: '08', cat: 'ota', title: 'Negative feedback', sim: CV, size: 'Reuses the Lab 07 OTA', kw: 'negative feedback closed loop loop gain desensitization temperature', an: ['AC', 'Loop gain', 'Temperature sweep'],
    blurb: 'Behavioral against real OTA with CIN = 4 pF and 12 pF. Gain desensitization over temperature.',
    stats: [['Closed-loop gain', '5.68 / 11.37 dB'], ['BW', '2.65 / 1.37 MHz'], ['Drift over temp', '0.73 % vs 16.6 % loop gain']] },
  { id: '10', cat: 'noise', title: 'Noise simulation', sim: CV, size: 'RC + five-transistor OTA', kw: 'noise thermal flicker kt c transient noise', an: ['Noise', 'Transient noise'],
    blurb: 'kT/C on an RC low-pass, then input-referred noise and flicker corner of the five-transistor OTA.',
    stats: [['RC low-pass', '4.07 nV/√Hz · 64.3 µVrms'], ['5T OTA', '15.15 vs 14.83 nV/√Hz'], ['Flicker corner', '≈ 1.65 MHz']] },
];

/* ------------------------- PROJECTS + CHALLENGES ------------------------- */
const P1 = 'projects/project1/';
const P2 = 'projects/project2/';
const DC = 'design-challenges/';

const PROJECTS = [
  {
    id: 'p1', tab: 'Project 1', sub: 'Lab 09', title: 'Two-stage Miller OTA',
    summary: 'PMOS input pair, NMOS active load and an NMOS second stage. A voltage-controlled NMOS resistor nulls the zero, with its gate on VDD and body on GND so no extra bias branch is needed.',
    schematics: [{ label: 'Schematic', src: A(P1 + 'two-stage-miller.png') }],
    facts: [['Technology', 'GF180 · 180 nm · 1.8 V'], ['Reference · load', '10 µA · 5 pF'], ['Gain error', '≤ 0.05 % (Aol ≥ 66 dB)'], ['CMRR', '≥ 74 dB'], ['Slew rate', '5 V/µs'], ['Rise time', '≤ 70 ns'], ['Output swing', '0.2 V to 1.6 V'], ['Supply current', '< 60 µA']],
    tools: ['Cadence Virtuoso', 'ADT gm/ID'],
    pdf: { src: A(P1 + 'report/two-stag-millier-OTA.pdf'), label: 'PDF' },
    images: [
      { src: A(P1 + 'two-stage-miller.png'), cap: 'Two-stage Miller OTA' },
      { src: A(P1 + 'Ao.png'), cap: 'Open-loop gain (Aol)' },
      { src: A(P1 + 'CMRR.png'), cap: 'CMRR' },
    ],
    table: { cols: ['Hand', 'Simulation'], rows: [
      { m: 'DC gain (dB)', a: 70.24, b: 73.43 }, { m: 'GBW (MHz)', a: 5.97, b: 5.52 },
      { m: 'CMRR (dB)', a: 74, b: 74.3 }, { m: 'Phase margin (°)', a: 73, b: 73.12 },
      { m: 'SR, Cc = 1.665 pF (V/µs)', a: 6, b: 5 }, { m: 'CMIR (V)', a: '0.19 to 0.8', b: '0.1 to 0.8' },
    ] },
    notes: [
      'Gain split Av1 = 65, Av2 = 55. Stage 1 gets more gain because stage-2 noise is divided by it at the input.',
      'IB1 = 10 µA and IB2 = 40 µA put the second pole near 3.2× the unity-gain frequency (PM ≈ 73°). Total area 33.9 µm².',
      'Cc went from 2 pF down to 1.665 pF, the largest value that still meets slew rate with PM above 70°.',
    ],
  },
  {
    id: 'p2', tab: 'Project 2', sub: 'Lab 11', title: 'Fully differential folded-cascode OTA',
    summary: 'PMOS input pair, folded cascode, current split S = 1, with a behavioral and then a real CMFB. Closed in a capacitive inverting amplifier with Acl = 2.',
    schematics: [{ label: 'Schematic', src: A(P2 + 'FD-folded.png') }, { label: 'CMFB', src: A(P2 + 'CMFB.png') }],
    facts: [['Technology', 'GF180 · 180 nm · 2.5 V'], ['Reference', '10 µA external'], ['Feedback', 'CS = 2 pF · CF = 1 pF · β = 1/3'], ['Loop gain', '≥ 60 dB'], ['Phase margin', '≥ 70°'], ['Output swing', '1.2 Vpp differential'], ['Settling', '1 % in 100 ns'], ['Active area', '111.2 µm²']],
    tools: ['Cadence Virtuoso', 'ADT gm/ID'],
    pdf: { src: A(P2 + 'report/Fully-diff-OTA.pdf'), label: 'PDF' },
    extra: [{ src: A(P2 + 'paper/folded_current_split.pdf'), label: 'paper' }],
    images: [
      { src: A(P2 + 'FD-folded.png'), cap: 'Folded-cascode OTA' },
      { src: A(P2 + 'CMFB.png'), cap: 'Common-mode feedback network' },
      { src: A(P2 + 'Ao.png'), cap: 'Open-loop gain (Aol)' },
      { src: A(P2 + 'Vod-pulse.png'), cap: 'Vod, pulse input' },
      { src: A(P2 + 'Vod-sin.png'), cap: 'Vod, sine input' },
    ],
    table: { cols: ['Behavioral CMFB', 'Actual CMFB'], rows: [
      { m: 'Open-loop DC gain (dB)', a: 77.09, b: 75.96 }, { m: 'Open-loop GBW (MHz)', a: 22.63, b: 22.55 },
      { m: 'Open-loop PM (°)', a: 87.84, b: 87.85 },
    ] },
    notes: [
      '1 % settling gives τcl ≈ 21.7 ns, so open-loop GBW ≈ 22 MHz and gm1,2 ≈ 170 µS.',
      'Input pair L = 300 nm at gm/ID = 17. Current sources L = 1 µm at 10. Cascodes L = 0.5 µm at 15.',
      'First-pass CM loop PM was 56.4°. Narrowing the CMFB input width to 0.5 µm brought it to 77.5°.',
    ],
    tilesTitle: 'Closed-loop results',
    tiles: [['Closed-loop gain', '1.999 (6.016 dB)'], ['Differential loop', '66.41 dB · 7.5 MHz · 89.33°'], ['CM loop after tuning', '77.5° at 69.19 dB'], ['1 % settling', '96.45 ns'], ['Output swing', '1.2 Vpp from 0.6 Vpp']],
  },
];

const CHALLENGES = [
  {
    id: 'opamp', tab: 'Rail-to-rail op-amp', sub: '65 nm', title: 'Full-custom rail-to-rail op-amp',
    summary: 'Complementary input pairs and a floating class-AB output stage biased by a Monticelli translinear loop, after Hogervorst et al. (JSSC 1994). Built twice: shared cascode bias and independent-branch bias.',
    schematics: [{ label: 'Shared bias', src: A(DC + 'op-amp/shared-bias-op-amp-ckt.png') }, { label: 'Independent bias', src: A(DC + 'op-amp/ind-bias-op-amp-ckt.png') }],
    facts: [['Technology', '65 nm CMOS · 2.5 V'], ['Load', '20 kΩ ∥ 20 pF'], ['Targets', 'Aol > 60 dB · PM > 60° · GBW > 10 MHz'], ['Verified', 'TT FF SS FS SF · −40 to 125 °C'], ['Input pairs', 'L 300 nm · gm/ID 20'], ['Mirror ratio', 'm = 4']],
    tools: ['Cadence Virtuoso', 'ADT gm/ID'],
    pdf: { src: A(DC + 'op-amp/report/op-amp.pdf'), label: 'PDF' },
    extra: [{ src: A(DC + 'op-amp/paper/hogervorst1994.pdf'), label: 'paper' }],
    images: [
      { src: A(DC + 'op-amp/shared-bias-op-amp-ckt.png'), cap: 'Shared bias circuit' },
      { src: A(DC + 'op-amp/ind-bias-op-amp-ckt.png'), cap: 'Independent bias circuit' },
      { src: A(DC + 'op-amp/LG.png'), cap: 'Loop gain' },
      { src: A(DC + 'op-amp/VOUT-VICM.png'), cap: 'VOUT vs VICM' },
      { src: A(DC + 'op-amp/I-sin.png'), cap: 'Current, sine input' },
    ],
    table: { cols: ['Shared', 'Independent'], rows: [
      { m: 'Compensation CM (pF)', a: 1.4, b: 0.7 }, { m: 'Aol, TT (dB)', a: 65.78, b: 80.64 },
      { m: 'GBW, TT (MHz)', a: 10.67, b: 13.28 }, { m: 'Phase margin, TT (°)', a: 60.39, b: 64.31 },
      { m: 'Area', a: '367.95 µm²', b: 'Larger' },
    ] },
    notes: [
      'Sharing one cascode mirror saves area and power. Independent branches hold up better across corners.',
      'A few corners still miss: FF PM = 54.1° and SS GBW = 5.1 MHz on the independent version.',
      'Also tested as inverting (−1), non-inverting (×2) and integrator (20 kΩ, 20 pF at 200 kHz).',
    ],
  },
  {
    id: 'bgr', tab: 'Bandgap reference', sub: 'BGR', title: 'Bandgap reference',
    summary: 'First with an ideal error amplifier, then with a real one (NMOS pair 30/20, PMOS load 80/1, tail 8.4/1.97) and a start-up circuit.',
    schematics: [{ label: 'Schematic', src: A(DC + 'BGR/BGR.png') }],
    facts: [['Technology', '65 nm CMOS'], ['BJT ratio', 'n = 24'], ['ΔVBE', '82.6 mV'], ['Ideal amp resistors', 'R2 ≈ 165 kΩ · R3 = 1194.2 kΩ · R4 ≈ 766.5 kΩ'], ['Real amp', 'PMOS 0.62/5.5 tuned'], ['Range', '−40 to 125 °C']],
    tools: ['Cadence Virtuoso'],
    pdf: { src: A(DC + 'BGR/report/BGR.pdf'), label: 'PDF' },
    images: [
      { src: A(DC + 'BGR/BGR.png'), cap: 'Bandgap reference circuit' },
      { src: A(DC + 'BGR/Vref.png'), cap: 'VREF vs temperature' },
    ],
    table: { cols: ['Ideal amp', 'Actual amp'], rows: [
      { m: 'VREF variation (mV)', a: 0.82, b: 5.8 }, { m: 'Phase margin (°)', a: 'n/a', b: 91.35 },
    ] },
    notes: ['The actual amplifier sits around 0.8 V and pays about 5 mV of extra drift for being real.'],
  },
  {
    id: 'noise', tab: 'Noise assignment', sub: 'Johns & Martin 9.10', title: 'Noise assignment',
    summary: 'Hand analysis of a 10 kHz low-pass filter around an op-amp (Cf = 160 pF, Rf = 100 kΩ, R1 = 10 kΩ, R2 = 9.1 kΩ). Voltage noise, both noise currents and resistor thermal noise combine by superposition, each shaped by its own transfer function.',
    schematics: [],
    tools: ['Hand analysis'],
    facts: [['Source', 'Johns and Martin, Ex. 9.10, Sec. 9.4.1']],
    pdf: { src: A('noise-assignment/noise-assignment.pdf'), label: 'PDF' },
    tiles: [['Inverting-terminal sources', '18.5 µVrms'], ['Non-inverting-terminal sources', '74.6 µVrms'], ['Total output noise', '76.86 µVrms'], ['SNR at 100 mVrms in', '82.3 dB']],
    table: { cols: ['Value'], rows: [
      { m: 'Inverting-terminal sources', a: '18.5 µVrms' }, { m: 'Non-inverting-terminal sources', a: '74.6 µVrms' },
      { m: 'Total output noise', a: '76.86 µVrms' }, { m: 'SNR (1 Vrms output)', a: '82.3 dB' },
    ] },
  },
];

/* ================== COMPONENTS ================== */

/* ------------------------- overlays (image + pdf) ------------------------- */
const Ov = createContext(null);
const useOverlay = () => useContext(Ov);

function OverlayProvider({ children }) {
  const [pdf, setPdf] = useState(null);
  const [img, setImg] = useState(null);
  useEffect(() => {
    const k = (e) => { if (e.key === 'Escape') { setPdf(null); setImg(null); } };
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, []);
  useEffect(() => { document.body.style.overflow = pdf || img ? 'hidden' : ''; }, [pdf, img]);
  const value = useMemo(() => ({
    openPdf: (src, title) => setPdf({ src, title }),
    openImg: (src, alt) => setImg({ src, alt }),
  }), []);
  return (
    <Ov.Provider value={value}>
      {children}
      {img && (
        <div className="veil" role="dialog" aria-modal="true" onClick={() => setImg(null)}>
          <img className="veil__img" src={img.src} alt={img.alt} />
          <button className="veil__x" onClick={() => setImg(null)}>Close</button>
        </div>
      )}
      {pdf && (
        <div className="veil veil--pdf" role="dialog" aria-modal="true">
          <div className="pdfbar">
            <b>{pdf.title}</b>
            <a href={pdf.src} target="_blank" rel="noreferrer">Open in new tab</a>
            <a href={pdf.src} download>Download</a>
            <button onClick={() => setPdf(null)}>Close</button>
          </div>
          <iframe title={pdf.title} src={pdf.src} />
        </div>
      )}
    </Ov.Provider>
  );
}

function PdfButtons({ file, name, label = 'PDF', quiet }) {
  return (
    <div className={`btns ${quiet ? 'btns--quiet' : ''}`}>
      <a className="btn btn--solid" href={file} target="_blank" rel="noreferrer" title={name}>View {label}</a>
      <a className="btn" href={file} download>Download {label}</a>
    </div>
  );
}

/* --------------------------------- contact -------------------------------- */
function Glyph({ c }) {
  if (c.slug) return <img src={`https://cdn.simpleicons.org/${c.slug}/FFFFFF`} alt="" width="22" height="22" />;
  if (c.text) return <b className="icon__t">{c.text}</b>;
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#fff" strokeWidth="2" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" /><path d="M3 6l9 7 9-7" />
    </svg>
  );
}

function Contact({ labels, size = 44 }) {
  return (
    <ul className={`contact ${labels ? 'contact--labels' : ''}`} style={{ '--sz': size + 'px' }}>
      {CONTACTS.map((c) => (
        <li key={c.id}>
          <a className="icon" style={{ '--c': c.color }} href={c.href} aria-label={c.label}
            {...(c.mail ? {} : { target: '_blank', rel: 'noreferrer' })}>
            <Glyph c={c} />
          </a>
          {labels && <span>{c.label}</span>}
        </li>
      ))}
    </ul>
  );
}

/* ---------------------------------- tabs ---------------------------------- */
function Tabs({ items, value, onChange, variant = 'inline', label }) {
  const wrap = useRef(null);
  const [ind, setInd] = useState({ l: 0, w: 0 });
  const measure = useCallback(() => {
    const el = wrap.current?.querySelector('[aria-selected="true"]');
    if (el) setInd({ l: el.offsetLeft, w: el.offsetWidth });
  }, []);
  useLayoutEffect(() => { measure(); }, [value, items, measure]);
    useEffect(() => {
    const box = wrap.current;
    const el = box?.querySelector('[aria-selected="true"]');
    if (!box || !el) return;
    box.scrollTo({ left: el.offsetLeft - (box.clientWidth - el.offsetWidth) / 2, behavior: 'smooth' });
  }, [value]);
  useEffect(() => {
    window.addEventListener('resize', measure);
    document.fonts?.ready.then(measure);
    return () => window.removeEventListener('resize', measure);
  }, [measure]);
  return (
    <div className={`tabs tabs--${variant}`} role="tablist" aria-label={label} ref={wrap}>
      {items.map((it) => (
        <button key={it.id} role="tab" aria-selected={value === it.id} className="tab" onClick={() => onChange(it.id)}>
          <span>{it.label}</span>{it.sub && <small>{it.sub}</small>}
        </button>
      ))}
      <i className="tabs__ind" style={{ transform: `translateX(${ind.l}px)`, width: ind.w }} />
    </div>
  );
}

/* -------------------------------- carousel -------------------------------- */
function Carousel({ slides }) {
  const [i, setI] = useState(0);
  const [dir, setDir] = useState(1);
  const { openImg } = useOverlay();
  const n = slides.length;
  const go = (k, d) => { setDir(d); setI((k + n) % n); };
  const s = slides[i];
  return (
    <div className="car" tabIndex={0} aria-label="Image carousel"
      onKeyDown={(e) => { if (e.key === 'ArrowRight') go(i + 1, 1); if (e.key === 'ArrowLeft') go(i - 1, -1); }}>
      <div className="car__view">
        <img key={s.src} className={`car__img ${dir > 0 ? 'in-r' : 'in-l'}`} src={s.src} alt={s.cap} onClick={() => openImg(s.src, s.cap)} />
        {n > 1 && <>
          <button className="car__btn car__btn--l" onClick={() => go(i - 1, -1)} aria-label="Previous image">‹</button>
          <button className="car__btn car__btn--r" onClick={() => go(i + 1, 1)} aria-label="Next image">›</button>
        </>}
      </div>
      <div className="car__cap"><b>{s.cap}</b><span>{i + 1} / {n}</span></div>
      {n > 1 && (
        <div className="car__thumbs">
          {slides.map((x, k) => (
            <button key={x.src} className={k === i ? 'on' : ''} onClick={() => go(k, k > i ? 1 : -1)} aria-label={x.cap}>
              <img src={x.src} alt="" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ------------------------------ live scope ------------------------------- */
const COL = { blue: '#2A55E5', red: '#C8102E', ink: '#0F1A2E', grid: '#DCE2EB', mute: '#8592A8' };

function line(ctx, w, fn, color, lw, dash) {
  ctx.beginPath();
  for (let x = 0; x <= w; x += 2) { const y = fn(x); if (x) ctx.lineTo(x, y); else ctx.moveTo(x, y); }
  ctx.strokeStyle = color; ctx.lineWidth = lw; ctx.setLineDash(dash || []); ctx.stroke(); ctx.setLineDash([]);
}
function grid(ctx, w, h) {
  ctx.strokeStyle = COL.grid; ctx.lineWidth = 1; ctx.beginPath();
  for (let x = 0; x <= w; x += 32) { ctx.moveTo(x + .5, 0); ctx.lineTo(x + .5, h); }
  for (let y = 0; y <= h; y += 32) { ctx.moveTo(0, y + .5); ctx.lineTo(w, y + .5); }
  ctx.stroke();
}
const label = (ctx, txt, x, y, color) => { ctx.fillStyle = color; ctx.font = '600 12px Archivo, sans-serif'; ctx.fillText(txt, x, y); };

function drawGain(ctx, w, h, t, p) {
  const G = 1 + p * 29, R = h * .36, a = h * .045, mid = h / 2;
  const ph = (x) => (x / w) * Math.PI * 6 - t * 2.4;
  line(ctx, w, () => mid - R, COL.red, 1, [6, 5]);
  line(ctx, w, () => mid + R, COL.red, 1, [6, 5]);
  line(ctx, w, (x) => mid - a * Math.sin(ph(x)), COL.mute, 1.5);
  line(ctx, w, (x) => mid - R * Math.tanh((G * a * Math.sin(ph(x))) / R), COL.blue, 2.6);
  label(ctx, 'VDD', 10, mid - R - 7, COL.red); label(ctx, 'GND', 10, mid + R + 16, COL.red);
  label(ctx, 'Vin', w - 30, mid - a - 8, COL.mute); label(ctx, 'Vout', w - 36, mid - R * .55, COL.blue);
}

function stepResp(z, s) {
  if (s <= 0) return 0;
  if (z < 1) { const wd = Math.sqrt(1 - z * z); return 1 - Math.exp(-z * s) * (Math.cos(wd * s) + (z / wd) * Math.sin(wd * s)); }
  const q = Math.sqrt(z * z - 1), s1 = -z + q, s2 = -z - q;
  return 1 + (s2 * Math.exp(s1 * s) - s1 * Math.exp(s2 * s)) / (s1 - s2);
}
const damp = (p) => { const z = .12 + p * 1.0; return Math.abs(z - 1) < .006 ? 1.006 : z; };

function drawSettle(ctx, w, h, t, p) {
  const z = damp(p), x0 = w * .1, span = w * .86, T = 14, base = h * .8, amp = h * .38;
  const y = (v) => base - amp * v;
  const bh = Math.max(amp * .01, 2.5);
  ctx.fillStyle = 'rgba(42,85,229,.13)'; ctx.fillRect(x0, y(1) - bh, w - x0, bh * 2);
  ctx.beginPath(); ctx.moveTo(0, base); ctx.lineTo(x0, base); ctx.lineTo(x0, y(1)); ctx.lineTo(w, y(1));
  ctx.strokeStyle = COL.mute; ctx.lineWidth = 1.4; ctx.setLineDash([6, 5]); ctx.stroke(); ctx.setLineDash([]);
  const prog = Math.min(1, (t % 7) / 4.5), xe = x0 + span * prog;
  ctx.beginPath(); ctx.moveTo(0, base);
  for (let x = x0; x <= xe; x += 2) ctx.lineTo(x, y(stepResp(z, ((x - x0) / span) * T)));
  ctx.strokeStyle = COL.blue; ctx.lineWidth = 2.6; ctx.stroke();
  const ye = y(stepResp(z, ((xe - x0) / span) * T));
  ctx.fillStyle = COL.red; ctx.fillRect(xe - 3.5, ye - 3.5, 7, 7);
  label(ctx, '±1 % band', w - 74, y(1) - bh - 6, COL.blue);
}

const vbe = (x) => .8 - .0018 * x - .7e-6 * x * x;
const trim = (p) => .0012 + p * .0012;
function drawBgr(ctx, w, h, t, p) {
  const m = trim(p), vref = (x) => vbe(x) + m * x, mid = vref(42.5), S = (h * .4) / .03;
  const T = (px) => (px / w) * 165 - 40;
  line(ctx, w, (x) => h * .14 + (x / w) * h * .66, COL.red, 1.4, [5, 5]);
  line(ctx, w, (x) => h * .86 - (x / w) * h * .66 * (.5 + p * .7), COL.blue, 1.4, [5, 5]);
  const yv = (x) => Math.max(6, Math.min(h - 6, h / 2 - (vref(T(x)) - mid) * S));
  line(ctx, w, yv, COL.ink, 3);
  const cx = ((t * .1) % 1) * w;
  ctx.strokeStyle = COL.mute; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(cx, 0); ctx.lineTo(cx, h); ctx.stroke();
  ctx.fillStyle = COL.red; ctx.fillRect(cx - 4, yv(cx) - 4, 8, 8);
  label(ctx, 'CTAT', 10, h * .14 - 8, COL.red); label(ctx, 'PTAT', 10, h * .86 + 16, COL.blue);
  label(ctx, 'VREF', w - 40, h / 2 - 12, COL.ink);
  label(ctx, `${T(cx).toFixed(0)} °C`, Math.min(cx + 8, w - 50), 18, COL.mute);
}

const SCOPE = {
  gain: { name: 'Gain', init: .3, draw: drawGain, hint: 'Drag the gain. Past the supply, the amplifier clips.',
    read: (p) => { const G = 1 + p * 29; return `Av ${G.toFixed(1)}× · ${(20 * Math.log10(G)).toFixed(1)} dB${G > 8 ? ' · clipping' : ''}`; } },
  settle: { name: 'Damping', init: .3, draw: drawSettle, hint: 'Drag the damping. Watch overshoot and the 1 % settling band.',
    read: (p) => { const z = damp(p); const os = z < 1 ? Math.exp((-Math.PI * z) / Math.sqrt(1 - z * z)) * 100 : 0; return `ζ ${z.toFixed(2)} · overshoot ${os.toFixed(0)} % · PM ≈ ${Math.min(90, z * 100).toFixed(0)}°`; } },
  bgr: { name: 'PTAT trim', init: .55, draw: drawBgr, hint: 'Drag the trim. A flat reference is CTAT and PTAT cancelling.',
    read: (p) => { let lo = 9, hi = -9; for (let x = -40; x <= 125; x += 5) { const v = vbe(x) + trim(p) * x; lo = Math.min(lo, v); hi = Math.max(hi, v); } return `ΔVREF ${((hi - lo) * 1000).toFixed(1)} mV over −40 to 125 °C`; } },
};

function Scope({ mode }) {
  const cfg = SCOPE[mode];
  const [p, setP] = useState(cfg.init);
  const pr = useRef(p); pr.current = p;
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current, ctx = c.getContext('2d');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let w = 0, h = 0, raf = 0;
    const resize = () => {
      const r = c.getBoundingClientRect(), d = window.devicePixelRatio || 1;
      w = r.width; h = r.height; c.width = w * d; c.height = h * d; ctx.setTransform(d, 0, 0, d, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize); ro.observe(c);
    const t0 = performance.now();
    const frame = (now) => {
      const t = reduce ? 2 : (now - t0) / 1000;
      ctx.clearRect(0, 0, w, h); grid(ctx, w, h);
      ctx.strokeStyle = '#B7C1D1'; ctx.beginPath(); ctx.moveTo(0, h / 2 + .5); ctx.lineTo(w, h / 2 + .5); ctx.stroke();
      cfg.draw(ctx, w, h, t, pr.current);
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, [cfg]);
  return (
    <figure className="scope">
      <canvas ref={ref} aria-label="Interactive waveform demo" />
      <span className="scope__read">{cfg.read(p)}</span>
      <label className="scope__ctl">
        <span>{cfg.name}</span>
        <input type="range" min="0" max="1" step="0.005" value={p} onChange={(e) => setP(+e.target.value)} />
      </label>
      <figcaption>{cfg.hint}</figcaption>
    </figure>
  );
}

/* --------------------------- gm/ID explorer (about) --------------------------- */
function GmId() {
  const [g, setG] = useState(18);            // gm/ID sits on the x axis
  const n = 1.3, Vt = .02585, k = 1 / (n * Vt);
  const gmid = (lx) => k / (.5 + Math.sqrt(.25 + Math.pow(10, lx)));
  const icOf = (v) => Math.pow(k / v - .5, 2) - .25;
  const W = 460, H = 260, L = 46, R = 14, Tp = 14, B = 40;
  const px = (v) => L + (v / 30) * (W - L - R);
  const py = (lx) => Tp + (1 - (lx + 2) / 4) * (H - Tp - B);
  const d = useMemo(() => { let p = ''; for (let lx = -2; lx <= 2.001; lx += .05) p += `${p ? 'L' : 'M'}${px(gmid(lx)).toFixed(1)} ${py(lx).toFixed(1)}`; return p; }, []);
  const ic = Math.max(icOf(g), .01), lx = Math.log10(ic);
  const reg = ic < .1 ? 'weak inversion' : ic > 10 ? 'strong inversion' : 'moderate inversion';
  const role = g > 14 ? 'Input pair territory: max gm per amp, small input cap.' : g > 8 ? 'Mirror and current-source territory: better matching and headroom.' : 'Deep strong inversion: high V*, big overdrive.';
  return (
    <div className="gmid">
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Inversion coefficient versus gm over ID">
        <rect x={px(15)} y={Tp} width={px(20) - px(15)} height={H - Tp - B} className="gmid__band gmid__band--in" />
        <rect x={px(9)} y={Tp} width={px(11) - px(9)} height={H - Tp - B} className="gmid__band gmid__band--cs" />
        {[0, 10, 20, 30].map((v) => <g key={v}><line x1={px(v)} x2={px(v)} y1={Tp} y2={H - B} className="gmid__g" /><text x={px(v)} y={H - B + 15} textAnchor="middle">{v}</text></g>)}
        {[-2, -1, 0, 1, 2].map((v) => <g key={v}><line x1={L} x2={W - R} y1={py(v)} y2={py(v)} className="gmid__g" /><text x={L - 6} y={py(v) + 4} textAnchor="end">{v === 0 ? '1' : `10^${v}`}</text></g>)}
        <path d={d} className="gmid__curve" />
        <line x1={px(g)} x2={px(g)} y1={Tp} y2={H - B} className="gmid__cur" />
        <line x1={L} x2={W - R} y1={py(lx)} y2={py(lx)} className="gmid__cur" />
        <rect x={px(g) - 5} y={py(lx) - 5} width="10" height="10" className="gmid__dot" />
        <text x={(L + W - R) / 2} y={H - 8} textAnchor="middle">gm/ID (µS/µA)</text>
        <text transform={`translate(11 ${(Tp + H - B) / 2}) rotate(-90)`} textAnchor="middle">IC (inversion coefficient)</text>
        <text x={px(17.5)} y={Tp + 11} textAnchor="middle">input pair</text>
        <text x={px(10)} y={Tp + 11} textAnchor="middle">mirrors</text>
      </svg>
      <input type="range" min="3" max="29.5" step="0.1" value={g} onChange={(e) => setG(+e.target.value)} aria-label="gm over ID" />
      <p><b>gm/ID = {g.toFixed(1)} µS/µA</b> · IC = {ic < 1 ? ic.toFixed(2) : ic.toFixed(1)} · {reg}</p>
      <p className="gmid__role">{role}</p>
    </div>
  );
}

/* --------------------------------- about ---------------------------------- */
function About() {
  const { openImg } = useOverlay();
  return (
    <footer className="about">
      <div className="wrap about__grid">
        <div>
          <h2>About</h2>
          <p className="about__lead">Mohammed Nasr Eldin. Analog IC design in CMOS.</p>
          <p>This site is my record of the Analog IC Design (CMOS Technology) summer training at the Information Technology Institute, 15 July to 9 September. It runs from an RC circuit to a fully differential folded-cascode OTA with common-mode feedback.</p>
          <p>Every report follows one order: specs, hand analysis and gm/ID sizing, simulation, then a table comparing the two with the error and a comment on the gap. Mini projects were supervised by Dr. Hesham Omran.</p>
          <a className="btn about__repo" href={REPO} target="_blank" rel="noreferrer">View the repository on GitHub</a>
          <h3>Master Micro course</h3>
          <p>The training follows the free Analog IC Design course on Master Micro. Sizing uses its Analog Designer's Toolbox.</p>
          <ul className="course">
            {COURSE.map((c) => <li key={c.t}><a href={c.href} target="_blank" rel="noreferrer"><b>{c.t}</b><span>{c.d}</span></a></li>)}
            <li><a href="https://adt.master-micro.com/" target="_blank" rel="noreferrer"><b>ADT</b><span>Analog Designer's Toolbox</span></a></li>
          </ul>
        </div>
        <div>
          <h3>Try the method: gm/ID</h3>
          <p>Slide gm/ID from strong inversion (left) to weak inversion (right). Roles pick the point, and the width follows from the current.</p>
          <GmId />
        </div>
      </div>
      <div className="wrap about__grid about__grid--b">
        <div>
          <h3>Tools</h3>
          <img className="about__tools" src={A('logos/tools-logos.svg')} alt="ITI, Cadence and ADT" />
          <p>Cadence Virtuoso for schematics and simulation, xschem with ngspice for the open-source flow, ADT for gm/ID sizing. GF180 (180 nm) for the labs and both projects, 65 nm for the op-amp challenge.</p>
          <h3>References</h3>
          <ul className="refs">{REFS.map((r) => <li key={r}>{r}</li>)}</ul>
        </div>
        <div>
          <h3>Certificate</h3>
          <button className="about__cert" onClick={() => openImg(A('certificate/ITI-AIC.jpeg'), 'ITI Analog IC Design completion certificate')}>
            <img src={A('certificate/ITI-AIC.jpeg')} alt="ITI Analog IC Design completion certificate" />
          </button>
          <h3>Contact</h3>
          <Contact labels />
        </div>
      </div>
      <div className="wrap about__legal">
        <span>MIT License. Papers and books belong to their authors and are not covered by it.</span>
        <span>© Mohammed Nasr Eldin</span>
      </div>
    </footer>
  );
}

/* ==================== PAGES ===================== */

function Intro({ title, children, mode, next }) {
  return (
    <header className="intro wrap">
      <div className="intro__text">
        <h1>{title}</h1>
        {children}
        <Contact labels />
        <a className="btn btn--sm intro__repo" href={REPO} target="_blank" rel="noreferrer">View the repo on GitHub</a>
      </div>
      <Scope mode={mode} key={mode} />
    </header>
  );
}

/* ---------------------------------- LABS ---------------------------------- */
function MonteCarlo() {
  const [v, setV] = useState('both');
  const { openImg } = useOverlay();
  const base = 'ITI-Labs/lab05-monte-carlo-simulation/';
  const sets = [
    { id: 'simple', name: 'Simple CM', note: '1.93 % error', img: A(base + 'simpleCM-histo.png'), csv: A(base + 'simpleCM-monteCarlo-data.csv') },
    { id: 'wide', name: 'Wide-swing CM', note: '1.87 % error', img: A(base + 'wideSwingCM-histo.png'), csv: A(base + 'wideSwingCM-monteCarlo-data.csv') },
  ];
  const shown = sets.filter((s) => v === 'both' || s.id === v);
  return (
    <section className="mc">
      <div className="mc__head">
        <h4>Monte Carlo, 200 runs each</h4>
        <Tabs variant="mini" label="Histogram" value={v} onChange={setV}
          items={[{ id: 'both', label: 'Both' }, { id: 'simple', label: 'Simple' }, { id: 'wide', label: 'Wide-swing' }]} />
      </div>
      <div className={`mc__grid mc__grid--${shown.length}`} key={v}>
        {shown.map((s) => (
          <figure key={s.id}>
            <button onClick={() => openImg(s.img, s.name + ' Monte Carlo histogram')}><img src={s.img} alt={`${s.name} Monte Carlo histogram`} /></button>
            <figcaption><b>{s.name}</b><span>{s.note}</span><a className="btn btn--sm" href={s.csv} download>Download CSV</a></figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

const norm = (t) => t.toLowerCase().replace(/[^a-z0-9 ]+/g, ' ').trim();
// Matches the lab number (5, 05, "lab 5") or words from its name, topic and keywords.
function matchLab(l, q) {
  const parts = norm(q).split(/\s+/).filter((w) => w && w !== 'lab');
  if (!parts.length) return true;
  const hay = norm(`${l.title} ${CATS[l.cat].name} ${l.kw}`);
  return parts.every((w) => (/^\d+$/.test(w) ? Number(w) === Number(l.id) : hay.includes(w)));
}

function Labs({ go }) {
  const [cat, setCat] = useState('all');
  const [q, setQ] = useState('');
  const [open, setOpen] = useState('05');
  const list = LABS.filter((l) => (cat === 'all' || l.cat === cat) && matchLab(l, q));
  const pick = (k) => { setCat(k); setOpen(null); };
  return (
    <>
      <Intro title="Labs" mode="gain">
        <p>The building blocks behind the projects, from a single RC filter to a five-transistor OTA. Each report sizes with gm/ID, calculates by hand, simulates, then compares the two.</p>
        <p>Labs 09 and 11 grew into the mini projects, so they live on the Projects page.</p>
        <div className="intro__btns">
          <button className="btn" onClick={() => go('projects')}>Back to Projects</button>
          <button className="btn btn--solid" onClick={() => go('challenges')}>Next: Design challenges</button>
        </div>
      </Intro>

      <div className="wrap">
        <section className="setup" aria-label="Lab setup">
          <div><small>Technology</small><b>{LAB_TECH}</b></div>
          <div><small>Sizing</small><b>ADT, gm/ID method</b></div>
          <div><small>Simulation</small><b>xschem + ngspice (Labs 00 to 07), Virtuoso (08, 10)</b></div>
          <div><small>Every report ends with</small><b>Hand vs simulation, with error</b></div>
        </section>
      </div>

      <section className="wrap labs">
        <div className="toolbar">
          <div className="chips chips--filter" role="group" aria-label="Filter by topic">
            <button className={cat === 'all' ? 'on' : ''} onClick={() => pick('all')}>All {LABS.length}</button>
            {Object.entries(CATS).map(([k, c]) => (
              <button key={k} className={cat === k ? 'on' : ''} style={{ '--cat': c.color }} onClick={() => pick(k)}>{c.name}</button>
            ))}
          </div>
          <input className="search" type="search" placeholder="Search by name or number, e.g. cascode or 5" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search labs" />
        </div>

        {list.length === 0 && <p className="empty">No lab matches “{q}”. Clear the search or pick All.</p>}

        {list.map((l) => {
          const on = open === l.id;
          return (
            <article key={l.id} className={`lab ${on ? 'is-open' : ''}`} style={{ '--cat': CATS[l.cat].color }}>
              <button className="lab__head" aria-expanded={on} onClick={() => setOpen(on ? null : l.id)}>
                <span className="lab__no">{l.id}</span>
                <span className="lab__title">{l.title}</span>
                <span className="lab__cat">{CATS[l.cat].name}</span>
                <span className="lab__peek">{l.stats[0][0]}: {l.stats[0][1]}</span>
                <span className="lab__chev" aria-hidden="true" />
              </button>
              <div className="lab__body">
                <div className="lab__inner"><div className="lab__pad">
                  <div className="lab__cols">
                    <div>
                      <p className="lab__blurb">{l.blurb}</p>
                      <ul className="tiles">{l.stats.map(([k, v]) => <li key={k}><small>{k}</small><b>{v}</b></li>)}</ul>
                    </div>
                    <dl className="kit">
                      <div><dt>Technology</dt><dd>{l.tech || LAB_TECH}</dd></div>
                      <div><dt>Sizing</dt><dd>{l.size || 'ADT · gm/ID'}</dd></div>
                      <div><dt>Simulation</dt><dd>{l.sim.join(', ')}</dd></div>
                      <div><dt>Analyses</dt><dd>{l.an.join(' · ')}</dd></div>
                    </dl>
                  </div>
                  {l.id === '05' && <MonteCarlo />}
                  <PdfButtons file={A(`ITI-Labs/lab${l.id}.pdf`)} name={`Lab ${l.id}: ${l.title}`} label="PDF" />
                </div></div>
              </div>
            </article>
          );
        })}
      </section>
    </>
  );
}

/* ------------------------ shared showcase (P + DC) ------------------------ */
function fmt(v) { return v; }

function Compare({ t }) {
  const two = t.cols.length === 2;
  return (
    <div className="cmp-wrap">
      <table className="cmp">
        <thead>
          <tr><th />{t.cols.map((c) => <th key={c}>{c}</th>)}{two && <th>Δ</th>}{two && <th className="cmp__viz" aria-label="Comparison bars" />}</tr>
        </thead>
        <tbody>
          {t.rows.map((r) => {
            const num = two && typeof r.a === 'number' && typeof r.b === 'number';
            const d = num ? ((r.b - r.a) / r.a) * 100 : null;
            const mx = num ? Math.max(r.a, r.b) : 1;
            return (
              <tr key={r.m}>
                <th scope="row">{r.m}</th>
                <td>{fmt(r.a)}</td>
                {two && <td>{fmt(r.b)}</td>}
                {two && <td className={num ? 'cmp__d' : 'cmp__na'}>{num ? `${d > 0 ? '+' : ''}${d.toFixed(1)} %` : '·'}</td>}
                {two && (
                  <td className="cmp__viz">
                    {num && <><i style={{ width: `${(r.a / mx) * 100}%` }} className="b1" /><i style={{ width: `${(r.b / mx) * 100}%` }} className="b2" /></>}
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function Showcase({ items }) {
  const [id, setId] = useState(items[0].id);
  const [sch, setSch] = useState(0);
  const { openImg } = useOverlay();
  const it = items.find((x) => x.id === id);
  useEffect(() => setSch(0), [id]);
  const s = it.schematics[sch] || it.schematics[0];
  return (
    <section className="showcase wrap">
      <Tabs items={items.map((x) => ({ id: x.id, label: x.tab, sub: x.sub }))} value={id} onChange={setId} label="Choose one" />
      <div className="swap" key={id}>
        <div className="stage">
          <figure className="frame">
            {s ? (
              <>
                {it.schematics.length > 1 && (
                  <div className="frame__tog">
                    {it.schematics.map((x, k) => <button key={x.label} className={k === sch ? 'on' : ''} onClick={() => setSch(k)}>{x.label}</button>)}
                  </div>
                )}
                <button className="frame__img" onClick={() => openImg(s.src, `${it.title}, ${s.label}`)}>
                  <img src={s.src} alt={`${it.title}, ${s.label}`} />
                </button>
                <figcaption>{s.label}. Click to enlarge.</figcaption>
              </>
            ) : (
              <ul className="tiles tiles--big">{it.tiles.map(([k, v]) => <li key={k}><small>{k}</small><b>{v}</b></li>)}</ul>
            )}
          </figure>

          <div className="brief">
            <h2>{it.title}</h2>
            <p>{it.summary}</p>
            <dl className="facts">{it.facts.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
            <ul className="chips">{it.tools.map((t) => <li key={t}>{t}</li>)}</ul>
            <PdfButtons file={it.pdf.src} name={`${it.title} report`} label="PDF" />
            {it.extra?.map((e) => <PdfButtons key={e.src} file={e.src} name={`${it.title} ${e.label}`} label={e.label} quiet />)}
          </div>
        </div>

        <div className="more">
          <h3>More on {it.tab.toLowerCase()}</h3>
          <div className={`more__grid ${it.images ? '' : 'more__grid--one'}`}>
            {it.images && <Carousel key={id} slides={it.images} />}
            <div className="more__side">
              {it.table && <Compare t={it.table} />}
              {it.notes && <ul className="notes">{it.notes.map((n) => <li key={n}>{n}</li>)}</ul>}
            </div>
          </div>
          {it.tiles && it.schematics.length > 0 && (
            <>
              <h4>{it.tilesTitle}</h4>
              <ul className="tiles tiles--row">{it.tiles.map(([k, v]) => <li key={k}><small>{k}</small><b>{v}</b></li>)}</ul>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

function Projects({ go }) {
  return (
    <>
      <Intro title="Projects" mode="settle">
        <p>Two mini projects where the lab blocks come together: mirrors, differential pairs and feedback become a complete two-stage OTA and a fully differential folded-cascode with CMFB.</p>
        <p>Both were supervised by Dr. Hesham Omran and follow one flow: derive specs, read design points from gm/ID charts, size every transistor, verify in Virtuoso.</p>
        <div className="intro__btns">
          <button className="btn btn--solid" onClick={() => go('labs')}>Next: Labs</button>
        </div>
      </Intro>
      <Showcase items={PROJECTS} />
    </>
  );
}

function Challenges({ go }) {
  return (
    <>
      <Intro title="Design challenges" mode="bgr">
        <p>Projects came with a spec sheet and a method. Challenges add harder conditions: a rail-to-rail op-amp across process corners, a bandgap across temperature, and a noise problem worked by hand.</p>
        <div className="intro__btns">
          <button className="btn" onClick={() => go('labs')}>Back to Labs</button>
        </div>
      </Intro>
      <Showcase items={CHALLENGES} />
    </>
  );
}

/* ====================== APP ===================== */

const PAGES = [
  { id: 'projects', label: 'Projects' },
  { id: 'labs', label: 'Labs' },
  { id: 'challenges', label: 'Design Challenges' },
];

export default function App() {
  // Navigation is plain React state: no hash, no pushState, so the browser
  // history never fills up with "#" steps.
  const [page, setPage] = useState('projects');
  const [ping, setPing] = useState(0);

  useEffect(() => {
    if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual';
    if (window.location.hash) window.history.replaceState(null, '', window.location.pathname + window.location.search);
    // Safety net: any stray href="#..." is neutralised instead of adding a history entry.
    const stop = (e) => {
      const a = e.target.closest?.('a[href^="#"]');
      if (a) e.preventDefault();
    };
    document.addEventListener('click', stop);
    return () => document.removeEventListener('click', stop);
  }, []);

  useEffect(() => { window.scrollTo(0, 0); }, [page]);

  useEffect(() => {
    const on = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      document.documentElement.style.setProperty('--p', max > 0 ? window.scrollY / max : 0);
    };
    on();
    window.addEventListener('scroll', on, { passive: true });
    window.addEventListener('resize', on);
    return () => { window.removeEventListener('scroll', on); window.removeEventListener('resize', on); };
  }, [page]);

  return (
    <OverlayProvider>
      <div className="progress" aria-hidden="true" />
      <nav className="nav">
        <div className="nav__in">
          <button className="brand" onClick={() => setPing((n) => n + 1)} aria-label="Signal logo">
            <svg viewBox="0 0 40 24" width="34" height="20" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinejoin="round">
              <path key={ping} className={ping ? 'brand__wave' : ''} pathLength="1" d="M1 12 Q6 -2 11 12 T21 12 T31 12 L39 12" />
            </svg>
            <span><b>CMOS Analog IC</b><small>ITI summer training</small></span>
          </button>
          <Tabs variant="nav" label="Pages" items={PAGES} value={page} onChange={setPage} />
          <div className="nav__contact"><Contact size={30} /></div>
        </div>
      </nav>

      <main key={page}>
        {page === 'labs' && <Labs go={setPage} />}
        {page === 'projects' && <Projects go={setPage} />}
        {page === 'challenges' && <Challenges go={setPage} />}
      </main>

      <About />
    </OverlayProvider>
  );
}