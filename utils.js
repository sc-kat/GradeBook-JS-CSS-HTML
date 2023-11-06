export function updateStudentsTable(students, tableBodyElement) {
  tableBodyElement.innerHTML = students
    .map(
      (student) => `
      <tr>
         <td>${student.name}</td>
         <td>${student.gradeAverage.toFixed(1)}</td>
         <td><button id=${
           student.id
         } class="show-grades">See / Add grades</button></td>
         <td><button  class="delete-student delete-btn">X</button></td>
      </tr>
   `
    )
    .join("");
}

export function addNewRowToStudentsTable(student, tableBodyElement) {
  tableBodyElement.innerHTML += `
      <tr>
         <td>${student.name}</td>
         <td>${student.gradeAverage}</td>
         <td><button id=${student.id} class="show-grades">See / Add grades</button></td>
         <td><button  class="delete-student delete-btn">X</button></td>
      </tr>
   `;
}

export function sortStudents(students, sortingOrder, by, tableBodyElement) {
  if (sortingOrder === "ASC") {
    students.sort((student1, student2) => {
      if (typeof student1[by] === "string") {
        return student1[by].localeCompare(student2[by]);
      } else if (typeof student1[by] === "number") {
        return student1[by] - student2[by];
      }
    });
  } else if (sortingOrder === "DESC") {
    students.sort((student1, student2) => {
      if (typeof student1[by] === "string") {
        return student2[by].localeCompare(student1[by]);
      } else if (typeof student1[by] === "number") {
        return student2[by] - student1[by];
      }
    });
  }
  updateStudentsTable(students, tableBodyElement);
}

export function updateGradesTable(student, gradesTableBody) {
  gradesTableBody.innerHTML = student.grades
    .map(
      (grade, index) =>
        `
            <tr>
               <td>${grade}</td>
               <td>
                  <button id=${index} class="delete-grade delete-btn">X</button>
               </td>
            </tr>
         `
    )
    .join("");
}

export function calculateAverage(numbers) {
  return numbers.reduce((acc, number) => acc + number, 0) / numbers.length;
}

export function updateStudentsAverages(students) {
  students.forEach(
    (student) => (student.gradeAverage = calculateAverage(student.grades))
  );
}
