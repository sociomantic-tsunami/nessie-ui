Component Description
---------------------

A Nessie DragNDrop is a drag and drop zone that allows dragging files into it, then appends an overlay div after the zone's children that gives a slightly wider and higher low opacity div with a dotted border. A message is shown to hint at what is being uploaded and on mouse release a loading icon appears until the loading state is returned to default.

Example Usage
-------------

    <DragNDrop message="Drop image file to upload">
        {children}
    </DragNDrop>
