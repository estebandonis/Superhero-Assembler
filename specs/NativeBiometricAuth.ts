import type { TurboModule } from "react-native";
import { TurboModuleRegistry, NativeModules } from "react-native";

export type BiometryKind = "FaceID" | "TouchID" | "None";

export type BiometricAuthenticationError = {
  code:
    | "not_available"
    | "not_enrolled"
    | "lockout"
    | "user_cancel"
    | "system_cancel"
    | "fallback"
    | "authentication_failed"
    | "unknown";
  message: string;
  biometry?: BiometryKind;
  domain?: string;
  nativeCode?: number;
};

export interface Spec extends TurboModule {
  isBiometricAvailable(): Promise<boolean>;
  isBiometricEnabled(): Promise<boolean>;
  isBiometricEnrolled(): Promise<boolean>;
  authenticate(
    reason: string,
    onSuccess: () => void,
    onFailure: (error: BiometricAuthenticationError) => void
  ): void;
}

const NativeBiometricAuth = TurboModuleRegistry.getEnforcing<Spec>("NativeBiometricAuth") || NativeModules.NativeBiometricAuth;

export default NativeBiometricAuth;
