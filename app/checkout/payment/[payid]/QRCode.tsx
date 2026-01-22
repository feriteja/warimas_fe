"use client";

import { QRCodeSVG } from "qrcode.react";

export function PaymentQRCode({ value }: { value: string }) {
  if (!value) return null;

  return (
    <div className="bg-white p-4 rounded-lg inline-block shadow-md">
      <QRCodeSVG value={value} size={180} level="H" />
    </div>
  );
}
