## Component Description

The GridItem is part of the Nessie Grid layout system and is intended to be
used as an extension of **Grid** component in case there's a need for a
specific rules on a single grid cell. This is only a "wrapper" component that
helps you make/manage these exceptions.

#### Horizontal alignment

The GridItem’s `justify` prop accepts one of four values: `"stretch"`,
`"start"` (default), `"end"` and `"center"`.

Aligns a grid item inside a cell along the inline (row) axis. This value applies
to the content inside a single grid item.

#### Vertical alignment

The GridItem’s `align` prop accepts one of four values: `"stretch"`, `"start"`
(default), `"center"` and `"bottom"`.

Aligns a grid item inside a cells along the block (column) axis. This value
applies to the content inside a single grid item.
