import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Picture } from 'src/app/models/picture/picture.model';

@Injectable({
  providedIn: 'root'
})
export class PictureService {

  constructor(private http : HttpClient) { }

    findAll() {
    return this.http.get<Picture[]>("http://localhost:3000/pictures");
  }
  
}
