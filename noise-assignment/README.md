<h1 align="center">🔊 Noise Assignment</h1>

<p align="center">
  <b>Johns &amp; Martin, Example 9.10 (Section 9.4.1)</b><br>
  Hand analysis of the total output noise of a low-pass filter around an op-amp.
</p>

<p align="center">
  <a href="noise-assignment.pdf">📄 Open the report (PDF)</a>
</p>

---

## 🧮 The circuit

A 10 kHz low-pass filter built around an op-amp:

<table align="center">
  <thead>
    <tr>
      <th align="center">C<sub>f</sub></th>
      <th align="center">R<sub>f</sub></th>
      <th align="center">R<sub>1</sub></th>
      <th align="center">R<sub>2</sub></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td align="center">160 pF</td>
      <td align="center">100 kΩ</td>
      <td align="center">10 kΩ</td>
      <td align="center">9.1 kΩ</td>
    </tr>
  </tbody>
</table>

The op-amp voltage noise, both noise currents, and the resistor thermal noise are combined by superposition, and each part is shaped by its own transfer function.

---

## 📊 Results

<table align="center">
  <thead>
    <tr>
      <th align="center">Result</th>
      <th align="center">Value</th>
    </tr>
  </thead>
  <tbody>
    <tr><td align="center">Noise from the inverting-terminal sources</td><td align="center">18.5 µV<sub>rms</sub></td></tr>
    <tr><td align="center">Noise from the non-inverting-terminal sources</td><td align="center">74.6 µV<sub>rms</sub></td></tr>
    <tr><td align="center"><b>Total output noise</b></td><td align="center"><b>76.86 µV<sub>rms</sub></b></td></tr>
    <tr><td align="center"><b>SNR</b> for a 100 mV<sub>rms</sub> input (1 V<sub>rms</sub> output)</td><td align="center"><b>82.3 dB</b></td></tr>
  </tbody>
</table>

---

[⬅️ Back to the main README](../README.md)
