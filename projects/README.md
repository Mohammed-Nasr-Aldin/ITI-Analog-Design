<h1 align="center">🛠️ Mini Projects</h1>

<p align="center">
  <b>Two OTA designs, supervised by Dr. Hesham Omran</b><br>
  Derive specs, extract design points from gm/ID charts (ADT), size every transistor, then verify in Cadence Virtuoso.
</p>

<table align="center">
  <thead>
    <tr>
      <th align="center">Project</th>
      <th align="center">Lab</th>
      <th align="center">Technology</th>
      <th align="center">Report</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td align="center">1️⃣ Two-stage Miller OTA</td>
      <td align="center">Lab 09</td>
      <td align="center">GF180, 1.8 V</td>
      <td align="center"><a href="project1/report/two-stag-millier-OTA.pdf">📄 PDF</a></td>
    </tr>
    <tr>
      <td align="center">2️⃣ Fully differential folded-cascode OTA</td>
      <td align="center">Lab 11</td>
      <td align="center">GF180, 2.5 V</td>
      <td align="center"><a href="project2/report/Fully-diff-OTA.pdf">📄 PDF</a></td>
    </tr>
  </tbody>
</table>

---

## 1️⃣ Project 1 · Two-stage Miller OTA

<table align="center">
  <thead>
    <tr>
      <th align="center">Metric</th>
      <th align="center">Hand calculation</th>
      <th align="center">Simulation</th>
    </tr>
  </thead>
  <tbody>
    <tr><td align="center">DC differential gain</td><td align="center">70.24 dB</td><td align="center"><b>73.43 dB</b></td></tr>
    <tr><td align="center">GBW</td><td align="center">5.97 MHz</td><td align="center"><b>5.52 MHz</b></td></tr>
    <tr><td align="center">CMRR</td><td align="center">≥ 74 dB</td><td align="center"><b>74.3 dB</b></td></tr>
    <tr><td align="center">Phase margin</td><td align="center">73°</td><td align="center"><b>73.12°</b></td></tr>
  </tbody>
</table>

<table align="center">
  <tr>
    <td align="center"><img src="project1/two-stage-miller.png" alt="Two-stage Miller OTA schematic" width="300"><br><sub>Two-stage Miller OTA</sub></td>
    <td align="center"><img src="project1/Ao.png" alt="Open-loop gain" width="300"><br><sub>Open-loop gain (Aol)</sub></td>
    <td align="center"><img src="project1/CMRR.png" alt="CMRR" width="300"><br><sub>CMRR</sub></td>
  </tr>
</table>

---

## 2️⃣ Project 2 · Fully differential folded-cascode OTA

**📑 Paper:** [`folded_current_split.pdf`](project2/paper/folded_current_split.pdf) (H. Omran, optimum current split ratio for folded-cascode OTAs)

<table align="center">
  <thead>
    <tr>
      <th align="center">Metric</th>
      <th align="center">Behavioral CMFB</th>
      <th align="center">Actual CMFB</th>
    </tr>
  </thead>
  <tbody>
    <tr><td align="center">Open-loop DC gain</td><td align="center">77.09 dB</td><td align="center">75.96 dB</td></tr>
    <tr><td align="center">Open-loop GBW</td><td align="center">22.63 MHz</td><td align="center">22.55 MHz</td></tr>
    <tr><td align="center">Open-loop phase margin</td><td align="center">87.84°</td><td align="center">87.85°</td></tr>
  </tbody>
</table>

<table align="center">
  <tr>
    <td align="center"><img src="project2/FD-folded.png" alt="Folded-cascode OTA" width="300"><br><sub>Folded-cascode OTA</sub></td>
    <td align="center"><img src="project2/CMFB.png" alt="CMFB network" width="300"><br><sub>CMFB</sub></td>
    <td align="center"><img src="project2/Ao.png" alt="Open-loop gain" width="300"><br><sub>Open-loop gain (Aol)</sub></td>
  </tr>
</table>

---

[⬅️ Back to the main README](../README.md)
