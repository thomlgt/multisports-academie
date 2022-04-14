import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Picture } from 'src/app/models/picture/picture.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PictureService {

  constructor(private http : HttpClient) { }

    findAll() {
    return this.http.get<Picture[]>(`${environment.apiUrl}/pictures`);
  }

  upload(files: FormData) {
    return this.http.post<any>(`${environment.apiUrl}/pictures/upload`, files);
  }

  delete(id: string) {
    console.log("front service ok")
    return this.http.delete<Picture>(`${environment.apiUrl}/pictures/${id}`);
  }
  
}
