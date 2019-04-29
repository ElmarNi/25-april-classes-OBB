let workersArr = [];
let jobsArr = [];
const addWorkers = document.querySelector('.add-workers');
const firstName = document.getElementsByName('fName')[0]
const lastName = document.getElementsByName('lName')[0]
const email = document.getElementsByName('email')[0]
let job = document.getElementsByName('job')[0];
const jobName = document.getElementsByName('jobName')[0]
const startTime = document.getElementsByName('startTime')[0]
const endTime = document.getElementsByName('endTime')[0]
const salary = document.getElementsByName('salary')[0];
const alertDivworkers = document.querySelector('.workers-alert')
const alertDivjobs = document.querySelector('.jobs-alert')
class Workers {
    constructor(firstName, lastName, email, job) {
        this._fName = firstName;
        this._lname = lastName;
        this._email = email;
        this._job = job;
        this._id;
    }
}
class Jobs {
    constructor(jname, startTime, endTime, salary) {
        this._jname = jname;
        this._startTime = startTime;
        this._endTime = endTime;
        this._salary = salary;
        this._id;
    }
}


window.onload = function () {
    if (localStorage.getItem("jobs")) {
        jobsArr = JSON.parse(localStorage.getItem('jobs'))
    }
    else {
        localStorage.setItem("jobs", JSON.stringify([]))
    }
    document.querySelector('.add-jobs').addEventListener('click', function () {
        for (let i = 0; i < 4; i++) {
            if (document.querySelectorAll('.jobs input')[i].value == "") {
                alertDivjobs.classList.remove("opacity");
                alertDivjobs.innerText = `Your ${i + 1} - input is empty please fill this input`
                return false
            }
            else if (!isNaN(jobName.value.trim())) {
                alertDivjobs.classList.remove("opacity")
                alertDivjobs.innerText = "Job name must be contains only letters";
                return false;
            }
            else {
                alertDivjobs.classList.add("opacity")
            }
        }
        if (isNaN(salary.value.trim())) {
            alertDivjobs.classList.remove("opacity")
            alertDivjobs.innerText = "Salary is not a number";
            return false;
        }
        else {
            alertDivjobs.classList.add("opacity")
        }
        let newJob = new Jobs(jobName.value.trim(), startTime.value.trim(), endTime.value.trim(), salary.value.trim());
        newJob._id = jobsArr.length + 1
        jobsArr.push(newJob)
        job.innerHTML = ""
        jobSelectInputUploader()
        localStorage.setItem("jobs", JSON.stringify(jobsArr));
        [...document.querySelectorAll('input')].forEach(inp => inp.value = "");
    })
    jobSelectInputUploader()
    if (localStorage.getItem("workers")) {
        workersArr = JSON.parse(localStorage.getItem("workers"))
    }
    else {
        localStorage.setItem("workers", JSON.stringify([]))
    }
    workersArr.forEach(worker => {
        workerUploader(worker);
    })
    addWorkers.addEventListener('click', function () {
        for (let i = 0; i < 3; i++) {
            if (document.querySelectorAll('.workers input')[i].value.trim() == "") {
                alertDivworkers.classList.remove("opacity");
                alertDivworkers.innerText = `Your ${i + 1} - input is empty please fill this input`
                return false
            }
            else if (!isNaN(document.querySelectorAll('.workers input')[i].value.trim())) {
                alertDivworkers.classList.remove("opacity");
                alertDivworkers.innerText = `First name or last name must not be contain a number(numbers)`
                return false
            }
            else {
                alertDivworkers.classList.add("opacity")
            }
        }
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(String(email.value.trim()).toLowerCase())) {
            alertDivworkers.classList.remove("opacity");
            alertDivworkers.innerText = "Please ipnut a valid E-mail";
            return false;
        }
        if (job.value.trim() == "") {
            alertDivworkers.classList.remove("opacity");
            alertDivworkers.innerText = `Please select a job`
            return false
        }
        else {
            alertDivworkers.classList.add("opacity")
        }
        alertDivworkers.classList.add("opacity");
        let newWorker = new Workers(firstName.value.trim(), lastName.value.trim(), email.value.trim(), job.value.trim());
        let randomId = Math.floor(Math.random() * 1000);
        newWorker._id = randomId;
        workersArr.forEach(worker => {
            if (randomId !== worker._id) {
                newWorker._id = randomId;
            }
        })
        workersArr.push(newWorker)
        localStorage.setItem("workers", JSON.stringify(workersArr))
        workerUploader(newWorker);
        [...document.querySelectorAll('input')].forEach(inp => inp.value = "");
        DeleteClickedWorkers()
    });
    DeleteClickedWorkers()
    function workerUploader(worker) {
        const tr = document.createElement('tr');
        const idTd = document.createElement('td');
        idTd.innerText = worker._id;
        const nameTd = document.createElement('td');
        nameTd.innerText = worker._fName + " " + worker._lname;
        const emailTd = document.createElement('td');
        emailTd.innerText = worker._email
        const jobTd = document.createElement('td');
        jobTd.innerText = worker._job;
        const deleteWorkerIcon = document.createElement('i');
        deleteWorkerIcon.classList.add("fas", "fa-user-times")
        const deleteWorkerTd = document.createElement('td');
        deleteWorkerTd.classList.add("delete-worker")
        deleteWorkerTd.appendChild(deleteWorkerIcon);
        tr.appendChild(idTd)
        tr.appendChild(nameTd)
        tr.appendChild(emailTd)
        tr.appendChild(jobTd)
        tr.appendChild(deleteWorkerTd);
        document.querySelector('.table').lastElementChild.appendChild(tr);
    }
    function jobSelectInputUploader() {
        jobsArr.forEach(j => {
            const option = document.createElement('option');
            option.innerText = j._jname;
            job.appendChild(option)
        })
    }
    function DeleteClickedWorkers() {
        [...document.querySelectorAll(".delete-worker")].forEach(d => {
            d.addEventListener("click", function () {
                workersArr = JSON.parse(localStorage.getItem("workers"));
                workersArr = workersArr.filter(w => {
                    return w._id !== +this.parentElement.firstElementChild.innerText
                })
                this.parentElement.remove()
                localStorage.setItem("workers", JSON.stringify(workersArr))
            })
        })
    }
}