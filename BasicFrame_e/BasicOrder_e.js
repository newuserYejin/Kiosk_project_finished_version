//도움말
const joImage = document.getElementById("imageLink");

            joImage.addEventListener("click", function () {
                // 먼저 modalContainer_e를 비웁니다.
                document.getElementById("modalContainer_e").innerHTML = "";

                // help_msg.html 콘텐츠를 로드하여 modalContainer_e에 추가합니다.
                fetch("http://localhost:3001/help_msg/help_msg.html")
                    .then(response => {
                        if (!response.ok) {
                            throw new Error("HTTP Error " + response.status);
                        }
                        return response.text();
                    })
                    .then(data => {
                        // modalContainer_e에 help_msg.html 콘텐츠를 추가합니다.
                        // 모달 제목을 찾아서 변경
                        document.getElementById("modalContainer_e").innerHTML = data;

                        const modalTitle = document.querySelector(".modal-title");
                        if (modalTitle) {
                            modalTitle.textContent = "help"; // "help"로 변경
                        }

                        const modalBody = document.querySelector(".modal-body");
                        modalBody.innerHTML = `
                                <video autoplay controls>
                                    <source src="./image/basicorder_e(1).mp4" type="video/mp4">
                                    Please call the administrator
                                </video>

                                <section class="content_explain" style="height: 50%;">
                                    1. If you choose the menu you want, the detailed menu window will appear.
                                    => Product quantity and options can be modified.<br>
                                    2. If you use categories, you can meet more diverse menus.<br>
                                    3. You can find specific menus using product search.<br>
                                    You can also search using => keywords.<br>
                                    4. You can meet a menu window with a different structure through the buttons at the top.
                                </section>

                                <video controls>
                                    <source src="./image/basicorder_e(2).mp4" type="video/mp4">
                                    Please call the administrator
                                </video>

                                <section class="content_explain" style="height: 50%;">

                                    1. You can check the list of selected menus by using 'Check Order' on the left.<br>
                                    2. If you use 'Final Payment', you can proceed to the payment without checking the order list.<br>
                                    &lt;Order List&gt;<br>
                                    3. The order history appears in red if it is warm, blue if it is cold, and black if there is no temperature selection.<br>
                                    4. Selecting the current order list will take you to the screen where you can modify the menu.

                                </section>
                                `;

                        // help_msg.css 파일을 로드합니다.
                        const linkElement = document.createElement("link");
                        linkElement.rel = "stylesheet";
                        linkElement.type = "text/css";
                        linkElement.href = "http://localhost:3001/help_msg/help_msg_e.css";
                        document.head.appendChild(linkElement);

                        const modal = new bootstrap.Modal(document.getElementById("exampleModal"));
                        modal.show();
                    })
                    .catch(error => {
                        console.error("콘텐츠를 가져오는 중 오류가 발생했습니다:", error);
                    });
            });

// // 선택 버튼(메뉴 선택)
// const selectBtn = document.querySelectorAll(".list_content_box");
// selectBtn.forEach(selectBtn => {
//   selectBtn.addEventListener("click", function () {
//     // 먼저 모달 컨테이너를 비웁니다.
//     document.getElementById("modalContainer").innerHTML = "";
  
//     // help_msg.css를 제거합니다.
//     const detailMenuLink = document.querySelector('link[href="http://localhost:3001/help_msg/help_msg.css"]');
//     if (detailMenuLink) {
//       detailMenuLink.remove();
//     }
  
//     // 외부 detail_menu 폴더에 있는 jojo.html 파일을 로드하여 모달 컨테이너에 추가합니다.
//     fetch("http://localhost:3001/detail_menu/jojo.html") // 이 부분의 파일 경로를 수정해야합니다.
//       .then(response => {
//         if (!response.ok) {
//           throw new Error("HTTP Error " + response.status);
//         }
//         return response.text();
//       })
//       .then(data => {
//         // 모달 컨테이너에 jojo.html 콘텐츠를 추가합니다.
//         $("#modalContainer").html(data);
  
//         // 외부 detail_menu 폴더에 있는 detail_menu.css 파일을 로드합니다.
//         const linkElement = document.createElement("link");
//         linkElement.rel = "stylesheet";
//         linkElement.type = "text/css";
//         linkElement.href = "http://localhost:3001/detail_menu/detail_menu.css"; // 이 부분의 파일 경로를 수정해야합니다.
//         document.head.appendChild(linkElement);
  
