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

  // --- THE NEW CODE TO DELETE A SKILL ---
  deleteSkill(id: number | undefined) {
    if (!id) return; // Safety check!

    // Tell the waiter to delete it from the Go database
    this.skillService.deleteSkill(id).subscribe(() => {
      // Once the database deletes it, we instantly remove it from our screen 
      // by filtering it out of our array.
      this.skillsList = this.skillsList.filter(skill => skill.id !== id);
    });
  }

  // --- THE NEW CODE TO EDIT A SKILL ---
  editSkill(skill: Skill) {
    if (!skill.id) return;

    // We use a simple browser popup to ask for the new name
    const newName = prompt("Enter the updated skill name:", skill.skill_name);
    
    // If they typed a new name and didn't just click 'Cancel'
    if (newName && newName !== skill.skill_name) {
      const updatedOrder = { skill_name: newName };

      // Tell the waiter to update it in the Go database
      this.skillService.updateSkill(skill.id, updatedOrder).subscribe(() => {
        // Once successful, update the word on the screen instantly!
        skill.skill_name = newName;
      });
    }
  }
}