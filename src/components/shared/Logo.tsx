// import { company } from '@/lib/content/company';

import { Webhook } from 'lucide-react';
import { cn } from '@/lib/utils';
import UnstyledLink, { UnstyledLinkProps } from './links/UnstyledLink';

interface Props extends Omit<UnstyledLinkProps, 'href' | 'children'> {
  href?: string;
}

export const Logo = ({ className, href = '/', ...rest }: Props) => {
  return (
    <UnstyledLink
      href={href}
      className={cn(
        'group flex max-w-max items-center gap-2 rounded outline-none',
        'focus-visible:ring-ring text-foreground ring-offset-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        'hover:!text-gradient-primary focus-visible:text-gradient-primary text-xl font-medium capitalize italic',
        'p-1',
        className,
      )}
      {...rest}
    >
      <Webhook className='mr-1 shrink-0 text-accent-primary' />
    </UnstyledLink>
  );
};

export default Logo;
