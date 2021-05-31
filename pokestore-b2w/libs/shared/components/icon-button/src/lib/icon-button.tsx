import './icon-button.scss';

import { HTMLAttributes } from 'react';

import {
    IconButton as MaterialIconButtton, IconButtonProps as MaterialIconButtonProps
} from '@material-ui/core';
import { MaterialIcon, MaterialIconProps } from '@shared/components/material-icon';

export type IconButtonProps = MaterialIconProps &
  MaterialIconButtonProps &
  Pick<HTMLAttributes<HTMLButtonElement>, 'className'>;

export const IconButton = (props: IconButtonProps) => {
  const {
    iconName,
    iconType,
    tooltipDescription,
    tooltipPlacement,
    className: externalClassName = '',
    ...defaultMaterialIconButtonProps
  } = props;
  return (
    <MaterialIconButtton
      {...defaultMaterialIconButtonProps}
      className={externalClassName}
    >
      <MaterialIcon
        iconName={iconName}
        iconType={iconType}
        tooltipDescription={tooltipDescription}
        tooltipPlacement={tooltipPlacement}
      />
    </MaterialIconButtton>
  );
};

export default IconButton;
