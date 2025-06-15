
import React from 'react';

interface ItineraryItem {
  description: string;
}

interface DayPlan {
  day: number;
  title: string;
  activities: ItineraryItem[];
}

interface ItineraryDayProps {
  dayPlan: DayPlan;
}

const ItineraryDay: React.FC<ItineraryDayProps> = ({ dayPlan }) => {
  return (
    <div className="border-l-4 border-sage-300 pl-6">
      <h3 className="font-satoshi font-bold text-xl text-gray-900 mb-3">
        Day {dayPlan.day} – {dayPlan.title}
      </h3>
      <ul className="space-y-2 text-gray-700">
        {dayPlan.activities.map((item, index) => (
          <li key={index} className="flex items-start space-x-2">
            <span className="w-2 h-2 bg-sage-400 rounded-full mt-2 flex-shrink-0"></span>
            <span>{item.description}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItineraryDay;
