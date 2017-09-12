import React, { Component } from 'react';
import PropTypes            from 'prop-types';

const CSS_SEPARATOR = '  ';
const CSS_MODIFIER  = '__';

export default class NessieCss extends Component
{
    static propTypes =
    {
        cssMap   : PropTypes.objectOf( PropTypes.string ),
        cssProps : PropTypes.objectOf( PropTypes.oneOfType( [
            PropTypes.string,
            PropTypes.number,
            PropTypes.bool
        ] ) )
    };

    static defaultProps =
    {
        cssMap   : {},
        cssProps : {}
    };

    cssString()
    {
        const { cssMap, cssProps } = this.props;

        if ( cssMap )
        {
            const defaultString = cssMap.default;

            let cssString = defaultString || '';

            Object.keys( cssProps ).forEach( prop =>
            {
                const propValue = cssProps[ prop ];

                if ( propValue )
                {
                    let cssMapClass = '';

                    if ( propValue === true )
                    {
                        cssMapClass = cssMap[ prop ];
                    }
                    else
                    {
                        cssMapClass = cssMap[
                            prop + CSS_MODIFIER + propValue
                        ];
                    }

                    if ( cssMapClass )
                    {
                        cssString += CSS_SEPARATOR + cssMapClass;
                    }
                }
            } );

            return cssString;
        }
    }

    render()
    {
        const prevClassName   = this.props.children.props.className;
        const newClassName    = this.cssString() +
            ( prevClassName ? ( CSS_SEPARATOR + prevClassName ) : '' );

        return React.cloneElement( this.props.children,
            {
                className : newClassName
            } );
    }
}
