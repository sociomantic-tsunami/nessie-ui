## Component Description

IconWithTooltip can be used in two ways: as a standalone icon-with-tooltip
combo, or as a wrapper for other components. In the latter case it will position
the icon and associated tooltip relative to the wrapped content.

The default icon is the “info” icon.

**This component is deprecated. If you need an icon with tooltip you should
compose it from the Icon and Tooltip components.**


## Example Usage

a simple icon with an associated tooltip:
```
<IconWithTooltip message="Input validated" iconType="validation"/>
```

an icon with tooltip positioned relative to some wrapped content:
```
<IconWithTooltip message="Detailed explanation of My Module">
	<H2>My Module Header</H2>
</IconWithTooltip>
```
