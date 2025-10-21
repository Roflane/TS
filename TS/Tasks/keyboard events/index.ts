function setElementColor(ele: HTMLElement, color: string) {
    ele.style.backgroundColor = color;
}

function setTooltipVisibility(id: string, status: string) {
    const ele = document.querySelector<HTMLAnchorElement>(`#${id}`);
    const tooltip = document.querySelector<HTMLElement>(`#${id}-tooltip`);
    if (!ele || !tooltip) return;

    tooltip.textContent = ele.href;
    tooltip.style.visibility = status;
}


function contextMenu() {
    const menu = document.querySelector<HTMLElement>("#context-menu");
    let x = 0, y = 0;
    if (menu == null) return;

    document.addEventListener('mousemove', (e) => {
        x = e.clientX;
        y = e.clientY;
    });

    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        menu.style.visibility = 'visible';
        menu.style.top = `${y}px`;
        menu.style.left = `${x}px`;
        if (menu.style.visibility) {
            menu.style.pointerEvents = 'all';
        } else menu.style.pointerEvents = 'none';
    });

    const option1 = menu.querySelector('.option1');
    option1?.addEventListener('click', () => {
        document.body.classList.toggle('light');
        if (document.body.classList.contains('light')) {
            document.body.style.background = '#fff';
            document.body.style.color = '#000';
        } else {
            document.body.style.background = '#1e1e1e';
            document.body.style.color = '#fff';
        }
        menu.classList.remove('visible');
    });
}


function virtualKeyboard() {
    document.addEventListener('keydown', (e) => {
        const key = document.querySelector(`.key[data-key="${e.code}"]`);
        if (key) key.classList.add('active');
    });

    document.addEventListener('keyup', (e) => {
        const key = document.querySelector(`.key[data-key="${e.code}"]`);
        if (key) key.classList.remove('active');
    });
}

(() => {
    contextMenu();
})()
