## Component Description

The [Feather Icons](https://feathericons.com/) as a sprite map. You’ll need this
if you want to use the Icon component, or any other component that uses icons.

## Example Usage

You should create a separate ReactDOM mount point for SpriteMap, e.g:

```
<html>
    <head>
        <title>My Amazing Webapp</title>
        ...
    </head>
    <body>
        <div id="myApp"></div>
        <div id="spriteMap"></div>
    </body>
</html>
```

```
ReactDOM.render( <App />, document.getElementById( 'myApp' ) );
ReactDOM.render( <SpriteMap />, document.getElementById( 'spriteMap' ) );
```
