import React from 'react';
import classNames from 'classnames';
import styles from './figma.module.scss';

export type FigmaProps = {} & React.IframeHTMLAttributes<HTMLIFrameElement>;

export function Figma({ className, ...rest }: FigmaProps) {
  return (
    <iframe {...rest} className={classNames(styles.iframe, className)}></iframe>
  );
}

Figma.defaultProps = {
  allowFullScreen: true,
  loading: 'lazy',
  width: '100%',
  height: '600px',
};
