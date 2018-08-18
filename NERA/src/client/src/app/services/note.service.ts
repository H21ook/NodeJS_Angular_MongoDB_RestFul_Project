//Angular libs and other libs
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/Rx';

//model
import { Note } from '../model/Note';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  readonly baseURL: string = "/notes";

  constructor(private http: HttpClient) { }

  getNotes() {
    return this.http.get<Note[]>(this.baseURL)
     .map(res => res);
  }

  getNote(id) {
    return this.http.get<Note>(this.baseURL + '/' + id)
     .map(res => res);
  }

  addNote(newNote) {
    return this.http.post<Note>(this.baseURL, newNote)
      .map(res => res);
  }

  updateNote(newNote) {
    return this.http.put<Note>(this.baseURL + '/' + newNote._id, newNote)
      .map(res => res);
  }

  deleteNote(id) {
    return this.http.delete<Note>(this.baseURL + '/' + id)
      .map(res => res);
  }
}
