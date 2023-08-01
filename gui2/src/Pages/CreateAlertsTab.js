import React from 'react'
import {addDoc, collection, doc } from 'firebase/firestore'
import { db } from "../index"
const CreateAlertsTab = () => {
  // const alertCol = collection(db, `Alerts`);
  // const alertDoc = doc(db, `Alerts/ok`);
  // const handleCreateAlert = async () => {
  //   try {
  //     await addDoc(alertCol, { Type: 'Test' });
  //     console.log('Document added successfully');
  //   } catch (error) {
  //     console.error('Error adding document: ', error);
  //   }
  // };

  return (
    <div>
        <h6> Select Alert Type</h6>
        <div className="dropdown">
            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> Select Alert</button> 
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a className="dropdown-item" href="#">Action</a>
                <a className="dropdown-item" href="#">Another action</a>
                <a className="dropdown-item" href="#">Something else here</a>
            </div>
        </div>
    </div>
  )
}

export default CreateAlertsTab
