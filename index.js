// Your code here

function createEmployeeRecord(empDataArray) {
  // need obj to parse emp data into
  const empObj = {
    timeInEvents: [],
    timeOutEvents: [],
  };

  //   empDataArray.map((element, idx) => {
  // if (idx === 0) {
  //   empObj["firstName"] = element;
  // } else if (idx === 1) {
  //   empObj["familyName"] = element;
  // } else if (idx === 2) {
  //   empObj["title"] = element;
  // }
  //   });

  // create obj map that shows index and key pairs
  const empDataMap = {
    0: "firstName",
    1: "familyName",
    2: "title",
    3: "payPerHour",
  };
  // use map method to loop through employee data array. Use object map to assign key name to element values via index

  empDataArray.map((element, idx) => {
    empObj[empDataMap[idx]] = element;
  });

  return empObj;
}

//    input test: let twoRows = [
//     ["moe", "sizlak", "barkeep", 2],
//     ["bartholomew", "simpson", "scamp", 3]
//   ]

// create function that takes varying numbers of arrays and returns them in a single array

function createEmployeeRecords(records) {
  return records.map((element) => createEmployeeRecord(element));
}

function handleTimeEvent(record, type, timeStr) {
  // make new obj containing key type for timeEvent
  const timeEvent = { type: type };

  // extract date and time from time string via split and assign to keys via destructuring
  const [date, hour] = timeStr.split(" ");

  // pass date and time variables into timeInEvent object as key value pairs
  timeEvent.date = date;
  timeEvent.hour = Number(hour);

  // based on type passed, we push to timeIn or timeOut events
  // update Emp record with timeInEvent obj
  type === "TimeIn"
    ? record.timeInEvents.push(timeEvent)
    : record.timeOutEvents.push(timeEvent);

  return record;
}

const joshData = {
  firstName: "Josh",
  familyName: "Mayhew",
  title: "pleb",
  payPerHour: 2,
  timeInEvents: [],
  timeOutEvents: [],
};

function createTimeInEvent(record, timeStr) {
  return handleTimeEvent(record, "TimeIn", timeStr);
}

function createTimeOutEvent(record, timeStr) {
  return handleTimeEvent(record, "TimeOut", timeStr);
}

function hoursWorkedOnDate(record, date) {
  const getHour = (timeEvents) => {
    const event = timeEvents.find((ev) => {
      return ev.date === date;
    }).hour;
    return event;
  };

  let startTime = getHour(record.timeInEvents);

  let endTime = getHour(record.timeOutEvents);

  return (endTime - startTime) / 100;
}

function wagesEarnedOnDate(record, date) {
  const hours = hoursWorkedOnDate(record, date);

  return hours * record.payPerHour;
}

function allWagesFor(record) {
  const dates = record.timeInEvents.map((ev) => ev.date);

  return dates.reduce((acc, date) => {
    return acc + wagesEarnedOnDate(record, date);
  }, 0);
}

// let bpRecord = createEmployeeRecord(["Byron", "Poodle", "Mascot", 3]);
// let updatedBpRecord = createTimeOutEvent(bpRecord, "2015-02-28 1700");
// let newEvent = updatedBpRecord.timeOutEvents[0];

const employeeArray = [testRecord1, testRecord2];

function calculatePayroll(records) {
  // calculates total pay earned by multiple employees

  //iterate through one employee at a time via allWagesFor, which returns the wages for a single employee across multiple dates
  // add each employee's net wages together to equal total wages earned by all employees across multiple dates

  const result = records.reduce((acc, emp) => acc + allWagesFor(emp), 0);

  return result;
}

calculatePayroll(employeeArray);
