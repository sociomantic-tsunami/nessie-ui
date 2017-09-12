import React        from 'react';
import PropTypes    from 'prop-types';

import Component    from '../proto/Component';
import Css          from '../hoc/Css';
import Fieldset     from '../Fieldset';


const filterCheckable = ( node ) =>
{
    const _node = React.Children.toArray( node );

    const isCheckable = ( child ) => React.isValidElement( child ) &&
        typeof child.props.isChecked === 'boolean';

    return _node.filter( isCheckable );
};


export default class CheckableGroup extends Component
{
    static propTypes =
    {
        /**
         *  Group label text string or JSX node
         */
        label                 : PropTypes.node,
        /**
         *  Checkboxes, Radios, etc. to wrap
         */
        children              : PropTypes.node,
        /**
         *  How to lay out the Checkboxes, Radios, etc.
         */
        layout                : PropTypes.oneOf( [ 'horizontal', 'vertical' ] ),
        /**
         *  Display as disabled
         */
        isDisabled            : PropTypes.bool,
        /**
         *  Display as read-only
         */
        isReadOnly            : PropTypes.bool,
        /**
         *  Display as error/invalid
         */
        hasError              : PropTypes.bool,
        /**
         *  Tooltip message text (string or JSX)
         */
        errorMessage          : PropTypes.node,
        /**
         *  Tooltip is displayed
         */
        errorMessageIsVisible : PropTypes.bool,
        /**
         *  HTML name attribute of ButtonRadios in group (overrides default)
         */
        name                  : PropTypes.string,
        /**
         *  onChange callback function : ( e ) => { ... }
         */
        onChange              : PropTypes.func,
        /**
         *  onMouseOver callback function : ( e ) => { ... }
         */
        onMouseOver           : PropTypes.func,
        /**
         *  onMouseOut callback function : ( e ) => { ... }
         */
        onMouseOut            : PropTypes.func,
        /**
         * Display as hover when required from another component
         */
        forceHover            : PropTypes.bool

    };

    static defaultProps =
    {
        layout                : 'horizontal',
        hasError              : false,
        errorMessageIsVisible : false,
        isDisabled            : false,
        isReadOnly            : false,
        forceHover            : false,
        cssMap                : require( './checkableGroup.css' )
    };

    render()
    {
        const {
            children,
            className,
            cssMap,
            errorMessage,
            forceHover,
            hasError,
            isDisabled,
            isReadOnly,
            label,
            layout,
            onChange,
            onMouseOver,
            onMouseOut,
            errorMessageIsVisible
        } = this.props;

        const name = name || this.state.id;

        const items = filterCheckable( children ).map( ( child ) =>
            React.cloneElement( child, {
                ...child.props,
                isReadOnly : isReadOnly || child.props.isReadOnly,
                isDisabled : isDisabled || child.props.isDisabled,
                hasError   : hasError || child.props.hasError,
                forceHover : forceHover || child.props.forceHover,
                name,
                onChange
            } )
        );

        return (
            <Css
                cssMap   = { cssMap }
                cssProps = { { layout } }>
                <Fieldset
                    className             = { className }
                    label                 = { label }
                    isDisabled            = { isDisabled }
                    hasError              = { hasError }
                    errorMessage          = { errorMessage }
                    errorMessageIsVisible = { errorMessageIsVisible }
                    onMouseOver           = { onMouseOver }
                    onMouseOut            = { onMouseOut }>
                    <ul className = { cssMap.list }>
                        { items.map( ( item, index ) =>
                            (
                                <li
                                    key       = { index } // eslint-disable-line react/no-array-index-key, max-len
                                    className = { cssMap.listItem }>
                                    { item }
                                </li>
                            ) )
                        }
                    </ul>
                </Fieldset>
            </Css>
        );
    }
}
