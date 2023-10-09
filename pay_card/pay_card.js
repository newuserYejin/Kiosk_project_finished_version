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
        <video autoplay controls>
        <source src="./image/paycard.mp4" type="video/mp4">
            관리자를 호출해주세요.
        </video>

        <section class="content_explain">
            1. 결제 방법 변경을 원하신다면 '결제 방법 선택'을 눌러주세요.<br>
            2. 주문으로 돌아가길 원하신다면 '주문으로 돌아가기'를 눌러주세요.<br>
            3. 왼쪽 네비게이션을 이용한 '메뉴 선택' 및 '주문 확인'이동이 가능합니다.<br>
            4. 결제 후 결제 완료 안내가 뜨면 결제가 완료된것입니다! 놀라지마시고 이어지는 주문번호 확인창을 기다려주세요.<br>
            (각 버튼 선택 후 이어지는 화면은 영상과 다를 수 있습니다.)
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
        
const urlParams = new URLSearchParams(window.location.search);
const orderType = urlParams.get('order');

function openSelect() {
    const pickup = urlParams.get('pickup');
    if (orderType === 'slow') {
        // 천천히 주문하기 버튼을 클릭한 경우
        location.href = `http://localhost:3001/BigFrame/BigOrder.html?order=slow&timer=${timer}&pickup=${pickup}`;
    } else if (orderType === 'basic') {
        // 기본 주문하기 버튼을 클릭한 경우
        location.href = `http://localhost:3001/BasicFrame/BasicOrder.html?order=basic&timer=${timer}&pickup=${pickup}`;
    } else {
        location.href = 'http://localhost:3001/selectorder/selectorder.html';
    }


}
function openCheck() {
    const pickup = urlParams.get('pickup');
    if (orderType === 'slow') {
        // 천천히 주문하기 버튼을 클릭한 경우
        location.href = `http://localhost:3001/last_checklist/checklist.html?order=slow&timer=${timer}&pickup=${pickup}`;
    } else if (orderType === 'basic') {
        // 기본 주문하기 버튼을 클릭한 경우
        location.href = `http://localhost:3001/last_checklist/checklist.html?order=basic&timer=${timer}&pickup=${pickup}`;
    } else {
        location.href = 'http://localhost:3001/selectorder/selectorder.html';
    }

}
function openPay() {
    const pickup = urlParams.get('pickup');
    if (orderType === 'slow') {
        // 천천히 주문하기 버튼을 클릭한 경우
        location.href = `http://localhost:3001/paymethod/paymethod.html?order=slow&timer=${timer}&pickup=${pickup}`;
    } else if (orderType === 'basic') {
        // 기본 주문하기 버튼을 클릭한 경우
        location.href = `http://localhost:3001/paymethod/paymethod.html?order=basic&timer=${timer}&pickup=${pickup}`;
    } else {
        location.href = 'http://localhost:3001/selectorder/selectorder.html';
    }

}

function back() {
    const pickup = urlParams.get('pickup');
    if (orderType === 'slow') {
        // 천천히 주문하기 버튼을 클릭한 경우
        location.href = `http://localhost:3001/paymethod/paymethod.html?order=slow&timer=${timer}&pickup=${pickup}`;
    } else if (orderType === 'basic') {
        // 기본 주문하기 버튼을 클릭한 경우
        location.href = `http://localhost:3001/paymethod/paymethod.html?order=basic&timer=${timer}&pickup=${pickup}`;
    } else {
        location.href = 'http://localhost:3001/selectorder/selectorder.html';
    }

}
function gohome() {
    const pickup = urlParams.get('pickup');
    if (orderType === 'slow') {
        // 천천히 주문하기 버튼을 클릭한 경우
        location.href = `http://localhost:3001/last_checklist/checklist.html?order=slow&timer=${timer}&pickup=${pickup}`;
    } else if (orderType === 'basic') {
        // 기본 주문하기 버튼을 클릭한 경우
        location.href = `http://localhost:3001/last_checklist/checklist.html?order=basic&timer=${timer}&pickup=${pickup}`;
    } else {
        location.href = 'http://localhost:3001/selectorder/selectorder.html';
    }

}

function firstScreen(){
    location.href = 'http://localhost:3001/selectorder/selectorder.html';
}

let total_cost = localStorage.getItem('myTotalCost');

const totalCostElement = document.querySelector('.total_cost');
totalCostElement.textContent = total_cost + '원';

// function showMessageAndRedirect() {
//     setTimeout(function() {
//         alert("3초 후에 페이지가 이동됩니다.");
    
//         // 알림 메시지가 나타난 후 3초 뒤에 페이지를 
//         setTimeout(function() {
//           window.location.href = "http://localhost:3001/ordernum/ordernum.html?order=basic";
//         }, 3000); 
//       }, 2000); 
//     }
    
// // 페이지 로드 시 함수 호출
// window.onload = showMessageAndRedirect;