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
        <source src="../help_video/paycoupon.mp4" type="video/mp4">
            관리자를 호출해주세요.
        </video>

        <section class="content_explain">
            1. 화면에 나오는 영상을 따라하며 결제해주세요.<br>
            2. '결제 방법 재선택'을 누르시면 카드, 쿠폰 선택 화면으로 이동합니다.<br>
            3. '주문으로 돌아가기'를 누르시면 최종 주문 목록 화면으로 이동합니다. <br>
            4. 상단에 있는 네비게이션의 '메뉴 선택' 단계를 누르시면 메뉴 주문 화면으로 이동합니다.<br>
            5. '주문 확인' 단계를 누르시면 최종 주문 목록 화면으로 이동합니다.<br>
            6. '최종 결제'를 누르시면 결제 방법 선택 화면으로 이동합니다.<br>
            7. 하단의 '이전으로'를 누르시면 결제 방법 선택 화면으로 이동합니다.<br>
            8. '처음으로'를 누르시면 첫 화면으로 이동합니다.<br>
            9. 결제 후 결제 완료 안내가 뜨면 결제가 완료된것입니다! 놀라지마시고 이어지는 주문번호 확인창을 기다려주세요.<br>
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
        location.href = `http://localhost:3001/BasicFrame/BasicOrder.html?order=basic&timer=${timer}$pickup=${pickup}`;
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

if (total_cost !== null) {//10.09 쉼표 넣기
    const formattedPrice = new Intl.NumberFormat('ko-KR').format(Number(total_cost));
    
    const totalCostElement = document.querySelector('.total_cost');
    totalCostElement.textContent = formattedPrice + '원';
}

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