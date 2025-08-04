import { ModeToggle } from "../ui/mode-toggle";

export function SiteHeader() {
  return (
    <header className="flex h-12 bg-gray-50 dark:bg-[var(--background)] shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <div className="flex w-full items-center px-4 ">
        <img
          src="/chesslab-logo-light.png"
          alt="Chess Lab"
          className="size-9 dark:hidden"
        />
        <img
          src="/chesslab-logo-dark.png"
          alt="Chess Lab"
          className="size-9 hidden dark:block"
        />
        <h1 className="font-sans text-xl font-medium">ChessLab</h1>
        <div className="ml-auto flex items-center gap-2">
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
