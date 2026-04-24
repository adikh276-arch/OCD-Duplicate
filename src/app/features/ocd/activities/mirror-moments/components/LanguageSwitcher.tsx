import { useTranslation } from "react-i18next";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Globe } from "lucide-react";

const languages = [
  { code: "en", name: "English" },
  { code: "es", name: "Español" },
  { code: "fr", name: "Français" },
  { code: "pt", name: "Português" },
  { code: "de", name: "Deutsch" },
  { code: "ar", name: "العربية" },
  { code: "hi", name: "हिन्दी" },
  { code: "bn", name: "বাংলা" },
  { code: "zh", name: "简体中文" },
  { code: "ja", name: "日本語" },
  { code: "id", name: "Bahasa Indonesia" },
  { code: "tr", name: "Türkçe" },
  { code: "vi", name: "Tiếng Việt" },
  { code: "ko", name: "한국어" },
  { code: "ru", name: "Русский" },
  { code: "it", name: "Italiano" },
  { code: "pl", name: "Polski" },
  { code: "th", name: "ไทย" },
  { code: "tl", name: "Filipino" },
];

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const handleLanguageChange = (value: string) => {
    i18n.changeLanguage(value);
  };

  return (
    <div className="absolute right-4 top-4 z-50 flex items-center gap-2">
      <Select value={i18n.language.split('-')[0]} onValueChange={handleLanguageChange}>
        <SelectTrigger className="w-[140px] bg-background/80 backdrop-blur-sm border-warm-peach/50 h-9">
          <Globe className="w-4 h-4 mr-2 text-warm-rose" />
          <SelectValue placeholder="Language" />
        </SelectTrigger>
        <SelectContent className="max-h-[300px]">
          {languages.map((lang) => (
            <SelectItem key={lang.code} value={lang.code}>
              {lang.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default LanguageSwitcher;
