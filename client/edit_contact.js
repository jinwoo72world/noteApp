document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const contactId = urlParams.get("id");
  const contactName = urlParams.get("name");
  const contactPhone = urlParams.get("phone");

  if (contactId) {
    document.getElementById("contact-id").value = contactId;
    document.getElementById("name").value = contactName;
    document.getElementById("phone").value = contactPhone;
  }

  document
    .getElementById("contact-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      const id = document.getElementById("contact-id").value;
      const name = document.getElementById("name").value;
      const phone = document.getElementById("phone").value;

      fetch(`http://localhost:3000/api/contacts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, phone }),
      })
        .then((response) => {
          if (response.ok) {
            alert("Contact updated successfully.");
            window.location.href = "index.html";
          } else {
            alert("This row is not updated. Please try again.");
          }
        })
        .catch((error) => console.error("Error updating contact:", error));
    });
});
