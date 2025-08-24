//
//  RCTNativeBiometricAuth.mm
//  superheroeassembler
//
//  Created by Esteban Donis on 24/08/25.
//

#import "RCTNativeBiometricAuth.h"
#import <React/RCTLog.h>

#ifdef RCT_NEW_ARCH_ENABLED
#import <NativeBiometricAuthSpec/NativeBiometricAuthSpec.h>
#endif

@implementation RCTNativeBiometricAuth

RCT_EXPORT_MODULE(NativeBiometricAuth)

+ (BOOL)requiresMainQueueSetup {
    return NO;
}

#ifdef RCT_NEW_ARCH_ENABLED
- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:(const facebook::react::ObjCTurboModule::InitParams &)params {
    return std::make_shared<facebook::react::NativeBiometricAuthSpecJSI>(params);
}
#endif

#pragma mark - Biometric Methods

RCT_EXPORT_METHOD(isBiometricAvailable:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
    LAContext *context = [[LAContext alloc] init];
    NSError *error = nil;
    
    BOOL canEvaluate = [context canEvaluatePolicy:LAPolicyDeviceOwnerAuthenticationWithBiometrics error:&error];
    resolve(@(canEvaluate));
}

RCT_EXPORT_METHOD(isBiometricEnabled:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
    LAContext *context = [[LAContext alloc] init];
    NSError *error = nil;
    
    BOOL canEvaluate = [context canEvaluatePolicy:LAPolicyDeviceOwnerAuthenticationWithBiometrics error:&error];
    resolve(@(canEvaluate && error == nil));
}

RCT_EXPORT_METHOD(isBiometricEnrolled:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
    LAContext *context = [[LAContext alloc] init];
    NSError *error = nil;
    
    BOOL canEvaluate = [context canEvaluatePolicy:LAPolicyDeviceOwnerAuthenticationWithBiometrics error:&error];
    
    if (canEvaluate) {
        resolve(@YES);
    } else if (error.code == LAErrorBiometryNotEnrolled) {
        resolve(@NO);
    } else {
        resolve(@NO);
    }
}

RCT_EXPORT_METHOD(authenticate:(NSString *)reason
                  onSuccess:(RCTResponseSenderBlock)onSuccess
                  onFailure:(RCTResponseSenderBlock)onFailure) {
    LAContext *context = [[LAContext alloc] init];
    
    // Check if biometric authentication is available
    NSError *error = nil;
    if (![context canEvaluatePolicy:LAPolicyDeviceOwnerAuthenticationWithBiometrics error:&error]) {
        NSString *errorCode = @"not_available";
        NSString *errorMessage = @"Biometric authentication not available";
        
        if (error) {
            switch (error.code) {
                case LAErrorBiometryNotAvailable:
                    errorCode = @"not_available";
                    errorMessage = @"Biometric authentication not available";
                    break;
                case LAErrorBiometryNotEnrolled:
                    errorCode = @"not_enrolled";
                    errorMessage = @"No biometric credentials enrolled";
                    break;
                case LAErrorPasscodeNotSet:
                    errorCode = @"not_available";
                    errorMessage = @"Device passcode not set";
                    break;
                default:
                    errorCode = @"unknown";
                    errorMessage = [NSString stringWithFormat:@"Biometric authentication error: %@", error.localizedDescription];
                    break;
            }
        }
        
        onFailure(@[@{@"code": errorCode, @"message": errorMessage}]);
        return;
    }
    
    // Perform biometric authentication
    [context evaluatePolicy:LAPolicyDeviceOwnerAuthenticationWithBiometrics
            localizedReason:reason
                      reply:^(BOOL success, NSError * _Nullable error) {
        dispatch_async(dispatch_get_main_queue(), ^{
            if (success) {
                onSuccess(@[]);
            } else {
                NSString *errorCode = @"authentication_failed";
                NSString *errorMessage = @"Authentication failed";
                
                if (error) {
                    switch (error.code) {
                        case LAErrorUserCancel:
                            errorCode = @"user_cancel";
                            errorMessage = @"User cancelled authentication";
                            break;
                        case LAErrorUserFallback:
                            errorCode = @"fallback";
                            errorMessage = @"User chose to use fallback";
                            break;
                        case LAErrorSystemCancel:
                            errorCode = @"system_cancel";
                            errorMessage = @"System cancelled authentication";
                            break;
                        case LAErrorPasscodeNotSet:
                            errorCode = @"not_available";
                            errorMessage = @"Passcode not set";
                            break;
                        case LAErrorBiometryNotAvailable:
                            errorCode = @"not_available";
                            errorMessage = @"Biometry not available";
                            break;
                        case LAErrorBiometryNotEnrolled:
                            errorCode = @"not_enrolled";
                            errorMessage = @"Biometry not enrolled";
                            break;
                        case LAErrorBiometryLockout:
                            errorCode = @"lockout";
                            errorMessage = @"Biometry locked out";
                            break;
                        case LAErrorAuthenticationFailed:
                            errorCode = @"authentication_failed";
                            errorMessage = @"Authentication failed";
                            break;
                        default:
                            errorCode = @"unknown";
                            errorMessage = [NSString stringWithFormat:@"Authentication failed: %@", error.localizedDescription];
                            break;
                    }
                }
                
                onFailure(@[@{@"code": errorCode, @"message": errorMessage}]);
            }
        });
    }];
}

@end
