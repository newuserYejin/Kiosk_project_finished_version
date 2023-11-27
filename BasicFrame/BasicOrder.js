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
      <div class="help_button">
        <button class="help_msg_btn_check" onclick="open_help('basicorder_1',this)">주문</button>
        <button onclick="open_help('basicorder_2',this)">검색</button>
        <button onclick="open_help('basicorder_3',this)">네비게이션</button>
      </div>

      <video autoplay controls style="width:100%; margin-bottom:0;">
        <source src="../help_video/basicorder(1).mp4" type="video/mp4">
        관리자를 호출해주세요.
      </video>

      <section class="content_explain" style="height: 50%;">

      <br>
      1. 카테고리를 선택 후, 메뉴를 선택해주세요.<br>
      2. 상세 메뉴 화면에서 개수, 온도, 크기, 추가 사항을 선택하고 '담기'를 눌러주세요.<br>
      3. 온도를 '뜨거움'으로 선택했기에 '빨간 글씨'로 추가되는 것을 확인할 수 있습니다.<br>
      => (차가움을 선택했으면 파란색으로, 디저트는 검은색으로 추가됩니다.)<br>
      4. 주문 목록에서 '포장', '매장'을 변경할 수 있습니다.<br>
      5. 주문 목록에서 'x'를 누르시면 메뉴를 삭제할 수 있습니다.<br>
      6. '옵션변경'을 누르시면 개수, 온도, 크기, 추가 사항을 변경할 수 있습니다.<br>
      7. '결제하기'를 누르시면 결제 방법 선택화면으로 이동합니다.<br>
      </section>
      `;

      // help_msg.css 파일을 로드합니다.
      const linkElement = document.createElement("link");
      linkElement.rel = "stylesheet";
      linkElement.type = "text/css";
      linkElement.href = "http://localhost:3001/help_msg/help_msg.css";
      document.head.appendChild(linkElement);

      // 외부 js 파일을 로드합니다.
      const scriptElement = document.createElement("script");
      scriptElement.src = "http://localhost:3001/help_msg/help_msg.js"; // 이 부분의 파일 경로를 수정해야합니다.
      document.body.appendChild(scriptElement);

      const modal = new bootstrap.Modal(document.getElementById("exampleModal"));
      modal.show();
    })
    .catch(error => {
      console.error("콘텐츠를 가져오는 중 오류가 발생했습니다:", error);
    });
});

// 확인 페이지로 이동
function check_page() {
  const urlParams = new URLSearchParams(window.location.search);
  const orderType = urlParams.get('order');
  const pickup = urlParams.get('pickup');//09.08 수정
  const timer = urlParams.get('timer');//10.17 추가
  localStorage.removeItem('selectedCategory');//10.20 카테고리 임시저장소 초기화

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
  const timer = urlParams.get('timer');//10.17 추가
  localStorage.removeItem('selectedCategory');//10.20 카테고리 임시저장소 초기화

  if (orderType == 'slow') {
    // 천천히 주문하기 버튼을 클릭한 경우
    location.href = `http://localhost:3001/paymethod/paymethod.html?order=slow&timer=${timer}&pickup=${pickup}`;
  } else if (orderType == 'basic') {
    // 기본 주문하기 버튼을 클릭한 경우
    location.href = `http://localhost:3001/paymethod/paymethod.html?order=basic&timer=${timer}&pickup=${pickup}`;
  }
};

