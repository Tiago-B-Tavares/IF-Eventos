// "use client"
// import { api } from "@/services/setupApiClient";
// import { , useState } from "react";


// interface Event {
//     id: number;
//     nome: string;
// }

// export default function GetEvents() {
//     const [events, setEvents] = useState<Event[]>([]);


      
//             api.get("/eventos")
//                 .then(response => {
//                     setEvents(response.data);
//                 })
//                 .catch(error => {
//                     console.error('Erro na requisição (componente GetEvents):', error);
//                 });
        
 

//     return (
//         <ul>
//             {events.map((event: Event) => (
//                 <li key={event.id}>{event.nome}</li>
//             ))}
//         </ul>
//     );
// }
