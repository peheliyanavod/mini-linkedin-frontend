import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkillService, Skill } from './services/skill.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements OnInit {
  skillsList: Skill[] = [];

  constructor(private skillService: SkillService) {}

  ngOnInit() {
    this.skillService.getSkills().subscribe((dataFromGo) => {
      this.skillsList = dataFromGo;
    });
  }

  // --- THE NEW CODE TO ADD A SKILL ---
  addNewSkill(newSkillName: string) {
    // 1. Check if it's empty. If it is, don't do anything! (Frontend Validation!)
    if (!newSkillName) return; 

    // 2. Create the exact order ticket our Go kitchen expects
    const newSkillOrder: Skill = { skill_name: newSkillName };

    // 3. Hand the ticket to the waiter (SkillService)
    this.skillService.addSkill(newSkillOrder).subscribe((savedSkillFromGo) => {
      // 4. BEEP! The pager goes off. The kitchen saved it and gave us the new ID!
      // Let's instantly push this new skill into our screen's list
      this.skillsList.push(savedSkillFromGo);
    });
  }
}