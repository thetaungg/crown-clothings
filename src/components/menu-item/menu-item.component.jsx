import React from 'react';
import {withRouter} from 'react-router-dom';
import './menu-item.styles.scss';

const MenuItem = ({title,imageUrl,size,linkUrl,history,match}) => {
    return(
        <div  className={`menu-item ${size}`}>
            <div className="background-image" style={{backgroundImage: `url(${imageUrl})`}}/>
                <div className="content" onClick={() => history.push(`${match.url}${linkUrl}`)}>{/*history.push change your url bar// match.url tells you what's your current url */}
                    <h1 className="title">{title.toUpperCase()}</h1>
                    <span className="subtitle">SHOP NOW</span>
                </div>
        </div>
    )
};
export default withRouter(MenuItem); //it gives you access to the 3 props(history,match,location) Route element pass down to its child which wasn't passed down to their children
//this(withRouter) is call higher order components because takes the components and turn it into a new one with props // without it props tunnelling with occur because there is the menu-item component that doesn't really need that 3 props