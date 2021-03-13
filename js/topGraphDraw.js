function plotSinc(ctx, xOffset, step, amp, scale) {
    var width = ctx.canvas.width;
    var height = ctx.canvas.height;

    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "rgb(124,0,31)";

    var x = 0.1*scale;
    var y = 0;
    var freq_sinc = 0.08;
    var freq_amp  = 0.03;
    var amplitude = amp*Math.sin(freq_amp*step);
    while (x < width) {
        y = height/2 + amplitude*Math.sin(freq_sinc*(x - (width/2 + xOffset)))/(freq_sinc*(x - (width/2 + xOffset)));
        ctx.lineTo(x, y);
        x+=scale;
    }
    ctx.stroke();
    ctx.save();
}

function fitToContainer(canvas, scale){
    // Make it visually fill the positioned parent
    canvas.style.width ='100%';
    canvas.style.height='100%';
    // ...then set the internal size to match
    canvas.width  = canvas.offsetWidth*scale;
    canvas.height = canvas.offsetHeight*scale;
  }

function draw() {
    var canvas = document.getElementById("topGraph");
    var context = canvas.getContext("2d");
    var scale = 2;
    fitToContainer(canvas, scale);

    canvas.onclick = function (e) {
        // e is the mouse click event
        var rect = e.target.getBoundingClientRect();
        var x = (e.clientX - rect.left - canvas.width/4)*scale; //x position within the element relative to centre.
        mousePosition.x = x;
        amp = 50;
    }

    //Default State with just axes to restore to
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.save();            
    
    //Restore to empty axes after current sine iteration
    plotSinc(context, mousePosition.x, step, amp, scale);
    context.restore();
    
    //TODO: make this logic less horrible...
    step += 1;
    amp-=0.05;
    if(amp<0){
        amp=0;
    }
    window.requestAnimationFrame(draw);
}

function initDraw() {
    window.requestAnimationFrame(function() {
        draw();
    });
    draw();
}
var mousePosition = {x: 0, y:0};
var step = 0;
var amp = 50;
initDraw();