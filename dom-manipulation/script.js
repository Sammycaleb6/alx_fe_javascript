let quotes = [];

function loadQuotes() {
  const stored = localStorage.getItem('quotes');
  if (stored) {
    quotes = JSON.parse(stored);
  } else {
    quotes = [
      { text: "Do one thing every day that scares you.", category: "Motivation" },
      { text: "Life is what happens when you're busy making other plans.", category: "Life" },
      { text: "Success is not final, failure is not fatal.", category: "Success" },
      { text: "The only way to do great work is to love what you do.", category: "Work" }
    ];
    saveQuotes();
  }
}

function saveQuotes() {
  localStorage.setItem('quotes', JSON.stringify(quotes));
}

function getUniqueCategories() {
  return [...new Set(quotes.map(q => q.category))].sort();
}

function populateCategories() {
  const filterDropdown = document.getElementById('categoryFilter');
  const savedFilter = localStorage.getItem('selectedCategory') || 'all';
  const categories = getUniqueCategories();

  filterDropdown.innerHTML = `<option value="all">All Categories</option>`;
  categories.forEach(cat => {
    const option = document.createElement('option');
    option.value = cat;
    option.textContent = cat;
    if (cat === savedFilter) option.selected = true;
    filterDropdown.appendChild(option);
  });

  filterQuotes();
}

function filterQuotes() {
  const selectedCategory = document.getElementById('categoryFilter').value;
  const quoteDisplay = document.getElementById('quoteDisplay');

  localStorage.setItem('selectedCategory', selectedCategory);

  const filtered = selectedCategory === 'all'
    ? quotes
    : quotes.filter(q => q.category === selectedCategory);

  if (filtered.length === 0) {
    quoteDisplay.textContent = "No quotes available for this category.";
    return;
  }

  const random = Math.floor(Math.random() * filtered.length);
  const quote = filtered[random];
  quoteDisplay.textContent = `"${quote.text}" — ${quote.category}`;

  sessionStorage.setItem('lastViewedQuote', quoteDisplay.textContent);
}

function restoreLastViewedQuote() {
  const last = sessionStorage.getItem('lastViewedQuote');
  if (last) {
    document.getElementById('quoteDisplay').textContent = last;
  }
}

document.getElementById('quoteForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const text = document.getElementById('newQuoteText').value.trim();
  const category = document.getElementById('newQuoteCategory').value.trim();
  const msg = document.getElementById('formMessage');

  if (!text || !category) {
    msg.style.color = 'red';
    msg.textContent = "Both fields are required.";
    return;
  }

  quotes.push({ text, category });
  saveQuotes();
  populateCategories();

  msg.style.color = 'green';
  msg.textContent = "Quote added successfully!";
  e.target.reset();
});

function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function (e) {
    try {
      const imported = JSON.parse(e.target.result);
      if (Array.isArray(imported)) {
        quotes.push(...imported);
        saveQuotes();
        populateCategories();
        document.getElementById('formMessage').textContent = "Quotes imported successfully!";
      } else {
        alert("Invalid JSON format.");
      }
    } catch {
      alert("Failed to parse JSON.");
    }
  };
  fileReader.readAsText(event.target.files[0]);
}

function exportQuotes() {
  const data = JSON.stringify(quotes, null, 2);
  const blob = new Blob([data], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "quotes.json";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

loadQuotes();
populateCategories();
restoreLastViewedQuote();
