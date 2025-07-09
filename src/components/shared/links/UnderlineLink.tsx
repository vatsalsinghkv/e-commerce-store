import * as React from 'react';
import { cn } from '@/lib/utils';
import UnstyledLink, { UnstyledLinkProps } from './UnstyledLink';

const UnderlineLink = React.forwardRef<HTMLAnchorElement, UnstyledLinkProps>(
  ({ children, className, ...rest }, ref) => {
    return (
      <UnstyledLink
        ref={ref}
        {...rest}
        className={cn(
          'animated-underline border-b border-dark border-dotted custom-link font-medium inline-flex items-center hover:border-black/0',
          'focus:outline-none focus-visible:rounded focus-visible:ring focus-visible:ring-offset-2 focus-visible:ring-primary-500',
          className,
        )}
      >
        {children}
      </UnstyledLink>
    );
  },
);

export default UnderlineLink;
