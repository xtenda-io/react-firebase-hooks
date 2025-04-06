import { Auth, AuthError } from 'firebase/auth';
export declare type ConfirmPasswordResetHook = [
    (oobCode: string, newPassword: string) => Promise<boolean>,
    boolean,
    AuthError | Error | undefined
];
declare const _default: (auth: Auth) => ConfirmPasswordResetHook;
export default _default;
