import React from 'react';

import Text  from './index';


const wrapText = ( node, props ) =>
    ( typeof node === 'string' ? <Text { ...props }>{ node }</Text> : node );


export { wrapText };
export default { wrapText };
