$(".input-group").on("click", "#increment", function () {
  // .input-group 클래스를 가진 요소 내에서 #increment 버튼을 클릭했을 때 실행되는 함수
  var input = $(this).closest(".input-group").find("input");
  // 클릭한 버튼이 속한 .input-group 내에서 input 요소를 찾음
  if (parseInt(input.val()) < 10) {   //최대 주문 수량 10개 막기
    input.val(parseInt(input.val()) + 1);
  }
});

$(".input-group").on("click", "#decrement", function () {
  var input = $(this).closest(".input-group").find("input");
  if (parseInt(input.val()) > 1) {
    input.val(parseInt(input.val()) - 1);
  }
});

$(".btn-info").click(function () {
  const selectedMenuNum = new URLSearchParams(window.location.search).get("menuId");
  const selectedCount = parseInt($("#quantity").val());

  // 옵션 값 설정
  const selectedOptions = {
    op_t: $("input[name='temperature']:checked").val() === "HOT" ? 1 : $("input[name='temperature']:checked").val() === "ICED" ? 2 : 1000,
    op_s: $("input[name='size']:checked").val() === "Basic Size" ? 3 : $("input[name='size']:checked").val() === "Large Size" ? 4 : 1000,
    op1: $("input[name='option_set_1']").prop('checked') ? 5 : 0,
    op2: $("input[name='option_set_2']").prop('checked') ? 6 : 0,
    op3: $("input[name='option_set_3']").prop('checked') ? 7 : 0,
    op4: $("input[name='option_set_4']").prop('checked') ? 8 : 0,
    op5: $("input[name='option_set_5']").prop('checked') ? 9 : 0,
    op6: $("input[name='option_set_6']").prop('checked') ? 10 : 0,
    op7: $("input[name='option_set_7']").prop('checked') ? 11 : 0,
    op8: $("input[name='option_set_8']").prop('checked') ? 12 : 0
  };

  fetch(`/menu_e/${selectedMenuNum}`)//tb_order가지고 오기
    .then(response => response.json())
    .then(menuData => {
      console.log("주문 가져옴 : ", menuData.orders);
      const menuOrders = menuData.orders;

      const matchingOrder = menuOrders.find(order => {//tb_order와 주문목록 비교
        return (
          order.menu_num === parseInt(selectedMenuNum) &&
          order.op_t === selectedOptions.op_t &&
          order.op_s === selectedOptions.op_s &&
          order.op1 === selectedOptions.op1 &&
          order.op2 === selectedOptions.op2 &&
          order.op3 === selectedOptions.op3 &&
          order.op4 === selectedOptions.op4 &&
          order.op5 === selectedOptions.op5 &&
          order.op6 === selectedOptions.op6 &&
          order.op7 === selectedOptions.op7 &&
          order.op8 === selectedOptions.op8
        );
      });

      if (matchingOrder) {
        const orderNumToUpdate = matchingOrder.order_num;
        fetch(`/updateCount/${orderNumToUpdate}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            count: matchingOrder.count + selectedCount
          })
        })
          .then(response => response.json())
          .then(data => {
            if (data.success) {
              console.log("주문 업데이트 성공");
            } else {
              console.log("주문 업데이트 실패");
            }
          })
          .catch(error => {
            console.error("주문 업데이트 중 오류 발생:", error);
          });
      } else {
        fetch('/addOrder_e', {// 서버로 주문 정보 전송
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            menu_num: selectedMenuNum,
            count: selectedCount,
            ...selectedOptions
          })
        })
          .then(response => response.json())
          .then(data => {
            if (data.success) {
              console.log("주문이 성공적으로 저장되었습니다.");
              console.log("메뉴 번호:", selectedMenuNum);
              console.log("갯수:", selectedCount);
              console.log("온도 옵션:", selectedOptions.op_t);
              console.log("크기 옵션:", selectedOptions.op_s);
              for (let i = 1; i <= 8; i++) {
                console.log(`옵션${i}:`, selectedOptions[`op${i}`]);
              }
            } else {
              console.log("주문 저장에 실패했습니다.");
            }
          })
          .catch(error => {
            console.error("주문 저장 중 오류 발생:", error);
          });
      }
      //sql연동 끝
      location.reload();
    })
    .catch(error => {
      console.error("주문 데이터를 불러오는 중 오류 발생:", error);
    });
});


// 서버로부터 메뉴 정보를 요청합니다.
// 메뉴 정보를 출력하는 함수
function renderMenuDetail(menuData) {
  const menuTitle = document.querySelector(".menu_title");
  const menuDescription = document.querySelector(".menu_explain_detail");
  const menuImage = document.querySelector(".menu_img_size");

  menuTitle.textContent = menuData.menuData.menu_name;
  menuDescription.textContent = menuData.menuData.menu_explan;

  const img_pp = `.${menuData.image_path}`
  menuImage.src = img_pp;
  menuImage.alt = menuData.menu_name;

  // 알레르기 정보 출력
  const allegyList = document.querySelector(".allegy_list");
  allegyList.innerHTML = menuData.allegy_names
  if (menuData.allegy_names == 0) {
    allegyList.innerHTML = `<li>None</li>`
  } else {
    allegyList.innerHTML = menuData.allegy_names
      .map(allegyName => `<li>${allegyName}</li>`)
      .join(", ");
  }

  // 옵션 정보 출력
  const container_box = document.querySelector(".op_box");
  const optionContainers = document.querySelectorAll(".option_inner_bow");

  let option_t;

  // 각 옵션 컨테이너마다 처리
  optionContainers.forEach((container, index) => {
    const optionList = container.querySelector(".list-group");
    let currentSet = 0; // 현재 세트 번호

    // DB에서 가져온 옵션 데이터가 없을 경우 컨테이너 숨김
    const all_modal = document.querySelector(".modal-dialog");
    if (menuData.op_data.length == 0) {
      all_modal.style.height = "auto";
      container_box.style.display = "none";
      return; // 옵션 데이터 없으면 여기서 종료
    }

    if (index === 0) {
      const temperatureOptions = menuData.op_data
        .filter(option => option.op_name === "HOT" || option.op_name === "ICED");

      let defaultOption = "HOT"; // 기본값 설정
      console.log("temperatureOptions:", temperatureOptions);

      const hasHot = temperatureOptions.some(option => option.op_name === "HOT");
      const hasCold = temperatureOptions.some(option => option.op_name === "ICED");
      const speechBubble = document.querySelector('.temp');
      const speechBubbleContent = speechBubble.querySelector('div');

      let falseoption = "ICED";

      if (!hasHot && hasCold) {
        defaultOption = "ICED";
        falseoption = "HOT";
      }

      if (temperatureOptions.some(option => option.op_name === "HOT") && temperatureOptions.some(option => option.op_name === "ICED")) {
        speechBubbleContent.textContent = 'Pick what you want.'
        optionList.innerHTML = temperatureOptions
          .map(option => {
            const checkedAttribute = option.op_name === defaultOption ? "checked" : "";
            const textColor = option.op_name === "HOT" ? "red" : "blue"; // HOT은 빨간색, ICED은 파란색
            option_t = textColor;
            const imageSrc = option.op_name == "HOT" ? "../icon_img/hot_drink_small.png" : "../icon_img/ice_drink.png"
            return `<li class="list-group-item"><input class="form-check-input me-1" type="radio" name="temperature"  id="${option.op_name}" value="${option.op_name}" ${checkedAttribute}>
              <label class="form-check-label" for="${option.op_name}" style="color: ${textColor};">
              ${option.op_name} (+${option.op_price})
              <img src="${imageSrc}" />
              </label></li>
              `;
          })
          .join("");
      } else {
        // "뜨거움"이나 "차가움" 중 하나만 없는 경우
        if (!hasHot) {
          speechBubbleContent.textContent = 'Only ICED product.';
        } else {
          speechBubbleContent.textContent = 'Only HOT product.';
        }

        optionList.innerHTML = temperatureOptions
          .map(option => {
            const checkedAttribute = option.op_name === defaultOption ? "checked" : "";
            const textColor = option.op_name === "HOT" ? "red" : "blue"; // HOT은 빨간색, ICED은 파란색
            option_t = textColor;
            const imageSrc = option.op_name === "HOT" ? "../icon_img/hot_drink_small.png" : "../icon_img/ice_drink.png";
            const falseoptionText = falseoption === "HOT" ? "HOT" : "ICED"; // falseoption 변수에 따라 출력할 문자 설정
            const falseimageSrc = falseoption === "HOT" ? "../icon_img/hot_drink_small.png" : "../icon_img/ice_drink.png";
            return `<li class="list-group-item"><input class="form-check-input me-1" type="radio" name="temperature"  id="${option.op_name}" value="${option.op_name}" ${checkedAttribute}>
                  <label class="form-check-label" for="${option.op_name}" style="color: ${textColor}; border-color:${textColor}">
                      ${option.op_name} (+${option.op_price})
                      <img src="${imageSrc}" />
                  </label></li>
                  <li class="list-group-item"><input class="form-check-input me-1 falseoption" type="radio" name="temperature"  id="falseoption" disabled="true">
                  <label class="form-check-label" for="falseoption" onclick=show_qr('t')> ${falseoptionText} (+0)
                  <img src="${falseimageSrc}" />
                  </label></li>
                  `;
          })
          .join("");
      }
    } else if (index === 1) {
      const sizeOptions = menuData.op_data
        .filter(option => option.op_name === "Basic Size" || option.op_name === "Large Size");
    
      let defaultOption = "Basic Size"; // 기본값 설정
      console.log("sizeOptions:", sizeOptions);
    
      const hasRegular = sizeOptions.some(option => option.op_name === "Basic Size");
      const hasLarge = sizeOptions.some(option => option.op_name === "Large Size");
    
      let falseoption = "Large Size";
    
      if (!hasRegular && hasLarge) {
        defaultOption = "Large Size";
        falseoption = "Basic Size";
      }

      const imageSrc = option_t === "red" ? "../icon_img/hot_drink_small.png" : "../icon_img/ice_drink.png"; // 이미지 경로 설정
      console.log(option_t);

      const speechBubble = document.querySelector('.size');
      const speechBubbleContent = speechBubble.querySelector('div');

      speechBubbleContent.textContent = 'Pick what you want.';

      const radioInputs = document.querySelectorAll('.option_size .list-group-item [type="radio"]');

      radioInputs.forEach(input => {
        input.addEventListener('change', function () {
          const label = this.nextElementSibling; // 라디오 버튼 다음에 위치한 label 요소 선택
          const checkedAttribute = this.checked ? "checked" : "";

          // 선택된 라디오 버튼에 대해서만 color와 border-color 스타일 변경
          label.style.color = checkedAttribute ? option_t : "initial";
          label.style.borderColor = checkedAttribute ? option_t : "initial";
        });
      });

      optionList.innerHTML = sizeOptions
        .map(option => {
          const checkedAttribute = option.op_name === defaultOption ? "checked" : "";
          return `<li class="list-group-item"><input class="form-check-input me-1" type="radio" name="size"  id="${option.op_name}" value="${option.op_name}" ${checkedAttribute}>
            <label class="form-check-label" for="${option.op_name}">${option.op_name} (+${option.op_price})
            <img src="${imageSrc}" />
            </label></li>
            `;
        })
        .join("");

      if (!hasRegular || !hasLarge) {
        optionList.innerHTML += `<li class="list-group-item"><input class="form-check-input me-1" type="radio" name="size"  id="falseoption" value="${falseoption}" disabled="true">
          <label class="form-check-label" for="falseoption" onclick=show_qr('s')> ${falseoption} (+0)
          <img src="${imageSrc}" />
          </label></li>`;

        const speechBubble = document.querySelector('.size');
        const speechBubbleContent = speechBubble.querySelector('div');

        if (!hasRegular) {
          speechBubbleContent.textContent = 'Only Large Size product.';
        } else {
          speechBubbleContent.textContent = 'Only Basic Size product.';
        }
      }
    } else if (index === 2) {
      // 세번째 박스에는 나머지 옵션 중 체크박스 옵션 4개를 넣습니다.
      const checkboxOptions = menuData.op_data
        .filter(option => option.op_name !== "HOT" && option.op_name !== "ICED" && option.op_name !== "Basic Size" && option.op_name !== "Large Size")
        .slice(0, 6); // 첫 4개의 체크박스 옵션 선택

      optionList.innerHTML = checkboxOptions
        .map(option => {
          currentSet++;
          return `<li class="list-group-item chch"><input class="form-check-input me-1" type="checkbox" id="${option.op_name}" name="option_set_${currentSet}" value="${option.op_name}" data-price="${option.op_price}">
          <label class="form-check-label" for="${option.op_name}">${option.op_name} (+${option.op_price})</label></li>`;
        })
        .join("");
    }
  });
  // (메뉴가격+사이즈+옵션1~8)*갯수 = 실시간 반영 시작------------------------------------------------------------------
  function updatePrice() {
    const baseMenuPrice = parseInt(menuData.menuData.price); // 기본 메뉴 가격

    let selectedOpSPrice = 0; // op_s의 추가 가격
    let selectedOpPrices = [0, 0, 0, 0, 0, 0, 0, 0]; // 각 op의 추가 가격

    // op_s의 선택 여부에 따라 가격을 업데이트
    const selectedOpS = $("input[name='size']:checked").val();
    if (selectedOpS === "Large Size") {
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
    const TotalPrice = (baseMenuPrice + selectedOpSPrice + selectedOpPrices.reduce((a, b) => a + b, 0)) * inputVal;
    const EI_TotalPrice = new Intl.NumberFormat('ko-KR').format(TotalPrice); // 가격 쉼표 넣기

    console.log(`현재금액 : ${TotalPrice}`);
    // 계산된 총 가격을 원하는 위치에 표시합니다.
    $('.EI_menu_cost').text('\u20A9' + `${EI_TotalPrice}`);
  }

  $(".input-group").on("click", "#increment", function () {
    var input = $(this).closest(".input-group").find("input");
    updatePrice();
    console.log(input.val());
  });

  $(".input-group").on("click", "#decrement", function () {
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
  updatePrice();//(메뉴가격+사이즈+옵션1~8)*갯수 = 실시간 반영 끝------------------------------------------------------------------
}//09.13 여기까지

// 서버로부터 메뉴 정보를 요청합니다.
if (window.location.search) {
  let detail_urlParams = new URLSearchParams(window.location.search);
  const menuId = detail_urlParams.get("menuId");

  fetch(`/menu_e/${menuId}`)
    .then(response => response.json())
    .then(menuData => {
      console.log(menuData); // 서버에서 받은 메뉴 데이터를 확인해보세요
      renderMenuDetail(menuData);

      // 라디오 버튼 클릭 이벤트 핸들러 추가
      $("input[type='radio']").on("change", function () {
        const selectedValue = $(this).val();
        console.log(`라디오 버튼 "${selectedValue}"이(가) 선택되었습니다.`);
      });

      // 체크박스 클릭 이벤트 핸들러 추가
      $("input[type='checkbox']").on("change", function () {
        const selectedValue = $(this).val();
        const isChecked = $(this).is(":checked");
        if (isChecked) {
          console.log(`체크박스 "${selectedValue}"이(가) 선택되었습니다.`);
        } else {
          console.log(`체크박스 "${selectedValue}"이(가) 해제되었습니다.`);
        }
      });
    })
    .catch(error => {
      console.error("Error fetching menu data:", error);
    });
}

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