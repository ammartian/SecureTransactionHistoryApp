import * as LocalAuthentication from "expo-local-authentication";

// User biometric authentication 
export const authenticateUser = async (): Promise<boolean> => {
    
    // check if face or fingerprint scanner is available on device
    const isBiometricAvailable = LocalAuthentication.hasHardwareAsync();

    // check if device has saved face or fingerprint data
    const isBiometricSaved = LocalAuthentication.isEnrolledAsync();

    // perform checking
    if(!isBiometricAvailable || !isBiometricSaved) {
        return false; // add message/fallback
    }

    // authenticate
    const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Authenticate to view",
        cancelLabel: "Cancel"
    });

    return result.success;
}