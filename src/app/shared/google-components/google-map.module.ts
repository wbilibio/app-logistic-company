import { NgModule } from '@angular/core';
import {
  GoogleMapDirectionsComponent
} from "@apps/shared/google-components/google-map-directions/google-map-directions.component";
import {
  GoogleMapAutocompleteComponent
} from "@apps/shared/google-components/google-map-autocomplete/google-map-autocomplete.component";
import {StateService} from "@apps/shared/google-components/state.service";
@NgModule({
  declarations: [
    GoogleMapDirectionsComponent,
    GoogleMapAutocompleteComponent
  ],
  exports: [
    GoogleMapDirectionsComponent,
    GoogleMapAutocompleteComponent
  ],
  providers: [
    StateService
  ]
})
export class GoogleMapModule { }
