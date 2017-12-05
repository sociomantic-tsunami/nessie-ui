
/**
 * ## createScrollHandler
 * Higher-order function that adds scroll percentage as second argument
 *
 * @param   {Function}  func    scroll handler function
 *
 * @return  {Function}
 *
 */
function createScrollHandler( func )
{
    return func && ( e =>
    {
        const { clientHeight, scrollHeight, scrollTop } = e.target;
        func( e, scrollTop / ( scrollHeight - clientHeight ) );
    } );
}

export { createScrollHandler };
export default { createScrollHandler };
