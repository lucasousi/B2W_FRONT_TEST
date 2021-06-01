import './icon-button.scss';

import { HTMLAttributes } from 'react';

import {
    IconButton as MaterialIconButtton, IconButtonProps as MaterialIconButtonProps
} from '@material-ui/core';
import { BootstrapTooltip } from '@shared/components/bootstrap-tooltip';
import { MaterialIcon, MaterialIconProps } from '@shared/components/material-icon';

export type IconButtonProps = MaterialIconProps &
  MaterialIconButtonProps &
  Pick<HTMLAttributes<HTMLButtonElement>, 'className'>;

export const IconButton = (props: IconButtonProps) => {
  const {
    iconName,
    iconType,
    tooltipDescription = '',
    tooltipPlacement = 'bottom',
    className: externalClassName = '',
    ...defaultMaterialIconButtonProps
  } = props;
  return (
    <BootstrapTooltip title={tooltipDescription} placement={tooltipPlacement}>
      <MaterialIconButtton
        {...defaultMaterialIconButtonProps}
        className={externalClassName}
      >
        <MaterialIcon iconName={iconName} iconType={iconType} />
      </MaterialIconButtton>
    </BootstrapTooltip>
  );
};

export default IconButton;
