import { CameraDevice, CodeScanner } from "react-native-vision-camera";

export type BarcodeScannerProps = {
    CodeScanner: CodeScanner;
    CameraDevice: CameraDevice;
    IsActive: boolean;
};
