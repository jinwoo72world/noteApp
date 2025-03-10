document.addEventListener("DOMContentLoaded", function () {
  const table = document.getElementById("contacts-table");
  if (!table) {
    console.error("Table element not found!");
    return;
  }

  const tbody = table.getElementsByTagName("tbody")[0];
  if (!tbody) {
    console.error("Tbody element not found!");
    return;
  }

  fetch("http://localhost:3000/api/contacts")
    .then((response) => response.json())
    .then((contacts) => {
      contacts.forEach((contact) => {
        const newRow = tbody.insertRow();
        newRow.dataset.id = contact.id;
        newRow.innerHTML = `
                    <td>${contact.name}</td>
                    <td>${contact.phone}</td>
                    <td>${contact.createdAt || ""}</td>
                    <td>${contact.updatedAt || ""}</td>
                    <td>
                        <button onclick="editContact(this)">Edit</button>
                        <button onclick="deleteContact(this)">Delete</button>
                    </td>
                `;
      });
    })
    .catch((error) => console.error("Error fetching contacts:", error));
});

function editContact(button) {
  const row = button.closest("tr");
  if (!row) {
    console.error("Row not found!");
    return;
  }
  const id = row.dataset.id;
  const name = row.cells[0].textContent;
  const phone = row.cells[1].textContent;
  const updatedAt = row.cells[2].textContent;
  window.location.href = `edit_contact.html?id=${id}&name=${encodeURIComponent(
    name
  )}&phone=${encodeURIComponent(phone)}`;
}

function deleteContact(button) {
  const row = button.closest("tr");
  const id = row.dataset.id;

  if (confirm("Are you sure you want to delete this contact?")) {
    fetch(`http://localhost:3000/api/contacts/${id}`, { method: "DELETE" })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to delete contact");
        }
      })
      .catch((data) => {
        console.log(data.message);
        row.remove();
        window.location.reload();
      });
    // .catch((error) => console.error("Error deleting contact:", error));
  }
}
