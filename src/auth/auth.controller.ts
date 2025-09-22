import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('register')
    register(@Body() registerDto: RegisterDto) {
        return this.authService.register(
            registerDto.email,
            registerDto.username,
            registerDto.password
        );
    }

    @Post('login')
    login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto.email, loginDto.password);
    }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req: any) {
    const userId = req.user?.sub;
    return this.authService.getProfile(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile/:id')
  getProfileById(@Param('id', ParseIntPipe) id: number) {
    return this.authService.getProfile(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('profile/:id')
  updateProfile(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateProfileDto) {
    return this.authService.updateProfile(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('profile/:id')
  deleteProfile(@Param('id', ParseIntPipe) id: number) {
    return this.authService.deleteProfile(id);
  }

  // By-id endpoints (still protected by JWT)
  @UseGuards(JwtAuthGuard)
  @Get('users/:id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.authService.getProfile(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('users/:id')
  updateUserById(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateProfileDto,
  ) {
    return this.authService.updateProfile(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('users/:id')
  deleteUserById(@Param('id', ParseIntPipe) id: number) {
    return this.authService.deleteProfile(id);
  }
}
