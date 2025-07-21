// import EventCard from "../../components/FilterEvents/EventCard";

// const FeaturedEvents = ({ events }) => {
//   if (events.length === 0) return null;

//   return (
//     <section className="py-12">
//       <div className="mb-8 text-center">
//         <h2 className="text-3xl font-bold text-gray-800">Featured Events</h2>
//         <p className="text-gray-600 mt-2">Handpicked selections you might enjoy</p>
//       </div>
      
//       <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//         {events.map((event) => (
//           <EventCard key={event.id} {...event} featured />
//         ))}
//       </div>
//     </section>
//   );
// };

// export default FeaturedEvents;



import EventCard from "../../components/FilterEvents/EventCard";

const FeaturedEvents = ({ events }) => {
  if (events.length === 0) return null;

  return (
    <section className="py-12">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-gray-800">Featured Events</h2>
        <p className="text-gray-600 mt-2">
          Handpicked selections you might enjoy
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <EventCard key={event.id} {...event} featured />
        ))}
      </div>
    </section>
  );
};

export default FeaturedEvents;
