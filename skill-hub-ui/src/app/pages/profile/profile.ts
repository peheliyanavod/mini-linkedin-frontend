import { Component, OnInit } from '@angular/core';
import { SkillService, Skill } from '../../services/skill.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit {
  mySkills: Skill[] = [];
  
  // We are pretending you are logged in as User #1
  currentUserId: number = 1; 

  constructor(private skillService: SkillService) {}

  ngOnInit() {
    // Tell the waiter to only fetch skills for User #1!
    this.skillService.getUserSkills(this.currentUserId).subscribe((data) => {
      this.mySkills = data;
    });
  }
}