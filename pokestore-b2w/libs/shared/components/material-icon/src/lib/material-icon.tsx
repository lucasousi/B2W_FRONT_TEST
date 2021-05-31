import './material-icon.scss';

import { forwardRef, HTMLAttributes } from 'react';

import { TooltipProps } from '@material-ui/core';
import { BootstrapTooltip } from '@shared/components/bootstrap-tooltip';
import { TooltipChildrenProps } from '@shared/entities';

export interface MaterialIconProps extends HTMLAttributes<HTMLSpanElement> {
  iconName: string;
  type?: 'filled' | 'outlined' | 'two-tone';
  tooltipDescription?: string;
  tooltipPlacement?:
    | 'bottom-end'
    | 'bottom-start'
    | 'bottom'
    | 'left-end'
    | 'left-start'
    | 'left'
    | 'right-end'
    | 'right-start'
    | 'right'
    | 'top-end'
    | 'top-start'
    | 'top';
}

const IconBase = forwardRef<
  HTMLSpanElement,
  TooltipChildrenProps<HTMLSpanElement> & MaterialIconProps
>((tooltipAndSpanProps, ref) => {
  const {
    type,
    iconName,
    className: externalClassName = '',
    ...defaultTooltipAndSpanProps
  } = tooltipAndSpanProps;

  return (
    <span
      className={`material-icon material-icons-${type} ${externalClassName}`}
      {...defaultTooltipAndSpanProps}
      ref={ref}
    >
      {iconName}
    </span>
  );
});

export const MaterialIcon = (props: MaterialIconProps) => {
  const {
    tooltipDescription = '',
    tooltipPlacement = 'bottom',
    ...defaultSpanProps
  } = props;

  return tooltipDescription ? (
    <BootstrapTooltip
      arrow
      title={tooltipDescription}
      placement={tooltipPlacement}
    >
      <IconBase {...defaultSpanProps} />
    </BootstrapTooltip>
  ) : (
    <IconBase {...defaultSpanProps} />
  );
};

export default MaterialIcon;
