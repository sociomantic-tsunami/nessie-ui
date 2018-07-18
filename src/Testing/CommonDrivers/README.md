Common Drivers
================

Component drivers can be standalone classes explicitly simulating each action.
That said, there are base Component Drivers that implement much of what many
simple components need.

A simple component is a component made of a single (or a main) component that
requires interaction. Components can inherit one of the following:
1. `WrapperDriver` - assumes the component has content
2. `SimpleComponentDriver` - assumes the component can be hovered, focused and
clicked (inherits everything from `WrapperDriver`)
3. `InputComponentDriver` - assume the component is an input component, meaning
that a key can be pressed into it, and that it has a value (inherits everything
from `SimpleComponentDriver`)

In order to inherit one of this, you need to identify the inner component that
the events should act on. Identifying this, you should pass a selector to
the constructor of the chosen super class.

Some Components are "Compound Components", meaning that while they might not
inherit one of the super classes mentioned above, they might have a reference
to a few child drivers, and each of them will inherit an appropriate super
class. For example, a formDriver is using two drivers. One for cancel button,
and one for a save button. Each of them is `WrapperDriver` that inherits
`SimpleComponentDriver`.
