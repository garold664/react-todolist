import { ComponentPropsWithoutRef } from 'react';
import classes from './Button.module.css';

export default function Button({
  children,
  ...props
}: ComponentPropsWithoutRef<'button'>) {
  return (
    <button className={classes.button} {...props}>
      {children}
    </button>
  );
}
