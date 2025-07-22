// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";

// const EventDetails = () => {
//   const { id } = useParams();
//   const [event, setEvent] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchEvent = async () => {
//       try {
//         const res = await fetch(`http://localhost:5000/api/events/${id}`);
//         if (!res.ok) throw new Error("Failed to fetch event");
//         const data = await res.json();
//         setEvent(data);
//       } catch (err) {
//         console.error(err);
//         setError(err.message);
//       }
//     };

//     fetchEvent();
//   }, [id]);

//   if (error) return <p className="text-red-500">Error: {error}</p>;
//   if (!event) return <p>Loading...</p>;

//   return (
//     <div className="max-w-4xl mx-auto py-12 px-4">
//       <img
//         src={
//           event.banner_image
//             ? `data:image/jpeg;base64,${btoa(
//                 new Uint8Array(event.banner_image.data).reduce(
//                   (data, byte) => data + String.fromCharCode(byte),
//                   ""
//                 )
//               )}`
//             : "https://via.placeholder.com/600x300?text=No+Image"
//         }
//         alt={event.event_title}
//         className="w-full h-64 object-cover rounded"
//       />
//       <h1 className="text-3xl font-bold mt-4">{event.event_title}</h1>
//       <p className="text-gray-600 mt-2">
//         {new Date(event.date).toLocaleDateString()}
//       </p>
//       <p className="text-gray-700 mt-4">{event.description}</p>
//     </div>
//   );
// };

// export default EventDetails;
