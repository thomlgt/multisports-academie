import { Body, Controller, Post } from '@nestjs/common';
import { CaptainService } from './captain.service';
import { Captain } from './models/captain.schema';

@Controller('captains')
export class CaptainController {

    constructor(private captainServicer: CaptainService) { }

    @Post()
    async create(@Body() captain: Captain) {
        return this.captainServicer.create(captain);
    }
}
