
$(".input-group").on("click", "#increment", function () {
  // .input-group 클래스를 가진 요소 내에서 #increment 버튼을 클릭했을 때 실행되는 함수
  var input = $(this).closest(".input-group").find("input");
  // 클릭한 버튼이 속한 .input-group 내에서 input 요소를 찾음
  input.val(parseInt(input.val()) + 1);
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
    op_s: $("input[name='size']:checked").val() === "basic size" ? 3 : 4,
    op1: $("input[name='option_set_1']").prop('checked') ? 5 : 0,
    op2: $("input[name='option_set_2']").prop('checked') ? 6 : 0,
    op3: $("input[name='option_set_3']").prop('checked') ? 7 : 0,
    op4: $("input[name='option_set_4']").prop('checked') ? 8 : 0,
    op5: $("input[name='option_set_5']").prop('checked') ? 9 : 0,
    op6: $("input[name='option_set_6']").prop('checked') ? 10 : 0,
    op7: $("input[name='option_set_7']").prop('checked') ? 11 : 0,
    op8: $("input[name='option_set_8']").prop('checked') ? 12 : 0
  };

  // 서버로 주문 정보 전송
  fetch('/addOrder_e', {
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
  //sql연동 끝
  location.reload();
});


// 서버로부터 메뉴 정보를 요청합니다.
// 메뉴 정보를 출력하는 함수
//09.13 수정
function renderMenuDetail(menuData) {
  const menuTitle = document.querySelector(".menu_title");
  const menuCost = document.querySelector(".menu_cost");
  const menuDescription = document.querySelector(".menu_explain_detail");
  const menuImage = document.querySelector(".menu_img_size");

  menuTitle.textContent = menuData.menuData.menu_name;
  menuCost.textContent = `가격: ${menuData.menuData.price}원`;
  menuDescription.textContent = menuData.menuData.menu_explan;
  
  const img_pp = `.${menuData.image_path}`
  menuImage.src = img_pp;
  menuImage.alt = menuData.menu_name;
  
  // 알레르기 정보 출력
  const allegyList = document.querySelector(".allegy_list");
  allegyList.innerHTML = menuData.allegy_names
    .map(allegyName => `<li>${allegyName}</li>`)
    .join("");

  // 옵션 정보 출력
  const container_box = document.querySelector(".op_box");
  const optionContainers = document.querySelectorAll(".option_inner_bow");

// 각 옵션 컨테이너마다 처리
optionContainers.forEach((container, index) => {
  const optionList = container.querySelector(".list-group");
  let currentSet = 0; // 현재 세트 번호

  // DB에서 가져온 옵션 데이터가 없을 경우 컨테이너 숨김
  const all_modal = document.querySelector(".modal-dialog");
  const r_box = document.querySelector(".r_box");
  if (menuData.op_data.length == 0) {
    r_box.style.marginTop = "20px";
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

    let falseoption = "ICED";
  
    if (!hasHot && hasCold) {
      defaultOption = "ICED";

      falseoption = "HOT";
    }

    if (temperatureOptions.some(option => option.op_name === "HOT") && temperatureOptions.some(option => option.op_name === "ICED")){
      optionList.innerHTML = temperatureOptions
      .map(option => {
          const checkedAttribute = option.op_name === defaultOption ? "checked" : "";
          const textColor = option.op_name === "HOT" ? "red" : "blue"; // HOT은 빨간색, ICED은 파란색
          return `<li class="list-group-item"><input class="form-check-input me-1" type="radio" name="temperature"  id="${option.op_name}" value="${option.op_name}" ${checkedAttribute}>
            <label class="form-check-label" for="${option.op_name}" style="color: ${textColor};">${option.op_name} (+${option.op_price}원)</label></li>
            `;
        })
      .join("");
    }else{
      optionList.innerHTML = temperatureOptions
          .map(option => {
              const checkedAttribute = option.op_name === defaultOption ? "checked" : "";
              const textColor = option.op_name === "HOT" ? "red" : "blue"; // HOT은 빨간색, ICED은 파란색
              const falseoptionText = falseoption === "HOT" ? "HOT" : "ICED"; // falseoption 변수에 따라 출력할 문자 설정
              return `<li class="list-group-item"><input class="form-check-input me-1" type="radio" name="temperature"  id="${option.op_name}" value="${option.op_name}" ${checkedAttribute}>
                <label class="form-check-label" for="${option.op_name}" style="color: ${textColor};">${option.op_name} (+${option.op_price}원)</label></li>
                <li class="list-group-item"><input class="form-check-input me-1 falseoption" type="radio" name="temperature"  id="falseoption" disabled="true">
                <label class="form-check-label" for="falseoption" style="color: gray;"> ${falseoptionText} (+0원)</label></li>
                `;
            })
          .join("");
        }
  }
  else if (index === 1) {
    const sizeOptions = menuData.op_data
      .filter(option => option.op_name.toLowerCase() === "basic size" || option.op_name.toLowerCase() === "large size");
  
    let defaultOption = "basic size"; // 기본값 설정
    console.log("sizeOptions:", sizeOptions);
  
    const hasRegular = sizeOptions.some(option => option.op_name.toLowerCase() === "basic size");
    const hasLarge = sizeOptions.some(option => option.op_name.toLowerCase() === "large size");
  
    let falseoption = "large size";
  
    if (!hasRegular && hasLarge) {
      defaultOption = "large size";
      falseoption = "basic size";
    }
  
    optionList.innerHTML = sizeOptions
      .map(option => {
        const checkedAttribute = option.op_name.toLowerCase() === defaultOption ? "checked" : "";
        return `<li class="list-group-item"><input class="form-check-input me-1" type="radio" name="size"  id="${option.op_name}" value="${option.op_name}" ${checkedAttribute}>
          <label class="form-check-label" for="${option.op_name}">${option.op_name} (+${option.op_price}원)</label></li>
          `;
      })
      .join("");
  
    if (!hasRegular || !hasLarge) {
      optionList.innerHTML += `<li class="list-group-item"><input class="form-check-input me-1" type="radio" name="size"  id="falseoption" value="${falseoption}" disabled="true">
        <label class="form-check-label" for="falseoption" style="color: gray;"> ${falseoption} (+0원)</label></li>`;
    }  
  } else if (index === 2) {
    // 세번째 박스에는 나머지 옵션 중 체크박스 옵션 4개를 넣습니다.
    const checkboxOptions = menuData.op_data
      .filter(option => option.op_name !== "HOT" && option.op_name !== "ICED" && option.op_name !== "Basic size" && option.op_name !== "Large Size")
      .slice(0, 6); // 첫 4개의 체크박스 옵션 선택

    optionList.innerHTML = checkboxOptions
      .map(option => {
        currentSet++;
        return `<li class="list-group-item chch"><input class="form-check-input me-1" type="checkbox" id="${option.op_name}" name="option_set_${currentSet}" value="${option.op_name}">
        <label class="form-check-label" for="${option.op_name}">${option.op_name} (+${option.op_price}원)</label></li>`;
      })
      .join("");
  } 
});
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

// function handleMenuData(menuData) {
//   // 받아온 데이터를 가지고 출력할 HTML 요소 생성
//   const menuDetailHtml = menuData.map(menu => {
//     return `
//     <div class="menu_img_box">
//       <img class="menu-img-size" src="${menu.image_path}" alt="${menu.menu_name}">
//     </div>

//     <div class="menu_title">${menu.menu_name}</div>
//     <div class="menu_cost">가격: ${menu.price}원</div>
//     <div class="menu_description">${menu.menu_explan}</div>
    
//     <div class="allegy_list">
//       <p class="allegy_name">알레르기 정보</p>
//       <ul>
//         ${menu.allegy_names.map(allegyName => `<li>${allegyName}</li>`).join("")}
//       </ul>
//     </div>

//     <div class="option_list">
//       <p class="option_name">옵션 정보</p>
//       <ul>
//       ${menu.op_data.map(option => `<li>${option.op_name} (+${option.op_price}원)</li>`).join("")}
//       </ul>
//     </div>

//     <div class="num_check">
//       <div class="input-group">
//         <div class="input-group-prepend">
//           <button class="btn btn-outline-secondary" id="decrement">-</button>
//         </div>
//         <input type="text" class="form-control" id="quantity" value="1" readonly>
//         <div class="input-group-append">
//           <button class="btn btn-outline-secondary" id="increment">+</button>
//         </div>
//       </div>
//     </div>
//   `;
//   });

//   // 메뉴 상세 정보를 출력하는 영역을 선택하고 내용을 추가
//   const menuDetailContainer = document.querySelector(".menu-detail-container");
//   menuDetailContainer.innerHTML += menuDetailHtml.join("");

//   // jQuery 이벤트 핸들러 등록
//   $(".input-group").on("click", "#increment", function () {
//     var input = $(this).closest(".input-group").find("input");
//     input.val(parseInt(input.val()) + 1);
//   });

//   $(".input-group").on("click", "#decrement", function () {
//     var input = $(this).closest(".input-group").find("input");
//     if (parseInt(input.val()) > 1) {
//       input.val(parseInt(input.val()) - 1);
//     }
//   });
// }