import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkillService, Skill } from './services/skill.service';
// Add this new import!
import { RouterOutlet, RouterLink } from '@angular/router'; 

@Component({
  selector: 'app-root',
  standalone: true,
  // Plug them in here!
  imports: [CommonModule, RouterOutlet, RouterLink], 
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

}