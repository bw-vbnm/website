$(document).ready(function() {

  var w = window.innerWidth,
      h = window.innerHeight,
      start = Date.now();

  var is_firefox = is_firefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
      is_mobile = false;
      (function(a,b){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))is_mobile = true})(navigator.userAgent||navigator.vendor||window.opera);

  var i, things = [
    "attending hackathons.",
    "rock climbing.",
    "napping in my hammock.",
    "slacklining.",
    "practicing yoga."
  ];

  var ringRange, 
      ringDensity;

  if(is_mobile){
    alert("mobile");     
  }
  else{
    if(w>1300){
       ringRange = 8;
       if(is_firefox) ringDensity = 125;
       else ringDensity = 175;
    }
    else{
       ringRange = 4; 
       if(is_firefox) ringDensity = 125;
       else ringDensity = 100;
    }

    // adds rings
    var rings = [];
    for(i = 0; i < ringDensity; i++){
      rings.push({
        radius: 300 * Math.random() * ringRange, 
        width: Math.random()*1.2, 
        speed: ((Math.random()*-15e-4)+(-5e-4)) 
      });
    }
  
    // svg container
    var svg = d3.select("body").append("svg:svg")
      .attr("width", w)
      .attr("height", h)
      .append("svg:g")
        .attr("class", "sky")
        .attr("transform", "translate("+ 3*w/4 +","+ -h/8 +")scale(1)");
    
    // rings svg
    var ring = svg.selectAll("g")
      .data(rings)
      .enter().append("svg:g")
        .attr("class", "ring")
        .each(ringEnter);
    
    setInterval(update, 50);
  }

  // init
  setTimeout(function(){
    $(".container").fadeTo(1500, 1);
    $("#cycle-text").html(things[i=0]);
    setTimeout(function(){
      if(!is_mobile) $("svg").fadeTo(3000, 1);
      $(".content").fadeTo(3000, .7);
      setTimeout(function(){ setInterval(cycle(),5000); }, 5000);
    }, 1200);
  }, 0);
  
  function update(){
    var elapsed = (Date.now() - start);
    var rotate = function(d) { return "rotate(" + d.speed * elapsed + ")"; };
    ring.attr("transform", rotate)
    if(Math.random()*100 > 95) d3.selectAll("circle").each(twinkle);
      //console.log(this.i);
      //if(Math.random() > 0.9) twinkle(d);
    //});
  }


    //console.log(d.attr("class"));
    /*d3.select("g").selectAll("g").selectAll("circle").each(winkle());
      .attr("r", function() {
        if(Math.random() > 0.9){
          setTimeout(winkle(d3.select(this)),200);
          return 10; 
        }
        return d3.select(this).attr("r");
      });*/

  function twinkle(d,i){
    if(Math.random()*100 > 99.5){
      var star = d3.select(this);
      star.attr("r",2.5); 
      setTimeout(function(){
        star.attr("r",Math.random()*1.2+1)
      },100);
   // d.attr("r",1);

    }
    //d.attr("r",Math.random()*1.3+1);
  }

  function ringEnter(d, i){
    var n = Math.floor( Math.PI / ((Math.random()*100)+100) * d.radius * Math.SQRT1_2),
        k = 360/n;
    d3.select(this).selectAll("g")
      .data(d3.range(n).map(function() { return d; }))
      .enter().append("svg:g")
        .attr("class", "star")
        .attr("transform", function(_, i) { return "rotate(" + i * ((k-2)+(Math.random()*2)) + ")translate(" + d.radius + ")"; })
      .append("svg:circle")
        .attr("cx", -d.width / 2)
        .attr("cy", -d.width / 2)
        .attr("r", d.width+1)
        .attr("opacity", Math.random())
  }

  function cycle(){
    $("#cycle-text").fadeTo(600, 0);
    setTimeout(function(){
      i = (i+1)%things.length;
      $("#cycle-text").html(things[i]);
      $("#cycle-text").fadeTo(600, 1);
    }, 500);
  }

  $(window).resize(function(){
    w = window.innerWidth;
    h = window.innerHeight;
    $("svg").css("width", w);
    $("svg").css("height", h);
    $(".sky").attr("transform", "translate("+ 3*w/4 +","+ -h/8 +")scale(1)");
  });
});
