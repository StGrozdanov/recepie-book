import { html } from '../../node_modules/lit-html/lit-html.js';
import { filterByCategory, getAll, getRecepiesCount, RECEPIES_PER_PAGE, searchByName } from '../io/requests.js';
import { loaderTemplate } from './common/loadingTemplate.js';

const pageTemplate = (count) => html`
    <a href="?page=${count}" class="button warning page-btn">${count}</a>
`

const paginationTemplate = (pages, currentPage, totalPagesCount) => html`
<div class="page-div">
    <a href=${currentPage - 1 > 0 ? `?page=${currentPage - 1 > 0 ? currentPage - 1 : 1}` : "javascript:void[0]"} class="button warning page-btn"> < </a> 
    
    ${pages} 
    
    <a href=${currentPage + 1 <= totalPagesCount ? `?page=${currentPage + 1 < totalPagesCount ? currentPage + 1 : totalPagesCount}` : 'javascript:void[0]'} class="button warning page-btn"> > </a>
</div>
`;

const noRecordsTemplate = () => html`
<p class="no-books">Все още няма рецепти. Ако желаете да добавите първата, кликнете <a href="add-recipe">тук</a></p>
`;

const allRecordsTemplate = (recepies, currentPage, totalPagesCount, pages) => html`
<section id="dasahboard-page" class="dashboard">
    ${paginationTemplate(pages, currentPage, totalPagesCount)}
<ul class="other-books-list">
    ${recepies ? recepies : noRecordsTemplate()}
</ul>


</section>
`;

const singleRecordTemplate = (data) => html`
        <li class="otherBooks"><a href='/details/${data.objectId}'>
             <h3 style="color: #c28a44;">${data.name}</h3>
             <p class="img"><img src=${data.img}></p>
         </a></li>
`;

export async function viewAllPage(ctx) {
    ctx.render(loaderTemplate());
    const currentPage = Number(ctx.querystring.split('=')[1] || 1);

    let data = await getAll(currentPage);
    addUppercase(data);
    
    const singleRecords = data.results.map(singleRecordTemplate);
    
    const totalRecepies = await getRecepiesCount();
    const PAGE_SIZE = RECEPIES_PER_PAGE;
    const totalPagesCount = Math.ceil(totalRecepies.count / PAGE_SIZE);
    
    const pageData = [];
    
    for (let i = 1; i <= totalPagesCount; i++) {
        pageData.push(pageTemplate(i));
    }
    
    const allRecords = allRecordsTemplate(singleRecords, currentPage, totalPagesCount, pageData);
    ctx.render(allRecords);

    let criteria = 'МуС';

    const search = await searchByName(criteria.toLowerCase());
    console.log(search)

    let category = 'Десерти';

    const filter = await filterByCategory(category);
    console.log(filter);
}

export function addUppercase(arr) {
    arr.results.map(obj => obj.name = obj.name[0].toUpperCase() + obj.name.substring(1, obj.name.length));
}