## Component Description

The Row component is part of the Nessie layout system. Row is a flex
container that is laying it's items in horizontal (row) direction.


#### Note

We've updated how **Grid** component works, so it's recommended to use
`Row` component only if you need to achieve specific sizing of a single
row/column.


### Row gutters

The horizontal space between any two items in a Row is called the gutter. You
can configure gutter size used in a given Row using the Row’s `gutters` prop.

The prop accepts one of four values: `"S"`, `"M'` (default), `"L"` and `"none"`
(no gutters).


### Row spacing

You can configure the vertical spacing between Row's items using the Row’s
`spacing` prop. The prop accepts one of four values: `"S"`, `"M"` (default),
`"L"` and `"none"` (no spacing).


### Row wrap

You can control whether the Row content will wrap using the `hasWrap` boolean
prop (default `false`).


For full details about Grids and the Nessie layout system, see the Grid
component.
