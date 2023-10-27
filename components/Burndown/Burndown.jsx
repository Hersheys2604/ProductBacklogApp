"use client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Label,
} from "recharts";
import "./Burndown.css";

export default function Burndown(props) {
  props = Object.values(props);

  // console.log(props)
  // checking if there are any tasks in sprint
  try {
    // props = props.slice(1);
    props = props[props.length - 1];
    if (props.length == 0) {
      throw new Error("Nothing inside the page");
    }
  } catch (e) {
    return (
      <>
        <p> There are no tasks in sprint</p>
      </>
    );
  }
  // console.log(props)

  const total = props.length; // amount of tasks to do

  const not_filtered_array = []; // the raw data
  const filtered_array = []; // filtered array for how many tasks there are left

  // the gist of the algorithm. we want to have an array that contains corresponding y values to the x value
  // y value being the amount of tasks left to do and the x value being the time at that current period
  // filtered array will contain that information containing the x and y values
  // unfiltered array is the raw data for the tasks inside the sprint
  // basically we are iterating through the unfiltered array to determine which tasks have been modified at the same time so we just check how many tasks are left to do
  // if we count the task, we remove it from the unfiltered array
  // we do this until the unfiltered array is empty

  // filtered array = [{
  //   time: day_to_check,
  //   num_tasks_left: not_filtered_array.length
  // }]

  // not_filtered_array = [{}]

  // find the first created tasks
  let date = props[0].createdAt;
  for (let i = 0; i < total; i++) {
    if (props[i].createdAt < date) {
      date = props[i].createdAt;
    }
  }

  for (let i = 0; i < total; i++) {
    // time is meant to be in days but for testing purposes, it will be in seconds
    // diff time is so that the time starts at 0
    const time_from_start = Math.round((props[i].updatedAt - date) / 1000);

    not_filtered_array.push({
      time: time_from_start,
      status: props[i].status,
    });
  }

  // u want to see have when time is 0 how many tasks u have
  filtered_array.push({
    time: 0,
    num_tasks_left: not_filtered_array.length,
  });
  // filter thru the filtered_array to make sure that the total for the same days are counted for
  // just choose the first element of the list and find if there are any replicas elsewhere
  // if there are, append it and then remove it

  let con_to_break_outer_while_loop = false;
  while (not_filtered_array != 0) {
    // checking for the earliest time - THIS DOES NOT CHECK IF U ADD A NEW TASK JUST RECENTLY
    // we do this so we can match the y value to the x value in the graph
    let min_time = 10000;
    for (let i = 0; i < not_filtered_array.length; i++) {
      if (
        not_filtered_array[i].time < min_time &&
        not_filtered_array[i].status == "COMPLETED"
      ) {
        min_time = not_filtered_array[i].time;
      }
    }
    let day_to_check = min_time;
    let len_unfiltered = not_filtered_array.length;
    let i = 0; // index for identifying the tasks that have the same time as the x value we are looking for

    // checking which tasks to remove for that specific time
    while (len_unfiltered > 0) {
      if (
        day_to_check == not_filtered_array[i].time &&
        not_filtered_array[i].status == "COMPLETED"
      ) {
        not_filtered_array.splice(i, 1); // we remove it from the unfiltered array meaning we have accounted for it
        len_unfiltered -= 1;
      } else {
        len_unfiltered -= 1;
        i += 1;
      }
    }
    // what the below does is check if there are still any completed tasks inside the list
    // if there is, we continue to run the loop
    // if there isn't we break from the loop
    let completedd = false;
    for (let i = 0; i < not_filtered_array.length; i++) {
      if (not_filtered_array[i].status == "COMPLETED") {
        completedd = true;
      }
    }

    if (!completedd) {
      con_to_break_outer_while_loop = true;
    }

    filtered_array.push({
      time: day_to_check,
      num_tasks_left: not_filtered_array.length,
    });

    if (con_to_break_outer_while_loop) {
      break;
    }
  }

  filtered_array;

  // this will be the velocity. basically the "gradient" of the burndown chart
  // we start off at day 0

  // find max days
  let max_time = 0;
  let num_tasks = 0; // this is saying we have 0 tasks left
  for (let i = 0; i < filtered_array.length; i++) {
    if (filtered_array[i].time > max_time) {
      max_time = filtered_array[i].time;
      num_tasks = filtered_array[i].num_tasks_left;
    }
  }

  // perform -1 * (y2-y1)/(x2-x1), where x1 = 0 meaning day 0
  let gradient = (total - num_tasks) / max_time;
  if (gradient === Infinity) {
    gradient = 0;
  }

  return (
    <>
      <main className="main-content">
        <h1 alt="Burndown Chart">Burndown Chart</h1>
        <div className="chart-container">
          <LineChart
            width={500}
            height={300}
            data={filtered_array}
            margin={{
              top: 20, // Increased top margin for the title
              right: 30,
              left: 50, // Increased left margin for better alignment
              bottom: 20, // Increased bottom margin for better alignment
            }}
            alt="Burndown chart"
          >
            <XAxis
              dataKey="time"
              tick={{ fill: "black" }}
              axisLine={{ stroke: "black" }}
            >
              <Label
                value="Time"
                offset={0}
                position="insideBottom"
                fill="black"
                alt="x-axis"
              />
            </XAxis>
            <YAxis
              alt="y-axis"
              tick={{ fill: "black" }}
              axisLine={{ stroke: "black" }}
            />
            <Tooltip alt="tooltip" />
            <Legend alt="Legend" />
            <Line
              type="monotone"
              dataKey="num_tasks_left"
              stroke="#82ca9d"
              alt="Line"
            />
          </LineChart>
        </div>
        <p className="velocity" alt="velocity">
          Velocity: {gradient}
        </p>
      </main>
    </>
  );
}
