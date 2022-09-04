// header category design 
const loadCategory = () => {
    
    try {
        
        fetch(`https://openapi.programming-hero.com/api/news/categories`)
            .then(res => res.json())
            .then(data => displayCategory(data.data.news_category))
    }
    catch (error) {
        console.log(error);
    }
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


const newsLoadOnCategory = (id) => {00
    try {
        
        const url = `https://openapi.programming-hero.com/api/news/category/${id}`
        fetch(url)
            .then(res => res.json())
            .then(data => newsDisplayOnCategory(data.data))
    }
    catch (error) {
        console.log(error)
    }
}

const newsDisplayOnCategory = (showNewses) => {
    
    console.log(showNewses)
    const newsShowCategoryContainer = document.getElementById('news-show-category');
    loadingSpinner(true);
    newsShowCategoryContainer.innerHTML = '';
    for (const showNews of showNewses) {
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
        <div> 
            <p class="veiws"> Veiws : ${showNews.total_view ? showNews.total_view : 'No Views'} </p>
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
    loadingSpinner(false);
}

const loadingSpinner = isLoading => {
    const loaderSection = document.getElementById('loader')
    if(isLoading){
        loaderSection.classList.remove('d-none')
    }
    else{
        loaderSection.classList.add('d-none');
    }
}

const getNewsDetails = async id => {
    try {
        const url = `https://openapi.programming-hero.com/api/news/${id}`;
        const res = await fetch(url)
        const data = await res.json()
        displayNewsDetails(data.data)
    }
    catch (error) {
        console.log(error);
    }
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

}


// newsLoadOnCategory('08')