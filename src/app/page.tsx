import type { Metadata } from "next";
import {
  Github,
  Linkedin,
  FileText,
  ExternalLink,
  Mail,
  FolderGit2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createClient } from "@/prismicio";
import { asImageSrc, asLink } from "@prismicio/client";
import { notFound } from "next/navigation";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";
import Link from "next/link";

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();

  const { data } = await client.getSingle("home");

  const { name, meta_title, meta_image, meta_description } = data;

  return {
    title: meta_title,
    description: meta_description,
    creator: name,
    authors: [
      {
        name: name ?? "Ítalo Braga",
        url: "https://italobraga.com",
      },
    ],
    openGraph: {
      type: "website",
      url: "https://italobraga.com",
      title: meta_title ?? "Ítalo Braga",
      description: meta_description ?? "Ítalo Braga - Desenvolvedor Front-end",
      siteName: meta_title ?? "Ítalo Braga",
      images: [
        {
          url: asImageSrc(meta_image) || "/default-image.png",
        },
      ],
    },
  };
}

export default async function Home() {
  const client = createClient();

  const { data } = await client.getSingle("home").catch(notFound);

  const {
    avatar,
    name,
    role,
    technologies,
    about,
    github_url,
    linked_in_url,
    curriculum_url,
    contact_url,
    experiences,
    projects,
  } = data;

  const hasProjects = !!projects?.length;

  return (
    <main className="container mx-auto max-w-4xl px-4 py-12">
      <section className="mb-16 flex flex-col items-center gap-8 md:flex-row md:items-start">
        <div className="relative h-40 w-40 flex-shrink-0 overflow-hidden rounded-full border-4 border-neutral-900/10 dark:border-neutral-50/10">
          <PrismicNextImage
            field={avatar}
            className="object-cover"
            priority
            fill
          />
        </div>

        <div className="space-y-4 text-center md:text-left">
          <div>
            <h2 className="text-4xl font-bold">{name}</h2>
            <p className="text-xl text-neutral-500 dark:text-neutral-400">
              {role}
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-2 md:justify-start">
            {technologies.map(({ name }, i) => (
              <Badge key={i} variant="outline" className="px-3 py-1">
                {name}
              </Badge>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-3 md:justify-start">
            <Button variant="outline" size="sm" asChild>
              <Link
                href={asLink(github_url) ?? ""}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link
                href={asLink(linked_in_url) ?? ""}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="mr-2 h-4 w-4" />
                LinkedIn
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link
                href={asLink(curriculum_url) ?? ""}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FileText className="mr-2 h-4 w-4" />
                Currículo
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link href={asLink(contact_url) ?? ""}>
                <Mail className="mr-2 h-4 w-4" />
                Contato
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Tabs defaultValue="sobre" className="mb-16">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="sobre">Sobre</TabsTrigger>
          <TabsTrigger value="experiencia">Experiência</TabsTrigger>
          <TabsTrigger value="projetos">Projetos</TabsTrigger>
        </TabsList>

        <TabsContent value="sobre" className="mt-6 space-y-4">
          <div className="prose dark:prose-invert max-w-none">
            <PrismicRichText
              field={about}
              components={{
                paragraph: ({ children }) => (
                  <p className="text-lg">{children}</p>
                ),
              }}
            />
          </div>
        </TabsContent>

        <TabsContent value="experiencia" className="mt-6 space-y-8">
          {experiences.map(
            (
              {
                role,
                company,
                start_date,
                end_date,
                company_link,
                resume,
                technologies,
              },
              i,
            ) => (
              <Card key={i}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>
                        {role} - {company}
                      </CardTitle>
                      <CardDescription>
                        {start_date} - {end_date}
                      </CardDescription>
                    </div>
                    <Button variant="ghost" size="icon" asChild>
                      <Link
                        href={asLink(company_link) ?? ""}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Visitar Orbesoft"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <PrismicRichText
                    field={resume}
                    components={{
                      list: ({ children }) => (
                        <ul className="list-disc space-y-2 pl-5">{children}</ul>
                      ),
                      listItem: ({ children }) => <li>{children}</li>,
                    }}
                  />

                  <PrismicRichText
                    field={technologies}
                    components={{
                      list: ({ children }) => (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {children}
                        </div>
                      ),
                      listItem: ({ children }) => (
                        <Badge variant="secondary">{children}</Badge>
                      ),
                    }}
                  />
                </CardContent>
              </Card>
            ),
          )}
        </TabsContent>

        <TabsContent value="projetos" className="mt-6">
          {!hasProjects && (
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="bg-primary/10 rounded-full p-8">
                <FolderGit2 className="h-12 w-12" />
              </div>
              <div className="max-w-sm space-y-2 text-center">
                <h3 className="text-xl font-semibold">
                  Nenhum projeto encontrado
                </h3>
                <p className="text-muted-foreground">
                  Os projetos que desenvolvi ainda não foram adicionados ao
                  portfólio.
                </p>
              </div>
              <Button variant="outline" asChild>
                <Link
                  href={asLink(github_url) + "?tab=repositories"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center"
                >
                  <Github className="mr-2 h-4 w-4" />
                  Ver projetos no GitHub
                </Link>
              </Button>
            </div>
          )}

          {hasProjects && (
            <div className="grid gap-6 md:grid-cols-2">
              {projects.map(
                ({ title, sub_title, description, technologies }, i) => (
                  <Card key={i}>
                    <CardHeader>
                      <CardTitle>{title}</CardTitle>
                      <CardDescription>{sub_title}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-4">{description}</p>

                      <PrismicRichText
                        field={technologies}
                        components={{
                          list: ({ children }) => (
                            <div className="flex flex-wrap gap-2">
                              {children}
                            </div>
                          ),
                          listItem: ({ children }) => (
                            <Badge variant="outline">{children}</Badge>
                          ),
                        }}
                      />
                    </CardContent>
                  </Card>
                ),
              )}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </main>
  );
}
