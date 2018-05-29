
/**
 * ## createScrollHandler
 * Higher-order function that adds scroll percentage as second argument
 *
 * @param   {Function}  func    scroll handler function
 * @param   {String}  dir     scroll direction
 *
 * @return  {Function}
 *
 */
function createScrollHandler( func, dir )
{
    return func && ( e =>
    {
        const scroll = dir === 'both' ? [
            getScroll( e.target, 'horizontal' ),
            getScroll( e.target, 'vertical' )
        ] : getScroll( e.target, dir );

        func( e, scroll );
    } );
}

/**
 * ## getScroll
 * Calculates the scroll percentage of an element in a given direction
 *
 * @param   {Function}  el  scrollable element
 * @param   {String}  dir scroll direction
 *
 * @return  {Number}
 *
 */
function getScroll( el, dir )
{
    let scrollPos;
    let scrollLength;

    if ( dir === 'horizontal' )
    {
        scrollPos    =  el.scrollLeft;
        scrollLength =  el.scrollWidth - el.clientWidth;
    }
    else
    {
        scrollPos    = el.scrollTop;
        scrollLength = el.scrollHeight - el.clientHeight;
    }

    return scrollLength ? scrollPos / scrollLength : 0;
}

/**
* ## handleScroll
* Controls the movement of the scroller
*
* @param   {Object} ref target DOM element
*
* @param   {String} scroll event object
*
* @return  {Void}
*
*/
function handleScroll( ref, scroll )
{
    return e =>
    {

        const target = e.target.value;
        const delta = Math.floor( e.deltaY );

        const type = e.type === 'change' || e.type === 'input';
        const val = type ? parseInt( target ) : parseInt( target ) + delta;

        ref[ scroll === 'horizontal' ? 'scrollLeft' : 'scrollTop' ] = val;
        console.log(ref );
    }
}

export { createScrollHandler, handleScroll };
export default { createScrollHandler };
