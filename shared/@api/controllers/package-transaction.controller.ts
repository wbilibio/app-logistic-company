import {Injectable} from '@angular/core';
import {ApiService} from "@api/services/api.service";
import {map} from "rxjs/operators";
import {catchError, of} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class PackageTransactionController extends ApiService {
    constructor(
    ) {
        super(`package-transactions`)
    }

}
