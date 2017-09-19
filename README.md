# nessie - 4.0.6

React + CSS-Modules + Loads of tests = Robust components for monstrous UIs!

## Usage

There are three dependencies you’ll need to include in your app to use Nessie:

1. The Nessie JS,
1. the Nessie CSS
1. and the Nessie SVG sprite map

Since your exact requirements may vary, we’ll leave it up to you decide exactly
how these should be implemented (the options are outlined below).

### JS

#### Importing all components as `Nessie.ComponentName`

If you want _everything_:
```
import * as Nessie from 'nessie';
```

#### Importing individual components:

If you want specific components:
```
import { ComponentName } from 'nessie';
```

### CSS

The Nessie CSS is bundled separately in `dist/styles.css`. You can either import
this file using webpack `css-loader` or load it directly in your HTML.

### Sprite map

In order to use the `<Icon>` component (and other components that make use of
icons), you’ll need the Nessie SVG sprite map component.

There are two ways that you can implement this:

#### Including the raw sprite map your HTML

You can add `/dist/sprite.html` directly in your HTML. The method of doing this
is up to you.

#### Using the SpriteMap component

The `<SpriteMap>` component can be inserted anywhere inside your `<App>` (e.g.
as a direct child of the Nessie `<Page>` component).

However the __preferred__ method is to add a second React mount point
specifically for the sprite map. The pattern is:

```
<html>
    <head>
        ...
    </head>
    <body>
        <div id="root"></div>
        <div id="spriteMap"></div>
    </body>
</html>
```

```
ReactDOM.render( <App />, document.getElementById( 'root' ) );
ReactDOM.render( <SpriteMap />, document.getElementById( 'spriteMap' ) );
```

## Component Reference

See the individual `README.md` files in each component folder.


## Contributing

We gladly accept and review any pull requests. Feel free! :heart:

To get you started we’ve written a [Nessie Dev Guide](https://github.com/sociomantic-tsunami/nessie/wiki/Nessie-Dev-Guide).

### Code of Conduct

This project adheres to the [Contributor
Covenant](<http://contributor-covenant.org/>). By participating, you
are expected to honor this code.

[Nessie - Code of
Conduct](<https://github.com/sociomantic-tsunami/nessie/blob/master/CODE_OF_CONDUCT.md>)
