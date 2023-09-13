//도움말
const joImage = document.getElementById("imageLink");

joImage.addEventListener("click", function () {
  // 먼저 모달 컨테이너를 비웁니다.
  document.getElementById("modalContainer").innerHTML = "";

  // help_msg.html 콘텐츠를 로드하여 모달 컨테이너에 추가합니다.
  fetch("http://localhost:3001/help_msg/help_msg.html")
    .then(response => {
      if (!response.ok) {
        throw new Error("HTTP Error " + response.status);
      }
      return response.text();
    })
    .then(data => {
      // 모달 컨테이너에 help_msg.html 콘텐츠를 추가합니다.
      modalContainer.innerHTML = data;

      const modalBody = document.querySelector(".modal-body");
      modalBody.innerHTML = `
        <video autoplay controls style="width:100%;">
          <source src="./image/basicorder(1).mp4" type="video/mp4">
            관리자를 호출해주세요.
        </video>

        <section class="content_explain" style="height: 50%;">

             1. 원하시는 메뉴를 선택하시면 상세 메뉴창이 나타납니다. <br>
             => 제품 수량과 선택사항 수정이 가능합니다.<br>
             2. 카테고리를 이용하면 더욱 다양한 메뉴를 만날 수 있습니다.<br>
             3. 상품 검색을 이용해 특정 메뉴를 찾을 수 있습니다.<br>
             => 키워드를 이용한 검색도 가능합니다.<br>
             4. 상단의 버튼을 통해 다른 구조의 메뉴창을 만날 수 있습니다.

        </section>

        <video controls style="width:100%;">
        <source src="./image/basicorder(2).mp4" type="video/mp4">
            관리자를 호출해주세요.
        </video>

        <section class="content_explain"style="height: 50%;">

              1. 왼쪽의 '주문 확인'을 이용하시면 선택한 메뉴의 목록을 확인할 수 있습니다.<br>
              2. '최종 결제'를 이용하시면 주문 목록 확인 없이 결제로 넘어갈 수 있습니다.<br>
              &lt;현재 주문 목록 설명&gt;<br>
              3. 주문 내역이 따뜻한것이면 빨간색, 차가운거면 파란색, 온도 선택이 없으면 검은색으로 나타납니다.<br>
              4. 현재 주문 목록을 선택하면 메뉴 수정이 가능한 화면으로 이동합니다.<br>
              (각 선택에 이어지는 화면은 영상과 다를 수 있습니다.)

        </section>
        `;

      // help_msg.css 파일을 로드합니다.
      const linkElement = document.createElement("link");
      linkElement.rel = "stylesheet";
      linkElement.type = "text/css";
      linkElement.href = "http://localhost:3001/help_msg/help_msg.css";
      document.head.appendChild(linkElement);

      const modal = new bootstrap.Modal(document.getElementById("exampleModal"));
      modal.show();
    })
    .catch(error => {
      console.error("콘텐츠를 가져오는 중 오류가 발생했습니다:", error);
    });
});

//네비게이션
function select_page() {
  alert("현재 페이지 입니다.")
};

// 확인 페이지로 이동
function check_page() {
  const urlParams = new URLSearchParams(window.location.search);
  const orderType = urlParams.get('order');
  const pickup = urlParams.get('pickup');//09.08 수정

  if (orderType == 'slow') {
    location.href = `http://localhost:3001/last_checklist/checklist.html?order=slow&timer=${timer}&pickup=${pickup}`;
  } else if (orderType == 'basic') {
    location.href = `http://localhost:3001/last_checklist/checklist.html?order=basic&timer=${timer}&pickup=${pickup}`;
  }
};

// 결제 페이지로 이동
function pay_page() {
  const urlParams = new URLSearchParams(window.location.search);
  const orderType = urlParams.get('order');
  const pickup = urlParams.get('pickup');//09.08 수정

  if (orderType == 'slow') {
    // 천천히 주문하기 버튼을 클릭한 경우
    location.href = `http://localhost:3001/paymethod/paymethod.html?order=slow&timer=${timer}&pickup=${pickup}`;
  } else if (orderType == 'basic') {
    // 기본 주문하기 버튼을 클릭한 경우
    location.href = `http://localhost:3001/paymethod/paymethod.html?order=basic&timer=${timer}&pickup=${pickup}`;
  }
};

