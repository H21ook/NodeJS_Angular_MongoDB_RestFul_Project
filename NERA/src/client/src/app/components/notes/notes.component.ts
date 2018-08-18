//Angular lib and other libs
import { Component, OnInit } from '@angular/core';

//Service
import { NoteService } from '../../services/note.service';
import { Note } from '../../model/Note';
import { nodeValue } from '../../../../node_modules/@angular/core/src/view';


@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  notes: Note[];
  note: Note;
  title: string;
  description: string;

  isVisible:boolean = true;
  isGetSingleNote: boolean;

  constructor(private noteService: NoteService) { 
    this.isGetSingleNote  = false;
    this.noteService.getNotes()
      .subscribe(notes => {
        this.notes = notes; 
      });
  }

  ngOnInit() {
  }

  addNote(event) {
    event.preventDefault();
    const newNote: Note = {
      title: this.title,
      description: this.description
    }
    this.noteService.addNote(newNote)
      .subscribe(note => {
        this.notes.push(note);
        this.title = "";
        this.description = "";
      });
  }

  deleteNote(id) {
    const response = confirm("Are you sure to delete");
    if(response) {
      console.log(this.note._id);
      console.log("new "+id);
      if(this.note && this.note._id == id) {
        this.isGetSingleNote  = false;
        this.isVisible = true;
        this.title = "";
        this.description = "";
      }
      const notes = this.notes;
      this.noteService.deleteNote(id)
        .subscribe(() => {
          for(let i = 0; i < notes.length; i++) {
            if(notes[i]._id == id)
            {
              notes.splice(i, 1);
            }
          }
        });
    }
    return;
  }

  editNote() {
    const newNote = {
      _id: this.note._id,
      title: this.title,
      description: this.description
    };
    this.noteService.updateNote(newNote)
      .subscribe(res => {
        for(let i = 0; i < this.notes.length; i++) {
          if(this.notes[i]._id == newNote._id)
          {
            this.notes[i] = newNote;
            this.isVisible = true;
            this.title = "";
            this.description = "";
          }
        }
      });
  }

  edit(note: Note) {
    this.isVisible = false;
    this.isGetSingleNote = false; 
    this.note = note;
    this.title = note.title;
    this.description = note.description;
  }

  editCancel() {
    this.isVisible = true;
    this.title = "";
    this.description = "";
  }

  rowSelect(note, event) {
    if(event.target.innerText == "DELETE") {
      this.deleteNote(note._id);
    }
    else if(event.target.innerText == "EDIT") {
      this.edit(note);
    }
    else {
      this.isGetSingleNote  = true;
      this.note = note;
      console.log(note.description.substring(0,160) +"...");
      this.noteService.getNote(note._id)
        .subscribe(note => {
          this.title = note.title;
          this.description = note.description;
        });
    }
  }
}
