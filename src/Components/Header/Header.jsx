import React, { useState,useEffect } from 'react';
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBNavbar,
  MDBContainer,
  MDBNavbarBrand,
} from 'mdb-react-ui-kit';
  import './Header.css';
function Header() {
  const [profile, setProfile] = useState('');
  const [userD, setUserD] = useState();
  const [staticModal, setStaticModal] = useState(false);

  const toggleShow = () => setStaticModal(!staticModal);
  useEffect(() => {
    var auth = getAuth();
    auth.onAuthStateChanged(function (user) {
      if (user) {
        // User is signed in.
        // console.log(user);
        // const userdata = {
        //   DisplayName: user.displayName,
        //   UserEmail: user.email,
        //   PNumber: user.phoneNumber,
        //   Profile:user.photoURL,
        //   UID:user.uid,
        //   CreatedAt:user.reloadUserInfo.createdAt,
        //   LastLogin:user.reloadUserInfo.lastLoginAt,
        //   UserName:user.reloadUserInfo.screenName,
        //   Timestamp:new Date().getTime()
        // };
        // console.log(userdata);
        const db = getDatabase();
        setProfile(user.photoURL);
        setUserD(user);
        console.log("hello")
        // localStorage.setItem('userdata',JSON.stringify(userdata));
      }else{
        window.location.href = "/";
      }
    });
  }, [profile]);
  const logout = () => {
    const auth = getAuth();
    auth.signOut();
    window.location.href = "/";
  }
  const openmypage=()=>{
    window.location.href = "/"+userD.reloadUserInfo.screenName;
  }
  return (
    <>
        <MDBNavbar light bgColor='light'>
            <MDBContainer fluid>
                <MDBNavbarBrand href='/home'>Vampire</MDBNavbarBrand>
                <span>
                  <MDBBtn color='danger' onClick={logout}>Logout</MDBBtn>
                  <img
                    className='roundimage roundimagesmalldim'
                    src={profile}
                    height='30'
                    alt=''
                    loading='lazy'
                    onClick={toggleShow}
                  />
                </span>
                <MDBModal staticBackdrop tabIndex='-1' show={staticModal} setShow={setStaticModal}>
                  <MDBModalDialog>
                    <MDBModalContent>
                      <MDBModalHeader>
                        <MDBModalTitle>Profile Details</MDBModalTitle>
                        <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
                      </MDBModalHeader>
                      <MDBModalBody>
                          <div>Name            : <strong>{(userD==null)?"":userD.displayName}</strong></div>
                          <div>Github Username : <strong>{(userD==null)?"":userD.reloadUserInfo.screenName}</strong></div>
                          <div>Email           : <strong>{(userD==null)?"":userD.email}</strong></div>
                          <br />
                      </MDBModalBody>
                      <MDBModalFooter>
                        <MDBBtn color='danger' onClick={logout}>Logout</MDBBtn>
                        <MDBBtn color='info' onClick={openmypage} >My Page</MDBBtn>
                        <MDBBtn color='primary' onClick={toggleShow}>
                          OK
                        </MDBBtn>
                      </MDBModalFooter>
                    </MDBModalContent>
                  </MDBModalDialog>
                </MDBModal>
            </MDBContainer>
        </MDBNavbar>
    </>
  )
}

export default Header