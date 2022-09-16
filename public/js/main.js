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

const resetAddBtn = document.querySelectorAll(".resetAddBtn")
if(resetAddBtn){
  Array.from(resetAddBtn).forEach(item => {
    item.addEventListener("click", (event) => {
      document.getElementById("resetBtn").setAttribute("data-bs-type", "edit");
      document.getElementById("hiddenBtn").classList.add("d-none");
      document.getElementById('updateBtn').innerText = 'Update';
    });
  })

}

const resetBtn = document.getElementById("resetBtn");
resetBtn.addEventListener("click", clearValues);

const addInputBoxBtn = document.getElementById('addInputBox');
addInputBoxBtn.addEventListener('click',addInputBox);

const deleteInputBoxBtn = document.getElementById('deleteInputBox');
deleteInputBoxBtn.addEventListener('click',deleteInputBox)


async function getJSONData(route,id){
  try {
    const response = await fetch(`${route}/${id}`, {
      method: "GET",
    });
    const { item } = await response.json();
    const [data] = item;
    return data;
  } catch (error) {
    console.error(error);
  }
}

function displayValues(route,data,id){
  const formEl = document.getElementById("form");
  const partContainer = document.getElementById('partContainer');
  partContainer.innerHTML = '';
  const {parts} = data;
  for(let i = 0;i < parts.length / 2;i++){
    addInputBox();
  }
  const inputEle = document.querySelectorAll("#form input");
  const idArr = Array.from(inputEle).map(item => item.getAttribute('id'));
  const filteredArr = idArr.map(id => {
    if(id === 'parts'){
      return data[id].shift();
    }else{
      return data[id];
    }
  });
  formEl.reset();
  inputEle.forEach((item, indx) => (item.value = filteredArr[indx]));
  formEl.action = `/${route}/editItem/${id}?_method=PUT`;
}

async function editItem(event){
  try {
    const itemId = event.target.getAttribute("data-bs-id");
    const route = event.target.getAttribute("data-bs-identifier");
    const data = await getJSONData(route,itemId);
    displayValues(route,data,data._id);
  } catch (error) {
    return console.error(error);
  }
}


function clearValues(){
  const flag = event.target.getAttribute("data-bs-type");
  if (flag === "edit") {
    const form = document.getElementById('form');
    form.action = `/${event.target.getAttribute('data-bs-identifier')}`;
    const enableResetBtn = document.getElementById("hiddenBtn");
    enableResetBtn.classList.remove("d-none");
    const addBtn = document.getElementById('updateBtn');
    addBtn.innerHTML = 'Add';
    const partRow = document.querySelectorAll('#partContainer div');
    partRow.forEach((item,indx) => {
      if(indx !== 0){
        item.remove();
      }
    })
    const input = document.querySelectorAll("#form input");
    input.forEach((item) => (item.value = ""));
    resetBtn.setAttribute("data-bs-type", "");
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
    id:'parts'
  };
  setAttributes(partNameInputBox, partNameAttributes);

  const partQtyInputBox = document.createElement("input");
  const partQtyAttributes = {
    type: "number",
    class: "form-control w-25",
    name: "repairParts",
    id:'parts'
  };
  setAttributes(partQtyInputBox, partQtyAttributes);
  container.appendChild(partNameInputBox);
  container.appendChild(partQtyInputBox);
  formEle.appendChild(container);
}

function deleteInputBox(){
  const partContainerEle = document.getElementById('partContainer');
  if(partContainerEle.children.length > 1){
    partContainerEle.removeChild(partContainerEle.lastElementChild);
  }
}