// 검색버튼

document.getElementById("search_div").addEventListener('click', search);

function search() {
  document.getElementById("modalContainer").innerHTML = "";

  // help_msg.css를 제거합니다.
  const help_msg_Link = document.querySelector('link[href="http://localhost:3001/help_msg/help_msg.css"]');
  if (help_msg_Link) {
    help_msg_Link.remove();
  }

  // detail_menu.css를 제거합니다.
  const detailMenuLink = document.querySelector('link[href="http://localhost:3001/detail_menu/detail_menu.css"]');
  if (detailMenuLink) {
    detailMenuLink.remove();
  }

  fetch("http://localhost:3001/search/search.html") // 이 부분의 파일 경로를 수정해야합니다.
    .then(response => {
      if (!response.ok) {
        throw new Error("HTTP Error " + response.status);
      }
      return response.text();
    })
    .then(data => {
      // 모달 컨테이너에 jojo.html 콘텐츠를 추가합니다.
      $("#modalContainer").html(data);

      // 외부 detail_menu 폴더에 있는 detail_menu.css 파일을 로드합니다.
      const linkElement = document.createElement("link");
      linkElement.rel = "stylesheet";
      linkElement.type = "text/css";
      linkElement.href = "http://localhost:3001/search/search.css"; // 이 부분의 파일 경로를 수정해야합니다.
      document.head.appendChild(linkElement);

      // 외부 detail_menu 폴더에 있는 detail_menu.js 파일을 로드합니다.
      const scriptElement = document.createElement("script");
      scriptElement.src = "http://localhost:3001/search/search.js"; // 이 부분의 파일 경로를 수정해야합니다.
      document.body.appendChild(scriptElement);


      const modal = new bootstrap.Modal(document.getElementById("exampleModal"));
      modal.show();
    })
    .catch(error => {
      console.error("콘텐츠를 가져오는 중 오류가 발생했습니다:", error);
    });
}

// 하단 고정 버튼(이전화면, 처음으로, 다음)
// 이전화면 클릭시
function prvsScren() {
  const urlParams = new URLSearchParams(window.location.search);
  const orderType = urlParams.get('order');
  const pickup = urlParams.get('pickup');//09.08 수정

  if (orderType == 'slow') {
    // 천천히 주문하기 버튼을 클릭한 경우
    location.href = `http://localhost:3001/selecteat/selecteat.html?order=slow&timer=${timer}&pickup=${pickup}`;
  } else if (orderType == 'basic') {
    // 기본 주문하기 버튼을 클릭한 경우
    location.href = `http://localhost:3001/selecteat/selecteat.html?order=basic&timer=${timer}&pickup=${pickup}`;
  }
};

// 처음으로
function firstScreen() {
  // 새로운 페이지로 이동
  window.location.href = "http://localhost:3001/selectorder/selectorder.html";
};

// 다음
function nextScreen() {
  // 새로운 페이지로 이동
  const urlParams = new URLSearchParams(window.location.search);
  const orderType = urlParams.get('order');
  const pickup = urlParams.get('pickup');//09.08 수정

  if (orderType == 'slow') {
    // 천천히 주문하기 버튼을 클릭한 경우
    location.href = `http://localhost:3001/last_checklist/checklist.html?order=slow&timer=${timer}&pickup=${pickup}`;
  } else if (orderType == 'basic') {
    // 기본 주문하기 버튼을 클릭한 경우
    location.href = `http://localhost:3001/last_checklist/checklist.html?order=basic&timer=${timer}&pickup=${pickup}`;
  }
};

/*슬라이드 버튼*/
const slider = document.querySelector(".slider");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let slideIndex = 0;

prevBtn.addEventListener("click", () => {
  slideIndex = Math.max(slideIndex - 1, 0);
  updateSliderPosition();
});

nextBtn.addEventListener("click", () => {
  slideIndex = Math.min(slideIndex + 1, slider.children.length - 1);
  updateSliderPosition();
});

