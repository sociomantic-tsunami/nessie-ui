const Drivers = new WeakMap();

const Err =
{
    BAD_DRIVER_NODE_COUNT : ( { count } ) => `ReactWrapper::driver() requires the wrapper to contain exactly one node, but the wrapper contains ${count} nodes`,
    SHALLOW_NOT_SUPPORTED : 'ShallowWrapper::driver() is not supported.',
    NO_DRIVER_FOUND       : ( { name } ) =>`Could not find driver for Component ${name}`,
    BAD_SUITE_COMPONENT   : 'Invalid driver suite specification; expect "Component" to be a function.',
    BAD_SUITE_DRIVER      : 'Invalid driver suite specification; expect "Driver" to be a function.'
};


export function extendEnzyme( enzyme )
{
    enzyme.ReactWrapper.prototype.driver = function()
    {
        if ( this.length === 0 )
        {
            throw new Error( Err.BAD_DRIVER_NODE_COUNT( { count : this.length } ) );
        }

        const componentConstructor = this.type();
        const Driver = Drivers.get( componentConstructor );

        if( !Driver )
        {
            throw new Error( Err.NO_DRIVER_FOUND( { name : componentConstructor.name } ) );
        }

        return new Driver( this );
    };

    enzyme.ShallowWrapper.prototype.driver = function()
    {
        throw new Error( Err.SHALLOW_NOT_SUPPORTED );
    };
}

export function createDriverSuite( suiteSpec, ...extensions )
{
    return {
        provideDrivers : () =>
        {
            extensions.forEach( suite => suite.provideDrivers() );
            provideDrivers( suiteSpec );
        }
    };
}


function provideDrivers( suiteSpec )
{
    suiteSpec.forEach( ({ Component, Driver }) =>
    {
        if( !( typeof Component === 'function' ) )
        {
            throw new Error( Err.BAD_SUITE_COMPONENT );
        }

        if( !( typeof Driver === 'function' ) )
        {
            throw new Error( Err.BAD_SUITE_DRIVER );
        }

        Drivers.set( Component, Driver );
    } );
}
