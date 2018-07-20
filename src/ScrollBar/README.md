## Component Description

A styled replacement for native scrollbars, consisting of a scroll track and a
scroll thumb.

### Implementation Notes

The following callbacks props are invoked with updated scroll position when the
user interacts with the ScrollBar:

- `onChange` fires when when the user drags the scroll thumb
- `onClickTrack` fires when the user clicks the scroll track (not the thumb)

## Example Usage

```
<ScrollBar
    orientation = "horizontal"
    scrollMin   = { 0 }
    scrollMax   = { 1000 }
    scrollPos   = { 50 } />
```
