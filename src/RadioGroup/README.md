Component Description
---------------------

A Nessie RadioGroup is a wrapper just for convenience: it builds a radio group from an array of strings _or_ an array of objects with the following shape:

    {
        label      : <string>,
        value      : <string>,
        isReadOnly : <boolean>,
        isDisabled : <boolean>,
        hasError   : <boolean>
    }

**This is not the preferred method of building a radio group.** Instead consider building the Radios yourself wrapping them with the generic CheckableGroup component.

Example Usage
-------------

Values set using array of strings:

    <RadioGroup label         = "What’s your favorite fruit?"
                values        = { [ 'apples', 'oranges', 'kaki' ] }
                selectedValue = { 'apples' }/>

or using an array of objects:

    <RadioGroup label   = "What’s your favorite fruit?"
                values  = { [
                                { label: 'apples',  value: 'value1', isReadOnly : true },
                                { label: 'oranges', value: 'value2', isDisabled : true },
                                { label: 'kaki',    value: 'value3', hasError : true },
                          ] }
                selectedValue = "value1"/>

Individual radios can be independently configured to be read-only, disabled, or
in error state, which are `OR`'d with the corresponding props in the radio group.
