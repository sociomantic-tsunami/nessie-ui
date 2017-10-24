## Component Description

DatePicker currently exports a DatePicker and/or a TimeInput placed inside a
Dropdown which, in turn, is attached to a TextInputWithIcon.

**In a future release this component will export just the DatePicker.** It
will be up to the host app to place the DatePicker inside a Dropdown and attach
the Dropdown to an input (or any other component).


## Example Usage

```
<DatePicker
    label = "How soon is now?"
    days  = [ { label: 'Mon', title: 'Monday' }, ... ]
    weeks = [ [ { { label: "01", value: "1" }, ... ], ... ] />
```
