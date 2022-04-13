const modalDialogue = document.createElement('div');
modalDialogue.id = 'overlay';

modalDialogue.innerHTML = `
<div id="modal">
    <p>Are you sure?</p>
    <button class="modal-ok">Потвърди</button>
    <button class="modal-cancel">Отмени</button>
</div>
`;

modalDialogue.querySelector('.modal-ok').addEventListener('click', () => onChoice(true));
modalDialogue.querySelector('.modal-cancel').addEventListener('click', () => onChoice(false));

const modalMessage = modalDialogue.querySelector('p');

let call = null;

export function showModal(message, callback) {
    call = callback;
    modalMessage.textContent = message;
    document.body.appendChild(modalDialogue);
}

function onChoice(choice) {
    clear();
    call(choice);
}

function clear() {
    modalDialogue.remove();
}