//         // 외부 detail_menu 폴더에 있는 detail_menu.js 파일을 로드합니다.
//         const scriptElement = document.createElement("script");
//         scriptElement.src = "http://localhost:3001/detail_menu/detail_menu.js"; // 이 부분의 파일 경로를 수정해야합니다.
//         document.body.appendChild(scriptElement);
  
//         const modal = new bootstrap.Modal(document.getElementById("exampleModal"));
//         modal.show();
//       })
//       .catch(error => {
//         console.error("콘텐츠를 가져오는 중 오류가 발생했습니다:", error);
//       });
//   });
// });

//네비게이션
function select_page() {
  alert("This is the current page.")
};

// 확인 페이지로 이동
function check_page(){
  const urlParams = new URLSearchParams(window.location.search);
  const orderType = urlParams.get('order');
  const pickup = urlParams.get('pickup');//09.08 수정

  if (orderType == 'slow') {
    location.href = `http://localhost:3001/last_checklist_e/checklist_e.html?order=slow&pickup=${pickup}`;
  } else if (orderType == 'basic') {
    location.href = `http://localhost:3001/last_checklist_e/checklist_e.html?order=basic&pickup=${pickup}`;
  }
};

// 결제 페이지로 이동
function pay_page(){
  const urlParams = new URLSearchParams(window.location.search);
  const orderType = urlParams.get('order');
  const pickup = urlParams.get('pickup');//09.08 수정

  if (orderType == 'slow') {
    // 천천히 주문하기 버튼을 클릭한 경우
    location.href = `http://localhost:3001/paymethod_e/paymethod_e.html?order=slow&pickup=${pickup}`;
  } else if (orderType == 'basic') {
    // 기본 주문하기 버튼을 클릭한 경우
    location.href = `http://localhost:3001/paymethod_e/paymethod_e.html?order=basic&pickup=${pickup}`;
  }
};

// 검색버튼(검색 창 띄우기)

document.getElementById("search_div").addEventListener('click', search);

