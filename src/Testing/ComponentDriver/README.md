Component Driver
================

This module provides a minimal [Enzyme](https://github.com/airbnb/enzyme)
extension allowing custom component drivers to be configured for each component
constructor.


Usage Example
-------------

### Step 1: create component driver classes.

The constructor accepts one `wrapper` argument, which is the Enzyme `ReactWrapper`
instance for the component your driver is for (we'll see later how to actually
link the driver class to the component).

Note that the class doesn't have to derive from anything. Also, there is no
magic in the class definition: the methods you expose are exactly what the
driver will have.

```es6
export default class ModuleDriver
{
    constructor( wrapper )
    {
        this.wrapper = wrapper;
    }

    humanClickToggle()
    {
        this.wrapper.find( '.selector_for_toggle_button' )
            .simulate( 'click' );
        return this;
    }

    isExpanded()
    {
        return this.wrapper.find( SomeScreen )
            .prop( 'isCollapsed' ) === false;
    }
}
```


### Step 2: define a driver suite

The driver suite links the components to their drivers. It looks like this:


```es6
import { ComponentDriver } from 'nessie/dist/componentDriver'; // just 'componentDriver' within Nessie
import Module from 'path/to/module';
import ModuleDriver from 'path/to/module/driver';

export default ComponentDriver.createDriverSuite(
[
    {
        Component : Module,
        Driver    : ModuleDriver
    },
    /* ... more Component-Driver linkages ... */
] );
```


### Step 3: Activate component drivers in tests.

Somewhere in your test suite entry point, you activate the drivers and provide
the enzyme extension to use drivers.


```es6
import * as enzyme from 'enzyme';
import { ComponentDriver } from 'nessie/dist/componentDriver'; // just 'componentDriver' within Nessie
import driverSuite from 'path/to/driver/suite';

// Extend enzyme's API to make drivers available.
ComponentDriver.extendEnzyme( enzyme );

// Register the driver suite for use.
driverSuite.provideDrivers();
```


### Step 4: use the drivers in tests!

Now the method `driver()` to available to all instances of Enzyme's `ReactWrapper`
(however, **not** Enzyme's `ShallowWrapper`!). Provided that drivers have been
correctly linked up to the components, we can now write tests semantically
using the drivers.

```es6
import { mount } from 'enzyme';
import Module from 'path/to/module';

it( 'initial state is expanded', () =>
{
    const wrapper = mount( <Module title='my module title' /> );
    expect( wrapper.driver().isExpanded() ).true;
} );

it( 'clicking toggle changes the toggle state', () =>
{
    const wrapper = mount( <Module title='my module title' /> );
    const driver = wrapper.driver();

    driver.humanClickToggle();
    expect( driver.isExpanded() ).false;
    driver.humanClickToggle();
    expect( driver.isExpanded() ).true;
} );
```

Driver API Recommendations
--------------------------

It's probably a good idea to adopt consistent convention to distinguish
getters from human action simulations from programmatic action simulations.
