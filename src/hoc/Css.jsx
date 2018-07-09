import React                from 'react';
import PropTypes            from 'prop-types';


const NessieCss = ( { children, cssMap, cssProps } ) =>
{
    const CSS_SEPARATOR = '  ';
    const CSS_MODIFIER  = '__';

    const createCssString = () =>
    {
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
    };

    const prevClassName   = children.props.className;
    const newClassName    = createCssString() +
    ( prevClassName ? ( CSS_SEPARATOR + prevClassName ) : '' );

    return React.cloneElement( children,
        {
            className : newClassName
        } );
};

NessieCss.propTypes =
{
    cssMap   : PropTypes.objectOf( PropTypes.string ),
    cssProps : PropTypes.objectOf( PropTypes.oneOfType( [
        PropTypes.string,
        PropTypes.number,
        PropTypes.bool
    ] ) )
};

NessieCss.defaultProps =
{
    cssMap   : {},
    cssProps : {}
};

export default NessieCss;
