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
  private apiUrl = 'http://localhost:8080';

  // We "hire" the waiter by injecting HttpClient into the constructor
  constructor(private http: HttpClient) { }

  // GET: Fetch all skills from Go
  getSkills(): Observable<Skill[]> {
    return this.http.get<Skill[]>(this.apiUrl + '/skills');
  }

  // POST: Send a new skill to Go
  addSkill(skill: Skill): Observable<Skill> {
    return this.http.post<Skill>(this.apiUrl + '/skills', skill);
  }

  // DELETE: Remove a skill from Go
  deleteSkill(id: number): Observable<any> {
    // We are using the modern template literal syntax here!
    return this.http.delete(`${this.apiUrl}/skills?id=${id}`);
  }

  // PUT: Update an existing skill in Go
  updateSkill(id: number, skill: Skill): Observable<any> {
    return this.http.put(`${this.apiUrl}/skills?id=${id}`, skill);
  }

  getUserSkills(userId: number): Observable<any>{
    return this.http.get(`${this.apiUrl}/users/skills?user_id=${userId}`);
  }
}