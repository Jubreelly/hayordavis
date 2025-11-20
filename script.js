// -----------------------------
// HayorDavis Stores - script.js
// -----------------------------

/* SAMPLE PRODUCT DATA
   Replace image paths with your images inside Assets/
   e.g. 'Assets/product-1.jpg'
*/
const shop1Products = [
  {id:1,title:'Large Laundry Bags',cat:'baskets',desc:'Durable plastic laundry basket.',img:'Assets/largeBasket.jpeg',price:7500,stock:99},
  {id:2,title:'Paper Bags',cat:'baskets',desc:'Small paper bags.',img:'Assets/paperbag2.jpeg',price:800,stock:99},
  {id:3,title:'Toiletries Pack',cat:'toiletries',desc:'Soap, sponge and essentials pack.',img:'Assets/Toiletrypack.jpeg',price:1500,stock:99},
  {id:4,title:'Plates & Utensils Rack',cat:'appliances',desc:'1L sample electric kettle.',img:'Assets/Plates utensils Rack.jpeg',price:8500,stock:99}
];

const shop2Products = [
  {id:11,title:'Men & Women Clothes',cat:'clothes',desc:'Stylish outfits for both genders.',img:'Assets/shirt.jpg',price:15000,stock:99},
  {id:12,title:'Fashion Handbag',cat:'bags',desc:'Daily use handbag.',img:'Assets/bags.jpeg',price:5500,stock:99},
  {id:13,title:'Gas Burners',cat:'appliances',desc:'Portable two-burner cooker.',img:'Assets/two-face burner.jpeg',price:23000,stock:99},
  {id:14,title:'Standing Fan',cat:'fans',desc:'Oscillating standing fan.',img:'Assets/fan4.jpg',price:25000,stock:99}
];

// Render helpers
function createProductCard(p){
  const el = document.createElement('div'); el.className='product';
  el.innerHTML = `
    <div class="thumb">
      <img src="${p.img}" alt="${p.title}" onerror="this.style.display='none'"/>
      
    </div>
    <h4>${p.title}</h4>
    <div class="small muted">Category: ${p.cat}</div>
    <div class="actions">
      <div class="price">₦${p.price}</div>
      <button class="btn" data-id="${p.id}" data-src="${encodeURIComponent(JSON.stringify(p))}">View</button>
    </div>
  `;
  return el;
}

function renderGrid(products, containerId){
  const grid = document.getElementById(containerId);
  grid.innerHTML = '';
  products.forEach(p => grid.appendChild(createProductCard(p)));
}

// initial render
renderGrid(shop1Products,'grid1');
renderGrid(shop2Products,'grid2');

// Filters & search
function applyFilter(products, searchId, catId, containerId){
  const q = document.getElementById(searchId).value.toLowerCase();
  const cat = document.getElementById(catId).value;
  const filtered = products.filter(p=>{
    const matchesQ = p.title.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q);
    const matchesCat = cat==='all' ? true : p.cat===cat;
    return matchesQ && matchesCat;
  });
  renderGrid(filtered, containerId);
}

document.getElementById('search1').addEventListener('input', ()=>applyFilter(shop1Products,'search1','cat1','grid1'));
document.getElementById('cat1').addEventListener('change', ()=>applyFilter(shop1Products,'search1','cat1','grid1'));
document.getElementById('search2').addEventListener('input', ()=>applyFilter(shop2Products,'search2','cat2','grid2'));
document.getElementById('cat2').addEventListener('change', ()=>applyFilter(shop2Products,'search2','cat2','grid2'));

// Modal logic
const modal = document.getElementById('modal');
function openModal(prod){
  document.getElementById('modalTitle').innerText = prod.title;
  document.getElementById('modalCategory').innerText = 'Category: ' + prod.cat;
  document.getElementById('modalDesc').innerText = prod.desc;
  document.getElementById('modalPrice').innerText = prod.price;
  document.getElementById('modalStock').innerText = prod.stock;
  document.getElementById('qty').value = 1;
  // set image
  const imgWrap = document.getElementById('modalImg');
  imgWrap.innerHTML = `<img src="${prod.img}" alt="${prod.title}" onerror="this.style.display='none'">`;
  // whatsapp link
  const wa = document.getElementById('waBtn');
  wa.href = `https://wa.me/2347036679275?text=${encodeURIComponent('Hello, I am interested in: '+prod.title+' (Qty: 1). Is it available?')}`;
  modal.classList.add('show'); modal.setAttribute('aria-hidden','false');
}

document.body.addEventListener('click', (e)=>{
  if(e.target.matches('.product .btn')){
    const pData = decodeURIComponent(e.target.getAttribute('data-src'));
    const p = JSON.parse(pData);
    openModal(p);
  }
});

document.getElementById('closeModal').addEventListener('click', closeModal);
modal.addEventListener('click', (e)=> { if(e.target === modal) closeModal(); });
document.addEventListener('keydown', e=> { if(e.key === 'Escape') closeModal(); });

function closeModal(){
  modal.classList.remove('show'); modal.setAttribute('aria-hidden','true');
}

// Contact form (localStorage)
document.getElementById('contactForm').addEventListener('submit', function(ev){
  ev.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const msg = document.getElementById('message').value.trim();
  if(!name || !email || !msg){ document.getElementById('formStatus').innerText = 'Please complete all fields.'; return; }
  const messages = JSON.parse(localStorage.getItem('hd_messages')||'[]');
  messages.push({name,email,msg,when:new Date().toISOString()});
  localStorage.setItem('hd_messages',JSON.stringify(messages));
  document.getElementById('formStatus').innerText = 'Message saved locally. We will contact you soon.';
  this.reset();
  setTimeout(()=>document.getElementById('formStatus').innerText = '', 3000);
});




