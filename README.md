<p align="center">
  <img src="signal-animation/signal-banner.svg" alt="Animated signal banner: a scan line sweeps across a noisy raw signal and turns it into a clean output" width="100%">
</p>

<h1 align="center">CMOS Analog IC Design · ITI</h1>

<p align="center">
  <b>Labs · Mini projects · Design challenges · Reports · Papers</b><br>
  My complete work from the Analog IC Design (CMOS Technology) summer training at the Information Technology Institute (ITI).
</p>

<p align="center">
  <img alt="Technology" src="https://img.shields.io/badge/Technology-GF180%20%7C%2065nm-2A55E5?style=flat-square">
  <img alt="Simulation" src="https://img.shields.io/badge/Simulation-Cadence%20Virtuoso%20%7C%20xschem%20%7C%20ngspice-2A55E5?style=flat-square">
  <img alt="Sizing" src="https://img.shields.io/badge/Sizing-ADT-2A55E5?style=flat-square">
  <img alt="Method" src="https://img.shields.io/badge/Method-gm%2FID-2A55E5?style=flat-square">
  <img alt="Program" src="https://img.shields.io/badge/Program-ITI%20Summer%20Training-C8102E?style=flat-square">
</p>

<p align="center"><sub><i>Left of the scan line is the cleaned output, right of it is the raw input. That is the whole job of an analog designer: keep the signal, fight the noise, mismatch, and variation. <a href="signal-animation/">How the banner works</a>.</i></sub></p>

---

## Table of contents

