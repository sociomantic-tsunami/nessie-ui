## Component Description

A combination of an text input field and a dropdown list.

You can implement several different UI patterns using this component, including,
but not limited to:

- a `<select>`-style dropdown list
- a text input with autocomplete
- a search box with suggestions

The implementation of the above is determined by the event handling behavior
provided by the consumer in the host app.

it uses _PopperWrapper_ for rendering the dropdown list ( see _PopperWrapper_
README.md for more info ).

## Recommended Implementations (WIP)

The following recommendations are based on [WAI-ARIA Authoring Practices 1.1](https://w3c.github.io/aria-practices/#combobox)
with some modifications.

### Common behaviors

The following behaviors are common to all implementations:

#### `onMouseOverOption`

Should set `activeOption` to the id returned as the second argument passed to
`onMouseOverOption`.

#### `onMouseOutOption`

No implementation required.

#### `onClickOption`

Should set `selection` to to the id returned as the second argument passed to
`onClickOption`; unset `activeOption`; set `inputValue` to the text/label
associated with `selection`, unset `options` and `isOpen`

### `<select>`-style Dropdown List

In a `<select>`-style dropdown list the user chooses from a predefined set of
allowed values presented in the dropdown list. Free text entry is not allowed.

This pattern is often implemented as a button with a pop-up list rather than as
as a combo box. We feel that the implementation presented here represents a
closer approximation of the native `<select>` UI element.

When implementing this pattern you should not set `hasAutocomplete`.
`inputIsReadOnly` should be set at all times in this pattern.

#### `onFocus`

No implementation required.

#### `onBlur`

No implementation required.

#### `onClickInput`

When the ComboBox is closed (`isOpen` is unset):

- set `isOpen` and set `activeOption` to the id of first option in the dropdown

When the ComboBox `isOpen`:

- set `isOpen` to `false`

#### `onKeyDown`

The default behavior of should be disabled using `preventDefault()`. The
`value` (as displayed in the text input) should not change upon typing printable
characters.

At all times, typing printable characters should trigger the type-ahead
behavior: - Single character: sets `activeOption` to the next option that starts with
the typed character - Multiple characters in rapid succession: sets `activeOption` to the next
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
- `Enter`, `Space`: Sets `selection` to the `activeOption`, sets
  `inputValue` to the `text` associated with `selection`, sets `isOpen` to
  `false`
- `Escape`: Sets `isOpen` to `false`, does not update `selection`

### Text input with autocomplete

TBC

### Search dropdown

This pattern displays a list of search results.

This pattern can optionally implement inline autocomplete. If it does, you
should set `hasAutocomplete`.

The desired _no results found_ message should be defined by the
`dropdownPlaceholder` prop.

#### `onFocus`

- `inputValue` is cleared

#### `onBlur`

- `options` and `isOpen` should be unset
- `inputValue` should be set to the text/label associated with `selectedOption`

#### `onClickInput`

Not implemented.

#### `onChangeInput`

At all times:

- Updates `inputValue` to display the characters entered; triggers search

When `inputValue` is non-empty:

- set `isOpen`

When search results are available for `inputValue`:

- `options` should be populated with the results. `activeOption` should be set
  to the id of first option in the list.

When `inputValue` is non-empty but no search results are available:

- `options` should be unset (the text defined in `dropdownPlaceholder` will be
  displayed in the dropdown)

When `inputValue` is empty:

- unset `options` and `isOpen`

#### `onKeyDown`

At all times:

- `Escape`: Clears `inputValue`; unsets `isOpen`; does not update `selection`
- `Home`: Default behavior (cursor moves to start of input)
- `End`: Default behavior (cursor moves to end of input)
- `Space`: Default behavior (space character is printed in the input)

When search results are available:

- `⇩`: Sets `activeOption` to the next option in the dropdown
- `⇧`: Sets `activeOption` to the previous option in the dropdown
- `Enter`: sets `selection` to the `activeOption` and unsets `activeOption`;
  sets `inputValue` to the text/label associated with `selection`, unsets
  `options` and `isOpen`
