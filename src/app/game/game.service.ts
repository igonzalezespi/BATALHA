import { Injectable } from "@angular/core";
import entities from './entities.json';
import { Entity } from "./models/entity.interface";
import { Team } from "./models/team.interface";

@Injectable()
export class GameService {
  constructor(
  ) {}

  getRandomEntity(): Entity {
    const randomIndex = Math.floor(Math.random() * entities.length);
    return entities[randomIndex];
  }

  getRandomNumber(): number {
    const min = 1;
    const max = 100;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  calculatePower(entity: Entity): number {
    const strengthFactor = entity.strength * 1.2;
    const dexterityFactor = entity.dexterity * 1.2;
    const intelligenceFactor = entity.intelligence * 1.2;
    const supernaturalFactor = entity.supernatural * 1.5;
    const defenseFactor = entity.defense;
    const speedFactor = entity.speed;
    const hpFactor = entity.hp;

    const totalPower = strengthFactor + dexterityFactor + intelligenceFactor + supernaturalFactor + defenseFactor + speedFactor + hpFactor;
    return totalPower;
  }

  determineWinner(team1: Team, team2: Team): number {
    const power1 = this.calculatePower(team1.entity);
    const power2 = this.calculatePower(team2.entity);

    if (power1 * team1.number > power2 * team2.number) {
      return 0;
    } else {
      return 1;
    }
  }
}
