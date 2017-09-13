Component Description
---------------------

A Nessie Button component is a button with different appearences (_presentations_), a loading state and an optional icon.


Example Usage
-------------

A primary button in read-only state:

    <Button isDisabled={ true }>Can’t click me!</Button>

A primary button in loading state:

    <Button isLoading={ true }>Can’t click me!</Button>

A primary button width an icon on the right:

    <Button iconType="right" iconPosition="right">Next Page</Button>

---

A subtle button:

    <Button label="Ended!" presentation="subtle" iconType="ended">Ended!</Button>

---

A secondary button:

    <Button presentation="secondary">Click me!</Button>
