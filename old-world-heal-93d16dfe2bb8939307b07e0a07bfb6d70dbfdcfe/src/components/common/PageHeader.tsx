import { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  actions?: ReactNode;
}

export function PageHeader({ title, description, icon, actions }: PageHeaderProps) {
  return (
    <header className="mb-8 animate-fade-in">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-4">
          {icon && (
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              {icon}
            </div>
          )}
          <div>
            <h1 className="font-heading text-3xl font-semibold text-foreground">
              {title}
            </h1>
            {description && (
              <p className="mt-2 text-muted-foreground max-w-2xl leading-relaxed">
                {description}
              </p>
            )}
          </div>
        </div>
        {actions && <div className="flex items-center gap-3">{actions}</div>}
      </div>
      <div className="mt-6 h-px bg-gradient-to-r from-border via-vintage-gold/30 to-transparent" />
    </header>
  );
}
