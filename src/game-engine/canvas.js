function drawGameArea(fuel, speed, engine) {
  const el = document.getElementById('gamecanvas');
  const ctx = el.getContext('2d');
  const yoff = 450;
  const safex1 = 180;
  const safex2 = 350;

  //
  ctx.clearRect(0, 0, 500,500);

  // Draw mountain
  ctx.strokeStyle='#ff0000';
  ctx.beginPath();
  ctx.moveTo(0,yoff+50);
  ctx.lineTo(100,yoff-100);
  ctx.lineTo(safex1,yoff);
  ctx.lineTo(safex2,yoff);
  ctx.lineTo(450,yoff-40);
  ctx.lineTo(500,yoff-120);
  ctx.stroke();

  // Draw hud
  ctx.font = '25px Arial';
  ctx.fillStyle = '#ffffff';
  ctx.fillText('Fuel: '+fuel,10,30);
  ctx.fillText(' Spd: '+speed,10,60);
  ctx.fillText(' Eng: '+engine,10,90);
}

function drawExplosion(xpos, ypos) {
  const el = document.getElementById('gamecanvas');
  const ctx = el.getContext('2d');
  let angle=0, range=0;
  let x, y, x0, y0;

  ctx.strokeStyle='#ffff00';
  ctx.beginPath();

  for(let l1=0; l1<12; l1++) {
    angle=30*l1-15+Math.floor(Math.random() * 30);
    range=15+Math.floor(Math.random() * 30);

    x=Math.round(Math.cos(angle * Math.PI / 180) * range + xpos);
    y=Math.round(Math.sin(angle * Math.PI / 180) * range + ypos);

    if(l1==0) {
      ctx.moveTo(x,y);
      x0=x; y0=y;
    } else if(l1==11) {
      ctx.lineTo(x0,y0);
    } else {
      ctx.lineTo(x,y);
    }
  }

  ctx.stroke();
}

function drawLander(xpos,ypos, engine) {
  const el = document.getElementById('gamecanvas');
  const ctx = el.getContext('2d');

  ctx.strokeStyle='#00ff00';

  ctx.beginPath();
  ctx.ellipse(xpos,ypos,15,20, 0, 0 ,2*Math.PI);

  // Box below circle
  ctx.moveTo(xpos-15,ypos+20);
  ctx.lineTo(xpos+15,ypos+20);
  ctx.lineTo(xpos+20,ypos+35);
  ctx.lineTo(xpos-20,ypos+35);
  ctx.lineTo(xpos-15,ypos+20);

  // Support lines from box to ellipse
  ctx.moveTo(xpos-15,ypos+20);
  ctx.lineTo(xpos-10,ypos+15);
  ctx.moveTo(xpos+15,ypos+20);
  ctx.lineTo(xpos+10,ypos+15);

  // Left landing gear
  ctx.moveTo(xpos-20,ypos+35);
  ctx.lineTo(xpos-22,ypos+50);
  ctx.moveTo(xpos-26,ypos+50);
  ctx.lineTo(xpos-18,ypos+50);

  // right landing gear
  ctx.moveTo(xpos+20,ypos+35);
  ctx.lineTo(xpos+22,ypos+50);
  ctx.moveTo(xpos+26,ypos+50);
  ctx.lineTo(xpos+18,ypos+50);
  ctx.stroke();

  // Draw flame
  if(engine>0) {
    let multiplier = Math.floor(Math.random()*3)+1;

    let size=engine*(4+multiplier);
    ctx.beginPath();
    ctx.strokeStyle='#ffff00';
    ctx.ellipse(xpos,ypos+40+size,10,size, 0, 0 ,2*Math.PI);
    ctx.stroke();

    multiplier = Math.floor(Math.random()*3)+1;
    size=engine*(4+multiplier);
    ctx.beginPath();
    ctx.strokeStyle='#ff0000';
    ctx.ellipse(xpos,ypos+40+size,8,size, 0, 0 ,2*Math.PI);
    ctx.stroke();
  }
}

export default {
  drawGameArea,
  drawLander,
  drawExplosion
};