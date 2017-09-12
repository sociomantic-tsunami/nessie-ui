Component Description
---------------------

A Nessie ModalDialog displays wrapped content in a modal container that overlays the main content of the page. See example usage:


Example Usage
-------------

default (no border)

    <ModalDialog>
        <H3>Header</H3>
        <p>Modal box content</p>
        <TextInput/>
        <Button role="subtle">OK</Button>
    </ModalDialog>

neutral, crucial( grey or red border)

    <ModalDialog type="crucial">
        <H3>Header</H3>
        <p>Modal box content</p>
        ...
    </ModalDialog>


carousel

    <ModalDialog type="carousel" title="puppy time">
        <img title="puppy time" src="http://lorempixel.com/output/animals-q-c-640-480-8.jpg"/>
    </ModalDialog>