1. [Overview](#overview)
2. [Repository structure](#repository-structure)
3. [Course plan](#course-plan)
4. [Labs](#labs)
5. [Mini projects](#mini-projects)
6. [Design challenges](#design-challenges)
7. [Noise assignment](#noise-assignment)
8. [Design methodology](#design-methodology)
9. [Tools and technologies](#tools-and-technologies)
10. [References](#references)
11. [Certificate](#certificate)
12. [Acknowledgments](#acknowledgments)
13. [Contact](#contact)

---

## Overview

This repository is my complete record of the **Analog IC Design (CMOS Technology)** track at ITI: a 15-day program with **3 hours of lectures and 3 hours of lab every day**. It goes from an RC circuit and MOSFET characteristics all the way to a fully differential folded-cascode OTA with common-mode feedback.

What is inside:

- **11 labs** (Lab 00 to Lab 10), each written up as a PDF report with hand calculations compared against simulation.
- **2 mini projects** (Lab 09 and Lab 11): a two-stage Miller OTA and a fully differential folded-cascode OTA.
- **2 design challenges**: a full-custom rail-to-rail op-amp in 65 nm and a bandgap reference (BGR).
- **1 noise assignment** (Johns & Martin, Example 9.10).
- **2 papers** used as design references, plus screenshots, Monte Carlo data, and the certificate.

The content was built from several sources: **Razavi**, **Johns & Martin**, **Sedra & Smith**, the course lectures, and the papers listed in [References](#references).

> **How every report is organized:** specs, then hand analysis and sizing (gm/ID with ADT), then simulation, then a table comparing the two with the error, then comments explaining the difference.

[Back to top](#readme)

---

## Repository structure

```text
.
├── certificate/
│   └── ITI-AIC.jpeg                      # completion certificate
│
├── ITI-Labs/                             # lab reports (Lab 09 and Lab 11 are the mini projects)
│   ├── lab00.pdf … lab08.pdf
│   ├── lab10.pdf
│   └── lab05-monte-carlo-simulation/     # histograms + raw CSV data (200 runs)
│
├── projects/
│   ├── project1/                         # = Lab 09: two-stage Miller OTA
│   │   ├── *.png                         # schematic, Ao, CMRR
│   │   └── report/
│   └── project2/                         # = Lab 11: fully differential folded-cascode OTA
│       ├── *.png                         # schematic, CMFB, Ao, Vod
│       ├── paper/                        # folded_current_split.pdf
│       └── report/
│
├── design-challenges/
│   ├── op-amp/                           # full-custom rail-to-rail op-amp (65 nm)
│   │   ├── *.png
│   │   ├── paper/                        # hogervorst1994.pdf
│   │   └── report/
│   └── BGR/                              # bandgap reference
│       ├── *.png
│       └── report/
│
├── noise-assignment/
│   └── noise-assignment.pdf              # Johns & Martin, Ex. 9.10
│
├── signal-animation/
│   ├── README.md
│   └── signal-banner.svg                 # the banner at the top of this page
│
└── logos/                                # ADT, Cadence, ITI
```

| Folder | What you will find |
| --- | --- |
| [`ITI-Labs/`](ITI-Labs/) | Lab reports 00 to 08 and 10, plus the Lab 05 Monte Carlo results |
| [`projects/`](projects/) | The two mini projects with reports, figures, and the paper for Project 2 |
| [`design-challenges/`](design-challenges/) | The op-amp and BGR challenges with reports, figures, and the op-amp paper |
| [`noise-assignment/`](noise-assignment/) | Hand noise analysis of a low-pass filter around an op-amp |
| [`signal-animation/`](signal-animation/) | The animated SVG banner |
| [`certificate/`](certificate/) | ITI completion certificate |

[Back to top](#readme)

---

## Course plan

<details>
<summary><b>Show the 15-day plan (lectures and labs)</b></summary>

<br>

| Day | Lectures (3 h) | Lab (3 h) |
| :-: | --- | --- |
| 1 | L01 Introduction<br>L02 Circuits and systems review<br>L03 Semiconductors review | **Lab 01 (Part 1):** Basic simulations of RC circuit. Transient, AC, pole-zero, parametric sweeps, calculator and expressions |
| 2 | L04 MOSFET large signal model<br>L05 MOSFET small signal model | **Lab 01 (Part 2):** MOSFET long channel and short channel characteristics. DC sweeps, ID-VGS, gm-VGS, ID-VDS, gm and gds in triode and saturation |
| 3 | L06 Single-stage CMOS amplifiers<br>L07 Cascode amplifiers | **Lab 02:** Common-source amplifier. Design charts, OP simulation, gain non-linearity, maximum attainable gain, gain linearization |
| 4 | L08 Frequency response (1)<br>L09 Frequency response (2) | **Lab 03:** Cascode amplifier. Cascode with active load, cascode with resistive load, effect of cascode on gain, BW, and GBW |
| 5 | L10 Current mirrors | **Lab 04:** Frequency response of CD buffer. Complex poles, frequency-domain peaking, time-domain ringing, inductive rise |
| 6 | L11 Differential amplifier | **Lab 05:** Current mirrors. Simple, cascode, wide-swing (low-compliance) |
| 7 | L12 Five-transistor OTA<br>L13 Gm/ID design methodology | **Lab 06:** Differential amplifier. Differential gain, common-mode gain, CMRR, common-mode input range, large signal operation |
| 8 | L14 OTA design example | **Lab 07 (days 8 and 9):** OTA design. Gm/ID design charts, design procedure of five-transistor OTA, open-loop and closed-loop simulation |
| 9 | L15 Negative feedback | *Lab 07 continues* |
| 10 | L16 OTA stability and compensation | **Lab 08:** Negative feedback. Behavioral modeling, hierarchy editor, effect of feedback on gain/BW/GBW, open-loop gain, closed-loop gain, loop gain, gain desensitization |
| 11 | L17 Noise (1)<br>L18 Noise (2) | **Lab 09 = Mini Project 01 (days 11 and 12):** Two-stage Miller OTA. Design procedure, frequency compensation, RHP zero, verification |
| 12 | L19 OTA topologies | *Lab 09 continues* |
| 13 | L20 Common-mode feedback (CMFB) | **Lab 10:** Noise simulation. AC noise, transient noise, noise in five-transistor OTA |
| 14 | L21 Slew rate and PSRR<br>L22 Variability and mismatch | **Lab 11 = Mini Project 02 (days 14 and 15):** Fully differential folded-cascode OTA. Capacitive feedback, behavioral and actual CMFB network |
| 15 | L23 Biasing and references | *Lab 11 continues* |

</details>

[Back to top](#readme)

---

## Labs

All lab reports use **180 nm CMOS (GF180) with VDD = 1.8 V** and sizing based on **ADT**. Every report ends with an analytical-versus-simulation comparison.

| Lab | Topic | What was done and key results | Report |
| :-: | --- | --- | :-: |
| 00 | **RLC circuits** | Parallel and series RLC: impedance, resonance, Q, bandwidth, R sweeps, step-response damping. `f0` = 5.03 GHz analytical vs 5.018 GHz simulated. Q = 31.6 analytical vs 30.1 (parallel) and 30.8 (series) simulated | [PDF](ITI-Labs/lab00.pdf) |
| 01 | **LPF and MOSFET characteristics** | *Part 1:* RC low-pass filter (τ = 0.5 ns): rise time 1.104 ns vs 1.1 ns, f<sub>-3dB</sub> 317.6 MHz vs 318.3 MHz, pole-zero. *Part 2:* long channel (30 µm / 2 µm) vs short channel (3 µm / 200 nm): ID-VGS, gm-VGS, ID-VDS, velocity saturation, channel-length modulation. NMOS/PMOS current ratio 3.85 (long) vs 2.48 (short) | [PDF](ITI-Labs/lab01.pdf) |
| 02 | **Common-source amplifier** | Sizing chart for Av = −8 at 100 µA: W = 34.5 µm, L = 2 µm, R<sub>D</sub> = 9 kΩ, V<sub>GS</sub> = 617 mV. Simulated gain −7.68. Gain non-linearity and linearization with feedback (linear input range 0.208 V vs 0.21 V analytical). PMOS load cuts the gm swing from 12 µS to 0.4 µS | [PDF](ITI-Labs/lab02.pdf) |
| 03 | **Cascode amplifier** | Sizing for gm·ro = 80 at 50 µA (L = 350 nm, W = 3.57 µm). *Cascode for gain:* 2111 (66.5 dB) vs 72 for CS, at the cost of BW (35.9 kHz vs 1.09 MHz) with nearly equal GBW. *Cascode for BW:* Miller reduction gives 3 MHz vs 1.69 MHz and GBW 25.1 vs 13.2 MHz | [PDF](ITI-Labs/lab03.pdf) |
| 04 | **Common-drain (CD) buffer** | ADT sizing (ID = 10 µA, gm/ID = 10, L = 1 µm, W = 19.36 µm). Q ≈ 2.3 gives 49.6 % overshoot and an inductive rise in Z<sub>out</sub>. Fixed with a load capacitor and then a compensation network (C1, R2, C2 from Johns & Martin, Section 4.4): no ringing, no overshoot | [PDF](ITI-Labs/lab04.pdf) |
| 05 | **Current mirrors** | ADT sizing for mismatch < 2 % and λ < 0.1 V⁻¹ (V\* = 150 mV, L = 1.42 µm, W = 14.6 µm, m = 2). R<sub>out</sub>: 1.585 MΩ (simple) vs 216 MΩ (wide-swing). Compliance ≈ 0.15 V vs 0.25 V. Mismatch-induced ΔI<sub>out</sub>: 2.27 % / 2.24 % / 0.016 % (simple / wide-swing / cascode). **200-run Monte Carlo:** 1.93 % vs 1.87 % | [PDF](ITI-Labs/lab05.pdf) |
| 06 | **Differential amplifier** | PMOS input pair, I<sub>SS</sub> = 40 µA, R<sub>D</sub> = 30 kΩ. A<sub>vd</sub> = 7.81 vs 8 hand, BW = 5.7 MHz, \|A<sub>vcm</sub>\| = 0.039. CMIR 1.19 V with a simple mirror and 1.14 V with a wide-swing mirror, which also gives better low-frequency CMRR | [PDF](ITI-Labs/lab06.pdf) |
| 07 | **Five-transistor OTA** | NMOS input pair, gm/ID sizing, minimum area from an Area × I<sub>D</sub> plot. A<sub>vd</sub> = 34.25 dB, CMRR = 74.2 dB, GBW = 5 MHz at 5 pF, CMIR 0.64 V, 35.25 µA, 11.8 µm², loop-gain phase margin 89° | [PDF](ITI-Labs/lab07.pdf) |
| 08 | **Negative feedback** | Behavioral vs real OTA with C<sub>IN</sub> = 4 pF and 12 pF: closed-loop gain 5.68 dB and 11.37 dB (6 and 12 dB by hand), BW 2.65 MHz and 1.37 MHz, constant GBW ≈ 5.1 MHz. The real OTA is slower because of parasitics. Over temperature the closed-loop gain moves 0.73 % while the loop gain moves 16.6 % (gain desensitization) | [PDF](ITI-Labs/lab08.pdf) |
| 09 | **Mini Project 01** | Two-stage Miller OTA | [See Project 1](#project-1--two-stage-miller-ota-lab-09) |
| 10 | **Noise simulation** | RC low-pass: 4.07 nV/√Hz and 64.3 µV<sub>rms</sub> (kT/C), transient noise 63.5 µV<sub>rms</sub>. Five-transistor OTA: 15.15 nV/√Hz vs 14.83 hand, thermal rms 42.55 µV, flicker corner ≈ 1.65 MHz, transient noise 61 µV<sub>rms</sub> | [PDF](ITI-Labs/lab10.pdf) |
| 11 | **Mini Project 02** | Fully differential folded-cascode OTA | [See Project 2](#project-2--fully-differential-folded-cascode-ota-lab-11) |

### Lab 05 · Monte Carlo results

Simple current mirror versus wide-swing current mirror, 200 runs each. Raw data: [`simpleCM-monteCarlo-data.csv`](ITI-Labs/lab05-monte-carlo-simulation/simpleCM-monteCarlo-data.csv) and [`wideSwingCM-monteCarlo-data.csv`](ITI-Labs/lab05-monte-carlo-simulation/wideSwingCM-monteCarlo-data.csv).

<table>
  <tr>
    <td align="center"><img src="ITI-Labs/lab05-monte-carlo-simulation/simpleCM-histo.png" alt="Simple current mirror Monte Carlo histogram" width="400"><br><sub>Simple CM: 1.93 % error</sub></td>
    <td align="center"><img src="ITI-Labs/lab05-monte-carlo-simulation/wideSwingCM-histo.png" alt="Wide-swing current mirror Monte Carlo histogram" width="400"><br><sub>Wide-swing CM: 1.87 % error</sub></td>
  </tr>
</table>

[Back to top](#readme)

---

## Mini projects

Both projects were supervised by **Dr. Hesham Omran** and follow the same flow: derive specs, extract design points from gm/ID charts (ADT), size every transistor, then verify in Cadence Virtuoso.

### Project 1 · Two-stage Miller OTA (Lab 09)

**Report:** [`two-stag-millier-OTA.pdf`](projects/project1/report/two-stag-millier-OTA.pdf)

| Item | Value |
| --- | --- |
| Technology | 180 nm (GF180), single 1.8 V supply, 10 µA reference current |
| Topology | PMOS input pair, NMOS active load, NMOS second stage, NMOS voltage-controlled zero-nulling resistor |
| Load | 5 pF |
| Targets | Static gain error ≤ 0.05 % (A<sub>ol</sub> ≥ 66 dB), CMRR ≥ 74 dB, SR = 5 V/µs, rise time ≤ 70 ns, output swing 0.2 V to 1.6 V, current < 60 µA, and a phase-margin requirement |

**Design decisions:**

- Gain split A<sub>v1</sub> = 65 and A<sub>v2</sub> = 55, with the larger gain in stage 1 because stage-2 noise is divided by the stage-1 gain when referred to the input.
- I<sub>B1</sub> = 10 µA and I<sub>B2</sub> = 40 µA so the non-dominant pole sits at about 3.2 × the unity-gain frequency (PM ≈ 73°). Total current 50 µA and total area 33.9 µm² (from ADT).
- The zero-nulling transistor has its gate tied to VDD and its body tied to GND, which removes the need for an extra bias branch.

| Metric | Hand calculation | Simulation |
| --- | :-: | :-: |
| DC differential gain | 70.24 dB | **73.43 dB** |
| GBW | 5.97 MHz | **5.52 MHz** |
| CMRR | ≥ 74 dB | **74.3 dB** |
| Phase margin | 73° | **73.12°** |
| Slew rate, C<sub>c</sub> = 2 pF | 5 V/µs | 4.3 V/µs |
| Slew rate, C<sub>c</sub> = 1.665 pF | 6 V/µs | **5 V/µs** |
| CMIR | 0.19 V to 0.8 V | 0.1 V to 0.8 V (0.85 V by GBW) |

C<sub>c</sub> was reduced from 2 pF to **1.665 pF**, the largest value that still meets the slew-rate spec, while keeping PM > 70°.

<table>
  <tr>
    <td align="center"><img src="projects/project1/two-stage-miller.png" alt="Two-stage Miller OTA schematic" width="360"><br><sub>Two-stage Miller OTA</sub></td>
    <td align="center"><img src="projects/project1/Ao.png" alt="Open-loop gain of the two-stage Miller OTA" width="360"><br><sub>Open-loop gain (Aol)</sub></td>
    <td align="center"><img src="projects/project1/CMRR.png" alt="CMRR of the two-stage Miller OTA" width="360"><br><sub>CMRR</sub></td>
  </tr>
</table>

### Project 2 · Fully differential folded-cascode OTA (Lab 11)

**Report:** [`Fully-diff-OTA.pdf`](projects/project2/report/Fully-diff-OTA.pdf) · **Paper:** [`folded_current_split.pdf`](projects/project2/paper/folded_current_split.pdf) (H. Omran, optimum current split ratio for folded-cascode OTAs)

| Item | Value |
| --- | --- |
| Technology | GF180 MCU (180 nm), 2.5 V supply, external 10 µA reference |
| Topology | PMOS input pair, folded cascode, current split S = 1, behavioral and actual CMFB |
| Feedback | Capacitive inverting amplifier, A<sub>cl</sub> = 2 (C<sub>S</sub> = 2 pF, C<sub>F</sub> = 1 pF, β = 1/3) |
| Targets | Loop gain ≥ 60 dB, PM ≥ 70°, differential output swing 1.2 V<sub>pp</sub>, 1 % settling in 100 ns |

**Design decisions:**

- The 1 % settling requirement gives τ<sub>cl</sub> ≈ 21.7 ns, so the open-loop GBW must be ≈ 22 MHz, which sets g<sub>m1,2</sub> ≈ 170 µS.
- Input pair at L = 300 nm and gm/ID = 17 µS/µA, current sources at L = 1 µm and gm/ID = 10, cascodes at L = 0.5 µm and gm/ID = 15.
- Total active area 111.2 µm².

| Metric | Behavioral CMFB | Actual CMFB |
| --- | :-: | :-: |
| Open-loop DC gain | 77.09 dB | 75.96 dB |
| Open-loop GBW | 22.63 MHz | 22.55 MHz |
| Open-loop phase margin | 87.84° | 87.85° |

| Closed-loop result | Value |
| --- | :-: |
| Closed-loop gain | 1.999 (6.016 dB) |
| Differential loop gain / UGF / PM | 66.41 dB / 7.5 MHz / 89.33° |
| CM loop PM (first pass) | 56.4° (below target) |
| CM loop PM (after tuning CMFB input width to 0.5 µm) | **77.5°** at 69.19 dB |
| 1 % settling time | **96.45 ns** |
| Differential output swing | 1.2 V<sub>pp</sub> from a 0.6 V<sub>pp</sub> input |

<table>
  <tr>
    <td align="center"><img src="projects/project2/FD-folded.png" alt="Fully differential folded-cascode OTA" width="300"><br><sub>Folded-cascode OTA</sub></td>
    <td align="center"><img src="projects/project2/CMFB.png" alt="Common-mode feedback network" width="300"><br><sub>CMFB</sub></td>
    <td align="center"><img src="projects/project2/Ao.png" alt="Open-loop gain" width="300"><br><sub>Open-loop gain (Aol)</sub></td>
  </tr>
  <tr>
    <td align="center"><img src="projects/project2/Vod-pulse.png" alt="Differential output for a pulse input" width="300"><br><sub>V<sub>od</sub>, pulse input</sub></td>
    <td align="center"><img src="projects/project2/Vod-sin.png" alt="Differential output for a sine input" width="300"><br><sub>V<sub>od</sub>, sine input</sub></td>
    <td></td>
  </tr>
</table>

[Back to top](#readme)

---

## Design challenges

### Full-custom rail-to-rail op-amp (65 nm)

**Report:** [`op-amp.pdf`](design-challenges/op-amp/report/op-amp.pdf) · **Paper:** [`hogervorst1994.pdf`](design-challenges/op-amp/paper/hogervorst1994.pdf)

A full-custom two-stage CMOS op-amp based on the compact rail-to-rail topology of Hogervorst et al. (IEEE JSSC, 1994): complementary input pairs and a **floating class-AB output stage biased by a Monticelli-type translinear loop**, which keeps the noise and offset of the class-AB bias low without extra bias sources.

| Item | Value |
| --- | --- |
| Technology and supply | 65 nm CMOS, 2.5 V |
| Load | R<sub>L</sub> = 20 kΩ, C<sub>L</sub> = 20 pF |
| Targets | A<sub>ol</sub> > 60 dB, PM > 60°, GBW > 10 MHz |
| Verification | Process corners TT, FF, SS, FS, SF and temperature −40 °C to 125 °C |
| Sizing rules | Input pairs L = 300 nm, gm/ID = 20. Current sources L = 1 µm, gm/ID = 10. Cascodes L = 0.5 µm, gm/ID = 15. Mirror ratio m = 4 |

Two ways of biasing the cascode transistors were built and compared:

| | Shared cascode bias | Independent-branch bias |
| --- | :-: | :-: |
| Compensation C<sub>M</sub> | 1.4 pF | 0.7 pF |
| A<sub>ol</sub> (TT) | 65.78 dB | 80.64 dB |
| GBW (TT) | 10.67 MHz | 13.28 MHz |
| Phase margin (TT) | 60.39° | 64.31° |
| Area / cost | Compact (367.95 µm²) | Larger and more current |
| Across corners | Bias points more sensitive to process | Steadier, but some corners still miss the specs (for example FF PM = 54.1°, SS GBW = 5.1 MHz) |

The op-amp was also checked as an **inverting** amplifier (gain −1), a **non-inverting** amplifier (gain ×2), and an **integrator** (R<sub>F</sub> = 20 kΩ, C<sub>F</sub> = 20 pF at 200 kHz, giving the expected 90° shift and gain of about 2).

**Takeaway:** sharing one cascode mirror saves area and power, while independent branches cost more but hold up better across corners. A few corner cases landed just short of the specs, so there is still headroom in the compensation and sizing.

<table>
  <tr>
    <td align="center"><img src="design-challenges/op-amp/shared-bias-op-amp-ckt.png" alt="Op-amp with shared cascode bias" width="360"><br><sub>Shared bias circuit</sub></td>
    <td align="center"><img src="design-challenges/op-amp/ind-bias-op-amp-ckt.png" alt="Op-amp with independent cascode bias" width="360"><br><sub>Independent bias circuit</sub></td>
  </tr>
  <tr>
    <td align="center"><img src="design-challenges/op-amp/LG.png" alt="Loop gain" width="360"><br><sub>Loop gain (LG)</sub></td>
    <td align="center"><img src="design-challenges/op-amp/VOUT-VICM.png" alt="Output voltage versus input common-mode voltage" width="360"><br><sub>V<sub>OUT</sub> vs V<sub>ICM</sub></sub></td>
  </tr>
  <tr>
    <td align="center"><img src="design-challenges/op-amp/I-sin.png" alt="Current with a sine input" width="360"><br><sub>Current, sine input</sub></td>
    <td></td>
  </tr>
</table>

### Bandgap reference (BGR)

**Report:** [`BGR.pdf`](design-challenges/BGR/report/BGR.pdf)

A bandgap reference designed first with an **ideal error amplifier**, then with an **actual error amplifier** (NMOS input pair W/L = 30/20, PMOS load 80/1, tail 8.4/1.97) and a start-up circuit.

| Item | Ideal error amp | Actual error amp |
| --- | :-: | :-: |
| BJT ratio / ΔV<sub>BE</sub> | n = 24, 82.6 mV | same |
| Resistors | R2 ≈ 165 kΩ, R3 = 1194.2 kΩ, R4 ≈ 766.5 kΩ | tuned (PMOS 0.62/5.5) |
| V<sub>REF</sub> variation, −40 °C to 125 °C | **0.82 mV** | **5.8 mV** around ≈ 0.8 V |
| Phase margin | n/a | 91.35° |

<table>
  <tr>
    <td align="center"><img src="design-challenges/BGR/BGR.png" alt="Bandgap reference circuit" width="360"><br><sub>BGR</sub></td>
    <td align="center"><img src="design-challenges/BGR/Vref.png" alt="Reference voltage versus temperature" width="360"><br><sub>V<sub>REF</sub> vs temperature</sub></td>
  </tr>
</table>

[Back to top](#readme)

---

## Noise assignment

**Report:** [`noise-assignment.pdf`](noise-assignment/noise-assignment.pdf)

Hand analysis of Example 9.10 (Section 9.4.1) from Johns & Martin: the total output noise of a 10 kHz low-pass filter built around an op-amp (C<sub>f</sub> = 160 pF, R<sub>f</sub> = 100 kΩ, R<sub>1</sub> = 10 kΩ, R<sub>2</sub> = 9.1 kΩ). The op-amp voltage noise, both noise currents, and the resistor thermal noise are combined by superposition, and each part is shaped by its own transfer function.

| Result | Value |
| --- | :-: |
| Noise from the inverting-terminal sources | 18.5 µV<sub>rms</sub> |
| Noise from the non-inverting-terminal sources | 74.6 µV<sub>rms</sub> |
| **Total output noise** | **76.86 µV<sub>rms</sub>** |
| **SNR** for a 100 mV<sub>rms</sub> input (1 V<sub>rms</sub> output) | **82.3 dB** |

[Back to top](#readme)

---

## Design methodology

Every design here follows the **gm/ID methodology**, using ADT for the charts:

1. **Derive the specs** into circuit requirements (for example, static gain error gives the loop gain, and settling time gives the GBW).
2. **Pick L and gm/ID (or V\*) for each transistor by its role** instead of guessing W.
3. **Read the design point** from ADT charts (gm/g<sub>ds</sub>, I<sub>D</sub>/W, f<sub>T</sub>, V<sub>GS</sub>). These barely depend on width, so W follows from the current.
4. **Check mismatch and λ** for mirrors, then set the mirroring ratio and area.
5. **Verify in the simulator** (OP, AC, loop gain, transient, noise), compare against hand calculations, then tune.
6. **Stress it** across corners, temperature, and Monte Carlo where it matters.

Rules of thumb used throughout the reports:

| Device role | L | gm/ID | Why |
| --- | --- | --- | --- |
| Input pair | Short (about 300 nm) | High (15 to 20 µS/µA, moderate/weak inversion) | Maximizes GBW, minimizes input capacitance |
| Current sources and mirrors | Long (about 1 µm) | About 10 µS/µA (strong inversion) | Large g<sub>m</sub> does not help gain but adds offset and noise |
| Cascodes | Moderate (about 0.5 µm) | About 15 µS/µA | Large g<sub>m</sub> helps gain and does not add noise |
| Tail current source | Long | Low | Large R<sub>SS</sub> gives high CMRR |

[Back to top](#readme)

---

## Tools and technologies

<p>
  <img src="logos/ITI-logo.png" alt="ITI" height="64">
  &nbsp;&nbsp;&nbsp;
  <img src="logos/cadence-logo.png" alt="Cadence" height="64">
  &nbsp;&nbsp;&nbsp;
  <img src="logos/ADT-logo.png" alt="ADT" height="64">
</p>

| Purpose | Tool |
| --- | --- |
| Transistor sizing (gm/ID) | **ADT**, Analog Designer's Toolbox |
| Schematic capture and simulation | **Cadence Virtuoso** |
| Open-source schematic and simulation | **xschem** with **ngspice** |
| Waveform visualization (with xschem only) | **Spice Station** |

| Technology | Used for |
| --- | --- |
| **GF180 (180 nm)** | Labs, Project 1 (1.8 V) and Project 2 (2.5 V) |
| **65 nm** | Op-amp design challenge (2.5 V) |

> Capacitance values from xschem were not accurate in the CD-buffer lab, so device capacitances were taken from ADT instead.

[Back to top](#readme)

---

## References

- B. Razavi, *Design of Analog CMOS Integrated Circuits*.
- D. Johns and K. Martin, *Analog Integrated Circuit Design* (2012). Used for the CD-buffer compensation network (Section 4.4) and the noise assignment (Example 9.10, Section 9.4.1).
- A. Sedra and K. Smith, *Microelectronic Circuits*.
- R. Hogervorst, J. Tero, R. Eschauzier, and J. Huisingh, "Rail-to-Rail Input/Output Operational Amplifier for VLSI Cell Libraries," *IEEE Journal of Solid-State Circuits*, Dec. 1994. Copy in [`design-challenges/op-amp/paper/`](design-challenges/op-amp/paper/hogervorst1994.pdf).
- H. Omran, "Optimum Split Ratio for Folded Cascode OTA Bias Current: A Qualitative and Quantitative Study," *Designs*, 2019. Copy in [`projects/project2/paper/`](projects/project2/paper/folded_current_split.pdf).

[Back to top](#readme)

---

## Certificate

<p align="center">
  <img src="certificate/ITI-AIC.jpeg" alt="ITI Analog IC Design track completion certificate" width="640">
</p>

---

## Acknowledgments

Thank you to **ITI** for the training program, and to **Dr. Hesham Omran** for supervising the mini projects and for the gm/ID design methodology and the papers that shaped them.

---

## Contact

Reach out for collaborations, discussions, or opportunities.

<p>
  <a href="https://github.com/Mohammed-Nasr-Aldin"><img alt="GitHub" src="https://img.shields.io/badge/GitHub-Mohammed--Nasr--Aldin-2F363D?style=for-the-badge&logo=github&logoColor=white"></a>
  <a href="https://www.linkedin.com/in/mohammed-nasreldin"><img alt="LinkedIn" src="https://img.shields.io/badge/LinkedIn-Mohammed%20Nasreldin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white"></a>
  <a href="https://wa.me/201156108363"><img alt="WhatsApp" src="https://img.shields.io/badge/WhatsApp-%2B20%20115%20610%208363-25D366?style=for-the-badge&logo=whatsapp&logoColor=white"></a>
  <a href="mailto:mohammednasrsmail@gmail.com"><img alt="Email" src="https://img.shields.io/badge/Email-mohammednasrsmail%40gmail.com-EA4335?style=for-the-badge&logo=gmail&logoColor=white"></a>
</p>

| | |
| --- | --- |
| **GitHub** | [github.com/Mohammed-Nasr-Aldin](https://github.com/Mohammed-Nasr-Aldin) |
| **LinkedIn** | [linkedin.com/in/mohammed-nasreldin](https://www.linkedin.com/in/mohammed-nasreldin) |
| **WhatsApp** | [+20 115 610 8363](https://wa.me/201156108363) |
| **Email** | [mohammednasrsmail@gmail.com](mailto:mohammednasrsmail@gmail.com) |

<p align="center"><sub>© Mohammed Nasr Eldin · Built with passion for Analog IC Design &amp; Engineering</sub></p>
