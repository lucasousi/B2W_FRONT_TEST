import './bootstrap-tooltip.scss';

import { makeStyles, Theme, Tooltip, TooltipProps } from '@material-ui/core';

const useStylesBootstrap = makeStyles((theme: Theme) => ({
  arrow: {
    color: theme.palette.common.black,
  },
  tooltip: {
    backgroundColor: theme.palette.common.black,
  },
}));

export function BootstrapTooltip(props: TooltipProps) {
  const classes = useStylesBootstrap();

  return <Tooltip arrow classes={classes} {...props} />;
}

export default BootstrapTooltip;
