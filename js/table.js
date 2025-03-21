document.addEventListener("DOMContentLoaded", () => {
    const tables = document.querySelectorAll(".sortable");

    tables.forEach((table) => {
        const headers = table.querySelectorAll("thead th");

        headers.forEach((header, index) => {
            if (header.dataset.sortable === "true") {
                header.style.cursor = "pointer";
                header.addEventListener("click", () => {
                    sortTable(table, index);
                });
            }
        });
    });

    function sortTable(table, columnIndex) {
        const rows = Array.from(table.querySelectorAll("tbody tr"));
        const isNumeric = !isNaN(rows[0].cells[columnIndex].textContent.trim().replace(/,/g, ""));
        const isAscending = table.dataset.sortOrder !== "asc";

        rows.sort((a, b) => {
            const aText = a.cells[columnIndex].textContent.trim().replace(/,/g, "");
            const bText = b.cells[columnIndex].textContent.trim().replace(/,/g, "");

            if (isNumeric) {
                return isAscending ? aText - bText : bText - aText;
            } else {
                return isAscending
                    ? aText.localeCompare(bText)
                    : bText.localeCompare(aText);
            }
        });

        rows.forEach((row) => table.querySelector("tbody").appendChild(row));
        table.dataset.sortOrder = isAscending ? "asc" : "desc";
    }
});