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

        return cssString;
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


const generateId = name =>
    `${name}-${Math.floor( ( Math.random() * 9e15 ) + 1e15 )}`;


export { buildClassName, buildDisplayName, eventHandler, generateId };

export default { buildClassName, buildDisplayName, eventHandler, generateId };
