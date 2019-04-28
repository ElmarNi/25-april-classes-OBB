"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var workersArr;
var jobsArr;
var addWorkers = document.querySelector('.add-workers');
var firstName = document.getElementsByName('fName')[0];
var lastName = document.getElementsByName('lName')[0];
var email = document.getElementsByName('email')[0];
var job = document.getElementsByName('job')[0];
var jobName = document.getElementsByName('jobName')[0];
var startTime = document.getElementsByName('startTime')[0];
var endTime = document.getElementsByName('endTime')[0];
var salary = document.getElementsByName('salary')[0];
var alertDivworkers = document.querySelector('.workers-alert');
var alertDivjobs = document.querySelector('.jobs-alert');

var Workers = function Workers(firstName, lastName, email, job) {
  _classCallCheck(this, Workers);

  this._fName = firstName;
  this._lname = lastName;
  this._email = email;
  this._job = job;
  this._id;
};

var Jobs = function Jobs(jname, startTime, endTime, salary) {
  _classCallCheck(this, Jobs);

  this._jname = jname;
  this._startTime = startTime;
  this._endTime = endTime;
  this._salary = salary;
  this._id;
};

window.onload = function () {
  if (localStorage.getItem("jobs")) {
    jobsArr = JSON.parse(localStorage.getItem('jobs'));
    document.querySelector('.add-jobs').addEventListener('click', function () {
      for (var i = 0; i < 4; i++) {
        if (document.querySelectorAll('.jobs input')[i].value == "") {
          alertDivjobs.classList.remove("opacity");
          alertDivjobs.innerText = "Your ".concat(i + 1, " - input is empty please fill this input");
          return false;
        } else if (!isNaN(jobName.value.trim())) {
          alertDivjobs.classList.remove("opacity");
          alertDivjobs.innerText = "Job name must be contains only letters";
          return false;
        } else {
          alertDivjobs.classList.add("opacity");
        }
      }

      if (isNaN(salary.value.trim())) {
        alertDivjobs.classList.remove("opacity");
        alertDivjobs.innerText = "Salary is not a number";
        return false;
      } else {
        alertDivjobs.classList.add("opacity");
      }

      var newJob = new Jobs(jobName.value.trim(), startTime.value.trim(), endTime.value.trim(), salary.value.trim());
      newJob._id = jobsArr.length + 1;
      jobsArr.push(newJob);
      job.innerHTML = "";
      jobSelectInputUploader();
      localStorage.setItem("jobs", JSON.stringify(jobsArr));

      _toConsumableArray(document.querySelectorAll('input')).forEach(function (inp) {
        return inp.value = "";
      });
    });
    jobSelectInputUploader();
  } else {
    localStorage.setItem("jobs", JSON.stringify([]));
  }

  if (localStorage.getItem("workers")) {
    workersArr = JSON.parse(localStorage.getItem("workers"));
    workersArr.forEach(function (worker) {
      workerUploader(worker);
    });
    addWorkers.addEventListener('click', function () {
      for (var i = 0; i < 3; i++) {
        if (document.querySelectorAll('.workers input')[i].value.trim() == "") {
          alertDivworkers.classList.remove("opacity");
          alertDivworkers.innerText = "Your ".concat(i + 1, " - input is empty please fill this input");
          return false;
        } else if (!isNaN(document.querySelectorAll('.workers input')[i].value.trim())) {
          alertDivworkers.classList.remove("opacity");
          alertDivworkers.innerText = "First name or last name must not be contain a number(numbers)";
          return false;
        } else {
          alertDivworkers.classList.add("opacity");
        }
      }

      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if (!re.test(String(email.value.trim()).toLowerCase())) {
        alertDivworkers.classList.remove("opacity");
        alertDivworkers.innerText = "Please ipnut a valid E-mail";
        return false;
      }

      if (job.value.trim() == "") {
        alertDivworkers.classList.remove("opacity");
        alertDivworkers.innerText = "Please select a job";
        return false;
      } else {
        alertDivworkers.classList.add("opacity");
      }

      alertDivworkers.classList.add("opacity");
      var newWorker = new Workers(firstName.value.trim(), lastName.value.trim(), email.value.trim(), job.value.trim());
      var randomId = Math.floor(Math.random() * 1000);
      newWorker._id = randomId;
      workersArr.forEach(function (worker) {
        if (randomId !== worker._id) {
          newWorker._id = randomId;
        }
      });
      workersArr.push(newWorker);
      localStorage.setItem("workers", JSON.stringify(workersArr));
      workerUploader(newWorker);

      _toConsumableArray(document.querySelectorAll('input')).forEach(function (inp) {
        return inp.value = "";
      });

      DeleteClickedWorkers();
    });
  } else {
    localStorage.setItem("workers", JSON.stringify([]));
  }

  DeleteClickedWorkers();
};

function workerUploader(worker) {
  var tr = document.createElement('tr');
  var idTd = document.createElement('td');
  idTd.innerText = worker._id;
  var nameTd = document.createElement('td');
  nameTd.innerText = worker._fName + " " + worker._lname;
  var emailTd = document.createElement('td');
  emailTd.innerText = worker._email;
  var jobTd = document.createElement('td');
  jobTd.innerText = worker._job;
  var deleteWorkerIcon = document.createElement('i');
  deleteWorkerIcon.classList.add("fas", "fa-user-times");
  var deleteWorkerTd = document.createElement('td');
  deleteWorkerTd.classList.add("delete-worker");
  deleteWorkerTd.appendChild(deleteWorkerIcon);
  tr.appendChild(idTd);
  tr.appendChild(nameTd);
  tr.appendChild(emailTd);
  tr.appendChild(jobTd);
  tr.appendChild(deleteWorkerTd);
  document.querySelector('.table').lastElementChild.appendChild(tr);
}

function jobSelectInputUploader() {
  jobsArr.forEach(function (j) {
    var option = document.createElement('option');
    option.innerText = j._jname;
    job.appendChild(option);
  });
}

function DeleteClickedWorkers() {
  _toConsumableArray(document.querySelectorAll(".delete-worker")).forEach(function (d) {
    d.addEventListener("click", function () {
      var _this = this;

      workersArr = JSON.parse(localStorage.getItem("workers"));

      if (workersArr.length === 1) {
        workersArr = [];
      }

      workersArr = workersArr.filter(function (w) {
        return w._id !== +_this.parentElement.firstElementChild.innerText;
      });
      this.parentElement.remove();
      localStorage.setItem("workers", JSON.stringify(workersArr));
    });
  });
}