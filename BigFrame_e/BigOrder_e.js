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

      // 모달 컨테이너에 help_msg.html 콘텐츠를 추가합니다.
      modalContainer_e.innerHTML = data;

      const modalTitle = document.querySelector(".modal-title");
      if (modalTitle) {
        modalTitle.textContent = "Help"; // "help"로 변경
      }

      const close_btn = document.querySelector(".help_close");
      if (close_btn) {
          close_btn.textContent = "Close";
      }

      const modalBody = document.querySelector(".modal-body");
      modalBody.innerHTML = `
        <div class="help_button">
            <button class="help_msg_btn_check" onclick="open_help('bigorder_e_1',this)">Order</button>
            <button onclick="open_help('bigorder_e_2',this)">Search</button>
            <button onclick="open_help('bigorder_e_3',this)">Navigation</button>
        </div>

        <video autoplay controls style="width:100%; margin-bottom:0;">
          <source src="../help_video/bigorder_e(1).mp4" type="video/mp4">
          Please call the administrator.
        </video>

        <section class="content_explain" style="height: 50%;">

        &lt;Menu Order&gt;<br>
        1. Select a category, then select a menu.<br>
        2. Please select the number, temperature, size, and additional options on the detailed menu screen.<br>
        3. Click 'Add' to add the selected menu to the order list.<br>
        4. Since the temperature was selected as 'hot', you can see that it is added as 'red lettering'.<br>
        => (If you have chosen Cold, you will be added blue and the dessert will be added black.)<br>
        5. You can change the 'Take Out' and 'Eat and Go' from the order list.<br>
        6. You can delete the menu by pressing 'x' in the order list.<br>
        7. Click 'Options' to change the number, temperature, size, and additional options.<br>
        8. Click 'Paying' to go to the payment method selection screen.<br>
        9. Click 'Next' to go to the final order list screen.<br>
        `;

      // help_msg.css 파일을 로드합니다.
      const linkElement = document.createElement("link");
      linkElement.rel = "stylesheet";
      linkElement.type = "text/css";
      linkElement.href = "http://localhost:3001/help_msg/help_msg_e.css";
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

// URL에서 "order" 파라미터 값을 확인하여 다른 페이지로 이동
//네비게이션
/* function select_page() {
  alert("This is the current page.")
}; */

// 확인 페이지로 이동
function check_page() {
  const urlParams = new URLSearchParams(window.location.search);
  const orderType = urlParams.get('order');
  const pickup = urlParams.get('pickup');//09.08 수정
  const timer = urlParams.get('timer');
  localStorage.removeItem('selectedCategory');

  if (orderType == 'slow') {
    location.href = `http://localhost:3001/last_checklist_e/checklist_e.html?order=slow&timer=${timer}&pickup=${pickup}`;
  } else if (orderType == 'basic') {
    location.href = `http://localhost:3001/last_checklist_e/checklist_e.html?order=basic&timer=${timer}&pickup=${pickup}`;
  }
};

// 결제 페이지로 이동
function pay_page() {
  const urlParams = new URLSearchParams(window.location.search);
  const orderType = urlParams.get('order');
  const pickup = urlParams.get('pickup');//09.08 수정
  const timer = urlParams.get('timer');
  localStorage.removeItem('selectedCategory');

  if (orderType == 'slow') {
    // 천천히 주문하기 버튼을 클릭한 경우
    location.href = `http://localhost:3001/paymethod_e/paymethod_e.html?order=slow&timer=${timer}&pickup=${pickup}`;
  } else if (orderType == 'basic') {
    // 기본 주문하기 버튼을 클릭한 경우
    location.href = `http://localhost:3001/paymethod_e/paymethod_e.html?order=basic&timer=${timer}&pickup=${pickup}`;
  }
};

