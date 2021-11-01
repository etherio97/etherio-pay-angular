import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { BarcodeFormat } from "@zxing/library";

@Component({
  selector: "app-scan",
  templateUrl: "./scan.component.html",
})
export class ScanComponent implements OnInit {
  allowed = false;

  availableDevices: MediaDeviceInfo[] = [];
  deviceCurrent?: MediaDeviceInfo;
  deviceSelected = "";

  formatsEnabled: BarcodeFormat[] = [
    BarcodeFormat.CODE_128,
    BarcodeFormat.DATA_MATRIX,
    BarcodeFormat.EAN_13,
    BarcodeFormat.QR_CODE,
  ];

  hasDevices = false;
  hasPermission = false;
  tryHarder = false;

  qrResultString = "";

  constructor(private router: Router) {}

  ngOnInit(): void {}

  onCamerasFound(devices: MediaDeviceInfo[]): void {
    this.availableDevices = devices;
    this.hasDevices = Boolean(devices && devices.length);
  }

  onCodeResult(resultString: string) {
    this.qrResultString = resultString;
    try {
      new URL(this.qrResultString);
      window.location.href = this.qrResultString;
    } catch (e) {
      alert("[ERROR] Unexcepted QR Code");
    }
  }

  onDeviceSelectChange(selected: string) {
    const selectedStr = selected || "";
    if (this.deviceSelected === selectedStr) {
      return;
    }
    this.deviceSelected = selectedStr;
    const device = this.availableDevices.find((x) => x.deviceId === selected);
    this.deviceCurrent = device || undefined;
  }

  onDeviceChange(device: MediaDeviceInfo) {
    const selectedStr = device?.deviceId || "";
    if (this.deviceSelected === selectedStr) {
      return;
    }
    this.deviceSelected = selectedStr;
    this.deviceCurrent = device || undefined;
  }

  onHasPermission(has: boolean) {
    this.hasPermission = has;
  }
}
