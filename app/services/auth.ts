import * as LocalAuthentication from "expo-local-authentication";

// User biometric authentication 
export const authenticateUser = async (): Promise<boolean> => {

    try {
        // Check if face or fingerprint scanner is available on device
        const isBiometricAvailable = LocalAuthentication.hasHardwareAsync();

        // Perfom hardware checking
        if(!isBiometricAvailable) {
            console.error("Biometric scanner is not available");
            return false;
        }

        // Check if device has saved biometrics data
        const isBiometricSaved = LocalAuthentication.isEnrolledAsync();

        // Perform biometric data checking
        if(!isBiometricSaved) {
            console.error("Biometric data is not available");
            return false;
        }

        // Check supported biometrics type (debugging)
        const supportedBiometric = await LocalAuthentication.supportedAuthenticationTypesAsync();
        console.log("Supported Biometrics: ", supportedBiometric);

        // Perform authentication
        const result = await LocalAuthentication.authenticateAsync({
            promptMessage: "Authenticate to view",
            cancelLabel: "Cancel",
            fallbackLabel: "Enter PIN", // Fallback if biometric failed
        })

        return result.success;
    } catch (error) {
        console.error("Authentication Error", error);
        return false;
    }
}

export default authenticateUser;