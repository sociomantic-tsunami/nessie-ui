const CSS_MODIFIER  = '__';
const CSS_SEPARATOR = '  ';


const buildClassName = ( className, cssMap = {}, cssProps = {} ) =>
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
                    cssMapClass = cssMap[ prop + CSS_MODIFIER + propValue ];
                }

                if ( cssMapClass )
                {
                    cssString += CSS_SEPARATOR + cssMapClass;
                }
            }
        } );

        cssString += className ? ( CSS_SEPARATOR + className ) : '';

        return cssString || undefined;
    }
};


const buildDisplayName = ( WrapperComponent, WrappedComponent ) =>
{
    const wrapperComponentName = getComponentName( WrapperComponent );
    const wrappedComponentName = getComponentName( WrappedComponent );

    return `${wrapperComponentName}(${wrappedComponentName})`;
};

const eventHandler = ( func, ...rest ) =>
    func && ( ( ...args ) => func( ...args, ...rest ) );


const getComponentName = Component =>
    Component.displayName || Component.name || 'Component';


const generateId = componentName =>
    `${componentName}${Math.floor( ( Math.random() * 9e15 ) + 1e15 )}`;


const mapAria = ( ariaObj = {} ) =>
{
    const res = { role: ariaObj.role };

    Object.keys( ariaObj ).forEach( key =>
    {
        const value = ariaObj[ key ];
        if ( key !== 'role' && value )
        {
            res[ `aria-${key.toLowerCase()}` ] = ariaObj[ key ].toString();
        }
    } );

    return res;
};

export { buildClassName, buildDisplayName, eventHandler, generateId, mapAria };

export default {
    buildClassName,
    buildDisplayName,
    eventHandler,
    generateId,
    mapAria
};
