"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-1 flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="space-y-2 text-center">
          <div className="bg-destructive/10 inline-block rounded-full p-6">
            <AlertCircle className="text-destructive h-12 w-12" />
          </div>
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
            Oops! Algo deu errado
          </h1>
          <p className="text-muted-foreground text-lg">
            Desculpe pelo inconveniente. Ocorreu um erro inesperado.
          </p>
        </div>

        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Erro</AlertTitle>
          <AlertDescription>
            {error.message || "Um erro inesperado ocorreu"}
            {error.digest && (
              <div className="mt-2 text-xs opacity-70">
                Código do erro: {error.digest}
              </div>
            )}
          </AlertDescription>
        </Alert>

        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Button
            onClick={() => reset()}
            size="lg"
            className="w-full sm:w-auto"
          >
            Tentar novamente
          </Button>

          <Link href="/">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              Voltar para o início
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
