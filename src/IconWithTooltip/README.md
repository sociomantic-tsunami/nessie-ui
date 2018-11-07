Component Description
---------------------

A Nessie icon with a tooltip its a wrapper, can be standalone or contain other nodes in which case it appends the icon with tooltip to the wrapped content.

By default the icon is the **info** **?**

Example Usage
-------------

this will produce the **orange !** icon

    <IconWithTooltip message="Something’s wrong!" iconType="alert"/>

this will produce the **green ✓** icon

    <IconWithTooltip message="Input validated" iconType="validation"/>


this will produce the **info ?** icon

    <H2>
    	<IconWithTooltip message="Detailed explanation of My Module">
    		My Module Header
		</IconWithTooltip>
	</H2>
