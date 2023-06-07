import React, { useEffect } from 'react';
import Grid from '@mui/material/Grid';
import { useDispatch, useSelector, connect } from 'react-redux'
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { Authornot } from '../reduxe/slices/auth';
import { Post } from '../components/Post';
import axios from '../axios';

export const Home = ({
}) => {
   const dispatch = useDispatch();
   const isAuth = useSelector(Authornot)
    useEffect(() =>{
    
    axios.get('/update_parking_space');
  }, []);
  return (
    <>

      <Grid container spacing={4}>

        <Grid xs={12} item>
        
        <Link to="/sensorDataComponent">
                  <Button variant="contained">Інформація про вільні місяця на парковці</Button>
                </Link>

          {[...Array(1)].map(() => (
            
            
            <Post
              id={1}
              title="вул.Гната Юры, 20, м.Київ, 02000"
              imageUrl="https://kievvlast.com.ua//project/resources/2022/01/OOKA3t2g.jpg"

              tags={[]}
              isEditable
            />
            
          ))}
        </Grid>
        
        <Grid xs={12} item>

        <Link to="/sensorDataComponent">
             <Button variant="contained">Інформація про вільні місяця на парковці</Button>
         </Link>

        {[...Array(1)].map(() => (

          
            
            <Post
              id={1}
              title="вул. Якуба Коласа, 16, м.Київ, 02000"
              imageUrl="https://cdn.create.vista.com/api/media/small/349576960/stock-video-hyperlaps-many-cars-in-the?videoStaticPreview=true&token="

              tags={[]}
              isEditable
            />
            
          ))}
          

        </Grid>

        <Grid xs={12} item>

        <Link to="/sensorDataComponent">
     <Button variant="contained">Інформація про вільні місяця на парковці</Button>
        </Link>

      {[...Array(1)].map(() => (

  
    
    <Post
      id={1}
      title="вул. Тулузи, 20, м.Київ, 02000"
      imageUrl="https://stimparking.com.ua/wp-content/uploads/2021/10/stoyanka-stim-parking.jpeg"

      tags={[]}
      isEditable
    />
    
        ))}
  

        </Grid>

      </Grid>
    </>
  );
};
