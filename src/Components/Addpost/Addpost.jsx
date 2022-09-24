import React,{useState,useEffect} from 'react'
// import Grid from '@mui/material/Grid';
import Header from '../Header/Header';
import { getAuth } from "firebase/auth";
import { getStorage, ref, uploadBytes,getDownloadURL } from "firebase/storage";
import {
    MDBInput,
    MDBBtn,
    MDBFile,
    MDBRow,
    MDBCol,
  } from 'mdb-react-ui-kit';
import { getDatabase,set,ref as refn } from 'firebase/database';
function Addpost(props) {
    const [pageid, setPageid] = useState("");
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [tags, setTags] = useState("");
    const [link, setLink] = useState("");
    const [linkstat, setLinkStat] = useState("block");
    const [file, setFile] = useState("");
    const [filename, setFileName] = useState("");
    const [filestat, setFileStat] = useState("");
    const [fstat, setFStat] = useState(false);
    const [userD,setUserD]=useState();
    useEffect(()=>{
        var auth = getAuth();
        auth.onAuthStateChanged(function (user) {
        if (user) {
            setUserD(user);
            setPageid(user.reloadUserInfo.screenName);
        }else{
            window.location.href = "/";
        }
        });
    },[userD,pageid])
    const gettitle = (e) => {
        setTitle(e.target.value);
    }
    const getdesc = (e) => {
        setDesc(e.target.value);
    }
    const gettags = (e) => {
        setTags(e.target.value);
    }
    const getlink = (e) => {
        setLink(e.target.value);
        if(e.target.value===""){
            setLinkStat("block");
            if(linkstat==="none"){
                setLinkStat("block");
            }
        }else{
            setLinkStat("none");
            if(linkstat==="block"){
                setLinkStat("none");
            }
        }
    }
    const getfile = (e) => {
        setFile(new Blob([e.target.files[0]]));
        setFileName(e.target.files[0].name);
        if(filename===""){
            setFileName(e.target.files[0].name);
        }
        setFStat(false);
    }
    const addfile=()=>{
        setFileStat("uploading...please wait");
        const storage = getStorage();
        const storageRef = ref(storage,filename);
        uploadBytes(storageRef, file).then((snapshot) => {
            // console.log(snapshot)
            setFileStat("Uploaded");
            setFStat(true);
            // console.log('Uploaded a blob or file!');
            getDownloadURL(ref(storage, filename))
                .then((url) => {
                    console.log(url);
                    // `url` is the download URL for 'images/stars.jpg'
                    setLink(url);
                    if(link===""){
                        setLink(url);
                    }
                })
                .catch((error) => {
                    // Handle any errors
                    console.log(error);
                });

        });
    }
    
    const postadd = () => {
        if(props.type==="public"){
            console.log("public");
            const postdata={
                title:title,
                desc:desc,
                tags:tags,
                link:link,
                pageid:pageid,
                type:"public",
                author:userD.email,
                authorid:userD.uid,
                date:new Date().getTime(),
                postid:new Date().getTime()
            }
            console.log(postdata);
            //add postdata to database
            const db=getDatabase();
            set(refn(db, "PublicPosts/"+ postdata.postid),postdata)
            .then(()=>{
                console.log("post added");
                set(refn(db,userD.reloadUserInfo.screenName+"/public/"+postdata.postid),postdata)
                .then(()=>{
                    console.log("post added to user");
                    window.location.href = "/"+userD.reloadUserInfo.screenName;
                })
                .catch((error)=>{
                    console.log("inside"+error);
                })
            })
            .catch((error) => {
            // The write failed...
                console.log(error);
            });
            ;
            // console.log(file);
        }else if(props.type=== "private"){
            console.log("private");
            // console.log(title);
            // console.log(desc);
            // console.log(tags);
            // console.log(link);
            const postdata={
                title:title,
                desc:desc,
                tags:tags,
                link:link,
                pageid:pageid,
                type:"private",
                author:userD.email,
                authorid:userD.uid,
                date:new Date().getTime()
            }
            const db=getDatabase();
            set(refn(db,userD.reloadUserInfo.screenName+"/private/"+new Date().getTime()),postdata)
                .then(()=>{
                    console.log("post added to user");
                    window.location.href = "/"+userD.reloadUserInfo.screenName;
                })
                .catch((error)=>{
                    console.log(error);
                })
            // console.log(file);
        }
    };
    return (
        <>
            <Header />
            <div className='containermy'>
                <div className='panelglass wper'>
                    <MDBInput wrapperClass='mb-4' id='title' label='Title' onChange={gettitle}/>  
                    <MDBInput wrapperClass='mb-4' id='desc' rows={4} label='Description' onChange={getdesc}/>
                    <MDBInput wrapperClass='mb-4' id='tag' label='Tags' onChange={gettags}/>
                    <MDBInput wrapperClass='mb-4' id='link' label='Link(optional)' value={link} onChange={getlink}/>
                    <MDBRow style={{display:linkstat}}>
                        <MDBCol md='8'>
                            <MDBFile className='mb-4' label='Please Choose File if link is not available' id='Cfile' onChange={getfile}/>
                        </MDBCol>
                        <MDBCol md='4'>
                            <MDBBtn color='secondary' block onClick={addfile} disabled={fstat}>Update File</MDBBtn>
                            <h5 style={{textAlign:"center",paddingTop:"10px"}}>{filestat}</h5>
                        </MDBCol>
                    </MDBRow>
                    <MDBBtn className='mb-4' block onClick={postadd}>
                        Add Data
                    </MDBBtn>
                </div>
            </div>

        </>
    )
}

export default Addpost