import { cn } from "@/lib/utils";

interface HeaderProps {
  label: string;
  text: string;
}

export const Header = ({ label, text }: HeaderProps) => {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center justify-center">
      <h1
        className={cn(
          "text-4xl font-stencil text-gray-950"
        )}
      >
        {label}
      </h1>
      <p className="text-muted-foreground text-sm">{text}</p>
    </div>
  );
};
