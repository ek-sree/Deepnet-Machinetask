export default class AuthUseCase {
    checkAdmin: (email: string, password: string) => Promise<{
        status: number;
        message: string;
        token?: string;
    }>;
}
