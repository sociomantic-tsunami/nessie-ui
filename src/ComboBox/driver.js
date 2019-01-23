// /*
//  * Copyright (c) 2018 dunnhumby Germany GmbH.
//  * All rights reserved.
//  *
//  * This source code is licensed under the MIT license found in the LICENSE file
//  * in the root directory of this source tree.
//  *
//  */
//
// import { IconButton, TextInput, ListBox, ScrollBox } from 'nessie-ui';
//
// export default class ComboBoxDriver
// {
//     constructor( wrapper )
//     {
//         this.wrapper = wrapper;
//     }
//
//     blur()
//     {
//         this.wrapper.find( TextInput ).driver().blur();
//         return this;
//     }
//
//     changeInput( val )
//     {
//         this.wrapper.find( TextInput ).driver().change( val );
//         return this;
//     }
//
//     clickIcon()
//     {
//         this.wrapper.find( IconButton ).driver().click();
//         return this;
//     }
//
//     clickInput()
//     {
//         this.wrapper.find( TextInput ).driver().click();
//         return this;
//     }
//
//     clickOption( index = 0 )
//     {
//         this.wrapper.find( ListBox ).driver().clickOption( index );
//         return this;
//     }
//
//     focus()
//     {
//         this.wrapper.find( TextInput ).driver().focus();
//         return this;
//     }
//
//     keyPress( keyCode )
//     {
//         this.wrapper.find( TextInput ).driver().keyPress( keyCode );
//         return this;
//     }
//
//     keyDown( keyCode )
//     {
//         this.wrapper.find( TextInput ).driver().keyDown( keyCode );
//         return this;
//     }
//
//     keyUp( keyCode )
//     {
//         this.wrapper.find( TextInput ).driver().keyUp( keyCode );
//         return this;
//     }
//
//     mouseOut()
//     {
//         this.wrapper.simulate( 'mouseOut' );
//         return this;
//     }
//
//     mouseOver()
//     {
//         this.wrapper.simulate( 'mouseOver' );
//         return this;
//     }
//
//     mouseOutOption( index = 0 )
//     {
//         this.wrapper.find( ListBox ).driver().mouseOutOption( index );
//         return this;
//     }
//
//     mouseOverOption( index = 0 )
//     {
//         this.wrapper.find( ListBox ).driver().mouseOverOption( index );
//         return this;
//     }
//
//     scroll( offset = 0 )
//     {
//         this.wrapper.find( ScrollBox ).driver().scrollVertical( offset );
//         return this;
//     }
// }
