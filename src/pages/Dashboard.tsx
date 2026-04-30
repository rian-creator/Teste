import { useMemo, useState } from "react";
import { BarChart3, Clock3, FileText, PhoneCall, Timer } from "lucide-react";
import { UploadZone } from "../components/UploadZone";

interface DashboardMetric {
  label: string;
  value: string;
  icon: typeof PhoneCall;
  hint: string;
}

const DEFAULT_METRICS: DashboardMetric[] = [
  {
    label: "Ligações Atendidas",
    value: "2.840",
    icon: PhoneCall,
    hint: "+11% vs semana anterior",
  },
  {
    label: "Taxa de Conversão",
    value: "37,4%",
    icon: BarChart3,
    hint: "Funil com melhor desempenho no turno da manhã",
  },
  {
    label: "TMA",
    value: "04:22",
    icon: Timer,
    hint: "-18 segundos em relação ao mês passado",
  },
  {
    label: "Atrasos e Pausas",
    value: "2,1%",
    icon: Clock3,
    hint: "Dentro da meta operacional",
  },
];

export function Dashboard() {
  const [spreadsheetFile, setSpreadsheetFile] = useState<File | null>(null);

  const loaded = Boolean(spreadsheetFile);
  const metrics = useMemo(() => DEFAULT_METRICS, []);

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Dashboard de Operações</h1>
        <p className="text-sm text-muted-foreground">
          Faça upload da planilha consolidada para revisar indicadores de ligação, resultado e produtividade.
        </p>
      </header>

      <UploadZone
        loaded={loaded}
        fileName={spreadsheetFile?.name}
        onFile={(file) => setSpreadsheetFile(file)}
      />

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => {
          const Icon = metric.icon;

          return (
            <article
              key={metric.label}
              className="rounded-2xl border border-border bg-card p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">{metric.label}</span>
                <Icon className="size-5 text-primary" />
              </div>
              <div className="text-2xl font-bold text-foreground">{metric.value}</div>
              <p className="mt-2 text-xs text-muted-foreground">{metric.hint}</p>
            </article>
          );
        })}
      </section>

      <section className="rounded-2xl border border-border bg-card p-6">
        <div className="mb-4 flex items-center gap-2">
          <FileText className="size-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Resumo rápido</h2>
        </div>

        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>• O melhor horário de contato continua entre 09h e 11h.</li>
          <li>• A categoria de descarte “Sem interesse” caiu 7%.</li>
          <li>• Equipes A e C lideram o funil em conversão acumulada.</li>
          <li>• Sem dados críticos pendentes de revisão na planilha atual.</li>
        </ul>
      </section>
    </main>
  );
}
