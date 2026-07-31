let editId = null;

// Save OR Update
function saveData() {

    let question = document.getElementById("question").value.trim();
    let answer = document.getElementById("answer").value.trim();

    if (question === "" || answer === "") {
        alert("Please fill all fields");
        return;
    }

    // UPDATE
    if (editId != null) {

        fetch("http://localhost:8080/admin/update/" + editId, {

            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                question: question,
                answer: answer
            })

        })
        .then(res => res.text())
        .then(data => {

            alert(data);

            editId = null;

            document.getElementById("question").value = "";
            document.getElementById("answer").value = "";

            loadData();

        });

        return;
    }

    // SAVE NEW
    fetch("http://localhost:8080/admin/save", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            question: question,
            answer: answer
        })

    })
    .then(res => res.text())
    .then(data => {

        alert(data);

        document.getElementById("question").value = "";
        document.getElementById("answer").value = "";

        loadData();

    });

}

// Load Data
function loadData() {

    fetch("http://localhost:8080/admin/all")
    .then(response => response.json())
    .then(data => {

        let table = "";

        data.forEach(item => {

            table += `
            <tr>
                <td>${item.id}</td>
                <td>${item.question}</td>
                <td>${item.answer}</td>
                <td>
                    <button onclick="editData(${item.id}, '${item.question}', '${item.answer}')">
                        Edit
                    </button>

                    <button onclick="deleteData(${item.id})">
                        Delete
                    </button>
                </td>
            </tr>
            `;

        });

        document.getElementById("tableBody").innerHTML = table;

    });

}

// Delete
function deleteData(id) {

    if (!confirm("Delete this record?")) {
        return;
    }

    fetch("http://localhost:8080/admin/delete/" + id, {

        method: "DELETE"

    })
    .then(res => res.text())
    .then(data => {

        alert(data);

        loadData();

    });

}

// Edit
function editData(id, question, answer) {

    editId = id;

    document.getElementById("question").value = question;
    document.getElementById("answer").value = answer;

}

// Load table when page opens
window.onload = loadData;