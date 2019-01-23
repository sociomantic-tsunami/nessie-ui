## Component Description

You’ll be needing this if you wanna use the Icon component...

## Example Usage

You should create a separate React mountpoint for the SpriteMap, e.g:
```
<html>
    <head>
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