//전체 취소 버튼
const all_delete = document.querySelectorAll('.all_delete');//10.16전체삭제 추가 시작
all_delete.forEach(AdeleteBtn => {
  AdeleteBtn.addEventListener("click", function () {
    console.log("전체 삭제 버튼 눌림");
    // 클릭된 버튼의 data-orderNum 값을 가져옴
    const orderNum = this.getAttribute('data-orderNum');

    // 먼저 모달 컨테이너를 비웁니다.
    document.getElementById("modalContainer").innerHTML = "";

    // detail_menu.css를 제거합니다.
    const detailMenuLink = document.querySelector('link[href="http://localhost:3001/detail_menu/detail_menu.css"]');
    if (detailMenuLink) {
      detailMenuLink.remove();
    }

    fetch(`http://localhost:3001/all_delete_msg/all_delete_msg.html`)//전체 취소 관련 html로 변경 바람
      .then(response => {
        if (!response.ok) {
          throw new Error("HTTP Error " + response.status);
        }
        return response.text();
      })
      .then(data => {
        // 모달 컨테이너에 caution_msg.html 콘텐츠를 추가합니다.
        $("#modalContainer").html(data);
        // 모달을 열기 위한 코드
        const modal = new bootstrap.Modal(document.getElementById("exampleModal"));
        modal.show();

        // css 파일을 로드합니다.
        const linkElement = document.createElement("link");
        linkElement.rel = "stylesheet";
        linkElement.type = "text/css";
        linkElement.href = "http://localhost:3001/payment_msg/payment_msg.css"; // 이 부분의 파일 경로를 수정해야합니다.
        document.head.appendChild(linkElement);

        // 주문 확인 모달 내부의 버튼 이벤트 리스너 등을 여기서 추가하면 됩니다.
        const confirmButton = document.querySelector('.yesButton');
        confirmButton.addEventListener("click", function () {
          console.log("확인 버튼 눌림");
          // "확인" 버튼이 클릭되면 orderNum 값을 사용하여 DELETE 요청을 보내는 코드 작성
          AllDelete();
        });

        const cancelButton = document.querySelector('.cancleButton');
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
  const timer = urlParams.get('timer');//10.17 추가
  localStorage.removeItem('selectedCategory');//10.20 카테고리 임시저장소 초기화

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

  // 먼저 모달 컨테이너를 비웁니다.
  document.getElementById("modalContainer").innerHTML = "";

  // detail_menu.css를 제거합니다.
  const detailMenuLink = document.querySelector('link[href="http://localhost:3001/detail_menu/detail_menu.css"]');
  if (detailMenuLink) {
    detailMenuLink.remove();
  }

  fetch(`http://localhost:3001/all_delete_msg/all_delete_msg.html`)//전체 취소 관련 html로 변경 바람
    .then(response => {
      if (!response.ok) {
        throw new Error("HTTP Error " + response.status);
      }
      return response.text();
    })
    .then(data => {
      // 모달 컨테이너에 caution_msg.html 콘텐츠를 추가합니다.
      // $("#modalContainer").html(data);
      modalContainer.innerHTML = data;

      const modalBody = document.querySelector(".modal-body");
      modalBody.innerHTML = `
      <p>처음으로 돌아가면 모든 주문내역이 사라집니다.</p>
      <p>그렇게 하시겠습니까?</p>
      `

      // css 파일을 로드합니다.
      const linkElement = document.createElement("link");
      linkElement.rel = "stylesheet";
      linkElement.type = "text/css";
      linkElement.href = "http://localhost:3001/payment_msg/payment_msg.css"; // 이 부분의 파일 경로를 수정해야합니다.
      document.head.appendChild(linkElement);

      
      // 모달을 열기 위한 코드
      const modal = new bootstrap.Modal(document.getElementById("exampleModal"));
      modal.show();

      // 주문 확인 모달 내부의 버튼 이벤트 리스너 등을 여기서 추가하면 됩니다.
      const confirmButton = document.querySelector('.yesButton');
      confirmButton.addEventListener("click", function () {
        console.log("확인 버튼 눌림");
        // "확인" 버튼이 클릭되면 orderNum 값을 사용하여 DELETE 요청을 보내는 코드 작성

        // 새로운 페이지로 이동
        window.location.href = "http://localhost:3001/selectorder/selectorder.html";
        localStorage.removeItem('selectedCategory');//10.15 임시저장소 초기화
      });

      const cancelButton = document.querySelector('.cancleButton');
      cancelButton.addEventListener("click", function () {
        console.log("취소 버튼 눌림");
        // "취소" 버튼이 클릭되면 모달 닫기
        modal.hide();
      });
    })
    .catch(error => {
      console.error("콘텐츠를 가져오는 중 오류가 발생했습니다:", error);
    });
};

// 다음
function nextScreen() {
  // 새로운 페이지로 이동
  const urlParams = new URLSearchParams(window.location.search);
  const orderType = urlParams.get('order');
  const pickup = urlParams.get('pickup');//09.08 수정
  const timer = urlParams.get('timer');//10.17 추가
  localStorage.removeItem('selectedCategory');//10.20 카테고리 임시저장소 초기화

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

  prevBtn.style.display = "none";
  nextBtn.style.display = "block";
});

nextBtn.addEventListener("click", () => {
  slideIndex = Math.min(slideIndex + 1, slider.children.length - 1);
  updateSliderPosition();

  prevBtn.style.display = "block";
  nextBtn.style.display = "none";
});

function updateSliderPosition() {
  const slideWidth = slider.clientWidth;
  const offset = -slideWidth * slideIndex;
  slider.style.transform = `translateX(${offset}px)`;
}

//사이즈 이동
const sizeButtons = document.querySelectorAll('.size_switch');

sizeButtons.forEach(button => {
  button.addEventListener('click', () => {
    // 선택된 버튼의 값을 가져옴
    const selectedValue = button.getAttribute('data-value');
    const urlParams = new URLSearchParams(window.location.search);
    const currentOrder = urlParams.get('order');
    const pickup = urlParams.get('pickup');//09.08 수정
    const timer = urlParams.get('timer');//10.17 추가

    switch (selectedValue) {
      case 'big':
        if (currentOrder === 'slow') {
          window.location.href = `http://localhost:3001/BigFrame/BigOrder.html?order=slow&timer=${timer}&pickup=${pickup}`;
        } else if (currentOrder === 'basic') {
          window.location.href = `http://localhost:3001/BigFrame/BigOrder.html?order=basic&timer=${timer}&pickup=${pickup}`;
        }
        break;
      default:
        break;
    }
  });
});

//서버연동 08.14
document.addEventListener("DOMContentLoaded", function () {
  const sliderContainer = document.querySelector(".slider"); // slider 컨테이너

  const categoryLinks = document.querySelectorAll(".categories a");
  const categories = document.querySelectorAll('.category');

  const defaultCategory = "1";
  const selectedClass = 'select_category';//10.20추가(카테고리 유지)

  const lastSelectedCategory = localStorage.getItem('selectedCategory');//10.20추가
  const initialCategory = lastSelectedCategory ? lastSelectedCategory : defaultCategory;//10.20추가

  if (storeData && storeData.length > 0) {
    searchFunction(); // storeData에 데이터가 있을 경우 검색 결과 표시
  } else if (storeData !== null) {
    console.log("검색 결과 없음");
  } else {
    fetch(`/menu?category=${initialCategory}`)//10.20수정
      .then(response => response.json())
      .then(menuData => {
        clearSliderContainer(sliderContainer); // 슬라이더 컨테이너 내용 지우기
        handleMenuData(menuData, sliderContainer); // 메뉴 데이터 추가
      });
  }

  // 초기 로드 시 선택된 카테고리에 대한 스타일 설정 10.15시작
  categories.forEach(category => {
    const categoryLink = category.querySelector('a');
    const categoryValue = categoryLink.getAttribute('data-category');
    if (categoryValue === initialCategory) {
      category.classList.add(selectedClass);
    } else {
      category.classList.remove(selectedClass);
    }
  });//10.15끝

  categoryLinks.forEach(link => {
    link.addEventListener("click", (event) => {
      
      prevBtn.style.display = "none";
      nextBtn.style.display = "block";

      event.preventDefault();
      const category = link.getAttribute("data-category");
      localStorage.setItem('selectedCategory', category); // 선택한 카테고리 저장 10.20추가

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
  const menuItemsPerSlide = 6; // 슬라이드당 메뉴 개수
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

    const formattedPrice = new Intl.NumberFormat('ko-KR').format(menu.price);//가격 쉼표 넣기
    const menuHTML = `
      <div class="list_content_box" id="list_click" data-menunum="${menu.menu_num}">
        <div class="box list_img_box">
          <img class="list_img_size" src=".${menu.image_path}" alt="${menu.menu_name}">
        </div>
        <div class="list_content_info">
          <div class="container text-center">
            <div class="content_title">
              <div class="menu_name">${menu.menu_name}</div>
              <div class="menu_cost">${formattedPrice}원</div>
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
    const timer = urlParams.get('timer');//10.17 추가

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
  const itemsPerPage = 6; // 각 슬라이드당 표시할 아이템 수
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
    const timer = urlParams.get('timer');//10.17 추가

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
    const timer = urlParams.get('timer');//10.17 추가

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

//현재 주문 목록
function generateOrderList(orderData) {
  const selectList = document.querySelector('.select_list_list');
  let pay_move = document.querySelector('.pay_move');
  let pay_button = document.querySelector('.pay_button');
  let circle_name = document.querySelector('.pay_move .circle_name');

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
      circle_name.style.color = "#BBBBBB";
      pay_move.style.backgroundColor = "rgba(233, 233, 233, 0.7)";
      // pay_circle.style.border = "solid 3px #6c757d"
    }

    if (pay_button) {
      pay_button.onclick = function (event) {
        event.preventDefault(); // 클릭 이벤트를 막음
      };

      // 배경색 변경
      pay_button.style.color = "#BBBBBB";
      pay_button.style.backgroundColor = "#8c8a8a";
      // pay_circle.style.border = "solid 3px #6c757d"
    }
  } else {
    orderData.forEach(order => {
      console.log(order.menu_num);
      const selectListDetail = document.createElement('div');
      selectListDetail.classList.add('select_list_detail');

      const selectName = document.createElement('div');
      selectName.classList.add('select_name');
      selectName.textContent = order.menu_name;

      // 온도 옵션
      const selectTem = document.createElement('div');//10.06여기서부터
      selectTem.classList.add('select_tem');
      selectTem.textContent = `${order.op_t === 1 ? '뜨거움' : '차가움'}(+0원)`;

      const selectSize = document.createElement('div');
      selectSize.classList.add('select_size');
      selectSize.textContent = `${order.op_s === 3 ? '기본 크기' : '큰 크기'}(${order.op_s === 3 ? '+0원' : '+1200원'})`;

      // 추가 옵션
      const selectOp = document.createElement('div');
      selectOp.classList.add('select_op');
      // selectOp.textContent = `${order.options.length > 1 ? order.options.slice(1).map(op => op.op_name).join(', ') : '추가사항: 없음'}`;//10.08수정
      if (order.options.length > 1) {
        order.options.slice(1).forEach(op => {
          const optionDiv = document.createElement('div');
          optionDiv.textContent = op.op_name + "(+" + op.op_price + "원)";
          selectOp.appendChild(optionDiv);
        });
      } else {
        selectOp.textContent = '추가사항: 없음';
      }

      const move_box = document.createElement('div');
      move_box.classList.add('move_box')

      // const move_box_inner = document.createElement('div');
      // move_box_inner.classList.add('move_box_inner');

      const move_box_inner_1 = document.createElement('div');   // 제품 명과 수량 표기
      move_box_inner_1.classList.add('move_box_inner_1');

      const move_box_inner_2 = document.createElement('div');   // 온도 및 옵션 표기
      move_box_inner_2.classList.add('move_box_inner_2');

      const update_btn = document.createElement('button');
      update_btn.classList.add('update_btn');
      update_btn.textContent = "옵션변경";

      update_btn.setAttribute('data-orderNum', order.order_num);//10.06 추가

      const del_btn = document.createElement('button');
      del_btn.classList.add('del_btn');

      const del_btn_icon = document.createElement("img");
      del_btn_icon.src = "../icon_img/delete_black_icon.png";
      del_btn_icon.classList.add('del_btn_icon'); // 'add'를 'classList.add'로 수정

      del_btn.appendChild(del_btn_icon);

      del_btn.setAttribute('data-orderNum', order.order_num);

      //09.05수정
      if (order.op_t === 1) {
        selectName.style.color = '#E70A0A'; // op_t가 1일 때 빨간색
      } else if (order.op_t === 2) {
        selectName.style.color = '#007AC2'; // op_t가 2일 때 파란색
      } else if (order.op_t === 1000) {
        selectName.style.color = 'black';
      }

      const selectNum = document.createElement('div');
      selectNum.classList.add('select_num');
      selectNum.textContent = order.count + '개';

      //개별 매뉴 가격 추가
      const totalPrice = document.createElement('div');
      totalPrice.classList.add('total_price');
      const Each_Price = new Intl.NumberFormat('ko-KR').format(order.total_price);
      totalPrice.textContent = Each_Price + '원';

      move_box.appendChild(move_box_inner_1);

      move_box_inner_1.appendChild(del_btn);
      move_box_inner_1.appendChild(selectName);

      move_box.appendChild(move_box_inner_2);

      move_box_inner_2.appendChild(selectTem);
      move_box_inner_2.appendChild(selectSize);
      move_box_inner_2.appendChild(selectOp);
      move_box_inner_2.appendChild(selectNum);
      move_box_inner_2.appendChild(totalPrice);//10.16 개별 매뉴 가격 추가
      
      move_box_inner_2.appendChild(update_btn);
      
      // 디저트일때 옵션 표시 안하기
      if (order.menu_num >= 500) {
        selectTem.style.display = "none";
        selectSize.style.display = "none";
        selectOp.style.display = "none";
      }

      selectListDetail.appendChild(move_box);

      selectList.appendChild(selectListDetail);

      // const move_boies = document.querySelectorAll('.move_box');

      // move_boies.forEach(move_boies => {
      //   move_boies.addEventListener('click', () => {
      //     const urlParams = new URLSearchParams(window.location.search);
      //     const pickup = urlParams.get('pickup');//09.08 수정
      //     const order = urlParams.get('order');
      //     const timer = urlParams.get('timer')
      //     location.href = `http://localhost:3001/last_checklist/checklist.html?order=${order}&timer=${timer}&pickup=${pickup}`;
      //   })
      // })
    });

    //변경 버튼 10.06(이게 끝나면 새로고침 되도록 해줘)
    const updateBtn = document.querySelectorAll(".update_btn");
    updateBtn.forEach(updateBtn => {
      updateBtn.addEventListener("click", function () {
        console.log("변경 버튼 눌림");
        // 클릭된 버튼의 data-orderNum 값을 가져옴
        const orderNum = this.getAttribute('data-orderNum');
        console.log("주문 번호:", orderNum);

        // 먼저 모달 컨테이너를 비웁니다.
        document.getElementById("modalContainer").innerHTML = "";

        // help_msg.css를 제거합니다.
        const detailMenuLink = document.querySelector('link[href="http://localhost:3001/help_msg/help_msg.css"]');
        const urlParams = new URLSearchParams(window.location.search);
        const pickup = urlParams.get('pickup');
        const timer = urlParams.get('timer');//10.17 추가
        const order = urlParams.get('order');
        if (detailMenuLink) {
          detailMenuLink.remove();
        }
        if (order == 'slow') {
          history.pushState(null, null, `http://localhost:3001/BigFrame/BigOrder.html?order=slow&timer=${timer}&pickup=${pickup}&orderNum=${orderNum}`);
        } else {
          history.pushState(null, null, `http://localhost:3001/BasicFrame/BasicOrder.html?order=basic&timer=${timer}&pickup=${pickup}&orderNum=${orderNum}`);
        }
        // 외부 detail_menu 폴더에 있는 jojo.html 파일을 로드하여 모달 컨테이너에 추가합니다.
        fetch("http://localhost:3001/detail_menu/jojo_o.html?orderNum=${orderNum}") // 이 부분의 파일 경로를 수정해야합니다.
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

            // 외부 detail_menu 폴더에 있는 detail_menu_o.js 파일을 로드합니다.
            const scriptElement = document.createElement("script");
            scriptElement.src = "http://localhost:3001/detail_menu/detail_menu_o.js"; // 이 부분의 파일 경로를 수정해야합니다.
            document.body.appendChild(scriptElement);

            const modal = new bootstrap.Modal(document.getElementById("exampleModal"));
            modal.show();

            // 모달이 닫힐 때 이벤트를 감지하여 페이지 새로 골침
            modal._element.addEventListener('hidden.bs.modal', function () {
              location.reload();
            });
          })
          .catch(error => {
            console.error("콘텐츠를 가져오는 중 오류가 발생했습니다:", error);
          });
      });
    });
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
            // const linkElement = document.createElement("link");
            // linkElement.rel = "stylesheet";
            // linkElement.type = "text/css";
            // linkElement.href = "http://localhost:3001/messagebox/caution_style.css";
            // document.head.appendChild(linkElement);

            // 모달을 열기 위한 코드
            const modal = new bootstrap.Modal(document.getElementById("exampleModal"));
            modal.show();

            // 주문 확인 모달 내부의 버튼 이벤트 리스너 등을 여기서 추가하면 됩니다.
            const confirmButton = document.querySelector('.btn-primary');
            confirmButton.addEventListener("click", function () {
              console.log("취소 버튼 눌림");
              // "취소" 버튼이 클릭되면 orderNum 값을 사용하여 DELETE 요청을 보내는 코드 작성
              modal.hide();
            });

            const cancelButton = document.querySelector('.btn-secondary');
            cancelButton.addEventListener("click", function () {
              console.log("확인 버튼 눌림");
              // "확인" 버튼이 클릭되면 모달 닫기
              deleteOrder(orderNum);
            });
          })
          .catch(error => {
            console.error("콘텐츠를 가져오는 중 오류가 발생했습니다:", error);
          });
      });
    });
    // pay_move 버튼 활성화 (옵션: 주문 목록이 비어 있지 않을 때 활성화)
    if (pay_move) {
      pay_move.disabled = false;
    }

    if(pay_button){
      pay_button.disabled = false;
    }
  }
}

