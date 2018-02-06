import React                from 'react';
import PropTypes            from 'prop-types';

import NessieComponent      from '../proto/Component';
import TabButton            from '../TabButton';


export default class Tabs extends NessieComponent
{
    static propTypes =
    {
        /**
         *  The active tab index
         */
        activeTabIndex : PropTypes.number,
        /**
         *  onChange callback function: ( e, newProps ) => { ... }
         */
        onChange       : PropTypes.func,
        /**
         *  A set of <Tab> components
         */
        children       : PropTypes.node
    };


    static defaultProps =
    {
        activeTabIndex : 0,
        cssMap         : require( './tabs.css' )
    };

    constructor( props )
    {
        super( props );

        this.handleChange = this.handleChange.bind( this );
    }


    renderHeader( tabs = [] )
    {
        let tabsArray = tabs;

        if ( !Array.isArray( tabs ) )
        {
            tabsArray = [ tabs ];
        }

        const { activeTabIndex } = this.props;

        return tabsArray.map( ( child, index ) =>
        {
            const { isDisabled, label } = child.props;

            const isActive = ( activeTabIndex === index );

            return (
                <TabButton
                    tabIndex   = { index }
                    key        = { index } // eslint-disable-line react/no-array-index-key, max-len
                    label      = { label }
                    isActive   = { isActive }
                    isDisabled = { isDisabled || isActive }
                    onClick    = { this.handleChange } />
            );
        } );
    }


    handleChange( e )
    {
        const { onChange } = this.props;

        if ( onChange )
        {
            const newProps = e.currentTarget ?
                { activeTabIndex: parseInt( e.currentTarget.value, 10 ) } : {};
            onChange( e, newProps );
        }
    }


    render()
    {
        const {
            activeTabIndex,
            children,
            cssMap
        } = this.props;

        const header = this.renderHeader( children );

        const content = Array.isArray( children ) ?
          children[ activeTabIndex ] : children;

        return (
            <div className = { cssMap.default } >
                <div className = { cssMap.header }>
                    { header }
                </div>

                <div className = { cssMap.content }>
                    { content }
                </div>
            </div>
        );
    }

}
