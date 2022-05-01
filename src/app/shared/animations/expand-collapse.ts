import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

const expandCollapse = trigger('expandCollapse', [
  state(
    'void, collapsed',
    style({
      visibility: 'hidden',
      height: '0',
    })
  ),

  state('*, expanded', style('*')),

  transition('void <=> false, collapsed <=> false, expanded <=> false', []),

  transition('void <=> *, collapsed <=> expanded', animate('{{timings}}'), {
    params: {
      timings: '225ms cubic-bezier(0.4, 0.0, 1, 1)',
    },
  }),
]);

export { expandCollapse };
