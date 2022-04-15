import { Body, Controller, Post } from '@nestjs/common';
import { AdminService } from './admin.service';
import { Admin } from './entities/admin.entity';

@Controller('admin')
export class AdminController {

    constructor(
        private adminService: AdminService
    ) {}

    @Post('login')
    async login(@Body() admin : Admin) {
        return this.adminService.login(admin);
    }
}