// 하단 고정 버튼(이전화면, 처음으로, 다음)
// 이전화면 클릭시
function prvsScren() {
  const urlParams = new URLSearchParams(window.location.search);
  const orderType = urlParams.get('order');
  const pickup = urlParams.get('pickup');//09.08 수정
  const timer = urlParams.get('timer');
  localStorage.removeItem('selectedCategory');

  if (orderType == 'slow') {
    // 천천히 주문하기 버튼을 클릭한 경우
    location.href = `http://localhost:3001/selecteat_e/selecteat_e.html?order=slow&timer=${timer}&pickup=${pickup}`;
  } else if (orderType == 'basic') {
    // 기본 주문하기 버튼을 클릭한 경우
    location.href = `http://localhost:3001/selecteat_e/selecteat_e.html?order=basic&timer=${timer}&pickup=${pickup}`;
  }
};

// 처음으로
function firstScreen() {

  // 먼저 모달 컨테이너를 비웁니다.
  document.getElementById("modalContainer_e").innerHTML = "";

  // detail_menu.css를 제거합니다.
  const detailMenuLink = document.querySelector('link[href="http://localhost:3001/detail_menu_e/detail_menu_e.css"]');
  if (detailMenuLink) {
    detailMenuLink.remove();
  }

  const detailMenuLink_o = document.querySelector('link[href="http://localhost:3001/detail_menu_e/detail_menu_o_e.css"]');
  if (detailMenuLink_o) {
    detailMenuLink_o.remove();
  }

  fetch(`http://localhost:3001/all_delete_msg/all_delete_msg_e.html`)//전체 취소 관련 html로 변경 바람
    .then(response => {
      if (!response.ok) {
        throw new Error("HTTP Error " + response.status);
      }
      return response.text();
    })
    .then(data => {
      // 모달 컨테이너에 caution_msg.html 콘텐츠를 추가합니다.
      // $("#modalContainer").html(data);
      modalContainer_e.innerHTML = data;

      const modalBody = document.querySelector(".modal-body");
      modalBody.innerHTML = `
      <p>Back to the beginning, all orders will disappear.</p>
      <p>Do you want to do that?</p>
      `

      // css 파일을 로드합니다.
      const linkElement = document.createElement("link");
      linkElement.rel = "stylesheet";
      linkElement.type = "text/css";
      linkElement.href = "http://localhost:3001/payment_msg_e/payment_msg_e.css"; // 이 부분의 파일 경로를 수정해야합니다.
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
  const timer = urlParams.get('timer');
  localStorage.removeItem('selectedCategory');

  if (orderType == 'slow') {
    // 천천히 주문하기 버튼을 클릭한 경우
    location.href = `http://localhost:3001/last_checklist_e/checklist_e.html?order=slow&timer=${timer}&pickup=${pickup}`;
  } else if (orderType == 'basic') {
    // 기본 주문하기 버튼을 클릭한 경우
    location.href = `http://localhost:3001/last_checklist_e/checklist_e.html?order=basic&timer=${timer}&pickup=${pickup}`;
  }
};

//사이즈 이동
const sizeButtons = document.querySelectorAll('.size_switch');
sizeButtons.forEach(button => {
  button.addEventListener('click', () => {
    // 선택된 라디오 버튼의 값에 따라 페이지 이동
    const selectedValue = button.getAttribute('data-value');
    const urlParams = new URLSearchParams(window.location.search);
    const currentOrder = urlParams.get('order');
    const pickup = urlParams.get('pickup');//09.08 수정
    const timer = urlParams.get('timer');//10.17

    switch (selectedValue) {
      case 'basic':
        if (currentOrder === 'slow') {
          window.location.href = `http://localhost:3001/BasicFrame_e/BasicOrder_e.html?order=slow&timer=${timer}&pickup=${pickup}`;
        } else if (currentOrder === 'basic') {
          window.location.href = `http://localhost:3001/BasicFrame_e/BasicOrder_e.html?order=basic&timer=${timer}&pickup=${pickup}`;
        }
        break;
      default:
        break;
    }
  });
});

//전체 취소 버튼
const all_delete = document.querySelectorAll('.all_delete');//10.16전체삭제 추가 시작
all_delete.forEach(AdeleteBtn => {
  AdeleteBtn.addEventListener("click", function () {
    console.log("전체 삭제 버튼 눌림");

    // 먼저 모달 컨테이너를 비웁니다.
    document.getElementById("modalContainer_e").innerHTML = "";

    // detail_menu.css를 제거합니다.
    const detailMenuLink = document.querySelector('link[href="http://localhost:3001/detail_menu_e/detail_menu_e.css"]');
    if (detailMenuLink) {
      detailMenuLink.remove();
    }

    fetch(`http://localhost:3001/all_delete_msg/all_delete_msg_e.html`)//전체 취소 관련 html로 변경 바람
      .then(response => {
        if (!response.ok) {
          throw new Error("HTTP Error " + response.status);
        }
        return response.text();
      })
      .then(data => {
        // 모달 컨테이너에 caution_msg.html 콘텐츠를 추가합니다.
        $("#modalContainer_e").html(data);
        // 모달을 열기 위한 코드
        const modal = new bootstrap.Modal(document.getElementById("exampleModal"));
        modal.show();

        // css 파일을 로드합니다.
        const linkElement = document.createElement("link");
        linkElement.rel = "stylesheet";
        linkElement.type = "text/css";
        linkElement.href = "http://localhost:3001/payment_msg_e/payment_msg_e.css"; // 이 부분의 파일 경로를 수정해야합니다.
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

//카테고리
document.addEventListener("DOMContentLoaded", function () {
  const menuList = document.querySelector(".list_box"); // 변경: .list_content_box -> .list_box
  const categoryLinks = document.querySelectorAll(".categories a");
  const categories = document.querySelectorAll('.category');

  // 페이지 로드 시 기본 카테고리를 설정--start
  const defaultCategory = "1";
  const selectedClass = 'select_category';//10.19추가

  const lastSelectedCategory = localStorage.getItem('selectedCategory');//10.19추가
  const initialCategory = lastSelectedCategory ? lastSelectedCategory : defaultCategory;//10.19추가

  // storeData에 데이터가 있는지 여부를 확인
  if (storeData && storeData.length > 0) {
    searchFunction(); // storeData에 데이터가 있을 경우 검색 결과 표시
  } else if (storeData !== null) {
    console.log("검색 결과 없음");
  } else {
    // storeData에 데이터가 없을 경우 초기 카테고리 메뉴 로드
    fetch(`/menu_e?category=${initialCategory}`)
      .then(response => response.json())
      .then(menuData => {
        // 메뉴 목록을 초기화하고 새로운 데이터로 갱신합니다.
        menuList.innerHTML = ''; // 변경: 내용을 지우도록 수정
        handleMenuData(menuData);
      });
  }
  //페이지 로드시 기본 카테고리 설정--end

  // 초기 로드 시 선택된 카테고리에 대한 스타일 설정 10.19시작
  categories.forEach(category => {
    const categoryLink = category.querySelector('a');
    const categoryValue = categoryLink.getAttribute('data-category');
    if (categoryValue === initialCategory) {
      category.classList.add(selectedClass);
    } else {
      category.classList.remove(selectedClass);
    }
  });//10.19끝

  // 카테고리 링크에 클릭 이벤트 추가
  categoryLinks.forEach(link => {
    link.addEventListener("click", (event) => {
      event.preventDefault(); // 링크의 기본 동작을 막습니다.
      const category = link.getAttribute("data-category");
      localStorage.setItem('selectedCategory', category); // 선택한 카테고리 저장 10.19추가

      // 모든 카테고리에서 select_category 클래스 제거
      categories.forEach(c => c.classList.remove('select_category'));

      // 클릭한 카테고리에 select_category 클래스 추가
      link.parentNode.classList.add('select_category');

      fetch(`/menu_e?category=${category}`)
        .then(response => response.json())
        .then(menuData => {
          // 메뉴 목록을 초기화하고 새로운 데이터로 갱신합니다.
          menuList.innerHTML = ''; // 변경: 내용을 지우도록 수정
          handleMenuData(menuData);
          const searchInput = document.querySelector(".search");
          searchInput.value = "";
        });
    });
  });
});

// 메뉴 출력
function handleMenuData(menuData) {
  // 받아온 데이터를 가지고 출력할 HTML 요소 생성
  const menuItems = menuData.map(menu => {

    // menu.tag를 띄어쓰기를 기준으로 분리하여 배열로 만듭니다.
    const tagsArray = menu.tag.split(' #');

    const formattedPrice = new Intl.NumberFormat('ko-KR').format(menu.price);//가격 쉼표 넣기

    // 분리된 태그를 별도의 div 요소에 넣어주기 위한 HTML 문자열 생성
    const tagsHTML = tagsArray.map((tag, index) => {
      // 첫 번째 요소에는 #를 추가하지 않고, 두 번째 요소부터는 #를 추가
      const prefix = index === 0 ? '' : '#';

      return `<div class="tag">${prefix}${tag}</div>`;
    }).join(''); // 배열 요소들을 문자열로 결합

    return `

      <div class="list_content_box">
          <div class="box list_img_box">
              <img id="im" class="list_img_size" src=".${menu.image_path}" data-menunum="${menu.menu_num}" />
          </div>
          <div class="list_content_info"> <!--오른쪽 설명-->
              <div class="content_title">
                  <div class="menu_name">${menu.menu_name}</div>
              </div>
              <div class="list_option_boxes">
                  <div class="list_option">
                      ${tagsHTML} <!-- 분리된 태그들을 여기에 삽입 -->
                  </div>
              </div>
              <div class="menu_cost">&#8361;${formattedPrice}</div>
              <div class="list_buttons">
                  <button class="selectBtn" id="selectBtn" data-menunum="${menu.menu_num}">select</button>
                  <!--menu_num전달을 위한 data-menunu추가-->
              </div>
          </div>
      </div>
    `;
  });

  // 메뉴 목록에 추가
  const menuList = document.querySelector(".list_box");
  menuList.innerHTML += menuItems.join("");

  // 선택 버튼(메뉴 선택)
  const selectBtn = document.querySelectorAll(".selectBtn");
  selectBtn.forEach(selectBtn => {
    const urlParams = new URLSearchParams(window.location.search);//09.08 수정
    const pickup = urlParams.get('pickup');//09.08 수정\
    const timer = urlParams.get('timer');
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

      history.pushState(null, null, `http://localhost:3001/BigFrame_e/BigOrder_e.html?order=slow&timer=${timer}&pickup=${pickup}&menuId=${menuNum}`);

      // 외부 detail_menu 폴더에 있는 jojo.html 파일을 로드하여 모달 컨테이너에 추가합니다.
      fetch(`http://localhost:3001/detail_menu_e/jojo_e.html?timer=${timer}&pickup=${pickup}&menuId=${menuNum}`) // 이 부분의 파일 경로를 수정해야합니다.
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
    const timer = urlParams.get('timer');
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

      history.pushState(null, null, `http://localhost:3001/BigFrame_e/BigOrder_e.html?order=basic&timer=${timer}&pickup=${pickup}&menuId=${menuNum}`);

      // 외부 detail_menu 폴더에 있는 jojo.html 파일을 로드하여 모달 컨테이너에 추가합니다.
      fetch(`http://localhost:3001/detail_menu_e/jojo_e.html?timer=${timer}&pickup=${pickup}&menuId=${menuNum}`) // 이 부분의 파일 경로를 수정해야합니다.
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

//검색
let storeData = JSON.parse(localStorage.getItem('mydata'));
let storeData_str = localStorage.getItem('mydata');

window.onload = searchFunction;

function searchFunction() {

  //검색하면 카테고리 표시 삭제
  const categories = document.querySelectorAll('.category');

  //bigOrder.html에 불러오는 코드 작성
  console.log("검색된 결과값", storeData);

  const resultContainer = document.querySelector('.list_box');
  resultContainer.innerHTML = ''; //이전 결과 초기화
  // const res = document.querySelector('.list_content_box');

  if (storeData.length === 0) {
    console.log('결과 없음');
    resultContainer.innerHTML = '<p style="font-size: 4vw; text-align: center; padding: 5vh;">No results were found for your search.<br>Please search again.</p>';
    localStorage.removeItem('mydata');
  } else {
    categories.forEach(c => c.classList.remove('select_category'));

    storeData.forEach(item => {

      // menu.tag를 띄어쓰기를 기준으로 분리하여 배열로 만듭니다.
      const tagsArray = item.Tag.split(' #');

      // 분리된 태그를 별도의 div 요소에 넣어주기 위한 HTML 문자열 생성
      const tagsHTML = tagsArray.map((Tag, index) => {
        // 첫 번째 요소에는 #를 추가하지 않고, 두 번째 요소부터는 #를 추가
        const prefix = index === 0 ? '' : '#';

        return `<div class="tag">${prefix}${Tag}</div>`;
      }).join(''); // 배열 요소들을 문자열로 결합

      const div = document.createElement('div');
      div.className = "list_content_box";
      div.innerHTML = `
      <div class="list_img_box">
        <img id="im" class="list_img_size" src=".${item.Picture}" data-menunum="${item.Menu_Num}"/>
      </div>
      <div class="box list_content_info">
        <div class="content_title">
            <div class="menu_name">${item.Menu_Name}</div>
            <div class="menu_cost">&#8361;${item.Price}</div>
        </div>
        <div class="list_option_boxes">
            <div class="list_option">
                ${tagsHTML} <!-- 분리된 태그들을 여기에 삽입 -->
            </div>
        </div>
        <div class="list_buttons">
            <button class="selectBtn" id="selectBtn" data-menunum="${item.Menu_Num}">Select</button>
        </div>
    </div>
    `
      resultContainer.appendChild(div);

      const splitBorderDiv = document.createElement('div');
      splitBorderDiv.className = "split_border";

      const parentContainer = resultContainer; // Replace with the actual parent container
      parentContainer.appendChild(div);
      parentContainer.appendChild(splitBorderDiv);
    })

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

        history.pushState(null, null, `http://localhost:3001/BigFrame_e/BigOrder_e.html?order=slow&timer=${timer}&pickup=${pickup}&menuId=${menuNum}`);

        // 외부 detail_menu 폴더에 있는 jojo.html 파일을 로드하여 모달 컨테이너에 추가합니다.
        fetch(`http://localhost:3001/detail_menu_e/jojo_e.html?timer=${timer}&pickup=${pickup}&menuId=${menuNum}`) // 이 부분의 파일 경로를 수정해야합니다.
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
      img_select.addEventListener("click", function (event) {
        const urlParams = new URLSearchParams(window.location.search);//09.08 수정
        const pickup = urlParams.get('pickup');//09.08 수정
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

        history.pushState(null, null, `http://localhost:3001/BigFrame_e/BigOrder_e.html?order=basic&timer=${timer}&pickup=${pickup}&menuId=${menuNum}`);

        // 외부 detail_menu 폴더에 있는 jojo.html 파일을 로드하여 모달 컨테이너에 추가합니다.
        fetch(`http://localhost:3001/detail_menu_e/jojo_e.html?timer=${timer}&pickup=${pickup}menuId=${menuNum}`) // 이 부분의 파일 경로를 수정해야합니다.
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
}

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
  let pay_button = document.querySelector('.pay_button');
  let circle_name = document.querySelector('.pay_move .circle_name');

  if (orderData.length == 0) {
    selectList.innerHTML = `
    <div class = "none_select_menu">Not order yet!</div>
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
      const selectListDetail = document.createElement('div');
      selectListDetail.classList.add('select_list_detail');

      const selectName = document.createElement('div');
      selectName.classList.add('select_name');
      selectName.textContent = order.menu_name;

      // 온도 옵션
      const selectTem = document.createElement('div');//10.06여기서부터
      selectTem.classList.add('select_tem');
      selectTem.textContent = `${order.op_t === 1 ? 'Hot' : 'Cold'}(+0)`;

      //크기 옵션
      const selectSize = document.createElement('div');
      selectSize.classList.add('select_size');
      selectSize.textContent = `${order.op_s === 3 ? 'Basic Size' : 'Large Size'}(${order.op_s === 3 ? '+0' : '+1200'})`;

      // 추가 옵션
      const selectOp = document.createElement('div');
      selectOp.classList.add('select_op');
      if (order.options.length > 1) {
        order.options.slice(1).forEach(op => {
          const optionDiv = document.createElement('div');
          optionDiv.textContent = op.op_name + "(+" + op.op_price + ")";
          selectOp.appendChild(optionDiv);
        });
      } else {
        selectOp.textContent = 'Additional: None';
      }

      const move_box = document.createElement('div');
      move_box.classList.add('move_box')

      const move_box_inner_1 = document.createElement('div');   // 제품 명과 수량 표기
      move_box_inner_1.classList.add('move_box_inner_1');

      const move_box_inner_2 = document.createElement('div');   // 온도 및 옵션 표기
      move_box_inner_2.classList.add('move_box_inner_2');

      const update_btn = document.createElement('button');
      update_btn.classList.add('update_btn');
      update_btn.textContent = "Options";

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
        selectName.style.color = 'red'; // op_t가 1일 때 빨간색
      } else if (order.op_t === 2) {
        selectName.style.color = 'blue'; // op_t가 2일 때 파란색
      } else if (order.op_t === 1000) {
        selectName.style.color = 'black';
      }

      const selectNum = document.createElement('div');
      selectNum.classList.add('select_num');
      selectNum.textContent = order.count + 'Pcs';

      const totalPrice = document.createElement('div');//10.16 개별 매뉴 가격 추가
      totalPrice.classList.add('total_price');//10.16 개별 매뉴 가격 추가
      const Each_Price = new Intl.NumberFormat('ko-KR').format(order.total_price);//10.16 개별 매뉴 가격 추가
      totalPrice.textContent = '\u20A9' + Each_Price;//10.16 개별 매뉴 가격 추가

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

      if (order.menu_num >= 500) {
        selectTem.style.display = "none";
        selectSize.style.display = "none";
        selectOp.style.display = "none";
      }

      selectListDetail.appendChild(move_box);


      selectList.appendChild(selectListDetail);
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
        document.getElementById("modalContainer_e").innerHTML = "";

        // help_msg.css를 제거합니다.
        const detailMenuLink = document.querySelector('link[href="http://localhost:3001/help_msg/help_msg.css"]');
        const urlParams = new URLSearchParams(window.location.search);
        const pickup = urlParams.get('pickup');
        const timer = urlParams.get('timer');//10.17추가
        const order = urlParams.get('order');
        if (detailMenuLink) {
          detailMenuLink.remove();
        }
        if (order == 'slow') {
          history.pushState(null, null, `http://localhost:3001/BigFrame_e/BigOrder_e.html?order=slow&timer=${timer}&pickup=${pickup}&orderNum=${orderNum}`);
        } else {
          history.pushState(null, null, `http://localhost:3001/BigFrame_e/BigOrder_e.html?order=basic&timer=${timer}&pickup=${pickup}&orderNum=${orderNum}`);
        }
        // 외부 detail_menu 폴더에 있는 jojo.html 파일을 로드하여 모달 컨테이너에 추가합니다.
        fetch("http://localhost:3001/detail_menu_e/jojo_o_e.html?orderNum=${orderNum}") // 이 부분의 파일 경로를 수정해야합니다.
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

            // 외부 detail_menu 폴더에 있는 detail_menu_o.js 파일을 로드합니다.
            const scriptElement = document.createElement("script");
            scriptElement.src = "http://localhost:3001/detail_menu_e/detail_menu_o_e.js"; // 이 부분의 파일 경로를 수정해야합니다.
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
        document.getElementById("modalContainer_e").innerHTML = "";

        // detail_menu.css를 제거합니다.
        const detailMenuLink = document.querySelector('link[href="http://localhost:3001/detail_menu_e/detail_menu_e.css"]');
        if (detailMenuLink) {
          detailMenuLink.remove();
        }

        // caution_msg.html 콘텐츠를 로드하여 모달 컨테이너에 추가합니다.
        fetch(`http://localhost:3001/messagebox_e/caution_msg_e.html?orderNum=${orderNum}`)
          .then(response => {
            if (!response.ok) {
              throw new Error("HTTP Error " + response.status);
            }
            return response.text();
          })
          .then(data => {
            // 모달 컨테이너에 caution_msg.html 콘텐츠를 추가합니다.
            $("#modalContainer_e").html(data);
            console.log("선택된 주문 번호 :", orderNum);

            // caution_msg.css 파일을 로드합니다.
            const linkElement = document.createElement("link");
            linkElement.rel = "stylesheet";
            linkElement.type = "text/css";
            linkElement.href = "http://localhost:3001/payment_msg_e/payment_msg_e.css";
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
    // pay_move 버튼 활성화 (옵션: 주문 목록이 비어 있지 않을 때 활성화)
    if (pay_move) {
      pay_move.disabled = false;
    }

    if (pay_button) {
      pay_button.disabled = false;
    }
  }
}

// 총 금액 연결
let totalAmount = 0;
// 주문 데이터 가져오기 및 UI 업데이트
const fetchAndUpdate = () => {
  fetch('/getOrderData_e')
    .then(response => response.json())
    .then(data => {
      console.log("Session data:", JSON.stringify(data));
      totalAmount = calculateTotalAmount(data);
      updateTotalAmountUI(totalAmount);
      localStorage.setItem('myTotalCost', JSON.stringify(totalAmount));
      generateOrderList(data);
    }).catch(error => {
      console.error('Error fetching order data:', error);
    });
};

// 총 금액 계산 함수
function calculateTotalAmount(orders) {
  return orders.reduce((total, order) => total + Number(order.total_price), 0);
}

// 총 금액 UI 업데이트 함수
function updateTotalAmountUI(amount) {
  const formattedPrice = new Intl.NumberFormat('ko-KR').format(amount);
  const totalCostElement = document.querySelector('.total_cost');
  totalCostElement.textContent = '\u20A9 ' + formattedPrice;
}

// 페이지 로드 시 주문 목록 생성
window.addEventListener('load', fetchAndUpdate);

// 포장 연결
function updateData() {
  const radioButtons = document.getElementsByName('listGroupRadio');
  let newParamValue = "";

  if (radioButtons[0].checked) {
    newParamValue = "1"; // "매장"이 선택된 경우
  } else if (radioButtons[1].checked) {
    newParamValue = "2"; // "포장"이 선택된 경우
  }

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
      document.getElementById("modalContainer_e").innerHTML = "";

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
          $("#modalContainer_e").html(data);

          // timeout.css 파일을 로드합니다.
          const linkElement = document.createElement("link");
          linkElement.rel = "stylesheet";
          linkElement.type = "text/css";
          linkElement.href = "http://localhost:3001/timeout/timeout.css";
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