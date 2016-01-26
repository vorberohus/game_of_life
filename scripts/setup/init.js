define(function(){
  var canvas = document.getElementById('gol'),
      context = canvas.getContext('2d');

  context.strokeStyle = "black";
  context.fillStyle = "white";

  return context;
});
