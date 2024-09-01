import bcrypt from "bcrypt"

export interface PasswordService {
    Hashing(password: string): Promise<string>;
    Verify(passwordOriginal: string, passwordHashed: string): Promise<boolean>;
}

export class PasswordServiceImpl implements PasswordService {
    async Hashing(password: string): Promise<string> {
        return await bcrypt.hash(password, 12);
    }

    async Verify(passwordOriginal: string, passwordHashed: string): Promise<boolean> {
        return await bcrypt.compare(passwordOriginal, passwordHashed);
    }
}