function updateSliderPosition() {
  const slideWidth = slider.clientWidth;
  const offset = -slideWidth * slideIndex;
  slider.style.transform = `translateX(${offset}px)`;
}

//사이즈 이동
const radioButtons = document.getElementsByName('size');
radioButtons.forEach(button => {
  button.addEventListener('click', () => {
    // 선택된 라디오 버튼의 값에 따라 페이지 이동
    if (button.checked) {
      const urlParams = new URLSearchParams(window.location.search);
      const currentOrder = urlParams.get('order');
      const pickup = urlParams.get('pickup');//09.08 수정

      switch (button.value) {
        case 'big':
          if (currentOrder === 'slow') {
            window.location.href = `http://localhost:3001/BigFrame/BigOrder.html?order=slow&timer=${timer}&pickup=${pickup}`;
          } else if (currentOrder === 'basic') {
            window.location.href = `http://localhost:3001/BigFrame/BigOrder.html?order=basic&timer=${timer}&pickup=${pickup}`;
          }
          break;
        case 'basic':
          if (currentOrder === 'slow') {
            window.location.href = `http://localhost:3001/BasicFrame/BasicOrder.html?order=slow&timer=${timer}&pickup=${pickup}`;
          } else if (currentOrder === 'basic') {
            window.location.href = `http://localhost:3001/BasicFrame/BasicOrder.html?order=basic&timer=${timer}&pickup=${pickup}`;
          }
          break;
        default:
          break;
      }
    }
  });
});

//서버연동 08.14
document.addEventListener("DOMContentLoaded", function () {
  const sliderContainer = document.querySelector(".slider"); // slider 컨테이너

  const categoryLinks = document.querySelectorAll(".categories a");
  const categories = document.querySelectorAll('.category');

  const defaultCategory = "1";

  if (storeData && storeData.length > 0) {
    searchFunction(); // storeData에 데이터가 있을 경우 검색 결과 표시
  } else if (storeData !== null) {
    console.log("검색 결과 없음");
  } else {
    fetch(`/menu?category=${defaultCategory}`)
      .then(response => response.json())
      .then(menuData => {
        clearSliderContainer(sliderContainer); // 슬라이더 컨테이너 내용 지우기
        handleMenuData(menuData, sliderContainer); // 메뉴 데이터 추가
      });

  }

  categoryLinks.forEach(link => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const category = link.getAttribute("data-category");

      categories.forEach(c => c.classList.remove('select_category'));

      // 클릭한 카테고리에 select_category 클래스 추가
      link.parentNode.classList.add('select_category');

      fetch(`/menu?category=${category}`)
        .then(response => response.json())
        .then(menuData => {
          clearSliderContainer(sliderContainer); // 슬라이더 컨테이너 내용 지우기
          handleMenuData(menuData, sliderContainer); // 메뉴 데이터 추가

          slideIndex = 0;
          updateSliderPosition();
        });
    });
  });
});

function clearSliderContainer(sliderContainer) {
  sliderContainer.innerHTML = ''; // 슬라이더 컨테이너의 내용 지우기
}

