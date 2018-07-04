import React            from 'react';
import PropTypes        from 'prop-types';

import spriteHtml       from '../Icon/sprite.html';
import { generateId }   from '../utils';


export default class SpriteMap extends React.PureComponent
{
    static propTypes =
    {
        /**
         * HTML id attribute (overwrite default)
         */
        id             : PropTypes.string,
        /**
         * builds sprites
         */
        spriteTemplate : PropTypes.func
    };

    static defaultProps =
    {
        id : undefined
    };

    render()
    {
        const {
            spriteTemplate = { __html: spriteHtml },
            id = generateId( 'SpriteMap' )
        } = this.props;

        return (
            <div id = { id } dangerouslySetInnerHTML = { spriteTemplate } />
        );
    }
}
