import './icon-button.scss';

import { HTMLAttributes } from 'react';

import {
    Badge, IconButton as MaterialIconButtton, IconButtonProps as MaterialIconButtonProps
} from '@material-ui/core';
import { BootstrapTooltip } from '@shared/components/bootstrap-tooltip';
import { MaterialIcon, MaterialIconProps } from '@shared/components/material-icon';

export type IconButtonProps = MaterialIconProps &
  MaterialIconButtonProps &
  Pick<HTMLAttributes<HTMLButtonElement>, 'className'> & {
    badgeCount?: number;
    badgeColor?: 'primary' | 'secondary' | 'default' | 'error';
  };

export const IconButton = (props: IconButtonProps) => {
  const {
    iconName,
    iconType = 'two-tone',
    tooltipDescription = '',
    tooltipPlacement = 'bottom',
    className: externalClassName = '',
    badgeColor = 'primary',
    badgeCount = 0,
    ...defaultMaterialIconButtonProps
  } = props;
  return (
    <BootstrapTooltip title={tooltipDescription} placement={tooltipPlacement}>
      <MaterialIconButtton {...defaultMaterialIconButtonProps} className={externalClassName}>
        <Badge badgeContent={badgeCount} color={badgeColor} invisible={!badgeCount}>
          <MaterialIcon iconName={iconName} iconType={iconType} />
        </Badge>
      </MaterialIconButtton>
    </BootstrapTooltip>
  );
};

export default IconButton;
