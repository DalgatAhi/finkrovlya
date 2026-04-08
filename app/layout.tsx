import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "ФинКровля | 3D-конфигуратор премиальной кровли",
  description:
    "Интерактивный 3D-конфигуратор ФинКровля: выберите форму, материал и цвет крыши для частного дома и получите предварительный расчет."
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
