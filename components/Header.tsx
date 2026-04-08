const navItems = [
  { label: "Конструктор", href: "#constructor" },
  { label: "Материалы", href: "#materials" },
  { label: "Контакты", href: "#contacts" }
];

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/60 bg-frost/80 backdrop-blur-2xl">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:h-20 lg:px-8">
        <a href="#" className="flex items-center gap-3" aria-label="ФинКровля">
          <span className="flex h-10 w-10 items-center justify-center rounded-md bg-ink text-sm font-semibold text-white shadow-soft ring-1 ring-white/20">
            ФК
          </span>
          <span>
            <span className="block text-base font-semibold leading-none text-ink sm:text-lg">
              ФинКровля
            </span>
            <span className="mt-1 hidden text-[11px] font-medium uppercase text-slate sm:block">
              Кровельный инжиниринг
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 text-sm font-medium text-slate lg:flex">
          {navItems.map((item) => (
            <a
              className="transition hover:text-ink"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            className="hidden text-sm font-semibold text-ink transition hover:text-copper sm:inline"
            href="tel:+74951234567"
          >
            +7 495 123-45-67
          </a>
          <a
            className="rounded-md bg-ink px-4 py-2.5 text-sm font-semibold text-white shadow-soft transition duration-300 hover:-translate-y-0.5 hover:bg-graphite hover:shadow-premium"
            href="#constructor"
          >
            <span className="sm:hidden">Расчет</span>
            <span className="hidden sm:inline">Рассчитать стоимость</span>
          </a>
        </div>
      </div>
    </header>
  );
}
