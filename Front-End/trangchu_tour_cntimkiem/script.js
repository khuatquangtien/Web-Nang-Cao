// DATA GIẢ (KHÔNG API)
const tours = [
  {
    id: 1,
    name: "Tour Đà Nẵng 3N2Đ",
    price: "3.500.000đ",
    date: "20/03/2026",
    desc: "Khám phá Bà Nà Hills, Cầu Vàng, biển Mỹ Khê.",
    img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
  },
  {
    id: 2,
    name: "Tour Phú Quốc 4N3Đ",
    price: "5.200.000đ",
    date: "25/03/2026",
    desc: "Thiên đường biển đảo, lặn ngắm san hô.",
    img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
  },
  {
    id: 3,
    name: "Tour Đà Lạt 3N2Đ",
    price: "2.800.000đ",
    date: "28/03/2026",
    desc: "Thành phố ngàn hoa, khí hậu mát mẻ.",
    img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470"
  }
];

const tourList = document.getElementById("tourList");
const searchInput = document.getElementById("searchInput");

function renderTours(list) {
  tourList.innerHTML = "";
  list.forEach(tour => {
    tourList.innerHTML += `
      <div class="tour-card" onclick="showDetail(${tour.id})">
        <img src="${tour.img}">
        <div class="tour-info">
          <h3>${tour.name}</h3>
          <p class="price">${tour.price}</p>
        </div>
      </div>
    `;
  });
}

// SEARCH
searchInput.addEventListener("input", () => {
  const keyword = searchInput.value.toLowerCase();
  const filtered = tours.filter(t =>
    t.name.toLowerCase().includes(keyword)
  );
  renderTours(filtered);
});

// DETAIL
function showDetail(id) {
  const tour = tours.find(t => t.id === id);
  document.getElementById("home").classList.add("hidden");
  document.getElementById("detail").classList.remove("hidden");

  document.getElementById("detailContent").innerHTML = `
    <div class="detail-box">
      <img src="${tour.img}">
      <h2>${tour.name}</h2>
      <p><b>Giá:</b> ${tour.price}</p>
      <p><b>Ngày khởi hành:</b> ${tour.date}</p>
      <p>${tour.desc}</p>
      <button class="book-btn">Đặt ngay</button>
    </div>
  `;
}

function goHome() {
  document.getElementById("detail").classList.add("hidden");
  document.getElementById("home").classList.remove("hidden");
}

// INIT
renderTours(tours);
