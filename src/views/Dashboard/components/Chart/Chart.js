import React from "react";
import { useTheme } from "@material-ui/core/styles";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";
import Typography from "@material-ui/core/Typography";
import isAfter from "date-fns/isAfter";
import { format } from "date-fns";
import { set, isSameHour } from "date-fns";
import filter from "lodash/filter";

// Generate Sales Data
function createData(time, visitas) {
  return { time, visitas };
}

export default function Chart({ visits }) {
  const theme = useTheme();

  const dutyHours = [
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22"
  ];

  const todayVisits = filter(visits, function(n) {
    const todayAt6am = set(new Date(), { hours: 6, minutes: 0 });
    const visitDate = new Date(n.fecha);
    return isAfter(visitDate, todayAt6am);
  });

  const dataToDisplay = dutyHours.map(hour => {
    let count = 0;

    let todayDutyHour = set(new Date(), { hours: hour, minutes: 0 });

    todayVisits.forEach(visit => {
      let result = isSameHour(todayDutyHour, new Date(visit.fecha));

      if (result) {
        count++;
      }
    });

    return createData(format(new Date(todayDutyHour), "h:mm a"), count);
  });

  return (
    <React.Fragment>
      <Typography variant="h4" gutterBottom styles={{ marginBottom: 20 }}>
        Hoy
      </Typography>
      <ResponsiveContainer>
        <LineChart
          data={dataToDisplay}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24
          }}
        >
          <XAxis dataKey="time" stroke={theme.palette.text.secondary} />
          <YAxis stroke={theme.palette.text.secondary} allowDecimals={false}>
            <Label
              angle={270}
              position="left"
              style={{ textAnchor: "middle", fill: theme.palette.text.primary }}
            >
              Visitas
            </Label>
          </YAxis>
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="visitas"
            stroke={theme.palette.primary.main}
            dot={true}
          />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
