const puppeteer = require("puppeteer")

;(async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  await page.goto("http://localhost:8000/#8/40.5853/-105.0844")
  await page.waitFor(3000)
  await page.keyboard.press("h")
  await page.waitFor(3000)
  await page.screenshot({ path: "example.png" })

  const dimensions = await page.evaluate(() => {
    return {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
      deviceScaleFactor: window.devicePixelRatio
    }
  })

  console.log("Dimensions:", dimensions)

  await browser.close()
})()
