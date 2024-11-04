// const url = "https://localhost:5001/api/beanvariety/"; //URL im fetching the data from

// const button = document.querySelector("#run-button");
// button.addEventListener("click", () => {
//     getAllBeanVarieties()
//         .then(beanVarieties => {
//             console.log(beanVarieties);
//             displayBeanVarieties(beanVarieties); // Display bean varieties in the DOM when you click Run It!----method below
//         })
// });



// //////CHALLENGE:CRUD
// //Display bean variety without having to click Run it!
// //step1:
// ////Function to fetch all bean varieties and call to display:
// function getAllBeanVarieties() {
//     //return fetch(url).then(resp => resp.json());
//     fetch(url).then(resp => resp.json()).then(beanVarieties => {
//     displayBeanVarieties(beanVarieties);})
// }
// //step2:
// // Call getAllBeanVarieties when the page loads
// window.addEventListener('load', getAllBeanVarieties);



// // handle submit for add bean form
// //also handles edit form
// const form = document.querySelector("#bean-form"); // selected form using its ID
// form.addEventListener("submit", (event) => { // event listener for form submission --Add bean variety type="submit" look in index.html, even if you dont write type="submit" it still works
//     event.preventDefault(); // prevent the default form submission behavior --update the page dynamically without a full reload

//     //need this for edit:
//     const beanId = form.dataset.beanId; // Retrieve the bean ID from form data attribute
    
//     const newBean = {
//         // get values from input field //#"input id" --see index.html 
//         name: document.querySelector("#name").value, 
//         region: document.querySelector("#region").value, 
//         notes: document.querySelector("#notes").value 
//     };
//     //EDIT:

//     if (beanId) {
//         // Update existing bean if beanId is present 
        
//         editBeanVariety(beanId, updatedBean);
//     } else {

//     //ADD:

//     addNewBeanVariety(newBean);
//     }
// });

// //Update the JavaScript and HTML with a form for 
// //adding a new bean variety to the database.
// //sends a POST request to add a new bean variety to the database.
// function addNewBeanVariety(bean){//---------------
//     fetch(url, 
//     {   method: 'POST',
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify(bean)
//     })
//     .then(response => response.json())
//     .then(() => {
//         getAllBeanVarieties(); // Refresh the list after deletion
//     });
//     // Extra:
//     // .then(() => {alert('Bean variety added successfully!');})
//     // .catch(error => console.error('Error adding bean variety:', error));
// }



// ////CHALLENGE:CRUD
// //DELETE Bean (delete requests have no body:)
// function deleteBeanVariety(beanId){//---------------
//     fetch(`${url}${beanId}`,       //note!
//     {   method: 'DELETE',
//         headers: {'Content-Type': 'application/json'},
//     })
//     .then(() => {
//         getAllBeanVarieties(); // Refresh the list after deletion
//     });
// }

// //EDIT
// // function editBeanVariety(beanId, updatedBean){ //make sure to accept id AND bean!
// //     const updatedBean = {
// //         name: document.querySelector("#name").value, // Use updated values
// //         region: document.querySelector("#region").value,
// //         notes: document.querySelector("#notes").value
// //     };

// //     fetch(`${url}${beanId}`, 
// //     {   method: 'PUT',
// //         headers: {'Content-Type': 'application/json'},
// //         body: JSON.stringify(updatedBean)
// //     })
// //     .then(response => response.json())
// //     .then(() => {
// //         getAllBeanVarieties(); // Refresh the list after editing
// //     })
// // }
// function editBeanVariety(beanId, updatedBean) {
//     fetch(`${url}${beanId}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(updatedBean)
//     })
//     .then(response => response.json())
//     .then(() => {
//         getAllBeanVarieties();
//         resetForm();
//     })
// }

// function editBean(id, name, region, notes) {
//     const form = document.querySelector("#bean-form");
//     form.dataset.beanId = id; // Set the ID in the form's data attribute //.id in dataset.id is not directly related to the column name in your database table. Instead, dataset.id is used to access the custom data attribute from an HTML element.
    
//     document.querySelector("#name").value = name;
//     document.querySelector("#region").value = region;
//     document.querySelector("#notes").value = notes;
// }
// function resetForm() {
//     const form = document.querySelector("#bean-form");
//     form.reset();
//     delete form.dataset.beanId; // Clear the bean ID after reset
// }


