// script.js

var button = document.querySelector('.circle');

//네비게이션 부분
function selectPage() {
  var URL = new URLSearchParams(window.location.search);
  var order_info = URL.get('order');
  const pickup = URL.get('pickup');//09.08 수정

  if (order_info == 'slow') {
    window.location.href = `http://localhost:3001/BigFrame/BigOrder.html?order=slow&pickup=${pickup}`
  } else if (order_info == 'basic') {
    window.location.href = `http://localhost:3001/BasicFrame/BasicOrder.html?order=basic&pickup=${pickup}`
  }
}

function navigateclick() {
  alert("현재 페이지 입니다.")
}

function openPay() {
  var URL = new URLSearchParams(window.location.search);
  var order_info = URL.get('order');
  const pickup = URL.get('pickup');//09.08 수정

  if (order_info == 'slow') {
    window.location.href = `http://localhost:3001/paymethod/paymethod.html?order=slow&pickup=${pickup}`
  } else if (order_info == 'basic') {
    window.location.href = `http://localhost:3001/paymethod/paymethod.html?order=basic&pickup=${pickup}`
  }
}

//이전 화면으로
function prvsScren() {
  const urlParams = new URLSearchParams(window.location.search);
  const orderType = urlParams.get('order');
  const pickup = urlParams.get('pickup');//09.08 수정

  if (orderType == 'slow') {
    // 천천히 주문하기 버튼을 클릭한 경우
    location.href = `http://localhost:3001/BigFrame/BigOrder.html?order=slow&pickup=${pickup}`;
  } else if (orderType == 'basic') {
    // 기본 주문하기 버튼을 클릭한 경우
    location.href = `http://localhost:3001/BasicFrame/BasicOrder.html?order=basic&pickup=${pickup}`;
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
    location.href = `http://localhost:3001/paymethod/paymethod.html?order=slow&pickup=${pickup}`;
  } else if (orderType == 'basic') {
    // 기본 주문하기 버튼을 클릭한 경우
    location.href = `http://localhost:3001/paymethod/paymethod.html?order=basic&pickup=${pickup}`;
  }
};

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
        <source src="./image/checklist.mp4" type="video/mp4">
            관리자를 호출해주세요.
        </video>

        <section class="content_explain"style="height: 60%;">

              1. 주문을 수정하길 원하신다면 '수정'을 눌러 수정하고 '저장'으로 저장해주세요.
              => 제품 수량과 추가 사항들의 수정이 가능합니다. <br>
              2. 주문 내역 삭제 시에는 삭제 안내 메세지가 나타납니다<br>
              => 삭제하실거라면 '확인'을 아니시라면 '취소'를 눌러주세요.<br>
              3. 포장 여부는 상단에서 수정 가능합니다.<br>
              4. 하단버튼을 이용하면 이전 화면, 처음 화면, 다음 화면으로의 이동이 가능합니다.<br>
              5. 왼쪽의 네비게이션을 이용해 메뉴 주문 화면과 결제 화면으로의 이동이 가능합니다.<br>
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

document.addEventListener("DOMContentLoaded", function () {//서버연동(DOMContentLoaded가 실행되고 서버를 실행되어야지 정상적으로 작동[사실 잘 모르겠음])
});

function createOrderItem(order) {//주문 아이템 생성 함수
  const orderItem = document.createElement('div');
  orderItem.className = 'list_content_box';
  orderItem.innerHTML = `
  <!-- ... (이미지 내용 관련 부분) ... -->
  <div class="box list_img_box">
      <img id="im" class="list_img_size" src=".${order.imagePath}" alt="menu_image"/>
  </div>
  <!--여기까지-->
  <div class="list_content_info">
      <div class="container text-center">
          <div class="row content_title" style="height: ${order.menu_num >= 600 ? '30%' : '20%'};">
              <div class="col-7 menu_name">${order.menu_name}</div> <!--메뉴 이름 출력-->
              <div class="col-5 menu_cost">&nbsp;총: ${order.total_price}원</div> <!--메뉴 가격 출력-->
          </div>
          <!--옵션 데이터-->
          <div class="row list_option" style="visibility: ${order.menu_num >= 600 ? 'hidden' : 'visible'}; height: ${order.menu_num >= 600 ? '30%' : '55%'}">
              <div class="list_option_detail">
                  <div class="row option_detail">
                      <div class="col-6">
                          <span class="option_name">온도: </span>
                          <span class="select_tem">${order.op_t === 1 ? '뜨거움' : '차가움'}</span>
                      </div>
                      <div class="col-6">
                          <span class="option_name">크기: </span>
                          <span class="select_size">${order.op_s === 3 ? '기본 크기' : '큰 크기'}</span>
                      </div>
                  </div>
                  <div class="menu_option_box">
                      <span class="option_name">추가 옵션: </span>
                      <span class="select_op">${order.options.length > 0 ? order.options.map(op => op.op_name).join(', ') : '없음'}</span>
                  </div>
              </div>
          </div>
          <div class="row list_buttons">
              <div class="col-4 button_box_num">
                  <p class="button_num">${order.count}개</p>
              </div>
              <div class="col-8" style="padding: 0px; height: 100%;">
                  <div class="content_update_button">
                      <button class="updateBtn" data-orderNum="${order.order_num}">수정</button>
                      <button class="deleteBtn" data-orderNum="${order.order_num}">삭제</button>
                  </div>
              </div>
          </div>
      </div>
  </div>
`;

  return orderItem;
}

