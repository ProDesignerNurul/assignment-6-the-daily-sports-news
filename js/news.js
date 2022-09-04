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
          <p>${showNews.details.slice(0, 150)} ...</p>
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
        <button onclick="getNewsDetails('${showNews._id}')" class="arroy-btn" data-bs-toggle="modal" data-bs-target="#exampleModal">>></button>
      </div>
      </div>
    </div>
  </div>
    `;
    newsShowCategoryContainer.appendChild(showNewsDiv);
    }
}

const getNewsDetails = async id => {
    const url = `https://openapi.programming-hero.com/api/news/${id}`;
    const res = await fetch(url)
    const data = await res.json()
    displayNewsDetails(data.data)
}

const displayNewsDetails = (newsDetailses) => {
    console.log(newsDetailses)
    const newsDetailsHeader = document.getElementById('modal-title');
    console.log(newsDetailsHeader)
        newsDetailsHeader.innerHTML = `
            <div> 
            <img src="${newsDetailses[0].thumbnail_url}"
            </div>
            <div>
            <h5 class="modal-title" id="exampleModalLabel"> ${newsDetailses[0].title} </h5>
            <p> ${newsDetailses[0].details.slice(0, 200)} ... </p>

            </div>
            <div> 
                <p class="fw-bold"> ${newsDetailses[0].author.name} </p>
                <p> ${newsDetailses[0].author.published_date} </p>
            </div>
        `;
        

  //   const newsDetailsContainer = document.getElementById('news-details-container');
  //   for(const newsDetails of newsDetailses){
  //       const newsDetailsDiv = document.createElement('div')
  //       newsDetailsDiv.innerHTML = `
  //   <div class="modal-dialog">
  //   <div class="modal-content">
  //     <div class="modal-header">
  //       <h5 class="modal-title" id="exampleModalLabel">'${newsDetails.title}'</h5>
  //       <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
  //     </div>
  //     <div class="modal-body">
  //       ...
  //     </div>
  //     <div class="modal-footer">
  //       <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
  //     </div>
  //   </div>
  // </div>
  //   `;
  //   newsDetailsContainer.appendChild(newsDetailsDiv)
  //   }
}

// getNewsDetails('0282e0e58a5c404fbd15261f11c2ab6a')

// news loader design 
// const newsLoader = async (category_id) => {
//     // const url `https://openapi.programming-hero.com/api/news/category/01`;
//     const res = await fetch(`https://openapi.programming-hero.com/api/news/category/${category_id}`);
//     const data = await res.json();
//     displayNews(data.data);
// }

// const displayNews = newses => {
//     const newsContainer = document.getElementById('news-container');
//     for (const news of newses) {
//         console.log(news)
//         const newsDiv = document.createElement('div');
//         newsDiv.classList.add('col');
//         newsDiv.innerHTML = `
//         <div class="card">
//   <img src="${news.thumbnail_url}" class="card-img-top" alt="...">
//   <div class="card-body">
//         <h5 class="card-title">${news.title}</h5>
//         <p> ${news.details.slice(0, 200)}</p>
//     <div class="d-flex justify-content-between">
//     <div class="author">
//         <img class="author-img" src="${news.author.img}">
//     <div>
//         <p class="author-name">${news.author.name ? news.author.name : 'Author Name Not Found'}</p>
//         <p >${news.author.published_date ? news.author.published_date : 'Publish Date Not Found'}</p>
//     </div>
//       </div>
//     <div class="d-flex rating">
//         <h5 class="pe-3"> ${news.rating.badge ? news.rating.badge : 'Rating Not Found'} </h5>
//         <h5> ${news.rating.number ? news.rating.number : 'Rating Number Not Found'}</h5>
//     </div>
//     <div>
//       <button onclick="getNewsDetails(${news.data})" class="arroy-btn"> Click </button>
//     </div>
//     </div>
//   </div>
// </div>
//         `;
//         newsContainer.appendChild(newsDiv);
//     }
// }



// newsLoader('07')