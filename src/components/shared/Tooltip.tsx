import { cn } from '@/lib/utils';

interface Props extends React.ComponentPropsWithoutRef<'div'> {}

export default function Tooltip({ children, className, ...props }: Props) {
  return (
    <div
      className={cn(
        'h-4 w-4 flex items-center justify-center',
        'text-xs bg-destructive text-white rounded-full',
        'absolute top-0 right-0',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
