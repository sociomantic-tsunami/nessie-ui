import React                from 'react';
import PropTypes            from 'prop-types';

import Css                  from '../hoc/Css';
import Text                 from '../Text';

const Label = ( {
    children,
    className,
    cssMap,
    element,
    htmlFor,
    label,
    noWrap,
    onMouseOut,
    onMouseOver,
    overflowIsHidden } ) =>
{
    const LabelElement = element || 'label';

    return (
        <Css cssMap = { cssMap }>
            <LabelElement
                className    = { className }
                htmlFor      = { element === 'label' ? htmlFor : null }
                onMouseEnter = { onMouseOver }
                onMouseLeave = { onMouseOut } >
                <Text
                    noWrap           = { noWrap }
                    overflowIsHidden = { overflowIsHidden }>
                    { children || label }
                </Text>
            </LabelElement>
        </Css>
    );
};
Label.propTypes =
{
    /**
    *  Label text
    */
    label            : PropTypes.string,
    /**
     * HTML element to use (legend should only be used inside a Fieldset)
     */
    element          : PropTypes.oneOf( [ 'label', 'legend' ] ),
    /**
     *  ID of element this Label labels (HTML for attribute)
     */
    htmlFor          : PropTypes.string,
    /**
    *  Don’t wrap text to the next line
    */
    noWrap           : PropTypes.bool,
    /**
     *  Clip overflow
     */
    overflowIsHidden : PropTypes.bool,
    /**
     *  Mouse over callback function
     */
    onMouseOver      : PropTypes.func,
    /**
     *  Mouse out callback function
     */
    onMouseOut       : PropTypes.func,
};

Label.defaultProps =
{
    element          : 'label',
    noWrap           : false,
    overflowIsHidden : false,
    cssMap           : require( './label.css' )
};

export default Label;
