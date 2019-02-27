# Nessie

Nessie is the dunnhumby media UI component library.

When using _PopperWrapper_ to attach popups to a specific DOM element you
should include an extra div at the end of the body in your app, this div should
have "nessie-overlay" as id  `<div id="nessie-overlay>`, if you don't add this
div the popup content will be directly added at the bottom of the `<body>` and it
could cause some conflicts with some other stuff you might need to add there.
