import React from 'react';
//import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Dashboard() {
   // let { state } = useLocation();
    let stateObj = useSelector(state => state.userAuthorLoginReducer)
    console.log("stateobj is :",stateObj);

    return (
        <div>
            <h2>dashboard</h2>
            <div className="text-end">
                
                <h3 className='text-primary '>{stateObj.currentUser.usertype}:{stateObj.currentUser.username}</h3>
                <h6 className='text-secondary'>{stateObj.currentUser.email}</h6>

            </div>
        </div>
    );
}

export default Dashboard;
