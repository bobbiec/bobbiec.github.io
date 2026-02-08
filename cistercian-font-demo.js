document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("text-input")
  const outputCistercian = document.getElementById("output-cistercian")

  // Default text showcasing Cistercian number properties
  const defaultText =
    "" +
    `Cistercian monks wrote the numerals from 1-9999 as single glyphs. 1 2 3 4 5 6 7 8 9

Each digit place has its own quadrant:
90 (tens)      9 (ones)
9000 (thousands) 900 (hundreds)

Sometimes (not always), this makes addition visual:
33 + 700 = 733
8700 + 49 = 8749
1728 + 1 = 1729 = 1000 + 729 (!!)

A few more examples:
1, 24, 214, 910, 2099, 2858, 2415, 1190, 289`

  function sync() {
    const text = input.value
    outputCistercian.textContent = text
  }

  input.value = defaultText
  sync()

  input.addEventListener("input", sync)

  // Font availability check
  if ("fonts" in document) {
    document.fonts.ready.then(() => {
      if (!document.fonts.check('1em "Cistercian"')) {
        showFontWarning()
      }
    })
  }

  function showFontWarning() {
    const warning = document.createElement("div")
    warning.style.cssText = `
      position: fixed;
      top: 1rem;
      right: 1rem;
      background: #f59e0b;
      color: #fff;
      padding: 0.75rem 1.25rem;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      z-index: 1000;
      max-width: 320px;
      font-size: 0.9rem;
      line-height: 1.4;
    `
    warning.innerHTML =
      "<strong>⚠️ Font not loaded</strong><br>" +
      "The Cistercian font files were not found. Run the build first."
    document.body.appendChild(warning)

    setTimeout(() => {
      warning.style.transition = "opacity 0.5s"
      warning.style.opacity = "0"
      setTimeout(() => warning.remove(), 500)
    }, 8000)
  }
})
