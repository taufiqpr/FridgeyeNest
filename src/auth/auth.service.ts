    import { Injectable } from '@nestjs/common';
    import { JwtService } from '@nestjs/jwt';
    import { RegisterUseCase } from './use-cases/register.use-case';
    import { LoginUseCase } from './use-cases/login.use-case';
    import { AuthPresenter } from './presenters/auth.presenter';

    @Injectable()
    export class AuthService {
        constructor(
            private readonly jwt: JwtService,
            private readonly registerUseCase: RegisterUseCase,
            private readonly loginUseCase: LoginUseCase,
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
    }