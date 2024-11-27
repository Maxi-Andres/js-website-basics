// NodeList = Static collecion of HTML elements by (id, class, element)
//              Can be create by using querySelectorAll()
//              Similar to an array but no (map, filter, reduce)
//              NodeList won't update to automatically reflect changes

document.addEventListener("DOMContentLoaded", () => {
    const itemList = document.querySelector("#item-list");
    const addItemButton = document.querySelector("#add-item");
    const highlightButton = document.querySelector("#highlight-items");

    // Añadir un nuevo elemento a la lista
    addItemButton.addEventListener("click", () => {
        const newItem = document.createElement("li"); // Step 1
        newItem.textContent = `Elemento ${itemList.children.length + 1}`; // Step 2
        itemList.appendChild(newItem); // Step 3
    });

    // Resaltar todos los elementos de la lista
    highlightButton.addEventListener("click", () => {
        const items = document.querySelectorAll("#item-list li"); // NodeList
        items.forEach((item, index) => {
            item.style.backgroundColor = index % 2 === 0 ? "#ffdd57" : "#7ae582";
        });
    });
});

// classList = Allows you to make reusable classes, permite interactuar con las clases

// add()
// remove()
// toggle()
// replace(oldClass, newClass)
// contains()

document.addEventListener("DOMContentLoaded", () => {
    const infoText = document.getElementById("info-text");

    document.getElementById("add-highlight").addEventListener("click", () => {
        infoText.classList.add("highlight");
    });

    document.getElementById("remove-highlight").addEventListener("click", () => {
        infoText.classList.remove("highlight");
    });

    document.getElementById("toggle-hidden").addEventListener("click", () => {
        infoText.classList.toggle("hidden");
    });

    document.getElementById("replace-class").addEventListener("click", () => {
        if (infoText.classList.contains("highlight")) {
            infoText.classList.replace("highlight", "hidden");
        }
    });

    document.getElementById("check-class").addEventListener("click", () => {
        if (infoText.classList.contains("highlight")) {
            alert('El párrafo contiene la clase "highlight".');
        } else {
            alert('El párrafo NO contiene la clase "highlight".');
        }
    });
});
