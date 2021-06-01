import './cart-drawer.scss';

import { useState } from 'react';

import { createStyles, Divider, Drawer, makeStyles, Theme, useTheme } from '@material-ui/core';
import { IconButton } from '@shared/components/icon-button';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-start',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginRight: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: 0,
    },
  })
);

/* eslint-disable-next-line */
export interface CartDrawerProps {}

export function CartDrawer(props: CartDrawerProps) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  function handleDrawerOpen() {
    setOpen(true);
  }

  function handleDrawerClose() {
    setOpen(false);
  }

  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="right"
      open={open}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerHeader}>
        <IconButton
          iconName="chevron_right"
          tooltipDescription="Fechar Carrinho"
          onClick={handleDrawerClose}
        />
      </div>
      <Divider />
      <span>Sample text</span>
      <Divider />
    </Drawer>
  );
}

export default CartDrawer;
