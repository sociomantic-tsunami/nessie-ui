## Component Description

The Grid is the basis of the Nessie layout system.

The Nessie layout system doesn’t restrict you to a single grid with _x_ columns.
Instead you have the power to define any grid you like, up to 24 columns,
with three possible gutter sizes (or no gutters at all).

What’s more, you’re free to define _multiple_ grids and sub-grids which you can
mix and match as you see fit. (With great power comes great responsibility.
We urge you to exercise restraint.)

### Setting up a Grid

Let’s set up a simple grid with three Columns:

```
<Grid>
    <Column size="1/3">...</Column>
    <Column size="1/3">...</Column>
    <Column size="1/3">...</Column>
</Grid>
```

Here we use the `size` prop of each Column to set its respective width. The
result is:
```
+---[ Grid ]---------------------------------------------------------+
|  +---[ Column ]-----+  +---[ Column ]-----+  +---[ Column ]-----+  |
|  |                  |  |                  |  |                  |  |
|  +------------------+  +------------------+  +------------------+  |                                                                  
+--------------------------------------------------------------------+
```

### Column sizes

Configure the width of Columns using their `size` prop.  The `size` prop accepts
any fraction down to 1/24 (expressed as a string: `"1/24"`) or the value
`"content"`.

`"content"` will use the Column’s content width as its size.

#### Fractional sizes

Fractional sizes allow you define an _n_-column grid, where _n_ is the total
number of columns. If we want to have a Column component that spans _s_ grid
columns then its `size` is the fraction _s/n_.

For example, a Column that spans 4 grid columns in a grid layout of 24 columns
is expressed as:
```
<Column size="4/24"/>
```

It’s recommended to always use the same denominator for a given Grid and,
ideally, throughout your application to ensure a consistent overall layout.


#### Grids Without Sizes

If you don’t set column sizes the column widths will be distributed evenly. You
can totally mix Columns with and without sizes in the same Grid:

```
<Grid>
    <Column size="1/3">...</Column>
    <Column>...</Column>
    <Column>...</Column>
</Grid>
```

The result here will be identical the previous example – that is, three columns
of 1/3:
```
+---[ Grid ]---------------------------------------------------------+
|  +---[ Column ]-----+  +---[ Column ]-----+  +---[ Column ]-----+  |
|  |                  |  |                  |  |                  |  |
|  +------------------+  +------------------+  +------------------+  |                                                                  
+--------------------------------------------------------------------+
```

### Grid gutters

The horizontal space between any two Columns in a Grid is called the gutter. You
can configure gutter size used in a given Grid using the Grid’s `gutters` prop.

The prop accepts one of four values: `"S"`, `"M'` (default), `"L"` and `"none"`
(no gutters).

### Grid spacing

Configure the vertical spacing between Grids using the Grid’s `spacing` prop.
The prop accepts one of seven values: `"default"`, `"h1"`, `"h2"`, `"h3"`,
`"h4"`, `"label"` and `"none"` (no spacing).

`"h1"`, `"h2"`, `"h3"`, `"h4"` and `"label"` correspond to the default spacing
following the H1, H2, H3, H4 and Label components, respectively.

### Grid wrap

You can control whether the Grid content will wrap using the `hasWrap` boolean
prop (default `true`).

### Grid alignment — or, aligning Columns inside Grids

You can control horizontal and vertical alignment of Columns inside a Grid using
the Grid’s `align` and `verticalAlign` props, respectively.

#### Horizontal alignment

The Grid’s `align` prop accepts one of four values: `"auto"` (default),
`"left"`, `"right"` and `"center"`.

The default value (`"auto"`):
```
<Grid align="auto">
    <Column>...</Column>
    <Column>...</Column>
    <Column>...</Column>
</Grid>
```

will distribute the Column widths equally (if no specific widths have been set
on individual Columns):
```
+---[ Grid ]---------------------------------------------------------+
|  +---[ Column ]-----+  +---[ Column ]-----+  +---[ Column ]-----+  |
|  |                  |  |                  |  |                  |  |
|  +------------------+  +------------------+  +------------------+  |                                                                  
+--------------------------------------------------------------------+
```

The value `"left"`:
```
<Grid align="right">
    <Column>...</Column>
    <Column>...</Column>
    <Column>...</Column>
</Grid>
```

will use the content width of each Column and align the Columns to the left of
the Grid:
```
+---[ Grid ]---------------------------------------------------------+
|  +-[ Column ]--+  +-[ Column ]-+  +-[ Column ]-+                   |
|  |             |  |            |  |            |                   |
|  +-------------+  +------------+  +------------+                   |                                                                  
+--------------------------------------------------------------------+
```

