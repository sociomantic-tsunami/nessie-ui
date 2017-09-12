Component Description
---------------------

A Nessie CheckboxGroup is just a wrapper for convenience: it builds a checkbox group from an array of strings _or_ an array of objects with the following shape:

    {
        label      : <string>,
        value      : <string>,
        isReadOnly : <boolean>,
        isDisabled : <boolean>,
        hasError   : <boolean>
    }

**This is not the preferred method of building a checkbox group.** Instead consider building the Checkboxes yourself wrapping them with the generic CheckableGroup component.

Example Usage
-------------

Values set using array of strings:

    <CheckboxGroup label          = "Which fruits do you like?"
                   values         = { [ 'apples', 'oranges', 'kaki' ] }
                   selectedValues = { [ 'apples', 'kaki' ] }/>


or using an array of objects:

    <CheckboxGroup label   = "Which fruits do you like?"
                   values  = { [
                                  { label: 'apples',  value: 'value1', isReadOnly : true },
                                  { label: 'oranges', value: 'value2', isDisabled : true },
                                  { label: 'kaki',    value: 'value3', hasError : true },
                             ] }
                   selectedValues = { [ 'value1', 'value3' ] }/>

Individual checkboxes can be independently configured to be read-only, disabled, or
in error state, which are `OR`'d with the corresponding props in the checkbox group.
