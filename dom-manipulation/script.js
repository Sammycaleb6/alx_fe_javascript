const quotes = [
  { text: "Do one thing every day that scares you.", category: "Motivation" },
  { text: "Life is what happens when you're busy making other plans.", category: "Life" },
  { text: "Success is not final, failure is not fatal.", category: "Success" },
  { text: "The only way to do great work is to love what you do.", category: "Work" }
];

function populateCategories() {
  const categorySelect = document.getElementById('categorySelect');
  const uniqueCategories = [...new Set(quotes.map(q => q.category))];
  
  categorySelect.innerHTML = "";
  uniqueCategories.forEach(cat => {
    const option = document.createElement('option');
    option.value = cat;
    option.textContent = cat;
    categorySelect.appendChild(option);
  });
}

function showRandomQuote() {
  const selectedCategory = document.getElementById('categorySelect').value;
  const filteredQuotes = quotes.filter(q => q.category === selectedCategory);

  const display = document.getElementById('quoteDisplay');
  if (filteredQuotes.length === 0) {
    display.textContent = "No quotes found for this category.";
    return;
  }

  const random = Math.floor(Math.random() * filteredQuotes.length);
  const quote = filteredQuotes[random];

  display.textContent = `"${quote.text}" — ${quote.category}`;
}

function addQuote() {
  const quoteText = document.getElementById('newQuoteText').value.trim();
  const quoteCategory = document.getElementById('newQuoteCategory').value.trim();

  if (!quoteText || !quoteCategory) {
    alert("Please enter both a quote and category.");
    return;
  }

  quotes.push({ text: quoteText, category: quoteCategory });

  document.getElementById('newQuoteText').value = "";
  document.getElementById('newQuoteCategory').value = "";

  populateCategories();
  alert("Quote added successfully!");
}

document.getElementById('newQuote').addEventListener('click', showRandomQuote);
populateCategories();
