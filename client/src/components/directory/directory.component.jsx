import React from 'react';
import './directory.styles.scss'
import MenuItem from "../menu-item/menu-item.component";

import { connect } from 'react-redux';
import { createStructuredSelector } from "reselect";
import { selectDirectorySections } from "../../redux/directory/directory.selectors";

const Directory = ({sections}) => (
    <div className="directory-menu">
        {       //es6 property
            sections.map(({id,...otherSectionProps}) => (
                <MenuItem key={id} {...otherSectionProps}/>
                )//we can do it like this because the names of both sides of equations are the same eg size={size}
            )
        }
    </div>
);

const mapStateToProps = createStructuredSelector({
    sections: selectDirectorySections
});

export default connect(mapStateToProps)(Directory);