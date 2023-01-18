import {
  Component,
  OnInit,
  ViewChild,
  OnChanges,
  ElementRef, Input, SimpleChanges
} from '@angular/core';
import {MapStyleRetro} from "@assets/google/map-style-retro";
import {StateService} from "@apps/shared/google-components/state.service";

@Component({
  selector: 'google-map-directions',
  templateUrl: './google-map-directions.component.html',
  styleUrls: ['./google-map-directions.component.scss']
})

export class GoogleMapDirectionsComponent implements OnInit, OnChanges {
  @Input('wayPoint') wayPoint: google.maps.LatLngLiteral;
  @Input('destination') destination: google.maps.LatLngLiteral;
  @Input('origin') origin: google.maps.LatLngLiteral;
  @ViewChild('divMap') divMap: ElementRef;

  public mapStyleRetro : any[] = MapStyleRetro

  public mapDirectionsRenderer: google.maps.DirectionsRenderer;
  public mapDirectionsService: google.maps.DirectionsService;

  public listWayPoints: any[] = [];
  public mapWayPoints: google.maps.DirectionsWaypoint[] = [];

  public map: any;

  public mapOptions: google.maps.MapOptions = {
    zoom:15,
    scrollwheel:true,
    disableDefaultUI:true,
    disableDoubleClickZoom:true,
    styles: this.mapStyleRetro
  }
  constructor(private _StateService:StateService) {
  }

  ngOnInit(): void {
    if(this.destination){
      this.loadGoogleMap();
    }
  }

  ngOnChanges(changes:SimpleChanges):void {
    if ('destination' in changes && this.destination) {
      this.listWayPoints.push()
      this.loadGoogleMap();
    }
    if ('wayPoint' in changes && this.wayPoint) {
      this.listWayPoints.push(changes["wayPoint"].currentValue)
      console.log('changing wayPoint',this.listWayPoints);
      this.loadGoogleMap();
    }

  }
  loadGoogleMap(){
    this._StateService.loadGoogleMaps().load().then(()=>{
       this.mapDirectionsRenderer = new google.maps.DirectionsRenderer({
         map: null,
         suppressMarkers: true
       });
       this.mapDirectionsService = new google.maps.DirectionsService;

        this.map = new google.maps.Map( this.divMap.nativeElement,{
          ...this.mapOptions,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          center: this.origin
        });

        this.createMarkers();

       this.setRoutePolylineMarkers();

    });
  }
  createMarkers(){
    let icon_destination = 1;
    new google.maps.Marker({
      position: this.origin,
      map: this.map,
      icon: {
        url: './assets/images/marker-icon-0.png',
        anchor: new google.maps.Point(0,15),
        scaledSize: new google.maps.Size(48,48)
      }
    });

    if(this.listWayPoints) {
      this.listWayPoints.map((wp, index) => {
        const { lat, lng } = wp
        let icon_way = index+1;
        icon_destination = icon_way+1;
        new google.maps.Marker({
          position: {
            lat:lat,
            lng:lng
          },
          map: this.map,
          icon: {
            url: './assets/images/marker-icon-'+icon_way+'.png',
            anchor: new google.maps.Point(0,15),
            scaledSize: new google.maps.Size(32,32)
          }
        });
      });
    }
    console.log(icon_destination);
    new google.maps.Marker({
      position: this.destination,
      map: this.map,
      icon: {
        url: './assets/images/marker-icon-'+icon_destination+'.png',
        anchor: new google.maps.Point(0,15),
        scaledSize: new google.maps.Size(32,32)
      }
    });
  }

  setRoutePolylineMarkers() {

    this.listWayPoints.map(wp => {
      const { lat, lng } = wp
      this.mapWayPoints.push({
        location: {
          lat:lat,
          lng:lng
        },
        stopover: true,
      });
    });
    console.log('points',this.mapWayPoints);
    let request = {
      origin: this.origin,
      destination: this.destination,
      waypoints: this.mapWayPoints,
      travelMode: google.maps.TravelMode.DRIVING
    };

    this.mapDirectionsService.route(request, (response, status) => {
      this.mapDirectionsRenderer.setOptions({
        suppressPolylines: false,
        map: this.map
      });

      if (status == google.maps.DirectionsStatus.OK) {
        this.mapDirectionsRenderer.setDirections(response);
      }
    })
  }
}
