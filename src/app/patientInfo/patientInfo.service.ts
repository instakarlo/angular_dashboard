import { Injectable } from '@angular/core';
import {
    HttpClient,
    HttpRequest,
    HttpEventType,
    HttpResponse
} from '@angular/common/http';
import { Subject, Observable } from 'rxjs';

@Injectable()
export class PatientInfoService {
    constructor(private http: HttpClient) { }
}
