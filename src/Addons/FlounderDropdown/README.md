Component Description
---------------------

Nessie Flounder dropdown component:

- Does everything Flounder can do and more.
- Native `flounder` object is accessible for API calls as `refs.flounder` (use
with caution!)
- Can be styled as a header (H1-4) by specifying the optional the `headerLevel`
prop.

The following native Flounder options are supported as props:

- `data` (with additional property `icon`)
- `defaultValue` (has the usual React meaning here, unlike in native Flounder, also supports array)
- `multiple`
- `multipleTags`
- `multipleMessage`
- `noMoreOptionsMessage`
- `noMoreResultsMessage`
- `onChange`
- `onClose`
- `onFirstTouch`
- `onInputChange`
- `onOpen`
- `openOnHover`
- `placeholder` (placeholder is _always_ added, unlike native Flounder)
- `search`

The following native options have no sense in FlounderDropdown and are __not__
supported:

- `allowHTML` (current implementation considered dangerous)
- `classes` (use `cssMap` instead)
- `defaultEmpty` (instead omit `value` and/or `defaultValue` prop)
- `defaultIndex` (use `value` instead)
- `disableArrow` (set `icon` to `'none'` instead)
- `keepChangesOnDestroy` (not applicable)
- `onComponentDidMount` (not applicable)
- `onComponentWillUnmount` (not applicable)
- `onInit` (not applicable)
- `selectDataOverride` (not applicable)


Example Usage
-------------

Using a data object:

    <FlounderDropdown data = { [
                                {
                                    "text"  : "flounderOptionText1",
                                    "value" : "flounderOptionValue1",
                                },
                                {
                                    "text"  : "flounderOptionText2",
                                    "value" : "flounderOptionValue2"
                                }
                            ] } />

With a label, using simple strings as data:

    <FlounderDropdown label : "Pick an animal",
                      data  : { [ 'dog', 'cat', 'panda' ] } />

A header (H1) dropdown:

    <FlounderDropdown headerLevel = { 1 }
                      data  : { [ 'apples', 'oranges', 'pears' ] } />


An icon can be shown for a given dropdown option by setting the `icon`
property:


    <FlounderDropdown data = { [
                                {
                                    "text"       : "flounderOptionText1",
                                    "value"      : "flounderOptionValue1",
                                    "icon"       : "blueDot"
                                },
                                ...
                            ] } />

The following icons are available:

- `alert`
- `approved`
- `blueDot`
- `declined`
- `ended`
- `error`
- `include`
- `exclude`
- `includeExclude`
- `pending`



Test `data` for Lochness
------------------------

Paste this into the `data` field to add extra test data:

```
[
   "Option",
    {
        "text"        : "Option with description",
        "value"       : "value2",
        "description" : "Option description"
    },
    {
        "text"  : "Option with icon (blueDot)",
        "value" : "value3",
        "icon"  : "blueDot"
    },
    {
        "text"        : "Option with icon (approved) and description",
        "value"       : "value4",
        "description" : "Option description",
        "icon"        : "approved"
    },
    {
        "text"     : "Disabled option",
        "value"    : "value5",
        "disabled" : true
    },
    {
        "text"        : "Disabled option with description",
        "description" : "Option description",
        "value"       : "value6",
        "disabled"    : true
    },
    {

        "text"     : "Disabled option with icon",
        "value"    : "value7",
        "icon"     :"error",
        "disabled" : true
    },
    {
        "text"        : "Disabled option with icon and description",
        "description" : "Option description",
        "value"       : "value8",
        "icon"        :"ended",
        "disabled"    : true
    },
    {
        "text"  : "Option with really, really, really, really, really, really, really, really, really, long text",
        "value" : "value9"
    },
    {
        "text"        : "Option with really, really, really, really, really, really, really, really, really, long text and a long description too",
        "description" : "Option description is really, really, really, really, really, really, long too",
        "value"       : "value10"
    },
    {
        "text"        : "Option with really, really, really, really, really, really, really, really, really, long text and a long description and an icon",
        "description" : "Option description is also really, really, really, really, really, really, long",
        "value"       : "value11",
        "icon"        : "pending"
    },
    {
        "text"        : "Disabled option with really, really, really, really, really, really, really, really, really, long text and a long description and an icon",
        "description" : "Option description is also really, really, really, really, really, really, long",
        "value"       : "value12",
        "icon"        : "alert",
        "disabled"    : true
    },
    {
        "header" : "Subsection 1",
        "data"   : [
            "Subsection option 1",
            "Subsection option 2",
            {
                "text"        : "Subsection option with really, really, really, really, really, really, really, really, really, long text and a long description and an icon",
                "description" : "Option description is also really, really, really, really, really, really, long",
                "value"       : "value12",
                "icon"        : "alert"
            } ]
    },
    {
        "header" : "Subsection 2",
        "data"   : [
            "Subsection option 1",
            "Subsection option 2",
            {
                "text"        : "Subsection option with really, really, really, really, really, really, really, really, really, long text and a long description and an icon",
                "description" : "Option description is also really, really, really, really, really, really, long",
                "value"       : "value13",
                "icon"        : "alert"
            } ]
    }
]
```
