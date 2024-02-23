import { cn } from "@/lib/utils";

export type ContainerProps = {
  className?: string;
  fluid?: boolean;
};

export function Container(props: React.PropsWithChildren<ContainerProps>) {
  const { fluid, className, children } = props;

  return (
    <div
      className={cn(
        "flex flex-col mx-auto w-full",
        {
          "max-w-7xl": !fluid,
        },
        className
      )}
    >
      {children}
    </div>
  );
}
