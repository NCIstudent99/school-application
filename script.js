// Function to generate subject input fields
function generateSubjectInputs() {
    const numSubjects = parseInt(document.getElementById("numSubjects").value);

    // Validate the number of subjects input
    if (isNaN(numSubjects) || numSubjects < 1 || numSubjects > 100) {
        alert("Please enter a valid number between 1 and 100.");
        return; // Stop if invalid input
    }

    // Disable the submit button and show the subject input section
    document.getElementById("submitButton").disabled = true;
    document.getElementById("subjectInputs").classList.remove("d-none");

    const marksContainer = document.getElementById("marksContainer");
    marksContainer.innerHTML = ""; // Clear any previous inputs

    for (let i = 1; i <= numSubjects; i++) {
        const label = document.createElement("label");
        label.classList.add("form-label", "mt-2");
        label.innerText = `Subject ${i} Marks:`;

        const input = document.createElement("input");
        input.type = "number";
        input.classList.add("form-control");
        input.min = "0";
        input.max = "100";
        input.required = true;
        input.id = `subject${i}`;

        // Validation event listener
        input.addEventListener('input', function() {
            validateInput(input);
        });

        marksContainer.appendChild(label);
        marksContainer.appendChild(input);
    }

    // Enable the calculate button
    document.getElementById("calculateButton").disabled = false;
}

// Function to validate input
function validateInput(input) {
    const value = parseFloat(input.value);
    if (isNaN(value) || value < 0 || value > 100) {
        input.classList.add("is-invalid");
        input.classList.remove("is-valid");
    } else {
        input.classList.remove("is-invalid");
        input.classList.add("is-valid");
    }
}

// Function to calculate the results
function calculateResults() {
    const numSubjects = parseInt(document.getElementById("numSubjects").value);
    let totalMarks = 0;

    // Loop through each subject input field
    for (let i = 1; i <= numSubjects; i++) {
        const marks = parseFloat(document.getElementById(`subject${i}`).value);

        // Check if each mark is valid
        if (isNaN(marks) || marks < 0 || marks > 100) {
            alert("Please enter valid marks between 0 and 100 for each subject.");
            return; // Stop calculation if any input is invalid
        }
        totalMarks += marks;
    }

    const averageMarks = totalMarks / numSubjects;
    let grade;

    // Determine the grade based on the average marks
    if (averageMarks >= 90) grade = "A";
    else if (averageMarks >= 80) grade = "B";
    else if (averageMarks >= 65) grade = "C";
    else if (averageMarks >= 50) grade = "D";
    else if (averageMarks >= 40) grade = "E";
    else grade = "F";

    // Display the results in the result section
    document.getElementById("totalMarks").innerText = totalMarks;
    document.getElementById("averageMarks").innerText = averageMarks.toFixed(2);
    document.getElementById("grade").innerText = grade;

    // Show the results table and hide the calculate button
    document.getElementById("resultSection").classList.remove("d-none");
    document.getElementById("calculateButton").disabled = true;
    
    // Show the reset button after results are calculated
    document.getElementById("resetButton").classList.remove("d-none");
}

// Function to reset the form and re-enable the submit button
function resetForm() {
    document.getElementById("numSubjects").value = "";
    document.getElementById("submitButton").disabled = false;
    document.getElementById("subjectInputs").classList.add("d-none");
    document.getElementById("marksContainer").innerHTML = "";
    document.getElementById("resultSection").classList.add("d-none");
    document.getElementById("resetButton").classList.add("d-none");
}
