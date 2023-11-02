$(document).ready(function () {
  //서버와 연동
  const urlParams = new URLSearchParams(window.location.search);
  const orderNum = urlParams.get("orderNum");

  //09.09 추가
  let op_num_o = [];

  // orderNum 변수가 정상적으로 가져와졌는지 확인
  if (orderNum) {
    // 가져온 orderNum을 기반으로 fetch 요청을 수행
    fetch(`/order/${orderNum}`)
      .then(response => response.json())
      .then(data => {
        if (data.menu_num >= 500) {
          const boxx = document.querySelector('.op_box');
          boxx.style.display = "none";
          const modal_size = document.querySelector('.modal-content')
          modal_size.style.height = "auto";
        }
        if (data && Array.isArray(data.op_num)) {
          // 데이터가 유효하고 op_num이 배열인 경우에만 처리
          op_num_o = data.op_num; // op_num_o를 서버에서 받아온 데이터로 설정
          toggleTemperatureOptions();
          toggleSizeOptions();
          console.log(op_num_o); // 데이터가 올바르게 할당되었는지 확인
        } else {
          console.error("서버에서 받아온 데이터가 올바르지 않습니다.");
        }
      })
      .catch(error => console.error(error));
  } else {
    console.error("orderNum이 URL에서 정의되지 않았습니다.");
  }
  //09.13수정
  // 온도 옵션을 표시하거나 숨기는 함수
  function toggleTemperatureOptions() {
    const t_firstRadioContainer = document.getElementById("t_firstRadioContainer");
    const t_secondRadioContainer = document.getElementById("t_secondRadioContainer");

    // op_num_o 배열에 값 1이 있는지 확인합니다.
    if (op_num_o.includes(1)) {
      t_firstRadioContainer.style.display = "block";
      t_firstRadioContainer.querySelector("input[type='radio']").disabled = false; // 비활성화 상태를 해제합니다.
      t_firstRadioContainer.querySelector("label.form-check-label").classList.remove("disabled-label");
      t_firstRadioContainer.querySelector("label.form-check-label").onclick = null;
    } else {
      t_firstRadioContainer.style.display = "block";
      t_firstRadioContainer.querySelector("input[type='radio']").disabled = true; // 비활성화 상태로 설정합니다
      t_firstRadioContainer.querySelector("label.form-check-label").classList.add("disabled-label");
      t_firstRadioContainer.querySelector("label.form-check-label").onclick = function () {
        show_qr('t')
      };
    }

    // op_num_o 배열에 값 2가 있는지 확인합니다.
    if (op_num_o.includes(2)) {
      t_secondRadioContainer.style.display = "block";
      t_secondRadioContainer.querySelector("input[type='radio']").disabled = false; // 비활성화 상태를 해제합니다.
      t_secondRadioContainer.querySelector("label.form-check-label").classList.remove("disabled-label");
      // 삭제: onclick 핸들러를 제거
      t_secondRadioContainer.querySelector("label.form-check-label").onclick = null;
    } else {
      t_secondRadioContainer.style.display = "block";
      t_secondRadioContainer.querySelector("input[type='radio']").disabled = true; // 비활성화 상태로 설정합니다.
      t_secondRadioContainer.querySelector("label.form-check-label").classList.add("disabled-label");
      t_secondRadioContainer.querySelector("label.form-check-label").onclick = function () {
        show_qr('t')
      };
    }

    const speechBubble = document.querySelector('.temp');
    const speechBubbleContent = speechBubble.querySelector('div');

    if (!op_num_o.includes(1)) {
      speechBubbleContent.textContent = '차가운 것만 가능한 상품입니다.';
    } else if (!op_num_o.includes(2)) {
      speechBubbleContent.textContent = '따뜻한 것만 가능한 상품입니다.';
    } else {
      speechBubbleContent.textContent = '원하는 것을 선택해주세요.';
    }
  }

  // 크기 옵션을 표시하거나 숨기는 함수
  function toggleSizeOptions() {
    const s_firstRadioContainer = document.getElementById("s_firstRadioContainer");
    const s_secondRadioContainer = document.getElementById("s_secondRadioContainer");

    // op_num_o 배열에 값 3이 있는지 확인합니다.
    if (op_num_o.includes(3)) {
      s_firstRadioContainer.style.display = "block";
      s_firstRadioContainer.querySelector("input[type='radio']").disabled = false; // 비활성화 상태를 해제합니다.
      s_firstRadioContainer.querySelector("label.form-check-label").classList.remove("disabled-label");
      // 삭제: onclick 핸들러를 제거
      s_firstRadioContainer.querySelector("label.form-check-label").onclick = null;
    } else {
      s_firstRadioContainer.style.display = "block";
      s_firstRadioContainer.querySelector("input[type='radio']").disabled = true; // 비활성화 상태로 설정합니다
      s_firstRadioContainer.querySelector("label.form-check-label").classList.add("disabled-label");
      s_firstRadioContainer.querySelector("label.form-check-label").onclick = function () {
        show_qr('s');
      };
    }

    // op_num_o 배열에 값 4가 있는지 확인합니다.
    if (op_num_o.includes(4)) {
      s_secondRadioContainer.style.display = "block";
      s_secondRadioContainer.querySelector("input[type='radio']").disabled = false; // 비활성화 상태를 해제합니다.
      s_secondRadioContainer.querySelector("label.form-check-label").classList.remove("disabled-label");
      // 삭제: onclick 핸들러를 제거
      s_secondRadioContainer.querySelector("label.form-check-label").onclick = null;
    } else {
      s_secondRadioContainer.style.display = "block";
      s_secondRadioContainer.querySelector("input[type='radio']").disabled = true; // 비활성화 상태로 설정합니다
      s_secondRadioContainer.querySelector("label.form-check-label").classList.add("disabled-label");
      s_secondRadioContainer.querySelector("label.form-check-label").onclick = function () {
        show_qr('s');
      };
    }

    const speechBubble = document.querySelector('.size');
    const speechBubbleContent = speechBubble.querySelector('div');

    if (!op_num_o.includes(3)) {
      speechBubbleContent.textContent = '큰 것만 가능한 상품입니다.';
    } else if (!op_num_o.includes(4)) {
      speechBubbleContent.textContent = '기본 크기만 가능한 상품입니다.';
    } else {
      speechBubbleContent.textContent = '원하는 크기를 선택해주세요.';
    }
  }
  //09.13여기까지

  // 초기에 op_num_o에 기반하여 옵션의 가시성을 설정하는 함수를 호출합니다.
  toggleTemperatureOptions();
  toggleSizeOptions();
  //09.09 여기까지

  //sql연동부분
  // "추가" 버튼 클릭 이벤트 핸들러
  $(".btn-info").click(function () {
    // 주문 번호를 가져옴 (이 부분은 필요한 정보를 가져오는 방식에 따라 조정해야 함)
    const orderNum = new URLSearchParams(window.location.search).get("orderNum"); // 주문 번호 가져오는 함수를 정의해야 함

    if (orderNum) {
      // 주문 정보 업데이트 함수 호출
      updateOrder(orderNum);
    } else {
      console.error("주문 번호를 찾을 수 없습니다.");
    }
    location.reload();
  });

  // updateOrder 함수 정의
  function updateOrder(orderNum) {
    const newData = {
      // 업데이트할 필드들의 값을 적절히 가져와 newData 객체에 넣어줘야 함
      count: parseInt($("#quantity").val()),
      op_t: $("input[name='temperature']:checked").val() === "1" ? 1 : $("input[name='temperature']:checked").val() === "2" ? 2 : 1000,//10.15수정
      op_s: $("input[name='size']:checked").val() === "3" ? 3 : $("input[name='size']:checked").val() === "4" ? 4 : 1000,//10.15수정
      op1: $("input[name='option_set_1']").prop('checked') ? 5 : 0,
      op2: $("input[name='option_set_2']").prop('checked') ? 6 : 0,
      op3: $("input[name='option_set_3']").prop('checked') ? 7 : 0,
      op4: $("input[name='option_set_4']").prop('checked') ? 8 : 0,
      op5: $("input[name='option_set_5']").prop('checked') ? 9 : 0,
      op6: $("input[name='option_set_6']").prop('checked') ? 10 : 0,
      op7: $("input[name='option_set_7']").prop('checked') ? 11 : 0,
      op8: $("input[name='option_set_8']").prop('checked') ? 12 : 0
    };

    // 서버로 업데이트 요청을 보냄
    fetch('/updateOrder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        orderNum: orderNum,
        newData: newData
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          console.log("주문 정보가 성공적으로 업데이트되었습니다.");
          // TODO: 업데이트 성공 시 수행할 작업을 추가
        } else {
          console.log("주문 정보 업데이트에 실패했습니다.");
        }
      })
      .catch(error => {
        console.error("주문 정보 업데이트 중 오류 발생:", error);
      });
  }
  //sql연동 끝

  /*------------------------tb_order-----------------------------------------------------------------------------------------------------------*/
  //08.17 tb_order와 연동 (서버로부터 주문 정보를 요청합니다.) - 클라이언트 측에서 주문 정보를 가져오고 처리하는 코드
  fetch(`/order/${orderNum}`)
    .then(response => response.json())
    .then(orderData => {
      console.log(orderData); // 서버에서 받은 주문 데이터를 확인해보세요
      handleOrderData(orderData); // 주문 데이터 처리 함수 호출

      // count 값을 가져와서 quantity input 요소의 초기 값으로 설정
      const quantityInput = document.getElementById("quantity");
      quantityInput.value = orderData.count || 1;

      // 주문 데이터를 기반으로 옵션 설정
      setOptionsFromOrderData(orderData);
      const orderNum = orderData.order_num; // order_num 가져오기
      fetchTotalPrice(orderNum);//10.16 추가s
    })
    .catch(error => {
      console.error("Error fetching order data:", error);
    });

  function fetchTotalPrice(orderNum) {
    fetch('/getOrderData')
      .then(response => response.json())
      .then(data => {
        console.log("Session data:", JSON.stringify(data));

        updateTotalAmountUI(data, orderNum);
      });
  }
  function updateTotalAmountUI(getOrder, orderNum) { //현재 total_price
    const order = getOrder.find(order => order.order_num === orderNum); // 주문 번호에 해당하는 데이터 찾기
    console.log(order);
    if (order) {
      const CommitPrice = new Intl.NumberFormat('ko-KR').format(order.total_price); // 가격 쉼표 넣기
      $(`.EI_menu_cost`).text(`${CommitPrice}원`);
    }
  }

  // 주문 데이터를 처리하고 렌더링하는 함수
  function handleOrderData(orderData) {
    console.log(orderData);
    // renderOrderDetail 함수를 호출하여 주문 데이터를 렌더링합니다.
    renderOrderDetail(orderData);
  }

  // 옵션 데이터를 주문 데이터에 따라 설정하는 함수
  function setOptionsFromOrderData(orderData) {
    const op_t = orderData.op_t;
    const op_s = orderData.op_s;


    // 온도 옵션 라디오 버튼 선택
    if (op_t !== 1000) {
      $(`input[name='temperature'][value='${op_t}']`).prop("checked", true);
    } else {
      $(`input[name='temperature']`).prop("checked", false);
    }

    // 크기 옵션 라디오 버튼 선택
    if (op_s !== 1000) {
      $(`input[name='size'][value='${op_s}']`).prop("checked", true);
    } else {
      $(`input[name='size']`).prop("checked", false);
    }

    // 옵션 체크박스 선택
    const optionValues = [5, 6, 7, 8, 9, 10, 11, 12]; // 체크박스에 해당하는 값들
    for (let i = 0; i < optionValues.length; i++) {
      const op_value = optionValues[i];
      const op_key = `op${i + 1}`;
      const checkboxId = `${op_value}Checkbox`;

      if (orderData[op_key] === op_value) {
        $(`input[id='${checkboxId}']`).prop("checked", true);
      }
    }
  }

  // 옵션 선택과 관련된 함수
  function handleOptionChange() {
    const op_t = $("input[name='temperature']:checked").val();
    const op_s = $("input[name='size']:checked").val();
    const op_checkboxes = $("input[name^='option']:checked");

    console.log("op_t:", op_t);
    console.log("op_s:", op_s);

    op_checkboxes.each(function () {
      const op_value = $(this).val();
      console.log("option", op_value, "is checked");
    });

    // 이후에 원하는 동작을 수행
  }

  // 온도 옵션 라디오 버튼
  $("input[name='temperature']").change(handleOptionChange);

  // 크기 옵션 라디오 버튼
  $("input[name='size']").change(handleOptionChange);

  // 옵션 체크박스
  $("input[name^='option']").change(handleOptionChange);

});

