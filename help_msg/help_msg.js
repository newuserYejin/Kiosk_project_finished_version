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
            <br>
            1. 카테고리를 선택 후, 메뉴를 선택해주세요.<br>
            2. 상세 메뉴 화면에서 개수, 온도, 크기, 추가 사항을 선택하고 '담기'를 눌러주세요.<br>
            3. 에스프레소 온도를 '뜨거움'으로 선택했기에 '빨간 글씨'로 추가되는 것을 확인할 수 있습니다.<br>
            => (차가움을 선택했으면 파란색으로, 디저트는 검은색으로 추가됩니다.)<br>
            4. 주문 목록에서 '포장', '매장'을 변경할 수 있습니다.<br>
            5. 주문 목록에서 'x'를 누르시면 메뉴를 삭제할 수 있습니다.<br>
            6. '옵션변경'을 누르시면 개수, 온도, 크기, 추가 사항을 변경할 수 있습니다.<br>
            7. '결제하기'를 누르시면 결제 방법 선택화면으로 이동합니다.<br>
            `;
            break;
        case 'bigorder_2':
            videoSource.src = "../help_video/bigorder(2).mp4";
            video_explan.innerHTML = `
            <br>
            1. 검색을 하실 경우 검색 바를 눌러주세요.<br>
            2. 검색은 3가지 방법으로 가능합니다. '초코 라떼'를 검색해보겠습니다.<br>
            3. 먼저 추천 검색어(키워드)를 선택하는 방법입니다.<br>
            4. '초코'를 누르시면 초코가 들어간 모든 메뉴가 검색 됩니다.<br>
            5. 다음은 음성인식 방법입니다.<br>
            6. '마이크 버튼'을 누르시고 '초코'를 말씀해주세요.<br>
            7. 음성인식 결과에 초코가 제대로 떴다면 '검색하기'ㄴ를 눌러주세요.<br>
            => (제대로 음성인식이 되지 않았다면 다시 음성인식을 해주세요.)<br>
            8. 다음은 키보드를 눌러 검색하는 방법입니다.<br>
            9. '초코'를 입력하여 돋보기 버튼을 눌러주세요.<br>
            (각 선택에 이어지는 화면은 영상과 다를 수 있습니다.)
            `;
            break;
        case 'bigorder_3':
            videoSource.src = "../help_video/bigorder(3).mp4";
            video_explan.innerHTML = `
            <br>
            1. 상단에 보이는 네비게이션을 통해 어느 단계에 있는지 알 수 있습니다.<br>
            2. '주문 확인'을 누르시면 최종 주문 목록 화면으로 이동합니다.<br>
            3. '최종 결제'를 누르시면 결제 방법 선택 화면으로 이동합니다.<br>
            4. 하단에 '이전으로'를 누르시면 '포장하기', '매장 이용'을 선택하는 화면으로 이동합니다.<br>
            5. '다음으로'를 누르시면 최종 주문 목록 화면으로 이동합니다.<br>
            6. '기본'를 누르시면 천천히 주문하기 방식의 주문 화면으로 이동합니다.<br>
            7. '전체 취소'를 누르시면 주문 목록에 있는 모든 메뉴가 삭제됩니다.<br>
            8. '처음으로'를 누르시면 첫 화면으로 이동합니다.<br>
            (각 선택에 이어지는 화면은 영상과 다를 수 있습니다.)<br>
            `;
            break;
        case 'bigorder_e_1':
            videoSource.src = "../help_video/bigorder_e(1).mp4";
            video_explan.innerHTML = `
            <br>
            1. Select a category, then select a menu.<br>
            2. On the Details menu screen, select the number, temperature, size, additional options, and click 'Add'.<br>
            3. Since I chose the Espresso temperature as 'hot', you can see that it is added in red letters.<br>
            => (If you have chosen Cold, you will be added blue and the dessert will be added black.)<br>
            4. You can change the 'Take Out' and 'Eat and Go' from the order list.<br>
            5. You can delete the menu by pressing 'x' in the order list.<br>
            6. Click 'Options' to change the number, temperature, size, and additional options.<br>
            7. Click 'Paying' to go to the payment method selection screen.<br>
            `;
            break;
        case 'bigorder_e_2':
            videoSource.src = "../help_video/bigorder_e(2).mp4";
            video_explan.innerHTML = `
            <br>
            1. If you're searching, please press the search bar.<br>
            2. Search is possible in three ways. Let's search for 'Chocolate Latte'.<br>
            3. First, select the recommended keyword.<br>
            4. If you press 'Chocolate', you will be able to searchable.<br>
            5. The following is a voice recognition method.<br>
            6. Press the 'microphone button' and say 'Chocolate'.<br>
            7. If the voice recognition result shows 'Chocolate' correctly, please press 'Search'.<br>
            => (If it's not properly recognized, please do it again.)<br>
            8. The following is how to search by pressing the keyboard.<br>
            9. Type 'choco' and press the magnifying glass button.<br>
            (The screen that follows each selection may be different from the image.)<br>
            `;
            break;
        case 'bigorder_e_3':
            videoSource.src = "../help_video/bigorder_e(3).mp4";
            video_explan.innerHTML = `
            <br>
            1. The navigation shown at the top shows where you are at.<br>
            2. Click 'Check' step to go to the final order list screen.<br>
            3. Click 'Pay' step to go to the Payment Method Selection screen.<br>
            4. Click 'Previous' at the bottom to go to the screen where you choose to 'Take Out' or 'Eat and Go'.<br>
            5. Click 'Next' to go to the final order list screen.<br>
            6. Click 'Basic' to go to the Order screen of the default order method.<br>
            7. Click 'Full cancel' to delete all menus in the order list.<br>
            8. Click 'Home' to go to the first screen.<br>
            (The screen that follows each selection may be different from the image.)<br>
            `;
            break;
        case 'basicorder_1':
            videoSource.src = "../help_video/basicorder(1).mp4";
            video_explan.innerHTML = `
            <br>
            1. 카테고리를 선택 후, 메뉴를 선택해주세요.<br>
            2. 상세 메뉴 화면에서 개수, 온도, 크기, 추가 사항을 선택하고 '담기'를 눌러주세요.<br>
            3. 에스프레소 온도를 '뜨거움'으로 선택했기에 '빨간 글씨'로 추가되는 것을 확인할 수 있습니다.<br>
            => (차가움을 선택했으면 파란색으로, 디저트는 검은색으로 추가됩니다.)<br>
            4. 주문 목록에서 '포장', '매장'을 변경할 수 있습니다.<br>
            5. 주문 목록에서 'x'를 누르시면 메뉴를 삭제할 수 있습니다.<br>
            6. '옵션변경'을 누르시면 개수, 온도, 크기, 추가 사항을 변경할 수 있습니다.<br>
            7. '결제하기'를 누르시면 결제 방법 선택화면으로 이동합니다.<br>
            `;
            break;
        case 'basicorder_2':
            videoSource.src = "../help_video/basicorder(2).mp4";
            video_explan.innerHTML = `
            <br>
            1. 검색을 하실 경우 검색 바를 눌러주세요.<br>
            2. 검색은 3가지 방법으로 가능합니다. '초코 라떼'를 검색해보겠습니다.<br>
            3. 먼저 추천 검색어(키워드)를 선택하는 방법입니다.<br>
            4. '초코'를 누르시면 초코가 들어간 모든 메뉴가 검색 됩니다.<br>
            5. 다음은 음성인식 방법입니다.<br>
            6. '마이크 버튼'을 누르시고 '초코'를 말씀해주세요.<br>
            7. 음성인식 결과에 초코가 제대로 떴다면 '검색하기'를 눌러주세요.<br>
            => (제대로 음성인식이 되지 않았다면 다시 음성인식을 해주세요.)<br>
            (각 선택에 이어지는 화면은 영상과 다를 수 있습니다.)<br>
            8. 다음은 키보드를 눌러 검색하는 방법입니다.<br>
            9. '초코'를 입력하여 돋보기 버튼을 눌러주세요.<br>
            (각 선택에 이어지는 화면은 영상과 다를 수 있습니다.)
            `;
            break;
        case 'basicorder_3':
            videoSource.src = "../help_video/basicorder(3).mp4";
            video_explan.innerHTML = `
            <br>
            1. 상단에 보이는 네비게이션을 통해 어느 단계에 있는지 알 수 있습니다.<br>
            2. '주문 확인'을 누르시면 최종 주문 목록 화면으로 이동합니다.<br>
            3. '최종 결제'를 누르시면 결제 방법 선택 화면으로 이동합니다.<br>
            4. 하단에 '이전으로'를 누르시면 '포장하기', '매장 이용'을 선택하는 화면으로 이동합니다.<br>
            5. '다음으로'를 누르시면 최종 주문 목록 화면으로 이동합니다.<br>
            6. '더 크게'를 누르시면 천천히 주문하기 방식의 주문 화면으로 이동합니다.<br>
            7. '전체 취소'를 누르시면 주문 목록에 있는 모든 메뉴가 삭제됩니다.<br>
            8. '처음으로'를 누르시면 첫 화면으로 이동합니다.<br>
            (각 선택에 이어지는 화면은 영상과 다를 수 있습니다.)<br>
            `;
            break;
        case 'basicorder_e_1':
        videoSource.src = "../help_video/basicorder_e(1).mp4";
        video_explan.innerHTML = `
        <br>
        1. Select a category, then select a menu.<br>
        2. On the Details menu screen, select the number, temperature, size, additional options, and click 'Add'.<br>
        3. Since I chose the Espresso temperature as 'hot', you can see that it is added in red letters.<br>
        => (If you have chosen Cold, you will be added blue and the dessert will be added black.)<br>
        4. You can change the 'Take Out' and 'Eat and Go' from the order list.<br>
        5. You can delete the menu by pressing 'x' in the order list.<br>
        6. Click 'Options' to change the number, temperature, size, and additional options.<br>
        7. Click 'Paying' to go to the payment method selection screen.<br>
        `;
        break;
    case 'basicorder_e_2':
        videoSource.src = "../help_video/basicorder_e(2).mp4";
        video_explan.innerHTML = `
        <br>
        1. If you're searching, please press the search bar.<br>
        2. Search is possible in three ways. Let's search for 'Chocolate Latte'.<br>
        3. First, select the recommended keyword.<br>
        4. If you press 'Chocolate', you will be able to searchable.<br>
        5. The following is a voice recognition method.<br>
        6. Press the 'microphone button' and say 'Chocolate'.<br>
        7. If the voice recognition result shows 'Chocolate' correctly, please press 'Search'.<br>
        => (If it's not properly recognized, please do it again.)<br>
        8. The following is how to search by pressing the keyboard.<br>
        9. Type 'choco' and press the magnifying glass button.<br>
        (The screen that follows each selection may be different from the image.)<br>
        `;
        break;
    case 'basicorder_e_3':
        videoSource.src = "../help_video/basicorder_e(3).mp4";
        video_explan.innerHTML = `
        <br>
        1. The navigation shown at the top shows where you are at.<br>
        2. Click 'Check' step to go to the final order list screen.<br>
        3. Click 'Pay' step to go to the Payment Method Selection screen.<br>
        4. Click 'Previous' at the bottom to go to the screen where you choose to 'Take Out' or 'Eat and Go'.<br>
        5. Click 'Next' to go to the final order list screen.<br>
        6. Click 'Bigger' to go to the Order screen of the default order method.<br>
        7. Click 'Full cancel' to delete all menus in the order list.<br>
        8. Click 'Home' to go to the first screen.<br>
        (The screen that follows each selection may be different from the image.)<br>
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