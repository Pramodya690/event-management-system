import { useParams } from "react-router-dom";
import { eventList } from "../utils/EventDatabase";
import Navigation from "../components/Navigation/Navigation";
import { MdCalendarMonth } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";

const EventDetails = () => {
  const { id } = useParams();
  const numId = Number(id);

  const filteredEvent = eventList.find(eventDetail => eventDetail.id === numId);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <img
            src={filteredEvent.img}
            alt="Event"
            className="w-full h-64 object-cover"
          />
          <div className="p-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Event Name: {filteredEvent.heading}
            </h3>
            <div className="flex items-center gap-6 mb-4 text-gray-600 text-sm">
              <p className="flex items-center gap-1">
                <MdCalendarMonth className="text-xl text-blue-600" />
                <span>{filteredEvent.date.month}</span>
                <span>{filteredEvent.date.year}</span>
              </p>
              <p className="flex items-center gap-1">
                <IoLocationSharp className="text-xl text-red-600" />
                {filteredEvent.location}
              </p>
            </div>
            <p className="text-gray-700 leading-relaxed">
              <span className="font-semibold block mb-1 text-lg text-gray-800">
                Event Description:
              </span>
              <span>{filteredEvent.description}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
