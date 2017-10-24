import React                        from 'react';
import PropTypes                    from 'prop-types';

import { Column, IconButton, Row }  from '../index';
import { wrapText }                 from '../Text/utils';

const DatePickerHeader = ( {
    label,
    isDisabled,
    isReadOnly,
    nextIsDisabled,
    onClickNext,
    onClickPrev,
    prevIsDisabled,
} ) => (
    <Row verticalAlign = "middle">
        <Column size = "content">
            <IconButton
                iconType   = "left"
                isDisabled = { prevIsDisabled || isDisabled }
                isReadOnly = { isReadOnly }
                onClick    = { onClickPrev } />
        </Column>
        <Column align="center">{ wrapText( label ) }</Column>
        <Column size = "content">
            <IconButton
                iconType   = "right"
                isDisabled = { nextIsDisabled || isDisabled }
                isReadOnly = { isReadOnly }
                onClick    = { onClickNext } />
        </Column>
    </Row>
);

DatePickerHeader.propTypes = {
    label          : PropTypes.string,
    isDisabled     : PropTypes.bool,
    isReadOnly     : PropTypes.bool,
    nextIsDisabled : PropTypes.bool,
    onClickNext    : PropTypes.bool,
    onClickPrev    : PropTypes.bool,
    prevIsDisabled : PropTypes.bool,
};

DatePickerHeader.defaultProps = {
    label          : null,
    isDisabled     : null,
    isReadOnly     : null,
    nextIsDisabled : null,
    onClickNext    : null,
    onClickPrev    : null,
    prevIsDisabled : null,
};

export default DatePickerHeader;
