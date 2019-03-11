## Component Description

A _PopperWrapper_ is a wrapper component that helps you to manage popups

By default, _PopperWrapper_ will add the popup as a sibling of the DOM node that
is included as a children / reference.

_PopperWrapper_ can also render the popup into a DOM node outside the DOM
hierarchy of the children / reference DOM node, for this, _PopperWrapper_ uses
[React Portals](https://reactjs.org/docs/portals.html); you can add the
`container` prop to pass the `id` of that DOM node, or if you need to render the
popup always at the bottom of the `<body>` of your app ( in order to avoid
conflicts / overlaps with some other stuff ) you can add an extra div with
"nessie-overlay" as id ( `<div id="nessie-overlay>` ) at the bottom of the
`<body>`, if this div exists _PopperWrapper_ will always render the popup inside
it ( as long as `container` prop is undefined ).

## Example Usage

```
<PopperWrapper
    popper         = "Popup content"
    popperPosition = "bottom">
    <Button label = "Click me!"/>
</PopperWrapper>

```
