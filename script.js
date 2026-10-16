const businesses = [
 {name:"Neighbourhood Kitchen",category:"Food",area:"Soweto",icon:"🍲",description:"Home-style meals and catering for everyday moments.",contact:"Sample listing · Contact not provided"},
 {name:"Fresh Cut Studio",category:"Beauty",area:"Tembisa",icon:"✂️",description:"A demo listing for haircuts and grooming services.",contact:"Sample listing · Contact not provided"},
 {name:"Fix-It Workshop",category:"Repairs",area:"Alexandra",icon:"🔧",description:"Illustrative listing for household repairs and maintenance.",contact:"Sample listing · Contact not provided"},
 {name:"Thread & Trend",category:"Fashion",area:"Johannesburg",icon:"👕",description:"A sample clothing and accessories business profile.",contact:"Sample listing · Contact not provided"},
 {name:"BrightStart Tutors",category:"Services",area:"Soweto",icon:"📚",description:"Illustrative educational support and tutoring service.",contact:"Sample listing · Contact not provided"},
 {name:"Sweet Treats Corner",category:"Food",area:"Tembisa",icon:"🧁",description:"A fictional bakery and celebration treats listing.",contact:"Sample listing · Contact not provided"},
 {name:"Glow Beauty Spot",category:"Beauty",area:"Johannesburg",icon:"💅🏽",description:"Demo profile for beauty and self-care services.",contact:"Sample listing · Contact not provided"},
 {name:"Quick Tech Help",category:"Repairs",area:"Alexandra",icon:"💻",description:"Fictional phone and computer support service.",contact:"Sample listing · Contact not provided"},
 {name:"Everyday Errands",category:"Services",area:"Tembisa",icon:"🛍️",description:"Sample listing for local assistance and errands.",contact:"Sample listing · Contact not provided"}
];
let activeCategory = "All";
const grid = document.getElementById("businessGrid");
const searchInput = document.getElementById("searchInput");
const areaFilter = document.getElementById("areaFilter");
const emptyState = document.getElementById("emptyState");
function renderBusinesses(){
 const query = searchInput.value.trim().toLowerCase();
 const area = areaFilter.value;
 const filtered = businesses.filter(b => (activeCategory==="All" || b.category===activeCategory) && (!area || b.area===area) && [b.name,b.category,b.area,b.description].join(" ").toLowerCase().includes(query));
 grid.innerHTML = filtered.map(b => `<article class="business-card"><div class="card-top"><div class="business-icon">${b.icon}</div><span class="category-label">${b.category}</span></div><h3>${escapeHTML(b.name)}</h3><p>${escapeHTML(b.description)}</p><div class="card-meta"><span>⌖ ${escapeHTML(b.area)}</span><span class="card-link">Demo profile ↗</span></div></article>`).join("");
 emptyState.hidden = filtered.length !== 0;
}
function escapeHTML(value){return String(value).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
document.querySelectorAll(".chip").forEach(button => button.addEventListener("click", () => {
 activeCategory = button.dataset.category;
 document.querySelectorAll(".chip").forEach(chip => chip.classList.toggle("active", chip===button));
 renderBusinesses();
}));
searchInput.addEventListener("input", renderBusinesses);
areaFilter.addEventListener("change", renderBusinesses);
document.getElementById("menuToggle").addEventListener("click", () => document.getElementById("nav").classList.toggle("open"));
document.querySelectorAll("#nav a").forEach(a => a.addEventListener("click",()=>document.getElementById("nav").classList.remove("open")));
document.getElementById("listingForm").addEventListener("submit", event => {
 event.preventDefault();
 const form = event.currentTarget;
 const data = new FormData(form);
 const message = document.getElementById("formMessage");
 if (!form.reportValidity()) return;
 const name = String(data.get("businessName")).trim();
 const description = String(data.get("description")).trim();
 if (name.length < 2 || description.length < 10) {
   message.className = "form-message error";
   message.textContent = "Please enter a business name of at least 2 characters and a description of at least 10 characters.";
   return;
 }
 message.className = "form-message success";
 message.textContent = `Thanks, ${name}! Your demo request passed validation. This prototype does not send or permanently save submissions; connect a backend to publish listings.`;
 form.reset();
});
renderBusinesses();