import 'mock-local-storage';

// toBeType extension; to the date, Jest didn't implement this natively
// https://github.com/facebook/jest/issues/3457#issuecomment-334846026
expect.extend( {
    toBeType( received, argument )
    {
        const initialType = typeof received;
        const type = initialType === 'object' ?
            Array.isArray( received ) ?
                'array' : initialType
            : initialType;
        return type === argument ? {
            message : () => `expected ${received} to be type ${argument}`,
            pass    : true
        } : {
            message : () => `expected ${received} to be type ${argument}`,
            pass    : false
        };
    }
} );

describe( 'testing extended expect', () =>
{
    it( 'tests normal types correctly', () =>
    {
        expect( '' ).toBeType( 'string' );
        expect( {} ).toBeType( 'object' );
        expect( 1 ).toBeType( 'number' );
    } );
    it( 'tests array types correctly', () =>
    {
        expect( [] ).toBeType( 'array' );
    } );
    it( 'works with promises', () =>
    {
        expect( Promise.resolve( [] ) ).resolves.toBeType( 'array' );
    } );
} );


const createContextualFragment = ( html ) =>
{
    const div = document.createElement( 'div' );
    div.innerHTML = html;
    return div.children[ 0 ];
};

global.Range = function Range()
{};

Range.prototype.createContextualFragment = ( html ) =>
    createContextualFragment( html );

global.window.document.body.createTextRange = function createRange()
{
    return {
        setEnd : () =>
        {},
        setStart : () =>
        {},
        getBoundingClientRect : () =>
            ( { right: 0 } ),
        getClientRects : () => [],
        createContextualFragment
    };
};

global.window.focus = () => {};
