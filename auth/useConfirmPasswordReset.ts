import {
  Auth,
  AuthError,
  confirmPasswordReset as fbConfirmPasswordReset,
} from 'firebase/auth';
import { useCallback, useState } from 'react';

export type ConfirmPasswordResetHook = [
  (oobCode: string, newPassword: string) => Promise<boolean>,
  boolean,
  AuthError | Error | undefined
];

export default (auth: Auth): ConfirmPasswordResetHook => {
  const [error, setError] = useState<AuthError>();
  const [loading, setLoading] = useState<boolean>(false);

  const sendPasswordResetEmail = useCallback(
    async (oobCode: string, newPassword: string) => {
      setLoading(true);
      setError(undefined);
      try {
        await fbConfirmPasswordReset(auth, oobCode, newPassword);
        return true;
      } catch (err) {
        setError(err as AuthError);
        return false;
      } finally {
        setLoading(false);
      }
    },
    [auth]
  );

  return [sendPasswordResetEmail, loading, error];
};
