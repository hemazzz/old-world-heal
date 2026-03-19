import { useLanguage } from '@/i18n/LanguageContext';
import { Language } from '@/i18n/translations';
import { Globe } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function LanguageSelector() {
  const { language, setLanguage, languageNames, t } = useLanguage();

  return (
    <div className="flex items-center gap-2">
      <Globe className="w-4 h-4 text-muted-foreground" />
      <Select value={language} onValueChange={(val) => setLanguage(val as Language)}>
        <SelectTrigger className="w-[140px] h-9 bg-card border-border text-sm">
          <SelectValue placeholder={t('selectLanguage')} />
        </SelectTrigger>
        <SelectContent className="bg-card border-border">
          {(Object.keys(languageNames) as Language[]).map((lang) => (
            <SelectItem 
              key={lang} 
              value={lang}
              className="text-sm hover:bg-accent"
            >
              {languageNames[lang]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
