var months = [
  'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
];

var monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

//handle data submit
var submitHandle = document.getElementById('submitData').onclick = function(){
  var begin = setStartDate();
  var start = begin.format();
  var end = addDate(begin);
  var startMonth = getStartMonth();
  generateHTML(start, end, startMonth);
};

//generate html template to display the calendars
var generateHTML = function calendarHtml(start, finish, firstMonth){
  var firstMonthName = moment().format('MMMM');
  var htmlTemplate = `
  <div class="calendar">
    <h3>${firstMonthName}</h3>
    <table>
      <colgroup>
        <col class="weekend">
        <col>
        <col>
        <col>
        <col>
        <col>
        <col class="weekend">
      </colgroup>
      <thead>
        <tr>
          <th>Sun</th>
          <th>Mon</th>
          <th>Tue</th>
          <th>Wed</th>
          <th>Thu</th>
          <th>Fri</th>
          <th>Sat</th>
        </tr>
      </thead>
      <tbody>

      </tbody>
    </table>
  </div> 
  `
  console.log(start, " - ", finish);
  document.getElementById('calendars').innerHTML = htmlTemplate;
}

//helper methods

// get start date from input, convert to moment for operations
function setStartDate(){
  var userDate = new Date(document.getElementById('startDate').value);
  var dateFrom = moment(userDate);
  console.log(dateFrom);
  return dateFrom;
};

function getStartMonth(){
  var startMonth = moment().month();
  console.log(startMonth);
};


//add number of days indicated by user
var addDate = function datesAdd(setStartDate){
  var daysToAdd = document.getElementById('days').value;
  var endDate = setStartDate.add(daysToAdd, 'days').format(); 
  return endDate;
};
