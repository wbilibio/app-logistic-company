import {Inject, Injectable} from '@angular/core';
import {catchError, of} from 'rxjs';
import {ajax} from "rxjs/internal/ajax/ajax";
import {map} from "rxjs/operators";
import {environment} from "@lc/env/environment";


interface RequestOptions{
    body?: any;
    path?: string
    id?: string
}
@Injectable({
    providedIn: 'root'
})
export class ApiService {
    constructor(@Inject('url') readonly url:string) {
    }

    get(id: string) {
        return this.ajaxApi('GET', { id }).pipe(
            map(data => data.response),
            catchError(error => {
                return of(error);
            })
        );
    }

    save(body: {}) {
        return this.ajaxApi('POST', { body })
            .pipe(
                map(data => data.response),
                catchError(error => {
                    return of(error);
                })
            );
    }

    update(body: {}, id:string) {
        return this.ajaxApi('PUT', { body, id})
            .pipe(
                map(data => data.response),
                catchError(error => {
                    return of(error);
                })
            );
    }

    delete(id: string) {
        return this.ajaxApi('DELETE', { id }).pipe(
            map(data => data.response),
            catchError(error => {
                return of(error);
            })
        );

    }

    list() {
        return this.ajaxApi().pipe(
            map(data => data.response),
            catchError(error => {
                return of(error);
            })
        );
    }

    ajaxApi(method: string = 'GET', options?: RequestOptions){
        let body = {};
        let path;
        let id;
        if(options){
            body = options.body;
            path = options.path
            id = options.id
        }
        return ajax({
            url: `${environment.logistic_api}/${this.url}${path ? '/'+path : ''}${id ? '/'+id : ''}` ,
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'rxjs-custom-header': 'Rxjs'
            },
            body: JSON.stringify(body)
        })
    };
}
