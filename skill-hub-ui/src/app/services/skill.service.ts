import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Notice how this interface perfectly matches our Go Struct!
export interface Skill {
  id?: number;         // Optional because we don't have an ID before we create it
  skill_name: string;
}

@Injectable({
  providedIn: 'root'
})
export class SkillService {
  // This is the endpoint we tested in Postman!
  private apiUrl = 'http://localhost:8080/skills';

  // We "hire" the waiter by injecting HttpClient into the constructor
  constructor(private http: HttpClient) { }

  // GET: Fetch all skills from Go
  getSkills(): Observable<Skill[]> {
    return this.http.get<Skill[]>(this.apiUrl);
  }

  // POST: Send a new skill to Go
  addSkill(skill: Skill): Observable<Skill> {
    return this.http.post<Skill>(this.apiUrl, skill);
  }
}