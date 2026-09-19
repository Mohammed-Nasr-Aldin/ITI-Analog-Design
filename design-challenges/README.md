<h1 align="center">🏆 Design Challenges</h1>

<p align="center">
  <b>A full-custom rail-to-rail op-amp and a bandgap reference</b><br>
  Both follow the gm/ID methodology, with sizing from ADT.
</p>

<table align="center">
  <thead>
    <tr>
      <th align="center">Challenge</th>
      <th align="center">Technology</th>
      <th align="center">Report</th>
      <th align="center">Paper</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td align="center">🔌 Rail-to-rail op-amp</td>
      <td align="center">65 nm, 2.5 V</td>
      <td align="center"><a href="op-amp/report/op-amp.pdf">📄 PDF</a></td>
      <td align="center"><a href="op-amp/paper/hogervorst1994.pdf">📑 Hogervorst 1994</a></td>
    </tr>
    <tr>
      <td align="center">🌡️ Bandgap reference (BGR)</td>
      <td align="center">Ideal and actual error amplifier</td>
      <td align="center"><a href="BGR/report/BGR.pdf">📄 PDF</a></td>
      <td align="center">-</td>
    </tr>
  </tbody>
</table>

---

## 🔌 Full-custom rail-to-rail op-amp

A two-stage CMOS op-amp based on the compact rail-to-rail topology of Hogervorst et al. (IEEE JSSC, 1994): complementary input pairs and a floating class-AB output stage biased by a Monticelli-type translinear loop.

<table align="center">
  <thead>
    <tr>
      <th align="center"></th>
      <th align="center">Shared cascode bias</th>
      <th align="center">Independent-branch bias</th>
    </tr>
  </thead>
  <tbody>
    <tr><td align="center">A<sub>ol</sub> (TT)</td><td align="center">65.78 dB</td><td align="center">80.64 dB</td></tr>
    <tr><td align="center">GBW (TT)</td><td align="center">10.67 MHz</td><td align="center">13.28 MHz</td></tr>
    <tr><td align="center">Phase margin (TT)</td><td align="center">60.39°</td><td align="center">64.31°</td></tr>
  </tbody>
</table>

<table align="center">
  <tr>
    <td align="center"><img src="op-amp/shared-bias-op-amp-ckt.png" alt="Op-amp with shared cascode bias" width="360"><br><sub>Shared bias circuit</sub></td>
    <td align="center"><img src="op-amp/ind-bias-op-amp-ckt.png" alt="Op-amp with independent cascode bias" width="360"><br><sub>Independent bias circuit</sub></td>
  </tr>
  <tr>
    <td align="center"><img src="op-amp/LG.png" alt="Loop gain" width="360"><br><sub>Loop gain (LG)</sub></td>
    <td align="center"><img src="op-amp/VOUT-VICM.png" alt="Output voltage versus input common-mode voltage" width="360"><br><sub>V<sub>OUT</sub> vs V<sub>ICM</sub></sub></td>
  </tr>
</table>

---

## 🌡️ Bandgap reference (BGR)

<table align="center">
  <thead>
    <tr>
      <th align="center">Item</th>
      <th align="center">Ideal error amp</th>
      <th align="center">Actual error amp</th>
    </tr>
  </thead>
  <tbody>
    <tr><td align="center">V<sub>REF</sub> variation, −40 °C to 125 °C</td><td align="center"><b>0.82 mV</b></td><td align="center"><b>5.8 mV</b></td></tr>
    <tr><td align="center">Phase margin</td><td align="center">n/a</td><td align="center">91.35°</td></tr>
  </tbody>
</table>

<table align="center">
  <tr>
    <td align="center"><img src="BGR/BGR.png" alt="Bandgap reference circuit" width="360"><br><sub>BGR</sub></td>
    <td align="center"><img src="BGR/Vref.png" alt="Reference voltage versus temperature" width="360"><br><sub>V<sub>REF</sub> vs temperature</sub></td>
  </tr>
</table>

---

[⬅️ Back to the main README](../README.md)
