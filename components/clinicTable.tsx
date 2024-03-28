"use client"
// Define your data structure within the same file, just above your component
const clinicData = [
  {
    clinic: "Dry Land #1",
    date: "Tuesday, December 5, 2023",
    location: "Zoom",
    checkIn: "6:30 PM",
    begin: "7:00 PM",
    end: "9:30 PM",
  },
  {
    clinic: "Dry Land #1",
    date: "	Thursday, December 7, 2023",
    location: "Zoom",
    checkIn: "6:30 PM",
    begin: "7:00 PM",
    end: "9:30 PM",
  },
  {
    clinic: "Dry Land #2",
    date: "Tuesday, December 12, 2023",
    location: "Zoom",
    checkIn: "6:30 PM",
    begin: "7:00 PM",
    end: "9:30 PM",
  },
  {
    clinic: "Dry Land #2",
    date: "Tuesday, December 14, 2023",
    location: "Zoom",
    checkIn: "6:30 PM",
    begin: "7:00 PM",
    end: "9:30 PM",
  },
  {
    clinic: "Dry Land #3",
    date: "Tuesday, December 19, 2023",
    location: "Zoom",
    checkIn: "6:30 PM",
    begin: "7:00 PM",
    end: "9:30 PM",
  },
  {
    clinic: "Dry Land #3",
    date: "Tuesday, December 21, 2023",
    location: "Zoom",
    checkIn: "6:30 PM",
    begin: "7:00 PM",
    end: "9:30 PM",
  },
  {
    clinic: "Dry Land #4",
    date: "Tuesday, January 2, 2024",
    location: "Zoom",
    checkIn: "6:30 PM",
    begin: "7:00 PM",
    end: "9:30 PM",
  },
  {
    clinic: "Dry Land #4",
    date: "Tuesday, January 4, 2024",
    location: "Zoom",
    checkIn: "6:30 PM",
    begin: "7:00 PM",
    end: "9:30 PM",
  },
  {
    clinic: "On Snow Clinic #1",
    date: "	Saturday, December 9, 2023",
    location: "Summit Central",
    checkIn: "9:15 AM",
    begin: "9:30 AM",
    end: "4:30 PM",
  },
  {
    clinic: "On Snow Clinic #1",
    date: "	Sunday, December 10, 2023",
    location: "Summit Central",
    checkIn: "9:15 AM",
    begin: "9:30 AM",
    end: "4:30 PM",
  },
  {
    clinic: "On Snow Clinic #2",
    date: "Saturday, December 16, 2023",
    location: "Summit Central",
    checkIn: "9:15 AM",
    begin: "9:30 AM",
    end: "4:30 PM",
  },
  {
    clinic: "On Snow Clinic #2",
    date: "Sunday, December 17, 2023",
    location: "Summit Central",
    checkIn: "9:15 AM",
    begin: "9:30 AM",
    end: "4:30 PM",
  },
  {
    clinic: "On Snow Clinic #3",
    date: "	Saturday, December 30, 2023",
    location: "Summit Central",
    checkIn: "9:15 AM",
    begin: "9:30 AM",
    end: "4:30 PM",
  },
  {
    clinic: "On Snow Clinic #3",
    date: "	Sunday, December 31, 2023",
    location: "Summit Central",
    checkIn: "9:15 AM",
    begin: "9:30 AM",
    end: "4:30 PM",
  },
  {
    clinic: "On Snow Clinic #4",
    date: "Saturday, January 6, 2024",
    location: "Summit Central",
    checkIn: "9:15 AM",
    begin: "9:30 AM",
    end: "4:30 PM",
  },
  {
    clinic: "On Snow Clinic #4",
    date: "	Sunday, January 7, 2024",
    location: "Summit Central",
    checkIn: "9:15 AM",
    begin: "9:30 AM",
    end: "4:30 PM",
  },


  // ... additional clinic objects
];

// Create a ClinicTable component that renders the data as a table
const ClinicTable = () => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-center">2023 – 2024 Season Clinic Dates</h2>
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2">Clinic</th>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Location</th>
            <th className="px-4 py-2">Check In</th>
            <th className="px-4 py-2">Begin</th>
            <th className="px-4 py-2">End</th>
          </tr>
        </thead>
        <tbody>
          {clinicData.map((item, index) => (
            // Render the <br/> after the 8th item (index 7 because it's zero-based)
            <>
              <tr key={index} className={index === 7 ? "mb-6" : ""}>
                <td className="border px-4 py-2">{item.clinic}</td>
                <td className="border px-4 py-2">{item.date}</td>
                <td className="border px-4 py-2">{item.location}</td>
                <td className="border px-4 py-2">{item.checkIn}</td>
                <td className="border px-4 py-2">{item.begin}</td>
                <td className="border px-4 py-2">{item.end}</td>
              </tr>
              {index === 7 && <tr><td colSpan={6} className="py-4"></td></tr>}
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// You would typically export the ClinicTable component so it can be used in other parts of your application
export default ClinicTable;
