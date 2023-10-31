// script.js

var button = document.querySelector('.circle');

//네비게이션 부분
function selectPage() {
  var URL = new URLSearchParams(window.location.search);
  var order_info = URL.get('order');
  const pickup = URL.get('pickup');//09.08 수정
  const timer = URL.get('timer');//10.17 추가

  if (order_info == 'slow') {
    window.location.href = `http://localhost:3001/BigFrame/BigOrder.html?order=slow&timer=${timer}&pickup=${pickup}`
  } else if (order_info == 'basic') {
    window.location.href = `http://localhost:3001/BasicFrame/BasicOrder.html?order=basic&timer=${timer}&pickup=${pickup}`
  }
}

function navigateclick() {
}

function openPay() {
  var URL = new URLSearchParams(window.location.search);
  var order_info = URL.get('order');
  const pickup = URL.get('pickup');//09.08 수정
  const timer = URL.get('timer');//10.17 추가

  if (order_info == 'slow') {
    window.location.href = `http://localhost:3001/paymethod/paymethod.html?order=slow&timer=${timer}&pickup=${pickup}`
  } else if (order_info == 'basic') {
    window.location.href = `http://localhost:3001/paymethod/paymethod.html?order=basic&timer=${timer}&pickup=${pickup}`
  }
}

//이전 화면으로
function prvsScren() {
  const urlParams = new URLSearchParams(window.location.search);
  const orderType = urlParams.get('order');
  const pickup = urlParams.get('pickup');//09.08 수정
  const timer = urlParams.get('timer');//10.17 추가

  if (orderType == 'slow') {
    // 천천히 주문하기 버튼을 클릭한 경우
    location.href = `http://localhost:3001/BigFrame/BigOrder.html?order=slow&timer=${timer}&pickup=${pickup}`;
  } else if (orderType == 'basic') {
    // 기본 주문하기 버튼을 클릭한 경우
    location.href = `http://localhost:3001/BasicFrame/BasicOrder.html?order=basic&timer=${timer}&pickup=${pickup}`;
  }
};

// 처음으로
function firstScreen() {
  // 새로운 페이지로 이동
  window.location.href = "http://localhost:3001/selectorder/selectorder.html";
};

//다음으로
function nextScreen() {
  const urlParams = new URLSearchParams(window.location.search);
  const orderType = urlParams.get('order');
  const pickup = urlParams.get('pickup');//09.08 수정
  const timer = urlParams.get('timer');//10.17 추가

  if (orderType == 'slow') {
    // 천천히 주문하기 버튼을 클릭한 경우
    location.href = `http://localhost:3001/paymethod/paymethod.html?order=slow&timer=${timer}&pickup=${pickup}`;
  } else if (orderType == 'basic') {
    // 기본 주문하기 버튼을 클릭한 경우
    location.href = `http://localhost:3001/paymethod/paymethod.html?order=basic&timer=${timer}&pickup=${pickup}`;
  }
}


// // 다음
// function nextScreen() {
//   // 새로운 페이지로 이동
//   const urlParams = new URLSearchParams(window.location.search);
//   const orderType = urlParams.get('order');
//   const pickup = urlParams.get('pickup');//09.08 수정