function handleMenuData(menuData, sliderContainer) {
  const menuItemsPerSlide = 9; // 슬라이드당 메뉴 개수
  let currentSlide = document.createElement("div");
  currentSlide.className = "slide";
  let currentPage = 1; // 현재 페이지
  let totalPages = Math.ceil(menuData.length / menuItemsPerSlide); // 전체 페이지 수

  menuData.forEach((menu, index) => {
    if (index > 0 && index % menuItemsPerSlide === 0) {
      sliderContainer.appendChild(currentSlide);
      currentSlide = document.createElement("div");
      currentSlide.className = "slide";
      currentPage++; // 새로운 슬라이드가 시작되면 현재 페이지 증가
    }

    const menuHTML = `
      <div class="box list_content_box" id="list_click" data-menunum="${menu.menu_num}">
        <div class="box list_img_box">
          <img class="list_img_size" src=".${menu.image_path}" alt="${menu.menu_name}">
        </div>
        <div class="box list_content_info">
          <div class="container text-center">
            <div class="content_title">
              <div class="menu_name">${menu.menu_name}</div>
              <div class="menu_cost">${menu.price}원</div>
            </div>
          </div>
        </div>
      </div>
    `;

    currentSlide.innerHTML += menuHTML;
  });

  // 마지막에 남은 슬라이드 추가
  sliderContainer.appendChild(currentSlide);

  //페이지 표시 추가

  // const page_div = document.querySelector('.pages');
  // const page = document.createElement('div')
  // page.classList.add('page')
  // page.textContent=`${currentPage}/${totalPages} 페이지`;
  // page_div.appendChild(page);

  const selectBtn = document.querySelectorAll(".list_content_box");
  selectBtn.forEach(selectBtn => {
    const urlParams = new URLSearchParams(window.location.search);//09.08 수정
    const pickup = urlParams.get('pickup');//09.08 수정
    selectBtn.addEventListener("click", function (event) {
      console.log("버튼 눌림");
      const menuNum = this.getAttribute('data-menunum');
      console.log("주문번호:", menuNum);

      // 먼저 모달 컨테이너를 비웁니다.
      document.getElementById("modalContainer").innerHTML = "";

      // help_msg.css를 제거합니다.
      const detailMenuLink = document.querySelector('link[href="http://localhost:3001/help_msg/help_msg.css"]');
      if (detailMenuLink) {
        detailMenuLink.remove();
      }

      history.pushState(null, null, `http://localhost:3001/BasicFrame/BasicOrder.html?order=basic&timer=${timer}&pickup=${pickup}&menuId=${menuNum}`);
      // 외부 detail_menu 폴더에 있는 jojo.html 파일을 로드하여 모달 컨테이너에 추가합니다.
      fetch(`http://localhost:3001/detail_menu/jojo.html?timer=${timer}&pickup=${pickup}&menuId=${menuNum}`) // 이 부분의 파일 경로를 수정해야합니다.
        .then(response => {
          if (!response.ok) {
            throw new Error("HTTP Error " + response.status);
          }
          return response.text();
        })
        .then(data => {
          // 모달 컨테이너에 jojo.html 콘텐츠를 추가합니다.
          $("#modalContainer").html(data);

          // 외부 detail_menu 폴더에 있는 detail_menu.css 파일을 로드합니다.
          const linkElement = document.createElement("link");
          linkElement.rel = "stylesheet";
          linkElement.type = "text/css";
          linkElement.href = "http://localhost:3001/detail_menu/detail_menu.css"; // 이 부분의 파일 경로를 수정해야합니다.
          document.head.appendChild(linkElement);

          // 외부 detail_menu 폴더에 있는 detail_menu.js 파일을 로드합니다.
          const scriptElement = document.createElement("script");
          scriptElement.src = "http://localhost:3001/detail_menu/detail_menu.js"; // 이 부분의 파일 경로를 수정해야합니다.
          document.body.appendChild(scriptElement);

          const modal = new bootstrap.Modal(document.getElementById("exampleModal"));
          modal.show();
        })
        .catch(error => {
          console.error("콘텐츠를 가져오는 중 오류가 발생했습니다:", error);
        });
    });
  });
}

let storeData = JSON.parse(localStorage.getItem('mydata'));
let storeData_str = localStorage.getItem('mydata');

window.onload = searchFunction;

