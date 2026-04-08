const footerLinks = ["Конструктор", "Материалы", "Замер", "Гарантия"];

export function Footer() {
  return (
    <footer
      className="border-t border-line bg-ink px-4 py-10 text-white sm:px-6 lg:px-8"
      id="contacts"
    >
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <div className="mb-4 flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-md bg-white text-sm font-semibold text-ink">
              ФК
            </span>
            <span className="text-lg font-semibold">ФинКровля</span>
          </div>
          <p className="max-w-md text-sm leading-6 text-white/70">
            Кровельные решения для частных домов: подбор материала, расчет и
            монтаж с понятной сметой.
          </p>
        </div>

        <div className="space-y-3 text-sm text-white/70">
          <p className="font-semibold text-white">Контакты</p>
          <a className="block transition hover:text-white" href="tel:+74951234567">
            +7 495 123-45-67
          </a>
          <a
            className="block transition hover:text-white"
            href="mailto:info@finkrovlya.ru"
          >
            info@finkrovlya.ru
          </a>
          <p>Москва, ул. Архитектурная, 14</p>
        </div>

        <div className="space-y-3 text-sm text-white/70">
          <p className="font-semibold text-white">Разделы</p>
          {footerLinks.map((link) => (
            <a
              className="block transition hover:text-white"
              href={link === "Конструктор" ? "#constructor" : "#materials"}
              key={link}
            >
              {link}
            </a>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 ФинКровля. Все права защищены.</p>
        <p>Политика конфиденциальности</p>
      </div>
    </footer>
  );
}
