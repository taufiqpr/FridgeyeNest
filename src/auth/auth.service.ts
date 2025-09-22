import { Injectable } from '@nestjs/common';
    import { JwtService } from '@nestjs/jwt';
    import { RegisterUseCase } from './use-cases/register.use-case';
    import { LoginUseCase } from './use-cases/login.use-case';
    import { AuthPresenter } from './presenters/auth.presenter';
    import { GetProfileUseCase } from './use-cases/get-profile.use-case';
    import { UpdateProfileUseCase } from './use-cases/update-profile.use-case';
    import { DeleteProfileUseCase } from './use-cases/delete-profile.use-case';

    @Injectable()
    export class AuthService {
        constructor(
            private readonly jwt: JwtService,
            private readonly registerUseCase: RegisterUseCase,
            private readonly loginUseCase: LoginUseCase,
            private readonly getProfileUseCase: GetProfileUseCase,
            private readonly updateProfileUseCase: UpdateProfileUseCase,
            private readonly deleteProfileUseCase: DeleteProfileUseCase,
        ) {}

        async register(email: string, username: string, password: string) {
            const user = await this.registerUseCase.execute({ email, username, password });
            return AuthPresenter.presentRegistration(user);
        }

        async login(email: string, password: string) {
            const user = await this.loginUseCase.execute({ email, password });
            const token = await this.jwt.signAsync({ sub: user.id, email: user.email, username: user.username }, { expiresIn: '30m' });
            return AuthPresenter.presentLogin(user, token);
        }

        async getProfile(userId: number) {
            return this.getProfileUseCase.execute({ userId });
        }

        async updateProfile(userId: number, update: { email?: string; username?: string }) {
            return this.updateProfileUseCase.execute({ userId, ...update });
        }

        async deleteProfile(userId: number) {
            await this.deleteProfileUseCase.execute({ userId });
            return { message: 'Akun berhasil dihapus' };
        }
    }