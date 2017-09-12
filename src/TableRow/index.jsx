import React, { Component } from 'react';
import PropTypes            from 'prop-types';

import Css                  from '../hoc/Css';
import Row                  from '../Row';

export default class TableRow extends Component
{
    static propTypes =
    {
        /**
         *  Globally sets cell horizonal alignment
         *  for this row (individual cell alignment will override)
         */
        align : PropTypes.oneOf( [
            'auto',
            'left',
            'center',
            'right'
        ] ),
        /**
         *  Globally sets cell vertical alignment
         *  for this row (individual cell alignment will overrides)
         */
        verticalAlign : PropTypes.oneOf( [
            'auto',
            'top',
            'middle',
            'bottom'
        ] ),
        /**
         *  Gutter size
         */
        gutters : PropTypes.oneOf( [
            'none',
            'S',
            'M',
            'L'
        ] ),
        /**
         *  Row content (TableCells)
         */
        children : PropTypes.node
    };

    static defaultProps =
    {
        align         : 'auto',
        verticalAlign : 'auto',
        gutters       : 'L',
        cssMap        : require( './tableRow.css' )
    };

    render()
    {
        const {
            align,
            children,
            className,
            cssMap,
            gutters,
            verticalAlign
        } = this.props;

        const cells = React.Children.toArray( children );

        return (
            <Css cssMap = { cssMap }>
                <Row
                    className     = { className }
                    role          = "row"
                    align         = { align }
                    verticalAlign = { verticalAlign }
                    gutters       = { gutters }
                    spacing       = "none">
                    { cells }
                </Row>
            </Css>
        );
    }
}
