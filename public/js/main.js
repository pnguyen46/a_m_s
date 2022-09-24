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

// const editBtn = document.querySelectorAll(".editBtn");
// Array.from(editBtn).forEach((el) => {
//   el.addEventListener("click", editItem);
// });

// const resetBtn = document.getElementById("resetBtn");
// if(resetBtn !== null){
//   resetBtn.addEventListener("click", clearValues);
// }


// async function getJSONData(route,id){
//   try {
//     const response = await fetch(`${route}/${id}`, {
//       method: "GET",
//     });
//     const { item,vehicles } = await response.json();
//     const [data] = item;
//     data.vehicles = vehicles;
//     return data;
//   } catch (error) {
//     console.error(error);
//   }
// }

// async function displayValues(route,data,id){

//   const formEl = document.getElementById("form");

//   const partContainer = document.getElementById('partContainer');
//   if(partContainer !== null){
//     partContainer.innerHTML = '';
//     const {parts} = data;
//     for(let i = 0;i < parts.length/2;i++){
//       addInputBox();
//     }
//   }

//   const vehicleContainer = document.getElementById('vehicleContainer');
//   if(vehicleContainer !== null){
//     const vehicleChild = vehicleContainer.children;
//     Array.from(vehicleChild).forEach((item,indx) => {
//       if(indx !== 0){
//         vehicleContainer.removeChild(item);
//       }
//     })
//     const {vehicles} = data;
//     for(let i = 1; i < vehicles.length;i++){
//       addVehicleInputBox();
//     }
//     const filterVehicleArr = vehicles.map(item => {
//       return Object.values(item);
//     }).map(item => item.slice(1,7)).reduce((acc,next) => acc.concat(...next),[]);
//     data.vehicles = filterVehicleArr;
//   }

//   const inputEle = document.querySelectorAll("#form input");
//   const idArr = Array.from(inputEle).map(item => item.getAttribute('id'));
//   const filteredArr = idArr.map(id => {
//     if(id === 'parts'){
//       return data[id].shift();
//     }else if(id === 'vehicles'){
//       return data[id].shift();
//     }else{
//       return data[id];
//     }
//   });

//   formEl.reset();

//   inputEle.forEach((item, indx) => (item.value = filteredArr[indx]));
//   formEl.action = `/${route}/editItem/${id}?_method=PUT`;
//   if(route === '/ticket'){
//     const options = document.getElementById('technician').children;
//     console.log(options);
//     if(options !== null){
//       Array.from(options).forEach(item => {
//         if(item.getAttribute('value') == data.technician){
//           item.setAttribute('selected',true);
//         }else{
//           item.removeAttribute('selected');
//         }
//       });
//     }
//   }
// }

// async function editItem(event){
//   try {
//     const itemId = event.target.getAttribute("data-bs-id");
//     const route = event.target.getAttribute("data-bs-identifier");
//     const resetAddBtn = document.getElementById("resetBtn");
//     resetAddBtn.setAttribute("data-bs-type", "edit");;
//     const formResetBtn = document.getElementById("hiddenBtn");
//     formResetBtn.classList.add("d-none");
//     const addBtn = document.getElementById('updateBtn')
//     addBtn.innerText = 'Update';

//     //Array
//     const data = await getJSONData(route,itemId);
//     displayValues(route,data,data._id);

//   } catch (error) {
//     return console.error(error);
//   }
// }

// function clearValues(){
//   const flag = event.target.getAttribute("data-bs-type");
//   if (flag === "edit") {
//     const options = document.getElementById('technician').children;
//     Array.from(options).forEach(item => {
//       item.removeAttribute('selected');
//     })
//     const form = document.getElementById('form');
//     form.action = `/${event.target.getAttribute('data-bs-identifier')}`;
//     const enableResetBtn = document.getElementById("hiddenBtn");
//     enableResetBtn.classList.remove("d-none");
//     const addBtn = document.getElementById('updateBtn');
//     addBtn.innerHTML = 'Add';
//     const partRow = document.querySelectorAll('#partContainer div');
//     partRow.forEach((item,indx) => {
//       if(indx !== 0){
//         item.remove();
//       }
//     })
//     const input = document.querySelectorAll("#form input");
//     input.forEach((item) => (item.value = ""));
//     resetBtn.setAttribute("data-bs-type", "");
//   }
// }

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
  
  // const deleteBtn = form.querySelector('.deleteVBtn');
  // deleteBtn.innerText = 'Delete';
  // deleteBtn.classList.remove('btn-danger');
  // deleteBtn.classList.add('btn-primary');
  // deleteBtn.removeAttribute('href');
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


