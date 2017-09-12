import React         from 'react';

import spriteHtml    from '../Icon/sprite.html';
import Component     from '../proto/Component';


export default class SpriteMap extends Component
{
    render()
    {
        const spriteTemplate = { __html: spriteHtml };

        return (
            <div dangerouslySetInnerHTML = { spriteTemplate } />
        );
    }
}
