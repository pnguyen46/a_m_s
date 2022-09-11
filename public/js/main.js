const editModal = document.getElementById('editModal');
const editForm = document.getElementById('editForm');
editModal.addEventListener('show.bs.modal', async (event) => {
  // Button that triggered the modal
  const button = event.relatedTarget;
  // Extract info from data-bs-* attributes
  const itemId = button.getAttribute('data-bs-id');

  try {
    const response = await fetch(`inventory/${itemId}`, {
      method: 'GET'
    });
    const {item} = await response.json();
    document.querySelector('#editForm #editName').setAttribute('value',item[0].name)
    document.querySelector('#editForm #editQty').setAttribute('value',item[0].quantity)
    document.querySelector('#editForm #editBrand').setAttribute('value',item[0].brand)
    document.querySelector('#editForm #editLocation').setAttribute('value',item[0].location)
    editForm.setAttribute('action', `/inventory/editItem/${itemId}?_method=PUT`);
  } catch (error) {
    console.error(error);
  }
});
