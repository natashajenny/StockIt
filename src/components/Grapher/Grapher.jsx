import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { styles } from './styles';
import APIClient from '../../api/apiClient.js';
// import {AddStocks } from '../components/AddStocks/AddStocks';
// import  tut1 from '../static/images/tut1.png';
// import  tut2 from '../static/images/tut2.png';
// import  tut3 from '../static/images/tut3.png';
// import  tut4 from '../static/images/tut4.png';
// import  tut5 from '../static/images/tut5.png';
// import { StockRank } from "../components/StockRank/StockRank";
import { Carousel } from 'react-responsive-carousel'
 class PureGrapher extends React.Component {
     constructor(props) {
    super(props)

    this.state = {
      images: null,
      type: 'world',
      stocks: 'ABC',
      sdate:"2009-07-01",
      edate:"2019-07-01",
    }
  }

    componentDidMount(){
        this.apiClient = new APIClient();
        this.apiClient.getGraph(this.type,this.stocks,this.sdate,this.edate)
        .then(response => response.json())
        .then(images => this.setState({ images }))         
    }

    render () {
        const { images } = this.state
    
        if (!images) return <div>Images are not fetched yet!</div>
    
        // #3. Finally, render the `<Carousel />` with the state's images.
        return <Carousel autoPlay infiniteLoop='true'>
          {
            images.map( image => {
              return <div>
                <img src={ image.path } />
                <p className="legend">{ image.name }</p>
              </div>
            })
          }
        </Carousel>
      }
    }


export const Grapher = withStyles(styles)(PureGrapher);
