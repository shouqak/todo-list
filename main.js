let inputBox = document.getElementById("input-box");
let listContainer = document.getElementById("list-container");
let but = document.getElementById("input-button");
let butClear = document.getElementById("clear-button");



function loadTasks() {
    fetch("https://68220753b342dce8004ccfc9.mockapi.io/todo ")
        .then((response) => response.json())
        .then((data) => {
            listContainer.innerText = ""; 

            data.forEach((item) => {
                let div = document.createElement("div");
                div.className = "d-flex justify-content-between align-items-center border rounded-3 p-2  mb-2 ";

                let buts = document.createElement("div");
                buts.className = "d-flex gap-2 ";

                let p = document.createElement("p");
                p.innerText = item.text;
p.style.color=" #b82132"
                let del = document.createElement("button");
                del.innerText = "Delete";
                del.className = "btn btn-danger mb-3 rounded-pill";

                let done = document.createElement("button");
                done.innerText = "Done";
                done.className = "btn btn-success mb-3 rounded-pill";

                done.addEventListener("click", () => {
                    if (p.style.textDecoration === "line-through") {
                        p.style.textDecoration = "none";
                    } else {
                        p.style.textDecoration = "line-through";
                    }
                });

 del.addEventListener("click", () => {
          if (confirm("Are you sure you want to delete this task?")) {
        del.disabled = true
        fetch(
          `https://68220753b342dce8004ccfc9.mockapi.io/todo/${item.id}`,
          {
            method: "DELETE",
          }
        )
          .then((response) => response.json())
          .then((data) => {
            console.log(data)
            div.remove()
          })

    }
      })

                buts.appendChild(done);
                buts.appendChild(del);
                div.appendChild(p);
                div.appendChild(buts);

                listContainer.appendChild(div);
            });
        });
}

but.addEventListener("click", () => {
    if (inputBox.value === "") {
        alert("Please enter a task");
        return;
    }

    fetch("https://68220753b342dce8004ccfc9.mockapi.io/todo ", {
        method: "POST",
        body: JSON.stringify({
            text: inputBox.value,
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        },
    })
        .then((response) => response.json())
        .then(() => {
            inputBox.value = "";
            loadTasks(); 
        });
});


butClear.addEventListener("click", () => {
        if (inputBox.value.length === 0) {
        alert("There are no tasks to delete.");
        return;
    }
              if (confirm("Are you sure you want to delete all task?")) {

    fetch("https://68220753b342dce8004ccfc9.mockapi.io/todo ")
        .then((response) => response.json())
        .then((data) => {
            Promise.all(
                data.map((item) =>
                    fetch(
                        `https://68220753b342dce8004ccfc9.mockapi.io/todo/${item.id}`,
                        {
                            method: "DELETE",
                        }
                    )
                )
            ).then(() => {
                loadTasks(); 
            });
        });
}});

window.onload = () => {
    loadTasks();
};

 let randomQuoteElement = document.getElementById("randomQoute");
    let quotes = [
      "The only way to do great work is to love what you do. - Steve Jobs",
      "Success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful. - Albert Schweitzer",
      "Don't watch the clock; do what it does. Keep going. - Sam Levenson",
      "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
      "You miss 100% of the shots you don't take. - Wayne Gretzky"
    ];

    function showRandomQuote() {
      let randomIndex = Math.floor(Math.random() * quotes.length);
      randomQuoteElement.textContent = quotes[randomIndex];
    }

    setInterval(showRandomQuote, 5000);

    showRandomQuote();  