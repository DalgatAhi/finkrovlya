type OptionGroupProps<T extends string> = {
  title: string;
  options: {
    id: T;
    name: string;
    description?: string;
    value?: string;
  }[];
  activeId: T;
  onChange: (id: T) => void;
  variant?: "card" | "swatch";
};

export function OptionGroup<T extends string>({
  title,
  options,
  activeId,
  onChange,
  variant = "card"
}: OptionGroupProps<T>) {
  return (
    <fieldset className="space-y-3">
      <legend className="text-xs font-semibold uppercase text-slate">{title}</legend>

      <div
        className={
          variant === "swatch"
            ? "grid grid-cols-2 gap-2 sm:grid-cols-3"
            : "grid gap-2"
        }
      >
        {options.map((option) => {
          const isActive = option.id === activeId;

          return (
            <button
              aria-pressed={isActive}
              className={[
                "group rounded-md border bg-white/80 text-left transition duration-300 backdrop-blur",
                "hover:-translate-y-0.5 hover:border-ink/25 hover:bg-white hover:shadow-soft",
                isActive
                  ? "border-ink bg-white shadow-soft ring-1 ring-ink/5"
                  : "border-line shadow-none"
              ].join(" ")}
              key={option.id}
              onClick={() => onChange(option.id)}
              type="button"
            >
              {variant === "swatch" ? (
                <span className="flex items-center gap-3 px-3 py-3">
                  <span
                    className={[
                      "h-7 w-7 rounded-full border border-black/10 shadow-inner transition",
                      isActive ? "ring-2 ring-ink ring-offset-2" : "ring-0"
                    ].join(" ")}
                    style={{ backgroundColor: option.value }}
                  />
                  <span className="text-sm font-medium text-ink">
                    {option.name}
                  </span>
                </span>
              ) : (
                <span className="block px-4 py-3">
                  <span className="flex items-center justify-between gap-3">
                    <span className="text-sm font-semibold text-ink">
                      {option.name}
                    </span>
                    <span
                      className={[
                        "h-2 w-2 rounded-full transition",
                        isActive ? "bg-copper" : "bg-line group-hover:bg-slate"
                      ].join(" ")}
                    />
                  </span>
                  {option.description ? (
                    <span className="mt-1 block text-xs leading-5 text-slate">
                      {option.description}
                    </span>
                  ) : null}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
