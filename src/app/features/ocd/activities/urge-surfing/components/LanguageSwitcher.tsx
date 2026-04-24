import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { SUPPORTED_LANGUAGES } from '../i18n';
import { Globe } from 'lucide-react';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  // On mount, check if ?lang= is in the URL and apply it
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const langParam = params.get('lang');
    if (langParam) {
      const matched = SUPPORTED_LANGUAGES.find(
        (l) => l.code.toLowerCase() === langParam.toLowerCase()
      );
      if (matched) {
        i18n.changeLanguage(matched.code);
      }
    }
  }, [i18n]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const code = e.target.value;
    i18n.changeLanguage(code);
    // Reflect the language choice in the URL without navigating
    const url = new URL(window.location.href);
    url.searchParams.set('lang', code);
    window.history.replaceState({}, '', url.toString());
  };

  const isRTL = ['ar'].includes(i18n.language);

  return (
    <div
      className="flex items-center gap-1.5"
      dir="ltr"
      style={{ direction: 'ltr' }}
    >
      <Globe size={14} className="text-muted-foreground flex-shrink-0" />
      <select
        value={i18n.language}
        onChange={handleChange}
        className="text-[12px] text-foreground bg-transparent border-none outline-none cursor-pointer hover:text-primary transition-colors pr-1"
        aria-label="Select language"
        id="language-switcher"
      >
        {SUPPORTED_LANGUAGES.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.nativeName}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSwitcher;

