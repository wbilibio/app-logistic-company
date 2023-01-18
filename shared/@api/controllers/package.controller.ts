import {Injectable} from '@angular/core';
import {ApiService} from "@api/services/api.service";
import {map} from "rxjs/operators";
import {catchError, of} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class PackageController extends ApiService {
    constructor(
    ) {
        super(`packages`)
    }

    associateStorage(body: {}, id:string) {
        let path = 'associate'
        return this.ajaxApi('PUT', { body, path, id})
            .pipe(
                map(data => data.response),
                catchError(error => {
                    return of(error);
                })
            );
    }
}
