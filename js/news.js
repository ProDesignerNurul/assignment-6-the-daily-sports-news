// header category design 
const loadCategory = () => {
    fetch(`https://openapi.programming-hero.com/api/news/categories`)
        .then(res => res.json())
        .then(data => displayCategory(data.data.news_category))
}

const displayCategory = categories => {
    const categoryContainer = document.getElementById('category-container');
    // categoryContainer.innerHTML = '';
    for (const category of categories) {
        const li = document.createElement('li');
        li.classList.add('nav-item');
        li.innerHTML = `
            
            <li class="nav-item">
                <a onclick="newsLoadOnCategory('${category.category_id}')" class="nav-link" href="#">${category.category_name}</a>
            </li>
        `;
        categoryContainer.appendChild(li);
    }
}

loadCategory()


const newsLoadOnCategory = (id) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`
    fetch(url)
    .then(res => res.json())
    .then(data => newsDisplayOnCategory(data.data))
}

const newsDisplayOnCategory = (showNewses) => {
    console.log(showNewses)
    const newsShowCategoryContainer = document.getElementById('news-show-category');
    newsShowCategoryContainer.innerHTML = '';
    for(const showNews of showNewses){
    const showNewsDiv = document.createElement('div');
    showNewsDiv.classList.add('col');
    showNewsDiv.innerHTML = `
    <div class="card">
    <img src="${showNews.thumbnail_url}" class="card-img-top" alt="...">
    <div class="card-body">
          <h5 class="card-title">${showNews.title}</h5>
          <p> ${showNews.details.slice(0, 150)}</p>
      <div class="d-flex justify-content-between">
      <div class="author">
          <img class="author-img" src="${showNews.author.img ? showNews.author.img : 'Author Image Not Found'}">
      <div>
          <p class="author-name">${showNews.author.name ? showNews.author.name : 'Name not found'}</p>
          <p >${showNews.author.published_date ? showNews.author.published_date : 'Publish Date Not Found'}</p>
      </div>
        </div>
      <div class="d-flex rating">
          <h5 class="pe-3"> ${showNews.rating.badge ? showNews.rating.badge : 'Rating not found'} </h5>
          <h5> ${showNews.rating.number ? showNews.rating.number : 'Rating Number not found'}</h5>
      </div>
      <div>
        <button class="arroy-btn">>></button>
      </div>
      </div>
    </div>
  </div>
    `;
    newsShowCategoryContainer.appendChild(showNewsDiv);
    }
}

// news loader design 
const newsLoader = async (category_id) => {
    // const url `https://openapi.programming-hero.com/api/news/category/01`;
    const res = await fetch(`https://openapi.programming-hero.com/api/news/category/${category_id}`);
    const data = await res.json();
    displayNews(data.data);
}

const displayNews = newses => {
    const newsContainer = document.getElementById('news-container');
    for (const news of newses) {
        console.log(news)
        const newsDiv = document.createElement('div');
        newsDiv.classList.add('col');
        newsDiv.innerHTML = `
        <div class="card">
  <img src="${news.thumbnail_url}" class="card-img-top" alt="...">
  <div class="card-body">
        <h5 class="card-title">${news.title}</h5>
        <p> ${news.details.slice(0, 200)}</p>
    <div class="d-flex justify-content-between">
    <div class="author">
        <img class="author-img" src="${news.author.img}">
    <div>
        <p class="author-name">${news.author.name}</p>
        <p >${news.author.published_date}</p>
    </div>
      </div>
    <div class="d-flex rating">
        <h5 class="pe-3"> ${news.rating.badge} </h5>
        <h5> ${news.rating.number}</h5>
    </div>
    <div>
      <button class="arroy-btn">>></button>
    </div>
    </div>
  </div>
</div>
        `;
        newsContainer.appendChild(newsDiv);
    }
}
// newsLoader('07')