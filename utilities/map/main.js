const puppeteer = require("puppeteer")

// Loop some number of times
for (i = 0; i < 1; i++) {
  (async () => {
    // Pick random location coordinates
    const latitude = Math.random() * 180 - 90
    const longitude = Math.random() * 360 - 180

    // Launch puppeteer
    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    // Resize and grab screenshot
    await page.setViewport({ width: 512, height: 512 })
    await page.goto("http://localhost:8000/#8/" + latitude + "/" + longitude)
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
  
    console.log("Latitude: ", latitude)
    console.log("Longitude: ", longitude)
    console.log("Dimensions:", dimensions)
  
    await browser.close()
  })()
}
