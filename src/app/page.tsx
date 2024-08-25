import { createClient } from "@/prismicio";
import { asImageSrc } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicLink } from "@prismicio/react";
import { ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();

  const { data } = await client.getSingle("home");

  const { name, meta_title, meta_image, meta_description } = data;

  return {
    title: meta_title,
    description: meta_description,
    creator: name,
    authors: {
      name: name ?? "Ítalo Braga",
      url: "https://italobraga.com",
    },
    openGraph: {
      type: "website",
      url: "https://italobraga.com",
      title: meta_title ?? "Ítalo Braga",
      description: meta_description ?? "Ítalo Braga - Desenvolvedor Front-end",
      siteName: meta_title ?? "Ítalo Braga",
      images: [
        {
          url: asImageSrc(meta_image) ?? "",
        },
      ],
    },
  };
}

export default async function Home() {
  const client = createClient();

  const { data } = await client.getSingle("home").catch(notFound);

  const { avatar, name, role, about, links, experiences } = data;

  return (
    <main className="bg flex min-h-screen flex-col justify-center p-[5%]">
      <div className="m-auto flex w-full max-w-[31.25rem] flex-col gap-[2.5rem]">
        <section>
          <div className="flex items-center gap-[1.5rem] max-md:flex-col">
            <PrismicNextImage
              field={avatar}
              className="h-[6.25rem] w-[6.25rem] rounded-full object-cover transition-transform hover:scale-95"
            />

            <div className="max-md:self-start">
              <h1 className="h1 text-[1.5rem]">{name}</h1>

              <h2 className="h2 text-[1rem]">{role}</h2>
            </div>
          </div>
        </section>

        <section>
          <h3 className="h3 mb-[1rem] text-[1rem]">Sobre</h3>

          <p className="p text-[0.875rem]">{about}</p>
        </section>

        <section>
          <h3 className="h3 mb-[1rem] text-[1rem]">Experiência</h3>

          <div className="flex flex-col gap-[2rem]">
            {experiences.map(
              ({
                company_link,
                company_name,
                company_role,
                end_date,
                resume,
                start_date,
                tools,
              }) => {
                return (
                  <div
                    key={resume}
                    className="flex items-start gap-[1.5rem] max-md:flex-col max-md:gap-[0.5rem]"
                  >
                    <span className="span shrink-0 text-[0.875rem]">
                      {start_date} - {end_date}
                    </span>

                    <div className="flex flex-col gap-[0.5rem]">
                      <PrismicLink
                        field={company_link}
                        rel="noopener noreferrer"
                        className="link flex items-center gap-[0.5rem] text-[0.875rem] hover:underline"
                        target="_blank"
                      >
                        {company_role} - {company_name}
                        <ArrowUpRight className="link size-[0.875rem]" />
                      </PrismicLink>

                      <p className="p text-[0.875rem]">{resume}</p>

                      <span className="span-2 text-[0.875rem]">{tools}</span>
                    </div>
                  </div>
                );
              },
            )}
          </div>
        </section>

        <section>
          <h3 className="h3 mb-[1rem] text-[1rem]">Links</h3>

          {links.map(({ label, link, title }) => {
            return (
              <div key={label} className="flex items-center gap-[2.5rem]">
                <span className="span text-[0.875rem]">{title}</span>

                <PrismicLink
                  field={link}
                  rel="noopener noreferrer"
                  className="link flex items-center gap-[0.5rem] text-[0.875rem] hover:underline"
                  target="_blank"
                >
                  {label}
                  <ArrowUpRight className="link size-[0.875rem]" />
                </PrismicLink>
              </div>
            );
          })}
        </section>
      </div>
    </main>
  );
}
