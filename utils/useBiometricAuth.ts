import { useState, useCallback } from 'react';
import NativeBiometricAuth, { BiometricAuthenticationError } from '../specs/NativeBiometricAuth';

export interface BiometricCapabilities {
  isAvailable: boolean;
  isEnabled: boolean;
  isEnrolled: boolean;
}

export { BiometricAuthenticationError };

export const useBiometricAuth = () => {
  const [isLoading, setIsLoading] = useState(false);

  const checkBiometricCapabilities = useCallback(async (): Promise<BiometricCapabilities> => {
    try {
      const [isAvailable, isEnabled, isEnrolled] = await Promise.all([
        NativeBiometricAuth.isBiometricAvailable(),
        NativeBiometricAuth.isBiometricEnabled(),
        NativeBiometricAuth.isBiometricEnrolled(),
      ]);

      return {
        isAvailable,
        isEnabled,
        isEnrolled,
      };
    } catch (error) {
      console.error('Error checking biometric capabilities:', error);
      return {
        isAvailable: false,
        isEnabled: false,
        isEnrolled: false,
      };
    }
  }, []);

  const authenticate = useCallback(
    (
      reason: string = 'Please authenticate to continue',
      onSuccess: () => void,
      onFailure: (error: BiometricAuthenticationError) => void
    ) => {
      setIsLoading(true);
      
      checkBiometricCapabilities().then((capabilities) => {
        if (!capabilities.isAvailable) {
          setIsLoading(false);
          onFailure({
            code: 'not_available',
            message: 'Biometric authentication is not available on this device',
          });
          return;
        }

        if (!capabilities.isEnrolled) {
          setIsLoading(false);
          onFailure({
            code: 'not_enrolled',
            message: 'No biometric credentials are enrolled on this device',
          });
          return;
        }

        NativeBiometricAuth.authenticate(
          reason,
          () => {
            setIsLoading(false);
            onSuccess();
          },
          (error: any) => {
            setIsLoading(false);
            onFailure(error);
          }
        );
      }).catch((error) => {
        setIsLoading(false);
        onFailure({
          code: 'unknown',
          message: error instanceof Error ? error.message : 'Unknown authentication error',
        });
      });
    },
    [checkBiometricCapabilities]
  );


  const isBiometricAvailable = useCallback(async (): Promise<boolean> => {
    try {
      return await NativeBiometricAuth.isBiometricAvailable();
    } catch (error) {
      console.error('Error checking biometric availability:', error);
      return false;
    }
  }, []);

  const isBiometricEnabled = useCallback(async (): Promise<boolean> => {
    try {
      return await NativeBiometricAuth.isBiometricEnabled();
    } catch (error) {
      console.error('Error checking if biometric is enabled:', error);
      return false;
    }
  }, []);

  const isBiometricEnrolled = useCallback(async (): Promise<boolean> => {
    try {
      return await NativeBiometricAuth.isBiometricEnrolled();
    } catch (error) {
      console.error('Error checking if biometric is enrolled:', error);
      return false;
    }
  }, []);

  return {
    authenticate,
    checkBiometricCapabilities,
    isBiometricAvailable,
    isBiometricEnabled,
    isBiometricEnrolled,
    isLoading,
  };
};

export default useBiometricAuth;
