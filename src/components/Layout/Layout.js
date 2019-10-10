import React from 'react';
import Aux from '../../hoc/Aux';

const layout = (props) => (
    <Aux>
        <div>asdas</div>
        <main>
            {props.children}
        </main>
    </Aux>

)

export default layout;