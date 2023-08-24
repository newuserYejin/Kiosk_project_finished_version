/** simple-keyboard 키보드 **/

$(document).ready(function () {
    const Keyboard = window.SimpleKeyboard.default;
    const KeyboardLayouts = window.SimpleKeyboardLayouts.default;

    const layout = new KeyboardLayouts().get("korean");

    const myKeyboard = new Keyboard({
        onChange: input => onChange(input),
        onKeyPress: button => onKeyPress(button),
        ...layout
    });

    function onChange(input) {
        document.querySelector(".input").value = input;
        console.log("Input changed", input);
    }

    function onKeyPress(button) {
        console.log("Button pressed", button);

        if (button === "{enter}") {
            search(); // 검색 함수 호출
            location.reload();
        }
    }

});

// 서버 URL 설정 (서버 주소와 포트에 맞게 변경)
//const serverUrl = 'http://localhost:3001';

function search() {
    const searchInput = document.getElementById('input_menu_name').value;

    // 검색어가 비어있지 않을 경우에만 서버로 요청 전송
    if (searchInput.trim() !== '') {
        fetch(`http://localhost:3001/search?keyword=${encodeURIComponent(searchInput)}`)
            .then(response => response.json())
            .then(data => {
                const resultContainer = document.getElementById('resultContainer');
                resultContainer.innerHTML = ''; // 이전 결과 초기화

                if (data.length === 0) {
                    resultContainer.innerHTML = '<p>검색 결과가 없습니다.</p>';
                } else {
                    data.forEach(item => {
                        const div = document.createElement('div');
                        div.className = 'box list_content_box';
                        div.id = 'list_click';
                        div.innerHTML = `
                              <div class="box list_img_box">
                                  <img class="list_img_size" src=".${item.Picture}">
                              </div>
                              <div class="box list_content_info">
                                  <div class=" container text-center">
                                      <div class="content_title">
                                          <div class="menu_name">${item.Menu_Name}</div>
                                          <div class="menu_cost">${item.Price}원</div>
                                      </div>
                                  </div>
                              </div>
                          `;
                        resultContainer.appendChild(div);
                        //console.log("Menu Name: ", item.Menu_Name);
                        //console.log("Menu Price: ", item.Price);
                    });
                }

                // const searchResult = encodeURIComponent(JSON.stringify(data));
                localStorage.setItem('mydata', JSON.stringify(data));
                //console.log(data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }
}

// // Enter 키 입력 시 search 함수 호출
// function onKeyPress(button) {
//     console.log("Button pressed", button);

//     if (button === "enter") {
//         search(); // 검색 함수 호출
//         location.reload(); // 페이지 새로고침
//     }

//     return button;
// }

document.getElementById("search_icon").addEventListener("click", function () {
    search();
    location.reload();
})
