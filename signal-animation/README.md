<p align="center">
  <img src="signal-banner.svg" alt="Animated signal banner: a scan line sweeps across a noisy raw signal and turns it into a clean output" width="100%">
</p>

<h1 align="center">📡 Signal Banner</h1>

<p align="center">
  <b>The animated banner at the top of the main README</b><br>
  A scan line sweeps across a noisy signal and leaves a clean one behind.
</p>

---

## 💡 The idea

An analog designer's job in one picture: **keep the signal, fight the noise, mismatch, and variation.**

- 🔊 **Right of the scan line:** the raw input, noisy and messy.
- ✅ **Left of the scan line:** the cleaned output, after the scan line has passed.
- 🔍 **The scan line:** the moving line that turns one into the other.

---

## 📁 Files

<table align="center">
  <thead>
    <tr>
      <th align="center">File</th>
      <th align="center">What it is</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td align="center">🖼️ <a href="signal-banner.svg"><code>signal-banner.svg</code></a></td>
      <td align="center">The animated banner</td>
    </tr>
    <tr>
      <td align="center">📄 <code>README.md</code></td>
      <td align="center">This page</td>
    </tr>
  </tbody>
</table>

---

## 🧩 How it is used

The banner is a single SVG file, embedded in the first rows of the main README like this:

```html
<p align="center">
  <img src="signal-animation/signal-banner.svg" alt="Animated signal banner" width="100%">
</p>
```

- 🎞️ GitHub plays SVG animations when the file is embedded with an `<img>` tag.
- 🚫 GitHub blocks scripts inside SVG files, so the banner relies only on built-in SVG animation.
- 📐 `width="100%"` makes it scale to the width of the page.

---

[⬅️ Back to the main README](../README.md)
