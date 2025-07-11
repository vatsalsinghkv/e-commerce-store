'use client';
import { MenuIcon } from 'lucide-react';
// import CartBtn from './CartBtn';
import { useInView } from 'motion/react';
import Link from 'next/link';
import * as React from 'react';
import { UnstyledLink } from '@/components/shared/links';
import { UnstyledLinkProps } from '@/components/shared/links/UnstyledLink';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { Logo } from '../shared';
import CartBtn from './CartBtn';

const ListItem = React.forwardRef<HTMLAnchorElement, UnstyledLinkProps>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <UnstyledLink
            ref={ref}
            className={cn(
              'hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors',
              className,
            )}
            {...props}
          >
            <div className='text-sm font-medium leading-none'>{title}</div>
            <p className='text-muted-foreground line-clamp-2 text-sm leading-snug'>
              {children}
            </p>
          </UnstyledLink>
        </NavigationMenuLink>
      </li>
    );
  },
);

function Menu() {
  return (
    <NavigationMenu className=' hidden md:ml-[2vw] lg:flex'>
      <NavigationMenuList>
        {nav_links.map((link) => {
          if (!link?.heroTitle && link.links) {
            return (
              <NavigationMenuItem key={link.href}>
                <NavigationMenuTrigger>{link.title}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className='grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] '>
                    {link.links.map(({ title, href, description }) => (
                      <ListItem key={title} title={title} href={href}>
                        {description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            );
          }

          if (link.heroTitle && link.links) {
            return (
              <NavigationMenuItem key={link.href}>
                <NavigationMenuTrigger>{link.title}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className='grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]'>
                    <li className='row-span-3'>
                      <NavigationMenuLink asChild>
                        <a
                          className='from-muted/50 to-muted flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b p-6 no-underline outline-none focus:shadow-md'
                          href={link.href}
                        >
                          <Logo className='mb-2 mt-4' />
                          <p className='text-muted-foreground text-sm leading-tight'>
                            Smart proposal builder, made for Companies
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    {link.links.map(({ title, href, description }) => (
                      <ListItem key={title} title={title} href={href}>
                        {description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            );
          }

          return (
            <NavigationMenuItem key={link.href}>
              <Link href={link.href} legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  {link.title}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const Navbar = () => {
  const ref = React.useRef<HTMLDivElement>(null);

  const isNotInView = useInView(ref, { once: false, amount: 0.9 });

  return (
    <Sheet>
      <div
        className={cn('fixed z-30 w-full ')}
        style={{ padding: isNotInView ? '0.6rem 0' : '.5rem 0' }}
      >
        <header
          className='layout flex h-full flex-col items-center justify-center rounded-2xl border backdrop-blur'
          style={{
            padding: isNotInView ? '0' : '.7rem',
            backgroundColor: isNotInView
              ? 'transparent'
              : 'hsl(var(--background) / 0.8)',
            backdropFilter: isNotInView ? '' : 'blur(1rem)',
            borderWidth: isNotInView ? '0px' : '1px',
            maxWidth: isNotInView ? '80rem' : '70rem',
            transition: 'all 0.3s ease',
          }}
        >
          <div className={cn('flex w-full items-center justify-between')}>
            <div className='flex-shrink-0'>
              <Logo />
            </div>

            <Menu />

            <div className='ml-auto gap-3 flex'>
              <CartBtn variant='outline' />
            </div>
            <SheetTrigger asChild>
              <Button
                variant='outline'
                size='icon'
                className='ml-3 flex lg:hidden'
              >
                <MenuIcon />
              </Button>
            </SheetTrigger>
          </div>
        </header>
      </div>
      <SheetContent className='flex flex-col overflow-y-auto'>
        <SheetHeader>
          <Logo />
        </SheetHeader>
        <Accordion collapsible type='single'>
          {nav_links.map((link) => {
            if (link.links) {
              return (
                <AccordionItem value={link.title} key={link.href}>
                  <AccordionTrigger>{link.title}</AccordionTrigger>
                  <AccordionContent className='p-0'>
                    {!link?.heroTitle && link.links && (
                      <ul className='w-full gap-3'>
                        {link.links.map(({ title, href, description }) => (
                          <UnstyledLink
                            href={href}
                            className={cn(
                              'hover:bg-accent hover:text-primary focus:bg-accent focus:text-accent-foreground block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors',
                            )}
                            key={title}
                          >
                            <div className='text-sm font-medium leading-none'>
                              {title}
                            </div>
                            <p className='text-muted-foreground line-clamp-2 text-sm leading-snug'>
                              {description}
                            </p>
                          </UnstyledLink>
                        ))}
                      </ul>
                    )}

                    {link.heroTitle && link.links && (
                      <ul className='grid w-full gap-3'>
                        <li className='row-span-3'>
                          <a
                            className='from-muted/50 to-muted flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b p-6 no-underline outline-none focus:shadow-md'
                            href={link.href}
                          >
                            <Logo className='mb-2 mt-4' />
                          </a>
                        </li>
                        {link.links.map(({ title, href, description }) => (
                          <UnstyledLink
                            href={href}
                            className={cn(
                              'hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors',
                            )}
                            key={title}
                          >
                            <div className='text-sm font-medium leading-none'>
                              {title}
                            </div>
                            <p className='text-muted-foreground line-clamp-2 text-sm leading-snug'>
                              {description}
                            </p>
                          </UnstyledLink>
                        ))}
                      </ul>
                    )}
                  </AccordionContent>
                </AccordionItem>
              );
            }

            return (
              <UnstyledLink
                className='h3 flex flex-1 items-center justify-between border-b py-4 font-medium transition-all hover:underline'
                href={link.href}
                key={link.title}
              >
                {link.title}
              </UnstyledLink>
            );
          })}
        </Accordion>
        <SheetFooter className='mt-auto flex gap-2 sm:flex-col sm:space-x-0'>
          <Button variant='ghost' size='icon' asChild className='w-full '>
            <CartBtn isMobile />
          </Button>
        </SheetFooter>
      </SheetContent>
      <div ref={ref} className='absolute inset-0 -z-10'></div>
    </Sheet>
  );
};

export default Navbar;

type IComponent = { title: string; href: string; description: string };

type INavLinks = {
  title: string;
} & (
  | // If there is hero box in links
  (
      | {
          heroTitle: string;
          href: string;
          links: IComponent[];
        }
      // Just links
      | {
          heroTitle?: never;
          href?: never;
          links: IComponent[];
        }
    )
  // Nothing
  | {
      heroTitle?: never;
      href: string;
      links?: never;
    }
);

const nav_links: INavLinks[] = [
  /* {
    title: 'Product',
    href: '/why-lifekit',
    heroTitle: 'Smart proposal builder, made for Companies',
    links: [
      {
        title: 'Automation',
        href: '/docs/primitives/alert-dialog',
        description:
          'A modal dialog that interrupts the user with important content and expects a response.',
      },
      {
        title: 'Chat bot',
        href: '/docs/primitives/hover-card',
        description:
          'For sighted users to preview content available behind a link.',
      },
      {
        title: 'Presonalization',
        href: '/docs/primitives/progress',
        description:
          'Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.',
      },
    ],
  }, */
  // {
  //   title: 'Solutions',
  //   links: [
  //     {
  //       title: 'AI Proposal Generator',
  //       href: '/docs/primitives/alert-dialog',
  //       description:
  //         'A modal dialog that interrupts the user with important content and expects a response.',
  //     },
  //     {
  //       title: 'eSign',
  //       href: '/docs/primitives/hover-card',
  //       description:
  //         'For sighted users to preview content available behind a link.',
  //     },
  //     {
  //       title: 'Budget Quotation',
  //       href: '/docs/primitives/progress',
  //       description:
  //         'Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.',
  //     },
  //     {
  //       title: 'Contaract Managent',
  //       href: '/docs/primitives/scroll-area',
  //       description: 'Visually or semantically separates content.',
  //     },
  //     {
  //       title: 'Payments',
  //       href: '/docs/primitives/tabs',
  //       description:
  //         'A set of layered sections of content—known as tab panels—that are displayed one at a time.',
  //     },
  //     {
  //       title: 'Proposal Tracking',
  //       href: '/docs/primitives/tooltip',
  //       description:
  //         'A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.',
  //     },
  //     {
  //       title: 'Invoice Generator',
  //       href: '/docs/primitives/tooltip',
  //       description:
  //         'A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.',
  //     },
  //     {
  //       title: 'Email Tracking',
  //       href: '/docs/primitives/tooltip',
  //       description:
  //         'A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.',
  //     },
  //   ],
  // },
  { title: 'Features', href: '/#features' },
  { title: 'Shop', href: '/product' },
];
