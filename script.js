const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
  if (w < 2 * r) r = w / 2;
  if (h < 2 * r) r = h / 2;
  this.beginPath();
  this.moveTo(x + r, y);
  this.arcTo(x + w, y, x + w, y + h, r);
  this.arcTo(x + w, y + h, x, y + h, r);
  this.arcTo(x, y + h, x, y, r);
  this.arcTo(x, y, x + w, y, r);
  this.closePath();
  return this;
}
function drawArrow(ctx, fromx, fromy, tox, toy, arrowWidth, color) {
  var headlen = 10;
  var angle = Math.atan2(toy - fromy, tox - fromx);
  ctx.save();
  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.moveTo(fromx, fromy);
  ctx.lineTo(tox, toy);
  ctx.lineWidth = arrowWidth;
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(tox, toy);
  ctx.lineTo(tox - headlen * Math.cos(angle - Math.PI / 7),
    toy - headlen * Math.sin(angle - Math.PI / 7));
  ctx.lineTo(tox - headlen * Math.cos(angle + Math.PI / 7),
    toy - headlen * Math.sin(angle + Math.PI / 7));
  ctx.lineTo(tox, toy);
  ctx.lineTo(tox - headlen * Math.cos(angle - Math.PI / 7),
    toy - headlen * Math.sin(angle - Math.PI / 7));
  ctx.stroke();
  ctx.restore();
}

function drawLine(x, y, x1, y1, lineWidth = 1) {
  ctx.moveTo(x, y);
  ctx.lineWidth = lineWidth;
  ctx.lineTo(x1, y1);
  ctx.stroke();
}

function drawRect(x, y, x1, y1, lineWidth = 1, radius = 0) {
  ctx.moveTo(x, y);
  ctx.lineWidth = lineWidth;
  ctx.roundRect(x, y, x1, y1, radius).stroke();
}

async function newRow(c, r, x, w, j, size, lineWidth = 1) {
  for (let i = x; i < w; i += size[1]) {
    c++;
    if (c != 3 && c != 8) {
      await drawRect(i, j, size[1], size[0], lineWidth, 2);
      await fetch("list.json").then(res => res.json()).then(data => {
        ctx.textAlign = "center";
        ctx.font = "16px Arial";
        ctx.fillText(data[r][c - 1], i + size[1] / 2, j + size[0] / 2);
      });
    }
    else
      i -= size[1] / 2;
  }
}

async function build(x, y, x1, y1, lineWidth = 1) {
  var w = window.innerWidth - 20;
  var h = window.innerHeight - 29;
  let size = [h / 6, w / 9];
  let c = 0;
  let j = y;
  let r = 0;

  await newRow(c, r, x, w, j, size, lineWidth);
  c = 0; r++; j += size[0];
  await newRow(c, r, x, w, j, size, lineWidth);
  c = 0; r++; j += size[0];
  await newRow(c, r, x, w, j, size, lineWidth);
  c = 0; r++; j += size[0];
  await newRow(c, r, x, w, j, size, lineWidth);
  c = 0; r++; j += size[0];
  await newRow(c, r, x, w, j, size, lineWidth);
  c = 0; r++; j += size[0];

  ctx.font = "16px Arial"
  ctx.fillStyle = "black";
  await ctx.fillText("CỬA LỚP", 45, j + 40);
  await drawArrow(ctx, 0, j + 47, 100, j + 47, 10, 'red');
  drawRect(w - 200, j + 47, w - 100, j + 57);
  ctx.font = "34px Arial";
  ctx.textAlign = 'center';
  ctx.fillText("BÀN GV", w - 85, j + 90);
}

async function start() {
  build(0, 0, 200, 200, 2);
  // document.getElementById('btn').style.display = 'none';
  document.getElementById('canvas').style.display = 'block';
}
