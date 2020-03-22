import React from 'react';
import './directory.styles.scss'
import MenuItem from "../menu-item/menu-item.component";
import DirectoryData from './directory-data'

const Directory = ({sections}) => {
      return(
      <div className="directory-menu">
          {
             DirectoryData.map(({id,...otherSectionProps}) =>  //es6 property
                <MenuItem key={id} {...otherSectionProps}/> //we can do it like this because the names of both sides of equations are the same eg size={size}
                )
          }
      </div>
)};

export default Directory;