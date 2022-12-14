
// ===============================
// Tabs section
// ===============================


import getUserDataById, { isLoggedIn } from './UserFunctions.js';
import { Comment,addComment, getProduct } from './comment.js';




//=======================
// Tabs change on click
//=======================

const tabs = document.getElementById('tabs');
const tab = document.getElementById('tab');

const description = document.getElementById('desc');
const info = document.getElementById('info');
const reviews = document.getElementById('reviews');

tabs.addEventListener('click', (e) => {
    if (e.target.classList.contains('tabs_desc')) {
        for (const btn of tabs.children) {
            btn.classList.remove('active');
        }
        for (const btn of tab.children) {
            btn.classList.add('d-none');
        }
        description.classList.remove('d-none');
        e.target.classList.add('active');
    }
    if (e.target.classList.contains('tabs_info')) {
        for (const btn of tabs.children) {
            btn.classList.remove('active');
        }
        for (const btn of tab.children) {
            btn.classList.add('d-none');
        }
        info.classList.remove('d-none');
        e.target.classList.add('active');
    }
    if (e.target.classList.contains('tabs_reviews')) {
        for (const btn of tabs.children) {
            btn.classList.remove('active');
        }
        for (const btn of tab.children) {
            btn.classList.add('d-none');
        }
        reviews.classList.remove('d-none');
        e.target.classList.add('active');
    }
});


//=======================
// Fill product details
//=======================
const productId = localStorage.getItem('wantedItem');
const product = getProduct(productId);
//=========================


document.getElementById('mainImg').setAttribute('src', product.url);
document.getElementById('productName').textContent = product.name;
document.getElementById('productPrice').textContent = product.price;
document.getElementById('productDesc').textContent = product.desc;
document.getElementById('product-categories').textContent = product.category.join(', ');
document.getElementById('product-tags').textContent = product.category.join(', ');
document.getElementById('tab_desc_body').textContent = product.desc;
document.getElementById('reviewCounts').textContent = product.reviews.length;

// Displaying Rewiews
product.reviews.map(comment => {
    let user = getUserDataById(comment.userId);

    let html = `  <div class="tab_reviews_review">
<div class="tab_reviews_review_reviewerProfile">
  <img src="${user.photo}" alt="${user.userName}" />
</div>
<div class="review">
  <p class="review_username">
    ${user.username} <span class="review_date">${comment.date}</span>
  </p>
  <p class="review_content">
   ${comment.comment}
  </p>
</div>
</div>`;
    reviews.insertAdjacentHTML('beforeend', html);
});



//================================
// check if Logged in, add post section
//================================

if (isLoggedIn()) {

    let userPhoto = localStorage.getItem('photo');
    let userName = localStorage.getItem('currentUserName');


    reviews.innerHTML +=
        `<div  class="create-review">

    <div class="create-review_reviewerProfile">
      <img  src="${userPhoto}" alt="" />
    </div>
    <div class="create-review_inputWrap">
      <input id="commentInput" type="text" class="create-review_inputWrap_input" placeholder="Comment as ${userName}">
      <button id='create-review' class="create-review_inputWrap_postBtn">Post <i class="las la-paper-plane"></i></button>
    </div>
    
  </div>`;

    //================================
    // post a comment
    //================================

    const postBtn = document.getElementById('create-review');
    const commentInput = document.getElementById('commentInput');

    postBtn.addEventListener('click', () => {
        if (commentInput.value.length > 0)
           addComment(productId, commentInput.value);
        commentInput.value = '';
        document.getElementById('reviewCounts').textContent = product.reviews.length;
        setTimeout(() => {
            window.location.reload();
        }, 0);

    });

}




//================================
// change main Image by clicking small Photos
//================================

const smPhotos = document.getElementsByClassName('smPhoto');
const mainPhoto = document.getElementById('mainImg');
for (const smPhoto of smPhotos) {
    smPhoto.addEventListener('click',()=>{
        let src = smPhoto.getAttribute('src');
        mainPhoto.setAttribute('src', src)
    })
}


//==============================
// ADDING TO CART
//===========================

let btn =document.getElementById('addToCart');
let timesInput = document.getElementById('times');


btn.addEventListener('click',()=>{
let times = parseInt(timesInput.value);
   
let wantedId = localStorage.getItem("wantedItem");
let products = JSON.parse(localStorage.getItem('products'));

for (let i = 0; i < times ; i++) {
         products.forEach(e => {
             if (e.id == wantedId) {
    
            let OldCart = JSON.parse(localStorage.getItem('myCart'));
            let NewCart = OldCart;
            let ExtraCart = [];
            let hasItem = false;
            if (OldCart.length > 0) {

                NewCart = OldCart.map((item) => {
                    if (item.id == wantedId  && item.count > 0) {
                        item.cartCount++;
                        item.count--;
                        hasItem = true;
                    }
                    return item;
                })
                if (!hasItem) {
                    ExtraCart.push(e);
                }
            }
            else {
                NewCart.push(e);
            }
            NewCart = NewCart.concat(ExtraCart);
            localStorage.setItem('myCart', JSON.stringify(NewCart));
          total();
        }
    });
    }

   
})


