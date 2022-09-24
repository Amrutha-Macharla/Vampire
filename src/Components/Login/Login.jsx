import React,{useEffect} from 'react'
// import {FcGoogle} from 'react-icons/fc'
import { GithubAuthProvider,getAuth, signInWithPopup, } from "firebase/auth";
import { getDatabase, ref, set,update } from "firebase/database";
import {FaGithub} from 'react-icons/fa'
function Login() {
  useEffect(() => {
    var auth = getAuth();
    auth.onAuthStateChanged(function (user) {
      if (user) {
        // User is signed in.
        console.log(user);
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
        const updates = {};
        updates['users/' + user.uid+'/LastLogin'] = user.reloadUserInfo.lastLoginAt;
        updates['users/' + user.uid+'/TimeStamp'] = new Date().getTime();
        setTimeout(() => {
          update(ref(db), updates)
            .then(() => {
              window.location.href = "/home";
            })
        },2000);
        // localStorage.setItem('userdata',JSON.stringify(userdata));
      }
    });
  }, []);
  const githublogin = () => {
    const auth = getAuth(); 
    const provider = new GithubAuthProvider();
    signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a GitHub Access Token. You can use it to access the GitHub API.
      const credential = GithubAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      console.log(credential);
      // The signed-in user info.
      const user = result.user;
      const userdata = {
        DisplayName: user.displayName,
        UserEmail: user.email,
        PNumber: user.phoneNumber,
        Profile:user.photoURL,
        UID:user.uid,
        CreatedAt:user.reloadUserInfo.createdAt,
        LastLogin:user.reloadUserInfo.lastLoginAt,
        UserName:user.reloadUserInfo.screenName,
        Timestamp:new Date().getTime()
      };
      console.log(userdata);
      const db = getDatabase();
      set(ref(db, 'users/' + user.uid),userdata)
        .then(() => {
          // Data saved successfully!
          alert("User Added Successfully");
          window.location.href = "/home";
        })
        .catch((error) => {
          // The write failed...
        });
      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GithubAuthProvider.credentialFromError(error);
      // ...
    });
  }
  return (
    <>
        <div
        className='p-5 text-center bg-image bgimagelogin'
        >
        <div className='mask' style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
          <div className='d-flex justify-content-center align-items-center h-100'>
            <div className='text-white'>
              <h1 className='mb-3'>Vampire</h1>
              <h4 className='mb-3'>Our Personal Website</h4>
              <a className='btn btn-outline-light btn-lg ahover ahovercolor' onClick={githublogin} role='button'>
                <FaGithub />SignIn With Github
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login