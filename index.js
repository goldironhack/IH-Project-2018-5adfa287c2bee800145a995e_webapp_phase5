const DATASET_NeighborhoodNY = "https://data.cityofnewyork.us/api/views/xyye-rtrs/rows.json?accessType=DOWNLOAD";
const DATASET_MuseumsNY = "https://data.cityofnewyork.us/api/views/fn6f-htvy/rows.json?accessType=DOWNLOAD";
const DATASET_FarmersMarket ="https://data.cityofnewyork.us/api/views/j8gx-kc43/rows.json?accessType=DOWNLOAD";
const DATASET_Crimes ="https://data.cityofnewyork.us/resource/9s4h-37hy.json?$where=cmplnt_fr_dt=\"2015-12-31T00:00:00.000\"&$limit=1500";
const DATASET_Houses="https://data.cityofnewyork.us/api/views/hg8x-zxpr/rows.json?accessType=DOWNLOAD";

var map,marker,data;
var NeighborhoodNY=[]; //barrios de ny, punto-nombre-localidad
var MuseumsNY=[]; //museos punto-nombre-tel-url
var FarmersMarket=[]; //
var Crimes=[];
var Crimes1=[];
var Houses=[];
var Housessorted=[];
var Crimessorted=[];
var datosCrimes=[];
var datosHousing=[];
var datosNeighborhood=[];

//............................................................

var precincts=[];
precincts.push(["BX-01",40]);
precincts.push(["BX-02",41]);
precincts.push(["BX-03",42]);
precincts.push(["BX-04",44]);
precincts.push(["BX-05",46]);
precincts.push(["BX-06",48]);
precincts.push(["BX-07",52]);
precincts.push(["BX-08",50]);
precincts.push(["BX-09",43]);
precincts.push(["BX-10",45]);
precincts.push(["BX-11",49]);
precincts.push(["BX-12",47]);

precincts.push(["MN-01",1]);
precincts.push(["MN-02",6]);
precincts.push(["MN-03",5]);
precincts.push(["MN-03",7]);
precincts.push(["MN-03",9]);
precincts.push(["MN-04",10]);
precincts.push(["MN-05",13]);
precincts.push(["MN-05",14]);
precincts.push(["MN-06",17]);
precincts.push(["MN-07",18]);
precincts.push(["MN-07",20]);
precincts.push(["MN-08",19]);
precincts.push(["MN-08",23]);
precincts.push(["MN-08",22]);
precincts.push(["MN-09",30]);
precincts.push(["MN-09",28]);
precincts.push(["MN-09",26]);
precincts.push(["MN-09",24]);
precincts.push(["MN-10",32]);
precincts.push(["MN-11",25]);
precincts.push(["MN-12",34]);
precincts.push(["MN-12",33]);

precincts.push(["QN-01",114]);
precincts.push(["QN-02",108]);
precincts.push(["QN-03",115]);
precincts.push(["QN-04",110]);
precincts.push(["QN-05",104]);
precincts.push(["QN-06",112]);
precincts.push(["QN-07",109]);
precincts.push(["QN-08",107]);
precincts.push(["QN-09",102]);
precincts.push(["QN-10",106]);
precincts.push(["QN-11",111]);
precincts.push(["QN-12",103]);
precincts.push(["QN-12",113]);
precincts.push(["QN-13",105]);
precincts.push(["QN-14",101]);
precincts.push(["QN-14",100]);

precincts.push(["SI-01",120]);
precincts.push(["SI-02",121]);
precincts.push(["SI-02",122]);
precincts.push(["SI-03",123]);

precincts.push(["BK-01",94]);
precincts.push(["BK-02",88]);
precincts.push(["BK-02",90]);
precincts.push(["BK-02",84]);
precincts.push(["BK-03",81]);
precincts.push(["BK-04",83]);
precincts.push(["BK-05",75]);
precincts.push(["BK-06",76]);
precincts.push(["BK-07",72]);
precincts.push(["BK-08",77]);
precincts.push(["BK-08",78]);
precincts.push(["BK-08",79]);
precincts.push(["BK-09",71]);
precincts.push(["BK-10",68]);
precincts.push(["BK-11",62]);
precincts.push(["BK-12",66]);
precincts.push(["BK-13",60]);
precincts.push(["BK-14",70]);
precincts.push(["BK-15",61]);
precincts.push(["BK-16",73]);
precincts.push(["BK-17",67]);
precincts.push(["BK-18",69]);
precincts.push(["BK-18",63]);

