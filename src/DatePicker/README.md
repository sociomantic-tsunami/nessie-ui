## Component Description

A date and/or month picker.

## Example Usage

```
<DatePicker
    label   = "January 2000"
    headers = [ { label: 'Mon', title: 'Monday' }, ... ]
    items   = [ [ { { label: "01", value: "1" }, ... ], ... ] />
```

## Items (for testing purposes)

### Type: day (add "headers")

"headers" [{"label":"Mon","title":"Monday"},{"label":"Tue","title":"Tuesday"},{"label":"Wed","title":"Wednesday"},{"label":"Thu","title":"Thursday"},{"label":"Fri","title":"Friday"},{"label":"Sat","title":"Saturday"},{"label":"Sun","title":"Sunday"}],

"items" [[{"label":"01","value":"1","isToday":false,"isDisabled":true,"isSelected":false},{"label":"02","value":"2","isToday":false,"isDisabled":true,"isSelected":false},{"label":"03","value":"3","isToday":false,"isDisabled":true,"isSelected":false},{"label":"04","value":"4","isToday":false,"isDisabled":true,"isSelected":false},{"label":"05","value":"5","isToday":false,"isDisabled":true,"isSelected":false},{"label":"06","value":"6","isToday":false,"isDisabled":true,"isSelected":false},{"label":"07","value":"7","isToday":false,"isDisabled":true,"isSelected":false}],[{"label":"08","value":"8","isToday":false,"isDisabled":true,"isSelected":false},{"label":"09","value":"9","isToday":false,"isDisabled":true,"isSelected":false},{"label":"10","value":"10","isToday":false,"isDisabled":true,"isSelected":false},{"label":"11","value":"11","isToday":false,"isDisabled":true,"isSelected":false},{"label":"12","value":"12","isToday":false,"isDisabled":true,"isSelected":false},{"label":"13","value":"13","isToday":false,"isDisabled":true,"isSelected":false},{"label":"14","value":"14","isToday":false,"isDisabled":true,"isSelected":false}],[{"label":"15","value":"15","isToday":false,"isDisabled":true,"isSelected":false},{"label":"16","value":"16","isToday":false,"isDisabled":true,"isSelected":false},{"label":"17","value":"17","isToday":false,"isDisabled":true,"isSelected":false},{"label":"18","value":"18","isToday":false,"isDisabled":true,"isSelected":false},{"label":"19","value":"19","isToday":false,"isDisabled":true,"isSelected":false},{"label":"20","value":"20","isToday":false,"isDisabled":true,"isSelected":false},{"label":"21","value":"21","isToday":false,"isDisabled":true,"isSelected":false}],[{"label":"22","value":"22","isToday":false,"isDisabled":true,"isSelected":false},{"label":"23","value":"23","isToday":false,"isDisabled":true,"isSelected":false},{"label":"24","value":"24","isToday":true,"isDisabled":false,"isSelected":true},{"label":"25","value":"25","isToday":false,"isDisabled":false,"isSelected":false},{"label":"26","value":"26","isToday":false,"isDisabled":false,"isSelected":false},{"label":"27","value":"27","isToday":false,"isDisabled":false,"isSelected":false},{"label":"28","value":"28","isToday":false,"isDisabled":false,"isSelected":false}],[{"label":"29","value":"29","isToday":false,"isDisabled":false,"isSelected":false},{"label":"30","value":"30","isToday":false,"isDisabled":false,"isSelected":false},{"label":"31","value":"31","isToday":false,"isDisabled":false,"isSelected":false}]]

### Type: months (leave an empty object [] in "headers")

[
[{"label":"Jan","value":"1","isToday":false,"isDisabled":false,"isSelected":false},
{"label":"Feb","value":"1","isToday":false,"isDisabled":false,"isSelected":false},
{"label":"Mar","value":"1","isToday":false,"isDisabled":false,"isSelected":false},
{"label":"Apr","value":"1","isToday":false,"isDisabled":false,"isSelected":false}],

[{"label":"May","value":"1","isToday":false,"isDisabled":false,"isSelected":false},
{"label":"Jun","value":"1","isToday":true,"isDisabled":false,"isSelected":true},
{"label":"Jul","value":"1","isToday":false,"isDisabled":false,"isSelected":false},
{"label":"Aug","value":"1","isToday":false,"isDisabled":false,"isSelected":false}],

[{"label":"Sep","value":"1","isToday":false,"isDisabled":false,"isSelected":false},
{"label":"Oct","value":"1","isToday":false,"isDisabled":false,"isSelected":false},
{"label":"Nov","value":"1","isToday":false,"isDisabled":false,"isSelected":false},
{"label":"Dec","value":"1","isToday":false,"isDisabled":false,"isSelected":false}]
]
