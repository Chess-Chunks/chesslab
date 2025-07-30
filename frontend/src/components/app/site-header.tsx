import { ModeToggle } from "../ui/mode-toggle";

export function SiteHeader() {
  return (
    <header className="flex h-14 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <div className="flex w-full items-center px-4 ">
        <img
          src="/chesslab-logo-light.png"
          alt="Chess Lab"
          className="size-12 dark:hidden"
        />
        <img
          src="/chesslab-logo-dark.png"
          alt="Chess Lab"
          className="size-12 hidden dark:block"
        />
        <h1 className="text-3xl font-medium">Chess Lab</h1>
        <div className="ml-auto flex items-center gap-2">
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
