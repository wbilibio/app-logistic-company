import {
  Component,
} from '@angular/core';

import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute} from "@angular/router";
import {PackageController} from "@api/controllers/package.controller";
import {PackageTransactionController} from "@api/controllers/package-transaction.controller";
import {StorageController} from "@api/controllers/storage.controller";
@Component({
  selector: 'shipping-routes',
  templateUrl: './shipping-routes.component.html',
  styleUrls: ['./shipping-routes.component.scss']
})
export class ShippingRoutesComponent {
  title = '';
  public wayPointFields: any = []
  public listWayPoints: any = []

  public destination: google.maps.LatLngLiteral

  public origin: google.maps.LatLngLiteral

  public wayPoint: google.maps.LatLngLiteral

  public packageId: string = this.route.snapshot.params['package'];
  public storageLocation: any = {};
  public lastPackageTransaction: any = {};

  constructor(
      private snackBar: MatSnackBar,
      private route: ActivatedRoute,
      private packageController: PackageController,
      private storageController: StorageController,
      private packageTransactionController: PackageTransactionController
  ) {
  }
  ngOnInit(){
    this.getPackage();
  }

  getPackage() {
    if(this.packageId){
      let get$ = this.packageController.get(this.packageId);
      get$.subscribe({
        next: value => {
          this.title = value.name;
          this.origin = {
            lat: parseFloat(String(value.storage_location.lat)),
            lng: parseFloat(String(value.storage_location.lng))
          };

          this.storageLocation = value.storage_location;

          this.getStorage();

          if(value.transactions.length){
            let last_transaction = value.transactions[0];
            this.destination = {
              lat: parseFloat(String(last_transaction.destination.lat)),
              lng: parseFloat(String(last_transaction.destination.lng))
            };

            if(last_transaction.stops.length){

              last_transaction.stops.map((stop: any) => {
                setTimeout(()=>{
                  let address:any = {
                    "lat": String(stop.lat),
                    "lng": String(stop.lng)
                  };
                  this.onWayPointSelected(address);
                }, 500)
              });
            }
          }
        },
        error: err => {
          console.log('obs error', err)
        }
      });
    }
  }

  getStorage() {
    let get$ = this.storageController.get(this.storageLocation.id);
    get$.subscribe({
      next: value => {
        this.storageLocation.street = value.street;
        this.storageLocation.city = value.city;
        this.storageLocation.state = value.state;
      },
      error: err => {
        console.log('obs error', err)
      }
    });
  }

  addWayPoint(){
    let way = 0;
    if(this.wayPointFields.length === 0) way++
    this.wayPointFields.push(way);
    this.notify('Added successfully new way point');
  }
  private notify(message: string, action: string = '', duration: number = 6000) {
    this.snackBar.open(message, action, { duration: duration });
  }
  onWayPointSelected(address: google.maps.LatLngLiteral){
    this.wayPoint = {
      lat: parseFloat(String(address.lat)),
      lng: parseFloat(String(address.lng))
    };
    this.listWayPoints.push(this.wayPoint);
  }

  onDestinationSelected(address: google.maps.LatLngLiteral) {
    this.destination = {
      lat: parseFloat(String(address.lat)),
      lng: parseFloat(String(address.lng))
    };
  }

  saveRoute(){
    let body = {
      "package_id": this.packageId,
      "destination": this.destination,
      "stops": this.listWayPoints,
      "status": "sent"
    };
    /** send data */
    let responseAPI$ = this.packageTransactionController.save(body);
    responseAPI$.subscribe({
      next: value => {
        this.notify('Added successfully new route');
      },
      error: err => {
        console.log('obs error', err)
      }
    });
  }

  routeValid(){
    return !this.destination
  }

}

