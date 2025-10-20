function change_font_size() {
    document.addEventListener("change", function() {
        const font_slider = document.querySelector(".font-slider") as HTMLInputElement;
        if (font_slider == null) throw new Error("Font slider is required");

        const value = font_slider.value;
        const buttons = document.querySelectorAll("button");

        buttons.forEach(button => {
            button.style.fontSize = `${value}px`;
        });
    });
}

function push_element_to_display(button: HTMLButtonElement) {
    const display = document.getElementById("res");
    const value = button.value;
    if (display == null) throw new Error("Display is required");

    if (display.textContent === '0') {
        display.textContent = value;
    } else {
        display.textContent += value;
    }
}

function calculate_result() {
    const res = document.getElementById("res");
    if (res == null) return;
    res.textContent = eval(res.textContent);
}

function clear_result() {
    const res = document.getElementById("res");
    if (res == null) return;
    res.textContent = '0';
}