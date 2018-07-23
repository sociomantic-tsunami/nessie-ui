Common Drivers
================

Component drivers can be standalone classes explicitly simulating each action.
That said, there are base Component Drivers that implement much of what many
simple components need.

A simple component is a component made of a single (or a main) component that
requires interaction. Components can inherit `InputComponentDriver` which
assume the component is an input component, meaning that a key can be pressed
into it, and that it has a value.

In order to inherit it, you need to identify the inner component that
the events should act on. Identifying this, you should pass a selector to
the constructor of the chosen super class.
