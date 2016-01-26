requirejs(["https://code.jquery.com/jquery-2.1.4.min.js"], function($){
  $(function(){
    var canvas = document.getElementById('gol'),
        context = canvas.getContext('2d');

    context.strokeStyle = "black";
    context.fillStyle = "white";

    function drawGrid(ctx)
    {
      function setLine(from, to)
      {
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
      }

      function draw()
      {
        ctx.stroke();
      }

      for(var i = 0; i <= 500; i += 10)
        setLine({x: i, y: 0}, {x: i, y: 500});

      for(var i = 0; i <= 500; i += 10)
        setLine({x: 0, y: i}, {x: 500, y: i});

      draw();
    }

    function Being(ctx, pos, state)
    {
      this.ctx = ctx;
      this.pos = pos;
      this.state = state || false;
      this.prev_state = false;

      this.live = function(){
        this.prev_state = this.state;
        this.state = true; 
      }

      this.die = function(){
        this.prev_state = this.state;
        this.state = false;
      }

      this.draw = function(){
        this.ctx.beginPath();
        this.ctx.moveTo(pos.x+1, pos.y+1); 
        this.ctx.lineTo(pos.x+9, pos.y+1);
        this.ctx.lineTo(pos.x+9, pos.y+9);
        this.ctx.lineTo(pos.x+1, pos.y+9);
        this.ctx.lineTo(pos.x+1, pos.y+1);
        this.ctx.fill();
      }

      this.heartbeat = function(){
        if(this.state)
        {
          this.ctx.fillStyle = "yellow";  
          this.draw();
        }
        else
        {
          this.ctx.fillStyle = "white";  
          this.draw();
        }
      }
    }

    var prev_num =0,
        num = 1,
        field = {len: 50, width: 50},
        beings_bufs = [new Array(field.len), Array(field.len)];

    function drawBuf(num)
    {
      for(var i = 0; i < field.len; i++)
        for(var j = 0; j < field.width; j++)
          beings_bufs[num][i][j].heartbeat(); 
    }
    
    for(var i = 0; i < field.len; i++)
    {
      beings_bufs[0][i] = new Array(field.width);
      beings_bufs[1][i] = new Array(field.width);
      for(var j = 0; j < field.width; j++)
      {
        var l = false;
        /*
        if(i == 10 && j ==5) l = true;
        if(i == 11 && j ==5) l = true;
        if(i == 10 && j ==6) l = true;
        if(i == 11 && j ==6) l = true;

        if(i == 21 && j ==3) l = true;
        if(i == 20 && j ==4) l = true;
        if(i == 19 && j ==5) l = true;
        if(i == 19 && j ==6) l = true;
        if(i == 19 && j ==7) l = true;
        if(i == 20 && j ==8) l = true;
        if(i == 21 && j ==9) l = true;
        if(i == 23 && j ==6) l = true;
        if(i == 25 && j ==5) l = true;
        if(i == 25 && j ==6) l = true;
        if(i == 25 && j ==7) l = true;
        if(i == 26 && j ==6) l = true;
        if(i == 24 && j ==4) l = true;
        if(i == 24 && j ==8) l = true;

        if(i == 29 && j ==5) l = true;
        if(i == 29 && j ==4) l = true;
        if(i == 29 && j ==3) l = true;
        if(i == 30 && j ==5) l = true;
        if(i == 30 && j ==4) l = true;
        if(i == 30 && j ==3) l = true;
        if(i == 31 && j ==2) l = true;
        if(i == 29 && j ==4) l = true;
        if(i == 29 && j ==3) l = true;
        if(i == 31 && j ==6) l = true;
        if(i == 33 && j ==2) l = true;
        if(i == 33 && j ==1) l = true;
        if(i == 33 && j ==6) l = true;
        if(i == 33 && j ==7) l = true;

        if(i == 43 && j ==4) l = true;
        if(i == 43 && j ==3) l = true;
        if(i == 44 && j ==3) l = true;
        if(i == 44 && j ==4) l = true;
        */
       
        /* Glider gun */
        if(i == 10 && j ==5) l = true;
        if(i == 10 && j ==6) l = true;
        if(i == 11 && j ==5) l = true;
        if(i == 11 && j ==6) l = true;

        if(i == 18 && j ==6) l = true;
        if(i == 18 && j ==7) l = true;
        if(i == 19 && j ==7) l = true;
        if(i == 19 && j ==5) l = true;
        if(i == 20 && j ==5) l = true;
        if(i == 20 && j ==6) l = true;

        if(i == 26 && j ==7) l = true;
        if(i == 26 && j ==8) l = true;
        if(i == 26 && j ==9) l = true;
        if(i == 27 && j ==7) l = true;
        if(i == 28 && j ==8) l = true;

        if(i == 45 && j ==10) l = true;
        if(i == 45 && j ==11) l = true;
        if(i == 45 && j ==12) l = true;
        if(i == 46 && j ==10) l = true;
        if(i == 47 && j ==11) l = true;

        if(i == 36 && j ==15) l = true;
        if(i == 35 && j ==15) l = true;
        if(i == 34 && j ==15) l = true;
        if(i == 34 && j ==16) l = true;
        if(i == 35 && j ==17) l = true;

        if(i == 32 && j ==4) l = true;
        if(i == 32 && j ==5) l = true;
        if(i == 33 && j ==5) l = true;
        if(i == 33 && j ==3) l = true;
        if(i == 34 && j ==3) l = true;
        if(i == 34 && j ==4) l = true;

        if(i == 44 && j ==4) l = true;
        if(i == 44 && j ==3) l = true;
        if(i == 45 && j ==3) l = true;
        if(i == 45 && j ==4) l = true;

        beings_bufs[0][i][j] = new Being(context, {x:i*10, y:j*10}, false);
        beings_bufs[1][i][j] = new Being(context, {x:i*10, y:j*10}, l);
      }
    }

    drawGrid(context);  

    function simulate ()
    {
      function calculate(n, p){
        for(var i = 0; i < field.len; i++)
          for(var j = 0; j < field.width; j++)
            beings_bufs[n][i][j].die(); 
        for(var i = 0; i < field.len; i++)
          for(var j = 0; j < field.width; j++)
          {      
            var neighbours = 0;
            if(i<field.len-1 &&   beings_bufs[p][i+1][j].state) neighbours++;
            if(i>0 &&             beings_bufs[p][i-1][j].state) neighbours++;
            if(j<field.width-1 && beings_bufs[p][i][j+1].state) neighbours++;
            if(j>0 &&             beings_bufs[p][i][j-1].state) neighbours++;
            if(i<field.len-1 && j<field.width-1 &&  beings_bufs[p][i+1][j+1].state) neighbours++;
            if(i<field.len-1 && j>0 &&              beings_bufs[p][i+1][j-1].state) neighbours++;
            if(i>0 && j<field.width-1 &&            beings_bufs[p][i-1][j+1].state) neighbours++;
            if(i>0 && j>0 &&                        beings_bufs[p][i-1][j-1].state) neighbours++;

            if(beings_bufs[p][i][j].state)
            {
              if(neighbours < 2 || neighbours >3)
                beings_bufs[n][i][j].die(); 
              else
                beings_bufs[n][i][j].live();
            }
            else
              if(neighbours == 3)
                beings_bufs[n][i][j].live();
          }
      }

      drawBuf(num);
      var bf;
      bf = num;
      num = prev_num;
      prev_num = bf;
      calculate(num, prev_num);
    }
    simulate();
    setInterval(simulate, 100);
  })
});
