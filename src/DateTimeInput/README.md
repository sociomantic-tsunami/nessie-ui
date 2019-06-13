## Component Description

A composite component consisting of a _DatePicker_ and/or a _TimeInput_ placed
inside a _Dropdown_ which, in turn, is attached to a _TextInputWithIcon_.

it uses _PopperWrapper_ for rendering the _DatePicker_ ( see _PopperWrapper_
README.md for more info ).

## Example Usage

```
<DateTimeInput
    label = "How soon is now?"
    days  = [ { label: 'Mon', title: 'Monday' }, ... ]
    weeks = [ [ { { label: "01", value: "1" }, ... ], ... ] />
```
