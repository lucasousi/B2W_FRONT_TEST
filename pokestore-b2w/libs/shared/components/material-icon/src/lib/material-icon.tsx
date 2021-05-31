import './material-icon.scss';

import { forwardRef, HTMLAttributes } from 'react';

import { BootstrapTooltip } from '@shared/components/bootstrap-tooltip';
import { TooltipChildrenProps } from '@shared/entities';

export interface MaterialIconProps {
  iconName: string;
  iconType?: 'filled' | 'outlined' | 'two-tone';
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

type FullMaterialIconProps = MaterialIconProps &
  HTMLAttributes<HTMLSpanElement>;

const IconBase = forwardRef<
  HTMLSpanElement,
  TooltipChildrenProps<HTMLSpanElement> & FullMaterialIconProps
>((tooltipAndSpanProps, ref) => {
  const {
    iconType,
    iconName,
    className: externalClassName = '',
    ...defaultTooltipAndSpanProps
  } = tooltipAndSpanProps;

  return (
    <span
      className={`material-icon material-icons-${iconType} ${externalClassName}`}
      {...defaultTooltipAndSpanProps}
      ref={ref}
    >
      {iconName}
    </span>
  );
});

export const MaterialIcon = (props: FullMaterialIconProps) => {
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
