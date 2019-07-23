import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';

import  image from '../../components/NewsGrid/stockphotos/image.jpg';
import  image1 from '../../components/NewsGrid/stockphotos/image1.jpg';
import  image2 from '../../components/NewsGrid/stockphotos/image2.jpg';
import  image3 from '../../components/NewsGrid/stockphotos/image3.jpg';


// const useStyles = makeStyles(theme => ({
//   root: {
//     display: 'flex',
//     flexWrap: 'wrap',
//     justifyContent: 'space-around',
//     overflow: 'hidden',
//     backgroundColor: theme.palette.background.paper,
//   },
//   gridList: {
//     flexWrap: 'nowrap',
//     // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
//     transform: 'translateZ(0)',
//   },
//   title: {
//     color: theme.palette.primary.light,
//   },
//   titleBar: {
//     background:
//       'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
//   },
// }));
const tileData = [
    {
      img: image,
      title: 'Lithum Production Increases',
      author: 'author',
    },
    {
        img: image1,
        title: 'Coal Prices Rise',
        author: 'author',
    },
    {
        img: image2,
        title: 'Oil Prices Plummet',
        author: 'author',
    },
    {
        img: image3,
        title: 'ASX Drops 1.5%',
        author: 'author',
    },
    
  ];

/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 * const tileData = [
 *   {
 *     img: image,
 *     title: 'Image',
 *     author: 'author',
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */



export  function newsGrid() {
  // const classes = useStyles();
  return (
    <div>
      <GridList cols={2}>
        {tileData.map((tile, key) => (
          <GridListTile key={key}>
            <img src={tile.img} alt={tile.title} />
            <GridListTileBar
              title={tile.title}
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}