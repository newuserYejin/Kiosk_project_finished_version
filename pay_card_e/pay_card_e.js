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
                        // modalContainer_e에 help_msg.html 콘텐츠를 추가합니다.
                        // 모달 제목을 찾아서 변경
                        document.getElementById("modalContainer_e").innerHTML = data;

                        const modalTitle = document.querySelector(".modal-title");
                        if (modalTitle) {
                            modalTitle.textContent = "help"; // "help"로 변경
                        }

                        const modalBody = document.querySelector(".modal-body");
                        modalBody.innerHTML = `
        <video autoplay controls>
            <source src="./image/paycard_e.mp4" type="video/mp4">
            Please call the administrator
        </video>

        <section class="content_explain">
        1. If you want to go back to the previous screen, press 'PREVIOUS screen'<br>
        2. If you want to return to order, please press Return to Order.<br>
        3. You can move 'Select Menu' and 'Check Order' using the left navigation.<br>
        4. Don't be surprised if the message pops up! It's a payment completed message. Please wait for the following order number confirmation screen.<br>
        (The screen that follows after selecting each button may be different from the image.)
        </section>
        `;

                        // help_msg.css 파일을 로드합니다.
                        const linkElement = document.createElement("link");
                        linkElement.rel = "stylesheet";
                        linkElement.type = "text/css";
                        linkElement.href = "http://localhost:3001/help_msg/help_msg_e.css";
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
        location.href = `http://localhost:3001/BigFrame_e/BigOrder_e.html?order=slow&timer=${timer}&pickup=${pickup}`;
    } else if (orderType === 'basic') {
        // 기본 주문하기 버튼을 클릭한 경우
        location.href = `http://localhost:3001/BasicFrame_e/BasicOrder_e.html?order=basic&timer=${timer}&pickup=${pickup}`;
    } else {
        location.href = 'http://localhost:3001/selectorder/selectorder.html';
    }


}
function openCheck() {
    const pickup = urlParams.get('pickup');
    
    if (orderType === 'slow') {
        // 천천히 주문하기 버튼을 클릭한 경우
        location.href = `http://localhost:3001/last_checklist_e/checklist_e.html?order=slow&timer=${timer}&pickup=${pickup}`;
    } else if (orderType === 'basic') {
        // 기본 주문하기 버튼을 클릭한 경우
        location.href = `http://localhost:3001/last_checklist_e/checklist_e.html?order=basic&timer=${timer}&pickup=${pickup}`;
    } else {
        location.href = 'http://localhost:3001/selectorder/selectorder.html';
    }

}
function openPay() {
    const pickup = urlParams.get('pickup');
    
    if (orderType === 'slow') {
        // 천천히 주문하기 버튼을 클릭한 경우
        location.href = `http://localhost:3001/paymethod_e/paymethod_e.html?order=slow&timer=${timer}&pickup=${pickup}`;
    } else if (orderType === 'basic') {
        // 기본 주문하기 버튼을 클릭한 경우
        location.href = `http://localhost:3001/paymethod_e/paymethod_e.html?order=basic&timer=${timer}&pickup=${pickup}`;
    } else {
        location.href = 'http://localhost:3001/selectorder/selectorder.html';
    }

}

function firstScreen() {
    window.location.href = "http://localhost:3001/selectorder/selectorder.html";
}

function back() {
    const pickup = urlParams.get('pickup');

    if (orderType === 'slow') {
        // 천천히 주문하기 버튼을 클릭한 경우
        location.href = `http://localhost:3001/paymethod_e/paymethod_e.html?order=slow&timer=${timer}&pickup=${pickup}`;
    } else if (orderType === 'basic') {
        // 기본 주문하기 버튼을 클릭한 경우
        location.href = `http://localhost:3001/paymethod_e/paymethod_e.html?order=basic&timer=${timer}&pickup=${pickup}`;
    } else {
        location.href = 'http://localhost:3001/selectorder/selectorder.html';
    }

}
function gohome() {
    const pickup = urlParams.get('pickup');
    if (orderType === 'slow') {
        // 천천히 주문하기 버튼을 클릭한 경우
        location.href = `http://localhost:3001/last_checklist_e/checklist_e.html?order=slow&timer=${timer}&pickup=${pickup}`;
    } else if (orderType === 'basic') {
        // 기본 주문하기 버튼을 클릭한 경우
        location.href = `http://localhost:3001/last_checklist_e/checklist_e.html?order=basic&timer=${timer}&pickup=${pickup}`;
    } else {
        location.href = 'http://localhost:3001/selectorder/selectorder.html';
    }

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