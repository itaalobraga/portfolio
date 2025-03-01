import { ThemeToggle } from "./theme-toggle";

export function Header() {
  return (
    <header className="container mx-auto flex items-center justify-end px-4 py-6">
      <ThemeToggle />
    </header>
  );
}