// // Function to display bean varieties in the DOM
// function displayBeanVarieties(beanVarieties) {
//     const beanList = document.getElementById('bean-list');
//     beanList.innerHTML = '';// Clear previous content
//     beanVarieties.forEach(bean => {
//         const div = document.createElement('div');
//         //use .innerHTML if theres DELETE button(parses the string as HTML and inserts it into the element--needed for <button>, <div>, <span> etc html tags), 
//         //if just properties and values .textContent works (HTML tags will be rendered as plain text)
//         //note: only ${bean.id} not in ''
//         div.innerHTML = `ID: ${bean.id}, Name: ${bean.name}, Region: ${bean.region}, Notes: ${bean.notes || 'N/A'}<button onclick="editBean(${bean.id},'${bean.name}', '${bean.region}', '${bean.notes || ''}')">Edit</button><button onclick="deleteBeanVariety(${bean.id})">Delete</button>`;
//         beanList.appendChild(div);
//     });
// }


const url = "https://localhost:5001/api/beanvariety/"; 

function getAllBeanVarieties() {
    fetch(url)
        .then(resp => resp.json())
        .then(beanVarieties => {
            displayBeanVarieties(beanVarieties);
        });
}
// Display bean varieties 
window.addEventListener('load', getAllBeanVarieties);

// Submit Form 
const form = document.querySelector("#bean-form");
form.addEventListener("submit", (event) => {
    event.preventDefault(); 

    const beanId = form.dataset.id; 
    // Get value of the data-id attribute from the form element and store it in the beanId  
    // data-id attribute is a custom attribute that holds the ID of the bean variety being edited.

    const bean = {
        id:beanId, //NEED TO HAVE THIS FOR EDIT BEAN!!! not needed for create but bcs this form does both you need to have it!
        name: document.querySelector("#name").value,
        region: document.querySelector("#region").value,
        notes: document.querySelector("#notes").value
    };

    if (beanId) {
        // Update 
        editBeanVariety(beanId, bean);
    } else {
        // Add
        addNewBeanVariety(bean);
    }
});

// Add bean
function addNewBeanVariety(bean) {
    fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bean)
    })
    .then(response => response.json())
    .then(() => {
        getAllBeanVarieties(); // Refresh list after add
    })
    
}

// Delete bean
function deleteBeanVariety(beanId) {
    fetch(`${url}${beanId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    })
    .then(() => {
        getAllBeanVarieties(); // Refresh list after delete
    })
    
}

// Edit bean
function editBeanVariety(beanId, updatedBean) {
    fetch(`${url}${beanId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedBean)
    })
    .then(response => {
        return response.json();
    })
    .then(() => {
        getAllBeanVarieties();
        resetForm();
    })
    
}

// Populate edit form
function editBean(id, name, region, notes) {
    const form = document.querySelector("#bean-form");
    form.dataset.id = id; //set data-id attribute of the form to the value of the bean id 
    // form.dataset.id set to the ID of the bean being edited. 
    //This ID is used in PUT request to update the correct bean entry.

    document.querySelector("#name").value = name;
    document.querySelector("#region").value = region;
    document.querySelector("#notes").value = notes;
}

// Reset/clear form
function resetForm() {
    const form = document.querySelector("#bean-form");
    form.reset();
    delete form.dataset.id; // Clear Id/"data-id attribute from the form" after form reset
}

// Display bean varieties, buttons in DOM
function displayBeanVarieties(beanVarieties) {
    const beanList = document.getElementById('bean-list');
    beanList.innerHTML = ''; // Clear previous content
    beanVarieties.forEach(bean => {
        const div = document.createElement('div');
        div.innerHTML = `
            ID: ${bean.id}, Name: ${bean.name}, Region: ${bean.region}, Notes: ${bean.notes || 'N/A'}
            <button onclick="editBean(${bean.id}, '${bean.name}', '${bean.region}', '${bean.notes || ''}')">Edit</button>
            <button onclick="deleteBeanVariety(${bean.id})">Delete</button>
        `;
        beanList.appendChild(div);
    });
}
