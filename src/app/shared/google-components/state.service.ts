import {Loader} from "@googlemaps/js-api-loader";
import {environment} from "@lc/env/environment";

import {Injectable} from '@angular/core'

@Injectable()
export class StateService {
  constructor() { }

  loadGoogleMaps() {
    return new Loader({
      apiKey: environment.keys.google_maps,
      libraries: ['places']
    });
  }
}

