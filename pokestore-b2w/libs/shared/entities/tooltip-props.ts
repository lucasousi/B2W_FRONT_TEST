export type TooltipChildrenProps<TChildren> = Pick<
  React.HTMLAttributes<TChildren>,
  | 'aria-describedby'
  | 'className'
  | 'onBlur'
  | 'onFocus'
  | 'onMouseLeave'
  | 'onTouchEnd'
  | 'onTouchStart'
  | 'title'
>;
