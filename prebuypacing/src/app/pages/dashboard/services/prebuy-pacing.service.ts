import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PREBUYPACING } from './prebuy-pacing.resource';
import {Observable} from 'rxjs';
import {Page} from '../../../shared/models/page.model';
import {PrebuyPacingItem} from '../models/prebuy-pacing-item.model';

@Injectable()
export class PrebuyPacingService {
  constructor(private http: HttpClient) {}
  getPrebuyPacing(): Observable<Page<PrebuyPacingItem>> {
    return this.http.get<Page<PrebuyPacingItem>>(PREBUYPACING);
  }
}
