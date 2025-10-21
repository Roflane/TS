(() => {
    document.addEventListener('keydown', (e) => {
        const key = document.querySelector(`.key[data-key="${e.code}"]`);
        if (key) key.classList.add('active');
    });

    document.addEventListener('keyup', (e) => {
        const key = document.querySelector(`.key[data-key="${e.code}"]`);
        if (key) key.classList.remove('active');
    });
})()