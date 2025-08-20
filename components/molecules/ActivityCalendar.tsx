"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../../components/atoms/Button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/molecules/Card";

interface ActivityCalendarProps {
  activities: { date: Date; count: number }[];
  onDateSelect?: (date: Date) => void;
  initialDate?: Date;
}

export function ActivityCalendar({ 
  activities, 
  onDateSelect, 
  initialDate = new Date() 
}: ActivityCalendarProps) {
  const [currentDate, setCurrentDate] = React.useState(initialDate);
  
  const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  
  // Get days in month
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  
  // Get first day of month (0 = Sunday, 1 = Monday, etc.)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  
  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };
  
  const hasActivity = (day: number) => {
    const checkDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    return activities.some(activity => 
      activity.date.toDateString() === checkDate.toDateString() && activity.count > 0
    );
  };

  // Get all Mondays, Wednesdays, and Fridays in the month
  const getFilteredDays = () => {
    const days = [];
    
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const dayOfWeek = date.getDay(); // 0 = Sunday, 1 = Monday, etc.
      
      // Only include Mon (1), Wed (3), Fri (5)
      if (dayOfWeek === 1 || dayOfWeek === 3 || dayOfWeek === 5) {
        days.push({
          day,
          dayOfWeek,
          date
        });
      }
    }
    
    return days;
  };

  const filteredDays = getFilteredDays();

  // Group days by week for proper layout
  const weeks = [];
  for (let i = 0; i < filteredDays.length; i += 3) {
    weeks.push(filteredDays.slice(i, i + 3));
  }

  return (
    <Card className="w-[300px]">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">Activity</CardTitle>
        <div className="flex items-center gap-1">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigateMonth('prev')}
            aria-label="Previous month"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm font-medium">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </span>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigateMonth('next')}
            aria-label="Next month"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {/* Day headers - only Mon, Wed, Fri */}
        <div className="grid grid-cols-3 gap-2 mb-2">
          <div className="text-xs text-center text-muted-foreground font-medium">Mon</div>
          <div className="text-xs text-center text-muted-foreground font-medium">Wed</div>
          <div className="text-xs text-center text-muted-foreground font-medium">Fri</div>
        </div>

        {/* Calendar grid */}
        <div className="space-y-1">
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="grid grid-cols-3 gap-2">
              {[1, 3, 5].map(dayOfWeek => {
                const dayData = week.find(d => d.dayOfWeek === dayOfWeek);
                
                if (!dayData) {
                  return <div key={dayOfWeek} className="h-8" />;
                }
                
                return (
                  <Button
                    key={dayData.day}
                    variant={hasActivity(dayData.day) ? "default" : "outline"}
                    size="sm"
                    className="h-8 w-full text-xs font-normal"
                    onClick={() => onDateSelect?.(dayData.date)}
                    aria-label={`Select date ${dayData.day}`}
                  >
                    {dayData.day}
                  </Button>
                );
              })}
            </div>
          ))}
        </div>

        <p className="text-xs text-muted-foreground mt-3">
          This is based on stock movement. See Stock Ledger for details
        </p>
      </CardContent>
    </Card>
  );
}