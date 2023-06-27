import { AfterViewInit, Component, OnInit } from '@angular/core';

import * as L from 'leaflet';
import { MapService } from './map.service';
import { Nep } from './nep.model';

import 'leaflet-textpath';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit, OnInit {
  

  private map: any;
  locate: Nep;

  locates: Nep[];

  constructor(private mapService : MapService) {  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [ -21.2316634, -45.2308297 ],
      zoom: 18
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);

    // // L.marker([-21.2356099, -45.2270302 ]).addTo(this.map);

    // // L.marker([-21.2346623, -45.2263355]).addTo(this.map);
    // // L.marker([-21.2359874, -45.226475]).addTo(this.map);

    // var p1 = L.latLng(-18.9250403, -48.2452131 )
    // var p2 = L.latLng(-21.2317559, -45.2305506)
    // var p3 = L.latLng(-21.2316634, -45.2308297)
    // var p4 = L.latLng(-21.2316634, -45.2308297)
    // var p5 = L.latLng(-21.2316634, -45.2308297)
    // // L.marker(p1).addTo(this.map);
    // // L.marker(p2).addTo(this.map);


    // //  ,  , -45.2301376 -21.2319084, -45.2298535 -21.2320317, -45.2297111 -21.2320935, -45.2292229 -21.2323360, -45.2288112 -21.2325660, -45.2283029 -21.2328735, -45.2278577 -21.2331660, -45.2272086 -21.2335935

    // let list: {id: number; lat: number; lon: number}[] = []
    

    // var ps = [ 
    //   [2042693655,-48.2464412,-18.9191182],
    //   [2042693929,-48.2455795,-18.9212032],
    //   [2963614081,-48.2489662,-18.9203102],
    //   [2042693882,-48.2482865,-18.9205035],
    //   [2042694059,-48.246744299999996,-18.9227509],
    //   [2042693900,-48.2469293,-18.920844799999998],
    //   [2042694014,-48.2487868,-18.9222327],
    //   [2042693895,-48.2476147,-18.920671],
    //   [2042693634,-48.2471039,-18.9189395],
    //   [2042693985,-48.250139999999995,-18.9218762],
    //   [2042693851,-48.249646399999996,-18.9201343],
    //   [2042694294,-48.2452131,-18.9250403],
    //   [2042693971,-48.2442151,-18.9215523],
    //   [2042694076,-48.246072399999996,-18.9229317],
    //   [2042693789,-48.2443895,-18.9196474],
    //   [2042694043,-48.247434899999995,-18.9225796],
    //   [338984517,-48.243716199999994,-18.9198301],
    //   [338984623,-48.245751999999996,-18.9192947],
    //   [2042693751,-48.2450699,-18.9194746],
    //   [2042693997,-48.249469399999995,-18.9220614],
    //   [2042694030,-48.248106799999995,-18.9224077],
    //   [2042693945,-48.244897599999994,-18.921384],
    //   [2042693915,-48.2462534,-18.9210167],
    //   [1559792272,-48.2447212,-18.9233002],
    //   [2042694086,-48.245407199999995,-18.9231093],
    //   [5825921974,-48.2485631,-18.9189234]
    // ]

    // for(let i = 0; i<ps.length; i++) {
    //   let pu: {id: number; lat: number; lon: number} = {id: ps[i][0], lat: ps[i][2], lon: ps[i][1]}
    //   list.push(pu)
    // }

    // // for(let i = 0; i<list.length; i++) {
    // //   L.marker(L.latLng(list[i].lat, list[i].lon)).addTo(this.map);
    // //   console.log(list[i].lat, list[i].lon)
    // // }

    // var arestas = [
    //   [73.56428717509566, -48.2501400, -18.9218762, -48.2494694, -18.9220614],
    //   [74.36633183743507, -48.2494694, -18.9220614, -48.2487868, -18.9222327],
    //   [74.20871725416976, -48.2487868, -18.9222327, -48.2481068, -18.9224077],
    //   [73.29509680825637, -48.2481068, -18.9224077, -48.2474349, -18.9225796],
    //   [73.55983204048812, -48.2467443, -18.9227509, -48.2460724, -18.9229317],
    //   [72.78384264781434, -48.2460724, -18.9229317, -48.2454072, -18.9231093],
    //   [75.29844226004116, -48.2454072, -18.9231093, -48.2447212, -18.9233002],
    //   [200.32077526147316, -48.2474349, -18.9225796, -48.2469293, -18.9208448],
    //   [198.95705844797462, -48.2469293, -18.9208448, -48.2464412, -18.9191182],
    //   [140.1813661471385, -48.2464184, -18.9241477, -48.2460724, -18.9229317],
    //   [199.2922699399697, -48.2460724, -18.9229317, -48.2455795, -18.9212032],
    //   [199.7683604847232, -48.2455795, -18.9212032, -48.2450699, -18.9194746],
    //   [202.014931043609, -48.2494694, -18.9220614, -48.2489662, -18.9203102],
    //   [198.78141033381024, -48.2437162, -18.9198301, -48.2442151, -18.9215523],
    //   [201.7408178276369, -48.2442151, -18.9215523, -48.2447212, -18.9233002],
    //   [200.51189002248037, -48.2447212, -18.9233002, -48.2452131, -18.9250403],
    //   [200.11331378538168, -48.2471039, -18.9189395, -48.2476147, -18.9206710],
    //   [200.1519393708675, -48.2476147, -18.9206710, -48.2481068, -18.9224077],
    //   [74.27149313563015, -48.2442151, -18.9215523, -48.2448976, -18.9213840],
    //   [74.57387461217593, -48.2448976, -18.9213840, -48.2455795, -18.9212032],
    //   [73.9387804591382, -48.2455795, -18.9212032, -48.2462534, -18.9210167],
    //   [73.70242487800333, -48.2462534, -18.9210167, -48.2469293, -18.9208448],
    //   [73.159345557765, -48.2476147, -18.9206710, -48.2482865, -18.9205035],
    //   [199.41437013723024, -48.2454072, -18.9231093, -48.2448976, -18.9213840],
    //   [160.10656796817761, -48.2489662, -18.9203102, -48.2485631, -18.9189234],
    //   [74.25626284110619, -48.2489662, -18.9203102, -48.2496464, -18.9201343],
    //   [199.85039388634948, -48.2462534, -18.9210167, -48.2467443, -18.9227509],
    //   [198.82973024994413, -48.2457520, -18.9192947, -48.2462534, -18.9210167],
    //   [200.58411394593796, -48.2448976, -18.9213840, -48.2443895, -18.9196474],
    // ]

    // let listarestas: {id: number; w: number; lat1: number; lon1: number; lat2: number; lon2: number}[] = []

    // for(let i = 0; i<arestas.length; i++) {
    //   let ar: {id: number; w: number; lat1: number; lon1: number; lat2: number; lon2: number} = 
    //           {id: i, w: arestas[i][0], lat1: arestas[i][2], lon1: arestas[i][1], lat2: arestas[i][4], lon2: arestas[i][3]}
    //   listarestas.push(ar)
    // }

    // for(let i = 0; i<listarestas.length; i++) {
    //   L.polyline([L.latLng(listarestas[i].lat1, listarestas[i].lon1), L.latLng(listarestas[i].lat2, listarestas[i].lon2)], {color: "red"}).addTo(this.map)
    // }



  }

  ngOnInit(): void {
    
    // this.getLoc(1);

    // console.log(this.locate);
    
    // this.getAllLoc();

    this.getPath();

  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  getLoc(id: number) {
    this.mapService.getLoc(id).subscribe(loca => {
      this.locate = loca;
      console.log(loca);
    });
  }

  getAllLoc() {
    this.mapService.getAllLoc().subscribe(locas => {
      let listarestas: {id: number; lat1: number; lon1: number; lat2: number; lon2: number}[] = []
      for(let i=0; i<locas.length; i++) {
        let ar: {id: number; lat1: number; lon1: number; lat2: number; lon2: number} = 
              {id: locas[i].id, lat1: locas[i].x1, lon1: locas[i].y1, lat2: locas[i].x2, lon2: locas[i].y2};
        listarestas.push(ar);
      }
      console.log(listarestas);

      for(let i = 0; i<listarestas.length; i++) {
        var line = L.polyline([L.latLng(listarestas[i].lon1, listarestas[i].lat1), L.latLng(listarestas[i].lon2, listarestas[i].lat2)], {color: "red"}).addTo(this.map);
        line.setText(String(listarestas[i].id), {center: true});
      }
    });
  }

  getPath() {
    this.mapService.getPath(1, 632).subscribe(locas => {
      let listarestas: {id: number; lat1: number; lon1: number; lat2: number; lon2: number}[] = []
      for(let i=0; i<locas.length; i++) {
        let ar: {id: number; lat1: number; lon1: number; lat2: number; lon2: number} = 
              {id: locas[i].id, lat1: locas[i].x1, lon1: locas[i].y1, lat2: locas[i].x2, lon2: locas[i].y2};
        listarestas.push(ar);
      }
      console.log(listarestas);

      for(let i = 0; i<listarestas.length; i++) {
        L.polyline([L.latLng(listarestas[i].lon1, listarestas[i].lat1), L.latLng(listarestas[i].lon2, listarestas[i].lat2)], {color: "red"}).addTo(this.map)
      }
    });
  }

}