function findParentOrderItem(element) {
  let parent = element.parentElement;
  while (parent) {
    if (parent.classList.contains("list_content_box")) {
      return parent;
    }
    parent = parent.parentElement;
  }
  return null;
}

function addOrdersToDOM(orders) {
  let orderList = document.querySelector('.list_box');

  orders.forEach(order => {
    const orderItem = createOrderItem(order);
    orderList.appendChild(orderItem);

    const splitBorderDiv = document.createElement('div');
    splitBorderDiv.className = "split_border";
    orderList.appendChild(splitBorderDiv);
  });

  //수정 버튼
  const selectBtn = document.querySelectorAll(".updateBtn");
  selectBtn.forEach(selectBtn => {
    selectBtn.addEventListener("click", function () {
      console.log("수정 버튼 눌림");
      // 클릭된 버튼의 data-orderNum 값을 가져옴
      const orderNum = this.getAttribute('data-orderNum');
      //window.location.href = `http://localhost:3001/detail_menu/jojo_o.html?orderNum=${orderNum}`;
      console.log("주문번호:", orderNum);
      // 먼저 모달 컨테이너를 비웁니다.
      document.getElementById("modalContainer").innerHTML = "";

      // help_msg.css를 제거합니다.
      const detailMenuLink = document.querySelector('link[href="http://localhost:3001/help_msg/help_msg.css"]');
      const urlParams = new URLSearchParams(window.location.search);//09.09 추가함
      const pickup = urlParams.get('pickup');
      const order = urlParams.get('order');
      if (detailMenuLink) {
        detailMenuLink.remove();
      }
      if (order == 'slow') {
        history.pushState(null, null, `http://localhost:3001/last_checklist/checklist.html?order=slow&pickup=${pickup}&orderNum=${orderNum}`);
      } else {
        history.pushState(null, null, `http://localhost:3001/last_checklist/checklist.html?order=basic&pickup=${pickup}&orderNum=${orderNum}`);
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
        })
        .catch(error => {
          console.error("콘텐츠를 가져오는 중 오류가 발생했습니다:", error);
        });
    });
  });

  // 삭제 버튼
  const deleteBtn = document.querySelectorAll(".deleteBtn");
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
}

//08.19수정 이 코드를 위에 추가 (전역 변수 선언)
let totalAmount = 0;

// 아래 코드를 document.addEventListener("DOMContentLoaded", ...)` 내에 추가

fetch('/getOrderData')
  .then(response => response.json())
  .then(data => {
    addOrdersToDOM(data);
    console.log("Session data:", JSON.stringify(data));
    if(JSON.stringify(data) == " "){
      let orderList = document.querySelector('.list_box');
      orderList.innerHTML=`
      <div class = "no_menu">주문 내역이 없습니다.</div>
      `;
    }

    // 주문 데이터를 가지고 총 금액 계산
    totalAmount = calculateTotalAmount(data);
    updateTotalAmountUI(totalAmount);
  });

// 아래에 코드를 추가 (함수 정의)
function calculateTotalAmount(orders) {
  return orders.reduce((total, order) => total + Number(order.total_price), 0);
}

function updateTotalAmountUI(amount) {
  const totalCostElement = document.querySelector('.total_cost');
  totalCostElement.textContent = amount + '원';
}
//08.19 최종 금액 계산

// 포장 여부 확인

// 09.09 checklist에서 포장 변경시 바로 저장 되게
const radioButtons = document.getElementsByName('listGroupRadio');

// 라디오 버튼의 상태가 변경될 때 호출되는 함수를 정의합니다.
function updateURL() {
  let newParamValue = "";

  // 선택된 라디오 버튼에 따라 newParamValue 값을 설정합니다.
  if (radioButtons[0].checked) {
    newParamValue = "2"; // "먹고가기"가 선택된 경우
  } else if (radioButtons[1].checked) {
    newParamValue = "1"; // "포장하기"가 선택된 경우
  }

  // 현재 URL을 가져옵니다.
  let currentURL = new URL(window.location.href);

  // "pickup" 파라미터를 업데이트합니다.
  currentURL.searchParams.set("pickup", newParamValue);

  // 새 URL로 이동합니다.
  window.history.pushState({}, '', currentURL);
}

// 라디오 버튼의 상태가 변경될 때 updateURL 함수를 호출합니다.
for (const radioButton of radioButtons) {
  radioButton.addEventListener('change', updateURL);
}

// 페이지 로드 시 라디오 버튼 상태를 URL 파라미터에 맞게 설정합니다.
function checkRadioButton() {
  const urlParams = new URLSearchParams(window.location.search);
  const orderType = urlParams.get('pickup');
  if (orderType === '1') {
    radioButtons[0].checked = false;
    radioButtons[1].checked = true;
  } else {
    radioButtons[0].checked = true;
    radioButtons[1].checked = false;
  }
}

window.addEventListener('load', checkRadioButton);
//09.09추가 끝


