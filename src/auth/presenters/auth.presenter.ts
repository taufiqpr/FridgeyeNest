export class AuthPresenter {
  static presentRegistration(data: { id: number; email: string; username: string }) {
    return {
      message: 'Registrasi berhasil',
      userId: data.id,
      email: data.email,
      username: data.username,
    };
  }

  static presentLogin(data: { id: number; email: string; username: string }, token: string) {
    return {
      message: 'Login berhasil',
      token,
      user: {
        id: data.id,
        email: data.email,
        username: data.username,
      },
    };
  }
}


