let transactions = [];

function addTransaction(event) {
    event.preventDefault();
    
    const amount = parseFloat(document.getElementById('amount').value);
    const category = document.getElementById('category').value;
    const description = document.getElementById('description').value;
    const id = transactions.length + 1;
    const date = new Date().toLocaleString();

    const transaction = {
        id,
        date,
        amount,
        category,
        description
    };

    transactions.push(transaction);

    const tableBody = document.querySelector('#transaction-table tbody');
    const row = tableBody.insertRow();
    const rowColor = amount >= 0 ? 'green' : 'red';
    row.innerHTML = `
        <td>${transaction.id}</td>
        <td>${transaction.date}</td>
        <td>${transaction.category}</td>
        <td>${transaction.description}</td>
        <td style="color: ${rowColor};">${transaction.amount.toFixed(2)}</td>
        <td><button onclick="deleteTransaction(${transaction.id})">Удалить</button></td>
    `;

    updateTotal();
}

function deleteTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);
    const tableRow = document.querySelector(`#transaction-table tbody tr:nth-child(${id})`);
    tableRow.remove();
    updateTotal();
}

function updateTotal() {
    const totalElement = document.getElementById('total');
    const totalAmount = transactions.reduce((total, transaction) => total + transaction.amount, 0);
    totalElement.textContent = `Общая сумма: ${totalAmount.toFixed(2)}`;
}

document.getElementById('transaction-form').addEventListener('submit', addTransaction);