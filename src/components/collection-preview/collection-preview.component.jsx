import React from 'react';
import './collection-preview.styles.scss'
import CollectionItem from "../collection-item/collection-item.components";
import {withRouter} from 'react-router-dom';

class CollectionsPreview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            windowWidth: window.innerWidth
        }

    }
    updateWidth = () => this.setState({windowWidth: window.innerWidth});

    componentDidMount() {
        window.addEventListener('resize', this.updateWidth)
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWidth)

    }

    responsiveTotalItems = () => {
        const {windowWidth} = this.state;

        if (windowWidth <= 1800 && windowWidth > 1200) {
            return 4
        }else if(windowWidth <= 1200 && windowWidth > 900) {
            return 3
        }else if (windowWidth <= 900 && windowWidth > 600) {
            return 3
        }else if (windowWidth <= 600 && windowWidth > 0) {
            return 2
        }
    };

    render() {
        const {title,items, history, match} = this.props;
        return(
            <div className='collection-preview'>
                <h1 className='title' onClick={() => history.push(`${match.url}/${title.toLowerCase()}`)}> {title.toUpperCase()}</h1>
                <div className='preview'>
                    {items
                        .filter((item,index) => index < this.responsiveTotalItems())//making sure there are only 4 items each (remember index starts from 0)
                        .map(item => (
                            <CollectionItem key={item.id} item={item}/>
                        ))
                    }
                </div>
            </div>
        )
    }
}

export default withRouter(CollectionsPreview);