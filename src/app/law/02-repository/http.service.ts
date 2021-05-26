//קובץ המכיל את כל הקריאות לצורך קבלת הנתונים 
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TreeNode } from 'primeng/api';
import { Ilaw } from '../01-domain/law.interface';

@Injectable({ providedIn: 'root' })
export class HttpService {
  constructor(private http: HttpClient) {}

  lawDataUrl = 'assets/law.json';//קובץ המכיל את הנתונים שהוגדרו לתרגיל



  getLawData() {
    return this.http.get<Ilaw[]>(this.lawDataUrl);
  }
}