function precintToDistrict (a){
  for (var i = 0; i < precincts.length; i++) {
    if (a==precincts[i][1]){
      a=precincts[i][0];
      break;
    }
  }
  return a;
}
//-....................................................................

function getDataCrimes(URL) {

  var data = $.get(URL, function(){

	})
		.done( function(){
      var tableC = $('#tableCrimes');
      var a;
      for (var i = 0; i < 1090; i++) {
        a=precintToDistrict(data.responseJSON[i].addr_pct_cd);
        Crimes.push(a);
            }
            Crimes.sort();
      //console.log(Crimes);

      var c=1;
      for (var i = 0; i < Crimes.length; i++) {
        if (i<Crimes.length-1){
          if (Crimes[i]==Crimes[i+1]){
            c++;
          }else{
              Crimessorted.push([c,Crimes[i]]);
            c=1;
          }
        }
      }
      Crimessorted.sort(sortFunction1);
      for (var i = 0; i < 5; i++) {
        datosCrimes.push(Crimessorted[i][0]);
      }
      console.log(datosCrimes);
      graficar3(datosCrimes);

      for (var i = 0; i < Crimessorted.length; i++) {
        tableC.append('<tr><td>' + Crimessorted[i][1] + '</td><td>' + Crimessorted[i][0] + '</td></tr>');
      }

    })
}
 getDataCrimes(DATASET_Crimes);




//(function UpdateMap() {
    document.getElementById("btn1").addEventListener("click", function () {
        map.data.loadGeoJson(
          'https://services5.arcgis.com/GfwWNkhOj9bNBqoJ/arcgis/rest/services/nycd/FeatureServer/0/query?where=1=1&outFields=*&outSR=4326&f=geojson');
    });

    document.getElementById("btn2").addEventListener("click", function () {
        marker = new google.maps.Marker({
          position: {lat: 40.729234, lng:  -73.996566},
          label:"University",
          map: map
        });
    });

    document.getElementById("btn3").addEventListener("click", function () {
      map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 40.7291  , lng:  -73.9965},
        zoom: 10
      });
    });

//})();

function sortFunction(a, b) {
    if (parseFloat(a[0]) === parseFloat(b[0])) {
        return 0;
    }
    else {
        return (parseFloat(a[0]) < parseFloat(b[0])) ? -1 : 1;
    }
}

function sortFunction1(a, b) {
    if (parseFloat(a[0]) === parseFloat(b[0])) {
        return 0;
    }
    else {
        return (parseFloat(a[0]) > parseFloat(b[0])) ? -1 : 1;
    }
}



