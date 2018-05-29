
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
* @param   {Object} e event object
*
* @param   {Object} ref target DOM element
*
* @return {Void}
*
*/
function handleScroll( e, ref )
{
    return function()
    {
        e = e || window.event;
        let target = e.target.value;
        const delta = Math.floor( e.deltaY );
        const type = e.type === 'change' || e.type === 'input';
        target = type ? parseInt( target ) : parseInt( target ) + delta;
        ref.scrollTop = target;
    };
}

/**
* ## handleTranslate
* detect the scroll and return css object of the translate values
*
* @param   {String} dir scroll direction
*
* @param   {String} scrollVal scroll value
*
* @return  {Object}
*
*/
function handleTranslate( dir, scrollVal )
{
    return dir === 'horizontal' ? { left: scrollVal } : { top: scrollVal };
}


export { createScrollHandler, handleScroll, handleTranslate };
export default { createScrollHandler };
