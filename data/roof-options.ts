import type { RoofColor, RoofMaterial, RoofShape } from "@/types/roof";

export const roofMaterials: RoofMaterial[] = [
  {
    id: "profnastil",
    name: "Профнастил С21",
    description: "Профиль высотой 21 мм с цинковым и полимерным покрытием.",
    note: "Надежный универсальный лист для кровли, фасадов и ограждений.",
    specs: [
      "Высота профиля: 21 мм",
      "Полезная ширина: 1000 мм",
      "Толщина стали: 0,4-0,8 мм",
      "Покрытие: цинковое и полимерное",
      "Длина листа: 0,5-12 м"
    ],
    advantages: [
      "Прочность",
      "Долговечность",
      "Простота монтажа",
      "Эстетичность",
      "Универсальность"
    ],
    applications: ["Кровля", "Фасады", "Заборы", "Перегородки"],
    care: [
      "Очищать от загрязнений",
      "Следить за защитным покрытием",
      "Ремонтировать повреждения полимерного слоя"
    ]
  },
  {
    id: "faltznastil",
    name: "Фальцнастил",
    description: "Вертикальные швы и спокойная архитектурная пластика.",
    note: "Минималистичное решение с премиальным характером."
  },
  {
    id: "metal-tile",
    name: "Металлочерепица",
    description: "Классический рисунок с мягкой волной.",
    note: "Знакомая эстетика для частного дома."
  }
];

export const roofColors: RoofColor[] = [
  { id: "graphite", name: "Графит", value: "#303841", accent: "#65717d" },
  { id: "brown", name: "Коричневый", value: "#6a3d2c", accent: "#a36b4a" },
  { id: "burgundy", name: "Бордовый", value: "#742f35", accent: "#a94f58" },
  { id: "green", name: "Зеленый", value: "#355b45", accent: "#5f8b70" },
  { id: "gray", name: "Серый", value: "#7b8389", accent: "#a8b0b6" },
  { id: "black", name: "Черный", value: "#171b1f", accent: "#444b52" }
];

export const roofShapes: RoofShape[] = [
  {
    id: "gable",
    name: "Двускатная",
    description: "Симметричная форма для частных домов."
  },
  {
    id: "shed",
    name: "Односкатная",
    description: "Лаконичная геометрия с современным силуэтом."
  },
  {
    id: "hip",
    name: "Вальмовая",
    description: "Собранный объем с выразительными боковыми скатами."
  }
];
