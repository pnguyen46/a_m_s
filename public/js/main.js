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
const editBtn = document.querySelectorAll('.btn.editBtn');
Array.from(editBtn).forEach((el)=>{
  el.addEventListener('click', editItem)
})

function setModalContent(modalType,data){
  switch (modalType) {
    case 'customer':
      document.getElementById('editCustomerName').setAttribute('value',data.name);
      document.getElementById('editCustomerAddr').setAttribute('value',data.address);
      document.getElementById('editCustomerPhone').setAttribute('value',data.phone_number);
      document.getElementById('editCustomerFavTech').setAttribute('value',data.fav_tech);
      document.getElementById('customerEditForm').setAttribute('action',`/${modalType}/editItem/${data._id}?_method=PUT`)
      break;
    case 'inventory':
      document.getElementById('editName').setAttribute('value',data.name);
      document.getElementById('editQty').setAttribute('value',data.quantity);
      document.getElementById('editBrand').setAttribute('value',data.brand);
      document.getElementById('editLocation').setAttribute('value',data.location);
      document.getElementById('editForm').setAttribute('action',`/${modalType}/editItem/${data._id}?_method=PUT`)
      break;
  
    default:
      break;
  }
}

async function editItem(event){
  try {
    const itemId = event.target.getAttribute('data-bs-id');
    const route = event.target.getAttribute('data-bs-identifier');
    const response = await fetch(`${route}/${itemId}`, {
      method: 'GET'
    });
    const {item} = await response.json();
    const [data] = item;
    setModalContent(data.identifier,data);
  } catch (error) {
    return console.error(error);
  }
}
