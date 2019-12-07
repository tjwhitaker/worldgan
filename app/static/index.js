const brushContent = {
  mountains: { color: "#757575" },
  hills: { color: "#1b5e20" },
  plains: { color: "#00e676" },
  rivers: { color: "#2196f3" },
  terrace: { color: "#ffe082" }
}

const brushSize = {
  small: 20,
  medium: 50,
  large: 100
}

const canvas = document.getElementById("paint")
const ctx = canvas.getContext("2d")
const mouse = { x: 0, y: 0 }

ctx.lineWidth = 100
ctx.lineJoin = "round"
ctx.lineCap = "round"
ctx.strokeStyle = "#757575"

canvas.addEventListener(
  "mousemove",
  function(e) {
    mouse.x = e.pageX - this.offsetLeft
    mouse.y = e.pageY - this.offsetTop
  },
  false
)

canvas.addEventListener(
  "mousedown",
  function(e) {
    ctx.beginPath()
    ctx.moveTo(mouse.x, mouse.y)

    canvas.addEventListener("mousemove", paint, false)
  },
  false
)

canvas.addEventListener(
  "mouseup",
  function(e) {
    canvas.removeEventListener("mousemove", paint, false)
  },
  false
)

canvas.addEventListener(
  "mouseout",
  function(e) {
    canvas.removeEventListener("mousemove", paint, false)
  },
  false
)

const paint = function() {
  ctx.lineTo(mouse.x, mouse.y)
  ctx.stroke()
}

function selectBrushContent(element, content) {
  // Remove selected class from all brush buttons
  const buttons = element.parentElement.getElementsByClassName("button")

  for (let button of buttons) {
    button.classList.remove("selected")
  }

  // Add selected class to brush button
  element.classList.add("selected")

  ctx.strokeStyle = brushContent[content]["color"]
}

function selectBrushSize(element, size) {
  const buttons = element.parentElement.getElementsByClassName("button")

  for (let button of buttons) {
    button.classList.remove("selected")
  }

  element.classList.add("selected")

  ctx.lineWidth = brushSize[size]
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
}

function exportImage() {
  const data = canvas.toDataURL("image/png")
  const w = window.open("about:blank", "image from canvas")

  w.document.write("<img src='" + data + "' />")
}

function generate() {
  const data = canvas.toDataURL("image/png");
  const image = data.replace("data:image/png;base64,", "");

  var json = JSON.stringify({'b64': image});

  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/generate', true);
  xhr.setRequestHeader('Content-Type', 'application/json');

  xhr.send(json);
}
