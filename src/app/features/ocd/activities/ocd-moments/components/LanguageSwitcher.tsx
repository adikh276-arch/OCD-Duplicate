// @ts-nocheck
import { useTranslation } from 'react-i18next';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../components/ui/select';
import { Globe } from 'lucide-react';

const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
    { code: 'pt', name: 'Português' },
    { code: 'de', name: 'Deutsch' },
    { code: 'ar', name: 'العربية' },
    { code: 'hi', name: 'हिन्दी' },
    { code: 'bn', name: 'বাংলা' },
    { code: 'zh', name: '中文' },
    { code: 'ja', name: '日本語' },
    { code: 'id', name: 'Bahasa Indonesia' },
    { code: 'tr', name: 'Türkçe' },
    { code: 'vi', name: 'Tiếng Việt' },
    { code: 'ko', name: '한국어' },
    { code: 'ru', name: 'Русский' },
    { code: 'it', name: 'Italiano' },
    { code: 'pl', name: 'Polski' },
    { code: 'th', name: 'ไทย' },
    { code: 'tl', name: 'Filipino' },
];

export function LanguageSwitcher() {
    const { i18n } = useTranslation();

    return (
        <Select value={i18n.language || 'en'} onValueChange={(val) => i18n.changeLanguage(val)}>
            <SelectTrigger className="w-[140px] h-9 bg-slate-100/50 border-slate-200/60 rounded-xl text-xs font-bold text-slate-700 uppercase tracking-widest focus:ring-0 focus:ring-offset-0">
                <Globe className="w-3.5 h-3.5 mr-2 text-slate-400" />
                <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent className="bg-white/95 backdrop-blur-xl border-slate-100 rounded-2xl shadow-xl shadow-slate-200/50">
                {languages.map((lang) => (
                    <SelectItem
                        key={lang.code}
                        value={lang.code}
                        className="text-xs font-bold text-slate-600 focus:bg-slate-50 focus:text-slate-900 cursor-pointer rounded-xl my-0.5"
                    >
                        {lang.name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
