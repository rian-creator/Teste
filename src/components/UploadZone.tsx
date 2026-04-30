import { useRef } from "react";
import { Check, FileSpreadsheet, Upload } from "lucide-react";
import { motion } from "framer-motion";

interface UploadZoneProps {
  loaded: boolean;
  fileName?: string;
  onFile: (file: File) => void;
}

const ACCEPTED_SPREADSHEET_TYPES = ".xlsx,.xls";
const EMPTY_FILE_INPUT_VALUE = "";

export function UploadZone({ loaded, fileName, onFile }: UploadZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleUploadClick() {
    inputRef.current?.click();
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      onFile(selectedFile);
    }

    event.target.value = EMPTY_FILE_INPUT_VALUE;
  }

  const containerClasses = [
    "group relative flex w-full items-center gap-5 overflow-hidden rounded-2xl border-2 border-dashed p-6 text-left transition-all",
    "hover:border-primary hover:shadow-[var(--shadow-glow)]",
    loaded ? "border-primary/60 bg-primary/5" : "border-border bg-card",
  ].join(" ");

  const iconContainerClasses = [
    "flex size-14 items-center justify-center rounded-xl",
    loaded ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground",
  ].join(" ");

  const statusIconClasses = [
    "flex size-10 items-center justify-center rounded-full",
    loaded ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
  ].join(" ");

  const title = loaded
    ? "Planilha consolidada carregada"
    : "Envie a planilha consolidada";

  const description = loaded
    ? fileName ?? "Arquivo .xlsx pronto — clique para substituir"
    : "Arquivo .xlsx único contendo todas as abas (Ligação Atendida, Resultado, Horário, Descarte, Funil, Médias)";

  return (
    <motion.button
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      onClick={handleUploadClick}
      className={containerClasses}
      type="button"
    >
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_SPREADSHEET_TYPES}
        className="hidden"
        onChange={handleFileChange}
      />

      <div className={iconContainerClasses}>
        <FileSpreadsheet className="size-7" />
      </div>

      <div className="min-w-0 flex-1">
        <div className="text-base font-semibold text-foreground">{title}</div>
        <div className="truncate text-sm text-muted-foreground">{description}</div>
      </div>

      <div className={statusIconClasses}>
        {loaded ? <Check className="size-5" /> : <Upload className="size-5" />}
      </div>
    </motion.button>
  );
}
