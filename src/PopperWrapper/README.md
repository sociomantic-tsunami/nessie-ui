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
it ( as long as `container` prop keeps its default value ).

`children` and `popper` can be used as render props (i.e. functions that return
a React element) as follows:

```
<PopperWrapper
    popper = { popperProps => <MyPopupComponent {...popperProps} /> }>
    { referenceProps =>
        <MyReferenceComponent {...referenceProps} />
    }
</PopperWrapper>
```

or as React elements as follows:

```
<PopperWrapper
    popper = { <MyPopupComponent /> }>
    <MyReferenceComponent />
</PopperWrapper>
```

**If you pass react elements PopperWrapper will call `React.cloneElement` to
inject the required props into the `children` and `popper`.**

## Example Usage

Using render props:

```
<PopperWrapper
    popper = { popperProps => (
        <Popup {...popperProps}>
            Popup content
        </Popup>
    ) }
    popperPosition = "bottom">
    { refProps =>
        <Button {...refProps}>Click me!</Button>
    }
</PopperWrapper>
```

Using elements:

```
<PopperWrapper
    popper         = { <Popup>Popup content</Popup> }
    popperPosition = "bottom">
    <Button {...refProps}>Click me!</Button>
</PopperWrapper>
```
