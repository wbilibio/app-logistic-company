import {Injectable} from '@angular/core';
import {ApiService} from "@api/services/api.service";

@Injectable({
    providedIn: 'root'
})
export class StorageController extends ApiService {
    constructor(
    ) {
        super(`storage-locations`)
    }
}
