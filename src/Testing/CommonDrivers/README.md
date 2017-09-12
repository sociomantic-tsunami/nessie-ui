Common Drivers
================

Component drivers can be standalone classe explicitly simulating each action. 
That said, There are base Component Drivers that implement much of what many 
simple components need.

A simple component is a component made of a single (or a main) component that 
requires interaction. components can inherit one of the following:
1. `SimpleComponentDriver` - assumes the component can be hovered, focused and the 
like.
2. `ClickableComponentDriver` - assumes the component can be clicked (inherits 
everything from `SimpleComponentDriver` as well)
3. `InputComponentDriver` - assume the component is an input component, meaning 
that a key can be pressed into it, and that it has a value.

In order to inherit one of this, you need to identify the inner component that 
the events should act on. Identifying this, you should pass the a selector to 
the constructor of the chosen super class.

Some Components are "Compound Components", meaning that while they might not 
inheirt one of the super classes mentioned above, they might have a reference to
 a few child drivers, and each of them will inherit an appropriate super class. 
 For exmaple, a formDriver is using two drivers. One for cancel button, and one 
 for a save button. Each of them is A `ButtonDriver` that inherits 
 `ClickableComponentDriver`.