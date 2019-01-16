## Component Description

ListBox presents a list of options and allows a user to select one or more of
them. A listbox that allows a single option to be chosen is a single-select
listbox; one that allows multiple options to be selected is a multi-select
listbox.


## Example Usage

```
<ListBox options = { [
    { text : 'Option' },
    {
        text        : 'Option with description',
        value       : 'value2',
        description : 'Option description',
    },
    {
        text       : 'Disabled option',
        value      : 'value3',
        isDisabled : true,
    },
    {
        header  : 'Subsection 1',
        options : [
            { text : 'Subsection option 1' },
            { text : 'Subsection option 2' },
        ]
    } ] } />
```
