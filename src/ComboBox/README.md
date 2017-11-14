## Component Description

Reference implementation of a combobox: combines of an text input field and a
dropdown list.

You can implement several different UI patterns using this component, including,
but not limited to:

 - a `<select>`-style dropdown list
 - a text input with autocomplete
 - a search box with suggestions

The implementation of the above is determined by the event handling behavior
provided by the consumer in the host app.

## Recommended Implementations (WIP)

The following recommendations are based on [WAI-ARIA Authoring Practices 1.1](https://w3c.github.io/aria-practices/#combobox)
with some modifications.

### `<select>`-style Dropdown List

In a `<select>`-style dropdown list the use chooses from a predefined set of
allowed values presented in the dropdown list. Free text entry is not allowed.

This pattern is often implemented as a button with a pop-up list rather than as
as a combo box. We feel that the implementation presented here represents a
closer approximation of the native `<select>` UI element however.

When implementing this pattern you should either omit `hasAutocomplete` or set
it to `false`.

#### `onClickInput`

When the ComboBox is closed (`isOpen` set to `false`) the recommended
`onClickInput` behavior is:

- set `isOpen` to `true` and set `activeOption` to the first option in the
dropdown

When the ComboBox `isOpen` the recommended `onClickInput` behavior is:

- set `isOpen` to `false`

#### `onKeyPress`

The default behavior of should be disabled using `preventDefault()`. The
`value` (as displayed in the text input) should not change upon typing printable
characters.

At all times, typing printable characters should trigger the type-ahead
behavior:
    - Single character: sets `activeOption` to the next option that starts with
the typed character
    - Multiple characters in rapid succession: sets `activeOption` to the next
option that starts with the string of characters typed

When the ComboBox is closed (`isOpen` set to `false`) the recommended key
behavior is:

- `⇩`,`Enter`,`Space`: Sets `isOpen` to `true` and sets `activeOption` to the
first option in the dropdown
- `⇧`: Sets `isOpen` to true and set `activeOption` to the last option in the
dropdown

When the ComboBox `isOpen` the recommended behavior is:

- `⇩`: Sets `activeOption` to the next option in the dropdown
- `⇧`: Sets `activeOption` to the previous option in the dropdown
- `Home`: Sets `activeOption` to the first option in the dropdown
- `End`: Sets `activeOption` to the last option in the dropdown
- `Enter`, `Space`: Sets `selectedValue` to the `activeOption`, sets `isOpen` to
`false`
- `Escape`: Sets `isOpen` to `false`, does not update `selectedValue`


### Text input with autocomplete

TBC

### Search dropdown

TBC
