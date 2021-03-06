import {html} from '../../../../node_modules/lit-html/lit-html.js';
import { ARE_YOU_SURE_DELETE_RECIPE } from '../../../constants/notificationMessages.js';
import { approveRecipe, removeRecipe } from '../../../services/recipeService.js';
import { showModal } from '../../../utils/modalDialogue.js';
import { navigateDownHandler, resolvePageStyleArchitecture } from '../../landingView.js';

export const recipeRowTemplate = ({ id, imageUrl, recipeName, statusName, ownerId }, ctx) => html`
    <tr>
        <td>${id}</td>
        <td>
            <div class="user-table-profile-avatar-container">
                <img 
                    alt="recipe image" 
                    class="user-profile-avatar" 
                    src=${
                        !imageUrl || imageUrl === 'null'
                            ? "../../static/images/food.jpg"
                            : imageUrl
                    } 
                    onerror="this.onerror=null;this.src='../../static/images/food.jpg';" 
                />
            </div>
            <div style="margin-left: 18%">
                ${recipeName}
            </div>
        </td>
        <td>
            <i 
                @click=${() => redirectToOwnerHandler(ownerId, ctx)} 
                class="fa-solid fa-share-from-square"
                style="cursor: pointer;"
            >
            </i>
        </td>
        <td>
            <i 
                @click=${() => redirectToRecipeHandler(id, ctx)}
                class="fa-solid fa-location-arrow"
                style="cursor: pointer;"
            >
            </i>
        </td>
        <td>
            <span 
                class="recipe-status-${statusName === 'одобрена' ? 'approved' : 'pending'}"
            >
                ${statusName}
            </span>
        </td>
        <td>
            <span
                @click=${(e) => approveRecipeHandler(id, ctx)}
                class="recipe-approve" 
                style="${statusName == 'одобрена' ? 'display: none' : ''}"
            >
                Одобри
            </span> 
            <span @click=${() => deleteHandler(id, ctx)} class="user-action-delete">Изтрий</span>
        </td>
    </tr>
`;

function redirectToOwnerHandler(ownerId, ctx) {
    ctx.page.redirect(`/administrate/users/edit-${ownerId}`);
}

function redirectToRecipeHandler(recipeId, ctx) {
    ctx.page.redirect(`/details-${recipeId}`);
    resolvePageStyleArchitecture();
    document.querySelector('footer').style.display = 'flex';
    navigateDownHandler();
}

async function approveRecipeHandler(recipeId, ctx) {
    await approveRecipe(recipeId);
    ctx.page.redirect(ctx.canonicalPath);
}

async function deleteHandler(recipeId, ctx) {
    showModal(ARE_YOU_SURE_DELETE_RECIPE, onSelect, 'admin');

    async function onSelect(choice) {
        if (choice) {
            await removeRecipe(recipeId);
            ctx.page.redirect(ctx.canonicalPath);
        }
    }
}