The value `"right"`:
```
<Grid align="right">
    <Column>...</Column>
    <Column>...</Column>
    <Column>...</Column>
</Grid>
```

will use the content width of each Column and align the Columns to the right of
the Grid:
```
+---[ Grid ]---------------------------------------------------------+
|                   +-[ Column ]--+  +-[ Column ]-+  +-[ Column ]-+  |
|                   |             |  |            |  |            |  |
|                   +-------------+  +------------+  +------------+  |                                                                  
+--------------------------------------------------------------------+
```

The value `"center"`:
```
<Grid align="center">
    <Column>...</Column>
    <Column>...</Column>
    <Column>...</Column>
</Grid>
```

will use the content width of each Column and align the Columns to the center of
the Grid:
```
+---[ Grid ]---------------------------------------------------------+
|          +-[ Column ]--+  +-[ Column ]-+  +-[ Column ]-+           |
|          |             |  |            |  |            |           |
|          +-------------+  +------------+  +------------+           |                                                                  
+--------------------------------------------------------------------+
```

#### Vertical alignment

The Grid’s `verticalAlign` prop accepts one of four values: `"auto"` (default),
`"top"`, `"middle"` and `"bottom"`.

The default value (`"auto"`):
```
<Grid verticalAlign="auto">
    <Column><Text>First column</Text></Column>
    <Column>
        <Text>Second</Text>
        <Text>column</Text>
    </Column>
    <Column><Text>Third column</Text></Column>
</Grid>
```

will make all the Columns full height:
```
+---[ Grid ]---------------------------------------------------------+
|  +---[ Column ]-----+  +---[ Column ]-----+  +---[ Column ]-----+  |
|  | First column     |  | Second           |  | Third column     |  |
|  |                  |  | column           |  |                  |  |
|  +------------------+  +------------------+  +------------------+  |                                                                  
+--------------------------------------------------------------------+
```

The value `"top"`:
```
<Grid verticalAlign="top">
    <Column><Text>First column</Text></Column>
    <Column>
        <Text>Second</Text>
        <Text>column</Text>
     </Column>
    <Column><Text>Third column</Text></Column>
</Grid>
```

will use the content height of each Column and align the Columns to the top of
the Grid:
```
+---[ Grid ]---------------------------------------------------------+
|  +---[ Column ]-----+  +---[ Column ]-----+  +---[ Column ]-----+  |
|  | First column     |  | Second           |  | Third column     |  |
|  +------------------+  | column           |  +------------------+  |
|                        +------------------+                        |                                                                  
+--------------------------------------------------------------------+
```

The value `"middle"`:
```
<Grid verticalAlign="middle">
    <Column><Text>First column</Text></Column>
    <Column>
        <Text>The</Text>
        <Text>second</Text>
        <Text>column</Text>
    </Column>
    <Column><Text>Third column</Text></Column>
</Grid>
```

will use the content height of each Column and align the Columns to the middle
of the Grid:
```
+---[ Grid ]---------------------------------------------------------+
|                        +---[ Column ]-----+                        |
|  +---[ Column ]-----+  | The              |  +---[ Column ]-----+  |
|  | First column     |  | second           |  | Third column     |  |
|  +------------------+  | column           |  +------------------+  |
|                        +------------------+                        |                                                                  
+--------------------------------------------------------------------+
```

The value `"bottom"`:
```
<Grid verticalAlign="bottom">
    <Column><Text>First column</Text></Column>
    <Column>
        <Text>Second</Text>
        <Text>column</Text>
    </Column>
    <Column><Text>Third column</Text></Column>
</Grid>
```

will use the content height of each Column and align the Columns to the bottom
of the Grid:
```
+---[ Grid ]---------------------------------------------------------+
|                        +---[ Column ]-----+                        |
|  +---[ Column ]-----+  | Second           |  +---[ Column ]-----+  |
|  | First column     |  | column           |  | Third column     |  |
|  +------------------+  +------------------+  +------------------+  |                                                                  
+--------------------------------------------------------------------+
```

### Aligning components _inside_ Columns

You can control horizontal and vertical alignment of components inside a Column
using the Column’s `align` and `verticalAlign` props, respectively.

#### Horizontal alignment

The Column’s `align` prop accepts one of four values: `"auto"` (default),
`"left"`, `"right"` and `"center"`.

`"auto"` will make all components inside the Column full width. The other
values will use the content width of the components and align them to the left,
right or center of the Column, respectively.

#### Vertical alignment

The Column’s `verticalAlign` prop accepts one of four values: `"auto"`
(default), `"top"`, `"middle"` and `"bottom"`.

`"auto"` will distribute the heights of components inside the Column equally.
The other values will use the content height of the components and align them
to the top, middle or center of the Column, respectively.
