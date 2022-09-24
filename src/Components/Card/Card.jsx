import React,{useState} from 'react'
import "./Card.css";
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardHeader, MDBCardFooter, MDBBtn } from 'mdb-react-ui-kit';


function Card(props) {
  var date=new Date(props.ptime);
  const [daten, setDaten] = useState(date);
  return (
    <>
        <MDBCard alignment='center'
        // style={{ maxWidth: '22rem' }}
        >
            <MDBCardHeader>{daten.getDate()+"/"+(daten.getMonth()+1)+"/"+daten.getFullYear()
          // +" "+daten.getHours()+
          // ":"+daten.getMinutes()+
          // ":"+daten.getSeconds()
          }</MDBCardHeader>
            <MDBCardBody>
                <MDBCardTitle style={{color: "white",backgroundColor: "rgb(75 46 93)",padding:"10px"}}>{props.title}</MDBCardTitle>
                <MDBCardText style={{ textAlign:"start" }}>{props.desc}</MDBCardText>
                <MDBCardText>Tags:{props.tags}</MDBCardText>
                <MDBBtn color='secondary' href={props.link} target="_blank">Open</MDBBtn>
            </MDBCardBody>
            <MDBCardFooter className='text-muted'>Posted By:{props.author}</MDBCardFooter>
        </MDBCard>  
    </>
  )
}

export default Card