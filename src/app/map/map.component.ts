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
  source: any;
  target: any;
  count: number = 0;

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

  }

  ngOnInit(): void {
    
    // this.getLoc(1);

    // console.log(this.locate);
    
    this.getAllLoc();

    // this.getPath();

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

      var lines = [];

      for(let i = 0; i<listarestas.length; i++) {
        lines[i] = L.polyline([L.latLng(listarestas[i].lon1, listarestas[i].lat1), L.latLng(listarestas[i].lon2, listarestas[i].lat2)], 
                          {color: "green", id: listarestas[i].id}).addTo(this.map);
        // lines[i].setText(String(listarestas[i].id), {center: true});
        lines[i].on("click", e => { 
            var p: any = e.target.getLatLngs()[0];
            console.log([p.lat, p.lng]);

            if(this.count == 0) {
              this.source = e.target.options.id;
              console.log(this.source)
              this.getSourceFromVertexId(this.source);
            } else if(this.count == 1) {
              this.target = e.target.options.id;
              console.log(this.target)
              this.getSourceFromVertexId(this.target);
            }

            
            L.marker([p.lat, p.lng]).addTo(this.map);
        }); 
      }
    });
  }

  getPath(source: number, target: number) {
    this.mapService.getPath(source, target).subscribe(locas => {
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

  getSourceFromVertexId(id: number)  {
      this.mapService.getSourceFromVertex(id).subscribe(n => {
        if(this.count == 0) {
          this.source = n;
          console.log(this.source)
          this.count++;
        } else if(this.count == 1) {
          this.target = n;
          console.log(this.target)
          this.getPath(this.source, this.target);
          this.count = 0;
        }
      })
  }

}


