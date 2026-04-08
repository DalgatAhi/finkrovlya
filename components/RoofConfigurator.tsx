"use client";

import { useMemo, useState } from "react";
import {
  roofColors,
  roofMaterials,
  roofShapes
} from "@/data/roof-options";
import type { RoofColorId, RoofMaterialId, RoofShapeId } from "@/types/roof";
import { OptionGroup } from "@/components/OptionGroup";
import { RoofScene } from "@/components/RoofScene";

export function RoofConfigurator() {
  const [materialId, setMaterialId] = useState<RoofMaterialId>("faltznastil");
  const [colorId, setColorId] = useState<RoofColorId>("graphite");
  const [shapeId, setShapeId] = useState<RoofShapeId>("gable");

  const material = useMemo(
    () => roofMaterials.find((item) => item.id === materialId) ?? roofMaterials[0],
    [materialId]
  );
  const color = useMemo(
    () => roofColors.find((item) => item.id === colorId) ?? roofColors[0],
    [colorId]
  );
  const shape = useMemo(
    () => roofShapes.find((item) => item.id === shapeId) ?? roofShapes[0],
    [shapeId]
  );

  return (
    <>
      <section
        className="relative px-4 pb-16 pt-24 sm:px-6 lg:px-8 lg:pb-24 lg:pt-28"
        id="constructor"
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[52rem] bg-[radial-gradient(circle_at_55%_20%,rgba(165,95,63,0.14),rgba(165,95,63,0)_24rem),radial-gradient(circle_at_80%_44%,rgba(17,20,23,0.12),rgba(17,20,23,0)_30rem)]" />
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(360px,0.45fr)] lg:items-end">
            <div>
              <p className="mb-4 inline-flex rounded-md border border-copper/30 bg-white/80 px-3 py-1.5 text-xs font-semibold uppercase text-copper shadow-soft backdrop-blur">
                3D-конфигуратор кровли
              </p>
              <h1 className="max-w-4xl text-4xl font-semibold leading-tight text-ink sm:text-5xl lg:text-6xl">
                Архитектурный образ крыши в реальном времени
              </h1>
            </div>
            <div className="space-y-5 lg:justify-self-end">
              <p className="max-w-xl text-base leading-7 text-slate">
                Вращайте модель, меняйте форму, материал и оттенок. Финальную
                спецификацию уточним по размерам дома и подготовим расчет.
              </p>
              <div className="grid grid-cols-3 gap-2 text-center">
                {["3 формы", "6 цветов", "3 материала"].map((item) => (
                  <span
                    className="rounded-md border border-white bg-white/80 px-3 py-2 text-xs font-semibold text-ink shadow-soft backdrop-blur"
                    key={item}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_390px] lg:items-start xl:grid-cols-[minmax(0,1fr)_430px]">
            <RoofScene color={color} material={material.id} shape={shape.id} />

            <aside className="overflow-hidden rounded-md border border-white/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.92)_0%,rgba(238,244,247,0.86)_100%)] shadow-[0_28px_90px_rgba(17,20,23,0.18)] backdrop-blur-2xl lg:sticky lg:top-24">
              <div className="border-b border-white/70 bg-ink px-4 py-5 text-white sm:px-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase text-white/55">
                      Спецификация
                    </p>
                    <h2 className="mt-1 text-2xl font-semibold">
                      {shape.name} крыша
                    </h2>
                  </div>
                  <span className="rounded-md border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white">
                    3 шага
                  </span>
                </div>
                <p className="mt-4 text-sm leading-6 text-white/70">
                  Настройте внешний вид кровли перед расчетом стоимости.
                </p>
              </div>

              <div className="p-4 sm:p-6">
                <div className="mb-6 flex items-start justify-between gap-4 border-b border-line pb-5">
                  <div>
                    <p className="text-xs font-semibold uppercase text-slate">
                      Текущий выбор
                    </p>
                    <h2 className="mt-1 text-2xl font-semibold text-ink">
                      {material.name}
                    </h2>
                  </div>
                  <span className="rounded-md bg-mist px-3 py-1.5 text-xs font-semibold text-ink shadow-soft">
                    {color.name}
                  </span>
                </div>

                <div className="space-y-6">
                  <OptionGroup
                    activeId={materialId}
                    onChange={setMaterialId}
                    options={roofMaterials}
                    title="Тип кровли"
                  />
                  <OptionGroup
                    activeId={colorId}
                    onChange={setColorId}
                    options={roofColors}
                    title="Цвет"
                    variant="swatch"
                  />
                  <OptionGroup
                    activeId={shapeId}
                    onChange={setShapeId}
                    options={roofShapes}
                    title="Форма крыши"
                  />
                </div>

                <div className="mt-6 rounded-md border border-white bg-[linear-gradient(145deg,#ffffff_0%,#edf3f6_100%)] p-4 shadow-soft">
                  <p className="text-xs font-semibold uppercase text-slate">
                    Выбранная конфигурация
                  </p>
                  <p className="mt-2 text-base font-semibold text-ink">
                    {material.name} · {color.name.toLowerCase()}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate">
                    {material.note} {shape.description}
                  </p>
                  {material.specs ? (
                    <div className="mt-4 grid gap-2 text-xs text-slate sm:grid-cols-2">
                      {material.specs.map((spec) => (
                        <span className="rounded-md border border-line bg-white/70 px-3 py-2" key={spec}>
                          {spec}
                        </span>
                      ))}
                    </div>
                  ) : null}
                  {material.advantages ? (
                    <div className="mt-4 space-y-2 text-xs leading-5 text-slate">
                      <p><span className="font-semibold text-ink">Преимущества:</span> {material.advantages.join(", ")}</p>
                      <p><span className="font-semibold text-ink">Применение:</span> {material.applications?.join(", ")}</p>
                      <p><span className="font-semibold text-ink">Уход:</span> {material.care?.join("; ")}</p>
                    </div>
                  ) : null}
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  <a
                    className="rounded-md bg-ink px-5 py-3 text-center text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-graphite hover:shadow-premium"
                    href="mailto:info@finkrovlya.ru?subject=Расчет кровли"
                  >
                    Получить расчет
                  </a>
                  <a
                    className="rounded-md border border-ink/20 bg-white px-5 py-3 text-center text-sm font-semibold text-ink transition hover:-translate-y-0.5 hover:border-ink hover:shadow-soft"
                    href="tel:+74951234567"
                  >
                    Оставить заявку
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24" id="materials">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 grid gap-4 md:grid-cols-[1fr_0.6fr] md:items-end">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase text-copper">
                Материалы
              </p>
              <h2 className="mt-2 text-3xl font-semibold text-ink sm:text-4xl">
                Поверхности с разным архитектурным характером
              </h2>
            </div>
            <p className="text-sm leading-6 text-slate">
              В 3D-сцене материал передается ритмом профиля, отражением и
              плотностью ребер на поверхности крыши.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {roofMaterials.map((item) => (
              <article
                className="rounded-md border border-white bg-white/80 p-6 shadow-soft transition duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-premium"
                key={item.id}
              >
                <span className="mb-7 block h-1 w-12 rounded-full bg-copper" />
                <p className="text-lg font-semibold text-ink">{item.name}</p>
                <p className="mt-3 text-sm leading-6 text-slate">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