function search(){
  document.getElementById("modalContainer_e").innerHTML = "";

  // help_msg.css를 제거합니다.
  const help_msg_Link = document.querySelector('link[href="http://localhost:3001/help_msg/help_msg.css"]');
  if (help_msg_Link) {
    help_msg_Link.remove();
  }

  // detail_menu.css를 제거합니다.
  const detailMenuLink = document.querySelector('link[href="http://localhost:3001/detail_menu_e/detail_menu_e.css"]');
  if (detailMenuLink) {
    detailMenuLink.remove();
  }

  fetch("http://localhost:3001/search_e/search_e.html") // 이 부분의 파일 경로를 수정해야합니다.
    .then(response => {
      if (!response.ok) {
        throw new Error("HTTP Error " + response.status);
      }
      return response.text();
    })
    .then(data => {
      // 모달 컨테이너에 jojo.html 콘텐츠를 추가합니다.
      $("#modalContainer_e").html(data);

      // 외부 detail_menu 폴더에 있는 detail_menu.css 파일을 로드합니다.
      const linkElement = document.createElement("link");
      linkElement.rel = "stylesheet";
      linkElement.type = "text/css";
      linkElement.href = "http://localhost:3001/search_e/search_e.css"; // 이 부분의 파일 경로를 수정해야합니다.
      document.head.appendChild(linkElement);

      // 외부 detail_menu 폴더에 있는 detail_menu.js 파일을 로드합니다.
      const scriptElement = document.createElement("script");
      scriptElement.src = "http://localhost:3001/search_e/search_e.js"; // 이 부분의 파일 경로를 수정해야합니다.
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
    location.href = `http://localhost:3001/selecteat_e/selecteat_e.html?order=slow&pickup=${pickup}`;
  } else if (orderType == 'basic') {
    // 기본 주문하기 버튼을 클릭한 경우
    location.href = `http://localhost:3001/selecteat_e/selecteat_e.html?order=basic&pickup=${pickup}`;
  }
};

// 처음으로
function firstScreen(){
  // 새로운 페이지로 이동
  window.location.href = "http://localhost:3001/selectorder/selectorder.html";
};

// 다음
function nextScreen(){
  // 새로운 페이지로 이동
  const urlParams = new URLSearchParams(window.location.search);
  const orderType = urlParams.get('order');
  const pickup = urlParams.get('pickup');//09.08 수정

  if (orderType == 'slow') {
    // 천천히 주문하기 버튼을 클릭한 경우
    location.href = `http://localhost:3001/last_checklist_e/checklist_e.html?order=slow&pickup=${pickup}`;
  } else if (orderType == 'basic') {
    // 기본 주문하기 버튼을 클릭한 경우
    location.href = `http://localhost:3001/last_checklist_e/checklist_e.html?order=basic&pickup=${pickup}`;
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
            window.location.href = `http://localhost:3001/BigFrame_e/BigOrder_e.html?order=slow&pickup=${pickup}`;
          } else if (currentOrder === 'basic') {
            window.location.href = `http://localhost:3001/BigFrame_e/BigOrder_e.html?order=basic&pickup=${pickup}`;
          }
          break;
        case 'basic':
          if (currentOrder === 'slow') {
            window.location.href = `http://localhost:3001/BasicFrame_e/BasicOrder_e.html?order=slow&pickup=${pickup}`;
          } else if (currentOrder === 'basic') {
            window.location.href = `http://localhost:3001/BasicFrame_e/BasicOrder_e.html?order=basic&pickup=${pickup}`;
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
    fetch(`/menu_e?category=${defaultCategory}`)
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

      fetch(`/menu_e?category=${category}`)
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

  menuData.forEach((menu, index) => {
    if (index > 0 && index % menuItemsPerSlide === 0) {
      sliderContainer.appendChild(currentSlide);
      currentSlide = document.createElement("div");
      currentSlide.className = "slide";
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
              <div class="menu_cost">&#8361;${menu.price}</div>
            </div>
          </div>
        </div>
      </div>
    `;

    currentSlide.innerHTML += menuHTML;
  });

  // 마지막에 남은 슬라이드 추가
  sliderContainer.appendChild(currentSlide);
  const selectBtn = document.querySelectorAll(".list_content_box");
  selectBtn.forEach(selectBtn => {
    const urlParams = new URLSearchParams(window.location.search);//09.08 수정
    const pickup = urlParams.get('pickup');//09.08 수정
    selectBtn.addEventListener("click", function (event) {
      console.log("버튼 눌림");
      const menuNum = this.getAttribute('data-menunum');
      console.log("주문번호:", menuNum);
  
      // 먼저 모달 컨테이너를 비웁니다.
      document.getElementById("modalContainer_e").innerHTML = "";
  
      // help_msg.css를 제거합니다.
      const detailMenuLink = document.querySelector('link[href="http://localhost:3001/help_msg/help_msg.css"]');
      if (detailMenuLink) {
        detailMenuLink.remove();
      }
  
      history.pushState(null, null,`http://localhost:3001/BasicFrame_e/BasicOrder_e.html?order=basic&pickup=${pickup}&menuId=${menuNum}`);
      // 외부 detail_menu 폴더에 있는 jojo.html 파일을 로드하여 모달 컨테이너에 추가합니다.
      fetch(`http://localhost:3001/detail_menu_e/jojo_e.html?pickup+${pickup}&menuId=${menuNum}`) // 이 부분의 파일 경로를 수정해야합니다.
        .then(response => {
          if (!response.ok) {
            throw new Error("HTTP Error " + response.status);
          }
          return response.text();
        })
        .then(data => {
          // 모달 컨테이너에 jojo.html 콘텐츠를 추가합니다.
          $("#modalContainer_e").html(data);
  
          // 외부 detail_menu 폴더에 있는 detail_menu.css 파일을 로드합니다.
          const linkElement = document.createElement("link");
          linkElement.rel = "stylesheet";
          linkElement.type = "text/css";
          linkElement.href = "http://localhost:3001/detail_menu_e/detail_menu_e.css"; // 이 부분의 파일 경로를 수정해야합니다.
          document.head.appendChild(linkElement);
  
          // 외부 detail_menu 폴더에 있는 detail_menu.js 파일을 로드합니다.
          const scriptElement = document.createElement("script");
          scriptElement.src = "http://localhost:3001/detail_menu_e/detail_menu_e.js"; // 이 부분의 파일 경로를 수정해야합니다.
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
        itemDiv.className = "box list_content_box";
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
                <div class="menu_cost">&#8361;${item.Price}</div>
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
      document.getElementById("modalContainer_e").innerHTML = "";

      // help_msg.css를 제거합니다.
      const detailMenuLink = document.querySelector('link[href="http://localhost:3001/help_msg/help_msg.css"]');
      if (detailMenuLink) {
        detailMenuLink.remove();
      }

      history.pushState(null, null, `http://localhost:3001/BasicFrame_e/BasicOrder_e.html?order=basic&pickup=${pickup}&menuId=${menuNum}`);

      // 외부 detail_menu 폴더에 있는 jojo.html 파일을 로드하여 모달 컨테이너에 추가합니다.
      fetch(`http://localhost:3001/detail_menu_e/jojo_e.html?pickup=${pickup}&menuId=${menuNum}`) // 이 부분의 파일 경로를 수정해야합니다.
        .then(response => {
          if (!response.ok) {
            throw new Error("HTTP Error " + response.status);
          }
          return response.text();
        })
        .then(data => {
          // 모달 컨테이너에 jojo.html 콘텐츠를 추가합니다.
          $("#modalContainer_e").html(data);

          // 외부 detail_menu 폴더에 있는 detail_menu.css 파일을 로드합니다.
          const linkElement = document.createElement("link");
          linkElement.rel = "stylesheet";
          linkElement.type = "text/css";
          linkElement.href = "http://localhost:3001/detail_menu_e/detail_menu_e.css"; // 이 부분의 파일 경로를 수정해야합니다.
          document.head.appendChild(linkElement);

          // 외부 detail_menu 폴더에 있는 detail_menu.js 파일을 로드합니다.
          const scriptElement = document.createElement("script");
          scriptElement.src = "http://localhost:3001/detail_menu_e/detail_menu_e.js"; // 이 부분의 파일 경로를 수정해야합니다.
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
      document.getElementById("modalContainer_e").innerHTML = "";

      // help_msg.css를 제거합니다.
      const detailMenuLink = document.querySelector('link[href="http://localhost:3001/help_msg/help_msg.css"]');
      if (detailMenuLink) {
        detailMenuLink.remove();
      }

      history.pushState(null, null, `http://localhost:3001/BasicFrame_e/BasicOrder_e.html?order=basic&pickup=${pickup}&menuId=${menuNum}`);

      // 외부 detail_menu 폴더에 있는 jojo.html 파일을 로드하여 모달 컨테이너에 추가합니다.
      fetch(`http://localhost:3001/detail_menu_e/jojo_e.html?pickup=${pickup}&menuId=${menuNum}`) // 이 부분의 파일 경로를 수정해야합니다.
        .then(response => {
          if (!response.ok) {
            throw new Error("HTTP Error " + response.status);
          }
          return response.text();
        })
        .then(data => {
          // 모달 컨테이너에 jojo.html 콘텐츠를 추가합니다.
          $("#modalContainer_e").html(data);

          // 외부 detail_menu 폴더에 있는 detail_menu.css 파일을 로드합니다.
          const linkElement = document.createElement("link");
          linkElement.rel = "stylesheet";
          linkElement.type = "text/css";
          linkElement.href = "http://localhost:3001/detail_menu_e/detail_menu_e.css"; // 이 부분의 파일 경로를 수정해야합니다.
          document.head.appendChild(linkElement);

          // 외부 detail_menu 폴더에 있는 detail_menu.js 파일을 로드합니다.
          const scriptElement = document.createElement("script");
          scriptElement.src = "http://localhost:3001/detail_menu_e/detail_menu_e.js"; // 이 부분의 파일 경로를 수정해야합니다.
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
  
  orderData.forEach(order => {
    const selectListDetail = document.createElement('div');
    selectListDetail.classList.add('select_list_detail');
    
    const selectName = document.createElement('div');
    selectName.classList.add('select_name');
    selectName.textContent = order.menu_name;

    //09.05수정
    if (order.op_t === 1) {
      selectName.style.color = 'red'; // op_t가 1일 때 빨간색
    } else if (order.op_t === 2) {
      selectName.style.color = 'blue'; // op_t가 2일 때 파란색
    }
    
    const selectNum = document.createElement('div');
    selectNum.classList.add('select_num');
    selectNum.textContent = order.count + 'pcs';
    
    selectListDetail.appendChild(selectName);
    selectListDetail.appendChild(selectNum);
    
    selectList.appendChild(selectListDetail);
  });
}

// 페이지 로드 시 주문 목록을 가져와서 생성
window.addEventListener('load', () => {
  fetch('/getOrderData_e')  // 서버의 getOrderData 라우트에 요청
    .then(response => response.json())
    .then(orderData => {
      generateOrderList(orderData);  // 주문 목록 생성 함수 호출
    })
    .catch(error => {
      console.error('Error fetching order data:', error);
    });
});

function move_checklist(){
  const urlParams = new URLSearchParams(window.location.search);
  const pickup = urlParams.get('pickup');//09.08 수정

  location.href=`http://localhost:3001/last_checklist_e/checklist_e.html?pickup=${pickup}&order=basic`;
}