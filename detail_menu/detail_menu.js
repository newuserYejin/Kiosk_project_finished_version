
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
  if (parseInt(input.val()) > 1) {    // 최소 주문 수량 1개 이상
    input.val(parseInt(input.val()) - 1);
  }
});

$(".btn-info").click(function () {
  const selectedMenuNum = new URLSearchParams(window.location.search).get("menuId");
  const selectedCount = parseInt($("#quantity").val());

  // 옵션 값 설정
  const selectedOptions = {
    op_t: $("input[name='temperature']:checked").val() === "뜨거움" ? 1 : $("input[name='temperature']:checked").val() === "차가움" ? 2 : 1000,
    op_s: $("input[name='size']:checked").val() === "기본 크기" ? 3 : $("input[name='size']:checked").val() === "큰 크기" ? 4 : 1000,//10.15수정
    op1: $("input[name='option_set_1']").prop('checked') ? 5 : 0,
    op2: $("input[name='option_set_2']").prop('checked') ? 6 : 0,
    op3: $("input[name='option_set_3']").prop('checked') ? 7 : 0,
    op4: $("input[name='option_set_4']").prop('checked') ? 8 : 0,
    op5: $("input[name='option_set_5']").prop('checked') ? 9 : 0,
    op6: $("input[name='option_set_6']").prop('checked') ? 10 : 0,
    op7: $("input[name='option_set_7']").prop('checked') ? 11 : 0,
    op8: $("input[name='option_set_8']").prop('checked') ? 12 : 0
  };

  fetch(`/menu/${selectedMenuNum}`)//tb_order가지고 오기
    .then(response => response.json())
    .then(menuData => {
      console.log("주문 가져옴:", menuData.orders);
      const menuOrders = menuData.orders; // 서버에서 받아온 주문 데이터

      // tb_order와 새로운 주문 목록 비교
      const matchingOrder = menuOrders.find(order => {
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
        // 일치하는 주문이 이미 있을 경우 서버로 /updateCount 요청을 보내는 코드
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
        // 일치하는 주문이 없을 경우 서버로 /addOrder /addOrder 요청을 보내는 코드
        fetch('/addOrder', {
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
              for (let i = 1; i <= 8; i++)
                console.log(`옵션${i}:`, selectedOptions[`op${i}`]);
            } else {
              console.log("주문 추가 실패");
            }
          })
          .catch(error => {
            console.error("주문 추가 중 오류 발생:", error);
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
  const select = (selector) => document.querySelector(selector);
  const selectAll = (selector) => document.querySelectorAll(selector);
  const menuTitle = select(".menu_title");
  const menuDescription = select(".menu_explain_detail");
  const menuImage = select(".menu_img_size");

  menuTitle.textContent = menuData.menuData.menu_name;
  menuDescription.textContent = menuData.menuData.menu_explan;
  menuImage.src = `.${menuData.image_path}`;
  menuImage.alt = menuData.menu_name;

  const allegyList = select(".allegy_list");
  if (menuData.allegy_names.length === 0) {
    allegyList.innerHTML = "<li>없음</li>";
  } else {
    allegyList.innerHTML = menuData.allegy_names.map(allegyName => `<li>${allegyName}</li>`).join(", ");
  }

  const container_box = select(".op_box");
  const optionContainers = selectAll(".option_inner_bow");

  optionContainers.forEach((container, index) => {
    const optionList = container.querySelector(".list-group");
    let currentSet = 0;

    const all_modal = select(".modal-dialog");
    const opDataLength = menuData.op_data.length;
    if (opDataLength === 0) {
      all_modal.style.height = "auto";
      container_box.style.display = "none";
      return;
    }

    if (index === 0) {
      const temperatureOptions = menuData.op_data
        .filter(option => option.op_name === "뜨거움" || option.op_name === "차가움");

      let defaultOption = "뜨거움"; // 기본값 설정
      console.log("temperatureOptions:", temperatureOptions);

      const hasHot = temperatureOptions.some(option => option.op_name === "뜨거움");
      const hasCold = temperatureOptions.some(option => option.op_name === "차가움");
      const speechBubble = document.querySelector('.temp');
      const speechBubbleContent = speechBubble.querySelector('div');

      let falseoption = "차가움";

      if (!hasHot && hasCold) {
        defaultOption = "차가움";
        falseoption = "뜨거움";
      }

      if (temperatureOptions.some(option => option.op_name === "뜨거움") && temperatureOptions.some(option => option.op_name === "차가움")) {
        speechBubbleContent.textContent = '원하는것을 선택해주세요.'
        optionList.innerHTML = temperatureOptions
          .map(option => {
            const checkedAttribute = option.op_name === defaultOption ? "checked" : "";
            const textColor = option.op_name === "뜨거움" ? "red" : "blue"; // 뜨거움은 빨간색, 차가움은 파란색
            option_t = textColor;
            const imageSrc = option.op_name === "뜨거움" ? "../icon_img/hot_drink_small.png" : "../icon_img/ice_drink.png"; // 이미지 경로 설정
            return `<li class="list-group-item"><input class="form-check-input me-1" type="radio" name="temperature"  id="${option.op_name}" value="${option.op_name}" ${checkedAttribute}>
            <label class="form-check-label" for="${option.op_name}">
            ${option.op_name} (+${option.op_price}원)
            <img src="${imageSrc}" />
            </label></li>
            `;
          })
          .join("");
      } else {
        /* "뜨거움"이나 "차가움" 중 하나만 없는 경우 11.02수정 시작*/
        if (!hasHot) {
          speechBubbleContent.textContent = '차가운 것만 가능한 상품입니다.';
          optionList.innerHTML = temperatureOptions
            .map(option => {
              const checkedAttribute = option.op_name === defaultOption ? "checked" : "";
              const textColor = option.op_name === "뜨거움" ? "red" : "blue"; // 뜨거움은 빨간색, 차가움은 파란색
              option_t = textColor;
              const imageSrc = option.op_name === "뜨거움" ? "../icon_img/hot_drink_small.png" : "../icon_img/ice_drink.png";// 이미지 경로 설정
              const falseoptionText = falseoption === "뜨거움" ? "뜨거움" : "차가움"; // falseoption 변수에 따라 출력할 문자 설정
              const falseimageSrc = falseoption === "뜨거움" ? "../icon_img/hot_drink_small.png" : "../icon_img/ice_drink.png";
              return `<li class="list-group-item"><input class="form-check-input me-1 falseoption" type="radio" name="temperature"  id="falseoption" disabled="true">
            <label class="form-check-label" for="falseoption" onclick=show_qr('t')> ${falseoptionText} (+0원)
            <img src="${falseimageSrc}" />
            </label></li>
            <li class="list-group-item"><input class="form-check-input me-1" type="radio" name="temperature"  id="${option.op_name}" value="${option.op_name}" ${checkedAttribute}>
            <label class="form-check-label" for="${option.op_name}" style="color: ${textColor}; border-color:${textColor}">
                ${option.op_name} (+${option.op_price}원)
                <img src="${imageSrc}" />
            </label></li>
                `;
            })
            .join("");
        } else {
          speechBubbleContent.textContent = '뜨거운 것만 가능한 상품입니다.';
          optionList.innerHTML = temperatureOptions
            .map(option => {
              const checkedAttribute = option.op_name === defaultOption ? "checked" : "";
              const textColor = option.op_name === "뜨거움" ? "red" : "blue"; // 뜨거움은 빨간색, 차가움은 파란색
              option_t = textColor;
              const imageSrc = option.op_name === "뜨거움" ? "../icon_img/hot_drink_small.png" : "../icon_img/ice_drink.png";// 이미지 경로 설정
              const falseoptionText = falseoption === "뜨거움" ? "뜨거움" : "차가움"; // falseoption 변수에 따라 출력할 문자 설정
              const falseimageSrc = falseoption === "뜨거움" ? "../icon_img/hot_drink_small.png" : "../icon_img/ice_drink.png";
              return `<li class="list-group-item"><input class="form-check-input me-1" type="radio" name="temperature"  id="${option.op_name}" value="${option.op_name}" ${checkedAttribute}>
                <label class="form-check-label" for="${option.op_name}" style="color: ${textColor}; border-color:${textColor}">
                    ${option.op_name} (+${option.op_price}원)
                    <img src="${imageSrc}" />
                </label></li>
                <li class="list-group-item"><input class="form-check-input me-1 falseoption" type="radio" name="temperature"  id="falseoption" disabled="true">
                <label class="form-check-label" for="falseoption" onclick=show_qr('t')> ${falseoptionText} (+0원)
                <img src="${falseimageSrc}" />
                </label></li>
                `;
            })
            .join("");
        }/*11.02수정 끝*/
      }
    } else if (index === 1) {   //09.13
      const sizeOptions = menuData.op_data
        .filter(option => option.op_name === "기본 크기" || option.op_name === "큰 크기");

      let defaultOption = "기본 크기"; // 기본값 설정
      console.log("sizeOptions:", sizeOptions);

      const hasRegular = sizeOptions.some(option => option.op_name === "기본 크기");
      const hasLarge = sizeOptions.some(option => option.op_name === "큰 크기");

      let falseoption = "큰 크기";

      if (!hasRegular && hasLarge) {
        defaultOption = "큰 크기";
        falseoption = "기본 크기";
      }
      console.log(option_t);

      const speechBubble = document.querySelector('.size');
      const speechBubbleContent = speechBubble.querySelector('div');

      speechBubbleContent.textContent = '원하는 크기를 선택해주세요.';

      optionList.innerHTML = sizeOptions
        .map(option => {
          const checkedAttribute = option.op_name === defaultOption ? "checked" : "";
          return `<li class="list-group-item"><input class="form-check-input me-1" type="radio" name="size"  id="${option.op_name}" value="${option.op_name}" ${checkedAttribute}>
          <label class="form-check-label" for="${option.op_name}">${option.op_name} (+${option.op_price}원)
          </label></li>
          `;
        })
        .join("");

      if (!hasRegular || !hasLarge) {
        optionList.innerHTML += `<li class="list-group-item"><input class="form-check-input me-1" type="radio" name="size"  id="falseoption" value="${falseoption}" disabled="true">
        <label class="form-check-label" for="falseoption" onclick=show_qr('s')> ${falseoption} (+0원)
        </label></li>`;
        // "큰 크기"이나 "기본 크기" 중 하나만 없는 경우

        const speechBubble = document.querySelector('.size');
        const speechBubbleContent = speechBubble.querySelector('div');

        if (!hasRegular) {
          speechBubbleContent.textContent = '큰 사이즈만 가능한 상품입니다.';
        } else {
          speechBubbleContent.textContent = '기본 크기만 가능한 상품입니다.';
        }
      }
    } else if (index === 2) {
      // 세번째 박스에는 나머지 옵션 중 체크박스 옵션 4개를 넣습니다.
      const checkboxOptions = menuData.op_data
        .filter(option => option.op_name !== "뜨거움" && option.op_name !== "차가움" && option.op_name !== "기본 크기" && option.op_name !== "큰 크기")
        .slice(0, 6); // 첫 4개의 체크박스 옵션 선택

      optionList.innerHTML = checkboxOptions
        .map(option => {
          currentSet++;
          return `<li class="list-group-item chch"><input class="form-check-input me-1" type="checkbox" id="${option.op_name}" name="option_set_${currentSet}" value="${option.op_name}" data-price="${option.op_price}">
        <label class="form-check-label" for="${option.op_name}">${option.op_name} (+${option.op_price}원)</label></li>`;
        })
        .join("");
    }
  });

  function updatePrice() {
    const baseMenuPrice = parseInt(menuData.menuData.price);
    let selectedOpSPrice = 0;
    let selectedOpPrices = [0, 0, 0, 0, 0, 0, 0, 0];
    const selectedOpS = $("input[name='size']:checked").val();
    if (selectedOpS === "큰 크기") {
      selectedOpSPrice = 1200;
    }
    for (let i = 1; i <= 8; i++) {
      const opCheckbox = $(`input[name='option_set_${i}']`);
      const opPrice = opCheckbox.is(':checked') ? parseInt(opCheckbox.attr('data-price')) : 0;
      selectedOpPrices[i - 1] = opPrice;
    }
    const inputVal = parseInt($("#quantity").val());
    const TotalPrice = (baseMenuPrice + selectedOpSPrice + selectedOpPrices.reduce((a, b) => a + b, 0)) * inputVal;
    const EI_TotalPrice = new Intl.NumberFormat('ko-KR').format(TotalPrice);
    $('.EI_menu_cost').text(`${EI_TotalPrice}원`);
  }

  $(".input-group").on("click", "#increment, #decrement", function () {
    var input = $(this).closest(".input-group").find("input");
    updatePrice();
    console.log(input.val());
  });

  $("input[type='radio'], input[type='checkbox']").on("change", function () {
    updatePrice();
  });

  updatePrice();
}

// 서버로부터 메뉴 정보를 요청합니다.
if (window.location.search) {
  let detail_urlParams = new URLSearchParams(window.location.search);
  const menuId = detail_urlParams.get("menuId");

  fetch(`/menu/${menuId}`)
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
