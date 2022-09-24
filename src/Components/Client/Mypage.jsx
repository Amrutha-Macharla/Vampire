import React,{useState,useEffect} from 'react'
import './Mypage.css';
import {
    getDatabase,
    ref,
    onValue,
  } from "firebase/database";
  import Header from '../Header/Header';
  import Card from '../Card/Card';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid'
import Tab from '@mui/material/Tab';
import {TabContext,TabList,TabPanel} from '@mui/lab';
import {MDBCard} from 'mdb-react-ui-kit';
import {AiOutlinePlus} from 'react-icons/ai';
import { getAuth } from "firebase/auth";

function Mypage() {
    const [pageid, setPageid] = useState("");
    
    const [value, setValue] = React.useState('1');
    const [addstat, setAddstat] = useState(false);
    const [publicdata, setPublicdata] = useState([]);
    const [privateData, setPrivateData] = useState([]);

    const toggleShow = () => setAddstat(!addstat);
    useEffect(() => {
        const url = window.location.href;
        const id=url.substring(url.lastIndexOf("/") + 1);
        setPageid(id);
        const auth=getAuth();
        auth.onAuthStateChanged(function (user) {
            if (user) {
                if(user.reloadUserInfo.screenName!=pageid && pageid!="" && !(user.reloadUserInfo.screenName=="krishnapriya-atla" || user.reloadUserInfo.screenName=="18mis7023" || user.reloadUserInfo.screenName=="amrutha-macharla" || user.reloadUserInfo.screenName=="ChsPranav")){
                    window.location.href = "/";
                }
                if(pageid!=""){
                    const db = getDatabase();
                    const PuRef = ref(db, pageid+ '/public');
                    const PrRef = ref(db, pageid+ '/private');
                    onValue(PuRef, (snapshot) => {
                        const data = snapshot.val();
                        if(data!=null){
                            setPublicdata(data);
                        }
                    });
                    onValue(PrRef, (snapshot) => {
                        const data = snapshot.val();    
                        if(data!=null){
                            setPrivateData(data);
                        }
                        // console.log(Object.keys(data).length);
                        
                    });
                }
            }else{
                window.location.href = "/";
            }
        }
        );
    
    }, [pageid]);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    
    return (
        <>
            <Header />
            <div className='containermy'>
                <div className='panelglass wper'>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label="Public" value="1" />
                        <Tab label="Private" value="2" />
                        </TabList>
                    </Box>
                    <TabPanel value="1">
                        <Box sx={{ flexGrow: 1 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6} md={4} lg={3} >
                                    <MDBCard alignment='center' style={{height:"100%",width:"100%"}} onClick={()=>{
                                        window.location.href = "/puaddpost";
                                    }} >
                                        <AiOutlinePlus style={{alignSelf:"center",justifyContent:"center",width:"100%",height:"100%",color:"#cccaca"}}/>
                                    </MDBCard> 
                                </Grid>
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
                    </TabPanel>
                    <TabPanel value="2">
                        <Box sx={{ flexGrow: 1 }}>
                            <Grid container spacing={2}>
                                {/* <Addpost type="private" id={pageid}/> */}
                                <Grid item xs={12} sm={6} md={4} lg={3} >
                                    <MDBCard alignment='center' style={{height:"100%",width:"100%"}} onClick={()=>{
                                        window.location.href = "/praddpost";
                                    }}>
                                        <AiOutlinePlus style={{alignSelf:"center",justifyContent:"center",width:"100%",height:"100%",color:"#cccaca"}}/>
                                    </MDBCard> 
                                </Grid>
                                {Object.values(privateData).map((el,idx) => (
                                    <Grid item xs={12} sm={6} md={4} lg={3} key={idx}>
                                        <Card 
                                            tags={el.tags}
                                            title={el.title}
                                            desc={el.desc}
                                            link={el.link}
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
                                </Grid> */}
                            </Grid>
                        </Box>
                    </TabPanel>
                </TabContext>
                
                {/* <MDBContainer>
                    <MDBRow>
                        <MDBCol size='md' className='col-example'>
                        <Card />
                        </MDBCol>
                        <MDBCol size='md' className='col-example'>
                        <Card />
                        </MDBCol>
                        <MDBCol size='md' className='col-example'>
                        <Card />
                        </MDBCol>
                        <MDBCol size='md' className='col-example'>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer> */}

                </div>
            </div>

        </>
    )
}

export default Mypage