function searchFunction() {

  //검색하면 카테고리 표시 삭제
  const categories = document.querySelectorAll('.category');

  //bigOrder.html에 불러오는 코드 작성
  console.log("검색된 결과값", storeData);

  const resultContainer = document.querySelector('.slider');
  resultContainer.innerHTML = ''; //이전 결과 초기화
  const itemsPerPage = 9; // 각 슬라이드당 표시할 아이템 수
  // const res = document.querySelector('.list_content_box');

  if (storeData.length === 0) {
    console.log('결과 없음');
    resultContainer.innerHTML = '<p style="width:100%; font-size: 4vw; text-align: center; padding: 5vh;">검색 결과가 없습니다.<br>다시 검색해 주세요.</p>';
    localStorage.removeItem('mydata');
  } else {
    categories.forEach(c => c.classList.remove('select_category'));

    // storeData를 페이지 단위로 나누어 슬라이드 생성
    const numSlides = Math.ceil(storeData.length / itemsPerPage);

    for (let i = 0; i < numSlides; i++) {
      const div = document.createElement('div');
      div.className = "slide";
      const slideItems = storeData.slice(i * itemsPerPage, (i + 1) * itemsPerPage);

      slideItems.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = "list_content_box";
        itemDiv.setAttribute('id', 'list_click');
        itemDiv.setAttribute('data-menunum', item.menu_num);
        itemDiv.innerHTML = `
          <div class="list_img_box">
            <img class="list_img_size" src=".${item.Picture}" data-menunum="${item.Menu_Num}"/>
          </div>
          <div class="list_content_info">
            <div class="container text-center">
              <div class="content_title">
                <div class="menu_name">${item.Menu_Name}</div>
                <div class="menu_cost">${item.Price}원</div>
              </div>
            </div>
          </div>
        `;
        div.appendChild(itemDiv);
      });

      resultContainer.appendChild(div);
    }
  }
  localStorage.removeItem('mydata');

  // 선택 버튼(메뉴 선택)
  const selectBtn = document.querySelectorAll(".selectBtn");
  selectBtn.forEach(selectBtn => {
    const urlParams = new URLSearchParams(window.location.search);//09.08 수정
    const pickup = urlParams.get('pickup');//09.08 수정
    selectBtn.addEventListener("click", function (event) {
      console.log("버튼 눌림");
      const menuNum = event.target.dataset.menunum;//08.24 menu_num을 가져오기 위한
      console.log("주문번호:", menuNum);//08.24 menu_num을 가져오기 위한
      // 먼저 모달 컨테이너를 비웁니다.
      document.getElementById("modalContainer").innerHTML = "";

      // help_msg.css를 제거합니다.
      const detailMenuLink = document.querySelector('link[href="http://localhost:3001/help_msg/help_msg.css"]');
      if (detailMenuLink) {
        detailMenuLink.remove();
      }

      history.pushState(null, null, `http://localhost:3001/BasicFrame/BasicOrder.html?order=basic&timer=${timer}&pickup=${pickup}&menuId=${menuNum}`);

      // 외부 detail_menu 폴더에 있는 jojo.html 파일을 로드하여 모달 컨테이너에 추가합니다.
      fetch(`http://localhost:3001/detail_menu/jojo.html?timer=${timer}&pickup=${pickup}&menuId=${menuNum}`) // 이 부분의 파일 경로를 수정해야합니다.
        .then(response => {
          if (!response.ok) {
            throw new Error("HTTP Error " + response.status);
          }
          return response.text();
        })
        .then(data => {
          // 모달 컨테이너에 jojo.html 콘텐츠를 추가합니다.
          $("#modalContainer").html(data);

          // 외부 detail_menu 폴더에 있는 detail_menu.css 파일을 로드합니다.
          const linkElement = document.createElement("link");
          linkElement.rel = "stylesheet";
          linkElement.type = "text/css";
          linkElement.href = "http://localhost:3001/detail_menu/detail_menu.css"; // 이 부분의 파일 경로를 수정해야합니다.
          document.head.appendChild(linkElement);

          // 외부 detail_menu 폴더에 있는 detail_menu.js 파일을 로드합니다.
          const scriptElement = document.createElement("script");
          scriptElement.src = "http://localhost:3001/detail_menu/detail_menu.js"; // 이 부분의 파일 경로를 수정해야합니다.
          document.body.appendChild(scriptElement);

          const modal = new bootstrap.Modal(document.getElementById("exampleModal"));
          modal.show();
        })
        .catch(error => {
          console.error("콘텐츠를 가져오는 중 오류가 발생했습니다:", error);
        });
    });
  });

  //이미지 클릭시에도 detail호출
  const img_select = document.querySelectorAll(".list_img_box");
  img_select.forEach(img_select => {
    const urlParams = new URLSearchParams(window.location.search);//09.08 수정
    const pickup = urlParams.get('pickup');//09.08 수정
    img_select.addEventListener("click", function (event) {
      console.log("버튼 눌림");
      const menuNum = event.target.dataset.menunum;//08.24 menu_num을 가져오기 위한
      console.log("주문번호:", menuNum);//08.24 menu_num을 가져오기 위한
      // 먼저 모달 컨테이너를 비웁니다.
      document.getElementById("modalContainer").innerHTML = "";

      // help_msg.css를 제거합니다.
      const detailMenuLink = document.querySelector('link[href="http://localhost:3001/help_msg/help_msg.css"]');
      if (detailMenuLink) {
        detailMenuLink.remove();
      }

      history.pushState(null, null, `http://localhost:3001/BasicFrame/BasicOrder.html?order=basic&timer=${timer}&pickup=${pickup}&menuId=${menuNum}`);

      // 외부 detail_menu 폴더에 있는 jojo.html 파일을 로드하여 모달 컨테이너에 추가합니다.
      fetch(`http://localhost:3001/detail_menu/jojo.html?timer=${timer}&pickup=${pickup}&menuId=${menuNum}`) // 이 부분의 파일 경로를 수정해야합니다.
        .then(response => {
          if (!response.ok) {
            throw new Error("HTTP Error " + response.status);
          }
          return response.text();
        })
        .then(data => {
          // 모달 컨테이너에 jojo.html 콘텐츠를 추가합니다.
          $("#modalContainer").html(data);

          // 외부 detail_menu 폴더에 있는 detail_menu.css 파일을 로드합니다.
          const linkElement = document.createElement("link");
          linkElement.rel = "stylesheet";
          linkElement.type = "text/css";
          linkElement.href = "http://localhost:3001/detail_menu/detail_menu.css"; // 이 부분의 파일 경로를 수정해야합니다.
          document.head.appendChild(linkElement);

          // 외부 detail_menu 폴더에 있는 detail_menu.js 파일을 로드합니다.
          const scriptElement = document.createElement("script");
          scriptElement.src = "http://localhost:3001/detail_menu/detail_menu.js"; // 이 부분의 파일 경로를 수정해야합니다.
          document.body.appendChild(scriptElement);

          const modal = new bootstrap.Modal(document.getElementById("exampleModal"));
          modal.show();
        })
        .catch(error => {
          console.error("콘텐츠를 가져오는 중 오류가 발생했습니다:", error);
        });
    });
  });
};

