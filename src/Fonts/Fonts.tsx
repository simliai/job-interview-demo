import cn from '@/utils/CSS/TailwindMergeAndClsx';
import Link from 'next/link';
import React from 'react';
import styles from './Fonts.module.css';

interface Props {
  isLink?: boolean;
  underline?: boolean;
  className?: string;
  href?: string;
  children: React.ReactNode;
  target?: '_blank' | '';
}

export const FontABCRepro = ({ className, children }: Props) => {
  return (
    <span
      className={cn(
        styles.ABCReproV1,
        `text-center font-ABCRepro font-bold not-italic leading-6 text-white `,
        className
      )}
    >
      {children}
    </span>
  );
};

export const FontABCReproRegular = ({
  isLink = false,
  className = '',
  underline = false,
  href = '',
  target = '',
  children,
}: Props) => {
  return (
    <Linkizise isLink={isLink} href={href} target={target}>
      <span
        className={cn(
          `cursor-default font-ABCRepro text-base font-normal leading-5 tracking-normal`,
          isLink && 'hover:cursor-pointer hover:underline',
          underline && 'underline',
          className
        )}
      >
        {children}
      </span>
    </Linkizise>
  );
};

interface LinkiziseProps {
  isLink: boolean;
  href: string;
  target?: '_blank' | '';
  children: React.ReactNode;
}

export const Linkizise = ({
  isLink,
  href,
  target = '',
  children,
}: LinkiziseProps) => {
  if (isLink) {
    return (
      <Link href={href} target={target}>
        {children}
      </Link>
    );
  }
  return <>{children}</>;
};

export const FontABCReproMono = ({ className = '', children }: Props) => {
  return (
    <span
      className={cn(
        `text-center font-ABCReproMono font-bold not-italic leading-6`,
        className
      )}
    >
      {children}
    </span>
  );
};
/* Button */
