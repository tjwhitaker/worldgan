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

    // Resize screen
    await page.setViewport({ width: 512, height: 512 })
    
    // Go to local heightmapper server
    await page.goto("http://localhost:8000/#8/" + latitude + "/" + longitude)
    
    // Wait to let page load
    await page.waitForFunction("window.tilesLoaded == true")

    // Get scale factor, max and min elevation
    maxElevation = await page.evaluate('gui.u_max')
    minElevation = await page.evaluate('gui.u_min')
    scaleFactor = await page.evaluate('gui.scaleFactor')    

    // Hide UI
    await page.keyboard.press("h")
    await page.waitFor(1000)

    // S
    await page.screenshot({ path: "example.png" })
  
    const dimensions = await page.evaluate(() => {
      return {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight,
        deviceScaleFactor: window.devicePixelRatio
      }
    })
  
    console.log("Url: ", "http://localhost:8000/#8/" + latitude + "/" + longitude)
    console.log("Latitude: ", latitude)
    console.log("Longitude: ", longitude)
    console.log("max: ", maxElevation)
    console.log("min: ", minElevation)
    console.log("scale factor: ", scaleFactor)
    console.log("Dimensions:", dimensions)
  
    await browser.close()
  })()
}
