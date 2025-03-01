import { createClient } from "@/prismicio";
import { asLink } from "@prismicio/client";
import { Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function Footer() {
  const client = createClient();

  const { data } = await client.getSingle("home").catch(notFound);

  const { name, github_url, linked_in_url, contact_url } = data;

  return (
    <footer className="container mx-auto mt-auto border-t px-4 py-8">
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          © {new Date().getFullYear()} {name}. Todos os direitos reservados.
        </p>
        <div className="flex gap-4">
          <Link
            href={asLink(github_url) ?? ""}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <Github className="h-5 w-5 text-neutral-500 transition-colors hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-neutral-50" />
          </Link>
          <Link
            href={asLink(linked_in_url) ?? ""}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-5 w-5 text-neutral-500 transition-colors hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-neutral-50" />
          </Link>
          <Link href={asLink(contact_url) ?? ""} aria-label="Email">
            <Mail className="h-5 w-5 text-neutral-500 transition-colors hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-neutral-50" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
