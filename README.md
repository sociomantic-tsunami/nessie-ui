# Nessie

Nessie is the dunnhumby media UI component library.

## Focus Management

Don’t use `ref`s for focus management. By convention we always return the
outermost element of a given component as `ref`. This is not necessarily the
thing that should receive focus.

Instead, pass a unique `id` to the component and use
`document.getElementById(myId).focus()` to focus it.

We’ll always make sure that the DOM element with `id` is the thing that you want
to focus.
