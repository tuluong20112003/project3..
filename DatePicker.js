class DatePicker {
    constructor(id, callback) {
        this.id = id;
        this.callback = callback;
        this.currentDate = new Date();
    }

    render(date) {
        this.currentDate = date;
        const calendarDiv = document.getElementById(this.id);
        calendarDiv.innerHTML = "";

        const header = this.renderHeader();
        const calendarTable = this.renderCalendarTable(date);

        calendarDiv.appendChild(header);
        calendarDiv.appendChild(calendarTable);
    }

    renderHeader() {
        const header = document.createElement("div");
        header.classList.add("header");

        const monthYearText = document.createElement("span");
        monthYearText.textContent = this.getMonthYearString();
        header.appendChild(monthYearText);

        const prevButton = document.createElement("button");
        prevButton.textContent = "<";
        prevButton.addEventListener("click", () => {
            this.currentDate.setMonth(this.currentDate.getMonth() - 1);
            this.render(this.currentDate);
        });
        header.appendChild(prevButton);

        const nextButton = document.createElement("button");
        nextButton.textContent = ">";
        nextButton.addEventListener("click", () => {
            this.currentDate.setMonth(this.currentDate.getMonth() + 1);
            this.render(this.currentDate);
        });
        header.appendChild(nextButton);

        return header;
    }

    renderCalendarTable(date) {
        const table = document.createElement("table");
        const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

        const headerRow = document.createElement("tr");
        daysOfWeek.forEach(day => {
            const th = document.createElement("th");
            th.textContent = day;
            headerRow.appendChild(th);
        });
        table.appendChild(headerRow);

        const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const startDate = new Date(firstDayOfMonth);
        startDate.setDate(startDate.getDate() - firstDayOfMonth.getDay()); // Start from previous month's days
        const endDate = new Date(lastDayOfMonth);
        endDate.setDate(endDate.getDate() + (6 - lastDayOfMonth.getDay())); // End with next month's days

        let currentDate = new Date(startDate);
        while (currentDate <= endDate) {
            const weekRow = document.createElement("tr");
            for (let i = 0; i < 7; i++) {
                const cell = document.createElement("td");
                cell.textContent = currentDate.getDate();
                if (currentDate.getMonth() !== date.getMonth()) {
                    cell.classList.add("other-month");
                } else {
                    cell.addEventListener("click", () => {
                        this.callback(this.id, {
                            month: currentDate.getMonth() + 1,
                            day: currentDate.getDate(),
                            year: currentDate.getFullYear()
                        });
                    });
                }
                weekRow.appendChild(cell);
                currentDate.setDate(currentDate.getDate() + 1);
            }
            table.appendChild(weekRow);
        }

        return table;
    }

    getMonthYearString() {
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        return months[this.currentDate.getMonth()] + " " + this.currentDate.getFullYear();
    }
}
