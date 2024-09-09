"use client";
// Define your data structure within the same file, just above your component
const clinicData = [
  {
    clinic: "Dry Land#1 Tuesday December 3rd 2024 7pm Zoom",
    date: "Tuesday, December 3, 2024",
    location: "Zoom",
    checkIn: "6:30 PM",
    begin: "7:00 PM",
    end: "9:30 PM",
  },
  {
    clinic: "Dry Land#1 Thursday December 5th 2024 7pm Zoom",
    date: "Thursday, December 5, 2024",
    location: "Zoom",
    checkIn: "6:30 PM",
    begin: "7:00 PM",
    end: "9:30 PM",
  },
  {
    clinic: "Dry Land#2 Tuesday December 10th 2024 7pm Zoom",
    date: "Tuesday, December 10, 2024",
    location: "Zoom",
    checkIn: "6:30 PM",
    begin: "7:00 PM",
    end: "9:30 PM",
  },
  {
    clinic: "Dry Land#2 Thursday December 12th 2024 7pm Zoom",
    date: "Thursday, December 12, 2024",
    location: "Zoom",
    checkIn: "6:30 PM",
    begin: "7:00 PM",
    end: "9:30 PM",
  },
  {
    clinic: "Dry Land#3 Tuesday December 17th 2024 7pm Zoom",
    date: "Tuesday, December 17, 2024",
    location: "Zoom",
    checkIn: "6:30 PM",
    begin: "7:00 PM",
    end: "9:30 PM",
  },
  {
    clinic: "Dry Land#3 Thursday December 19th 2024 7pm Zoom",
    date: "Thursday, December 19, 2024",
    location: "Zoom",
    checkIn: "6:30 PM",
    begin: "7:00 PM",
    end: "9:30 PM",
  },
  {
    clinic: "Dry Land#4 Tuesday January 2nd 2025 7pm Zoom",
    date: "Tuesday, January 2, 2025",
    location: "Zoom",
    checkIn: "6:30 PM",
    begin: "7:00 PM",
    end: "9:30 PM",
  },
  {
    clinic: "On Snow Clinic#1 Saturday December 7th 2024 9:30am Summit Central",
    date: "Saturday, December 7, 2024",
    location: "Summit Central",
    checkIn: "9:15 AM",
    begin: "9:30 AM",
    end: "4:30 PM",
  },
  {
    clinic: "On Snow Clinic#1 Sunday December 8th 2024 9:30am Summit Central",
    date: "Sunday, December 8, 2024",
    location: "Summit Central",
    checkIn: "9:15 AM",
    begin: "9:30 AM",
    end: "4:30 PM",
  },
  {
    clinic:
      "On Snow Clinic#2 Saturday December 14th 2024 9:30am Summit Central",
    date: "Saturday, December 14, 2024",
    location: "Summit Central",
    checkIn: "9:15 AM",
    begin: "9:30 AM",
    end: "4:30 PM",
  },
  {
    clinic: "On Snow Clinic#2 Sunday December 15th 2024 9:30am Summit Central",
    date: "Sunday, December 15, 2024",
    location: "Summit Central",
    checkIn: "9:15 AM",
    begin: "9:30 AM",
    end: "4:30 PM",
  },
  {
    clinic:
      "On Snow Clinic#3 Saturday December 21st 2024 9:30am Summit Central",
    date: "Saturday, December 21, 2024",
    location: "Summit Central",
    checkIn: "9:15 AM",
    begin: "9:30 AM",
    end: "4:30 PM",
  },
  {
    clinic: "On Snow Clinic#3 Sunday December 22nd 2024 9:30am Summit Central",
    date: "Sunday, December 22, 2024",
    location: "Summit Central",
    checkIn: "9:15 AM",
    begin: "9:30 AM",
    end: "4:30 PM",
  },
  {
    clinic:
      "On Snow Clinic#4 Saturday December 28th 2024 9:30am Summit Central",
    date: "Saturday, December 28, 2024",
    location: "Summit Central",
    checkIn: "9:15 AM",
    begin: "9:30 AM",
    end: "4:30 PM",
  },
  {
    clinic: "On Snow Clinic#4 Sunday December 29th 2024 9:30am Summit Central",
    date: "Sunday, December 29, 2024",
    location: "Summit Central",
    checkIn: "9:15 AM",
    begin: "9:30 AM",
    end: "4:30 PM",
  },
];

// Create a ClinicTable component that renders the data as a table
const ClinicTable = () => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-center">
        2023 – 2024 Season Clinic Dates
      </h2>
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
          {clinicData.map((clinic) => (
            <tr key={clinic.date}>
              {" "}
              {/* Assuming 'date' is unique for each clinic */}
              <td>{clinic.clinic}</td>
              <td>{clinic.date}</td>
              <td>{clinic.location}</td>
              <td>{clinic.checkIn}</td>
              <td>{clinic.begin}</td>
              <td>{clinic.end}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// You would typically export the ClinicTable component so it can be used in other parts of your application
export default ClinicTable;
