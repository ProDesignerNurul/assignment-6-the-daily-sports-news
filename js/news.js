// header category design 
const loadCategory = () => {
    fetch(`https://openapi.programming-hero.com/api/news/categories`)
    .then(res => res.json())
    .then(data => displayCategory(data.data.news_category))
}

const displayCategory = categories => {
    const categoryContainer = document.getElementById('category-container');
    for ( const category of categories){
        const li = document.createElement('li');
        li.classList.add('nav-item');
        li.innerHTML = `
            
            <li class="nav-item">
                <a class="nav-link" href="#">${category.category_name}</a>
            </li>
        `;
        categoryContainer.appendChild(li);
    }
}

loadCategory()



// news loader design 
const newsLoader = async () => {
    // const url `https://openapi.programming-hero.com/api/news/category/01`;
    const res = await fetch('https://openapi.programming-hero.com/api/news/category/01');
    const data = await res.json();
    displayNews(data.data);
}

const displayNews = newses => {
    const newsContainer = document.getElementById('news-container');
    for(const news of newses){
        console.log(news)
        const newsDiv = document.createElement('div');
        newsDiv.classList.add('col');
        newsDiv.innerHTML = `
        <div class="card">
        <img src="${news.thumbnail_url}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${news.title}</h5>
          <div class="d-flex justify-content-between">
          <div class="author">
          <img class="author-img" src="${news.author.img}">
          <div>
          <p class="author-name">${news.author.name}</p>
          <p >${news.author.published_date}</p>
          </div>
            </div>
            </div>
          <div class="d-flex m-2">
          <h5 class="ms-3"> ${news.rating.badge} </h5>
          <h5> ${news.rating.number}</h5>
          </div>
        </div>
      </div>
        `;
        newsContainer.appendChild(newsDiv);
    }
}
newsLoader()