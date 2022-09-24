import React,{useState,useEffect} from 'react'
import {
  getDatabase,
  ref,
  onValue,
} from "firebase/database";
import Header from '../Header/Header';
import Card from '../Card/Card';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid'
import { getAuth } from "firebase/auth";

function Home() {
  const [publicdata, setPublicdata] = useState([]);
  useEffect(() => {
   
    const auth=getAuth();
    auth.onAuthStateChanged(function (user) {
        if (user) {
            if(!(user.reloadUserInfo.screenName=="krishnapriya-atla" || user.reloadUserInfo.screenName=="18mis7023" || user.reloadUserInfo.screenName=="amrutha-macharla" || user.reloadUserInfo.screenName=="ChsPranav" || user.reloadUserInfo.screenName=="charan7105")){
                auth.signOut();
                window.location.href = "/";
            }
              const db = getDatabase();
              const PuRef = ref(db, '/PublicPosts');
              onValue(PuRef, (snapshot) => {
                  const data = snapshot.val();
                  if(data!=null){
                      setPublicdata(data);
                  }
              });
        }else{
            window.location.href = "/";
        }
    }
    );

}, []);
    
  return (
    <>
        <Header />
        <div className='containermy'>
                <div className='panelglass wper'>
                  <Box sx={{ flexGrow: 1 }}>
                      <Grid container spacing={2}>
                          {Object.values(publicdata).map((el,idx) => (
                              <Grid item xs={12} sm={6} md={4} lg={3} key={idx} >
                                  <Card 
                                      tags={el.tags}
                                      title={el.title}
                                      desc={el.desc}
                                      link={el.link}
                                      key={el.postid}
                                      ptime={el.date}
                                      author={el.pageid}
                                  /> 
                              </Grid>              
                          ))}
                          
                          {/* <Grid item xs={12} sm={6} md={4} lg={3}>
                              <Card 
                                  tags="Java,OOPS"
                                  title="Enums"
                                  desc="it is so useful for the values that are constant along the program.At there we can Use this concept"
                                  link="https://www.geeksforgeeks.org/enums-in-java/"
                              />
                          </Grid>
                          <Grid item xs={12} sm={6} md={4} lg={3}>
                              <Card 
                                  tags="Java,OOPS"
                                  title="Enums"
                                  desc="it is so useful for the values that are constant along the program.At there we can Use this concept"
                                  link="https://www.geeksforgeeks.org/enums-in-java/"
                              />
                          </Grid>
                          <Grid item xs={12} sm={6} md={4} lg={3}>
                              <Card 
                                  tags="Java,OOPS"
                                  title="Enums"
                                  desc="it is so useful for the values that are constant along the program.At there we can Use this concept"
                                  link="https://www.geeksforgeeks.org/enums-in-java/"
                              />
                          </Grid> */}
                      </Grid>
                  </Box>
                </div>
            </div>
    </>
  )
}

export default Home