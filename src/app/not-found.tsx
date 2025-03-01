import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileQuestion } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center p-4">
      <div className="max-w-md space-y-6 text-center">
        <div className="space-y-2">
          <div className="bg-primary/10 inline-block rounded-full p-6">
            <FileQuestion className="h-12 w-12" />
          </div>
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
            Página não encontrada
          </h1>
          <p className="text-muted-foreground text-lg">
            Desculpe, não conseguimos encontrar a página que você está
            procurando.
          </p>
        </div>
        <Button asChild size="lg">
          <Link href="/">Voltar para o início</Link>
        </Button>
      </div>
    </div>
  );
}
