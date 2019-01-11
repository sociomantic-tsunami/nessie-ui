## Component Description

The Column component is part of the Nessie layout system. Column is a flex
container that is laying it's items in vertical (column) direction.


#### Note

We've updated how **Grid** component works, so it's recommended to use
`Column` component only if you need to achieve specific sizing of a single
row/column.


### Size

Configure the width of Columns using their `size` prop.  The `size` prop accepts
any fraction down to 1/24 (expressed as a string: `"1/24"`) or the value
`"content"`.

`"content"` will use the Column’s content width as its size.


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



If you don’t set column sizes the column widths will be distributed evenly.
