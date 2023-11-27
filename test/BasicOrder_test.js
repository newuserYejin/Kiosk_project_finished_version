var button = document.querySelector('.circle');
var colors = ['orange', 'pink'];
var currentIndex = 0;

button.addEventListener('click', function () {
  button.style.backgroundColor = colors[currentIndex];
  currentIndex = (currentIndex + 1) % colors.length;
  alert("버튼이 클릭되었습니다!");
  window.location.href = '../search/search.html';
});

// 도움말 버튼
const joImage = document.getElementById("imageLink");

joImage.addEventListener("click", function () {
  $.get("../help_msg/help_msg.html", function (data) {
    $("#modalContainer").html(data);
    const modal = new bootstrap.Modal(document.getElementById("exampleModal"));
    modal.show();
  });
});

const search = document.querySelectorAll('.search, .search_icon');
search.forEach((divElement) => {
  divElement.addEventListener('click', function() {
    // 이벤트 처리 로직 작성
    $.get("../search/search.html", function(data) {
      // search.html 파일 내용을 DOM 객체로 만들어서 추출
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = data;

      // search.css 로드 및 적용
      const styleElement = tempDiv.querySelector('style');
      if (styleElement) {
        const styleTag = document.createElement('style');
        styleTag.src = "../search/search.css"
        document.head.appendChild(styleTag);
      }

      // search.js 로드 및 실행
      const scriptElement = tempDiv.querySelector('script');
      if (scriptElement) {
        const scriptTag = document.createElement('script');
        scriptTag.src = "../search/search.js"; // search.js 파일의 경로
        document.body.appendChild(scriptTag);
      }

      // search.html의 내용을 modal에 적용
      const modalContent = tempDiv.querySelector('#modalContent');
      $("#modalContainer").html(modalContent.innerHTML);

      const modal = new bootstrap.Modal(document.getElementById("exampleModal"));
      modal.show();
    });
  });
});





// 하단 고정 버튼(이전화면, 처음으로, 다음)
// 이전화면 클릭시
document.getElementById('prvsScren').addEventListener('click', function () {
  const urlParams = new URLSearchParams(window.location.search);
  urlParams.set('order', 'basic'); // 'order' 파라미터를 'slow' 값으로 설정
  // 기존 URL에 파라미터를 추가한 새 URL로 이동
  window.location.href = `../selecteat/selecteat.html?${urlParams}`;
});

// 처음으로
document.getElementById("firstScreen").addEventListener("click", function () {
  // 새로운 페이지로 이동
  window.location.href = "../selectorder/selectorder.html";
});

// 다음
document.getElementById("nextScreen").addEventListener("click", function () {
  // 새로운 페이지로 이동
  window.location.href = "../last_checklist/checklist.html";
});

// 메뉴 박스
const list_content_box = document.querySelectorAll('.list_content_box');

list_content_box.forEach((divElement) => {
  divElement.addEventListener('click', function () {
    // 이벤트 처리 로직 작성
    alert("선택되었습니다");
    window.location.href = '../detail_menu/jojo.html';
  });
});


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

// 크기 조절 버튼
const radioButtons = document.getElementsByName('size');
radioButtons.forEach(button => {
  button.addEventListener('click', () => {
    // 선택된 라디오 버튼의 값에 따라 페이지 이동
    if (button.checked) {
      switch (button.value) {
        case 'basic':
          window.location.href = '../BasicFrame/BasicOrder.html';
          break;
        case 'big':
          window.location.href = '../BigFrame/BigOrder.html';
          break;
        default:
          break;
      }
    }
  });
});