// 총 금액 연결
let totalAmount = 0;
fetch('/getOrderData')
  .then(response => response.json())
  .then(data => {
    console.log("Session data:", JSON.stringify(data));
    // 주문 데이터를 가지고 총 금액 계산
    totalAmount = calculateTotalAmount(data);
    updateTotalAmountUI(totalAmount);

    localStorage.setItem('myTotalCost', JSON.stringify(totalAmount));
  });
function calculateTotalAmount(orders) {
  return orders.reduce((total, order) => total + Number(order.total_price), 0);
}
function updateTotalAmountUI(amount) {
  const formattedPrice = new Intl.NumberFormat('ko-KR').format(amount);//10.09 가격 쉼표 넣기
  const totalCostElement = document.querySelector('.total_cost');
  totalCostElement.textContent = formattedPrice + '원';
}

let total_cost = localStorage.getItem('myTotalCost');
const formattedPrice = new Intl.NumberFormat('ko-KR').format(total_cost);//09.18 가격 쉼표 넣기
const totalCostElement = document.querySelector('.total_cost');
totalCostElement.textContent = formattedPrice + '원';


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


// 포장 연결
// 라디오 버튼의 상태가 변경될 때 호출되는 함수를 정의합니다.
function updateData() {
  const radioButtons = document.getElementsByName('listGroupRadio');
  let newParamValue = "";

  // 선택된 라디오 버튼에 따라 newParamValue 값을 설정합니다.
  if (radioButtons[0].checked) {
    newParamValue = "1"; // "포장하기"가 선택된 경우
  } else if (radioButtons[1].checked) {
    newParamValue = "2"; // "먹고가기"가 선택된 경우
  }

  // 현재 URL을 가져옵니다.
  var currentURL = window.location.href;
  var url = new URL(currentURL);
  var params = new URLSearchParams(url.search);
  var timer = params.get("timer");

  if (timer !== null && !isNaN(timer)) {
    timer = parseInt(timer);
    timer--; // 타이머를 1씩 감소

    // "pickup" 및 "timer" 파라미터를 업데이트합니다.
    params.set("pickup", newParamValue);
    params.set("timer", timer);
    url.search = params.toString();
    var newURL = url.toString();
    // 브라우저 주소 표시줄 업데이트
    window.history.replaceState({}, document.title, newURL);

    // 타이머가 0이 되면 동작을 원하는 대로 처리
    if (timer === 0) {
      document.getElementById("modalContainer").innerHTML = "";

      // detail_menu.css를 제거합니다.
      const detailMenuLink = document.querySelector('link[href="http://localhost:3001/detail_menu/detail_menu.css"]');
      if (detailMenuLink) {
        detailMenuLink.remove();
      }
      console.log("타이머가 0이 되었습니다.");

      // timeout.html 콘텐츠를 로드하여 모달 컨테이너에 추가합니다.
      fetch(`http://localhost:3001/timeout/timeout.html`)
        .then(response => {
          if (!response.ok) {
            throw new Error("HTTP Error " + response.status);
          }
          return response.text();
        })
        .then(data => {
          // 모달 컨테이너에 timeout.html 콘텐츠를 추가합니다.
          $("#modalContainer").html(data);

          // timeout.css 파일을 로드합니다.
          const linkElement = document.createElement("link");
          linkElement.rel = "stylesheet";
          linkElement.type = "text/css";
          linkElement.href = "http://localhost:3001/help_msg/help_msg.css";
          document.head.appendChild(linkElement);

          // 모달을 열기 위한 코드
          const modal = new bootstrap.Modal(document.getElementById("exampleModal"));
          modal.show();

          const yes = document.querySelector('.btn-primary');
          yes.addEventListener("click", function () {//180초 추가하기
            params.set("timer", 180);
            url.search = params.toString();
            newURL = url.toString();
            window.history.replaceState({}, document.title, newURL);
            location.reload();
          })
          const no = document.querySelector('.btn-secondary');
          no.addEventListener("click", function () {//시작 페이지로 이동
            window.location.href = "http://localhost:3001/selectorder/selectorder.html";
          })

        })
        .catch(error => {
          console.error("콘텐츠를 가져오는 중 오류가 발생했습니다:", error);
        });
    } else if (timer < -10) {//타이머가 0보다 작을때 강제로 시작페이지로
      window.location.href = "http://localhost:3001/selectorder/selectorder.html";
    }
  }
  else {
    alert("유효한 타이머 시간을 지정하지 않았습니다.");
  }
}

// 라디오 버튼의 상태가 변경될 때 updateData 함수를 호출합니다.
const radioButtons = document.getElementsByName('listGroupRadio');
for (const radioButton of radioButtons) {
  radioButton.addEventListener('change', updateData);
}
setInterval(updateData, 1000);//10.17 수정 끝

// 페이지 로드 시 라디오 버튼 상태를 URL 파라미터에 맞게 설정합니다.
function checkRadioButton() {
  const urlParams = new URLSearchParams(window.location.search);
  const orderType = urlParams.get('pickup');
  if (orderType === '1') {
    radioButtons[1].checked = false;
    radioButtons[0].checked = true;
  } else {
    radioButtons[1].checked = true;
    radioButtons[0].checked = false;
  }
}

window.addEventListener('load', checkRadioButton);
