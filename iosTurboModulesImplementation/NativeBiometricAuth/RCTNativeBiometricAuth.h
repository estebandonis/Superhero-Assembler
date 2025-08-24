//
//  RCTNativeBiometricAuth.h
//  superheroeassembler
//
//  Created by Esteban Donis on 24/08/25.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
#import <LocalAuthentication/LocalAuthentication.h>

#ifdef RCT_NEW_ARCH_ENABLED
#import <NativeBiometricAuthSpec/NativeBiometricAuthSpec.h>
@interface RCTNativeBiometricAuth : NSObject <NativeBiometricAuthSpec>
#else
@interface RCTNativeBiometricAuth : NSObject <RCTBridgeModule>
#endif

@end
