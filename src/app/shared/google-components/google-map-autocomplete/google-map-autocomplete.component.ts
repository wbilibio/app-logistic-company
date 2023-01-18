import {
  Component,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
  AfterViewInit
} from '@angular/core';
import {Loader} from "@googlemaps/js-api-loader";
import {environment} from "@lc/env/environment";

let autocomplete: google.maps.places.Autocomplete;
@Component({
  selector: 'google-map-autocomplete',
  templateUrl: './google-map-autocomplete.component.html',
  styleUrls: ['./google-map-autocomplete.component.scss']
})

export class GoogleMapAutocompleteComponent implements AfterViewInit {
  @ViewChild('ship') ship: ElementRef;
  @Output() addressSelected = new EventEmitter();

  public address:any;
  ngAfterViewInit() {
    let loader = new Loader({
      apiKey: environment.keys.google_maps,
      libraries: ['places']
    });

    loader.load().then(()=>{
      autocomplete = new google.maps.places.Autocomplete(this.ship.nativeElement, {
        componentRestrictions: { country: ["BR"] },
        fields: ['address_components', 'geometry', 'name'],
        types: ["establishment"],
      });
      autocomplete.addListener('place_changed', this.onPlaceChanged.bind(this));
    });
  }

  onPlaceChanged(event: any) {
    let place = autocomplete.getPlace();
    let lat = place.geometry?.location?.lat();
    let lng = place.geometry?.location?.lng();

    this.address = {
      "lat": String(lat),
      "lng": String(lng)
    };

    let street_number = '';
    let route = '';
    let complement = '';

    for (const component of place.address_components as google.maps.GeocoderAddressComponent[]) {
      if('types' in component){

        if(component.types.includes('street_number')){
          street_number = component.long_name
          this.address.number = component.long_name
        }
        if(component.types.includes('route')){
          route = component.short_name
        }
        if(component.types.includes('subpremise')){
          complement = component.short_name
        }
        if(component.types.includes('sublocality_level_1')){
          this.address.neighborhood = component.long_name
        }
        if(component.types.includes('administrative_area_level_2')){
          this.address.city = component.long_name
        }
        if(component.types.includes('administrative_area_level_1')){
          this.address.state = component.short_name
        }
        if(component.types.includes('country')){
          this.address.contry = component.short_name
        }
        if(component.types.includes('postal_code')){
          this.address.zipcode = component.long_name
        }
        this.address.street = `${!!complement ? complement + ', ' : ''}${!!street_number ? street_number : ''} ${route}`
      }
    }
    this.changeAddress();
  }

  changeAddress(){
    this.addressSelected.emit(this.address);
    this.ship.nativeElement.focus();
  }
}

