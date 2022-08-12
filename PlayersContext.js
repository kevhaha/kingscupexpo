// import React, { useState, useContext } from 'react';

// const PlayersContext = React.createContext({
//   playerArray: ['Test', 'Test2', 'Test3'],
//   setPlayerArray: () => {}
// });

// // export function usePlayers () {
// //   return useContext(PlayersContext);
// // }

// export default function PlayersProvider ({children}) {

//   const [playerArray, setPlayerArray] = useState([]);

//   return (
//     <PlayersContext.Provider value ={ playerArray, setPlayerArray }>
//       {children}
//     </PlayersContext.Provider>
//   )
// }