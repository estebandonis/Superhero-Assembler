import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useBiometricAuth, BiometricAuthenticationError } from '../utils/useBiometricAuth';

export const BiometricAuthExample: React.FC = () => {
  const [authStatus, setAuthStatus] = useState<'idle' | 'success' | 'failed'>('idle');
  const { authenticate, isLoading } = useBiometricAuth();

  const handleAuthenticate = () => {
    authenticate(
      'Please authenticate to access secure content',
      () => {
        setAuthStatus('success');
        Alert.alert('Success', 'Authentication successful!');
      },
      (error: BiometricAuthenticationError) => {
        setAuthStatus('failed');
        console.log('Authentication failed:', error.code, error.message);
        
        switch (error.code) {
          case 'user_cancel':
            Alert.alert('Cancelled', 'Authentication was cancelled');
            break;
          case 'not_enrolled':
            Alert.alert('Setup Required', 'Please set up biometric authentication in Settings');
            break;
          case 'not_available':
            Alert.alert('Not Available', 'Biometric authentication is not available on this device');
            break;
          case 'lockout':
            Alert.alert('Locked Out', 'Too many failed attempts. Please try again later.');
            break;
          default:
            Alert.alert('Error', error.message);
        }
      }
    );
  };

  const resetStatus = () => {
    setAuthStatus('idle');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Biometric Authentication</Text>
      
      <View style={styles.statusContainer}>
        <Text style={styles.statusLabel}>Status:</Text>
        <Text style={[
          styles.statusValue,
          authStatus === 'success' && styles.success,
          authStatus === 'failed' && styles.failed,
        ]}>
          {authStatus === 'idle' && 'Ready'}
          {authStatus === 'success' && 'Authenticated'}
          {authStatus === 'failed' && 'Authentication Failed'}
          {isLoading && 'Authenticating...'}
        </Text>
      </View>

      <TouchableOpacity
        style={[styles.button, isLoading && styles.buttonDisabled]}
        onPress={handleAuthenticate}
        disabled={isLoading}
      >
        <Text style={styles.buttonText}>
          {isLoading ? 'Authenticating...' : 'Authenticate'}
        </Text>
      </TouchableOpacity>

      {authStatus !== 'idle' && (
        <TouchableOpacity style={styles.resetButton} onPress={resetStatus}>
          <Text style={styles.resetButtonText}>Reset</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  statusLabel: {
    fontSize: 16,
    color: '#666',
    marginRight: 10,
  },
  statusValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  success: {
    color: '#4CAF50',
  },
  failed: {
    color: '#F44336',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  buttonDisabled: {
    backgroundColor: '#CCCCCC',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  resetButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  resetButtonText: {
    color: '#007AFF',
    fontSize: 14,
  },
});

export default BiometricAuthExample;
