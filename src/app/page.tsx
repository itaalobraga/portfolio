import { LucideLink } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="bg flex min-h-screen flex-col justify-center">
      <div className="m-auto flex w-full max-w-[31.25rem] flex-col gap-[2.5rem]">
        <section>
          <div className="flex items-center gap-[1.5rem]">
            <div className="h-[6.25rem] w-[6.25rem] rounded-full bg-red-300 transition-transform hover:scale-95" />

            <div>
              <h1 className="h1 text-[1.5rem]">Ítalo Braga</h1>

              <h2 className="h2 text-[1rem]">Desenvolvedor Front-end</h2>
            </div>
          </div>
        </section>

        <section>
          <h3 className="h3 mb-[1rem] text-[1rem]">Sobre</h3>

          <p className="p text-[0.875rem]">
            Com mais de dois anos de experiência como desenvolvedor front-end,
            eu tenho participado de projetos desafiadores e inovadores,
            utilizando tecnologias como React e React Native. Meu objetivo é
            criar aplicações que ofereçam uma ótima experiência para os usuários
            e que atendam às necessidades dos clientes.
          </p>
        </section>

        <section>
          <h3 className="h3 mb-[1rem] text-[1rem]">Links</h3>

          <div className="flex items-center gap-[2.5rem]">
            <span className="span text-[0.875rem]">Github</span>

            <Link
              href="https://github.com/itaalobraga"
              rel="noopener noreferrer"
              className="link flex items-center gap-[0.5rem] text-[0.875rem] hover:underline"
              target="_blank"
            >
              @itaalobraga
              <LucideLink className="link size-[0.875rem]" />
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
