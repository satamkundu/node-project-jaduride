import { Injectable } from "@nestjs/common";
import { randomNumberGenerator } from "./random-number.generator";

@Injectable()
export class RandomNumberService {
    private generator = randomNumberGenerator();

    getRandomNumber(): number {
        return this.generator.next().value;
    }
}