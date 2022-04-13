import { cataloguePage } from './views/catalogueView.js';
import page from '../node_modules/page/page.mjs';
import { setUp } from './middlewares/setUpMidware.js';
import { loginPage } from './views/loginView.js';
import { registerPage } from './views/registerView.js';
import { createPage } from './views/createView.js';
import { detailsPage } from './views/detailsView.js';
import { editPage } from './views/editView.js';
import { filtrationPage } from './views/filtrationView.js';
import { categorizationPage } from './views/categorizationView.js';

page('/', setUp, cataloguePage)
page('/login', setUp, loginPage);
page('/register', setUp, registerPage);
page('/add-recipe', setUp, createPage);
page('/details/:id', setUp, detailsPage);
page('/edit/:id', setUp, editPage);
page('/search=:query', setUp, filtrationPage)
page('/categorize=:query', setUp, categorizationPage)

page.start();