import { html } from "../../../node_modules/lit-html/lit-html.js";
import { notify } from "../../utils/notification.js"
import { NICE_TRY_BUT_NO_CONTENT } from "../../constants/notificationMessages.js";

export const searchTemplate = (ctx) => html`
    <form @submit=${(e) => search(e, ctx)}>
        <img @click=${(e) => search(e, ctx)} id="find-img"
        src="../../static/images/istockphoto-1068237878-170667a-removebg-preview.png">
        <input type="search" id="myInput" placeholder="Търсете по име на рецептата..." autocomplete="off">
    </form>
`;

async function search(e, ctx) {
    e.preventDefault();

    const inputField = document.getElementById('myInput');
    let query = inputField.value;

    if (query.trim() !== '') {
        ctx.page.redirect(`/search=${query}`);
    } else {
        notify(NICE_TRY_BUT_NO_CONTENT)
    }
}