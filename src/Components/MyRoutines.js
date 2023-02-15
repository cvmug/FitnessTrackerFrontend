import React, { useState, useEffect } from 'react';

 function PublicRoutines() {
   const [routines, setRoutines] = useState([]);

   useEffect(() => {
     fetch('http://fitnesstrac-kr.herokuapp.com/api/routines')
       .then(response => response.json())
       .then(data => setRoutines(data))
       .catch(error => console.error(error));
   }, []);

   return (
     <div>
       <h2>Public Routines</h2>
       <ul>
         {routines.map(routine => (
           <li key={routine.id}>
             <h3>{routine.name}</h3>
             <p>Goal: {routine.goal}</p>
             <p>Creator: {routine.creatorName}</p>
             <ul>
               {routine.activities.map(activity => (
                 <li key={activity.id}>
                   <p>{activity.name}</p>
                   <p>{activity.description}</p>
                   <p>Duration: {activity.duration} minutes</p>
                   <p>Count: {activity.count}</p>
                 </li>
               ))}
             </ul>
           </li>
         ))}
       </ul>
     </div>
   );
 }

 export default PublicRoutines;