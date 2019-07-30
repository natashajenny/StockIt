import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { styles } from './styles';
// import {AddStocks } from '../components/AddStocks/AddStocks';
import  tut1 from '../static/images/tut1.png';
import  tut2 from '../static/images/tut2.png';
import  tut3 from '../static/images/tut3.png';
import  tut4 from '../static/images/tut4.png';
import  tut5 from '../static/images/tut5.png';


 class PureTutorial extends React.Component {


    render() {
        // var { isLoaded, items } = this.state;
        
    // if(!isLoaded){
    //     return <div>Loading....</div>
    //   } else{

        return (
       
            <div text-align='center' >
                <h1> Tutorial </h1>
                <h1> How do we predict stock prices? </h1>
                    <h2 >1. Calculate Technical Indicators </h2>
                    <p>write some stuff</p>
                        <img src={tut1} alt='technical indicators'/>
                    <h2 >2. Fourier Transforming Data </h2>
                    <p>write some stuff</p>
                        <img src={tut2} alt='ftd'/>
                    <h2 >3. Comparing price to transformed data </h2>
                    <p>write some stuff</p>
                        <img src={tut3} alt='compare'/>
                    <h2 >4. Correalation Heatmap plot </h2>
                    <p>write some stuff</p>
                        <img src={tut4} alt='heatmap'/>
                    <h2 >5. Predicted Data vs Stock Performance </h2>
                    <p>write some stuff</p>
                        <img src={tut5} alt='heatmap'/>
                {/* <Stocklist  items={items}/> */}
                {/* <StockDrawer /> */}
                {/* <AddStocks />    */}
            </div>
        );  
    // }
    }
}

export const Tutorial = withStyles(styles)(PureTutorial);
