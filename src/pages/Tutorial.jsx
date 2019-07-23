import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {newsGrid} from '../components/NewsGrid/NewsGrid';
import {Stocklist} from '../components/Stocklist/Stocklist';
// import {StockDrawer} from '../components/StockDrawer/StockDrawer';
import { styles } from './styles';
import APIClient from '../api/apiClient.js';
import { SearchAutoFill } from '../components/SearchAutoFill/SearchAutoFill';

 class PureTutorial extends React.Component {

    constructor(props){
        super(props);
        this.state = {
          items: [],
          isLoaded: false,
        }
      }
    componentDidMount(){
        this.apiClient = new APIClient();
        this.apiClient.getStocks()
            .then(json =>{
                this.setState({
                    isLoaded: true,
                    items: json.stocks,
                })
            });
    }

    render() {
        var { isLoaded, items } = this.state;
        
    if(!isLoaded){
        return <div>Loading....</div>
      } else{
        console.log(isLoaded);
        console.log(items);
        const { classes } = this.props;
        return (
            <div className = {classes.root}>
                <h1> Tutorial </h1>
                {/* {newsGrid()} 
                <SearchAutoFill />
                <Stocklist  items={items}/> */}
                    {/* <ul> 
                    {console.log(items)};
                    {items.map(item => (
                        <li key={item.company}>
                            Code:{item.company}
                        </li>
                    ))};
             </ul> */}
                {/* console.log(items); */}
            </div>
        );  
    }
    }
}

export const Tutorial = withStyles(styles)(PureTutorial);
