const fs = require('fs');
const puppeteer = require("puppeteer");

(async () => {
  const meta = [];

  // Loop some number of times
  for (i = 0; i < 1000; i++) {
  
    // Pick random location coordinates ([-90:90], [-180:180])
    const latitude = Math.random() * 180 - 90
    const longitude = Math.random() * 360 - 180
    const url = "http://localhost:8000/#8/" + latitude + "/" + longitude

    // Launch puppeteer
    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    // Resize screen
    await page.setViewport({ width: 512, height: 512 })
    
    // Go to local heightmapper server
    await page.goto(url)
    
    // Wait to let tiles load
    await page.waitForFunction("window.tilesLoaded == true")

    // Wait 2 seconds to assure assets loaded
    await page.waitFor(2000)

    // Get scale factor, max and min elevation
    maxElevation = await page.evaluate('Number(gui.u_max)')
    minElevation = await page.evaluate('Number(gui.u_min)')
    scaleFactor = await page.evaluate('Number(gui.scaleFactor)')    

    // Hide UI
    await page.keyboard.press("h")
    await page.waitFor(1000)

    if (maxElevation == 10 && minElevation == 0) {
      console.log("Point is over ocean. Not saving.")
    }
    else {
      // Screenshot and save
      await page.screenshot({ path: "data/" + i + ".png" })

      // Log Results
      result = {
        "file": i + ".png",
        "url": url,
        "lat": latitude,
        "lon": longitude,
        "max": maxElevation,
        "min": minElevation,
        "sf": scaleFactor
      }

      console.log(result)

      meta.push(result)
    }
  
    await browser.close()
  }
  
  // Write meta info for each file
  fs.writeFile('data/meta.json', JSON.stringify(meta), err => {
    if (err) {
      throw(err)
    }
  })
})()