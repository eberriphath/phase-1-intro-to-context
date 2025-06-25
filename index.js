// Your code here
// Create a single employee record
function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
  return {
    firstName,
    familyName,
    title,
    payPerHour,
    timeInEvents: [],
    timeOutEvents: []
  };
}

// Create multiple employee records
function createEmployeeRecords(data) {
  return data.map(createEmployeeRecord);
}

// Add a time in event
function createTimeInEvent(employee, dateStamp) {
  const [date, hour] = dateStamp.split(' ');
  employee.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour),
    date
  });
  return employee;
}

// Add a time out event
function createTimeOutEvent(employee, dateStamp) {
  const [date, hour] = dateStamp.split(' ');
  employee.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour),
    date
  });
  return employee;
}

// Calculate hours worked on a specific date
function hoursWorkedOnDate(employee, date) {
  const timeIn = employee.timeInEvents.find(e => e.date === date);
  const timeOut = employee.timeOutEvents.find(e => e.date === date);
  return (timeOut.hour - timeIn.hour) / 100;
}

// Calculate wages earned on a specific date
function wagesEarnedOnDate(employee, date) {
  const hours = hoursWorkedOnDate(employee, date);
  return hours * employee.payPerHour;
}

// Calculate total wages for one employee
function allWagesFor(employee) {
  const datesWorked = employee.timeInEvents.map(e => e.date);
  return datesWorked.reduce((total, date) => {
    return total + wagesEarnedOnDate(employee, date);
  }, 0);
}

// Calculate total payroll
function calculatePayroll(employees) {
  return employees.reduce((total, emp) => {
    return total + allWagesFor(emp);
  }, 0);
}
