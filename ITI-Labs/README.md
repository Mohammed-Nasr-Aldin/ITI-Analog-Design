<h1 align="center">🧪 ITI Labs</h1>

<p align="center">
  <b>Lab reports 00 to 08 and 10, plus the Lab 05 Monte Carlo results</b><br>
  180 nm CMOS (GF180), VDD = 1.8 V, sizing with ADT.
</p>

> 💡 Every report ends with an analytical-versus-simulation comparison. Lab 09 and Lab 11 are the mini projects, so they live in [`projects/`](../projects/).

<table align="center">
  <thead>
    <tr>
      <th align="center">Lab</th>
      <th align="center">Topic</th>
      <th align="center">Report</th>
    </tr>
  </thead>
  <tbody>
    <tr><td align="center">00</td><td align="center">🔁 RLC circuits</td><td align="center"><a href="lab00.pdf">📄 PDF</a></td></tr>
    <tr><td align="center">01</td><td align="center">🔬 LPF and MOSFET characteristics</td><td align="center"><a href="lab01.pdf">📄 PDF</a></td></tr>
    <tr><td align="center">02</td><td align="center">📈 Common-source amplifier</td><td align="center"><a href="lab02.pdf">📄 PDF</a></td></tr>
    <tr><td align="center">03</td><td align="center">🗼 Cascode amplifier</td><td align="center"><a href="lab03.pdf">📄 PDF</a></td></tr>
    <tr><td align="center">04</td><td align="center">🔋 Common-drain (CD) buffer</td><td align="center"><a href="lab04.pdf">📄 PDF</a></td></tr>
    <tr><td align="center">05</td><td align="center">🪞 Current mirrors</td><td align="center"><a href="lab05.pdf">📄 PDF</a></td></tr>
    <tr><td align="center">06</td><td align="center">⚖️ Differential amplifier</td><td align="center"><a href="lab06.pdf">📄 PDF</a></td></tr>
    <tr><td align="center">07</td><td align="center">5️⃣ Five-transistor OTA</td><td align="center"><a href="lab07.pdf">📄 PDF</a></td></tr>
    <tr><td align="center">08</td><td align="center">🔄 Negative feedback</td><td align="center"><a href="lab08.pdf">📄 PDF</a></td></tr>
    <tr><td align="center">09</td><td align="center">🛠️ Mini Project 01: two-stage Miller OTA</td><td align="center"><a href="../projects/">➡️ Projects</a></td></tr>
    <tr><td align="center">10</td><td align="center">🔊 Noise simulation</td><td align="center"><a href="lab10.pdf">📄 PDF</a></td></tr>
    <tr><td align="center">11</td><td align="center">🛠️ Mini Project 02: fully differential folded-cascode OTA</td><td align="center"><a href="../projects/">➡️ Projects</a></td></tr>
  </tbody>
</table>

---

## 🎲 Lab 05 · Monte Carlo simulation

Simple current mirror versus wide-swing current mirror, 200 runs each.

<table align="center">
  <tr>
    <td align="center"><img src="lab05-monte-carlo-simulation/simpleCM-histo.png" alt="Simple current mirror Monte Carlo histogram" width="400"><br><sub>Simple CM: 1.93 % error</sub></td>
    <td align="center"><img src="lab05-monte-carlo-simulation/wideSwingCM-histo.png" alt="Wide-swing current mirror Monte Carlo histogram" width="400"><br><sub>Wide-swing CM: 1.87 % error</sub></td>
  </tr>
</table>

**📊 Raw data:**
[`simpleCM-monteCarlo-data.csv`](lab05-monte-carlo-simulation/simpleCM-monteCarlo-data.csv) ·
[`wideSwingCM-monteCarlo-data.csv`](lab05-monte-carlo-simulation/wideSwingCM-monteCarlo-data.csv)

---

[⬅️ Back to the main README](../README.md)
