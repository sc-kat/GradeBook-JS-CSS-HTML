import { students } from "./students.js";
import {
  updateStudentsTable,
  addNewRowToStudentsTable,
  sortStudents,
  updateGradesTable,
  updateStudentsAverages,
  calculateAverage,
} from "./utils.js";

updateStudentsAverages(students);

const studentNameInput = document.getElementById("add-student-name");
const addStudentBtn = document.getElementById("add-student-btn");
const gradesTableContainer = document.querySelector(".grades-table-container");
const studentTableBody = document.getElementById("students-table-body");

studentNameInput.addEventListener("keyup", addNewStudent);
addStudentBtn.addEventListener("click", addNewStudent);

let selectedStudent;

window.addEventListener("load", () =>
  updateStudentsTable(students, studentTableBody)
);

function addNewStudent(e) {
  if (e.key === "Enter" || e.target.id == "add-student-btn") {
    if (studentNameInput.value !== "") {
      const newStudendId = students.length + 1 + "";
      const newStudent = {
        id: newStudendId,
        name: studentNameInput.value,
        gradeAverage: 0,
        grades: [],
      };
      students.push(newStudent);
      addNewRowToStudentsTable(newStudent, studentTableBody);
    } else {
      alert("The student name must be added.");
    }
  }
}

const sortAscByNameBtn = document.getElementById("sort-name-asc");
const sortDescByNameBtn = document.getElementById("sort-name-desc");

sortAscByNameBtn.addEventListener("click", () =>
  sortStudents(students, "ASC", "name", studentTableBody)
);
sortDescByNameBtn.addEventListener("click", () =>
  sortStudents(students, "DESC", "name", studentTableBody)
);

const sortAscByMedieBtn = document.getElementById("sort-medie-asc");
const sortDescByMedieBtn = document.getElementById("sort-medie-desc");

sortAscByMedieBtn.addEventListener("click", () =>
  sortStudents(students, "ASC", "gradeAverage", studentTableBody)
);
sortDescByMedieBtn.addEventListener("click", () =>
  sortStudents(students, "DESC", "gradeAverage", studentTableBody)
);

const sortGradesAsc = document.querySelector(".sort-grades-asc");
const sortGradesDesc = document.querySelector(".sort-grades-desc");

sortGradesAsc.addEventListener("click", sortingGradesAsc);

function sortingGradesAsc() {
  selectedStudent = students.find(
    (student) => studentNameGrades.innerText === student.name
  );
  const grades = selectedStudent.grades;
  grades.sort((grade1, grade2) => grade1 - grade2);
  updateGradesTable(selectedStudent, gradesTableBody);
}
sortGradesDesc.addEventListener("click", sortingGradesDesc);

function sortingGradesDesc() {
  selectedStudent = students.find(
    (student) => studentNameGrades.innerText === student.name
  );
  const grades = selectedStudent.grades;
  grades.sort((grade1, grade2) => grade2 - grade1);
  updateGradesTable(selectedStudent, gradesTableBody);
}

const studentsTableBody = document.getElementById("students-table-body");
const gradesTableBody = document.getElementById("grades-table");
const studentNameGrades = document.getElementById("student-name-grades");

studentsTableBody.addEventListener("click", handleStudentsActions);
gradesTableBody.addEventListener("click", handleGradesActions);

function handleStudentsActions(e) {
  if (e.target.classList.contains("delete-student")) {
    const buttonId = e.target.id;
    e.target.parentNode.parentNode.remove();
    students.splice(buttonId, 1); // TO REMOVE STUDENT FROM ARRAY
  } else if (e.target.classList.contains("show-grades")) {
    const buttonId = e.target.id;
    gradesTableContainer.classList.remove("hide-grades");

    selectedStudent = students.find((student) => buttonId === student.id);
    studentNameGrades.innerText = selectedStudent.name;
    updateGradesTable(selectedStudent, gradesTableBody);
  }
}

function handleGradesActions(e) {
  if (e.target.classList.contains("delete-grade")) {
    const gradeIndex = Number(e.target.id);
    selectedStudent.grades.splice(gradeIndex, 1);
    selectedStudent.gradeAverage = calculateAverage(selectedStudent.grades);
    updateGradesTable(selectedStudent, gradesTableBody);
    updateStudentsTable(students, studentTableBody);
  }
}

const gradeInput = document.getElementById("grade-input");
const addGradeBtn = document.getElementById("add-grade-btn");

addGradeBtn.addEventListener("click", addGrade);

function addGrade() {
  if (gradeInput.value > 0 && gradeInput.value <= 10) {
    const grade = Number(gradeInput.value);
    console.log(selectedStudent);
    selectedStudent.grades.push(grade);
    selectedStudent.gradeAverage = calculateAverage(selectedStudent.grades);
    updateGradesTable(selectedStudent, gradesTableBody);
    updateStudentsTable(students, studentTableBody);
  } else {
    alert("The grade does not meet the requirements.");
  }
}

const hideGradesBtn = document.getElementById("hide-grades");
hideGradesBtn.addEventListener("click", hideGradesContainer);

function hideGradesContainer() {
  console.log("test");
  gradesTableContainer.classList.add("hide-grades");
}
