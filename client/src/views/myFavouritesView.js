import { html } from '../../node_modules/lit-html/lit-html.js';
import { getMyFavouriteRecepies } from '../services/favouritesService.js';
import { myProfileTemplate, trackActiveLink } from './templates/profileTemplates/myProfileTemplate.js';
import { myRecepiesTemplate } from './templates/profileTemplates/myRecepiesTemplate.js';
import { recipeTemplate } from './templates/recipeTemplate.js';
import { loaderTemplate } from './templates/loadingTemplate.js';
import { getCurrentUser } from '../services/authenticationService.js';
import { focusSearchField } from './templates/profileTemplates/profileSearchTemplate.js';


export const myRecepiesCollectionTemplate = (recepies, ctx) => html`
<section class="my-profile-section">
    ${myProfileTemplate(ctx)}
    ${myRecepiesTemplate(recepies, "Любими рецепти", ctx)}
</section>
`;

export async function myFavouriteRecepiesPage(ctx) {
    ctx.render(loaderTemplate());
    const data = await getMyFavouriteRecepies(getCurrentUser());

    const myFavouriteRecepies = data.map(recipeTemplate);

    ctx.render(myRecepiesCollectionTemplate(myFavouriteRecepies, ctx));
    
    trackActiveLink(ctx);

    focusSearchField();
}