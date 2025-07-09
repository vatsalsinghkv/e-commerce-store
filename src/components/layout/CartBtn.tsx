'use client';

import { ShoppingCart } from 'lucide-react';
import { useEffect, useState } from 'react';
// import useCart from '@/lib/hooks/use-cart';
import { cn } from '@/lib/utils';
import { Tooltip } from '../shared';
import { UnstyledLink } from '../shared/links';
import { Button, ButtonProps } from '../ui/button';

interface Props extends ButtonProps {
  isMobile?: boolean;
}

export default function CartBtn({ className, isMobile }: Props) {
  const [isClient, setIsClient] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // const { quantity } = useCart();

  if (isMobile) {
    return (
      isClient && (
        <Button variant='ghost' size='icon' asChild className='w-full '>
          <UnstyledLink
            href='/cart'
            className='flex px-4 !justify-start gap-3 relative'
          >
            <ShoppingCart size={20} />
            Shopping Cart
            {quantity ? (
              <Tooltip className='top-1/2 -translate-y-1/2 right-4 h-5 w-5'>
                {quantity}
              </Tooltip>
            ) : (
              <></>
            )}
          </UnstyledLink>
        </Button>
      )
    );
  }
  return (
    isClient && (
      <Button
        variant='ghost'
        size='icon'
        asChild
        className={cn('shrink-0 relative', className)}
      >
        <UnstyledLink href='/cart'>
          <ShoppingCart />
          {quantity ? <Tooltip>{quantity}</Tooltip> : <></>}
        </UnstyledLink>
      </Button>
    )
  );
}
