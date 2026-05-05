import { Component, OnInit } from '@angular/core';
import { SkillService, Skill } from '../../services/skill.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  skillsList: Skill[] = [];

  // Bring in the waiter!
  constructor(private skillService: SkillService) {}

  // Fetch data when the page loads
  ngOnInit() {
    this.skillService.getSkills().subscribe((data) => {
      this.skillsList = data;
    });
  }

  addNewSkill(newSkillName: string) {
    if (!newSkillName) return; 
    const newSkillOrder: Skill = { skill_name: newSkillName };
    this.skillService.addSkill(newSkillOrder).subscribe((savedSkill) => {
      this.skillsList.push(savedSkill);
    });
  }

  deleteSkill(id: number | undefined) {
    if (!id) return;
    this.skillService.deleteSkill(id).subscribe(() => {
      this.skillsList = this.skillsList.filter(skill => skill.id !== id);
    });
  }

  editSkill(skill: Skill) {
    if (!skill.id) return;
    const newName = prompt("Enter the updated skill name:", skill.skill_name);
    if (newName && newName !== skill.skill_name) {
      const updatedOrder = { skill_name: newName };
      this.skillService.updateSkill(skill.id, updatedOrder).subscribe(() => {
        skill.skill_name = newName;
      });
    }
  }
}