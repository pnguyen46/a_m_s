//Add & Delete Btn for parts
const addInputBoxBtn = document.querySelector("#addInputBox");
const deleteInputBoxBtn = document.querySelectorAll(".deleteInputBox");

if (addInputBoxBtn !== null) {
  addInputBoxBtn.addEventListener("click", addInputBox);
  Array.from(deleteInputBoxBtn).forEach((item) =>
    item.addEventListener("click", deleteInputBox)
  );
}

// set attributes for element
function setAttributes(element, attributes) {
  Object.keys(attributes).forEach((attr) => {
    element.setAttribute(attr, attributes[attr]);
  });
}

//add input for part section
function addInputBox() {
  const formEle = addInputBoxBtn.parentElement.previousElementSibling;
  const container = document.createElement("div");
  container.setAttribute("class", "d-flex gap-2 my-2");

  const partNameInputBox = document.createElement("input");
  const partNameAttr = {
    type: "text",
    placeholder: "Name",
    class: "form-control w-75",
    name: "repairParts",
    id: "parts",
  };
  setAttributes(partNameInputBox, partNameAttr);

  const partQtyInputBox = document.createElement("input");
  const partQtyAttr = {
    type: "number",
    placeholder: "Qty",
    class: "form-control w-25",
    name: "repairParts",
    id: "parts",
  };

  const deleteBtn = document.createElement("button");
  const deleteBtnAttr = {
    type: "button",
    class: "btn btn-primary btn-sm deleteInputBox",
  };
  setAttributes(deleteBtn, deleteBtnAttr);
  deleteBtn.innerText = "Delete";
  deleteBtn.addEventListener("click", deleteInputBox);

  setAttributes(partQtyInputBox, partQtyAttr);
  container.appendChild(partNameInputBox);
  container.appendChild(partQtyInputBox);
  container.appendChild(deleteBtn);
  formEle.appendChild(container);
}

function deleteInputBox() {
  const partContainerEle = document.getElementById("partContainer");
  if (partContainerEle.children.length > 1) {
    partContainerEle.removeChild(event.target.parentElement);
  }
}

const newVehicleBtn = document.getElementById("newVBtn");
if (newVehicleBtn !== null) {
  newVehicleBtn.addEventListener("click", addVehicleInputBox);
}

function addVehicleInputBox() {
  const partContainer = document.getElementById("vehicleContainer");
  const vForms = partContainer.children;
  const baseFormInput = vForms[vForms.length - 1].innerHTML;
  const deleteBtn = document.createElement('a');
  deleteBtn.setAttribute('class','btn btn-primary btn-sm ms-auto deleteVBtn');
  deleteBtn.innerText = 'Delete';
  const form = document.createElement("div");
  form.setAttribute("class", vForms[0].getAttribute("class"));
  form.innerHTML = baseFormInput;
  if(form.lastElementChild.tagName === 'A'){
    form.removeChild(form.lastElementChild);
  }
  form.appendChild(deleteBtn);
  Array.from(form.children).forEach((item) => {
    item.setAttribute("value", "");
  });
  
  partContainer.appendChild(form);

  const deleteVehicleBtn = document.querySelectorAll(".deleteVBtn");
  Array.from(deleteVehicleBtn).forEach((item) =>
    item.addEventListener("click", (event) => {
      const partContainer = document.getElementById("vehicleContainer");
      if (partContainer.children.length > 1) {
        partContainer.removeChild(event.target.parentElement);
      }
    })
  );
}


//Preset element in view form
const editMode = document.getElementById("editMode");
if (editMode !== null) {
  editMode.addEventListener("click", (event) => {
    const form = document.querySelectorAll("#form input");
    const editItem = document.querySelectorAll(".edit");
    const selectSec = document.getElementById("technician");
    Array.from(editItem).forEach((item) => {
      item.classList.remove("d-none");
    });
    Array.from(form).forEach((item) => {
      item.removeAttribute("disabled");
    });
    selectSec.removeAttribute("disabled");
    editMode.classList.add("d-none");
  });
}


