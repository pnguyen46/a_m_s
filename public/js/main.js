// const editModal = document.getElementById('editModal') || '';
// const editForm = document.getElementById('editForm');

// const customerEditModal = document.getElementById('customerEditModal');
// const customerEditForm = document.getElementById('customerEditForm');

// editModal.addEventListener('show.bs.modal', async (event) => {
//   // Button that triggered the modal
//   const button = event.relatedTarget;
//   // Extract info from data-bs-* attributes
//   const itemId = button.getAttribute('data-bs-id');

//   try {
//     const response = await fetch(`inventory/${itemId}`, {
//       method: 'GET'
//     });
//     const {item} = await response.json();
//     document.querySelector('#editForm #editName').setAttribute('value',item[0].name)
//     document.querySelector('#editForm #editQty').setAttribute('value',item[0].quantity)
//     document.querySelector('#editForm #editBrand').setAttribute('value',item[0].brand)
//     document.querySelector('#editForm #editLocation').setAttribute('value',item[0].location)
//     editForm.setAttribute('action', `/inventory/editItem/${itemId}?_method=PUT`);
//   } catch (error) {
//     console.error(error);
//   }
// });

const editBtn = document.querySelectorAll(".btn.editBtn");
Array.from(editBtn).forEach((el) => {
  el.addEventListener("click", editItem);
});

// const addInputBoxBtn = document.getElementById('addInputBox');
// addInputBoxBtn.addEventListener('click',addInputBox);

// const deleteInputBoxBtn = document.getElementById('deleteInputBox');
// deleteInputBoxBtn.addEventListener('click',deleteInputBox)

function setModalContent(modalType, data) {
  switch (modalType) {
    case "customer":
      document
        .getElementById("editCustomerName")
        .setAttribute("value", data.name);
      document
        .getElementById("editCustomerAddr")
        .setAttribute("value", data.address);
      document
        .getElementById("editCustomerPhone")
        .setAttribute("value", data.phone_number);
      document
        .getElementById("editCustomerFavTech")
        .setAttribute("value", data.fav_tech);
      document
        .getElementById("customerEditForm")
        .setAttribute(
          "action",
          `/${modalType}/editItem/${data._id}?_method=PUT`
        );
      break;
    case "inventory":
      document.getElementById("itemName").setAttribute("value", data.name);
      document.getElementById("itemQty").setAttribute("value", data.quantity);
      document.getElementById("itemBrand").setAttribute("value", data.brand);
      document
        .getElementById("itemLocation")
        .setAttribute("value", data.location);
      document
        .getElementById("form")
        .setAttribute(
          "action",
          `/${modalType}/editItem/${data._id}?_method=PUT`
        );
      break;
    case "employee":
      document
        .getElementById("editEmployeeName")
        .setAttribute("value", data.name);
      document
        .getElementById("editEmployeeAddr")
        .setAttribute("value", data.address);
      document
        .getElementById("editEmployeePhone")
        .setAttribute("value", data.phone_number);
      document
        .getElementById("editEmployeeRepair")
        .setAttribute("value", data.repair);
      document
        .getElementById("editEmployeeSpecialty")
        .setAttribute("value", data.specialty);
      document
        .getElementById("editEmployeeClass")
        .setAttribute("value", data.class);
      document
        .getElementById("editEmployeeStatus")
        .setAttribute("value", data.status);
      document
        .getElementById("employeeEditForm")
        .setAttribute(
          "action",
          `/${modalType}/editItem/${data._id}?_method=PUT`
        );
      break;
    case "ticket":
      document
        .getElementById("repairEditType")
        .setAttribute("value", data.repairType);
      document.getElementById("repairEditHrs").setAttribute("value", data.hour);
      document
        .getElementById("repairEditParts")
        .setAttribute("value", data.parts);
      document
        .getElementById("repairEditCost")
        .setAttribute("value", data.cost);
      document
        .getElementById("repairEditDate")
        .setAttribute("value", new Date(data.date).toDateString());
      document
        .getElementById("repairEditTech")
        .setAttribute("value", data.technician);
      document
        .getElementById("repairEditStatus")
        .setAttribute("value", data.status);
      document
        .getElementById("repairEditModal")
        .setAttribute(
          "action",
          `/${modalType}/editItem/${data._id}?_method=PUT`
        );
      break;

    default:
      break;
  }
}

async function editItem(event) {
  try {
    const form = document.getElementById('form');
    const itemId = event.target.getAttribute("data-bs-id");
    const route = event.target.getAttribute("data-bs-identifier");
    const response = await fetch(`${route}/${itemId}`, {
      method: "GET",
    });
    const { item } = await response.json();
    const [data] = item;
    form.reset();
    setModalContent(route, data);
  } catch (error) {
    return console.error(error);
  }
}

function setAttributes(element, attributes) {
  Object.keys(attributes).forEach((attr) => {
    element.setAttribute(attr, attributes[attr]);
  });
}

function addInputBox() {
  const formEle = addInputBoxBtn.parentElement.previousElementSibling;
  const container = document.createElement("div");
  container.setAttribute("class", "d-flex");

  const partNameInputBox = document.createElement("input");
  const partNameAttributes = {
    type: "text",
    class: "form-control w-75",
    name: "repairParts",
  };
  setAttributes(partNameInputBox, partNameAttributes);

  const partQtyInputBox = document.createElement("input");
  const partQtyAttributes = {
    type: "number",
    class: "form-control w-25",
    name: "repairParts",
  };
  setAttributes(partQtyInputBox, partQtyAttributes);
  container.appendChild(partNameInputBox);
  container.appendChild(partQtyInputBox);
  formEle.appendChild(container);
}

const resetAddBtn = document.getElementById("resetAddBtn");
resetAddBtn.addEventListener("click", (event) => {
  document.getElementById("resetBtn").setAttribute("data-bs-type", "edit");
});

const resetBtn = document.getElementById("resetBtn");
resetBtn.addEventListener("click", (event) => {
  const flag = event.target.getAttribute("data-bs-type");
  if (flag === "edit") {
    const input = document.querySelectorAll("#form input");
    input.forEach(item => item.value = '');
    resetBtn.setAttribute("data-bs-type", "");
  }
});