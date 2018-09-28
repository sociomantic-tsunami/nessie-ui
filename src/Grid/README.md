## Component Description

The Nessie layout system doesn’t restrict you to a single grid with *x* columns.
Instead you have the power to define any grid you like, with 4 possible gutter
sizes (or no gutters at all).

What’s more, you’re free to define *multiple* grids and sub-grids which you can
mix and match as you see fit. (With great power comes great responsibility.
We urge you to exercise restraint.)

You can use **GridItem** component if you need to extend features of Grid to a
specific grid cell(s).


### Setting up a Grid

In order to use Grid, you **don't** need to rely on Rows and Columns anymore,
because Grid component is using `display: grid;` and almost everything is
defined on container level, while everything inside is grid item and is placed
inside grid cells according to rules from container (Grid itself).

A simple example:

```
<Grid>
    <Column>...</Column>
    <Row>...</Row>
    <Button>...</Button>
</Grid>
```

The result is:

```
+---[ Grid ]---------------------------------------------------------+
|  +---[ Column ]-----+  +---[ Row ]--------+  +---[ Button ]-----+  |
|  |                  |  |                  |  |                  |  |
|  +------------------+  +------------------+  +------------------+  |
+--------------------------------------------------------------------+
```

Notice how, no matter which element is placed inside of Grid, all elements
occupy the same amount of space inside of it. This is because Grid by default
is giving each item the same size (`1fr`, or 1 fraction of free space) and
spaces them evenly.


### Difference between implicit and explicit grids

**Explicit grid** is manually defined grid that is formed by defining a fixed
number of lines and tracks. In order to set explicit grid, use
`customColumns` and `customRows` props. It's not obligatory to define an
explicit grid.


If there are more grid items than cells in the grid or when a grid item is
placed outside of the explicit grid, the grid container automatically generates
grid tracks by adding grid lines to the grid. The explicit grid together with
these additional implicit tracks and lines forms the so called
**implicit grid**. Use `autoCols` and `autoRows` props to define the grid cell
sizes of implicit grid.


### Columns and rows

You can simply set the number of `columns` and/or `rows` that you want. This
way, you can have an explicit grid (e.g. 6x3) with all grid cells of the same
size (`1fr`).

The number should be an integer greater than 0 (zero).

If you need more specific grid, you can use `autoCols`/`autoRows` (implicit
grid) and/or `customCols`/`customRows` (explicit grid); note that
`customCols`/`customRows` are overriding any `columns`/`rows` respectively.

All props are accepting string values, so you can define your grid however you
want, e.g.:
- `100px 1fr auto 200px` (creates a grid with 4 columns)
- `1fr 3fr 50%` (creates a grid with 3 columns)
- etc.


### Grid flow

With `autoFlow`, you can choose where the new items will be placed if you have
grid items that you don't explicitly place on the grid - the auto-placement
algorithm kicks in to automatically place the items. This property controls how
the auto-placement algorithm works.

The prop accepts one of four values:
- `"row"` - tells the auto-placement algorithm to fill in each row in turn,
adding new rows as necessary (default)
- `"col"` - tells the auto-placement algorithm to fill in each column in turn,
adding new columns as necessary
- `"row_dense"` and `"col_dense"` - tells the auto-placement algorithm to
attempt to fill in holes earlier in the grid if smaller items come up later


### Grid gaps

`columnGap` and `rowGap` are used for defining a space between columns and rows
respectively.

The props accept one of four values: `"S"`, `"M"` (default), `"L"` and `"none"`
(no gaps).


#### Horizontal alignment

The Grid’s `justify` prop accepts one of four values: `"auto"` (default),
`"left"`, `"right"` and `"center"`.

The default value (`"auto"`):
```
<Grid justify="auto">
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
<Grid justify="right">
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
<Grid justify="right">
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
<Grid justify="center">
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

The Grid’s `align` prop accepts one of four values: `"auto"` (default),
`"top"`, `"middle"` and `"bottom"`.

The default value (`"auto"`):
```
<Grid align="auto">
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
<Grid align="top">
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
<Grid align="middle">
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
<Grid align="bottom">
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
using the Column’s `justify` and `align` props, respectively.


#### Horizontal alignment

The Column’s `justify` prop accepts one of four values: `"auto"` (default),
`"left"`, `"right"` and `"center"`.

`"auto"` will make all components inside the Column full width. The other
values will use the content width of the components and align them to the left,
right or center of the Column, respectively.


#### Vertical alignment

The Column’s `align` prop accepts one of four values: `"auto"`
(default), `"top"`, `"middle"` and `"bottom"`.

`"auto"` will distribute the heights of components inside the Column equally.
The other values will use the content height of the components and align them
to the top, middle or center of the Column, respectively.
