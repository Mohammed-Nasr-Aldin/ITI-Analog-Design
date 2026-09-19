![Signal Animation](signal-animation/signal-banner.svg)

# ITI CMOS Analog IC Design Portfolio

A comprehensive, professional engineering portfolio showcasing advanced analog and mixed-signal integrated circuit design work completed at the **Information Technology Institute (ITI)**. This repository houses complete laboratory assignments, design challenges, full-custom OTA projects, and Monte Carlo/noise analyses implemented across advanced technology nodes (**180nm** and **65nm** CMOS processes).

---

## 🛠️ Technology Stack & Toolchain

* **Design & Layout**: Cadence Virtuoso, Xschem
* **Simulation Engine**: NGspice, Spectre Netlists
* **Sizing Methodology**: ADT (Analog Designer's Toolbox) for $g_m/I_D$ design optimization
* **Visualization**: SPICE station (graphical waveform extraction)
* **Design References**: 
  * *Design of Analog CMOS Integrated Circuits* — Behzad Razavi
  * *Analog Integrated Circuit Design* — Johns & Martin
  * *Microelectronic Circuits* — Sedra & Smith

---

## 📁 Repository Directory Structure

```text
├── certificate/              # Official ITI training completion certificates
├── design-challenges/        # Advanced analog blocks and verification reports
│   ├── BGR/                  # Bandgap Reference designs & Vref characterization
│   └── op-amp/               # Operational amplifier design challenges & papers
├── ITI-Labs/                 # Core structured lab work (Lab 00 to Lab 10)
│   └── lab05-monte-carlo/    # Statistical mismatch & Monte Carlo histograms
├── logos/                    # Institutional and toolchain badges
├── noise-assignment/         # Thermal, flicker noise, and spectral density studies
├── projects/                 # Full custom capstone silicon design projects
│   ├── project1/             # Lab 09: Two-Stage Miller OTA (180nm)
│   └── project2/             # Lab 11: Fully-Differential Folded Cascode OTA (GF180MCU)
└── signal-animation/         # Dynamic SVG simulation and signal processing banners
```

## 🔬 Core Projects & Lab Highlights

### 1. Project 1: Two-Stage Miller OTA (Lab 09)
* **Technology**: 180nm CMOS ($1.8V$ Supply)
* **Topology**: Two-stage operational transconductance amplifier with Miller frequency compensation and an NMOS voltage-controlled zero-nulling resistor.
* **Key Achievements**: Slew rate optimization, phase margin adjustments, small-signal AC response, noise corner extractions, and closed-loop buffer/integrator verification.

### 2. Project 2: Fully-Differential Folded Cascode OTA (Lab 11)
* **Technology**: 180nm CMOS (`GF180MCU`, $2.5V$ Supply)
* **Topology**: Fully differential folded cascode architecture featuring a complete **Common-Mode Feedback (CMFB)** network (both behavioral and actual transistor-level implementations).
* **Key Achievements**: Achieving $<1\%$ settling time ($\approx 96.45\,ns$), maximized differential output swing ($1.2\,V_{pk-pk}$), and robust phase margin tuning across process corners (TT, FF, SS, FS, SF).

### 3. ITI Core Labs (`Lab 00` - `Lab 10`)
* **Passive & Active Networks**: RLC resonance matching, single-stage amplifiers (Common-Source, Cascode, Common-Drain / Source Follower).
* **Current Mirrors**: Simple, cascode, and low-voltage wide-swing current mirrors with comprehensive Monte Carlo mismatch evaluations.
* **Differential Amplifiers**: CMRR optimization, common-mode input range (CMIR) boundaries, and large/small-signal differential behaviors.

---

## 👤 Author & Contact

**Mohammed Nasr Eldin Kamal Arafa Elsayed**  
*Electronics and Communications Engineering Student & Analog/RF IC Design Practitioner*

* **GitHub**: [Mohammed-Nasr-Aldin](https://github.com/Mohammed-Nasr-Aldin)
* **LinkedIn**: [mohammed-nasreldin](https://www.linkedin.com/in/mohammed-nasreldin)
* **WhatsApp**: [+20 115 610 8363](https://wa.me/201156108363)
* **Email**: [mohammednasrsmail@gmail.com](mailto:mohammednasrsmail@gmail.com)

---
<p align="center"><i>Built with passion for Analog IC Design and Silicon Engineering.</i></p>