//   if (orderType == 'slow') {
//     // 천천히 주문하기 버튼을 클릭한 경우
//     location.href = `http://localhost:3001/paymethod/paymethod.html?order=slow&pickup=${pickup}`;
//   } else if (orderType == 'basic') {
//     // 기본 주문하기 버튼을 클릭한 경우
//     location.href = `http://localhost:3001/paymethod/paymethod.html?order=basic&pickup=${pickup}`;
//   }
// };

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
        <source src="../help_video/checklist.mp4" type="video/mp4">
            관리자를 호출해주세요.
        </video>

        <section class="content_explain"style="height: 60%;">

              1. 결제 전 주문 목록에 담은 메뉴를 확인할 수 있습니다.<br>
              2. 옵션변경을 누르시면 개수, 온도, 크기, 추가 사항을 변경할 수 있습니다.<br>
              3. 오른쪽에 보이는 'x'를 누르시면 메뉴를 삭제할 수 있습니다.<br>
              4. 오른쪽에 보이는 '포장', '매장' 선택을 변경할 수 있습니다.<br>
              5. 상단에 보이는 네비게이션에서 '메뉴 선택'을 누르시면 메뉴 주문 화면으로 이동합니다.<br>
              6. '최종 결제'를 누르시면 카드, 쿠폰 선택 화면으로 이동합니다.<br>
              7. 하단의 '이전으로'를 누르시면 메뉴 주문 화면으로 이동합니다.<br>
              8. '결제하기'를 누르시면 카드, 쿠폰 선택 화면으로 이동합니다.<br>
              9. '처음으로'를 누르시면 첫 화면으로 이동합니다.<br>
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
  const formattedPrice = new Intl.NumberFormat('ko-KR').format(order.total_price);//10.09 쉼표넣기

  // 옵션 정보를 가져옴
  const optionsString = order.options.length > 1
    ? order.options.slice(1).map(op => op.op_name).join(', ')
    : '없음';

  const orderItem = document.createElement('div');
  orderItem.className = 'list_content_box';
  orderItem.innerHTML = `
  <!-- ... (이미지 내용 관련 부분) ... -->
  <div class = "real_content_box">
    <div class="cancel_btn">
        <img src="../icon_img/delete_black_icon.png" class="deleteBtn" data-orderNum="${order.order_num}">
    </div>
    <div class="checklist_box">
    <div class ="checklist_box_inner">
        <div class="list_img_box">
          <div class = "list_img_size_box">
            <img id="im" class="list_img_size" src=".${order.imagePath}" alt="menu_image"/>
          </div>
        </div>


        <!--여기까지-->
        <div class="list_content_info">
            <div class="container text-center">
                <div class="content_title">
                    <div class="title_cost">
                      <div class="menu_name">${order.menu_name}</div> <!--메뉴 이름 출력-->
                      <div class="menu_cost">${formattedPrice}원</div> <!--메뉴 가격 출력-->
                    </div>
                </div>
                
                <!--옵션 데이터-->
                <!--<div class="list_option" style="visibility: ${order.menu_num >= 500 ? 'hidden' : 'visible'}; height: ${order.menu_num >= 500 ? '0%' : '55%'}">-->
                <div class="list_option" ${order.menu_num >= 500 ? 'style="display: none;"' : 'disabled'}>
                    <div class="list_option_detail">
                        <div class="option_detail">
                            <span class="select_tem">${order.op_t === 1 ? '뜨거움' : '차가움'}(+0원)</span>
                            <span class="select_size">${order.op_s === 3 ? '기본 크기' : '큰 크기'}(${order.op_s === 3 ? '+0원' : '+1200원'})</span>
                            <span class="select_op">
                                <!-- 여기에 각 옵션을 처리하는 반복문 추가 -->
                                ${order.options.length > 1 ? order.options.slice(1).map(op => `<div class="select_op">${op.op_name}(+${op.op_price}원)</div>`).join('') : '<div class="select_op">추가사항: 없음</div>'}
                            </span>
                        </div>
                    </div>
                    <div class="cost_info">
                        <div class="button_box_num">
                          <p class="button_num">${order.count}개</p>
                        </div>
                    </div>
                </div>
                    <div class="list_buttons">
                        <div class="content_update_button">
                            <button class="updateBtn" data-orderNum="${order.order_num}">옵션변경</button>
                        </div>
                </div>
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
  let none_msg = document.querySelectorAll('.speech-bubble');
  let pay_move = document.querySelector('.move_pay_page');
  let pay_button = document.querySelector('.bottom_button_box');
  // let pay_circle = document.querySelector('.pay_circle');

  if (orders.length === 0) {
    // 주문 목록이 비어 있는 경우 메시지를 추가합니다.
    orderList.innerHTML = `
      <div class='no_menu'>주문 내역이 없습니다.</div>
    `;
    none_msg.forEach((element) => {
      element.style.visibility = 'visible';
    });

    // pay_move 버튼의 클릭 이벤트를 막음
    if (pay_move) {
      pay_move.onclick = function (event) {
        event.preventDefault(); // 클릭 이벤트를 막음
      };

      // 배경색 변경
      pay_move.style.color = "#BBBBBB";
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
    orders.forEach(order => {
      const orderItem = createOrderItem(order);
      orderList.appendChild(orderItem);

      const splitBorderDiv = document.createElement('div');
      splitBorderDiv.className = "split_border";
      orderList.appendChild(splitBorderDiv);
    });

    // pay_move 버튼 활성화 (옵션: 주문 목록이 비어 있지 않을 때 활성화)
    if (pay_move) {
      pay_move.disabled = false;
    }
  }

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
      const timer = urlParams.get('timer');//10.17 추가
      const order = urlParams.get('order');
      if (detailMenuLink) {
        detailMenuLink.remove();
      }
      if (order == 'slow') {
        history.pushState(null, null, `http://localhost:3001/last_checklist/checklist.html?order=slow&timer=${timer}&pickup=${pickup}&orderNum=${orderNum}`);
      } else {
        history.pushState(null, null, `http://localhost:3001/last_checklist/checklist.html?order=basic&timer=${timer}&pickup=${pickup}&orderNum=${orderNum}`);
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
}

//08.19수정 이 코드를 위에 추가 (전역 변수 선언)
let totalAmount = 0;

// 아래 코드를 document.addEventListener("DOMContentLoaded", ...)` 내에 추가

fetch('/getOrderData')
  .then(response => response.json())
  .then(data => {
    addOrdersToDOM(data);
    console.log("Session data:", JSON.stringify(data));
    if (JSON.stringify(data) === null) {
      let orderList = document.querySelector('.list_box');
      orderList.innerHTML = `
      <div class = "no_menu">주문 내역이 없습니다.</div>
      `;
    }

    // 주문 데이터를 가지고 총 금액 계산
    totalAmount = calculateTotalAmount(data);
    updateTotalAmountUI(totalAmount);

    localStorage.setItem('myTotalCost', JSON.stringify(totalAmount));
  });

// 아래에 코드를 추가 (함수 정의)
function calculateTotalAmount(orders) {
  return orders.reduce((total, order) => total + Number(order.total_price), 0);
}

function updateTotalAmountUI(amount) {
  const formattedPrice = new Intl.NumberFormat('ko-KR').format(amount);//10.09 가격 쉼표 넣기
  const totalCostElement = document.querySelector('.total_cost');
  totalCostElement.textContent = formattedPrice + '원';//10.09 가격 쉼표 넣기
}
//08.19 최종 금액 계산

// 포장 여부 확인

// 라디오 버튼의 상태가 변경될 때 호출되는 함수를 정의합니다.
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
//09.09추가 끝