function getDataNeighborhoodNY(URL){
	var data = $.get(URL, function(){

	})
		.done( function(){
			//Success
      var tableD = $('#tableDistances');//distancias
      for (var i = 0; i < data.responseJSON.data.length; i++) {

        //console.log(NeighborhoodNY);
        var punto = separarPunto(data.responseJSON.data[i][9]);

        var puntos= punto.split (" ");
        //console.log(puntos);
        var distancia = distancia2Puntos(40.729234,-73.996566,puntos[1],puntos[0]);
        NeighborhoodNY.push([distancia,data.responseJSON.data[i][9],data.responseJSON.data[i][10],data.responseJSON.data[i][16]]);
      }

      NeighborhoodNY.sort(sortFunction);


      for (var i = 0; i < NeighborhoodNY.length; i++) {
        tableD.append('<tr><td>' + NeighborhoodNY[i][2] + '</td><td>' + NeighborhoodNY[i][0] + '</td></tr>');
      }
      for (var i = 0; i < 5; i++) {
        datosNeighborhood.push(NeighborhoodNY[i][0]);
      }
      graficar2(datosNeighborhood);

		})
		.fail( function(error){
			console.error(error);
		})

}
getDataNeighborhoodNY(DATASET_NeighborhoodNY);








 function getDataMuseumsNY(URL){
 	var data = $.get(URL, function(){

 	})
 		.done( function(){
 			//Success
       for (var i = 0; i < data.responseJSON.data.length; i++) {
         MuseumsNY.push([data.responseJSON.data[i][8],data.responseJSON.data[i][9],data.responseJSON.data[i][10],data.responseJSON.data[i][11]]);

       }
      // console.log(MuseumsNY);
 		})
 		.fail( function(error){
 			console.error(error);
 		})
 }
 getDataMuseumsNY(DATASET_MuseumsNY);


 function getDataHousesNY(URL){
 	var data = $.get(URL, function(){

 	})
 		.done( function(){
 			//Success
      var tableH = $('#tableHousing');
       for (var i = 0; i < data.responseJSON.data.length; i++) {
         Houses.push([data.responseJSON.data[i][19],data.responseJSON.data[i][15]]);

       }
       Houses.sort();
      var c=1;
      for (var i = 0; i < Houses.length; i++) {
        if (i<Houses.length-1){
          if (Houses[i][0]==Houses[i+1][0]){
            c++;
          }else{
            if(Houses[i][0]!="BK-304"){
              Housessorted.push([c,Houses[i][0]]);
            }
            c=1;
          }
        }
      }

      Housessorted.sort(sortFunction1);
      for (var i = 0; i < Housessorted.length; i++) {

        tableH.append('<tr><td>' + Housessorted[i][1] + '</td><td>' + Housessorted[i][0] + '</td></tr>');
      }

      for (var i = 0; i < 5; i++) {
        datosHousing.push(Housessorted[i][0]);
      }
      graficar1(datosNeighborhood);


 		})
 		.fail( function(error){
 			console.error(error);
 		})
 }
 getDataHousesNY(DATASET_Houses);




function getDataFarmersMarket(URL){
	var data = $.get(URL, function(){

	})
		.done( function(){
			//Success
      for (var i = 0; i < data.responseJSON.data.length; i++) {
        FarmersMarket.push(data.responseJSON.data[i][8],data.responseJSON.data[i][11]);
        //console.log(FarmersMarket);

      }
      //console.log(data);
		})
		.fail( function(error){
			console.error(error);
		})
}
getDataFarmersMarket(DATASET_FarmersMarket);




function distancia2Puntos(lat1, lon1, lat2, lon2){
  rad = function (x) {
         return x * Math.PI / 180;
     }

   var R = 6378.137;//Radio de la tierra en km
   var dLat = rad(lat2 - lat1);
   var dLong = rad(lon2 - lon1);
   var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLong / 2) * Math.sin(dLong / 2);
   var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
   var d = R * c;
   return d.toFixed(3);//Retorna tres decimales
}


 function separarPunto(cadena){
   cadena=cadena.replace("POINT (", "");
   cadena=cadena.replace(")", "");
   return cadena;
 }


/* var datos1=[0.381,0.857,0.956,0.];
 var x = d3.scaleLinear()
  .domain([0, d3.max(datos)])
    .range([0,600]);*/

    function graficar1(a){
var datos=[];
      a.forEach(function(valor, indice, array){
        datos.push(valor);
      })
      console.log(datos);
      var x = d3.scaleLinear()
       .domain([0, d3.max(datos)])
         .range([0,600]);

      d3.select(".barras1")
      .selectAll("div")
      .data(datos)
      .enter().append('div')
      .style("width",function(d){
        return x(d) + "px"
      })
      .text(function(d){
        return d;
      })
    }






    function graficar2(a){

      var datos=[];
            a.forEach(function(valor, indice, array){
              datos.push(valor);
            })
            console.log(datos);
            var x = d3.scaleLinear()
             .domain([0, d3.max(datos)])
               .range([0,600]);

            d3.select(".barras2")
            .selectAll("div")
            .data(datos)
            .enter().append('div')
            .style("width",function(d){
              return x(d) + "px"
            })
            .text(function(d){
              return d;
            })
    }

    function graficar3(a){
      var datos=[];
            a.forEach(function(valor, indice, array){
              datos.push(valor);
            })
            console.log(datos);
            var x = d3.scaleLinear()
             .domain([0, d3.max(datos)])
               .range([0,600]);

            d3.select(".barras3")
            .selectAll("div")
            .data(datos)
            .enter().append('div')
            .style("width",function(d){
              return x(d) + "px"
            })
            .text(function(d){
              return d;
            })
    }
