function open_help(video, button) {
    const modalBody = document.querySelector(".modal-body"); // modalBody를 찾음
    const videoElement = modalBody.querySelector("video");
    const videoSource = modalBody.querySelector("source");
    const video_explan = modalBody.querySelector(".content_explain"); // modalBody 내에서 .content_explain을 찾음

    // 'help_msg_btn_check' 클래스를 가지고 있는 모든 버튼에서 해당 클래스를 제거
    const buttons = document.querySelectorAll('.help_button button');
    buttons.forEach(btn => {
        btn.classList.remove('help_msg_btn_check');
    });
    
    // 클릭된 버튼에 'help_msg_btn_check' 클래스를 추가
    button.classList.add('help_msg_btn_check');
        
    switch (video) {
        case 'bigorder_1':
            videoSource.src = "../help_video/bigorder(1).mp4";
            video_explan.innerHTML = `
            1. 원하시는 메뉴를 선택하시면 상세 메뉴창이 나타납니다. <br>
            => 제품 수량과 선택사항 수정이 가능합니다.<br>
            2. 카테고리를 이용하면 더욱 다양한 메뉴를 만날 수 있습니다.<br>
            3. 상품 검색을 이용해 특정 메뉴를 찾을 수 있습니다.<br>
            => 키워드를 이용한 검색도 가능합니다.<br>
            4. 상단의 버튼을 통해 다른 구조의 메뉴창을 만날 수 있습니다.
            `;
            break;
        case 'bigorder_2':
            videoSource.src = "../help_video/bigorder(2).mp4";
            video_explan.innerHTML = `
            1. 왼쪽의 '주문 확인'을 이용하시면 선택한 메뉴의 목록을 확인할 수 있습니다.<br>
            2. '최종 결제'를 이용하시면 주문 목록 확인 없이 결제로 넘어갈 수 있습니다.<br>
            &lt;현재 주문 목록 설명&gt;<br>
            3. 주문 내역이 따뜻한것이면 빨간색, 차가운거면 파란색, 온도 선택이 없으면 검은색으로 나타납니다.<br>
            4. 현재 주문 목록을 선택하면 메뉴 수정이 가능한 화면으로 이동합니다.<br>
            (각 선택에 이어지는 화면은 영상과 다를 수 있습니다.)
            `;
            break;
        default:
            // 기본 동작: video 값에 따라 다른 동영상을 설정하거나 처리
            break;
    }

    // 영상 변경 후, <video> 요소를 다시 로드
    videoElement.load();
}



// function show_qr(op) {
//     const temp_qu = document.querySelector('.temp');
//     const size_qu = document.querySelector('.size');
  
//     switch (op) {
//       case 't':
//         if (temp_qu.style.visibility === 'hidden') {
//           temp_qu.style.visibility = 'visible';
//         } else {
//           temp_qu.style.visibility = 'hidden';
//         }
//         break;
//       case 's':
//         if (size_qu.style.visibility === 'hidden') {
//           size_qu.style.visibility = 'visible';
//         } else {
//           size_qu.style.visibility = 'hidden';
//         }
//         break;
//     }
//   }