const spellArea = document.getElementById("spellArea");
const ingredients = document.querySelectorAll("#ingredientsList li");
const rareIngredients = document.querySelectorAll("#rareList li");
const historyDiv = document.getElementById("history");

const sparkSound = document.getElementById("sparkSound");
const drumSound = document.getElementById("drumSound");

function randomColor() {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
}

function createSparkles() {
    for (let i = 0; i < 10; i++) {
        const sp = document.createElement("div");
        sp.classList.add("sparkle");
        sp.style.left = Math.random() * 100 + "%";
        sp.style.bottom = "0px";
        sp.style.animationDelay = Math.random() + "s";
        spellArea.appendChild(sp);
        setTimeout(() => sp.remove(), 1500);
    }
}

document.getElementById("generateButton").addEventListener("click", () => {
    let count = 3;
    spellArea.textContent = count;
    spellArea.style.background = "rgba(255,255,255,0.1)";
    spellArea.className = "";

    drumSound.play();

    const timer = setInterval(() => {
        count--;
        spellArea.textContent = count;

        if (count === 0) {
            clearInterval(timer);

            // Legendary 5% chance
            const legendaryChance = Math.random();
            let spell;
            let isLegendary = false;

            if (legendaryChance < 0.05) {
                isLegendary = true;
                spell = rareIngredients[Math.floor(Math.random() * rareIngredients.length)].textContent;
            } else {
                spell = ingredients[Math.floor(Math.random() * ingredients.length)].textContent;
            }

            spellArea.style.background = randomColor();
            spellArea.textContent = spell;
            spellArea.classList.add("fade-in", "glow");

            createSparkles();
            sparkSound.play();

            const card = document.createElement("div");
            card.className = "spell-card";
            card.textContent = spell;

            if (isLegendary) card.classList.add("legendary");

            historyDiv.appendChild(card);
        }
    }, 1000);
});

document.getElementById("resetButton").addEventListener("click", () => {
    spellArea.textContent = "Your spell will appear here...";
    spellArea.style.background = "rgba(255,255,255,0.1)";
    spellArea.className = "";
});

document.getElementById("clearHistoryButton").addEventListener("click", () => {
    historyDiv.innerHTML = "";
});

const ingredientInput = document.getElementById("ingredientInput");
const addIngredientButton = document.getElementById("addIngredientButton");
const userIngredientList = document.getElementById("userIngredientList");
const combineSpellButton = document.getElementById("combineSpellButton");

addIngredientButton.addEventListener("click", () => {
    const name = ingredientInput.value.trim();
    if (name === "") return;

    const li = document.createElement("li");
    li.textContent = name;

    li.addEventListener("click", () => {
        li.classList.toggle("selected");
    });

    userIngredientList.appendChild(li);
    ingredientInput.value = "";
});

combineSpellButton.addEventListener("click", () => {
    const selected = document.querySelectorAll("#userIngredientList li.selected");

    if (selected.length === 0) {
        spellArea.textContent = "Select at least one ingredient!";
        return;
    }

    const parts = Array.from(selected).map(li => li.textContent);
    const combinedSpell = parts.join(" + ");

    spellArea.style.background = randomColor();
    spellArea.textContent = combinedSpell;
    spellArea.classList.add("fade-in", "glow");
    createSparkles();
    sparkSound.play();

    const card = document.createElement("div");
    card.className = "spell-card";
    card.textContent = combinedSpell;
    historyDiv.appendChild(card);
});