// 08.17 tb_order와 연동 (주문 정보를 출력하는 함수)
function renderOrderDetail(orderData) {
  const menuTitle = document.querySelector(".menu_title");
  // const menuCost = document.querySelector(".EI_menu_cost");
  const menuDescription = document.querySelector(".menu_description");

  const menuImage = document.querySelector(".menu_img_size");
  menuImage.src = `.${orderData.picture}`;//09.15
  menuImage.alt = orderData.menu_name;

  menuTitle.textContent = orderData.menu_name;
  // menuCost.textContent = `가격: ${orderData.menu_price}원`;
  menuDescription.textContent = orderData.menu_explan;

  const allegyList = document.querySelector(".allegy_list");
  allegyList.innerHTML = orderData.allergy_names
  if (orderData.allergy_names == 0) {
    allegyList.innerHTML = `<li>없음</li>`
  } else {
    allegyList.innerHTML = orderData.allergy_names
      .map(allegyName => `<li>${allegyName}</li>`)
      .join(", ");
  }

  // (메뉴가격+사이즈+옵션1~8)*갯수 = 실시간 반영 10.16 추가 시작------------------------------------------------------
  function updatePrice() {
    const MenuPrice = parseInt(orderData.menu_price); // 기본 메뉴 가격

    let selectedOpSPrice = 0; // op_s의 추가 가격
    let selectedOpPrices = [0, 0, 0, 0, 0, 0, 0, 0]; // 각 op의 추가 가격

    // op_s의 선택 여부에 따라 가격을 업데이트
    const selectedOpS = $("input[name='size']:checked").val();
    if (selectedOpS === "4") {
      selectedOpSPrice = 1200;
    }

    // 각 op의 선택 여부에 따라 가격을 업데이트
    for (let i = 1; i <= 8; i++) {
      const opCheckbox = $(`input[name='option_set_${i}']`);
      const opPrice = opCheckbox.is(':checked') ? parseInt(opCheckbox.attr('data-price')) : 0;
      selectedOpPrices[i - 1] = opPrice;
      //console.log(`op${i} 가격: ${opPrice}`);
    }

    const inputVal = parseInt($("#quantity").val()); // input 값

    // 총 가격 계산
    const TotalPrice = (MenuPrice + selectedOpSPrice + selectedOpPrices.reduce((a, b) => a + b, 0)) * inputVal;
    const EI_TotalPrice = new Intl.NumberFormat('ko-KR').format(TotalPrice); // 가격 쉼표 넣기

    console.log(`현재금액 : ${TotalPrice}원`);
    // 계산된 총 가격을 원하는 위치에 표시합니다.
    $('.EI_menu_cost').text(`${EI_TotalPrice}원`);
  }

  $(".input-group").on("click", "#increment1", function () {
    var input = $(this).closest(".input-group").find("input");
    updatePrice();
    console.log(input.val());
  });

  $(".input-group").on("click", "#decrement1", function () {
    var input = $(this).closest(".input-group").find("input");
    updatePrice();
    console.log(input.val());
  });

  // 라디오 박스 변경 이벤트 핸들러를 추가합니다.
  $("input[type='radio']").on("change", function () {
    updatePrice(); // 가격 업데이트
  });

  // 체크 박스 변경 이벤트 핸들러를 추가합니다.
  $("input[type='checkbox']").on("change", function () {
    updatePrice(); // 가격 업데이트
  });

  // 초기 가격을 표시합니다.
  updatePrice();//10.16추가 끝--------------------------------------------------------
}

$(".input-group").on("click", "#increment1", function () {
  // .input-group 클래스를 가진 요소 내에서 #increment 버튼을 클릭했을 때 실행되는 함수
  var input = $(this).closest(".input-group").find("input");
  // 클릭한 버튼이 속한 .input-group 내에서 input 요소를 찾음
  if (parseInt(input.val()) < 10) {
    input.val(parseInt(input.val()) + 1);
  }
});

$(".input-group").on("click", "#decrement1", function () {
  var input = $(this).closest(".input-group").find("input");
  if (parseInt(input.val()) > 1) {
    input.val(parseInt(input.val()) - 1);
  }
});

function show_qr(op) {
  const temp_qu = document.querySelector('.temp');
  const size_qu = document.querySelector('.size');

  switch (op) {
    case 't':
      if (temp_qu.style.visibility === 'hidden') {
        temp_qu.style.visibility = 'visible';
      } else {
        temp_qu.style.visibility = 'hidden';
      }
      break;
    case 's':
      if (size_qu.style.visibility === 'hidden') {
        size_qu.style.visibility = 'visible';
      } else {
        size_qu.style.visibility = 'hidden';
      }
      break;
  }
}