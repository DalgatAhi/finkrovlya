export type RoofMaterialId = "profnastil" | "faltznastil" | "metal-tile";
export type RoofColorId =
  | "graphite"
  | "brown"
  | "burgundy"
  | "green"
  | "gray"
  | "black";
export type RoofShapeId = "gable" | "shed" | "hip";

export type RoofMaterial = {
  id: RoofMaterialId;
  name: string;
  description: string;
  note: string;
  specs?: string[];
  advantages?: string[];
  applications?: string[];
  care?: string[];
};

export type RoofColor = {
  id: RoofColorId;
  name: string;
  value: string;
  accent: string;
};

export type RoofShape = {
  id: RoofShapeId;
  name: string;
  description: string;
};