// 검색 내용 input태그에 표시
const keywordValue = localStorage.getItem('searchInput');
if (keywordValue) {
  const searchInput = document.querySelector(".search");
  searchInput.value = keywordValue;
  localStorage.removeItem('searchInput'); // 사용한 값은 제거
}

//네이베이션 아래의 주문 목록
function generateOrderList(orderData) {
  const selectList = document.querySelector('.select_list_list');
  let pay_move = document.querySelector('.pay_move');

  if (orderData.length == 0) {
    selectList.innerHTML = `
    <div class = "none_select_menu">주문한게 없어요!</div>
    `
    // pay_move 버튼의 클릭 이벤트를 막음
    if (pay_move) {
      pay_move.onclick = function (event) {
        event.preventDefault(); // 클릭 이벤트를 막음
      };

      // 배경색 변경
      pay_move.style.color = "#6c757d";
      // pay_circle.style.border = "solid 3px #6c757d"
    }
  } else {
    orderData.forEach(order => {
      const selectListDetail = document.createElement('div');
      selectListDetail.classList.add('select_list_detail');

      const selectName = document.createElement('div');
      selectName.classList.add('select_name');
      selectName.textContent = order.menu_name;

      const move_box = document.createElement('div');
      move_box.classList.add('move_box')
      move_box.onclick = "move_cheklist()"

      const move_box_box = document.createElement('div');
      move_box_box.classList.add('.move_box_box');

      const del_btn = document.createElement('button');
      del_btn.classList.add('del_btn');
      del_btn.textContent = "삭제";

      del_btn.setAttribute('data-orderNum', order.order_num);

      //09.05수정
      if (order.op_t === 1) {
        selectName.style.color = 'red'; // op_t가 1일 때 빨간색
      } else if (order.op_t === 2) {
        selectName.style.color = 'blue'; // op_t가 2일 때 파란색
      } else if (order.op_t === 1000) {
        selectName.style.color = 'black';
      }

      const selectNum = document.createElement('div');
      selectNum.classList.add('select_num');
      selectNum.textContent = order.count + '개';

      move_box.appendChild(selectName);
      move_box.appendChild(selectNum);

      selectListDetail.appendChild(move_box);
      selectListDetail.appendChild(del_btn);

      selectList.appendChild(selectListDetail);

      const move_boies = document.querySelectorAll('.move_box');

      move_boies.forEach(move_boies => {
        move_boies.addEventListener('click', () => {
          const urlParams = new URLSearchParams(window.location.search);
          const pickup = urlParams.get('pickup')
          location.href = `http://localhost:3001/last_checklist/checklist.html?pickup=${pickup}&order=slow`
        })
      })
      
      // 삭제 버튼
      const deleteBtn = document.querySelectorAll(".del_btn");
      deleteBtn.forEach(deleteBtn => {
        deleteBtn.addEventListener("click", function () {
          console.log("삭제 버튼 눌림");
          // 클릭된 버튼의 data-orderNum 값을 가져옴
          const orderNum = this.getAttribute('data-orderNum');
          console.log("주문 번호:", orderNum);

          // 먼저 모달 컨테이너를 비웁니다.
          document.getElementById("modalContainer").innerHTML = "";

          // detail_menu.css를 제거합니다.
          const detailMenuLink = document.querySelector('link[href="http://localhost:3001/detail_menu/detail_menu.css"]');
          if (detailMenuLink) {
            detailMenuLink.remove();
          }

          // caution_msg.html 콘텐츠를 로드하여 모달 컨테이너에 추가합니다.
          fetch(`http://localhost:3001/messagebox/caution_msg.html?orderNum=${orderNum}`)
            .then(response => {
              if (!response.ok) {
                throw new Error("HTTP Error " + response.status);
              }
              return response.text();
            })
            .then(data => {
              // 모달 컨테이너에 caution_msg.html 콘텐츠를 추가합니다.
              $("#modalContainer").html(data);
              console.log("선택된 주문 번호 :", orderNum);
              // caution_msg.css 파일을 로드합니다.
              const linkElement = document.createElement("link");
              linkElement.rel = "stylesheet";
              linkElement.type = "text/css";
              linkElement.href = "http://localhost:3001/messagebox/caution_style.css";
              document.head.appendChild(linkElement);

              // 모달을 열기 위한 코드
              const modal = new bootstrap.Modal(document.getElementById("exampleModal"));
              modal.show();

              // 주문 확인 모달 내부의 버튼 이벤트 리스너 등을 여기서 추가하면 됩니다.
              const confirmButton = document.querySelector('.btn-primary');
              confirmButton.addEventListener("click", function () {
                console.log("확인 버튼 눌림");
                // "확인" 버튼이 클릭되면 orderNum 값을 사용하여 DELETE 요청을 보내는 코드 작성
                deleteOrder(orderNum);
              });

              const cancelButton = document.querySelector('.btn-secondary');
              cancelButton.addEventListener("click", function () {
                console.log("취소 버튼 눌림");
                // "취소" 버튼이 클릭되면 모달 닫기
                modal.hide();
              });
            })
            .catch(error => {
              console.error("콘텐츠를 가져오는 중 오류가 발생했습니다:", error);
            });
        });
      });
    });
    // pay_move 버튼 활성화 (옵션: 주문 목록이 비어 있지 않을 때 활성화)
    if (pay_move) {
      pay_move.disabled = false;
    }
  }
}

// 페이지 로드 시 주문 목록을 가져와서 생성
window.addEventListener('load', () => {
  fetch('/getOrderData')  // 서버의 getOrderData 라우트에 요청
    .then(response => response.json())
    .then(orderData => {
      generateOrderList(orderData);  // 주문 목록 생성 함수 호출
    })
    .catch(error => {
      console.error('Error fetching order data:', error);
    });
});

function move_checklist() {
  const urlParams = new URLSearchParams(window.location.search);
  const pickup = urlParams.get('pickup');//09.08 수정
  const order = urlParams.get('order');
  const timer = urlParams.get('timer')

  location.href = `http://localhost:3001/last_checklist/checklist.html?order=${order}&timer=${timer}&pickup=${pickup}`;
}